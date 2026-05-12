export class SignupPage {
  constructor(page) {
    this.page = page;

    // NAV
    this.inscriptionLink = page.getByRole('link', { name: 'Inscription' });

    // FORM
    this.phoneInput           = page.getByRole('textbox', { name: 'Entre ton numéro de téléphone' });
    this.passwordInput        = page.getByRole('textbox', { name: 'Mot de passe', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirme ton mot de passe' });
    this.continueBtn          = page.getByRole('button', { name: 'Continue' });
    

    // OTP CHANNEL
    this.smsBtn = page.locator('button:has-text("SMS")');

    // OTP INPUTS
    this.otp1 = page.getByLabel('OTP digit 1');
    this.otp2 = page.getByLabel('OTP digit 2');
    this.otp3 = page.getByLabel('OTP digit 3');
    this.otp4 = page.getByLabel('OTP digit 4');

    this.confirmBtn = page.getByRole('button', { name: 'confirmer' });

    // ALERT
    this.alert = page.getByRole('alert');
  }

  async open() {
    await this.page.goto('https://dev.chopbet.ci/join');
    await this.page.waitForLoadState('networkidle');
  }

  async goToSignup() {
    // No-op kept for backward compatibility — open() lands directly on signup
  }

  async fillForm(phone, password, confirmPassword = password) {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submitForm() {
    await this.continueBtn.click();
  }

  async selectSmsOtp() {
    await this.smsBtn.waitFor({ state: 'visible' });
    await this.smsBtn.click();
    await this.page.waitForURL('**/activate-account');
  }

  async enterOtp(code = '1111') {
    await this.otp1.waitFor({ state: 'visible' });
    await this.otp1.fill(code[0]);
    await this.otp2.fill(code[1]);
    await this.otp3.fill(code[2]);
    await this.otp4.fill(code[3]);
  }

  async confirmOtp() {
    await this.confirmBtn.click();
  }

  generatePhone() {
    return '071' + Math.floor(10000000 + Math.random() * 90000000);
  }
}

