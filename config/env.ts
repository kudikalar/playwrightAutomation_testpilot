import * as dotenv from 'dotenv';
import path from 'node:path';

/** Environment selection: TEST_ENV=dev|qa|uat|stage loads .env.<name>, then .env for local overrides. Never commit real secrets. */
const name = process.env.TEST_ENV || "qa";
dotenv.config({ path: path.resolve(__dirname, `../.env.${name}`) });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env = {
  TEST_ENV: name,
  BASE_URL: process.env.BASE_URL || "https://stage-vhc-healthcare.vercel.app",
  API_URL: process.env.API_URL || process.env.BASE_URL || "https://stage-vhc-healthcare.vercel.app",
};

/** Credentials are read from the environment only — no defaults, no hardcoded secrets. */
export function credentials(role: string): { email: string; password: string } {
  const key = role.replace(/[A-Z]/g, (m) => `_${m}`).toUpperCase();
  return { email: process.env[`${key}_EMAIL`] || '', password: process.env[`${key}_PASSWORD`] || '' };
}
