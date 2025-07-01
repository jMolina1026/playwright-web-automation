import { test, expect } from '../fixtures/loginFixture';
import { STORAGE_STATE_ATC } from '../../playwright.config';
import urlPaths from '../helpers/uiPaths';
import HeaderPage from '../page-objects/HeaderPage';
import ProductsPage from '../page-objects/ProductsPage';
import ProductDetailsPage from '../page-objects/ProductDetailsPage';
import ShoppingCartPage from '../page-objects/ShoppingCartPage';
import consts from '../helpers/products.constants'

const { baseURLs, sdPaths } = urlPaths;
const { shoppingCartTexts } = consts;

let headerPage: HeaderPage;
let productPage: ProductsPage;
let prodDetailsPage: ProductDetailsPage;
let shoppingCartPage: ShoppingCartPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE_ATC });

  test.beforeEach(async({ page }) => {
    headerPage = new HeaderPage(page);
    productPage = new ProductsPage(page);
    prodDetailsPage = new ProductDetailsPage(page);
    shoppingCartPage = new ShoppingCartPage(page);

    await test.step('Navigate to Product Page', async () => {
      await page.goto(sdPaths.home);
      await expect(page.getByText('Swag Labs')).toBeVisible();
    })
  })
  
  test.describe('And views the Shopping Cart page', { tag: ['@shopCart', '@shopCartSanity', '@Sanity'] }, () => {
    test.only('TC-001 - Verify that all Shopping Cart element exist', async () => {
      await test.step('Click on the Shopping Cart and navigate to the Shopping Cart page', async () => {
        await headerPage.clickHeaderButn(headerPage.locators.shoppingCartButton);
      })
  
      await test.step('Verify that all Shopping Cart elements are visible', async () => {
        const cartLabels = Object.values(shoppingCartPage.eachCartLabel);
        for (let i = 0; i < cartLabels.length; i++) {
          const elementCount = await cartLabels[i].count();
          if (elementCount > 1) {
            for (let j = 0; j < elementCount; j++) {
              await expect.soft(cartLabels[i].nth(j)).toBeAttached();
              await expect.soft(cartLabels[i].nth(j)).toBeVisible();
              if (cartLabels[i] === shoppingCartPage.itemQuantity) {
                await expect.soft(cartLabels[i].nth(j)).toHaveText(Object.values(shoppingCartTexts)[i][j]);
              } else {
                await expect.soft(cartLabels[i].nth(j)).toHaveText(Object.values(shoppingCartTexts)[i]);
              }
            }
          } else {
            await expect.soft(cartLabels[i]).toBeAttached();
            await expect.soft(cartLabels[i]).toBeVisible();
            await expect.soft(cartLabels[i]).toHaveText(Object.values(shoppingCartTexts)[i]);
          }

        }
      })
    });

    test('TC-002 - Verify that all Shopping Cart element texts are correct', async () => {
      await test.step('Store the product page items texts', async () => {
        const itemTextArray: string[][] = []; // array of string arrays
        for (let i = 0; i < 3; i++) {
          const items = Object.values(productPage.eachProductElement);
          const currentItemTexts: string[] = [];

          for (let item of items.slice(0, 3)) {
            const itemText = await productPage.getProductsText(item.nth(i));
            currentItemTexts.push(itemText);
          }
          itemTextArray.push(currentItemTexts); // add the sub-array
        }

        console.log(itemTextArray);

        await test.step('Click on the Shopping Cart and navigate to the Shopping Cart page', async () => {
          await headerPage.clickHeaderButn(headerPage.locators.shoppingCartButton);
        })

        await test.step('Assert all elements texts', async () => {
          for (let j = 0; j < itemTextArray.length; j++) {
            const cartItemDetails = Object.values(shoppingCartPage.eachCartItem);
            for (let k = 0; k < cartItemDetails.length; k++) {
              const cartLocator = cartItemDetails[k].nth(j); // j = index of the item
              await expect.soft(cartLocator).toBeAttached();
              await expect.soft(cartLocator).toBeVisible();
              await expect(cartLocator).toHaveText(itemTextArray[j][k]);
            }
          }
        });
      });
    });
  });   
});


  // test.describe('And views the Products Details page', { tag: ['@prodDetails', '@prodDetailsRegression', '@Regression'] }, () => {

  // });
