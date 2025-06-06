/**
 * @description This is a helper module that contains global variables
 * and aux functions used across this Layout Manager Project.
 */
// Imports
import { Locator, Page } from '@playwright/test';

/**
 * ============================================================
 *  ARRAYS, MAPS, CONSTANTS, VARIABLES, OBJECTS...
 * ===========================================================
 */


async function gotoSite(page: Page, path: string) {
  await page.goto(path);
}

async function wait(page: Page, ms: number) {
  await page.waitForTimeout(ms);
}

async function closeBrowser(page: Page, ms: number) {
  await page.close();
}

async function waitForLoadState(page: Page, event: 'load') {
  await page.waitForLoadState(event);
}

async function isElementPresent(page: Page, element: Locator) {
  const isPresent = await element.count() > 0;
  return isPresent
}

async function clickElementBtn(element: Locator) {
  await element.click();
}

async function clickElementByIndex(element: Locator, index: number) {
  await element.nth(index).click();
}

async function selectElementOption(element: Locator, label: string) {
  await element.selectOption(label);
}

async function getElementText(element: Locator) {
  return await element.innerText();
}

export default {
  gotoSite,
  wait,
  closeBrowser,
  waitForLoadState,
  isElementPresent,
  clickElementBtn,
  clickElementByIndex,
  selectElementOption,
  getElementText
}
