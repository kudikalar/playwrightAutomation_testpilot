import { expect, type Page } from '@playwright/test';

type Diagnostics = { consoleErrors: string[]; failedApis: string[]; ignore: RegExp[] };
const store = new WeakMap<Page, Diagnostics>();

/** Attach console + network listeners once per page. The fixtures call this automatically. */
export function watch(page: Page): Diagnostics {
  const existing = store.get(page);
  if (existing) return existing;
  // "Failed to load resource … 401/403" is the browser echoing a session probe (e.g. GET /api/auth/me while signed out) —
  // expected for anonymous visitors; real API failures are still caught below from the network responses (5xx)
  const d: Diagnostics = { consoleErrors: [], failedApis: [], ignore: [/favicon/i, /ERR_BLOCKED_BY_CLIENT/, /Failed to load resource: the server responded with a status of 40[13]\b/] };
  page.on('console', (m) => { if (m.type() === 'error' && !d.ignore.some((r) => r.test(m.text()))) d.consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => d.consoleErrors.push(`Uncaught ${e.name}: ${e.message}`));
  page.on('response', (r) => {
    const type = r.request().resourceType();
    if ((type === 'xhr' || type === 'fetch') && r.status() >= 500) d.failedApis.push(`${r.request().method()} ${new URL(r.url()).pathname} → ${r.status()}`);
  });
  store.set(page, d);
  return d;
}

/** UI + API health assertion: no uncaught errors and no server failures behind the screen. */
export async function expectHealthy(page: Page): Promise<void> {
  const d = watch(page);
  await page.waitForLoadState('networkidle').catch(() => undefined);
  expect.soft(d.consoleErrors, 'Browser console errors').toEqual([]);
  expect(d.failedApis, 'Failed API calls (5xx)').toEqual([]);
}
export function expectNoConsoleErrors(page: Page): void { expect(watch(page).consoleErrors, 'Browser console errors').toEqual([]); }
export function expectNoFailedApis(page: Page): void { expect(watch(page).failedApis, 'Failed API calls (5xx)').toEqual([]); }

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  expect(m.sw, `content width ${m.sw}px vs viewport ${m.iw}px`).toBeLessThanOrEqual(m.iw + 1);
}

export async function pageLoadTime(page: Page): Promise<number> {
  return page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined; return n ? Math.round(n.loadEventEnd || n.domContentLoadedEventEnd) : 0; });
}

export async function expectNotBlank(page: Page): Promise<void> {
  const text = (await page.locator('body').innerText()).trim();
  expect(text.length, 'page renders meaningful content').toBeGreaterThan(20);
}
