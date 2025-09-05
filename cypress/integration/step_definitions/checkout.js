import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Checkout navigation steps
When('I click proceed to checkout', () => {
  cy.waitForCartToLoad();
  cy.clickProceedToCheckout();
});

Then('I should be redirected to the checkout address page', () => {
  cy.url().should('include', '/checkout/address');
  cy.get('[data-testid="address-page"]').should('be.visible');
});

Then('I should be redirected to the payment page', () => {
  cy.url().should('include', '/checkout/payment');
  cy.get('[data-testid="payment-page"]').should('be.visible');
});

Then('I should be redirected to the success page', () => {
  cy.url().should('include', '/success');
  cy.get('[data-testid="success-page"]').should('be.visible');
});

// Address form steps
Then('I should see the address form', () => {
  cy.get('[data-testid="address-form"]').should('be.visible');
});

When('I fill out the address form with valid data', () => {
  cy.fillAddressForm({
    firstName: 'John',
    email: 'john.doe@example.com',
    phone: '1234567890',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });
});

When('I fill out the address form with invalid data', () => {
  cy.fillAddressForm({
    firstName: 'J', // Too short
    email: 'invalid-email', // Invalid email
    phone: '123', // Too short
    street: '123', // Too short
    city: 'N', // Too short
    state: 'N', // Too short
    zipCode: '12', // Too short
    country: 'U' // Too short
  });
});

When('I submit the address form', () => {
  cy.submitAddressForm();
});

Then('I should see validation errors', () => {
  cy.get('.error-message').should('be.visible');
  cy.get('.error-message').should('contain', 'Name must be 2-30 characters');
});

Then('I should remain on the address page', () => {
  cy.url().should('include', '/checkout/address');
});

// Payment form steps
Given('I have completed the address form', () => {
  // Navigate to address page first
  cy.visit('/checkout/address');
  cy.get('[data-testid="address-page"]').should('be.visible');
  
  cy.fillAddressForm({
    firstName: 'John',
    email: 'john.doe@example.com',
    phone: '1234567890',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });
  cy.submitAddressForm();
});

When('I fill out the payment form with valid data', () => {
  cy.fillPaymentForm({
    cardNumber: '1234567890123456',
    expiryDate: '12/25',
    cvv: '123',
    cardHolder: 'John Doe'
  });
});

When('I fill out the payment form with invalid data', () => {
  cy.fillPaymentForm({
    cardNumber: '123', // Too short
    expiryDate: '12/2', // Invalid format
    cvv: '12', // Too short
    cardHolder: 'J' // Too short
  });
});

When('I submit the payment form', () => {
  cy.submitPaymentForm();
});

Then('I should see payment validation errors', () => {
  cy.get('.error-message').should('be.visible');
  cy.get('.error-message').should('contain', 'Card number must be 16 digits');
});

Then('I should remain on the payment page', () => {
  cy.url().should('include', '/checkout/payment');
});

// Success page steps
When('I complete the full checkout flow', () => {
  cy.completeCheckoutFlow();
});

Then('I should see the success page', () => {
  cy.url().should('include', '/success');
  cy.get('[data-testid="success-page"]').should('be.visible');
});

Then('I should see the order confirmation', () => {
  cy.get('[data-testid="order-info"]').should('be.visible');
  cy.get('[data-testid="order-number"]').should('be.visible');
});

// Detailed success page validations
Then('I should see the success page with all elements', () => {
  // Wait for URL to contain success and page to be fully loaded
  cy.url().should('include', '/success', { timeout: 10000 });
  
  // Verify success page container is visible
  cy.get('[data-testid="success-page"]').should('be.visible');
  
  // Wait for all elements to be loaded
  cy.get('.success-content').should('be.visible');
  
  // Verify success icon is present and visible
  cy.get('.success-icon').should('be.visible');
  cy.get('.success-icon svg').should('be.visible');
  cy.get('.success-icon svg circle').should('have.attr', 'fill', '#28a745');
  
  // Verify main success message
  cy.get('h1').should('contain', 'Thank You for Your Purchase!');
  
  // Verify order information section
  cy.get('[data-testid="order-info"]').should('be.visible');
  cy.get('.order-number').should('be.visible');
  cy.get('.order-number .label').should('contain', 'Order Number:');
  cy.get('[data-testid="order-number"]').should('be.visible');
  
  // Wait for order number to be populated and verify format
  cy.get('[data-testid="order-number"]').should('be.visible').then(($el) => {
    const orderNumber = $el.text();
    expect(orderNumber).to.match(/^#\d+$/);
  });
  
  // Verify confirmation message
  cy.get('.confirmation-message').should('be.visible');
  cy.get('.confirmation-message').should('contain', "We've received your order and will begin processing it right away.");
  cy.get('.confirmation-message').should('contain', "You'll receive a confirmation email shortly.");
  
  // Verify action buttons
  cy.get('.success-actions').should('be.visible');
  cy.get('[data-testid="continue-shopping"]').should('be.visible');
  cy.get('[data-testid="continue-shopping"]').should('contain', 'Continue Shopping');
  cy.get('[data-testid="view-orders"]').should('be.visible');
  cy.get('[data-testid="view-orders"]').should('contain', 'View Your Orders');
});

Then('I should see a valid order number', () => {
  // Wait for order number to be visible and populated
  cy.get('[data-testid="order-number"]').should('be.visible');
  cy.get('[data-testid="order-number"]').should('not.be.empty');
  
  cy.get('[data-testid="order-number"]').then(($el) => {
    const orderNumber = $el.text();
    expect(orderNumber).to.match(/^#\d+$/);
    expect(orderNumber.length).to.be.greaterThan(1); // At least # and one digit
  });
});

Then('I should be able to navigate to homepage from success page', () => {
  cy.get('[data-testid="continue-shopping"]').click();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.get('[data-testid="homepage"]').should('be.visible');
});

Then('I should be able to navigate to profile from success page', () => {
  cy.get('[data-testid="view-orders"]').click();
  cy.url().should('include', '/profile');
  cy.get('[data-testid="profile-page"]').should('be.visible');
});

Then('the order should be saved in localStorage', () => {
  cy.window().then((win) => {
    const orders = JSON.parse(win.localStorage.getItem('orders') || '[]');
    expect(orders).to.have.length.greaterThan(0);
    
    const latestOrder = orders[0]; // Orders are added at the beginning
    expect(latestOrder).to.have.property('orderNumber');
    expect(latestOrder).to.have.property('date');
    expect(latestOrder).to.have.property('items');
    expect(latestOrder).to.have.property('total');
    expect(latestOrder.items).to.be.an('array');
    expect(latestOrder.total).to.be.a('number');
  });
});

Then('the cart should be cleared after successful payment', () => {
  cy.window().then((win) => {
    const cart = win.localStorage.getItem('shopping-cart');
    expect(cart).to.be.null;
  });
});

Then('the payment status should be cleared after successful payment', () => {
  cy.window().then((win) => {
    const paymentStatus = win.localStorage.getItem('paymentStatus');
    expect(paymentStatus).to.be.null;
  });
});

Then('my cart should be empty', () => {
  cy.window().then((win) => {
    const cart = win.localStorage.getItem('cart');
    expect(cart).to.be.null;
  });
});

// Navigation steps
When('I click back to cart', () => {
  cy.get('[data-testid="back-to-cart"]').click();
});

When('I click back to address', () => {
  cy.get('[data-testid="back-to-address"]').click();
});

Then('I should be redirected to the cart page', () => {
  cy.url().should('include', '/cart');
  cy.get('[data-testid="cart-page"]').should('be.visible');
});

Then('I should be redirected to the address page', () => {
  cy.url().should('include', '/checkout/address');
  cy.get('[data-testid="address-page"]').should('be.visible');
});

// Success page navigation steps
When('I click continue shopping from success page', () => {
  cy.get('[data-testid="continue-shopping"]').click();
});

When('I click view orders from success page', () => {
  cy.get('[data-testid="view-orders"]').click();
});

Then('I should be redirected to the homepage', () => {
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.get('[data-testid="homepage"]').should('be.visible');
});

Then('I should be redirected to the profile page', () => {
  cy.url().should('include', '/profile');
  cy.get('[data-testid="profile-page"]').should('be.visible');
});
