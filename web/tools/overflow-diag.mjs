import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
await page.goto('http://localhost:4173/#/');
await page.waitForTimeout(200);
const res = await page.evaluate(() => {
  const base = document.documentElement.scrollWidth;
  const log = [];
  const walk = (el, depth) => {
    if (depth > 6) return;
    for (const child of Array.from(el.children)) {
      const prev = child.style.display;
      child.style.display = 'none';
      const after = document.documentElement.scrollWidth;
      child.style.display = prev;
      if (after < base) {
        log.push({ depth, tag: child.tagName.toLowerCase(), cls: String(child.className||'').slice(0,60), drop: base - after });
        walk(child, depth + 1);
      }
    }
  };
  walk(document.body, 0);
  return { base, client: document.documentElement.clientWidth, log };
});
console.log(`scrollWidth=${res.base} client=${res.client}`);
for (const l of res.log) console.log(`${'  '.repeat(l.depth)}${l.tag}.${l.cls}  (removing drops ${l.drop}px)`);
await browser.close();
