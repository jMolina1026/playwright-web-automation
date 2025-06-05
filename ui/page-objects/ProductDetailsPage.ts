import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn, getElementText } = utility

export default class ProductDetailsPage {
  readonly detailsName: Locator;
  readonly detailsDesc: Locator;
  readonly detailsPrice: Locator;
  readonly detailsATC: Locator;
  readonly detailsImg: Locator;
  readonly backBtn: Locator;

  constructor(readonly page: Page) {
    // Locators
    this.detailsName = page.locator('div.inventory_details_name');
    this.detailsDesc = page.locator('div.inventory_details_desc');
    this.detailsPrice = page.locator('div.inventory_details_price');
    this.detailsATC = page.getByRole('button', { name: 'Add to cart' });
    this.detailsImg = page.locator('img.inventory_details_img');
    this.backBtn = page.getByRole('button', { name: 'Back to products' });
  }

  get eachItemDetail(): Record<string, Locator> {
    return {
      name: this.detailsName,
      desc: this.detailsDesc,
      price: this.detailsPrice,
      atc: this.detailsATC,
      backBtn: this.backBtn,
      img: this.detailsImg
    }
  }

  async clickProductDetailsBtn(element: Locator) {
    await clickElementBtn(element)
  }
}
