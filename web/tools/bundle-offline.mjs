/**
 * Builds a single self-contained HTML file for the Showcase computer.
 *
 * Why this exists: the normal `dist/` build loads its script as an ES module
 * with a `crossorigin` attribute. Opened straight from a USB stick, the page
 * origin is `null`, and Chrome refuses the module and the stylesheet under CORS
 * - the product renders nothing at all. Serving `dist/` over http works, but a
 * classroom machine cannot be relied on to have a server, and the No-AI rule
 * puts everything on one computer.
 *
 * So: inline the stylesheet, inline the fonts it references as data URIs, and
 * inline the script as a module with no `crossorigin`. An inline module is not
 * fetched, so there is nothing for CORS to refuse.
 *
 * Run after `npm run build`. Writes dist/HCM202_HanhTrinhTuTuong_offline.html.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';

const DIST = 'dist';
const OUT = join(DIST, 'HCM202_HanhTrinhTuTuong_offline.html');

const MIME = {
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

let html = readFileSync(join(DIST, 'index.html'), 'utf8');

const cssRef = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/.exec(html);
const jsRef = /<script[^>]*src="([^"]+)"[^>]*><\/script>/.exec(html);
if (!cssRef || !jsRef) throw new Error('could not find the built script or stylesheet in dist/index.html');

const cssPath = join(DIST, cssRef[1].replace(/^\.?\//, ''));
const jsPath = join(DIST, jsRef[1].replace(/^\.?\//, ''));

// 1. Fonts: every url() in the stylesheet becomes a data URI.
let css = readFileSync(cssPath, 'utf8');
let inlined = 0;
let missing = [];
css = css.replace(/url\(\.\/([^)"']+)\)/g, (whole, file) => {
  const abs = join(dirname(cssPath), file);
  if (!existsSync(abs)) {
    missing.push(file);
    return whole;
  }
  const ext = file.slice(file.lastIndexOf('.'));
  const type = MIME[ext];
  if (!type) return whole;
  inlined++;
  return `url(data:${type};base64,${readFileSync(abs).toString('base64')})`;
});

// 2. The script, inlined as a module. `</script>` inside a string literal would
//    otherwise end the tag early.
let js = readFileSync(jsPath, 'utf8').replace(/<\/script/gi, '<\\/script');

/*
 * 2b. Documentary images.
 *
 * These are referenced by path from the data, not from the stylesheet, so the
 * font pass above never sees them. Opened from a USB stick with no server, a
 * relative path resolves against `file://` and the picture is simply missing -
 * which on this product would mean a sourced document silently disappearing
 * from the one build that runs at the Showcase. Each file under `dist/tu-lieu`
 * is therefore inlined wherever its path appears as a string in the bundle.
 */
let images = 0;
const imageDir = join(DIST, 'tu-lieu');
if (existsSync(imageDir)) {
  for (const name of readdirSync(imageDir)) {
    const ext = name.slice(name.lastIndexOf('.'));
    const type = MIME[ext];
    if (!type) continue;
    const data = `data:${type};base64,${readFileSync(join(imageDir, name)).toString('base64')}`;
    const ref = `tu-lieu/${name}`;
    if (!js.includes(ref)) continue;
    js = js.split(ref).join(data);
    images++;
  }
}

/*
 * 3. Splice both into the document.
 *
 * The replacements go in through a function, not a string.
 * `String.prototype.replace` reads `$&`, `$\`` , `$'` and `$1` inside a
 * replacement string as instructions, and minified code contains them by
 * accident: a module-level variable minified to `$` turned
 * `return !!(panel && !panel.hidden)` into `return!!($&&!$.hidden)`. That `$&`
 * spliced the matched `<script src=...>` tag back into the middle of the
 * inlined bundle and dropped everything after it - a 181 KB script became
 * 58 KB, the tag reappeared inside its own script block, and every route in the
 * offline build died on `Unexpected token '<'`. A replacer function has no such
 * syntax, so no future identifier can trigger this again.
 */
html = html
  .replace(cssRef[0], () => `<style>\n${css}\n</style>`)
  .replace(jsRef[0], () => `<script type="module">\n${js}\n</script>`);

writeFileSync(OUT, html, 'utf8');

const mb = (Buffer.byteLength(html, 'utf8') / 1024 / 1024).toFixed(2);
console.log(`  fonts inlined : ${String(inlined)}`);
console.log(`  images inlined: ${String(images)}`);
if (missing.length) console.log(`  MISSING       : ${missing.join(', ')}`);
console.log(`  wrote         : ${OUT} (${mb} MB)`);
console.log(`  open it by double-clicking; no server, no network.`);
