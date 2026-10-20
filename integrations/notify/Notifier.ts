import type { IntegrationConfig } from '../../config/integrations';
import type { RunSummary } from '../core/types';
import { HttpClient } from '../core/http';

const icon = (run: RunSummary): string => (run.status === 'passed' ? '✅' : '❌');
const headline = (run: RunSummary): string => `${icon(run)} ${run.application} · ${run.environment} — ${run.totals.passed}/${run.totals.total} passed (${run.totals.passRate}%)`;
const topFailures = (run: RunSummary, n = 5): string[] => run.tests.filter((t) => t.status === 'failed').slice(0, n).map((t) => `${t.id} ${t.title}${t.jiraKey ? ` → ${t.jiraKey}` : ''}`);

async function post(url: string, body: unknown): Promise<void> {
  const u = new URL(url);
  await new HttpClient({ name: 'notify', baseUrl: u.origin, retries: 2 }).request('POST', u.pathname + u.search, { body, expect: [200, 202, 204] });
}

export function slackPayload(run: RunSummary): Record<string, unknown> {
  const fails = topFailures(run);
  const links = Object.entries(run.links).map(([k, v]) => `<${v}|${k}>`).join(' · ');
  return {
    text: headline(run),
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: headline(run).slice(0, 150) } },
      { type: 'section', fields: [`*Run*\n${run.runName}`, `*Target*\n${run.runOn}`, `*Failed / Flaky*\n${run.totals.failed} / ${run.totals.flaky}`, `*Duration*\n${Math.round(run.durationMs / 1000)} s`].map((text) => ({ type: 'mrkdwn', text })) },
      ...(fails.length ? [{ type: 'section', text: { type: 'mrkdwn', text: `*Failures*\n${fails.map((f) => `• ${f}`).join('\n')}` } }] : []),
      ...(links ? [{ type: 'context', elements: [{ type: 'mrkdwn', text: links }] }] : []),
    ],
  };
}

export function teamsPayload(run: RunSummary): Record<string, unknown> {
  return {
    type: 'message',
    attachments: [{
      contentType: 'application/vnd.microsoft.card.adaptive',
      content: {
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json', type: 'AdaptiveCard', version: '1.4',
        body: [
          { type: 'TextBlock', size: 'Medium', weight: 'Bolder', wrap: true, text: headline(run), color: run.status === 'passed' ? 'Good' : 'Attention' },
          { type: 'FactSet', facts: [['Run', run.runName], ['Target', run.runOn], ['Failed', String(run.totals.failed)], ['Flaky', String(run.totals.flaky)], ['Duration', `${Math.round(run.durationMs / 1000)} s`]].map(([title, value]) => ({ title, value })) },
          ...topFailures(run).map((f) => ({ type: 'TextBlock', wrap: true, spacing: 'None', text: `• ${f}` })),
        ],
        actions: Object.entries(run.links).map(([title, url]) => ({ type: 'Action.OpenUrl', title, url })),
      },
    }],
  };
}

/** Slack + Microsoft Teams (Workflows webhook, Adaptive Card). NOTIFY_ON=failure keeps green runs quiet. */
export async function notify(run: RunSummary, cfg: IntegrationConfig): Promise<string[]> {
  if (cfg.notify.on === 'failure' && run.status === 'passed') return [];
  const sent: string[] = [];
  if (cfg.notify.slackWebhook) { await post(cfg.notify.slackWebhook, slackPayload(run)); sent.push('slack'); }
  if (cfg.notify.teamsWebhook) { await post(cfg.notify.teamsWebhook, teamsPayload(run)); sent.push('teams'); }
  return sent;
}
