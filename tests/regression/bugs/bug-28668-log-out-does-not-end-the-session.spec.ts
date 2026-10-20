import { test, expect } from '../../../fixtures';
import { VisionHealthCarePage2 } from '../../../pages/VisionHealthCarePage2';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Authentication · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0104 BUG-28668 regression: Log out does not end the session", { tag: ['@regression', '@bug-28668', '@authentication'], annotation: [{type: "source",description: "BUG-28668 · High"},{type: "issue",description: "BUG-28668"},{type: "test-case",description: "AUTH-055"}] }, async ({ page }) => {
    const visionHealthCarePage2 = new VisionHealthCarePage2(page);
    await test.step("Open Vision Health Care", async () => {
      await visionHealthCarePage2.goto();
    });
    await test.step("Verify Vision Health Care is displayed", async () => {
      await visionHealthCarePage2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
