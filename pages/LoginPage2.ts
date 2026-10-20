import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Create your account — Lets new users create an account.
 * Module: Authentication · Route: /register · Risk: Critical · Locator health: 95%
 */
export class LoginPage2 extends BasePage {
  readonly path = "/register";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/register(?:[?#].*)?$");
  readonly coverThatIsClearFromTheHeading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameOptionalInput: Locator;
  readonly emailAddressInput: Locator;
  readonly mobileNumber91Input: Locator;
  readonly passwordShowInput: Locator;
  readonly confirmPasswordShowInput: Locator;
  readonly iAcceptTheTermsOfUseAnCheckbox: Locator;
  readonly sendMeProductNewsAndOffCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Cover that is clear from the first click.” · locator health 95% (Stable) */
    this.coverThatIsClearFromTheHeading = page.getByRole("heading", { name: "Cover that is clear from the first click.", exact: true });
    /** First name field · locator health 95% (Stable) */
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    /** Last name (optional) field · locator health 95% (Stable) */
    this.lastNameOptionalInput = page.getByRole("textbox", { name: "Last name (optional)" });
    /** Email address field · locator health 95% (Stable) */
    this.emailAddressInput = page.getByRole("textbox", { name: "Email address" });
    /** Mobile number +91 field · locator health 95% (Stable) */
    this.mobileNumber91Input = page.getByRole("textbox", { name: "Mobile number +91" });
    /** Password Show field · locator health 95% (Stable) */
    this.passwordShowInput = page.getByRole("textbox", { name: "Password Show" });
    /** Confirm password Show field · locator health 95% (Stable) */
    this.confirmPasswordShowInput = page.getByRole("textbox", { name: "Confirm password Show" });
    /** I accept the terms of use and acknowledge the privacy notice. field · locator health 95% (Stable) */
    this.iAcceptTheTermsOfUseAnCheckbox = page.getByRole("checkbox", { name: "I accept the terms of use and acknowledge the privacy notice." });
    /** Send me product news and offers (optial). field · locator health 95% (Stable) */
    this.sendMeProductNewsAndOffCheckbox = page.getByRole("checkbox", { name: "Send me product news and offers (optial)." });
    /** Create account button · locator health 95% (Stable) */
    this.createAccountButton = page.getByRole("button", { name: "Create account" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    this.heading = this.coverThatIsClearFromTheHeading;
    this.sidebar = new Sidebar(page);
  }

  /** Sign in. Credentials always come from the environment — never hardcode them. */
  async login(username: string, password: string): Promise<void> {
    await this.firstNameInput.fill(username);
    await this.passwordShowInput.fill(password);
    await this.createAccountButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoginError(): Promise<void> {
    await expect(this.page).toHaveURL(this.urlPattern);
    await expect(this.page.getByRole('alert').or(this.page.getByText(/invalid|incorrect|wrong|failed/i)).first()).toBeVisible();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }
}
