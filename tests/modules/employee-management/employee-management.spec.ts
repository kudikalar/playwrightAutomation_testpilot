import { test, expect } from '../../../fixtures';
import { EmployeeBenefitsPage } from '../../../pages/EmployeeBenefitsPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Employee Management · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0055 Employee benefits page loads with meaningful content", { tag: ['@regression', '@employee-management'], annotation: [{type: "source",description: "EMPL-001 · AI Discovery"},{type: "test-case",description: "EMPL-001"}] }, async ({ page }) => {
    const employeeBenefitsPage = new EmployeeBenefitsPage(page);
    await test.step("Open Employee benefits", async () => {
      await employeeBenefitsPage.goto();
    });
    await test.step("Verify Employee benefits is displayed", async () => {
      await employeeBenefitsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
