import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DatePicker } from '../components/DatePicker';
import { Toast } from '../components/Toast';

/**
 * Intimate a claim — Collects user input (Policy — select — VHC-H-000001 · Vision Family Floater, Patient (insured member) — select —, Hospital — other (type below) — Sunrise Multispeciality Hospital, Chennai (network) Green Valley Medical Centre, Bengaluru (network) Harbour Care Hospital, Mumbai (network) Lotus Women & Child Hospital, Kolkata (network) Riverbank General Hospital, New Delhi Hilltop Eye & ENT Clinic, Pune (network) Coastal City Hospital, Chennai Meadow Heart Institute, Hyderabad (network) Pearl Diagnostics & Imaging, Hyderabad CareConnect Telehealth, Chennai, Hospital name).
 * Module: Claims · Route: /claims/intimate · Risk: Low · Locator health: 95%
 */
export class IntimateAClaimPage extends BasePage {
  readonly path = "/claims/intimate";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/claims/intimate(?:[?#].*)?$");
  readonly intimateAClaimHeading: Locator;
  readonly policySelectVhcH0000Select: Locator;
  readonly patientInsuredMemberSSelect: Locator;
  readonly hospitalOtherTypeBelowSelect: Locator;
  readonly hospitalNameInput: Locator;
  readonly expectedAdmissionDateInput: Locator;
  readonly admissionTypePlannedEmergSelect: Locator;
  readonly preferredClaimRouteDecideSelect: Locator;
  readonly natureOfIllnessOrInjuryInput: Locator;
  readonly sendIntimationButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly datePicker: DatePicker;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Intimate a claim” · locator health 95% (Stable) */
    this.intimateAClaimHeading = page.getByRole("heading", { name: "Intimate a claim", exact: true });
    /** Policy — select — VHC-H-000001 · Vision Family Floater field · locator health 95% (Stable) */
    this.policySelectVhcH0000Select = page.getByRole("combobox", { name: "Policy — select — VHC-H-000001 · Vision Family Floater" });
    /** Patient (insured member) — select — field · locator health 95% (Stable) */
    this.patientInsuredMemberSSelect = page.getByRole("combobox", { name: "Patient (insured member) — select —" });
    /** Hospital — other (type below) — Sunrise Multispeciality Hospital, Chennai (network) Green Valley Medical Centre, Bengaluru (network) Harbour Care Hospital, Mumbai (network) Lotus Women & Child Hospital, Kolkata (network) Riverbank General Hospital, New Delhi Hilltop Eye & ENT Clinic, Pune (network) Coastal City Hospital, Chennai Meadow Heart Institute, Hyderabad (network) Pearl Diagnostics & Imaging, Hyderabad CareConnect Telehealth, Chennai field · locator health 95% (Stable) */
    this.hospitalOtherTypeBelowSelect = page.getByRole("combobox", { name: "Hospital — other (type below) — Sunrise Multispeciality Hospital, Chennai (netwo" });
    /** Hospital name field · locator health 95% (Stable) */
    this.hospitalNameInput = page.getByRole("textbox", { name: "Hospital name" });
    /** Expected admission date field · locator health 95% (Stable) */
    this.expectedAdmissionDateInput = page.getByRole("textbox", { name: "Expected admission date" });
    /** Admission type Planned Emergency field · locator health 95% (Stable) */
    this.admissionTypePlannedEmergSelect = page.getByRole("combobox", { name: "Admission type Planned Emergency" });
    /** Preferred claim route Decide for me Cashless Reimbursement field · locator health 95% (Stable) */
    this.preferredClaimRouteDecideSelect = page.getByRole("combobox", { name: "Preferred claim route Decide for me Cashless Reimbursement" });
    /** Nature of illness or injury In your own words — e.g. “planned knee surgery”, “high fever”. field · locator health 95% (Stable) */
    this.natureOfIllnessOrInjuryInput = page.getByRole("textbox", { name: "Nature of illness or injury In your own words — e.g. “planned knee surgery”, “hi" });
    /** Send intimation button · locator health 95% (Stable) */
    this.sendIntimationButton = page.getByRole("button", { name: "Send intimation" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.intimateAClaimHeading;
    this.sidebar = new Sidebar(page);
    this.datePicker = new DatePicker(page);
    this.toast = new Toast(page);
  }

  async fillSendIntimation(data: { policySelectVhcH000001VisionFamilyFloater?: string; patientInsuredMemberSelect?: string; hospitalOtherTypeBelowSunriseMultispecialityHospitalChennaiNetworkGreenValleyMedicalCentreBengaluruNetworkHarbourCareHospitalMumbaiNetworkLotusWomenChildHospitalKolkataNetworkRiverbankGeneralHospitalNewDelhiHilltopEyeEntClinicPuneNetworkCoastalCityHospitalChennaiMeadowHeartInstituteHyderabadNetworkPearlDiagnosticsImagingHyderabadCareConnectTelehealthChennai?: string; hospitalName?: string; expectedAdmissionDate?: string; admissionTypePlannedEmergency?: string; preferredClaimRouteDecideForMeCashlessReimbursement?: string; natureOfIllnessOrInjuryInYourOwnWordsEGPlannedKneeSurgeryHighFever?: string }): Promise<void> {
    if (data.policySelectVhcH000001VisionFamilyFloater !== undefined) await this.policySelectVhcH0000Select.selectOption({ label: data.policySelectVhcH000001VisionFamilyFloater }).catch(async () => { await this.policySelectVhcH0000Select.selectOption({ index: 1 }); });
    if (data.patientInsuredMemberSelect !== undefined) await this.patientInsuredMemberSSelect.selectOption({ label: data.patientInsuredMemberSelect }).catch(async () => { await this.patientInsuredMemberSSelect.selectOption({ index: 1 }); });
    if (data.hospitalOtherTypeBelowSunriseMultispecialityHospitalChennaiNetworkGreenValleyMedicalCentreBengaluruNetworkHarbourCareHospitalMumbaiNetworkLotusWomenChildHospitalKolkataNetworkRiverbankGeneralHospitalNewDelhiHilltopEyeEntClinicPuneNetworkCoastalCityHospitalChennaiMeadowHeartInstituteHyderabadNetworkPearlDiagnosticsImagingHyderabadCareConnectTelehealthChennai !== undefined) await this.hospitalOtherTypeBelowSelect.selectOption({ label: data.hospitalOtherTypeBelowSunriseMultispecialityHospitalChennaiNetworkGreenValleyMedicalCentreBengaluruNetworkHarbourCareHospitalMumbaiNetworkLotusWomenChildHospitalKolkataNetworkRiverbankGeneralHospitalNewDelhiHilltopEyeEntClinicPuneNetworkCoastalCityHospitalChennaiMeadowHeartInstituteHyderabadNetworkPearlDiagnosticsImagingHyderabadCareConnectTelehealthChennai }).catch(async () => { await this.hospitalOtherTypeBelowSelect.selectOption({ index: 1 }); });
    if (data.hospitalName !== undefined) await this.hospitalNameInput.fill(data.hospitalName);
    if (data.expectedAdmissionDate !== undefined) await this.expectedAdmissionDateInput.fill(data.expectedAdmissionDate);
    if (data.admissionTypePlannedEmergency !== undefined) await this.admissionTypePlannedEmergSelect.selectOption({ label: data.admissionTypePlannedEmergency }).catch(async () => { await this.admissionTypePlannedEmergSelect.selectOption({ index: 1 }); });
    if (data.preferredClaimRouteDecideForMeCashlessReimbursement !== undefined) await this.preferredClaimRouteDecideSelect.selectOption({ label: data.preferredClaimRouteDecideForMeCashlessReimbursement }).catch(async () => { await this.preferredClaimRouteDecideSelect.selectOption({ index: 1 }); });
    if (data.natureOfIllnessOrInjuryInYourOwnWordsEGPlannedKneeSurgeryHighFever !== undefined) await this.natureOfIllnessOrInjuryInput.fill(data.natureOfIllnessOrInjuryInYourOwnWordsEGPlannedKneeSurgeryHighFever);
  }

  async submitSendIntimation(): Promise<void> {
    await this.sendIntimationButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
