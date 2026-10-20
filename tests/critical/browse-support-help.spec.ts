import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { SupportPage } from '../../pages/SupportPage';
import { Sidebar } from '../../components/Sidebar';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Support & Help", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0029 Browse Support & Help", { tag: ['@regression', '@support-help'], annotation: [{type: "source",description: "J-027 · P3 Supporting"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const supportPage = new SupportPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Sidebar: go to claim help", async () => {
      await new Sidebar(page).goToClaimHelp();
    });
    await test.step("Verify Support is displayed", async () => {
      await supportPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
