import fs from 'node:fs';
import path from 'node:path';
import { test as setup, expect } from '@playwright/test';

import { STORAGE } from './storage';

const save = async (state: string, write: () => Promise<unknown>) => { fs.mkdirSync(path.dirname(state), { recursive: true }); await write(); };

setup('authenticate as customerAsha (demo account “Customer (Asha)”)', async ({ page }) => {
  // the sign-in page offers one-click demo accounts — the same entry the scan used
  await page.goto("/login");
  await page.getByRole('button', { name: "Customer (Asha)", exact: true }).click();
  // some demo buttons only pre-fill the form: submit it when the page is still on sign-in
  const left = await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 8000 }).then(() => true, () => false);
  if (!left) await page.getByRole('button', { name: /^(sign ?in|log ?in|continue)$/i }).first().click();
  await expect(page).not.toHaveURL(/\/(login|sign-?in)(?:[?#]|$)/i, { timeout: 20000 });
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await save(STORAGE.customerAsha, () => page.context().storageState({ path: STORAGE.customerAsha }));
});
