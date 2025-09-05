Feature: Checkout Flow
  As a user
  I want to complete the checkout process
  So that I can purchase items from my cart

  Background:
    Given I have a single item in my cart

  @checkout @address
  Scenario: User can proceed to checkout from cart
    When I click proceed to checkout
    Then I should be redirected to the checkout address page
    And I should see the address form

  @checkout @address
  Scenario: User can fill out address form with valid data
    When I click proceed to checkout
    And I fill out the address form with valid data
    And I submit the address form
    Then I should be redirected to the payment page

  @checkout @address
  Scenario: User cannot submit address form with invalid data
    When I click proceed to checkout
    And I fill out the address form with invalid data
    And I submit the address form
    Then I should see validation errors
    And I should remain on the address page

  @checkout @payment
  Scenario: User can fill out payment form with valid data
    Given I have completed the address form
    When I fill out the payment form with valid data
    And I submit the payment form
    Then I should be redirected to the success page

  @checkout @payment
  Scenario: User cannot submit payment form with invalid data
    Given I have completed the address form
    When I fill out the payment form with invalid data
    And I submit the payment form
    Then I should see payment validation errors
    And I should remain on the payment page

  @checkout @success
  Scenario: User can complete the full checkout flow
    When I complete the full checkout flow
    Then I should see the success page
    And I should see the order confirmation
    And my cart should be empty

  @checkout @success @detailed
  Scenario: User sees complete success page with all elements
    When I complete the full checkout flow
    Then I should see the success page with all elements
    And I should see a valid order number
    And the order should be saved in localStorage
    And the cart should be cleared after successful payment
    And the payment status should be cleared after successful payment

  @checkout @success @navigation
  Scenario: User can navigate from success page to homepage
    When I complete the full checkout flow
    Then I should see the success page with all elements
    When I click continue shopping from success page
    Then I should be redirected to the homepage

  @checkout @success @navigation
  Scenario: User can navigate from success page to profile
    When I complete the full checkout flow
    Then I should see the success page with all elements
    When I click view orders from success page
    Then I should be redirected to the profile page

  @checkout @navigation
  Scenario: User can navigate back from address page
    When I click proceed to checkout
    And I click back to cart
    Then I should be redirected to the cart page

  @checkout @navigation
  Scenario: User can navigate back from payment page
    Given I have completed the address form
    When I click back to address
    Then I should be redirected to the address page

