import { test as baseTest } from '@playwright/test';
import BurgerMenuPage from '../page-objects/BurgerMenuPage';
import FooterPage from '../page-objects/FooterPage';
import HeaderPage from '../page-objects/HeaderPage';
import ProductDetailsPage from '../page-objects/ProductDetailsPage';
import ProductsPage from '../page-objects/ProductsPage';
import ShoppingCartPage from '../page-objects/ShoppingCartPage';

type pageObjectFixtures = {
  burgerMenuPage: BurgerMenuPage,
  footerPage: FooterPage,
  headerPage: HeaderPage,
  prodDetailsPage: ProductDetailsPage,
  productPage: ProductsPage,
  shoppingCartPage: ShoppingCartPage
}

export const test = baseTest.extend<pageObjectFixtures>({
  burgerMenuPage: async ({ page }, use) => {
    await use(new BurgerMenuPage(page));
  },

  footerPage: async ({ page }, use) => {
    await use (new FooterPage(page));
  },

  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },

  prodDetailsPage: async ( { page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  }
})

export { expect } from '@playwright/test';
