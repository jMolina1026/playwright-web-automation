import { expect, type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn } = utility

export default class BurgerMenuPage {
  readonly closeBtn: Locator;
  readonly allItems: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly resetApp: Locator;
  readonly testst: Locator;
  readonly bmOptText: Record<string, string>;

  constructor(readonly page: Page) {
    // Locators
    this.closeBtn = page.getByRole('button', { name: 'Close Menu' });
    this.allItems = page.getByRole('link', { name: 'All Items' });
    this.about = page.getByRole('link', { name: 'About' });
    this.logout = page.getByRole('link', { name: 'Logout' });
    this.resetApp = page.getByRole('link', { name: 'Reset App State' });

    // Strings
    this.bmOptText = {
      allItems: 'All Items',
      about: 'About',
      logout: 'Logout',
      resetApp: 'Reset App State'
    }
  }

  async clickMenuOptionBtn(element: Locator) {
    await clickElementBtn(element)
  }

  /**
   * @description Array for burger menu options
   */
  get bmOptions(): Record<string, Locator> {
    return  {
      close: this.closeBtn,
      allItems: this.allItems,
      about: this.about,
      logout: this.logout,
      resetApp: this.resetApp
    };
  }
}
