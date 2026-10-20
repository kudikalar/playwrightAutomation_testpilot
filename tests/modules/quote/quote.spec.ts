import { test, expect } from '../../../fixtures';
import { QuoteCalculatorPage } from '../../../pages/QuoteCalculatorPage';
import { QuoteCalculatorPage2 } from '../../../pages/QuoteCalculatorPage2';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Quote", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0047 Your details: submission blocked when required fields are empty", { tag: ['@negative', '@regression', '@quote'], annotation: [{type: "source",description: "QUOT-005 · AI Discovery"},{type: "test-case",description: "QUOT-005"}] }, async ({ page }) => {
    const quoteCalculatorPage = new QuoteCalculatorPage(page);
    await test.step("Open Quote calculator", async () => {
      await quoteCalculatorPage.goto();
    });
    await test.step("Verify Quote calculator is displayed", async () => {
      await quoteCalculatorPage.expectLoaded();
    });
    await test.step("Submit Your Details on Quote calculator", async () => {
      await quoteCalculatorPage.submitYourDetails();
    });
    await test.step("Verify validation feedback", async () => {
      await quoteCalculatorPage.expectValidationShown();
    });
  });

  test("AT-0061 Quote calculator page loads with meaningful content", { tag: ['@regression', '@quote'], annotation: [{type: "source",description: "QUOT-001 · AI Discovery"},{type: "test-case",description: "QUOT-001"}] }, async ({ page }) => {
    const quoteCalculatorPage = new QuoteCalculatorPage(page);
    await test.step("Open Quote calculator", async () => {
      await quoteCalculatorPage.goto();
    });
    await test.step("Verify Quote calculator is displayed", async () => {
      await quoteCalculatorPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});

test.describe("Quote · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0066 Quote calculator page loads with meaningful content", { tag: ['@regression', '@quote'], annotation: [{type: "source",description: "QUOT-011 · AI Discovery"},{type: "test-case",description: "QUOT-011"}] }, async ({ page }) => {
    const quoteCalculatorPage2 = new QuoteCalculatorPage2(page);
    await test.step("Open Quote calculator", async () => {
      await quoteCalculatorPage2.goto();
    });
    await test.step("Verify Quote calculator is displayed", async () => {
      await quoteCalculatorPage2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
