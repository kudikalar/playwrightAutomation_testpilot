import { test, expect } from '../../fixtures';
import { ClaimsOpApiClient, claimsOpsSchemas } from '../../api/ClaimsOpApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0184 GET /api/claims-ops/grievances returns 200 with a valid schema", { tag: ['@api', '@regression', '@claims-ops'], annotation: [{type: "source",description: "GET /api/claims-ops/grievances"}] }, async ({ page }) => {
    await test.step("Call ClaimsOpApiClient.getClaimsOpsGrievances", async () => {
      const client = new ClaimsOpApiClient(page.request);
      const started = Date.now();
      const res = await client.getClaimsOpsGrievances();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1122);
      expectSchema(await res.json(), claimsOpsSchemas.getClaimsOpsGrievances);
    });
  });

  test("AT-0186 GET /api/claims-ops/meta returns 200 with a valid schema", { tag: ['@api', '@regression', '@claims-ops'], annotation: [{type: "source",description: "GET /api/claims-ops/meta"}] }, async ({ page }) => {
    await test.step("Call ClaimsOpApiClient.getClaimsOpsMeta", async () => {
      const client = new ClaimsOpApiClient(page.request);
      const started = Date.now();
      const res = await client.getClaimsOpsMeta();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1140);
      expectSchema(await res.json(), claimsOpsSchemas.getClaimsOpsMeta);
    });
  });

  test("AT-0188 GET /api/claims-ops/intimations returns 200 with a valid schema", { tag: ['@api', '@regression', '@claims-ops'], annotation: [{type: "source",description: "GET /api/claims-ops/intimations"}] }, async ({ page }) => {
    await test.step("Call ClaimsOpApiClient.getClaimsOpsIntimations", async () => {
      const client = new ClaimsOpApiClient(page.request);
      const started = Date.now();
      const res = await client.getClaimsOpsIntimations();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), claimsOpsSchemas.getClaimsOpsIntimations);
    });
  });

  test("AT-0190 GET /api/claims-ops/grievances/grv_demo_asha returns 200 with a valid schema", { tag: ['@api', '@regression', '@claims-ops'], annotation: [{type: "source",description: "GET /api/claims-ops/grievances/grv_demo_asha"}] }, async ({ page }) => {
    await test.step("Call ClaimsOpApiClient.getClaimsOpsGrievancesGrvDemoAsha", async () => {
      const client = new ClaimsOpApiClient(page.request);
      const started = Date.now();
      const res = await client.getClaimsOpsGrievancesGrvDemoAsha();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), claimsOpsSchemas.getClaimsOpsGrievancesGrvDemoAsha);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0185 GET /api/claims-ops/grievances rejects unauthenticated requests", { tag: ['@api', '@security', '@claims-ops'], annotation: [{type: "source",description: "GET /api/claims-ops/grievances"}] }, async ({ page }) => {
    await test.step("Call GET /api/claims-ops/grievances without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/claims-ops/grievances");
      expect([401, 403], `unauthenticated GET /api/claims-ops/grievances → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0187 GET /api/claims-ops/meta rejects unauthenticated requests", { tag: ['@api', '@security', '@claims-ops'], annotation: [{type: "source",description: "GET /api/claims-ops/meta"}] }, async ({ page }) => {
    await test.step("Call GET /api/claims-ops/meta without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/claims-ops/meta");
      expect([401, 403], `unauthenticated GET /api/claims-ops/meta → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0189 GET /api/claims-ops/intimations rejects unauthenticated requests", { tag: ['@api', '@security', '@claims-ops'], annotation: [{type: "source",description: "GET /api/claims-ops/intimations"}] }, async ({ page }) => {
    await test.step("Call GET /api/claims-ops/intimations without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/claims-ops/intimations");
      expect([401, 403], `unauthenticated GET /api/claims-ops/intimations → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0191 GET /api/claims-ops/grievances/grv_demo_asha rejects unauthenticated requests", { tag: ['@api', '@security', '@claims-ops'], annotation: [{type: "source",description: "GET /api/claims-ops/grievances/grv_demo_asha"}] }, async ({ page }) => {
    await test.step("Call GET /api/claims-ops/grievances/grv_demo_asha without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/claims-ops/grievances/grv_demo_asha");
      expect([401, 403], `unauthenticated GET /api/claims-ops/grievances/grv_demo_asha → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
