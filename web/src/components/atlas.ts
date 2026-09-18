import { LAND_MIN_WINDOW_DEGREES, LAND_PATH } from '../data/land';
import {
  type Movement,
  type Place,
  type SpatialNode,
  MOVEMENTS,
  PLACE_BY_ID,
  SPATIAL_NODES,
  movementsOfStage,
  nodesOfStage,
  placeOf,
  turningPointPlacement,
} from '../data/places';
import type { StageId } from '../data/types';
import { h } from '../lib/dom';
import { s } from '../lib/svg';
import { type EvidenceItem, lensTrigger } from './evidence';

/**
 * BẢN KHẮC - the plate.
 *
 * PROJECT DECISION. Like the thread, every visual property maps to a countable
 * property of the data, so the drawing cannot assert more than the excerpt does:
 *
 *   a mark on the land        -> a node whose place the excerpt PRINTS
 *   how firm that mark is     -> the granularity the EXCERPT supports,
 *                                exact-site > city > country, never the
 *                                precision of the coordinate record
 *   a country                 -> a wash, never a pin, because a country is
 *                                not a point
 *   a drawn line              -> one entry in MOVEMENTS, i.e. a sentence in
 *                                which the excerpt states a movement
 *   open rings round a mark   -> a movement whose far end the excerpt never
 *                                names. Rings, not a ray: a ray would have to
 *                                point somewhere, and pointing somewhere is
 *                                naming a destination there is none of
 *   a mark NOT on the land    -> a dated event the excerpt does not place
 *
 * THE DRAWING IS DECORATIVE AND SAYS SO.
 *
 * The svg is `aria-hidden` and contains no focusable element, following the
 * rule `lib/svg.ts` already sets for the thread: the drawn layer never carries
 * information that is not also present as text. The list beside it is the real
 * thing - it is the text, it is what a screen reader reads, and it is what
 * takes focus. If the svg failed to render, nothing would become unreachable.
 *
 * That also keeps the plate out of the navigation budget: it adds no second way
 * to move through the product, and no control of its own. There is deliberately
 * NO zoom, NO pan and NO reset - framing is chosen per stage from the content
 * and is recorded, with its reason, in FRAMINGS below.
 */

/** A window on the world, in degrees. `y` is handled by the projection. */
interface Framing {
  lon0: number;
  lon1: number;
  lat0: number;
  lat1: number;
  /** Why this window, grounded in what the stage's own content is. */
  reason: string;
}

/**
 * Framing per stage.
 *
 * These are authored, not auto-fitted, and the reason matters more than the
 * numbers. Auto-fitting to the marks would have framed stage 2 on a corner of
 * France - which is where all of its printed places are - and quietly hidden
 * the actual finding, which is that six years of travel across the world are
 * given one named country. Stage 2 is therefore framed on the whole world so
 * that the emptiness is visible rather than cropped away.
 */
const FRAMINGS: Record<StageId | 'all', Framing> = {
  'ky-1': {
    lon0: 96,
    lon1: 122,
    lat0: 4,
    lat1: 27,
    reason:
      'Cả năm địa danh của chặng đều nằm trong nước. Đây cũng là chặng có nhiều tên đất nhất trong toàn trích đoạn.',
  },
  'ky-2': {
    lon0: -170,
    lon1: 178,
    lat0: -58,
    lat1: 80,
    reason:
      'Khung cả thế giới, không phải vì chặng có nhiều điểm, mà vì nó có rất ít: trích đoạn ghi sáu năm đi “nhiều nước trên thế giới” và chỉ nêu tên một nước. Khung hẹp lại quanh nước Pháp sẽ cắt mất chính điều đó.',
  },
  'ky-3': {
    lon0: -18,
    lon1: 130,
    lat0: -4,
    lat1: 62,
    reason:
      'Hai tác phẩm của chặng được in ở hai đầu lục địa Á - Âu. Khung này cho thấy khoảng cách giữa hai nơi XUẤT BẢN, không phải một lộ trình đi lại.',
  },
  'ky-4': {
    lon0: 58,
    lon1: 142,
    lat0: 2,
    lat1: 76,
    reason:
      'Chặng duy nhất trích đoạn nói thẳng ra một lộ trình nhiều chặng, và cũng là chặng kết ở địa điểm chính xác nhất của cả tám trang.',
  },
  'ky-5': {
    lon0: 96,
    lon1: 122,
    lat0: 4,
    lat1: 27,
    reason:
      'Chặng chỉ nêu tên nước và nửa nước. Khung trong nước cho thấy rõ rằng gần như không mốc nào của chặng được đặt vào một chỗ cụ thể.',
  },
  all: {
    lon0: -170,
    lon1: 178,
    lat0: -58,
    lat1: 80,
    reason: 'Toàn bộ những gì trích đoạn định vị, trên một tấm.',
  },
};

const CANVAS_W = 1000;

interface Projection {
  k: number;
  lon0: number;
  lat1: number;
  height: number;
  project: (lon: number, lat: number) => [number, number];
}

function projectionFor(f: Framing): Projection {
  const width = Math.max(f.lon1 - f.lon0, LAND_MIN_WINDOW_DEGREES);
  const k = CANVAS_W / width;
  const height = Math.round((f.lat1 - f.lat0) * k);
  return {
    k,
    lon0: f.lon0,
    lat1: f.lat1,
    height,
    project: (lon, lat) => [(lon - f.lon0) * k, (f.lat1 - lat) * k],
  };
}

/** Marker radius in canvas units, by the granularity the EXCERPT supports. */
function radiusFor(place: Place): number {
  switch (place.granularity) {
    case 'exact-site':
      return 7;
    case 'city':
      return 7;
    case 'country':
      // A country is not a point. It gets a wash wide enough that nobody reads
      // it as an address, sized from the precision the coordinate record itself
      // publishes rather than from taste.
      return 40;
    default:
      return 9;
  }
}

let plateSeq = 0;

/** A soft outward spread, used for a country wash and for an unnamed far end. */
function spread(id: string, cx: number, cy: number, r: number, cls: string): SVGElement[] {
  // `currentColor` inside a stop resolves against the GRADIENT element's own
  // computed colour, not against the shape that references it, so the class -
  // and therefore the theme token - has to go on the gradient as well.
  const grad = s(
    'radialGradient',
    { id, class: `${cls}-grad`, attrs: { cx: '50%', cy: '50%', r: '50%' } },
    s('stop', { attrs: { offset: '0%', 'stop-color': 'currentColor', 'stop-opacity': '0.34' } }),
    s('stop', { attrs: { offset: '55%', 'stop-color': 'currentColor', 'stop-opacity': '0.13' } }),
    s('stop', { attrs: { offset: '100%', 'stop-color': 'currentColor', 'stop-opacity': '0' } }),
  );
  const circle = s('circle', {
    class: cls,
    attrs: { cx, cy, r, fill: `url(#${id})` },
  });
  return [grad, circle];
}

function movementPath(m: Movement, proj: Projection): SVGElement[] {
  const pts: ([number, number] | null)[] = m.legs.map((legId) => {
    if (legId === null) return null;
    const p = PLACE_BY_ID.get(legId);
    if (!p?.coordinate) return null;
    return proj.project(p.coordinate.lon, p.coordinate.lat);
  });

  const known = pts.filter((p): p is [number, number] => p !== null);
  if (known.length === 0) return [];

  const out: SVGElement[] = [];

  // A line is drawn only between two ends the excerpt actually names.
  if (known.length >= 2) {
    let d = '';
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      if (!a || !b) continue;
      // A gentle arc, so two lines between the same pair of countries never
      // sit on top of each other. It is a drawing convention, not a route.
      const mx = (a[0] + b[0]) / 2;
      const my = (a[1] + b[1]) / 2 - Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.12;
      d += `M ${String(Math.round(a[0]))} ${String(Math.round(a[1]))} Q ${String(
        Math.round(mx),
      )} ${String(Math.round(my))}, ${String(Math.round(b[0]))} ${String(Math.round(b[1]))} `;
    }
    if (d) {
      out.push(
        s('path', {
          class: 'plate__move',
          attrs: { d: d.trim(), fill: 'none', 'vector-effect': 'non-scaling-stroke' },
        }),
      );
    }
  }

  return out;
}

/**
 * The end of a movement the excerpt never names.
 *
 * Two open rings, centred on the end it DOES name, and nothing else. A ray
 * would have to point somewhere, and pointing somewhere is naming a
 * destination; a filled blob reads as a quantity, which this is not. Open
 * rings say only "outward from here, and the page does not say how far".
 */
function openEnd(cx: number, cy: number): SVGElement[] {
  return [40, 78].map((r, i) =>
    s('circle', {
      class: 'plate__open',
      attrs: {
        cx: Math.round(cx),
        cy: Math.round(cy),
        r,
        fill: 'none',
        'stroke-dasharray': i === 0 ? '3 7' : '2 9',
        'vector-effect': 'non-scaling-stroke',
      },
    }),
  );
}

/** Where each unnamed end sits, deduplicated so two movements do not double up. */
function openAnchors(movements: readonly Movement[], proj: Projection): [number, number][] {
  const seen = new Map<string, [number, number]>();
  for (const m of movements) {
    if (!m.legs.some((l) => l === null)) continue;
    const namedIds = m.legs.filter((l): l is string => l !== null);
    const anchorId = m.legs[0] === null ? namedIds[0] : namedIds[namedIds.length - 1];
    if (anchorId === undefined) continue;
    const place = PLACE_BY_ID.get(anchorId);
    if (!place?.coordinate) continue;
    seen.set(anchorId, proj.project(place.coordinate.lon, place.coordinate.lat));
  }
  return [...seen.values()];
}

export interface PlateOptions {
  /** A stage, or `null` for the whole excerpt. */
  stageId: StageId | null;
  /** The node the reader is standing on, if any. Emphasised, never isolated. */
  focusNodeId?: string | null;
  /** Extra class for the wrapper, so a caller can size it. */
  className?: string;
}

/**
 * The drawn plate alone. Callers are responsible for putting the equivalent
 * text next to it - `plateNodes()` returns exactly the nodes it drew.
 */
export function plate(opts: PlateOptions): HTMLElement {
  plateSeq += 1;
  const uid = `plate${String(plateSeq)}`;
  const key: StageId | 'all' = opts.stageId ?? 'all';
  const framing = FRAMINGS[key];
  const proj = projectionFor(framing);

  const nodes = opts.stageId ? nodesOfStage(opts.stageId) : SPATIAL_NODES;
  // On the whole-excerpt plate, every stated movement in the excerpt - all four
  // of them, across eight pages.
  const movements = opts.stageId ? movementsOfStage(opts.stageId) : MOVEMENTS;

  const children: SVGElement[] = [];

  // The land, transformed from degrees into canvas units.
  children.push(
    s(
      'g',
      {
        attrs: {
          transform: `translate(${String(-framing.lon0 * proj.k)} ${String(
            framing.lat1 * proj.k,
          )}) scale(${String(proj.k)})`,
        },
      },
      s('path', {
        class: 'plate__land',
        attrs: { d: LAND_PATH, 'vector-effect': 'non-scaling-stroke' },
      }),
    ),
  );

  for (const m of movements) {
    for (const el of movementPath(m, proj)) children.push(el);
  }
  for (const [cx, cy] of openAnchors(movements, proj)) {
    for (const el of openEnd(cx, cy)) children.push(el);
  }

  // Country washes first, so a city mark inside one stays legible on top.
  const drawn = nodes.filter((n) => n.kind === 'placed');
  for (const node of drawn) {
    const place = placeOf(node);
    if (!place?.coordinate) continue;
    if (place.granularity !== 'country') continue;
    const [cx, cy] = proj.project(place.coordinate.lon, place.coordinate.lat);
    children.push(
      ...spread(`${uid}-wash-${place.id}`, cx, cy, radiusFor(place), 'plate__wash'),
    );
  }

  for (const node of drawn) {
    const place = placeOf(node);
    if (!place?.coordinate) continue;
    if (place.granularity === 'country') continue;
    const [cx, cy] = proj.project(place.coordinate.lon, place.coordinate.lat);
    const isTurn = node.anchor.where === 'turn';
    const focused = opts.focusNodeId === node.id;
    children.push(
      s('circle', {
        class: `plate__mark${isTurn ? ' plate__mark--turn' : ''}${focused ? ' is-focus' : ''}`,
        attrs: {
          cx: Math.round(cx),
          cy: Math.round(cy),
          r: radiusFor(place),
          'vector-effect': 'non-scaling-stroke',
        },
        dataset: { node: node.id },
      }),
    );
  }

  const svg = s(
    'svg',
    {
      class: 'plate__svg',
      attrs: {
        viewBox: `0 0 ${String(CANVAS_W)} ${String(proj.height)}`,
        // `meet`, never `slice`: a framing is an authored statement about what
        // this stage covers, and cropping it would quietly drop part of that
        // statement. Where the frame and the window do not match, the plate
        // letterboxes into its own paper margin instead.
        preserveAspectRatio: 'xMidYMid meet',
        focusable: 'false',
      },
      aria: { hidden: 'true' },
    },
    ...children,
  );

  const wrap = document.createElement('div');
  wrap.className = opts.className ? `plate ${opts.className}` : 'plate';
  /*
   * The frame takes its proportions from the window on the world, clamped so a
   * near-square window cannot eat the column and a very wide one cannot become
   * a letterbox slot. Driving it from the data rather than from CSS is what
   * lets each stage use space differently without a per-stage stylesheet.
   */
  const ratio = Math.min(2.6, Math.max(1.35, CANVAS_W / proj.height));
  wrap.style.setProperty('--plate-aspect', ratio.toFixed(3));
  wrap.appendChild(svg);
  return wrap;
}

/**
 * One row of the list beside the plate.
 *
 * The visible second column is the printed place name, or an em dash. The dash
 * is explained once, in a legend under the list, so a sighted reader is told
 * what it means without repeating the phrase on every row; a screen reader gets
 * the phrase itself, per row, from a visually hidden span. Both readers get the
 * same fact - this is not a way of saying less.
 */
function whereSpan(node: SpatialNode): HTMLElement {
  const place = placeOf(node);
  if (place === null) {
    return h(
      'span',
      { class: 'plate-row__where plate-row__where--none' },
      h('span', { text: '—', aria: { hidden: 'true' } }),
      h('span', { class: 'visually-hidden', text: 'trích đoạn không in địa điểm' }),
    );
  }
  return h('span', { class: 'plate-row__where', text: place.printed });
}

/**
 * Rows, grouped by printed time marker.
 *
 * Two nodes can legitimately share one marker, and when they do the pairing is
 * itself the point: `1911-1917` names France as the place left and names no
 * place at all as the place reached; `18-6-1919` locates the senders in France
 * and names a conference that only RECEIVED the document. Printing the date
 * twice would read as a duplication bug, so the date is printed once and its
 * entries sit beside it.
 */
function plateRows(nodes: readonly SpatialNode[]): HTMLElement[] {
  const groups: { marker: string | null; nodes: SpatialNode[] }[] = [];
  for (const node of nodes) {
    const last = groups[groups.length - 1];
    if (last && last.marker === node.marker) last.nodes.push(node);
    else groups.push({ marker: node.marker, nodes: [node] });
  }

  return groups.map((g) => {
    const isTurn = g.nodes.some((n) => n.anchor.where === 'turn');
    return h(
      'li',
      {
        class: `plate-row${isTurn ? ' plate-row--turn' : ''}`,
        dataset: { kind: g.nodes[0]?.kind ?? 'unplaced' },
      },
      /*
       * A marker the excerpt does not print leaves the cell EMPTY rather than
       * showing an em dash. The dash already means one specific thing in the
       * next column - "the excerpt prints no place" - and the same glyph
       * carrying two different meanings in two columns of one row is not a
       * legend problem, it is a wrong drawing. The fact is still stated, in
       * words, for a screen reader.
       */
      g.marker === null
        ? h(
            'span',
            { class: 'plate-row__marker plate-row__marker--none' },
            h('span', { class: 'visually-hidden', text: 'trích đoạn không in mốc thời gian' }),
          )
        : h('span', { class: 'plate-row__marker', text: g.marker }),
      h(
        'span',
        { class: 'plate-row__wheres' },
        ...g.nodes.flatMap((n, i) =>
          i === 0
            ? [whereSpan(n)]
            : [h('span', { class: 'plate-row__sep', text: '·', aria: { hidden: 'true' } }), whereSpan(n)],
        ),
      ),
    );
  });
}

/**
 * The plate as it appears at a stage entrance: the drawing, one derived line
 * about what it could and could not place, the markers, and the evidence.
 *
 * It REPLACES the bare date column that used to sit here. It is the same
 * anchor, in the same slot, carrying the same printed time markers at the same
 * size - with the one thing the column could not say added to it: where.
 */
export function stagePlate(stageId: StageId): HTMLElement {
  const { placed, regions, unplaced, movements, framingReason } = plateNodes(stageId);
  const rows = [...placed, ...regions, ...unplaced].sort(
    (a, b) => orderOf(a) - orderOf(b),
  );
  const total = rows.length;
  const located = placed.length + regions.length;
  /*
   * How many of the located ones can actually become a point. A stage can name
   * places and still draw nothing: stage 5 names `miền Bắc` and `miền Nam`, and
   * neither is a point. Saying "the excerpt prints a place for 3 of 10" over an
   * empty plate would read as a rendering fault rather than as the finding it
   * is, so the sentence changes when nothing is drawable.
   */
  const drawable = placed.filter((n) => placeOf(n)?.coordinate != null).length;
  const note =
    drawable === 0
      ? `Không sự việc nào của chặng được trích đoạn đặt vào một điểm: ${String(located)} trong ${String(total)} sự việc chỉ được gọi tên theo vùng.`
      : `Trích đoạn in địa điểm cho ${String(located)} trong ${String(total)} sự việc chặng này ghi lại.`;

  const items: EvidenceItem[] = [
    {
      label: 'Bản khắc này là gì',
      value:
        'Một cách đọc thứ hai của chính chặng này: nơi chốn. Mọi dấu đều trỏ về một đoạn, một bước ngoặt hoặc một trích dẫn đã có trong dữ liệu chặng, nên không dấu nào thêm một khẳng định nào vào nguồn.',
      tone: 'caution',
    },
    { label: 'Vì sao đóng khung như vậy', value: framingReason, tone: 'plain' },
    {
      label: 'Địa danh',
      value:
        'Chỉ những tên đất mà trích đoạn IN RA, giữ đúng dạng in. Mốc nào trích đoạn không nêu nơi chốn thì để trống đúng như vậy, không suy ra từ hiểu biết bên ngoài.',
      tone: 'plain',
    },
    {
      label: 'Toạ độ',
      value:
        'Toạ độ không có trong giáo trình. Chúng được dẫn từ bản ghi Wikidata của từng địa danh, kèm mã, đường dẫn, giá trị và độ chính xác do chính bản ghi công bố. Xem trang Kiểm chứng.',
      tone: 'plain',
    },
    { label: 'Nền bản đồ', value: 'Đường bờ biển Natural Earth 1:110m, miền công cộng. Không vẽ đường biên giới quốc gia: trích đoạn trải từ năm 1911 đến năm 1969, nên biên giới ngày nay sẽ là một mốc thời gian sai đặt dưới chân nội dung.', tone: 'plain' },
    { label: 'Trạng thái', value: 'NEED VERIFICATION', tone: 'status' },
  ];
  if (movements.length > 0) {
    items.splice(2, 0, {
      label: 'Đường nối',
      value: movements.map((m) => `${m.marker}: ${m.statement}`).join(' '),
      tone: 'plain',
    });
  }

  return h(
    'section',
    { class: 'plate-block' },
    h('p', { class: 'plate-block__label', text: 'Bản khắc' }),
    plate({ stageId }),
    h('p', { class: 'plate-block__note', text: note }),
    h('ol', { class: 'plate-block__list' }, ...plateRows(rows)),
    unplaced.length > 0
      ? h('p', {
          class: 'plate-block__legend',
          text: '— : trích đoạn không in địa điểm',
          aria: { hidden: 'true' },
        })
      : null,
    lensTrigger({ title: 'Bản khắc dựa trên gì?', items }, 'Bản khắc dựa trên gì?'),
  );
}

/**
 * The spatial consequence of walking the stage.
 *
 * The reference product turns a page by flying a camera. That is the idea worth
 * taking - chronology and geography on one control - and this is it implemented
 * from the other end: the walker that already exists gains a consequence in
 * space, rather than a second stepper being added beside it.
 *
 * It is one line. It says where the excerpt puts this stop, or - for a dated
 * event it leaves unplaced - that the excerpt does not say, which is the more
 * frequent answer and the one a map would otherwise hide.
 *
 * It is ABSENT where there is nothing spatial to say at all. Several stops are
 * analytical statements rather than events: `Trước hết, Người xác định đúng bản
 * chất...` happens nowhere in particular, and printing "no place given" under it
 * would invent a gap rather than report one. Silence there is the accurate
 * reading.
 *
 * The full apparatus lives in the register; this stays at a line so the reading
 * keeps its density budget.
 */
export function stationWhere(
  stageId: StageId,
  anchor: { where: 'passage' | 'turn' | 'quote'; id: string } | null,
): HTMLElement | null {
  if (!anchor) return null;
  const nodes = nodesOfStage(stageId).filter(
    (n) => n.anchor.where === anchor.where && n.anchor.id === anchor.id,
  );
  if (nodes.length === 0) return null;

  return h(
    'p',
    { class: 'station__where' },
    ...nodes.map((node) => {
      const place = placeOf(node);
      return h(
        'span',
        { class: 'station__where-item', dataset: { kind: node.kind } },
        place
          ? h('span', { text: `Nơi chốn: ${place.printed}` })
          : h('span', { text: 'Trích đoạn không in địa điểm cho mốc này.' }),
      );
    }),
  );
}

/**
 * One derived sentence for the reflection beat.
 *
 * It deliberately says something the stage entrance does not: not how much of
 * the stage is placed, but how much of its TURNING POINTS are. That is where
 * the excerpt is at its thinnest about place, and the reflection beat - which
 * asks what changed between the stage's two ends - is the moment where noticing
 * it costs the reader nothing extra.
 *
 * It is a count over the source, not a claim about history and not a claim
 * about the reader. Returns null where there is nothing to count.
 */
export function stageTurnPlacement(stageId: StageId): string | null {
  const turnNodes = nodesOfStage(stageId).filter((n) => n.anchor.where === 'turn');
  if (turnNodes.length === 0) return null;
  const seen = new Set<string>();
  let total = 0;
  let placed = 0;
  for (const n of turnNodes) {
    if (seen.has(n.anchor.id)) continue;
    seen.add(n.anchor.id);
    total += 1;
    if (n.kind === 'placed') placed += 1;
  }
  if (total === 0) return null;
  return placed === 0
    ? `Chặng này có ${String(total)} bước ngoặt, và trích đoạn không in địa điểm cho bước ngoặt nào.`
    : `Chặng này có ${String(total)} bước ngoặt; trích đoạn in địa điểm cho ${String(placed)}.`;
}

function stat(n: number, label: string): HTMLElement {
  return h(
    'li',
    { class: 'atlas-space__stat' },
    h('span', { class: 'atlas-space__n', text: String(n) }),
    h('span', { class: 'atlas-space__stat-label', text: label }),
  );
}

/**
 * The whole excerpt on one plate, for the journey overview.
 *
 * The overview already draws the excerpt in time. This draws the same five
 * stages in space, on the same screen, so the two readings sit together rather
 * than becoming two destinations. It adds no link and no control: it is a
 * section of a page that already exists.
 *
 * Every number below is counted from the data at render time. None is written
 * by hand - this product has already been bitten once by a hand-written status
 * constant that nobody moved when the data changed.
 */
export function excerptPlate(): HTMLElement {
  const drawable = SPATIAL_NODES.filter(
    (n) => n.kind === 'placed' && placeOf(n)?.coordinate != null,
  ).length;
  const unplaced = SPATIAL_NODES.filter((n) => n.kind === 'unplaced').length;
  const turns = turningPointPlacement();

  return h(
    'section',
    { class: 'atlas-space' },
    h('p', { class: 'atlas__kicker', text: 'Cùng năm chặng ấy, đọc theo nơi chốn' }),
    /*
     * A question, not a statement. The stage entrances follow the same rule for
     * the same reason: it is the one shape a sentence of the group's can take
     * in front of source material without adding a claim to it.
     */
    h('p', {
      class: 'atlas-space__lead',
      text: 'Trích đoạn đặt hành trình ấy ở những đâu — và ở đâu thì nó không nói?',
    }),
    plate({ stageId: null, className: 'plate--wide' }),
    h(
      'ul',
      { class: 'atlas-space__stats' },
      stat(drawable, 'sự việc được trích đoạn đặt vào một nơi vẽ được trên bản khắc'),
      stat(unplaced, 'sự việc có ngày tháng nhưng trích đoạn không in nơi chốn'),
      stat(turns.placed, `bước ngoặt có in địa điểm, trên tổng số ${String(
        turns.placed + turns.unplaced + turns.region,
      )}`),
    ),
    h('p', {
      class: 'atlas-space__note',
      text:
        'Bản khắc chỉ đi xa đúng bằng chỗ trích đoạn đi. Nơi nào tám trang được giao không in ra địa điểm thì ở đây để trống đúng như vậy, không suy ra từ hiểu biết bên ngoài.',
    }),
    lensTrigger(
      {
        title: 'Bản khắc này đọc như thế nào',
        items: [
          {
            label: 'Một dấu trên đất liền',
            value: 'Một sự việc mà trích đoạn CÓ in địa điểm, và địa điểm ấy quy được về một điểm.',
            tone: 'plain',
          },
          {
            label: 'Một vùng loang',
            value: 'Một tên nước. Nước không phải một điểm, nên nó không bao giờ được vẽ thành một cái ghim.',
            tone: 'plain',
          },
          {
            label: 'Một đường nối',
            value:
              'Một câu trong đó trích đoạn nói thẳng ra một chuyến đi. Cả tám trang chỉ có bốn câu như vậy vẽ được, và hai trong bốn câu ấy không nêu tên đầu kia.',
            tone: 'plain',
          },
          {
            label: 'Những vòng đứt nét',
            value:
              'Đầu kia của một chuyến đi mà trích đoạn không nêu tên. Vẽ vòng chứ không vẽ tia, vì một tia thì phải chỉ về đâu đó, mà chỉ về đâu đó chính là đặt ra một điểm đến không có trong nguồn.',
            tone: 'caution',
          },
          {
            label: 'Chỗ trống',
            value: `${String(unplaced)} sự việc có ngày tháng mà trích đoạn không in nơi chốn. Chúng không nằm trên đất liền vì nguồn không đặt chúng ở đâu cả.`,
            tone: 'caution',
          },
          {
            label: 'Điều nhóm đọc ra từ các con số này',
            value:
              'Trích đoạn định vị hành trình kỹ hơn nhiều so với cách nó định vị các bước ngoặt. Đây là nhận xét của nhóm về chính tài liệu, không phải một khẳng định lịch sử, và nó được rút ra bằng cách đếm trên dữ liệu chứ không phải từ một nguồn nào khác.',
            tone: 'caution',
          },
          {
            label: 'Nền bản đồ',
            value:
              'Đường bờ biển Natural Earth 1:110m, miền công cộng, đóng gói sẵn trong sản phẩm. Không vẽ biên giới quốc gia: trích đoạn trải từ năm 1911 đến năm 1969, nên biên giới ngày nay đặt dưới chân nội dung sẽ là một mốc thời gian sai.',
            tone: 'plain',
          },
          { label: 'Trạng thái', value: 'NEED VERIFICATION', tone: 'status' },
        ],
      },
      'Bản khắc này đọc như thế nào',
    ),
  );
}

/** Stage order, then placed before unplaced, so the list reads chronologically. */
function orderOf(node: SpatialNode): number {
  const all = nodesOfStage(node.stageId);
  return all.indexOf(node);
}

/** What the plate drew, and what it could not. Used to build the text beside it. */
export function plateNodes(stageId: StageId | null): {
  placed: SpatialNode[];
  regions: SpatialNode[];
  unplaced: SpatialNode[];
  movements: Movement[];
  framingReason: string;
} {
  const nodes = stageId ? nodesOfStage(stageId) : SPATIAL_NODES;
  return {
    placed: nodes.filter((n) => n.kind === 'placed'),
    regions: nodes.filter((n) => n.kind === 'named-region'),
    unplaced: nodes.filter((n) => n.kind === 'unplaced'),
    movements: stageId ? movementsOfStage(stageId) : [],
    framingReason: FRAMINGS[stageId ?? 'all'].reason,
  };
}
