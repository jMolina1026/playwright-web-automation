import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn, getElementText } = utility

export default class ShoppingCartPage {
  readonly productName: Locator;
  readonly productDesc: Locator;
  readonly productPrice: Locator;


  constructor(readonly page: Page) {
    // Locators
    this.productName = page.locator('div.inventory_item_name');
    this.productDesc = page.locator('div.inventory_item_desc');
    this.productPrice = page.locator('div.inventory_item_price');
  }

  get eachCartItem(): Record<string, Locator> {
    return {
      name: this.productName,
      desc: this.productDesc,
      price: this.productPrice
    }
  }

  // async clickProductDetailsBtn(element: Locator) {
  //   await clickElementBtn(element)
  // }

  // async getProductDetailsText(element: Locator) {
  //   return getElementText(element)
  // };

  //   /**
  //  * @description This switches between different objects to use in text comparison for elements
  //  * @param {string} itemKey - the product/item key tied to a specific locator
  //  * @returns string/text
  //  */
  //   async switchProdDetailsObj(itemKey: string) {
  //     let itemText: string;
  //     switch (itemKey) {
  //       case 'name' : itemText = await this.getProductDetailsText(this.detailsName);  break;
  //       case 'desc' : itemText = await this.getProductDetailsText(this.detailsDesc);  break;
  //       case 'price': itemText = await this.getProductDetailsText(this.detailsPrice); break;
  //       default:
  //         throw new Error(`Unknown itemKey: ${itemKey}`);
  //     }
  //     return itemText;
  //   };
}
