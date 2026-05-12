import { test, expect } from '../fixtures/base.fixture.js';
import { LoginPage } from '../pages/LoginPage.js';

const VALID_PHONE    = process.env.TEST_PHONE    || '0584043553';
const VALID_PASSWORD = process.env.TEST_PASSWORD || 'Tessy2';

test.describe('Login', () => {

  // -------------------------------------------------------------------------
  // POSITIVE
  // -------------------------------------------------------------------------

  test('POSITIVE - valid credentials logs user in', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.validLogin(VALID_PHONE, VALID_PASSWORD);

    await expect(page).toHaveURL(/casino/, { timeout: 15000 });
  });

  // -------------------------------------------------------------------------
  // NEGATIVE
  // -------------------------------------------------------------------------

  test('NEGATIVE - wrong password shows error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.invalidLogin(VALID_PHONE, 'WrongPass99');

    await expect(login.errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('NEGATIVE - unregistered phone shows error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.invalidLogin('0700000000', 'WrongPass99');

    await expect(login.errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('NEGATIVE - empty phone field disables login button', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.fillPasswordOnly(VALID_PASSWORD);

    await expect(login.loginBtn).toBeDisabled();
  });

});
