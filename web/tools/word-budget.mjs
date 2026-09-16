/**
 * Measures the acceptance criterion: a main viewport should carry roughly
 * 60-90 visible words before the viewer chooses to explore further.
 *
 * Counts only text actually inside the first viewport, skipping the persistent
 * rail and masthead chrome, which are navigation rather than reading.
 */
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4173/';
const VIEW = { width: 1440, height: 900 };
const browser = await chromium.launch({ channel: 'chrome' });

async function count(label, route, prep) {
  const page = await browser.newPage({ viewport: VIEW });
  await page.goto(BASE + route);
  await page.waitForTimeout(2600);
  if (prep) await prep(page);
  await page.waitForTimeout(300);

  const { prose, labels } = await page.evaluate((h) => {
    // When the deck is open the page behind it is still in the DOM but is not
    // what anyone is looking at.
    const scope = document.body.dataset.presenting
      ? document.querySelector('.present')
      : document.body;
    if (!scope) return { prose: 0, labels: 0 };

    // .visually-hidden carries the full exact heading for assistive technology.
    // It is off-screen text, not something a sighted viewer reads.
    const skipRoots = ['.rail', '.masthead', '.colophon', '.skip-link', '.visually-hidden'];
    // Kickers, markers, counters and diagram labels are signage, not reading.
    const labelish = [
      '.scene__kicker', '.scene__at', '.scene__count', '.atlas__kicker', '.atlas__period',
      '.atlas__ordinal', '.atlas__boundary', '.atlas__caption', '.walk__kicker', '.walk__ord',
      '.walk__counter', '.walk__pager', '.station__kicker', '.station__marker', '.station__flag',
      '.turn__label', '.lens-trigger', '.slide__kicker', '.slide__marker', '.present__bar',
      '.present__foot', '.walk__apparatus', '.walk__context', '.walk__expand',
      '.turn__shift-label', '.turn__cross',
    ];

    let prose = 0;
    let labels = 0;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const el = node.parentElement;
      if (!el) continue;
      if (skipRoots.some((sel) => el.closest(sel))) continue;
      const style = getComputedStyle(el);
      if (style.visibility === 'hidden' || style.display === 'none') continue;
      if (el.closest('[hidden]')) continue;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > h || r.width === 0) continue;
      const text = (node.textContent ?? '').trim();
      if (!text) continue;
      const n = text.split(/\s+/).length;
      if (labelish.some((sel) => el.closest(sel))) labels += n;
      else prose += n;
    }
    return { prose, labels };
  }, VIEW.height);

  const verdict = prose <= 90 ? 'OK' : prose <= 110 ? 'over, close' : 'OVER';
  console.log(
    `${label.padEnd(26)} prose ${String(prose).padStart(3)}  + signage ${String(labels).padStart(3)}   ${verdict}`,
  );
  await page.close();
}

await count('opening', '#/');
await count('journey overview', '#/hanh-trinh');
await count('stage 2 - passage stop', '#/chang/ky-2');
await count('stage 2 - turn, before', '#/chang/ky-2', async (p) => {
  await p.locator('.walk__hit[data-kind="turn"]').first().click();
});
await count('stage 2 - turn, after', '#/chang/ky-2', async (p) => {
  await p.locator('.walk__hit[data-kind="turn"]').first().click();
  await p.locator('.turn__cross').click();
  await p.waitForTimeout(500);
});
await count('presentation beat 3', '#/', async (p) => {
  await p.keyboard.press('p');
  await p.keyboard.press('ArrowRight');
  await p.keyboard.press('ArrowRight');
});

await browser.close();
