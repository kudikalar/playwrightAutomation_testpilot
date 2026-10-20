import { expect, type Page, type Locator } from '@playwright/test';

/**
 * Tabs — Tab list navigation
 * Used by: Compare insurance, Quote calculator, Compare insurance, Quote calculator, Your profile, Portability & migration, VHC-L-000002, VHC-H-000001, VHC-L-000002
 */
export class Tabs {
  readonly root: Locator;

  constructor(readonly page: Page) {
    this.root = page.getByRole('tablist').first();
  }

  async open(name: string | RegExp): Promise<void> {
    await this.root.getByRole('tab', { name }).click();
  }
}
