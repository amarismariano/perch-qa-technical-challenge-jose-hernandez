import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Navigation steps
When('I am on the payment page', () => {
  cy.visit('/checkout/payment');
  cy.get('[data-testid="payment-page"]').should('be.visible');
});

// UI validation steps
Then('I should see the payment page title', () => {
  cy.get('h1').should('contain', 'Payment Information');
});

Then('I should see the back to address button', () => {
  cy.get('[data-testid="back-to-address"]').should('be.visible');
  cy.get('[data-testid="back-to-address"]').should('contain', 'Back to Address');
});

Then('I should see all payment form fields', () => {
  cy.get('[data-testid="cardholder-input"]').should('be.visible');
  cy.get('[data-testid="card-number-input"]').should('be.visible');
  cy.get('[data-testid="expiry-input"]').should('be.visible');
  cy.get('[data-testid="cvv-input"]').should('be.visible');
});

Then('I should see the place order button', () => {
  cy.get('[data-testid="complete-payment"]').should('be.visible');
  cy.get('[data-testid="complete-payment"]').should('contain', 'Place Order');
});

// Card holder validation steps
When('I clear the card holder name field', () => {
  cy.get('[data-testid="cardholder-input"]').clear();
});

When('I enter {string} in the card holder name field', (value) => {
  cy.get('[data-testid="cardholder-input"]').clear().type(value);
});

When('I blur the card holder name field', () => {
  cy.get('[data-testid="cardholder-input"]').blur();
});

Then('I should see {string} error for card holder', (errorMessage) => {
  cy.get('[data-testid="cardholder-input"]').parent().find('.error-message').should('contain', errorMessage);
});

Then('I should see "Card holder name must be 2-50 characters and contain only letters" error', () => {
  cy.get('[data-testid="cardholder-input"]').parent().find('.error-message').should('contain', 'Card holder name must be 2-50 characters and contain only letters');
});

Then('I should not see any error for card holder', () => {
  cy.get('[data-testid="cardholder-input"]').parent().find('.error-message').should('not.exist');
});

// Card number validation steps
When('I clear the card number field', () => {
  cy.get('[data-testid="card-number-input"]').clear();
});

When('I enter {string} in the card number field', (value) => {
  cy.get('[data-testid="card-number-input"]').clear().type(value);
});

When('I blur the card number field', () => {
  cy.get('[data-testid="card-number-input"]').blur();
});

Then('I should see {string} error for card number', (errorMessage) => {
  cy.get('[data-testid="card-number-input"]').parent().find('.error-message').should('contain', errorMessage);
});

Then('I should see "Card number must be 16 digits" error', () => {
  cy.get('[data-testid="card-number-input"]').parent().find('.error-message').should('contain', 'Card number must be 16 digits');
});

Then('I should not see any error for card number', () => {
  cy.get('[data-testid="card-number-input"]').parent().find('.error-message').should('not.exist');
});

Then('I should see the card number formatted as {string}', (formattedValue) => {
  cy.get('[data-testid="card-number-input"]').should('have.value', formattedValue);
});

// Expiry date validation steps
When('I clear the expiry date field', () => {
  cy.get('[data-testid="expiry-input"]').clear();
});

When('I enter {string} in the expiry date field', (value) => {
  cy.get('[data-testid="expiry-input"]').clear().type(value);
});

When('I blur the expiry date field', () => {
  cy.get('[data-testid="expiry-input"]').blur();
});

Then('I should see {string} error for expiry date', (errorMessage) => {
  cy.get('[data-testid="expiry-input"]').parent().find('.error-message').should('contain', errorMessage);
});

Then('I should see "Expiry date must be in MM/YY format" error', () => {
  cy.get('[data-testid="expiry-input"]').parent().find('.error-message').should('contain', 'Expiry date must be in MM/YY format');
});

Then('I should not see any error for expiry date', () => {
  cy.get('[data-testid="expiry-input"]').parent().find('.error-message').should('not.exist');
});

Then('I should see the expiry date formatted as {string}', (formattedValue) => {
  cy.get('[data-testid="expiry-input"]').should('have.value', formattedValue);
});

// CVV validation steps
When('I clear the CVV field', () => {
  cy.get('[data-testid="cvv-input"]').clear();
});

When('I enter {string} in the CVV field', (value) => {
  cy.get('[data-testid="cvv-input"]').clear().type(value);
});

When('I blur the CVV field', () => {
  cy.get('[data-testid="cvv-input"]').blur();
});

Then('I should see {string} error for CVV', (errorMessage) => {
  cy.get('[data-testid="cvv-input"]').parent().find('.error-message').should('contain', errorMessage);
});

Then('I should see "CVV must be 3 or 4 digits" error', () => {
  cy.get('[data-testid="cvv-input"]').parent().find('.error-message').should('contain', 'CVV must be 3 or 4 digits');
});

Then('I should not see any error for CVV', () => {
  cy.get('[data-testid="cvv-input"]').parent().find('.error-message').should('not.exist');
});

// Form validation steps
When('I submit the payment form', () => {
  cy.get('[data-testid="payment-form"]').submit();
});

When('I enter invalid payment data', () => {
  cy.get('[data-testid="cardholder-input"]').clear().type('123');
  cy.get('[data-testid="card-number-input"]').clear().type('123');
  cy.get('[data-testid="expiry-input"]').clear().type('12/2');
  cy.get('[data-testid="cvv-input"]').clear().type('12');
});

When('I enter valid payment data', () => {
  cy.get('[data-testid="cardholder-input"]').clear().type('John Doe');
  cy.get('[data-testid="card-number-input"]').clear().type('1234567890123456');
  cy.get('[data-testid="expiry-input"]').clear().type('12/25');
  cy.get('[data-testid="cvv-input"]').clear().type('123');
});

Then('I should see validation errors for all fields', () => {
  cy.get('.error-message').should('have.length.at.least', 4);
});

Then('I should see validation errors', () => {
  cy.get('.error-message').should('be.visible');
  cy.get('.error-message').should('contain', 'Card holder name must be 2-50 characters');
});

Then('I should see validation errors for invalid payment data', () => {
  cy.get('.error-message').should('be.visible');
  cy.get('.error-message').should('contain', 'Card holder name must be 2-50 characters');
});

Then('I should remain on the payment page', () => {
  cy.url().should('include', '/checkout/payment');
});

Then('I should see the processing state', () => {
  cy.get('[data-testid="complete-payment"]').should('contain', 'Processing...');
  cy.get('[data-testid="complete-payment"]').should('be.disabled');
});

Then('I should be redirected to the success page', () => {
  cy.url().should('include', '/checkout/success');
  cy.get('[data-testid="success-page"]').should('be.visible');
});

// Navigation steps
When('I click back to address', () => {
  cy.get('[data-testid="back-to-address"]').click();
});

Then('I should be redirected to the address page', () => {
  cy.url().should('include', '/checkout/address');
  cy.get('[data-testid="address-page"]').should('be.visible');
});

// UI attribute validation steps
Then('the card number field should have maxLength of {int}', (maxLength) => {
  cy.get('[data-testid="card-number-input"]').should('have.attr', 'maxLength', maxLength.toString());
});

Then('the expiry date field should have maxLength of {int}', (maxLength) => {
  cy.get('[data-testid="expiry-input"]').should('have.attr', 'maxLength', maxLength.toString());
});

Then('the CVV field should have maxLength of {int}', (maxLength) => {
  cy.get('[data-testid="cvv-input"]').should('have.attr', 'maxLength', maxLength.toString());
});

Then('the expiry date field should have placeholder {string}', (placeholder) => {
  cy.get('[data-testid="expiry-input"]').should('have.attr', 'placeholder', placeholder);
});
