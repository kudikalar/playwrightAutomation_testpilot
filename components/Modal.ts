import { expect, type Page, type Locator } from '@playwright/test';

/**
 * Modal — Dialog / modal handling: open, confirm, close
 * Used by: Health services
 */
export class Modal {
  readonly root: Locator;

  constructor(readonly page: Page) {
    this.root = page.getByRole('dialog').first();
  }

  async expectOpen(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async confirm(): Promise<void> {
    await this.root.getByRole('button', { name: /ok|confirm|yes|save|continue/i }).first().click();
  }

  async close(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await expect(this.root).toBeHidden();
  }
}
