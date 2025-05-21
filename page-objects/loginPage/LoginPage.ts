import { expect, type Locator, type Page } from '@playwright/test';

export default class LoginPage {
  readonly locators: Record<string,Locator>;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;
  readonly errorMessageBox: Locator;
  readonly loginLogo: Locator;
  readonly loginCredential: Locator;
  readonly loginPassword: Locator;

  constructor(readonly page: Page) {
    // Approach for V1 test
    this.locators = {
      usernameField: page.getByPlaceholder('Username'),
      passwordField: page.getByPlaceholder('Password'),
      loginBtn: page.locator('input#login-button'),
      errorMessageBox: page.locator('h3[data-test="error"]'),
      loginLogo: page.locator('div.login_logo'),
      loginCredential: page.locator('div#login_credentials'),
      loginPassword: page.locator('div.login_password')
    }

    // Alternative approach for V2 test
    this.usernameField = page.getByPlaceholder('Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginBtn = page.locator('input#login-button');
    this.errorMessageBox = page.locator('h3[data-test="error"]');
    this.loginLogo = page.locator('div.login_logo');
    this.loginCredential = page.locator('div#login_credentials');
    this.loginPassword = page.locator('div.login_password');
  }

  async enterUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async enterPassword (password: string) {
    await this.passwordField.fill(password);
  }

  async clickLoginPageBtn(element: Locator) {
    await element.click();
  }


  async login(username: any = process.env.USERNME, password: any = process.env.PASSWORD, element: Locator = this.locators.loginBtn) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginPageBtn(element);
  }
}
