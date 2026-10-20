import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { Tabs } from '../components/Tabs';

/**
 * VHC-L-000002 — Summarises key metrics and recent activity, and acts as the main entry point after sign-in.
 * Module: Dashboard · Route: /policies/pol_26b0b06501d2 · Risk: Critical · Locator health: 95%
 */
export class VhcL000002Page2 extends BasePage {
  readonly path = "/policies/pol_26b0b06501d2";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/policies/pol_26b0b06501d2(?:[?#].*)?$");
  readonly vhcL000002Heading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly downloadPolicyPdfButton: Locator;
  readonly overviewButton: Locator;
  readonly premiumScheduleButton: Locator;
  readonly nomineesButton: Locator;
  readonly termsFrozenCopyButton: Locator;
  readonly documentsPaymentsButton: Locator;
  readonly customerInformationSheetButton: Locator;
  readonly policyWordingButton: Locator;
  readonly visionHealthCareSupportLink: Locator;
  readonly sidebar: Sidebar;
  readonly tabs: Tabs;

  constructor(page: Page) {
    super(page);
    /** Page heading “VHC-L-000002” · locator health 95% (Stable) */
    this.vhcL000002Heading = page.getByRole("heading", { name: "VHC-L-000002", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Download policy PDF button · locator health 95% (Stable) */
    this.downloadPolicyPdfButton = page.getByRole("button", { name: "Download policy PDF" });
    /** Overview tab · locator health 95% (Stable) */
    this.overviewButton = page.getByRole("tab", { name: "Overview" });
    /** Premium schedule tab · locator health 95% (Stable) */
    this.premiumScheduleButton = page.getByRole("tab", { name: "Premium schedule" });
    /** Nominees tab · locator health 95% (Stable) */
    this.nomineesButton = page.getByRole("tab", { name: "Nominees" });
    /** Terms (frozen copy) tab · locator health 95% (Stable) */
    this.termsFrozenCopyButton = page.getByRole("tab", { name: "Terms (frozen copy)" });
    /** Documents & payments tab · locator health 95% (Stable) */
    this.documentsPaymentsButton = page.getByRole("tab", { name: "Documents & payments" });
    /** Customer Information Sheet button · locator health 95% (Stable) */
    this.customerInformationSheetButton = page.getByRole("button", { name: "Customer Information Sheet" });
    /** Policy wording button · locator health 95% (Stable) */
    this.policyWordingButton = page.getByRole("button", { name: "Policy wording" });
    /** Vision Health Care support link · locator health 95% (Stable) */
    this.visionHealthCareSupportLink = page.getByRole("link", { name: "Vision Health Care support" });
    this.heading = this.vhcL000002Heading;
    this.sidebar = new Sidebar(page);
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

  async clickPremiumSchedule(): Promise<void> {
    await this.premiumScheduleButton.click();
  }

  async clickNominees(): Promise<void> {
    await this.nomineesButton.click();
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

  async clickVisionHealthCareSuppo(): Promise<void> {
    await this.visionHealthCareSupportLink.click();
  }
}
