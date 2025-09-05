import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Background and navigation steps
Given('I am on the cart page', () => {
  cy.clearCart();
  cy.visitCartPage();
});

// Cart state setup steps - Using real shopping flow
Given('I have a single item in my cart', () => {
  cy.clearCart();
  cy.addProductToCart(1, 1); // Add Classic White Sneakers
});

Given('I have multiple items in my cart', () => {
  cy.clearCart();
  cy.addMultipleProductsToCart([
    { id: 1, quantity: 2 }, // Add 2x Classic White Sneakers
    { id: 2, quantity: 1 }  // Add 1x Premium Leather Watch
  ]);
});

Given('I have all items in my cart', () => {
  cy.clearCart();
  cy.addMultipleProductsToCart([
    { id: 1, quantity: 3 }, // Add 3x Classic White Sneakers
    { id: 2, quantity: 2 }, // Add 2x Premium Leather Watch
    { id: 3, quantity: 1 }  // Add 1x Wireless Headphones
  ]);
});

Given('I have high quantity items in my cart', () => {
  cy.clearCart();
  cy.addProductToCart(1, 5); // Add 5x Classic White Sneakers
});

// Page refresh and navigation steps
When('I refresh the cart page', () => {
  cy.reload();
  cy.waitForCartToLoad();
});

When('I click continue shopping', () => {
  // Use the specific button from empty cart to avoid ambiguity
  cy.clickContinueShoppingFromEmptyCart();
});

When('I click proceed to checkout', () => {
  cy.clickProceedToCheckout();
});


// Empty cart verification steps
Then('I should see the empty cart message', () => {
  cy.verifyEmptyCart();
});

Then('I should see the continue shopping button', () => {
  cy.get('[data-testid="continue-shopping"]').should('be.visible');
  cy.get('[data-testid="continue-shopping"]').should('contain', 'Continue Shopping');
});

// Cart content verification steps
Then('I should see the cart summary', () => {
  cy.waitForCartToLoad();
  cy.verifyCartSummaryVisible();
});

Then('I should see {int} item in the cart', (expectedCount) => {
  cy.waitForCartToLoad();
  cy.verifyCartHasItems(expectedCount);
});

Then('I should see {int} items in the cart', (expectedCount) => {
  cy.waitForCartToLoad();
  cy.verifyCartHasItems(expectedCount);
});

Then('I should see item {int} {string} with price ${float} and quantity {int}', (productId, productName, price, quantity) => {
  cy.waitForCartToLoad();
  cy.verifyCartItem(productId, productName, price, quantity);
});

Then('I should see subtotal ${float}', (expectedSubtotal) => {
  cy.waitForCartToLoad();
  cy.verifySubtotal(expectedSubtotal);
});

// Cart manipulation steps
When('I update quantity of item {int} to {int}', (productId, newQuantity) => {
  cy.waitForCartToLoad();
  cy.updateItemQuantity(productId, newQuantity);
});

When('I remove item {int} from the cart', (productId) => {
  cy.waitForCartToLoad();
  cy.removeItemFromCart(productId);
});

// Navigation verification steps
Then('I should be redirected to the homepage', () => {
  cy.url().should('eq', Cypress.config().baseUrl);
});

Then('I should be redirected to the checkout address page', () => {
  cy.url().should('include', '/checkout/address');
});

// Cart calculations verification
Then('the cart calculations should be correct', () => {
  // This step can be used for complex calculation verifications
  cy.get('[data-testid^="cart-item-"]').then(($items) => {
    let total = 0;
    $items.each((index, item) => {
      const $item = Cypress.$(item);
      const price = parseFloat($item.find('[data-testid^="item-price-"]').text().replace('$', ''));
      const quantity = parseInt($item.find('[data-testid^="quantity-"]').val());
      total += price * quantity;
    });
    
    cy.get('[data-testid="subtotal"]').should('contain', `$${total.toFixed(2)}`);
  });
});

// Basic shopping flow steps
Given('I am on the homepage', () => {
  cy.clearCart();
  cy.visitHomePage();
});

When('I click on {string} for the first product', (buttonText) => {
  cy.get('.product-card[data-testid^="product-"]').first().within(() => {
    cy.get('.view-details-button').contains(buttonText).click();
  });
});

When('I click add to cart', () => {
  cy.clickAddToCart();
});

Then('I should be redirected to the cart page', () => {
  cy.url().should('include', '/cart');
  cy.waitForCartToLoad();
});

Then('I should see {int} item in the cart', (expectedCount) => {
  cy.waitForCartToLoad();
  cy.verifyCartHasItems(expectedCount);
});

Then('I should see item {int} {string} with price ${float} and quantity {int}', (productId, productName, price, quantity) => {
  cy.waitForCartToLoad();
  cy.verifyCartItem(productId, productName, price, quantity);
});

Then('I should see subtotal ${float}', (expectedSubtotal) => {
  cy.waitForCartToLoad();
  cy.verifySubtotal(expectedSubtotal);
});
