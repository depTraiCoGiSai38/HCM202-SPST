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

/*
 * REPOINTED 19-9-2026: these three shots framed the Marseille plate at the
 * opening. The plate moved to stage 3 (`SC-24`), so they follow it rather than
 * quietly photographing whatever is at `#/` now. Shot 49 covers the opening in
 * its emptied state instead.
 */
const atKy3 = async (p) => {
  await openTo(p, '#/chang/ky-3');
  await p.locator('.walk__portrait').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
};

// The figure with its caption and required credit line.
await shot('30-figure-open', async (p) => {
  await atKy3(p);
  await p.waitForTimeout(300);
});

// The enlarged view, opened from the figure.
await shot('31-figure-enlarged', async (p) => {
  await atKy3(p);
  await p.locator('.walk__portrait .figure__open').click();
  await p.waitForTimeout(700);
});

// The source and reuse record behind it - now four rights rows, not one.
await shot('32-figure-sources', async (p) => {
  await atKy3(p);
  await p.locator('.walk__portrait .figure .lens-trigger').first().click();
  await p.waitForTimeout(500);
});

// The register section, which records eight filled positions and five blocked.
await shot('33-register', async (p) => {
  await openTo(p, '#/kiem-chung');
  await p.locator('#anh-tu-lieu').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
});

// Narrow and dark.
await shot('34-figure-mobile', atKy3, 390, 844);
await shot('35-figure-dark', atKy3, 1440, 900, { dark: true });

/*
 * A stage entrance where the position is still blocked.
 *
 * The selector here was `.walk__figure`, which no element has ever carried, so
 * this shot had been silently capturing the top of the page instead of the
 * thing it is named after.
 */
await shot('36-stage-blocked', async (p) => {
  // ky-3 was the blocked example until 19-9-2026, when it got the plate. ky-2
  // is now the nearest blocked primary.
  await openTo(p, '#/chang/ky-2');
  await p.locator('.walk__portrait').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
});

/* ---- The documentary pass --------------------------------------------- */

// The first filled stage entrance: the plate above, the document below it.
for (const [name, w, h] of [
  ['37-stage5-anchor-laptop', 1440, 900],
  ['38-stage5-anchor-tablet', 768, 1024],
  ['39-stage5-anchor-mobile', 390, 844],
]) {
  await shot(
    name,
    async (p) => {
      await openTo(p, '#/chang/ky-5');
      await p.locator('.walk__portrait').scrollIntoViewIfNeeded();
      await p.waitForTimeout(500);
    },
    w,
    h,
  );
}

// Each supporting document at the station it explains. The walk stops at the
// station whose text is named, not at the first station that has a picture -
// stage 3 and stage 5 each carry two.
const atStation = (stage, text) => async (p) => {
  await openTo(p, `#/chang/${stage}`);
  const next = p.locator('.walk__nav.btn--primary');
  const panel = p.locator('.walk__panel');
  for (let i = 0; i < 40; i++) {
    if (((await panel.textContent()) ?? '').includes(text)) break;
    await next.click();
    await p.waitForTimeout(120);
  }
  await p.locator('.station__support').scrollIntoViewIfNeeded();
  await p.waitForTimeout(600);
};

await shot('40-ky1-map-laptop', atStation('ky-1', 'Nghệ An'));
await shot('41-ky1-map-mobile', atStation('ky-1', 'Nghệ An'), 390, 844);
await shot('42-ky3-paria-laptop', atStation('ky-3', 'sáng lập báo Le Paria'));
await shot('43-ky3-paria-mobile', atStation('ky-3', 'sáng lập báo Le Paria'), 390, 844);
await shot('44-ky5-accord-laptop', atStation('ky-5', 'tạm hoà hoãn với Pháp'));
await shot('45-ky5-accord-mobile', atStation('ky-5', 'tạm hoà hoãn với Pháp'), 390, 844);

// The same anchor in dark mode and with motion switched off, because both are
// states the product promises and neither had a documentary image in it before.
await shot(
  '46-stage5-anchor-dark',
  async (p) => {
    await openTo(p, '#/chang/ky-5');
    await p.locator('.walk__portrait').scrollIntoViewIfNeeded();
    await p.waitForTimeout(500);
  },
  1440,
  900,
  { dark: true },
);

await shot(
  '47-stage5-anchor-reduced',
  async (p) => {
    await openTo(p, '#/chang/ky-5');
    await p.locator('.walk__portrait').scrollIntoViewIfNeeded();
    await p.waitForTimeout(500);
  },
  1440,
  900,
  { reduced: true },
);

// Enlarged, from a stage rather than from the opening, at phone width - the
// case where a tall sheet is most likely to overflow.
await shot(
  '48-stage5-enlarged-mobile',
  async (p) => {
    await openTo(p, '#/chang/ky-5');
    await p.locator('.walk__portrait .figure__open').click();
    await p.waitForTimeout(700);
  },
  390,
  844,
);

/* ---- The opening, stage 3 and the register ---------------------------- */

// The opening: a front door carried by title, action and thread. The
// documentary position for it is declared in the data and reported on
// `#/kiem-chung`, not on this screen. Regenerate these shots after any change
// to the opening before using them as evidence of the current build.
for (const [name, w, h] of [
  ['49-open-empty-laptop', 1440, 900],
  ['49-open-empty-mobile', 390, 844],
]) {
  await shot(name, async (p) => { await openTo(p, '#/', 2400); }, w, h);
}

// Stage 3's entrance, which is where that picture went.
for (const [name, w, h] of [
  ['50-ky3-anchor-laptop', 1440, 900],
  ['50-ky3-anchor-mobile', 390, 844],
]) {
  await shot(
    name,
    async (p) => {
      await openTo(p, '#/chang/ky-3');
      await p.locator('.walk__portrait').scrollIntoViewIfNeeded();
      await p.waitForTimeout(500);
    },
    w,
    h,
  );
}

// The register with its new column: evidence status and reuse decision side by
// side, so a traced document with an open reuse question reads as exactly that.
await shot('51-register-reuse', async (p) => {
  await openTo(p, '#/kiem-chung');
  await p.locator('#anh-tu-lieu').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
});

await browser.close();
console.log('done');
