import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { ArticlePage } from '../pages/article.page';

// Define the types for all fixtures injected into tests
type AppFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  articlePage: ArticlePage;
};

// Extend the base test with page object fixtures
export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});

export { expect } from '@playwright/test';