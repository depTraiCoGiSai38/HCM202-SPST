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
      // Same category as `.station__marker`: an apparatus label, not reading.
      '.station__where',
      /*
       * A figure's required credit line, its status chip, its two controls, and
       * the one-line note a blocked position shows. Added 18-9-2026.
       *
       * These are still counted and still printed: they move from the `prose`
       * column to the `signage` column, they do not vanish. The reason is the
       * one that already puts `.station__where` here - apparatus that says
       * where a thing came from is not the reading this budget exists to
       * protect. Counting a licence-mandated attribution line as story prose
       * would make the budget report a worse number every time the product got
       * more honest about its sources, which is the wrong incentive.
       *
       * `.figure__cap-text` is DELIBERATELY NOT in this list. The caption is a
       * sentence somebody reads, so it goes on counting against the reading
       * budget; only the machinery around it moves. Drawing the line anywhere
       * looser would be tuning the measurement to flatter the product.
       *
       * WHAT THIS CHANGED, measured after the 19-9 correction below: NOTHING.
       * Every row reads exactly as it did before these three selectors were
       * added, because a figure's credit, status chip and controls always sit
       * below the first viewport on the measured routes. The three entries earn
       * their place by being correct, not by moving a number.
       *
       * TWO EARLIER DRAFTS OF THIS LIST DID MOVE NUMBERS, and both are recorded
       * because each was the measurement flattering the product:
       *   1. an 18-9 draft also had `.figure__cap`, which pulled the caption
       *      SENTENCE across and moved the opening from `over, close` to `OK`;
       *   2. an 18-9 draft also had `.figure__blocked-line`, which looked
       *      harmless while the opening held a photograph and became a lie on
       *      19-9 when the opening got a blocked line instead - it moved the
       *      opening to `OK` again, and it had already been quietly moving
       *      `stage 2 - passage stop` from `prose 141` to `prose 121`, a shift
       *      the 18-9 notes attributed to the credit/status/controls entries.
       * Both were reverted. The opening is `over, close` at prose 104 and stage
       * 2's passage stop is `OVER` at prose 141, which is where they belong.
       */
      '.figure__cap-credit', '.figure__cap-status', '.figure__acts',
      /*
       * NARROWED 19-9-2026, after the measurement caught itself flattering the
       * product for the third time.
       *
       * This entry used to be the whole `.figure__blocked-line`, which holds two
       * different things: the `CHƯA CÓ NGUỒN` badge, which is signage, and the
       * role sentence, which is a sentence somebody reads. While the opening
       * carried a photograph that did not matter, because no blocked line was in
       * its first viewport. When the photograph moved to stage 3 on 19-9 the
       * opening got a blocked line, its ~28-word role went into the signage
       * column, and the opening's verdict read `OK` on a classification rather
       * than on less reading.
       *
       * Only the badge is signage now, and it needs no entry here at all:
       * `.station__flag` is already in this list above. So the line is simply
       * gone, and the role sentence counts as prose, which is what it is. If
       * that pushes the opening back over budget, the answer is to cut the
       * sentence, not to move the line again.
       */
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
