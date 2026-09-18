import { expect, test } from '@playwright/test';

/**
 * The plate.
 *
 * These checks hold the three things the plate claims about itself, because a
 * drawing cannot be trusted to keep a promise on its own:
 *
 *   1. it says out loud where the excerpt does NOT give a place, rather than
 *      leaving a silent gap that reads as "nothing happened here";
 *   2. it is decoration, and everything it draws is also present as text, so
 *      nothing becomes unreachable if the drawing does not render;
 *   3. it spends none of the density budget the previous UX pass won - no new
 *      navigation system, no new control, no new badge.
 */

test('a stage entrance says where the excerpt puts it, and where it does not', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  const block = page.locator('.plate-block');
  await expect(block).toBeVisible();
  await expect(block.locator('.plate__svg')).toBeVisible();

  // The printed place names of stage 2 that the excerpt actually carries.
  const rows = block.locator('.plate-block__list');
  await expect(rows).toContainText('thành phố Tua');
  await expect(rows).toContainText('Hội nghị Vécxây');

  // And the gap, stated rather than hidden: the excerpt gives July 1920 a date
  // and no place at all.
  const unplacedRow = block.locator('.plate-row', { hasText: '7-1920' });
  await expect(unplacedRow.locator('.plate-row__where--none')).toHaveCount(1);

  // The dash is explained once, in a legend, for a sighted reader.
  await expect(block.locator('.plate-block__legend')).toContainText('không in địa điểm');
});

test('the count under the plate is derived, and matches the rows drawn', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  const note = await page.locator('.plate-block__note').innerText();
  // Stage 2: the excerpt places 5 of its 8 recorded matters.
  expect(note).toMatch(/\b5\b/);
  expect(note).toMatch(/\b8\b/);

  const dashes = await page.locator('.plate-block .plate-row__where--none').count();
  expect(dashes).toBe(3);
});

test('a stage the excerpt never places says so instead of looking broken', async ({ page }) => {
  await page.goto('/#/chang/ky-5');

  // Stage 5 names only a country and two half-countries. Nothing is drawable,
  // so the plate is legitimately empty - and the caption has to carry that.
  await expect(page.locator('.plate-block .plate__mark')).toHaveCount(0);
  await expect(page.locator('.plate-block__note')).toContainText(
    'Không sự việc nào của chặng được trích đoạn đặt vào một điểm',
  );

  // The most famous date in the stage is one the excerpt does not place.
  const row = page.locator('.plate-row', { hasText: '2-9-1945' });
  await expect(row.locator('.plate-row__where--none')).toHaveCount(1);
});

test('the only drawn journey lines are in the stage whose text states one', async ({ page }) => {
  // Stage 4 is the one stage in which the excerpt says outright that he moved
  // from a named place to another named place.
  await page.goto('/#/chang/ky-4');
  // Exactly two movements are drawn for stage 4, MV-4a and MV-4b, and each
  // emits one path. `not.toHaveCount(0)` passed with one, so dropping either
  // movement would not have failed.
  await expect(page.locator('.plate-block .plate__move')).toHaveCount(2);

  // Stage 3's places are where TEXTS were published, not where he is said to
  // have been, so nothing may be joined up.
  await page.goto('/#/chang/ky-3');
  await expect(page.locator('.plate-block .plate__move')).toHaveCount(0);
});

test('the drawing is decoration, and carries nothing that is not also text', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  const svg = page.locator('.plate__svg').first();
  await expect(svg).toHaveAttribute('aria-hidden', 'true');
  await expect(svg).toHaveAttribute('focusable', 'false');

  // No focusable element anywhere inside the drawn layer: an aria-hidden
  // subtree that can take focus is a trap for a keyboard user.
  const focusable = await svg.locator('a, button, [tabindex], input, select').count();
  expect(focusable).toBe(0);

  // Every place the plate draws is readable as text in the same view.
  await expect(page.locator('.plate-block__list')).toContainText('Pháp');
});

/**
 * A placed stop names its place; an unplaced one says nothing in the reading.
 *
 * The unplaced events are still named in the register, so the walk is checked
 * for silence and the register for the record. If the register stops listing
 * them, the gap really would have vanished, and this fails.
 */
test('walking a stage names a printed place, and the unplaced ones are kept in the register', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-2');

  const next = page.locator('.walk__nav.btn--primary');
  let placed = false;

  for (let i = 0; i < 20; i++) {
    const panel = await page.locator('.walk__panel').innerText();
    if (panel.includes('Nơi chốn:')) placed = true;
    // The removed sentence must not come back anywhere in the reading.
    expect(panel).not.toContain('Trích đoạn không in địa điểm cho mốc này');
    if (placed) break;
    if (!(await next.isEnabled())) break;
    await next.click();
  }

  expect(placed, 'a stop the excerpt places should name its place').toBe(true);

  // And the unplaced events are still reported, in the register.
  await page.goto('/#/kiem-chung');
  await expect(page.locator('body')).toContainText('trích đoạn không in địa điểm');
});

test('the plate adds no navigation, no control and no badge', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  // No zoom, pan or reset: framing is authored per stage from the content.
  const controls = await page.locator('.plate button, .plate a, .plate input').count();
  expect(controls).toBe(0);

  // The one control the block owns is the existing evidence lens, which is the
  // same affordance used everywhere else in the product.
  await expect(page.locator('.plate-block .lens-trigger')).toHaveCount(1);

  // The stage screen's status-label budget is 4 and every one of them is
  // mandatory, but only three of the four sit inside `.walk__head`: the fourth,
  // `jbar__where`, lives in the journey bar outside this scope. So the number
  // this assertion enforces is 3, not 4. (The comment said 4 and guarded
  // against "a fifth" while the line below asserted <= 3; corrected 18-9-2026.)
  const badges = await page.locator('.walk__head .chip, .walk__head .station__flag').count();
  expect(badges).toBeLessThanOrEqual(3);
});

test('the overview reads the same five stages a second way, without becoming a destination', async ({
  page,
}) => {
  await page.goto('/#/hanh-trinh');

  const space = page.locator('.atlas-space');
  await expect(space).toBeVisible();
  await expect(space.locator('.plate__svg')).toBeVisible();

  // Three derived counts, all computed from the data at render time.
  await expect(space.locator('.atlas-space__stat')).toHaveCount(3);

  // It adds no link, so it cannot become a second way to move through the
  // product. The one control is the same evidence lens used elsewhere.
  const links = await space.locator('a').count();
  expect(links).toBe(0);
});

test('the register carries coordinate provenance and the unplaced list', async ({ page }) => {
  await page.goto('/#/kiem-chung');

  const section = page.locator('#noi-chon');
  await expect(section).toBeVisible();

  // A coordinate is quoted from a record a person can open, never asserted.
  await expect(section).toContainText('Wikidata');
  await expect(section.locator('a[href*="wikidata.org/wiki/Q"]').first()).toBeVisible();

  // And it stays unverified, like everything else in this product.
  await expect(section).toContainText('NEED VERIFICATION');

  // The gaps are listed, not hidden.
  await expect(section).toContainText('Sự việc trích đoạn không in địa điểm');
});

/*
 * Reduced motion, via the fixture rather than a hand-rolled second context:
 * one context per worker, and no extra browser startup to go wrong mid-suite.
 */
test.describe('with motion switched off at the system level', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the plate is fully drawn, with nothing hidden behind motion', async ({ page }) => {
    await page.goto('/#/hanh-trinh');
    await expect(page.locator('.atlas-space .plate__svg')).toBeVisible();
    await expect(page.locator('.atlas-space .plate__land')).toBeVisible();

    await page.goto('/#/chang/ky-4');
    // Every mark and every row is present without any motion having run.
    await expect(page.locator('.plate-block .plate__mark').first()).toBeVisible();
    const rows = await page.locator('.plate-block .plate-row').count();
    expect(rows).toBeGreaterThan(4);
  });
});

/*
 * The basemap's orientation layers.
 *
 * The unit tests hold the DATA - that a boundary path exists, that both
 * archipelagos kept their islets, that the sources are still cited. These hold
 * the DRAWING, which is a different question: geometry can be perfectly correct
 * in `land.ts` and still never reach the screen.
 *
 * None of them adjudicates anything. A browser test cannot settle a territorial
 * dispute. They check that the product renders what the cited source says, and
 * that the text beside the plate still carries the same facts for a reader who
 * never sees the drawing.
 */
test('the plate draws national boundaries, and draws them under the narrative', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-1');

  const border = page.locator('.plate-block .plate__border');
  await expect(border).toHaveCount(1);

  const d = (await border.getAttribute('d')) ?? '';
  expect(d.length).toBeGreaterThan(10000);
  // Open polylines only. A closed subpath would be a filled country shape.
  expect(d).not.toMatch(/[Zz]/);

  /*
   * The hierarchy the whole sprint turns on: COASTLINE < BORDER < ROUTE.
   *
   * The first implementation had the first pair the wrong way round - a border
   * quieter than, and in the same token as, the coastline it had to be
   * distinguished from - and this test asserted the inversion, so it passed. A
   * border separates land from land and has only its line to do it with; a
   * coastline also gets a land/sea tonal step for free. Equal weight is not
   * equal legibility, and less weight is not restraint, it is absence.
   *
   * Read from computed style, so a later override cannot quietly invert it.
   */
  const weights = await page.evaluate(() => {
    const cs = (sel: string) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el) : null;
    };
    const weight = (sel: string) => {
      const c = cs(sel);
      if (!c) return Number.NaN;
      return Number.parseFloat(c.strokeWidth) * Number.parseFloat(c.opacity || '1');
    };
    const border = cs('.plate-block .plate__border');
    return {
      border: weight('.plate-block .plate__border'),
      land: weight('.plate-block .plate__land'),
      borderStroke: border?.stroke ?? '',
      landStroke: cs('.plate-block .plate__land')?.stroke ?? '',
      borderWidth: border ? Number.parseFloat(border.strokeWidth) : Number.NaN,
      borderOpacity: border ? Number.parseFloat(border.opacity) : Number.NaN,
    };
  });
  expect(weights.land).toBeLessThan(weights.border);

  /*
   * VISIBILITY GUARD. Structural presence is not the requirement; a viewer being
   * able to see it is. These three are the exact ways the first pass failed.
   */
  // 1. Not transparent.
  expect(weights.borderOpacity).toBeGreaterThanOrEqual(0.6);
  // 2. At least a full pixel. A sub-pixel stroke is spread over two pixel rows
  //    by antialiasing and reaches its nominal colour in neither - measured at
  //    0.8px, the painted contrast was 2.15:1 against 4.53:1 nominal.
  expect(weights.borderWidth).toBeGreaterThanOrEqual(1);
  // 3. NOT the same ink as the coastline, which is what made the two
  //    indistinguishable however carefully the widths were tuned.
  expect(weights.borderStroke).not.toBe(weights.landStroke);
});

test('the boundary layer is national only, with no province mesh', async ({ page }) => {
  await page.goto('/#/chang/ky-1');

  // One path, not a per-country or per-province set of them.
  await expect(page.locator('.plate-block .plate__border')).toHaveCount(1);

  const segments = await page.evaluate(() => {
    const el = document.querySelector('.plate-block .plate__border');
    return ((el?.getAttribute('d') ?? '').match(/M/g) ?? []).length;
  });
  // Natural Earth 1:110m yields 326 national land-boundary segments. An Admin-1
  // dataset would be several times this.
  expect(segments).toBeGreaterThan(200);
  expect(segments).toBeLessThan(600);
});

test('a Vietnam-framed plate draws the offshore island groups, unnamed', async ({ page }) => {
  await page.goto('/#/chang/ky-1');

  const plate = page.locator('.plate-block');
  // 7 islets in the northern group plus 12 in the southern one, as symbols.
  await expect(plate.locator('.plate__isle')).toHaveCount(19);

  /*
   * NO NAME, anywhere on this screen. PROJECT DECISION, 2026-09-18: the subject
   * is the formation of Hồ Chí Minh's thought, and naming these groups on the
   * plate made a sovereignty statement the product has no need and no standing
   * to make. This asserts it over the whole rendered page, not just the svg, so
   * it cannot creep back in through a caption, a lens or a register line.
   */
  const body = (await page.locator('body').innerText()).toLowerCase();
  expect(body).not.toContain('hoàng sa');
  expect(body).not.toContain('trường sa');

  // Drawn as a symbol, never as land: it must not carry the land fill.
  const fills = await page.evaluate(() => {
    const isle = document.querySelector('.plate-block .plate__isle');
    const land = document.querySelector('.plate-block .plate__land');
    return {
      isle: isle ? getComputedStyle(isle).fill : '',
      land: land ? getComputedStyle(land).fill : '',
    };
  });
  expect(fills.isle).not.toBe(fills.land);
});

test('stage 5 has no historical marks and still draws a complete basemap', async ({ page }) => {
  // The stage whose plate is legitimately empty of marks. The basemap under it
  // still has to render, or the empty plate reads as a broken one.
  await page.goto('/#/chang/ky-5');

  await expect(page.locator('.plate-block .plate__mark')).toHaveCount(0);
  await expect(page.locator('.plate-block .plate__land')).toBeVisible();
  await expect(page.locator('.plate-block .plate__border')).toHaveCount(1);
  await expect(page.locator('.plate-block .plate__vn-islands')).toHaveCount(1);
  // Stage 5 frames Vietnam at 26 degrees, so both clusters resolve and are named.
  await expect(page.locator('.plate-block .plate__isle')).toHaveCount(19);
  // Unnamed, so no label element exists at all.
  await expect(page.locator('.plate-block .plate__isle-label')).toHaveCount(0);
});

test('a wide framing draws no offshore island marks at all', async ({ page }) => {
  /*
   * At a whole-world framing the islets land within a few canvas units of each
   * other. Drawn individually they merge into a solid mass darker than the land
   * beside them - an island that does not exist. An earlier revision drew one
   * large ring per group instead and that was worse: a circle carries nothing
   * about a group's distribution, shape or orientation, so it was a big mark
   * asserting a presence without saying anything true about it.
   *
   * At this scale the honest answer is to draw nothing. The register says in
   * words that the 1:110m dataset does not contain these features at all.
   */
  await page.goto('/#/chang/ky-2');
  await expect(page.locator('.plate-block .plate__isle')).toHaveCount(0);

  await page.goto('/#/hanh-trinh');
  await expect(page.locator('.atlas-space .plate__isle')).toHaveCount(0);

  // And no name on the entry view either.
  const body = (await page.locator('body').innerText()).toLowerCase();
  expect(body).not.toContain('hoàng sa');
  expect(body).not.toContain('trường sa');
});

test("Vietnam's coastal islands are drawn, which 1:110m alone cannot do", async ({ page }) => {
  // `QCVN 80:2024/BTNMT` clause 1.1 names `đảo` beside `quần đảo`. The world
  // land layer resolves none of them, so without this layer a Vietnam framing
  // would be mainland-only - the exact reduction the brief rules out.
  await page.goto('/#/chang/ky-1');

  const islands = page.locator('.plate-block .plate__vn-islands');
  await expect(islands).toHaveCount(1);

  const d = (await islands.getAttribute('d')) ?? '';
  // 24 closed polygons. Closed, unlike a border; real shapes, unlike a symbol.
  expect((d.match(/M/g) ?? []).length).toBe(24);
  expect(d).toMatch(/Z/);

  // They are land, so they carry the land's own fill, not the symbol treatment.
  const fills = await page.evaluate(() => {
    const isl = document.querySelector('.plate-block .plate__vn-islands');
    const land = document.querySelector('.plate-block .plate__land');
    return {
      islands: isl ? getComputedStyle(isl).fill : '',
      land: land ? getComputedStyle(land).fill : '',
    };
  });
  expect(fills.islands).toBe(fills.land);
});

test('the basemap adds nothing to the accessibility tree and no keyboard trap', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-1');

  const svg = page.locator('.plate-block .plate__svg').first();
  await expect(svg).toHaveAttribute('aria-hidden', 'true');

  // Borders, island marks and their labels are all inside the decorative layer,
  // so none of them can take focus or be enumerated by a screen reader.
  const focusable = await svg.locator('a, button, [tabindex], input, select').count();
  expect(focusable).toBe(0);
  await expect(svg.locator('.plate__border')).toHaveCount(1);
  await expect(svg.locator('.plate__isle')).toHaveCount(19);
});

test('the register carries the cartographic sources, kept apart from the excerpt', async ({
  page,
}) => {
  await page.goto('/#/kiem-chung');

  const section = page.locator('#nen-ban-do');
  await expect(section).toBeVisible();

  // Every layer names the dataset it came from, and the licence.
  await expect(section).toContainText('world-atlas');
  await expect(section).toContainText('Natural Earth');
  await expect(section).toContainText('miền công cộng');

  // The Vietnamese standard that makes the archipelagos required at all.
  await expect(section).toContainText('QCVN 80:2024/BTNMT');
  await expect(section).toContainText('đất liền, biển, đảo, quần đảo');

  // The point-of-view edition is named, not left implicit.
  await expect(section).toContainText('quan điểm Việt Nam');

  // Both offshore groups are recorded by geometry and extent, and by NO name:
  // the product does not inscribe them (PROJECT DECISION, 2026-09-18).
  await expect(section).toContainText('nhóm đảo ngoài khơi');
  await expect(section).toContainText('KHÔNG ghi tên nhóm đảo nào');
  const registerText = (await section.innerText()).toLowerCase();
  expect(registerText).not.toContain('hoàng sa');
  expect(registerText).not.toContain('trường sa');

  // And the limits are stated rather than implied: no compliance claim, no
  // claim to have settled anything, and modern borders under a 1911-1969 text.
  await expect(section).toContainText('KHÔNG tự nhận là đạt QCVN 80:2024/BTNMT');
  await expect(section).toContainText('không phân xử được chủ quyền');
  await expect(section).toContainText('biên giới quốc gia HIỆN NAY');
  await expect(section).toContainText('Không vẽ ranh giới tỉnh');
});

test('the drawing is not the only place the cartographic facts live', async ({ page }) => {
  // The plate is decorative, so a reader who never sees it must still be able
  // to reach every fact it carries, as text, from the evidence lens beside it.
  await page.goto('/#/chang/ky-1');

  await page.locator('.plate-block .lens-trigger').click();
  const lens = page.locator('.lens__body').first();
  await expect(lens).toContainText('Nền bản đồ');
  await expect(lens).toContainText('nhóm đảo ngoài khơi');
  await expect(lens).toContainText('không có ranh giới tỉnh');
  // And still no name for either group, even in the evidence lens.
  const lensText = (await lens.innerText()).toLowerCase();
  expect(lensText).not.toContain('hoàng sa');
  expect(lensText).not.toContain('trường sa');
});
