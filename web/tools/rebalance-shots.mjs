/**
 * Representative BODY states of all five stages, for the before/after record of
 * the editorial rebalance.
 *
 * The set is chosen so the record cannot show only the flattering states. It
 * covers, across several stages: an ordinary passage with no figure, a turning
 * point on both sides of the crossing, a printed quotation, the reflection beat,
 * the stage boundary and hand-off, a station whose figure position is FILLED,
 * and a station whose figure position is BLOCKED.
 *
 * Which stations carry a figure is not hard-coded: the script walks each stage
 * and asks the page, so the record stays true when the figure register changes.
 *
 * Usage:
 *   node tools/rebalance-shots.mjs before
 *   node tools/rebalance-shots.mjs after
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const tag = process.argv[2] === 'after' ? 'after' : 'before';
const OUT = `screenshots/rebalance/${tag}`;
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:4173/';
const SIZES = {
  '1920': { width: 1920, height: 1080 },
  '1440': { width: 1440, height: 900 },
  '768': { width: 768, height: 1024 },
  '390': { width: 390, height: 844 },
};
const STAGES = ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5'];

const browser = await chromium.launch({ channel: 'chrome' });

/** Step to a stop by clicking Next, from the entrance. */
async function stepTo(page, stop) {
  for (let i = 1; i < stop; i++) {
    await page.click('.walk__nav.btn--primary');
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(260);
}

async function stopCount(page) {
  return page.evaluate(() => {
    const m = /\d+\s*\/\s*(\d+)/.exec(document.querySelector('.walk__counter')?.textContent ?? '');
    return m ? Number(m[1]) : 0;
  });
}

/**
 * For one stage, find a representative stop of each kind that matters.
 * Returns { passage, turn, quote, boundary, figure, blocked } as stop numbers.
 */
async function probe(page, stage) {
  await page.goto(`${BASE}#/chang/${stage}`, { waitUntil: 'networkidle' });
  const total = await stopCount(page);
  const found = {};
  for (let i = 1; i <= total; i++) {
    if (i > 1) {
      await page.click('.walk__nav.btn--primary');
      await page.waitForTimeout(35);
    }
    const info = await page.evaluate(() => {
      const panel = document.querySelector('.walk__panel');
      const st = panel?.querySelector('.station');
      return {
        kind: st?.dataset.kind ?? '?',
        hasFigure: !!panel?.querySelector('.figure__img'),
        hasBlocked: !!panel?.querySelector('.figure--blocked, .figure__blocked, .figure__blocked-role'),
      };
    });
    if (info.hasFigure && !found.figure) found.figure = i;
    if (info.hasBlocked && !found.blocked) found.blocked = i;
    if (!found[info.kind]) found[info.kind] = i;
  }
  found.total = total;
  return found;
}

const plan = [];
{
  const page = await browser.newPage({ viewport: SIZES['1440'] });
  for (const stage of STAGES) {
    const p = await probe(page, stage);
    console.log(`${stage}:`, JSON.stringify(p));
    plan.push({ stage, ...p });
  }
  await page.close();
}

async function shot(name, size, stage, stop, prep) {
  const page = await browser.newPage({ viewport: SIZES[size], deviceScaleFactor: 1 });
  await page.goto(`${BASE}#/chang/${stage}`, { waitUntil: 'networkidle' });
  await stepTo(page, stop);
  if (prep) await prep(page);
  await page.waitForTimeout(320);
  await page.screenshot({ path: `${OUT}/${name}-${size}.png`, fullPage: false });
  await page.close();
  console.log('  ->', `${name}-${size}`);
}

/* The record. Every stage appears; the state kinds are spread across stages so
   the set is not five copies of one screen. */
const WIDE = ['1920', '1440'];
const ALL = ['1920', '1440', '768', '390'];

for (const p of plan) {
  const n = p.stage.replace('ky-', 's');

  // An ordinary passage, at every width, for all five stages: this is the state
  // the dead band was worst in and the one that must be checked everywhere.
  for (const size of ALL) {
    if (p.passage) await shot(`${n}-passage`, size, p.stage, p.passage);
  }

  // The turning point, both sides. Wide only - the crossing is a desktop
  // composition question; the mobile order is checked on the passage state.
  if (p.turn) {
    for (const size of WIDE) {
      await shot(`${n}-turn-before`, size, p.stage, p.turn);
      await shot(`${n}-turn-crossed`, size, p.stage, p.turn, async (page) => {
        const c = page.locator('.turn__cross');
        if (await c.count()) {
          await c.first().click();
          await page.waitForTimeout(420);
        }
      });
    }
  }

  // The boundary and, on the same stop, the reflection and hand-off.
  if (p.boundary) {
    for (const size of ALL) await shot(`${n}-boundary`, size, p.stage, p.boundary);
    for (const size of WIDE) {
      await shot(`${n}-reflect`, size, p.stage, p.boundary, async (page) => {
        await page.evaluate(() => {
          document.querySelector('.reflect')?.scrollIntoView({ block: 'center' });
        });
      });
      await shot(`${n}-bridge`, size, p.stage, p.boundary, async (page) => {
        await page.evaluate(() => {
          document.querySelector('.bridge')?.scrollIntoView({ block: 'center' });
        });
      });
    }
  }

  if (p.quote) for (const size of WIDE) await shot(`${n}-quote`, size, p.stage, p.quote);
  if (p.figure) for (const size of WIDE) await shot(`${n}-figure`, size, p.stage, p.figure);
  if (p.blocked) for (const size of WIDE) await shot(`${n}-blocked`, size, p.stage, p.blocked);
}

// Continuous reading, which lays every station on one page, for one stage.
{
  const page = await browser.newPage({ viewport: SIZES['1920'] });
  await page.goto(`${BASE}#/chang/ky-3`, { waitUntil: 'networkidle' });
  const read = page.locator('.walk__read');
  if (await read.count()) {
    const label = (await read.first().textContent()) ?? '';
    if (label.includes('liền mạch')) await read.first().click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/s3-flow-1920.png`, fullPage: false });
    console.log('  -> s3-flow-1920');
  }
  await page.close();
}

// The locked entrance, as the record that it did not change.
for (const size of ['1920', '1440', '390']) {
  const page = await browser.newPage({ viewport: SIZES[size], deviceScaleFactor: 1 });
  await page.goto(`${BASE}#/chang/ky-2`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/s2-entrance-${size}.png`, fullPage: false });
  await page.close();
  console.log('  -> s2-entrance-' + size);
}

await browser.close();
console.log(`\n${tag} set written to ${OUT}`);
