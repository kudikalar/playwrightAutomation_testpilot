import { test, expect } from '../../../fixtures';
import { DocumentsPage } from '../../../pages/DocumentsPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Documents · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0065 Documents page loads with meaningful content", { tag: ['@regression', '@documents'], annotation: [{type: "source",description: "DOCU-001 · AI Discovery"},{type: "test-case",description: "DOCU-001"}] }, async ({ page }) => {
    const documentsPage = new DocumentsPage(page);
    await test.step("Open Documents", async () => {
      await documentsPage.goto();
    });
    await test.step("Verify Documents is displayed", async () => {
      await documentsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
