import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { Toast } from '../components/Toast';

/**
 * Vision AI — Collects user input (Your question).
 * Module: Company · Route: /assistant · Risk: Low · Locator health: 95%
 */
export class VisionAiPage extends BasePage {
  readonly path = "/assistant";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/assistant(?:[?#].*)?$");
  readonly visionAiHeading: Locator;
  readonly yourQuestionInput: Locator;
  readonly askButton: Locator;
  readonly answerLanguageSelect: Locator;
  readonly policyToAskAboutSelect: Locator;
  readonly skipToMainContentLink: Locator;
  readonly whatIsNotCoveredByMyHeButton: Locator;
  readonly howMuchWouldIGetForAButton: Locator;
  readonly areThereWaitingPeriodsFoButton: Locator;
  readonly whoAreMyNomineesButton: Locator;
  readonly whenIsMyNextPremiumDueButton: Locator;
  readonly whatHappensIfIMissAPreButton: Locator;
  readonly sidebar: Sidebar;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Vision AI” · locator health 95% (Stable) */
    this.visionAiHeading = page.getByRole("heading", { name: "Vision AI", exact: true });
    /** Your question field · locator health 95% (Stable) */
    this.yourQuestionInput = page.getByRole("textbox", { name: "Your question" });
    /** Ask button · locator health 95% (Stable) */
    this.askButton = page.getByRole("button", { name: "Send" });
    /** Answer language field · locator health 95% (Stable) */
    this.answerLanguageSelect = page.getByRole("combobox", { name: "Answer language" });
    /** Policy to ask about field · locator health 95% (Stable) */
    this.policyToAskAboutSelect = page.getByRole("combobox", { name: "Policy to ask about" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** What is not covered by my health policy? button · locator health 95% (Stable) */
    this.whatIsNotCoveredByMyHeButton = page.getByRole("button", { name: "What is not covered by my health policy?" });
    /** How much would I get for a ₹1,00,000 hospital bi button · locator health 95% (Stable) */
    this.howMuchWouldIGetForAButton = page.getByRole("button", { name: "How much would I get for a ₹1,00,000 hospital bill?" });
    /** Are there waiting periods for diabetes? button · locator health 95% (Stable) */
    this.areThereWaitingPeriodsFoButton = page.getByRole("button", { name: "Are there waiting periods for diabetes?" });
    /** Who are my nominees? button · locator health 95% (Stable) */
    this.whoAreMyNomineesButton = page.getByRole("button", { name: "Who are my nominees?" });
    /** When is my next premium due? button · locator health 95% (Stable) */
    this.whenIsMyNextPremiumDueButton = page.getByRole("button", { name: "When is my next premium due?" });
    /** What happens if I miss a premium? button · locator health 95% (Stable) */
    this.whatHappensIfIMissAPreButton = page.getByRole("button", { name: "What happens if I miss a premium?" });
    this.heading = this.visionAiHeading;
    this.sidebar = new Sidebar(page);
    this.toast = new Toast(page);
  }

  async fillAskAboutYourCover(data: { yourQuestion?: string }): Promise<void> {
    if (data.yourQuestion !== undefined) await this.yourQuestionInput.fill(data.yourQuestion);
  }

  async fillAskAboutYourCover2(data: { answerLanguage?: string; policyToAskAbout?: string }): Promise<void> {
    if (data.answerLanguage !== undefined) await this.answerLanguageSelect.selectOption({ label: data.answerLanguage }).catch(async () => { await this.answerLanguageSelect.selectOption({ index: 1 }); });
    if (data.policyToAskAbout !== undefined) await this.policyToAskAboutSelect.selectOption({ label: data.policyToAskAbout }).catch(async () => { await this.policyToAskAboutSelect.selectOption({ index: 1 }); });
  }

  async submitAskAboutYourCover(): Promise<void> {
    await this.askButton.click();
  }

  async submitAskAboutYourCover2(): Promise<void> {
    await this.askButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickWhatIsNotCoveredByM(): Promise<void> {
    await this.whatIsNotCoveredByMyHeButton.click();
  }

  async clickHowMuchWouldIGetFor(): Promise<void> {
    await this.howMuchWouldIGetForAButton.click();
  }

  async clickAreThereWaitingPeriod(): Promise<void> {
    await this.areThereWaitingPeriodsFoButton.click();
  }

  async clickWhoAreMyNominees(): Promise<void> {
    await this.whoAreMyNomineesButton.click();
  }

  async clickWhenIsMyNextPremium(): Promise<void> {
    await this.whenIsMyNextPremiumDueButton.click();
  }

  async clickWhatHappensIfIMissA(): Promise<void> {
    await this.whatHappensIfIMissAPreButton.click();
  }
}
