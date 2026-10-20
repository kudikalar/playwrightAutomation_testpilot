import { test, expect } from '../../fixtures';
import { EnterpriseApiClient, enterpriseSchemas } from '../../api/EnterpriseApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0194 GET /api/enterprise/support/tickets returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/tickets"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterpriseSupportTickets", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterpriseSupportTickets();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), enterpriseSchemas.getEnterpriseSupportTickets);
    });
  });

  test("AT-0196 GET /api/enterprise/support/meta returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/meta"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterpriseSupportMeta", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterpriseSupportMeta();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), enterpriseSchemas.getEnterpriseSupportMeta);
    });
  });

  test("AT-0198 GET /api/enterprise/support/kb returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterpriseSupportKb", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterpriseSupportKb();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(2274);
      expectSchema(await res.json(), enterpriseSchemas.getEnterpriseSupportKb);
    });
  });

  test("AT-0200 GET /api/enterprise/support/kb/support-vs-grievance returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/support-vs-grievance"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterpriseSupportKbSupportVsGrievance", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterpriseSupportKbSupportVsGrievance();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), enterpriseSchemas.getEnterpriseSupportKbSupportVsGrievance);
    });
  });

  test("AT-0202 GET /api/enterprise/support/kb/payment-failed returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/payment-failed"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterpriseSupportKbPaymentFailed", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterpriseSupportKbPaymentFailed();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), enterpriseSchemas.getEnterpriseSupportKbPaymentFailed);
    });
  });

  test("AT-0204 GET /api/enterprise/support/kb/cashless-basics returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/cashless-basics"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterpriseSupportKbCashlessBasics", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterpriseSupportKbCashlessBasics();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), enterpriseSchemas.getEnterpriseSupportKbCashlessBasics);
    });
  });

  test("AT-0206 GET /api/enterprise/support/kb/data-rights returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/data-rights"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterpriseSupportKbDataRights", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterpriseSupportKbDataRights();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), enterpriseSchemas.getEnterpriseSupportKbDataRights);
    });
  });

  test("AT-0208 GET /api/enterprise/support/kb/languages-accessibility returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/languages-accessibility"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterpriseSupportKbLanguagesAccessibility", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterpriseSupportKbLanguagesAccessibility();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), enterpriseSchemas.getEnterpriseSupportKbLanguagesAccessibility);
    });
  });

  test("AT-0210 GET /api/enterprise/public/config returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/public/config"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterprisePublicConfig", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterprisePublicConfig();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(2010);
      expectSchema(await res.json(), enterpriseSchemas.getEnterprisePublicConfig);
    });
  });

  test("AT-0211 GET /api/enterprise/privacy returns 200 with a valid schema", { tag: ['@api', '@regression', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/privacy"}] }, async ({ page }) => {
    await test.step("Call EnterpriseApiClient.getEnterprisePrivacy", async () => {
      const client = new EnterpriseApiClient(page.request);
      const started = Date.now();
      const res = await client.getEnterprisePrivacy();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), enterpriseSchemas.getEnterprisePrivacy);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0195 GET /api/enterprise/support/tickets rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/tickets"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/support/tickets without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/support/tickets");
      expect([401, 403], `unauthenticated GET /api/enterprise/support/tickets → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0197 GET /api/enterprise/support/meta rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/meta"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/support/meta without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/support/meta");
      expect([401, 403], `unauthenticated GET /api/enterprise/support/meta → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0199 GET /api/enterprise/support/kb rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/support/kb without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/support/kb");
      expect([401, 403], `unauthenticated GET /api/enterprise/support/kb → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0201 GET /api/enterprise/support/kb/support-vs-grievance rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/support-vs-grievance"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/support/kb/support-vs-grievance without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/support/kb/support-vs-grievance");
      expect([401, 403], `unauthenticated GET /api/enterprise/support/kb/support-vs-grievance → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0203 GET /api/enterprise/support/kb/payment-failed rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/payment-failed"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/support/kb/payment-failed without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/support/kb/payment-failed");
      expect([401, 403], `unauthenticated GET /api/enterprise/support/kb/payment-failed → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0205 GET /api/enterprise/support/kb/cashless-basics rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/cashless-basics"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/support/kb/cashless-basics without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/support/kb/cashless-basics");
      expect([401, 403], `unauthenticated GET /api/enterprise/support/kb/cashless-basics → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0207 GET /api/enterprise/support/kb/data-rights rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/data-rights"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/support/kb/data-rights without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/support/kb/data-rights");
      expect([401, 403], `unauthenticated GET /api/enterprise/support/kb/data-rights → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0209 GET /api/enterprise/support/kb/languages-accessibility rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/support/kb/languages-accessibility"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/support/kb/languages-accessibility without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/support/kb/languages-accessibility");
      expect([401, 403], `unauthenticated GET /api/enterprise/support/kb/languages-accessibility → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0212 GET /api/enterprise/privacy rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/privacy"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/privacy without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/privacy");
      expect([401, 403], `unauthenticated GET /api/enterprise/privacy → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0222 GET /api/enterprise/public/config rejects unauthenticated requests", { tag: ['@api', '@security', '@enterprise'], annotation: [{type: "source",description: "GET /api/enterprise/public/config"}] }, async ({ page }) => {
    await test.step("Call GET /api/enterprise/public/config without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/enterprise/public/config");
      expect([401, 403], `unauthenticated GET /api/enterprise/public/config → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
