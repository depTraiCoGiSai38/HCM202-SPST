/**
 * Horizontal-balance audit for the BODY of all five stages.
 *
 * It walks every stop of every stage at four widths and records observable
 * layout facts only - no score, no preference claim:
 *
 *   canvas            usable width of `.main` (the content canvas)
 *   trackW            width of the reading track `.walk__column`
 *   primaryW          painted width of the widest block inside the track
 *   secondaryW        painted width of `.walk__margin`, 0 when it is not beside
 *   deadBand          the horizontal gap between the right edge of the widest
 *                     painted block in the track and the right edge of the
 *                     track itself, as a fraction of the canvas
 *   outerRight        share of the canvas to the right of ALL painted content
 *   mode              centred / split / full / left   (measured, not declared)
 *   chars             prose line length in characters, from painted line boxes
 *
 * `deadBand` is the defect this rebalance targets, and it is measured INSIDE the
 * reading track rather than at the page edge. The margin column does reach the
 * right edge of the canvas, so a naive "empty right" reading of the page edge
 * reports zero while nearly half the canvas sits blank: at 1920px the track is
 * 1488px and the station inside it is 642px, leaving an ~846px band that no
 * content occupies. That band is what a viewer sees as the empty right side.
 *
 * A centred block is NOT the defect, so the mode is read off the two gutters
 * rather than off width alone.
 *
 * Run `npm run build && npm run preview` first, then
 * `node tools/body-balance.mjs [--json out.json]`.
 */
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:4173/';
const STAGES = ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5'];
const WIDTHS = [
  { label: '1920', width: 1920, height: 1080 },
  { label: '1440', width: 1440, height: 900 },
  { label: '768', width: 768, height: 1024 },
  { label: '390', width: 390, height: 844 },
];

const jsonAt = process.argv.indexOf('--json');
const jsonOut = jsonAt > -1 ? process.argv[jsonAt + 1] : null;

const browser = await chromium.launch({ channel: 'chrome' });

/** Measured facts for the body content at the current stop. */
async function measure(page) {
  return page.evaluate(() => {
    const main = document.querySelector('.main');
    const panel = document.querySelector('.walk__panel');
    if (!main || !panel) return null;

    const mainBox = main.getBoundingClientRect();
    const cs = getComputedStyle(main);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    const canvasL = mainBox.left + padL;
    const canvasR = mainBox.right - padR;
    const canvas = canvasR - canvasL;

    const shown = (el) => {
      if (!el) return false;
      if (el.hidden) return false;
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') return false;
      const b = el.getBoundingClientRect();
      return b.width > 1 && b.height > 1;
    };

    const track = document.querySelector('.walk__column');
    const margin = document.querySelector('.walk__margin');
    if (!track) return null;
    const trackBox = track.getBoundingClientRect();

    /*
     * Every block inside the reading track that actually PAINTS something.
     *
     * Deliberately not `panel > *`: the composition wrapper is a transparent
     * full-width grid, so measuring it would report a full canvas whatever the
     * content inside it does, and the dead band would read as zero by
     * construction. These are the elements a viewer sees ink in.
     */
    const PAINTED =
      '.station, .station__where, .station__support, .reflect, .bridge';
    const inTrack = [
      ...panel.querySelectorAll(PAINTED),
      ...track.querySelectorAll(':scope > .reflect, :scope > .bridge'),
      ...document.querySelectorAll(`.walk__flow ${PAINTED}`),
    ].filter(shown);

    let leftMost = Infinity;
    let trackRight = -Infinity;
    for (const el of inTrack) {
      const b = el.getBoundingClientRect();
      leftMost = Math.min(leftMost, b.left);
      trackRight = Math.max(trackRight, b.right);
    }
    if (!Number.isFinite(leftMost)) return null;

    /* The margin only counts as a SECOND COLUMN when it actually sits beside the
       track rather than stacking under it. */
    const marginShown = shown(margin);
    const marginBox = marginShown ? margin.getBoundingClientRect() : null;
    const beside = !!marginBox && marginBox.left > trackBox.left + 40;

    /* Prose line length, from painted line boxes. A Range over the text node
       gives one client rect per visual line, which is the real measure; the
       element's own rect would only report the CSS cap. */
    const prose = panel.querySelector(
      '.station__text, .station__quote p, .turn__text, .station__bounds li',
    );
    let chars = 0;
    if (prose?.firstChild) {
      const t = (prose.textContent ?? '').trim();
      const range = document.createRange();
      range.selectNodeContents(prose);
      const lines = range.getClientRects().length || 1;
      if (t.length > 0) chars = Math.round(t.length / lines);
    }

    /* The dead band: inside the reading track, to the right of everything
       painted in it. This is the empty right side a viewer actually sees. */
    const deadPx = Math.max(0, trackBox.right - trackRight);
    /* And the page-edge remainder, after the margin column too. */
    const outerRightPx = Math.max(0, canvasR - Math.max(trackRight, marginBox?.right ?? -Infinity));

    const gutterL = leftMost - canvasL;
    const gutterR = trackBox.right - trackRight;

    let mode;
    if ((trackRight - leftMost) / canvas > 0.9) mode = 'full';
    else if (gutterL > 24 && Math.abs(gutterL - gutterR) / trackBox.width < 0.1) mode = 'centred';
    else if (beside && marginBox.width > 80) mode = 'split';
    else mode = 'left';

    return {
      canvas: Math.round(canvas),
      trackW: Math.round(trackBox.width),
      primaryW: Math.round(trackRight - leftMost),
      secondaryW: beside ? Math.round(marginBox.width) : 0,
      gutterL: Math.round(gutterL),
      deadPx: Math.round(deadPx),
      deadBand: +(deadPx / canvas).toFixed(3),
      outerRight: +(outerRightPx / canvas).toFixed(3),
      mode,
      chars,
    };
  });
}

const rows = [];

for (const view of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: view.width, height: view.height } });
  for (const stage of STAGES) {
    await page.goto(`${BASE}#/chang/${stage}`, { waitUntil: 'networkidle' });
    // Walk mode, from the entrance. The entrance itself is stop 1 and locked,
    // so the body begins at stop 1 (index 0) of the panel either way.
    const total = await page.evaluate(() => {
      const c = document.querySelector('.walk__counter');
      const m = /\d+\s*\/\s*(\d+)/.exec(c?.textContent ?? '');
      return m ? Number(m[1]) : 0;
    });
    if (!total) {
      rows.push({ view: view.label, stage, stop: 0, kind: 'NO-COUNTER', err: true });
      continue;
    }

    for (let i = 0; i < total; i++) {
      if (i > 0) {
        await page.click('.walk__nav.btn--primary');
        await page.waitForTimeout(40);
      }
      const kind = await page.evaluate(
        () => document.querySelector('.walk__panel .station')?.dataset.kind ?? '?',
      );
      const m = await measure(page);
      rows.push({ view: view.label, stage, stop: i + 1, kind, ...(m ?? { err: true }) });

      // A turning point has two sides; the crossed side is the composition the
      // rebalance has to hold, so it is measured too.
      if (kind === 'turn') {
        const cross = page.locator('.turn__cross');
        if (await cross.count()) {
          await cross.first().click();
          await page.waitForTimeout(360);
          const after = await measure(page);
          rows.push({ view: view.label, stage, stop: i + 1, kind: 'turn+crossed', ...(after ?? { err: true }) });
        }
      }
    }
  }
  await page.close();
}

await browser.close();

/* ---- Report ------------------------------------------------------------- */

const pad = (s, n) => String(s).padEnd(n);
const num = (s, n) => String(s).padStart(n);

/** The defect: a wide dead band inside the reading track, not deliberately centred. */
const offends = (r, width) => width >= 1200 && !r.err && r.deadBand > 0.35 && r.mode !== 'centred';

for (const view of WIDTHS) {
  const mine = rows.filter((r) => r.view === view.label);
  console.log(`\n=== ${view.label}px ${'='.repeat(62)}`);
  console.log(
    `${pad('stage', 6)} ${num('stop', 4)} ${pad('kind', 13)} ${num('canvas', 6)} ${num('track', 6)} ${num('main', 6)} ${num('2nd', 5)} ${num('deadPx', 7)} ${num('dead%', 6)} ${pad('mode', 8)} ${num('ch', 3)}`,
  );
  for (const r of mine) {
    if (r.err) {
      console.log(`${pad(r.stage, 6)} ${num(r.stop, 4)} ${pad(r.kind, 13)} MEASURE FAILED`);
      continue;
    }
    console.log(
      `${pad(r.stage, 6)} ${num(r.stop, 4)} ${pad(r.kind, 13)} ${num(r.canvas, 6)} ${num(r.trackW, 6)} ${num(r.primaryW, 6)} ${num(r.secondaryW, 5)} ${num(r.deadPx, 7)} ${num((r.deadBand * 100).toFixed(0), 6)} ${pad(r.mode, 8)} ${num(r.chars, 3)}${offends(r, view.width) ? '  <-- DEAD BAND' : ''}`,
    );
  }
}

console.log('\n=== SUMMARY ===');
for (const view of WIDTHS) {
  const mine = rows.filter((r) => r.view === view.label && !r.err);
  const bad = mine.filter((r) => offends(r, view.width));
  const modes = {};
  for (const r of mine) modes[r.mode] = (modes[r.mode] ?? 0) + 1;
  const chars = mine.map((r) => r.chars).filter((c) => c > 0);
  const dead = mine.map((r) => r.deadBand);
  console.log(
    `${view.label}px: ${mine.length} states | ${bad.length} with >35% dead band | modes ${JSON.stringify(modes)} | dead band ${dead.length ? `${(Math.min(...dead) * 100).toFixed(0)}-${(Math.max(...dead) * 100).toFixed(0)}%` : 'n/a'} | line length ${chars.length ? `${Math.min(...chars)}-${Math.max(...chars)}ch` : 'n/a'}`,
  );
  if (bad.length) {
    const byStage = {};
    const byKind = {};
    for (const r of bad) {
      byStage[r.stage] = (byStage[r.stage] ?? 0) + 1;
      byKind[r.kind] = (byKind[r.kind] ?? 0) + 1;
    }
    console.log(`         by stage: ${JSON.stringify(byStage)}`);
    console.log(`         by kind:  ${JSON.stringify(byKind)}`);
  }
}

if (jsonOut) {
  writeFileSync(jsonOut, JSON.stringify(rows, null, 2));
  console.log(`\nwrote ${jsonOut}`);
}
