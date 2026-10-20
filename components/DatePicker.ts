import { expect, type Page, type Locator } from '@playwright/test';

/**
 * DatePicker — Date input / picker
 * Used by: Quote calculator, Find hospitals & providers, Report a life insurance claim, Vision Health Care, Quote calculator, Health services, Your profile, Claim payout estimator, Intimate a claim, New health claim
 */
export class DatePicker {
  readonly root: Locator;

  constructor(readonly page: Page) {
    this.root = page.locator('input[type="date"], [class*="datepicker"] input').first();
  }

  async set(isoDate: string): Promise<void> {
    await this.root.fill(isoDate);
  }
}
