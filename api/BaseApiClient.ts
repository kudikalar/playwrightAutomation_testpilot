import type { APIRequestContext } from '@playwright/test';

/** Thin, typed wrappers over Playwright's request context. Pass page.request to reuse the browser session's auth. */
export class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) { }
}
