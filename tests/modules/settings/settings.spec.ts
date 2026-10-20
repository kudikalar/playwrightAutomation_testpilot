import { test, expect } from '../../../fixtures';
import { YourProfilePage } from '../../../pages/YourProfilePage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Settings · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0054 Your profile page loads with meaningful content", { tag: ['@regression', '@settings'], annotation: [{type: "source",description: "SETT-001 · AI Discovery"},{type: "test-case",description: "SETT-001"}] }, async ({ page }) => {
    const yourProfilePage = new YourProfilePage(page);
    await test.step("Open Your profile", async () => {
      await yourProfilePage.goto();
    });
    await test.step("Verify Your profile is displayed", async () => {
      await yourProfilePage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
