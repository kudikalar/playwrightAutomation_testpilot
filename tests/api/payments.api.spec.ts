import { test, expect } from '../../fixtures';
import { PaymentApiClient, paymentsSchemas } from '../../api/PaymentApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0215 GET /api/payments returns 200 with a valid schema", { tag: ['@api', '@regression', '@payments'], annotation: [{type: "source",description: "GET /api/payments"}] }, async ({ page }) => {
    await test.step("Call PaymentApiClient.listPayments", async () => {
      const client = new PaymentApiClient(page.request);
      const started = Date.now();
      const res = await client.listPayments();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), paymentsSchemas.listPayments);
    });
  });

  test("AT-0217 GET /api/payments/links returns 200 with a valid schema", { tag: ['@api', '@regression', '@payments'], annotation: [{type: "source",description: "GET /api/payments/links"}] }, async ({ page }) => {
    await test.step("Call PaymentApiClient.getPaymentsLinks", async () => {
      const client = new PaymentApiClient(page.request);
      const started = Date.now();
      const res = await client.getPaymentsLinks();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), paymentsSchemas.getPaymentsLinks);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0216 GET /api/payments rejects unauthenticated requests", { tag: ['@api', '@security', '@payments'], annotation: [{type: "source",description: "GET /api/payments"}] }, async ({ page }) => {
    await test.step("Call GET /api/payments without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/payments");
      expect([401, 403], `unauthenticated GET /api/payments → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0218 GET /api/payments/links rejects unauthenticated requests", { tag: ['@api', '@security', '@payments'], annotation: [{type: "source",description: "GET /api/payments/links"}] }, async ({ page }) => {
    await test.step("Call GET /api/payments/links without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/payments/links");
      expect([401, 403], `unauthenticated GET /api/payments/links → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
