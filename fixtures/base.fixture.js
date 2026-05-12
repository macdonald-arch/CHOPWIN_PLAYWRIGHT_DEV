import { test as base } from '@playwright/test';
import { AuthModalPage } from '../pages/AuthModalPage.js';
import { LoginPage } from '../pages/LoginPage.js';

// ---------------------------------------------------------------------------
// authenticatedPage  – unlocks modal AND logs in before the test body runs
// page               – unlocks modal only (for login/signup tests)
// ---------------------------------------------------------------------------

export const test = base.extend({

  // Override base `page` to always handle the modal on first navigation
  page: async ({ page }, use) => {
    const originalGoto = page.goto.bind(page);

    let modalHandled = false;

    page.goto = async (url, options) => {
      const response = await originalGoto(url, options);

      if (!modalHandled) {
        const modal = new AuthModalPage(page);
        await modal.unlock();
        modalHandled = true;
      }

      return response;
    };

    await use(page);
  },

  // Authenticated page: modal unlock + login, confirms session is stable
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.validLogin(
      process.env.TEST_PHONE    || '0584043553',
      process.env.TEST_PASSWORD || 'Tessy2'
    );
    // Wait for casino URL
    await page.waitForURL('**/casino**', { timeout: 15000 });
    // Wait for a concrete authenticated element rather than networkidle
    // (casino page has persistent websockets that never reach networkidle)
    await page.getByRole('button', { name: 'Toggle wallet dropdown' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await use(page);
  },
});

export { expect } from '@playwright/test';