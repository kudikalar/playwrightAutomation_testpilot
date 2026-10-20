import { test, expect } from '../../../fixtures';
import { NewHealthClaimPage } from '../../../pages/NewHealthClaimPage';
import { ClaimPayoutEstimatorPage } from '../../../pages/ClaimPayoutEstimatorPage';
import { HealthClaimsPage } from '../../../pages/HealthClaimsPage';
import { IntimateAClaimPage } from '../../../pages/IntimateAClaimPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Claims · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0035 Payout bank details: submission blocked when required fields are empty", { tag: ['@negative', '@regression', '@claims', '@critical'], annotation: [{type: "source",description: "CLAI-025 · AI Discovery"},{type: "test-case",description: "CLAI-025"}] }, async ({ page }) => {
    const newHealthClaimPage = new NewHealthClaimPage(page);
    await test.step("Open New health claim", async () => {
      await newHealthClaimPage.goto();
    });
    await test.step("Verify New health claim is displayed", async () => {
      await newHealthClaimPage.expectLoaded();
    });
    await test.step("Submit Payout Bank Details on New health claim", async () => {
      await newHealthClaimPage.submitPayoutBankDetails();
    });
    await test.step("Verify validation feedback", async () => {
      await newHealthClaimPage.expectValidationShown();
    });
  });

  test("AT-0038 Claim payout estimator page loads with meaningful content", { tag: ['@regression', '@claims', '@smoke', '@critical'], annotation: [{type: "source",description: "CLAI-007 · AI Discovery"},{type: "test-case",description: "CLAI-007"}] }, async ({ page }) => {
    const claimPayoutEstimatorPage = new ClaimPayoutEstimatorPage(page);
    await test.step("Open Claim payout estimator", async () => {
      await claimPayoutEstimatorPage.goto();
    });
    await test.step("Verify Claim payout estimator is displayed", async () => {
      await claimPayoutEstimatorPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0051 New health claim page loads with meaningful content", { tag: ['@regression', '@claims'], annotation: [{type: "source",description: "CLAI-021 · AI Discovery"},{type: "test-case",description: "CLAI-021"}] }, async ({ page }) => {
    const newHealthClaimPage = new NewHealthClaimPage(page);
    await test.step("Open New health claim", async () => {
      await newHealthClaimPage.goto();
    });
    await test.step("Verify New health claim is displayed", async () => {
      await newHealthClaimPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0074 Health claims page loads with meaningful content", { tag: ['@regression', '@claims'], annotation: [{type: "source",description: "CLAI-001 · AI Discovery"},{type: "test-case",description: "CLAI-001"}] }, async ({ page }) => {
    const healthClaimsPage = new HealthClaimsPage(page);
    await test.step("Open Health claims", async () => {
      await healthClaimsPage.goto();
    });
    await test.step("Verify Health claims is displayed", async () => {
      await healthClaimsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0079 Intimate a claim page loads with meaningful content", { tag: ['@regression', '@claims'], annotation: [{type: "source",description: "CLAI-013 · AI Discovery"},{type: "test-case",description: "CLAI-013"}] }, async ({ page }) => {
    const intimateAclaimPage = new IntimateAClaimPage(page);
    await test.step("Open Intimate a claim", async () => {
      await intimateAclaimPage.goto();
    });
    await test.step("Verify Intimate a claim is displayed", async () => {
      await intimateAclaimPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
