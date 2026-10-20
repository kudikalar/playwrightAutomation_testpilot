import { expect, type Page, type Locator } from '@playwright/test';

/**
 * FileUpload — File upload widget
 * Used by: Claim HC-SEED-000001, No update on my reimbursement claim
 */
export class FileUpload {
  readonly root: Locator;

  constructor(readonly page: Page) {
    this.root = page.locator('input[type="file"]').first();
  }

  async upload(filePath: string): Promise<void> {
    await this.root.setInputFiles(filePath);
  }
}
