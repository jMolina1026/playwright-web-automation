import { test, expect } from '../fixtures/page-objects-Fixtures';
import { STORAGE_STATE_ATC } from '../../playwright.config';
import site from '../helpers/domains';

const { paths } = site;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE_ATC })

  test.beforeEach(async({ page }) => {
    await test.step('Navigate to Product Page', async () => {
      await page.goto(paths.home);
      await expect(page.getByText('Swag Labs')).toBeVisible();
    })
  })
  
  test('TC-001 - Verify that all Header elements exist', { 
    tag: ['@header', '@headerSanity', '@Sanity'] }, 
    async ({ headerPage }) => {
      await test.step('Assert existence and visibility of all necessary elements', async () => {
        for (const element of Object.values(headerPage.locators)) {
          console.log('element = ' + element);
          await expect.soft((element)).toBeAttached();
          await expect.soft((element)).toBeVisible();
        }
      });

      await test.step('Assert the required texts of each element', async () => {
        await expect.soft(headerPage.locators.headerLogo).toHaveText(headerPage.appLogoText);
        await expect.soft(headerPage.locators.headerSecondTitle).toHaveText(headerPage.secondTitleText);
        await expect.soft(headerPage.locators.headerSecFilterActive).toHaveText(headerPage.activeFilterText);
      });
  });
});
