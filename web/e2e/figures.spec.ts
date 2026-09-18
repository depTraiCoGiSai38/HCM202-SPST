import { expect, test } from '@playwright/test';

/**
 * Documentary positions and the motion added with them.
 *
 * Eight of the thirteen declared positions hold a document that has cleared a
 * checkable source and a published usage condition; five are still blocked.
 * These checks hold three things: that each remaining gap is stated on screen
 * rather than hidden or faked, that a document on screen carries the credit and
 * the evidence status its record requires, and that the motion added around all
 * of it reveals nothing and blocks nothing.
 */

// The Marseille plate lives in stage 3, where its own recorded date puts it
// (`SC-24`), so these three tests open that stage rather than `#/`.
test('the stage-3 anchor carries the sourced photograph, with the credit its source requires', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-3');

  const fig = page.locator('.walk__portrait .figure');
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

  // The caption repeats what the holding institution says.
  await expect(fig.locator('.figure__cap-text')).toContainText('Agence Meurisse');

  // No status chip on the caption; the status is reachable from the figure's
  // own source panel, and that is what is checked.
  await expect(fig.locator('.figure__cap-status')).toHaveCount(0);
  await fig.locator('.lens-trigger').click();
  await expect(page.locator('.lens')).toContainText('NEED VERIFICATION');
  await page.keyboard.press('Escape');
});

test('the figure carries its source, its rights and its identification separately', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-3');
  /*
    * No `.first()`: a figure renders exactly one lens trigger, so strict mode
    * still holds here and would fail loudly if a second control were ever added
    * to a figure. The repoint from the opening must not quietly trade that away.
    */
  await page.locator('.walk__portrait .figure .lens-trigger').click();

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

  /*
   * And the four reuse axes are four rows, not one. The one that matters is
   * the maker's position: the holder's `domaine public` label sits on its own
   * row and does not answer it.
   */
  await expect(lens).toContainText('Nơi giữ tuyên bố gì');
  await expect(lens).toContainText('Quyền của người tạo lập');
  await expect(lens).toContainText('Quyết định dùng lại');
  await expect(lens).toContainText('USE WITH CAUTION');

  // The event in the record stays out of scope even though the plate is now on
  // a stage. Moving it must not have widened what it claims.
  await expect(lens).toContainText('Marseille');
  await expect(lens).toContainText('NGOÀI');
  await page.keyboard.press('Escape');
});

/**
 * The opening carries no documentary position, and the record still does.
 *
 * Both halves matter: nothing renders on this screen, AND the position is still
 * reachable in the register. If the declaration is ever dropped too, the second
 * half fails - which is the point of keeping them in one test.
 */
test('the opening drops its documentary position from view without dropping it from the record', async ({
  page,
}) => {
  await page.goto('/#/');

  // Nothing of the figure apparatus is left on this screen - not a picture, not
  // a blocked line, not the empty column that used to hold either.
  await expect(page.locator('.hero__figure')).toHaveCount(0);
  await expect(page.locator('.hero .figure--blocked')).toHaveCount(0);

  /*
   * And the opening is still an opening: the identity block, one primary
   * action, and the journey thread that draws itself in below - `.thread__run`
   * is the opening thread's own path, not the five `.thread__line` segments of
   * the overview route.
   */
  await expect(page.locator('.hero__title')).toBeVisible();
  await expect(page.locator('.scene__go')).toHaveCount(1);
  await expect(page.locator('.scene__draw .thread__run')).toHaveCount(1);

  // The gap itself survives the removal, in the register, still unevidenced.
  await page.goto('/#/kiem-chung');
  const row = page.locator('tr').filter({ has: page.getByText('FS-open', { exact: true }) });
  await expect(row).toHaveCount(1);
  await expect(row).toContainText('NOT YET EVIDENCED');
});

test('the enlarged view opens, carries the credit, and closes back to its trigger', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-3');
  const open = page.locator('.walk__portrait .figure__open');
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

/*
 * Each stage entrance must be in exactly one of two states - filled, or visibly
 * blocked - and each state is checked in full. Splitting it this way is what
 * keeps the check from being relaxed as positions get filled.
 */
test('every stage entrance carries its primary position, filled or visibly blocked', async ({
  page,
}) => {
  // The two entrances that currently hold a document.
  const filled = ['ky-3', 'ky-5'];

  for (const id of ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5']) {
    await page.goto(`/#/chang/${id}`);

    // Exactly one position at the entrance: the primary anchor. The supporting
    // positions sit at the stations they support, so they never compete with
    // the chapter opening.
    const portrait = page.locator('.walk__portrait');
    await expect(portrait, id).toHaveCount(1);
    await expect(portrait.locator('.figure--blocked, .figure__frame'), id).toHaveCount(1);

    if (filled.includes(id)) {
      const img = portrait.locator('img');
      await expect(img, id).toHaveCount(1);
      // A local file, never a hotlink, and actually decoded rather than a
      // broken box with a caption under it.
      await expect(img, id).toHaveAttribute('src', /^\/?tu-lieu\//);
      expect(await img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      // The source line Gallica makes a condition of reuse, on the surface.
      await expect(portrait, id).toContainText(
        'Source gallica.bnf.fr / Bibliothèque nationale de France',
      );
      // The status is one control away rather than printed on the caption.
      await expect(portrait.locator('.figure__cap-status'), id).toHaveCount(0);
      await portrait.locator('.figure .lens-trigger').click();
      await expect(page.locator('.lens'), id).toContainText('NEED VERIFICATION');
      await page.keyboard.press('Escape');
      // No blocked note where a document is.
      await expect(portrait.locator('.figure--blocked'), id).toHaveCount(0);
      continue;
    }

    // Nothing has cleared for this stage, so the entrance states the gap.
    const note = portrait.locator('.figure--blocked');
    await expect(note, id).toBeVisible();
    await expect(note.locator('.station__flag'), id).toHaveCount(1);

    // It states why an image would be there, not merely where it would sit.
    const role = (await note.locator('.figure__blocked-role').textContent()) ?? '';
    expect(role.length, id).toBeGreaterThan(40);
    expect(role, id).not.toMatch(/^Tư liệu cho thời kỳ/);

    // A blocked position is never an image.
    await expect(portrait.locator('img'), id).toHaveCount(0);
  }
});

/**
 * The stage-5 anchor, in detail.
 *
 * This is the first photograph the product puts at a stage entrance, and the
 * reason it is allowed there is narrow: the publication printed the subject's
 * name in the caption under the picture, and printed a date that falls inside
 * the stage. Both of those have to be on screen, or the picture is standing on
 * a claim the reader cannot check.
 */
test('the stage-5 anchor shows the caption its publication printed, and claims nothing beyond it', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-5');
  const fig = page.locator('.walk__portrait .figure');

  // The caption is the magazine's own line, including its own spelling.
  await expect(fig.locator('.figure__cap-text')).toContainText('M. HO CHI MINH A VERSAILLES');
  await expect(fig.locator('.figure__cap-text')).toContainText('13-7-1946');

  await fig.locator('.lens-trigger').first().click();
  const lens = page.locator('.lens');
  // The item page anyone can open, and the page the conditions were read on.
  await expect(lens).toContainText('gallica.bnf.fr/ark:/12148/bd6t5144731t');
  await expect(lens).toContainText('conditions-dutilisation-de-gallica');
  await expect(lens).toContainText('domaine public');
  // Publication date and the undated event are kept apart, on the record.
  await expect(lens).toContainText('ngày xuất bản');
  // And the limit is published: the excerpt does not narrate the 1946 journey.
  await expect(lens).toContainText('không kể');
  await page.keyboard.press('Escape');
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
  /*
   * ky-4 is the stage whose two supporting positions are both still empty:
   * BLOCKED - FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED (`SC-25`).
   * The reason is stated narrowly on purpose - the queries run so far, in the
   * holdings opened so far, returned nothing. That is a fact about the search,
   * not a claim about what exists.
   *
   * A blocked supporting position must not put an empty frame into the middle
   * of a stage; it stays in the register instead.
   */
  await page.goto('/#/chang/ky-4');
  const next = page.locator('.walk__nav.btn--primary');
  const total = await page.locator('.walk__hit').count();
  for (let i = 0; i < total; i++) {
    await expect(page.locator('.station__support')).toHaveCount(0);
    if (i < total - 1) await next.click();
  }
});

/**
 * The two documents added on 18-9-2026, each beside the sentence it explains.
 *
 * Placement is the whole point of a supporting position: a map of Nghệ An is
 * evidence for the sentence about Nghệ An and for nothing else, and a newspaper
 * is evidence for the sentence that says he founded it. If either drifted to
 * another station it would be illustrating a claim it does not support, so the
 * station text is asserted alongside the picture.
 */
test('a supporting document sits at the exact sentence it explains', async ({ page }) => {
  const cases = [
    {
      stage: 'ky-1',
      inStation: 'Nghệ An',
      inCaption: 'Province de Nghe-An',
      credit: 'Humazur',
      src: /humazur-/,
    },
    {
      stage: 'ky-3',
      inStation: 'sáng lập báo Le Paria',
      inCaption: 'Le Paria : tribune des populations des colonies',
      credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
      src: /bpt6k7009345t/,
    },
    {
      stage: 'ky-5',
      inStation: 'tạm hoà hoãn với Pháp',
      inCaption: 'M. Ho Chi Minh et M. Marius Moutet',
      credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
      src: /bd6t5144731t-f3/,
    },
  ];

  for (const c of cases) {
    await page.goto(`/#/chang/${c.stage}`);
    const next = page.locator('.walk__nav.btn--primary');
    const panel = page.locator('.walk__panel');
    const support = page.locator('.station__support');
    const total = await page.locator('.walk__hit').count();

    /*
     * Walk to the station this document belongs to, not merely to the first
     * station that has a document. Stage 3 carries two, at P3-2 and P3-4, so
     * stopping at the first would have quietly checked the wrong one - which is
     * exactly the drift this test exists to catch.
     */
    for (let i = 0; i < total; i++) {
      const here = (await panel.textContent()) ?? '';
      if (here.includes(c.inStation)) break;
      await next.click();
    }
    await expect(panel, c.stage).toContainText(c.inStation);

    // And the document arrived with it, in the same panel.
    await expect(support, c.stage).toBeVisible();

    const img = support.locator('img');
    await expect(img, c.stage).toHaveCount(1);
    await expect(img, c.stage).toHaveAttribute('src', c.src);

    /*
     * Decoded, not a broken box with a caption under it.
     *
     * Scrolled into view first and then polled, because these load lazily: on a
     * phone a supporting document is below the fold, so reading `naturalWidth`
     * the instant the station renders measures the lazy-loading policy rather
     * than the file. Scrolling is what a reader does to see it.
     */
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(async () => img.evaluate((el) => (el as HTMLImageElement).naturalWidth), {
        timeout: 10_000,
        message: `${c.stage}: image never decoded`,
      })
      .toBeGreaterThan(0);

    // The caption says what the holder says, and the required credit is beside
    // the picture rather than behind a control.
    await expect(support.locator('.figure__cap-text'), c.stage).toContainText(c.inCaption);
    await expect(support.locator('.figure__cap-credit'), c.stage).toContainText(c.credit);
    // The status is checked where it lives, in this figure's own source panel.
    await expect(support.locator('.figure__cap-status'), c.stage).toHaveCount(0);
    await support.locator('.figure .lens-trigger').click();
    await expect(page.locator('.lens'), c.stage).toContainText('NEED VERIFICATION');
    await page.keyboard.press('Escape');

    // A meaningful image carries a description of what is visible in it.
    const alt = (await img.getAttribute('alt')) ?? '';
    expect(alt.length, c.stage).toBeGreaterThan(60);
  }
});

/**
 * Enlarging works from every filled position.
 *
 * The dialog is shared, but the trigger is rendered per figure, so the keyboard
 * path has to be checked where a reader will actually meet it. Since 19-9-2026
 * that is only ever a stage entrance or a station - the opening carries no
 * figure apparatus at all, which the test above pins at `.hero__figure` = 0.
 */
test('a stage document enlarges from the keyboard and returns focus', async ({ page }) => {
  await page.goto('/#/chang/ky-5');
  const open = page.locator('.walk__portrait .figure__open');
  await open.focus();
  await page.keyboard.press('Enter');

  const shade = page.locator('.shade');
  await expect(shade).toBeVisible();
  await expect(shade.locator('.figure__img')).toBeVisible();
  // The attribution travels with the picture into the enlarged view.
  await expect(shade.locator('.shade__cap-source')).toHaveText(
    'Source gallica.bnf.fr / Bibliothèque nationale de France',
  );
  // The enlarged sheet fits the viewport rather than overflowing the page.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);

  await page.keyboard.press('Escape');
  await expect(shade).toBeHidden();
  await expect(open).toBeFocused();
});

/**
 * The map is a map, and the product does not let it become a claim about a
 * person.
 *
 * A colonial-administration plate of a province, placed beside a sentence about
 * where someone grew up, is exactly the kind of image that invites a reader to
 * infer more than the record says. The description and the caption must stay
 * about the sheet.
 */
test('the 1909 province map names no person and claims no event', async ({ page }) => {
  await page.goto('/#/chang/ky-1');
  const next = page.locator('.walk__nav.btn--primary');
  const support = page.locator('.station__support');
  const total = await page.locator('.walk__hit').count();
  for (let i = 0; i < total && !(await support.isVisible()); i++) await next.click();

  const alt = (await support.locator('img').getAttribute('alt')) ?? '';
  const caption = (await support.locator('.figure__cap-text').textContent()) ?? '';
  for (const name of ['Hồ Chí Minh', 'Nguyễn Ái Quốc', 'Nguyễn Sinh Cung', 'Nguyễn Tất Thành']) {
    expect(alt, `alt must not name anyone: ${name}`).not.toContain(name);
    expect(caption, `caption must not name anyone: ${name}`).not.toContain(name);
  }

  // The record states plainly that it establishes a place, not a person.
  await support.locator('.lens-trigger').first().click();
  const lens = page.locator('.lens');
  await expect(lens).toContainText('không phải ảnh chân dung');
  // Humazur's conditions, read on Humazur's own page.
  await expect(lens).toContainText('humazur.univ-cotedazur.fr');
  await expect(lens).toContainText('Domaine public');
  await page.keyboard.press('Escape');
});

test('the register publishes every position and every source that was opened', async ({ page }) => {
  await page.goto('/#/kiem-chung');
  const section = page.locator('#anh-tu-lieu');
  await expect(section).toBeVisible();

  /*
   * One row per declared position: the opening, five stage anchors and seven
   * supporting positions - stage 3 and stage 5 each carry two, which the data
   * model has always allowed (one to three per stage) and which was first used
   * on 18-9-2026.
   *
   * The numbers below are pinned deliberately. A browser test cannot import the
   * data module, so a derived count here would be no check at all; the point of
   * this screen is that it is complete, so a position quietly vanishing from it
   * must fail. When a position is added or cleared these three lines move, and
   * moving them is the moment someone has to say so out loud.
   */
  await expect(section.locator('tbody').first().locator('tr')).toHaveCount(13);

  // And the register must agree with what the product displays: eight positions
  // hold a document, five are still blocked.
  const rows = section.locator('tbody').first().locator('tr');
  await expect(rows.locator('.chip', { hasText: 'NOT YET EVIDENCED' })).toHaveCount(5);
  await expect(rows.locator('.chip', { hasText: 'NEED VERIFICATION' })).toHaveCount(8);

  /*
   * The reuse decision is its own column, added 19-9-2026, because evidence
   * status and reuse decision answer different questions and a document can be
   * fully traced while what may be done with it is still open.
   *
   * Four `USE WITH CAUTION`: three press photographs whose agency or
   * photographer is named on the item or in the record, and the 1946 page that
   * belongs to the same publication as one of them. Four `USE`: a map and three
   * printed sheets, where no photographic authorship claim arises.
   *
   * `hasText` matches substrings, so a bare 'USE' filter would also catch
   * 'USE WITH CAUTION'. The exact-text filter below is deliberate.
   */
  await expect(rows.locator('.chip', { hasText: 'USE WITH CAUTION' })).toHaveCount(4);
  await expect(rows.locator('.chip', { hasText: /^USE$/ })).toHaveCount(4);

  // Every source opened, with what it said - including the ones that did not
  // clear a slot, so nobody repeats the search, and including the correction to
  // the earlier reasoning rather than a quiet edit.
  await expect(section).toContainText('All rights reserved');
  await expect(section).toContainText('domaine public');
  await expect(section).toContainText('ĐÍNH CHÍNH');

  /*
   * Twenty-six checks: five from the first search round, four Gallica catalogue
   * queries from the second, six from the third, eight from the fourth on
   * 18-9-2026, and three project rulings on 19-9-2026 - the reassignment, the
   * stage-4 wording, and the 1946 reuse classification.
   *
   * The count is explicit rather than derived, because a browser test cannot
   * import the data module. It is deliberately exact: this register exists to
   * be complete, so a check quietly disappearing from it should fail. The
   * content assertions below pin what the newest rows must actually say, so the
   * number alone cannot drift into meaning nothing.
   */
  await expect(section.locator('tbody').nth(1).locator('tr')).toHaveCount(26);

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

  /*
   * The fourth round, including the parts of it that did not go well. A
   * register that published only the finds would be a sales page.
   */
  // The reference repository is named as a discovery source and nothing more.
  await expect(section).toContainText('nguồn phát hiện');
  // "No terms found" is recorded as unestablished, never as forbidden.
  await expect(section).toContainText('CHƯA XÁC LẬP ĐIỀU KIỆN SỬ DỤNG');
  // A previous round's query was wrong, and the register says which one.
  await expect(section).toContainText('Le Paria');
  await expect(section).toContainText('sai vì cách đặt truy vấn');
  // The awkward locator is explained rather than smoothed away.
  await expect(section).toContainText('f82');
  // And the decision that was NOT taken by the agent is on the page, next to
  // the ruling that a person later made on it.
  await expect(section).toContainText('KHÔNG tự chuyển');
  await expect(section).toContainText('việc của người duyệt');

  /*
   * The three rulings of 19-9-2026, and the fact that each one reversed or
   * corrected something. A register that showed only the outcome and not the
   * turn would be rewriting history quietly, which is the one thing the project
   * treats as worse than being wrong.
   */
  // The reassignment, with the old reasoning restated rather than erased.
  await expect(section).toContainText('ĐÃ CHUYỂN');
  await expect(section).toContainText('SỰ KIỆN');
  await expect(section).toContainText('THỜI KỲ');
  await expect(section).toContainText('lật nó trong im lặng');
  // Stage 4 reopened: blocked, not closed.
  await expect(section).toContainText('BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED');
  await expect(section).toContainText('không chứng minh');
  await expect(section).toContainText('không phải bằng chứng rằng chặng 4 là bất khả');
  // The 1946 classification, and the conclusion it refuses to draw.
  await expect(section).toContainText('USE WITH CAUTION');
  await expect(section).toContainText('Parnotte');
  await expect(section).toContainText('CHƯA XÁC LẬP');
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
