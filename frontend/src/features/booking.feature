Feature: Book a Room

Scenario: User books a room successfully
Given the user is on the product details page for room "Deluxe Suite"
When they select a start date "2025-06-01" and an end date "2025-06-05"
And they enter their email "[user@example.com](mailto:user@example.com)"
And they click on "Submit Booking"
Then they should see a confirmation message with a booking code

Scenario: User tries to book a room without entering an email
Given the user is on the product details page for room "Deluxe Suite"
When they select a start date "2025-06-01" and an end date "2025-06-05"
And they leave the email field empty
And they click on "Submit Booking"
Then they should see an error message "Email is required"

Scenario: User selects invalid date range
Given the user is on the product details page for room "Deluxe Suite"
When they select a start date "2025-06-05" and an end date "2025-06-01"
And they enter their email "[user@example.com](mailto:user@example.com)"
And they click on "Submit Booking"
Then they should see an error message "Finish date must be after start date"
