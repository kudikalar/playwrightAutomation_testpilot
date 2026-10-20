import type { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { Schema } from '../utils/schema';

/** Notifications API — generated from 1 endpoint(s) observed in live traffic. */
export class NotificationApiClient extends BaseApiClient {
  /** GET /api/notifications — observed 200, avg 261 ms; used by Vision Health Care, Employee benefits, Grievances, Compare insurance */
  async listNotifications(): Promise<APIResponse> {
    return this.request.get("/api/notifications");
  }
}

/** Response schemas inferred from traffic (§37) — used for contract assertions. */
export const notificationsSchemas: Record<string, Schema> = {
  listNotifications: {"type":"object","fields":{"unread":{"type":"number"},"notifications":{"type":"array","items":{"type":"object","fields":{"id":{"type":"string"},"createdAt":{"type":"string","format":"date"},"updatedAt":{"type":"string","format":"date"},"userId":{"type":"string"},"title":{"type":"string"},"message":{"type":"string"},"type":{"type":"string"},"link":{"type":"string"},"dedupeKey":{"type":"string","optional":true},"read":{"type":"boolean"},"channel":{"type":"string"}}}}}},
};
