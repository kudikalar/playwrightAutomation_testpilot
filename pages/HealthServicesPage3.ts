import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { Modal } from '../components/Modal';
import { DatePicker } from '../components/DatePicker';
import { Toast } from '../components/Toast';

/**
 * Health services — Collects user input (Search, Type of service All Doctor consultation Specialist consultation Preventive health check Diagnostic lab test Imaging Teleconsultation Home sample collection Vaccination Follow-up visit, City).
 * Module: Services · Route: /services?serviceId · Risk: Low · Locator health: 66%
 */
export class HealthServicesPage3 extends BasePage {
  readonly path = "/services";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/services(?:[?#].*)?$");
  readonly healthServicesHeading: Locator;
  readonly searchInput: Locator;
  readonly typeOfServiceAllDoctorCSelect: Locator;
  readonly cityInput: Locator;
  readonly searchButton: Locator;
  readonly dateInput: Locator;
  readonly selfPay39900SelfPayRadio: Locator;
  readonly discountedSelfPay3490Radio: Locator;
  readonly insuredCashlessRequestIRadio: Locator;
  readonly patientNameLeaveBlankIfInput: Locator;
  readonly button: Locator;
  readonly skipToMainContentLink: Locator;
  readonly careConnectTelehealthLink: Locator;
  readonly bookButton: Locator;
  readonly careConnectTelehealthLink2: Locator;
  readonly bookButton2: Locator;
  readonly greenValleyMedicalCentreLink: Locator;
  readonly bookButton3: Locator;
  readonly greenValleyMedicalCentreLink2: Locator;
  readonly bookButton4: Locator;
  readonly harbourCareHospitalLink: Locator;
  readonly sidebar: Sidebar;
  readonly modal: Modal;
  readonly datePicker: DatePicker;
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
    /** Date field · locator health 95% (Stable) */
    this.dateInput = page.getByRole("textbox", { name: "Date" });
    /** Self-pay — ₹399.00 Self-pay — you pay the provider's listed price; not billed to insurance. field · locator health 95% (Stable) */
    this.selfPay39900SelfPayRadio = page.getByRole("radio", { name: "Self-pay — ₹399.00 Self-pay — you pay the provider's listed price; not billed to" });
    /** Discounted self-pay — ₹349.00 Discounted self-pay — synthetic VHC-negotiated rate; you pay the price; not billed to insurance. field · locator health 95% (Stable) */
    this.discountedSelfPay3490Radio = page.getByRole("radio", { name: "Discounted self-pay — ₹349.00 Discounted self-pay — synthetic VHC-negotiated rat" });
    /** Insured — cashless request Insured — cashless request to your insurer. Subject to the insurer's authorisation and policy terms; any amount not approved is payable by you. Checked against your insurer's network record for this provider and service at booking field · locator health 95% (Stable) */
    this.insuredCashlessRequestIRadio = page.getByRole("radio", { name: "Insured — cashless request Insured — cashless request to your insurer. Subject t" });
    /** Patient name Leave blank if the appointment is for you field · locator health 95% (Stable) */
    this.patientNameLeaveBlankIfInput = page.getByRole("textbox", { name: "Patient name Leave blank if the appointment is for you" });
    /** ✕ button · locator health 95% (Stable) */
    this.button = page.getByRole("button", { name: "Close" });
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
    /** Green Valley Medical Centre link · locator health 28% (Very Risky) */
    this.greenValleyMedicalCentreLink = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(3) > div:nth-of-type(2) > a");
    /** Book button · locator health 28% (Very Risky) */
    this.bookButton3 = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(3) > div:nth-of-type(5) > button");
    /** Green Valley Medical Centre link · locator health 28% (Very Risky) */
    this.greenValleyMedicalCentreLink2 = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(4) > div:nth-of-type(2) > a");
    /** Book button · locator health 28% (Very Risky) */
    this.bookButton4 = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(4) > div:nth-of-type(5) > button");
    /** Harbour Care Hospital link · locator health 28% (Very Risky) */
    this.harbourCareHospitalLink = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(5) > div:nth-of-type(2) > a");
    this.heading = this.healthServicesHeading;
    this.sidebar = new Sidebar(page);
    this.modal = new Modal(page);
    this.datePicker = new DatePicker(page);
    this.toast = new Toast(page);
  }

  async fillServiceFilters(data: { search?: string; typeOfServiceAllDoctorConsultationSpecialistConsultationPreventiveHealthCheckDiagnosticLabTestImagingTeleconsultationHomeSampleCollectionVaccinationFollowUpVisit?: string; city?: string }): Promise<void> {
    if (data.search !== undefined) await this.searchInput.fill(data.search);
    if (data.typeOfServiceAllDoctorConsultationSpecialistConsultationPreventiveHealthCheckDiagnosticLabTestImagingTeleconsultationHomeSampleCollectionVaccinationFollowUpVisit !== undefined) await this.typeOfServiceAllDoctorCSelect.selectOption({ label: data.typeOfServiceAllDoctorConsultationSpecialistConsultationPreventiveHealthCheckDiagnosticLabTestImagingTeleconsultationHomeSampleCollectionVaccinationFollowUpVisit }).catch(async () => { await this.typeOfServiceAllDoctorCSelect.selectOption({ index: 1 }); });
    if (data.city !== undefined) await this.cityInput.fill(data.city);
  }

  async fillBookOnlineGpConsultation(data: { date?: string; selfPay39900SelfPayYouPayTheProviderSListedPriceNotBilledToInsurance?: boolean; discountedSelfPay34900DiscountedSelfPaySyntheticVhcNegotiatedRateYouPayThePriceNotBilledToInsurance?: boolean; insuredCashlessRequestInsuredCashlessRequestToYourInsurerSubjectToTheInsurerSAuthorisationAndPolicyTermsAnyAmountNotApprovedIsPayableByYouCheckedAgainstYourInsurerSNetworkRecordForThisProviderAndServiceAtBooking?: boolean; patientNameLeaveBlankIfTheAppointmentIsForYou?: string }): Promise<void> {
    if (data.date !== undefined) await this.dateInput.fill(data.date);
    if (data.selfPay39900SelfPayYouPayTheProviderSListedPriceNotBilledToInsurance !== undefined) await this.selfPay39900SelfPayRadio.setChecked(data.selfPay39900SelfPayYouPayTheProviderSListedPriceNotBilledToInsurance);
    if (data.discountedSelfPay34900DiscountedSelfPaySyntheticVhcNegotiatedRateYouPayThePriceNotBilledToInsurance !== undefined) await this.discountedSelfPay3490Radio.setChecked(data.discountedSelfPay34900DiscountedSelfPaySyntheticVhcNegotiatedRateYouPayThePriceNotBilledToInsurance);
    if (data.insuredCashlessRequestInsuredCashlessRequestToYourInsurerSubjectToTheInsurerSAuthorisationAndPolicyTermsAnyAmountNotApprovedIsPayableByYouCheckedAgainstYourInsurerSNetworkRecordForThisProviderAndServiceAtBooking !== undefined) await this.insuredCashlessRequestIRadio.setChecked(data.insuredCashlessRequestInsuredCashlessRequestToYourInsurerSubjectToTheInsurerSAuthorisationAndPolicyTermsAnyAmountNotApprovedIsPayableByYouCheckedAgainstYourInsurerSNetworkRecordForThisProviderAndServiceAtBooking);
    if (data.patientNameLeaveBlankIfTheAppointmentIsForYou !== undefined) await this.patientNameLeaveBlankIfInput.fill(data.patientNameLeaveBlankIfTheAppointmentIsForYou);
  }

  async submitServiceFilters(): Promise<void> {
    await this.searchButton.click();
  }

  async submitBookOnlineGpConsultation(): Promise<void> {
    await this.button.click();
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

  async clickGreenValleyMedicalCen(): Promise<void> {
    await this.greenValleyMedicalCentreLink.click();
  }

  async clickBook3(): Promise<void> {
    await this.bookButton3.click();
  }

  async clickGreenValleyMedicalCen2(): Promise<void> {
    await this.greenValleyMedicalCentreLink2.click();
  }

  async clickBook4(): Promise<void> {
    await this.bookButton4.click();
  }

  async clickHarbourCareHospital(): Promise<void> {
    await this.harbourCareHospitalLink.click();
  }
}
