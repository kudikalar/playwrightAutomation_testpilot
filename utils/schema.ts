import { expect } from '@playwright/test';

/** Inferred response schema. optional: missing from some observed responses · masked: redacted at capture, so its real type is unknown · a type such as "number|null" accepts any of its members. */
export type Schema = { type: string; fields?: Record<string, Schema>; items?: Schema; nullable?: boolean; optional?: boolean; masked?: boolean; format?: string; enum?: unknown[] };

const LOOSE = ['mixed', 'unknown'];

/**
 * Validate a JSON value against the schema TestPilot inferred from live traffic (§37). Extra fields are allowed,
 * optional fields may be missing, masked (redacted) values are not type-checked and union types ("string|null") accept
 * any member. A field only ever observed as null is not type-checked either — its real type was never seen.
 */
export function expectSchema(value: unknown, schema: Schema, at = '$'): void {
  const types = String(schema.type || 'unknown').split('|').map((t) => (t === 'integer' ? 'number' : t));
  if (schema.masked || types.some((t) => LOOSE.includes(t))) return;
  if (value === null || value === undefined) { expect(!!schema.nullable || types.includes('null'), `${at} must not be null`).toBeTruthy(); return; }
  const actual = Array.isArray(value) ? 'array' : typeof value;
  const expected = types.filter((t) => t !== 'null');
  if (expected.length) expect(expected, `${at} type`).toContain(actual);
  if (actual === 'object' && schema.fields) for (const [k, s] of Object.entries(schema.fields)) {
    const v = (value as Record<string, unknown>)[k];
    if (v !== undefined) expectSchema(v, s, `${at}.${k}`);
  }
  if (actual === 'array' && schema.items) for (const [i, v] of (value as unknown[]).slice(0, 5).entries()) expectSchema(v, schema.items, `${at}[${i}]`);
}
