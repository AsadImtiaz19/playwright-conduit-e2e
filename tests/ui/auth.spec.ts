import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Authentication Flows', () => {
  test('should display error message with invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid_user_999@test.com', 'wrongpassword');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('credentials invalid');
  });
});