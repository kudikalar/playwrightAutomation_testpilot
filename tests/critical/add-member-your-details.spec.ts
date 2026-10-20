import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { QuoteCalculatorPage } from '../../pages/QuoteCalculatorPage';
import { Sidebar } from '../../components/Sidebar';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Quote", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0006 + Add Member · Your details", { tag: ['@regression', '@quote', '@p1'], annotation: [{type: "source",description: "J-005 · P1 Major"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const quoteCalculatorPage = new QuoteCalculatorPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Sidebar: go to get a quote", async () => {
      await new Sidebar(page).goToGetAQuote();
    });
    await test.step("Verify Quote calculator is displayed", async () => {
      await quoteCalculatorPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
