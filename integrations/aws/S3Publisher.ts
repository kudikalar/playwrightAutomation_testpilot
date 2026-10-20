import fs from 'node:fs';
import path from 'node:path';
import type { IntegrationConfig } from '../../config/integrations';
import { mapLimit } from '../../utils/retry';

const ROOT = path.resolve(__dirname, '../..');
const TYPES: Record<string, string> = { '.html': 'text/html', '.json': 'application/json', '.xml': 'application/xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webm': 'video/webm', '.zip': 'application/zip', '.txt': 'text/plain', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.md': 'text/markdown' };

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 's3-mock' ? [] : walk(p);
    return [p];
  });
}

// Optional dependency: install @aws-sdk/client-s3 only where uploads run. The variable keeps type-checking independent of it.
const S3_MODULE = '@aws-sdk/client-s3';

export interface S3Result { location: string; files: number; bytes: number; mock: boolean }

/**
 * Archives reports/ and test-results/ to s3://<bucket>/<prefix>/<runId>/ (credentials from the default AWS chain:
 * env vars, profile, or the CI role). In mock mode the same layout is written to reports/s3-mock/ instead.
 */
export async function publishToS3(runId: string, cfg: IntegrationConfig, dirs = ['reports', 'test-results']): Promise<S3Result> {
  const files = dirs.flatMap((d) => walk(path.join(ROOT, d)));
  const keyOf = (f: string): string => `${cfg.aws.prefix}/${runId}/${path.relative(ROOT, f).split(path.sep).join('/')}`;
  const bytes = files.reduce((s, f) => s + fs.statSync(f).size, 0);
  if (cfg.mode === 'mock' || !cfg.aws.bucket) {
    const target = path.join(ROOT, 'reports', 's3-mock', cfg.aws.bucket || 'local-bucket');
    for (const f of files) {
      const dest = path.join(target, keyOf(f));
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(f, dest);
    }
    return { location: `file://${path.join(target, cfg.aws.prefix, runId)}`, files: files.length, bytes, mock: true };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sdk: any = await import(S3_MODULE).catch(() => {
    throw new Error(`AWS upload needs the optional dependency ${S3_MODULE} (npm i -D ${S3_MODULE})`);
  });
  const client = new sdk.S3Client({ region: cfg.aws.region });
  await mapLimit(files, 8, async (f) => {
    await client.send(new sdk.PutObjectCommand({ Bucket: cfg.aws.bucket, Key: keyOf(f), Body: fs.readFileSync(f), ContentType: TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' }));
  });
  return { location: `https://${cfg.aws.bucket}.s3.${cfg.aws.region}.amazonaws.com/${cfg.aws.prefix}/${runId}/reports/html/index.html`, files: files.length, bytes, mock: false };
}
