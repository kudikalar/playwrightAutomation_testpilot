import { test, expect } from '../../fixtures';
import { NotificationApiClient, notificationsSchemas } from '../../api/NotificationApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0111 GET /api/notifications returns 200 with a valid schema", { tag: ['@api', '@regression', '@notifications'], annotation: [{type: "source",description: "GET /api/notifications"}] }, async ({ page }) => {
    await test.step("Call NotificationApiClient.listNotifications", async () => {
      const client = new NotificationApiClient(page.request);
      const started = Date.now();
      const res = await client.listNotifications();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1059);
      expectSchema(await res.json(), notificationsSchemas.listNotifications);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0112 GET /api/notifications rejects unauthenticated requests", { tag: ['@api', '@security', '@notifications'], annotation: [{type: "source",description: "GET /api/notifications"}] }, async ({ page }) => {
    await test.step("Call GET /api/notifications without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/notifications");
      expect([401, 403], `unauthenticated GET /api/notifications → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
