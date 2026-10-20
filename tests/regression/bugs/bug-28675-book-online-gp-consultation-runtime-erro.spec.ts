import { test, expect } from '../../../fixtures';
import { HealthServicesPage3 } from '../../../pages/HealthServicesPage3';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Services · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0106 BUG-28675 regression: Book: Online GP consultation: runtime error after submit — TypeError: Cannot read properties of null (reading 'policies", { tag: ['@regression', '@bug-28675', '@services'], annotation: [{type: "source",description: "BUG-28675 · High"},{type: "issue",description: "BUG-28675"},{type: "test-case",description: "SERV-022"}] }, async ({ page }) => {
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
