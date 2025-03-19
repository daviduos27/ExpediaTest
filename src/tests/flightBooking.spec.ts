import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FlightSearchPage } from '../pages/flightSearchPage';
import { TestData } from '../utils/testData';

test.describe('Flight Booking Process', () => {
  let homePage: HomePage;
  let flightSearchPage: FlightSearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    flightSearchPage = new FlightSearchPage(page);
    await flightSearchPage.navigateToFlights();
  });

  test('Searching for a round-trip flight should enable return date selection', async () => {
    await flightSearchPage.selectTripType('Round trip');
    expect(await flightSearchPage.isReturnDateInputVisible()).toBe(true);
  });

  test('Selecting departure & destination should display available flights', async () => {
    await flightSearchPage.enterDeparture(TestData.departureCity);
    await flightSearchPage.enterDestination(TestData.destinationCity);
    await flightSearchPage.selectDepartureDate(TestData.departureDate);
    await flightSearchPage.selectReturnDate(TestData.returnDate);
    await flightSearchPage.clickSearch();
    await flightSearchPage.waitForSearchResults();
    const firstPrice = await flightSearchPage.getFirstFlightPrice();
    expect(firstPrice).toBeTruthy();
  });

  test('Entering an invalid date range should trigger an error message', async () => {
    await flightSearchPage.selectTripType('Round trip');
    await flightSearchPage.enterDeparture(TestData.departureCity);
    await flightSearchPage.enterDestination(TestData.destinationCity);
    await flightSearchPage.selectDepartureDate(TestData.invalidDepartureDate);
    await flightSearchPage.selectReturnDate(TestData.invalidReturnDate);
    await flightSearchPage.clickSearch();
    await flightSearchPage.waitForErrorMessage();
    expect(await flightSearchPage.isErrorMessageVisible()).toBe(true);
    const errorMessage = await flightSearchPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });

  //Skipping checkout test, as it requires real payment information.
  test.skip('Proceeding to checkout should display a booking summary', async () => {
    // Implement checkout process here (requires handling real payment information, which is usually skipped in automated tests)
  });
});