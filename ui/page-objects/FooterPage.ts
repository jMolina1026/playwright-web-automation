import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn, clickElementByIndex, selectElementOption } = utility

export default class FooterPage {
  // Locators
  readonly twitterBtn: Locator;
  readonly facebookBtn: Locator;
  readonly linkedInBtn: Locator;
  readonly footerCopyRight: Locator;

  // Strings
  readonly copyRight: string = '© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'

  constructor(readonly page: Page) {
    // Locators
    this.twitterBtn = page.getByRole('link', { name: 'Twitter' });
    this.facebookBtn = page.getByRole('link', { name: 'Facebook' });
    this.linkedInBtn = page.getByRole('link', { name: 'LinkedIn' });
    this.footerCopyRight = page.locator('div.footer_copy');
  }

  /**
   * @description Clicks a single element from a locator that returns only one element
   * @param {Locator} element - locator used to find an element
   */
  async clickFooterBtn(element: Locator) {
    await clickElementBtn(element);
  };

  /**
   * @description Object for footer options
   */
  get eachFooterElement(): Record<string, Locator> {
    return  {
      twitter: this.twitterBtn,
      fb: this.facebookBtn,
      linked: this.linkedInBtn,
      cr: this.footerCopyRight,
    };
  };

  /**
   * @description Clicks a single element from a locator that returns a list of elements
   * @param {Locator} element - locator used to find an element
   * @param {number} index - position of index in list
   */
  async clickProductBtnFromList(element: Locator, index: number) {
    await clickElementByIndex(element, index);
  };

  /**
   * @description
   * @param {Locator} element - locator used to find an element
   * @param {string} label - text of option in list
   */
  async selectFilterOption(element: Locator, label: string) {
    await selectElementOption(element, label);
  };

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
  };
}
