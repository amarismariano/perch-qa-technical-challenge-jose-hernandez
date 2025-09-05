Feature: Payment Page Validation
  As a user
  I want to validate all aspects of the payment page
  So that I can ensure proper form validation and user experience

  Background:
    Given I have completed the address form

  @payment @validation @ui
  Scenario: User can see all payment form elements
    When I am on the payment page
    Then I should see the payment page title
    And I should see the back to address button
    And I should see all payment form fields
    And I should see the place order button

  @payment @validation @cardholder
  Scenario: User can validate card holder name field
    When I am on the payment page
    And I clear the card holder name field
    And I blur the card holder name field
    Then I should see "This field is required" error for card holder

  @payment @validation @cardholder
  Scenario: User can validate card holder name with invalid data
    When I am on the payment page
    And I enter "123" in the card holder name field
    And I blur the card holder name field
    Then I should see "Card holder name must be 2-50 characters and contain only letters" error

  @payment @validation @cardholder
  Scenario: User can validate card holder name with valid data
    When I am on the payment page
    And I enter "John Doe" in the card holder name field
    And I blur the card holder name field
    Then I should not see any error for card holder

  @payment @validation @cardnumber
  Scenario: User can validate card number field
    When I am on the payment page
    And I clear the card number field
    And I blur the card number field
    Then I should see "This field is required" error for card number

  @payment @validation @cardnumber
  Scenario: User can validate card number with invalid data
    When I am on the payment page
    And I enter "123" in the card number field
    And I blur the card number field
    Then I should see "Card number must be 16 digits" error

  @payment @validation @cardnumber
  Scenario: User can validate card number with valid data
    When I am on the payment page
    And I enter "1234567890123456" in the card number field
    And I blur the card number field
    Then I should not see any error for card number

  @payment @validation @cardnumber
  Scenario: User can see card number formatting
    When I am on the payment page
    And I enter "1234567890123456" in the card number field
    Then I should see the card number formatted as "1234 5678 9012 3456"

  @payment @validation @expiry
  Scenario: User can validate expiry date field
    When I am on the payment page
    And I clear the expiry date field
    And I blur the expiry date field
    Then I should see "This field is required" error for expiry date

  @payment @validation @expiry
  Scenario: User can validate expiry date with invalid format
    When I am on the payment page
    And I enter "12/2" in the expiry date field
    And I blur the expiry date field
    Then I should see "Expiry date must be in MM/YY format" error for expiry date

  @payment @validation @expiry
  Scenario: User can validate expiry date with valid format
    When I am on the payment page
    And I enter "12/25" in the expiry date field
    And I blur the expiry date field
    Then I should not see any error for expiry date

  @payment @validation @expiry
  Scenario: User can see expiry date formatting
    When I am on the payment page
    And I enter "1225" in the expiry date field
    Then I should see the expiry date formatted as "12/25"

  @payment @validation @cvv
  Scenario: User can validate CVV field
    When I am on the payment page
    And I clear the CVV field
    And I blur the CVV field
    Then I should see "This field is required" error for CVV

  @payment @validation @cvv
  Scenario: User can validate CVV with invalid data
    When I am on the payment page
    And I enter "12" in the CVV field
    And I blur the CVV field
    Then I should see "CVV must be 3 or 4 digits" error

  @payment @validation @cvv
  Scenario: User can validate CVV with valid data
    When I am on the payment page
    And I enter "123" in the CVV field
    And I blur the CVV field
    Then I should not see any error for CVV

  @payment @validation @cvv
  Scenario: User can validate CVV with 4 digits
    When I am on the payment page
    And I enter "1234" in the CVV field
    And I blur the CVV field
    Then I should not see any error for CVV

  @payment @validation @form
  Scenario: User cannot submit form with empty fields
    When I am on the payment page
    And I submit the payment form
    Then I should see validation errors for all fields
    And I should remain on the payment page

  @payment @validation @form
  Scenario: User cannot submit form with invalid data
    When I am on the payment page
    And I enter invalid payment data
    And I submit the payment form
    Then I should see validation errors for invalid payment data
    And I should remain on the payment page

  @payment @validation @form
  Scenario: User can submit form with valid data
    When I am on the payment page
    And I enter valid payment data
    And I submit the payment form
    Then I should see the processing state
    And I should be redirected to the success page

  @payment @validation @navigation
  Scenario: User can navigate back to address page
    When I am on the payment page
    And I click back to address
    Then I should be redirected to the address page

  @payment @validation @ui
  Scenario: User can see form field limits
    When I am on the payment page
    Then the card number field should have maxLength of 19
    And the expiry date field should have maxLength of 5
    And the CVV field should have maxLength of 4

  @payment @validation @ui
  Scenario: User can see form placeholders
    When I am on the payment page
    Then the expiry date field should have placeholder "MM/YY"
