import { test, expect } from '../fixtures/base.fixture.js';
import { SignupPage } from '../pages/SignupPage.js';

test.describe('Signup - Negative', () => {

  test('NEGATIVE - wrong OTP shows error', async ({ page }) => {
    const signup = new SignupPage(page);

    await signup.open();
    await signup.goToSignup();

    const phone = signup.generatePhone();

    await signup.fillForm(phone, 'COCOCO893');
    await signup.submitForm();
    await signup.selectSmsOtp();
    await signup.enterOtp('0000');
    await signup.confirmOtp();

    await expect(signup.alert).toBeVisible({ timeout: 10000 });
    await expect(signup.alert).toContainText('code de vérification');
  });

  test('NEGATIVE - already registered phone shows error', async ({ page }) => {
    const signup = new SignupPage(page);

    await signup.open();
    await signup.goToSignup();

    // Use the known registered test account phone
    await signup.fillForm('0584043553', 'COCOCO893');
    await signup.submitForm();

    await expect(signup.alert).toBeVisible({ timeout: 10000 });
    await expect(signup.alert).toContainText('numéro de téléphone existe déjà');
  });

});
