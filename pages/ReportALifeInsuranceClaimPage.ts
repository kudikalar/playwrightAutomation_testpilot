import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DatePicker } from '../components/DatePicker';
import { Toast } from '../components/Toast';

/**
 * Report a life insurance claim — Collects user input (Policy number e.g. VHC-L-000002, Life assured — full name, Life assured — date of birth, Your full name).
 * Module: Authentication · Route: /life-claim · Risk: Medium · Locator health: 95%
 */
export class ReportALifeInsuranceClaimPage extends BasePage {
  readonly path = "/life-claim";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/life-claim(?:[?#].*)?$");
  readonly reportALifeInsuranceClaiHeading: Locator;
  readonly policyNumberEGVhcL000Input: Locator;
  readonly lifeAssuredFullNameInput: Locator;
  readonly lifeAssuredDateOfBirthInput: Locator;
  readonly yourFullNameInput: Locator;
  readonly relationshipToTheLifeAssInput: Locator;
  readonly emailInput: Locator;
  readonly mobile10DigitsInput: Locator;
  readonly identityDocumentVoterIdDSelect: Locator;
  readonly documentNumberSampleInput: Locator;
  readonly sendVerificationCodeButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly sidebar: Sidebar;
  readonly datePicker: DatePicker;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Report a life insurance claim” · locator health 95% (Stable) */
    this.reportALifeInsuranceClaiHeading = page.getByRole("heading", { name: "Report a life insurance claim", exact: true });
    /** Policy number e.g. VHC-L-000002 field · locator health 95% (Stable) */
    this.policyNumberEGVhcL000Input = page.getByRole("textbox", { name: "Policy number e.g. VHC-L-000002" });
    /** Life assured — full name field · locator health 95% (Stable) */
    this.lifeAssuredFullNameInput = page.getByRole("textbox", { name: "Life assured — full name" });
    /** Life assured — date of birth field · locator health 95% (Stable) */
    this.lifeAssuredDateOfBirthInput = page.getByRole("textbox", { name: "Life assured — date of birth" });
    /** Your full name field · locator health 95% (Stable) */
    this.yourFullNameInput = page.getByRole("textbox", { name: "Your full name" });
    /** Relationship to the life assured field · locator health 95% (Stable) */
    this.relationshipToTheLifeAssInput = page.getByRole("textbox", { name: "Relationship to the life assured" });
    /** Email field · locator health 95% (Stable) */
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    /** Mobile (10 digits) field · locator health 95% (Stable) */
    this.mobile10DigitsInput = page.getByRole("textbox", { name: "Mobile (10 digits)" });
    /** Identity document Voter ID Driving licence field · locator health 95% (Stable) */
    this.identityDocumentVoterIdDSelect = page.getByRole("combobox", { name: "Identity document Voter ID Driving licence" });
    /** Document number (sample) field · locator health 95% (Stable) */
    this.documentNumberSampleInput = page.getByRole("textbox", { name: "Document number (sample)" });
    /** Send verification code button · locator health 95% (Stable) */
    this.sendVerificationCodeButton = page.getByRole("button", { name: "Send verification code" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    this.heading = this.reportALifeInsuranceClaiHeading;
    this.sidebar = new Sidebar(page);
    this.datePicker = new DatePicker(page);
    this.toast = new Toast(page);
  }

  async fillSendVerificationCode(data: { policyNumberEGVhcL000002?: string; lifeAssuredFullName?: string; lifeAssuredDateOfBirth?: string; yourFullName?: string; relationshipToTheLifeAssured?: string; email?: string; mobile10Digits?: string; identityDocumentVoterIdDrivingLicence?: string; documentNumberSample?: string }): Promise<void> {
    if (data.policyNumberEGVhcL000002 !== undefined) await this.policyNumberEGVhcL000Input.fill(data.policyNumberEGVhcL000002);
    if (data.lifeAssuredFullName !== undefined) await this.lifeAssuredFullNameInput.fill(data.lifeAssuredFullName);
    if (data.lifeAssuredDateOfBirth !== undefined) await this.lifeAssuredDateOfBirthInput.fill(data.lifeAssuredDateOfBirth);
    if (data.yourFullName !== undefined) await this.yourFullNameInput.fill(data.yourFullName);
    if (data.relationshipToTheLifeAssured !== undefined) await this.relationshipToTheLifeAssInput.fill(data.relationshipToTheLifeAssured);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.mobile10Digits !== undefined) await this.mobile10DigitsInput.fill(data.mobile10Digits);
    if (data.identityDocumentVoterIdDrivingLicence !== undefined) await this.identityDocumentVoterIdDSelect.selectOption({ label: data.identityDocumentVoterIdDrivingLicence }).catch(async () => { await this.identityDocumentVoterIdDSelect.selectOption({ index: 1 }); });
    if (data.documentNumberSample !== undefined) await this.documentNumberSampleInput.fill(data.documentNumberSample);
  }

  async submitSendVerificationCode(): Promise<void> {
    await this.sendVerificationCodeButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }
}
