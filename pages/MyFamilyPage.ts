import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';

/**
 * My family — Content page presenting information about my family.
 * Module: Family · Route: /family · Risk: Low · Locator health: 58%
 */
export class MyFamilyPage extends BasePage {
  readonly path = "/family";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/family(?:[?#].*)?$");
  readonly myFamilyHeading: Locator;
  readonly skipToMainContentLink: Locator;
  readonly addFamilyMemberButton: Locator;
  readonly coverKamalaLink: Locator;
  readonly visionFamilyFloaterLink: Locator;
  readonly visionTermShieldLink: Locator;
  readonly editVikramVermaButton: Locator;
  readonly visionFamilyFloaterLink2: Locator;
  readonly visionTermShieldLink2: Locator;
  readonly editDiyaVermaButton: Locator;
  readonly visionFamilyFloaterLink3: Locator;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    super(page);
    /** Page heading “My family” · locator health 95% (Stable) */
    this.myFamilyHeading = page.getByRole("heading", { name: "My family", exact: true });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** + Add family member button · locator health 28% (Very Risky) */
    this.addFamilyMemberButton = page.locator("#main > div:nth-of-type(1) > div:nth-of-type(2) > button");
    /** Cover Kamala link · locator health 95% (Stable) */
    this.coverKamalaLink = page.getByRole("link", { name: "Cover Kamala" });
    /** Vision Family Floater link · locator health 28% (Very Risky) */
    this.visionFamilyFloaterLink = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(1) > ul > li:nth-of-type(1) > span:nth-of-type(2) > a");
    /** Vision Term Shield link · locator health 28% (Very Risky) */
    this.visionTermShieldLink = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(1) > ul > li:nth-of-type(2) > span:nth-of-type(2) > a");
    /** Edit Vikram Verma button · locator health 95% (Stable) */
    this.editVikramVermaButton = page.getByRole("button", { name: "Edit Vikram Verma" });
    /** Vision Family Floater link · locator health 28% (Very Risky) */
    this.visionFamilyFloaterLink2 = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(2) > ul > li:nth-of-type(1) > span:nth-of-type(2) > a");
    /** Vision Term Shield link · locator health 28% (Very Risky) */
    this.visionTermShieldLink2 = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(2) > ul > li:nth-of-type(2) > span:nth-of-type(2) > a");
    /** Edit Diya Verma button · locator health 95% (Stable) */
    this.editDiyaVermaButton = page.getByRole("button", { name: "Edit Diya Verma" });
    /** Vision Family Floater link · locator health 28% (Very Risky) */
    this.visionFamilyFloaterLink3 = page.locator("#main > div:nth-of-type(3) > div:nth-of-type(3) > ul > li:nth-of-type(1) > span:nth-of-type(2) > a");
    this.heading = this.myFamilyHeading;
    this.sidebar = new Sidebar(page);
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickAddFamilyMember(): Promise<void> {
    await this.addFamilyMemberButton.click();
  }

  async clickCoverKamala(): Promise<void> {
    await this.coverKamalaLink.click();
  }

  async clickVisionFamilyFloater(): Promise<void> {
    await this.visionFamilyFloaterLink.click();
  }

  async clickVisionTermShield(): Promise<void> {
    await this.visionTermShieldLink.click();
  }

  async clickEditVikramVerma(): Promise<void> {
    await this.editVikramVermaButton.click();
  }

  async clickVisionFamilyFloater2(): Promise<void> {
    await this.visionFamilyFloaterLink2.click();
  }

  async clickVisionTermShield2(): Promise<void> {
    await this.visionTermShieldLink2.click();
  }

  async clickEditDiyaVerma(): Promise<void> {
    await this.editDiyaVermaButton.click();
  }

  async clickVisionFamilyFloater3(): Promise<void> {
    await this.visionFamilyFloaterLink3.click();
  }
}
