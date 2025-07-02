// Products Details

const names = {
  backPackName: 'Sauce Labs Backpack',
  bikeLightName: 'Sauce Labs Bike Light',
  boltTShirtName: 'Sauce Labs Bolt T-Shirt',
  jacketName: 'Sauce Labs Fleece Jacket',
  onesieName: 'Sauce Labs Onesie',
  redTShirtName: 'Test.allTheThings() T-Shirt (Red)'
}

const descriptions = {
  backPackDesc: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
  bikeLightDesc: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
  boltTShirtDesc: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
  jacketDesc: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
  onesieDesc: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
  redTShirtDesc: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.'
}

const prices = {
  backPackPrice: '$29.99',
  bikeLightPrice: '$9.99',
  boltTShirtPrice: '$15.99',
  jacketPrice: '$49.99',
  onesiePrice: '$7.99',
  redShirtPrice: '$15.99'
}

const addToCartBtns = {
  backPackATC: 'Add to cart',
  bikeLightATC: 'Add to cart',
  boltTShirtATC: 'Add to cart',
  jacketATC: 'Add to cart',
  onesieATC: 'Add to cart',
  redShirtATC: 'Add to cart'
}

const filterOptions = {
  az: 'Name (A to Z)',
  za: 'Name (Z to A)',
  lohi: 'Price (low to high)',
  hilo: 'Price (high to low)'
}

const burgerMenuOptions = {
  allItems: 'All Items',
  about: 'About',
  logout: 'Logout',
  resetApp: 'Reset App State'
}

const shoppingCartTexts = {
  qty: 'QTY',
  desc: 'Description',
  contShopping: 'Continue Shopping',
  checkout: 'Checkout',
  itemQty: ['1', '1', '1'], // simulating if every item quantity had different amount added
  itemRemove: 'Remove'
}

const chkoutInfoPlaceHolders = {
  firstName: 'First Name',
  lastName: 'Last Name',
  zipCode: 'Zip/Postal Code',
  cancel: 'Cancel',
  continue: 'Continue'
}

const inputFields = {
  firstName: 'John',
  lastName: 'Smith',
  zipCode: '91606'
}

const finalOverviewTexts = {
  qty: 'QTY',
  desc: 'Description',
  payInfoLabel: 'Payment Information:',
  paymentInfo: 'SauceCard #31337',
  shippingInfoLabel: 'Shipping Information:',
  shipper: 'Free Pony Express Delivery!',
  priceTotalLabel: 'Price Total',
  subTotal: 'Item total: $',
  tax: 'Tax: $',
  total: 'Total: $',
  cancel: 'Cancel',
  finish: 'Finish'
}

export default {
  names,
  descriptions,
  prices,
  addToCartBtns,
  filterOptions,
  burgerMenuOptions,
  shoppingCartTexts,
  chkoutInfoPlaceHolders,
  inputFields,
  finalOverviewTexts
}
