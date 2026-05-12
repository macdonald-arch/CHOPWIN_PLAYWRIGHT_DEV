export class AuthModalPage {
  constructor(page) {
    this.page = page;
    this.passcodeInput = page.getByRole('textbox', { name: /passcode/i });
    this.unlockBtn = page.getByRole('button', { name: /unlock/i });
  }

  async unlock() {
    const passcode = process.env.SITE_PASSCODE || 'CHOPWIN5866';

    // Wait briefly for modal to appear, then handle if present
    try {
      await this.passcodeInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.passcodeInput.fill(passcode);
      await this.unlockBtn.click();
      await this.passcodeInput.waitFor({ state: 'hidden', timeout: 5000 });
    } catch {
      // Modal not present — already unlocked, continue
    }
  }
}
