import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Reset your password — Lets users recover access to their account.
 * Module: Authentication · Route: /forgot-password · Risk: Critical · Locator health: 95%
 */
export class ResetYourPasswordPage extends BasePage {
  readonly path = "/forgot-password";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/forgot-password(?:[?#].*)?$");
  readonly resetYourPasswordHeading: Locator;
  readonly emailAddressInput: Locator;
  readonly sendResetLinkButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Reset your password” · locator health 95% (Stable) */
    this.resetYourPasswordHeading = page.getByRole("heading", { name: "Reset your password", exact: true });
    /** Email address field · locator health 95% (Stable) */
    this.emailAddressInput = page.getByRole("textbox", { name: "Email address" });
    /** Send reset link button · locator health 95% (Stable) */
    this.sendResetLinkButton = page.getByRole("button", { name: "Send reset link" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    this.heading = this.resetYourPasswordHeading;
    this.sidebar = new Sidebar(page);
  }

  async fillResetYourPassword(data: { emailAddress?: string }): Promise<void> {
    if (data.emailAddress !== undefined) await this.emailAddressInput.fill(data.emailAddress);
  }

  async submitResetYourPassword(): Promise<void> {
    await this.sendResetLinkButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }
}
