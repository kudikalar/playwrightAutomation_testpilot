import fs from 'node:fs';
import path from 'node:path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
const ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const SECRET_PATTERN = /((?:token|password|passwd|secret|access[_-]?key|authorization|api[_-]?key)["']?\s*[:=]\s*["']?)([^\s"',}]+)/gi;
const LOG_FILE = path.resolve(__dirname, '../logs/automation.log');

/** Mask anything that looks like a credential before it reaches a console, file or report. */
export function redact(value: string): string {
  return value.replace(SECRET_PATTERN, (_m, key: string) => `${key}***`).replace(/(Basic|Bearer)\s+[A-Za-z0-9._~+/=-]+/g, '$1 ***');
}

function threshold(): number {
  const level = (process.env.LOG_LEVEL || 'info').toLowerCase() as LogLevel;
  return ORDER[level] ?? ORDER.info;
}

function write(level: LogLevel, scope: string, message: string, data?: unknown): void {
  if (ORDER[level] < threshold()) return;
  const entry = { ts: new Date().toISOString(), level, scope, message: redact(message), ...(data === undefined ? {} : { data: JSON.parse(redact(JSON.stringify(data))) as unknown }) };
  const line = `[${entry.ts.slice(11, 19)}] ${level.toUpperCase().padEnd(5)} ${scope.padEnd(10)} ${entry.message}`;
  (level === 'error' || level === 'warn' ? process.stderr : process.stdout).write(`${line}\n`);
  try {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, `${JSON.stringify(entry)}\n`);
  } catch {
    /* logging must never break a run */
  }
}

export interface Logger {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
}

/** Structured, redacting logger. Console for humans, JSON lines in logs/automation.log for machines. */
export function createLogger(scope: string): Logger {
  return {
    debug: (m, d) => write('debug', scope, m, d),
    info: (m, d) => write('info', scope, m, d),
    warn: (m, d) => write('warn', scope, m, d),
    error: (m, d) => write('error', scope, m, d),
  };
}
