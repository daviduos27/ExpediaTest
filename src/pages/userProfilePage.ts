import { Page, Locator } from '@playwright/test';

export class UserProfilePage {
  constructor(public page: Page) {}

  async navigateToProfile(): Promise<void> {
    await this.page.locator('button[data-testid="header-profile-menu-button"]').click();
    await this.page.locator('a[data-testid="header-profile-menu-item-account"]').click();
  }

  async updatePhoneNumber(phoneNumber: string): Promise<void> {
    await this.page.locator('input[name="phone"]').fill(phoneNumber);
    await this.page.locator('button[data-testid="profile-save-changes-button"]').click();
  }

  async updateAddress(address: string): Promise<void> {
    await this.page.locator('input[name="address"]').fill(address);
    await this.page.locator('button[data-testid="profile-save-changes-button"]').click();
  }

  async getPhoneNumber(): Promise<string | null> {
    return this.page.locator('input[name="phone"]').inputValue();
  }

  async getAddress(): Promise<string | null> {
    return this.page.locator('input[name="address"]').inputValue();
  }

  async isSaveChangesButtonVisible(): Promise<boolean> {
    return this.page.locator('button[data-testid="profile-save-changes-button"]').isVisible();
  }

  async waitForSaveChanges(): Promise<void>{
    await this.page.waitForSelector('button[data-testid="profile-save-changes-button"]');
  }

  async logout(): Promise<void> {
    await this.page.locator('button[data-testid="header-profile-menu-button"]').click();
    await this.page.locator('button[data-testid="header-profile-menu-item-logout"]').click();
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return this.page.locator('button[data-testid="header-profile-menu-item-logout"]').isVisible();
  }

  async waitForLogoutButton(): Promise<void>{
    await this.page.waitForSelector('button[data-testid="header-profile-menu-item-logout"]');
  }

  async isProfilePageLoaded(): Promise<boolean>{
    return this.page.locator('h2:has-text("Your account")').isVisible();
  }

  async waitForProfilePageLoad(): Promise<void>{
    await this.page.waitForSelector('h2:has-text("Your account")');
  }
}