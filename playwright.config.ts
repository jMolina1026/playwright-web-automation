import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @description Authentication Storage, 
 * Each state will be stored to reduce site navigation and load with a 
 * predetermined state
 * @url1 https://playwright.dev/docs/test-global-setup-teardown#option-1-project-dependencies
 * @url2 https://dev.to/playwright/a-better-global-setup-in-playwright-reusing-login-with-project-dependencies-14
 */ 
export const STORAGE_STATE = path.join(__dirname, '.auth/user.json');
export const STORAGE_STATE_ATC = path.join(__dirname,'.auth/atc_user.json')

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  // testDir: './ui/tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: [['html', { open: 'always' }]], //always, never and on-failure (default).
  // reporter: [['html', { outputFolder: 'my-report' }]], // report is written into the playwright-report folder in the current working directory. override it using the PLAYWRIGHT_HTML_REPORT
  // reporter: 'dot',
  // reporter: 'list',
  /** 
    reporter: [
      ['list'],
      ['json', { outputFile: 'test_result.json }]
    ]
   */
  
  // Each test is given 30 seconds.
  timeout: 30000,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`.
     * baseURL: 'http://127.0.0.1:3000',
     */
    baseURL: 'https://www.saucedemo.com',

    // Run browser in headless mode.
    headless:  process.env.HEADLESS === 'true' || process.env.HEADLESS === undefined ? true : false,

    // Emulates `'prefers-colors-scheme'` media feature.
    colorScheme: 'dark',
    
    // Capture screenshot after each test failure.
    // Options include 'off', 'on' and 'only-on-failure'
    screenshot: 'only-on-failure',

    // Record video only when retrying a test for the first time.
    // Options include: 'off', 'on', 'retain-on-failure' and 'on-first-retry'
    video: {
      mode: 'on',
      size: { width: 1920, height: 1060 }
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /**
   * Configure projects for major browsers 
   * https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json#L3
   * https://playwright.dev/docs/emulation
   */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'Google Chrome Custom',
      use: { 
        channel: 'chrome',
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.7151.27 Safari/537.36",
        launchOptions: {
          args: process.env.HEADLESS === 'true' ?
          ["--window-size=1920,1080"] :
          ["--start-maximized"]
        },
        viewport: null,
        // storageState: STORAGE_STATE
      },
      dependencies: ['setup']
    },
    
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        // browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], channel: 'firefox' },
    },
    // {
    //   name: 'chromium',
    //   use: { 
    //     ...devices['Desktop Chrome'], // ...devices with name defaults to 1280x720
    //     viewport: { width: 1920, height: 720 },
    //    },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { 
    //     ...devices['Desktop Edge'], 
    //     channel: 'msedge' 
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
