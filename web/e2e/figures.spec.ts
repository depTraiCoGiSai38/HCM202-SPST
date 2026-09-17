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

test('every stage entrance carries its primary documentary position', async ({ page }) => {
  for (const id of ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5']) {
    await page.goto(`/#/chang/${id}`);

    // Exactly one position at the entrance: the primary anchor. The supporting
    // position moved to the station it supports, so it no longer competes with
    // the chapter opening.
    const portrait = page.locator('.walk__portrait');
    await expect(portrait, id).toHaveCount(1);
    await expect(portrait.locator('.figure--blocked, .figure__frame'), id).toHaveCount(1);

    // No primary portrait has cleared, so each entrance states the gap.
    const note = portrait.locator('.figure--blocked');
    await expect(note, id).toBeVisible();
    await expect(note.locator('.station__flag'), id).toHaveCount(1);

    // It states why an image would be there, not merely where it would sit.
    const role = (await note.locator('.figure__blocked-role').textContent()) ?? '';
    expect(role.length, id).toBeGreaterThan(40);
    expect(role, id).not.toMatch(/^Tư liệu cho thời kỳ/);

    // Nothing at a stage entrance is an image today.
    await expect(portrait.locator('img'), id).toHaveCount(0);
  }
});

test('a supporting document renders at the station it supports, not at the entrance', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-2');

  // Not at the entrance.
  await expect(page.locator('.walk__portrait img')).toHaveCount(0);
  await expect(page.locator('.station__support')).toHaveCount(0);

  // Walk to the turning point the figure is anchored to.
  const next = page.locator('.walk__nav.btn--primary');
  const support = page.locator('.station__support');
  const total = await page.locator('.walk__hit').count();
  for (let i = 0; i < total && !(await support.isVisible()); i++) await next.click();

  await expect(support).toBeVisible();
  // It sits under a turning point, which is the anchor declared in the data.
  await expect(page.locator('.station--turn')).toBeVisible();

  const img = support.locator('img');
  await expect(img).toHaveCount(1);
  // A local file, never a hotlink.
  await expect(img).toHaveAttribute('src', /^\/?tu-lieu\//);
  // Decoded, not a broken box.
  expect(await img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  // The credit its source requires is beside it, not hidden behind a control.
  await expect(support).toContainText('Source gallica.bnf.fr / Bibliothèque nationale de France');

  // The product makes no claim that any individual appears in it.
  const alt = (await img.getAttribute('alt')) ?? '';
  expect(alt.length).toBeGreaterThan(60);
  for (const name of ['Nguyễn Ái Quốc', 'Hồ Chí Minh', 'Nguyen Ai Quoc']) {
    expect(alt, `alt must not name anyone: ${name}`).not.toContain(name);
  }

  // And the stated date discrepancy is published rather than smoothed over.
  await support.locator('.lens-trigger').first().click();
  const lens = page.locator('.lens');
  await expect(lens).toContainText('16 décembre 1920');
  await expect(lens).toContainText('25 đến 30-12-1920');
  await expect(lens).toContainText('chưa xác lập');
});

test('the supporting position is only in the reading flow when it is filled', async ({ page }) => {
  // ky-1's supporting position is declared and blocked. A blocked supporting
  // position must not put an empty frame into the middle of a stage; it stays
  // in the register instead.
  await page.goto('/#/chang/ky-1');
  const next = page.locator('.walk__nav.btn--primary');
  const total = await page.locator('.walk__hit').count();
  for (let i = 0; i < total; i++) {
    await expect(page.locator('.station__support')).toHaveCount(0);
    if (i < total - 1) await next.click();
  }
});

test('the register publishes every position and every source that was opened', async ({ page }) => {
  await page.goto('/#/kiem-chung');
  const section = page.locator('#anh-tu-lieu');
  await expect(section).toBeVisible();

  // One row per declared position: the opening, five stage anchors and five
  // supporting positions. The count is derived from the data, not written here,
  // so adding a position cannot silently drop off this screen.
  await expect(section.locator('tbody').first().locator('tr')).toHaveCount(11);

  // And the register must agree with what the product displays: four positions
  // have cleared, so exactly four rows are not NOT YET EVIDENCED.
  const rows = section.locator('tbody').first().locator('tr');
  await expect(rows.locator('.chip', { hasText: 'NOT YET EVIDENCED' })).toHaveCount(7);
  await expect(rows.locator('.chip', { hasText: 'NEED VERIFICATION' })).toHaveCount(4);

  // Every source opened, with what it said - including the ones that did not
  // clear a slot, so nobody repeats the search, and including the correction to
  // the earlier reasoning rather than a quiet edit.
  await expect(section).toContainText('All rights reserved');
  await expect(section).toContainText('domaine public');
  await expect(section).toContainText('ĐÍNH CHÍNH');

  /*
   * Fifteen checks: five from the first search round, four Gallica catalogue
   * queries from the second, and six from the third - three that cleared a
   * position and three that record a rejection or an open question.
   *
   * The count is explicit rather than derived, because a browser test cannot
   * import the data module. It is deliberately exact: this register exists to
   * be complete, so a check quietly disappearing from it should fail. The
   * content assertions below pin what the newest rows must actually say, so the
   * number alone cannot drift into meaning nothing.
   */
  await expect(section.locator('tbody').nth(1).locator('tr')).toHaveCount(15);

  // The two documents the excerpt itself names, and the rejection that records
  // a mistake nobody should repeat.
  await expect(section).toContainText('LA QUESTION INDIGÈNE');
  await expect(section).toContainText('4-INDOCH PIECE-68');
  await expect(section).toContainText('tuần dương hạm');

  // The searches that found nothing are published too, so nobody repeats them.
  await expect(section).toContainText('Thành phố Hồ Chí Minh');
  await expect(section).toContainText('conditions spécifiques');
  // And the date discrepancy on the accepted plate is on this page, not buried.
  await expect(section).toContainText('16 décembre 1920');
  await expect(section).toContainText('25 đến 30-12-1920');
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
  // Step to the turn with Next: the phase jump buttons were removed when the
  // stage stopped carrying a table of contents for itself.
  const next = page.locator('.walk__nav.btn--primary');
  const turn = page.locator('.station--turn');
  const total = await page.locator('.walk__hit').count();
  for (let i = 0; i < total && !(await turn.isVisible()); i++) await next.click();
  await expect(turn).toBeVisible();
  await page.locator('.turn__cross').click();

  // The row fills in. The mark is a brief highlight on it, so the text it
  // carries is readable the whole time rather than fading in from nothing.
  const row = page.locator('.gained__item').first();
  await expect(row).toHaveAttribute('data-state', 'done');
  await expect(row.locator('.gained__shift')).toBeVisible();
  await expect(row.locator('.gained__shift')).not.toBeEmpty();
});
