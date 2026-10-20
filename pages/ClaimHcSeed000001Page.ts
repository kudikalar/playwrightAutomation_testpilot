import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';
import { FileUpload } from '../components/FileUpload';
import { Toast } from '../components/Toast';

/**
 * Claim HC-SEED-000001 — Summarises key metrics and recent activity, and acts as the main entry point after sign-in.
 * Module: Dashboard · Route: /claims/hea_13b7c46c9eec · Risk: Critical · Locator health: 62%
 */
export class ClaimHcSeed000001Page extends BasePage {
  readonly path = "/claims/hea_13b7c46c9eec";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/claims/hea_13b7c46c9eec(?:[?#].*)?$");
  readonly claimHcSeed000001Heading: Locator;
  readonly documentTypeBillDischargeSelect: Locator;
  readonly descriptionOptionalInput: Locator;
  readonly filePdfPngOrJpegMaxInput: Locator;
  readonly uploadButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly raiseAGrievanceLink: Locator;
  readonly grvSeed000001Link: Locator;
  readonly uploadButton2: Locator;
  readonly uploadButton3: Locator;
  readonly uploadButton4: Locator;
  readonly uploadButton5: Locator;
  readonly uploadButton6: Locator;
  readonly uploadButton7: Locator;
  readonly sidebar: Sidebar;
  readonly dataTable: DataTable;
  readonly fileUpload: FileUpload;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “Claim HC-SEED-000001” · locator health 95% (Stable) */
    this.claimHcSeed000001Heading = page.getByRole("heading", { name: "Claim HC-SEED-000001", exact: true });
    /** Document type Bill Discharge Summary Prescription Medical Report Exam Report Identity Bank Proof Other field · locator health 95% (Stable) */
    this.documentTypeBillDischargeSelect = page.getByRole("combobox", { name: "Document type Bill Discharge Summary Prescription Medical Report Exam Report Ide" });
    /** Description (optional) field · locator health 95% (Stable) */
    this.descriptionOptionalInput = page.getByRole("textbox", { name: "Description (optional)" });
    /** File PDF, PNG or JPEG · max 5 MB field · locator health 95% (Stable) */
    this.filePdfPngOrJpegMaxInput = page.getByRole("textbox", { name: "File PDF, PNG or JPEG · max 5 MB" });
    /** Upload button · locator health 28% (Very Risky) */
    this.uploadButton = page.locator("#main > section:nth-of-type(3) > div:nth-of-type(4) > button");
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** Raise a grievance link · locator health 95% (Stable) */
    this.raiseAGrievanceLink = page.getByRole("link", { name: "Raise a grievance" });
    /** GRV-SEED-000001 link · locator health 95% (Stable) */
    this.grvSeed000001Link = page.getByRole("link", { name: "GRV-SEED-000001" });
    /** Upload button · locator health 28% (Very Risky) */
    this.uploadButton2 = page.locator("#main > section:nth-of-type(2) > ul > li:nth-of-type(1) > span:nth-of-type(3) > button");
    /** Upload button · locator health 28% (Very Risky) */
    this.uploadButton3 = page.locator("#main > section:nth-of-type(2) > ul > li:nth-of-type(2) > span:nth-of-type(3) > button");
    /** Upload button · locator health 28% (Very Risky) */
    this.uploadButton4 = page.locator("#main > section:nth-of-type(2) > ul > li:nth-of-type(3) > span:nth-of-type(3) > button");
    /** Upload button · locator health 28% (Very Risky) */
    this.uploadButton5 = page.locator("#main > section:nth-of-type(2) > ul > li:nth-of-type(4) > span:nth-of-type(3) > button");
    /** Upload button · locator health 28% (Very Risky) */
    this.uploadButton6 = page.locator("#main > section:nth-of-type(2) > ul > li:nth-of-type(5) > span:nth-of-type(3) > button");
    /** Upload button · locator health 28% (Very Risky) */
    this.uploadButton7 = page.locator("#main > section:nth-of-type(2) > ul > li:nth-of-type(6) > span:nth-of-type(3) > button");
    this.heading = this.claimHcSeed000001Heading;
    this.sidebar = new Sidebar(page);
    this.dataTable = new DataTable(page);
    this.fileUpload = new FileUpload(page);
    this.toast = new Toast(page);
  }

  async fillDocuments(data: { documentTypeBillDischargeSummaryPrescriptionMedicalReportExamReportIdentityBankProofOther?: string; descriptionOptional?: string; filePdfPngOrJpegMax5Mb?: string }): Promise<void> {
    if (data.documentTypeBillDischargeSummaryPrescriptionMedicalReportExamReportIdentityBankProofOther !== undefined) await this.documentTypeBillDischargeSelect.selectOption({ label: data.documentTypeBillDischargeSummaryPrescriptionMedicalReportExamReportIdentityBankProofOther }).catch(async () => { await this.documentTypeBillDischargeSelect.selectOption({ index: 1 }); });
    if (data.descriptionOptional !== undefined) await this.descriptionOptionalInput.fill(data.descriptionOptional);
    if (data.filePdfPngOrJpegMax5Mb !== undefined) await this.filePdfPngOrJpegMaxInput.fill(data.filePdfPngOrJpegMax5Mb);
  }

  async submitDocuments(): Promise<void> {
    await this.uploadButton.click();
  }

  async clickSkipToMainContent(): Promise<void> {
    await this.skipToMainContentLink.click();
  }

  async clickRaiseAGrievance(): Promise<void> {
    await this.raiseAGrievanceLink.click();
  }

  async clickGrvSeed000001(): Promise<void> {
    await this.grvSeed000001Link.click();
  }

  async clickUpload(): Promise<void> {
    await this.uploadButton2.click();
  }

  async clickUpload2(): Promise<void> {
    await this.uploadButton3.click();
  }

  async clickUpload3(): Promise<void> {
    await this.uploadButton4.click();
  }

  async clickUpload4(): Promise<void> {
    await this.uploadButton5.click();
  }

  async clickUpload5(): Promise<void> {
    await this.uploadButton6.click();
  }

  async clickUpload6(): Promise<void> {
    await this.uploadButton7.click();
  }
}
