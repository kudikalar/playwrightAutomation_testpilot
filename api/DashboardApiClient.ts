import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Dashboard API — generated from 1 endpoint(s) observed in live traffic. */
export class DashboardApiClient extends BaseApiClient {
  /** GET /api/dashboard — observed 200, avg 261 ms; used by Vision Health Care, No update on my reimbursement claim, Create your account, Sign in */
  async listDashboard(): Promise<APIResponse> {
    return this.request.get("/api/dashboard");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const dashboardSchemas: Record<string, Schema> = {
  listDashboard: {"type":"object","fields":{"asOf":{"type":"string","format":"date"},"filters":{"type":"object","fields":{"product":{"type":"string"},"from":{"type":"string","format":"date"},"to":{"type":"string","format":"date"}}},"kpis":{"type":"object","fields":{"activePolicies":{"type":"object","fields":{"count":{"type":"number"},"link":{"type":"string"}}},"pendingApplications":{"type":"object","fields":{"count":{"type":"number"},"link":{"type":"string"}}},"openClaims":{"type":"object","fields":{"count":{"type":"number"},"link":{"type":"string"}}},"premiumsDue":{"type":"object","fields":{"count":{"type":"number"},"amount":{"type":"number"},"link":{"type":"string"}}}}},"policies":{"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"policyNumber":{"type":"string"},"planName":{"type":"string"},"product":{"type":"string"},"status":{"type":"string"},"startDate":{"type":"string","format":"date"},"endDate":{"type":"string","format":"date"},"coverage":{"type":"number","optional":true},"availableCoverage":{"type":"number","optional":true},"shared":{"type":"boolean","optional":true},"members":{"type":"number","optional":true},"sumAssured":{"type":"number","optional":true},"nextDue":{"type":"object","fields":{"no":{"type":"number"},"dueDate":{"type":"string","format":"date"},"amount":{"type":"number"},"graceEnds":{"type":"string","format":"date"}},"optional":true}}}},"actions":{"type":"array","items":{"type":"object","fields":{"kind":{"type":"string"},"priority":{"type":"number"},"title":{"type":"string"},"detail":{"type":"string"},"amount":{"type":"number"},"link":{"type":"string"},"product":{"type":"string"}}}},"activity":{"type":"array","items":{"type":"object","fields":{"at":{"type":"string","format":"date"},"product":{"type":"string"},"type":{"type":"string"},"title":{"type":"string"},"detail":{"type":"string"},"link":{"type":"string"},"amount":{"type":"number","optional":true}}}},"partialErrors":{"type":"array","items":{"type":"unknown"}}}},
};
