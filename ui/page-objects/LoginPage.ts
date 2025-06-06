import { type Locator, type Page } from '@playwright/test';

class LoginPage {
  // Locators
  readonly locators: Record<string,Locator>;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;
  readonly errorMessageBox: Locator;
  readonly loginLogo: Locator;
  readonly loginCredential: Locator;
  readonly loginPassword: Locator;

  // Strings
  readonly loginLogoText: string = 'Swag Labs';
  readonly acceptedUserNamesText: string = 'Accepted usernames are:';
  readonly passwordForAllText: string = 'Password for all users:';
  readonly wrongUsername: string = 'WrongUserName';
  readonly wrongPassword: string = 'WrongPassword';
  readonly noMatchErrorMsg: string = 'Epic sadface: Username and password do not match any user in this service';
  readonly usernameRequired: string = 'Epic sadface: Username is required';
  readonly passwordRequired: string = 'Epic sadface: Password is required';



  constructor(readonly page: Page) {
    // Approach for V1 test
    this.locators = {
      usernameField: page.getByRole('textbox', { name: 'Username' }),
      passwordField: page.getByRole('textbox', { name: 'Password' }),
      loginBtn: page.getByRole('button', { name: 'Login' }),
      errorMessageBox: page.locator('h3[data-test="error"]'),
      loginLogo: page.getByText('Swag Labs'),
      loginCredential: page.getByRole('heading', { name: 'Accepted' }),
      loginPassword: page.getByRole('heading', { name: 'Password' })
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

export default LoginPage;
