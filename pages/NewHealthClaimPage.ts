import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DatePicker } from '../components/DatePicker';
import { Toast } from '../components/Toast';

/**
 * New health claim — Collects user input (Policy — select — VHC-H-000001 · Vision Family Floater (Active), Insured member — select —, Claim type Reimbursement (treatment completed) Cashless pre-authorisation (network hospital), Hospital — other (type below) — Sunrise Multispeciality Hospital, Chennai (network) Green Valley Medical Centre, Bengaluru (network) Harbour Care Hospital, Mumbai (network) Lotus Women & Child Hospital, Kolkata (network) Riverbank General Hospital, New Delhi Hilltop Eye & ENT Clinic, Pune (network) Coastal City Hospital, Chennai Meadow Heart Institute, Hyderabad (network) Pearl Diagnostics & Imaging, Hyderabad CareConnect Telehealth, Chennai).
 * Module: Claims · Route: /claims/new · Risk: High · Locator health: 95%
 */
export class NewHealthClaimPage extends BasePage {
  readonly path = "/claims/new";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/claims/new(?:[?#].*)?$");
  readonly newHealthClaimHeading: Locator;
  readonly policySelectVhcH0000Select: Locator;
  readonly insuredMemberSelectSelect: Locator;
  readonly claimTypeReimbursementTrSelect: Locator;
  readonly hospitalOtherTypeBelowSelect: Locator;
  readonly hospitalNameInput: Locator;
  readonly admissionDateInput: Locator;
  readonly dischargeDateInput: Locator;
  readonly claimedAmountInput: Locator;
  readonly diagnosisInput: Locator;
  readonly treatmentDescriptionInput: Locator;
  readonly thisTreatmentIsDueToAnCheckbox: Locator;
  readonly accountHolderInput: Locator;
  readonly accountNumberInput: Locator;
  readonly ifscEGVhcb0001234Input: Locator;
  readonly submitClaimButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly intimateTheClaimFirstLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly datePicker: DatePicker;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “New health claim” · locator health 95% (Stable) */
    this.newHealthClaimHeading = page.getByRole("heading", { name: "New health claim", exact: true });
    /** Policy — select — VHC-H-000001 · Vision Family Floater (Active) field · locator health 95% (Stable) */
    this.policySelectVhcH0000Select = page.getByRole("combobox", { name: "Policy — select — VHC-H-000001 · Vision Family Floater (Active)" });
    /** Insured member — select — field · locator health 95% (Stable) */
    this.insuredMemberSelectSelect = page.getByRole("combobox", { name: "Insured member — select —" });
    /** Claim type Reimbursement (treatment completed) Cashless pre-authorisation (network hospital) field · locator health 95% (Stable) */
    this.claimTypeReimbursementTrSelect = page.getByRole("combobox", { name: "Claim type Reimbursement (treatment completed) Cashless pre-authorisation (netwo" });
    /** Hospital — other (type below) — Sunrise Multispeciality Hospital, Chennai (network) Green Valley Medical Centre, Bengaluru (network) Harbour Care Hospital, Mumbai (network) Lotus Women & Child Hospital, Kolkata (network) Riverbank General Hospital, New Delhi Hilltop Eye & ENT Clinic, Pune (network) Coastal City Hospital, Chennai Meadow Heart Institute, Hyderabad (network) Pearl Diagnostics & Imaging, Hyderabad CareConnect Telehealth, Chennai field · locator health 95% (Stable) */
    this.hospitalOtherTypeBelowSelect = page.getByRole("combobox", { name: "Hospital — other (type below) — Sunrise Multispeciality Hospital, Chennai (netwo" });
    /** Hospital name field · locator health 95% (Stable) */
    this.hospitalNameInput = page.getByRole("textbox", { name: "Hospital name" });
    /** Admission date field · locator health 95% (Stable) */
    this.admissionDateInput = page.getByRole("textbox", { name: "Admission date" });
    /** Discharge date field · locator health 95% (Stable) */
    this.dischargeDateInput = page.getByRole("textbox", { name: "Discharge date" });
    /** Claimed amount (₹) field · locator health 95% (Stable) */
    this.claimedAmountInput = page.getByRole("textbox", { name: "Claimed amount (₹)" });
    /** Diagnosis field · locator health 95% (Stable) */
    this.diagnosisInput = page.getByRole("textbox", { name: "Diagnosis" });
    /** Treatment description field · locator health 95% (Stable) */
    this.treatmentDescriptionInput = page.getByRole("textbox", { name: "Treatment description" });
    /** This treatment is due to an accident field · locator health 95% (Stable) */
    this.thisTreatmentIsDueToAnCheckbox = page.getByRole("checkbox", { name: "This treatment is due to an accident" });
    /** Account holder field · locator health 95% (Stable) */
    this.accountHolderInput = page.getByRole("textbox", { name: "Account holder" });
    /** Account number field · locator health 95% (Stable) */
    this.accountNumberInput = page.getByRole("textbox", { name: "Account number" });
    /** IFSC e.g. VHCB0001234 field · locator health 95% (Stable) */
    this.ifscEGVhcb0001234Input = page.getByRole("textbox", { name: "IFSC e.g. VHCB0001234" });
    /** Submit claim button · locator health 95% (Stable) */
    this.submitClaimButton = page.getByRole("button", { name: "Submit claim" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Intimate the claim first link · locator health 95% (Stable) */
    this.intimateTheClaimFirstLink = page.getByRole("link", { name: "Intimate the claim first" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.newHealthClaimHeading;
    this.sidebar = new Sidebar(page);
    this.datePicker = new DatePicker(page);
    this.toast = new Toast(page);
  }

  async fillPayoutBankDetails(data: { policySelectVhcH000001VisionFamilyFloaterActive?: string; insuredMemberSelect?: string; claimTypeReimbursementTreatmentCompletedCashlessPreAuthorisationNetworkHospital?: string; hospitalOtherTypeBelowSunriseMultispecialityHospitalChennaiNetworkGreenValleyMedicalCentreBengaluruNetworkHarbourCareHospitalMumbaiNetworkLotusWomenChildHospitalKolkataNetworkRiverbankGeneralHospitalNewDelhiHilltopEyeEntClinicPuneNetworkCoastalCityHospitalChennaiMeadowHeartInstituteHyderabadNetworkPearlDiagnosticsImagingHyderabadCareConnectTelehealthChennai?: string; hospitalName?: string; admissionDate?: string; dischargeDate?: string; claimedAmount?: string; diagnosis?: string; treatmentDescription?: string; thisTreatmentIsDueToAnAccident?: boolean; accountHolder?: string; accountNumber?: string; ifscEGVhcb0001234?: string }): Promise<void> {
    if (data.policySelectVhcH000001VisionFamilyFloaterActive !== undefined) await this.policySelectVhcH0000Select.selectOption({ label: data.policySelectVhcH000001VisionFamilyFloaterActive }).catch(async () => { await this.policySelectVhcH0000Select.selectOption({ index: 1 }); });
    if (data.insuredMemberSelect !== undefined) await this.insuredMemberSelectSelect.selectOption({ label: data.insuredMemberSelect }).catch(async () => { await this.insuredMemberSelectSelect.selectOption({ index: 1 }); });
    if (data.claimTypeReimbursementTreatmentCompletedCashlessPreAuthorisationNetworkHospital !== undefined) await this.claimTypeReimbursementTrSelect.selectOption({ label: data.claimTypeReimbursementTreatmentCompletedCashlessPreAuthorisationNetworkHospital }).catch(async () => { await this.claimTypeReimbursementTrSelect.selectOption({ index: 1 }); });
    if (data.hospitalOtherTypeBelowSunriseMultispecialityHospitalChennaiNetworkGreenValleyMedicalCentreBengaluruNetworkHarbourCareHospitalMumbaiNetworkLotusWomenChildHospitalKolkataNetworkRiverbankGeneralHospitalNewDelhiHilltopEyeEntClinicPuneNetworkCoastalCityHospitalChennaiMeadowHeartInstituteHyderabadNetworkPearlDiagnosticsImagingHyderabadCareConnectTelehealthChennai !== undefined) await this.hospitalOtherTypeBelowSelect.selectOption({ label: data.hospitalOtherTypeBelowSunriseMultispecialityHospitalChennaiNetworkGreenValleyMedicalCentreBengaluruNetworkHarbourCareHospitalMumbaiNetworkLotusWomenChildHospitalKolkataNetworkRiverbankGeneralHospitalNewDelhiHilltopEyeEntClinicPuneNetworkCoastalCityHospitalChennaiMeadowHeartInstituteHyderabadNetworkPearlDiagnosticsImagingHyderabadCareConnectTelehealthChennai }).catch(async () => { await this.hospitalOtherTypeBelowSelect.selectOption({ index: 1 }); });
    if (data.hospitalName !== undefined) await this.hospitalNameInput.fill(data.hospitalName);
    if (data.admissionDate !== undefined) await this.admissionDateInput.fill(data.admissionDate);
    if (data.dischargeDate !== undefined) await this.dischargeDateInput.fill(data.dischargeDate);
    if (data.claimedAmount !== undefined) await this.claimedAmountInput.fill(data.claimedAmount);
    if (data.diagnosis !== undefined) await this.diagnosisInput.fill(data.diagnosis);
    if (data.treatmentDescription !== undefined) await this.treatmentDescriptionInput.fill(data.treatmentDescription);
    if (data.thisTreatmentIsDueToAnAccident !== undefined) await this.thisTreatmentIsDueToAnCheckbox.setChecked(data.thisTreatmentIsDueToAnAccident);
    if (data.accountHolder !== undefined) await this.accountHolderInput.fill(data.accountHolder);
    if (data.accountNumber !== undefined) await this.accountNumberInput.fill(data.accountNumber);
    if (data.ifscEGVhcb0001234 !== undefined) await this.ifscEGVhcb0001234Input.fill(data.ifscEGVhcb0001234);
  }

  async submitPayoutBankDetails(): Promise<void> {
    await this.submitClaimButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickIntimateTheClaimFirst(): Promise<void> {
    await this.intimateTheClaimFirstLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
