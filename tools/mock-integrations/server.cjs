#!/usr/bin/env node
'use strict';
/**
 * Mock integrations server: a zero-dependency, in-memory dummy API that behaves like the real services
 * closely enough for the framework's clients to run end to end without any accounts:
 *   Jira Cloud REST v3 · Zephyr Scale Cloud API v2 · GitHub REST (comments + statuses) · Slack / Teams webhooks
 *
 *   node tools/mock-integrations/server.cjs            # http://localhost:4599
 *   GET  /__mock/state   inspect everything the framework sent       POST /__mock/reset   clear state
 *
 * State is mirrored to reports/integrations/mock-db.json so CI can archive what would have been published.
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const now = () => new Date().toISOString();
const fresh = () => ({
  startedAt: now(),
  jira: { seq: 100, issues: [] },
  zephyr: { seq: { cycle: 0, execution: 0, testCase: 0 }, cycles: [], executions: [], testCases: [] },
  github: { seq: 0, comments: [], statuses: [] },
  notifications: [],
  requests: 0,
});

function createMockServer(options = {}) {
  const port = Number(options.port ?? process.env.MOCK_INTEGRATIONS_PORT ?? 4599);
  const dbFile = options.dbFile === undefined ? path.resolve(process.cwd(), 'reports/integrations/mock-db.json') : options.dbFile;
  const projectKeys = new Set(String(process.env.JIRA_PROJECT_KEY || process.env.ZEPHYR_PROJECT_KEY || '').split(',').filter(Boolean));
  let state = fresh();

  const persist = () => {
    if (!dbFile) return;
    try { fs.mkdirSync(path.dirname(dbFile), { recursive: true }); fs.writeFileSync(dbFile, JSON.stringify(state, null, 2)); } catch { /* best effort */ }
  };
  const send = (res, status, body, type = 'application/json') => {
    res.writeHead(status, { 'content-type': type, 'x-mock-integrations': '1' });
    res.end(body === undefined ? '' : type === 'application/json' ? JSON.stringify(body) : String(body));
  };
  const jiraError = (res, status, messages, errors = {}) => send(res, status, { errorMessages: [].concat(messages), errors });
  const authorized = (req) => /^(Basic|Bearer)\s+\S+/.test(req.headers.authorization || '');
  const readBody = (req) => new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
  });
  const json = (buf) => { try { return buf.length ? JSON.parse(buf.toString('utf8')) : {}; } catch { return null; } };
  const issueByKey = (key) => state.jira.issues.find((i) => i.key === key || i.id === key);
  const adfText = (node) => (!node ? '' : typeof node === 'string' ? node : node.text || (node.content || []).map(adfText).join(node.type === 'paragraph' ? '\n' : ''));

  /** Tiny JQL subset: project = X, labels = "y", statusCategory != Done, summary ~ "z". */
  const jql = (q = '') => state.jira.issues.filter((i) => {
    const project = /project\s*=\s*"?([A-Z0-9_]+)"?/i.exec(q);
    if (project && i.fields.project.key !== project[1]) return false;
    for (const m of q.matchAll(/labels\s*=\s*"?([\w.:-]+)"?/gi)) if (!i.fields.labels.includes(m[1])) return false;
    if (/statusCategory\s*!=\s*"?Done"?/i.test(q) && i.fields.status.statusCategory.key === 'done') return false;
    const summary = /summary\s*~\s*"([^"]+)"/i.exec(q);
    if (summary && !i.fields.summary.toLowerCase().includes(summary[1].toLowerCase())) return false;
    return true;
  });
  const STATUS = { 11: { name: 'To Do', cat: 'new' }, 21: { name: 'In Progress', cat: 'indeterminate' }, 31: { name: 'Done', cat: 'done' } };
  const ZEPHYR_STATUSES = ['Pass', 'Fail', 'Blocked', 'Not Executed', 'In Progress'];

  const routes = [
    // ---------------------------------------------------------------- admin
    ['GET', /^\/$|^\/__mock\/health$/, (req, res) => send(res, 200, { ok: true, service: 'mock-integrations', since: state.startedAt, jiraIssues: state.jira.issues.length, zephyrExecutions: state.zephyr.executions.length, notifications: state.notifications.length })],
    ['GET', /^\/__mock\/state$/, (req, res) => send(res, 200, state)],
    ['POST', /^\/__mock\/reset$/, (req, res) => { state = fresh(); persist(); send(res, 204); }],

    // ---------------------------------------------------------------- Jira Cloud REST v3
    ['GET', /^\/rest\/api\/3\/myself$/, (req, res) => send(res, 200, { accountId: 'mock-account', emailAddress: 'automation@example-test.local', displayName: 'Automation Bot', active: true })],
    ['GET', /^\/rest\/api\/3\/project\/([A-Z0-9_]+)$/, (req, res, [, key]) => send(res, 200, { id: '10000', key, name: `${key} (mock)`, issueTypes: [{ id: '1', name: 'Bug' }, { id: '2', name: 'Task' }, { id: '3', name: 'Story' }] })],
    ['POST', /^\/rest\/api\/3\/issue$/, (req, res, m, body) => {
      const b = json(body);
      if (!b || !b.fields) return jiraError(res, 400, 'Request body must contain "fields".');
      const f = b.fields;
      const errors = {};
      if (!f.project || !f.project.key) errors.project = 'project is required';
      if (!f.summary || !String(f.summary).trim()) errors.summary = 'You must specify a summary of the issue.';
      if (f.summary && String(f.summary).length > 255) errors.summary = 'Summary must be less than 255 characters.';
      if (!f.issuetype || !(f.issuetype.name || f.issuetype.id)) errors.issuetype = 'issue type is required';
      if (projectKeys.size && f.project && !projectKeys.has(f.project.key)) errors.project = `project ${f.project.key} does not exist`;
      if (Object.keys(errors).length) return jiraError(res, 400, [], errors);
      const id = String(++state.jira.seq);
      const key = `${f.project.key}-${id}`;
      const issue = {
        id, key, self: `/rest/api/3/issue/${id}`, createdAt: now(),
        fields: { project: { key: f.project.key }, summary: f.summary, issuetype: { name: f.issuetype.name || 'Bug' }, priority: f.priority || { name: 'Medium' }, labels: f.labels || [], description: f.description || null, descriptionText: adfText(f.description), status: { name: 'To Do', statusCategory: { key: 'new' } }, components: f.components || [], environment: f.environment || null },
        comments: [], attachments: [], transitions: [],
      };
      state.jira.issues.push(issue);
      persist();
      send(res, 201, { id, key, self: issue.self });
    }],
    ['GET', /^\/rest\/api\/3\/search(?:\/jql)?$/, (req, res, m, body, url) => {
      const found = jql(url.searchParams.get('jql') || '');
      const max = Number(url.searchParams.get('maxResults') || 50);
      send(res, 200, { startAt: 0, maxResults: max, total: found.length, issues: found.slice(0, max).map((i) => ({ id: i.id, key: i.key, fields: { summary: i.fields.summary, status: i.fields.status, labels: i.fields.labels, priority: i.fields.priority } })) });
    }],
    ['POST', /^\/rest\/api\/3\/search(?:\/jql)?$/, (req, res, m, body) => {
      const b = json(body) || {};
      const found = jql(b.jql || '');
      send(res, 200, { startAt: 0, maxResults: b.maxResults || 50, total: found.length, issues: found.slice(0, b.maxResults || 50).map((i) => ({ id: i.id, key: i.key, fields: { summary: i.fields.summary, status: i.fields.status, labels: i.fields.labels } })) });
    }],
    ['GET', /^\/rest\/api\/3\/issue\/([\w-]+)$/, (req, res, [, key]) => { const i = issueByKey(key); return i ? send(res, 200, { id: i.id, key: i.key, fields: { ...i.fields, comment: { comments: i.comments }, attachment: i.attachments } }) : jiraError(res, 404, 'Issue does not exist or you do not have permission to see it.'); }],
    ['POST', /^\/rest\/api\/3\/issue\/([\w-]+)\/comment$/, (req, res, [, key], body) => {
      const i = issueByKey(key);
      if (!i) return jiraError(res, 404, 'Issue does not exist or you do not have permission to see it.');
      const b = json(body);
      if (!b || !b.body) return jiraError(res, 400, 'Comment body can not be empty!');
      const c = { id: String(i.comments.length + 1), body: b.body, text: adfText(b.body), created: now() };
      i.comments.push(c);
      persist();
      send(res, 201, c);
    }],
    ['POST', /^\/rest\/api\/3\/issue\/([\w-]+)\/attachments$/, (req, res, [, key], body) => {
      const i = issueByKey(key);
      if (!i) return jiraError(res, 404, 'Issue does not exist or you do not have permission to see it.');
      if (String(req.headers['x-atlassian-token'] || '').toLowerCase() !== 'no-check') return jiraError(res, 403, 'XSRF check failed — send X-Atlassian-Token: no-check');
      const names = [...body.toString('latin1').matchAll(/filename="([^"]+)"/g)].map((x) => x[1]);
      const added = (names.length ? names : ['attachment.bin']).map((filename) => ({ id: String(i.attachments.length + 1), filename, size: body.length, created: now() }));
      i.attachments.push(...added);
      persist();
      send(res, 200, added);
    }],
    ['GET', /^\/rest\/api\/3\/issue\/([\w-]+)\/transitions$/, (req, res) => send(res, 200, { transitions: Object.entries(STATUS).map(([id, s]) => ({ id, name: s.name, to: { name: s.name, statusCategory: { key: s.cat } } })) })],
    ['POST', /^\/rest\/api\/3\/issue\/([\w-]+)\/transitions$/, (req, res, [, key], body) => {
      const i = issueByKey(key);
      const b = json(body) || {};
      const t = STATUS[b.transition && b.transition.id];
      if (!i) return jiraError(res, 404, 'Issue does not exist or you do not have permission to see it.');
      if (!t) return jiraError(res, 400, 'Transition id is not valid for this issue.');
      i.fields.status = { name: t.name, statusCategory: { key: t.cat } };
      i.transitions.push({ to: t.name, at: now() });
      persist();
      send(res, 204);
    }],

    // ---------------------------------------------------------------- Zephyr Scale Cloud API v2
    ['GET', /^\/v2\/healthcheck$/, (req, res) => send(res, 200, { status: 'UP' })],
    ['GET', /^\/v2\/testcases$/, (req, res, m, body, url) => { const pk = url.searchParams.get('projectKey'); const v = state.zephyr.testCases.filter((t) => !pk || t.projectKey === pk); send(res, 200, { total: v.length, isLast: true, values: v }); }],
    ['POST', /^\/v2\/testcases$/, (req, res, m, body) => {
      const b = json(body) || {};
      if (!b.projectKey || !b.name) return send(res, 400, { errorCode: 400, message: 'projectKey and name are required' });
      const n = ++state.zephyr.seq.testCase;
      const tc = { id: n, key: `${b.projectKey}-T${1000 + n}`, projectKey: b.projectKey, name: b.name, objective: b.objective || '', labels: b.labels || [], priorityName: b.priorityName || 'Normal', createdOn: now() };
      state.zephyr.testCases.push(tc);
      persist();
      send(res, 201, { id: tc.id, key: tc.key, self: `/v2/testcases/${tc.key}` });
    }],
    ['GET', /^\/v2\/testcases\/([\w-]+)$/, (req, res, [, key]) => { const t = state.zephyr.testCases.find((x) => x.key === key); return t ? send(res, 200, t) : send(res, 404, { errorCode: 404, message: `Test case ${key} not found` }); }],
    ['POST', /^\/v2\/testcycles$/, (req, res, m, body) => {
      const b = json(body) || {};
      if (!b.projectKey || !b.name) return send(res, 400, { errorCode: 400, message: 'projectKey and name are required' });
      const n = ++state.zephyr.seq.cycle;
      const cycle = { id: n, key: `${b.projectKey}-R${n}`, projectKey: b.projectKey, name: b.name, description: b.description || '', statusName: b.statusName || 'In Progress', plannedStartDate: b.plannedStartDate || now(), createdOn: now() };
      state.zephyr.cycles.push(cycle);
      persist();
      send(res, 201, { id: cycle.id, key: cycle.key, self: `/v2/testcycles/${cycle.key}` });
    }],
    ['POST', /^\/v2\/testexecutions$/, (req, res, m, body) => {
      const b = json(body) || {};
      const missing = ['projectKey', 'testCaseKey', 'testCycleKey', 'statusName'].filter((k) => !b[k]);
      if (missing.length) return send(res, 400, { errorCode: 400, message: `Missing required field(s): ${missing.join(', ')}` });
      if (!ZEPHYR_STATUSES.includes(b.statusName)) return send(res, 400, { errorCode: 400, message: `statusName must be one of ${ZEPHYR_STATUSES.join(', ')}` });
      if (!state.zephyr.cycles.some((c) => c.key === b.testCycleKey)) return send(res, 404, { errorCode: 404, message: `Test cycle ${b.testCycleKey} not found` });
      if (!/^[A-Z][A-Z0-9_]*-T\d+$/.test(b.testCaseKey)) return send(res, 400, { errorCode: 400, message: `Invalid test case key ${b.testCaseKey}` });
      if (!state.zephyr.testCases.some((t) => t.key === b.testCaseKey)) state.zephyr.testCases.push({ id: 0, key: b.testCaseKey, projectKey: b.projectKey, name: `(auto-registered) ${b.testCaseKey}`, createdOn: now() });
      const n = ++state.zephyr.seq.execution;
      const ex = { id: n, key: `${b.projectKey}-E${n}`, ...b, createdOn: now() };
      state.zephyr.executions.push(ex);
      persist();
      send(res, 201, { id: n, self: `/v2/testexecutions/${n}` });
    }],
    ['GET', /^\/v2\/testexecutions$/, (req, res, m, body, url) => { const cyc = url.searchParams.get('testCycle'); const v = state.zephyr.executions.filter((e) => !cyc || e.testCycleKey === cyc); send(res, 200, { total: v.length, isLast: true, values: v }); }],

    // ---------------------------------------------------------------- GitHub REST
    ['GET', /^\/repos\/([^/]+)\/([^/]+)\/issues\/(\d+)\/comments$/, (req, res, [, o, r, n]) => send(res, 200, state.github.comments.filter((c) => c.repo === `${o}/${r}` && c.issue === Number(n)))],
    ['POST', /^\/repos\/([^/]+)\/([^/]+)\/issues\/(\d+)\/comments$/, (req, res, [, o, r, n], body) => {
      const b = json(body) || {};
      if (!b.body) return send(res, 422, { message: 'Validation Failed', errors: [{ field: 'body', code: 'missing_field' }] });
      const c = { id: ++state.github.seq, repo: `${o}/${r}`, issue: Number(n), body: b.body, html_url: `https://github.com/${o}/${r}/pull/${n}#issuecomment-${state.github.seq}`, created_at: now(), updated_at: now() };
      state.github.comments.push(c);
      persist();
      send(res, 201, c);
    }],
    ['PATCH', /^\/repos\/([^/]+)\/([^/]+)\/issues\/comments\/(\d+)$/, (req, res, [, , , id], body) => {
      const c = state.github.comments.find((x) => x.id === Number(id));
      if (!c) return send(res, 404, { message: 'Not Found' });
      c.body = (json(body) || {}).body || c.body;
      c.updated_at = now();
      persist();
      send(res, 200, c);
    }],
    ['POST', /^\/repos\/([^/]+)\/([^/]+)\/statuses\/([0-9a-f]{7,40})$/i, (req, res, [, o, r, sha], body) => {
      const b = json(body) || {};
      if (!['error', 'failure', 'pending', 'success'].includes(b.state)) return send(res, 422, { message: 'Validation Failed', errors: [{ field: 'state', code: 'invalid' }] });
      const s = { id: ++state.github.seq, repo: `${o}/${r}`, sha, state: b.state, context: b.context || 'default', description: b.description || '', target_url: b.target_url || null, created_at: now() };
      state.github.statuses.push(s);
      persist();
      send(res, 201, s);
    }],

    // ---------------------------------------------------------------- chat webhooks
    ['POST', /^\/hooks\/slack/, (req, res, m, body) => { const b = json(body); if (!b || (!b.text && !b.blocks)) return send(res, 400, 'invalid_payload', 'text/plain'); state.notifications.push({ channel: 'slack', at: now(), payload: b }); persist(); send(res, 200, 'ok', 'text/plain'); }],
    ['POST', /^\/hooks\/teams/, (req, res, m, body) => { const b = json(body); if (!b) return send(res, 400, 'Bad payload', 'text/plain'); state.notifications.push({ channel: 'teams', at: now(), payload: b }); persist(); send(res, 202, '1', 'text/plain'); }],
  ];

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    const body = await readBody(req);
    state.requests++;
    const isAdmin = url.pathname === '/' || url.pathname.startsWith('/__mock') || url.pathname.startsWith('/hooks/') || url.pathname === '/v2/healthcheck';
    for (const [method, re, handler] of routes) {
      if (method !== req.method) continue;
      const m = re.exec(url.pathname);
      if (!m) continue;
      if (!isAdmin && !authorized(req)) return send(res, 401, { message: 'Unauthorized — send an Authorization header (any value is accepted by the mock)' });
      try { return await handler(req, res, m, body, url); } catch (e) { return send(res, 500, { message: String(e && e.message) }); }
    }
    send(res, 404, { message: `No mock route for ${req.method} ${url.pathname}` });
  });

  return {
    port,
    get state() { return state; },
    reset() { state = fresh(); persist(); },
    start() {
      return new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, process.env.MOCK_BIND || '127.0.0.1', () => { server.off('error', reject); persist(); resolve(this); });
      });
    },
    stop() { return new Promise((resolve) => server.close(() => resolve())); },
  };
}

/** Start the server unless one is already answering on the port. Returns null when another instance is running. */
async function ensureMockServer(options = {}) {
  const port = Number(options.port ?? process.env.MOCK_INTEGRATIONS_PORT ?? 4599);
  const url = (options.url || process.env.MOCK_INTEGRATIONS_URL || `http://127.0.0.1:${port}`).replace(/\/+$/, '');
  try {
    const r = await fetch(`${url}/__mock/health`, { signal: AbortSignal.timeout(800) });
    if (r.ok) return null;
  } catch { /* not running */ }
  return createMockServer({ ...options, port }).start();
}

module.exports = { createMockServer, ensureMockServer };

if (require.main === module) {
  createMockServer().start().then((s) => {
    process.stdout.write(`Mock integrations listening on http://localhost:${s.port}  (Jira /rest/api/3 · Zephyr /v2 · GitHub /repos · Slack/Teams /hooks)\n`);
    const stop = () => s.stop().then(() => process.exit(0));
    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);
  }, (e) => { process.stderr.write(`Could not start mock integrations: ${e.message}\n`); process.exit(1); });
}
