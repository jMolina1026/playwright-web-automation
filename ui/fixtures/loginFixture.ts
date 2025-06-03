import { test as baseTest, expect, Page } from "@playwright/test";
import LoginPage from '../page-objects/LoginPage.ts';
import utility from '../helpers/utilities.ts';

const { gotoSite, wait } = utility;

type Fixtures = {
  loginPage: LoginPage;
  loggedInPage: Page;
  authLoggedIn: Page;
}

export const test = baseTest.extend<Fixtures>({
  // Navigates to the login page
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await test.step('Navigate to Login Page', async () => {
      await gotoSite(page, '/');
    })
    await use(loginPage);
  },

  // Logs in via the login page
  loggedInPage: async ({ loginPage }, use) => {
    await test.step('Logged In', async () => {
      await loginPage.login(process.env.USERNME, process.env.PASSWORD, loginPage.loginBtn);
      await wait(loginPage.page, 1000);
      await expect.soft(loginPage.page.getByText('Swag Labs')).toBeVisible();
    })
    await use(loginPage.page);
  }
});


export { expect } from '@playwright/test';
