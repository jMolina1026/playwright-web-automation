import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn } = utility

export default class ProductDetailsPage {
  readonly backBtn: Locator;

  constructor(readonly page: Page) {
    // Locators
    this.backBtn = page.getByRole('button', { name: 'Back to products' })
  }

  async clickProductDetailsBtn(element: Locator) {
    await clickElementBtn(element)
  }
}
