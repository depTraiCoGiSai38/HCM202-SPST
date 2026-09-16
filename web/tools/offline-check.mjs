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

await page.keyboard.press('p');
await page.waitForTimeout(300);
const deck = await page.locator('.slide').isVisible();
console.log(deck ? '  ok   presentation mode opens' : '  FAIL presentation mode');

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
await page.goto(url + '#/');
await page.waitForTimeout(500);
const pictures = await page.evaluate(() =>
  [...document.querySelectorAll('img')].map((img) => ({
    inlined: img.currentSrc.startsWith('data:'),
    decoded: img.naturalWidth > 0,
    alt: (img.getAttribute('alt') ?? '').length,
  })),
);
if (pictures.length === 0) {
  console.log('  --   no documentary image in this build');
} else {
  for (const p of pictures) {
    const ok = p.inlined && p.decoded && p.alt > 10;
    if (!ok) problems.push(`image not usable offline: inlined=${String(p.inlined)} decoded=${String(p.decoded)} alt=${String(p.alt)}`);
    console.log((ok ? '  ok   ' : '  FAIL ') + 'documentary image inlined and decoded');
  }
}

// Fonts must be bundled, not fetched.
const fonts = await page.evaluate(() => document.fonts.size);
console.log('  fonts loaded from the bundle:', fonts);

await browser.close();
console.log(problems.length ? '\nPROBLEMS:\n' + problems.join('\n') : '\nno network requests, no errors');
