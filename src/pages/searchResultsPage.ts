import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  constructor(public page: Page) {}

  async applyGuestRatingFilter(rating: string): Promise<void> {
    const filterLocator = this.page.locator(`[data-testid="filters-group-filters-rating"] button[data-testid="filter-item-${rating}"]`);
    await filterLocator.click();
  }

  async sortByLowestPrice(): Promise<void> {
    const sortDropdown = this.page.locator('[data-testid="sorters-dropdown-trigger"]');
    await sortDropdown.click();
    const lowestPriceOption = this.page.locator('[data-testid="sorters-dropdown-option-PRICE"]');
    await lowestPriceOption.click();
  }

  async getSearchResults(): Promise<Locator[]> {
    return this.page.locator('[data-testid="property-card"]').all();
  }

  async getResultPrices(): Promise<string[]> {
    const priceLocators = await this.page.locator('[data-testid="price-and-discounted-price"]').allTextContents();
    return priceLocators;
  }

  async getResultRatings(): Promise<string[]> {
    const ratingLocators = await this.page.locator('[data-testid="review-score-badge"]').allTextContents();
    return ratingLocators;
  }

  async getResultTitles(): Promise<string[]> {
    const titleLocators = await this.page.locator('[data-testid="title"]').allTextContents();
    return titleLocators;
  }

  async isResultTitleVisible(title: string): Promise<boolean> {
    return this.page.locator(`[data-testid="title"]:has-text("${title}")`).isVisible();
  }

  async isResultPriceVisible(price: string): Promise<boolean> {
    return this.page.locator(`[data-testid="price-and-discounted-price"]:has-text("${price}")`).isVisible();
  }

  async isResultRatingVisible(rating: string): Promise<boolean> {
    return this.page.locator(`[data-testid="review-score-badge"]:has-text("${rating}")`).isVisible();
  }

  async waitForSearchResults(): Promise<void> {
    await this.page.waitForSelector('[data-testid="property-card"]');
  }

  async waitForPriceChange(): Promise<void>{
    await this.page.waitForFunction(() => {
      const prices = Array.from(document.querySelectorAll('[data-testid="price-and-discounted-price"]'));
      return prices.length > 0;
    });
  }

  async getFirstResultTitle(): Promise<string | null>{
    const firstTitle = await this.page.locator('[data-testid="title"]').first().textContent();
    return firstTitle;
  }

    async getFirstResultPrice(): Promise<string | null>{
    const firstPrice = await this.page.locator('[data-testid="price-and-discounted-price"]').first().textContent();
    return firstPrice;
  }
}