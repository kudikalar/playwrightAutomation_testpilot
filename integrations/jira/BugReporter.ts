import { createHash } from 'node:crypto';
import type { IntegrationConfig } from '../../config/integrations';
import type { RunSummary, TestOutcome } from '../core/types';
import { mapLimit } from '../../utils/retry';
import { JiraClient, adf } from './JiraClient';

export interface BugResult { created: string[]; updated: string[]; skipped: number; failedToFile: { test: string; error: string }[] }

/** Same test + same error shape ⇒ same signature ⇒ one Jira issue (re-occurrences become comments). */
export function failureSignature(t: TestOutcome): string {
  const firstLine = (t.error || 'unknown failure').split('\n').find((l) => l.trim()) || '';
  const normalised = firstLine.replace(/\d+(\.\d+)?\s*ms/g, 'Nms').replace(/\b\d+\b/g, 'N').replace(/["'`].*?["'`]/g, '"…"').trim();
  return createHash('sha1').update(`${t.id}|${normalised}`).digest('hex').slice(0, 10);
}

/**
 * Files de-duplicated defects for failed tests (flaky and skipped tests never file bugs).
 * Existing open issue with the same signature label → comment with the new occurrence; otherwise → new Bug
 * with steps, error, environment, CI link and screenshot/trace evidence attached.
 */
export class BugReporter {
  constructor(private readonly jira: JiraClient, private readonly cfg: IntegrationConfig) {}

  async report(run: RunSummary): Promise<BugResult> {
    const failed = run.tests.filter((t) => t.status === 'failed');
    const result: BugResult = { created: [], updated: [], skipped: Math.max(0, failed.length - this.cfg.jira.maxBugsPerRun), failedToFile: [] };
    await mapLimit(failed.slice(0, this.cfg.jira.maxBugsPerRun), 3, async (t) => {
      try {
        const signature = `tp-fp-${failureSignature(t)}`;
        const open = await this.jira.search(`project = "${this.jira.projectKey}" AND labels = "${signature}" AND statusCategory != Done ORDER BY created DESC`, 1);
        if (open.issues.length) {
          const key = open.issues[0].key;
          await this.jira.addComment(key, adf.doc(adf.paragraph(`Reproduced again in run ${run.runName} (${run.environment}, ${run.runOn}) at ${run.finishedAt}.`), adf.code((t.error || '').slice(0, 4000)), ...(run.ci.buildUrl ? [adf.paragraph(`Build: ${run.ci.buildUrl}`)] : [])));
          t.jiraKey = key;
          result.updated.push(key);
          return;
        }
        const issue = await this.jira.createIssue({
          summary: `[Automation] ${t.title}`,
          issueType: this.cfg.jira.issueType,
          priority: this.cfg.jira.priorityMap[t.priority],
          labels: [...this.cfg.jira.labels, signature, `env-${run.environment}`, `module-${t.module}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-')],
          description: adf.doc(
            adf.heading('Summary'),
            adf.paragraph(`Automated test ${t.id} failed on ${run.application} (${run.environment}).`),
            adf.heading('Steps to reproduce'),
            adf.ordered([`Open ${run.baseUrl || 'the application'} (${run.environment})`, `Run: npx playwright test --grep "${t.id}" --project=${t.project}`, `Observe: ${(t.error || 'failure').split('\n')[0].slice(0, 200)}`]),
            adf.heading('Actual result'),
            adf.code((t.error || '').slice(0, 6000)),
            adf.heading('Context'),
            adf.bullets([`Test: ${t.fullTitle}`, `File: ${t.file}:${t.line}`, `Priority: ${t.priority} · Tags: ${t.tags.join(' ') || '—'}`, `Browser/project: ${t.project} · Retries: ${t.retries}`, `Run: ${run.runName} · ${run.runOn} · ${run.ci.name}${run.ci.buildNumber ? ` #${run.ci.buildNumber}` : ''}`, ...(run.ci.buildUrl ? [`Build: ${run.ci.buildUrl}`] : []), ...(run.links.reports ? [`Reports: ${run.links.reports}`] : []), `Signature: ${signature}`]),
          ),
        });
        t.jiraKey = issue.key;
        result.created.push(issue.key);
        const evidence = t.attachments.filter((a) => a.path && /image|zip|video/.test(a.contentType)).map((a) => a.path as string).slice(0, 4);
        if (evidence.length) await this.jira.attachFiles(issue.key, evidence);
      } catch (error) {
        result.failedToFile.push({ test: t.id, error: (error as Error).message });
      }
    });
    return result;
  }
}
