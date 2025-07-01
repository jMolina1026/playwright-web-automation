import { test as setup, expect } from '../../../ui/fixtures/loginFixture'
import { STORAGE_STATE_ATC } from '../../../playwright.config';
import ProductsPage from '../../page-objects/ProductsPage';
import HeaderPage from '../../page-objects/HeaderPage';


setup('Item added to cart', async ({ loggedInPage }) => {
  const productPage = new ProductsPage(loggedInPage);
  const headerPage = new HeaderPage(loggedInPage);
  await setup.step('Click on ATC Button', async () => {
    for (let i = 0; i < 3; i++) {
      await productPage.clickProductPageBtn(productPage.addToCartBtn.first());
    }
    await expect(headerPage.locators.shoppingCartBadge).toBeVisible();
  });

  // End of authentication steps.
  await setup.step('Store the current state - item added to cart', async  () => {
    await loggedInPage.context().storageState({ path: STORAGE_STATE_ATC });
  })
});
