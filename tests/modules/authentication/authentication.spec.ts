import { test, expect } from '../../../fixtures';
import { LoginPage } from '../../../pages/LoginPage';
import { LoginPage2 } from '../../../pages/LoginPage2';
import { ReportALifeInsuranceClaimPage } from '../../../pages/ReportALifeInsuranceClaimPage';
import { ResetYourPasswordPage } from '../../../pages/ResetYourPasswordPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Authentication", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0031 Sign in page loads with meaningful content", { tag: ['@regression', '@authentication', '@smoke', '@critical'], annotation: [{type: "source",description: "AUTH-011 · AI Discovery"},{type: "test-case",description: "AUTH-011"}] }, async ({ page }) => {
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

  test("AT-0033 Create your account page loads with meaningful content", { tag: ['@regression', '@authentication', '@smoke', '@critical'], annotation: [{type: "source",description: "AUTH-021 · AI Discovery"},{type: "test-case",description: "AUTH-021"}] }, async ({ page }) => {
    const loginPage2 = new LoginPage2(page);
    await test.step("Open Create your account", async () => {
      await loginPage2.goto();
    });
    await test.step("Verify Create your account is displayed", async () => {
      await loginPage2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0058 Report a life insurance claim page loads with meaningful content", { tag: ['@regression', '@authentication'], annotation: [{type: "source",description: "AUTH-003 · AI Discovery"},{type: "test-case",description: "AUTH-003"}] }, async ({ page }) => {
    const reportAlifeInsuranceClaimPage = new ReportALifeInsuranceClaimPage(page);
    await test.step("Open Report a life insurance claim", async () => {
      await reportAlifeInsuranceClaimPage.goto();
    });
    await test.step("Verify Report a life insurance claim is displayed", async () => {
      await reportAlifeInsuranceClaimPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0064 Reset your password page loads with meaningful content", { tag: ['@regression', '@authentication'], annotation: [{type: "source",description: "AUTH-028 · AI Discovery"},{type: "test-case",description: "AUTH-028"}] }, async ({ page }) => {
    const resetYourPasswordPage = new ResetYourPasswordPage(page);
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
