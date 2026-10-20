import { test, expect } from '../../../fixtures';
import { MyApplicationsPage } from '../../../pages/MyApplicationsPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Applications · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0075 My applications page loads with meaningful content", { tag: ['@regression', '@applications'], annotation: [{type: "source",description: "APPL-001 · AI Discovery"},{type: "test-case",description: "APPL-001"}] }, async ({ page }) => {
    const myApplicationsPage = new MyApplicationsPage(page);
    await test.step("Open My applications", async () => {
      await myApplicationsPage.goto();
    });
    await test.step("Verify My applications is displayed", async () => {
      await myApplicationsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
