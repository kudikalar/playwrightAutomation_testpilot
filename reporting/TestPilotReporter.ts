import fs from 'node:fs';
import path from 'node:path';
import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import { loadIntegrationConfig } from '../config/integrations';
import { publishRun, type RunSummary, type TestOutcome } from '../integrations';

const ROOT = path.resolve(__dirname, '..');
const SUMMARY_FILE = path.join(ROOT, 'reports', 'run-summary.json');
const APP_NAME = 'Stage-vhc-healthcare';

type MockHandle = { stop: () => Promise<void> } | null;

/**
 * Enterprise results reporter. Collects one normalised outcome per test (final retry wins, flaky detected),
 * writes reports/run-summary.json and publishes to Zephyr, Jira, S3, GitHub and Slack/Teams via integrations/.
 * In INTEGRATIONS_MODE=mock it starts the bundled dummy API automatically. It never changes the run's exit code.
 */
export default class TestPilotReporter implements Reporter {
  private readonly startedAt = new Date();
  private readonly tests: TestCase[] = [];
  private readonly last = new Map<TestCase, TestResult>();
  private mock: MockHandle = null;
  private mockStart: Promise<void> = Promise.resolve();

  printsToStdio(): boolean {
    return false;
  }

  onBegin(_config: FullConfig, suite: Suite): void {
    this.tests.push(...suite.allTests());
    const cfg = loadIntegrationConfig();
    if (cfg.mode === 'mock' && cfg.publish) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { ensureMockServer } = require('../tools/mock-integrations/server.cjs') as { ensureMockServer: (o: { port: number; url: string }) => Promise<MockHandle> };
      this.mockStart = ensureMockServer({ port: cfg.mockPort, url: cfg.mockUrl }).then((h) => { this.mock = h; }, () => undefined);
    }
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.last.set(test, result);
  }

  async onEnd(result: FullResult): Promise<void> {
    const cfg = loadIntegrationConfig();
    const finishedAt = new Date();
    const outcomes = this.tests.filter((t) => this.last.has(t)).map((t) => this.toOutcome(t, this.last.get(t) as TestResult));
    const count = (s: TestOutcome['status']): number => outcomes.filter((o) => o.status === s).length;
    const executed = outcomes.length - count('skipped');
    const run: RunSummary = {
      runId: `${finishedAt.toISOString().replace(/[-:]/g, '').slice(0, 15)}-${process.env.BUILD_NUMBER || process.env.GITHUB_RUN_NUMBER || 'local'}`,
      runName: cfg.runName,
      application: APP_NAME,
      environment: cfg.testEnv,
      baseUrl: cfg.baseUrl,
      runOn: cfg.runOn,
      startedAt: this.startedAt.toISOString(),
      finishedAt: finishedAt.toISOString(),
      durationMs: finishedAt.getTime() - this.startedAt.getTime(),
      status: result.status === 'passed' ? 'passed' : result.status === 'interrupted' ? 'interrupted' : result.status === 'timedout' ? 'timedout' : 'failed',
      totals: { total: outcomes.length, passed: count('passed'), failed: count('failed'), flaky: count('flaky'), skipped: count('skipped'), passRate: executed ? Math.round(((count('passed') + count('flaky')) / executed) * 1000) / 10 : 0 },
      tests: outcomes,
      links: { ...(cfg.ci.buildUrl ? { build: cfg.ci.buildUrl } : {}) },
      ci: cfg.ci,
    };
    await this.mockStart;
    try {
      const steps = await publishRun(run, cfg);
      const line = steps.map((s) => `${s.integration}:${s.status}`).join('  ');
      process.stdout.write(`\n[testpilot] ${run.totals.passed}/${run.totals.total} passed · ${run.totals.failed} failed · ${run.totals.flaky} flaky — publish (${cfg.mode}) ${line}\n`);
    } finally {
      fs.mkdirSync(path.dirname(SUMMARY_FILE), { recursive: true });
      fs.writeFileSync(SUMMARY_FILE, JSON.stringify(run, null, 2));
      if (this.mock) await this.mock.stop();
    }
  }

  private toOutcome(test: TestCase, result: TestResult): TestOutcome {
    const outcome = test.outcome();
    const tags = [...new Set([...test.tags, ...(test.title.match(/@[\w-]+/g) || [])])];
    const id = /^(AT-\d+)\b/.exec(test.title)?.[1] || `T-${Buffer.from(test.titlePath().join('>')).toString('base64url').slice(0, 10)}`;
    const project = test.parent.project()?.name || 'default';
    const describe = test.titlePath().slice(3, -1).join(' › ');
    const has = (t: string): boolean => tags.includes(`@${t}`);
    return {
      id,
      title: test.title.replace(/^AT-\d+\s+/, ''),
      fullTitle: test.titlePath().slice(1).join(' › '),
      module: describe.split(' · ')[0] || path.basename(test.location.file).split('.')[0],
      file: path.relative(ROOT, test.location.file).split(path.sep).join('/'),
      line: test.location.line,
      project,
      status: outcome === 'flaky' ? 'flaky' : outcome === 'skipped' ? 'skipped' : outcome === 'expected' ? 'passed' : 'failed',
      durationMs: result.duration,
      retries: result.retry,
      tags,
      priority: has('critical') || has('p0') ? 'Critical' : has('p1') || has('security') ? 'High' : has('smoke') ? 'High' : 'Medium',
      error: result.error ? strip(result.error.message || String(result.error.value || '')) : undefined,
      errorStack: result.error?.stack ? strip(result.error.stack).slice(0, 4000) : undefined,
      attachments: result.attachments.map((a) => ({ name: a.name, contentType: a.contentType, path: a.path })),
      annotations: test.annotations.map((a) => ({ type: a.type, description: a.description })),
    };
  }
}

// eslint-disable-next-line no-control-regex
const strip = (s: string): string => s.replace(/\u001b\[[0-9;]*m/g, '');
