import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';
mkdirSync('screenshots', { recursive: true });
const B = 'http://localhost:4173/';
const SIZES = { laptop: [1440, 900], tablet: [768, 1024], mobile: [375, 812] };
const browser = await chromium.launch({ channel: 'chrome' });

async function shot(name, size, route, prep, full = false) {
  const [width, height] = SIZES[size];
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(B + route);
  await page.waitForTimeout(400);
  if (prep) await prep(page);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: full });
  await page.close();
  console.log('  ->', name);
}

await shot('01-opening-laptop', 'laptop', '#/');
await shot('02-opening-mobile', 'mobile', '#/');
await shot('03-journey-laptop', 'laptop', '#/hanh-trinh');
await shot('04-journey-tablet', 'tablet', '#/hanh-trinh');
await shot('05-stage2-turning-laptop', 'laptop', '#/chang/ky-2', async (p) => {
  await p.locator('.turning__trigger').first().click();
  await p.locator('.turning').first().scrollIntoViewIfNeeded();
});
await shot('06-stage4-conflict-laptop', 'laptop', '#/chang/ky-4', async (p) => {
  await p.locator('text=Chuyển biến nhận thức').first().scrollIntoViewIfNeeded();
});
await shot('07-stage1-mobile', 'mobile', '#/chang/ky-1');
await shot('08-compare-laptop', 'laptop', '#/doi-sanh');
await shot('09-compare-mobile', 'mobile', '#/doi-sanh');
await shot('10-connect-tablet', 'tablet', '#/noi-ket');
await shot('11-synthesis-laptop', 'laptop', '#/tong-hop', async (p) => {
  const order = ['trước ngày 5-6-1911','từ giữa năm 1911','từ cuối năm 1920','từ đầu năm 1930','từ đầu năm 1941'];
  for (const key of order) {
    const chips = p.locator('.synth__chip:not([disabled])');
    const n = await chips.count();
    for (let i = 0; i < n; i++) {
      if ((await chips.nth(i).innerText()).includes(key)) { await chips.nth(i).click(); break; }
    }
  }
});
await shot('12-verify-laptop', 'laptop', '#/kiem-chung');
await shot('13-present-laptop', 'laptop', '#/', async (p) => { await p.keyboard.press('p'); });
await shot('14-present-beat3-laptop', 'laptop', '#/', async (p) => {
  await p.keyboard.press('p');
  await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight');
});
await shot('15-present-mobile', 'mobile', '#/', async (p) => { await p.keyboard.press('p'); });

// Dark theme
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
  await page.goto(B + '#/chang/ky-5');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/16-stage5-dark-laptop.png' });
  await page.goto(B + '#/kiem-chung');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/17-verify-dark-laptop.png' });
  await page.close();
  console.log('  -> dark theme shots');
}
await browser.close();
console.log('done');
