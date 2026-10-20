import { test, expect } from '../../../fixtures';
import { LoginPage } from '../../../pages/LoginPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Authentication", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0103 BUG-28667 regression: \"Super admin\" demo account cannot sign in", { tag: ['@regression', '@bug-28667', '@authentication'], annotation: [{type: "source",description: "BUG-28667 · High"},{type: "issue",description: "BUG-28667"},{type: "test-case",description: "AUTH-054"}] }, async ({ page }) => {
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
