import type { IntegrationConfig } from '../../config/integrations';
import type { RunSummary } from '../core/types';
import { HttpClient } from '../core/http';

const MARKER = '<!-- testpilot-e2e-results -->';

export function markdownSummary(run: RunSummary): string {
  const fails = run.tests.filter((t) => t.status === 'failed');
  const flaky = run.tests.filter((t) => t.status === 'flaky');
  return [
    MARKER,
    `### ${run.status === 'passed' ? '✅' : '❌'} E2E results — ${run.application} (${run.environment})`,
    '',
    '| Total | Passed | Failed | Flaky | Skipped | Pass rate | Duration |',
    '|---:|---:|---:|---:|---:|---:|---:|',
    `| ${run.totals.total} | ${run.totals.passed} | ${run.totals.failed} | ${run.totals.flaky} | ${run.totals.skipped} | ${run.totals.passRate}% | ${Math.round(run.durationMs / 1000)} s |`,
    '',
    ...(fails.length ? ['<details open><summary><b>Failures</b></summary>', '', ...fails.slice(0, 15).map((t) => `- \`${t.id}\` ${t.title}${t.jiraKey ? ` — ${t.jiraKey}` : ''}${t.zephyrKey ? ` · ${t.zephyrKey}` : ''}`), '</details>', ''] : []),
    ...(flaky.length ? [`Flaky: ${flaky.map((t) => `\`${t.id}\``).join(', ')}`, ''] : []),
    Object.entries(run.links).map(([k, v]) => `[${k}](${v})`).join(' · '),
    `<sub>${run.runName} · ${run.runOn} · ${run.ci.name}${run.ci.buildNumber ? ` #${run.ci.buildNumber}` : ''}</sub>`,
  ].join('\n');
}

/** Upserts one results comment on the pull request and sets a commit status (testpilot/e2e). */
export async function publishToGitHub(run: RunSummary, cfg: IntegrationConfig): Promise<{ comment?: string; status?: string }> {
  const g = cfg.github;
  if (!g.repository || (!g.prNumber && !g.sha)) return {};
  const http = new HttpClient({ name: 'github', baseUrl: g.apiUrl, headers: { authorization: `Bearer ${g.token}`, accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28' } });
  const out: { comment?: string; status?: string } = {};
  if (g.prNumber) {
    const body = markdownSummary(run);
    const existing = await http.get<{ id: number; body: string; html_url: string }[]>(`/repos/${g.repository}/issues/${g.prNumber}/comments`, { query: { per_page: 100 } });
    const mine = existing.find((c) => c.body.includes(MARKER));
    const c = mine
      ? await http.patch<{ html_url: string }>(`/repos/${g.repository}/issues/comments/${mine.id}`, { body })
      : await http.post<{ html_url: string }>(`/repos/${g.repository}/issues/${g.prNumber}/comments`, { body });
    out.comment = c.html_url;
  }
  if (g.sha) {
    await http.post(`/repos/${g.repository}/statuses/${g.sha}`, { state: run.status === 'passed' ? 'success' : 'failure', context: 'testpilot/e2e', description: `${run.totals.passed}/${run.totals.total} passed · ${run.totals.failed} failed`.slice(0, 140), ...(run.ci.buildUrl ? { target_url: run.ci.buildUrl } : {}) });
    out.status = run.status === 'passed' ? 'success' : 'failure';
  }
  return out;
}
