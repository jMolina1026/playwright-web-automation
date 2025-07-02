export default {
  stage: {
    domains: {
      sdBaseUrl: 'https://www.saucedemo.com'
    }
  },
  dev: {
    domains: {
      sdBaseUrl: 'https://www.saucedemo.com',
      sauceLabsUrl: 'https://saucelabs.com'
    }
  },
  production: {
    domains: {
      sdBaseUrl: 'https://www.saucedemo.com',
      sauceLabsUrl: 'https://saucelabs.com'
    }
  },
  paths: {
    home: '/inventory.html',
    cartPage: '/cart.html',
    itemDetailsPage: '/inventory-item.html?id=',
    yourInfoPage: '/checkout-step-one.html',
    finalOverview: '/checkout-step-two.html'
  },
  otherUrls: {
    twitter: 'https://x.com/saucelabs',
    facebook: 'https://www.facebook.com/saucelabs',
    linkedIn: 'https://www.linkedin.com/company/sauce-labs/',
    sauceLabsUrl: 'https://saucelabs.com'
  }
}
