import { test, expect } from '../../fixtures';
import { VisionAiPage } from '../../pages/VisionAiPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Company · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0028 Ask · Ask about your cover", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "J-016 · P3 Supporting"}] }, async ({ page }) => {
    const visionAiPage = new VisionAiPage(page);
    await test.step("Open Vision AI", async () => {
      await visionAiPage.goto();
    });
    await test.step("Verify Vision AI is displayed", async () => {
      await visionAiPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
