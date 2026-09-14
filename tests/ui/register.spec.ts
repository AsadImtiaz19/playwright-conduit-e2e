import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../src/pages/register.page';
import { DataFactory } from '../../src/utils/data-factory';

test.describe('Registration Flows', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('should successfully register a newly generated user', async ({ page }) => {
    const newUser = DataFactory.generateUser();

    await registerPage.register(newUser.username, newUser.email, newUser.password);

    // After registration, Conduit redirects to home and displays username in navigation
    const userNavLink = page.getByRole('link', { name: newUser.username });
    await expect(userNavLink).toBeVisible();
  });
});