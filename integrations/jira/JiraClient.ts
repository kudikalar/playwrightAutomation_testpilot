import fs from 'node:fs';
import path from 'node:path';
import { HttpClient, basicAuth } from '../core/http';

/** Atlassian Document Format helpers — Jira Cloud v3 requires ADF for descriptions and comments. */
export type AdfNode = { type: string; text?: string; attrs?: Record<string, unknown>; marks?: { type: string }[]; content?: AdfNode[] };
export const adf = {
  doc: (...content: AdfNode[]): AdfNode => ({ type: 'doc', attrs: { version: 1 } as Record<string, unknown>, content }),
  heading: (text: string, level = 3): AdfNode => ({ type: 'heading', attrs: { level }, content: [{ type: 'text', text }] }),
  paragraph: (text: string): AdfNode => ({ type: 'paragraph', content: text ? [{ type: 'text', text }] : [] }),
  code: (text: string, language = 'text'): AdfNode => ({ type: 'codeBlock', attrs: { language }, content: [{ type: 'text', text: text || ' ' }] }),
  bullets: (items: string[]): AdfNode => ({ type: 'bulletList', content: items.map((i) => ({ type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: i }] }] })) }),
  ordered: (items: string[]): AdfNode => ({ type: 'orderedList', content: items.map((i) => ({ type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: i }] }] })) }),
};

export interface JiraIssueInput {
  summary: string;
  description: AdfNode;
  issueType?: string;
  priority?: string;
  labels?: string[];
  components?: string[];
  environment?: string;
}
export interface JiraIssueRef { id: string; key: string; self?: string }
export interface JiraSearchResult { total: number; issues: { id: string; key: string; fields: { summary: string; status: { name: string }; labels: string[] } }[] }

export interface JiraClientOptions { baseUrl: string; email: string; apiToken: string; projectKey: string }

/** Jira Cloud REST v3 client: issues, JQL search, comments, attachments, transitions. */
export class JiraClient {
  private readonly http: HttpClient;

  constructor(private readonly options: JiraClientOptions) {
    this.http = new HttpClient({ name: 'jira', baseUrl: `${options.baseUrl}/rest/api/3`, headers: { authorization: basicAuth(options.email, options.apiToken) } });
  }

  get projectKey(): string {
    return this.options.projectKey;
  }

  browseUrl(key: string): string {
    return `${this.options.baseUrl}/browse/${key}`;
  }

  myself(): Promise<{ accountId: string; displayName: string }> {
    return this.http.get('/myself');
  }

  createIssue(input: JiraIssueInput): Promise<JiraIssueRef> {
    return this.http.post<JiraIssueRef>('/issue', {
      fields: {
        project: { key: this.options.projectKey },
        summary: input.summary.slice(0, 250),
        issuetype: { name: input.issueType || 'Bug' },
        description: input.description,
        labels: (input.labels || []).map((l) => l.replace(/\s+/g, '-')),
        ...(input.priority ? { priority: { name: input.priority } } : {}),
        ...(input.components?.length ? { components: input.components.map((name) => ({ name })) } : {}),
      },
    });
  }

  getIssue(key: string): Promise<{ key: string; fields: { summary: string; status: { name: string } } }> {
    return this.http.get(`/issue/${encodeURIComponent(key)}`);
  }

  /** Uses the enhanced JQL search endpoint (the legacy /search is being retired by Atlassian). */
  search(jql: string, maxResults = 20): Promise<JiraSearchResult> {
    return this.http.get<JiraSearchResult>('/search/jql', { query: { jql, maxResults, fields: 'summary,status,labels' } });
  }

  addComment(key: string, body: AdfNode): Promise<{ id: string }> {
    return this.http.post(`/issue/${encodeURIComponent(key)}/comment`, { body });
  }

  async attachFiles(key: string, files: string[]): Promise<number> {
    const existing = files.filter((f) => fs.existsSync(f) && fs.statSync(f).size < 10 * 1024 * 1024);
    if (!existing.length) return 0;
    const form = new FormData();
    for (const f of existing) form.append('file', new Blob([fs.readFileSync(f)]), path.basename(f));
    await this.http.request('POST', `/issue/${encodeURIComponent(key)}/attachments`, { form, headers: { 'X-Atlassian-Token': 'no-check' } });
    return existing.length;
  }

  async transition(key: string, toStatus: string): Promise<boolean> {
    const { transitions } = await this.http.get<{ transitions: { id: string; name: string }[] }>(`/issue/${encodeURIComponent(key)}/transitions`);
    const t = transitions.find((x) => x.name.toLowerCase() === toStatus.toLowerCase());
    if (!t) return false;
    await this.http.request('POST', `/issue/${encodeURIComponent(key)}/transitions`, { body: { transition: { id: t.id } }, expect: [204] });
    return true;
  }
}
