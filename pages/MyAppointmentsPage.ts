import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * My appointments — Content page presenting information about my appointments.
 * Module: Appointments · Route: /appointments · Risk: Low · Locator health: 95%
 */
export class MyAppointmentsPage extends BasePage {
  readonly path = "/appointments";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/appointments(?:[?#].*)?$");
  readonly myAppointmentsHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly bookAServiceLink: Locator;
  readonly browseHealthServicesLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “My appointments” · locator health 95% (Stable) */
    this.myAppointmentsHeading = page.getByRole("heading", { name: "My appointments", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Book a service link · locator health 95% (Stable) */
    this.bookAServiceLink = page.getByRole("link", { name: "Book a service" });
    /** Browse health services link · locator health 95% (Stable) */
    this.browseHealthServicesLink = page.getByRole("link", { name: "Browse health services" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.myAppointmentsHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickBookAService(): Promise<void> {
    await this.bookAServiceLink.click();
  }

  async clickBrowseHealthServices(): Promise<void> {
    await this.browseHealthServicesLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
