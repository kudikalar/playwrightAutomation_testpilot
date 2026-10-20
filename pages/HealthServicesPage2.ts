import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { Toast } from '../components/Toast';

/**
 * Health services — Collects user input (Search, Type of service All Doctor consultation Specialist consultation Preventive health check Diagnostic lab test Imaging Teleconsultation Home sample collection Vaccination Follow-up visit, City).
 * Module: Services · Route: /services?hospitalId · Risk: Low · Locator health: 71%
 */
export class HealthServicesPage2 extends BasePage {
  readonly path = "/services";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/services(?:[?#].*)?$");
  readonly healthServicesHeading: Locator;
  readonly searchInput: Locator;
  readonly typeOfServiceAllDoctorCSelect: Locator;
  readonly cityInput: Locator;
  readonly searchButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly careConnectTelehealthLink: Locator;
  readonly bookButton: Locator;
  readonly careConnectTelehealthLink2: Locator;
  readonly bookButton2: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Health services” · locator health 95% (Stable) */
    this.healthServicesHeading = page.getByRole("heading", { name: "Health services", exact: true });
    /** Search field · locator health 95% (Stable) */
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    /** Type of service All Doctor consultation Specialist consultation Preventive health check Diagnostic lab test Imaging Teleconsultation Home sample collection Vaccination Follow-up visit field · locator health 95% (Stable) */
    this.typeOfServiceAllDoctorCSelect = page.getByRole("combobox", { name: "Type of service All Doctor consultation Specialist consultation Preventive healt" });
    /** City field · locator health 95% (Stable) */
    this.cityInput = page.getByRole("textbox", { name: "City" });
    /** Search button · locator health 95% (Stable) */
    this.searchButton = page.getByRole("button", { name: "Search" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** CareConnect Telehealth link · locator health 28% (Very Risky) */
    this.careConnectTelehealthLink = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(1) > div:nth-of-type(2) > a");
    /** Book button · locator health 28% (Very Risky) */
    this.bookButton = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(1) > div:nth-of-type(5) > button");
    /** CareConnect Telehealth link · locator health 28% (Very Risky) */
    this.careConnectTelehealthLink2 = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(2) > div:nth-of-type(2) > a");
    /** Book button · locator health 28% (Very Risky) */
    this.bookButton2 = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(2) > div:nth-of-type(5) > button");
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.healthServicesHeading;
    this.sidebar = new Sidebar(page);
    this.toast = new Toast(page);
  }

  async fillServiceFilters(data: { search?: string; typeOfServiceAllDoctorConsultationSpecialistConsultationPreventiveHealthCheckDiagnosticLabTestImagingTeleconsultationHomeSampleCollectionVaccinationFollowUpVisit?: string; city?: string }): Promise<void> {
    if (data.search !== undefined) await this.searchInput.fill(data.search);
    if (data.typeOfServiceAllDoctorConsultationSpecialistConsultationPreventiveHealthCheckDiagnosticLabTestImagingTeleconsultationHomeSampleCollectionVaccinationFollowUpVisit !== undefined) await this.typeOfServiceAllDoctorCSelect.selectOption({ label: data.typeOfServiceAllDoctorConsultationSpecialistConsultationPreventiveHealthCheckDiagnosticLabTestImagingTeleconsultationHomeSampleCollectionVaccinationFollowUpVisit }).catch(async () => { await this.typeOfServiceAllDoctorCSelect.selectOption({ index: 1 }); });
    if (data.city !== undefined) await this.cityInput.fill(data.city);
  }

  async submitServiceFilters(): Promise<void> {
    await this.searchButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickCareConnectTelehealth(): Promise<void> {
    await this.careConnectTelehealthLink.click();
  }

  async clickBook(): Promise<void> {
    await this.bookButton.click();
  }

  async clickCareConnectTelehealth2(): Promise<void> {
    await this.careConnectTelehealthLink2.click();
  }

  async clickBook2(): Promise<void> {
    await this.bookButton2.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
