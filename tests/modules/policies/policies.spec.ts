import { test, expect } from '../../../fixtures';
import { MyPoliciesPage } from '../../../pages/MyPoliciesPage';
import { VhcL000002Page } from '../../../pages/VhcL000002Page';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Policies · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0073 My policies page loads with meaningful content", { tag: ['@regression', '@policies'], annotation: [{type: "source",description: "POLI-001 · AI Discovery"},{type: "test-case",description: "POLI-001"}] }, async ({ page }) => {
    const myPoliciesPage = new MyPoliciesPage(page);
    await test.step("Open My policies", async () => {
      await myPoliciesPage.goto();
    });
    await test.step("Verify My policies is displayed", async () => {
      await myPoliciesPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0091 VHC-L-000002 page loads with meaningful content", { tag: ['@regression', '@policies'], annotation: [{type: "source",description: "POLI-009 · AI Discovery"},{type: "test-case",description: "POLI-009"}] }, async ({ page }) => {
    const vhcL000002page = new VhcL000002Page(page);
    await test.step("Open VHC-L-000002", async () => {
      await vhcL000002page.goto();
    });
    await test.step("Verify VHC-L-000002 is displayed", async () => {
      await vhcL000002page.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
