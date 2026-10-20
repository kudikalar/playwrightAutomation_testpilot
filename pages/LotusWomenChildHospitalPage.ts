import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Lotus Women & Child Hospital — Displays lotus women & child hospital data in tabular form.
 * Module: Company · Route: /hospitals/hsp_4 · Risk: Low · Locator health: 78%
 */
export class LotusWomenChildHospitalPage extends BasePage {
  readonly path = "/hospitals/hsp_4";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/hospitals/hsp_4(?:[?#].*)?$");
  readonly lotusWomenChildHospitalHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly directionsLink: Locator;
  readonly bookAServiceLink: Locator;
  readonly bookLink: Locator;
  readonly bookLink2: Locator;
  readonly n04440000009Link: Locator;
  readonly insurance4HospitalTestLink: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Lotus Women & Child Hospital” · locator health 95% (Stable) */
    this.lotusWomenChildHospitalHeading = page.getByRole("heading", { name: "Lotus Women & Child Hospital", exact: true });
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
    /** 044-40000009 link · locator health 95% (Stable) */
    this.n04440000009Link = page.getByRole("link", { name: "044-40000009" });
    /** insurance4@hospital.test link · locator health 95% (Stable) */
    this.insurance4HospitalTestLink = page.getByRole("link", { name: "insurance4@hospital.test" });
    this.heading = this.lotusWomenChildHospitalHeading;
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

  async click04440000009(): Promise<void> {
    await this.n04440000009Link.click();
  }

  async clickInsurance4HospitalTest(): Promise<void> {
    await this.insurance4HospitalTestLink.click();
  }
}
