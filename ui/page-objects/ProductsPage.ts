import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn } = utility

export default class ProductsPage {
  readonly locators: Record<string,Locator>;

  constructor(readonly page: Page) {
    // Approach for V1 test
    this.locators = {
      productName: page.locator('div.inventory_item_name'),
      addToCartBtn: page.getByRole('button', { name: 'Add To Cart' }),
      removeFromCartBtn: page.getByRole('button', { name: 'Remove' })
    }
  }

  async clickProductPageBtn(element: Locator) {
    await clickElementBtn(element)
  }
}
