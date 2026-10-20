import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Dev API — generated from 1 endpoint(s) observed in live traffic. */
export class DevApiClient extends BaseApiClient {
  /** GET /api/dev/clock — observed 200, avg 268 ms; used by Health insurance, explained honestly., Compare insurance, Quote calculator, Find hospitals & providers */
  async getDevClock(): Promise<APIResponse> {
    return this.request.get("/api/dev/clock");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const devSchemas: Record<string, Schema> = {
  getDevClock: {"type":"object","fields":{"now":{"type":"string","format":"date"},"today":{"type":"string","format":"date"},"offsetDays":{"type":"number"},"autoPayOutcome":{"type":"string"}}},
};
