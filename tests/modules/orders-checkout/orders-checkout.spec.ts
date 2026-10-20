import { test, expect } from '../../../fixtures';
import { CompareInsurancePage } from '../../../pages/CompareInsurancePage';
import { CoverageNeedsPlannerPage } from '../../../pages/CoverageNeedsPlannerPage';
import { PaymentsReceiptsPage } from '../../../pages/PaymentsReceiptsPage';
import { CompareInsurancePage2 } from '../../../pages/CompareInsurancePage2';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Orders & Checkout", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0032 Compare insurance page loads with meaningful content", { tag: ['@regression', '@orders-checkout', '@smoke', '@critical'], annotation: [{type: "source",description: "ORDE-001 · AI Discovery"},{type: "test-case",description: "ORDE-001"}] }, async ({ page }) => {
    const compareInsurancePage = new CompareInsurancePage(page);
    await test.step("Open Compare insurance", async () => {
      await compareInsurancePage.goto();
    });
    await test.step("Verify Compare insurance is displayed", async () => {
      await compareInsurancePage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0034 Coverage needs planner page loads with meaningful content", { tag: ['@regression', '@orders-checkout', '@smoke', '@critical'], annotation: [{type: "source",description: "ORDE-010 · AI Discovery"},{type: "test-case",description: "ORDE-010"}] }, async ({ page }) => {
    const coverageNeedsPlannerPage = new CoverageNeedsPlannerPage(page);
    await test.step("Open Coverage needs planner", async () => {
      await coverageNeedsPlannerPage.goto();
    });
    await test.step("Verify Coverage needs planner is displayed", async () => {
      await coverageNeedsPlannerPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0048 Your family's numbers: submission blocked when required fields are empty", { tag: ['@negative', '@regression', '@orders-checkout'], annotation: [{type: "source",description: "ORDE-014 · AI Discovery"},{type: "test-case",description: "ORDE-014"}] }, async ({ page }) => {
    const coverageNeedsPlannerPage = new CoverageNeedsPlannerPage(page);
    await test.step("Open Coverage needs planner", async () => {
      await coverageNeedsPlannerPage.goto();
    });
    await test.step("Verify Coverage needs planner is displayed", async () => {
      await coverageNeedsPlannerPage.expectLoaded();
    });
    await test.step("Submit Your Family Snumbers on Coverage needs planner", async () => {
      await coverageNeedsPlannerPage.submitYourFamilySnumbers();
    });
    await test.step("Verify validation feedback", async () => {
      await coverageNeedsPlannerPage.expectValidationShown();
    });
  });
});

test.describe("Orders & Checkout · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0037 Payments & receipts page loads with meaningful content", { tag: ['@regression', '@orders-checkout', '@smoke', '@critical'], annotation: [{type: "source",description: "ORDE-026 · AI Discovery"},{type: "test-case",description: "ORDE-026"}] }, async ({ page }) => {
    const paymentsReceiptsPage = new PaymentsReceiptsPage(page);
    await test.step("Open Payments & receipts", async () => {
      await paymentsReceiptsPage.goto();
    });
    await test.step("Verify Payments & receipts is displayed", async () => {
      await paymentsReceiptsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0045 Compare insurance page loads with meaningful content", { tag: ['@regression', '@orders-checkout', '@smoke', '@critical'], annotation: [{type: "source",description: "ORDE-017 · AI Discovery"},{type: "test-case",description: "ORDE-017"}] }, async ({ page }) => {
    const compareInsurancePage2 = new CompareInsurancePage2(page);
    await test.step("Open Compare insurance", async () => {
      await compareInsurancePage2.goto();
    });
    await test.step("Verify Compare insurance is displayed", async () => {
      await compareInsurancePage2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
