import { test, expect } from '../fixtures/loginFixture';
import { STORAGE_STATE } from '../../playwright.config';
import urlPaths from '../helpers/uiPaths';
import HeaderPage from '../page-objects/HeaderPage';
import ProductsPage from '../page-objects/ProductsPage';
import consts from '../helpers/products.constants'
import FooterPage from '../page-objects/FooterPage';

const { sdPaths } = urlPaths;
const { names, descriptions, prices, addToCartBtns, filterOptions } = consts;

let headerPage: HeaderPage;
let productPage: ProductsPage;
let footerPage: FooterPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE });

  test.beforeEach(async({ page }) => {
    headerPage = new HeaderPage(page);
    productPage = new ProductsPage(page);
    footerPage = new FooterPage(page);

    await test.step('Navigate to Product Page', async () => {
      await page.goto(sdPaths.home);
      await expect(page.getByText('Swag Labs')).toBeVisible();
    })
  })
  
  test.describe('And views the footer section', { tag: ['@footer', '@footerSanity', '@Sanity'] }, () => {
    test('TC-001 - Verify that all footer elements exist', async ({ page }) => {
      await test.step('Assert existence and visibility of all Footer elements', async () => {
        await footerPage.facebookBtn.scrollIntoViewIfNeeded();
        const footerValues = Object.values(footerPage.eachFooterElement);
        for (let fValue of footerValues) {
          await expect.soft(fValue).toBeAttached();
          await expect.soft(fValue).toBeVisible();

          if (fValue === footerPage.footerCopyRight) {
            await expect.soft(fValue).toHaveText(footerPage.copyRight);
          };
        };
        await page.waitForTimeout(500);
      });
    });
  });


  test.describe('And views the Footer section', { tag: ['@footer', '@footerRegression', '@Regression'] }, () => {
    test.only('TC-002 - Verify that clicking each social media icon executes proper site navigation', async () => {
      await test.step('Click each social media option', async () => {

      });

      // await test.step('Remove all items from the cart', async () => {
      //   const rfcElements = await productPage.removeFromCartBtn.all();
      //   for (let j = rfcElements.length; j > 0; j--) {
      //     await expect(headerPage.locators.shoppingCartBadge).toBeAttached();
      //     await expect(headerPage.locators.shoppingCartBadge).toBeVisible();
      //     await expect(headerPage.locators.shoppingCartBadge).toHaveText(`${j}`);
      //     await productPage.clickProductBtnFromList(productPage.removeFromCartBtn, 0);
      //   }
      //   await expect(headerPage.locators.shoppingCartBadge).not.toBeAttached();
      //   await expect(productPage.removeFromCartBtn).not.toBeAttached();
      // });
    });
  
  //   test('TC-003 - Verify the Product Sort Options', async ({ page }) => {
  //     await test.step('Sorts the product List', async () => {
  //       let i = 0;
  //       const productNames = await productPage.productName.all();
  //       for (const filterOption in filterOptions) {
  //         const optionText = Object.values(filterOptions)[i];
  //         const filterElement = headerPage.locators.headerSecondaryFilter;
  //         await productPage.selectFilterOption(filterElement, optionText);
  //         await expect(filterElement.locator(`option[value="${filterOption}"]`)).toHaveText(optionText);
  //         await expect(headerPage.locators.headerSecFilterActive).toHaveText(optionText);
          
  //         for (let j = 0; j < productNames.length; j++) {
  //           const productName = productPage.productName.nth(j);
  //           const productPrice = productPage.productPrice.nth(j);
  //           switch(filterOption) {
  //             case 'az': 
  //               await expect(productName).toHaveText(Object.values(names)[j]);
  //               break;
  //             case 'za': 
  //               const revNames = Object.values(names).sort().reverse();
  //               await expect(productName).toHaveText(Object.values(revNames)[j]);
  //               break;
  //             case 'lohi':
  //               const lohiPrices = Object.values(prices).sort((a, b) => 
  //                 parseFloat(a.slice(1)) - parseFloat(b.slice(1)));
  //               await expect(productPrice).toHaveText(Object.values(lohiPrices)[j]);
  //               break;
  //             case 'hilo':
  //               const hiloPrices = Object.values(prices).sort((a, b) => 
  //                 parseFloat(a.slice(1)) - parseFloat(b.slice(1))).reverse();
  //               await expect(productPrice).toHaveText(Object.values(hiloPrices)[j]);
  //               break;
  //             default: throw new Error('Nothing to sort');
  //           };
  //         };
  //         await page.waitForTimeout(500);
  //         i++;
  //       };
  //     });
  //   });
  });
});
