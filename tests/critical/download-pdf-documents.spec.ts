import { test, expect } from '../../fixtures';
import { DocumentsPage } from '../../pages/DocumentsPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { unique } from '../../utils/unique';

test.describe("Documents · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0018 Download PDF · Documents", { tag: ['@regression', '@documents'], annotation: [{type: "source",description: "J-015 · P2 Standard"}] }, async ({ page }) => {
    const documentsPage = new DocumentsPage(page);
    await test.step("Open Documents", async () => {
      await documentsPage.goto();
    });
    await test.step("Verify Documents is displayed", async () => {
      await documentsPage.expectLoaded();
    });
    await test.step("Fill Documents form", async () => {
      await documentsPage.fillDocuments({ search: 'a' });
    });
    await test.step("Submit Documents on Documents", async () => {
      await documentsPage.submitDocuments();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
