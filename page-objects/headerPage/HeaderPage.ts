import { expect, type Locator, type Page } from '@playwright/test';

export default class HeaderPage {
  readonly locators: Record<string,Locator>;
  readonly headerLogo: Locator;


  constructor(readonly page: Page) {
    // Approach for V1 test
    this.locators = {
      headerLogo: page.locator('div.app_logo'),
    }
  }

}
