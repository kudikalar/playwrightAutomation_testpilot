import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';
import { Tabs } from '../components/Tabs';
import { Toast } from '../components/Toast';

/**
 * VHC-L-000002 — Displays vhc-l-000002 data in tabular form.
 * Module: Policies · Route: /policies/pol_26b0b06501d2?tab · Risk: Low · Locator health: 95%
 */
export class VhcL000002Page extends BasePage {
  readonly path = "/policies/pol_26b0b06501d2";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/policies/pol_26b0b06501d2(?:[?#].*)?$");
  readonly vhcL000002Heading: Locator;
  readonly autoPaySimulatedDebitDuCheckbox: Locator;
  readonly payInstallment299880Button: Locator;
  readonly skipToMainContentLink: Locator;
  readonly downloadPolicyPdfButton: Locator;
  readonly overviewButton: Locator;
  readonly premiumScheduleButton: Locator;
  readonly nomineesButton: Locator;
  readonly termsFrozenCopyButton: Locator;
  readonly documentsPaymentsButton: Locator;
  readonly showAll300InstallmentsButton: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;
  readonly tabs: Tabs;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “VHC-L-000002” · locator health 95% (Stable) */
    this.vhcL000002Heading = page.getByRole("heading", { name: "VHC-L-000002", exact: true });
    /** Auto-pay (simulated debit due date) field · locator health 95% (Stable) */
    this.autoPaySimulatedDebitDuCheckbox = page.getByRole("checkbox", { name: "Auto-pay (simulated debit due date)" });
    /** Pay installment 2 · ₹998.80 button · locator health 95% (Stable) */
    this.payInstallment299880Button = page.getByRole("button", { name: "Pay installment 2 · ₹998.80" });
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
    /** Show all 300 installments button · locator health 95% (Stable) */
    this.showAll300InstallmentsButton = page.getByRole("button", { name: "Show all 300 installments" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.vhcL000002Heading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
    this.tabs = new Tabs(page);
    this.toast = new Toast(page);
  }

  async fillPremiumSchedule(data: { autoPaySimulatedDebitDueDate?: boolean }): Promise<void> {
    if (data.autoPaySimulatedDebitDueDate !== undefined) await this.autoPaySimulatedDebitDuCheckbox.setChecked(data.autoPaySimulatedDebitDueDate);
  }

  async submitPremiumSchedule(): Promise<void> {
    await this.payInstallment299880Button.click();
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

  async clickShowAll300Installment(): Promise<void> {
    await this.showAll300InstallmentsButton.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
