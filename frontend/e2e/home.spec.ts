import { expect, test } from '@playwright/test';

test('shows a healthy application from the packaged frontend', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', {name: 'Hinkle'})).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('Connected');
});
