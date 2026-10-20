import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Profile API — generated from 1 endpoint(s) observed in live traffic. */
export class ProfileApiClient extends BaseApiClient {
  /** GET /api/profile — observed 200, avg 253 ms; used by Quote calculator, Your profile, My family, No update on my reimbursement claim */
  async listProfile(): Promise<APIResponse> {
    return this.request.get("/api/profile");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const profileSchemas: Record<string, Schema> = {
  listProfile: {"type":"object","fields":{"id":{"type":"string"},"customerId":{"type":"string"},"role":{"type":"string"},"status":{"type":"string"},"active":{"type":"boolean"},"firstName":{"type":"string"},"lastName":{"type":"string"},"name":{"type":"string"},"legalName":{"type":"string"},"email":{"type":"string","format":"email"},"emailVerified":{"type":"boolean"},"mobile":{"type":"string"},"mobileVerified":{"type":"boolean"},"pendingEmail":{"type":"null"},"pendingMobile":{"type":"null"},"profile":{"type":"object","fields":{"dob":{"type":"string","format":"date"},"gender":{"type":"string"},"address":{"type":"object","fields":{"country":{"type":"string"},"line1":{"type":"string"},"line2":{"type":"string"},"city":{"type":"string"},"state":{"type":"string"},"postalCode":{"type":"string"}}}}},"communicationPreference":{"type":"string"},"marketingOptIn":{"type":"boolean"},"profileVersion":{"type":"number"},"createdAt":{"type":"string","format":"date"},"lastLoginAt":{"type":"null"},"checklist":{"type":"array","items":{"type":"object","fields":{"key":{"type":"string"},"label":{"type":"string"},"ok":{"type":"boolean"},"required":{"type":"boolean"}}}},"username":{"type":"null"},"orgId":{"type":"null"},"qaFixture":{"type":"boolean"},"states":{"type":"array","items":{"type":"string"}}}},
};
