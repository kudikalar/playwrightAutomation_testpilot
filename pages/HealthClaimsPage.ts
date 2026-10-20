import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Health claims — Displays health claims data in tabular form.
 * Module: Claims · Route: /claims · Risk: Low · Locator health: 95%
 */
export class HealthClaimsPage extends BasePage {
  readonly path = "/claims";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/claims(?:[?#].*)?$");
  readonly healthClaimsHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly intimateAClaimLink: Locator;
  readonly newClaimLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Health claims” · locator health 95% (Stable) */
    this.healthClaimsHeading = page.getByRole("heading", { name: "Health claims", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Intimate a claim link · locator health 95% (Stable) */
    this.intimateAClaimLink = page.getByRole("link", { name: "Intimate a claim" });
    /** New claim link · locator health 95% (Stable) */
    this.newClaimLink = page.getByRole("link", { name: "New claim" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.healthClaimsHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickIntimateAClaim(): Promise<void> {
    await this.intimateAClaimLink.click();
  }

  async clickNewClaim(): Promise<void> {
    await this.newClaimLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
