import { test, expect } from '../../helpers/fixtures/loginFixture';
import utility from '../../helpers/utilities';
import HeaderPage from '../../page-objects/headerPage/HeaderPage';
import ProductsPage from '../../page-objects/productsPage/productsPage';

const { wait, waitForLoadState, isElementPresent } = utility

let headerPage: HeaderPage;
let productPage: ProductsPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.beforeEach(async({ page }) => {
    headerPage = new HeaderPage(page);
    productPage = new ProductsPage(page);
  })
  
  test('TC-001 - Verify that all Header elements exist', { 
    tag: ['@header', '@headerSanity', '@Sanity'] }, 
    async ({ loggedInPage }) => {
      await test.step('Click on ATC Button', async () => {
        await productPage.clickProductPageBtn(productPage.locators.addToCartBtn.first());
      });

      await test.step('Assert existence and visibility of all necessary elements', async () => {
        for (const element of Object.values(headerPage.locators)) {
          console.log('element = ' + element);
          await expect.soft((element)).toBeAttached();
          await expect.soft((element)).toBeVisible();
        }
      });

      await test.step('Assert the required texts of each element', async () => {
        await expect.soft(headerPage.locators.headerLogo).toHaveText(headerPage.appLogoText);
        await expect.soft(headerPage.locators.headerSecondTitle).toHaveText(headerPage.secondTitleText);
        await expect.soft(headerPage.locators.headerSecFilterActive).toHaveText(headerPage.activeFilterText);
      });
  });
});
