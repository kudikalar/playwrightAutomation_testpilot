/** Normalised result model shared by every publisher (Zephyr, Jira, S3, GitHub, Slack/Teams). */
export type OutcomeStatus = 'passed' | 'failed' | 'flaky' | 'skipped';

export interface Evidence {
  name: string;
  contentType: string;
  path?: string;
}

export interface TestOutcome {
  id: string;
  title: string;
  fullTitle: string;
  module: string;
  file: string;
  line: number;
  project: string;
  status: OutcomeStatus;
  durationMs: number;
  retries: number;
  tags: string[];
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  error?: string;
  errorStack?: string;
  attachments: Evidence[];
  annotations: { type: string; description?: string }[];
  zephyrKey?: string;
  jiraKey?: string;
}

export interface RunSummary {
  runId: string;
  runName: string;
  application: string;
  environment: string;
  baseUrl: string;
  runOn: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  status: 'passed' | 'failed' | 'interrupted' | 'timedout';
  totals: { total: number; passed: number; failed: number; flaky: number; skipped: number; passRate: number };
  tests: TestOutcome[];
  links: Record<string, string>;
  ci: { name: string; buildUrl: string; buildNumber: string; branch: string };
}

export interface PublishStep {
  integration: string;
  status: 'ok' | 'skipped' | 'failed';
  detail: string;
  ms: number;
  data?: unknown;
}
