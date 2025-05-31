import { test, expect } from '../fixtures/loginFixture';
import HeaderPage from '../page-objects/HeaderPage';
import ProductsPage from '../page-objects/ProductsPage';


let headerPage: HeaderPage;
let productPage: ProductsPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.beforeEach(async({ authLoggedIn }) => {
    headerPage = new HeaderPage(authLoggedIn);
    productPage = new ProductsPage(authLoggedIn);
  })
  
  test('TC-001 - Verify that all Header elements exist', { 
    tag: ['@header', '@headerSanity', '@Sanity'] }, 
    async () => {
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
