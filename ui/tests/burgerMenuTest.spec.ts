import { test, expect } from '../fixtures/loginFixture';
import { STORAGE_STATE } from '../../playwright.config';
import urlPaths from '../helpers/uiPaths';
import HeaderPage from '../page-objects/HeaderPage';
import ProductsPage from '../page-objects/ProductsPage';
import BurgerMenuPage from '../page-objects/BurgerMenuPage';


let headerPage: HeaderPage;
let productPage: ProductsPage;
let burgerMenuPage: BurgerMenuPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE });

  test.beforeEach(async({ page }) => {
    headerPage = new HeaderPage(page);
    productPage = new ProductsPage(page);
    burgerMenuPage = new BurgerMenuPage(page);

    await test.step('Navigate to Product Page', async () => {
      await page.goto(urlPaths.home);
      await expect(page.getByText('Swag Labs')).toBeVisible();
    })
  })
  
  test('TC-001 - Verify that all Burger Menu elements exist', { 
    tag: ['@burgerMenu', '@burgerMenuSanity', '@Sanity'] }, 
    async () => {
      await test.step('Open the Burger Menu (BM)', async () => {
        await headerPage.clickHeaderButn(headerPage.locators.burgerMenuButton);
      })

      await test.step('Assert existence and visibility of all BM elements', async () => {
        for (let [bmKey, bmValue] of Object.entries(burgerMenuPage.bmOptions)) {
          console.log("bmKey = " + bmKey +  ", bmValue = " + bmValue)
          await expect.soft(bmValue).toBeAttached();
          await expect.soft(bmValue).toBeVisible();

          if (bmKey !== 'close') {
            await test.step(`Assert the required text of each button -> ${bmKey}`, async () => {
                const bmText = burgerMenuPage.bmOptText[bmKey];
                await expect.soft(bmValue).toHaveText(bmText);
            })
          }
        };
      });
  });
});
