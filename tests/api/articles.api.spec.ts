import { test, expect } from '@playwright/test';
import { ConduitApi } from '../../src/api/conduit.api';
import { DataFactory } from '../../src/utils/data-factory';
import { faker } from '@faker-js/faker';

test.describe('Conduit REST API - Articles', () => {
  let api: ConduitApi;
  const apiUrl = process.env.API_URL || 'https://api.realworld.show/api';

  test.beforeEach(async ({ request }) => {
    api = new ConduitApi(request, apiUrl);
  });

  test('POST /articles - should create a new article with valid token', async () => {
    // 1. Seed user via API
    const user = DataFactory.generateUser();
    const token = await api.registerUser(user);

    // 2. Create article via API
    const title = `API Test Article ${faker.string.alphanumeric(6)}`;
    const description = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    const response = await api.createArticle(token, title, description, body, ['backend', 'playwright']);

    // 3. Validate response contract
    expect(response.article.title).toBe(title);
    expect(response.article.slug).toBeDefined();
    expect(response.article.tagList).toContain('backend');
  });

  test('GET /tags - should return list of popular tags', async ({ request }) => {
    const response = await request.get(`${apiUrl}/tags`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.tags)).toBeTruthy();
  });
});