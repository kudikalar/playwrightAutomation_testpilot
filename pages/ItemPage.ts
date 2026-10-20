import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { Toast } from '../components/Toast';

/**
 * Health insurance, explained honestly. — Collects user input (Age of eldest member, Members 1 3 4 5 6, City Bengaluru Chennai Delhi Kolkata Mumbai Pune Other, Sum insured ₹5 lakh ₹10 lakh ₹15 lakh ₹25 lakh ₹50 lakh ₹1 crore).
 * Module: Home · Route: / · Risk: Critical · Locator health: 89%
 */
export class ItemPage extends BasePage {
  readonly path = "/";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/(?:[?#].*)?$");
  readonly healthInsuranceExplainedHeading: Locator;
  readonly ageOfEldestMemberInput: Locator;
  readonly members13456Select: Locator;
  readonly cityBengaluruChennaiDelhiSelect: Locator;
  readonly sumInsured5Lakh10LakhSelect: Locator;
  readonly seeMyEstimateButton: Locator;
  readonly cityInput: Locator;
  readonly specialtyInput: Locator;
  readonly searchHospitalsButton: Locator;
  readonly nameInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly emailOptionalInput: Locator;
  readonly iAmInterestedInHealthInSelect: Locator;
  readonly iAgreeThatVisiHealthCarCheckbox: Locator;
  readonly requestCallbackButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly findHealthInsuranceLink: Locator;
  readonly comparePlansLink: Locator;
  readonly findAHospitalLink: Locator;
  readonly requestACallbackLink: Locator;
  readonly individualCoverForOnePerLink: Locator;
  readonly familyFloaterOneSharedSuLink: Locator;
  readonly topUpExtraCoverThatPaysLink: Locator;
  readonly superTopUpExtraCoverThaLink: Locator;
  readonly criticalIllnessALumpSumLink: Locator;
  readonly sidebar: Sidebar;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Health insurance, explained honestly.” · locator health 95% (Stable) */
    this.healthInsuranceExplainedHeading = page.getByRole("heading", { name: "Health insurance, explained honestly.", exact: true });
    /** Age of eldest member field · locator health 95% (Stable) */
    this.ageOfEldestMemberInput = page.getByRole("spinbutton", { name: "Age of eldest member" });
    /** Members 1 3 4 5 6 field · locator health 95% (Stable) */
    this.members13456Select = page.getByRole("combobox", { name: "Members 1 3 4 5 6" });
    /** City Bengaluru Chennai Delhi Kolkata Mumbai Pune Other field · locator health 95% (Stable) */
    this.cityBengaluruChennaiDelhiSelect = page.getByRole("combobox", { name: "City Bengaluru Chennai Delhi Kolkata Mumbai Pune Other" });
    /** Sum insured ₹5 lakh ₹10 lakh ₹15 lakh ₹25 lakh ₹50 lakh ₹1 crore field · locator health 95% (Stable) */
    this.sumInsured5Lakh10LakhSelect = page.getByRole("combobox", { name: "Sum insured ₹5 lakh ₹10 lakh ₹15 lakh ₹25 lakh ₹50 lakh ₹1 crore" });
    /** See my estimate button · locator health 95% (Stable) */
    this.seeMyEstimateButton = page.getByRole("button", { name: "See my estimate" });
    /** City field · locator health 77% (Acceptable) */
    this.cityInput = page.getByLabel("City").first();
    /** Specialty field · locator health 95% (Stable) */
    this.specialtyInput = page.getByRole("textbox", { name: "Specialty" });
    /** Search hospitals button · locator health 95% (Stable) */
    this.searchHospitalsButton = page.getByRole("button", { name: "Search hospitals" });
    /** Name field · locator health 95% (Stable) */
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    /** Mobile number field · locator health 95% (Stable) */
    this.mobileNumberInput = page.getByRole("textbox", { name: "Mobile number" });
    /** Email (optional) field · locator health 95% (Stable) */
    this.emailOptionalInput = page.getByRole("textbox", { name: "Email (optional)" });
    /** I am interested in Health insurance for me Family health insurance Senior citizen cover Group / corporate cover Help with a claim Something else field · locator health 95% (Stable) */
    this.iAmInterestedInHealthInSelect = page.getByRole("combobox", { name: "I am interested in Health insurance for me Family health insurance Senior citize" });
    /** I agree that Visi Health Care may contact me by phone or email about this request. I can withdraw this consent at any time. This is not a request for marketing. field · locator health 95% (Stable) */
    this.iAgreeThatVisiHealthCarCheckbox = page.getByRole("checkbox", { name: "I agree that Visi Health Care may contact me by phone or email about this reques" });
    /** Request callback button · locator health 95% (Stable) */
    this.requestCallbackButton = page.getByRole("button", { name: "Request callback" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Find health insurance link · locator health 95% (Stable) */
    this.findHealthInsuranceLink = page.getByRole("link", { name: "Find health insurance" });
    /** Compare plans link · locator health 28% (Very Risky) */
    this.comparePlansLink = page.locator("#main > div > section:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(1) > a:nth-of-type(2)");
    /** Find a hospital link · locator health 95% (Stable) */
    this.findAHospitalLink = page.getByRole("link", { name: "Find a hospital" });
    /** Request a callback link · locator health 28% (Very Risky) */
    this.requestACallbackLink = page.locator("#main > div > section:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(2) > a:nth-of-type(2)");
    /** Individual Cover for one person with their own s link · locator health 95% (Stable) */
    this.individualCoverForOnePerLink = page.getByRole("link", { name: "Individual Cover for one person with their own sum insured. See plans" });
    /** Family floater One shared sum insured for your s link · locator health 95% (Stable) */
    this.familyFloaterOneSharedSuLink = page.getByRole("link", { name: "Family floater One shared sum insured for your spouse, children and (if eligible) parents." });
    /** Top-up Extra cover that pays once a single claim link · locator health 95% (Stable) */
    this.topUpExtraCoverThatPaysLink = page.getByRole("link", { name: "Top-up Extra cover that pays once a single claim crosses a deductible. See plans" });
    /** Super top-up Extra cover that pays once your tot link · locator health 95% (Stable) */
    this.superTopUpExtraCoverThaLink = page.getByRole("link", { name: "Super top-up Extra cover that pays once your total claims in a year cross the deductible. " });
    /** Critical illness A lump sum on diagnosis of a li link · locator health 95% (Stable) */
    this.criticalIllnessALumpSumLink = page.getByRole("link", { name: "Critical illness A lump sum on diagnosis of a listed serious illness, as defined in the po" });
    this.heading = this.healthInsuranceExplainedHeading;
    this.sidebar = new Sidebar(page);
    this.toast = new Toast(page);
  }

  async fillQuickPremiumEstimate(data: { ageOfEldestMember?: string; members13456?: string; cityBengaluruChennaiDelhiKolkataMumbaiPuneOther?: string; sumInsured5Lakh10Lakh15Lakh25Lakh50Lakh1Crore?: string }): Promise<void> {
    if (data.ageOfEldestMember !== undefined) await this.ageOfEldestMemberInput.fill(data.ageOfEldestMember);
    if (data.members13456 !== undefined) await this.members13456Select.selectOption({ label: data.members13456 }).catch(async () => { await this.members13456Select.selectOption({ index: 1 }); });
    if (data.cityBengaluruChennaiDelhiKolkataMumbaiPuneOther !== undefined) await this.cityBengaluruChennaiDelhiSelect.selectOption({ label: data.cityBengaluruChennaiDelhiKolkataMumbaiPuneOther }).catch(async () => { await this.cityBengaluruChennaiDelhiSelect.selectOption({ index: 1 }); });
    if (data.sumInsured5Lakh10Lakh15Lakh25Lakh50Lakh1Crore !== undefined) await this.sumInsured5Lakh10LakhSelect.selectOption({ label: data.sumInsured5Lakh10Lakh15Lakh25Lakh50Lakh1Crore }).catch(async () => { await this.sumInsured5Lakh10LakhSelect.selectOption({ index: 1 }); });
  }

  async fillCashlessHospitalSearch(data: { city?: string; specialty?: string }): Promise<void> {
    if (data.city !== undefined) await this.cityInput.fill(data.city);
    if (data.specialty !== undefined) await this.specialtyInput.fill(data.specialty);
  }

  async fillRequestAcallback(data: { name?: string; mobileNumber?: string; emailOptional?: string; city?: string; iAmInterestedInHealthInsuranceForMeFamilyHealthInsuranceSeniorCitizenCoverGroupCorporateCoverHelpWithAClaimSomethingElse?: string; iAgreeThatVisiHealthCareMayContactMeByPhoneOrEmailAboutThisRequestICanWithdrawThisConsentAtAnyTimeThisIsNotARequestForMarketing?: boolean }): Promise<void> {
    if (data.name !== undefined) await this.nameInput.fill(data.name);
    if (data.mobileNumber !== undefined) await this.mobileNumberInput.fill(data.mobileNumber);
    if (data.emailOptional !== undefined) await this.emailOptionalInput.fill(data.emailOptional);
    if (data.city !== undefined) await this.cityInput.fill(data.city);
    if (data.iAmInterestedInHealthInsuranceForMeFamilyHealthInsuranceSeniorCitizenCoverGroupCorporateCoverHelpWithAClaimSomethingElse !== undefined) await this.iAmInterestedInHealthInSelect.selectOption({ label: data.iAmInterestedInHealthInsuranceForMeFamilyHealthInsuranceSeniorCitizenCoverGroupCorporateCoverHelpWithAClaimSomethingElse }).catch(async () => { await this.iAmInterestedInHealthInSelect.selectOption({ index: 1 }); });
    if (data.iAgreeThatVisiHealthCareMayContactMeByPhoneOrEmailAboutThisRequestICanWithdrawThisConsentAtAnyTimeThisIsNotARequestForMarketing !== undefined) await this.iAgreeThatVisiHealthCarCheckbox.setChecked(data.iAgreeThatVisiHealthCareMayContactMeByPhoneOrEmailAboutThisRequestICanWithdrawThisConsentAtAnyTimeThisIsNotARequestForMarketing);
  }

  async submitQuickPremiumEstimate(): Promise<void> {
    await this.seeMyEstimateButton.click();
  }

  async submitCashlessHospitalSearch(): Promise<void> {
    await this.searchHospitalsButton.click();
  }

  async submitRequestAcallback(): Promise<void> {
    await this.requestCallbackButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickFindHealthInsurance(): Promise<void> {
    await this.findHealthInsuranceLink.click();
  }

  async clickComparePlans(): Promise<void> {
    await this.comparePlansLink.click();
  }

  async clickFindAHospital(): Promise<void> {
    await this.findAHospitalLink.click();
  }

  async clickRequestACallback(): Promise<void> {
    await this.requestACallbackLink.click();
  }

  async clickIndividualCoverForOne(): Promise<void> {
    await this.individualCoverForOnePerLink.click();
  }

  async clickFamilyFloaterOneShare(): Promise<void> {
    await this.familyFloaterOneSharedSuLink.click();
  }

  async clickTopUpExtraCoverThat(): Promise<void> {
    await this.topUpExtraCoverThatPaysLink.click();
  }

  async clickSuperTopUpExtraCover(): Promise<void> {
    await this.superTopUpExtraCoverThaLink.click();
  }

  async clickCriticalIllnessALump(): Promise<void> {
    await this.criticalIllnessALumpSumLink.click();
  }
}
