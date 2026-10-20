import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Ai API — generated from 1 endpoint(s) observed in live traffic. */
export class AiApiClient extends BaseApiClient {
  /** GET /api/ai/status — observed 200, avg 300 ms; used by Vision AI */
  async getAiStatus(): Promise<APIResponse> {
    return this.request.get("/api/ai/status");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const aiSchemas: Record<string, Schema> = {
  getAiStatus: {"type":"object","fields":{"engine":{"type":"string"},"model":{"type":"null"},"languages":{"type":"object","fields":{"en":{"type":"string"},"hi":{"type":"string"},"te":{"type":"string"}}}}},
};
