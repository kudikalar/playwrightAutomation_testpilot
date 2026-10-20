import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** ClaimsOps API — generated from 5 endpoint(s) observed in live traffic. */
export class ClaimsOpApiClient extends BaseApiClient {
  /** GET /api/claims-ops/grievances — observed 200, avg 266 ms; used by Grievances, Grievances */
  async getClaimsOpsGrievances(): Promise<APIResponse> {
    return this.request.get("/api/claims-ops/grievances");
  }

  /** GET /api/claims-ops/meta — observed 200, avg 273 ms; used by Grievances, Grievances */
  async getClaimsOpsMeta(): Promise<APIResponse> {
    return this.request.get("/api/claims-ops/meta");
  }

  /** GET /api/claims-ops/intimations — observed 200, avg 253 ms; used by Health claims */
  async getClaimsOpsIntimations(): Promise<APIResponse> {
    return this.request.get("/api/claims-ops/intimations");
  }

  /** GET /api/claims-ops/grievances/grv_demo_asha — observed 200, avg 245 ms; used by No update on my reimbursement claim */
  async getClaimsOpsGrievancesGrvDemoAsha(): Promise<APIResponse> {
    return this.request.get("/api/claims-ops/grievances/grv_demo_asha");
  }

  /** POST /api/claims-ops/grievances — observed n/a, avg — ms; used by Grievances */
  async grievancesClaimsOp(payload: Record<string, unknown> = {}): Promise<APIResponse> {
    return this.request.post("/api/claims-ops/grievances", { data: payload });
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const claimsOpsSchemas: Record<string, Schema> = {
  getClaimsOpsGrievances: {"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"reference":{"type":"string"},"category":{"type":"string"},"categoryLabel":{"type":"string"},"subject":{"type":"string"},"status":{"type":"string"},"customerName":{"type":"string"},"claimNumber":{"type":"string"},"policyNumber":{"type":"string"},"ownerName":{"type":"string"},"responseDueAt":{"type":"string","format":"date"},"appealed":{"type":"boolean"},"createdAt":{"type":"string","format":"date"},"updatedAt":{"type":"string","format":"date"},"sla":{"type":"object","fields":{"key":{"type":"string"},"state":{"type":"string"},"dueAt":{"type":"string","format":"date"},"remainingMs":{"type":"number"}}}}}},
  getClaimsOpsMeta: {"type":"object","fields":{"unifiedStatuses":{"type":"array","items":{"type":"string"}},"responsibleOrgs":{"type":"array","items":{"type":"string"}},"statusMap":{"type":"array","items":{"type":"object","fields":{"internal":{"type":"string"},"unified":{"type":"string"},"responsible":{"type":"string"}}}},"decisionDisclaimer":{"type":"string"},"documentAssistDisclaimer":{"type":"string"},"sla":{"type":"object","fields":{"version":{"type":"number"},"rules":{"type":"object","fields":{"preauthMinutes":{"type":"number"},"finalAuthMinutes":{"type":"unknown","masked":true},"settlementDays":{"type":"number"},"grievanceDays":{"type":"number"},"pauseOnCustomerDocuments":{"type":"boolean"},"atRiskPct":{"type":"number"}}},"source":{"type":"string"}}},"grievance":{"type":"object","fields":{"categories":{"type":"object","fields":{"claim":{"type":"string"},"policy_servicing":{"type":"string"},"sales_mis_selling":{"type":"string"},"refund":{"type":"string"},"other":{"type":"string"}}},"statuses":{"type":"array","items":{"type":"string"}},"outcomes":{"type":"object","fields":{"upheld":{"type":"string"},"partially_upheld":{"type":"string"},"not_upheld":{"type":"string"},"referred_to_insurer":{"type":"string"}}},"guidance":{"type":"object","fields":{"nature":{"type":"string"},"insurer":{"type":"string"},"escalation":{"type":"array","items":{"type":"object","fields":{"name":{"type":"string"},"url":{"type":"string"},"text":{"type":"string"}}}}}}}}}},
  getClaimsOpsIntimations: {"type":"array","items":{"type":"unknown"}},
  getClaimsOpsGrievancesGrvDemoAsha: {"type":"object","fields":{"id":{"type":"string"},"createdAt":{"type":"string","format":"date"},"updatedAt":{"type":"string","format":"date"},"reference":{"type":"string"},"userId":{"type":"string"},"customerName":{"type":"string"},"category":{"type":"string"},"subject":{"type":"string"},"description":{"type":"string"},"claimId":{"type":"string"},"claimNumber":{"type":"string"},"policyId":{"type":"string"},"policyNumber":{"type":"string"},"insurerId":{"type":"string"},"insurerName":{"type":"string"},"status":{"type":"string"},"acknowledgedAt":{"type":"string","format":"date"},"slaPolicyId":{"type":"string"},"slaPolicyVersion":{"type":"number"},"responseDueAt":{"type":"string","format":"date"},"ownerId":{"type":"string"},"ownerName":{"type":"string"},"ownerRole":{"type":"string"},"messages":{"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"at":{"type":"string","format":"date"},"from":{"type":"string"},"by":{"type":"string"},"role":{"type":"string"},"text":{"type":"string"},"internal":{"type":"boolean"}}}},"insurerComms":{"type":"array","items":{"type":"unknown"}},"escalations":{"type":"array","items":{"type":"unknown"}},"resolution":{"type":"null"},"firstResolvedAt":{"type":"null"},"appeal":{"type":"null"},"closedAt":{"type":"null"},"history":{"type":"array","items":{"type":"object","fields":{"at":{"type":"string","format":"date"},"action":{"type":"string"},"by":{"type":"string"},"role":{"type":"string"},"note":{"type":"null|string|null"}}}},"sla":{"type":"object","fields":{"clocks":{"type":"array","items":{"type":"object","fields":{"key":{"type":"string"},"label":{"type":"string"},"owner":{"type":"string"},"durationMs":{"type":"number"},"startAt":{"type":"string","format":"date"},"stopAt":{"type":"null"},"dueAt":{"type":"string","format":"date"},"elapsedMs":{"type":"number"},"remainingMs":{"type":"number"},"pausedMs":{"type":"number"},"breached":{"type":"boolean"},"running":{"type":"boolean"},"paused":{"type":"boolean"},"state":{"type":"string"},"policyVersion":{"type":"number"},"policyId":{"type":"string"}}}},"primary":{"type":"object","fields":{"key":{"type":"string"},"label":{"type":"string"},"owner":{"type":"string"},"durationMs":{"type":"number"},"startAt":{"type":"string","format":"date"},"stopAt":{"type":"null"},"dueAt":{"type":"string","format":"date"},"elapsedMs":{"type":"number"},"remainingMs":{"type":"number"},"pausedMs":{"type":"number"},"breached":{"type":"boolean"},"running":{"type":"boolean"},"paused":{"type":"boolean"},"state":{"type":"string"},"policyVersion":{"type":"number"},"policyId":{"type":"string"}}},"breaches":{"type":"array","items":{"type":"unknown"}}}},"categoryLabel":{"type":"string"},"guidance":{"type":"object","fields":{"nature":{"type":"string"},"insurer":{"type":"string"},"escalation":{"type":"array","items":{"type":"object","fields":{"name":{"type":"string"},"url":{"type":"string"},"text":{"type":"string"}}}}}},"canAppeal":{"type":"boolean"},"documents":{"type":"number"}}},
};
