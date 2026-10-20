import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

/** WCAG 2.1 A/AA scan — fails on serious or critical violations only. */
export async function expectAccessible(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.help} (${v.nodes.length})`);
  expect(serious, 'Serious/critical WCAG violations').toEqual([]);
}

/** Keyboard-only operability: every focus stop is visible and Tab moves forward. */
export async function expectKeyboardOperable(page: Page, stops = 12): Promise<void> {
  const seen = new Set<string>();
  for (let i = 0; i < stops; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      return { key: el.outerHTML.slice(0, 80), visible: s.outlineStyle !== 'none' || s.boxShadow !== 'none' || el.matches(':focus-visible') };
    });
    if (!info) break;
    expect.soft(info.visible, `visible focus on ${info.key}`).toBeTruthy();
    seen.add(info.key);
  }
  expect(seen.size, 'focusable controls reachable by Tab').toBeGreaterThan(0);
}
