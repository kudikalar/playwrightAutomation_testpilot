import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Sign in — Authenticates users with their credentials and starts an authenticated session.
 * Module: Authentication · Route: /login · Risk: Critical · Locator health: 95%
 */
export class LoginPage extends BasePage {
  readonly path = "/login";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/login(?:[?#].*)?$");
  readonly welcomeBackHeading: Locator;
  readonly emailAddressOrUsernameInput: Locator;
  readonly passwordShowInput: Locator;
  readonly rememberThisDeviceFor7DCheckbox: Locator;
  readonly signInButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly customerAshaButton: Locator;
  readonly customerRahulButton: Locator;
  readonly agentButton: Locator;
  readonly underwriterButton: Locator;
  readonly claimsOfficerButton: Locator;
  readonly claimsOfficer2Button: Locator;
  readonly adminButton: Locator;
  readonly superAdminButton: Locator;
  readonly customerArjunButton: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Welcome back.” · locator health 95% (Stable) */
    this.welcomeBackHeading = page.getByRole("heading", { name: "Welcome back.", exact: true });
    /** Email address or username field · locator health 95% (Stable) */
    this.emailAddressOrUsernameInput = page.getByRole("textbox", { name: "Email address or username" });
    /** Password Show field · locator health 95% (Stable) */
    this.passwordShowInput = page.getByRole("textbox", { name: "Password Show" });
    /** Remember this device for 7 days field · locator health 95% (Stable) */
    this.rememberThisDeviceFor7DCheckbox = page.getByRole("checkbox", { name: "Remember this device for 7 days" });
    /** Sign in button · locator health 95% (Stable) */
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Customer (Asha) button · locator health 95% (Stable) */
    this.customerAshaButton = page.getByRole("button", { name: "Customer (Asha)" });
    /** Customer (Rahul) button · locator health 95% (Stable) */
    this.customerRahulButton = page.getByRole("button", { name: "Customer (Rahul)" });
    /** Agent button · locator health 95% (Stable) */
    this.agentButton = page.getByRole("button", { name: "Agent" });
    /** Underwriter button · locator health 95% (Stable) */
    this.underwriterButton = page.getByRole("button", { name: "Underwriter" });
    /** Claims officer button · locator health 95% (Stable) */
    this.claimsOfficerButton = page.getByRole("button", { name: "Claims officer" });
    /** Claims officer 2 button · locator health 95% (Stable) */
    this.claimsOfficer2Button = page.getByRole("button", { name: "Claims officer 2" });
    /** Admin button · locator health 95% (Stable) */
    this.adminButton = page.getByRole("button", { name: "Admin" });
    /** Super admin button · locator health 95% (Stable) */
    this.superAdminButton = page.getByRole("button", { name: "Super admin" });
    /** Customer (Arjun) button · locator health 95% (Stable) */
    this.customerArjunButton = page.getByRole("button", { name: "Customer (Arjun)" });
    this.heading = this.welcomeBackHeading;
    this.sidebar = new Sidebar(page);
  }

  /** Sign in. Credentials always come from the environment — never hardcode them. */
  async login(username: string, password: string): Promise<void> {
    await this.emailAddressOrUsernameInput.fill(username);
    await this.passwordShowInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoginError(): Promise<void> {
    await expect(this.page).toHaveURL(this.urlPattern);
    await expect(this.page.getByRole('alert').or(this.page.getByText(/invalid|incorrect|wrong|failed/i)).first()).toBeVisible();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickCustomerAsha(): Promise<void> {
    await this.customerAshaButton.click();
  }

  async clickCustomerRahul(): Promise<void> {
    await this.customerRahulButton.click();
  }

  async clickAgent(): Promise<void> {
    await this.agentButton.click();
  }

  async clickUnderwriter(): Promise<void> {
    await this.underwriterButton.click();
  }

  async clickClaimsOfficer(): Promise<void> {
    await this.claimsOfficerButton.click();
  }

  async clickClaimsOfficer2(): Promise<void> {
    await this.claimsOfficer2Button.click();
  }

  async clickAdmin(): Promise<void> {
    await this.adminButton.click();
  }

  async clickSuperAdmin(): Promise<void> {
    await this.superAdminButton.click();
  }

  async clickCustomerArjun(): Promise<void> {
    await this.customerArjunButton.click();
  }
}
