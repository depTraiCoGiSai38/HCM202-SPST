import { expect, test } from '@playwright/test';

/**
 * Documentary positions and the motion added with them.
 *
 * The product has positions for photographs and no photograph that has cleared
 * a checkable source and a usage condition. These checks hold two things: that
 * the gap is stated on screen rather than hidden or faked, and that the motion
 * added around it reveals nothing and blocks nothing.
 */

test('the opening carries the sourced photograph, with the credit its source requires', async ({
  page,
}) => {
  await page.goto('/#/');

  const fig = page.locator('.figure').first();
  await expect(fig).toBeVisible();

  const img = fig.locator('.figure__img');
  await expect(img).toBeVisible();
  await expect(img).toHaveAttribute('src', /tu-lieu\//);

  // Intrinsic size is declared so the box is held before the file lands.
  await expect(img).toHaveAttribute('width', '900');
  await expect(img).toHaveAttribute('height', '1245');

  // A meaningful image needs a text alternative, and this one describes what is
  // visible rather than interpreting it.
  const alt = await img.getAttribute('alt');
  expect(alt ?? '').toContain('chân dung');
  expect((alt ?? '').length).toBeGreaterThan(60);

  /*
   * Gallica makes keeping the source line a condition of free reuse, so it has
   * to be on the surface rather than behind the magnifier. This assertion is
   * the licence condition, not a style preference.
   */
  const credit = fig.locator('.figure__cap-credit');
  await expect(credit).toBeVisible();
  await expect(credit).toHaveText('Source gallica.bnf.fr / Bibliothèque nationale de France');

  // The caption repeats what the holding institution says, and the status stays
  // visible beside it.
  await expect(fig.locator('.figure__cap-text')).toContainText('Agence Meurisse');
  await expect(fig.locator('.figure__cap-status')).toContainText('NEED VERIFICATION');
});

test('the figure carries its source, its rights and its identification separately', async ({
  page,
}) => {
  await page.goto('/#/');
  await page.locator('.figure .lens-trigger').click();

  const lens = page.locator('.lens');
  await expect(lens).toBeVisible();
  // The page anyone can open to check, and the page the conditions were read on.
  await expect(lens).toContainText('gallica.bnf.fr/ark:/12148/btv1b9054078w');
  await expect(lens).toContainText('conditions-dutilisation-de-gallica');
  // The usage condition, quoted rather than summarised.
  await expect(lens).toContainText('domaine public');
  await expect(lens).toContainText('réutilisation non commerciale');
  // Who the subject is said to be is its own entry, and still unverified.
  await expect(lens).toContainText('Nhận diện người trong ảnh');
  await expect(lens).toContainText('NEED VERIFICATION');
  await page.keyboard.press('Escape');
});

test('the enlarged view opens, carries the credit, and closes back to its trigger', async ({
  page,
}) => {
  await page.goto('/#/');
  const open = page.locator('.figure__open');
  await open.click();

  const shade = page.locator('.shade');
  await expect(shade).toBeVisible();
  await expect(shade.locator('.figure__img')).toBeVisible();
  // The attribution travels with the picture.
  await expect(shade.locator('.shade__cap-source')).toHaveText(
    'Source gallica.bnf.fr / Bibliothèque nationale de France',
  );

  // Escape closes it and focus returns to the control that opened it.
  await page.keyboard.press('Escape');
  await expect(shade).toBeHidden();
  await expect(open).toBeFocused();

  // And it opens from the keyboard too.
  await page.keyboard.press('Enter');
  await expect(shade).toBeVisible();
  await shade.locator('.shade__close').click();
  await expect(shade).toBeHidden();
});

test('every stage carries its own documentary position', async ({ page }) => {
  for (const id of ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5']) {
    await page.goto(`/#/chang/${id}`);
    const slot = page.locator('.walk__figure .figure--blocked');
    await expect(slot, id).toBeVisible();
    await expect(slot, id).toContainText('Tư liệu');
    await expect(page.locator('main img'), id).toHaveCount(0);
  }
});

test('the register publishes every position and every source that was opened', async ({ page }) => {
  await page.goto('/#/kiem-chung');
  const section = page.locator('#anh-tu-lieu');
  await expect(section).toBeVisible();

  // One row per position: one filled, five still blocked.
  await expect(section.locator('tbody').first().locator('tr')).toHaveCount(6);

  // Every source opened, with what it said - including the ones that did not
  // clear a slot, so nobody repeats the search, and including the correction to
  // the earlier reasoning rather than a quiet edit.
  await expect(section).toContainText('All rights reserved');
  await expect(section).toContainText('domaine public');
  await expect(section).toContainText('ĐÍNH CHÍNH');
  await expect(section.locator('tbody').nth(1).locator('tr')).toHaveCount(5);
});

test('the journey thread draws itself once and ends fully drawn', async ({ page }) => {
  await page.goto('/#/hanh-trinh');

  const lines = page.locator('.thread__line');
  await expect(lines).toHaveCount(5);

  // While it runs the drawing is marked, and every link is already live: the
  // animation never gates the content.
  await expect(page.locator('.atlas__stage-link').first()).toBeVisible();

  // It settles with no dash arithmetic left on any line, so the resting state
  // is a plain solid stroke.
  await expect
    .poll(
      async () =>
        page.evaluate(() =>
          [...document.querySelectorAll<SVGPathElement>('.thread__line')].every(
            (l) => l.style.strokeDasharray === '' && l.style.strokeDashoffset === '',
          ),
        ),
      { timeout: 5000 },
    )
    .toBe(true);
});

test('with reduced motion the thread is simply already drawn', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/hanh-trinh');

  // No drawing state is ever set, and no dash is applied.
  await expect(page.locator('.thread[data-drawing]')).toHaveCount(0);
  const clean = await page.evaluate(() =>
    [...document.querySelectorAll<SVGPathElement>('.thread__line')].every(
      (l) => l.style.strokeDasharray === '' && l.style.strokeDashoffset === '',
    ),
  );
  expect(clean).toBe(true);

  // And all five stages are reachable immediately.
  await expect(page.locator('.atlas__stage-link')).toHaveCount(5);
});

test('crossing a turning point marks the record without hiding anything', async ({ page }) => {
  await page.goto('/#/chang/ky-2');
  await page.locator('.walk__phase[data-phase="buoc-ngoat"]').click();
  await page.locator('.turn__cross').click();

  // The row fills in. The mark is a brief highlight on it, so the text it
  // carries is readable the whole time rather than fading in from nothing.
  const row = page.locator('.gained__item').first();
  await expect(row).toHaveAttribute('data-state', 'done');
  await expect(row.locator('.gained__shift')).toBeVisible();
  await expect(row.locator('.gained__shift')).not.toBeEmpty();
});
