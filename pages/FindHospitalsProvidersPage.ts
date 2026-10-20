import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DatePicker } from '../components/DatePicker';
import { Toast } from '../components/Toast';

/**
 * Find hospitals & providers — Lets new users create an account.
 * Module: Hospitals · Route: /hospitals · Risk: Low · Locator health: 84%
 */
export class FindHospitalsProvidersPage extends BasePage {
  readonly path = "/hospitals";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/hospitals(?:[?#].*)?$");
  readonly findHospitalsProvidersHeading: Locator;
  readonly nameInput: Locator;
  readonly cityInput: Locator;
  readonly stateAnyDelhiKarnatakaMaSelect: Locator;
  readonly pinCodeInput: Locator;
  readonly insurerAnyInsurerVhcSandSelect: Locator;
  readonly planProductChooseAnInsSelect: Locator;
  readonly specialtyAnyCardiologyCarSelect: Locator;
  readonly serviceAnyAmbulanceCashleSelect: Locator;
  readonly providerTypeAnyHospitalCSelect: Locator;
  readonly treatmentDateCashlessIsCInput: Locator;
  readonly cashlessEligibleLyChooseCheckbox: Locator;
  readonly emergencyServicesCheckbox: Locator;
  readonly verifiedAccreditatiEGNCheckbox: Locator;
  readonly searchButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly careConnectTelehealthLink: Locator;
  readonly directionsToCareConnectTeLink: Locator;
  readonly bookAServiceLink: Locator;
  readonly detailsLink: Locator;
  readonly coastalCityHospitalLink: Locator;
  readonly n04440000009Link: Locator;
  readonly insurance7HospitalTestLink: Locator;
  readonly directionsToCoastalCityHLink: Locator;
  readonly bookAServiceLink2: Locator;
  readonly sidebar: Sidebar;
  readonly datePicker: DatePicker;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Find hospitals & providers” · locator health 95% (Stable) */
    this.findHospitalsProvidersHeading = page.getByRole("heading", { name: "Find hospitals & providers", exact: true });
    /** Name field · locator health 95% (Stable) */
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    /** City field · locator health 95% (Stable) */
    this.cityInput = page.getByRole("textbox", { name: "City" });
    /** State Any Delhi Karnataka Maharashtra Tamil Nadu Telangana West Bengal field · locator health 95% (Stable) */
    this.stateAnyDelhiKarnatakaMaSelect = page.getByRole("combobox", { name: "State Any Delhi Karnataka Maharashtra Tamil Nadu Telangana West Bengal" });
    /** PIN code field · locator health 95% (Stable) */
    this.pinCodeInput = page.getByRole("textbox", { name: "PIN code" });
    /** Insurer Any insurer VHC Sandbox Insurer (Synthetic) field · locator health 95% (Stable) */
    this.insurerAnyInsurerVhcSandSelect = page.getByRole("combobox", { name: "Insurer Any insurer VHC Sandbox Insurer (Synthetic)" });
    /** Plan / product Choose an insurer first field · locator health 95% (Stable) */
    this.planProductChooseAnInsSelect = page.getByRole("combobox", { name: "Plan / product Choose an insurer first" });
    /** Specialty Any Cardiology Cardiothoracic Surgery Dermatology Diabetology ENT General Medicine General Surgery Gynaecology Maternity Nephrology Neurology Oncology Ophthalmology Orthopaedics Paediatrics Pathology Radiology field · locator health 95% (Stable) */
    this.specialtyAnyCardiologyCarSelect = page.getByRole("combobox", { name: "Specialty Any Cardiology Cardiothoracic Surgery Dermatology Diabetology ENT Gene" });
    /** Service Any Ambulance Cashless insurance desk Day-care procedures E-prescriptions (by registered doctors) Health check packages Home sample collection Imaging Lab diagnostics Out-patient consultations Pharmacy Teleconsultation field · locator health 95% (Stable) */
    this.serviceAnyAmbulanceCashleSelect = page.getByRole("combobox", { name: "Service Any Ambulance Cashless insurance desk Day-care procedures E-prescription" });
    /** Provider type Any Hospital Clinic Diagnostic centre Imaging centre Telehealth field · locator health 95% (Stable) */
    this.providerTypeAnyHospitalCSelect = page.getByRole("combobox", { name: "Provider type Any Hospital Clinic Diagnostic centre Imaging centre Telehealth" });
    /** Treatment date Cashless is checked on this date field · locator health 95% (Stable) */
    this.treatmentDateCashlessIsCInput = page.getByRole("textbox", { name: "Treatment date Cashless is checked on this date" });
    /** Cashless-eligible ly (choose an insurer) field · locator health 95% (Stable) */
    this.cashlessEligibleLyChooseCheckbox = page.getByRole("checkbox", { name: "Cashless-eligible ly (choose an insurer)" });
    /** Emergency services field · locator health 95% (Stable) */
    this.emergencyServicesCheckbox = page.getByRole("checkbox", { name: "Emergency services" });
    /** Verified accreditati (e.g. NABH) field · locator health 95% (Stable) */
    this.verifiedAccreditatiEGNCheckbox = page.getByRole("checkbox", { name: "Verified accreditati (e.g. NABH)" });
    /** Search button · locator health 95% (Stable) */
    this.searchButton = page.getByRole("button", { name: "Search" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** CareConnect Telehealth link · locator health 95% (Stable) */
    this.careConnectTelehealthLink = page.getByRole("link", { name: "CareConnect Telehealth" });
    /** Directions to CareConnect Telehealth (opens Goog link · locator health 95% (Stable) */
    this.directionsToCareConnectTeLink = page.getByRole("link", { name: "Directions to CareConnect Telehealth (opens Google Maps)" });
    /** Book a service link · locator health 28% (Very Risky) */
    this.bookAServiceLink = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(1) > div:nth-of-type(5) > a:nth-of-type(2)");
    /** Details link · locator health 28% (Very Risky) */
    this.detailsLink = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(1) > div:nth-of-type(5) > a:nth-of-type(3)");
    /** Coastal City Hospital link · locator health 95% (Stable) */
    this.coastalCityHospitalLink = page.getByRole("link", { name: "Coastal City Hospital" });
    /** 044-40000009 link · locator health 28% (Very Risky) */
    this.n04440000009Link = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(2) > span > a:nth-of-type(1)");
    /** insurance7@hospital.test link · locator health 95% (Stable) */
    this.insurance7HospitalTestLink = page.getByRole("link", { name: "insurance7@hospital.test" });
    /** Directions to Coastal City Hospital (opens Googl link · locator health 95% (Stable) */
    this.directionsToCoastalCityHLink = page.getByRole("link", { name: "Directions to Coastal City Hospital (opens Google Maps)" });
    /** Book a service link · locator health 28% (Very Risky) */
    this.bookAServiceLink2 = page.locator("#main > div:nth-of-type(3) > article:nth-of-type(2) > div:nth-of-type(5) > a:nth-of-type(2)");
    this.heading = this.findHospitalsProvidersHeading;
    this.sidebar = new Sidebar(page);
    this.datePicker = new DatePicker(page);
    this.toast = new Toast(page);
  }

  async fillDirectoryFilters(data: { name?: string; city?: string; stateAnyDelhiKarnatakaMaharashtraTamilNaduTelanganaWestBengal?: string; pinCode?: string; insurerAnyInsurerVhcSandboxInsurerSynthetic?: string; planProductChooseAnInsurerFirst?: string; specialtyAnyCardiologyCardiothoracicSurgeryDermatologyDiabetologyEntGeneralMedicineGeneralSurgeryGynaecologyMaternityNephrologyNeurologyOncologyOphthalmologyOrthopaedicsPaediatricsPathologyRadiology?: string; serviceAnyAmbulanceCashlessInsuranceDeskDayCareProceduresEPrescriptionsByRegisteredDoctorsHealthCheckPackagesHomeSampleCollectionImagingLabDiagnosticsOutPatientConsultationsPharmacyTeleconsultation?: string; providerTypeAnyHospitalClinicDiagnosticCentreImagingCentreTelehealth?: string; treatmentDateCashlessIsCheckedOnThisDate?: string; cashlessEligibleLyChooseAnInsurer?: boolean; emergencyServices?: boolean; verifiedAccreditatiEGNabh?: boolean }): Promise<void> {
    if (data.name !== undefined) await this.nameInput.fill(data.name);
    if (data.city !== undefined) await this.cityInput.fill(data.city);
    if (data.stateAnyDelhiKarnatakaMaharashtraTamilNaduTelanganaWestBengal !== undefined) await this.stateAnyDelhiKarnatakaMaSelect.selectOption({ label: data.stateAnyDelhiKarnatakaMaharashtraTamilNaduTelanganaWestBengal }).catch(async () => { await this.stateAnyDelhiKarnatakaMaSelect.selectOption({ index: 1 }); });
    if (data.pinCode !== undefined) await this.pinCodeInput.fill(data.pinCode);
    if (data.insurerAnyInsurerVhcSandboxInsurerSynthetic !== undefined) await this.insurerAnyInsurerVhcSandSelect.selectOption({ label: data.insurerAnyInsurerVhcSandboxInsurerSynthetic }).catch(async () => { await this.insurerAnyInsurerVhcSandSelect.selectOption({ index: 1 }); });
    if (data.planProductChooseAnInsurerFirst !== undefined) await this.planProductChooseAnInsSelect.selectOption({ label: data.planProductChooseAnInsurerFirst }).catch(async () => { await this.planProductChooseAnInsSelect.selectOption({ index: 1 }); });
    if (data.specialtyAnyCardiologyCardiothoracicSurgeryDermatologyDiabetologyEntGeneralMedicineGeneralSurgeryGynaecologyMaternityNephrologyNeurologyOncologyOphthalmologyOrthopaedicsPaediatricsPathologyRadiology !== undefined) await this.specialtyAnyCardiologyCarSelect.selectOption({ label: data.specialtyAnyCardiologyCardiothoracicSurgeryDermatologyDiabetologyEntGeneralMedicineGeneralSurgeryGynaecologyMaternityNephrologyNeurologyOncologyOphthalmologyOrthopaedicsPaediatricsPathologyRadiology }).catch(async () => { await this.specialtyAnyCardiologyCarSelect.selectOption({ index: 1 }); });
    if (data.serviceAnyAmbulanceCashlessInsuranceDeskDayCareProceduresEPrescriptionsByRegisteredDoctorsHealthCheckPackagesHomeSampleCollectionImagingLabDiagnosticsOutPatientConsultationsPharmacyTeleconsultation !== undefined) await this.serviceAnyAmbulanceCashleSelect.selectOption({ label: data.serviceAnyAmbulanceCashlessInsuranceDeskDayCareProceduresEPrescriptionsByRegisteredDoctorsHealthCheckPackagesHomeSampleCollectionImagingLabDiagnosticsOutPatientConsultationsPharmacyTeleconsultation }).catch(async () => { await this.serviceAnyAmbulanceCashleSelect.selectOption({ index: 1 }); });
    if (data.providerTypeAnyHospitalClinicDiagnosticCentreImagingCentreTelehealth !== undefined) await this.providerTypeAnyHospitalCSelect.selectOption({ label: data.providerTypeAnyHospitalClinicDiagnosticCentreImagingCentreTelehealth }).catch(async () => { await this.providerTypeAnyHospitalCSelect.selectOption({ index: 1 }); });
    if (data.treatmentDateCashlessIsCheckedOnThisDate !== undefined) await this.treatmentDateCashlessIsCInput.fill(data.treatmentDateCashlessIsCheckedOnThisDate);
    if (data.cashlessEligibleLyChooseAnInsurer !== undefined) await this.cashlessEligibleLyChooseCheckbox.setChecked(data.cashlessEligibleLyChooseAnInsurer);
    if (data.emergencyServices !== undefined) await this.emergencyServicesCheckbox.setChecked(data.emergencyServices);
    if (data.verifiedAccreditatiEGNabh !== undefined) await this.verifiedAccreditatiEGNCheckbox.setChecked(data.verifiedAccreditatiEGNabh);
  }

  async submitDirectoryFilters(): Promise<void> {
    await this.searchButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickCareConnectTelehealth(): Promise<void> {
    await this.careConnectTelehealthLink.click();
  }

  async clickDirectionsToCareConnec(): Promise<void> {
    await this.directionsToCareConnectTeLink.click();
  }

  async clickBookAService(): Promise<void> {
    await this.bookAServiceLink.click();
  }

  async clickDetails(): Promise<void> {
    await this.detailsLink.click();
  }

  async clickCoastalCityHospital(): Promise<void> {
    await this.coastalCityHospitalLink.click();
  }

  async click04440000009(): Promise<void> {
    await this.n04440000009Link.click();
  }

  async clickInsurance7HospitalTest(): Promise<void> {
    await this.insurance7HospitalTestLink.click();
  }

  async clickDirectionsToCoastalCi(): Promise<void> {
    await this.directionsToCoastalCityHLink.click();
  }

  async clickBookAService2(): Promise<void> {
    await this.bookAServiceLink2.click();
  }
}
