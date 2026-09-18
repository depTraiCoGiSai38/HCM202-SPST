import { describe, expect, it } from 'vitest';

import {
  MOVEMENTS,
  PLACES,
  PLACE_BY_ID,
  PLACE_READING_NOTES,
  SPATIAL_NODES,
  nodesOfStage,
  placeOf,
  placesWithoutCoordinate,
  turningPointPlacement,
} from '../data/places';
import {
  ARCHIPELAGOS,
  ARCHIPELAGO_MIN_SPREAD_UNITS,
  BORDER_PATH,
  CARTOGRAPHY_PROJECTION,
  CARTOGRAPHY_RETRIEVED,
  CARTOGRAPHY_SOURCES,
  LAND_MIN_WINDOW_DEGREES,
  LAND_PATH,
  LAND_SIMPLIFY_DEGREES,
  VN_ISLANDS_PATH,
} from '../data/land';
import { ALL_QUOTATIONS, STAGES } from '../data/stages';
import { citeSource, isInExcerpt } from '../data/source';

/**
 * Invariants for the spatial layer.
 *
 * The plate's whole claim is that it goes exactly as far as the excerpt goes.
 * That claim is only worth anything if it is enforced, so these tests are
 * written to fail if a later change quietly fills one of the gaps the excerpt
 * leaves - which is the single most likely way this feature could turn into
 * the fabrication both rule documents put in their most serious category.
 */

const ALL_PASSAGE_IDS = new Set(
  STAGES.flatMap((s) => [...s.context, ...s.development].map((p) => p.id)),
);
const ALL_TURN_IDS = new Set(STAGES.flatMap((s) => s.turningPoints.map((t) => t.id)));
const ALL_QUOTE_IDS = new Set(ALL_QUOTATIONS.map((q) => q.id));

describe('every spatial node is tied to something already in the excerpt', () => {
  it('anchors to a real passage, turning point or quotation', () => {
    for (const node of SPATIAL_NODES) {
      const set =
        node.anchor.where === 'passage'
          ? ALL_PASSAGE_IDS
          : node.anchor.where === 'turn'
            ? ALL_TURN_IDS
            : ALL_QUOTE_IDS;
      expect(set.has(node.anchor.id), `${node.id} -> ${node.anchor.id}`).toBe(true);
    }
  });

  it('anchors inside its own stage', () => {
    for (const node of SPATIAL_NODES) {
      const stage = STAGES.find((s) => s.id === node.stageId);
      expect(stage, node.id).toBeDefined();
      if (!stage) continue;
      const own =
        node.anchor.where === 'passage'
          ? [...stage.context, ...stage.development].some((p) => p.id === node.anchor.id)
          : node.anchor.where === 'turn'
            ? stage.turningPoints.some((t) => t.id === node.anchor.id)
            : stage.quotations.includes(node.anchor.id);
      expect(own, `${node.id} anchors outside ${node.stageId}`).toBe(true);
    }
  });

  it('cites the 2019 textbook by its exact label and a printed page', () => {
    expect(SPATIAL_NODES.length).toBeGreaterThan(20);
    for (const node of SPATIAL_NODES) {
      expect(isInExcerpt(node.at), node.id).toBe(true);
      expect(citeSource(node.at)).toMatch(/^Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr\. \d{2}/);
    }
    for (const place of PLACES) {
      expect(isInExcerpt(place.at), place.id).toBe(true);
    }
  });

  it('has a unique id for every node, place and movement', () => {
    const ids = [
      ...SPATIAL_NODES.map((n) => n.id),
      ...PLACES.map((p) => p.id),
      ...MOVEMENTS.map((m) => m.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('the three evidentiary states cannot blur into each other', () => {
  it('a placed node names a place that has a coordinate', () => {
    for (const node of SPATIAL_NODES.filter((n) => n.kind === 'placed')) {
      const place = placeOf(node);
      expect(place, node.id).not.toBeNull();
      expect(place?.coordinate, `${node.id} is placed but its place has no coordinate`).toBeTruthy();
    }
  });

  it('a named-region node names a place that is deliberately NOT a point', () => {
    for (const node of SPATIAL_NODES.filter((n) => n.kind === 'named-region')) {
      const place = placeOf(node);
      expect(place, node.id).not.toBeNull();
      expect(place?.coordinate, `${node.id} would be drawable, so it is not a region`).toBeNull();
      expect(place?.noCoordinate, `${place?.id} must say why it is not a point`).toBeTruthy();
    }
  });

  it('an unplaced node names no place at all', () => {
    const unplaced = SPATIAL_NODES.filter((n) => n.kind === 'unplaced');
    expect(unplaced.length).toBeGreaterThan(10);
    for (const node of unplaced) {
      expect(node.placeId, node.id).toBeNull();
      expect(placeOf(node), node.id).toBeNull();
    }
  });

  it('every place that is not a point says why', () => {
    for (const place of placesWithoutCoordinate()) {
      expect(place.noCoordinate, place.id).toBeTruthy();
    }
  });
});

describe('coordinates are quoted evidence, never assertions', () => {
  it('carries a checkable record, its stated precision and a retrieval date', () => {
    for (const place of PLACES) {
      const c = place.coordinate;
      if (!c) continue;
      expect(c.qid, place.id).toMatch(/^Q\d+$/);
      expect(c.url).toBe(`https://www.wikidata.org/wiki/${c.qid}`);
      expect(c.retrieved).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(c.precision, `${place.id} must keep the precision the record states`).toBeGreaterThan(0);
      expect(Math.abs(c.lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(c.lon)).toBeLessThanOrEqual(180);
    }
  });

  it('never upgrades a coordinate past NEED VERIFICATION', () => {
    for (const place of PLACES) {
      expect(place.status).toBe('NEED VERIFICATION');
      if (place.coordinate) expect(place.coordinate.status).toBe('NEED VERIFICATION');
    }
    for (const node of SPATIAL_NODES) expect(node.status).toBe('NEED VERIFICATION');
    for (const m of MOVEMENTS) expect(m.status).toBe('NEED VERIFICATION');
  });

  it('draws a country as an area, not as an address', () => {
    // A country-level coordinate is a representative value, and the record says
    // so through its own precision. Anything claiming street-level precision for
    // a whole country would be the product inventing a centre.
    for (const place of PLACES.filter((p) => p.granularity === 'country')) {
      expect(place.coordinate, place.id).toBeTruthy();
      // TIGHTENED 18-9-2026: a single space satisfied `not.toBe('')`, and a
      // one-character caution flags nothing. The four country cautions run
      // 135-192 characters, so a positive threshold costs nothing and binds.
      expect(
        (place.caution ?? '').trim().length,
        `${place.id} must flag that a country is not a point`,
      ).toBeGreaterThan(20);
    }
  });
});

describe('a movement is drawn only where the excerpt states one', () => {
  it('resolves every named leg, and keeps unnamed ends unnamed', () => {
    expect(MOVEMENTS.length).toBeGreaterThan(0);
    for (const m of MOVEMENTS) {
      expect(m.legs.length).toBeGreaterThanOrEqual(2);
      const named = m.legs.filter((l): l is string => l !== null);
      expect(named.length, `${m.id} has no named end`).toBeGreaterThan(0);
      for (const leg of named) {
        const place = PLACE_BY_ID.get(leg);
        expect(place, `${m.id} -> ${leg}`).toBeDefined();
        expect(place?.coordinate, `${m.id} -> ${leg} cannot be drawn`).toBeTruthy();
      }
      // The statement is the excerpt's sentence, so it must actually be one.
      expect(m.statement.length).toBeGreaterThan(20);
    }
  });

  it('keeps the count of drawable movements small, because the excerpt states few', () => {
    // Eight pages contain very few sentences that state a movement in a form
    // that can be drawn. If this number grows, somebody has started inferring
    // journeys, and this test is the place that should stop them.
    expect(MOVEMENTS.length).toBeLessThanOrEqual(6);
  });
});

describe('the gaps the excerpt leaves stay gaps', () => {
  const published = JSON.stringify([PLACES, SPATIAL_NODES, MOVEMENTS, PLACE_READING_NOTES]);

  /**
   * Places that are historically famous for these events and are NOT printed
   * anywhere in the assigned excerpt. Each one is exactly the kind of detail a
   * well-meaning later edit would "helpfully" add.
   */
  const NEVER = [
    'Bến Nhà Rồng',
    'Sài Gòn',
    'Ba Đình',
    'Hương Cảng',
    'Cửu Long',
    'Mátxcơva',
    'Moskva',
    'Luân Đôn',
    'New York',
    'Niu Oóc',
    'Bôxtơn',
    'Hoa Kỳ',
    'Anh Quốc',
  ];

  it('never names a place the excerpt does not print', () => {
    for (const name of NEVER) {
      expect(published, `"${name}" is not printed in the excerpt`).not.toContain(name);
    }
  });

  it('never gives Hà Nội as an event location', () => {
    // Hà Nội appears in the excerpt ONLY inside footnote publisher addresses
    // ("Nxb Sự thật, Hà Nội, 1980"), which is a different kind of datum. It is
    // not a place where anything in section II is said to have happened.
    expect(PLACES.some((p) => p.printed.includes('Hà Nội'))).toBe(false);
  });

  it('leaves the departure of 5-6-1911 without a place', () => {
    const node = SPATIAL_NODES.find((n) => n.marker === '5-6-1911');
    expect(node, 'the departure node must exist').toBeDefined();
    expect(node?.kind).toBe('unplaced');
    expect(node?.placeId).toBeNull();
  });

  it('leaves 2-9-1945 without a place', () => {
    const node = SPATIAL_NODES.find((n) => n.marker === '2-9-1945');
    expect(node).toBeDefined();
    expect(node?.kind).toBe('unplaced');
  });

  it('leaves the unification conference of early 1930 without a place', () => {
    const node = SPATIAL_NODES.find((n) => n.marker === 'đầu năm 1930');
    expect(node).toBeDefined();
    expect(node?.kind).toBe('unplaced');
  });

  it('names no destination country for the 1911-1917 span', () => {
    // The excerpt prints `từ Pháp, Hồ Chí Minh đến nhiều nước trên thế giới` and
    // names not one of them. France is the point of DEPARTURE.
    const span = SPATIAL_NODES.filter((n) => n.marker === '1911-1917');
    expect(span.length).toBe(2);
    const placed = span.filter((n) => n.kind === 'placed');
    expect(placed.length).toBe(1);
    expect(placed[0]?.placeId).toBe('phap');
    expect(span.filter((n) => n.kind === 'unplaced').length).toBe(1);
  });

  it('does not lend Quảng Châu to the 6-1925 founding', () => {
    // `Quảng Châu` is printed for `Đường cách mệnh` in 1927 and for nothing else.
    const node = SPATIAL_NODES.find((n) => n.marker === '6-1925');
    expect(node?.kind).toBe('unplaced');
  });

  it('does not attach Pác Bó to the return of late January 1941', () => {
    // The excerpt places Pác Bó at 5-1941 and prints no place for the return.
    const back = SPATIAL_NODES.find((n) => n.marker === 'cuối tháng 1-1941');
    expect(back?.kind).toBe('unplaced');
    const pacBo = SPATIAL_NODES.find((n) => n.placeId === 'pac-bo');
    expect(pacBo?.marker).toBe('5-1941');
  });

  it('keeps the retired excerpt out of the spatial data too', () => {
    expect(published).not.toContain('C2 PDF');
    expect(published).not.toContain('C2-02');
    expect(published).not.toContain('Giáo trình Tư tưởng Hồ Chí Minh - 2021');
  });
});

describe('what the plate reports about itself is derived, not written down', () => {
  it('counts turning points by placement, covering every turn in the excerpt', () => {
    const turns = turningPointPlacement();
    const total = turns.placed + turns.unplaced + turns.region;
    expect(total).toBe(STAGES.reduce((n, s) => n + s.turningPoints.length, 0));
    // The finding the overview reports: the excerpt places the journey far
    // better than it places the turns. If a later edit changes this, the
    // sentence on the overview changes with it, because both come from here.
    expect(turns.placed).toBeLessThan(turns.unplaced);
  });

  it('gives every stage at least one node, so no plate is accidentally blank', () => {
    for (const stage of STAGES) {
      expect(nodesOfStage(stage.id).length, stage.id).toBeGreaterThan(0);
    }
  });

  it('keeps a reading note for every difference found against the page scans', () => {
    expect(PLACE_READING_NOTES.length).toBeGreaterThan(0);
    for (const note of PLACE_READING_NOTES) {
      expect(note.printed.length).toBeGreaterThan(0);
      expect(note.elsewhere.length).toBeGreaterThan(0);
      expect(isInExcerpt(note.at), note.id).toBe(true);
    }
  });

  it('uses the printed form of Pác Bó, with its parentheses', () => {
    // Read off the tr.32 scan for this work: the page prints
    // `tại Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)`. Both of the project's own
    // secondary records paraphrase it differently, which is recorded in PR-01.
    const place = PLACE_BY_ID.get('pac-bo');
    expect(place?.printed).toBe('Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)');
  });
});

describe('the basemap is geometry, not a claim', () => {
  it('ships a usable land path and publishes its own resolution limits', () => {
    expect(LAND_PATH.startsWith('M')).toBe(true);
    expect(LAND_PATH.length).toBeGreaterThan(10000);
    expect(LAND_SIMPLIFY_DEGREES).toBeGreaterThan(0);
    expect(LAND_MIN_WINDOW_DEGREES).toBeGreaterThanOrEqual(24);
  });

  it('stays inside real world coordinates', () => {
    const nums = LAND_PATH.match(/-?\d+(\.\d+)?/g) ?? [];
    expect(nums.length).toBeGreaterThan(1000);
    const lons: number[] = [];
    const lats: number[] = [];
    for (const pair of LAND_PATH.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)) {
      lons.push(Number(pair[1]));
      lats.push(Number(pair[2]));
    }
    expect(Math.max(...lons)).toBeLessThanOrEqual(180);
    expect(Math.min(...lons)).toBeGreaterThanOrEqual(-180);
    // `y` is -latitude in the stored path.
    expect(Math.max(...lats)).toBeLessThanOrEqual(90);
    expect(Math.min(...lats)).toBeGreaterThanOrEqual(-90);
  });
});

/**
 * The basemap's national-boundary and archipelago layers.
 *
 * These hold what the drawing cannot hold on its own. Several exist because a
 * build transformation is the one place where this representation could
 * disappear WITHOUT anything failing: a selector that stopped matching, a field
 * renamed upstream, or a simplification pass that dropped a one-point ring would
 * all leave a plate that still renders, still passes every other check, and
 * quietly no longer shows the islands.
 *
 * What these tests do NOT do is adjudicate anything. A unit test cannot settle a
 * territorial dispute and none below tries to. They check one thing only: that
 * the product still draws what the cited source says, and that the citation is
 * still attached to it.
 */
describe('national boundaries are drawn, and are Admin-0 only', () => {
  it('ships a boundary path that is real geometry', () => {
    expect(BORDER_PATH.startsWith('M')).toBe(true);
    expect(BORDER_PATH.length).toBeGreaterThan(10000);
  });

  it('draws boundaries as open polylines, never as closed country shapes', () => {
    // A closed subpath would mean a country outline had been filled in as a
    // political-map shape. A border separates two countries; it encloses none.
    expect(BORDER_PATH).not.toMatch(/[Zz]/);
  });

  it('stays inside real world coordinates', () => {
    const lons: number[] = [];
    const lats: number[] = [];
    for (const pair of BORDER_PATH.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)) {
      lons.push(Number(pair[1]));
      lats.push(Number(pair[2]));
    }
    expect(lons.length).toBeGreaterThan(1000);
    expect(Math.max(...lons)).toBeLessThanOrEqual(180);
    expect(Math.min(...lons)).toBeGreaterThanOrEqual(-180);
    // `y` is -latitude in the stored path.
    expect(Math.max(...lats)).toBeLessThanOrEqual(90);
    expect(Math.min(...lats)).toBeGreaterThanOrEqual(-90);
  });

  it('carries no province, state or district mesh', () => {
    /*
     * Counted, not eyeballed. The source file holds Admin-0 geometry only, so
     * the honest guard is a ceiling on how much linework a national-boundary
     * layer can contain: an Admin-1 dataset would be several times this size.
     * Natural Earth 1:110m yields 326 national land-boundary segments; a layer
     * that suddenly carried thousands would be a different dataset.
     */
    const segments = BORDER_PATH.match(/M/g) ?? [];
    expect(segments.length).toBeGreaterThan(200);
    expect(segments.length).toBeLessThan(600);
  });

  it('draws no boundary line through the offshore archipelagos', () => {
    /*
     * At 1:110m the world dataset has no geometry at all out there, so any line
     * appearing in that box would mean a maritime or disputed-boundary
     * convention had arrived from a third-party dataset without being chosen.
     * The product must not publish such a line by accident.
     */
    let inside = 0;
    for (const pair of BORDER_PATH.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)) {
      const lon = Number(pair[1]);
      const lat = -Number(pair[2]);
      if (lon > 108.5 && lon < 119 && lat > 6.5 && lat < 18.2) inside += 1;
    }
    expect(inside).toBe(0);
  });
});

describe('the Vietnamese offshore representation cannot be silently dropped', () => {
  it('carries exactly the two archipelagos the convention requires', () => {
    expect(ARCHIPELAGOS.map((a) => a.id)).toEqual(['hoang-sa', 'truong-sa']);
  });

  it('ships no display name for either group', () => {
    /*
     * PROJECT DECISION, 2026-09-18: this product is about the formation of Hồ
     * Chí Minh's thought, so it does not inscribe these groups' names anywhere -
     * not on the plate, not in the register, and not as a string in the bundle.
     * The build tool still reads the source's name field to select and validate
     * the right features; it just stops there.
     *
     * Asserted structurally rather than by string match, so a name cannot be
     * reintroduced under a different key.
     */
    for (const a of ARCHIPELAGOS) {
      const text = JSON.stringify(a);
      expect(text, `${a.id} must ship no display name`).not.toMatch(/Hoàng|Trường|quần đảo/i);
      // And the group is still identified internally, for provenance.
      expect(a.wikidataId).toMatch(/^Q\d+$/);
    }
  });

  it('keeps every islet the build transformation selected', () => {
    /*
     * The counts are the point. A selector that stopped matching, or a
     * simplification pass that dropped short rings, would leave an archipelago
     * present in name and empty of marks - which renders as clean, passes
     * everything else, and shows nothing.
     */
    const byId = new Map(ARCHIPELAGOS.map((a) => [a.id, a]));
    expect(byId.get('hoang-sa')?.islets.length).toBe(7);
    expect(byId.get('truong-sa')?.islets.length).toBe(12);
  });

  it('places every islet inside its own published extent', () => {
    for (const a of ARCHIPELAGOS) {
      const [w, s, e, n] = a.extent;
      expect(e).toBeGreaterThan(w);
      expect(n).toBeGreaterThan(s);
      for (const [lon, lat] of a.islets) {
        expect(lon, `${a.id} islet longitude`).toBeGreaterThanOrEqual(w);
        expect(lon, `${a.id} islet longitude`).toBeLessThanOrEqual(e);
        expect(lat, `${a.id} islet latitude`).toBeGreaterThanOrEqual(s);
        expect(lat, `${a.id} islet latitude`).toBeLessThanOrEqual(n);
      }
    }
  });

  it('sits inside the territorial extent the Vietnamese standard states', () => {
    /*
     * `QCVN 80:2024/BTNMT` clause 1.2 and `Thông tư 17/2018/TT-BTNMT` Điều 20
     * both give the same window for a product showing the whole of Vietnam:
     * 102-118 East, 4.5-23.5 North. This checks that what the plate draws falls
     * inside it - NOT that the product is a compliant map product, which the
     * register says plainly that it is not.
     */
    for (const a of ARCHIPELAGOS) {
      expect(a.extent[0]).toBeGreaterThanOrEqual(102);
      expect(a.extent[2]).toBeLessThanOrEqual(118);
      expect(a.extent[1]).toBeGreaterThanOrEqual(4.5);
      expect(a.extent[3]).toBeLessThanOrEqual(23.5);
    }
  });

  it('publishes the extent its own islets occupy, which frames the inset', () => {
    /*
     * Two different extents, and the difference is real rather than a rounding
     * slip: `extent` is the published extent of the whole group, `isletExtent`
     * is what this source actually resolves. For the southern group the source covers
     * 114.03-115.85 E of a group published as 111.87-117.88 E. The inset is
     * framed on the data and the register prints both, so an enlarged window
     * can never be read as a claim about the group's size.
     */
    for (const a of ARCHIPELAGOS) {
      const [w, s2, e, n] = a.isletExtent;
      expect(e).toBeGreaterThan(w);
      expect(n).toBeGreaterThan(s2);
      expect(w).toBeGreaterThanOrEqual(a.extent[0]);
      expect(e).toBeLessThanOrEqual(a.extent[2]);
      expect(s2).toBeGreaterThanOrEqual(a.extent[1]);
      expect(n).toBeLessThanOrEqual(a.extent[3]);
      // And it is the actual bounding box of the islets, not a copy of `extent`.
      const lons = a.islets.map((p) => p[0]);
      const lats = a.islets.map((p) => p[1]);
      expect(w).toBeCloseTo(Math.min(...lons), 3);
      expect(e).toBeCloseTo(Math.max(...lons), 3);
      expect(s2).toBeCloseTo(Math.min(...lats), 3);
      expect(n).toBeCloseTo(Math.max(...lats), 3);
    }
  });

  it('spreads its islets in both axes, so an inset can show an arrangement', () => {
    // A group whose islets were collinear, or all in one spot, would have no
    // distribution or orientation for the inset to preserve. Both have both.
    for (const a of ARCHIPELAGOS) {
      const [w, s2, e, n] = a.isletExtent;
      expect(e - w, `${a.id} longitude spread`).toBeGreaterThan(0.5);
      expect(n - s2, `${a.id} latitude spread`).toBeGreaterThan(0.5);
    }
  });

  it('cites the theme version, not the release tag it was fetched from', () => {
    /*
     * Natural Earth versions each theme independently. At release tag v5.1.2 the
     * Vietnam point-of-view theme is 5.1.1 and the geography-regions theme is
     * 5.0.0, and `world-atlas@2.0.2` is a third version of a third thing.
     * Recording the tag as though it were the theme version misstates provenance.
     */
    const vnm = CARTOGRAPHY_SOURCES.find((src) => src.url.includes('countries_vnm'));
    expect(vnm?.version).toContain('5.1.1');
    const regions = CARTOGRAPHY_SOURCES.find((src) => src.url.includes('geography_regions'));
    expect(regions?.version).toContain('5.0.0');
  });

  it('resolves its islets at the in-country framing and symbolises them beyond it', () => {
    /*
     * The threshold that stops the islets merging into a filled mass. Computed
     * here the way the renderer computes it: a framing W degrees wide maps to
     * 1000/W canvas units per degree, so a cluster spanning `d` degrees lands
     * `d * 1000 / W` units across.
     *
     * Stages 1 and 5 frame Vietnam at 26 degrees and MUST resolve; the
     * whole-world framing at 348 degrees MUST NOT, because seven marks inside
     * four units is a blob that reads as real land area.
     */
    const spreadAt = (group: (typeof ARCHIPELAGOS)[number], windowDegrees: number): number => {
      const lons = group.islets.map((p) => p[0]);
      const lats = group.islets.map((p) => p[1]);
      const k = 1000 / windowDegrees;
      return Math.max(Math.max(...lons) - Math.min(...lons), Math.max(...lats) - Math.min(...lats)) * k;
    };
    for (const group of ARCHIPELAGOS) {
      expect(spreadAt(group, 26), `${group.id} must resolve at the Vietnam framing`).toBeGreaterThan(
        ARCHIPELAGO_MIN_SPREAD_UNITS,
      );
      expect(spreadAt(group, 348), `${group.id} must NOT resolve at the world framing`).toBeLessThan(
        ARCHIPELAGO_MIN_SPREAD_UNITS,
      );
    }
  });
});

describe("Vietnam's coastal islands are drawn, because 1:110m cannot show them", () => {
  it('ships island geometry as closed polygons at true scale', () => {
    // Closed, unlike the border layer: these are land, not a line between two
    // countries. And real polygons, unlike the archipelago symbols.
    expect(VN_ISLANDS_PATH.startsWith('M')).toBe(true);
    expect(VN_ISLANDS_PATH).toMatch(/Z/);
    expect((VN_ISLANDS_PATH.match(/M/g) ?? []).length).toBe(24);
  });

  it('places every island inside the standard territorial extent', () => {
    /*
     * `QCVN 80:2024/BTNMT` clause 1.2 and `Thông tư 17/2018/TT-BTNMT` Điều 20
     * give 102-118 East, 4.5-23.5 North. This checks what the plate draws falls
     * inside it - not that the product is a compliant map product.
     */
    for (const pair of VN_ISLANDS_PATH.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)) {
      const lon = Number(pair[1]);
      const lat = -Number(pair[2]);
      expect(lon).toBeGreaterThanOrEqual(102);
      expect(lon).toBeLessThanOrEqual(118);
      expect(lat).toBeGreaterThanOrEqual(4.5);
      expect(lat).toBeLessThanOrEqual(23.5);
    }
  });

  it('keeps Phú Quốc, which is the largest and the one 1:110m most obviously lacks', () => {
    // Phú Quốc sits at roughly 103.85-104.09 E, 10.01-10.45 N. The world land
    // layer has no vertex anywhere near it, so if this layer ever stopped being
    // generated the island would silently vanish from every Vietnam framing.
    let found = false;
    for (const pair of VN_ISLANDS_PATH.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)) {
      const lon = Number(pair[1]);
      const lat = -Number(pair[2]);
      if (lon > 103.8 && lon < 104.2 && lat > 9.9 && lat < 10.6) found = true;
    }
    expect(found).toBe(true);
    // And the world layer genuinely does not carry it.
    let inWorldLayer = false;
    for (const pair of LAND_PATH.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)) {
      const lon = Number(pair[1]);
      const lat = -Number(pair[2]);
      if (lon > 103.8 && lon < 104.2 && lat > 9.9 && lat < 10.6) inWorldLayer = true;
    }
    expect(inWorldLayer).toBe(false);
  });
});

describe('every line on the plate can be traced to a named dataset', () => {
  it('publishes a source record for each drawn layer', () => {
    expect(CARTOGRAPHY_SOURCES.length).toBe(5);
    for (const src of CARTOGRAPHY_SOURCES) {
      expect(src.layer.length).toBeGreaterThan(3);
      expect(src.dataset.length).toBeGreaterThan(3);
      expect(src.version.length).toBeGreaterThan(3);
      expect(src.licence.length).toBeGreaterThan(3);
      expect(src.note.length).toBeGreaterThan(20);
      expect(src.url).toMatch(/^https:\/\//);
    }
  });

  it('names the Vietnam point-of-view edition rather than a default worldview', () => {
    // The choice of edition is the whole cartographic decision. If a
    // regeneration ever pointed at the default file instead, the drawing would
    // change without a word of the documentation changing.
    const positions = CARTOGRAPHY_SOURCES.find((s) => s.url.includes('countries_vnm'));
    expect(positions, 'the archipelago positions must cite the Vietnam POV file').toBeDefined();
    expect(positions?.url).toContain('natural-earth-vector');
  });

  it('pins its sources to an exact version rather than to a moving branch', () => {
    for (const src of CARTOGRAPHY_SOURCES) {
      expect(src.url, `${src.layer} must not track a moving branch`).not.toContain('/master/');
    }
  });

  it('states when the geometry was fetched, and how the projection distorts', () => {
    expect(CARTOGRAPHY_RETRIEVED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // The projection note must keep saying what it does not preserve.
    expect(CARTOGRAPHY_PROJECTION).toMatch(/KHÔNG bảo toàn/);
  });

  it('keeps the basemap out of the excerpt evidence class', () => {
    // A cartographic source is not a textbook locator and must never be dressed
    // as one. None of these may carry a printed-page citation.
    for (const src of CARTOGRAPHY_SOURCES) {
      expect(`${src.layer} ${src.dataset} ${src.note}`).not.toMatch(/tr\.\s*\d+/);
    }
  });
});

describe('the basemap is bundled, never fetched at runtime', () => {
  it('holds its geometry as committed text, not as a request', () => {
    // Everything the plate draws is a string in the bundle. If any of these
    // became a URL the product would need a network at the Showcase.
    expect(typeof LAND_PATH).toBe('string');
    expect(typeof BORDER_PATH).toBe('string');
    expect(LAND_PATH).not.toMatch(/^https?:/);
    expect(BORDER_PATH).not.toMatch(/^https?:/);
    for (const a of ARCHIPELAGOS) {
      for (const [lon, lat] of a.islets) {
        expect(Number.isFinite(lon)).toBe(true);
        expect(Number.isFinite(lat)).toBe(true);
      }
    }
  });
});
