/** Resolve after `ms` — for back-off between retries of external calls only, never inside UI tests. */
export const pause = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export interface RetryOptions {
  attempts?: number;
  delayMs?: number;
  factor?: number;
  maxDelayMs?: number;
  retryIf?: (error: unknown, attempt: number) => boolean;
  onRetry?: (error: unknown, attempt: number, delayMs: number) => void;
}

/** Exponential back-off with jitter for flaky *infrastructure* (APIs, uploads) — not for hiding product defects. */
export async function retry<T>(fn: (attempt: number) => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { attempts = 3, delayMs = 500, factor = 2, maxDelayMs = 10_000, retryIf = () => true, onRetry } = options;
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;
      if (attempt === attempts || !retryIf(error, attempt)) break;
      const wait = Math.min(maxDelayMs, delayMs * factor ** (attempt - 1)) * (0.8 + Math.random() * 0.4);
      onRetry?.(error, attempt, Math.round(wait));
      await pause(wait);
    }
  }
  throw lastError;
}

/** Run async tasks with bounded concurrency, preserving input order in the result. */
export async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}
