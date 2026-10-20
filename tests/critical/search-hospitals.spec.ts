import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { FindHospitalsProvidersPage } from '../../pages/FindHospitalsProvidersPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { unique } from '../../utils/unique';

test.describe("Hospitals", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0013 Search Hospitals", { tag: ['@regression', '@hospitals'], annotation: [{type: "source",description: "J-006 · P2 Standard"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const findHospitalsProvidersPage = new FindHospitalsProvidersPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Click Find A Hospital on Health insurance, explained honestly.", async () => {
      await itemPage.clickFindAHospital();
    });
    await test.step("Verify Find hospitals & providers is displayed", async () => {
      await findHospitalsProvidersPage.expectLoaded();
    });
    await test.step("Fill Directory Filters form", async () => {
      await findHospitalsProvidersPage.fillDirectoryFilters({  });
    });
    await test.step("Submit Directory Filters on Find hospitals & providers", async () => {
      await findHospitalsProvidersPage.submitDirectoryFilters();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
