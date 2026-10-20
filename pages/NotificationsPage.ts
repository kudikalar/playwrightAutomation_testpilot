import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Notifications — Displays notifications data in tabular form.
 * Module: Notifications & Messages · Route: /notifications · Risk: Medium · Locator health: 95%
 */
export class NotificationsPage extends BasePage {
  readonly path = "/notifications";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/notifications(?:[?#].*)?$");
  readonly notificationsHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly markAllReadButton: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Notifications” · locator health 95% (Stable) */
    this.notificationsHeading = page.getByRole("heading", { name: "Notifications", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Mark all read button · locator health 95% (Stable) */
    this.markAllReadButton = page.getByRole("button", { name: "Mark all read" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.notificationsHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickMarkAllRead(): Promise<void> {
    await this.markAllReadButton.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
