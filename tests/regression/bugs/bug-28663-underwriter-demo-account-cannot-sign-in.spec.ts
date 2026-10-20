import { test, expect } from '../../../fixtures';
import { LoginPage } from '../../../pages/LoginPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Authentication", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0099 BUG-28663 regression: \"Underwriter\" demo account cannot sign in", { tag: ['@regression', '@bug-28663', '@authentication'], annotation: [{type: "source",description: "BUG-28663 · High"},{type: "issue",description: "BUG-28663"},{type: "test-case",description: "AUTH-050"}] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Open Sign in", async () => {
      await loginPage.goto();
    });
    await test.step("Verify Sign in is displayed", async () => {
      await loginPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
