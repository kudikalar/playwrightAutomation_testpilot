import { test, expect } from '../../../fixtures';
import { FindHospitalsProvidersPage } from '../../../pages/FindHospitalsProvidersPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Hospitals", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0067 Find hospitals & providers page loads with meaningful content", { tag: ['@regression', '@hospitals'], annotation: [{type: "source",description: "HOSP-001 · AI Discovery"},{type: "test-case",description: "HOSP-001"}] }, async ({ page }) => {
    const findHospitalsProvidersPage = new FindHospitalsProvidersPage(page);
    await test.step("Open Find hospitals & providers", async () => {
      await findHospitalsProvidersPage.goto();
    });
    await test.step("Verify Find hospitals & providers is displayed", async () => {
      await findHospitalsProvidersPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
