/**
 * The new-learner flow, screen by screen, as a first-time visitor meets it.
 *
 * Opening -> overview -> one stage (entrance, a thinking moment, a turning
 * point, the end of the stage) -> an activity -> synthesis. Written to
 * `screenshots/flow/` so the earlier sets stay as the record of their own
 * moment.
 *
 * Run `npm run build && npm run preview` first, then `node tools/flow-shots.mjs`.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const OUT = 'screenshots/flow';
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:4173/';
const SIZES = {
  laptop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch({ channel: 'chrome' });

async function shot(name, prep, size = 'laptop', opts = {}) {
  const page = await browser.newPage({ viewport: SIZES[size], deviceScaleFactor: 1 });
  if (opts.dark) await page.emulateMedia({ colorScheme: 'dark' });
  if (opts.reducedMotion) await page.emulateMedia({ reducedMotion: 'reduce' });
  await prep(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${name}-${size}.png`, fullPage: Boolean(opts.full) });
  await page.close();
  console.log('  ->', `${name}-${size}`);
}

const go = (hash, wait = 700) => async (p) => {
  await p.goto(BASE + hash);
  await p.waitForTimeout(wait);
};

const size = process.argv[2] ?? 'laptop';
const full = process.argv[3] === 'full';

await shot('1-opening', go('#/', 2600), size, { full });
await shot('2-journey', go('#/hanh-trinh'), size, { full });
await shot('3-stage-entrance', go('#/chang/ky-2'), size, { full });

await shot('4-stage-midway', async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  for (let i = 0; i < 4; i++) {
    await p.locator('.walk__nav.btn--primary').click();
    await p.waitForTimeout(120);
  }
}, size, { full });

await shot('5-stage-turn-before', async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  await p.locator('.walk__phase[data-phase="buoc-ngoat"]').click();
  await p.waitForTimeout(400);
}, size, { full });

await shot('6-stage-turn-after', async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  await p.locator('.walk__phase[data-phase="buoc-ngoat"]').click();
  await p.waitForTimeout(300);
  await p.locator('.turn__cross').click();
  await p.waitForTimeout(900);
}, size, { full });

await shot('7-stage-end', async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  await p.locator('.walk__nav.btn--primary').focus();
  await p.keyboard.press('End');
  await p.waitForTimeout(500);
}, size, { full });

await shot('8-noi-ket', go('#/noi-ket'), size, { full });
await shot('9-doi-sanh', go('#/doi-sanh'), size, { full });
await shot('10-tong-hop', go('#/tong-hop'), size, { full });

await browser.close();
console.log('done');
