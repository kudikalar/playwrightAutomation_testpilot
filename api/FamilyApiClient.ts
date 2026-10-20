import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Family API — generated from 1 endpoint(s) observed in live traffic. */
export class FamilyApiClient extends BaseApiClient {
  /** GET /api/family — observed 200, avg 261 ms; used by Quote calculator, My family, No update on my reimbursement claim, Quote calculator */
  async listFamily(): Promise<APIResponse> {
    return this.request.get("/api/family");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const familySchemas: Record<string, Schema> = {
  listFamily: {"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"createdAt":{"type":"string","format":"date"},"updatedAt":{"type":"string","format":"date"},"userId":{"type":"string"},"fullName":{"type":"string"},"dob":{"type":"string","format":"date"},"relationship":{"type":"string"},"gender":{"type":"string"},"status":{"type":"string"},"version":{"type":"number"}}}},
};
