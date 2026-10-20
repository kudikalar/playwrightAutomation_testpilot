import { test, expect } from '../../fixtures';
import { YourProfilePage } from '../../pages/YourProfilePage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Settings · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0017 Discard · Personal details", { tag: ['@regression', '@settings'], annotation: [{type: "source",description: "J-014 · P2 Standard"}] }, async ({ page }) => {
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
