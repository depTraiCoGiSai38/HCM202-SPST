/**
 * Generates `src/data/land.ts` — the basemap the plate is drawn on.
 *
 * AUTHORING TOOL, run by hand, NOT part of `npm run build`. It is the only
 * thing in this repository that fetches anything, and what it produces is plain
 * text that is then committed. The product itself never fetches a map.
 *
 * It emits four layers, from three named datasets, each with its own reason:
 *
 *  1. LAND / COASTLINE — `world-atlas@2.0.2` `land-110m.json`, a pre-built
 *     TopoJSON of Natural Earth 1:110m land (ISC wrapper; Natural Earth itself
 *     public domain).
 *
 *  2. NATIONAL BOUNDARIES — `world-atlas@2.0.2` `countries-110m.json`, the SAME
 *     package at the SAME version, so the two layers share one provenance and
 *     one Natural Earth vintage. Boundaries are derived topologically: TopoJSON
 *     shares an arc between the polygons that touch along it, so an arc used by
 *     two or more COUNTRIES is a national land boundary and an arc used by one
 *     is coastline. Taking only the shared arcs yields exactly the Admin-0
 *     "boundary lines land" theme, with no line drawn twice and no coastline
 *     doubled under the land layer.
 *
 *     This is Admin-0 and ONLY Admin-0. The source file contains no Admin-1
 *     geometry at all, so no province, state, prefecture or district mesh can
 *     enter the product through this path even by accident.
 *
 *  3. VIETNAM OFFSHORE ARCHIPELAGOS — Natural Earth, fetched from release tag
 *     `v5.1.2`. NOTE that the tag is not the theme version: Natural Earth
 *     versions each theme independently, and at that tag the two themes used
 *     here are 5.1.1 and 5.0.0 respectively. Two files, for two different jobs,
 *     because at 1:110m neither archipelago exists at all: `land-110m.json` and `countries-110m.json` contain ZERO
 *     geometry anywhere in either group's extent, so the world
 *     dataset the rest of the plate uses simply cannot show them.
 *
 *       - `ne_10m_admin_0_countries_vnm.geojson` — Natural Earth's VIETNAM
 *         point-of-view edition, for the island positions. In Natural Earth's
 *         DEFAULT edition the northern group's seven islets are attributed to
 *         China and the southern group is a stateless feature; in the Vietnam POV
 *         edition both groups are part of Vietnam. Taking the default edition
 *         would have published a third party's de facto reading as if it were
 *         this project's, which section 11 of the brief forbids.
 *       - `ne_10m_geography_regions_polys.geojson` — for the island-group extent
 *         and to validate the selection against its `name_vi` field. The names
 *         are used for selection only and are never emitted - see below.
 *
 *     DO NOT take `name_vi` from the admin-0 themes. In those themes Natural
 *     Earth has the Spratly feature's `name_vi` set to `Đảo Wake` — Wake Island,
 *     in the north Pacific. Only the geography-regions theme carries the correct
 *     Vietnamese strings. This tool reads them from there and asserts them.
 *
 * Other deliberate choices, each recorded in the output:
 *
 *  - EQUIRECTANGULAR, x = longitude, y = -latitude. No projection library, and
 *    a viewBox can then be written directly in degrees.
 *  - Douglas-Peucker at 0.1 degrees. At the closest framing the plate allows
 *    (~24 degrees across) that is well under a pixel of error, and the 1:110m
 *    source data is the real resolution limit either way.
 *  - Each archipelago islet is reduced to ONE REPRESENTATIVE POINT, not kept as
 *    a polygon, and this follows the standard rather than working around it.
 *    `QCVN 80:2024/BTNMT` clause 4.1.2 sets the rule directly:
 *
 *      "các đảo có diện tích từ 0,5 mm2 trở lên trên bản đồ được trình bày bằng
 *       ký hiệu theo tỷ lệ, các đảo có diện tích dưới 0,5 mm2 trên bản đồ được
 *       trình bày bằng ký hiệu không theo tỷ lệ. Đối với quần đảo, cụm đảo phải
 *       lưu ý lựa chọn sao cho thể hiện được mật độ phân bố các đảo đồng thời
 *       thể hiện đúng hình dạng và hướng của quần đảo, cụm đảo đó."
 *
 *    and clause 4.8 defines a non-scale symbol as having "kích thước quy ước,
 *    không theo kích thước thực". These islets are 0.3-1.7 km across: even in a
 *    dedicated inset they measure about 3.5 px2, against a 0.5 mm2 threshold of
 *    roughly 7 px2 at 96 dpi. Every one of them is therefore below the threshold
 *    and a constant-size symbol is the PRESCRIBED treatment, not a compromise.
 *
 *    What the same clause does require is that the SELECTION preserve the
 *    group's distribution density, shape and direction - which is what the true
 *    positions carry, and why the inset exists. The extent each group really
 *    covers, and the extent this source actually resolves, are both published in
 *    the register rather than implied by the drawing.
 *
 *  4. VIETNAM'S COASTAL ISLANDS — the same Vietnam point-of-view file, kept as
 *     real POLYGONS at true scale. `QCVN 80:2024/BTNMT` clause 1.1 names `đảo`
 *     separately from `quần đảo`, and the 1:110m dataset resolves none of it: a
 *     scan of `land-110m.json` finds zero vertices anywhere near Phú Quốc, Côn
 *     Đảo or the Hạ Long group. Unlike the archipelagos these are big enough to
 *     draw honestly - Phú Quốc is about 49 km across - so they are drawn as the
 *     shapes the source gives, at a much finer simplification tolerance, because
 *     0.1 degrees would collapse an island 0.2 degrees wide into nothing.
 *
 * Usage: node tools/build-land.mjs
 */
import { writeFileSync } from 'fs';

/** Land and national boundaries: one package, one version, one NE vintage. */
const LAND_SRC = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json';
const COUNTRY_SRC = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

/**
 * Vietnam-specific overlay, pinned to a TAGGED Natural Earth release rather
 * than to `master`, so re-running this tool cannot silently pick up different
 * geometry or different attribute values.
 */
const NE_TAG = 'v5.1.2';
const NE = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/${NE_TAG}/geojson/`;
const VNM_SRC = `${NE}ne_10m_admin_0_countries_vnm.geojson`;
const REGIONS_SRC = `${NE}ne_10m_geography_regions_polys.geojson`;

/*
 * THEME versions, which are NOT the repository tag and NOT each other.
 *
 * Natural Earth versions each theme independently, so `v5.1.2` names the release
 * these files were fetched from and says nothing about either theme's own
 * version. Read from the artifacts' own `.VERSION.txt` at the same tag:
 *
 *   ne_10m_admin_0_countries_vnm      5.1.1
 *   ne_10m_geography_regions_polys    5.0.0
 *
 * Recorded separately because conflating the two would misstate provenance, and
 * because `world-atlas@2.0.2` is a third, unrelated version of a third thing.
 */
const VNM_VERSION = '5.1.1';
const REGIONS_VERSION = '5.0.0';

const EPS = 0.1;
const DP = 2;

/** Natural Earth's own English names for the two island groups. */
const ARCHIPELAGOS = [
  { id: 'hoang-sa', neName: 'Paracel Islands' },
  { id: 'truong-sa', neName: 'Spratly Islands' },
];

async function json(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch failed: ${String(res.status)} ${url}`);
  return res.json();
}

const [landTopo, countryTopo, vnm, regions] = await Promise.all([
  json(LAND_SRC),
  json(COUNTRY_SRC),
  json(VNM_SRC),
  json(REGIONS_SRC),
]);

/** TopoJSON delta-decodes each arc; undo that and apply the quantisation transform. */
function decode(topo) {
  const {
    scale: [sx, sy],
    translate: [tx, ty],
  } = topo.transform;
  return topo.arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * sx + tx, y * sy + ty];
    });
  });
}

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

const num = (n) => String(Number(n.toFixed(DP)));

/**
 * Split a run of points wherever it jumps the antimeridian.
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

const toPath = (pts, close) =>
  `M${pts.map(([lon, lat]) => `${num(lon)},${num(-lat)}`).join(' ')}${close ? 'Z' : ''}`;

/* ---- 1. land ---------------------------------------------------------- */

const LAND_ARCS = decode(landTopo);
function ringOf(arcs, ids) {
  let out = [];
  for (const id of ids) {
    const arc = id < 0 ? arcs[~id].slice().reverse() : arcs[id];
    out = out.length === 0 ? arc.slice() : out.concat(arc.slice(1));
  }
  return out;
}

const landSegments = [];
let landPoints = 0;
let landSplits = 0;
for (const polygon of landTopo.objects.land.geometries[0].arcs) {
  for (const r of polygon) {
    const pts = simplify(ringOf(LAND_ARCS, r), EPS);
    if (pts.length < 4) continue;
    const pieces = splitAtAntimeridian(pts);
    if (pieces.length > 1) landSplits += 1;
    for (const piece of pieces) {
      if (piece.length < 4) continue;
      landPoints += piece.length;
      landSegments.push(toPath(piece, true));
    }
  }
}
const landPath = landSegments.join(' ');

/* ---- 2. national boundaries -------------------------------------------- */

const COUNTRY_ARCS = decode(countryTopo);

/*
 * Count the COUNTRIES that use each arc, not the polygons. A country made of
 * several polygons must not make its own coastline look like a border, so each
 * country contributes an arc at most once.
 */
const useCount = new Map();
for (const g of countryTopo.objects.countries.geometries) {
  const polygons = g.type === 'MultiPolygon' ? g.arcs : [g.arcs];
  const own = new Set();
  for (const polygon of polygons) {
    for (const ring of polygon) {
      for (const id of ring) own.add(id < 0 ? ~id : id);
    }
  }
  for (const id of own) useCount.set(id, (useCount.get(id) ?? 0) + 1);
}

const borderSegments = [];
let borderPoints = 0;
let borderSplits = 0;
let coastOnlyArcs = 0;
for (const [id, n] of [...useCount.entries()].sort((a, b) => a[0] - b[0])) {
  if (n < 2) {
    coastOnlyArcs += 1;
    continue;
  }
  const pts = simplify(COUNTRY_ARCS[id], EPS);
  if (pts.length < 2) continue;
  const pieces = splitAtAntimeridian(pts);
  if (pieces.length > 1) borderSplits += 1;
  for (const piece of pieces) {
    if (piece.length < 2) continue;
    borderPoints += piece.length;
    // Open polylines, never closed: a border is a line between two countries,
    // and closing it would invent a segment that separates nothing.
    borderSegments.push(toPath(piece, false));
  }
}
const borderPath = borderSegments.join(' ');

/* ---- 3. Vietnam offshore archipelagos ---------------------------------- */

const prop = (f, ...names) => {
  for (const n of names) {
    const v = f.properties[n] ?? f.properties[n.toUpperCase()] ?? f.properties[n.toLowerCase()];
    if (v !== undefined && v !== null) return v;
  }
  return undefined;
};

const vietnam = vnm.features.find((f) => prop(f, 'adm0_a3') === 'VNM');
if (!vietnam) throw new Error('no VNM feature in the Vietnam point-of-view file');

function bboxOf(points) {
  let w = 1e9;
  let s = 1e9;
  let e = -1e9;
  let n = -1e9;
  for (const [x, y] of points) {
    if (x < w) w = x;
    if (x > e) e = x;
    if (y < s) s = y;
    if (y > n) n = y;
  }
  return [w, s, e, n];
}

/** One representative point per islet: the mean of its outer ring's vertices. */
function representativePoint(ring) {
  let x = 0;
  let y = 0;
  for (const [lon, lat] of ring) {
    x += lon;
    y += lat;
  }
  return [x / ring.length, y / ring.length];
}

const vnParts =
  vietnam.geometry.type === 'MultiPolygon'
    ? vietnam.geometry.coordinates
    : [vietnam.geometry.coordinates];

const archipelagos = [];
const archipelagoPartIndexes = new Set();
for (const { id, neName } of ARCHIPELAGOS) {
  const region = regions.features.find(
    (f) => prop(f, 'name') === neName && prop(f, 'featurecla') === 'Island group',
  );
  if (!region) throw new Error(`no island-group polygon named ${neName}`);

  const nameVi = prop(region, 'name_vi');
  if (typeof nameVi !== 'string' || !nameVi.startsWith('quần đảo')) {
    throw new Error(`unexpected name_vi for ${neName}: ${String(nameVi)}`);
  }

  // The island-group hull, which is the authoritative extent for this group.
  const hull = (region.geometry.type === 'MultiPolygon'
    ? region.geometry.coordinates.flat()
    : region.geometry.coordinates
  )[0];
  const extent = bboxOf(hull);

  /*
   * Every Vietnam polygon whose representative point falls inside that hull's
   * extent. Selecting by the region file's own extent rather than by a
   * hand-typed box is what keeps this reproducible: no coordinate in this tool
   * is written from memory.
   */
  const islets = [];
  vnParts.forEach((part, i) => {
    const p = representativePoint(part[0]);
    if (p[0] < extent[0] || p[0] > extent[2] || p[1] < extent[1] || p[1] > extent[3]) return;
    archipelagoPartIndexes.add(i);
    islets.push([Number(p[0].toFixed(4)), Number(p[1].toFixed(4))]);
  });
  if (islets.length === 0) throw new Error(`no Vietnam islets inside the ${neName} extent`);
  islets.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

  const spread = bboxOf(islets);
  archipelagos.push({
    /*
     * NO NAME IS EMITTED. `nameVi` is read and asserted above, because reading
     * it is how the right features get selected and how the upstream `Đảo Wake`
     * error stays caught - but it stops at this tool. The product does not
     * inscribe either archipelago's name anywhere a reader can see, and no
     * display string for them ships in the bundle. PROJECT DECISION, 2026-09-18:
     * this product is about the formation of Hồ Chí Minh's thought, and naming
     * the two groups on its plate made a sovereignty statement it has no need to
     * make and no standing to make.
     */
    id,
    wikidataId: prop(region, 'wikidataid') ?? '',
    islets,
    extent: extent.map((v) => Number(v.toFixed(3))),
    /*
     * The extent of the islets THIS SOURCE actually resolves, which is what the
     * inset is framed on. It is not the same as `extent`, the published extent
     * of the whole group, and the difference is real: for the southern group the source
     * resolves 114.03-115.85 E of a group published as 111.87-117.88 E. Framing
     * the inset on the published extent would draw a mostly empty box and read
     * as a smaller, off-centre archipelago; framing on the data and printing
     * both numbers is the honest pair.
     */
    isletExtent: spread.map((v) => Number(v.toFixed(4))),
    // Label anchor: centred on the islets, just south of the southernmost one.
    // Offset applied at render time, in canvas units, so it does not scale with
    // the framing and cannot drift into the cluster at a wide window.
    labelAt: [
      Number(((spread[0] + spread[2]) / 2).toFixed(4)),
      Number(spread[1].toFixed(4)),
    ],
  });
}

/* ---- 4. Vietnam's coastal islands --------------------------------------- */

/*
 * `QCVN 80:2024/BTNMT` clause 1.1 requires a map representing Vietnam to show
 * `đất liền, biển, đảo, quần đảo` - mainland, sea, ISLANDS and archipelagos.
 * `đảo` is named separately from `quần đảo`, and the 1:110m world dataset
 * resolves NONE of it: a scan of `land-110m.json` finds zero vertices anywhere
 * near Phú Quốc, Côn Đảo or the Hạ Long group. Left at 1:110m the plate would be
 * mainland-only, which is the exact reduction the brief rules out.
 *
 * So Vietnam's coastal islands come from the same Vietnam point-of-view file the
 * archipelago positions do. UNLIKE the archipelagos these are kept as real
 * POLYGONS at true scale: Phú Quốc is about 49 km across, which is several
 * pixels at the in-country framings and a legitimate shape to draw. Nothing is
 * enlarged, and nothing is drawn that the source does not carry.
 *
 * A much finer simplification tolerance than the world layers use, because
 * Douglas-Peucker at 0.1 degrees would collapse an island only 0.2 degrees
 * across into nothing at all.
 */
const VN_ISLAND_EPS = 0.01;

const islandSegments = [];
let islandPoints = 0;
let mainlandParts = 0;
vnParts.forEach((part, i) => {
  if (archipelagoPartIndexes.has(i)) return;
  const ring = part[0];
  // The mainland is already drawn by the world land layer; drawing it again from
  // a second dataset at a second scale would double the coastline.
  if (ring.length > 1000) {
    mainlandParts += 1;
    return;
  }
  const pts = simplify(ring, VN_ISLAND_EPS);
  if (pts.length < 4) return;
  islandPoints += pts.length;
  islandSegments.push(toPath(pts, true));
});
const islandPath = islandSegments.join(' ');

/* ---- emit --------------------------------------------------------------- */

const lit = (v) => JSON.stringify(v);

const file = `/**
 * The plate's basemap. GENERATED FILE - do not edit by hand.
 *
 * Regenerate with \`node tools/build-land.mjs\`. That tool fetches; this file is
 * plain committed text, and the product itself never requests a map.
 *
 * ---- 1. LAND / COASTLINE ------------------------------------------------
 *
 * Source:     world-atlas@2.0.2 (\`land-110m.json\`), pre-built TopoJSON of
 *             Natural Earth 1:110m land.
 * Licence:    world-atlas is ISC; Natural Earth is public domain.
 * Retrieved:  ${LAND_SRC}
 *
 * Rings crossing the antimeridian are split into separate subpaths rather than
 * drawn across the whole plate; ${String(landSplits)} ring(s) needed that.
 * ${String(landSegments.length)} rings, ${String(landPoints)} points.
 *
 * ---- 2. NATIONAL BOUNDARIES ---------------------------------------------
 *
 * Source:     world-atlas@2.0.2 (\`countries-110m.json\`) - the SAME package at
 *             the SAME version as the land above, so both layers carry one
 *             Natural Earth vintage and cannot drift apart.
 * Licence:    as above.
 * Retrieved:  ${COUNTRY_SRC}
 *
 * ADMIN-0 ONLY. Derived topologically: TopoJSON shares an arc between the
 * polygons that meet along it, so an arc used by two or more COUNTRIES is a
 * national land boundary and an arc used by one is coastline. Of ${String(
   countryTopo.arcs.length,
 )} arcs,
 * ${String(useCount.size - coastOnlyArcs)} are shared and drawn here; ${String(
   coastOnlyArcs,
 )} are coastline and are left to the land layer.
 * ${String(borderSegments.length)} open polylines, ${String(borderPoints)} points, ${String(
   borderSplits,
 )} split at the antimeridian.
 *
 * There is NO Admin-1 geometry in the source file, so no province, state,
 * prefecture, county or district line can reach the product through this path.
 * Boundaries are drawn as open polylines, never closed, because a border
 * separates two countries rather than enclosing one.
 *
 * ORIENTATION CONTEXT, NOT A HISTORICAL CLAIM. These are present-day boundaries
 * under an excerpt that spans 1911-1969. They are here so a reader can tell
 * which country a mark sits in; they are not an assertion that today's borders
 * existed at every date the excerpt names. That is stated in the register.
 *
 * ---- 3. VIETNAM OFFSHORE ARCHIPELAGOS -----------------------------------
 *
 * At 1:110m NEITHER archipelago exists: both world-atlas files contain zero
 * geometry anywhere in their extent, so the dataset the rest of the plate is
 * built from cannot show them at any zoom. They come from Natural Earth 10m
 * instead, pinned to tag ${NE_TAG}:
 *
 * Positions:  ${VNM_SRC}
 *             Natural Earth's VIETNAM POINT-OF-VIEW edition. Natural Earth
 *             publishes several national worldviews and they attribute these
 *             groups differently; this product uses the Vietnam edition. The
 *             choice of edition is a documented editorial decision, not an
 *             accident of whichever file was nearest.
 * Extents:    ${REGIONS_SRC}
 *             The island-group polygons, used to select the right features and
 *             to record each group's published extent.
 *
 * NO GROUP NAME IS EMITTED. The build tool reads the source's Vietnamese name
 * field to select and validate the features, then stops. The product does not
 * inscribe these names anywhere - PROJECT DECISION, 2026-09-18: the subject here
 * is the formation of Hồ Chí Minh's thought, and naming them on the plate made a
 * sovereignty statement the product has no need and no standing to make.
 * Licence:    Natural Earth is public domain.
 *
 * Each islet is ONE POINT, not a polygon. The real islets are 0.3-1.7 km
 * across - a fraction of a pixel at every framing this plate uses - so a
 * polygon would draw nothing and an enlarged polygon would draw land that is
 * not there. \`QCVN 80:2024/BTNMT\` clause 4.1.2 sets exactly this rule: below
 * 0.5 mm2 on the map an island is drawn \`ký hiệu không theo tỷ lệ\`, which clause
 * 4.8 defines as a symbol at a conventional size rather than the object's real
 * one. The extent each group actually covers is carried in \`extent\` and
 * published in the register rather than implied by the drawing.
 *
 * THE CARTOGRAPHIC CONVENTION IS CITED, NOT ASSERTED. This product follows the
 * Vietnam point-of-view edition named above. A software build cannot settle a
 * territorial dispute and does not claim to; what it can do is say exactly which
 * source and which edition it followed, which is what this header is for.
 *
 * ---- projection ---------------------------------------------------------
 *
 * Equirectangular, \`x = longitude\`, \`y = -latitude\`, so a viewBox is written
 * directly in degrees. Its distortion at high latitude is stated in the
 * verification register rather than hidden.
 *
 * Land and boundaries are simplified with Douglas-Peucker at ${String(
   EPS,
 )} degrees; every
 * coordinate is rounded to ${String(DP)} decimal places.
 *
 * This is geometry, not an academic claim. It carries no locator and evidences
 * nothing about the excerpt.
 */

export const LAND_PATH =
  '${landPath}';

/**
 * Vietnam's coastal islands, as real polygons at true scale.
 *
 * Required by \`QCVN 80:2024/BTNMT\` clause 1.1, which names \`đảo\` separately from
 * \`quần đảo\`. The 1:110m world dataset resolves none of them - it has no
 * geometry at Phú Quốc, Côn Đảo or the Hạ Long group - so they come from the
 * Vietnam point-of-view file at 10m, simplified at ${String(VN_ISLAND_EPS)} degrees.
 * ${String(islandSegments.length)} islands, ${String(islandPoints)} points.
 *
 * These are NOT the archipelago symbols. Phú Quốc really is about 49 km across,
 * so it is drawn as the shape the source gives. Nothing here is enlarged.
 */
export const VN_ISLANDS_PATH =
  '${islandPath}';

/**
 * National land boundaries, Admin-0 only, as open polylines.
 *
 * Present-day orientation context under a 1911-1969 narrative. See the header.
 */
export const BORDER_PATH =
  '${borderPath}';

/** An offshore island group, carried as points because it is smaller than a pixel. */
export interface Archipelago {
  id: string;
  /** The item id the cited source carries for this group, for checking. */
  wikidataId: string;
  /** One representative point per islet, \`[lon, lat]\`. Never a landmass. */
  islets: readonly (readonly [number, number])[];
  /** The extent the group really covers, \`[w, s, e, n]\`, as published. */
  extent: readonly [number, number, number, number];
  /** The extent of the islets this source resolves, \`[w, s, e, n]\`. Frames the inset. */
  isletExtent: readonly [number, number, number, number];
  /** Where the label hangs, \`[lon, lat]\`; the offset is applied in canvas units. */
  labelAt: readonly [number, number];
}

/**
 * The two offshore archipelagos the Vietnamese cartographic convention requires
 * on a map that represents Vietnam.
 *
 * Read from the sources in the header, never typed from memory.
 */
export const ARCHIPELAGOS: readonly Archipelago[] = ${lit(archipelagos)};

/** Douglas-Peucker tolerance used above, in degrees. Published so a framing cannot silently out-zoom the data. */
export const LAND_SIMPLIFY_DEGREES = ${String(EPS)};

/** Closest framing the source resolution honestly supports, in degrees of longitude. */
export const LAND_MIN_WINDOW_DEGREES = 24;

/**
 * How wide an archipelago's islet cluster must be ON THE CANVAS, in canvas
 * units, before the plate draws its islets individually and names it.
 *
 * Below this the cluster cannot be resolved: the islets are only 1.5-2 degrees
 * apart, so at a wide framing they fall within a few units of each other, and
 * marks big enough to see MERGE INTO ONE FILLED MASS - which is precisely the
 * thing that must never happen, because a filled mass darker than the land
 * beside it reads as real land area. At a whole-world framing the northern
 * cluster is about 4 units across; seven marks of radius 2.4 inside 4 units is
 * a blob, not a scatter.
 *
 * So below this threshold the group is drawn as ONE open symbol instead, which
 * is the ordinary small-scale cartographic answer for an island group, and the
 * label is dropped with it - a name nobody can read is clutter, and the text
 * beside the plate carries the fact either way.
 *
 * 45 units is set from the geometry, not from taste: the narrower clusters span
 * about 1.55 degrees, so 45 units is reached at roughly a 34-degree window,
 * which is the in-country framing and nothing wider.
 */
export const ARCHIPELAGO_MIN_SPREAD_UNITS = 45;

/** One cartographic source, as the register prints it. Generated, never hand-written. */
export interface CartographySource {
  layer: string;
  dataset: string;
  version: string;
  url: string;
  licence: string;
  note: string;
}

/** ISO date on which this file's geometry was fetched from the sources below. */
export const CARTOGRAPHY_RETRIEVED = '${new Date().toISOString().slice(0, 10)}';

/** Projection used for every layer, stated so its distortion is not hidden. */
export const CARTOGRAPHY_PROJECTION =
  'Phép chiếu hình trụ đều (equirectangular / plate carrée), x = kinh độ, y = -vĩ độ. Phép chiếu này KHÔNG bảo toàn diện tích, khoảng cách hay hình dạng: càng xa xích đạo, vùng đất càng bị kéo giãn theo chiều ngang. Chọn nó vì nó cho phép viết khung nhìn thẳng bằng độ và không cần thư viện chiếu bản đồ nào.';

/**
 * The provenance of every line on the plate.
 *
 * Generated from the same constants the geometry was built from, so the
 * register cannot drift from the data the way a hand-written constant does.
 */
export const CARTOGRAPHY_SOURCES: readonly CartographySource[] = ${lit([
  {
    layer: 'Đường bờ biển',
    dataset: 'world-atlas land-110m.json (Natural Earth 1:110m land)',
    version: 'world-atlas@2.0.2',
    url: LAND_SRC,
    licence: 'world-atlas: ISC. Natural Earth: miền công cộng.',
    note: `Đơn giản hoá Douglas-Peucker ở mức ${String(EPS)}°, làm tròn ${String(
      DP,
    )} chữ số thập phân. ${String(landSegments.length)} vòng, ${String(landPoints)} điểm.`,
  },
  {
    layer: 'Biên giới quốc gia',
    dataset: 'world-atlas countries-110m.json (Natural Earth 1:110m Admin-0)',
    version: 'world-atlas@2.0.2',
    url: COUNTRY_SRC,
    licence: 'world-atlas: ISC. Natural Earth: miền công cộng.',
    note: `Chỉ cấp Admin-0. Suy ra theo tô-pô: cung nào được từ hai QUỐC GIA trở lên dùng chung thì là biên giới trên đất liền; cung chỉ một quốc gia dùng là đường bờ biển và để lớp bờ biển vẽ. ${String(
      useCount.size - coastOnlyArcs,
    )} cung dùng chung trên tổng số ${String(
      countryTopo.arcs.length,
    )}. Tệp nguồn không chứa bất kỳ hình học Admin-1 nào, nên không có ranh giới tỉnh, bang hay huyện nào lọt vào được. Đây là biên giới hiện nay, dùng để định hướng, KHÔNG phải khẳng định rằng biên giới ngày nay đã tồn tại y như vậy ở mọi mốc thời gian 1911-1969.`,
  },
  {
    layer: 'Đảo ngoài khơi: vị trí',
    dataset: 'ne_10m_admin_0_countries_vnm.geojson (bản đồ theo quan điểm Việt Nam)',
    version: `Natural Earth, lớp ${VNM_VERSION} (tải từ bản phát hành ${NE_TAG})`,
    url: VNM_SRC,
    licence: 'Natural Earth: miền công cộng.',
    note: 'Ở mức 1:110m KHÔNG có hình học nào của các nhóm đảo ngoài khơi, nên chúng được lấy từ bộ 10m. Natural Earth phát hành nhiều bản theo các quan điểm quốc gia khác nhau, và các bản ấy quy thuộc các nhóm đảo này khác nhau. Sản phẩm dùng bản dựng theo quan điểm Việt Nam. Đây là một quyết định biên tập được ghi rõ chứ không phải mặc nhiên lấy tệp nào gần tay nhất. Sản phẩm KHÔNG ghi tên nhóm đảo nào lên bản khắc: đề tài ở đây là quá trình hình thành tư tưởng Hồ Chí Minh, không phải chủ quyền biển đảo.',
  },
  {
    layer: 'Đảo ven bờ Việt Nam',
    dataset: 'ne_10m_admin_0_countries_vnm.geojson (bản đồ theo quan điểm Việt Nam)',
    version: `Natural Earth, lớp ${VNM_VERSION} (tải từ bản phát hành ${NE_TAG})`,
    url: VNM_SRC,
    licence: 'Natural Earth: miền công cộng.',
    note: `QCVN 80:2024/BTNMT mục 1.1 nêu “đất liền, biển, đảo, quần đảo” — “đảo” được kể riêng với “quần đảo”. Bộ 1:110m không có một đỉnh nào ở Phú Quốc, Côn Đảo hay vùng Hạ Long, nên nếu chỉ dùng bộ ấy thì bản khắc sẽ chỉ còn phần đất liền. ${String(
      islandSegments.length,
    )} đảo lấy từ bộ 10m, đơn giản hoá ở mức ${String(
      VN_ISLAND_EPS,
    )}°, giữ nguyên dạng đa giác theo đúng tỷ lệ thật — khác với hai quần đảo ngoài khơi vốn chỉ vẽ được bằng ký hiệu. Phú Quốc rộng khoảng 49 km nên vẽ đúng hình được. Không phóng to gì cả.`,
  },
  {
    layer: 'Đảo ngoài khơi: phạm vi nhóm đảo',
    dataset: 'ne_10m_geography_regions_polys.geojson',
    version: `Natural Earth, lớp ${REGIONS_VERSION} (tải từ bản phát hành ${NE_TAG})`,
    url: REGIONS_SRC,
    licence: 'Natural Earth: miền công cộng.',
    note: 'Lớp này cung cấp phạm vi công bố của từng nhóm đảo, dùng để chọn đúng nhóm khi dựng dữ liệu. Công cụ dựng có đọc trường tên tiếng Việt của lớp để kiểm tra chọn đúng đối tượng, nhưng KHÔNG ghi tên ấy vào sản phẩm. Ghi chú kỹ thuật: các lớp admin-0 của cùng bộ dữ liệu có một trường tên tiếng Việt sai, nên tuyệt đối không lấy tên từ đó.',
  },
])};
`;

writeFileSync(new URL('../src/data/land.ts', import.meta.url), file, 'utf8');
console.log(`wrote src/data/land.ts`);
console.log(
  `  land     : ${String(landSegments.length)} rings, ${String(landPoints)} points, ${String(
    Math.round(landPath.length / 1024),
  )} KB`,
);
console.log(
  `  borders  : ${String(borderSegments.length)} lines, ${String(borderPoints)} points, ${String(
    Math.round(borderPath.length / 1024),
  )} KB (Admin-0 only)`,
);
console.log(
  `  VN islands: ${String(islandSegments.length)} polygons, ${String(
    islandPoints,
  )} points, ${String(Math.round(islandPath.length / 1024))} KB (mainland parts skipped: ${String(
    mainlandParts,
  )})`,
);
for (const a of archipelagos) {
  console.log(
    `  offshore ${a.id.padEnd(10)}: ${String(a.islets.length)} islets, extent ${a.extent.join(', ')}`,
  );
}
