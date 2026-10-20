import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { CoverageNeedsPlannerPage } from '../../pages/CoverageNeedsPlannerPage';
import { Sidebar } from '../../components/Sidebar';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Orders & Checkout", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0002 Save Scenario · Your family's numbers", { tag: ['@regression', '@orders-checkout', '@critical', '@p0', '@smoke'], annotation: [{type: "source",description: "J-007 · P0 Business Critical"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const coverageNeedsPlannerPage = new CoverageNeedsPlannerPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Sidebar: go to cover planner", async () => {
      await new Sidebar(page).goToCoverPlanner();
    });
    await test.step("Verify Coverage needs planner is displayed", async () => {
      await coverageNeedsPlannerPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
