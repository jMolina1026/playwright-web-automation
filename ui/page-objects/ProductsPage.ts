import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn } = utility

export default class ProductsPage {
  readonly locators: Record<string,Locator>;
  readonly productName: Locator;
  readonly productDesc: Locator;
  readonly productPrice: Locator;
  readonly addToCartBtn: Locator;
  readonly removeFromCartBtn: Locator;
  readonly productImage: Locator;

  constructor(readonly page: Page) {
    // Locators
    this.productName = page.locator('div.inventory_item_name');
    this.productDesc = page.locator('div.inventory_item_desc');
    this.productPrice = page.locator('div.inventory_item_price');
    this.addToCartBtn = page.getByRole('button', { name: 'Add To Cart' });
    this.removeFromCartBtn = page.getByRole('button', { name: 'Remove' });
    this.productImage = page.locator('img.inventory_item_img');
  }

  async clickProductPageBtn(element: Locator) {
    await clickElementBtn(element)
  }

  /**
   * @description Object for product options
   */
  get eachProductElement(): Record<string, Locator> {
    return  {
      prodName: this.productName,
      prodDesc: this.productDesc,
      prodPrice: this.productPrice,
      atcBtn: this.addToCartBtn,
      // rfcBten: this.removeFromCartBtn,
      prodImg: this.productImage
    };
  }

  /**
   * @description This switches between different objects to use in text comparison for elements
   * @param {string} prodKey - the product/item key tied to a specific locator
   * @param {number} index - index position of an element from a list of elements
   * @param {object} names - object of texts of the item names
   * @param {object} desc - object of texts of the item descriptions
   * @param {object} price - object of texts of the prices
   * @param {object} atc - object of texts for the add to cart button
   * @returns 
   */
  switchProductObj(prodKey: string, index: number, names: object, desc: object, price: object, atc: object) {
    let text: string;
    switch (prodKey) {
      case 'prodName' : text = Object.values(names)[index]; break;
      case 'prodDesc' : text = Object.values(desc)[index];  break;
      case 'prodPrice': text = Object.values(price)[index]; break;
      case 'atcBtn'   : text = Object.values(atc)[index];   break;
      default:
        throw new Error(`Unknown prodKey: ${prodKey}`);
    }
    return text;
  }
}
