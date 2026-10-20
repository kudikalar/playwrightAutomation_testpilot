import { test, expect } from '../../fixtures';
import { GrievancesGrvDemoAshaPage } from '../../pages/GrievancesGrvDemoAshaPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Company · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0022 Upload · Attachments", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "J-022 · P2 Standard"}] }, async ({ page }) => {
    const grievancesGrvDemoAshaPage = new GrievancesGrvDemoAshaPage(page);
    await test.step("Open No update on my reimbursement claim", async () => {
      await grievancesGrvDemoAshaPage.goto();
    });
    await test.step("Verify No update on my reimbursement claim is displayed", async () => {
      await grievancesGrvDemoAshaPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
