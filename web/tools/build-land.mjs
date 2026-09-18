/**
 * Generates `src/data/land.ts` — the world land outline the plate is drawn on.
 *
 * AUTHORING TOOL, run by hand, NOT part of `npm run build`. It is the only
 * thing in this repository that fetches anything, and what it produces is plain
 * text that is then committed. The product itself never fetches a map.
 *
 * Source: `world-atlas@2.0.2`, a pre-built TopoJSON of Natural Earth, published
 * under ISC. Natural Earth is itself public domain. Both facts are recorded in
 * the generated file's header so the licence travels with the data.
 *
 * Three deliberate choices, each recorded in the output:
 *
 *  1. LAND ONLY, no country borders. The assigned excerpt spans 1911-1969.
 *     Drawing today's borders under it would assert boundaries the textbook
 *     never mentions, at dates when they did not exist. Coastlines are stable
 *     across that period; borders are not.
 *  2. EQUIRECTANGULAR, x = longitude, y = -latitude. No projection library, and
 *     a viewBox can then be written directly in degrees.
 *  3. Douglas-Peucker at 0.1 degrees. At the closest framing the plate allows
 *     (~24 degrees across) that is well under a pixel of error, and the 1:110m
 *     source data is the real resolution limit either way.
 *
 * Usage: node tools/build-land.mjs
 */
import { writeFileSync } from 'fs';

const SRC = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json';
const EPS = 0.1;
const DP = 2;

const res = await fetch(SRC);
if (!res.ok) throw new Error(`fetch failed: ${String(res.status)} ${SRC}`);
const topo = await res.json();

const { scale: [sx, sy], translate: [tx, ty] } = topo.transform;

/** TopoJSON delta-decodes each arc; undo that and apply the quantisation transform. */
const ARCS = topo.arcs.map((arc) => {
  let x = 0;
  let y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * sx + tx, y * sy + ty];
  });
});

function perpendicular(p, a, b) {
  const [x0, y0] = p;
  const [x1, y1] = a;
  const [x2, y2] = b;
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(x0 - x1, y0 - y1);
  let t = ((x0 - x1) * dx + (y0 - y1) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(x0 - (x1 + t * dx), y0 - (y1 + t * dy));
}

/** Iterative Douglas-Peucker, so a long ring cannot blow the call stack. */
function simplify(points, eps) {
  if (points.length < 3) return points;
  const keep = new Array(points.length).fill(false);
  keep[0] = true;
  keep[points.length - 1] = true;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop();
    if (j <= i + 1) continue;
    let best = 0;
    let at = i;
    for (let k = i + 1; k < j; k++) {
      const d = perpendicular(points[k], points[i], points[j]);
      if (d > best) {
        best = d;
        at = k;
      }
    }
    if (best > eps) {
      keep[at] = true;
      stack.push([i, at], [at, j]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

/** A ring is a list of arc indices; a negative index means "that arc, reversed". */
function ring(ids) {
  let out = [];
  for (const id of ids) {
    const arc = id < 0 ? ARCS[~id].slice().reverse() : ARCS[id];
    out = out.length === 0 ? arc.slice() : out.concat(arc.slice(1));
  }
  return out;
}

const num = (n) => String(Number(n.toFixed(DP)));

/**
 * Split a ring wherever it jumps the antimeridian.
 *
 * A ring that wraps past 180 degrees comes back as a point at -180, and drawing
 * straight from one to the other lays a line right across the whole plate.
 * Antarctica and the north-east tip of Asia both do this. Each piece is emitted
 * as its own subpath instead; nothing is invented to bridge the gap, so the
 * plate simply stops at the edge of the frame, which is what it should do.
 */
function splitAtAntimeridian(points) {
  const pieces = [];
  let current = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const prev = points[i - 1];
    if (prev && Math.abs(p[0] - prev[0]) > 180) {
      if (current.length > 1) pieces.push(current);
      current = [];
    }
    current.push(p);
  }
  if (current.length > 1) pieces.push(current);
  return pieces;
}

const segments = [];
let points = 0;
let splits = 0;
for (const polygon of topo.objects.land.geometries[0].arcs) {
  for (const r of polygon) {
    const pts = simplify(ring(r), EPS);
    if (pts.length < 4) continue;
    const pieces = splitAtAntimeridian(pts);
    if (pieces.length > 1) splits += 1;
    for (const piece of pieces) {
      if (piece.length < 4) continue;
      points += piece.length;
      segments.push(`M${piece.map(([lon, lat]) => `${num(lon)},${num(-lat)}`).join(' ')}Z`);
    }
  }
}
const d = segments.join(' ');

const file = `/**
 * World land outline for the plate. GENERATED FILE - do not edit by hand.
 *
 * Regenerate with \`node tools/build-land.mjs\`.
 *
 * Source:     world-atlas@2.0.2 (\`land-110m.json\`), pre-built TopoJSON of
 *             Natural Earth 1:110m land.
 * Licence:    world-atlas is ISC; Natural Earth is public domain.
 * Retrieved:  ${SRC}
 *
 * LAND ONLY - no country borders. The assigned excerpt spans 1911-1969, and
 * drawing present-day borders beneath it would assert boundaries the textbook
 * never states, at dates when they did not exist. Coastlines are stable over
 * that period.
 *
 * Projection: equirectangular, \`x = longitude\`, \`y = -latitude\`, so a viewBox
 * is written directly in degrees. Its distortion at high latitude is stated in
 * the verification register rather than hidden.
 *
 * Rings crossing the antimeridian are split into separate subpaths rather than
 * drawn across the whole plate; ${String(splits)} ring(s) needed that.
 *
 * Simplified with Douglas-Peucker at ${String(EPS)} degrees; coordinates rounded to
 * ${String(DP)} decimal places. ${String(segments.length)} rings, ${String(points)} points.
 *
 * This is geometry, not an academic claim. It carries no locator and evidences
 * nothing about the excerpt.
 */

export const LAND_PATH =
  '${d}';

/** Douglas-Peucker tolerance used above, in degrees. Published so a framing cannot silently out-zoom the data. */
export const LAND_SIMPLIFY_DEGREES = ${String(EPS)};

/** Closest framing the source resolution honestly supports, in degrees of longitude. */
export const LAND_MIN_WINDOW_DEGREES = 24;
`;

writeFileSync(new URL('../src/data/land.ts', import.meta.url), file, 'utf8');
console.log(
  `wrote src/data/land.ts - ${String(segments.length)} rings, ${String(points)} points, ${String(
    Math.round(d.length / 1024),
  )} KB of path data`,
);
