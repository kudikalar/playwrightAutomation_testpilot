import { expect, type Page, type Locator } from '@playwright/test';

/**
 * SearchBox — Search / filter input with submit
 * Used by: Documents
 */
export class SearchBox {
  readonly root: Locator;

  constructor(readonly page: Page) {
    this.root = page.getByRole('searchbox').or(page.locator('input[type="search"], input[name*="search" i], input[placeholder*="search" i]')).first();
  }

  async search(term: string): Promise<void> {
    await this.root.fill(term);
    await this.root.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async clear(): Promise<void> {
    await this.root.fill('');
    await this.root.press('Enter');
  }

  async expectUsable(): Promise<void> {
    await expect(this.root).toBeEditable();
  }
}
