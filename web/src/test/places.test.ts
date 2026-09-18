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
import { LAND_MIN_WINDOW_DEGREES, LAND_PATH, LAND_SIMPLIFY_DEGREES } from '../data/land';
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
