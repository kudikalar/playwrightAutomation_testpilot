import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { CompareInsurancePage } from '../../pages/CompareInsurancePage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Orders & Checkout", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0005 Browse Orders & Checkout", { tag: ['@regression', '@orders-checkout', '@critical', '@p0', '@smoke'], annotation: [{type: "source",description: "J-023 · P0 Business Critical"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const compareInsurancePage = new CompareInsurancePage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Click Find Health Insurance on Health insurance, explained honestly.", async () => {
      await itemPage.clickFindHealthInsurance();
    });
    await test.step("Verify Compare insurance is displayed", async () => {
      await compareInsurancePage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
