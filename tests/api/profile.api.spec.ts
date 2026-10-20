import { test, expect } from '../../fixtures';
import { ProfileApiClient, profileSchemas } from '../../api/ProfileApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0129 GET /api/profile returns 200 with a valid schema", { tag: ['@api', '@regression', '@profile'], annotation: [{type: "source",description: "GET /api/profile"}] }, async ({ page }) => {
    await test.step("Call ProfileApiClient.listProfile", async () => {
      const client = new ProfileApiClient(page.request);
      const started = Date.now();
      const res = await client.listProfile();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), profileSchemas.listProfile);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0130 GET /api/profile rejects unauthenticated requests", { tag: ['@api', '@security', '@profile'], annotation: [{type: "source",description: "GET /api/profile"}] }, async ({ page }) => {
    await test.step("Call GET /api/profile without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/profile");
      expect([401, 403], `unauthenticated GET /api/profile → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
