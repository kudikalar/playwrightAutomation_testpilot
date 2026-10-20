import type { APIRequestContext } from '@playwright/test';

/**
 * Data lifecycle (§45–46). Records created by tests carry the run marker from utils/unique.
 * Cleanup runs only outside production; production cleanup stays manual and restricted.
 */
export async function cleanupCreatedData(request: APIRequestContext, created: { endpoint: string; id: string }[]): Promise<void> {
  if ((process.env.TEST_ENV || '').toLowerCase().startsWith('prod')) return;
  for (const c of created) await request.delete(`${c.endpoint}/${c.id}`).catch(() => undefined);
}
