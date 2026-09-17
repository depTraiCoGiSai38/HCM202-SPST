/**
 * Measures the things the redesign brief asks about, per route and breakpoint:
 * how many navigation systems compete, how much chrome is on screen before the
 * content, how many distinct type sizes are in play, and how much of the first
 * screen is metadata rather than story.
 */
import { chromium } from '@playwright/test';

const BASE = process.env['AUDIT_BASE'] ?? 'http://localhost:4173/';
const ROUTES = ['#/', '#/hanh-trinh', '#/chang/ky-2', '#/doi-sanh', '#/noi-ket', '#/tong-hop', '#/kiem-chung'];
const SIZES = { desktop: [1440, 900], tablet: [834, 1112], mobile: [390, 844] };

const browser = await chromium.launch({ channel: 'chrome' });
const rows = [];

for (const [label, [w, h]] of Object.entries(SIZES)) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  for (const route of ROUTES) {
    await page.goto(BASE + route);
    await page.waitForTimeout(900);
    const m = await page.evaluate(() => {
      const vis = (el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
      };
      const inFold = (el) => { const r = el.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0; };

      // Navigation systems that are simultaneously on screen.
      const navSystems = [
        ['masthead', '.masthead'],
        ['rail (5 stages)', 'nav.rail .rail__list'],
        ['rail aside (4 dests)', '.rail__aside'],
        ['phase bar', '.walk__map'],
        ['stop track', '.walk__hits, .track'],
        ['prev/next pager', '.walk__controls'],
        ['stage pager', '.walk__pager'],
        ['activity tabs', '.join__stages, .duo__axes, .duo__pickers'],
        ['page toc', '.toc'],
      ].filter(([, sel]) => [...document.querySelectorAll(sel)].some((e) => vis(e) && inFold(e)))
        .map(([n]) => n);

      const controls = [...document.querySelectorAll('button, a')].filter((e) => vis(e) && inFold(e));
      const mainEl = document.querySelector('main');
      const mainControls = controls.filter((e) => mainEl && mainEl.contains(e));
      const chromeControls = controls.length - mainControls.length;

      /*
       * Status / metadata chrome competing with story.
       *
       * This list was stale and therefore flattering: two of its six selectors
       * (`.walk__phase-n`, `.join__stage-count`) matched nothing after the
       * elements they named were removed, while several permanent counters the
       * brief actually asks about were never counted at all. It now names every
       * permanently visible status label, provenance flag and numeric counter
       * in the product. Numbers taken with the old list are not comparable with
       * numbers taken with this one, and are not reported as if they were.
       */
      /*
       * Every permanently visible status label, provenance flag and numeric
       * counter that exists in EITHER build.
       *
       * The last three match nothing in the current product - the elements were
       * removed - but they do match in the baseline, and leaving them out would
       * have made the "before" number smaller than what was actually on the
       * screen. An instrument that only knows the selectors of the build you
       * are defending is not an instrument.
       */
      const BADGE_SELECTORS = [
        '.chip', '.station__flag', '.gained__marker', '.figure__cap-status', '.marker',
        '.walk__counter', '.walk__chapter', '.gained__count', '.jbar__where',
        '.scene__resume', '.join__status',
        '.walk__phase-n', '.join__stage-count', '.rail__aside-label',
      ];
      const badgeBreak = {};
      let badges = 0;
      for (const sel of BADGE_SELECTORS) {
        const n = [...document.querySelectorAll(sel)].filter((e) => vis(e) && inFold(e)).length;
        if (n) { badgeBreak[sel] = n; badges += n; }
      }

      // Distinct rendered font sizes in the fold = type-scale sprawl.
      const sizes = new Set();
      for (const el of document.querySelectorAll('main *')) {
        if (!vis(el) || !inFold(el)) continue;
        if (!el.textContent || !el.textContent.trim()) continue;
        if (el.children.length > 0) continue;
        sizes.add(Math.round(parseFloat(getComputedStyle(el).fontSize)));
      }

      // Words visible in the first screen.
      let words = 0;
      for (const el of document.querySelectorAll('main *')) {
        if (!vis(el) || !inFold(el) || el.children.length > 0) continue;
        words += (el.textContent || '').trim().split(/\s+/).filter(Boolean).length;
      }

      // Fold-scoped like every other measure on this row, so the column means
      // what its heading says. It used to count the whole page.
      const imgs = [...document.querySelectorAll('main img')].filter((e) => vis(e) && inFold(e)).length;
      return { navSystems, controlsInFold: controls.length, mainControls: mainControls.length, chromeControls, badges, badgeBreak, typeSizes: [...sizes].sort((a, b) => b - a), words, imgs };
    });
    rows.push({ label, route, ...m });
  }
  await page.close();
}
await browser.close();

for (const r of rows) {
  console.log(`${r.label.padEnd(8)} ${r.route.padEnd(16)} nav=${String(r.navSystems.length).padStart(2)} [${r.navSystems.join(' | ')}]`);
  console.log(`${''.padEnd(25)} controls=${String(r.controlsInFold).padStart(2)} (chrome ${r.chromeControls} / main ${r.mainControls})  badges=${r.badges} ${Object.entries(r.badgeBreak).map(([k, v]) => k.slice(1) + ':' + String(v)).join(' ')}  typeSizes=${r.typeSizes.length} ${JSON.stringify(r.typeSizes)}  words=${r.words}  imgs=${r.imgs}`);
}
