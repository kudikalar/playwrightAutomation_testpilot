import { test, expect } from '../../../fixtures';
import { NotificationsPage } from '../../../pages/NotificationsPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Notifications & Messages · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0059 Notifications page loads with meaningful content", { tag: ['@regression', '@notifications-messages'], annotation: [{type: "source",description: "NOTI-001 · AI Discovery"},{type: "test-case",description: "NOTI-001"}] }, async ({ page }) => {
    const notificationsPage = new NotificationsPage(page);
    await test.step("Open Notifications", async () => {
      await notificationsPage.goto();
    });
    await test.step("Verify Notifications is displayed", async () => {
      await notificationsPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
