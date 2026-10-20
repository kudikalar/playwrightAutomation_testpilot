import { test as base, expect, type Page } from '@playwright/test';
import { watch } from '../utils/diagnostics';
import { STORAGE } from '../auth/storage';

type RoleFixtures = { customerAshaPage: Page };

/**
 * Every page is watched for console errors and failed APIs (see utils/diagnostics).
 * Role fixtures open an already-authenticated page from saved storage state, so one test can act as several users:
 *   test('approval', async ({ customerAshaPage }) => { ... })
 */
export const test = base.extend<RoleFixtures>({
  page: async ({ page }, use) => { watch(page); await use(page); },
  customerAshaPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: STORAGE.customerAsha });
    const page = await context.newPage();
    watch(page);
    await use(page);
    await context.close();
  },
});
export { expect };
