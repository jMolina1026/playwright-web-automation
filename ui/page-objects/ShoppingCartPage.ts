import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn, getElementText } = utility

export default class ShoppingCartPage {
  readonly quantityLabel: Locator;
  readonly descLabel: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly itemQuantity:Locator;
  readonly removeItem: Locator;
  readonly continueShopping: Locator;
  readonly checkoutBtn: Locator;

  constructor(readonly page: Page) {
    // Locators
    this.quantityLabel = page.locator('div.cart_quantity_label');
    this.descLabel = page.locator('div.cart_desc_label');
    this.name = page.locator('div.inventory_item_name');
    this.description = page.locator('div.inventory_item_desc');
    this.price = page.locator('div.inventory_item_price');
    this.itemQuantity = page.locator('div.cart_quantity'); // <<< List
    this.removeItem = page.getByRole('button', { name: 'Remove' }); //'button.btn_secondary'; // <<< List
    this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' }); //'button#continue-shopping';
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' }); //'button#checkout';
  }

  get eachCartItem(): Record<string, Locator> {
    return {
      name: this.name,
      desc: this.description,
      price: this.price
    }
  }

  get eachCartLabel(): Record<string, Locator> {
    return {
      qty: this.quantityLabel,
      desc: this.descLabel,
      contShopping: this.continueShopping,
      checkout: this.checkoutBtn,
      itemQty: this.itemQuantity,
      itemRemove: this.removeItem
    }
  }

  async clickYourCartBtn(element: Locator) {
    await clickElementBtn(element)
  }

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
