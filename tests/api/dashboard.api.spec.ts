import { test, expect } from '../../fixtures';
import { DashboardApiClient, dashboardSchemas } from '../../api/DashboardApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0119 GET /api/dashboard returns 200 with a valid schema", { tag: ['@api', '@regression', '@dashboard'], annotation: [{type: "source",description: "GET /api/dashboard"}] }, async ({ page }) => {
    await test.step("Call DashboardApiClient.listDashboard", async () => {
      const client = new DashboardApiClient(page.request);
      const started = Date.now();
      const res = await client.listDashboard();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1143);
      expectSchema(await res.json(), dashboardSchemas.listDashboard);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0120 GET /api/dashboard rejects unauthenticated requests", { tag: ['@api', '@security', '@dashboard'], annotation: [{type: "source",description: "GET /api/dashboard"}] }, async ({ page }) => {
    await test.step("Call GET /api/dashboard without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/dashboard");
      expect([401, 403], `unauthenticated GET /api/dashboard → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
