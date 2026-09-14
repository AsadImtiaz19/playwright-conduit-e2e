# Playwright & TypeScript Test Automation Framework

[![Playwright Tests](https://github.com/AsadImtiaz19/playwright-conduit-e2e/actions/workflows/playwright.yml/badge.svg)](https://github.com/AsadImtiaz19/playwright-conduit-e2e/actions/workflows/playwright.yml)
[![Live Report](https://img.shields.io/badge/Report-GitHub%20Pages-blue)](https://asadimtiaz19.github.io/playwright-conduit-e2e/)

A production-ready End-to-End (E2E) and REST API test automation framework built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern against the Conduit RealWorld application.

---

## Architecture & Design Highlights

* **Page Object Model (POM):** Clean UI abstraction using resilient, user-facing role locators (`getByRole`, `getByPlaceholder`).
* **Fast Authentication via `storageState`:** Global setup runs once to authenticate and cache session state (`playwright/.auth/user.json`), preventing redundant UI logins across test suites.
* **Custom Playwright Fixtures:** Extended `test` fixtures inject typed page objects directly into test functions, eliminating boilerplate `beforeEach` setups.
* **Dynamic Data Generation:** Utilizes `@faker-js/faker` within a `DataFactory` utility to generate isolated, collision-free test data.
* **Hybrid Testing & API Seeding:** Leverages Playwright's `APIRequestContext` (`ConduitApi`) to seed users and articles via REST endpoints prior to UI verification.
* **Continuous Integration:** GitHub Actions workflow executes tests on Ubuntu and automatically deploys the HTML test report to GitHub Pages.

---

## Tech Stack

| Category | Technology |
|---|---|
| Test Runner | Playwright |
| Programming Language | TypeScript |
| Design Patterns | Page Object Model (POM), Custom Fixtures, Data Factory |
| Synthetic Data | Faker.js |
| Environment Config | Dotenv |
| CI/CD & Reporting | GitHub Actions, GitHub Pages |

---

## Project Structure

```text
playwright-conduit-e2e/
├── .github/workflows/
│   └── playwright.yml            # CI pipeline & GitHub Pages deployment
├── src/
│   ├── api/
│   │   └── conduit.api.ts        # API client for backend seeding & contract checks
│   ├── fixtures/
│   │   └── test.fixture.ts       # Extended Playwright test fixtures
│   ├── pages/
│   │   ├── base.page.ts          # Base page wrapper
│   │   ├── login.page.ts         # Login page interactions & locators
│   │   ├── register.page.ts      # Registration page interactions & locators
│   │   └── article.page.ts       # Article editor & view interactions
│   └── utils/
│       └── data-factory.ts       # Faker-powered payload generators
├── tests/
│   ├── auth.setup.ts             # Global authentication setup (storageState)
│   ├── api/
│   │   └── articles.api.spec.ts  # REST API contract & functional tests
│   └── ui/
│       ├── auth.spec.ts          # Unauthenticated login validations
│       ├── register.spec.ts      # User registration validations
│       └── article.spec.ts       # Authenticated article creation tests
├── playwright.config.ts          # Multi-project test execution config
├── tsconfig.json                 # TypeScript compiler configuration
└── package.json
```

---

## Getting Started

### Prerequisites

* **Node.js**: v18 or higher
* **npm**: v9 or higher

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AsadImtiaz19/playwright-conduit-e2e.git
   cd playwright-conduit-e2e
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install required Playwright browser binaries:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   BASE_URL=https://demo.realworld.show
   API_URL=https://api.realworld.show/api
   ```

---

## Test Execution

```bash
# Run the entire test suite (Setup, UI, and API in headless mode)
npm test

# Run UI tests with headed browser
npm run test:headed

# Run only UI specifications
npm run test:ui

# Run only backend REST API specifications
npm run test:api

# Run TypeScript compilation checks
npm run typecheck

# Open the latest HTML execution report
npm run test:report
```

---

## CI/CD Pipeline

The GitHub Actions workflow runs on every push and pull request to the `main` branch:

1. Checks out the repository and caches npm dependencies.
2. Installs required Playwright browser binaries and OS dependencies.
3. Runs the full test suite with project dependencies (auth setup, isolated guest UI, authenticated UI, and REST API).
4. Uploads test execution artifacts (traces, screenshots, videos on failure).
5. Deploys the generated Playwright HTML test report directly to the `gh-pages` branch.
