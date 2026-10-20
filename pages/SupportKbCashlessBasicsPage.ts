import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Cashless treatment at a network hospital — Part of the Support & Help module; provides navigation to related screens.
 * Module: Support & Help · Route: /support/kb/cashless-basics · Risk: Low · Locator health: 95%
 */
export class SupportKbCashlessBasicsPage extends BasePage {
  readonly path = "/support/kb/cashless-basics";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/support/kb/cashless-basics(?:[?#].*)?$");
  readonly cashlessTreatmentAtANetwHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly allArticlesLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Cashless treatment at a network hospital” · locator health 95% (Stable) */
    this.cashlessTreatmentAtANetwHeading = page.getByRole("heading", { name: "Cashless treatment at a network hospital", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** ← All articles link · locator health 95% (Stable) */
    this.allArticlesLink = page.getByRole("link", { name: "← All articles" });
    this.heading = this.cashlessTreatmentAtANetwHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAllArticles(): Promise<void> {
    await this.allArticlesLink.click();
  }
}
