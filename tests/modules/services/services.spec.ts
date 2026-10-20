import { test, expect } from '../../../fixtures';
import { HealthServicesPage3 } from '../../../pages/HealthServicesPage3';
import { HealthServicesPage } from '../../../pages/HealthServicesPage';
import { HealthServicesPage2 } from '../../../pages/HealthServicesPage2';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';
import { unique } from '../../../utils/unique';

test.describe("Services · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0052 Service filters: submit with valid data", { tag: ['@regression', '@services'], annotation: [{type: "source",description: "SERV-020 · AI Discovery"},{type: "test-case",description: "SERV-020"}] }, async ({ page }) => {
    const healthServicesPage3 = new HealthServicesPage3(page);
    await test.step("Open Health services", async () => {
      await healthServicesPage3.goto();
    });
    await test.step("Verify Health services is displayed", async () => {
      await healthServicesPage3.expectLoaded();
    });
    await test.step("Fill Service Filters form", async () => {
      await healthServicesPage3.fillServiceFilters({ search: 'a' });
    });
    await test.step("Submit Service Filters on Health services", async () => {
      await healthServicesPage3.submitServiceFilters();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0053 Book: Online GP consultation: submission blocked when required fields are empty", { tag: ['@negative', '@regression', '@services'], annotation: [{type: "source",description: "SERV-021 · AI Discovery"},{type: "test-case",description: "SERV-021"}] }, async ({ page }) => {
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

  test("AT-0062 Health services page loads with meaningful content", { tag: ['@regression', '@services'], annotation: [{type: "source",description: "SERV-016 · AI Discovery"},{type: "test-case",description: "SERV-016"}] }, async ({ page }) => {
    const healthServicesPage3 = new HealthServicesPage3(page);
    await test.step("Open Health services", async () => {
      await healthServicesPage3.goto();
    });
    await test.step("Verify Health services is displayed", async () => {
      await healthServicesPage3.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0095 Health services page loads with meaningful content", { tag: ['@regression', '@services'], annotation: [{type: "source",description: "SERV-007 · AI Discovery"},{type: "test-case",description: "SERV-007"}] }, async ({ page }) => {
    const healthServicesPage2 = new HealthServicesPage2(page);
    await test.step("Open Health services", async () => {
      await healthServicesPage2.goto();
    });
    await test.step("Verify Health services is displayed", async () => {
      await healthServicesPage2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});

test.describe("Services", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0068 Health services page loads with meaningful content", { tag: ['@regression', '@services'], annotation: [{type: "source",description: "SERV-001 · AI Discovery"},{type: "test-case",description: "SERV-001"}] }, async ({ page }) => {
    const healthServicesPage = new HealthServicesPage(page);
    await test.step("Open Health services", async () => {
      await healthServicesPage.goto();
    });
    await test.step("Verify Health services is displayed", async () => {
      await healthServicesPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
