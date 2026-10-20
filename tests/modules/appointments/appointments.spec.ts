import { test, expect } from '../../../fixtures';
import { MyAppointmentsPage } from '../../../pages/MyAppointmentsPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Appointments · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0077 My appointments page loads with meaningful content", { tag: ['@regression', '@appointments'], annotation: [{type: "source",description: "APPO-001 · AI Discovery"},{type: "test-case",description: "APPO-001"}] }, async ({ page }) => {
    const myAppointmentsPage = new MyAppointmentsPage(page);
    await test.step("Open My appointments", async () => {
      await myAppointmentsPage.goto();
    });
    await test.step("Verify My appointments is displayed", async () => {
      await myAppointmentsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
