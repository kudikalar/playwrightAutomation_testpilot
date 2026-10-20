import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Vision Health Care — Content page presenting information about vision health care.
 * Module: Support & Help · Route: /support/kb/support-vs-grievance · Risk: Low · Locator health: 95%
 */
export class VisionHealthCarePage extends BasePage {
  readonly path = "/support/kb/support-vs-grievance";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/support/kb/support-vs-grievance(?:[?#].*)?$");
  readonly supportTicketGrievanceOrHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly allArticlesLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Support ticket, grievance or insurer complaint — which one do I need?” · locator health 95% (Stable) */
    this.supportTicketGrievanceOrHeading = page.getByRole("heading", { name: "Support ticket, grievance or insurer complaint — which one d", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** ← All articles link · locator health 95% (Stable) */
    this.allArticlesLink = page.getByRole("link", { name: "← All articles" });
    this.heading = this.supportTicketGrievanceOrHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAllArticles(): Promise<void> {
    await this.allArticlesLink.click();
  }
}
