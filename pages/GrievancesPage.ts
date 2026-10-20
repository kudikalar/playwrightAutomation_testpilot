import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Grievances — Displays grievances data in tabular form.
 * Module: Company · Route: /grievances · Risk: Low · Locator health: 95%
 */
export class GrievancesPage extends BasePage {
  readonly path = "/grievances";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/grievances(?:[?#].*)?$");
  readonly grievancesHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly raiseAGrievanceButton: Locator;
  readonly irdaiBimaBharosaLink: Locator;
  readonly insuranceOmbudsmanLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Grievances” · locator health 95% (Stable) */
    this.grievancesHeading = page.getByRole("heading", { name: "Grievances", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Raise a grievance button · locator health 95% (Stable) */
    this.raiseAGrievanceButton = page.getByRole("button", { name: "Raise a grievance" });
    /** IRDAI Bima Bharosa link · locator health 95% (Stable) */
    this.irdaiBimaBharosaLink = page.getByRole("link", { name: "IRDAI Bima Bharosa" });
    /** Insurance Ombudsman link · locator health 95% (Stable) */
    this.insuranceOmbudsmanLink = page.getByRole("link", { name: "Insurance Ombudsman" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.grievancesHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickRaiseAGrievance(): Promise<void> {
    await this.raiseAGrievanceButton.click();
  }

  async clickIrdaiBimaBharosa(): Promise<void> {
    await this.irdaiBimaBharosaLink.click();
  }

  async clickInsuranceOmbudsman(): Promise<void> {
    await this.insuranceOmbudsmanLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
