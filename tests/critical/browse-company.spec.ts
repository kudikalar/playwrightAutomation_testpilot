import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { FindHospitalsProvidersPage } from '../../pages/FindHospitalsProvidersPage';
import { CareConnectTelehealthPage } from '../../pages/CareConnectTelehealthPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Company", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0027 Browse Company", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "J-029 · P2 Standard"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const findHospitalsProvidersPage = new FindHospitalsProvidersPage(page);
    const careConnectTelehealthPage = new CareConnectTelehealthPage(page);
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
    await test.step("Click Care Connect Telehealth on Find hospitals & providers", async () => {
      await findHospitalsProvidersPage.clickCareConnectTelehealth();
    });
    await test.step("Verify CareConnect Telehealth is displayed", async () => {
      await careConnectTelehealthPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
