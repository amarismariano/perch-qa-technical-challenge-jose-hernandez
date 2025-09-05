Feature: Profile Page Functionality
  As a user
  I want to manage my profile information and view order history
  So that I can keep my information updated and track my purchases

  Background:
    Given I am on the profile page

  @smoke @profile
  Scenario: User can view the profile page
    Then I should see the profile page header
    And I should see the personal information section
    And I should see the order history section
    And I should see the back to home button

  @profile @editing
  Scenario: User can view default profile information
    Then I should see the default profile name "John Doe"
    And I should see the default profile email "john.doe@example.com"
    And I should see the edit profile button

  @profile @editing
  Scenario: User can edit profile information
    When I click on edit profile
    Then I should see the profile editing form
    And I should see the save and cancel buttons
    When I edit the name to "Jane Smith"
    And I edit the email to "jane.smith@example.com"
    And I click save profile
    Then I should see the updated name "Jane Smith"
    And I should see the updated email "jane.smith@example.com"
    And I should see the edit profile button again

  @profile @editing @validation
  Scenario: User cannot save profile with invalid name
    When I click on edit profile
    And I edit the name to "Jo"
    And I edit the email to "jo@example.com"
    Then I should see the name validation error
    And the save button should be disabled

  @profile @editing @validation
  Scenario: User cannot save profile with invalid email
    When I click on edit profile
    And I edit the name to "John Doe"
    And I edit the email to "invalid-email"
    Then I should see the email validation error
    And the save button should be disabled

  @profile @editing @validation
  Scenario: User cannot save profile with numeric characters in name
    When I click on edit profile
    And I edit the name to "John123"
    And I edit the email to "john@example.com"
    Then I should see the name validation error
    And the save button should be disabled

  @profile @editing
  Scenario: User can cancel profile editing
    Given I have a default profile in storage
    When I click on edit profile
    And I edit the name to "Different Name"
    And I edit the email to "different@example.com"
    And I click cancel edit
    Then I should see the original profile information
    And I should see the edit profile button

  @profile @orders @empty
  Scenario: User sees no orders message when no orders exist
    Given there are no orders in storage
    When I refresh the profile page
    Then I should see the no orders message
    And I should see the start shopping button

  @profile @orders @empty
  Scenario: User can navigate to shopping from no orders
    Given there are no orders in storage
    When I click start shopping
    Then I should be redirected to the homepage

  @profile @orders
  Scenario: User can view single order history
    Given there is a single order in storage
    When I refresh the profile page
    Then I should see the orders list
    And I should see 1 order
    And I should see order "ORD-001" with total $79.99
    And I should see product 1 "Classic White Sneakers" with quantity 1 and price $79.99

  @profile @orders
  Scenario: User can view order with multiple products
    Given there is a large order in storage
    When I refresh the profile page
    Then I should see the orders list
    And I should see 1 order
    And I should see order "ORD-004" with total $429.97
    And I should see product 1 "Classic White Sneakers" with quantity 1 and price $79.99
    And I should see product 2 "Premium Leather Watch" with quantity 1 and price $149.99
    And I should see product 3 "Wireless Headphones" with quantity 1 and price $199.99


  @profile @navigation
  Scenario: User can navigate back to home
    When I click back to home
    Then I should be redirected to the homepage

  @profile @persistence
  Scenario: Profile changes are persisted in localStorage
    When I click on edit profile
    And I edit the name to "Persistent User"
    And I edit the email to "persistent@example.com"
    And I click save profile
    And I navigate to another page
    And I return to the profile page
    Then I should see the updated name "Persistent User"
    And I should see the updated email "persistent@example.com"
