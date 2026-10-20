import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * My applications — Displays my applications data in tabular form.
 * Module: Applications · Route: /applications · Risk: Low · Locator health: 95%
 */
export class MyApplicationsPage extends BasePage {
  readonly path = "/applications";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/applications(?:[?#].*)?$");
  readonly myApplicationsHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly newApplicationLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “My applications” · locator health 95% (Stable) */
    this.myApplicationsHeading = page.getByRole("heading", { name: "My applications", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** New application link · locator health 95% (Stable) */
    this.newApplicationLink = page.getByRole("link", { name: "New application" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.myApplicationsHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickNewApplication(): Promise<void> {
    await this.newApplicationLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
