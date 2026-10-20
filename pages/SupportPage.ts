import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Support — Content page presenting information about support.
 * Module: Support & Help · Route: /support · Risk: Low · Locator health: 88%
 */
export class SupportPage extends BasePage {
  readonly path = "/support";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/support(?:[?#].*)?$");
  readonly supportHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly knowledgeBaseLink: Locator;
  readonly plannedHospitalStayRequesLink: Locator;
  readonly alreadyPaidTheHospitalClLink: Locator;
  readonly reportADeathClaimForNomLink: Locator;
  readonly trackAnExistingClaimSeeLink: Locator;
  readonly raiseAGrievanceLink: Locator;
  readonly signInLink: Locator;
  readonly grievancesLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Support” · locator health 95% (Stable) */
    this.supportHeading = page.getByRole("heading", { name: "Support", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Knowledge base link · locator health 95% (Stable) */
    this.knowledgeBaseLink = page.getByRole("link", { name: "Knowledge base" });
    /** Planned hospital stay Request cashless pre-autho link · locator health 95% (Stable) */
    this.plannedHospitalStayRequesLink = page.getByRole("link", { name: "Planned hospital stay Request cashless pre-authorisation at a network hospital before admi" });
    /** Already paid the hospital Claim reimbursement wi link · locator health 95% (Stable) */
    this.alreadyPaidTheHospitalClLink = page.getByRole("link", { name: "Already paid the hospital Claim reimbursement with your bills, prescriptions and discharge" });
    /** Report a death claim For nominees and family. No link · locator health 95% (Stable) */
    this.reportADeathClaimForNomLink = page.getByRole("link", { name: "Report a death claim For nominees and family. No login of the policyholder is needed. Repo" });
    /** Track an existing claim See the current stage, w link · locator health 95% (Stable) */
    this.trackAnExistingClaimSeeLink = page.getByRole("link", { name: "Track an existing claim See the current stage, who needs to act next and any documents we'" });
    /** Raise a grievance → link · locator health 95% (Stable) */
    this.raiseAGrievanceLink = page.getByRole("link", { name: "Raise a grievance →" });
    /** Sign in link · locator health 28% (Very Risky) */
    this.signInLink = page.locator("#main > section:nth-of-type(4) > p > a");
    /** Grievances → link · locator health 95% (Stable) */
    this.grievancesLink = page.getByRole("link", { name: "Grievances →" });
    this.heading = this.supportHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickKnowledgeBase(): Promise<void> {
    await this.knowledgeBaseLink.click();
  }

  async clickPlannedHospitalStayRe(): Promise<void> {
    await this.plannedHospitalStayRequesLink.click();
  }

  async clickAlreadyPaidTheHospita(): Promise<void> {
    await this.alreadyPaidTheHospitalClLink.click();
  }

  async clickReportADeathClaimFor(): Promise<void> {
    await this.reportADeathClaimForNomLink.click();
  }

  async clickTrackAnExistingClaim(): Promise<void> {
    await this.trackAnExistingClaimSeeLink.click();
  }

  async clickRaiseAGrievance(): Promise<void> {
    await this.raiseAGrievanceLink.click();
  }

  async clickSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async clickGrievances(): Promise<void> {
    await this.grievancesLink.click();
  }
}
