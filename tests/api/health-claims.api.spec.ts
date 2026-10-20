import { test, expect } from '../../fixtures';
import { HealthClaimApiClient, healthClaimsSchemas } from '../../api/HealthClaimApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0180 GET /api/health-claims returns 200 with a valid schema", { tag: ['@api', '@regression', '@health-claims'], annotation: [{type: "source",description: "GET /api/health-claims"}] }, async ({ page }) => {
    await test.step("Call HealthClaimApiClient.listHealthClaims", async () => {
      const client = new HealthClaimApiClient(page.request);
      const started = Date.now();
      const res = await client.listHealthClaims();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1371);
      expectSchema(await res.json(), healthClaimsSchemas.listHealthClaims);
    });
  });

  test("AT-0182 GET /api/health-claims/hea_13b7c46c9eec returns 200 with a valid schema", { tag: ['@api', '@regression', '@health-claims'], annotation: [{type: "source",description: "GET /api/health-claims/hea_13b7c46c9eec"}] }, async ({ page }) => {
    await test.step("Call HealthClaimApiClient.getHealthClaimsHea13b7c46c9eec", async () => {
      const client = new HealthClaimApiClient(page.request);
      const started = Date.now();
      const res = await client.getHealthClaimsHea13b7c46c9eec();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1095);
      expectSchema(await res.json(), healthClaimsSchemas.getHealthClaimsHea13b7c46c9eec);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0181 GET /api/health-claims rejects unauthenticated requests", { tag: ['@api', '@security', '@health-claims'], annotation: [{type: "source",description: "GET /api/health-claims"}] }, async ({ page }) => {
    await test.step("Call GET /api/health-claims without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/health-claims");
      expect([401, 403], `unauthenticated GET /api/health-claims → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0183 GET /api/health-claims/hea_13b7c46c9eec rejects unauthenticated requests", { tag: ['@api', '@security', '@health-claims'], annotation: [{type: "source",description: "GET /api/health-claims/hea_13b7c46c9eec"}] }, async ({ page }) => {
    await test.step("Call GET /api/health-claims/hea_13b7c46c9eec without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/health-claims/hea_13b7c46c9eec");
      expect([401, 403], `unauthenticated GET /api/health-claims/hea_13b7c46c9eec → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
