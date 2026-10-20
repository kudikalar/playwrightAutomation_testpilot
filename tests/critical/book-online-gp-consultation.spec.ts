import { test, expect } from '../../fixtures';
import { HealthServicesPage3 } from '../../pages/HealthServicesPage3';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Services · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0008 ✕ · Book: Online GP consultation", { tag: ['@regression', '@services', '@p1'], annotation: [{type: "source",description: "J-013 · P1 Major"}] }, async ({ page }) => {
    const healthServicesPage3 = new HealthServicesPage3(page);
    await test.step("Open Health services", async () => {
      await healthServicesPage3.goto();
    });
    await test.step("Verify Health services is displayed", async () => {
      await healthServicesPage3.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
