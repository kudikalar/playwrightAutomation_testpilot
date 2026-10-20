import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * My payment failed or is pending — what now? — Part of the Support & Help module; provides navigation to related screens.
 * Module: Support & Help · Route: /support/kb/payment-failed · Risk: Critical · Locator health: 95%
 */
export class SupportKbPaymentFailedPage extends BasePage {
  readonly path = "/support/kb/payment-failed";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/support/kb/payment-failed(?:[?#].*)?$");
  readonly myPaymentFailedOrIsPendHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly allArticlesLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “My payment failed or is pending — what now?” · locator health 95% (Stable) */
    this.myPaymentFailedOrIsPendHeading = page.getByRole("heading", { name: "My payment failed or is pending — what now?", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** ← All articles link · locator health 95% (Stable) */
    this.allArticlesLink = page.getByRole("link", { name: "← All articles" });
    this.heading = this.myPaymentFailedOrIsPendHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAllArticles(): Promise<void> {
    await this.allArticlesLink.click();
  }
}
