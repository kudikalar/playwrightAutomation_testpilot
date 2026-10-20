import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Your data rights: export and deletion — Part of the Support & Help module; provides navigation to related screens.
 * Module: Support & Help · Route: /support/kb/data-rights · Risk: Medium · Locator health: 95%
 */
export class SupportKbDataRightsPage extends BasePage {
  readonly path = "/support/kb/data-rights";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/support/kb/data-rights(?:[?#].*)?$");
  readonly yourDataRightsExportAndHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly allArticlesLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Your data rights: export and deletion” · locator health 95% (Stable) */
    this.yourDataRightsExportAndHeading = page.getByRole("heading", { name: "Your data rights: export and deletion", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** ← All articles link · locator health 95% (Stable) */
    this.allArticlesLink = page.getByRole("link", { name: "← All articles" });
    this.heading = this.yourDataRightsExportAndHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAllArticles(): Promise<void> {
    await this.allArticlesLink.click();
  }
}
