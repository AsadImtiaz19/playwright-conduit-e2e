import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.realworld.show',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // 1. Auth Setup: generates the storage state file
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    // 2. Public / Guest UI Tests (no storageState)
    {
      name: 'chromium-public',
      testMatch: [/tests\/ui\/auth\.spec\.ts/, /tests\/ui\/register\.spec\.ts/],
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // 3. Authenticated UI Tests (depends on setup, uses storageState)
    {
      name: 'chromium-authenticated',
      testMatch: [/tests\/ui\/article\.spec\.ts/],
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
    },

    // 4. Standalone API specs (no browser / storageState needed)
    {
      name: 'api',
      testMatch: [/tests\/api\/.*\.spec\.ts/],
    },
  ],
});