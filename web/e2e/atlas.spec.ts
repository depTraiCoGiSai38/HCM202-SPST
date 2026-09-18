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

test('walking a stage says where the excerpt puts a stop, and where it does not', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-2');

  // Not every stop has a place attached - the excerpt simply does not talk
  // about place at every stop - so the line appears where there is something to
  // say and stays absent where there is not. Walk the stage and require both
  // kinds to turn up.
  const next = page.locator('.walk__nav.btn--primary');
  let placed = false;
  let unplaced = false;

  for (let i = 0; i < 20; i++) {
    const panel = await page.locator('.walk__panel').innerText();
    if (panel.includes('Nơi chốn:')) placed = true;
    if (panel.includes('Trích đoạn không in địa điểm cho mốc này')) unplaced = true;
    if (placed && unplaced) break;
    if (!(await next.isEnabled())) break;
    await next.click();
  }

  expect(placed, 'a stop the excerpt places should name its place').toBe(true);
  expect(unplaced, 'a stop the excerpt leaves unplaced should say so').toBe(true);
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
