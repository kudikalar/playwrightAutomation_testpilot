# Integrations

Every run writes `reports/run-summary.json`, then `reporting/TestPilotReporter.ts` (Playwright reporter) after `global-setup.ts` publishes it in this order:

```
tests ─▶ run-summary.json ─▶ Zephyr Scale (cycle + executions) ─▶ Jira (de-duplicated bugs) ─▶ S3 (report archive) ─▶ GitHub (PR comment + status) ─▶ Slack / Teams
```

Each step is isolated: a failing integration is recorded in `reports/integrations/publish-report.json` and **never** changes the test result.

| Integration | What it does | Where |
|---|---|---|
| **Jira** | Auto-create de-duplicated bugs for failed tests, with evidence | `integrations/jira/` |
| **Zephyr Scale** | Test cycle per run + execution results per test case | `integrations/zephyr/` |
| **Sauce Labs** | Run the suite on Sauce Labs (saucectl / RemoteWebDriver) | `.sauce/config.yml` |
| **AWS** | S3 report archive, Secrets Manager credentials, CodeBuild spec | `aws/` + S3 publisher + secrets loader |
| **GitHub** | PR result comment, commit status, PR/issue templates, CODEOWNERS, Dependabot | `.github/` + GitHub publisher |
| **Jenkins** | Parameterised Jenkinsfile: env · suite · browser · grid · publish | `Jenkinsfile` |
| **Slack** | Run summary to a Slack incoming webhook | Notifier |
| **Docker** | Dockerfile + docker-compose (tests + mock integrations) | `Dockerfile`, `docker-compose.yml` |

## Mock mode (default): runs with zero accounts

`INTEGRATIONS_MODE=mock` points every client at the bundled dummy API in `tools/mock-integrations/server.cjs`
(Node.js, no dependencies). The results hook starts it automatically; you can also run it yourself:

```bash
node tools/mock-integrations/server.cjs        # http://localhost:4599
curl localhost:4599/__mock/state         # every bug, cycle, execution, comment and message the run "sent"
```

It implements the parts of the real APIs the framework uses, with the same validation and error shapes (and it rejects calls without an `Authorization` header, like the real services):

| Service | Endpoints |
|---|---|
| Jira Cloud REST v3 | `POST /rest/api/3/issue` · `GET /rest/api/3/search/jql` · `GET /rest/api/3/issue/{key}` · `POST …/comment` · `POST …/attachments` · `GET/POST …/transitions` · `GET /rest/api/3/myself` |
| Zephyr Scale Cloud v2 | `POST /v2/testcycles` · `POST /v2/testexecutions` · `GET/POST /v2/testcases` · `GET /v2/healthcheck` |
| GitHub REST | `GET/POST /repos/{o}/{r}/issues/{n}/comments` · `PATCH …/issues/comments/{id}` · `POST /repos/{o}/{r}/statuses/{sha}` |
| Slack / Teams | `POST /hooks/slack` · `POST /hooks/teams` |

## Live mode

Set `INTEGRATIONS_MODE=live` and provide credentials through CI secrets. Never commit them.

| Secret | Used by |
|---|---|
| `JIRA_API_TOKEN` | Jira |
| `JIRA_EMAIL` | Jira |
| `ZEPHYR_API_TOKEN` | Zephyr Scale |
| `SAUCE_USERNAME` | Sauce Labs |
| `SAUCE_ACCESS_KEY` | Sauce Labs |
| `AWS_ACCESS_KEY_ID` | AWS |
| `AWS_SECRET_ACCESS_KEY` | AWS |
| `SLACK_WEBHOOK_URL` | Slack |

- **Jira**: API token from id.atlassian.com → Security. One bug per *failure signature* (test id + normalised error). A recurring failure adds a comment to the open issue instead of filing a duplicate. Cap: `JIRA_MAX_BUGS_PER_RUN`.
- **Zephyr Scale**: API access token from Zephyr → API keys. Map automation ids to test case keys in `integrations/zephyr/mapping.json` (seeded with placeholder keys). With `ZEPHYR_CREATE_MISSING_CASES=true`, unmapped tests create cases and the new keys are written to `reports/integrations/zephyr-mapping.learned.json` for you to commit.
- **Sauce Labs / BrowserStack**: `RUN_ON=saucelabs|browserstack`. Playwright runs through `saucectl` / `browserstack-node-sdk` (`npm run test:saucelabs`, `npm run test:browserstack`).
- **AWS**: `AWS_S3_UPLOAD=true` archives reports to `s3://$AWS_S3_BUCKET/$AWS_S3_PREFIX/<run-id>/` with the default credential chain (prefer a CI role). `SECRETS_PROVIDER=aws` loads a JSON secret (`AWS_SECRET_ID`) into the environment before tests start; values already set always win. Least-privilege policy: `aws/iam-policy.json`. CodeBuild: `aws/buildspec.yml`. The AWS SDK packages are optional dependencies, installed only where uploads run.
- **GitHub**: on pull requests the run upserts one results comment and sets the `testpilot/e2e` commit status (`GITHUB_TOKEN` with `pull-requests: write` and `statuses: write`).
- **Slack / Teams**: incoming webhook URLs (Teams via a Workflows webhook, Adaptive Card). `NOTIFY_ON=failure` keeps green runs quiet.

## Jenkins

`Jenkinsfile` is parameterised (TEST_ENV · SUITE · BROWSER · RUN_ON · INTEGRATIONS_MODE · PUBLISH_RESULTS). It binds the
credentials above by id (lower-case and dashed, e.g. `jira-api-token`), publishes JUnit + HTML + Allure, archives artifacts and runs the quality gate.

## Docker

```bash
docker compose up --build --abort-on-container-exit tests
```

This starts the mock integrations and the suite. Reports land in `./reports`.
