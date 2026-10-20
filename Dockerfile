# The Playwright image ships browsers + system deps that match @playwright/test.
FROM mcr.microsoft.com/playwright:v1.63.0-noble
WORKDIR /e2e
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ENV CI=true
CMD ["npx", "playwright", "test"]
