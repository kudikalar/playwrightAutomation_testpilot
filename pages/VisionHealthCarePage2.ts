import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DatePicker } from '../components/DatePicker';

/**
 * Vision Health Care — Summarises key metrics and recent activity, and acts as the main entry point after sign-in.
 * Module: Dashboard · Route: /dashboard · Risk: Critical · Locator health: 77%
 */
export class VisionHealthCarePage2 extends BasePage {
  readonly path = "/dashboard";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/dashboard(?:[?#].*)?$");
  readonly goodMorningAshaHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly yourNextStepPremiumDueLink: Locator;
  readonly activePolicies2Link: Locator;
  readonly pendingApplications0Link: Locator;
  readonly openClaims1Link: Locator;
  readonly premiumsDue30Days1Link: Locator;
  readonly detailsLink: Locator;
  readonly detailsLink2: Locator;
  readonly viewAllLink: Locator;
  readonly healthActiveVisionFamilyLink: Locator;
  readonly sidebar: Sidebar;
  readonly datePicker: DatePicker;

  constructor(page: Page) {
    super(page);
    /** Page heading “Good morning, Asha” · locator health 95% (Stable) */
    this.goodMorningAshaHeading = page.getByRole("heading", { name: "Asha" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Your next step Premium due · ₹998.80 VHC-L-00000 link · locator health 95% (Stable) */
    this.yourNextStepPremiumDueLink = page.getByRole("link", { name: "Your next step Premium due · ₹998.80 VHC-L-000002: installment 2 due 2026-10-24 Continue" });
    /** Active policies › 2 link · locator health 95% (Stable) */
    this.activePolicies2Link = page.getByRole("link", { name: "Active policies › 2" });
    /** Pending applications › 0 link · locator health 95% (Stable) */
    this.pendingApplications0Link = page.getByRole("link", { name: "Pending applications › 0" });
    /** Open claims › 1 link · locator health 95% (Stable) */
    this.openClaims1Link = page.getByRole("link", { name: "Open claims › 1" });
    /** Premiums due (30 days) › 1 ₹998.80 link · locator health 95% (Stable) */
    this.premiumsDue30Days1Link = page.getByRole("link", { name: "Premiums due (30 days) › 1 ₹998.80" });
    /** Details link · locator health 28% (Very Risky) */
    this.detailsLink = page.locator("div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > section:nth-of-type(1) > div > div > a");
    /** Details link · locator health 28% (Very Risky) */
    this.detailsLink2 = page.locator("div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > section:nth-of-type(2) > div:nth-of-type(1) > div > a");
    /** View all link · locator health 28% (Very Risky) */
    this.viewAllLink = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(1) > div > a");
    /** Health Active Vision Family Floater VHC-H-000001 link · locator health 95% (Stable) */
    this.healthActiveVisionFamilyLink = page.getByRole("link", { name: "Health Active Vision Family Floater VHC-H-000001 · until 20 Jun 2027 ₹10,00,000.00 availab" });
    this.heading = this.goodMorningAshaHeading;
    this.sidebar = new Sidebar(page);
    this.datePicker = new DatePicker(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickYourNextStepPremiumD(): Promise<void> {
    await this.yourNextStepPremiumDueLink.click();
  }

  async clickActivePolicies2(): Promise<void> {
    await this.activePolicies2Link.click();
  }

  async clickPendingApplications0(): Promise<void> {
    await this.pendingApplications0Link.click();
  }

  async clickOpenClaims1(): Promise<void> {
    await this.openClaims1Link.click();
  }

  async clickPremiumsDue30Days(): Promise<void> {
    await this.premiumsDue30Days1Link.click();
  }

  async clickDetails(): Promise<void> {
    await this.detailsLink.click();
  }

  async clickDetails2(): Promise<void> {
    await this.detailsLink2.click();
  }

  async clickViewAll(): Promise<void> {
    await this.viewAllLink.click();
  }

  async clickHealthActiveVisionFam(): Promise<void> {
    await this.healthActiveVisionFamilyLink.click();
  }
}
