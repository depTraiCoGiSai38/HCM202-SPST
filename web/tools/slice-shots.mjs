/**
 * Screenshots for the experience-layer vertical slice.
 *
 * Four views only: the opening scene, the five-stage overview, the stage 2
 * traverse (a plain station and a turning-point station), and one presentation
 * beat with the speaker notes both shut and open.
 *
 * Run `npm run build && npm run preview` first, then `node tools/slice-shots.mjs`.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

mkdirSync('screenshots/slice', { recursive: true });

const BASE = 'http://localhost:4173/';
const LAPTOP = { width: 1440, height: 900 };

const browser = await chromium.launch({ channel: 'chrome' });

async function shot(name, route, prep) {
  const page = await browser.newPage({ viewport: LAPTOP, deviceScaleFactor: 1 });
  await page.goto(BASE + route);
  // Let the opening scene finish drawing itself before capture.
  await page.waitForTimeout(2600);
  if (prep) await prep(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `screenshots/slice/${name}.png` });
  await page.close();
  console.log('  ->', name);
}

// 1. Opening scene.
await shot('01-opening', '#/');

// 2. Five-stage overview, with one stage under the pointer so the hover state
//    and the thread highlight are both visible.
await shot('02-journey', '#/hanh-trinh', async (p) => {
  await p.locator('.atlas__stage-link[data-stage="ky-3"]').hover();
});

// 3a. Stage 2, an ordinary station near the start of the traverse.
await shot('03-stage2-station', '#/chang/ky-2');

// 3b. The turning point, near side: only `before` is on screen.
await shot('04-stage2-turn-before', '#/chang/ky-2', async (p) => {
  await p.locator('.walk__hit[data-kind="turn"]').first().click();
});

// 3c. The turning point, far side: the thread has moved, `after` and the
//     group's summary have arrived, and crossing back is still offered.
await shot('05-stage2-turn-after', '#/chang/ky-2', async (p) => {
  await p.locator('.walk__hit[data-kind="turn"]').first().click();
  await p.waitForTimeout(250);
  await p.locator('.turn__cross').click();
  await p.waitForTimeout(700);
});

// 3d. The evidence magnifier on that turning point, carrying its basis.
await shot('06-stage2-lens', '#/chang/ky-2', async (p) => {
  await p.locator('.walk__hit[data-kind="turn"]').first().click();
  await p.waitForTimeout(250);
  await p.locator('.turn__cross').click();
  await p.waitForTimeout(700);
  await p.locator('.station--turn .lens-trigger').click();
});

// 3e. A later stop, showing the compact context bar in place of the heading.
await shot('07-stage2-context-bar', '#/chang/ky-2', async (p) => {
  await p.locator('.walk__hit[data-index="3"]').click();
});

// 4. Presentation beat 3 as the room sees it. Speaker notes stay shut.
await shot('08-present-audience', '#/', async (p) => {
  await p.keyboard.press('p');
  await p.keyboard.press('ArrowRight');
  await p.keyboard.press('ArrowRight');
});

// Dark theme spot check on the densest new screen.
{
  const page = await browser.newPage({ viewport: LAPTOP, colorScheme: 'dark' });
  await page.goto(BASE + '#/chang/ky-2');
  await page.waitForTimeout(800);
  await page.locator('.walk__hit[data-kind="turn"]').first().click();
  await page.waitForTimeout(250);
  await page.locator('.turn__cross').click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'screenshots/slice/09-stage2-turn-after-dark.png' });
  await page.close();
  console.log('  -> 09-stage2-turn-after-dark');
}

await browser.close();
console.log('done');
