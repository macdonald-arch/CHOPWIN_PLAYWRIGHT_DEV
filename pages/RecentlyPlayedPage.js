export class RecentlyPlayedPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://dev.chopbet.ci/games/recent');
  }

  async openGame(gameName) {
    const gameBtn = this.page.getByRole('button', { name: gameName, exact: true }).first();
    await gameBtn.waitFor({ state: 'visible' });
    await gameBtn.click();
  }
}
