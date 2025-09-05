Feature: Cart Page Functionality
  As a user
  I want to manage my shopping cart
  So that I can review and modify my purchases before checkout

  Background:
    Given I am on the cart page

  @cart @basic
 

  Scenario: User can view empty cart
    Then I should see the empty cart message
    And I should see the continue shopping button

  @cart @navigation
  Scenario: User can navigate from empty cart
    When I click continue shopping
    Then I should be redirected to the homepage

  @cart @items
  Scenario: User can view single item in cart
    Given I have a single item in my cart
    Then I should see the cart summary
    And I should see 1 item in the cart
    And I should see item 1 "Classic White Sneakers" with price $79.99 and quantity 1
    And I should see subtotal $79.99

  @cart @items
  Scenario: User can view multiple items in cart
    Given I have multiple items in my cart
    Then I should see the cart summary
    And I should see 2 items in the cart
    And I should see item 1 "Classic White Sneakers" with price $79.99 and quantity 2
    And I should see item 2 "Premium Leather Watch" with price $149.99 and quantity 1
    And I should see subtotal $309.97

  @cart @items
  Scenario: User can view all items in cart
    Given I have all items in my cart
    Then I should see the cart summary
    And I should see 3 items in the cart
    And I should see item 1 "Classic White Sneakers" with price $79.99 and quantity 3
    And I should see item 2 "Premium Leather Watch" with price $149.99 and quantity 2
    And I should see item 3 "Wireless Headphones" with price $199.99 and quantity 1
    And I should see subtotal $739.94

  @cart @quantity
  Scenario: User can increase item quantity
    Given I have a single item in my cart
    And I update quantity of item 1 to 3
    Then I should see item 1 "Classic White Sneakers" with price $79.99 and quantity 3
    And I should see subtotal $239.97

  @cart @quantity
  Scenario: User can decrease item quantity
    Given I have multiple items in my cart
    And I update quantity of item 1 to 1
    Then I should see item 1 "Classic White Sneakers" with price $79.99 and quantity 1
    And I should see subtotal $229.98

  @cart @quantity
  Scenario: User can set quantity to zero to remove item
    Given I have multiple items in my cart
    And I update quantity of item 1 to 0
    Then I should see 1 item in the cart
    And I should see subtotal $149.99

  @cart @removal
  Scenario: User can remove item from cart
    Given I have multiple items in my cart
    And I remove item 1 from the cart
    Then I should see 1 item in the cart
    And I should see subtotal $149.99

  @cart @removal
  Scenario: User can remove all items from cart
    Given I have a single item in my cart
    And I remove item 1 from the cart
    Then I should see the empty cart message

  @cart @calculation
  Scenario: Cart calculations are correct with high quantities
    Given I have high quantity items in my cart
    Then I should see item 1 "Classic White Sneakers" with price $79.99 and quantity 5
    And I should see subtotal $399.95

  @cart @navigation
  Scenario: User can proceed to checkout
    Given I have a single item in my cart
    And I click proceed to checkout
    Then I should be redirected to the checkout address page


  @cart @flow
  Scenario: Complete shopping flow from homepage to cart
    Given I have a single item in my cart
    Then I should see the cart summary
    And I should see 1 item in the cart
    And I should see item 1 "Classic White Sneakers" with price $79.99 and quantity 1
    And I should see subtotal $79.99

  @cart @flow
  Scenario: User can add multiple products through shopping flow
    Given I have multiple items in my cart
    Then I should see the cart summary
    And I should see 2 items in the cart
    And I should see item 1 "Classic White Sneakers" with price $79.99 and quantity 2
    And I should see item 2 "Premium Leather Watch" with price $149.99 and quantity 1
    And I should see subtotal $309.97
