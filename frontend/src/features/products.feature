Feature: Display Available Rooms

  Scenario: User views the list of available rooms
    Given the user is on the products page
    When the rooms are loaded
    Then the user should see a list of rooms with titles, prices, capacity, and locations
    And each room should display an image
    And each room should have a "View Details" button

  Scenario: User views room details
    Given the user is on the products page
    When the user clicks on "View Details" for room "Deluxe Suite"
    Then the user should see the details of the room including title, price, capacity, and location
    And the user should see the room image

  Scenario: User encounters image loading error
    Given the user is on the products page
    And an image fails to load
    Then the user should see a placeholder image instead
