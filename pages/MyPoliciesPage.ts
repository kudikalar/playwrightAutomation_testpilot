import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * My policies — Content page presenting information about my policies.
 * Module: Policies · Route: /policies · Risk: Low · Locator health: 95%
 */
export class MyPoliciesPage extends BasePage {
  readonly path = "/policies";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/policies(?:[?#].*)?$");
  readonly myPoliciesHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly addFamilyMemberLink: Locator;
  readonly allButton: Locator;
  readonly healthButton: Locator;
  readonly lifeButton: Locator;
  readonly healthFloaterActiveVisiLink: Locator;
  readonly termLifeActiveVisionTermLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “My policies” · locator health 95% (Stable) */
    this.myPoliciesHeading = page.getByRole("heading", { name: "My policies", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Add family member link · locator health 95% (Stable) */
    this.addFamilyMemberLink = page.getByRole("link", { name: "Add family member" });
    /** All button · locator health 95% (Stable) */
    this.allButton = page.getByRole("button", { name: "All" });
    /** Health button · locator health 95% (Stable) */
    this.healthButton = page.getByRole("button", { name: "Health" });
    /** Life button · locator health 95% (Stable) */
    this.lifeButton = page.getByRole("button", { name: "Life" });
    /** Health · Floater Active Vision Family Floater VH link · locator health 95% (Stable) */
    this.healthFloaterActiveVisiLink = page.getByRole("link", { name: "Health · Floater Active Vision Family Floater VHC-H-000001 · 21 Jun 2026 – 20 Jun 2027 VHC" });
    /** Term life Active Vision Term Shield VHC-L-000002 link · locator health 95% (Stable) */
    this.termLifeActiveVisionTermLink = page.getByRole("link", { name: "Term life Active Vision Term Shield VHC-L-000002 · 24 Sept 2026 – 23 Sept 2051 VHC Sandbox" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.myPoliciesHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAddFamilyMember(): Promise<void> {
    await this.addFamilyMemberLink.click();
  }

  async clickAll(): Promise<void> {
    await this.allButton.click();
  }

  async clickHealth(): Promise<void> {
    await this.healthButton.click();
  }

  async clickLife(): Promise<void> {
    await this.lifeButton.click();
  }

  async clickHealthFloaterActive(): Promise<void> {
    await this.healthFloaterActiveVisiLink.click();
  }

  async clickTermLifeActiveVision(): Promise<void> {
    await this.termLifeActiveVisionTermLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
