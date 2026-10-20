import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { Tabs } from '../components/Tabs';
import { Toast } from '../components/Toast';

/**
 * Compare insurance — Collects user input (Sort by Default order Lowest starting premium Highest sum insured Name (A–Z)).
 * Module: Orders & Checkout · Route: /plans?category · Risk: Critical · Locator health: 95%
 */
export class CompareInsurancePage2 extends BasePage {
  readonly path = "/plans";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/plans(?:[?#].*)?$");
  readonly compareInsuranceHeading: Locator;
  readonly sortByDefaultOrderLowestSelect: Locator;
  readonly healthInsuranceButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly lifeInsuranceButton: Locator;
  readonly allHealthButton: Locator;
  readonly individualHealth1Button: Locator;
  readonly familyFloater1Button: Locator;
  readonly seniorCitizen1Button: Locator;
  readonly topUp0Button: Locator;
  readonly superTopUp0Button: Locator;
  readonly criticalIllness0Button: Locator;
  readonly sidebar: Sidebar;
  readonly tabs: Tabs;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Compare insurance” · locator health 95% (Stable) */
    this.compareInsuranceHeading = page.getByRole("heading", { name: "Compare insurance", exact: true });
    /** Sort by Default order Lowest starting premium Highest sum insured Name (A–Z) field · locator health 95% (Stable) */
    this.sortByDefaultOrderLowestSelect = page.getByRole("combobox", { name: "Sort by Default order Lowest starting premium Highest sum insured Name (A–Z)" });
    /** Health insurance button · locator health 95% (Stable) */
    this.healthInsuranceButton = page.getByRole("tab", { name: "Health insurance" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Life insurance tab · locator health 95% (Stable) */
    this.lifeInsuranceButton = page.getByRole("tab", { name: "Life insurance" });
    /** All health button · locator health 95% (Stable) */
    this.allHealthButton = page.getByRole("button", { name: "All health" });
    /** Individual health 1 button · locator health 95% (Stable) */
    this.individualHealth1Button = page.getByRole("button", { name: "Individual health 1" });
    /** Family floater 1 button · locator health 95% (Stable) */
    this.familyFloater1Button = page.getByRole("button", { name: "Family floater 1" });
    /** Senior citizen 1 button · locator health 95% (Stable) */
    this.seniorCitizen1Button = page.getByRole("button", { name: "Senior citizen 1" });
    /** Top-up 0 button · locator health 95% (Stable) */
    this.topUp0Button = page.getByRole("button", { name: "Top-up 0" });
    /** Super top-up 0 button · locator health 95% (Stable) */
    this.superTopUp0Button = page.getByRole("button", { name: "Super top-up 0" });
    /** Critical illness 0 button · locator health 95% (Stable) */
    this.criticalIllness0Button = page.getByRole("button", { name: "Critical illness 0" });
    this.heading = this.compareInsuranceHeading;
    this.sidebar = new Sidebar(page);
    this.tabs = new Tabs(page);
    this.toast = new Toast(page);
  }

  async fillCompareInsurance(data: { sortByDefaultOrderLowestStartingPremiumHighestSumInsuredNameAZ?: string }): Promise<void> {
    if (data.sortByDefaultOrderLowestStartingPremiumHighestSumInsuredNameAZ !== undefined) await this.sortByDefaultOrderLowestSelect.selectOption({ label: data.sortByDefaultOrderLowestStartingPremiumHighestSumInsuredNameAZ }).catch(async () => { await this.sortByDefaultOrderLowestSelect.selectOption({ index: 1 }); });
  }

  async submitCompareInsurance(): Promise<void> {
    await this.healthInsuranceButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickLifeInsurance(): Promise<void> {
    await this.lifeInsuranceButton.click();
  }

  async clickAllHealth(): Promise<void> {
    await this.allHealthButton.click();
  }

  async clickIndividualHealth1(): Promise<void> {
    await this.individualHealth1Button.click();
  }

  async clickFamilyFloater1(): Promise<void> {
    await this.familyFloater1Button.click();
  }

  async clickSeniorCitizen1(): Promise<void> {
    await this.seniorCitizen1Button.click();
  }

  async clickTopUp0(): Promise<void> {
    await this.topUp0Button.click();
  }

  async clickSuperTopUp0(): Promise<void> {
    await this.superTopUp0Button.click();
  }

  async clickCriticalIllness0(): Promise<void> {
    await this.criticalIllness0Button.click();
  }
}
