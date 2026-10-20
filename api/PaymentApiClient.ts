import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Payments API — generated from 2 endpoint(s) observed in live traffic. */
export class PaymentApiClient extends BaseApiClient {
  /** GET /api/payments — observed 200, avg 263 ms; used by Payments & receipts */
  async listPayments(): Promise<APIResponse> {
    return this.request.get("/api/payments");
  }

  /** GET /api/payments/links — observed 200, avg 260 ms; used by Payments & receipts */
  async getPaymentsLinks(): Promise<APIResponse> {
    return this.request.get("/api/payments/links");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const paymentsSchemas: Record<string, Schema> = {
  listPayments: {"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"createdAt":{"type":"string","format":"date"},"updatedAt":{"type":"string","format":"date"},"reference":{"type":"string"},"purpose":{"type":"string"},"targetKey":{"type":"string"},"applicationId":{"type":"string"},"userId":{"type":"string"},"amount":{"type":"number"},"status":{"type":"string"},"idempotencyKey":{"type":"string"},"method":{"type":"string"},"callbacks":{"type":"array","items":{"type":"unknown"}},"description":{"type":"string"},"completedAt":{"type":"string","format":"date"},"insurerId":{"type":"string"},"mode":{"type":"string"},"refunds":{"type":"array","items":{"type":"unknown"}}}}},
  getPaymentsLinks: {"type":"array","items":{"type":"unknown"}},
};
