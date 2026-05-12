import { test, expect } from '../fixtures/base.fixture.js';
import { RecentlyPlayedPage } from '../pages/RecentlyPlayedPage.js';

test.describe('Recently Played', () => {

  test('POSITIVE - user can open a recently played game', async ({ authenticatedPage }) => {
    const recentlyPlayed = new RecentlyPlayedPage(authenticatedPage);

    await recentlyPlayed.navigate();

    await expect(authenticatedPage).toHaveURL(/games\/recent/);

    await recentlyPlayed.openGame('Chicken X');

    // Verify game launched — modal or game frame becomes visible
    await expect(authenticatedPage).not.toHaveURL(/games\/recent/);
  });

});
