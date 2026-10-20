import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Vision Term Shield — Summarises key metrics and recent activity, and acts as the main entry point after sign-in.
 * Module: Dashboard · Route: /applications/app_247fe1148322 · Risk: Critical · Locator health: 95%
 */
export class VisionTermShieldPage extends BasePage {
  readonly path = "/applications/app_247fe1148322";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/applications/app_247fe1148322(?:[?#].*)?$");
  readonly visionTermShieldHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly viewPolicyLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Vision Term Shield” · locator health 95% (Stable) */
    this.visionTermShieldHeading = page.getByRole("heading", { name: "Vision Term Shield", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** View policy link · locator health 95% (Stable) */
    this.viewPolicyLink = page.getByRole("link", { name: "View policy" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.visionTermShieldHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickViewPolicy(): Promise<void> {
    await this.viewPolicyLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
