import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DatePicker } from '../components/DatePicker';
import { Tabs } from '../components/Tabs';
import { Toast } from '../components/Toast';

/**
 * Your profile — Collects user input (Customer ID, Legal full name As on your identity documents, Date of birth Policyholders must be at least 18, Gender Optional — Female Male Other Prefer not to say).
 * Module: Settings · Route: /profile · Risk: High · Locator health: 95%
 */
export class YourProfilePage extends BasePage {
  readonly path = "/profile";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/profile(?:[?#].*)?$");
  readonly yourProfileHeading: Locator;
  readonly customerIdInput: Locator;
  readonly legalFullNameAsOnYourIInput: Locator;
  readonly dateOfBirthPolicyholdersInput: Locator;
  readonly genderOptionalFemaleMalSelect: Locator;
  readonly discardButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly personalButton: Locator;
  readonly addressButton: Locator;
  readonly securityContactButton: Locator;
  readonly privacyDataButton: Locator;
  readonly saveChangesButton: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly datePicker: DatePicker;
  readonly tabs: Tabs;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Your profile” · locator health 95% (Stable) */
    this.yourProfileHeading = page.getByRole("heading", { name: "Your profile", exact: true });
    /** Customer ID field · locator health 95% (Stable) */
    this.customerIdInput = page.getByRole("textbox", { name: "Customer ID" });
    /** Legal full name As on your identity documents field · locator health 95% (Stable) */
    this.legalFullNameAsOnYourIInput = page.getByRole("textbox", { name: "Legal full name As on your identity documents" });
    /** Date of birth Policyholders must be at least 18 field · locator health 95% (Stable) */
    this.dateOfBirthPolicyholdersInput = page.getByRole("textbox", { name: "Date of birth Policyholders must be at least 18" });
    /** Gender Optional — Female Male Other Prefer not to say field · locator health 95% (Stable) */
    this.genderOptionalFemaleMalSelect = page.getByRole("combobox", { name: "Gender Optional — Female Male Other Prefer not to say" });
    /** Discard button · locator health 95% (Stable) */
    this.discardButton = page.getByRole("button", { name: "Discard" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Personal tab · locator health 95% (Stable) */
    this.personalButton = page.getByRole("tab", { name: "Personal" });
    /** Address tab · locator health 95% (Stable) */
    this.addressButton = page.getByRole("tab", { name: "Address" });
    /** Security & contact tab · locator health 95% (Stable) */
    this.securityContactButton = page.getByRole("tab", { name: "Security & contact" });
    /** Privacy & data tab · locator health 95% (Stable) */
    this.privacyDataButton = page.getByRole("tab", { name: "Privacy & data" });
    /** Save changes button · locator health 95% (Stable) */
    this.saveChangesButton = page.getByRole("button", { name: "Save changes" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.yourProfileHeading;
    this.sidebar = new Sidebar(page);
    this.datePicker = new DatePicker(page);
    this.tabs = new Tabs(page);
    this.toast = new Toast(page);
  }

  async fillPersonalDetails(data: { customerId?: string; legalFullNameAsOnYourIdentityDocuments?: string; dateOfBirthPolicyholdersMustBeAtLeast18?: string; genderOptionalFemaleMaleOtherPreferNotToSay?: string }): Promise<void> {
    if (data.customerId !== undefined) await this.customerIdInput.fill(data.customerId);
    if (data.legalFullNameAsOnYourIdentityDocuments !== undefined) await this.legalFullNameAsOnYourIInput.fill(data.legalFullNameAsOnYourIdentityDocuments);
    if (data.dateOfBirthPolicyholdersMustBeAtLeast18 !== undefined) await this.dateOfBirthPolicyholdersInput.fill(data.dateOfBirthPolicyholdersMustBeAtLeast18);
    if (data.genderOptionalFemaleMaleOtherPreferNotToSay !== undefined) await this.genderOptionalFemaleMalSelect.selectOption({ label: data.genderOptionalFemaleMaleOtherPreferNotToSay }).catch(async () => { await this.genderOptionalFemaleMalSelect.selectOption({ index: 1 }); });
  }

  async submitPersonalDetails(): Promise<void> {
    await this.discardButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickPersonal(): Promise<void> {
    await this.personalButton.click();
  }

  async clickAddress(): Promise<void> {
    await this.addressButton.click();
  }

  async clickSecurityContact(): Promise<void> {
    await this.securityContactButton.click();
  }

  async clickPrivacyData(): Promise<void> {
    await this.privacyDataButton.click();
  }

  async clickSaveChanges(): Promise<void> {
    await this.saveChangesButton.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
