import fs from 'node:fs';
import path from 'node:path';
import { loadIntegrationConfig, type IntegrationConfig } from '../config/integrations';
import { createLogger } from '../utils/logger';
import type { PublishStep, RunSummary } from './core/types';
import { publishToZephyr } from './zephyr/ZephyrClient';
import { JiraClient } from './jira/JiraClient';
import { BugReporter } from './jira/BugReporter';
import { publishToS3 } from './aws/S3Publisher';
import { publishToGitHub } from './github/GitHubPublisher';
import { notify } from './notify/Notifier';

export * from './core/types';
export { JiraClient, adf } from './jira/JiraClient';
export { ZephyrClient } from './zephyr/ZephyrClient';
export { HttpClient, IntegrationError } from './core/http';

const log = createLogger('publish');
const OUT = path.resolve(__dirname, '../reports/integrations/publish-report.json');

async function step(steps: PublishStep[], integration: string, enabled: boolean, why: string, fn: () => Promise<{ detail: string; data?: unknown }>): Promise<void> {
  const started = Date.now();
  if (!enabled) {
    steps.push({ integration, status: 'skipped', detail: why, ms: 0 });
    return;
  }
  try {
    const r = await fn();
    steps.push({ integration, status: 'ok', detail: r.detail, ms: Date.now() - started, data: r.data });
    log.info(`${integration}: ${r.detail}`);
  } catch (error) {
    steps.push({ integration, status: 'failed', detail: (error as Error).message, ms: Date.now() - started });
    log.error(`${integration} failed: ${(error as Error).message}`);
  }
}

/**
 * Publishes one run to every enabled integration, in dependency order:
 *   Zephyr (cycle + executions) → Jira (de-duplicated bugs) → S3 (report archive) → GitHub (PR comment/status) → Slack/Teams.
 * A failing integration never fails the test run — each step is isolated and recorded in reports/integrations/publish-report.json.
 */
export async function publishRun(run: RunSummary, cfg: IntegrationConfig = loadIntegrationConfig()): Promise<PublishStep[]> {
  const steps: PublishStep[] = [];
  if (!cfg.publish) return [{ integration: 'all', status: 'skipped', detail: 'PUBLISH_RESULTS=false', ms: 0 }];
  const live = cfg.mode === 'live';

  await step(steps, 'zephyr', cfg.zephyr.enabled && (!live || !!cfg.zephyr.apiToken), cfg.zephyr.enabled ? 'ZEPHYR_API_TOKEN not set' : 'ZEPHYR_ENABLED=false', async () => {
    const z = await publishToZephyr(run, cfg);
    return { detail: `cycle ${z.cycleKey} · ${z.executions} execution(s)${z.createdCases.length ? ` · ${z.createdCases.length} new test case(s)` : ''}${z.unmapped.length ? ` · ${z.unmapped.length} unmapped` : ''}${z.errors.length ? ` · ${z.errors.length} error(s)` : ''}`, data: z };
  });

  const failures = run.tests.filter((t) => t.status === 'failed').length;
  await step(steps, 'jira', cfg.jira.enabled && cfg.jira.createBugs && failures > 0 && (!live || (!!cfg.jira.baseUrl && !!cfg.jira.apiToken)), !cfg.jira.enabled ? 'JIRA_ENABLED=false' : !failures ? 'no failures to file' : 'Jira credentials not set', async () => {
    const jira = new JiraClient({ baseUrl: cfg.jira.baseUrl, email: cfg.jira.email, apiToken: cfg.jira.apiToken, projectKey: cfg.jira.projectKey });
    const r = await new BugReporter(jira, cfg).report(run);
    if (r.created[0]) run.links.jira = jira.browseUrl(r.created[0]);
    return { detail: `${r.created.length} bug(s) created, ${r.updated.length} updated${r.skipped ? `, ${r.skipped} over the per-run cap` : ''}${r.failedToFile.length ? `, ${r.failedToFile.length} could not be filed` : ''}`, data: r };
  });

  await step(steps, 's3', cfg.aws.upload, 'AWS_S3_UPLOAD=false', async () => {
    const r = await publishToS3(run.runId, cfg);
    run.links.reports = r.location;
    return { detail: `${r.files} file(s), ${(r.bytes / 1024 / 1024).toFixed(1)} MB → ${r.location}${r.mock ? ' (mock)' : ''}`, data: r };
  });

  await step(steps, 'github', !!cfg.github.repository && !!(cfg.github.prNumber || cfg.github.sha) && (!live || !!cfg.github.token), 'not a pull request / commit build', async () => {
    const r = await publishToGitHub(run, cfg);
    return { detail: [r.comment && `PR comment ${r.comment}`, r.status && `commit status ${r.status}`].filter(Boolean).join(' · ') || 'nothing to publish', data: r };
  });

  await step(steps, 'notify', !!(cfg.notify.slackWebhook || cfg.notify.teamsWebhook), 'no Slack/Teams webhook configured', async () => {
    const sent = await notify(run, cfg);
    return { detail: sent.length ? `sent to ${sent.join(' + ')}` : `quiet (NOTIFY_ON=${cfg.notify.on})` };
  });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ runId: run.runId, mode: cfg.mode, at: new Date().toISOString(), steps, links: run.links }, null, 2));
  return steps;
}
