import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { ReportALifeInsuranceClaimPage } from '../../pages/ReportALifeInsuranceClaimPage';
import { Sidebar } from '../../components/Sidebar';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Authentication", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0014 Send Verification Code · Report a life insurance claim", { tag: ['@regression', '@authentication'], annotation: [{type: "source",description: "J-008 · P2 Standard"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const reportAlifeInsuranceClaimPage = new ReportALifeInsuranceClaimPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Sidebar: go to report a life claim", async () => {
      await new Sidebar(page).goToReportALifeClaim();
    });
    await test.step("Verify Report a life insurance claim is displayed", async () => {
      await reportAlifeInsuranceClaimPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
