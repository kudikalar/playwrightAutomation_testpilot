import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';
import { Tabs } from '../components/Tabs';

/**
 * VHC-H-000001 — Summarises key metrics and recent activity, and acts as the main entry point after sign-in.
 * Module: Dashboard · Route: /policies/pol_39f05f4b5159 · Risk: Critical · Locator health: 95%
 */
export class VhcH000001Page extends BasePage {
  readonly path = "/policies/pol_39f05f4b5159";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/policies/pol_39f05f4b5159(?:[?#].*)?$");
  readonly vhcH000001Heading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly downloadPolicyPdfButton: Locator;
  readonly overviewButton: Locator;
  readonly claimsButton: Locator;
  readonly termsFrozenCopyButton: Locator;
  readonly documentsPaymentsButton: Locator;
  readonly customerInformationSheetButton: Locator;
  readonly policyWordingButton: Locator;
  readonly healthECardButton: Locator;
  readonly visionHealthCareSupportLink: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;
  readonly tabs: Tabs;

  constructor(page: Page) {
    super(page);
    /** Page heading “VHC-H-000001” · locator health 95% (Stable) */
    this.vhcH000001Heading = page.getByRole("heading", { name: "VHC-H-000001", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Download policy PDF button · locator health 95% (Stable) */
    this.downloadPolicyPdfButton = page.getByRole("button", { name: "Download policy PDF" });
    /** Overview tab · locator health 95% (Stable) */
    this.overviewButton = page.getByRole("tab", { name: "Overview" });
    /** Claims tab · locator health 95% (Stable) */
    this.claimsButton = page.getByRole("tab", { name: "Claims" });
    /** Terms (frozen copy) tab · locator health 95% (Stable) */
    this.termsFrozenCopyButton = page.getByRole("tab", { name: "Terms (frozen copy)" });
    /** Documents & payments tab · locator health 95% (Stable) */
    this.documentsPaymentsButton = page.getByRole("tab", { name: "Documents & payments" });
    /** Customer Information Sheet button · locator health 95% (Stable) */
    this.customerInformationSheetButton = page.getByRole("button", { name: "Customer Information Sheet" });
    /** Policy wording button · locator health 95% (Stable) */
    this.policyWordingButton = page.getByRole("button", { name: "Policy wording" });
    /** Health e-card button · locator health 95% (Stable) */
    this.healthECardButton = page.getByRole("button", { name: "Health e-card" });
    /** Vision Health Care support link · locator health 95% (Stable) */
    this.visionHealthCareSupportLink = page.getByRole("link", { name: "Vision Health Care support" });
    this.heading = this.vhcH000001Heading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
    this.tabs = new Tabs(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickDownloadPolicyPdf(): Promise<void> {
    await this.downloadPolicyPdfButton.click();
  }

  async clickOverview(): Promise<void> {
    await this.overviewButton.click();
  }

  async clickClaims(): Promise<void> {
    await this.claimsButton.click();
  }

  async clickTermsFrozenCopy(): Promise<void> {
    await this.termsFrozenCopyButton.click();
  }

  async clickDocumentsPayments(): Promise<void> {
    await this.documentsPaymentsButton.click();
  }

  async clickCustomerInformationShe(): Promise<void> {
    await this.customerInformationSheetButton.click();
  }

  async clickPolicyWording(): Promise<void> {
    await this.policyWordingButton.click();
  }

  async clickHealthECard(): Promise<void> {
    await this.healthECardButton.click();
  }

  async clickVisionHealthCareSuppo(): Promise<void> {
    await this.visionHealthCareSupportLink.click();
  }
}
