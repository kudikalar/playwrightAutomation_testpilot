import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { LoginPage } from '../../pages/LoginPage';
import { ResetYourPasswordPage } from '../../pages/ResetYourPasswordPage';
import { Sidebar } from '../../components/Sidebar';
import { expectHealthy } from '../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Authentication", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0016 Send Reset Link", { tag: ['@regression', '@authentication'], annotation: [{type: "source",description: "J-012 · P2 Standard"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const loginPage = new LoginPage(page);
    const resetYourPasswordPage = new ResetYourPasswordPage(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Sidebar: go to sign in", async () => {
      await new Sidebar(page).goToSignIn();
    });
    await test.step("Verify Sign in is displayed", async () => {
      await loginPage.expectLoaded();
    });
    await test.step("Open Reset your password", async () => {
      await resetYourPasswordPage.goto();
    });
    await test.step("Verify Reset your password is displayed", async () => {
      await resetYourPasswordPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
