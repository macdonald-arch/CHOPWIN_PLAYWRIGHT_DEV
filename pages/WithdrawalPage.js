export class WithdrawalPage {
  constructor(page) {
    this.page = page;

    // WALLET / NAV
    this.walletDropdownBtn  = page.getByRole('button', { name: 'Toggle wallet dropdown' });
    this.myAccountLink      = page.getByRole('link', { name: 'Mon espace perso' });
    this.withdrawalBtn      = page.getByRole('button', { name: 'Retrait' });

    // WITHDRAWAL FORM
    this.amountInput        = page.getByRole('textbox', { name: 'Sélectionne un montant' });
    this.continueBtn        = page.getByRole('button', { name: 'Continue' });

    // POST-WITHDRAWAL
    this.successBtn         = page.getByRole('button', { name: 'Retour au jeu' });

    // ERRORS
    this.errorAlert         = page.getByRole('alert');
    this.amountError        = page.getByText(/montant/i);
  }

  async openWithdrawalForm() {
    await this.page.goto('https://dev.chopbet.ci/withdraw');

    // Close login modal if it appears over the withdrawal form
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

  // Full happy-path withdrawal
  async completeWithdrawal(amount) {
    await this.openWithdrawalForm();
    await this.enterAmount(amount);
    await this.submitAmount();
  }
}