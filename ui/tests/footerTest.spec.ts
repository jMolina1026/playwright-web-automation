import { test, expect } from '../fixtures/loginFixture';
import { STORAGE_STATE } from '../../playwright.config';
import FooterPage from '../page-objects/FooterPage';
import site from '../helpers/domains'
import utility from '../helpers/utilities'

const { otherUrls, paths } = site;
const { chooseEnvDomain } = utility;

let footerPage: FooterPage;

test.describe('Given the user visits the Sauce Demo site,', () => {
  test.use({ storageState: STORAGE_STATE });

  test.beforeEach(async({ page }) => {
    footerPage = new FooterPage(page);
    await test.step('Navigate to the Footer Section', async () => {
      await page.goto(paths.home);
      await expect(page.getByText('Swag Labs')).toBeVisible();
      await footerPage.facebookBtn.scrollIntoViewIfNeeded();
    })
  })
  
  test.describe('And views the footer section', { tag: ['@footer', '@footerSanity', '@Sanity'] }, () => {
    test('TC-001 - Verify that all footer elements exist', async ({ page }) => {
      await test.step('Assert existence and visibility of all Footer elements', async () => {
        const footerValues = Object.values(footerPage.eachFooterElement);
        for (let fValue of footerValues) {
          await expect.soft(fValue).toBeAttached();
          await expect.soft(fValue).toBeVisible();

          if (fValue === footerPage.footerCopyRight) {
            await expect.soft(fValue).toHaveText(footerPage.copyRight);
          };
        };
        await page.waitForTimeout(500);
      });
    });
  });


  test.describe('And views the Footer section', { tag: ['@footer', '@footerRegression', '@Regression'] }, () => {
    test('TC-002 - Verify that clicking each social media icon executes proper site navigation', async ({ page }) => {
      await test.step('Click each social media option', async () => {
        const footerValues = Object.values(footerPage.eachFooterElement);
        let i = 0;
        for (let fValue of footerValues) {
          if (fValue !== footerPage.footerCopyRight) {
            // Open the new tab and wait/listen for it
            const [newTab] = await Promise.all([
              page.context().waitForEvent('page'),
              await footerPage.clickFooterBtn(fValue), // the action that opens a new tab
            ]);

            // Wait for the new tab to load content
            await newTab.waitForLoadState();
            const allPages = page.context().pages();

            // Ensure there is more than 1 tab and focus on it
            const tabIndex = 1;
            if (allPages.length > tabIndex) {
              await newTab.bringToFront();
              await expect(newTab).toHaveURL(Object.values(otherUrls)[i]);
              await newTab.close();
              await page.bringToFront();
              await expect(page).toHaveURL(chooseEnvDomain(process.env.ENVIRONMENT) + paths.home);
              await page.waitForTimeout(500);
            } else {
              throw new Error(`Tab at index ${tabIndex} doesn't exist.`);
            }
          };
          i++;
        };
      });
    });
  });
});
