import { defineConfig, devices } from '@playwright/test';

/**
 * Browser checks run against the built product on a local preview server, and
 * drive the machine's installed Chrome rather than a downloaded browser.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  timeout: 45_000,
  use: {
    baseURL: 'http://localhost:4173',
    channel: 'chrome',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'laptop',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
