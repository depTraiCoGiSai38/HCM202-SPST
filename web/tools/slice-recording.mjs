/**
 * A short recording of the two things that are hard to judge from stills:
 * the opening thread drawing itself, and crossing a turning point.
 *
 * Run `npm run build && npm run preview` first, then
 * `node tools/slice-recording.mjs`. Writes a .webm into screenshots/slice/.
 */
import { chromium } from '@playwright/test';
import { mkdirSync, readdirSync, renameSync } from 'fs';
import { join } from 'path';

const OUT = 'screenshots/slice';
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:4173/';
const VIEW = { width: 1440, height: 900 };

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({
  viewport: VIEW,
  recordVideo: { dir: OUT, size: VIEW },
});
const page = await context.newPage();

// 1. The opening thread draws itself, once, from its origin.
await page.goto(BASE + '#/');
await page.waitForTimeout(3200);

// 2. Into the journey, then into stage 2.
await page.locator('.btn--lg').click();
await page.waitForTimeout(1400);
await page.locator('.atlas__stage-link[data-stage="ky-2"]').click();
await page.waitForTimeout(1200);

// 3. Walk the thread up to the turning point.
for (let i = 0; i < 7; i++) {
  await page.locator('.walk__nav.btn--primary').click();
  await page.waitForTimeout(420);
}

// 4. Cross it: the thread moves, then the far side and the summary arrive.
await page.waitForTimeout(900);
await page.locator('.turn__cross').click();
await page.waitForTimeout(1800);

// 5. And cross back, to show the move is reversible.
await page.locator('.turn__cross').click();
await page.waitForTimeout(1400);

await page.close();
await context.close();
await browser.close();

// Playwright names the file by an internal id; give it a readable one.
const made = readdirSync(OUT).filter((f) => f.endsWith('.webm') && !f.startsWith('slice-'));
for (const f of made) {
  renameSync(join(OUT, f), join(OUT, 'slice-walkthrough.webm'));
  console.log('  ->', join(OUT, 'slice-walkthrough.webm'));
}
