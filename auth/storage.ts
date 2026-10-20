/** One storage state per role — tests reuse authenticated sessions instead of logging in every time. */
export const STORAGE = {
  customerAsha: ".auth/customer-asha.json",
} as const;
export type Role = keyof typeof STORAGE;
export const NO_AUTH = { cookies: [], origins: [] };
