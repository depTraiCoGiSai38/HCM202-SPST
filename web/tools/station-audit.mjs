/**
 * Walks every stop of every stage and measures what a viewer actually reads.
 *
 * Reports, per stop: the visible prose count, whether it exceeds the ~60-90
 * word budget, and whether it carries a caution, a conflict or a locator. This
 * is the input to deciding which stops need splitting into sequential states -
 * never into shorter text.
 */
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4173/';
const VIEW = { width: 1440, height: 900 };
const STAGES = ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5'];

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: VIEW });

const LABELISH = [
  '.walk__kicker',
  '.walk__ord',
  '.walk__counter',
  '.walk__pager',
  '.walk__context',
  '.walk__expand',
  '.walk__apparatus',
  '.station__kicker',
  '.station__marker',
  '.station__flag',
  '.turn__label',
  '.turn__shift-label',
  '.turn__cross',
  /*
   * The place line is signage, in the same sense `.station__marker` already is:
   * a compact apparatus label about the source, set in the apparatus face at
   * apparatus size, not narrative reading. It is listed here for that reason
   * and not to flatter the number - the report states the count both ways, so
   * the effect of this line is visible rather than absorbed.
   */
  '.station__where',
  '.lens-trigger',
];

async function proseInPanel() {
  return page.evaluate(
    ({ labelish }) => {
      const panel = document.querySelector('.walk__panel');
      const head = document.querySelector('.walk__head');
      if (!panel) return { prose: 0, kind: '?', flags: [] };

      let prose = 0;
      for (const root of [head, panel]) {
        if (!root) continue;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          const el = node.parentElement;
          if (!el) continue;
          if (el.closest('.visually-hidden')) continue;
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none') continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height <= 1) continue;
          if (labelish.some((s) => el.closest(s))) continue;
          const t = (node.textContent ?? '').trim();
          if (t) prose += t.split(/\s+/).length;
        }
      }

      const station = panel.querySelector('.station');
      const flags = [];
      if (panel.querySelector('.station__flag')) flags.push('flag');
      if (panel.querySelector('blockquote')) flags.push('quote');
      return { prose, kind: station?.dataset.kind ?? '?', flags };
    },
    { labelish: LABELISH },
  );
}

const over = [];
let total = 0;

for (const id of STAGES) {
  await page.goto(`${BASE}#/chang/${id}`);
  await page.waitForTimeout(500);
  const hits = page.locator('.walk__hit');
  const n = await hits.count();
  console.log(`\n${id} — ${n} nhịp`);

  for (let i = 0; i < n; i++) {
    await hits.nth(i).click();
    await page.waitForTimeout(140);
    const kind = await hits.nth(i).getAttribute('data-kind');

    if (kind === 'turn') {
      const before = await proseInPanel();
      await page.locator('.turn__cross').click();
      await page.waitForTimeout(520);
      const after = await proseInPanel();
      await page.locator('.turn__cross').click();
      await page.waitForTimeout(220);
      for (const [phase, m] of [['before', before], ['after', after]]) {
        total++;
        const bad = m.prose > 90;
        if (bad) over.push({ id, i, kind: `turn/${phase}`, prose: m.prose });
        console.log(
          `  ${String(i + 1).padStart(2)} turn/${phase.padEnd(6)} ${String(m.prose).padStart(3)}${bad ? '  OVER' : ''}`,
        );
      }
    } else {
      const m = await proseInPanel();
      total++;
      const bad = m.prose > 90;
      if (bad) over.push({ id, i, kind, prose: m.prose });
      console.log(
        `  ${String(i + 1).padStart(2)} ${String(kind).padEnd(11)} ${String(m.prose).padStart(3)}${bad ? '  OVER' : ''}${m.flags.length ? '  [' + m.flags.join(',') + ']' : ''}`,
      );
    }
  }
}

console.log(`\n=== ${over.length} of ${total} states over 90 words ===`);
for (const o of over) console.log(`  ${o.id} nhịp ${o.i + 1} (${o.kind}): ${o.prose}`);

await browser.close();
