import { createLogger, type Logger } from '../../utils/logger';
import { pause } from '../../utils/retry';

export class IntegrationError extends Error {
  constructor(message: string, readonly status?: number, readonly body?: unknown) {
    super(message);
    this.name = 'IntegrationError';
  }
}

export interface HttpClientOptions {
  name: string;
  baseUrl: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
  retries?: number;
}

export interface RequestOptions {
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  form?: FormData;
  headers?: Record<string, string>;
  expect?: number[];
}

const RETRYABLE = new Set([408, 425, 429, 500, 502, 503, 504]);

/**
 * Shared REST client for every integration: base URL, auth headers, timeouts, retry with back-off on
 * 429/5xx/network errors (honouring Retry-After), JSON in/out and redacted logging.
 */
export class HttpClient {
  private readonly log: Logger;

  constructor(private readonly options: HttpClientOptions) {
    this.log = createLogger(options.name);
  }

  get<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  post<T>(path: string, body?: unknown, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('POST', path, { ...options, body });
  }

  put<T>(path: string, body?: unknown, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('PUT', path, { ...options, body });
  }

  patch<T>(path: string, body?: unknown, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('PATCH', path, { ...options, body });
  }

  async request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
    const url = new URL(this.options.baseUrl.replace(/\/+$/, '') + (path.startsWith('/') ? path : `/${path}`));
    for (const [k, v] of Object.entries(options.query || {})) if (v !== undefined) url.searchParams.set(k, String(v));
    const headers: Record<string, string> = { accept: 'application/json', ...this.options.headers, ...options.headers };
    let payload: string | FormData | undefined;
    if (options.form) payload = options.form;
    else if (options.body !== undefined) {
      payload = JSON.stringify(options.body);
      headers['content-type'] = 'application/json';
    }
    const attempts = (this.options.retries ?? 3) + 1;
    let lastError: unknown;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      const started = Date.now();
      try {
        const res = await fetch(url, { method, headers, body: payload, signal: AbortSignal.timeout(this.options.timeoutMs ?? 30_000) });
        const text = await res.text();
        const data: unknown = text && (res.headers.get('content-type') || '').includes('json') ? safeJson(text) : text;
        this.log.debug(`${method} ${url.pathname} → ${res.status} (${Date.now() - started} ms)`);
        const ok = options.expect ? options.expect.includes(res.status) : res.ok;
        if (ok) return data as T;
        if (RETRYABLE.has(res.status) && attempt < attempts) {
          const retryAfter = Number(res.headers.get('retry-after'));
          await pause(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 400 * 2 ** (attempt - 1));
          continue;
        }
        throw new IntegrationError(`${this.options.name}: ${method} ${url.pathname} failed with ${res.status} ${describe(data)}`, res.status, data);
      } catch (error) {
        lastError = error;
        if (error instanceof IntegrationError) throw error;
        if (attempt === attempts) break;
        this.log.warn(`${method} ${url.pathname} network error (attempt ${attempt}/${attempts}): ${(error as Error).message}`);
        await pause(400 * 2 ** (attempt - 1));
      }
    }
    throw new IntegrationError(`${this.options.name}: ${method} ${url.pathname} unreachable — ${(lastError as Error)?.message || 'unknown error'}`);
  }
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function describe(data: unknown): string {
  if (!data) return '';
  if (typeof data === 'string') return `— ${data.slice(0, 200)}`;
  const d = data as { errorMessages?: string[]; errors?: Record<string, string>; message?: string };
  const parts = [...(d.errorMessages || []), ...Object.entries(d.errors || {}).map(([k, v]) => `${k}: ${v}`), d.message].filter(Boolean);
  return parts.length ? `— ${parts.join('; ').slice(0, 300)}` : `— ${JSON.stringify(data).slice(0, 200)}`;
}

export const basicAuth = (user: string, secret: string): string => `Basic ${Buffer.from(`${user}:${secret}`).toString('base64')}`;
