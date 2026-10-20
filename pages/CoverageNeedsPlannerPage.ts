import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';
import { Toast } from '../components/Toast';

/**
 * Coverage needs planner — Creates or updates coverage needs planner records through a 10-field form.
 * Module: Orders & Checkout · Route: /planner · Risk: High · Locator health: 95%
 */
export class CoverageNeedsPlannerPage extends BasePage {
  readonly path = "/planner";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/planner(?:[?#].*)?$");
  readonly coverageNeedsPlannerHeading: Locator;
  readonly essentialYearlyHouseholdEInput: Locator;
  readonly yearsOfSupportYouWantToInput: Locator;
  readonly outstandingLoansHomeCarInput: Locator;
  readonly childrenSEducationOptionaInput: Locator;
  readonly marriageExpensesOptionalInput: Locator;
  readonly otherGoalsOptionalInput: Locator;
  readonly savingsYourFamilyCouldUsInput: Locator;
  readonly existingLifeCoverIncludinInput: Locator;
  readonly yourAnnualIncomeOptionalInput: Locator;
  readonly yearsOfSupportSliderInput: Locator;
  readonly saveScenarioButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly quote1250000000TermCLink: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Coverage needs planner” · locator health 95% (Stable) */
    this.coverageNeedsPlannerHeading = page.getByRole("heading", { name: "Coverage needs planner", exact: true });
    /** Essential yearly household expenses Rent, food, school fees, bills ₹ field · locator health 95% (Stable) */
    this.essentialYearlyHouseholdEInput = page.getByRole("textbox", { name: "Essential yearly household expenses Rent, food, school fees, bills ₹" });
    /** Years of support you want to provide e.g. until children finish college years field · locator health 95% (Stable) */
    this.yearsOfSupportYouWantToInput = page.getByRole("textbox", { name: "Years of support you want to provide e.g. until children finish college years" });
    /** Outstanding loans Home, car, personal ₹ field · locator health 95% (Stable) */
    this.outstandingLoansHomeCarInput = page.getByRole("textbox", { name: "Outstanding loans Home, car, personal ₹" });
    /** Children's education Optional ₹ field · locator health 95% (Stable) */
    this.childrenSEducationOptionaInput = page.getByRole("textbox", { name: "Children's education Optional ₹" });
    /** Marriage expenses Optional ₹ field · locator health 95% (Stable) */
    this.marriageExpensesOptionalInput = page.getByRole("textbox", { name: "Marriage expenses Optional ₹" });
    /** Other goals Optional ₹ field · locator health 95% (Stable) */
    this.otherGoalsOptionalInput = page.getByRole("textbox", { name: "Other goals Optional ₹" });
    /** Savings your family could use FDs, mutual funds — exclude your home ₹ field · locator health 95% (Stable) */
    this.savingsYourFamilyCouldUsInput = page.getByRole("textbox", { name: "Savings your family could use FDs, mutual funds — exclude your home ₹" });
    /** Existing life cover Including employer group cover ₹ field · locator health 95% (Stable) */
    this.existingLifeCoverIncludinInput = page.getByRole("textbox", { name: "Existing life cover Including employer group cover ₹" });
    /** Your annual income Optional ₹ field · locator health 95% (Stable) */
    this.yourAnnualIncomeOptionalInput = page.getByRole("textbox", { name: "Your annual income Optional ₹" });
    /** Years of support slider field · locator health 95% (Stable) */
    this.yearsOfSupportSliderInput = page.getByRole("slider", { name: "Years of support slider" });
    /** Save scenario button · locator health 95% (Stable) */
    this.saveScenarioButton = page.getByRole("button", { name: "Save scenario" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Quote ₹1,25,00,000.00 term cover link · locator health 95% (Stable) */
    this.quote1250000000TermCLink = page.getByRole("link", { name: "Quote ₹1,25,00,000.00 term cover" });
    this.heading = this.coverageNeedsPlannerHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
    this.toast = new Toast(page);
  }

  async fillYourFamilySnumbers(data: { essentialYearlyHouseholdExpensesRentFoodSchoolFeesBills?: string; yearsOfSupportYouWantToProvideEGUntilChildrenFinishCollegeYears?: string; outstandingLoansHomeCarPersonal?: string; childrenSEducationOptional?: string; marriageExpensesOptional?: string; otherGoalsOptional?: string; savingsYourFamilyCouldUseFdsMutualFundsExcludeYourHome?: string; existingLifeCoverIncludingEmployerGroupCover?: string; yourAnnualIncomeOptional?: string; yearsOfSupportSlider?: string }): Promise<void> {
    if (data.essentialYearlyHouseholdExpensesRentFoodSchoolFeesBills !== undefined) await this.essentialYearlyHouseholdEInput.fill(data.essentialYearlyHouseholdExpensesRentFoodSchoolFeesBills);
    if (data.yearsOfSupportYouWantToProvideEGUntilChildrenFinishCollegeYears !== undefined) await this.yearsOfSupportYouWantToInput.fill(data.yearsOfSupportYouWantToProvideEGUntilChildrenFinishCollegeYears);
    if (data.outstandingLoansHomeCarPersonal !== undefined) await this.outstandingLoansHomeCarInput.fill(data.outstandingLoansHomeCarPersonal);
    if (data.childrenSEducationOptional !== undefined) await this.childrenSEducationOptionaInput.fill(data.childrenSEducationOptional);
    if (data.marriageExpensesOptional !== undefined) await this.marriageExpensesOptionalInput.fill(data.marriageExpensesOptional);
    if (data.otherGoalsOptional !== undefined) await this.otherGoalsOptionalInput.fill(data.otherGoalsOptional);
    if (data.savingsYourFamilyCouldUseFdsMutualFundsExcludeYourHome !== undefined) await this.savingsYourFamilyCouldUsInput.fill(data.savingsYourFamilyCouldUseFdsMutualFundsExcludeYourHome);
    if (data.existingLifeCoverIncludingEmployerGroupCover !== undefined) await this.existingLifeCoverIncludinInput.fill(data.existingLifeCoverIncludingEmployerGroupCover);
    if (data.yourAnnualIncomeOptional !== undefined) await this.yourAnnualIncomeOptionalInput.fill(data.yourAnnualIncomeOptional);
    if (data.yearsOfSupportSlider !== undefined) await this.yearsOfSupportSliderInput.fill(data.yearsOfSupportSlider);
  }

  async submitYourFamilySnumbers(): Promise<void> {
    await this.saveScenarioButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickQuote1250000000Te(): Promise<void> {
    await this.quote1250000000TermCLink.click();
  }
}
