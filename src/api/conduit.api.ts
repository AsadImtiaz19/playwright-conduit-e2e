import { APIRequestContext } from '@playwright/test';
import { UserPayload } from '../utils/data-factory';

export interface ArticleResponse {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export class ConduitApi {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  /**
   * Registers a new user via API and returns their JWT auth token
   */
  async registerUser(user: UserPayload): Promise<string> {
    const response = await this.request.post(`${this.baseUrl}/users`, {
      data: {
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to register user via API: ${await response.text()}`);
    }

    const data = await response.json();
    return data.user.token;
  }

  /**
   * Creates an article using an auth token
   */
  async createArticle(
    token: string,
    title: string,
    description: string,
    body: string,
    tagList: string[] = ['api-test']
  ): Promise<ArticleResponse> {
    const response = await this.request.post(`${this.baseUrl}/articles`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to create article via API: ${await response.text()}`);
    }

    return await response.json();
  }
}