import { test, expect } from '../fixtures/base.fixture.js';
import { DepositPage } from '../pages/DepositPage.js';

const VALID_PIN = process.env.TEST_PIN || '1234';

test.describe('Deposit', () => {

  // -------------------------------------------------------------------------
  // POSITIVE
  // -------------------------------------------------------------------------

  test('POSITIVE - valid deposit completes successfully', async ({ authenticatedPage }) => {
    const deposit = new DepositPage(authenticatedPage);

    await deposit.completeDeposit(500, VALID_PIN);

    await expect(deposit.successMessage).toBeVisible({
      timeout: 20000
    });

    await deposit.continuePlayingBtn.click();
  });

  // -------------------------------------------------------------------------
  // NEGATIVE
  // -------------------------------------------------------------------------

  test('NEGATIVE - amount below minimum (99) shows error', async ({ authenticatedPage }) => {
    const deposit = new DepositPage(authenticatedPage);

    await deposit.openDepositForm();
    await deposit.enterAmount(99);

    await expect(deposit.continueBtn).toBeDisabled();
  });

  test('NEGATIVE - amount above maximum (2,500,001) shows error', async ({ authenticatedPage }) => {
    const deposit = new DepositPage(authenticatedPage);

    await deposit.openDepositForm();
    await deposit.enterAmount(2500001);
    await deposit.submitAmount();

    await expect(deposit.errorAlert).toBeVisible({
      timeout: 10000
    });
  });

  test('NEGATIVE - invalid PIN shows error', async ({ authenticatedPage }) => {
    const deposit = new DepositPage(authenticatedPage);

    await deposit.openDepositForm();
    await deposit.enterAmount(500);
    await deposit.submitAmount();
    await deposit.enterPin('0000');
    await deposit.finalisePayment();

    await expect(deposit.errorAlert).toBeVisible({
      timeout: 10000
    });
  });

  test('NEGATIVE - empty amount field keeps continue button disabled', async ({ authenticatedPage }) => {
    const deposit = new DepositPage(authenticatedPage);

    await deposit.openDepositForm();

    await expect(deposit.continueBtn).toBeDisabled();
  });

});