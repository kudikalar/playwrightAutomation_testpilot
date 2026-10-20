import { test, expect } from '../../../fixtures';
import { VisionHealthCarePage2 } from '../../../pages/VisionHealthCarePage2';
import { ClaimHcSeed000001Page } from '../../../pages/ClaimHcSeed000001Page';
import { VhcH000001Page } from '../../../pages/VhcH000001Page';
import { VhcL000002Page2 } from '../../../pages/VhcL000002Page2';
import { VisionTermShieldPage } from '../../../pages/VisionTermShieldPage';
import { VisionFamilyFloaterPage } from '../../../pages/VisionFamilyFloaterPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Dashboard · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0036 Vision Health Care page loads with meaningful content", { tag: ['@regression', '@dashboard', '@smoke', '@critical'], annotation: [{type: "source",description: "DASH-001 · AI Discovery"},{type: "test-case",description: "DASH-001"}] }, async ({ page }) => {
    const visionHealthCarePage2 = new VisionHealthCarePage2(page);
    await test.step("Open Vision Health Care", async () => {
      await visionHealthCarePage2.goto();
    });
    await test.step("Verify Vision Health Care is displayed", async () => {
      await visionHealthCarePage2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0039 Claim HC-SEED-000001 page loads with meaningful content", { tag: ['@regression', '@dashboard', '@smoke', '@critical'], annotation: [{type: "source",description: "DASH-023 · AI Discovery"},{type: "test-case",description: "DASH-023"}] }, async ({ page }) => {
    const claimHcSeed000001page = new ClaimHcSeed000001Page(page);
    await test.step("Open Claim HC-SEED-000001", async () => {
      await claimHcSeed000001page.goto();
    });
    await test.step("Verify Claim HC-SEED-000001 is displayed", async () => {
      await claimHcSeed000001page.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0040 VHC-H-000001 page loads with meaningful content", { tag: ['@regression', '@dashboard', '@smoke', '@critical'], annotation: [{type: "source",description: "DASH-007 · AI Discovery"},{type: "test-case",description: "DASH-007"}] }, async ({ page }) => {
    const vhcH000001page = new VhcH000001Page(page);
    await test.step("Open VHC-H-000001", async () => {
      await vhcH000001page.goto();
    });
    await test.step("Verify VHC-H-000001 is displayed", async () => {
      await vhcH000001page.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0041 VHC-L-000002 page loads with meaningful content", { tag: ['@regression', '@dashboard', '@smoke', '@critical'], annotation: [{type: "source",description: "DASH-015 · AI Discovery"},{type: "test-case",description: "DASH-015"}] }, async ({ page }) => {
    const vhcL000002page2 = new VhcL000002Page2(page);
    await test.step("Open VHC-L-000002", async () => {
      await vhcL000002page2.goto();
    });
    await test.step("Verify VHC-L-000002 is displayed", async () => {
      await vhcL000002page2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0042 Vision Term Shield page loads with meaningful content", { tag: ['@regression', '@dashboard', '@smoke', '@critical'], annotation: [{type: "source",description: "DASH-033 · AI Discovery"},{type: "test-case",description: "DASH-033"}] }, async ({ page }) => {
    const visionTermShieldPage = new VisionTermShieldPage(page);
    await test.step("Open Vision Term Shield", async () => {
      await visionTermShieldPage.goto();
    });
    await test.step("Verify Vision Term Shield is displayed", async () => {
      await visionTermShieldPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0043 Vision Family Floater page loads with meaningful content", { tag: ['@regression', '@dashboard', '@smoke', '@critical'], annotation: [{type: "source",description: "DASH-039 · AI Discovery"},{type: "test-case",description: "DASH-039"}] }, async ({ page }) => {
    const visionFamilyFloaterPage = new VisionFamilyFloaterPage(page);
    await test.step("Open Vision Family Floater", async () => {
      await visionFamilyFloaterPage.goto();
    });
    await test.step("Verify Vision Family Floater is displayed", async () => {
      await visionFamilyFloaterPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
