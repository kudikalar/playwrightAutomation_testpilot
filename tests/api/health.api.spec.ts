import { test, expect } from '../../fixtures';
import { HealthApiClient, healthSchemas } from '../../api/HealthApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0107 GET /api/health returns 200 with a valid schema", { tag: ['@api', '@regression', '@health'], annotation: [{type: "source",description: "GET /api/health"}] }, async ({ page }) => {
    await test.step("Call HealthApiClient.listHealth", async () => {
      const client = new HealthApiClient(page.request);
      const started = Date.now();
      const res = await client.listHealth();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1044);
      expectSchema(await res.json(), healthSchemas.listHealth);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0108 GET /api/health rejects unauthenticated requests", { tag: ['@api', '@security', '@health'], annotation: [{type: "source",description: "GET /api/health"}] }, async ({ page }) => {
    await test.step("Call GET /api/health without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/health");
      expect([401, 403], `unauthenticated GET /api/health → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
