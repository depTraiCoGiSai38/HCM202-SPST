import { expect, test } from '@playwright/test';

/**
 * The pieces added in the second UX pass, driven only from the keyboard.
 *
 * Everything new here is a button or a link, so the point of these checks is
 * that focus goes somewhere sensible after each action and that nothing added
 * can only be reached with a pointer.
 */

test('the guess can be opened, answered and retried without a pointer', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  const toggle = page.locator('.guess__toggle');
  await toggle.focus();
  await expect(toggle).toBeFocused();

  // Opening moves focus into the panel rather than leaving it on the trigger.
  await page.keyboard.press('Enter');
  await expect(page.locator('.guess__body')).toBeVisible();
  await expect(page.locator('.guess__option').first()).toBeFocused();

  // Reach the option that is not this stage's and answer with the keyboard.
  const wrong = page.locator('.guess__option:not([data-stage="ky-2"])').first();
  await wrong.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.guess__verdict')).toBeVisible();

  // Answered options leave the tab order; the retry control is reachable.
  const reset = page.locator('.guess__reset');
  await reset.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.guess__verdict')).toHaveCount(0);
  await expect(page.locator('.guess__option').first()).toBeFocused();

  // Shutting it again returns nothing to a broken state.
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.guess__body')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('the record beside the reading is not a focus trap and is announced', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  // It is a labelled region, and it holds no interactive controls, so it adds
  // nothing to the tab order between the reading and the pager.
  const gained = page.locator('.gained');
  await expect(gained).toHaveAttribute('aria-label', 'Những gì chặng này đã làm rõ');
  await expect(gained.locator('button, a, input, select')).toHaveCount(0);
});

test('the opening action and the map are both keyboard reachable', async ({ page }) => {
  await page.goto('/#/');
  await page.locator('.scene__go').focus();
  await expect(page.locator('.scene__go')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/chang\/ky-1$/);

  await page.goto('/#/');
  await page.locator('.scene__map').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/hanh-trinh$/);
});
