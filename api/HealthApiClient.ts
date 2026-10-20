import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Health API — generated from 1 endpoint(s) observed in live traffic. */
export class HealthApiClient extends BaseApiClient {
  /** GET /api/health — observed 200, avg 263 ms; used by Health insurance, explained honestly., Compare insurance, Quote calculator, Find hospitals & providers */
  async listHealth(): Promise<APIResponse> {
    return this.request.get("/api/health");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const healthSchemas: Record<string, Schema> = {
  listHealth: {"type":"object","fields":{"ok":{"type":"boolean"},"name":{"type":"string"},"time":{"type":"string","format":"date"},"store":{"type":"object","fields":{"mode":{"type":"string"},"connectedVia":{"type":"array","items":{"type":"unknown"}},"shared":{"type":"boolean"},"warning":{"type":"string"},"version":{"type":"null"},"lastError":{"type":"null"},"lastErrorAt":{"type":"null"},"lockWaitMs":{"type":"number"}}}}},
};
