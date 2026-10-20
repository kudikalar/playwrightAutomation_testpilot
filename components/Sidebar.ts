import { expect, type Page, type Locator } from '@playwright/test';

/**
 * Sidebar — Primary navigation shared by every authenticated page
 * Used by: Health insurance, explained honestly., Compare insurance, Quote calculator, Find hospitals & providers, Coverage needs planner, Report a life insurance claim, Sign in, Create your account, Support, Health services, Vision Health Care, My payment failed or is pending — what now? (+45)
 */
export class Sidebar {
  readonly root: Locator;
  readonly visionHealthCareLink: Locator;
  readonly plansLink: Locator;
  readonly getAQuoteLink: Locator;
  readonly hospitalsLink: Locator;
  readonly coverPlannerLink: Locator;
  readonly enEnglishLink: Locator;
  readonly aLink: Locator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;
  readonly reportALifeClaimLink: Locator;
  readonly claimHelpLink: Locator;
  readonly n3Link: Locator;
  readonly avAshaVermaCustomerLink: Locator;
  readonly signOutLink: Locator;
  readonly homeLink: Locator;
  readonly exploreCoverLink: Locator;

  constructor(readonly page: Page) {
    this.root = page.getByRole('navigation').first();
    this.visionHealthCareLink = page.getByRole("link", { name: "Vision Health Care" });
    this.plansLink = page.getByRole("link", { name: "Plans" });
    this.getAQuoteLink = page.getByRole("link", { name: "Get a quote" });
    this.hospitalsLink = page.getByRole("link", { name: "Hospitals" });
    this.coverPlannerLink = page.getByRole("link", { name: "Cover planner" });
    this.enEnglishLink = page.getByRole("combobox", { name: "Language" });
    this.aLink = page.getByRole("button", { name: "Larger text" });
    this.signInLink = page.getByRole("link", { name: "Sign in" });
    this.createAccountLink = page.getByRole("link", { name: "Create account" });
    this.reportALifeClaimLink = page.getByRole("link", { name: "Report a life claim" });
    this.claimHelpLink = page.getByRole("link", { name: "Claim help" });
    this.n3Link = page.getByRole("link", { name: "Notifications, 3 unread" });
    this.avAshaVermaCustomerLink = page.getByRole("link", { name: "AV Asha Verma Customer" });
    this.signOutLink = page.getByRole("button", { name: "Sign out" });
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.exploreCoverLink = page.getByRole("link", { name: "Explore cover" });
  }

  async goToVisionHealthCare(): Promise<void> {
    await this.visionHealthCareLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToPlans(): Promise<void> {
    await this.plansLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToGetAQuote(): Promise<void> {
    await this.getAQuoteLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToHospitals(): Promise<void> {
    await this.hospitalsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToCoverPlanner(): Promise<void> {
    await this.coverPlannerLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToEnEnglish(): Promise<void> {
    await this.enEnglishLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToA(): Promise<void> {
    await this.aLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToSignIn(): Promise<void> {
    await this.signInLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToCreateAccount(): Promise<void> {
    await this.createAccountLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToReportALifeClaim(): Promise<void> {
    await this.reportALifeClaimLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToClaimHelp(): Promise<void> {
    await this.claimHelpLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goTo3(): Promise<void> {
    await this.n3Link.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToAvAshaVermaCustomer(): Promise<void> {
    await this.avAshaVermaCustomerLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToSignOut(): Promise<void> {
    await this.signOutLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToExploreCover(): Promise<void> {
    await this.exploreCoverLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
  }
}
