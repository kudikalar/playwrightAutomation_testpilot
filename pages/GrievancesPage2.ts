import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';
import { Toast } from '../components/Toast';

/**
 * Grievances — Displays grievances data in tabular form.
 * Module: Company · Route: /grievances?claim&new · Risk: High · Locator health: 95%
 */
export class GrievancesPage2 extends BasePage {
  readonly path = "/grievances";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/grievances(?:[?#].*)?$");
  readonly grievancesHeading: Locator;
  readonly categoryClaimPolicyServicSelect: Locator;
  readonly relatedClaimOptionalNSelect: Locator;
  readonly subjectInput: Locator;
  readonly whatHappenedAndWhatOutcoInput: Locator;
  readonly submitGrievanceButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly irdaiBimaBharosaLink: Locator;
  readonly insuranceOmbudsmanLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Grievances” · locator health 95% (Stable) */
    this.grievancesHeading = page.getByRole("heading", { name: "Grievances", exact: true });
    /** Category Claim Policy servicing Sales / mis-selling Refund Other field · locator health 95% (Stable) */
    this.categoryClaimPolicyServicSelect = page.getByRole("combobox", { name: "Category Claim Policy servicing Sales / mis-selling Refund Other" });
    /** Related claim (optional) — none — HC-SEED-000001 · Vikram Verma field · locator health 95% (Stable) */
    this.relatedClaimOptionalNSelect = page.getByRole("combobox", { name: "Related claim (optional) — none — HC-SEED-000001 · Vikram Verma" });
    /** Subject field · locator health 95% (Stable) */
    this.subjectInput = page.getByRole("textbox", { name: "Subject" });
    /** What happened and what outcome you expect field · locator health 95% (Stable) */
    this.whatHappenedAndWhatOutcoInput = page.getByRole("textbox", { name: "What happened and what outcome you expect" });
    /** Submit grievance button · locator health 95% (Stable) */
    this.submitGrievanceButton = page.getByRole("button", { name: "Submit grievance" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** IRDAI Bima Bharosa link · locator health 95% (Stable) */
    this.irdaiBimaBharosaLink = page.getByRole("link", { name: "IRDAI Bima Bharosa" });
    /** Insurance Ombudsman link · locator health 95% (Stable) */
    this.insuranceOmbudsmanLink = page.getByRole("link", { name: "Insurance Ombudsman" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.grievancesHeading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
    this.toast = new Toast(page);
  }

  async fillRaiseAgrievanceWithVhc(data: { categoryClaimPolicyServicingSalesMisSellingRefundOther?: string; relatedClaimOptionalNoneHcSeed000001VikramVerma?: string; subject?: string; whatHappenedAndWhatOutcomeYouExpect?: string }): Promise<void> {
    if (data.categoryClaimPolicyServicingSalesMisSellingRefundOther !== undefined) await this.categoryClaimPolicyServicSelect.selectOption({ label: data.categoryClaimPolicyServicingSalesMisSellingRefundOther }).catch(async () => { await this.categoryClaimPolicyServicSelect.selectOption({ index: 1 }); });
    if (data.relatedClaimOptionalNoneHcSeed000001VikramVerma !== undefined) await this.relatedClaimOptionalNSelect.selectOption({ label: data.relatedClaimOptionalNoneHcSeed000001VikramVerma }).catch(async () => { await this.relatedClaimOptionalNSelect.selectOption({ index: 1 }); });
    if (data.subject !== undefined) await this.subjectInput.fill(data.subject);
    if (data.whatHappenedAndWhatOutcomeYouExpect !== undefined) await this.whatHappenedAndWhatOutcoInput.fill(data.whatHappenedAndWhatOutcomeYouExpect);
  }

  async submitRaiseAgrievanceWithVhc(): Promise<void> {
    await this.submitGrievanceButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickIrdaiBimaBharosa(): Promise<void> {
    await this.irdaiBimaBharosaLink.click();
  }

  async clickInsuranceOmbudsman(): Promise<void> {
    await this.insuranceOmbudsmanLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
