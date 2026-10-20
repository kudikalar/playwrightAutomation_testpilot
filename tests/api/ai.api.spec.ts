import { test, expect } from '../../fixtures';
import { AiApiClient, aiSchemas } from '../../api/AiApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0219 GET /api/ai/status returns 200 with a valid schema", { tag: ['@api', '@regression', '@ai'], annotation: [{type: "source",description: "GET /api/ai/status"}] }, async ({ page }) => {
    await test.step("Call AiApiClient.getAiStatus", async () => {
      const client = new AiApiClient(page.request);
      const started = Date.now();
      const res = await client.getAiStatus();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1041);
      expectSchema(await res.json(), aiSchemas.getAiStatus);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0220 GET /api/ai/status rejects unauthenticated requests", { tag: ['@api', '@security', '@ai'], annotation: [{type: "source",description: "GET /api/ai/status"}] }, async ({ page }) => {
    await test.step("Call GET /api/ai/status without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/ai/status");
      expect([401, 403], `unauthenticated GET /api/ai/status → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
