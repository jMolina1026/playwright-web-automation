import { type Locator, type Page } from '@playwright/test';
import utility from '../helpers/utilities';

const { clickElementBtn } = utility;

class HeaderPage {
  // Locators
  readonly locators: Record<string,Locator>;

  // Strings
  readonly appLogoText: string = 'Swag Labs';
  readonly secondTitleText: string = 'Products';
  readonly activeFilterText: string = 'Name (A to Z)';

  constructor(readonly page: Page) {
    // Locators
    this.locators = {
      headerLogo: page.getByText('Swag Labs'),
      burgerMenuButton: page.getByRole('button', { name: "Open menu" }),
      shoppingCartButton: page.locator('a.shopping_cart_link'),
      shoppingCartBadge: page.locator('span.shopping_cart_badge'),
      headerSecondTitle: page.locator('span.title'),
      headerSecondaryFilter: page.getByRole('combobox'),
      headerSecFilterActive: page.locator('span.active_option')
    }
  }

  async clickHeaderButn(element: Locator) {
    await clickElementBtn(element);
  }
}

export default HeaderPage;
