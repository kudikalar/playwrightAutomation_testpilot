import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';
import { DatePicker } from '../components/DatePicker';

/**
 * Claim payout estimator — Displays claim payout estimator data in tabular form.
 * Module: Claims · Route: /claims/estimate · Risk: Critical · Locator health: 95%
 */
export class ClaimPayoutEstimatorPage extends BasePage {
  readonly path = "/claims/estimate";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/claims/estimate(?:[?#].*)?$");
  readonly claimPayoutEstimatorHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly startAClaimLink: Locator;
  readonly askVisionAiLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;
  readonly datePicker: DatePicker;

  constructor(page: Page) {
    super(page);
    /** Page heading “Claim payout estimator” · locator health 95% (Stable) */
    this.claimPayoutEstimatorHeading = page.getByRole("heading", { name: "Claim payout estimator", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Start a claim link · locator health 95% (Stable) */
    this.startAClaimLink = page.getByRole("link", { name: "Start a claim" });
    /** Ask Vision AI link · locator health 95% (Stable) */
    this.askVisionAiLink = page.getByRole("link", { name: "Ask Vision AI" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.claimPayoutEstimatorHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
    this.datePicker = new DatePicker(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickStartAClaim(): Promise<void> {
    await this.startAClaimLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiLink.click();
  }

  async clickAskVisionAi2(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
