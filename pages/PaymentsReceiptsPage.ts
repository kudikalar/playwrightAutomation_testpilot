import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Payments & receipts — Displays payments & receipts data in tabular form.
 * Module: Orders & Checkout · Route: /payments · Risk: Critical · Locator health: 50%
 */
export class PaymentsReceiptsPage extends BasePage {
  readonly path = "/payments";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/payments(?:[?#].*)?$");
  readonly paymentsReceiptsHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly receiptButton: Locator;
  readonly pdfButton: Locator;
  readonly invoiceButton: Locator;
  readonly receiptButton2: Locator;
  readonly pdfButton2: Locator;
  readonly invoiceButton2: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Payments & receipts” · locator health 95% (Stable) */
    this.paymentsReceiptsHeading = page.getByRole("heading", { name: "Payments & receipts", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Receipt button · locator health 28% (Very Risky) */
    this.receiptButton = page.locator("div > table > tbody > tr:nth-of-type(1) > td:nth-of-type(7) > div > button:nth-of-type(1)");
    /** PDF button · locator health 28% (Very Risky) */
    this.pdfButton = page.locator("div > table > tbody > tr:nth-of-type(1) > td:nth-of-type(7) > div > button:nth-of-type(2)");
    /** Invoice button · locator health 28% (Very Risky) */
    this.invoiceButton = page.locator("div > table > tbody > tr:nth-of-type(1) > td:nth-of-type(7) > div > button:nth-of-type(3)");
    /** Receipt button · locator health 28% (Very Risky) */
    this.receiptButton2 = page.locator("div > table > tbody > tr:nth-of-type(2) > td:nth-of-type(7) > div > button:nth-of-type(1)");
    /** PDF button · locator health 28% (Very Risky) */
    this.pdfButton2 = page.locator("div > table > tbody > tr:nth-of-type(2) > td:nth-of-type(7) > div > button:nth-of-type(2)");
    /** Invoice button · locator health 28% (Very Risky) */
    this.invoiceButton2 = page.locator("div > table > tbody > tr:nth-of-type(2) > td:nth-of-type(7) > div > button:nth-of-type(3)");
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.paymentsReceiptsHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickReceipt(): Promise<void> {
    await this.receiptButton.click();
  }

  async clickPdf(): Promise<void> {
    await this.pdfButton.click();
  }

  async clickInvoice(): Promise<void> {
    await this.invoiceButton.click();
  }

  async clickReceipt2(): Promise<void> {
    await this.receiptButton2.click();
  }

  async clickPdf2(): Promise<void> {
    await this.pdfButton2.click();
  }

  async clickInvoice2(): Promise<void> {
    await this.invoiceButton2.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
