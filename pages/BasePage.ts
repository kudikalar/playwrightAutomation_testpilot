import { expect, type Page, type Locator } from '@playwright/test';

/** Shared page behaviour. Subclasses declare their path, URL pattern and locators. */
export abstract class BasePage {
  abstract readonly path: string;
  abstract readonly urlPattern: RegExp;
  heading?: Locator;

  constructor(readonly page: Page) { }

  async goto(): Promise<void> {
    // wait for the page's HTML, not for every image/script/tracker: one slow third-party file must not fail the test
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(this.urlPattern);
    if (this.heading) await expect(this.heading).toBeVisible();
  }

  /** Validation feedback: native :invalid fields, aria-invalid, or an alert region. */
  async expectValidationShown(): Promise<void> {
    await expect.poll(async () => this.page.evaluate(() =>
      document.querySelectorAll(':invalid, [aria-invalid="true"]').length + [...document.querySelectorAll('[role="alert"], .error, .invalid-feedback')].filter((e) => (e as HTMLElement).innerText.trim()).length,
    ), { message: 'validation feedback is shown' }).toBeGreaterThan(0);
  }
}
