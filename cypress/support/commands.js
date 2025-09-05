// ***********************************************
// Custom commands for Perch QA Challenge
// ***********************************************

// Navigation commands
Cypress.Commands.add('visitHomePage', () => {
  cy.visit('/');
  cy.get('[data-testid="home-page"]').should('be.visible');
});

Cypress.Commands.add('navigateToProfile', () => {
  cy.get('[data-testid="nav-to-profile"]').click();
  cy.url().should('include', '/profile');
});

Cypress.Commands.add('navigateToCart', () => {
  cy.get('[data-testid="nav-to-cart"]').click();
  cy.url().should('include', '/cart');
});

// Search commands
Cypress.Commands.add('searchProducts', (searchTerm) => {
  cy.get('[data-testid="product-search"]')
    .clear()
    .type(searchTerm);
});

Cypress.Commands.add('clearSearch', () => {
  cy.get('[data-testid="product-search"]').clear();
});

// Sorting commands
Cypress.Commands.add('sortByPriceAscending', () => {
  // First click to get to descending, then click again to get ascending
  cy.get('[data-testid="sort-price"]').click();
  cy.get('[data-testid="sort-price"]').click();
  cy.get('[data-testid="sort-price"]').should('contain', '↑');
});

Cypress.Commands.add('sortByPriceDescending', () => {
  // Single click to get to descending
  cy.get('[data-testid="sort-price"]').click();
  cy.get('[data-testid="sort-price"]').should('contain', '↓');
});

// Product interaction commands
Cypress.Commands.add('clickProductDetails', (productId) => {
  cy.get(`[data-testid="view-product-${productId}"]`).click();
});

Cypress.Commands.add('getProductCard', (productId) => {
  return cy.get(`[data-testid="product-${productId}"]`);
});

Cypress.Commands.add('getProductPrice', (productId) => {
  return cy.get(`[data-testid="price-${productId}"]`);
});

// Validation commands
Cypress.Commands.add('verifyProductsDisplayed', (expectedCount) => {
  cy.get('.product-card[data-testid^="product-"]').should('have.length', expectedCount);
});

Cypress.Commands.add('verifyNoResultsMessage', () => {
  cy.get('[data-testid="no-results"]').should('be.visible');
});

Cypress.Commands.add('verifyProductOrder', (expectedOrder) => {
  cy.get('[data-testid^="product-"]').each(($el, index) => {
    const productId = $el.attr('data-product-id');
    expect(productId).to.equal(expectedOrder[index].toString());
  });
});

// Wait commands
Cypress.Commands.add('waitForProductsToLoad', () => {
  cy.get('[data-testid^="product-"]').should('have.length.at.least', 1);
});

// ============================================
// PROFILE PAGE COMMANDS
// ============================================

// Navigation commands for Profile
Cypress.Commands.add('visitProfilePage', () => {
  cy.visit('/profile');
  cy.get('[data-testid="profile-page"]').should('be.visible');
});

Cypress.Commands.add('navigateBackToHome', () => {
  cy.get('[data-testid="back-to-home"]').click();
  cy.url().should('eq', Cypress.config().baseUrl);
});

// Profile information commands
Cypress.Commands.add('getProfileName', () => {
  return cy.get('[data-testid="profile-name"]');
});

Cypress.Commands.add('getProfileEmail', () => {
  return cy.get('[data-testid="profile-email"]');
});

Cypress.Commands.add('clickEditProfile', () => {
  cy.get('[data-testid="edit-profile"]').click();
});

Cypress.Commands.add('clickSaveProfile', () => {
  cy.get('[data-testid="save-profile"]').click();
});

Cypress.Commands.add('clickCancelEdit', () => {
  cy.get('[data-testid="cancel-edit"]').click();
});

// Profile editing commands
Cypress.Commands.add('editProfileName', (newName) => {
  cy.get('[data-testid="profile-name-input"]')
    .clear()
    .type(newName);
});

Cypress.Commands.add('editProfileEmail', (newEmail) => {
  cy.get('[data-testid="profile-email-input"]')
    .clear()
    .type(newEmail);
});

Cypress.Commands.add('verifyProfileName', (expectedName) => {
  cy.get('[data-testid="profile-name"]').should('contain', expectedName);
});

Cypress.Commands.add('verifyProfileEmail', (expectedEmail) => {
  cy.get('[data-testid="profile-email"]').should('contain', expectedEmail);
});

// Validation commands
Cypress.Commands.add('verifyNameError', (expectedError) => {
  cy.get('.error-message').should('contain', expectedError);
});

Cypress.Commands.add('verifyEmailError', (expectedError) => {
  cy.get('.error-message').should('contain', expectedError);
});

Cypress.Commands.add('verifySaveButtonDisabled', () => {
  cy.get('[data-testid="save-profile"]').should('be.disabled');
});

Cypress.Commands.add('verifySaveButtonEnabled', () => {
  cy.get('[data-testid="save-profile"]').should('not.be.disabled');
});

// Order history commands
Cypress.Commands.add('verifyNoOrdersMessage', () => {
  cy.get('[data-testid="no-orders"]').should('be.visible');
  cy.get('[data-testid="no-orders"]').should('contain', "You haven't placed any orders yet.");
});

Cypress.Commands.add('clickStartShopping', () => {
  cy.get('[data-testid="start-shopping"]').click();
  cy.url().should('eq', Cypress.config().baseUrl);
});

Cypress.Commands.add('verifyOrdersListVisible', () => {
  cy.get('[data-testid="orders-list"]').should('be.visible');
});

Cypress.Commands.add('verifyOrderCount', (expectedCount) => {
  // Select only order containers, not order products
  cy.get('.order-item[data-testid^="order-"]').should('have.length', expectedCount);
});

Cypress.Commands.add('verifyOrderDetails', (orderNumber, expectedTotal) => {
  cy.get(`[data-testid="order-${orderNumber}"]`).within(() => {
    cy.get('.order-number .value').should('contain', orderNumber);
    cy.get('.order-total .value').should('contain', `$${expectedTotal.toFixed(2)}`);
  });
});

Cypress.Commands.add('verifyOrderProduct', (orderNumber, productId, productName, quantity, price) => {
  cy.get(`[data-testid="order-${orderNumber}-product-${productId}"]`).within(() => {
    cy.get('.product-name').should('contain', productName);
    cy.get('.product-quantity').should('contain', `Quantity: ${quantity}`);
    cy.get('.product-price').should('contain', `$${price.toFixed(2)}`);
  });
});

// Local storage commands for testing
Cypress.Commands.add('setUserProfile', (profileData) => {
  cy.window().then((win) => {
    win.localStorage.setItem('userProfile', JSON.stringify(profileData));
  });
});

Cypress.Commands.add('setOrdersInStorage', (ordersData) => {
  cy.window().then((win) => {
    win.localStorage.setItem('orders', JSON.stringify(ordersData));
  });
});

Cypress.Commands.add('clearProfileStorage', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('userProfile');
    win.localStorage.removeItem('orders');
  });
});

Cypress.Commands.add('getStoredProfile', () => {
  return cy.window().then((win) => {
    const profile = win.localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  });
});

Cypress.Commands.add('getStoredOrders', () => {
  return cy.window().then((win) => {
    const orders = win.localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  });
});

// ============================================
// CART PAGE COMMANDS
// ============================================

// Navigation commands for Cart
Cypress.Commands.add('visitCartPage', () => {
  cy.visit('/cart');
  cy.get('[data-testid="cart-page"]').should('be.visible');
});

Cypress.Commands.add('clickContinueShopping', () => {
  cy.get('[data-testid="continue-shopping"]').click();
  cy.url().should('eq', Cypress.config().baseUrl);
});

Cypress.Commands.add('clickProceedToCheckout', () => {
  cy.get('[data-testid="proceed-to-checkout"]').click();
  cy.url().should('include', '/checkout/address');
});

// Cart state verification commands
Cypress.Commands.add('verifyEmptyCart', () => {
  cy.get('[data-testid="empty-cart"]').should('be.visible');
  cy.get('[data-testid="empty-cart"]').should('contain', 'Your cart is empty');
});

Cypress.Commands.add('verifyCartHasItems', (expectedCount) => {
  cy.get('[data-testid^="cart-item-"]').should('have.length', expectedCount);
});

Cypress.Commands.add('verifyCartItem', (productId, productName, price, quantity) => {
  cy.get(`[data-testid="cart-item-${productId}"]`).within(() => {
    cy.get('.item-name').should('contain', productName);
    cy.get(`[data-testid="item-price-${productId}"]`).should('contain', `$${price.toFixed(2)}`);
    cy.get(`[data-testid="quantity-${productId}"]`).should('have.value', quantity.toString());
  });
});

// Cart manipulation commands
Cypress.Commands.add('updateItemQuantity', (productId, newQuantity) => {
  cy.get(`[data-testid="quantity-${productId}"]`).select(newQuantity.toString());
});

Cypress.Commands.add('removeItemFromCart', (productId) => {
  cy.get(`[data-testid="remove-${productId}"]`).click();
});

Cypress.Commands.add('verifySubtotal', (expectedSubtotal) => {
  cy.get('[data-testid="subtotal"]').should('contain', `$${expectedSubtotal.toFixed(2)}`);
});

// Cart summary commands
Cypress.Commands.add('verifyCartSummaryVisible', () => {
  cy.get('[data-testid="cart-summary"]').should('be.visible');
});

Cypress.Commands.add('verifyCheckoutButtonVisible', () => {
  cy.get('[data-testid="proceed-to-checkout"]').should('be.visible');
  cy.get('[data-testid="proceed-to-checkout"]').should('contain', 'Proceed to Checkout');
});

// Local storage commands for cart testing
Cypress.Commands.add('setCartItems', (cartData) => {
  cy.window().then((win) => {
    win.localStorage.setItem('cart', JSON.stringify(cartData));
  });
});

Cypress.Commands.add('clearCart', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('cart');
  });
});

Cypress.Commands.add('getCartItems', () => {
  return cy.window().then((win) => {
    const cart = win.localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  });
});

// Cart calculation verification
Cypress.Commands.add('verifyCartCalculations', (expectedItems) => {
  let expectedTotal = 0;
  expectedItems.forEach(item => {
    expectedTotal += item.price * item.quantity;
  });
  
  cy.verifySubtotal(expectedTotal);
});

// Wait commands for cart
Cypress.Commands.add('waitForCartToLoad', () => {
  cy.get('[data-testid="cart-page"]').should('be.visible');
  // Wait for loading to disappear
  cy.get('[data-testid="loading"]').should('not.exist');
  // Wait for cart content to be ready
  cy.get('body').should(($body) => {
    expect($body.find('[data-testid="empty-cart"], [data-testid="cart-summary"]').length).to.be.greaterThan(0);
  });
});

// ============================================
// CHECKOUT COMMANDS
// ============================================

// Address form commands
Cypress.Commands.add('fillAddressForm', (addressData) => {
  cy.get('[data-testid="firstname-input"]').clear().type(addressData.firstName);
  cy.get('[data-testid="email-input"]').clear().type(addressData.email);
  cy.get('[data-testid="phone-input"]').clear().type(addressData.phone);
  cy.get('[data-testid="street-input"]').clear().type(addressData.street);
  cy.get('[data-testid="city-input"]').clear().type(addressData.city);
  cy.get('[data-testid="state-input"]').clear().type(addressData.state);
  cy.get('[data-testid="zipcode-input"]').clear().type(addressData.zipCode);
  cy.get('[data-testid="country-input"]').clear().type(addressData.country);
});

Cypress.Commands.add('submitAddressForm', () => {
  cy.get('[data-testid="address-form"]').submit();
});

// Payment form commands
Cypress.Commands.add('fillPaymentForm', (paymentData) => {
  cy.get('[data-testid="cardholder-input"]').clear().type(paymentData.cardHolder);
  cy.get('[data-testid="card-number-input"]').clear().type(paymentData.cardNumber);
  cy.get('[data-testid="expiry-input"]').clear().type(paymentData.expiryDate);
  cy.get('[data-testid="cvv-input"]').clear().type(paymentData.cvv);
});

Cypress.Commands.add('submitPaymentForm', () => {
  cy.get('[data-testid="payment-form"]').submit();
});

// Complete checkout flow
Cypress.Commands.add('completeCheckoutFlow', () => {
  // Navigate to address page
  cy.visit('/checkout/address');
  cy.get('[data-testid="address-page"]').should('be.visible');
  
  // Fill address form
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
  
  // Should be on payment page now
  cy.url().should('include', '/checkout/payment');
  cy.get('[data-testid="payment-page"]').should('be.visible');
  
  // Fill payment form
  cy.fillPaymentForm({
    cardNumber: '1234567890123456',
    expiryDate: '12/25',
    cvv: '123',
    cardHolder: 'John Doe'
  });
  cy.submitPaymentForm();
  
  // Wait for payment processing and redirect to success page
  cy.url().should('include', '/success', { timeout: 10000 });
  cy.get('[data-testid="success-page"]').should('be.visible');
});

// ============================================
// PRODUCT PAGE COMMANDS
// ============================================

Cypress.Commands.add('visitProductPage', (productId) => {
  cy.visit(`/product/${productId}`);
  cy.get('[data-testid="product-detail-page"]').should('be.visible');
});

Cypress.Commands.add('selectQuantity', (quantity) => {
  cy.get('[data-testid="quantity-selector"]').select(quantity.toString());
});

Cypress.Commands.add('clickAddToCart', () => {
  cy.get('[data-testid="add-to-cart"]').click();
});

Cypress.Commands.add('verifyProductDetails', (productName, price) => {
  cy.get('[data-testid="product-name"]').should('contain', productName);
  cy.get('[data-testid="product-price"]').should('contain', `$${price.toFixed(2)}`);
});

// ============================================
// COMPLETE SHOPPING FLOW COMMANDS
// ============================================

Cypress.Commands.add('addProductToCart', (productId, quantity = 1) => {
  // Navigate to homepage first
  cy.visitHomePage();
  
  // Click on the product to go to details
  cy.get(`[data-testid="product-${productId}"]`).within(() => {
    cy.get(`[data-testid="view-product-${productId}"]`).click();
  });
  
  // Verify we're on product page
  cy.url().should('include', `/product/${productId}`);
  cy.get('[data-testid="product-detail-page"]').should('be.visible');
  
  // Select quantity if not 1
  if (quantity !== 1) {
    cy.selectQuantity(quantity);
  }
  
  // Add to cart
  cy.clickAddToCart();
  
  // Should redirect to cart page
  cy.url().should('include', '/cart');
});

Cypress.Commands.add('addMultipleProductsToCart', (products) => {
  // Start from homepage
  cy.visitHomePage();
  
  products.forEach((product, index) => {
    // Click on the product to go to details
    cy.get(`[data-testid="product-${product.id}"]`).within(() => {
      cy.get(`[data-testid="view-product-${product.id}"]`).click();
    });
    
    // Verify we're on product page
    cy.url().should('include', `/product/${product.id}`);
    cy.get('[data-testid="product-detail-page"]').should('be.visible');
    
    // Select quantity if not 1
    if (product.quantity !== 1) {
      cy.selectQuantity(product.quantity);
    }
    
    // Add to cart
    cy.clickAddToCart();
    
    // Should redirect to cart page
    cy.url().should('include', '/cart');
    
    // If not the last product, go back to homepage to add more
    if (index < products.length - 1) {
      cy.clickContinueShoppingFromHeader();
    }
  });
});

// Fix for duplicate continue shopping buttons
Cypress.Commands.add('clickContinueShoppingFromEmptyCart', () => {
  cy.get('[data-testid="empty-cart"] [data-testid="continue-shopping"]').click();
});

Cypress.Commands.add('clickContinueShoppingFromHeader', () => {
  cy.get('.cart-header [data-testid="continue-shopping"]').click();
});

