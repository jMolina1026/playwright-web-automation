import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn } = utility

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
}
