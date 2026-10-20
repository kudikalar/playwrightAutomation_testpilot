import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Corporate API — generated from 1 endpoint(s) observed in live traffic. */
export class CorporateApiClient extends BaseApiClient {
  /** GET /api/corporate/benefits/me — observed 200, avg 255 ms; used by Employee benefits */
  async getCorporateBenefitsMe(): Promise<APIResponse> {
    return this.request.get("/api/corporate/benefits/me");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const corporateSchemas: Record<string, Schema> = {
  getCorporateBenefitsMe: {"type":"object","fields":{"emailVerified":{"type":"boolean"},"email":{"type":"string","format":"email"},"memberships":{"type":"array","items":{"type":"unknown"}},"consentText":{"type":"string"},"categories":{"type":"object","fields":{"enrolment":{"type":"string"},"dependents":{"type":"string"},"certificate":{"type":"string"},"billing":{"type":"string"},"claims_help":{"type":"string"},"wellness":{"type":"string"},"other":{"type":"string"}}},"label":{"type":"string"}}},
};
