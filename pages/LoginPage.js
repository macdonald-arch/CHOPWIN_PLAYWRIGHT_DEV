export class LoginPage {
  constructor(page) {
    this.page = page;

    this.phoneInput    = page.locator('.phone-input');
    this.passwordInput = page.getByRole('textbox', { name: 'Mot de passe' });
    this.loginBtn      = page.getByRole('button', { name: 'Connexion' });
    this.errorMessage  = page.locator("text=Nom d'utilisateur ou mot de");
  }

  async navigate() {
    await this.page.goto('https://dev.chopbet.ci/login?next=/casino');
    await this.phoneInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async validLogin(phone, password) {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async invalidLogin(phone, password) {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async fillPasswordOnly(password) {
    await this.passwordInput.fill(password);
  }
}
