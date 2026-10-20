import { test, expect } from '../../fixtures';
import { ApplicationApiClient, applicationsSchemas } from '../../api/ApplicationApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0174 GET /api/applications returns 200 with a valid schema", { tag: ['@api', '@regression', '@applications'], annotation: [{type: "source",description: "GET /api/applications"}] }, async ({ page }) => {
    await test.step("Call ApplicationApiClient.listApplications", async () => {
      const client = new ApplicationApiClient(page.request);
      const started = Date.now();
      const res = await client.listApplications();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1332);
      expectSchema(await res.json(), applicationsSchemas.listApplications);
    });
  });

  test("AT-0176 GET /api/applications/app_247fe1148322 returns 200 with a valid schema", { tag: ['@api', '@regression', '@applications'], annotation: [{type: "source",description: "GET /api/applications/app_247fe1148322"}] }, async ({ page }) => {
    await test.step("Call ApplicationApiClient.getApplicationsApp247fe1148322", async () => {
      const client = new ApplicationApiClient(page.request);
      const started = Date.now();
      const res = await client.getApplicationsApp247fe1148322();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), applicationsSchemas.getApplicationsApp247fe1148322);
    });
  });

  test("AT-0178 GET /api/applications/app_8671edd5918b returns 200 with a valid schema", { tag: ['@api', '@regression', '@applications'], annotation: [{type: "source",description: "GET /api/applications/app_8671edd5918b"}] }, async ({ page }) => {
    await test.step("Call ApplicationApiClient.getApplicationsApp8671edd5918b", async () => {
      const client = new ApplicationApiClient(page.request);
      const started = Date.now();
      const res = await client.getApplicationsApp8671edd5918b();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), applicationsSchemas.getApplicationsApp8671edd5918b);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0175 GET /api/applications rejects unauthenticated requests", { tag: ['@api', '@security', '@applications'], annotation: [{type: "source",description: "GET /api/applications"}] }, async ({ page }) => {
    await test.step("Call GET /api/applications without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/applications");
      expect([401, 403], `unauthenticated GET /api/applications → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0177 GET /api/applications/app_247fe1148322 rejects unauthenticated requests", { tag: ['@api', '@security', '@applications'], annotation: [{type: "source",description: "GET /api/applications/app_247fe1148322"}] }, async ({ page }) => {
    await test.step("Call GET /api/applications/app_247fe1148322 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/applications/app_247fe1148322");
      expect([401, 403], `unauthenticated GET /api/applications/app_247fe1148322 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0179 GET /api/applications/app_8671edd5918b rejects unauthenticated requests", { tag: ['@api', '@security', '@applications'], annotation: [{type: "source",description: "GET /api/applications/app_8671edd5918b"}] }, async ({ page }) => {
    await test.step("Call GET /api/applications/app_8671edd5918b without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/applications/app_8671edd5918b");
      expect([401, 403], `unauthenticated GET /api/applications/app_8671edd5918b → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
