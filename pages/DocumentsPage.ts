import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { SearchBox } from '../components/SearchBox';
import { Toast } from '../components/Toast';

/**
 * Documents — Collects user input (Search, Type All types, Record All records).
 * Module: Documents · Route: /documents · Risk: High · Locator health: 68%
 */
export class DocumentsPage extends BasePage {
  readonly path = "/documents";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/documents(?:[?#].*)?$");
  readonly documentsHeading: Locator;
  readonly searchInput: Locator;
  readonly typeAllTypesSelect: Locator;
  readonly recordAllRecordsSelect: Locator;
  readonly downloadPdfButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly openPolicyLink: Locator;
  readonly downloadPdfButton2: Locator;
  readonly openPolicyLink2: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly searchBox: SearchBox;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Documents” · locator health 95% (Stable) */
    this.documentsHeading = page.getByRole("heading", { name: "Documents", exact: true });
    /** Search field · locator health 95% (Stable) */
    this.searchInput = page.getByRole("searchbox", { name: "Search" });
    /** Type All types field · locator health 95% (Stable) */
    this.typeAllTypesSelect = page.getByRole("combobox", { name: "Type All types" });
    /** Record All records field · locator health 95% (Stable) */
    this.recordAllRecordsSelect = page.getByRole("combobox", { name: "Record All records" });
    /** Download PDF button · locator health 28% (Very Risky) */
    this.downloadPdfButton = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > button");
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Open policy link · locator health 28% (Very Risky) */
    this.openPolicyLink = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > a");
    /** Download PDF button · locator health 28% (Very Risky) */
    this.downloadPdfButton2 = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > button");
    /** Open policy link · locator health 28% (Very Risky) */
    this.openPolicyLink2 = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > a");
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.documentsHeading;
    this.sidebar = new Sidebar(page);
    this.searchBox = new SearchBox(page);
    this.toast = new Toast(page);
  }

  async fillDocuments(data: { search?: string; typeAllTypes?: string; recordAllRecords?: string }): Promise<void> {
    if (data.search !== undefined) await this.searchInput.fill(data.search);
    if (data.typeAllTypes !== undefined) await this.typeAllTypesSelect.selectOption({ label: data.typeAllTypes }).catch(async () => { await this.typeAllTypesSelect.selectOption({ index: 1 }); });
    if (data.recordAllRecords !== undefined) await this.recordAllRecordsSelect.selectOption({ label: data.recordAllRecords }).catch(async () => { await this.recordAllRecordsSelect.selectOption({ index: 1 }); });
  }

  async submitDocuments(): Promise<void> {
    await this.downloadPdfButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickOpenPolicy(): Promise<void> {
    await this.openPolicyLink.click();
  }

  async clickDownloadPdf(): Promise<void> {
    await this.downloadPdfButton2.click();
  }

  async clickOpenPolicy2(): Promise<void> {
    await this.openPolicyLink2.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
