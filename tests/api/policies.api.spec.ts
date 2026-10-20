import { test, expect } from '../../fixtures';
import { PolicyApiClient, policiesSchemas } from '../../api/PolicyApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0113 GET /api/policies returns 200 with a valid schema", { tag: ['@api', '@regression', '@policies'], annotation: [{type: "source",description: "GET /api/policies"}] }, async ({ page }) => {
    await test.step("Call PolicyApiClient.listPolicies", async () => {
      const client = new PolicyApiClient(page.request);
      const started = Date.now();
      const res = await client.listPolicies();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1152);
      expectSchema(await res.json(), policiesSchemas.listPolicies);
    });
  });

  test("AT-0115 GET /api/policies/pol_26b0b06501d2 returns 200 with a valid schema", { tag: ['@api', '@regression', '@policies'], annotation: [{type: "source",description: "GET /api/policies/pol_26b0b06501d2"}] }, async ({ page }) => {
    await test.step("Call PolicyApiClient.getPoliciesPol26b0b06501d2", async () => {
      const client = new PolicyApiClient(page.request);
      const started = Date.now();
      const res = await client.getPoliciesPol26b0b06501d2();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
    });
  });

  test("AT-0117 GET /api/policies/pol_39f05f4b5159 returns 200 with a valid schema", { tag: ['@api', '@regression', '@policies'], annotation: [{type: "source",description: "GET /api/policies/pol_39f05f4b5159"}] }, async ({ page }) => {
    await test.step("Call PolicyApiClient.getPoliciesPol39f05f4b5159", async () => {
      const client = new PolicyApiClient(page.request);
      const started = Date.now();
      const res = await client.getPoliciesPol39f05f4b5159();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), policiesSchemas.getPoliciesPol39f05f4b5159);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0114 GET /api/policies rejects unauthenticated requests", { tag: ['@api', '@security', '@policies'], annotation: [{type: "source",description: "GET /api/policies"}] }, async ({ page }) => {
    await test.step("Call GET /api/policies without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/policies");
      expect([401, 403], `unauthenticated GET /api/policies → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0116 GET /api/policies/pol_26b0b06501d2 rejects unauthenticated requests", { tag: ['@api', '@security', '@policies'], annotation: [{type: "source",description: "GET /api/policies/pol_26b0b06501d2"}] }, async ({ page }) => {
    await test.step("Call GET /api/policies/pol_26b0b06501d2 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/policies/pol_26b0b06501d2");
      expect([401, 403], `unauthenticated GET /api/policies/pol_26b0b06501d2 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0118 GET /api/policies/pol_39f05f4b5159 rejects unauthenticated requests", { tag: ['@api', '@security', '@policies'], annotation: [{type: "source",description: "GET /api/policies/pol_39f05f4b5159"}] }, async ({ page }) => {
    await test.step("Call GET /api/policies/pol_39f05f4b5159 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/policies/pol_39f05f4b5159");
      expect([401, 403], `unauthenticated GET /api/policies/pol_39f05f4b5159 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
