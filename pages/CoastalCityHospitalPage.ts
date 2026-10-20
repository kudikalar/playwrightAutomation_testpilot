import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Coastal City Hospital — Content page presenting information about coastal city hospital.
 * Module: Company · Route: /hospitals/hsp_7 · Risk: Low · Locator health: 95%
 */
export class CoastalCityHospitalPage extends BasePage {
  readonly path = "/hospitals/hsp_7";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/hospitals/hsp_7(?:[?#].*)?$");
  readonly coastalCityHospitalHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly directionsLink: Locator;
  readonly bookAServiceLink: Locator;
  readonly n04440000009Link: Locator;
  readonly insurance7HospitalTestLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Coastal City Hospital” · locator health 95% (Stable) */
    this.coastalCityHospitalHeading = page.getByRole("heading", { name: "Coastal City Hospital", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Directions link · locator health 95% (Stable) */
    this.directionsLink = page.getByRole("link", { name: "Directions" });
    /** Book a service link · locator health 95% (Stable) */
    this.bookAServiceLink = page.getByRole("link", { name: "Book a service" });
    /** 044-40000009 link · locator health 95% (Stable) */
    this.n04440000009Link = page.getByRole("link", { name: "044-40000009" });
    /** insurance7@hospital.test link · locator health 95% (Stable) */
    this.insurance7HospitalTestLink = page.getByRole("link", { name: "insurance7@hospital.test" });
    this.heading = this.coastalCityHospitalHeading;
    this.sidebar = new Sidebar(page);
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

  async clickInsurance7HospitalTest(): Promise<void> {
    await this.insurance7HospitalTestLink.click();
  }
}
