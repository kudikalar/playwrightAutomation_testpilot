import './env';

/**
 * Typed integration settings, read from the environment on every call so values loaded later
 * (AWS Secrets Manager in global-setup, CI secrets) are picked up. INTEGRATIONS_MODE=mock points every
 * client at the bundled dummy API (tools/mock-integrations) and supplies throw-away credentials.
 */
const bool = (v: string | undefined, fallback: boolean): boolean => (v === undefined || v === '' ? fallback : /^(1|true|yes|on)$/i.test(v));
const list = (v: string | undefined): string[] => (v || '').split(',').map((s) => s.trim()).filter(Boolean);
const trimSlash = (v: string): string => v.replace(/\/+$/, '');

export type IntegrationMode = 'mock' | 'live';
export type RunTarget = 'local' | 'saucelabs' | 'browserstack';

export interface IntegrationConfig {
  mode: IntegrationMode;
  mockUrl: string;
  mockPort: number;
  publish: boolean;
  runName: string;
  runOn: RunTarget;
  testEnv: string;
  baseUrl: string;
  jira: { enabled: boolean; baseUrl: string; email: string; apiToken: string; projectKey: string; issueType: string; createBugs: boolean; labels: string[]; priorityMap: Record<string, string>; maxBugsPerRun: number };
  zephyr: { enabled: boolean; baseUrl: string; apiToken: string; projectKey: string; cycleName: string; createMissingCases: boolean };
  aws: { region: string; bucket: string; prefix: string; upload: boolean; secretsProvider: 'env' | 'aws'; secretId: string };
  github: { apiUrl: string; token: string; repository: string; prNumber: string; sha: string; serverUrl: string; runId: string };
  notify: { slackWebhook: string; teamsWebhook: string; on: 'always' | 'failure' };
  ci: { name: string; buildUrl: string; buildNumber: string; branch: string };
}

export function loadIntegrationConfig(): IntegrationConfig {
  const e = process.env;
  const mode: IntegrationMode = (e.INTEGRATIONS_MODE || 'mock').toLowerCase() === 'live' ? 'live' : 'mock';
  const mockPort = Number(e.MOCK_INTEGRATIONS_PORT || 4599);
  const mockUrl = (e.MOCK_INTEGRATIONS_URL || `http://localhost:${mockPort}`).replace(/\/+$/, '');
  const mock = mode === 'mock';
  const pick = (live: string | undefined, mockValue: string): string => (mock ? mockValue : live || '');
  const priorityMap = Object.fromEntries(list(e.JIRA_PRIORITY_MAP || 'Critical:Highest,High:High,Medium:Medium,Low:Low').map((p) => p.split(':').map((s) => s.trim())).filter((p) => p.length === 2));
  const ciName = e.GITHUB_ACTIONS ? 'GitHub Actions' : e.JENKINS_URL ? 'Jenkins' : e.GITLAB_CI ? 'GitLab CI' : e.TF_BUILD ? 'Azure DevOps' : e.CODEBUILD_BUILD_ID ? 'AWS CodeBuild' : e.CI ? 'CI' : 'local';
  const testEnv = e.TEST_ENV || 'qa';
  return {
    mode,
    mockUrl,
    mockPort,
    publish: bool(e.PUBLISH_RESULTS, true),
    runName: e.RUN_NAME || `${testEnv}-run`,
    runOn: (['saucelabs', 'browserstack'].includes(e.RUN_ON || '') ? e.RUN_ON : 'local') as RunTarget,
    testEnv,
    baseUrl: e.BASE_URL || '',
    jira: {
      enabled: bool(e.JIRA_ENABLED, false),
      baseUrl: trimSlash(mock ? mockUrl : e.JIRA_BASE_URL || ''),
      email: pick(e.JIRA_EMAIL, 'automation@example-test.local'),
      apiToken: pick(e.JIRA_API_TOKEN, 'mock-jira-credential'),
      projectKey: e.JIRA_PROJECT_KEY || 'QA',
      issueType: e.JIRA_ISSUE_TYPE || 'Bug',
      createBugs: bool(e.JIRA_CREATE_BUGS, true),
      labels: list(e.JIRA_LABELS || 'automation'),
      priorityMap,
      maxBugsPerRun: Number(e.JIRA_MAX_BUGS_PER_RUN || 25),
    },
    zephyr: {
      enabled: bool(e.ZEPHYR_ENABLED, false),
      baseUrl: trimSlash(mock ? `${mockUrl}/v2` : e.ZEPHYR_BASE_URL || 'https://api.zephyrscale.smartbear.com/v2'),
      apiToken: pick(e.ZEPHYR_API_TOKEN, 'mock-zephyr-credential'),
      projectKey: e.ZEPHYR_PROJECT_KEY || e.JIRA_PROJECT_KEY || 'QA',
      cycleName: e.ZEPHYR_CYCLE_NAME || '',
      createMissingCases: bool(e.ZEPHYR_CREATE_MISSING_CASES, true),
    },
    aws: {
      region: e.AWS_REGION || 'us-east-1',
      bucket: e.AWS_S3_BUCKET || '',
      prefix: (e.AWS_S3_PREFIX || testEnv).replace(/^\/+|\/+$/g, ''),
      upload: bool(e.AWS_S3_UPLOAD, false),
      secretsProvider: (e.SECRETS_PROVIDER || 'env').toLowerCase() === 'aws' ? 'aws' : 'env',
      secretId: e.AWS_SECRET_ID || '',
    },
    github: {
      apiUrl: trimSlash(mock ? mockUrl : e.GITHUB_API_URL || 'https://api.github.com'),
      token: pick(e.GITHUB_TOKEN, 'mock-github-credential'),
      repository: e.GITHUB_REPOSITORY || '',
      prNumber: e.GITHUB_PR_NUMBER || (e.GITHUB_REF || '').match(/refs\/pull\/(\d+)\//)?.[1] || '',
      sha: e.GITHUB_SHA || '',
      serverUrl: e.GITHUB_SERVER_URL || 'https://github.com',
      runId: e.GITHUB_RUN_ID || '',
    },
    notify: {
      slackWebhook: mock && e.SLACK_WEBHOOK_URL !== undefined ? `${mockUrl}/hooks/slack` : e.SLACK_WEBHOOK_URL || '',
      teamsWebhook: mock && e.TEAMS_WEBHOOK_URL !== undefined ? `${mockUrl}/hooks/teams` : e.TEAMS_WEBHOOK_URL || '',
      on: (e.NOTIFY_ON || 'always').toLowerCase() === 'failure' ? 'failure' : 'always',
    },
    ci: {
      name: ciName,
      buildUrl: e.BUILD_URL || (e.GITHUB_RUN_ID ? `${e.GITHUB_SERVER_URL || 'https://github.com'}/${e.GITHUB_REPOSITORY}/actions/runs/${e.GITHUB_RUN_ID}` : e.CI_JOB_URL || ''),
      buildNumber: e.BUILD_NUMBER || e.GITHUB_RUN_NUMBER || e.CI_PIPELINE_IID || '',
      branch: e.BRANCH_NAME || e.GITHUB_HEAD_REF || e.GITHUB_REF_NAME || e.CI_COMMIT_REF_NAME || '',
    },
  };
}
