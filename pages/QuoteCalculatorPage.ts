import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DatePicker } from '../components/DatePicker';
import { Tabs } from '../components/Tabs';
import { Toast } from '../components/Toast';

/**
 * Quote calculator — Creates or updates quote calculator records through a 6-field form.
 * Module: Quote · Route: /quote · Risk: High · Locator health: 95%
 */
export class QuoteCalculatorPage extends BasePage {
  readonly path = "/quote";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/quote(?:[?#].*)?$");
  readonly quoteCalculatorHeading: Locator;
  readonly planVisionIndividualCareSelect: Locator;
  readonly coverageStartDateInput: Locator;
  readonly coverageAmount50000000Select: Locator;
  readonly opdCover150000Checkbox: Locator;
  readonly maternityCover300000Checkbox: Locator;
  readonly criticalIllnessAdd25Checkbox: Locator;
  readonly addMemberButton: Locator;
  readonly nameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly relationshipSpouseChildPaSelect: Locator;
  readonly skipToMainContentLink: Locator;
  readonly healthButton: Locator;
  readonly termLifeButton: Locator;
  readonly calculatePremiumButton: Locator;
  readonly sidebar: Sidebar;
  readonly datePicker: DatePicker;
  readonly tabs: Tabs;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Quote calculator” · locator health 95% (Stable) */
    this.quoteCalculatorHeading = page.getByRole("heading", { name: "Quote calculator", exact: true });
    /** Plan Vision Individual Care (Individual) Vision Family Floater (Floater) Vision Senior Shield (Senior) field · locator health 95% (Stable) */
    this.planVisionIndividualCareSelect = page.getByRole("combobox", { name: "Plan Vision Individual Care (Individual) Vision Family Floater (Floater) Vision " });
    /** Coverage start date field · locator health 95% (Stable) */
    this.coverageStartDateInput = page.getByRole("textbox", { name: "Coverage start date" });
    /** Coverage amount ₹5,00,000.00 ₹10,00,000.00 field · locator health 95% (Stable) */
    this.coverageAmount50000000Select = page.getByRole("combobox", { name: "Coverage amount ₹5,00,000.00 ₹10,00,000.00" });
    /** OPD cover (+₹1,500.00) field · locator health 95% (Stable) */
    this.opdCover150000Checkbox = page.getByRole("checkbox", { name: "OPD cover (+₹1,500.00)" });
    /** Maternity cover (+₹3,000.00) field · locator health 95% (Stable) */
    this.maternityCover300000Checkbox = page.getByRole("checkbox", { name: "Maternity cover (+₹3,000.00)" });
    /** Critical illness add- (+₹2,500.00) field · locator health 95% (Stable) */
    this.criticalIllnessAdd25Checkbox = page.getByRole("checkbox", { name: "Critical illness add- (+₹2,500.00)" });
    /** + Add member button · locator health 95% (Stable) */
    this.addMemberButton = page.getByRole("button", { name: "+ Add member" });
    /** Name field · locator health 95% (Stable) */
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    /** Date of birth field · locator health 95% (Stable) */
    this.dateOfBirthInput = page.getByRole("textbox", { name: "Date of birth" });
    /** Relationship spouse child parent field · locator health 95% (Stable) */
    this.relationshipSpouseChildPaSelect = page.getByRole("combobox", { name: "Relationship spouse child parent" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Health tab · locator health 95% (Stable) */
    this.healthButton = page.getByRole("tab", { name: "Health" });
    /** Term life tab · locator health 95% (Stable) */
    this.termLifeButton = page.getByRole("tab", { name: "Term life" });
    /** Calculate premium button · locator health 95% (Stable) */
    this.calculatePremiumButton = page.getByRole("button", { name: "Calculate premium" });
    this.heading = this.quoteCalculatorHeading;
    this.sidebar = new Sidebar(page);
    this.datePicker = new DatePicker(page);
    this.tabs = new Tabs(page);
    this.toast = new Toast(page);
  }

  async fillYourDetails(data: { planVisionIndividualCareIndividualVisionFamilyFloaterFloaterVisionSeniorShieldSenior?: string; coverageStartDate?: string; coverageAmount50000000100000000?: string; opdCover150000?: boolean; maternityCover300000?: boolean; criticalIllnessAdd250000?: boolean }): Promise<void> {
    if (data.planVisionIndividualCareIndividualVisionFamilyFloaterFloaterVisionSeniorShieldSenior !== undefined) await this.planVisionIndividualCareSelect.selectOption({ label: data.planVisionIndividualCareIndividualVisionFamilyFloaterFloaterVisionSeniorShieldSenior }).catch(async () => { await this.planVisionIndividualCareSelect.selectOption({ index: 1 }); });
    if (data.coverageStartDate !== undefined) await this.coverageStartDateInput.fill(data.coverageStartDate);
    if (data.coverageAmount50000000100000000 !== undefined) await this.coverageAmount50000000Select.selectOption({ label: data.coverageAmount50000000100000000 }).catch(async () => { await this.coverageAmount50000000Select.selectOption({ index: 1 }); });
    if (data.opdCover150000 !== undefined) await this.opdCover150000Checkbox.setChecked(data.opdCover150000);
    if (data.maternityCover300000 !== undefined) await this.maternityCover300000Checkbox.setChecked(data.maternityCover300000);
    if (data.criticalIllnessAdd250000 !== undefined) await this.criticalIllnessAdd25Checkbox.setChecked(data.criticalIllnessAdd250000);
  }

  async fillYourDetails2(data: { name?: string; dateOfBirth?: string; relationshipSpouseChildParent?: string }): Promise<void> {
    if (data.name !== undefined) await this.nameInput.fill(data.name);
    if (data.dateOfBirth !== undefined) await this.dateOfBirthInput.fill(data.dateOfBirth);
    if (data.relationshipSpouseChildParent !== undefined) await this.relationshipSpouseChildPaSelect.selectOption({ label: data.relationshipSpouseChildParent }).catch(async () => { await this.relationshipSpouseChildPaSelect.selectOption({ index: 1 }); });
  }

  async submitYourDetails(): Promise<void> {
    await this.addMemberButton.click();
  }

  async submitYourDetails2(): Promise<void> {
    await this.addMemberButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickHealth(): Promise<void> {
    await this.healthButton.click();
  }

  async clickTermLife(): Promise<void> {
    await this.termLifeButton.click();
  }

  async clickCalculatePremium(): Promise<void> {
    await this.calculatePremiumButton.click();
  }
}
