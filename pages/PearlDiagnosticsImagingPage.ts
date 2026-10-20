import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Pearl Diagnostics & Imaging — Displays pearl diagnostics & imaging data in tabular form.
 * Module: Company · Route: /hospitals/prv_diag_1 · Risk: Low · Locator health: 68%
 */
export class PearlDiagnosticsImagingPage extends BasePage {
  readonly path = "/hospitals/prv_diag_1";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/hospitals/prv_diag_1(?:[?#].*)?$");
  readonly pearlDiagnosticsImagingHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly directionsLink: Locator;
  readonly bookAServiceLink: Locator;
  readonly bookLink: Locator;
  readonly bookLink2: Locator;
  readonly bookLink3: Locator;
  readonly bookLink4: Locator;
  readonly n04040000102Link: Locator;
  readonly insurancePearlDiagnosticsLink: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Pearl Diagnostics & Imaging” · locator health 95% (Stable) */
    this.pearlDiagnosticsImagingHeading = page.getByRole("heading", { name: "Pearl Diagnostics & Imaging", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Directions link · locator health 95% (Stable) */
    this.directionsLink = page.getByRole("link", { name: "Directions" });
    /** Book a service link · locator health 95% (Stable) */
    this.bookAServiceLink = page.getByRole("link", { name: "Book a service" });
    /** Book link · locator health 28% (Very Risky) */
    this.bookLink = page.locator("section:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(3) > a");
    /** Book link · locator health 28% (Very Risky) */
    this.bookLink2 = page.locator("section:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(2) > td:nth-of-type(3) > a");
    /** Book link · locator health 28% (Very Risky) */
    this.bookLink3 = page.locator("section:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(3) > td:nth-of-type(3) > a");
    /** Book link · locator health 28% (Very Risky) */
    this.bookLink4 = page.locator("section:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(4) > td:nth-of-type(3) > a");
    /** 040-4000-0102 link · locator health 95% (Stable) */
    this.n04040000102Link = page.getByRole("link", { name: "040-4000-0102" });
    /** insurance@pearl-diagnostics.test link · locator health 95% (Stable) */
    this.insurancePearlDiagnosticsLink = page.getByRole("link", { name: "insurance@pearl-diagnostics.test" });
    this.heading = this.pearlDiagnosticsImagingHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickDirections(): Promise<void> {
    await this.directionsLink.click();
  }

  async clickBookAService(): Promise<void> {
    await this.bookAServiceLink.click();
  }

  async clickBook(): Promise<void> {
    await this.bookLink.click();
  }

  async clickBook2(): Promise<void> {
    await this.bookLink2.click();
  }

  async clickBook3(): Promise<void> {
    await this.bookLink3.click();
  }

  async clickBook4(): Promise<void> {
    await this.bookLink4.click();
  }

  async click04040000102(): Promise<void> {
    await this.n04040000102Link.click();
  }

  async clickInsurancePearlDiagnost(): Promise<void> {
    await this.insurancePearlDiagnosticsLink.click();
  }
}
