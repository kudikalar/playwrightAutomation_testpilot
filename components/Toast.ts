import { expect, type Page, type Locator } from '@playwright/test';

/**
 * Toast — Notifications: toasts, banners, inline alerts
 * Used by: Health insurance, explained honestly., Compare insurance, Quote calculator, Find hospitals & providers, Coverage needs planner, Report a life insurance claim, Support, Health services, Vision Health Care, My payment failed or is pending — what now?, Cashless treatment at a network hospital, Your data rights: export and deletion (+42)
 */
export class Toast {
  readonly root: Locator;

  constructor(readonly page: Page) {
    this.root = page.locator('[role="status"], [role="alert"], [aria-live], .toast, [class*="snackbar"]').first();
  }

  /** Toast intelligence (§121): a successful action must confirm itself to the user. */
  async expectMessage(text: string | RegExp): Promise<void> {
    await expect(this.root).toContainText(text);
  }

  async expectSuccess(): Promise<void> {
    await expect(this.root).toContainText(/success|saved|created|updated/i);
  }
}
