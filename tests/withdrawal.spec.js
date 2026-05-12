import { test, expect } from '../fixtures/base.fixture.js';
import { WithdrawalPage } from '../pages/WithdrawalPage.js';

test.describe('Withdrawal', () => {

  // -------------------------------------------------------------------------
  // POSITIVE
  // -------------------------------------------------------------------------

  test('POSITIVE - valid withdrawal completes successfully', async ({ authenticatedPage }) => {
    const withdrawal = new WithdrawalPage(authenticatedPage);

    await withdrawal.completeWithdrawal(500);

    await expect(withdrawal.successBtn).toBeVisible({ timeout: 30000 });
  });

  // -------------------------------------------------------------------------
  // NEGATIVE
  // -------------------------------------------------------------------------

  test('NEGATIVE - amount below minimum (99) shows error', async ({ authenticatedPage }) => {
    const withdrawal = new WithdrawalPage(authenticatedPage);

    await withdrawal.openWithdrawalForm();
    await withdrawal.enterAmount(99);

    await expect(withdrawal.continueBtn).toBeDisabled();
  });

  test('NEGATIVE - amount above maximum (2,500,001) shows error', async ({ authenticatedPage }) => {
    const withdrawal = new WithdrawalPage(authenticatedPage);

    await withdrawal.openWithdrawalForm();
    await withdrawal.enterAmount(2500001);
    await withdrawal.submitAmount();

    await expect(withdrawal.errorAlert).toBeVisible({ timeout: 10000 });
  });

  test('NEGATIVE - amount exceeding balance shows error', async ({ authenticatedPage }) => {
    const withdrawal = new WithdrawalPage(authenticatedPage);

    await withdrawal.openWithdrawalForm();
    await withdrawal.enterAmount(2000000);
    await withdrawal.submitAmount();

    await expect(withdrawal.errorAlert).toBeVisible({ timeout: 10000 });
  });

  test('NEGATIVE - empty amount field keeps continue button disabled', async ({ authenticatedPage }) => {
    const withdrawal = new WithdrawalPage(authenticatedPage);

    await withdrawal.openWithdrawalForm();

    // Do not fill amount — button should be disabled
    await expect(withdrawal.continueBtn).toBeDisabled();
  });

});