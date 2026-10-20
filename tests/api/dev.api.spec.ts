import { test, expect } from '../../fixtures';
import { DevApiClient, devSchemas } from '../../api/DevApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0109 GET /api/dev/clock returns 200 with a valid schema", { tag: ['@api', '@regression', '@dev'], annotation: [{type: "source",description: "GET /api/dev/clock"}] }, async ({ page }) => {
    await test.step("Call DevApiClient.getDevClock", async () => {
      const client = new DevApiClient(page.request);
      const started = Date.now();
      const res = await client.getDevClock();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1083);
      expectSchema(await res.json(), devSchemas.getDevClock);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0110 GET /api/dev/clock rejects unauthenticated requests", { tag: ['@api', '@security', '@dev'], annotation: [{type: "source",description: "GET /api/dev/clock"}] }, async ({ page }) => {
    await test.step("Call GET /api/dev/clock without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/dev/clock");
      expect([401, 403], `unauthenticated GET /api/dev/clock → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
