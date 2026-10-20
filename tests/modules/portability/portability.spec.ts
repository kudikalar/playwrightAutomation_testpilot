import { test, expect } from '../../../fixtures';
import { PortabilityMigrationPage } from '../../../pages/PortabilityMigrationPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Portability · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0076 Portability & migration page loads with meaningful content", { tag: ['@regression', '@portability'], annotation: [{type: "source",description: "PORT-001 · AI Discovery"},{type: "test-case",description: "PORT-001"}] }, async ({ page }) => {
    const portabilityMigrationPage = new PortabilityMigrationPage(page);
    await test.step("Open Portability & migration", async () => {
      await portabilityMigrationPage.goto();
    });
    await test.step("Verify Portability & migration is displayed", async () => {
      await portabilityMigrationPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
