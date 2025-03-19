import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(public page: Page) {}

  async enterEmail(email: string): Promise<void> {
    await this.page.locator('input[name="username"]').fill(email);
  }

  async clickContinue(): Promise<void> {
    await this.page.locator('button[type="submit"]').click();
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.locator('input[name="password"]').fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.page.locator('button[type="submit"]').click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.clickContinue();
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.page.locator('[data-testid="error-message"]').textContent();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.page.locator('[data-testid="error-message"]').isVisible();
  }

  async waitForErrorMessage(): Promise<void> {
    await this.page.waitForSelector('[data-testid="error-message"]');
  }

  async isPasswordInputVisible(): Promise<boolean> {
    return this.page.locator('input[name="password"]').isVisible();
  }

  async isCapthaVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { name: 'Let\'s make sure you\'re human' }).isVisible();
  }

  async waitForPasswordInput(): Promise<void>{
    await this.page.waitForSelector('input[name="password"]');
  }
}