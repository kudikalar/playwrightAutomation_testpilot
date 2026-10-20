import { test, expect } from '../../fixtures';
import { IntimateAClaimPage } from '../../pages/IntimateAClaimPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Claims · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0020 Send Intimation · Intimate a claim", { tag: ['@regression', '@claims'], annotation: [{type: "source",description: "J-018 · P2 Standard"}] }, async ({ page }) => {
    const intimateAclaimPage = new IntimateAClaimPage(page);
    await test.step("Open Intimate a claim", async () => {
      await intimateAclaimPage.goto();
    });
    await test.step("Verify Intimate a claim is displayed", async () => {
      await intimateAclaimPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
