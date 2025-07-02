/**
 * @description This is a helper module that contains global variables
 * and aux functions used across this Layout Manager Project.
 */
// Imports
import { Locator, Page } from '@playwright/test';
import site from '../helpers/domains'

const { stage, dev, production } = site;

/**
 * ============================================================
 *  ARRAYS, MAPS, CONSTANTS, VARIABLES, OBJECTS...
 * ===========================================================
 */

/**
 * @description Choose which environment to set domain
 * @param env - Environment set by ENVIRONMENT variable defined in CLI, options => stage, dev, production
 * @returns domain
 */
function chooseEnvDomain(env: string | undefined) {
  switch (env) {
    case 'production': return production.domains.sdBaseUrl;
    case 'dev': return dev.domains.sdBaseUrl;
    case 'stage': return stage.domains.sdBaseUrl;
    default: throw new Error(`Unknown platform environment: ${env}, \nshould be one of: stage, dev, production`);
  }
}

/**
 * @description Choose which environment to receive paths from
 * @param env - Environment set by ENVIRONMENT variable defined in CLI, options => stage, dev, production
 * @returns path to the home page
 */
// function chooseEnvHome(env: string | undefined) {
//   switch (env) {
//     case 'production': return production.paths.home;
//     case 'dev': return dev.paths.home;
//     case 'stage': return stage.paths.home;
//     default: throw new Error(`Unknown platform environment: ${env}, \nshould be one of: stage, dev, production`);
//   }
// }

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
  chooseEnvDomain,
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
