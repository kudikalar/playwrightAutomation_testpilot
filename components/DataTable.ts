import { expect, type Page, type Locator } from '@playwright/test';

/**
 * DataTable — Data table: headers, rows, sorting and row lookup
 * Used by: Coverage needs planner, CareConnect Telehealth, Green Valley Medical Centre, Harbour Care Hospital, Hilltop Eye & ENT Clinic, Lotus Women & Child Hospital, Meadow Heart Institute, Pearl Diagnostics & Imaging, Riverbank General Hospital, Sunrise Multispeciality Hospital, Grievances, Notifications (+10)
 */
export class DataTable {
  readonly root: Locator;

  constructor(readonly page: Page) {
    this.root = page.locator('table, [role="grid"], [role="table"]').first();
  }

  rows(): Locator {
    return this.root.locator('tbody tr, [role="row"]');
  }

  async expectRows(min = 1): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect.poll(async () => this.rows().count()).toBeGreaterThanOrEqual(min);
  }

  async sortBy(column: string | RegExp): Promise<void> {
    await this.root.getByRole('columnheader', { name: column }).or(this.root.getByRole('link', { name: column })).first().click();
  }

  row(text: string): Locator {
    return this.rows().filter({ hasText: text }).first();
  }
}
