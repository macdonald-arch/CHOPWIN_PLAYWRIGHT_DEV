export class DepositPage {
  constructor(page) {
    this.page = page;

    // WALLET / NAV
    this.walletDropdownBtn  = page.getByRole('button', { name: 'Toggle wallet dropdown' });
    this.myAccountLink      = page.getByRole('link', { name: 'Mon espace perso' });
    this.depositBtn         = page.getByRole('button', { name: 'Dépôt' });

    // DEPOSIT FORM
    this.amountInput        = page.getByRole('textbox', { name: 'Entre le montant que Tu' });
    this.continueBtn        = page.getByRole('button', { name: 'Continue' });

    // PIN CONFIRMATION
    this.pinInput           = page.getByRole('textbox', { name: 'Mot de passe' });
    this.finaliseBtn        = page.getByRole('button', { name: 'Finaliser le paiement' });

    // POST-DEPOSIT
    this.successMessage     = page.getByText('Ton dépôt de');
    this.continuePlayingBtn = page.getByRole('button', { name: 'continuePlaying' });

    // ERRORS
    this.errorAlert         = page.getByRole('alert');
    this.amountError        = page.getByText(/montant/i);
  }

  async openDepositForm() {
    await this.page.goto('https://dev.chopbet.ci/deposit');

    // Close login modal if it appears over the deposit form
    const closeBtn = this.page.locator('button[data-v-249579f3]').first();
    if (await closeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await closeBtn.click();
    }

    // Dismiss Gist chat overlay if present
    await this.page.evaluate(() => {
      const overlay = document.getElementById('gist-embed-message');
      if (overlay) overlay.remove();
    });

    await this.amountInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async enterAmount(amount) {
    await this.amountInput.click();
    await this.amountInput.fill(String(amount));
  }

  async submitAmount() {
    await this.continueBtn.click();
  }

  async enterPin(pin) {
    await this.pinInput.click();
    await this.pinInput.fill(String(pin));
  }

  async finalisePayment() {
    await this.finaliseBtn.click();
  }

  // Full happy-path deposit
  async completeDeposit(amount, pin) {
    await this.openDepositForm();
    await this.enterAmount(amount);
    await this.submitAmount();
    await this.enterPin(pin);
    await this.finalisePayment();
  }
}