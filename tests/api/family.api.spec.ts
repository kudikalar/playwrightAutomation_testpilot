import { test, expect } from '../../fixtures';
import { FamilyApiClient, familySchemas } from '../../api/FamilyApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0161 GET /api/family returns 200 with a valid schema", { tag: ['@api', '@regression', '@family'], annotation: [{type: "source",description: "GET /api/family"}] }, async ({ page }) => {
    await test.step("Call FamilyApiClient.listFamily", async () => {
      const client = new FamilyApiClient(page.request);
      const started = Date.now();
      const res = await client.listFamily();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1236);
      expectSchema(await res.json(), familySchemas.listFamily);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0162 GET /api/family rejects unauthenticated requests", { tag: ['@api', '@security', '@family'], annotation: [{type: "source",description: "GET /api/family"}] }, async ({ page }) => {
    await test.step("Call GET /api/family without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/family");
      expect([401, 403], `unauthenticated GET /api/family → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
