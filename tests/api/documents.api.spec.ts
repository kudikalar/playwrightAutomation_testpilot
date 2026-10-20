import { test, expect } from '../../fixtures';
import { DocumentApiClient, documentsSchemas } from '../../api/DocumentApiClient';
import { expectSchema } from '../../utils/schema';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { request as playwrightRequest } from '@playwright/test';

test.describe("API · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0127 GET /api/documents returns 200 with a valid schema", { tag: ['@api', '@regression', '@documents'], annotation: [{type: "source",description: "GET /api/documents"}] }, async ({ page }) => {
    await test.step("Call DocumentApiClient.listDocuments", async () => {
      const client = new DocumentApiClient(page.request);
      const started = Date.now();
      const res = await client.listDocuments();
      const elapsed = Date.now() - started;
      expect(res.status()).toBe(200);
      expect(elapsed, 'response time (ms)').toBeLessThan(1000);
      expectSchema(await res.json(), documentsSchemas.listDocuments);
    });
  });
});

test.describe("API", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0128 GET /api/documents rejects unauthenticated requests", { tag: ['@api', '@security', '@documents'], annotation: [{type: "source",description: "GET /api/documents"}] }, async ({ page }) => {
    await test.step("Call GET /api/documents without a session", async () => {
      const anonymous = await playwrightRequest.newContext({ baseURL: "https://stage-vhc-healthcare.vercel.app".replace(/\/$/, '') });
      const res = await anonymous.get("/api/documents");
      expect([401, 403], `unauthenticated GET /api/documents → ${res.status()}`).toContain(res.status());
      await anonymous.dispose();
    });
  });
});
