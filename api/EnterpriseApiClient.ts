import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Enterprise API — generated from 10 endpoint(s) observed in live traffic. */
export class EnterpriseApiClient extends BaseApiClient {
  /** GET /api/enterprise/support/tickets — observed 200, avg 248 ms; used by Support tickets, Support */
  async getEnterpriseSupportTickets(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/support/tickets");
  }

  /** GET /api/enterprise/support/meta — observed 200, avg 257 ms; used by Support tickets, Support */
  async getEnterpriseSupportMeta(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/support/meta");
  }

  /** GET /api/enterprise/support/kb — observed 200, avg 418 ms; used by Health insurance, explained honestly., Knowledge base */
  async getEnterpriseSupportKb(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/support/kb");
  }

  /** GET /api/enterprise/support/kb/support-vs-grievance — observed 200, avg 251 ms; used by Vision Health Care */
  async getEnterpriseSupportKbSupportVsGrievance(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/support/kb/support-vs-grievance");
  }

  /** GET /api/enterprise/support/kb/payment-failed — observed 200, avg 253 ms; used by My payment failed or is pending — what now? */
  async getEnterpriseSupportKbPaymentFailed(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/support/kb/payment-failed");
  }

  /** GET /api/enterprise/support/kb/cashless-basics — observed 200, avg 287 ms; used by Cashless treatment at a network hospital */
  async getEnterpriseSupportKbCashlessBasics(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/support/kb/cashless-basics");
  }

  /** GET /api/enterprise/support/kb/data-rights — observed 200, avg 255 ms; used by Your data rights: export and deletion */
  async getEnterpriseSupportKbDataRights(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/support/kb/data-rights");
  }

  /** GET /api/enterprise/support/kb/languages-accessibility — observed 200, avg 265 ms; used by Language and text size */
  async getEnterpriseSupportKbLanguagesAccessibility(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/support/kb/languages-accessibility");
  }

  /** GET /api/enterprise/public/config — observed 200, avg 670 ms; used by Health insurance, explained honestly. */
  async getEnterprisePublicConfig(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/public/config");
  }

  /** GET /api/enterprise/privacy — observed 200, avg 231 ms; used by Your profile */
  async getEnterprisePrivacy(): Promise<APIResponse> {
    return this.request.get("/api/enterprise/privacy");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const enterpriseSchemas: Record<string, Schema> = {
  getEnterpriseSupportTickets: {"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"createdAt":{"type":"string","format":"date"},"updatedAt":{"type":"string","format":"date"},"reference":{"type":"string"},"userId":{"type":"string"},"customerName":{"type":"string"},"customerEmail":{"type":"string","format":"email"},"category":{"type":"string"},"subject":{"type":"string"},"priority":{"type":"string"},"status":{"type":"string"},"channel":{"type":"string"},"relatedRef":{"type":"null"},"source":{"type":"string"},"assigneeId":{"type":"null"},"assigneeName":{"type":"null"},"escalation":{"type":"null"},"history":{"type":"array","items":{"type":"object","fields":{"at":{"type":"string","format":"date"},"status":{"type":"string"},"by":{"type":"string"},"note":{"type":"string"}}}},"sla":{"type":"object","fields":{"firstResponseHours":{"type":"number"},"resolutionHours":{"type":"number"},"firstResponseDueAt":{"type":"string","format":"date"},"resolutionDueAt":{"type":"string","format":"date"},"firstRespondedAt":{"type":"null"},"resolvedAt":{"type":"null"},"firstResponseBreached":{"type":"boolean"},"resolutionBreached":{"type":"boolean"}}},"categoryLabel":{"type":"string"}}}},
  getEnterpriseSupportMeta: {"type":"object","fields":{"categories":{"type":"object","fields":{"policy":{"type":"string"},"payment":{"type":"string"},"claim_help":{"type":"string"},"hospital":{"type":"string"},"corporate_employee":{"type":"string"},"technical":{"type":"string"},"other":{"type":"string"}}},"priorities":{"type":"array","items":{"type":"string"}},"statuses":{"type":"array","items":{"type":"string"}},"escalations":{"type":"object","fields":{"insurance_specialist":{"type":"string"},"hospital":{"type":"string"},"claims":{"type":"string"}}},"sla":{"type":"object","fields":{"firstResponseHours":{"type":"number"},"resolutionHours":{"type":"number"}}}}},
  getEnterpriseSupportKb: {"type":"array","items":{"type":"object","fields":{"slug":{"type":"string"},"title":{"type":"string"},"category":{"type":"string"},"summary":{"type":"string"}}}},
  getEnterpriseSupportKbSupportVsGrievance: {"type":"object","fields":{"slug":{"type":"string"},"title":{"type":"string"},"category":{"type":"string"},"body":{"type":"array","items":{"type":"string"}}}},
  getEnterpriseSupportKbPaymentFailed: {"type":"object","fields":{"slug":{"type":"string"},"title":{"type":"string"},"category":{"type":"string"},"body":{"type":"array","items":{"type":"string"}}}},
  getEnterpriseSupportKbCashlessBasics: {"type":"object","fields":{"slug":{"type":"string"},"title":{"type":"string"},"category":{"type":"string"},"body":{"type":"array","items":{"type":"string"}}}},
  getEnterpriseSupportKbDataRights: {"type":"object","fields":{"slug":{"type":"string"},"title":{"type":"string"},"category":{"type":"string"},"body":{"type":"array","items":{"type":"string"}}}},
  getEnterpriseSupportKbLanguagesAccessibility: {"type":"object","fields":{"slug":{"type":"string"},"title":{"type":"string"},"category":{"type":"string"},"body":{"type":"array","items":{"type":"string"}}}},
  getEnterprisePublicConfig: {"type":"object","fields":{"brand":{"type":"string"},"role":{"type":"string"},"environment":{"type":"string"},"environmentNote":{"type":"string"},"irdai":{"type":"object","fields":{"status":{"type":"string"},"registrationNo":{"type":"string"},"category":{"type":"string"},"validTill":{"type":"string"},"note":{"type":"string"}}},"contact":{"type":"object","fields":{"email":{"type":"string","format":"email"},"phone":{"type":"string"},"hours":{"type":"string"},"address":{"type":"string"}}},"grievanceOfficer":{"type":"object","fields":{"name":{"type":"string"},"email":{"type":"string","format":"email"}}}}},
  getEnterprisePrivacy: {"type":"object","fields":{"marketingOptIn":{"type":"boolean"},"consents":{"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"createdAt":{"type":"string","format":"date"},"updatedAt":{"type":"string","format":"date"},"userId":{"type":"string"},"type":{"type":"string"},"termsVersion":{"type":"string"},"privacyVersion":{"type":"string"},"granted":{"type":"boolean"},"at":{"type":"string","format":"date"}}}},"requests":{"type":"array","items":{"type":"unknown"}},"requestTypes":{"type":"object","fields":{"export":{"type":"string"},"deletion":{"type":"string"}}},"retentionRules":{"type":"array","items":{"type":"object","fields":{"records":{"type":"string"},"basis":{"type":"string"}}}}}},
};
