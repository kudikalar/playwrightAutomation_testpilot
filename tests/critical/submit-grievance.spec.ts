import { test, expect } from '../../fixtures';
import { GrievancesPage2 } from '../../pages/GrievancesPage2';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Company · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0009 Submit Grievance", { tag: ['@regression', '@company', '@p1'], annotation: [{type: "source",description: "J-020 · P1 Major"}] }, async ({ page }) => {
    const grievancesPage2 = new GrievancesPage2(page);
    await test.step("Open Grievances", async () => {
      await grievancesPage2.goto();
    });
    await test.step("Verify Grievances is displayed", async () => {
      await grievancesPage2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
