import { test, expect } from '../../fixtures';
import { ClaimHcSeed000001Page } from '../../pages/ClaimHcSeed000001Page';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Dashboard · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0019 Upload · Documents", { tag: ['@regression', '@dashboard'], annotation: [{type: "source",description: "J-017 · P2 Standard"}] }, async ({ page }) => {
    const claimHcSeed000001page = new ClaimHcSeed000001Page(page);
    await test.step("Open Claim HC-SEED-000001", async () => {
      await claimHcSeed000001page.goto();
    });
    await test.step("Verify Claim HC-SEED-000001 is displayed", async () => {
      await claimHcSeed000001page.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
