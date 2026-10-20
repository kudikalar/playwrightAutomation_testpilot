import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Knowledge base — Content page presenting information about knowledge base.
 * Module: Support & Help · Route: /support/kb · Risk: Low · Locator health: 95%
 */
export class KnowledgeBasePage extends BasePage {
  readonly path = "/support/kb";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/support/kb(?:[?#].*)?$");
  readonly knowledgeBaseHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly gettingHelpSupportTicketLink: Locator;
  readonly paymentsMyPaymentFailedOLink: Locator;
  readonly claimsCashlessTreatmentAtLink: Locator;
  readonly privacyYourDataRightsExLink: Locator;
  readonly accessibilityLanguageAndTLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Knowledge base” · locator health 95% (Stable) */
    this.knowledgeBaseHeading = page.getByRole("heading", { name: "Knowledge base", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Getting help Support ticket, grievance or insure link · locator health 95% (Stable) */
    this.gettingHelpSupportTicketLink = page.getByRole("link", { name: "Getting help Support ticket, grievance or insurer complaint — which one do I need? A suppo" });
    /** Payments My payment failed or is pending — what  link · locator health 95% (Stable) */
    this.paymentsMyPaymentFailedOLink = page.getByRole("link", { name: "Payments My payment failed or is pending — what now? If a payment fails you have not been " });
    /** Claims Cashless treatment at a network hospital  link · locator health 95% (Stable) */
    this.claimsCashlessTreatmentAtLink = page.getByRole("link", { name: "Claims Cashless treatment at a network hospital At a network hospital, the hospital reques" });
    /** Privacy Your data rights: export and deletion Yo link · locator health 95% (Stable) */
    this.privacyYourDataRightsExLink = page.getByRole("link", { name: "Privacy Your data rights: export and deletion You can request a copy of your data or ask u" });
    /** Accessibility Language and text size Use the lan link · locator health 95% (Stable) */
    this.accessibilityLanguageAndTLink = page.getByRole("link", { name: "Accessibility Language and text size Use the language selector in the top bar to switch be" });
    this.heading = this.knowledgeBaseHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickGettingHelpSupportTic(): Promise<void> {
    await this.gettingHelpSupportTicketLink.click();
  }

  async clickPaymentsMyPaymentFail(): Promise<void> {
    await this.paymentsMyPaymentFailedOLink.click();
  }

  async clickClaimsCashlessTreatmen(): Promise<void> {
    await this.claimsCashlessTreatmentAtLink.click();
  }

  async clickPrivacyYourDataRights(): Promise<void> {
    await this.privacyYourDataRightsExLink.click();
  }

  async clickAccessibilityLanguageA(): Promise<void> {
    await this.accessibilityLanguageAndTLink.click();
  }
}
