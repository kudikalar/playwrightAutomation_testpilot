import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Hospitals API — generated from 1 endpoint(s) observed in live traffic. */
export class HospitalApiClient extends BaseApiClient {
  /** GET /api/hospitals — observed 200, avg 246 ms; used by Intimate a claim, New health claim */
  async listHospitals(): Promise<APIResponse> {
    return this.request.get("/api/hospitals");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const hospitalsSchemas: Record<string, Schema> = {

};
