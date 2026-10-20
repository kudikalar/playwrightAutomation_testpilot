import fs from 'node:fs';
import path from 'node:path';
import type { IntegrationConfig } from '../../config/integrations';
import type { RunSummary, TestOutcome } from '../core/types';
import { mapLimit } from '../../utils/retry';
import { HttpClient } from '../core/http';

export type ZephyrStatus = 'Pass' | 'Fail' | 'Blocked' | 'Not Executed' | 'In Progress';
export interface ZephyrRef { id: number; key: string; self?: string }

/** Zephyr Scale Cloud API v2 client (Bearer token): test cases, test cycles and executions. */
export class ZephyrClient {
  private readonly http: HttpClient;

  constructor(private readonly projectKey: string, baseUrl: string, apiToken: string) {
    this.http = new HttpClient({ name: 'zephyr', baseUrl, headers: { authorization: `Bearer ${apiToken}` } });
  }

  createTestCase(input: { name: string; objective?: string; labels?: string[]; priorityName?: string }): Promise<ZephyrRef> {
    return this.http.post('/testcases', { projectKey: this.projectKey, statusName: 'Approved', ...input });
  }

  createTestCycle(name: string, description: string): Promise<ZephyrRef> {
    return this.http.post('/testcycles', { projectKey: this.projectKey, name, description, statusName: 'In Progress' });
  }

  createExecution(input: { testCaseKey: string; testCycleKey: string; statusName: ZephyrStatus; environmentName?: string; executionTime?: number; comment?: string; actualEndDate?: string }): Promise<{ id: number }> {
    return this.http.post('/testexecutions', { projectKey: this.projectKey, ...input });
  }
}

const MAPPING_FILE = path.resolve(__dirname, 'mapping.json');
const LEARNED_FILE = path.resolve(__dirname, '../../reports/integrations/zephyr-mapping.learned.json');

/** Automation id (AT-0001) → Zephyr test case key. Generated with the framework; extend it as cases are linked. */
export function loadMapping(): Record<string, string> {
  const read = (f: string): Record<string, string> => (fs.existsSync(f) ? (JSON.parse(fs.readFileSync(f, 'utf8')) as Record<string, string>) : {});
  return { ...read(MAPPING_FILE), ...read(LEARNED_FILE) };
}

const statusOf = (t: TestOutcome): ZephyrStatus => (t.status === 'passed' || t.status === 'flaky' ? 'Pass' : t.status === 'failed' ? 'Fail' : 'Not Executed');
const escapeHtml = (s: string): string => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);

export interface ZephyrResult { cycleKey: string; executions: number; createdCases: string[]; unmapped: string[]; errors: string[] }

/** Publishes one test cycle per run with an execution for every mapped (or newly created) test case. */
export async function publishToZephyr(run: RunSummary, cfg: IntegrationConfig): Promise<ZephyrResult> {
  const z = new ZephyrClient(cfg.zephyr.projectKey, cfg.zephyr.baseUrl, cfg.zephyr.apiToken);
  const mapping = loadMapping();
  const learned: Record<string, string> = {};
  const result: ZephyrResult = { cycleKey: '', executions: 0, createdCases: [], unmapped: [], errors: [] };
  const cycleName = cfg.zephyr.cycleName || `${run.application} · ${run.environment} · ${run.runName} · ${run.startedAt.slice(0, 16).replace('T', ' ')}`;
  const cycle = await z.createTestCycle(cycleName, `Automated run on ${run.runOn} (${run.ci.name}${run.ci.buildNumber ? ` #${run.ci.buildNumber}` : ''}). Pass rate ${run.totals.passRate}%.${run.ci.buildUrl ? ` Build: ${run.ci.buildUrl}` : ''}`);
  result.cycleKey = cycle.key;
  // one execution per automation id — the final outcome across browsers/projects wins (fail beats pass)
  const byId = new Map<string, TestOutcome>();
  for (const t of run.tests) {
    const prev = byId.get(t.id);
    if (!prev || (t.status === 'failed' && prev.status !== 'failed')) byId.set(t.id, t);
  }
  await mapLimit([...byId.values()], 4, async (t) => {
    try {
      let key = mapping[t.id];
      if (!key && cfg.zephyr.createMissingCases) {
        const created = await z.createTestCase({ name: `${t.id} ${t.title}`.slice(0, 255), objective: `Automated by ${t.file}`, labels: t.tags.map((x) => x.replace(/^@/, '')), priorityName: t.priority === 'Critical' || t.priority === 'High' ? 'High' : 'Normal' });
        key = created.key;
        learned[t.id] = key;
        result.createdCases.push(key);
      }
      if (!key) {
        result.unmapped.push(t.id);
        return;
      }
      t.zephyrKey = key;
      await z.createExecution({ testCaseKey: key, testCycleKey: cycle.key, statusName: statusOf(t), environmentName: run.environment, executionTime: Math.round(t.durationMs), actualEndDate: run.finishedAt, comment: t.error ? `<pre>${escapeHtml(t.error.slice(0, 2000))}</pre>` : t.status === 'flaky' ? `Passed after ${t.retries} retr${t.retries === 1 ? 'y' : 'ies'} (flaky)` : '' });
      result.executions++;
    } catch (error) {
      result.errors.push(`${t.id}: ${(error as Error).message}`);
    }
  });
  if (Object.keys(learned).length) {
    fs.mkdirSync(path.dirname(LEARNED_FILE), { recursive: true });
    const previous = fs.existsSync(LEARNED_FILE) ? (JSON.parse(fs.readFileSync(LEARNED_FILE, 'utf8')) as Record<string, string>) : {};
    fs.writeFileSync(LEARNED_FILE, JSON.stringify({ ...previous, ...learned }, null, 2));
  }
  return result;
}
