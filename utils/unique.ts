/** Unique, collision-free test data (§44). Every value carries a run marker so cleanup can find it. */
const run = Date.now().toString(36).slice(-5);
let n = 0;
const next = (): number => ++n;
export const unique = {
  marker: `tp${run}`,
  id: (prefix = 'TP'): string => `${prefix}-${run}${next()}`.toUpperCase(),
  email: (domain = 'example-test.local'): string => `autotest+${run}${next()}@${domain}`,
  username: (): string => `autotest_${run}${next()}`,
  phone: (): string => `+1555${String(Date.now()).slice(-5)}${String(next()).padStart(2, '0')}`,
  text: (label = 'Value'): string => `${label} ${run}${next()}`.slice(0, 48),
  reference: (): string => `REF-${run}-${next()}`.toUpperCase(),
  date: (offsetDays = 0): string => new Date(Date.now() + offsetDays * 864e5).toISOString().slice(0, 10),
};
