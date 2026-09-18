/**
 * Screenshots of the plate, across the five stages, both themes, three widths,
 * and with motion switched off.
 *
 * Same shape as the other shot tools here: it drives the real product in the
 * machine's installed Chrome and writes PNGs. It measures nothing and asserts
 * nothing - it exists so a human can look, which is the only way some of these
 * problems show up. Two of the three defects fixed during this work were found
 * this way and not by a test: an em dash that meant one thing in one column and
 * something else in the next, and a stage whose plate is legitimately empty and
 * therefore read as broken until its caption said why.
 *
 * Run `npm run build && npm run preview` first, then:
 *   node tools/plate-shots.mjs
 *
 * Against a dev server instead:
 *   PLATE_BASE=http://localhost:5180/ node tools/plate-shots.mjs
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const BASE = process.env['PLATE_BASE'] ?? 'http://localhost:4173/';
const OUT = 'screenshots/plate';
mkdirSync(OUT, { recursive: true });

const SIZES = { desktop: [1440, 900], tablet: [768, 1024], mobile: [390, 844] };

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
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: Boolean(opts.full) });
  if (errors.length > 0) {
    problems += errors.length;
    console.log(`  !! ${name}: ${errors.slice(0, 3).join(' | ')}`);
  }
  await page.close();
  console.log('  ->', name);
}

for (const n of [1, 2, 3, 4, 5]) {
  await shot(`stage${n}-desktop`, 'desktop', `#/chang/ky-${n}`);
}
await shot('stage2-mobile', 'mobile', '#/chang/ky-2');
await shot('stage2-tablet', 'tablet', '#/chang/ky-2');
await shot('stage4-mobile', 'mobile', '#/chang/ky-4');
await shot('stage5-desktop-empty', 'desktop', '#/chang/ky-5');
await shot('stage2-dark', 'desktop', '#/chang/ky-2', { dark: true });
await shot('stage4-dark', 'desktop', '#/chang/ky-4', { dark: true });
await shot('stage2-reduced-motion', 'desktop', '#/chang/ky-2', { reduced: true });
await shot('journey-desktop-full', 'desktop', '#/hanh-trinh', { full: true });
await shot('journey-mobile-full', 'mobile', '#/hanh-trinh', { full: true });
await shot('journey-dark', 'desktop', '#/hanh-trinh', { dark: true, full: true });
await shot('opening-desktop-full', 'desktop', '#/', { full: true });

await browser.close();
console.log(problems === 0 ? 'no page errors' : `PAGE ERRORS: ${String(problems)}`);
