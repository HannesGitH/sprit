import { expect, test } from '@playwright/test';

test('skippo', async ({ page }) => {
	await page.goto('/');
	// expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
});
