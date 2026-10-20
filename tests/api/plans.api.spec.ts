import { test, expect } from '../../fixtures';
import { PlanApiClient, plansSchemas } from '../../api/PlanApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0121 GET /api/plans returns 200 with a valid schema", { tag: ['@api', '@regression', '@plans'], annotation: [{type: "source",description: "GET /api/plans"}] }, async ({ page }) => {
    await test.step("Call PlanApiClient.listPlans", async () => {
      const client = new PlanApiClient(page.request);
      const started = Date.now();
      const res = await client.listPlans();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), plansSchemas.listPlans);
    });
  });

  test("AT-0123 GET /api/plans/pln_life_term returns 200 with a valid schema", { tag: ['@api', '@regression', '@plans'], annotation: [{type: "source",description: "GET /api/plans/pln_life_term"}] }, async ({ page }) => {
    await test.step("Call PlanApiClient.getPlansPlnLifeTerm", async () => {
      const client = new PlanApiClient(page.request);
      const started = Date.now();
      const res = await client.getPlansPlnLifeTerm();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), plansSchemas.getPlansPlnLifeTerm);
    });
  });

  test("AT-0125 GET /api/plans/pln_health_floater returns 200 with a valid schema", { tag: ['@api', '@regression', '@plans'], annotation: [{type: "source",description: "GET /api/plans/pln_health_floater"}] }, async ({ page }) => {
    await test.step("Call PlanApiClient.getPlansPlnHealthFloater", async () => {
      const client = new PlanApiClient(page.request);
      const started = Date.now();
      const res = await client.getPlansPlnHealthFloater();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), plansSchemas.getPlansPlnHealthFloater);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0122 GET /api/plans rejects unauthenticated requests", { tag: ['@api', '@security', '@plans'], annotation: [{type: "source",description: "GET /api/plans"}] }, async ({ page }) => {
    await test.step("Call GET /api/plans without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/plans");
      expect([401, 403], `unauthenticated GET /api/plans → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0124 GET /api/plans/pln_life_term rejects unauthenticated requests", { tag: ['@api', '@security', '@plans'], annotation: [{type: "source",description: "GET /api/plans/pln_life_term"}] }, async ({ page }) => {
    await test.step("Call GET /api/plans/pln_life_term without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/plans/pln_life_term");
      expect([401, 403], `unauthenticated GET /api/plans/pln_life_term → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0126 GET /api/plans/pln_health_floater rejects unauthenticated requests", { tag: ['@api', '@security', '@plans'], annotation: [{type: "source",description: "GET /api/plans/pln_health_floater"}] }, async ({ page }) => {
    await test.step("Call GET /api/plans/pln_health_floater without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/plans/pln_health_floater");
      expect([401, 403], `unauthenticated GET /api/plans/pln_health_floater → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
