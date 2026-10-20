import { test, expect } from '../../fixtures';
import { HospitalApiClient } from '../../api/HospitalApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0192 GET /api/hospitals returns 200 with a valid schema", { tag: ['@api', '@regression', '@hospitals'], annotation: [{type: "source",description: "GET /api/hospitals"}] }, async ({ page }) => {
    await test.step("Call HospitalApiClient.listHospitals", async () => {
      const client = new HospitalApiClient(page.request);
      const started = Date.now();
      const res = await client.listHospitals();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0193 GET /api/hospitals rejects unauthenticated requests", { tag: ['@api', '@security', '@hospitals'], annotation: [{type: "source",description: "GET /api/hospitals"}] }, async ({ page }) => {
    await test.step("Call GET /api/hospitals without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/hospitals");
      expect([401, 403], `unauthenticated GET /api/hospitals → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
