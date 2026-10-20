import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Riverbank General Hospital — Displays riverbank general hospital data in tabular form.
 * Module: Company · Route: /hospitals/hsp_5 · Risk: Low · Locator health: 95%
 */
export class RiverbankGeneralHospitalPage extends BasePage {
  readonly path = "/hospitals/hsp_5";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/hospitals/hsp_5(?:[?#].*)?$");
  readonly riverbankGeneralHospitalHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly directionsLink: Locator;
  readonly bookAServiceLink: Locator;
  readonly n04440000009Link: Locator;
  readonly insurance5HospitalTestLink: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Riverbank General Hospital” · locator health 95% (Stable) */
    this.riverbankGeneralHospitalHeading = page.getByRole("heading", { name: "Riverbank General Hospital", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Directions link · locator health 95% (Stable) */
    this.directionsLink = page.getByRole("link", { name: "Directions" });
    /** Book a service link · locator health 95% (Stable) */
    this.bookAServiceLink = page.getByRole("link", { name: "Book a service" });
    /** 044-40000009 link · locator health 95% (Stable) */
    this.n04440000009Link = page.getByRole("link", { name: "044-40000009" });
    /** insurance5@hospital.test link · locator health 95% (Stable) */
    this.insurance5HospitalTestLink = page.getByRole("link", { name: "insurance5@hospital.test" });
    this.heading = this.riverbankGeneralHospitalHeading;
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

  async click04440000009(): Promise<void> {
    await this.n04440000009Link.click();
  }

  async clickInsurance5HospitalTest(): Promise<void> {
    await this.insurance5HospitalTestLink.click();
  }
}
