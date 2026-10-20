import { loadIntegrationConfig } from '../../config/integrations';
import { createLogger } from '../../utils/logger';

const SM_MODULE = '@aws-sdk/client-secrets-manager';
const log = createLogger('secrets');

/**
 * SECRETS_PROVIDER=aws loads a JSON secret ({"USER_PASSWORD": "...", "JIRA_API_TOKEN": "..."}) from AWS Secrets
 * Manager into process.env before tests start. Variables already set (CI secrets, local .env) always win.
 */
export async function loadSecrets(): Promise<number> {
  const cfg = loadIntegrationConfig();
  if (cfg.aws.secretsProvider !== 'aws') return 0;
  if (cfg.mode === 'mock') {
    log.info('SECRETS_PROVIDER=aws ignored in mock mode — using environment values');
    return 0;
  }
  if (!cfg.aws.secretId) throw new Error('SECRETS_PROVIDER=aws requires AWS_SECRET_ID');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sdk: any = await import(SM_MODULE).catch(() => {
    throw new Error(`SECRETS_PROVIDER=aws needs the optional dependency ${SM_MODULE}`);
  });
  const client = new sdk.SecretsManagerClient({ region: cfg.aws.region });
  const out = await client.send(new sdk.GetSecretValueCommand({ SecretId: cfg.aws.secretId }));
  const values = JSON.parse(out.SecretString || '{}') as Record<string, string>;
  let applied = 0;
  for (const [k, v] of Object.entries(values)) {
    if (process.env[k] === undefined || process.env[k] === '') {
      process.env[k] = String(v);
      applied++;
    }
  }
  log.info(`Loaded ${applied} value(s) from AWS Secrets Manager (${cfg.aws.secretId})`);
  return applied;
}
