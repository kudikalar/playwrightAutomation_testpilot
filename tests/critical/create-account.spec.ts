import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { LoginPage2 } from '../../pages/LoginPage2';
import { Sidebar } from '../../components/Sidebar';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Authentication", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0007 Create Account", { tag: ['@regression', '@authentication', '@p1'], annotation: [{type: "source",description: "J-010 · P1 Major"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const loginPage2 = new LoginPage2(page);
    await test.step("Open Health insurance, explained honestly.", async () => {
      await itemPage.goto();
    });
    await test.step("Verify Health insurance, explained honestly. is displayed", async () => {
      await itemPage.expectLoaded();
    });
    await test.step("Sidebar: go to create account", async () => {
      await new Sidebar(page).goToCreateAccount();
    });
    await test.step("Verify Create your account is displayed", async () => {
      await loginPage2.expectLoaded();
    });
    await test.step("Verify control is visible on Create your account", async () => {
      await expect(loginPage2.createAccountButton).toBeVisible();
    });
  });
});
