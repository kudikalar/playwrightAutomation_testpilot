import { expect, type Page, type Response } from '@playwright/test';

/** Smart waits (§27): wait for something concrete — never a fixed sleep. */
export async function waitForSpinnerToClear(page: Page): Promise<void> {
  const spinner = page.locator('[aria-busy="true"], [role="progressbar"], .spinner, .loading, [class*="skeleton"]').first();
  if (await spinner.isVisible().catch(() => false)) await expect(spinner).toBeHidden({ timeout: 20_000 });
}
export function waitForApi(page: Page, method: string, pathPattern: RegExp): Promise<Response> {
  return page.waitForResponse((r) => r.request().method() === method && pathPattern.test(new URL(r.url()).pathname));
}
