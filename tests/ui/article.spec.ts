import { test, expect } from '../../src/fixtures/test.fixture';
import { faker } from '@faker-js/faker';

test.describe('Article Management (Authenticated)', () => {
  test('should create a new article when user is authenticated', async ({ articlePage }) => {
    const title = `Playwright Test Article ${faker.string.alphanumeric(5)}`;
    const description = faker.lorem.sentence();
    const bodyText = 'This is an automated article body written via Playwright.';

    await articlePage.gotoEditor();
    await articlePage.createArticle(title, description, bodyText, 'automation');

    // Assert the article renders with the published title and body
    await expect(articlePage.articleTitle).toHaveText(title);
    await expect(articlePage.articleBody).toContainText(bodyText);
  });
});