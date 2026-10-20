import { test, expect } from '../../../fixtures';
import { HealthServicesPage3 } from '../../../pages/HealthServicesPage3';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Services · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0105 BUG-28674 regression: Book: Online GP consultation submits without mandatory Date and Self-pay — ₹399.00 Self-pay — you pay the provider's listed price; not billed to insurance.", { tag: ['@regression', '@bug-28674', '@services'], annotation: [{type: "source",description: "BUG-28674 · High"},{type: "issue",description: "BUG-28674"},{type: "test-case",description: "SERV-021"}] }, async ({ page }) => {
    const healthServicesPage3 = new HealthServicesPage3(page);
    await test.step("Open Health services", async () => {
      await healthServicesPage3.goto();
    });
    await test.step("Verify Health services is displayed", async () => {
      await healthServicesPage3.expectLoaded();
    });
    await test.step("Submit Book Online Gp Consultation on Health services", async () => {
      await healthServicesPage3.submitBookOnlineGpConsultation();
    });
    await test.step("Verify validation feedback", async () => {
      await healthServicesPage3.expectValidationShown();
    });
  });
});
