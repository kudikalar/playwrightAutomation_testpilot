import { test, expect } from '../../fixtures';
import { ItemPage } from '../../pages/ItemPage';
import { LoginPage } from '../../pages/LoginPage';
import { Sidebar } from '../../components/Sidebar';
import { STORAGE, NO_AUTH } from '../../auth/storage';

test.describe("Authentication", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0003 Sign In", { tag: ['@regression', '@authentication', '@critical', '@p0', '@smoke'], annotation: [{type: "source",description: "J-009 · P0 Business Critical"}] }, async ({ page }) => {
    const itemPage = new ItemPage(page);
    const loginPage = new LoginPage(page);
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
    await test.step("Verify control is visible on Sign in", async () => {
      await expect(loginPage.signInButton).toBeVisible();
    });
  });
});
