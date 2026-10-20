import { test, expect } from '../../fixtures';
import { CorporateApiClient, corporateSchemas } from '../../api/CorporateApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0213 GET /api/corporate/benefits/me returns 200 with a valid schema", { tag: ['@api', '@regression', '@corporate'], annotation: [{type: "source",description: "GET /api/corporate/benefits/me"}] }, async ({ page }) => {
    await test.step("Call CorporateApiClient.getCorporateBenefitsMe", async () => {
      const client = new CorporateApiClient(page.request);
      const started = Date.now();
      const res = await client.getCorporateBenefitsMe();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), corporateSchemas.getCorporateBenefitsMe);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0214 GET /api/corporate/benefits/me rejects unauthenticated requests", { tag: ['@api', '@security', '@corporate'], annotation: [{type: "source",description: "GET /api/corporate/benefits/me"}] }, async ({ page }) => {
    await test.step("Call GET /api/corporate/benefits/me without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/corporate/benefits/me");
      expect([401, 403], `unauthenticated GET /api/corporate/benefits/me → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
