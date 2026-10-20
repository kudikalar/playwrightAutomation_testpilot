# Contributing

1. Generate or edit tests in TestPilot Automation Studio, or locally.
2. Keep tests independent and deterministic. Never add fixed sleeps.
3. Prefer user-facing locators (role/label/test id). If none exist, ask developers for a `data-testid`.
4. Every bug fix gets a regression test tagged `@bug-<id>`.
5. Run `npx tsc --noEmit && npx eslint .` and `npx playwright test --grep "@smoke"` before opening a pull request.
6. Never commit credentials, tokens or real personal data.

Branch naming: `automation/<module>-<change>`. Commit format: `test: <what changed>`.
