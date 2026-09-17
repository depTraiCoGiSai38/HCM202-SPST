/**
 * Contrast and text-zoom audit for the screens changed in the UX pass.
 *
 * Two checks the e2e suite does not make:
 *
 *  1. every text node introduced by this pass clears 4.5:1 against what is
 *     actually painted behind it, in both themes. The tokens record their own
 *     ratios against `--paper`, but several of these sit on a tinted surface,
 *     so the composed result is measured rather than assumed;
 *  2. nothing overflows or clips at 200% text size. Browser text zoom cannot be
 *     driven directly, so the root font size is raised instead, which is what
 *     text-only zoom does to a rem-based scale.
 *
 * Run `npm run build && npm run preview` first, then `node tools/ux-audit.mjs`.
 */
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4173/';
const ROUTES = [
  '#/', '#/hanh-trinh',
  '#/chang/ky-1', '#/chang/ky-2', '#/chang/ky-3', '#/chang/ky-4', '#/chang/ky-5',
  '#/doi-sanh', '#/noi-ket', '#/tong-hop', '#/kiem-chung',
];

/** Text introduced or restyled by this pass. */
const SELECTORS = [
  '.scene__how-item', '.scene__how-n', '.scene__how-label', '.scene__after-label',
  '.scene__after-link', '.scene__aside-label', '.scene__stage-period', '.scene__stage-claim',
  '.scene__stage-n', '.chain__period', '.chain__claim', '.chain__n', '.chain__turns',
  '.chain__joint-kind', '.chain__joint-label', '.chain__joint-risk', '.chain__title',
  '.onward__title', '.onward__state', '.onward__card-label', '.onward__card-purpose',
  '.walk__ask-text', '.walk__ask-label', '.walk__phase-label', '.walk__phase-n',
  '.walk__read', '.bridge__kicker', '.bridge__period', '.bridge__claim', '.bridge__joint',
  '.brief__label', '.brief__text', '.duo__axes-label', '.rail__aside-label',
  '.rail__aside-heading', '.join__status',
  // Added in the second UX pass.
  '.scene__go-lead', '.scene__go-name', '.scene__map', '.scene__resume',
  '.guess__toggle', '.guess__toggle-note', '.guess__lead-q', '.guess__lead-hint',
  '.guess__option', '.guess__verdict', '.guess__where-label', '.guess__locators',
  '.guess__after', '.guess__reset',
  '.gained__kicker', '.gained__marker', '.gained__title', '.gained__shift',
  '.gained__todo', '.gained__count', '.gained__where', '.gained__where-n',
  '.turn__label', '.turn__text', '.bridge__ask', '.bridge__ask-label',
  // Added in the third UX pass.
  '.figure__blocked-role', '.figure__cap-text', '.figure__cap-source', '.figure__open',
  '.section-sub', '.figure__cap-credit',
  '.shade__cap-text', '.shade__cap-source',
];

/** Extra states to sample, beyond the plain route load. */
const STATES = [
  {
    route: '#/chang/ky-2',
    name: 'guess answered',
    prep: async (page) => {
      await page.locator('.guess__toggle').click();
      await page.locator('.guess__option').first().click();
      await page.waitForTimeout(250);
    },
  },
  {
    route: '#/chang/ky-2',
    name: 'turning point crossed',
    prep: async (page) => {
      // Step to the turn with Next. The phase jump buttons were removed when
      // the stage stopped carrying a table of contents for itself.
      const next = page.locator('.walk__nav.btn--primary');
      const turn = page.locator('.station--turn');
      const total = await page.locator('.walk__hit').count();
      for (let i = 0; i < total && !(await turn.isVisible()); i++) await next.click();
      await page.waitForTimeout(200);
      await page.locator('.turn__cross').click();
      await page.waitForTimeout(500);
    },
  },
];

const browser = await chromium.launch({ channel: 'chrome' });

const lum = (r, g, b) => {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

async function contrast(page, route, theme, prep) {
  await page.goto(BASE + route);
  await page.waitForTimeout(500);
  if (prep) await prep(page);

  const found = await page.evaluate((sels) => {
    const parse = (c) => {
      const m = /rgba?\(([^)]+)\)/.exec(c);
      if (!m) return null;
      const p = m[1].split(',').map((n) => parseFloat(n));
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    };
    // Walk up until an opaque background is found, compositing as we go.
    const behind = (el) => {
      let node = el;
      const layers = [];
      while (node) {
        const bg = parse(getComputedStyle(node).backgroundColor);
        if (bg && bg.a > 0) {
          layers.unshift(bg);
          if (bg.a === 1) break;
        }
        node = node.parentElement;
      }
      if (layers.length === 0) return { r: 255, g: 255, b: 255 };
      return layers.reduce((acc, l) => ({
        r: l.r * l.a + acc.r * (1 - l.a),
        g: l.g * l.a + acc.g * (1 - l.a),
        b: l.b * l.a + acc.b * (1 - l.a),
      }), { r: 255, g: 255, b: 255 });
    };

    const out = [];
    for (const sel of sels) {
      for (const el of document.querySelectorAll(sel)) {
        const box = el.getBoundingClientRect();
        if (box.width === 0 || box.height === 0) continue;
        if (!el.textContent || !el.textContent.trim()) continue;
        const cs = getComputedStyle(el);
        const fg = parse(cs.color);
        if (!fg) continue;
        out.push({
          sel,
          fg: [fg.r, fg.g, fg.b],
          bg: (() => { const b = behind(el); return [b.r, b.g, b.b]; })(),
          size: parseFloat(cs.fontSize),
          weight: cs.fontWeight,
        });
        break; // one sample per selector per route is enough
      }
    }
    return out;
  }, SELECTORS);

  const bad = [];
  for (const it of found) {
    const l1 = lum(...it.fg);
    const l2 = lum(...it.bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    // 18.66px+ , or 14px+ bold, are "large text" at 3:1. Everything else 4.5:1.
    const large = it.size >= 18.66 || (it.size >= 14 && Number(it.weight) >= 700);
    const need = large ? 3 : 4.5;
    if (ratio < need) {
      bad.push(`${theme} ${route} ${it.sel}: ${ratio.toFixed(2)}:1 (needs ${need}) @${it.size}px`);
    }
  }
  return bad;
}

let failures = [];

for (const theme of ['light', 'dark']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.emulateMedia({ colorScheme: theme });
  for (const route of ROUTES) {
    failures = failures.concat(await contrast(page, route, theme));
  }
  // Text that only exists once the viewer has done something is measured in
  // that state, not assumed to inherit the resting one.
  for (const state of STATES) {
    failures = failures.concat(
      await contrast(page, state.route, `${theme} (${state.name})`, state.prep),
    );
  }
  await page.close();
}

console.log(failures.length === 0 ? '  contrast: all sampled text at or above the minimum' : '  CONTRAST FAILURES:');
for (const f of failures) console.log('   -', f);

// ---- 200% text size --------------------------------------------------------

const zoomProblems = [];
for (const width of [390, 834, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  for (const route of ROUTES) {
    await page.goto(BASE + route);
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await page.waitForTimeout(350);
    const res = await page.evaluate(() => {
      const de = document.documentElement;
      const clipped = [];
      // Anything that hides its own overflow and is smaller than its content is
      // cutting text off at this size.
      for (const el of document.querySelectorAll('main *')) {
        const cs = getComputedStyle(el);
        if (cs.overflowX === 'hidden' || cs.overflowY === 'hidden' || cs.overflow === 'hidden') {
          if (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2) {
            if (!el.className || typeof el.className !== 'string') continue;
            if (el.className.includes('visually-hidden')) continue;
            clipped.push(el.className);
          }
        }
      }
      return { scroll: de.scrollWidth, client: de.clientWidth, clipped: [...new Set(clipped)] };
    });
    if (res.scroll > res.client + 1) {
      zoomProblems.push(`${String(width)}px ${route}: horizontal overflow ${String(res.scroll)} > ${String(res.client)}`);
    }
    for (const c of res.clipped) {
      zoomProblems.push(`${String(width)}px ${route}: clipped content in .${c}`);
    }
  }
  await page.close();
}

console.log(zoomProblems.length === 0 ? '  200% text: no overflow, no clipped text' : '  200% TEXT PROBLEMS:');
for (const p of zoomProblems) console.log('   -', p);

await browser.close();
process.exit(failures.length + zoomProblems.length === 0 ? 0 : 1);


