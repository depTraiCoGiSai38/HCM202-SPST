import { type Page, expect, test } from '@playwright/test';

/**
 * Keyboard operation of the two activities that rebuild themselves.
 *
 * Both clear and re-create their controls on every interaction. That detaches
 * the button the keyboard was standing on, and without care focus falls to the
 * document body, which strands a keyboard user mid-activity. The earlier tests
 * drove these screens with the mouse and so never saw it.
 *
 * Every step here is a key press, and after each one focus must be on a real,
 * attached, enabled control - never BODY, never something removed from the DOM.
 */

interface FocusState {
  tag: string;
  attached: boolean;
  cls: string;
  disabled: boolean;
}

async function focusState(page: Page): Promise<FocusState> {
  return page.evaluate(() => {
    const el = document.activeElement;
    return {
      tag: el?.tagName ?? 'NONE',
      attached: Boolean(el && el !== document.body && el.isConnected),
      cls: el instanceof HTMLElement ? el.className : '',
      disabled: el instanceof HTMLButtonElement ? el.disabled : false,
    };
  });
}

async function expectLiveFocus(page: Page, where: string): Promise<FocusState> {
  const f = await focusState(page);
  expect(f.tag, `${where}: focus fell to ${f.tag}`).not.toBe('BODY');
  expect(f.attached, `${where}: focus is on a detached element`).toBe(true);
  expect(f.disabled, `${where}: focus is on a disabled control`).toBe(false);
  return f;
}

test('connect stays operable from the keyboard through every outcome', async ({ page }) => {
  await page.goto('/#/noi-ket');

  const row = page.locator('.join__row').first();
  const other = page.locator('.join__row').nth(1);

  // Choosing an experience.
  await row.locator('.join__end[data-side="experience"]').focus();
  await page.keyboard.press('Enter');
  const picked = await expectLiveFocus(page, 'after choosing an experience');
  expect(picked.cls).toContain('join__end');

  // A wrong join.
  await other.locator('.join__end[data-side="recognition"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.join__status')).toContainText('Chưa khớp');
  await expectLiveFocus(page, 'after a wrong join');

  // The correct join. Both ends of the row become disabled, so focus has to
  // move somewhere still live rather than staying put.
  await row.locator('.join__end[data-side="recognition"]').focus();
  await page.keyboard.press('Enter');
  await expect(row).toHaveAttribute('data-state', 'joined');
  await expectLiveFocus(page, 'after joining');

  // Changing stage rebuilds the whole board.
  await page.locator('.join__stage').nth(4).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.join__row')).toHaveCount(3);
  await expectLiveFocus(page, 'after changing stage');
});

test('synthesis stays operable from the keyboard and ends on the payoff', async ({ page }) => {
  await page.goto('/#/tong-hop');

  const ORDER = [
    'từ ngày 5-6-1911 trở về trước',
    'từ ngày 6-6-1911',
    'từ ngày 31-12-1920',
    'từ ngày 4-2-1930',
    'từ ngày 29-1-1941',
  ];

  // Choosing a segment.
  await page.locator('.weave__piece').first().focus();
  await page.keyboard.press('Enter');
  await expectLiveFocus(page, 'after choosing a segment');

  // Placing it, then lifting it out again.
  await page.locator('.weave__slot-btn').first().focus();
  await page.keyboard.press('Enter');
  await expectLiveFocus(page, 'after placing a segment');

  await page.keyboard.press('Enter');
  await expectLiveFocus(page, 'after lifting a segment out');

  // Starting over.
  await page.getByRole('button', { name: 'Làm lại' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.weave__piece')).toHaveCount(5);
  await expectLiveFocus(page, 'after reset');

  // Building the whole thread with the keyboard only.
  for (const [position, key] of ORDER.entries()) {
    const pieces = page.locator('.weave__piece');
    const n = await pieces.count();
    let placed = false;
    for (let i = 0; i < n; i++) {
      if ((await pieces.nth(i).innerText()).includes(key)) {
        await pieces.nth(i).focus();
        await page.keyboard.press('Enter');
        await page.locator('.weave__slot').nth(position).locator('.weave__slot-btn').focus();
        await page.keyboard.press('Enter');
        placed = true;
        break;
      }
    }
    expect(placed, `no segment for position ${String(position + 1)}`).toBe(true);
    await expectLiveFocus(page, `at position ${String(position + 1)}`);
  }

  // Finishing puts the reader on the result, not back among the controls.
  await expect(page.locator('.weave__thread')).toHaveAttribute('data-joined', 'true');
  const landed = await page.evaluate(() => document.activeElement?.className ?? '');
  expect(landed, 'focus did not land on the Central Question').toContain('weave__question');
  await expect(page.locator('.weave__question')).toBeInViewport();
});
