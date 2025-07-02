import { test, expect } from '../fixtures/page-objects-Fixtures';
import { STORAGE_STATE } from '../../playwright.config';
import site from '../helpers/domains';

const { paths } = site;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE });

  test.beforeEach(async({ page }) => {
    await test.step('Navigate to Product Page', async () => {
      await page.goto(paths.home);
      await expect(page.getByText('Swag Labs')).toBeVisible();
    })
  })
  
  test.describe('And views the Products Details page', { tag: ['@prodDetails', '@prodDetailsSanity', '@Sanity'] }, () => {
    test('TC-001 - Verify that all Product Details elements exist', async ({ productPage, prodDetailsPage }) => {
      const itemTextArray: string[] = [];
      await test.step('Store the product page item texts', async () => {
        const items = Object.values(productPage.eachProductElement);
        for (let item of items) {
          if (item !== productPage.productImage) {
            const itemText = await productPage.getProductsText(item.first());
            itemTextArray.push(itemText);
          }
        }

        await test.step('Click on the product name and navigate to the details page', async () => {
          await productPage.clickProductPageBtn(productPage.productName.first());
        })

        await test.step('Assert all elements existence', async () => {
          const itemDetails = Object.values(prodDetailsPage.eachItemDetail);
          itemTextArray.push('Back to products');  
          let i = 0;
          for (let itemDetail of itemDetails) {
            await expect.soft(itemDetail).toBeAttached();
            await expect.soft(itemDetail).toBeVisible();
  
            if (itemDetail !== prodDetailsPage.detailsImg) {
              await expect(itemDetail).toHaveText(itemTextArray[i]);
            }
            i++;
          }
        });
      });
    });
  });


  test.describe('And views the Products Details page', { tag: ['@prodDetails', '@prodDetailsRegression', '@Regression'] }, () => {
    test('TC-002 - Verify user can add item to cart from Product Details Page', async ({ headerPage, productPage, prodDetailsPage, shoppingCartPage }) => {
      await test.step('Click on the product name and navigate to the details page', async () => {
        await productPage.clickProductPageBtn(productPage.productName.first());
        const itemTextArray: string[] = [];
        const items = Object.entries(prodDetailsPage.eachItemDetail).slice(0,3);
        for (let [itemKey] of items) {
          const itemText = await prodDetailsPage.switchProdDetailsObj(itemKey);
          itemTextArray.push(itemText);
        }

        await test.step('Click on the add to cart button and navigate to the shopping cart', async () => {
          await prodDetailsPage.clickProductDetailsBtn(prodDetailsPage.detailsATC);
          await expect(headerPage.locators.shoppingCartBadge).toBeAttached();
          await expect(headerPage.locators.shoppingCartBadge).toBeVisible();
          await expect(headerPage.locators.shoppingCartBadge).toHaveText('1');
          await headerPage.clickHeaderButn(headerPage.locators.shoppingCartButton);
        });

        await test.step('Assert item has been added to cart', async () => {
          await expect.soft(headerPage.locators.headerSecondTitle).toHaveText('Your Cart');
          const cartItems = Object.values(shoppingCartPage.eachCartItem);
          let i = 0;
          for (let cartItem of cartItems) {
            await expect.soft(cartItem).toHaveText(itemTextArray[i]);
            i++;
          }
        });
      });
    });

    test('TC-003 - Verify that the user can go back to products', async ({ headerPage, productPage, prodDetailsPage }) => {
      await test.step('Click on the product name and navigate to the details page', async () => {
        await productPage.clickProductPageBtn(productPage.productName.first());
        await expect(prodDetailsPage.backBtn).toHaveText('Back to products');
      });

      await test.step('Click on Back to products button', async () => {
        await prodDetailsPage.clickProductDetailsBtn(prodDetailsPage.backBtn);
        await expect(headerPage.locators.headerSecondTitle).toHaveText('Products');
      });
    });
  });
});
