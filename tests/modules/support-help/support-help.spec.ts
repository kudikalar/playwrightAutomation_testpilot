import { test, expect } from '../../../fixtures';
import { SupportKbPaymentFailedPage } from '../../../pages/SupportKbPaymentFailedPage';
import { SupportKbDataRightsPage } from '../../../pages/SupportKbDataRightsPage';
import { SupportPage } from '../../../pages/SupportPage';
import { SupportTicketsPage } from '../../../pages/SupportTicketsPage';
import { VisionHealthCarePage } from '../../../pages/VisionHealthCarePage';
import { SupportKbCashlessBasicsPage } from '../../../pages/SupportKbCashlessBasicsPage';
import { LanguageAndTextSizePage } from '../../../pages/LanguageAndTextSizePage';
import { KnowledgeBasePage } from '../../../pages/KnowledgeBasePage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Support & Help", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0044 My payment failed or is pending — what now? page loads with meaningful content", { tag: ['@regression', '@support-help', '@smoke', '@critical'], annotation: [{type: "source",description: "SUPP-011 · AI Discovery"},{type: "test-case",description: "SUPP-011"}] }, async ({ page }) => {
    const supportKbPaymentFailedPage = new SupportKbPaymentFailedPage(page);
    await test.step("Open My payment failed or is pending — what now?", async () => {
      await supportKbPaymentFailedPage.goto();
    });
    await test.step("Verify My payment failed or is pending — what now? is displayed", async () => {
      await supportKbPaymentFailedPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0060 Your data rights: export and deletion page loads with meaningful content", { tag: ['@regression', '@support-help'], annotation: [{type: "source",description: "SUPP-021 · AI Discovery"},{type: "test-case",description: "SUPP-021"}] }, async ({ page }) => {
    const supportKbDataRightsPage = new SupportKbDataRightsPage(page);
    await test.step("Open Your data rights: export and deletion", async () => {
      await supportKbDataRightsPage.goto();
    });
    await test.step("Verify Your data rights: export and deletion is displayed", async () => {
      await supportKbDataRightsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0069 Support page loads with meaningful content", { tag: ['@regression', '@support-help'], annotation: [{type: "source",description: "SUPP-001 · AI Discovery"},{type: "test-case",description: "SUPP-001"}] }, async ({ page }) => {
    const supportPage = new SupportPage(page);
    await test.step("Open Support", async () => {
      await supportPage.goto();
    });
    await test.step("Verify Support is displayed", async () => {
      await supportPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0081 Vision Health Care page loads with meaningful content", { tag: ['@regression', '@support-help'], annotation: [{type: "source",description: "SUPP-006 · AI Discovery"},{type: "test-case",description: "SUPP-006"}] }, async ({ page }) => {
    const visionHealthCarePage = new VisionHealthCarePage(page);
    await test.step("Open Vision Health Care", async () => {
      await visionHealthCarePage.goto();
    });
    await test.step("Verify Vision Health Care is displayed", async () => {
      await visionHealthCarePage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0082 Cashless treatment at a network hospital page loads with meaningful content", { tag: ['@regression', '@support-help'], annotation: [{type: "source",description: "SUPP-016 · AI Discovery"},{type: "test-case",description: "SUPP-016"}] }, async ({ page }) => {
    const supportKbCashlessBasicsPage = new SupportKbCashlessBasicsPage(page);
    await test.step("Open Cashless treatment at a network hospital", async () => {
      await supportKbCashlessBasicsPage.goto();
    });
    await test.step("Verify Cashless treatment at a network hospital is displayed", async () => {
      await supportKbCashlessBasicsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0083 Language and text size page loads with meaningful content", { tag: ['@regression', '@support-help'], annotation: [{type: "source",description: "SUPP-026 · AI Discovery"},{type: "test-case",description: "SUPP-026"}] }, async ({ page }) => {
    const languageAndTextSizePage = new LanguageAndTextSizePage(page);
    await test.step("Open Language and text size", async () => {
      await languageAndTextSizePage.goto();
    });
    await test.step("Verify Language and text size is displayed", async () => {
      await languageAndTextSizePage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0092 Knowledge base page loads with meaningful content", { tag: ['@regression', '@support-help'], annotation: [{type: "source",description: "SUPP-031 · AI Discovery"},{type: "test-case",description: "SUPP-031"}] }, async ({ page }) => {
    const knowledgeBasePage = new KnowledgeBasePage(page);
    await test.step("Open Knowledge base", async () => {
      await knowledgeBasePage.goto();
    });
    await test.step("Verify Knowledge base is displayed", async () => {
      await knowledgeBasePage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});

test.describe("Support & Help · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0078 Support tickets page loads with meaningful content", { tag: ['@regression', '@support-help'], annotation: [{type: "source",description: "SUPP-036 · AI Discovery"},{type: "test-case",description: "SUPP-036"}] }, async ({ page }) => {
    const supportTicketsPage = new SupportTicketsPage(page);
    await test.step("Open Support tickets", async () => {
      await supportTicketsPage.goto();
    });
    await test.step("Verify Support tickets is displayed", async () => {
      await supportTicketsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
