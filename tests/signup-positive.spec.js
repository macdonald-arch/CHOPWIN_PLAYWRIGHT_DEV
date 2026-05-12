import { test, expect } from '../fixtures/base.fixture.js';
import { SignupPage } from '../pages/SignupPage.js';

test.describe('Signup - Positive', () => {

  test('POSITIVE - successful signup with valid OTP', async ({ page }) => {
    const signup = new SignupPage(page);

    await signup.open();
    await signup.goToSignup();

    const phone = signup.generatePhone();

    await signup.fillForm(phone, 'COCOCO893');
    await signup.submitForm();
    await signup.selectSmsOtp();
    await signup.enterOtp('1111');
    await signup.confirmOtp();

    // Wait for redirect away from OTP page after successful verification
    await page.waitForURL(url => !url.toString().includes('activate-account'), { timeout: 15000 });
    await expect(page).not.toHaveURL(/activate-account/);
  });

});