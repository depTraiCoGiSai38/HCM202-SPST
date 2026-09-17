/**
 * Screens where the 2019 base-source migration is visible.
 *
 * One-off visual check for SOURCE_MIGRATION_2019_REPORT.md: the exact headings,
 * the dated joints that replaced the blurred ones, the public citation format in
 * the evidence magnifier, and the verification register.
 *
 * Run `npm run build && npm run preview` first, then `node tools/migration-shots.mjs`.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

mkdirSync('screenshots/migration', { recursive: true });
const B = 'http://localhost:4173/';
const SIZES = { laptop: [1440, 900], mobile: [375, 812] };
const browser = await chromium.launch({ channel: 'chrome' });

async function shot(name, size, route, prep, full = false) {
  const [width, height] = SIZES[size];
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(B + route);
  await page.waitForTimeout(450);
  if (prep) await prep(page);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `screenshots/migration/${name}.png`, fullPage: full });
  await page.close();
  console.log('  ->', name);
}

// The overview: five headings and the four dated joints.
await shot('01-journey-laptop', 'laptop', '#/hanh-trinh', null, true);
await shot('02-journey-mobile', 'mobile', '#/hanh-trinh', null, true);

// A stage entrance: the exact heading, at the boundary that changed most.
await shot('03-stage2-laptop', 'laptop', '#/chang/ky-2');
await shot('04-stage2-mobile', 'mobile', '#/chang/ky-2');

// The evidence magnifier, where the public citation is printed.
await shot('05-lens-laptop', 'laptop', '#/chang/ky-2', async (p) => {
  await p.locator('.station__foot button, .lens-trigger, [class*="lens"]').first().click();
});

// The hand-off, which names the two consecutive dates.
await shot('06-bridge-laptop', 'laptop', '#/chang/ky-2', async (p) => {
  await p.keyboard.press('End');
  await p.waitForTimeout(500);
});

// The verification register: locators, risks and printed forms.
await shot('07-verify-laptop', 'laptop', '#/kiem-chung', null, true);
await shot('08-verify-mobile', 'mobile', '#/kiem-chung', null, true);

// Synthesis, whose closing sentence described the joints.
await shot('09-synthesis-laptop', 'laptop', '#/tong-hop', null, true);

await browser.close();
console.log('done');
