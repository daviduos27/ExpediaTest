import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchResultsPage } from '../pages/searchResultsPage';
import { TestData } from '../utils/testData';

test.describe('Hotel Search & Filtering', () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    await homePage.navigateToHomePage();
    await homePage.acceptCookies();
  });

  test('Searching for hotels in "New York" should display relevant results', async () => {
    await homePage.enterDestination('New York');
    await homePage.selectDates(TestData.checkInDate, TestData.checkOutDate);
    await homePage.clickSearch();
    await searchResultsPage.waitForSearchResults();
    const results = await searchResultsPage.getResultTitles();
    expect(results.length).toBeGreaterThan(0);
    for (const title of results) {
      expect(title.toLowerCase()).toContain('new york');
    }
  });

  test('Selecting check-in and check-out dates should update availability', async () => {
    await homePage.enterDestination('New York');
    await homePage.selectDates(TestData.checkInDate, TestData.checkOutDate);
    await homePage.clickSearch();
    await searchResultsPage.waitForSearchResults();
    const firstPriceBefore = await searchResultsPage.getFirstResultPrice();

    await homePage.navigateToHomePage();
    await homePage.enterDestination('New York');
    await homePage.selectDates(TestData.checkInDate2, TestData.checkOutDate2);
    await homePage.clickSearch();
    await searchResultsPage.waitForSearchResults();
    const firstPriceAfter = await searchResultsPage.getFirstResultPrice();
    expect(firstPriceBefore).not.toEqual(firstPriceAfter);

  });

  test('Applying a "Guest Rating: 8+" filter should update results correctly', async () => {
    await homePage.enterDestination('New York');
    await homePage.selectDates(TestData.checkInDate, TestData.checkOutDate);
    await homePage.clickSearch();
    await searchResultsPage.waitForSearchResults();
    await searchResultsPage.applyGuestRatingFilter('80');
    await searchResultsPage.waitForSearchResults();
    const ratings = await searchResultsPage.getResultRatings();
    for (const rating of ratings) {
      expect(parseFloat(rating)).toBeGreaterThanOrEqual(8);
    }
  });

  test('Sorting by "Lowest Price" should reorder results as expected', async () => {
    await homePage.enterDestination('New York');
    await homePage.selectDates(TestData.checkInDate, TestData.checkOutDate);
    await homePage.clickSearch();
    await searchResultsPage.waitForSearchResults();
    await searchResultsPage.sortByLowestPrice();
    await searchResultsPage.waitForPriceChange();

    const prices = await searchResultsPage.getResultPrices();
    const numericPrices = prices.map(price => {
      const cleanedPrice = price.replace(/[^0-9.]/g, '');
      return parseFloat(cleanedPrice);
    });

    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
    }
  });
});