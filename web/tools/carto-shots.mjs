/**
 * Screenshots of the plate for the cartography work: the four required widths,
 * both themes, and the three framings that matter once national boundaries and
 * the offshore archipelago representation are drawn.
 *
 * Same shape as `plate-shots.mjs`: it drives the real product in the machine's
 * installed Chrome and writes PNGs. It measures nothing and asserts nothing. It
 * exists so a human can look at the drawn result, which is the only way a
 * cartographic defect - a border heavier than the route it sits under, a label
 * landing on a historical mark, an island mark that reads as real land area -
 * actually shows up.
 *
 * Run `npm run build && npm run preview` first, then:
 *   node tools/carto-shots.mjs before
 *   node tools/carto-shots.mjs after
 *
 * Against a dev server instead:
 *   CARTO_BASE=http://localhost:5180/ node tools/carto-shots.mjs after
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const BASE = process.env['CARTO_BASE'] ?? 'http://localhost:4173/';
const PHASE = process.argv[2] ?? 'after';
const OUT = `screenshots/cartography/${PHASE}`;
mkdirSync(OUT, { recursive: true });

/** The four widths the cartography brief names. */
const SIZES = {
  w1920: [1920, 1080],
  w1440: [1440, 900],
  w768: [768, 1024],
  w390: [390, 844],
};

const browser = await chromium.launch({ channel: 'chrome' });
let problems = 0;

async function shot(name, size, route, opts = {}) {
  const [width, height] = SIZES[size];
  const page = await browser.newPage({
    viewport: { width, height },
    colorScheme: opts.dark ? 'dark' : 'light',
    reducedMotion: opts.reduced ? 'reduce' : 'no-preference',
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });
  await page.goto(BASE + route, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  const target = opts.sel ? page.locator(opts.sel).first() : null;
  if (target && (await target.count()) > 0) {
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await target.screenshot({ path: `${OUT}/${name}.png` });
  } else {
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: Boolean(opts.full) });
  }

  if (errors.length > 0) {
    problems += errors.length;
    console.log(`  !! ${name}: ${errors.slice(0, 3).join(' | ')}`);
  }
  await page.close();
  console.log('  ->', name);
}

const PLATE = '.plate-block';
const SPACE = '.atlas-space';

// Vietnam-focused framing: stages 1 and 5 are framed in-country, which is where
// the offshore representation and its labels have to hold up.
for (const w of ['w1920', 'w1440', 'w768', 'w390']) {
  await shot(`vietnam-stage1-${w}`, w, '#/chang/ky-1', { sel: PLATE });
}
// World framing: stage 2 is deliberately framed on the whole world.
for (const w of ['w1920', 'w1440', 'w768', 'w390']) {
  await shot(`world-stage2-${w}`, w, '#/chang/ky-2', { sel: PLATE });
}
// Regional framing: stage 4 is the one stage that states a multi-leg route, so
// it is where a border layer could most easily out-shout the narrative line.
for (const w of ['w1920', 'w1440', 'w768', 'w390']) {
  await shot(`regional-stage4-${w}`, w, '#/chang/ky-4', { sel: PLATE });
}
// Stage 3 spans Europe to Asia; stage 5 is the plate that is legitimately empty
// of marks, so the basemap is all there is to look at.
await shot('eurasia-stage3-w1440', 'w1440', '#/chang/ky-3', { sel: PLATE });
await shot('vietnam-stage5-w1440', 'w1440', '#/chang/ky-5', { sel: PLATE });
await shot('vietnam-stage5-w390', 'w390', '#/chang/ky-5', { sel: PLATE });

// The journey overview, where the whole-excerpt plate sits.
for (const w of ['w1920', 'w1440', 'w768', 'w390']) {
  await shot(`overview-${w}`, w, '#/hanh-trinh', { sel: SPACE });
}

// Both themes, and motion switched off.
await shot('vietnam-stage1-dark', 'w1440', '#/chang/ky-1', { sel: PLATE, dark: true });
await shot('world-stage2-dark', 'w1440', '#/chang/ky-2', { sel: PLATE, dark: true });
await shot('overview-dark', 'w1440', '#/hanh-trinh', { sel: SPACE, dark: true });
await shot('vietnam-stage1-reduced', 'w1440', '#/chang/ky-1', { sel: PLATE, reduced: true });

/*
 * The verification page, where the cartographic source record is published.
 *
 * The SECTION, not the page. `fullPage` on this route produces a 44 000-pixel
 * stitched image in which the header and contents reappear three times, because
 * Chrome's capture scrolls a page far taller than its own maximum surface. The
 * result looks like a rendering bug in the product and is not one; capturing the
 * section that actually changed is both smaller and honest.
 */
for (const w of ['w1440', 'w390']) {
  await shot(`verify-carto-${w}`, w, '#/kiem-chung', { sel: '#nen-ban-do' });
}

await browser.close();
console.log(problems === 0 ? 'no page errors' : `PAGE ERRORS: ${String(problems)}`);
