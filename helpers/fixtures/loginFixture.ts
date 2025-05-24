import { test as baseTest, expect, Page } from "@playwright/test";
import LoginPage from "../../page-objects/loginPage/LoginPage.ts";
import utility from '../../helpers/utilities';

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
    await gotoSite(page, '');
    await use(loginPage);
  },

  // Logs in via the login page
  loggedInPage: async ({ loginPage }, use) => {
    await loginPage.login(process.env.USERNME, process.env.PASSWORD, loginPage.loginBtn);
    await wait(loginPage.page, 1000);
    await expect.soft(loginPage.page.getByText('Swag Labs')).toBeVisible();
    await use(loginPage.page);
  },

  // Using single authentication, every test moving forward will navigate to the home page
  authLoggedIn: async ({ page }, use) => {
    await page.goto('/inventory.html');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await use(page);
  }
});


export { expect } from '@playwright/test';
