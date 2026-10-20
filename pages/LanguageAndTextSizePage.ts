import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Language and text size — Part of the Support & Help module; provides navigation to related screens.
 * Module: Support & Help · Route: /support/kb/languages-accessibility · Risk: Low · Locator health: 95%
 */
export class LanguageAndTextSizePage extends BasePage {
  readonly path = "/support/kb/languages-accessibility";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/support/kb/languages-accessibility(?:[?#].*)?$");
  readonly languageAndTextSizeHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly allArticlesLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Language and text size” · locator health 95% (Stable) */
    this.languageAndTextSizeHeading = page.getByRole("heading", { name: "Language and text size", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** ← All articles link · locator health 95% (Stable) */
    this.allArticlesLink = page.getByRole("link", { name: "← All articles" });
    this.heading = this.languageAndTextSizeHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAllArticles(): Promise<void> {
    await this.allArticlesLink.click();
  }
}
