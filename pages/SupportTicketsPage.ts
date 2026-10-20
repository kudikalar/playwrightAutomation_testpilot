import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';

/**
 * Support tickets — Displays support tickets data in tabular form.
 * Module: Support & Help · Route: /support/tickets · Risk: Low · Locator health: 95%
 */
export class SupportTicketsPage extends BasePage {
  readonly path = "/support/tickets";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/support/tickets(?:[?#].*)?$");
  readonly supportTicketsHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly raiseAGrievanceLink: Locator;
  readonly newTicketButton: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;

  constructor(page: Page) {
    super(page);
    /** Page heading “Support tickets” · locator health 95% (Stable) */
    this.supportTicketsHeading = page.getByRole("heading", { name: "Support tickets", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Raise a grievance → link · locator health 95% (Stable) */
    this.raiseAGrievanceLink = page.getByRole("link", { name: "Raise a grievance →" });
    /** New ticket button · locator health 95% (Stable) */
    this.newTicketButton = page.getByRole("button", { name: "New ticket" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.supportTicketsHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickRaiseAGrievance(): Promise<void> {
    await this.raiseAGrievanceLink.click();
  }

  async clickNewTicket(): Promise<void> {
    await this.newTicketButton.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
