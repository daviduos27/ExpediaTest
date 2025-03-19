import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { UserProfilePage } from '../pages/userProfilePage';
import { TestData } from '../utils/testData';

test.describe('User Login & Profile Update', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let userProfilePage: UserProfilePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    userProfilePage = new UserProfilePage(page);
    await homePage.navigateToHomePage();
    await homePage.acceptCookies();
    await homePage.goToLogin();
    await loginPage.waitForPasswordInput();
  });

  test('Logging in with valid credentials should navigate to the user dashboard', async () => {
    await loginPage.login(TestData.validEmail, TestData.validPassword);
    await userProfilePage.waitForProfilePageLoad();
    expect(await userProfilePage.isProfilePageLoaded()).toBe(true);
  });

  test('Entering incorrect credentials should display an error message', async () => {
    await loginPage.login(TestData.invalidEmail, TestData.invalidPassword);
    await loginPage.waitForErrorMessage();
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });

  test('Updating profile details (e.g., phone number, address) should save successfully', async () => {
    await loginPage.login(TestData.validEmail, TestData.validPassword);
    await userProfilePage.waitForProfilePageLoad();
    await userProfilePage.navigateToProfile();
    await userProfilePage.updatePhoneNumber(TestData.newPhoneNumber);
    expect(await userProfilePage.getPhoneNumber()).toBe(TestData.newPhoneNumber);

    await userProfilePage.updateAddress(TestData.newAddress);
    expect(await userProfilePage.getAddress()).toBe(TestData.newAddress);
  });

  test('Logging out should redirect to the home page', async () => {
    await loginPage.login(TestData.validEmail, TestData.validPassword);
    await userProfilePage.waitForProfilePageLoad();
    await userProfilePage.logout();
    const searchElement = await homePage.findElementByText('Search');
    expect(await searchElement.isVisible()).toBe(true); // Verifies that the home page is loaded.
  });
});