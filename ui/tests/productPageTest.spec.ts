import { test, expect } from '../fixtures/loginFixture';
import { STORAGE_STATE } from '../../playwright.config';
import HeaderPage from '../page-objects/HeaderPage';
import ProductsPage from '../page-objects/ProductsPage';
import BurgerMenuPage from '../page-objects/BurgerMenuPage';
import ProductDetailsPage from '../page-objects/ProductDetailsPage';
import consts from '../helpers/products.constants'
import site from '../helpers/domains';

const { paths } = site;
const { names, descriptions, prices, addToCartBtns, filterOptions } = consts;

let headerPage: HeaderPage;
let productPage: ProductsPage;
let burgerMenuPage: BurgerMenuPage;
let prodDetailsPage: ProductDetailsPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE });

  test.beforeEach(async({ page }) => {
    headerPage = new HeaderPage(page);
    productPage = new ProductsPage(page);
    burgerMenuPage = new BurgerMenuPage(page); // remove
    prodDetailsPage = new ProductDetailsPage(page); // remove

    await test.step('Navigate to Product Page', async () => {
      await page.goto(paths.home);
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


  test.describe('And views the products page', { tag: ['@productPage', '@productPageRegression', '@Regression'] }, () => {
    test('TC-002 - Click on the Add-To-Cart for each product, then Remove from cart', async () => {
      await test.step('Add items to cart', async () => {
        const atcElements = await productPage.addToCartBtn.all();
        await expect(headerPage.locators.shoppingCartBadge).not.toBeAttached();
        for (let i = 0; i < atcElements.length; i++) {
          await productPage.clickProductBtnFromList(productPage.addToCartBtn, 0);
          await expect(headerPage.locators.shoppingCartBadge).toBeAttached();
          await expect(headerPage.locators.shoppingCartBadge).toBeVisible();
          await expect(headerPage.locators.shoppingCartBadge).toHaveText(`${i + 1}`);
        }
        await expect(productPage.addToCartBtn).not.toBeAttached();
      });

      await test.step('Remove all items from the cart', async () => {
        const rfcElements = await productPage.removeFromCartBtn.all();
        for (let j = rfcElements.length; j > 0; j--) {
          await expect(headerPage.locators.shoppingCartBadge).toBeAttached();
          await expect(headerPage.locators.shoppingCartBadge).toBeVisible();
          await expect(headerPage.locators.shoppingCartBadge).toHaveText(`${j}`);
          await productPage.clickProductBtnFromList(productPage.removeFromCartBtn, 0);
        }
        await expect(headerPage.locators.shoppingCartBadge).not.toBeAttached();
        await expect(productPage.removeFromCartBtn).not.toBeAttached();
      });
    });
  
    test('TC-003 - Verify the Product Sort Options', async ({ page }) => {
      await test.step('Sorts the product List', async () => {
        let i = 0;
        const productNames = await productPage.productName.all();
        for (const filterOption in filterOptions) {
          const optionText = Object.values(filterOptions)[i];
          const filterElement = headerPage.locators.headerSecondaryFilter;
          await productPage.selectFilterOption(filterElement, optionText);
          await expect(filterElement.locator(`option[value="${filterOption}"]`)).toHaveText(optionText);
          await expect(headerPage.locators.headerSecFilterActive).toHaveText(optionText);
          
          for (let j = 0; j < productNames.length; j++) {
            const productName = productPage.productName.nth(j);
            const productPrice = productPage.productPrice.nth(j);
            switch(filterOption) {
              case 'az': 
                await expect(productName).toHaveText(Object.values(names)[j]);
                break;
              case 'za': 
                const revNames = Object.values(names).sort().reverse();
                await expect(productName).toHaveText(Object.values(revNames)[j]);
                break;
              case 'lohi':
                const lohiPrices = Object.values(prices).sort((a, b) => 
                  parseFloat(a.slice(1)) - parseFloat(b.slice(1)));
                await expect(productPrice).toHaveText(Object.values(lohiPrices)[j]);
                break;
              case 'hilo':
                const hiloPrices = Object.values(prices).sort((a, b) => 
                  parseFloat(a.slice(1)) - parseFloat(b.slice(1))).reverse();
                await expect(productPrice).toHaveText(Object.values(hiloPrices)[j]);
                break;
              default: throw new Error('Nothing to sort');
            };
          };
          await page.waitForTimeout(500);
          i++;
        };
      });
    });
  });
});
