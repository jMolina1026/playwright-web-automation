import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../../helpers/utilities';

const { clickElementBtn } = utility

export default class ProductsPage {
  readonly locators: Record<string,Locator>;

  constructor(readonly page: Page) {
    // Approach for V1 test
    this.locators = {
      addToCartBtn: page.getByRole('button', { name: 'Add To Cart' })
    }
  }

  async clickProductPageBtn(element: Locator) {
    await clickElementBtn(element)
  }
}
