import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Sidebar } from '../components/Sidebar';
import { FileUpload } from '../components/FileUpload';
import { Toast } from '../components/Toast';

/**
 * No update on my reimbursement claim — Collects user input (Your message).
 * Module: Company · Route: /grievances/grv_demo_asha · Risk: Low · Locator health: 95%
 */
export class GrievancesGrvDemoAshaPage extends BasePage {
  readonly path = "/grievances/grv_demo_asha";
  readonly urlPattern = new RegExp("^(?:https?://[^/]+)?/grievances/grv_demo_asha(?:[?#].*)?$");
  readonly noUpdateOnMyReimbursemenHeading: Locator;
  readonly yourMessageInput: Locator;
  readonly sendButton: Locator;
  readonly documentTypeOtherBillMedSelect: Locator;
  readonly descriptionOptionalInput: Locator;
  readonly filePdfPngOrJpegMaxInput: Locator;
  readonly uploadButton: Locator;
  readonly skipToMainContentLink: Locator;
  readonly irdaiBimaBharosaLink: Locator;
  readonly insuranceOmbudsmanLink: Locator;
  readonly allGrievancesLink: Locator;
  readonly askVisionAiButton: Locator;
  readonly sidebar: Sidebar;
  readonly fileUpload: FileUpload;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    /** Page heading “No update on my reimbursement claim” · locator health 95% (Stable) */
    this.noUpdateOnMyReimbursemenHeading = page.getByRole("heading", { name: "No update on my reimbursement claim", exact: true });
    /** Your message field · locator health 95% (Stable) */
    this.yourMessageInput = page.getByRole("textbox", { name: "Your message" });
    /** Send button · locator health 95% (Stable) */
    this.sendButton = page.getByRole("button", { name: "Send" });
    /** Document type Other Bill Medical Report Discharge Summary Identity Bank Proof field · locator health 95% (Stable) */
    this.documentTypeOtherBillMedSelect = page.getByRole("combobox", { name: "Document type Other Bill Medical Report Discharge Summary Identity Bank Proof" });
    /** Description (optional) field · locator health 95% (Stable) */
    this.descriptionOptionalInput = page.getByRole("textbox", { name: "Description (optional)" });
    /** File PDF, PNG or JPEG · max 5 MB field · locator health 95% (Stable) */
    this.filePdfPngOrJpegMaxInput = page.getByRole("textbox", { name: "File PDF, PNG or JPEG · max 5 MB" });
    /** Upload button · locator health 95% (Stable) */
    this.uploadButton = page.getByRole("button", { name: "Upload" });
    /** Skip to main content link · locator health 95% (Stable) */
    this.skipToMainContentLink = page.getByRole("link", { name: "Skip to main content" });
    /** IRDAI Bima Bharosa link · locator health 95% (Stable) */
    this.irdaiBimaBharosaLink = page.getByRole("link", { name: "IRDAI Bima Bharosa" });
    /** Insurance Ombudsman link · locator health 95% (Stable) */
    this.insuranceOmbudsmanLink = page.getByRole("link", { name: "Insurance Ombudsman" });
    /** ← All grievances link · locator health 95% (Stable) */
    this.allGrievancesLink = page.getByRole("link", { name: "← All grievances" });
    /** Ask Vision AI button · locator health 95% (Stable) */
    this.askVisionAiButton = page.getByRole("button", { name: "Ask Vision AI" });
    this.heading = this.noUpdateOnMyReimbursemenHeading;
    this.sidebar = new Sidebar(page);
    this.fileUpload = new FileUpload(page);
    this.toast = new Toast(page);
  }

  async fillConversation(data: { yourMessage?: string }): Promise<void> {
    if (data.yourMessage !== undefined) await this.yourMessageInput.fill(data.yourMessage);
  }

  async fillAttachments(data: { documentTypeOtherBillMedicalReportDischargeSummaryIdentityBankProof?: string; descriptionOptional?: string; filePdfPngOrJpegMax5Mb?: string }): Promise<void> {
    if (data.documentTypeOtherBillMedicalReportDischargeSummaryIdentityBankProof !== undefined) await this.documentTypeOtherBillMedSelect.selectOption({ label: data.documentTypeOtherBillMedicalReportDischargeSummaryIdentityBankProof }).catch(async () => { await this.documentTypeOtherBillMedSelect.selectOption({ index: 1 }); });
    if (data.descriptionOptional !== undefined) await this.descriptionOptionalInput.fill(data.descriptionOptional);
    if (data.filePdfPngOrJpegMax5Mb !== undefined) await this.filePdfPngOrJpegMaxInput.fill(data.filePdfPngOrJpegMax5Mb);
  }

  async submitConversation(): Promise<void> {
    await this.sendButton.click();
  }

  async submitAttachments(): Promise<void> {
    await this.uploadButton.click();
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

  async clickAllGrievances(): Promise<void> {
    await this.allGrievancesLink.click();
  }

  async clickAskVisionAi(): Promise<void> {
    await this.askVisionAiButton.click();
  }
}
