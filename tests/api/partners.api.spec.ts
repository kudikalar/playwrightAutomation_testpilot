import { test, expect } from '../../fixtures';
import { PartnerApiClient, partnersSchemas } from '../../api/PartnerApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0163 GET /api/partners/public/categories returns 200 with a valid schema", { tag: ['@api', '@regression', '@partners'], annotation: [{type: "source",description: "GET /api/partners/public/categories"}] }, async ({ page }) => {
    await test.step("Call PartnerApiClient.getPartnersPublicCategories", async () => {
      const client = new PartnerApiClient(page.request);
      const started = Date.now();
      const res = await client.getPartnersPublicCategories();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), partnersSchemas.getPartnersPublicCategories);
    });
  });

  test("AT-0165 GET /api/partners/wallet/policies/pol_26b0b06501d2 returns 200 with a valid schema", { tag: ['@api', '@regression', '@partners'], annotation: [{type: "source",description: "GET /api/partners/wallet/policies/pol_26b0b06501d2"}] }, async ({ page }) => {
    await test.step("Call PartnerApiClient.getPartnersWalletPoliciesPol26b0b06501d2", async () => {
      const client = new PartnerApiClient(page.request);
      const started = Date.now();
      const res = await client.getPartnersWalletPoliciesPol26b0b06501d2();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), partnersSchemas.getPartnersWalletPoliciesPol26b0b06501d2);
    });
  });

  test("AT-0167 GET /api/partners/wallet returns 200 with a valid schema", { tag: ['@api', '@regression', '@partners'], annotation: [{type: "source",description: "GET /api/partners/wallet"}] }, async ({ page }) => {
    await test.step("Call PartnerApiClient.getPartnersWallet", async () => {
      const client = new PartnerApiClient(page.request);
      const started = Date.now();
      const res = await client.getPartnersWallet();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), partnersSchemas.getPartnersWallet);
    });
  });

  test("AT-0169 GET /api/partners/portability returns 200 with a valid schema", { tag: ['@api', '@regression', '@partners'], annotation: [{type: "source",description: "GET /api/partners/portability"}] }, async ({ page }) => {
    await test.step("Call PartnerApiClient.getPartnersPortability", async () => {
      const client = new PartnerApiClient(page.request);
      const started = Date.now();
      const res = await client.getPartnersPortability();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), partnersSchemas.getPartnersPortability);
    });
  });

  test("AT-0171 GET /api/partners/wallet/policies/pol_39f05f4b5159 returns 200 with a valid schema", { tag: ['@api', '@regression', '@partners'], annotation: [{type: "source",description: "GET /api/partners/wallet/policies/pol_39f05f4b5159"}] }, async ({ page }) => {
    await test.step("Call PartnerApiClient.getPartnersWalletPoliciesPol39f05f4b5159", async () => {
      const client = new PartnerApiClient(page.request);
      const started = Date.now();
      const res = await client.getPartnersWalletPoliciesPol39f05f4b5159();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), partnersSchemas.getPartnersWalletPoliciesPol39f05f4b5159);
    });
  });

  test("AT-0173 GET /api/partners/public/insurers returns 200 with a valid schema", { tag: ['@api', '@regression', '@partners'], annotation: [{type: "source",description: "GET /api/partners/public/insurers"}] }, async ({ page }) => {
    await test.step("Call PartnerApiClient.getPartnersPublicInsurers", async () => {
      const client = new PartnerApiClient(page.request);
      const started = Date.now();
      const res = await client.getPartnersPublicInsurers();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), partnersSchemas.getPartnersPublicInsurers);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0164 GET /api/partners/public/categories rejects unauthenticated requests", { tag: ['@api', '@security', '@partners'], annotation: [{type: "source",description: "GET /api/partners/public/categories"}] }, async ({ page }) => {
    await test.step("Call GET /api/partners/public/categories without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/partners/public/categories");
      expect([401, 403], `unauthenticated GET /api/partners/public/categories → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0166 GET /api/partners/wallet/policies/pol_26b0b06501d2 rejects unauthenticated requests", { tag: ['@api', '@security', '@partners'], annotation: [{type: "source",description: "GET /api/partners/wallet/policies/pol_26b0b06501d2"}] }, async ({ page }) => {
    await test.step("Call GET /api/partners/wallet/policies/pol_26b0b06501d2 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/partners/wallet/policies/pol_26b0b06501d2");
      expect([401, 403], `unauthenticated GET /api/partners/wallet/policies/pol_26b0b06501d2 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0168 GET /api/partners/wallet rejects unauthenticated requests", { tag: ['@api', '@security', '@partners'], annotation: [{type: "source",description: "GET /api/partners/wallet"}] }, async ({ page }) => {
    await test.step("Call GET /api/partners/wallet without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/partners/wallet");
      expect([401, 403], `unauthenticated GET /api/partners/wallet → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0170 GET /api/partners/portability rejects unauthenticated requests", { tag: ['@api', '@security', '@partners'], annotation: [{type: "source",description: "GET /api/partners/portability"}] }, async ({ page }) => {
    await test.step("Call GET /api/partners/portability without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/partners/portability");
      expect([401, 403], `unauthenticated GET /api/partners/portability → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0172 GET /api/partners/wallet/policies/pol_39f05f4b5159 rejects unauthenticated requests", { tag: ['@api', '@security', '@partners'], annotation: [{type: "source",description: "GET /api/partners/wallet/policies/pol_39f05f4b5159"}] }, async ({ page }) => {
    await test.step("Call GET /api/partners/wallet/policies/pol_39f05f4b5159 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/partners/wallet/policies/pol_39f05f4b5159");
      expect([401, 403], `unauthenticated GET /api/partners/wallet/policies/pol_39f05f4b5159 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0221 GET /api/partners/public/insurers rejects unauthenticated requests", { tag: ['@api', '@security', '@partners'], annotation: [{type: "source",description: "GET /api/partners/public/insurers"}] }, async ({ page }) => {
    await test.step("Call GET /api/partners/public/insurers without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/partners/public/insurers");
      expect([401, 403], `unauthenticated GET /api/partners/public/insurers → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
