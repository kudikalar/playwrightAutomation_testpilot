import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Home", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0010 See My Estimate", { tag: ['@regression', '@home'], annotation: [{type: "source",description: "J-001 · P2 Standard"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
