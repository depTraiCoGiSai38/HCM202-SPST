/**
 * Verifies the built product runs from a file:// URL with no server and no
 * network, which is how it will run on the Showcase computer from a stick.
 */
import { chromium } from '@playwright/test';
import { pathToFileURL } from 'url';
import { resolve } from 'path';

const url = pathToFileURL(resolve('dist/HCM202_HanhTrinhTuTuong_offline.html')).href;
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const problems = [];
page.on('console', (m) => {
  if (m.type() === 'error') problems.push('console: ' + m.text());
});
page.on('pageerror', (e) => problems.push('pageerror: ' + e.message));
// Anything that is not the local file scheme is a network dependency.
page.on('request', (r) => {
  if (!r.url().startsWith('file://')) problems.push('network: ' + r.url());
});

const ROUTES = [
  '#/', '#/hanh-trinh', '#/doi-sanh', '#/noi-ket', '#/tong-hop', '#/kiem-chung',
  '#/chang/ky-1', '#/chang/ky-2', '#/chang/ky-3', '#/chang/ky-4', '#/chang/ky-5',
];

for (const route of ROUTES) {
  await page.goto(url + route);
  await page.waitForTimeout(350);
  const ok = await page.evaluate(() => {
    const main = document.getElementById('noi-dung');
    return Boolean(main && main.textContent && main.textContent.trim().length > 40);
  });
  if (!ok) problems.push('empty render at ' + route);
  console.log((ok ? '  ok   ' : '  FAIL ') + route);
}

// The traverse and the deck must work with no server behind them.
await page.goto(url + '#/chang/ky-4');
await page.waitForTimeout(350);
await page.locator('.walk__nav.btn--primary').click();
await page.locator('.walk__nav.btn--primary').click();
await page.locator('.walk__nav.btn--primary').click();
const crossed = await page.locator('.turn__cross').count();
console.log(crossed ? '  ok   traverse reaches a turning point' : '  FAIL traverse');

/*
 * The plate has to survive the bundling too.
 *
 * Its land outline is a single 52 KB string inside the script, and the bundler
 * rewrites the script with string replacement in order to inline the images.
 * A replacement that went wrong there would not throw - it would quietly leave
 * a plate with no coastline on it, on the one build that runs at the Showcase.
 * Measuring the rendered geometry is the only honest test.
 */
/*
 * A DIFFERENT stage on purpose. The traverse above left this page three stops
 * into ky-4, where the chapter opening - and with it the plate - is collapsed
 * by design; and re-issuing the same hash does not re-render, so the check
 * would have measured a deliberately hidden element and called the bundle
 * broken. Moving to another stage lands on a fresh entrance.
 */
await page.goto(url + '#/chang/ky-1');
await page.waitForTimeout(500);
const plate = await page.evaluate(() => {
  const land = document.querySelector('.plate__land');
  if (!land) return { ok: false, why: 'no .plate__land' };
  const d = land.getAttribute('d') ?? '';
  const box = land.getBoundingClientRect();
  const marks = document.querySelectorAll('.plate-block .plate__mark').length;
  return { ok: d.length > 10000 && box.width > 0 && marks > 0, d: d.length, marks };
});
console.log(
  plate.ok
    ? `  ok   plate draws offline (${String(plate.d)} chars of path, ${String(plate.marks)} marks)`
    : `  FAIL plate: ${JSON.stringify(plate)}`,
);
if (!plate.ok) problems.push('plate did not draw offline');

/*
 * The basemap's orientation layers have to survive the bundling too.
 *
 * Same reasoning as the coastline above, and the same failure mode: the border
 * layer is another 31 KB string in a script the bundler rewrites by string
 * replacement, and the archipelago marks are a small array inside it. Neither
 * would throw if a replacement went wrong - the plate would simply come up on
 * the Showcase computer with no country borders, or with the offshore islands
 * silently missing, and nothing else would report it. Measuring the rendered
 * geometry is the only honest test.
 *
 * This is a rendering check, not a claim about anything the drawing depicts.
 */
const basemap = await page.evaluate(() => {
  const border = document.querySelector('.plate-block .plate__border');
  const d = border?.getAttribute('d') ?? '';
  const vn = document.querySelector('.plate-block .plate__vn-islands');
  const vnd = vn?.getAttribute('d') ?? '';
  const isles = document.querySelectorAll('.plate-block .plate__isle').length;
  const labels = [...document.querySelectorAll('.plate-block .plate__isle-label')].map(
    (el) => el.textContent ?? '',
  );
  const box = border?.getBoundingClientRect();
  return {
    border: d.length,
    closed: /[Zz]/.test(d),
    drawn: Boolean(box && box.width > 0),
    vnIslands: (vnd.match(/M/g) ?? []).length,
    isles,
    labels,
  };
});
const borderOk = basemap.border > 10000 && basemap.drawn && !basemap.closed;
console.log(
  borderOk
    ? `  ok   national boundaries draw offline (${String(basemap.border)} chars, open polylines)`
    : `  FAIL national boundaries: ${JSON.stringify(basemap)}`,
);
if (!borderOk) problems.push('national boundaries did not draw offline');

// 19 offshore island marks on a Vietnam frame, and NO name anywhere: the
// product does not inscribe these groups' names (PROJECT DECISION, 2026-09-18).
const islesOk = basemap.isles === 19 && basemap.labels.length === 0;
console.log(
  islesOk
    ? `  ok   offshore island marks draw offline (${String(basemap.isles)}, unnamed)`
    : `  FAIL offshore islands: ${JSON.stringify({ isles: basemap.isles, labels: basemap.labels })}`,
);
if (!islesOk) problems.push('the offshore island representation did not survive bundling');

// Vietnam's 24 coastal islands, which the 1:110m world layer cannot draw at all.
const vnOk = basemap.vnIslands === 24;
console.log(
  vnOk
    ? `  ok   Vietnam coastal islands draw offline (${String(basemap.vnIslands)} polygons)`
    : `  FAIL Vietnam coastal islands: ${String(basemap.vnIslands)} polygons, expected 24`,
);
if (!vnOk) problems.push("Vietnam's coastal islands did not survive bundling");

// The cartographic source record has to reach the Showcase too - a drawing whose
// provenance page did not bundle is a drawing with no citation behind it.
await page.goto(url + '#/kiem-chung');
await page.waitForTimeout(400);
const carto = await page.evaluate(() => {
  const sec = document.getElementById('nen-ban-do');
  const text = sec?.textContent ?? '';
  return {
    present: Boolean(sec),
    sources: sec?.querySelectorAll('.register__item').length ?? 0,
    standard: text.includes('QCVN 80:2024/BTNMT'),
    pov: text.includes('quan điểm Việt Nam'),
    limits: text.includes('KHÔNG tự nhận là đạt'),
  };
});
const cartoOk =
  carto.present && carto.sources >= 4 && carto.standard && carto.pov && carto.limits;
console.log(
  cartoOk
    ? `  ok   cartographic source record bundles (${String(carto.sources)} entries, standard and limits stated)`
    : `  FAIL cartographic source record: ${JSON.stringify(carto)}`,
);
if (!cartoOk) problems.push('the cartographic source record did not bundle');

await page.goto(url + '#/chang/ky-1');
await page.waitForTimeout(400);

await page.keyboard.press('p');
await page.waitForTimeout(300);
const deck = await page.locator('.slide').isVisible();
console.log(deck ? '  ok   presentation mode opens' : '  FAIL presentation mode');

// Close it again. It is a modal, so leaving it open makes every later click in
// this script land on its backdrop instead of on the page.
await page.keyboard.press('p');
await page.waitForTimeout(300);

/*
 * Documentary images must be bundled too.
 *
 * They are referenced by path from the data rather than from the stylesheet, so
 * they take a different route into the single file than the fonts do. Opened
 * from a stick, a path that was missed resolves against file:// and the picture
 * silently vanishes - a sourced document disappearing from the one build that
 * runs at the Showcase. `naturalWidth` is the only honest test: it is non-zero
 * only if the bytes actually decoded.
 */
const shotOf = async (label) => {
  await page.waitForTimeout(500);
  /*
   * Scroll every image into view and wait for it to decode before measuring.
   *
   * Documentary images are `loading="lazy"`, which is right - a supporting
   * figure deep inside a stage should not cost anything until it is reached.
   * But it means `naturalWidth` is 0 until the image enters the viewport, so a
   * checker that measures without scrolling reports a perfectly good bundle as
   * broken. Scrolling first is what a reader does anyway.
   */
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img')];
    for (const img of imgs) {
      if (img.complete && img.naturalWidth > 0) continue;
      /*
       * Force the load rather than wait for one.
       *
       * `decode()` on a `loading="lazy"` image that has not entered the
       * viewport returns a promise that need never settle, which hangs the
       * whole checker. Flipping the attribute to eager starts the fetch, and
       * the race gives up rather than blocking if anything goes wrong - a
       * timeout here should be reported as a failed image, not as a dead run.
       */
      img.loading = 'eager';
      img.scrollIntoView({ block: 'center', behavior: 'instant' });
      await Promise.race([
        img.decode().catch(() => undefined),
        new Promise((r) => setTimeout(r, 4000)),
      ]);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  const pictures = await page.evaluate(() =>
    [...document.querySelectorAll('img')].map((img) => ({
      inlined: img.currentSrc.startsWith('data:'),
      decoded: img.naturalWidth > 0,
      alt: (img.getAttribute('alt') ?? '').length,
      src: img.getAttribute('src') ?? '',
    })),
  );
  if (pictures.length === 0) {
    console.log(`  --   no documentary image on ${label}`);
    return 0;
  }
  for (const p of pictures) {
    const ok = p.inlined && p.decoded && p.alt > 10;
    if (!ok) {
      problems.push(
        `image not usable offline on ${label}: src=${p.src.slice(0, 40)} inlined=${String(p.inlined)} decoded=${String(p.decoded)} alt=${String(p.alt)}`,
      );
    }
    console.log((ok ? '  ok   ' : '  FAIL ') + `documentary image inlined and decoded (${label})`);
  }
  return pictures.length;
};

let seen = 0;
await page.goto(url + '#/');
seen += await shotOf('opening');

/*
 * A supporting figure sits inside a stage, beside the station it supports, so
 * the opening screen alone cannot prove the build is sound. Continuous reading
 * puts every station of a stage on one page, which is the cheapest way to put
 * every figure of that stage in the DOM at once.
 */
for (const id of ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5']) {
  await page.goto(url + `#/chang/${id}`);
  await page.waitForTimeout(300);
  const read = page.locator('.walk__read');
  if (await read.count()) {
    await read.click();
    await page.waitForTimeout(400);
  }
  seen += await shotOf(`chặng ${id}`);
}
console.log('  images checked:', seen);

// Fonts must be bundled, not fetched.
const fonts = await page.evaluate(() => document.fonts.size);
console.log('  fonts loaded from the bundle:', fonts);

await browser.close();
console.log(problems.length ? '\nPROBLEMS:\n' + problems.join('\n') : '\nno network requests, no errors');
