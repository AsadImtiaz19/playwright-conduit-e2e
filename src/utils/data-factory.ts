import { faker } from '@faker-js/faker';

export interface UserPayload {
  username: string;
  email: string;
  password: string;
}

export class DataFactory {
  /**
   * Generates a unique, valid user object for registration and authentication tests
   */
  static generateUser(): UserPayload {
    const randomId = faker.string.alphanumeric(6);
    return {
      username: `qa_user_${randomId}`,
      email: `test_${randomId}@example.com`,
      password: 'Password123!',
    };
  }
}