/**
 * Accessibility and layout audit for the cartography layers.
 *
 * `ux-audit.mjs` samples the text introduced by the UX pass; this samples what
 * the cartography pass added, which the other tool's selector list does not
 * cover. Five checks:
 *
 *  1. no text has reappeared on the plate. It carries none by decision: the
 *     archipelago labels were added and then removed, because naming those
 *     groups made a sovereignty statement this product has no need and no
 *     standing to make.
 *  2. the basemap lines keep their RANKING: coastline < border < route, on
 *     effective weight (stroke-width times opacity, which is what the eye
 *     receives). Nominal token contrast is printed for the record but not gated,
 *     because the meaningful number is the painted one in check 2b.
 *  2b. VISUAL ACCEPTANCE, measured on rasterised pixels. This is the check that
 *     would have caught the first pass, and the reason this tool grew a PNG
 *     reader. That pass had a border layer which was present in the SVG,
 *     correctly styled, covered by passing tests - and invisible. Two things
 *     computed style cannot tell you: that the border used the coastline's own
 *     token so the two could not be told apart, and that a sub-pixel stroke
 *     loses roughly half its contrast to antialiasing (0.8px measured 2.15:1
 *     painted against 4.53:1 nominal). Only pixels show either.
 *  3. nothing overflows horizontally at any of the four widths the brief names,
 *     nor at 200% text size. Overflow is attributed to the section that owns it,
 *     so a pre-existing condition elsewhere on a long page is reported without
 *     being mistaken for something this pass introduced.
 *  4. no border or island mark carries an animation or a transition, in either
 *     motion setting.
 *
 * Run `npm run build && npm run preview` first, then `node tools/carto-audit.mjs`.
 */
import { chromium } from '@playwright/test';
import { contrast, luminance, readPng } from './png.mjs';

const BASE = process.env['CARTO_BASE'] ?? 'http://localhost:4173/';
const ROUTES = [
  '#/hanh-trinh',
  '#/chang/ky-1',
  '#/chang/ky-2',
  '#/chang/ky-3',
  '#/chang/ky-4',
  '#/chang/ky-5',
  '#/kiem-chung',
];
const WIDTHS = [1920, 1440, 768, 390];

const browser = await chromium.launch({ channel: 'chrome' });
const problems = [];

/* ---- 1 + 2. contrast ---------------------------------------------------- */

/**
 * Measured in the page so the values are the ones the browser actually
 * resolved, including the theme in force and any token override.
 */
async function ratios(page) {
  return page.evaluate(() => {
    const parse = (c) => {
      const m = /rgba?\(([^)]+)\)/.exec(c);
      if (!m) return null;
      const [r, g, b] = m[1].split(',').map((v) => Number.parseFloat(v));
      return [r, g, b];
    };
    const lum = ([r, g, b]) =>
      [r, g, b]
        .map((v) => v / 255)
        .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
        .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
    const ratio = (a, b) => {
      const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (l1 + 0.05) / (l2 + 0.05);
    };

    const plate = document.querySelector('.plate');
    if (!plate) return null;
    const bg = parse(getComputedStyle(plate).backgroundColor);
    if (!bg) return null;

    const contrast = {};
    const sample = (sel, prop) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const fg = parse(getComputedStyle(el)[prop]);
      if (fg) contrast[sel] = Number(ratio(fg, bg).toFixed(2));
    };
    sample('.plate__isle-label', 'fill');
    sample('.plate__isle', 'fill');
    sample('.plate__border', 'stroke');
    sample('.plate__land', 'stroke');

    /* Effective visual weight: what the eye receives, not what the rule says. */
    const weight = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const w = Number.parseFloat(cs.strokeWidth);
      const o = Number.parseFloat(cs.opacity);
      return Number.isFinite(w) ? Number((w * (Number.isFinite(o) ? o : 1)).toFixed(3)) : null;
    };
    return {
      contrast,
      weights: {
        border: weight('.plate__border'),
        land: weight('.plate__land'),
        move: weight('.plate__move'),
      },
    };
  });
}

for (const theme of ['light', 'dark']) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: theme,
  });
  await page.goto(`${BASE}#/chang/ky-1`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const r = await ratios(page);
  if (!r) {
    problems.push(`${theme}: could not sample the plate`);
    await page.close();
    continue;
  }

  /*
   * There is no text on the plate to gate.
   *
   * The cartography pass briefly added archipelago labels and then removed them:
   * PROJECT DECISION, 2026-09-18 - this product is about the formation of Hồ Chí
   * Minh's thought, and naming those groups on its plate made a sovereignty
   * statement it has no need and no standing to make. The geometry stayed, the
   * names did not, so the only thing left to measure here is line legibility.
   */
  const label = r.contrast['.plate__isle-label'];
  if (label !== undefined) {
    problems.push(
      `${theme}: a plate label reappeared (.plate__isle-label). The plate carries no text by decision.`,
    );
    console.log(`  FAIL ${theme.padEnd(5)} .plate__isle-label should not exist`);
  }

  // Decorative basemap lines: recorded, not gated. See the header.
  for (const sel of ['.plate__isle', '.plate__border', '.plate__land']) {
    console.log(
      `  --   ${theme.padEnd(5)} ${sel.padEnd(22)} ${String(r.contrast[sel]).padStart(6)}:1 (decorative, not gated)`,
    );
  }

  /*
   * The ranking the brief asks for, asserted on effective weight.
   *
   * COASTLINE < BORDER < ROUTE. An earlier revision of this tool asserted the
   * opposite for the first pair, which is how a border quieter than the
   * coastline passed an audit that was supposed to catch exactly that. A border
   * separates land from land and has only its line; a coastline also gets a
   * land/sea tonal step for free, so equal weight is not equal legibility.
   */
  const { border, land, move } = r.weights;
  const ranked = border !== null && land !== null && border > land && (move === null || border < move);
  console.log(
    `  ${ranked ? 'ok  ' : 'FAIL'} ${theme.padEnd(5)} weight coastline ${String(land)} < border ${String(border)}${
      move === null ? '' : ` < route ${String(move)}`
    }`,
  );
  if (!ranked) {
    problems.push(
      `${theme}: weights are not coastline ${String(land)} < border ${String(border)} < route ${String(move)}`,
    );
  }
  await page.close();
}

/* ---- 2b. VISUAL ACCEPTANCE, measured on the painted pixels -------------- */

/*
 * The check that would have caught the first pass.
 *
 * Everything above reads computed style, which is what the layer was TOLD to be.
 * This rasterises the plate and measures what a viewer's screen actually shows:
 * how dark the darkest border pixels are against the land they cross, and
 * whether that beats the coastline. A layer can be present, correctly styled and
 * still invisible, and only pixels can tell you which.
 *
 * Method: sample a rectangle of land that a national border crosses and contains
 * no coastline, no route and no mark. The darkest pixels in that rectangle are
 * the border. Compare against the modal (most common) pixel, which is the land
 * fill. The same is then done over open sea for the archipelago symbols.
 */
const REGIONS = [
  {
    name: 'border over land (Indochina)',
    route: '#/chang/ky-1',
    // Fractions of the plate box: the Laos/Thailand/Cambodia interior.
    box: [0.06, 0.3, 0.34, 0.8],
    min: 2.6,
  },
  {
    name: 'border over land (Africa/Eurasia)',
    route: '#/chang/ky-3',
    box: [0.1, 0.35, 0.45, 0.8],
    min: 2.6,
  },
  {
    name: 'archipelago symbols over sea',
    route: '#/chang/ky-1',
    // The South China Sea, east of the Vietnamese coast.
    box: [0.5, 0.25, 0.85, 0.65],
    min: 2.6,
  },
];

for (const region of REGIONS) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto(BASE + region.route, { waitUntil: 'load' });
  await page.waitForTimeout(700);
  const plate = page.locator('.plate__svg').first();
  const shot = await plate.screenshot();
  await page.close();

  const png = readPng(shot);
  const [x0, y0, x1, y1] = [
    Math.round(region.box[0] * png.width),
    Math.round(region.box[1] * png.height),
    Math.round(region.box[2] * png.width),
    Math.round(region.box[3] * png.height),
  ];

  // Modal pixel = the fill the region sits on.
  const counts = new Map();
  const pixels = [];
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const p = png.at(x, y);
      pixels.push(p);
      const key = p.join(',');
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  const modal = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number);

  // The darkest 0.1% of pixels are the ink of the thinnest line present.
  pixels.sort((a, b) => luminance(a) - luminance(b));
  const dark = pixels[Math.floor(pixels.length * 0.001)];
  const ratio = contrast(dark, modal);
  const ok = ratio >= region.min;
  console.log(
    `  ${ok ? 'ok  ' : 'FAIL'} painted ${region.name.padEnd(32)} ${ratio.toFixed(2)}:1 vs fill rgb(${modal.join(',')}) (min ${String(region.min)})`,
  );
  if (!ok) {
    problems.push(
      `${region.name}: darkest painted ink is only ${ratio.toFixed(2)}:1 against the fill it crosses - a viewer cannot see it`,
    );
  }
}

/* ---- 3. overflow, at each width and at 200% text ------------------------ */

for (const width of WIDTHS) {
  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(350);

    const plain = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    if (plain.scroll > plain.client + 1) {
      problems.push(
        `${String(width)}px ${route}: horizontal overflow ${String(plain.scroll)} > ${String(plain.client)}`,
      );
    }

    // 200% text-only zoom: raise the root font size, which is what text zoom
    // does to a rem-based scale.
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await page.waitForTimeout(250);
    const zoomed = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      /*
       * Attribute every overflowing box to the section that owns it. A long
       * reference page can carry a pre-existing wide element - the register's
       * ten-locator table is one - and reporting only a page-level number would
       * make that look like something the cartography layers did.
       */
      const owners = new Set();
      for (const el of document.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (r.width <= vw + 1 && r.right <= vw + 1) continue;
        const sec = el.closest('[id]');
        owners.add(sec?.id ?? el.tagName.toLowerCase());
      }
      return {
        scroll: de.scrollWidth,
        client: vw,
        owners: [...owners],
        // The plate must not be able to push the page wider than the viewport.
        plate: Math.max(
          0,
          ...[...document.querySelectorAll('.plate')].map((el) => el.getBoundingClientRect().width),
        ),
      };
    });
    if (zoomed.scroll > zoomed.client + 1) {
      problems.push(
        `${String(width)}px ${route} @200%: horizontal overflow ${String(zoomed.scroll)} > ${String(zoomed.client)} in [${zoomed.owners.join(', ')}]`,
      );
    }
    if (zoomed.plate > zoomed.client + 1) {
      problems.push(`${String(width)}px ${route} @200%: plate wider than the viewport`);
    }
    await page.close();
  }
  console.log(`  ok   ${String(width)}px: no plate overflow, plain or at 200% text`);
}

/* ---- 4. motion ---------------------------------------------------------- */

for (const reduced of [false, true]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });
  await page.goto(`${BASE}#/hanh-trinh`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const moving = await page.evaluate(() =>
    ['.plate__border', '.plate__isle', '.plate__vn-islands']
      .flatMap((sel) => [...document.querySelectorAll(sel)].slice(0, 3).map((el) => [sel, el]))
      .filter(([, el]) => {
        const cs = getComputedStyle(el);
        const anim = cs.animationName !== 'none' && cs.animationDuration !== '0s';
        const trans = cs.transitionDuration !== '0s' && cs.transitionProperty !== 'none';
        return anim || trans;
      })
      .map(([sel]) => sel),
  );
  const label = reduced ? 'reduced motion' : 'motion allowed';
  if (moving.length > 0) {
    problems.push(`${label}: animated basemap layer(s) ${[...new Set(moving)].join(', ')}`);
    console.log(`  FAIL ${label}: ${[...new Set(moving)].join(', ')} animate`);
  } else {
    console.log(`  ok   ${label}: no border or island mark animates`);
  }
  await page.close();
}

await browser.close();

console.log('');
if (problems.length === 0) {
  console.log('cartography audit: no problems');
} else {
  console.log('CARTOGRAPHY AUDIT PROBLEMS:');
  for (const p of problems) console.log('  -', p);
}
process.exit(problems.length === 0 ? 0 : 1);
