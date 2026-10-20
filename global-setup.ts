import fs from 'node:fs';
import path from 'node:path';
import type { FullConfig } from '@playwright/test';
import { loadSecrets } from './integrations/aws/SecretsLoader';
import { loadIntegrationConfig } from './config/integrations';
import { createLogger } from './utils/logger';

const log = createLogger('setup');

/** Runs once before all workers: secrets, folders, and a readable run banner (no secrets printed). */
export default async function globalSetup(config: FullConfig): Promise<void> {
  await loadSecrets();
  const cfg = loadIntegrationConfig();
  for (const dir of ['reports', 'logs', 'downloads', 'screenshots']) fs.mkdirSync(path.resolve(__dirname, dir), { recursive: true });
  const enabled = [cfg.jira.enabled && 'jira', cfg.zephyr.enabled && 'zephyr', cfg.aws.upload && 's3', cfg.github.repository && 'github', cfg.notify.slackWebhook && 'slack', cfg.notify.teamsWebhook && 'teams'].filter(Boolean);
  log.info(`env=${cfg.testEnv} baseURL=${config.projects[0]?.use.baseURL || cfg.baseUrl || '—'} runOn=${cfg.runOn} workers=${config.workers} integrations=${cfg.mode}[${enabled.join(', ') || 'none'}] publish=${cfg.publish}`);
  if (cfg.mode === 'live') {
    const missing = [cfg.jira.enabled && !cfg.jira.apiToken && 'JIRA_API_TOKEN', cfg.zephyr.enabled && !cfg.zephyr.apiToken && 'ZEPHYR_API_TOKEN', cfg.aws.upload && !cfg.aws.bucket && 'AWS_S3_BUCKET'].filter(Boolean);
    if (missing.length) log.warn(`Live integrations without credentials will be skipped: ${missing.join(', ')}`);
  }
}
