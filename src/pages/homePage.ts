import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  constructor(public page: Page) {}

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://www.booking.com/');
  }

  async acceptCookies(): Promise<void> {
    const acceptCookiesButton = this.page.locator('button[id="onetrust-accept-btn-handler"]');
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
    }
  }

  async enterDestination(destination: string): Promise<void> {
    const destinationInput = this.page.locator('input[name="ss"]');
    await destinationInput.clear();
    await destinationInput.fill(destination);
    const firstSearchResult = this.page.locator('li[id="autocomplete-result-0"]');
    await expect(firstSearchResult.filter({ hasText: destination }).first()).toBeVisible();
    await firstSearchResult.click();
  }

  async selectDates(checkInDate: string, checkOutDate: string): Promise<void> {
    await this.page.locator('button[data-testid="date-display-field-start"]').click();

    // Select check-in date
    await this.selectDate(checkInDate);

    // Select check-out date
    await this.selectDate(checkOutDate);

    await this.page.locator('button[data-testid="date-display-field-end"]').click(); // close the calendar
  }

  async selectDate(date: string): Promise<void> {
    await this.page.waitForSelector('[data-testid="searchbox-datepicker-calendar"]');
    const dateLocator = this.page.locator(`[data-date="${date}"]`);
    await dateLocator.waitFor({ state: 'visible' });
    await dateLocator.click();
  }

  async clickSearch(): Promise<void> {
    await this.page.locator('button[data-testid="search-submit"]').click();
  }

  async goToLogin(): Promise<void> {
    // Wait for the button to be visible (optional but recommended)
    await this.page.waitForSelector('[data-testid="header-sign-in-button"]');

    await this.page.getByTestId('header-sign-in-button').click();
  }

  async goToFlights(): Promise<void> {
    await this.page.locator('a[data-testid="header-flights-link"]').click();
  }

  async goToCars(): Promise<void> {
    await this.page.locator('a[data-testid="header-cars-link"]').click();
  }

  // Example of using a locator function for potential AI integration
  async findElementByText(text: string): Promise<Locator> {
    return this.page.locator(`text=${text}`);
  }
}