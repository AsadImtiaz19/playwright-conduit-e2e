import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ArticlePage extends BasePage {
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly bodyInput: Locator;
  readonly tagsInput: Locator;
  readonly publishButton: Locator;
  readonly articleTitle: Locator;
  readonly articleBody: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.articleTitle = page.locator('h1');
    this.articleBody = page.locator('.article-content');
  }

  async gotoEditor(): Promise<void> {
    await this.navigateTo('/editor');
  }

  async createArticle(title: string, description: string, body: string, tag: string = 'qa'): Promise<void> {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    await this.tagsInput.fill(tag);
    await this.tagsInput.press('Enter');

    // Click and ensure we wait for navigation to complete
    await Promise.all([
      this.page.waitForURL(/.*\/article\/.+/),
      this.publishButton.click(),
    ]);
  }
}