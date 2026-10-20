import { test, expect } from '../../../fixtures';
import { ItemPage } from '../../../pages/ItemPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';
import { unique } from '../../../utils/unique';

test.describe("Home", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0030 Health insurance, explained honestly. page loads with meaningful content", { tag: ['@regression', '@home', '@smoke', '@critical'], annotation: [{type: "source",description: "HOME-001 · AI Discovery"},{type: "test-case",description: "HOME-001"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0046 Cashless hospital search: submit with valid data", { tag: ['@regression', '@home'], annotation: [{type: "source",description: "HOME-007 · AI Discovery"},{type: "test-case",description: "HOME-007"}] }, async ({ page }) => {
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

  test("AT-0056 Quick premium estimate: submission blocked when required fields are empty", { tag: ['@negative', '@regression', '@home'], annotation: [{type: "source",description: "HOME-005 · AI Discovery"},{type: "test-case",description: "HOME-005"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Submit Quick Premium Estimate on Health insurance, explained honestly.", async () => {
      await itemPage.submitQuickPremiumEstimate();
    });
    await test.step("Verify validation feedback", async () => {
      await itemPage.expectValidationShown();
    });
  });

  test("AT-0057 Request a callback: submission blocked when required fields are empty", { tag: ['@negative', '@regression', '@home'], annotation: [{type: "source",description: "HOME-008 · AI Discovery"},{type: "test-case",description: "HOME-008"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Submit Request Acallback on Health insurance, explained honestly.", async () => {
      await itemPage.submitRequestAcallback();
    });
    await test.step("Verify validation feedback", async () => {
      await itemPage.expectValidationShown();
    });
  });
});
