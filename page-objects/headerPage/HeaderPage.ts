import { expect, type Locator, type Page } from '@playwright/test';

export default class HeaderPage {
  readonly locators: Record<string,Locator>;

  constructor(readonly page: Page) {
    // Approach for V1 test
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
}
