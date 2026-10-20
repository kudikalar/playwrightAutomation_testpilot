import { test, expect } from '../../../fixtures';
import { GrievancesPage2 } from '../../../pages/GrievancesPage2';
import { GrievancesGrvDemoAshaPage } from '../../../pages/GrievancesGrvDemoAshaPage';
import { VisionAiPage } from '../../../pages/VisionAiPage';
import { GrievancesPage } from '../../../pages/GrievancesPage';
import { CareConnectTelehealthPage } from '../../../pages/CareConnectTelehealthPage';
import { GreenValleyMedicalCentrePage } from '../../../pages/GreenValleyMedicalCentrePage';
import { HarbourCareHospitalPage } from '../../../pages/HarbourCareHospitalPage';
import { HilltopEyeEntClinicPage } from '../../../pages/HilltopEyeEntClinicPage';
import { LotusWomenChildHospitalPage } from '../../../pages/LotusWomenChildHospitalPage';
import { MeadowHeartInstitutePage } from '../../../pages/MeadowHeartInstitutePage';
import { PearlDiagnosticsImagingPage } from '../../../pages/PearlDiagnosticsImagingPage';
import { SunriseMultispecialityHospitalPage } from '../../../pages/SunriseMultispecialityHospitalPage';
import { CoastalCityHospitalPage } from '../../../pages/CoastalCityHospitalPage';
import { RiverbankGeneralHospitalPage } from '../../../pages/RiverbankGeneralHospitalPage';
import { expectHealthy } from '../../../utils/diagnostics';
import { STORAGE, NO_AUTH } from '../../../auth/storage';

test.describe("Company · as customerAsha", () => {
  test.use({ storageState: STORAGE.customerAsha });

  test("AT-0049 Grievances page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-069 · AI Discovery"},{type: "test-case",description: "COMP-069"}] }, async ({ page }) => {
    const grievancesPage2 = new GrievancesPage2(page);
    await test.step("Open Grievances", async () => {
      await grievancesPage2.goto();
    });
    await test.step("Verify Grievances is displayed", async () => {
      await grievancesPage2.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0050 Raise a grievance with VHC: submission blocked when required fields are empty", { tag: ['@negative', '@regression', '@company'], annotation: [{type: "source",description: "COMP-073 · AI Discovery"},{type: "test-case",description: "COMP-073"}] }, async ({ page }) => {
    const grievancesPage2 = new GrievancesPage2(page);
    await test.step("Open Grievances", async () => {
      await grievancesPage2.goto();
    });
    await test.step("Verify Grievances is displayed", async () => {
      await grievancesPage2.expectLoaded();
    });
    await test.step("Submit Raise Agrievance With Vhc on Grievances", async () => {
      await grievancesPage2.submitRaiseAgrievanceWithVhc();
    });
    await test.step("Verify validation feedback", async () => {
      await grievancesPage2.expectValidationShown();
    });
  });

  test("AT-0063 No update on my reimbursement claim page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-077 · AI Discovery"},{type: "test-case",description: "COMP-077"}] }, async ({ page }) => {
    const grievancesGrvDemoAshaPage = new GrievancesGrvDemoAshaPage(page);
    await test.step("Open No update on my reimbursement claim", async () => {
      await grievancesGrvDemoAshaPage.goto();
    });
    await test.step("Verify No update on my reimbursement claim is displayed", async () => {
      await grievancesGrvDemoAshaPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0070 Vision AI page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-058 · AI Discovery"},{type: "test-case",description: "COMP-058"}] }, async ({ page }) => {
    const visionAiPage = new VisionAiPage(page);
    await test.step("Open Vision AI", async () => {
      await visionAiPage.goto();
    });
    await test.step("Verify Vision AI is displayed", async () => {
      await visionAiPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0071 Grievances page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-051 · AI Discovery"},{type: "test-case",description: "COMP-051"}] }, async ({ page }) => {
    const grievancesPage = new GrievancesPage(page);
    await test.step("Open Grievances", async () => {
      await grievancesPage.goto();
    });
    await test.step("Verify Grievances is displayed", async () => {
      await grievancesPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});

test.describe("Company", () => {
  test.use({ storageState: NO_AUTH });

  test("AT-0080 CareConnect Telehealth page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-001 · AI Discovery"},{type: "test-case",description: "COMP-001"}] }, async ({ page }) => {
    const careConnectTelehealthPage = new CareConnectTelehealthPage(page);
    await test.step("Open CareConnect Telehealth", async () => {
      await careConnectTelehealthPage.goto();
    });
    await test.step("Verify CareConnect Telehealth is displayed", async () => {
      await careConnectTelehealthPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0084 Green Valley Medical Centre page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-011 · AI Discovery"},{type: "test-case",description: "COMP-011"}] }, async ({ page }) => {
    const greenValleyMedicalCentrePage = new GreenValleyMedicalCentrePage(page);
    await test.step("Open Green Valley Medical Centre", async () => {
      await greenValleyMedicalCentrePage.goto();
    });
    await test.step("Verify Green Valley Medical Centre is displayed", async () => {
      await greenValleyMedicalCentrePage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0085 Harbour Care Hospital page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-016 · AI Discovery"},{type: "test-case",description: "COMP-016"}] }, async ({ page }) => {
    const harbourCareHospitalPage = new HarbourCareHospitalPage(page);
    await test.step("Open Harbour Care Hospital", async () => {
      await harbourCareHospitalPage.goto();
    });
    await test.step("Verify Harbour Care Hospital is displayed", async () => {
      await harbourCareHospitalPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0086 Hilltop Eye & ENT Clinic page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-021 · AI Discovery"},{type: "test-case",description: "COMP-021"}] }, async ({ page }) => {
    const hilltopEyeEntClinicPage = new HilltopEyeEntClinicPage(page);
    await test.step("Open Hilltop Eye & ENT Clinic", async () => {
      await hilltopEyeEntClinicPage.goto();
    });
    await test.step("Verify Hilltop Eye & ENT Clinic is displayed", async () => {
      await hilltopEyeEntClinicPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0087 Lotus Women & Child Hospital page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-026 · AI Discovery"},{type: "test-case",description: "COMP-026"}] }, async ({ page }) => {
    const lotusWomenChildHospitalPage = new LotusWomenChildHospitalPage(page);
    await test.step("Open Lotus Women & Child Hospital", async () => {
      await lotusWomenChildHospitalPage.goto();
    });
    await test.step("Verify Lotus Women & Child Hospital is displayed", async () => {
      await lotusWomenChildHospitalPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0088 Meadow Heart Institute page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-031 · AI Discovery"},{type: "test-case",description: "COMP-031"}] }, async ({ page }) => {
    const meadowHeartInstitutePage = new MeadowHeartInstitutePage(page);
    await test.step("Open Meadow Heart Institute", async () => {
      await meadowHeartInstitutePage.goto();
    });
    await test.step("Verify Meadow Heart Institute is displayed", async () => {
      await meadowHeartInstitutePage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0089 Pearl Diagnostics & Imaging page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-036 · AI Discovery"},{type: "test-case",description: "COMP-036"}] }, async ({ page }) => {
    const pearlDiagnosticsImagingPage = new PearlDiagnosticsImagingPage(page);
    await test.step("Open Pearl Diagnostics & Imaging", async () => {
      await pearlDiagnosticsImagingPage.goto();
    });
    await test.step("Verify Pearl Diagnostics & Imaging is displayed", async () => {
      await pearlDiagnosticsImagingPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0090 Sunrise Multispeciality Hospital page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-046 · AI Discovery"},{type: "test-case",description: "COMP-046"}] }, async ({ page }) => {
    const sunriseMultispecialityHospitalPage = new SunriseMultispecialityHospitalPage(page);
    await test.step("Open Sunrise Multispeciality Hospital", async () => {
      await sunriseMultispecialityHospitalPage.goto();
    });
    await test.step("Verify Sunrise Multispeciality Hospital is displayed", async () => {
      await sunriseMultispecialityHospitalPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0093 Coastal City Hospital page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-006 · AI Discovery"},{type: "test-case",description: "COMP-006"}] }, async ({ page }) => {
    const coastalCityHospitalPage = new CoastalCityHospitalPage(page);
    await test.step("Open Coastal City Hospital", async () => {
      await coastalCityHospitalPage.goto();
    });
    await test.step("Verify Coastal City Hospital is displayed", async () => {
      await coastalCityHospitalPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });

  test("AT-0094 Riverbank General Hospital page loads with meaningful content", { tag: ['@regression', '@company'], annotation: [{type: "source",description: "COMP-041 · AI Discovery"},{type: "test-case",description: "COMP-041"}] }, async ({ page }) => {
    const riverbankGeneralHospitalPage = new RiverbankGeneralHospitalPage(page);
    await test.step("Open Riverbank General Hospital", async () => {
      await riverbankGeneralHospitalPage.goto();
    });
    await test.step("Verify Riverbank General Hospital is displayed", async () => {
      await riverbankGeneralHospitalPage.expectLoaded();
    });
    await test.step("Verify no console errors or failed APIs", async () => {
      await expectHealthy(page);
    });
  });
});
