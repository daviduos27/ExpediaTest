# Test Cases for Booking.com Automation

This document outlines the test cases for the Booking.com automation project, covering user stories related to hotel search, flight booking (or car rental), and user login/profile management.

## User Story 1: Hotel Search & Filtering

**As a user, I want to search for hotels in a specific city and apply filters, so that I can find a suitable place to stay.**

### Test Scenarios:

1.  **Searching for hotels in "New York" should display relevant results.**
    * **Description:** Verify that searching for hotels in New York displays a list of hotels located in or near New York.
    * **Steps:**
        1.  Navigate to the Booking.com home page.
        2.  Enter "New York" in the destination search field.
        3.  Select check-in and check-out dates.
        4.  Click the search button.
        5.  Verify that the search results display hotels in New York.
    * **Expected Result:** A list of hotels in New York is displayed.
    * **AI Contribution:** Suggested edge cases such as searching for partial city names, misspelled city names, and cities with special characters.

2.  **Selecting check-in and check-out dates should update availability.**
    * **Description:** Verify that changing the check-in and check-out dates updates the displayed hotel availability and pricing.
    * **Steps:**
        1.  Search for hotels in New York with initial dates.
        2.  Record the price of the first hotel.
        3.  Change the check-in and check-out dates.
        4.  Click the search button.
        5.  Verify that the price of the first hotel has changed.
    * **Expected Result:** Hotel availability and prices are updated based on the selected dates.

3.  **Applying a "Guest Rating: 8+" filter should update results correctly.**
    * **Description:** Verify that applying the "Guest Rating: 8+" filter displays only hotels with a rating of 8 or higher.
    * **Steps:**
        1.  Search for hotels in New York.
        2.  Apply the "Guest Rating: 8+" filter.
        3.  Verify that all displayed hotels have a rating of 8 or higher.
    * **Expected Result:** Only hotels with a rating of 8 or higher are displayed.
    * **AI Contribution:** Suggested testing boundary conditions, such as 7.9, 8.0, and 8.1 ratings, to ensure the filter works correctly.

4.  **Sorting by "Lowest Price" should reorder results as expected.**
    * **Description:** Verify that sorting the search results by "Lowest Price" reorders the hotels from the lowest to the highest price.
    * **Steps:**
        1.  Search for hotels in New York.
        2.  Sort the results by "Lowest Price".
        3.  Verify that the hotels are displayed in ascending order of price.
    * **Expected Result:** Hotels are sorted by price from lowest to highest.

## User Story 2: Flight Booking Process (or Car Rental)

**As a user, I want to search and book a flight, so that I can plan my trip.** (Or car rental)

### Test Scenarios:

1.  **Searching for a round-trip flight should enable return date selection.**
    * **Description:** Verify that selecting "Round trip" enables the return date selection field.
    * **Steps:**
        1.  Navigate to the flights page.
        2.  Select "Round trip".
        3.  Verify that the return date selection field is visible.
    * **Expected Result:** The return date selection field is enabled.

2.  **Selecting departure & destination should display available flights.**
    * **Description:** Verify that selecting departure and destination cities displays a list of available flights.
    * **Steps:**
        1.  Navigate to the flights page.
        2.  Enter departure and destination cities.
        3.  Select departure and return dates.
        4.  Click the search button.
        5.  Verify that a list of available flights is displayed.
    * **Expected Result:** A list of available flights is displayed.

3.  **Entering an invalid date range should trigger an error message.**
    * **Description:** Verify that entering a return date before the departure date triggers an error message.
    * **Steps:**
        1.  Navigate to the flights page.
        2.  Enter departure and destination cities.
        3.  Select a return date before the departure date.
        4.  Click the search button.
        5.  Verify that an error message is displayed.
    * **Expected Result:** An error message is displayed.
    * **AI Contribution:** Suggested various invalid date range scenarios, including same-day departure and return, and dates in the past.

4.  **Proceeding to checkout should display a booking summary.** (Skipped due to payment information)
    * **Description:** Verify that proceeding to checkout displays a booking summary. (Skipped due to handling real payment data).
    * **Steps:** (Skipped)
    * **Expected Result:** (Skipped)

## User Story 3: User Login & Profile Update

**As a registered user, I want to log in and update my account details, so that my profile remains up to date.**

### Test Scenarios:

1.  **Logging in with valid credentials should navigate to the user dashboard.**
    * **Description:** Verify that logging in with valid credentials navigates to the user dashboard.
    * **Steps:**
        1.  Navigate to the login page.
        2.  Enter valid email and password.
        3.  Click the login button.
        4.  Verify that the user dashboard is displayed.
    * **Expected Result:** The user dashboard is displayed.

2.  **Entering incorrect credentials should display an error message.**
    * **Description:** Verify that entering incorrect credentials displays an error message.
    * **Steps:**
        1.  Navigate to the login page.
        2.  Enter invalid email and password.
        3.  Click the login button.
        4.  Verify that an error message is displayed.
    * **Expected Result:** An error message is displayed.

3.  **Updating profile details (e.g., phone number, address) should save successfully.**
    * **Description:** Verify that updating profile details saves the changes successfully.
    * **Steps:**
        1.  Login with valid credentials.
        2.  Navigate to the profile page.
        3.  Update the phone number and address.
        4.  Verify that the changes are saved.
    * **Expected Result:** The profile details are updated.

4.  **Logging out should redirect to the home page.**
    * **Description:** Verify that logging out redirects to the home page.
    * **Steps:**
        1.  Login with valid credentials.
        2.  Logout.
        3.  Verify that the home page is displayed.
    * **Expected Result:** The home page is displayed.