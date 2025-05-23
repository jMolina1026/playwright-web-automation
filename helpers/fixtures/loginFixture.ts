import { test as baseTest, expect, Page } from "@playwright/test";
import LoginPage from "../../page-objects/loginPage/LoginPage.ts";
import utility from '../../helpers/utilities';

const { gotoSite, wait } = utility;

type Fixtures = {
  loginPage: LoginPage;
  loggedInPage: Page;
}

export const test = baseTest.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await gotoSite(page, '');
    await use(loginPage);
    await page.close();
  },

  loggedInPage: async ({ loginPage }, use) => {
    await loginPage.login(process.env.USERNME, process.env.PASSWORD, loginPage.loginBtn);
    await wait(loginPage.page, 1000);
    await expect.soft(loginPage.page.getByText('Swag Labs')).toBeVisible();
    await use(loginPage.page);
  }
});


export { expect } from '@playwright/test';
