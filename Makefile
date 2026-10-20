.DEFAULT_GOAL := help
.PHONY: help install lint test smoke critical regression mock docker

help: ## Show targets
	@grep -E '^[a-z-]+:.*##' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  %-12s %s\n", $$1, $$2}'

install: ## Install dependencies (and browsers)
	npm ci && npx playwright install --with-deps

lint: ## Static checks
	npx tsc --noEmit && npx eslint .

test: ## Run everything
	npx playwright test

smoke: ## Smoke suite
	npx playwright test --grep "@smoke"

critical: ## P0 journeys
	npx playwright test --grep "@critical"

regression: ## Full regression
	npx playwright test --grep "@regression"

mock: ## Start the dummy Jira / Zephyr / GitHub / Slack API on :4599
	node tools/mock-integrations/server.cjs

docker: ## Run the suite in Docker with mock integrations
	docker compose up --build --abort-on-container-exit tests

report: ## Open the HTML report
	npx playwright show-report reports/html
