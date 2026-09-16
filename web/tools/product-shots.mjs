/**
 * Screenshots for the whole product once the traverse covers all five stages.
 *
 * Per stage: the entrance (the exact official heading in full) and its first
 * turning point in the crossed state. Plus the seven presentation beats as the
 * room sees them, with the speaker notes shut.
 *
 * Run `npm run build && npm run preview` first, then `node tools/product-shots.mjs`.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const OUT = 'screenshots/product';
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:4173/';
const LAPTOP = { width: 1440, height: 900 };
const STAGES = ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5'];

const browser = await chromium.launch({ channel: 'chrome' });

async function shot(name, prep, size = LAPTOP) {
  const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
  await prep(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await page.close();
  console.log('  ->', name);
}

// The two screens that open the product.
await shot('00-opening', async (p) => {
  await p.goto(BASE + '#/');
  await p.waitForTimeout(2800);
});
await shot('00-journey', async (p) => {
  await p.goto(BASE + '#/hanh-trinh');
  await p.waitForTimeout(700);
});

// Per stage: the entrance, then the first turning point already crossed.
for (const [i, id] of STAGES.entries()) {
  const n = i + 1;

  await shot(`${n}a-${id}-entrance`, async (p) => {
    await p.goto(`${BASE}#/chang/${id}`);
    await p.waitForTimeout(600);
  });

  await shot(`${n}b-${id}-turning`, async (p) => {
    await p.goto(`${BASE}#/chang/${id}`);
    await p.waitForTimeout(600);
    await p.locator('.walk__hit[data-kind="turn"]').first().click();
    await p.waitForTimeout(250);
    await p.locator('.turn__cross').click();
    await p.waitForTimeout(800);
  });
}

// All seven beats, audience view, notes shut.
for (let beat = 0; beat < 7; beat++) {
  await shot(`9-beat-${String(beat + 1)}`, async (p) => {
    await p.goto(BASE + '#/');
    await p.waitForTimeout(1200);
    await p.keyboard.press('p');
    await p.waitForTimeout(250);
    for (let k = 0; k < beat; k++) {
      await p.keyboard.press('ArrowRight');
      await p.waitForTimeout(160);
    }
    await p.waitForTimeout(500);
  });
}

await browser.close();
console.log('done');
