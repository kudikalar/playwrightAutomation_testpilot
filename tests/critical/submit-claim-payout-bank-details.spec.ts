import { test, expect } from '../../fixtures';
import { NewHealthClaimPage } from '../../pages/NewHealthClaimPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Claims · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0004 Submit Claim · Payout bank details", { tag: ['@regression', '@claims', '@critical', '@p0', '@smoke'], annotation: [{type: "source",description: "J-019 · P0 Business Critical"}] }, async ({ page }) => {
    const newHealthClaimPage = new NewHealthClaimPage(page);
    await test.step("Open New health claim", async () => {
      await newHealthClaimPage.goto();
    });
    await test.step("Verify New health claim is displayed", async () => {
      await newHealthClaimPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
