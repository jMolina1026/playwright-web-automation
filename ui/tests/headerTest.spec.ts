import { test, expect } from '../fixtures/loginFixture';
import { STORAGE_STATE_ATC } from '../../playwright.config';
import urlPaths from '../helpers/uiPaths'
import HeaderPage from '../page-objects/HeaderPage';
import ProductsPage from '../page-objects/ProductsPage';


let headerPage: HeaderPage;
let productPage: ProductsPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE_ATC })

  test.beforeEach(async({ page }) => {
    headerPage = new HeaderPage(page);
    productPage = new ProductsPage(page);

    await test.step('Navigate to Product Page', async () => {
      await page.goto(urlPaths.home);
      await expect(page.getByText('Swag Labs')).toBeVisible();
    })
  })
  
  test('TC-001 - Verify that all Header elements exist', { 
    tag: ['@header', '@headerSanity', '@Sanity'] }, 
    async () => {
      // await test.step('Click on ATC Button', async () => {
      //   await productPage.clickProductPageBtn(productPage.locators.addToCartBtn.first());
      // });

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
