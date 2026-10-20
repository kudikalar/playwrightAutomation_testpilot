import { test, expect } from '../../fixtures';
import { NetworkApiClient, networkSchemas } from '../../api/NetworkApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0131 GET /api/network/services returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/services"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkServices", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkServices();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1032);
      expectSchema(await res.json(), networkSchemas.getNetworkServices);
    });
  });

  test("AT-0133 GET /api/network/services/svc_prv_tele_1_tele/slots returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/services/svc_prv_tele_1_tele/slots"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkServicesSvcPrvTele1TeleSlots", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkServicesSvcPrvTele1TeleSlots();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkServicesSvcPrvTele1teleSlots);
    });
  });

  test("AT-0135 GET /api/network/directory/meta returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/directory/meta"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkDirectoryMeta", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkDirectoryMeta();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1293);
      expectSchema(await res.json(), networkSchemas.getNetworkDirectoryMeta);
    });
  });

  test("AT-0137 GET /api/network/directory returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/directory"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkDirectory", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkDirectory();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkDirectory);
    });
  });

  test("AT-0139 GET /api/network/bookings/mine returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/bookings/mine"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkBookingsMine", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkBookingsMine();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkBookingsMine);
    });
  });

  test("AT-0141 GET /api/network/providers/prv_tele_1 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/prv_tele_1"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersPrvTele1", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersPrvTele1();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersPrvTele1);
    });
  });

  test("AT-0143 GET /api/network/providers/hsp_7 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_7"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersHsp7", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersHsp7();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersHsp7);
    });
  });

  test("AT-0145 GET /api/network/providers/hsp_2 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_2"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersHsp2", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersHsp2();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersHsp2);
    });
  });

  test("AT-0147 GET /api/network/providers/hsp_3 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_3"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersHsp3", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersHsp3();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersHsp3);
    });
  });

  test("AT-0149 GET /api/network/providers/hsp_6 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_6"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersHsp6", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersHsp6();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersHsp6);
    });
  });

  test("AT-0151 GET /api/network/providers/hsp_4 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_4"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersHsp4", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersHsp4();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersHsp4);
    });
  });

  test("AT-0153 GET /api/network/providers/hsp_8 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_8"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersHsp8", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersHsp8();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersHsp8);
    });
  });

  test("AT-0155 GET /api/network/providers/prv_diag_1 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/prv_diag_1"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersPrvDiag1", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersPrvDiag1();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersPrvDiag1);
    });
  });

  test("AT-0157 GET /api/network/providers/hsp_5 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_5"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersHsp5", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersHsp5();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersHsp5);
    });
  });

  test("AT-0159 GET /api/network/providers/hsp_1 returns 200 with a valid schema", { tag: ['@api', '@regression', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_1"}] }, async ({ page }) => {
    await test.step("Call NetworkApiClient.getNetworkProvidersHsp1", async () => {
      const client = new NetworkApiClient(page.request);
      const started = Date.now();
      const res = await client.getNetworkProvidersHsp1();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1074);
      expectSchema(await res.json(), networkSchemas.getNetworkProvidersHsp1);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0132 GET /api/network/services rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/services"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/services without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/services");
      expect([401, 403], `unauthenticated GET /api/network/services → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0134 GET /api/network/services/svc_prv_tele_1_tele/slots rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/services/svc_prv_tele_1_tele/slots"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/services/svc_prv_tele_1_tele/slots without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/services/svc_prv_tele_1_tele/slots");
      expect([401, 403], `unauthenticated GET /api/network/services/svc_prv_tele_1_tele/slots → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0136 GET /api/network/directory/meta rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/directory/meta"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/directory/meta without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/directory/meta");
      expect([401, 403], `unauthenticated GET /api/network/directory/meta → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0138 GET /api/network/directory rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/directory"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/directory without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/directory");
      expect([401, 403], `unauthenticated GET /api/network/directory → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0140 GET /api/network/bookings/mine rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/bookings/mine"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/bookings/mine without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/bookings/mine");
      expect([401, 403], `unauthenticated GET /api/network/bookings/mine → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0142 GET /api/network/providers/prv_tele_1 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/prv_tele_1"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/prv_tele_1 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/prv_tele_1");
      expect([401, 403], `unauthenticated GET /api/network/providers/prv_tele_1 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0144 GET /api/network/providers/hsp_7 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_7"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/hsp_7 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/hsp_7");
      expect([401, 403], `unauthenticated GET /api/network/providers/hsp_7 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0146 GET /api/network/providers/hsp_2 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_2"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/hsp_2 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/hsp_2");
      expect([401, 403], `unauthenticated GET /api/network/providers/hsp_2 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0148 GET /api/network/providers/hsp_3 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_3"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/hsp_3 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/hsp_3");
      expect([401, 403], `unauthenticated GET /api/network/providers/hsp_3 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0150 GET /api/network/providers/hsp_6 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_6"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/hsp_6 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/hsp_6");
      expect([401, 403], `unauthenticated GET /api/network/providers/hsp_6 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0152 GET /api/network/providers/hsp_4 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_4"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/hsp_4 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/hsp_4");
      expect([401, 403], `unauthenticated GET /api/network/providers/hsp_4 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0154 GET /api/network/providers/hsp_8 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_8"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/hsp_8 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/hsp_8");
      expect([401, 403], `unauthenticated GET /api/network/providers/hsp_8 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0156 GET /api/network/providers/prv_diag_1 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/prv_diag_1"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/prv_diag_1 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/prv_diag_1");
      expect([401, 403], `unauthenticated GET /api/network/providers/prv_diag_1 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0158 GET /api/network/providers/hsp_5 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_5"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/hsp_5 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/hsp_5");
      expect([401, 403], `unauthenticated GET /api/network/providers/hsp_5 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });

  test("AT-0160 GET /api/network/providers/hsp_1 rejects unauthenticated requests", { tag: ['@api', '@security', '@network'], annotation: [{type: "source",description: "GET /api/network/providers/hsp_1"}] }, async ({ page }) => {
    await test.step("Call GET /api/network/providers/hsp_1 without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/network/providers/hsp_1");
      expect([401, 403], `unauthenticated GET /api/network/providers/hsp_1 → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
