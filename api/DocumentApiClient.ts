import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Documents API — generated from 1 endpoint(s) observed in live traffic. */
export class DocumentApiClient extends BaseApiClient {
  /** GET /api/documents — observed 200, avg 275 ms; used by Documents, Claim HC-SEED-000001, Vision Term Shield, Vision Family Floater */
  async listDocuments(): Promise<APIResponse> {
    return this.request.get("/api/documents");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const documentsSchemas: Record<string, Schema> = {
  listDocuments: {"type":"array","items":{"type":"unknown"}},
};
