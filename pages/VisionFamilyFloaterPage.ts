import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Vision Family Floater — Summarises key metrics and recent activity, and acts as the main entry point after sign-in.
 * Module: Dashboard · Route: /applications/app_8671edd5918b · Risk: Critical · Locator health: 95%
 */
export class VisionFamilyFloaterPage extends BasePage {
  readonly path = "/applications/app_8671edd5918b";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/applications/app_8671edd5918b(?:[?#].*)?$");
  readonly visionFamilyFloaterHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly viewPolicyLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Vision Family Floater” · locator health 95% (Stable) */
    this.visionFamilyFloaterHeading = page.getByRole("heading", { name: "Vision Family Floater", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** View policy link · locator health 95% (Stable) */
    this.viewPolicyLink = page.getByRole("link", { name: "View policy" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.visionFamilyFloaterHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickViewPolicy(): Promise<void> {
    await this.viewPolicyLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
