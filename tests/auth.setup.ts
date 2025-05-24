import { test as setup, expect } from '../helpers/fixtures/loginFixture'
import { STORAGE_STATE } from '../playwright.config';

setup('Check Logged In', async ({ loggedInPage }) => {
  // Remember, the fixture loggedInPage is completing the steps below
  
  // let loginPage = new LoginPage(page);
  // await page.goto('/');
  // await loginPage.login(process.env.USERNME, process.env.PASSWORD, loginPage.loginBtn);

  // Wait for the final URL to ensure that the cookies are actually set.
  await loggedInPage.waitForURL('https://www.saucedemo.com/inventory.html');
  
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(loggedInPage).toHaveTitle('Swag Labs');

  // End of authentication steps.
  await loggedInPage.context().storageState({ path: STORAGE_STATE });
});
