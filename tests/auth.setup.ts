import { test as setup, expect } from '@playwright/test';
import { RegisterPage } from '../src/pages/register.page';
import { DataFactory } from '../src/utils/data-factory';
import path from 'path';

// Location where the saved browser storage state will be stored
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate user and save storage state', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const user = DataFactory.generateUser();

  await registerPage.goto();
  await registerPage.register(user.username, user.email, user.password);

  // Assert user is logged in
  const userNavLink = page.getByRole('link', { name: user.username });
  await expect(userNavLink).toBeVisible();

  // Save the logged-in browser session (cookies, localStorage, session tokens)
  await page.context().storageState({ path: authFile });
});