import { test, expect } from '../../../fixtures';
import { MyFamilyPage } from '../../../pages/MyFamilyPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Family · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0072 My family page loads with meaningful content", { tag: ['@regression', '@family'], annotation: [{type: "source",description: "FAMI-001 · AI Discovery"},{type: "test-case",description: "FAMI-001"}] }, async ({ page }) => {
    const myFamilyPage = new MyFamilyPage(page);
    await test.step("Open My family", async () => {
      await myFamilyPage.goto();
    });
    await test.step("Verify My family is displayed", async () => {
      await myFamilyPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
