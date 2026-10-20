import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { HealthServicesPage } from '../../pages/HealthServicesPage';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';
import { unique } from '../../utils/unique';

test.describe("Services", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0015 Search Services", { tag: ['@regression', '@services'], annotation: [{type: "source",description: "J-011 · P2 Standard"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const healthServicesPage = new HealthServicesPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Open Health services", async () => {
      await healthServicesPage.goto();
    });
    await test.step("Verify Health services is displayed", async () => {
      await healthServicesPage.expectLoaded();
    });
    await test.step("Fill Service Filters form", async () => {
      await healthServicesPage.fillServiceFilters({ search: 'a' });
    });
    await test.step("Submit Service Filters on Health services", async () => {
      await healthServicesPage.submitServiceFilters();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
