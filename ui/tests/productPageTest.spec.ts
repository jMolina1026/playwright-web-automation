import { test, expect } from '../fixtures/loginFixture';
import { STORAGE_STATE } from '../../playwright.config';
import urlPaths from '../helpers/uiPaths';
import HeaderPage from '../page-objects/HeaderPage';
import ProductsPage from '../page-objects/ProductsPage';
import BurgerMenuPage from '../page-objects/BurgerMenuPage';
import ProductDetailsPage from '../page-objects/ProductDetailsPage';
import consts from '../helpers/products.constants'

const { sdPaths } = urlPaths;
const { names, descriptions, prices, addToCartBtns } = consts;

let headerPage: HeaderPage;
let productPage: ProductsPage;
let burgerMenuPage: BurgerMenuPage;
let prodDetailsPage: ProductDetailsPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE });

  test.beforeEach(async({ page }) => {
    headerPage = new HeaderPage(page);
    productPage = new ProductsPage(page);
    burgerMenuPage = new BurgerMenuPage(page);
    prodDetailsPage = new ProductDetailsPage(page);

    await test.step('Navigate to Product Page', async () => {
      await page.goto(sdPaths.home);
      await expect(page.getByText('Swag Labs')).toBeVisible();
    })
  })
  
  test.describe('And views the products page', { tag: ['@productPage', '@productPageSanity', '@Sanity'] }, () => {
    test('TC-001 - Verify that all products elements exist', async () => {
      await test.step('Assert existence and visibility of all Product elements', async () => {
        const productEntries = Object.entries(productPage.eachProductElement);
        for (let [prodKey, prodValue] of productEntries) {
          const allProdElements = await prodValue.all();
          const allProdEleLength = allProdElements.length
          if (prodKey !== 'prodImg') {
            for (let i = 0; i < allProdEleLength; i++) {
              const itemName = prodValue.nth(i);
              await expect.soft(itemName).toBeAttached();
              await expect.soft(itemName).toBeVisible();
              await expect.soft(itemName).toHaveText(
                productPage.switchProductObj(prodKey, i, names, descriptions, prices, addToCartBtns)
              ); 
            };
          };
        };
      });
    });
  });


  // test.describe('And Opens the Burger Menu', { tag: ['@burgerMenu', '@burgerMenuRegression', '@Regression'] }, () => {
  //   test('TC-002 - Clicking on BM option "All Items" takes the user to the home page', async () => {
  //     await test.step('Click on an item name to open the details', async () => {
  //       await productPage.clickProductPageBtn(productPage.productName.first());
  //       await expect(prodDetailsPage.backBtn).toHaveText('Back to products');
  //     });

  //     await test.step('Open the Burger Menu (BM) and click "All Items"', async () => {
  //       await headerPage.clickHeaderButn(headerPage.locators.burgerMenuButton);
  //       await burgerMenuPage.clickMenuOptionBtn(burgerMenuPage.allItems);
  //       await expect(headerPage.locators.headerSecondTitle).toHaveText('Products');
  //     });
  //   });
  
  //   test('TC-003 - Clicking on BM option "About" takes the user to the about page', async ({ page }) => {
  //     await test.step('Open the Burger Menu (BM) and click "About"', async () => {
  //       await headerPage.clickHeaderButn(headerPage.locators.burgerMenuButton);
  //       await burgerMenuPage.clickMenuOptionBtn(burgerMenuPage.about);
  //       await expect(page).toHaveURL(baseURLs.sauceLabsUrl + '/');
  //       await expect(page).toHaveTitle(burgerMenuPage.aboutTitle);
  //     });
  //   });
  
  //   test('TC-004 - Clicking on BM option "Logout" logs the user out', async ({ page }) => {
  //     await test.step('Open the Burger Menu (BM) and click "Logout"', async () => {
  //       await headerPage.clickHeaderButn(headerPage.locators.burgerMenuButton);
  //       await burgerMenuPage.clickMenuOptionBtn(burgerMenuPage.logout);
  //       await expect(page).toHaveURL(baseURLs.sdBaseUrl);
  //       await expect(page).not.toHaveURL(baseURLs.sdBaseUrl + sdPaths.home);
  //     })
  //   });
  
  //   test('TC-005 - Clicking on BM option "Reset App" defaults app to original state', async ({ page }) => {
  //     await test.step('Add Item to the Cart', async () => {
  //       await productPage.clickProductPageBtn(productPage.addToCartBtn.first());
  //       await expect(headerPage.locators.shoppingCartBadge).toBeVisible();
  //       await expect(headerPage.locators.shoppingCartBadge).toHaveText("1");
  //     });
  
  //     await test.step('Open the Burger Menu (BM) and click "Reset App"', async () => {
  //       await headerPage.clickHeaderButn(headerPage.locators.burgerMenuButton);
  //       await burgerMenuPage.clickMenuOptionBtn(burgerMenuPage.resetApp);
  //       await test.step('Close the Burger Menu', async () => {
  //         await burgerMenuPage.clickMenuOptionBtn(burgerMenuPage.closeBtn);
  //         await expect(burgerMenuPage.closeBtn).not.toBeVisible()
  //       })
  //       await page.reload();
  //       await expect(headerPage.locators.shoppingCartBadge).not.toBeAttached();
  //       await expect(productPage.removeFromCartBtn).not.toBeAttached();
  //     })
  //   });
  // });
});
