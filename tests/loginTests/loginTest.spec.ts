import { test, expect } from '../../helpers/fixtures/loginFixture';
import utility from '../../helpers/utilities';
import HeaderPage from '../../page-objects/headerPage/HeaderPage';

const { wait, waitForLoadState, isElementPresent } = utility

let headerPage: HeaderPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.beforeEach(async({ page }) => {
    headerPage = new HeaderPage(page);
  })
  
  test('TC-001 - Verify all required elements on the login page', { 
    tag: ['@login', '@loginSanity', '@Sanity'] }, 
    async ({ loginPage }) => {
    await loginPage.clickLoginPageBtn(loginPage.locators.loginBtn);
    for (const element of Object.values(loginPage.locators)) {
      await expect.soft((element)).toBeAttached();
      await expect.soft((element)).toBeVisible();
    }
    // await expect.soft()
    await expect.soft((loginPage.locators.loginLogo)).toHaveText('Swag Labs')
    await expect.soft((loginPage.locators.usernameField)).toHaveAttribute('placeholder', 'Username');
    await expect.soft((loginPage.locators.passwordField)).toHaveAttribute('placeholder', 'Password');
    await expect.soft((loginPage.locators.loginBtn)).toHaveValue('Login');
    await expect.soft((loginPage.locators.loginCredential)).toHaveText('Accepted usernames are:');
    await expect.soft((loginPage.locators.loginPassword)).toHaveText('Password for all users:');
    await wait(loginPage.page, 2000);
  });

  test('TC-002 - Verify all required elements on the login page - V2', { 
    tag: ['@login', '@loginSanity', '@Sanity'] }, 
    async ({ loginPage }) => {
    await loginPage.clickLoginPageBtn(loginPage.loginBtn);
    for (const element of Object.values(loginPage).slice(2)) {
      await expect(element).toBeAttached();
      await expect(element).toBeVisible();
    }
    await expect(loginPage.loginLogo).toHaveText('Swag Labs')
    await expect(loginPage.usernameField).toHaveAttribute('placeholder', 'Username');
    await expect(loginPage.passwordField).toHaveAttribute('placeholder', 'Password');
    await expect(loginPage.loginBtn).toHaveValue('Login');
    await expect(loginPage.loginCredential.getByRole('heading', { name: 'Accepted' })).toHaveText('Accepted usernames are:');
    await expect(loginPage.loginPassword.getByRole('heading', { name: 'Password' })).toHaveText('Password for all users:');
    await wait(loginPage.page, 2000);
  });

  test('TC-003 - User can login with valid credentials', { 
    tag: ['@login', '@loginValidCreds', '@loginRegression', '@Regression'] },
    async ({ loggedInPage }) => {
    await expect(headerPage.locators.headerLogo).toBeAttached();
    await expect(headerPage.locators.headerLogo).toBeVisible();
  });

  test('TC-004 - User attempts to login with an invalid username', { 
    tag: ['@login', '@loginInvalidUsername', '@loginRegression', '@Regression'] }, 
    async ({ loginPage }) => {
      await loginPage.login('WrongUserName', process.env.PASSWORD);
      await expect(loginPage.locators.errorMessageBox).toBeVisible();
      await expect(loginPage.locators.errorMessageBox).toHaveText('Epic sadface: Username and password do not match any user in this service')
      await wait(loginPage.page, 2000)
  });

  test('TC-005 - User attempts to login with an invalid password', { 
    tag: ['@login', '@loginInvalidPwd', '@loginRegression', '@Regression'] }, 
    async ({ loginPage }) => {
      await loginPage.login(process.env.USERNME, 'WrongPassword');
      await expect(loginPage.locators.errorMessageBox).toBeVisible();
      await expect(loginPage.locators.errorMessageBox).toHaveText('Epic sadface: Username and password do not match any user in this service')
      await wait(loginPage.page, 2000)
  });

  test('TC-006 - User verifies if a Username has been added to the email field', { 
    tag: ['@login', '@loginMissingUsername', '@loginRegression', '@Regression'] }, 
    async ({ loginPage }) => {
      await loginPage.login('', process.env.PASSWORD);
      await expect(loginPage.locators.errorMessageBox).toBeVisible();
      await expect(loginPage.locators.errorMessageBox).toHaveText('Epic sadface: Username is required')
      await wait(loginPage.page, 2000)
  });

  test('TC-007 - User verifies if a Password has been added to the password field', { 
    tag: ['@login', '@loginMissingPwd', '@loginRegression', '@Regression'] }, 
    async ({ loginPage }) => {
      await loginPage.login(process.env.USERNME, '');
      await expect(loginPage.locators.errorMessageBox).toBeVisible();
      await expect(loginPage.locators.errorMessageBox).toHaveText('Epic sadface: Password is required')
      await wait(loginPage.page, 2000)
  });
})
