import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { Tabs } from '../components/Tabs';

/**
 * Portability & migration — Content page presenting information about portability & migration.
 * Module: Portability · Route: /portability · Risk: Low · Locator health: 95%
 */
export class PortabilityMigrationPage extends BasePage {
  readonly path = "/portability";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/portability(?:[?#].*)?$");
  readonly portabilityMigrationHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly myRequests0Button: Locator;
  readonly newRequestButton: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly tabs: Tabs;

  constructor(page: Page) {
    super(page);
    /** Page heading “Portability & migration” · locator health 95% (Stable) */
    this.portabilityMigrationHeading = page.getByRole("heading", { name: "Portability & migration", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** My requests (0) tab · locator health 95% (Stable) */
    this.myRequests0Button = page.getByRole("tab", { name: "My requests (0)" });
    /** New request tab · locator health 95% (Stable) */
    this.newRequestButton = page.getByRole("tab", { name: "New request" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.portabilityMigrationHeading;
    this.sidebar = new Sidebar(page);
    this.tabs = new Tabs(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickMyRequests0(): Promise<void> {
    await this.myRequests0Button.click();
  }

  async clickNewRequest(): Promise<void> {
    await this.newRequestButton.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
