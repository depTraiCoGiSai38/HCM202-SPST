/**
 * Screenshots of the screens changed in the UX pass, at three widths.
 *
 * Written to `screenshots/ux/` so the existing product and slice sets are left
 * exactly as they are: those are the record of an earlier state and are not
 * this pass's to overwrite.
 *
 * Run `npm run build && npm run preview` first, then `node tools/ux-shots.mjs`.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const OUT = 'screenshots/ux';
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
  if (opts.reducedMotion) await page.emulateMedia({ reducedMotion: 'reduce' });
  if (opts.dark) await page.emulateMedia({ colorScheme: 'dark' });
  await prep(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${name}-${size}.png`, fullPage: Boolean(opts.full) });
  await page.close();
  console.log('  ->', `${name}-${size}`);
}

const open = (hash, wait = 700) => async (p) => {
  await p.goto(BASE + hash);
  await p.waitForTimeout(wait);
};

for (const size of ['laptop', 'tablet', 'mobile']) {
  await shot('01-opening', open('#/', 2800), size);
  await shot('02-journey', open('#/hanh-trinh'), size, { full: true });
  await shot('03-stage2-entrance', open('#/chang/ky-2'), size);
  await shot('06-noi-ket', open('#/noi-ket'), size);
}

// The stage phase map in use, and continuous reading.
await shot('04-stage2-phase-turn', async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  await p.locator('.walk__phase[data-phase="buoc-ngoat"]').click();
  await p.waitForTimeout(300);
  await p.locator('.turn__cross').click();
  await p.waitForTimeout(700);
});

await shot('05-stage2-flow', async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  await p.locator('.walk__read').click();
  await p.waitForTimeout(500);
}, 'laptop', { full: true });

await shot('05-stage2-flow', async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  await p.locator('.walk__read').click();
  await p.waitForTimeout(500);
}, 'mobile');

// The bridge at the end of a stage.
await shot('07-stage2-bridge', async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  await p.locator('.walk__nav.btn--primary').focus();
  await p.keyboard.press('End');
  await p.waitForTimeout(500);
});

// A wrong pairing, so the explanation is visible.
await shot('08-noi-ket-miss', async (p) => {
  await p.goto(BASE + '#/noi-ket');
  await p.waitForTimeout(500);
  await p.locator('.join__row').first().locator('.join__end[data-side="experience"]').click();
  await p.waitForTimeout(200);
  await p.locator('.join__row').nth(1).locator('.join__end[data-side="recognition"]').click();
  await p.waitForTimeout(400);
});

// Dark theme and reduced motion, on the two most changed screens.
await shot('09-opening-dark', open('#/', 2800), 'laptop', { dark: true });
await shot('10-journey-dark', open('#/hanh-trinh'), 'laptop', { dark: true, full: true });
await shot('11-opening-reduced', open('#/', 1200), 'laptop', { reducedMotion: true });
await shot('12-stage2-reduced', open('#/chang/ky-2'), 'laptop', { reducedMotion: true });

await browser.close();
console.log('done');
