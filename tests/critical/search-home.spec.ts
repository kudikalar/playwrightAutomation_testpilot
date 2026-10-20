import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { unique } from '../../utils/unique';

test.describe("Home", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0011 Search Home", { tag: ['@regression', '@home'], annotation: [{type: "source",description: "J-002 · P2 Standard"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Fill Cashless Hospital Search form", async () => {
      await itemPage.fillCashlessHospitalSearch({  });
    });
    await test.step("Submit Cashless Hospital Search on Health insurance, explained honestly.", async () => {
      await itemPage.submitCashlessHospitalSearch();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
