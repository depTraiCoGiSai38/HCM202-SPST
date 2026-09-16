/**
 * The documentary figure in each of its states, and the register behind it.
 *
 * Run `npm run build && npm run preview` first, then `node tools/figure-shots.mjs`.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const OUT = 'screenshots/flow';
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:4173/';
const browser = await chromium.launch({ channel: 'chrome' });

async function shot(name, prep, w = 1440, h = 900, opts = {}) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  if (opts.dark) await page.emulateMedia({ colorScheme: 'dark' });
  if (opts.reduced) await page.emulateMedia({ reducedMotion: 'reduce' });
  await prep(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: Boolean(opts.full) });
  await page.close();
  console.log('  ->', name);
}

const openTo = async (p, hash, wait = 900) => {
  await p.goto(BASE + hash);
  await p.waitForTimeout(wait);
};

// The figure with its caption and required credit line.
await shot('30-figure-open', async (p) => {
  await openTo(p, '#/', 2400);
  await p.locator('.figure').scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
});

// The enlarged view, opened from the figure.
await shot('31-figure-enlarged', async (p) => {
  await openTo(p, '#/', 2400);
  await p.locator('.figure__open').click();
  await p.waitForTimeout(700);
});

// The source and rights record behind it.
await shot('32-figure-sources', async (p) => {
  await openTo(p, '#/', 2400);
  await p.locator('.figure .lens-trigger').click();
  await p.waitForTimeout(500);
});

// The register section, which now records a cleared slot and five blocked ones.
await shot('33-register', async (p) => {
  await openTo(p, '#/kiem-chung');
  await p.locator('#anh-tu-lieu').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
});

// Narrow and dark.
await shot('34-figure-mobile', async (p) => {
  await openTo(p, '#/', 2400);
  await p.locator('.figure').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
}, 390, 844);

await shot('35-figure-dark', async (p) => {
  await openTo(p, '#/', 2400);
  await p.locator('.figure').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
}, 1440, 900, { dark: true });

// A stage, where the slot is still blocked.
await shot('36-stage-blocked', async (p) => {
  await openTo(p, '#/chang/ky-3');
  await p.locator('.walk__figure').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
});

await browser.close();
console.log('done');
