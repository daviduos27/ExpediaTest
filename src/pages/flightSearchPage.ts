import { Page, Locator } from '@playwright/test';

export class FlightSearchPage {
  constructor(public page: Page) {}

  async navigateToFlights(): Promise<void> {
    await this.page.goto('https://www.booking.com/flights/');
    await this.acceptCookies();
  }

  async acceptCookies(): Promise<void> {
    const acceptCookiesButton = this.page.locator('button[id="onetrust-accept-btn-handler"]');
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
    }
  }

  async selectTripType(tripType: 'Round trip' | 'One way'): Promise<void> {
    const tripTypeButton = this.page.locator(`button[aria-label="${tripType}"]`);
    await tripTypeButton.click();
  }

  async enterDeparture(departure: string): Promise<void> {
    const departureInput = this.page.locator('input[aria-label="Type your origin"]');
    await departureInput.fill(departure);
    await this.page.locator('li[data-testid="autocomplete-result"]').first().click();
  }

  async enterDestination(destination: string): Promise<void> {
    const destinationInput = this.page.locator('input[aria-label="Type your destination"]');
    await destinationInput.fill(destination);
    await this.page.locator('li[data-testid="autocomplete-result"]').first().click();
  }

  async selectDepartureDate(date: string): Promise<void> {
    await this.page.locator('button[data-testid="date-display-field-start"]').click();
    await this.selectDate(date);
  }

  async selectReturnDate(date: string): Promise<void> {
    await this.page.locator('button[data-testid="date-display-field-end"]').click();
    await this.selectDate(date);
  }

  async selectDate(date: string): Promise<void> {
    const [month, day, year] = date.split('/').map(Number);
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateLocator = this.page.locator(`[data-date="${dateString}"]`);
    await dateLocator.click();
  }

  async clickSearch(): Promise<void> {
    await this.page.locator('button[data-testid="search-button"]').click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.page.locator('[data-testid="search-form-error"]').textContent();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.page.locator('[data-testid="search-form-error"]').isVisible();
  }

  async waitForErrorMessage(): Promise<void> {
    await this.page.waitForSelector('[data-testid="search-form-error"]');
  }

  async isReturnDateInputVisible(): Promise<boolean> {
    return this.page.locator('button[data-testid="date-display-field-end"]').isVisible();
  }

  async waitForSearchResults(): Promise<void> {
      await this.page.waitForSelector('[data-testid="flight-card-container"]');
  }

  async getFirstFlightPrice(): Promise<string | null>{
    const firstPrice = await this.page.locator('[data-testid="flight-card-price-main"]').first().textContent();
    return firstPrice;
  }
}