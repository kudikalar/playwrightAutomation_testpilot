import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * Employee benefits — Content page presenting information about employee benefits.
 * Module: Employee Management · Route: /benefits · Risk: High · Locator health: 95%
 */
export class EmployeeBenefitsPage extends BasePage {
  readonly path = "/benefits";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/benefits(?:[?#].*)?$");
  readonly employeeBenefitsHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “Employee benefits” · locator health 95% (Stable) */
    this.employeeBenefitsHeading = page.getByRole("heading", { name: "Employee benefits", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.employeeBenefitsHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
