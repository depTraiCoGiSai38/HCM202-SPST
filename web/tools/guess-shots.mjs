/**
 * The optional guess panel, in each of its states.
 *
 * Run `npm run build && npm run preview` first, then `node tools/guess-shots.mjs`.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const OUT = 'screenshots/flow';
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:4173/';
const browser = await chromium.launch({ channel: 'chrome' });

async function shot(name, prep, width = 1440) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await prep(page);
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await page.close();
  console.log('  ->', name);
}

const open = async (p) => {
  await p.goto(BASE + '#/chang/ky-2');
  await p.waitForTimeout(600);
  await p.locator('.guess__toggle').click();
  await p.waitForTimeout(300);
};

await shot('11-guess-open', open);

await shot('11-guess-right', async (p) => {
  await open(p);
  const right = p.locator('.guess__option[data-stage="ky-2"]');
  await right.click();
  await p.waitForTimeout(400);
});

await shot('11-guess-wrong', async (p) => {
  await open(p);
  const wrong = p.locator('.guess__option').first();
  const stage = await wrong.getAttribute('data-stage');
  await (stage === 'ky-2' ? p.locator('.guess__option').last() : wrong).click();
  await p.waitForTimeout(400);
});

await shot('11-guess-open-mobile', open, 390);

await browser.close();
console.log('done');
