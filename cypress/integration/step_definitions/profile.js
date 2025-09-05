import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Background and navigation steps
Given('I am on the profile page', () => {
  cy.clearProfileStorage();
  cy.visitProfilePage();
});

// Page verification steps
Then('I should see the profile page header', () => {
  cy.get('[data-testid="profile-page"]').should('be.visible');
  cy.get('h1').should('contain', 'Your Profile');
});

Then('I should see the personal information section', () => {
  cy.get('.profile-card').should('be.visible');
  cy.get('.profile-card h2').should('contain', 'Personal Information');
});

Then('I should see the order history section', () => {
  cy.get('.orders-card').should('be.visible');
  cy.get('.orders-card h2').should('contain', 'Order History');
});

Then('I should see the back to home button', () => {
  cy.get('[data-testid="back-to-home"]').should('be.visible');
  cy.get('[data-testid="back-to-home"]').should('contain', '← Back to Home');
});

// Profile information verification steps
Then('I should see the default profile name {string}', (expectedName) => {
  cy.verifyProfileName(expectedName);
});

Then('I should see the default profile email {string}', (expectedEmail) => {
  cy.verifyProfileEmail(expectedEmail);
});

Then('I should see the edit profile button', () => {
  cy.get('[data-testid="edit-profile"]').should('be.visible');
  cy.get('[data-testid="edit-profile"]').should('contain', 'Edit Profile');
});

// Profile editing steps
When('I click on edit profile', () => {
  cy.clickEditProfile();
});

Given('I have a default profile in storage', () => {
  cy.fixture('profileData').then((data) => {
    cy.setUserProfile(data.profiles.defaultUser);
  });
});

Then('I should see the profile editing form', () => {
  cy.get('[data-testid="profile-name-input"]').should('be.visible');
  cy.get('[data-testid="profile-email-input"]').should('be.visible');
});

Then('I should see the save and cancel buttons', () => {
  cy.get('[data-testid="save-profile"]').should('be.visible');
  cy.get('[data-testid="cancel-edit"]').should('be.visible');
});

When('I edit the name to {string}', (newName) => {
  cy.editProfileName(newName);
});

When('I edit the email to {string}', (newEmail) => {
  cy.editProfileEmail(newEmail);
});

When('I click save profile', () => {
  cy.clickSaveProfile();
});

Then('I should see the updated name {string}', (expectedName) => {
  cy.verifyProfileName(expectedName);
});

Then('I should see the updated email {string}', (expectedEmail) => {
  cy.verifyProfileEmail(expectedEmail);
});

Then('I should see the edit profile button again', () => {
  cy.get('[data-testid="edit-profile"]').should('be.visible');
});

// Validation steps
Then('I should see the name validation error', () => {
  cy.verifyNameError('Name must be at least 3 characters and contain only letters');
});

Then('I should see the email validation error', () => {
  cy.verifyEmailError('Please enter a valid email address');
});

Then('the save button should be disabled', () => {
  cy.verifySaveButtonDisabled();
});

When('I click cancel edit', () => {
  cy.clickCancelEdit();
});

Then('I should see the original profile information', () => {
  cy.verifyProfileName('John Doe');
  cy.verifyProfileEmail('john.doe@example.com');
});

// Order history steps
Given('there are no orders in storage', () => {
  cy.clearProfileStorage();
});

Given('there is a single order in storage', () => {
  cy.fixture('ordersData').then((data) => {
    cy.setOrdersInStorage(data.orders.singleOrder);
  });
});


Given('there is a large order in storage', () => {
  cy.fixture('ordersData').then((data) => {
    cy.setOrdersInStorage(data.orders.largeOrder);
  });
});


When('I refresh the profile page', () => {
  cy.reload();
  cy.get('[data-testid="profile-page"]').should('be.visible');
});

Then('I should see the no orders message', () => {
  cy.verifyNoOrdersMessage();
});

Then('I should see the start shopping button', () => {
  cy.get('[data-testid="start-shopping"]').should('be.visible');
  cy.get('[data-testid="start-shopping"]').should('contain', 'Start Shopping');
});

When('I click start shopping', () => {
  cy.clickStartShopping();
});

Then('I should be redirected to the homepage', () => {
  cy.url().should('eq', Cypress.config().baseUrl);
});

Then('I should see the orders list', () => {
  cy.verifyOrdersListVisible();
});

Then('I should see {int} order', (expectedCount) => {
  cy.verifyOrderCount(expectedCount);
});

Then('I should see {int} orders', (expectedCount) => {
  cy.verifyOrderCount(expectedCount);
});

Then('I should see order {string} with total ${float}', (orderNumber, expectedTotal) => {
  cy.verifyOrderDetails(orderNumber, expectedTotal);
});

Then('I should see product {int} {string} with quantity {int} and price ${float}', (productId, productName, quantity, price) => {
  // Get the first order number to verify the product
  cy.get('[data-testid^="order-"]').first().then(($order) => {
    const orderNumber = $order.attr('data-testid').replace('order-', '');
    cy.verifyOrderProduct(orderNumber, productId, productName, quantity, price);
  });
});


// Navigation steps
When('I click back to home', () => {
  cy.navigateBackToHome();
});

// Persistence steps
When('I navigate to another page', () => {
  cy.visit('/');
});

When('I return to the profile page', () => {
  cy.visitProfilePage();
});
