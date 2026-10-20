import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** LifeClaims API — generated from 1 endpoint(s) observed in live traffic. */
export class LifeClaimApiClient extends BaseApiClient {
  /** POST /api/life-claims/portal/start — observed n/a, avg — ms; used by No update on my reimbursement claim */
  async portalStartLifeClaim(payload: Record<string, unknown> = {}): Promise<APIResponse> {
    return this.request.post("/api/life-claims/portal/start", { data: payload });
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const lifeClaimsSchemas: Record<string, Schema> = {

};
