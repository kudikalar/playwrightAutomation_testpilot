import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Sunrise Multispeciality Hospital — Displays sunrise multispeciality hospital data in tabular form.
 * Module: Company · Route: /hospitals/hsp_1 · Risk: Low · Locator health: 58%
 */
export class SunriseMultispecialityHospitalPage extends BasePage {
  readonly path = "/hospitals/hsp_1";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/hospitals/hsp_1(?:[?#].*)?$");
  readonly sunriseMultispecialityHospHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly directionsLink: Locator;
  readonly bookAServiceLink: Locator;
  readonly bookLink: Locator;
  readonly bookLink2: Locator;
  readonly bookLink3: Locator;
  readonly bookLink4: Locator;
  readonly bookLink5: Locator;
  readonly bookLink6: Locator;
  readonly n04440000009Link: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Sunrise Multispeciality Hospital” · locator health 95% (Stable) */
    this.sunriseMultispecialityHospHeading = page.getByRole("heading", { name: "Sunrise Multispeciality Hospital", exact: true });
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
    /** Book link · locator health 28% (Very Risky) */
    this.bookLink5 = page.locator("section:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(5) > td:nth-of-type(3) > a");
    /** Book link · locator health 28% (Very Risky) */
    this.bookLink6 = page.locator("section:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(6) > td:nth-of-type(3) > a");
    /** 044-40000009 link · locator health 95% (Stable) */
    this.n04440000009Link = page.getByRole("link", { name: "044-40000009" });
    this.heading = this.sunriseMultispecialityHospHeading;
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

  async clickBook5(): Promise<void> {
    await this.bookLink5.click();
  }

  async clickBook6(): Promise<void> {
    await this.bookLink6.click();
  }

  async click04440000009(): Promise<void> {
    await this.n04440000009Link.click();
  }
}
