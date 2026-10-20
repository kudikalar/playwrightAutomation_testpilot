import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * CareConnect Telehealth — Displays careconnect telehealth data in tabular form.
 * Module: Company · Route: /hospitals/prv_tele_1 · Risk: Low · Locator health: 73%
 */
export class CareConnectTelehealthPage extends BasePage {
  readonly path = "/hospitals/prv_tele_1";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/hospitals/prv_tele_1(?:[?#].*)?$");
  readonly careConnectTelehealthHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly directionsLink: Locator;
  readonly bookAServiceLink: Locator;
  readonly bookLink: Locator;
  readonly bookLink2: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “CareConnect Telehealth” · locator health 95% (Stable) */
    this.careConnectTelehealthHeading = page.getByRole("heading", { name: "CareConnect Telehealth", exact: true });
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
    this.heading = this.careConnectTelehealthHeading;
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
}
