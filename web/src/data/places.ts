import { ref } from './source.ts';
import type { Provenance, SourceRef, StageId } from './types';

/**
 * WHERE THE EXCERPT GOES - and where it stops.
 *
 * This file adds one thing to the product that was not here before: place. It
 * adds no academic claim. Every node below points at a passage, turning point
 * or quotation that already exists in `stages.ts`, and therefore at a printed
 * page of `Giáo trình Tư tưởng Hồ Chí Minh - 2019`.
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE
 *
 * The map may go exactly as far as the excerpt goes, and no further. Reading
 * the eight page scans for place rather than for date turns up something worth
 * building a map around:
 *
 *   - the excerpt names a place for some events and not for others;
 *   - it states a movement exactly four times in a drawable form, and two of
 *     those four have an end it never names;
 *   - and of its eight turning points, only two carry a printed location.
 *
 * So the excerpt locates the JOURNEY far better than it locates the TURNS.
 * That is a finding about the source, not about history, and it is the thing
 * the plate is for. A map that quietly filled those gaps from general
 * knowledge would be inventing historical facts, which both rule documents put
 * in their most serious category.
 *
 * WHAT MAY NEVER GO IN HERE
 *
 * A port for 5-6-1911. An itinerary for 1911-1917. A venue for the unification
 * conference of early 1930. A square for 2-9-1945. A city for the July 1920
 * reading, or for Trường Quốc tế Lênin. Hà Nội as an event location - it
 * appears in the excerpt only inside footnote publisher addresses, which is a
 * different kind of datum entirely.
 *
 * HOW THE PLACE NAMES WERE READ
 *
 * The 2019 file has no text layer. For this work its eight embedded page images
 * were extracted and read directly. Every `printed` string below was read off
 * the scan at magnification, not carried across from a summary. Two differences
 * from the project's own secondary records were found that way and are recorded
 * in `PLACE_READING_NOTES` rather than smoothed over.
 *
 * COORDINATES ARE A NEW EVIDENCE CLASS
 *
 * They are not in the textbook and they are not a textbook claim. Each one is
 * quoted from a Wikidata item record - id, URL, the returned value, the
 * precision the record itself states, and the date it was read - so a human can
 * open the same record. Wikidata is a checkable source, not an authority under
 * the Student Guideline's hierarchy, so every coordinate stays
 * `NEED VERIFICATION`, exactly like everything else here.
 */

/** How precisely the EXCERPT locates something. Never how precise a coordinate is. */
export type Granularity =
  | 'exact-site'
  /** A named town or city. */
  | 'city'
  /** A named country. A country is not a point and is never drawn as one. */
  | 'country'
  /** A named region, province or half-country that is not reducible to a point. */
  | 'region'
  /** A named zone with a hedging word such as `gần`. */
  | 'zone';

/**
 * A coordinate, quoted from an item record rather than asserted.
 * `precision` is the value the record itself publishes, in degrees. It is kept
 * because it is the honest reason a country is drawn as a wash and a school is
 * drawn as a dot.
 */
export interface CoordinateSource {
  /** Wikidata item id, e.g. `Q288`. */
  qid: string;
  /** The record a person can open to check. Never a search-result link. */
  url: string;
  /** The labels the record carries, as returned, in case they differ from the excerpt. */
  recordLabel: string;
  recordLabelVi: string;
  lat: number;
  lon: number;
  /** The precision the record states, in degrees. */
  precision: number;
  /** ISO date the record was read. */
  retrieved: string;
  status: Provenance;
}

export interface Place {
  id: string;
  /** The name EXACTLY as the 2019 pages print it. */
  printed: string;
  /** Where the excerpt prints it. */
  at: SourceRef;
  /** How precisely the EXCERPT locates it. */
  granularity: Granularity;
  /**
   * What the excerpt actually asserts about this place. The distinction that
   * matters most here is between a place where something is said to have
   * HAPPENED and a place where a text is said to have been PUBLISHED.
   */
  role: string;
  /** Null when the excerpt names the place but it cannot honestly be a point. */
  coordinate: CoordinateSource | null;
  /** Why there is no coordinate, when there is none. */
  noCoordinate?: string;
  status: Provenance;
  /** Anything about this place that does not line up. Never resolved silently. */
  caution?: string;
}

const WD = (qid: string): string => `https://www.wikidata.org/wiki/${qid}`;

function coord(
  qid: string,
  recordLabel: string,
  recordLabelVi: string,
  lat: number,
  lon: number,
  precision: number,
): CoordinateSource {
  return {
    qid,
    url: WD(qid),
    recordLabel,
    recordLabelVi,
    lat,
    lon,
    precision,
    retrieved: '2026-09-17',
    status: 'NEED VERIFICATION',
  };
}

export const PLACES: Place[] = [
  /* ---- Chặng 1: the densest stage in the excerpt for place names ---- */
  {
    id: 'nghe-an',
    printed: 'Nghệ An',
    at: ref(28),
    granularity: 'region',
    role: 'Vùng đất mà trích đoạn đặt làm bối cảnh quê hương và gia đình.',
    coordinate: coord('Q36587', 'Nghệ An', 'Nghệ An', 19.33333, 104.83333, 0.016666666666667),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn không in tên làng, xã hay huyện nào. Chỉ có tên tỉnh. Không được bổ sung địa danh nhỏ hơn.',
  },
  {
    id: 'vinh',
    printed: 'Vinh',
    at: ref(28),
    granularity: 'city',
    role: 'Nơi có “các trường, lớp” mà trích đoạn ghi là đã theo học.',
    coordinate: coord('Q33428', 'Vinh', 'Vinh', 18.67333, 105.69222, 0.00027777777777778),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'hue',
    printed: 'kinh đô Huế',
    at: ref(28),
    granularity: 'city',
    role: 'Nơi có “các trường, lớp” mà trích đoạn ghi là đã theo học.',
    coordinate: coord('Q36167', 'Huế', 'Huế', 16.45611, 107.57639, 0.00027777777777778),
    status: 'NEED VERIFICATION',
    caution: 'Trích đoạn in “tại kinh đô Huế”. Giữ nguyên cụm “kinh đô”, không rút gọn thành “Huế”.',
  },
  {
    id: 'trung-ky',
    printed: 'Trung Kỳ',
    at: ref(28),
    granularity: 'region',
    role: 'Nơi diễn ra phong trào chống thuế năm 1908 mà trích đoạn ghi là đã tham gia.',
    coordinate: null,
    noCoordinate:
      'Đây là một kỳ trong cách phân chia hành chính đương thời, không phải một điểm. Quy nó về một toạ độ sẽ là khẳng định một tâm điểm mà trích đoạn không nêu.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'duc-thanh',
    printed: 'Trường Dục Thanh, Phan Thiết',
    at: ref(28),
    granularity: 'exact-site',
    role: 'Nơi dạy học năm 1910 — một trong hai địa điểm chính xác nhất của cả trích đoạn.',
    coordinate: coord('Q25315', 'Phan Thiết', 'Phan Thiết', 10.9375, 108.15833, 0.00027777777777778),
    status: 'NEED VERIFICATION',
    caution:
      'Toạ độ là của THỊ XÃ Phan Thiết, không phải của ngôi trường. Trích đoạn nêu tên trường; bản ghi toạ độ thì không. Hai lớp dữ kiện được giữ tách rời: tên trường là của trích đoạn, toạ độ là của thị xã.',
  },

  /* ---- Chặng 2: the widest stage, and the emptiest ---- */
  {
    id: 'phap',
    printed: 'Pháp',
    at: ref(29),
    granularity: 'country',
    role: 'Điểm xuất phát của hành trình 1911-1917, nơi trở lại năm 1917, và nơi trích đoạn đặt “những người Việt Nam yêu nước ở Pháp” năm 1919.',
    coordinate: coord('Q142', 'France', 'Pháp', 47, 2, 1),
    status: 'NEED VERIFICATION',
    caution:
      'Bản ghi công bố độ chính xác 1 độ — đây là một giá trị đại diện cho cả nước, không phải một điểm. Vì vậy Pháp được vẽ thành một vùng loang, không bao giờ thành một ghim.',
  },
  {
    id: 'tua',
    printed: 'thành phố Tua',
    at: ref(29),
    granularity: 'city',
    role: 'Nơi diễn ra Đại hội từ ngày 25 đến ngày 30-12-1920 mà trích đoạn đặt làm bước ngoặt của chặng.',
    coordinate: coord('Q288', 'Tours', 'Tours', 47.39278, 0.68833, 0.00027777777777778),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn in “thành phố Tua” và KHÔNG in quốc gia kèm theo. Việc đặt nó ở Pháp là suy luận từ tên Đảng Xã hội Pháp trong cùng câu, không phải chữ in về vị trí.',
  },
  {
    id: 'vecxay',
    printed: 'Hội nghị Vécxây',
    at: ref(29),
    granularity: 'city',
    role: 'NƠI NHẬN văn kiện, không phải nơi Người có mặt: trích đoạn in “gửi Yêu sách của nhân dân An Nam tới Hội nghị Vécxây”.',
    coordinate: coord('Q621', 'Versailles', 'Versailles', 48.805, 2.135, 0.00027777777777778),
    status: 'NEED VERIFICATION',
    caution:
      'Đây là TÊN HỘI NGHỊ, không phải một mệnh đề vị trí. Trích đoạn không viết “tại Vécxây”. Dấu trên bản khắc là đích đến của một văn kiện, không phải một chặng đi. Giữ nguyên chính tả “Vécxây” như bản in.',
  },

  /* ---- Chặng 3: places of publication, not places of presence ---- */
  {
    id: 'pari',
    printed: 'Pari',
    at: ref(30),
    granularity: 'city',
    role: 'NƠI XUẤT BẢN “Bản án chế độ thực dân Pháp” năm 1925.',
    coordinate: coord('Q90', 'Paris', 'Paris', 48.85667, 2.35222, 0.00027777777777778),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn in “được xuất bản ở Pari năm 1925”. Nó KHÔNG nói Người có mặt ở đó lúc đó. Giữ nguyên chính tả “Pari” như bản in.',
  },
  {
    id: 'quang-chau',
    printed: 'Quảng Châu, Trung Quốc',
    at: ref(30),
    granularity: 'city',
    role: 'NƠI XUẤT BẢN “Đường cách mệnh” năm 1927.',
    coordinate: coord('Q16572', 'Guangzhou', 'Quảng Châu', 23.13, 113.26, 0.00027777777777778),
    status: 'NEED VERIFICATION',
    caution:
      'Nơi xuất bản, không phải nơi có mặt. Và tuyệt đối không mượn sang mốc tháng 6-1925: trích đoạn không in địa điểm nào cho việc sáng lập Hội Việt Nam Thanh niên Cách mạng.',
  },
  {
    id: 'dong-duong',
    printed: 'Đông Dương',
    at: ref(30),
    granularity: 'region',
    role: 'Một trong những nơi báo Le Paria được gửi đến năm 1922.',
    coordinate: null,
    noCoordinate:
      'Một vùng thuộc địa đương thời, không phải một điểm. Trích đoạn nêu nó như phạm vi phát hành báo.',
    status: 'NEED VERIFICATION',
  },

  /* ---- Chặng 4: the only stage with a stated, drawable route ---- */
  {
    id: 'hong-kong',
    printed: 'Hồng Kông',
    at: ref(32),
    granularity: 'city',
    role: 'Nơi có nhà tù của thực dân Anh mà trích đoạn ghi là đã thoát khỏi, năm 1934.',
    coordinate: coord('Q8646', 'Hong Kong', 'Hồng Kông', 22.27833, 114.15861, 0.0166667),
    status: 'NEED VERIFICATION',
    caution: 'Trích đoạn không nêu tên nhà tù.',
  },
  {
    id: 'lien-xo',
    printed: 'Liên Xô',
    at: ref(32),
    granularity: 'country',
    role: 'Nơi trở lại năm 1934 và rời đi tháng 10-1938.',
    coordinate: coord('Q15180', 'Soviet Union', 'Liên Xô', 65, 90, 1),
    status: 'NEED VERIFICATION',
    caution:
      'Một nhà nước đã không còn tồn tại, và bản ghi công bố độ chính xác 1 độ — giá trị đại diện cho cả nước, không phải một điểm. Trích đoạn nêu “Trường Quốc tế Lênin” nhưng KHÔNG in thành phố nào.',
  },
  {
    id: 'trung-quoc',
    printed: 'Trung Quốc',
    at: ref(32),
    granularity: 'country',
    role: 'Nước quá cảnh trên đường trở về Việt Nam, tháng 10-1938.',
    coordinate: coord('Q148', "People's Republic of China", 'Trung Quốc', 35.84472, 103.45194, 0.00027777777777778),
    status: 'NEED VERIFICATION',
    caution:
      'Bản ghi là của nhà nước hiện nay; trích đoạn nói về năm 1938. Dấu trên bản khắc là dấu cấp quốc gia, không phải một điểm trên đường đi.',
  },
  {
    id: 'bien-gioi',
    printed: 'biên giới Việt Nam – Trung Quốc',
    at: ref(32),
    granularity: 'zone',
    role: 'Nơi trở về tháng 12-1940 — trích đoạn in “về GẦN biên giới”.',
    coordinate: null,
    noCoordinate:
      'Chữ “gần” là của chính bản in. Một vùng biên có chữ “gần” đứng trước thì không phải một toạ độ, và không được vẽ thành một điểm.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'pac-bo',
    printed: 'Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)',
    at: ref(32),
    granularity: 'exact-site',
    role: 'Nơi diễn ra Hội nghị Ban Chấp hành Trung ương Đảng tháng 5-1941 — địa điểm chính xác nhất của cả trích đoạn.',
    coordinate: coord('Q7263979', 'Pác Bó', 'Hang Pác Bó', 22.978, 106.054, 0.00002777777777778),
    status: 'NEED VERIFICATION',
    caution:
      'Nhãn tiếng Việt của bản ghi là “Hang Pác Bó”, tức cái hang, trong khi trích đoạn gọi tên địa phương. Hai thứ không đồng nhất và không được coi là một. Bản in dùng dấu ngoặc đơn: “tại Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)”.',
  },

  /* ---- Chặng 5: country and half-country only ---- */
  {
    id: 'viet-nam',
    printed: 'Việt Nam',
    at: ref(32, 34),
    granularity: 'country',
    role: 'Nước trở về, và phạm vi của phần lớn chặng 5.',
    coordinate: coord('Q881', 'Vietnam', 'Việt Nam', 16, 108, 0.01667),
    status: 'NEED VERIFICATION',
    caution:
      'Giá trị toạ độ là một điểm đại diện cho cả nước do bản ghi công bố, không phải một địa điểm trong nước. Vì vậy Việt Nam được vẽ thành vùng loang, không bao giờ thành một ghim.',
  },
  {
    id: 'mien-bac',
    printed: 'miền Bắc',
    at: ref(34),
    granularity: 'region',
    role: 'Nửa nước mà trích đoạn gắn với việc hoà bình lập lại năm 1954 và với một trong hai nhiệm vụ chiến lược.',
    coordinate: null,
    noCoordinate: 'Một nửa đất nước, không phải một điểm.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'mien-nam',
    printed: 'miền Nam',
    at: ref(34),
    granularity: 'region',
    role: 'Nửa nước mà trích đoạn gắn với nhiệm vụ chiến lược còn lại, 1954-1969.',
    coordinate: null,
    noCoordinate: 'Một nửa đất nước, không phải một điểm.',
    status: 'NEED VERIFICATION',
  },
];

export const PLACE_BY_ID = new Map(PLACES.map((p) => [p.id, p]));

/**
 * What the three evidentiary states of a dated event actually are.
 *
 * They are not a design taxonomy invented to make a map look varied. They are
 * the three things the excerpt does: it names a place that is a point, it names
 * a place that is not a point, or it names no place at all.
 */
export type NodeKind = 'placed' | 'named-region' | 'unplaced';

export interface SpatialNode {
  id: string;
  stageId: StageId;
  kind: NodeKind;
  /** Time marker exactly as printed, or null where the excerpt prints none. */
  marker: string | null;
  /** What the excerpt records, in its own terms. Short enough to label a mark. */
  title: string;
  /** Null exactly when `kind` is `unplaced`. */
  placeId: string | null;
  /** The station in `stages.ts` this node belongs to, so nothing here floats free. */
  anchor: { where: 'passage' | 'turn' | 'quote'; id: string };
  at: SourceRef;
  status: Provenance;
  caution?: string;
}

export const SPATIAL_NODES: SpatialNode[] = [
  /* ================= CHẶNG 1 ================= */
  {
    id: 'SN1-que',
    stageId: 'ky-1',
    kind: 'placed',
    marker: null,
    title: 'Quê hương và gia đình',
    placeId: 'nghe-an',
    anchor: { where: 'passage', id: 'P1-1' },
    at: ref(28),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN1-vinh',
    stageId: 'ky-1',
    kind: 'placed',
    marker: null,
    title: 'Các trường, lớp tại Vinh',
    placeId: 'vinh',
    anchor: { where: 'passage', id: 'P1-4' },
    at: ref(28),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN1-hue',
    stageId: 'ky-1',
    kind: 'placed',
    marker: null,
    title: 'Các trường, lớp tại kinh đô Huế',
    placeId: 'hue',
    anchor: { where: 'passage', id: 'P1-4' },
    at: ref(28),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN1-trung-ky',
    stageId: 'ky-1',
    kind: 'named-region',
    marker: '1908',
    title: 'Phong trào chống thuế ở Trung Kỳ',
    placeId: 'trung-ky',
    anchor: { where: 'passage', id: 'P1-5' },
    at: ref(28),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN1-duc-thanh',
    stageId: 'ky-1',
    kind: 'placed',
    marker: '1910',
    title: 'Dạy học ở Trường Dục Thanh, Phan Thiết',
    placeId: 'duc-thanh',
    anchor: { where: 'passage', id: 'P1-6' },
    at: ref(28),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN1-ra-di',
    stageId: 'ky-1',
    kind: 'unplaced',
    marker: '5-6-1911',
    title: 'Đi ra nước ngoài tìm con đường cứu nước, cứu dân',
    placeId: null,
    anchor: { where: 'turn', id: 'TP1' },
    at: ref(28),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn không in nơi ra đi: không cảng, không thành phố, không tên tàu, không hướng đi. Bước ngoặt mở đầu cả hành trình lại là một mốc không có địa điểm.',
  },

  /* ================= CHẶNG 2 ================= */
  {
    id: 'SN2-tu-phap',
    stageId: 'ky-2',
    kind: 'placed',
    marker: '1911-1917',
    title: 'Từ Pháp đi đến nhiều nước trên thế giới',
    placeId: 'phap',
    anchor: { where: 'passage', id: 'P2-2' },
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution: 'Pháp ở đây là ĐIỂM XUẤT PHÁT, không phải điểm đến.',
  },
  {
    id: 'SN2-nhieu-nuoc',
    stageId: 'ky-2',
    kind: 'unplaced',
    marker: '1911-1917',
    title: 'Nhiều nước trên thế giới',
    placeId: null,
    anchor: { where: 'passage', id: 'P2-2' },
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution:
      'Sáu năm đi khắp thế giới, và trích đoạn KHÔNG nêu tên một nước đến nào. Các tên Anh, Mỹ, Nga có xuất hiện trong trích đoạn nhưng ở chặng 3, trang 30, chỉ với tư cách tên các cuộc cách mạng được tổng kết. Chuyển chúng thành điểm đến của chặng này là bịa đặt sự kiện lịch sử.',
  },
  {
    id: 'SN2-tro-lai-phap',
    stageId: 'ky-2',
    kind: 'placed',
    marker: '1917',
    title: 'Trở lại Pháp, tham gia phong trào công nhân Pháp',
    placeId: 'phap',
    anchor: { where: 'passage', id: 'P2-3' },
    at: ref(29),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN2-dang-xa-hoi',
    stageId: 'ky-2',
    kind: 'unplaced',
    marker: '1919',
    title: 'Gia nhập Đảng Xã hội của giai cấp công nhân Pháp',
    placeId: null,
    anchor: { where: 'passage', id: 'P2-4' },
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution:
      'Chữ “Pháp” ở câu này chỉ nằm trong TÊN của đảng, không phải một mệnh đề về nơi việc gia nhập diễn ra. Trích đoạn không in thành phố nào.',
  },
  {
    id: 'SN2-yeu-sach',
    stageId: 'ky-2',
    kind: 'placed',
    marker: '18-6-1919',
    title: 'Thay mặt những người Việt Nam yêu nước ở Pháp, gửi Yêu sách của nhân dân An Nam',
    placeId: 'phap',
    anchor: { where: 'passage', id: 'P2-6' },
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution:
      'Ở đây trích đoạn có định vị: “những người Việt Nam yêu nước Ở PHÁP”. Đó là lý do mốc này được đặt lên bản khắc còn mốc năm 1919 ngay trước thì không.',
  },
  {
    id: 'SN2-vecxay',
    stageId: 'ky-2',
    kind: 'placed',
    marker: '18-6-1919',
    title: 'Hội nghị Vécxây — nơi nhận văn kiện',
    placeId: 'vecxay',
    anchor: { where: 'passage', id: 'P2-6' },
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution:
      'Đây là đích đến của một VĂN KIỆN, không phải một chặng đi của một người. Trích đoạn in “gửi… tới Hội nghị Vécxây”, không in “tại Vécxây”.',
  },
  {
    id: 'SN2-luan-cuong',
    stageId: 'ky-2',
    kind: 'unplaced',
    marker: '7-1920',
    title: 'Tìm thấy và xác định phương hướng qua Sơ thảo luận cương của Lênin',
    placeId: null,
    anchor: { where: 'turn', id: 'TP2' },
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution:
      'Bước ngoặt về nhận thức lớn nhất của chặng, và trích đoạn không in nơi nó xảy ra. Chỉ có “Vào tháng 7-1920, qua nghiên cứu…”.',
  },
  {
    id: 'SN2-tua',
    stageId: 'ky-2',
    kind: 'placed',
    marker: '25 đến 30-12-1920',
    title: 'Đại hội ở thành phố Tua',
    placeId: 'tua',
    anchor: { where: 'turn', id: 'TP3' },
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution: 'Một trong hai bước ngoặt duy nhất trong cả trích đoạn có in địa điểm.',
  },

  /* ================= CHẶNG 3 ================= */
  {
    id: 'SN3-bai-bao',
    stageId: 'ky-3',
    kind: 'unplaced',
    marker: '8-1919 · 4-11-1920',
    title: 'Hai bài trên báo L’Humanité',
    placeId: null,
    anchor: { where: 'passage', id: 'P3-2' },
    at: ref(30),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn không in nơi xuất bản của hai bài này — trong khi lại có in nơi xuất bản cho hai tác phẩm khác của cùng chặng. Hai mốc này còn nằm TRƯỚC ngày mở đầu chặng 3; xem GT-R01.',
  },
  {
    id: 'SN3-hoi-lien-hiep',
    stageId: 'ky-3',
    kind: 'unplaced',
    marker: '1921',
    title: 'Tham gia sáng lập Hội liên hiệp thuộc địa',
    placeId: null,
    anchor: { where: 'passage', id: 'P3-3' },
    at: ref(30),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN3-le-paria',
    stageId: 'ky-3',
    kind: 'placed',
    marker: '1922',
    title: 'Sáng lập báo Le Paria; phát hành trong nước Pháp',
    placeId: 'phap',
    anchor: { where: 'passage', id: 'P3-4' },
    at: ref(30),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn định vị việc PHÁT HÀNH (“trong nước Pháp”), không định vị nơi sáng lập tờ báo.',
  },
  {
    id: 'SN3-dong-duong',
    stageId: 'ky-3',
    kind: 'named-region',
    marker: '1922',
    title: 'Gửi đến các thuộc địa của Pháp, trong đó có Đông Dương',
    placeId: 'dong-duong',
    anchor: { where: 'passage', id: 'P3-4' },
    at: ref(30),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN3-ban-an',
    stageId: 'ky-3',
    kind: 'placed',
    marker: '1925',
    title: 'Bản án chế độ thực dân Pháp — xuất bản ở Pari',
    placeId: 'pari',
    anchor: { where: 'passage', id: 'P3-5' },
    at: ref(30),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN3-thanh-nien',
    stageId: 'ky-3',
    kind: 'unplaced',
    marker: '6-1925',
    title: 'Sáng lập Hội Việt Nam Thanh niên Cách mạng, ra báo Thanh niên',
    placeId: null,
    anchor: { where: 'passage', id: 'P3-6' },
    at: ref(30),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn không in địa điểm. Quảng Châu chỉ được in cho Đường cách mệnh năm 1927 và không được mượn sang mốc này.',
  },
  {
    id: 'SN3-duong-cach-menh',
    stageId: 'ky-3',
    kind: 'placed',
    marker: '1927',
    title: 'Đường cách mệnh — xuất bản ở Quảng Châu, Trung Quốc',
    placeId: 'quang-chau',
    anchor: { where: 'passage', id: 'P3-8' },
    at: ref(30),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN3-hop-nhat',
    stageId: 'ky-3',
    kind: 'unplaced',
    marker: 'đầu năm 1930',
    title: 'Hội nghị hợp nhất và Cương lĩnh chính trị đầu tiên',
    placeId: null,
    anchor: { where: 'turn', id: 'TP4' },
    at: ref(30, 31),
    status: 'NEED VERIFICATION',
    caution:
      'Bước ngoặt trung tâm của chặng, và trích đoạn không in nơi hội nghị diễn ra. Chỉ có “Vào đầu năm 1930, Hồ Chí Minh chủ trì Hội nghị hợp nhất…”.',
  },

  /* ================= CHẶNG 4 ================= */
  {
    id: 'SN4-hoi-nghi-10-1930',
    stageId: 'ky-4',
    kind: 'unplaced',
    marker: '10-1930',
    title: 'Hội nghị Trung ương Đảng ra nghị quyết phê phán Hội nghị hợp nhất',
    placeId: null,
    anchor: { where: 'turn', id: 'TP5' },
    at: ref(31, 32),
    status: 'NEED VERIFICATION',
    caution: 'Trích đoạn không in địa điểm, và cũng không đánh số thứ tự cho hội nghị này.',
  },
  {
    id: 'SN4-hong-kong',
    stageId: 'ky-4',
    kind: 'placed',
    marker: '1934',
    title: 'Thoát khỏi nhà tù của thực dân Anh ở Hồng Kông',
    placeId: 'hong-kong',
    anchor: { where: 'passage', id: 'P4-4' },
    at: ref(32),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN4-lien-xo',
    stageId: 'ky-4',
    kind: 'placed',
    marker: '1934',
    title: 'Trở lại Liên Xô, vào học Trường Quốc tế Lênin',
    placeId: 'lien-xo',
    anchor: { where: 'passage', id: 'P4-4' },
    at: ref(32),
    status: 'NEED VERIFICATION',
    caution: 'Trích đoạn nêu tên trường nhưng không in thành phố.',
  },
  {
    id: 'SN4-thu-1938',
    stageId: 'ky-4',
    kind: 'unplaced',
    marker: '6-6-1938',
    title: 'Thư đề nghị được trở về nước hoạt động',
    placeId: null,
    anchor: { where: 'quote', id: 'Q7' },
    at: ref(32),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn không in nơi viết, nơi gửi, và cũng không in tên người nhận. Câu dẫn vào bức thư còn gắn nó với Chiến tranh thế giới thứ hai; xem GT-R02.',
  },
  {
    id: 'SN4-qua-trung-quoc',
    stageId: 'ky-4',
    kind: 'placed',
    marker: '10-1938',
    title: 'Rời Liên Xô, đi qua Trung Quốc để trở về Việt Nam',
    placeId: 'trung-quoc',
    anchor: { where: 'passage', id: 'P4-7' },
    at: ref(32),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN4-bien-gioi',
    stageId: 'ky-4',
    kind: 'named-region',
    marker: '12-1940',
    title: 'Về gần biên giới Việt Nam – Trung Quốc',
    placeId: 'bien-gioi',
    anchor: { where: 'passage', id: 'P4-8' },
    at: ref(32),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN4-ve-nuoc',
    stageId: 'ky-4',
    kind: 'unplaced',
    marker: 'cuối tháng 1-1941',
    title: 'Về nước',
    placeId: null,
    anchor: { where: 'passage', id: 'P4-10' },
    at: ref(32),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn chỉ in “Cuối tháng 1-1941, Hồ Chí Minh về nước.” Không cửa khẩu, không cột mốc, và KHÔNG phải Pác Bó — Pác Bó gắn với tháng 5-1941.',
  },
  {
    id: 'SN4-pac-bo',
    stageId: 'ky-4',
    kind: 'placed',
    marker: '5-1941',
    title: 'Hội nghị Ban Chấp hành Trung ương Đảng tại Pác Bó',
    placeId: 'pac-bo',
    anchor: { where: 'turn', id: 'TP6' },
    at: ref(32),
    status: 'NEED VERIFICATION',
    caution:
      'Bước ngoặt thứ hai và cuối cùng trong trích đoạn có in địa điểm — và là địa điểm chính xác nhất của cả tám trang. Lưu ý tiêu đề chặng 4 dừng ở ngày 28-1-1941 trong khi mốc này là tháng 5-1941; xem GT-R03.',
  },

  /* ================= CHẶNG 5 ================= */
  {
    id: 'SN5-viet-minh',
    stageId: 'ky-5',
    kind: 'unplaced',
    marker: '19-5-1941',
    title: 'Sáng lập Mặt trận Việt Minh',
    placeId: null,
    anchor: { where: 'passage', id: 'P5-2' },
    at: ref(33),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN5-giai-phong-quan',
    stageId: 'ky-5',
    kind: 'unplaced',
    marker: '22-12-1944',
    title: 'Sáng lập Việt Nam tuyên truyền giải phóng quân',
    placeId: null,
    anchor: { where: 'passage', id: 'P5-2' },
    at: ref(33),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN5-tong-khoi-nghia',
    stageId: 'ky-5',
    kind: 'unplaced',
    marker: '18-8-1945',
    title: 'Lời kêu gọi Tổng khởi nghĩa giành chính quyền',
    placeId: null,
    anchor: { where: 'passage', id: 'P5-3' },
    at: ref(33),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN5-tuyen-ngon',
    stageId: 'ky-5',
    kind: 'unplaced',
    marker: '2-9-1945',
    title: 'Đọc Tuyên ngôn Độc lập; nước Việt Nam Dân chủ Cộng hoà ra đời',
    placeId: null,
    anchor: { where: 'turn', id: 'TP7' },
    at: ref(33),
    status: 'NEED VERIFICATION',
    caution:
      'Trích đoạn không in quảng trường, không in thành phố, không in thủ đô. Bước ngoặt được biết đến rộng rãi nhất của chặng lại là một mốc không có địa điểm trong chính trang giáo trình này.',
  },
  {
    id: 'SN5-khang-chien',
    stageId: 'ky-5',
    kind: 'unplaced',
    marker: '19-12-1946',
    title: 'Lời kêu gọi toàn quốc kháng chiến',
    placeId: null,
    anchor: { where: 'passage', id: 'P5-6' },
    at: ref(34),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN5-mien-bac-1954',
    stageId: 'ky-5',
    kind: 'named-region',
    marker: '1954',
    title: 'Hoà bình lập lại ở miền Bắc Việt Nam',
    placeId: 'mien-bac',
    anchor: { where: 'passage', id: 'P5-8' },
    at: ref(34),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN5-hai-nhiem-vu-bac',
    stageId: 'ky-5',
    kind: 'named-region',
    marker: '1954-1969',
    title: 'Xây dựng chủ nghĩa xã hội ở miền Bắc',
    placeId: 'mien-bac',
    anchor: { where: 'turn', id: 'TP8' },
    at: ref(34),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN5-hai-nhiem-vu-nam',
    stageId: 'ky-5',
    kind: 'named-region',
    marker: '1954-1969',
    title: 'Tiếp tục cách mạng dân tộc dân chủ nhân dân ở miền Nam',
    placeId: 'mien-nam',
    anchor: { where: 'turn', id: 'TP8' },
    at: ref(34),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN5-loi-keu-goi-1966',
    stageId: 'ky-5',
    kind: 'unplaced',
    marker: '17-7-1966',
    title: 'Lời kêu gọi đồng bào và chiến sĩ cả nước',
    placeId: null,
    anchor: { where: 'passage', id: 'P5-11' },
    at: ref(34),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'SN5-di-chuc',
    stageId: 'ky-5',
    kind: 'unplaced',
    marker: null,
    title: 'Di chúc',
    placeId: null,
    anchor: { where: 'passage', id: 'P5-12' },
    at: ref(35),
    status: 'NEED VERIFICATION',
    caution: 'Trích đoạn không in địa điểm và cũng không in ngày tháng của Di chúc.',
  },
];

/**
 * A movement the excerpt states outright, in a form that can be drawn.
 *
 * `legs` is an ordered list of place ids; a `null` entry is an end the excerpt
 * does not name, and it is drawn as a line that fades into nothing rather than
 * as a line to somewhere. There are only four of these in eight pages, and two
 * of the four have an unnamed end.
 *
 * A movement whose BOTH ends are unnamed cannot be drawn and is not listed
 * here: the departure of 5-6-1911 is such a case, and it lives in
 * `SPATIAL_NODES` as an unplaced node instead.
 */
export interface Movement {
  id: string;
  stageId: StageId;
  marker: string;
  /** The excerpt's own movement wording, faithfully rendered. */
  statement: string;
  legs: (string | null)[];
  at: SourceRef;
  status: Provenance;
  caution?: string;
}

export const MOVEMENTS: Movement[] = [
  {
    id: 'MV-2a',
    stageId: 'ky-2',
    marker: '1911-1917',
    statement: 'Từ năm 1911 đến năm 1917, từ Pháp, Hồ Chí Minh đến nhiều nước trên thế giới.',
    legs: ['phap', null],
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution: 'Đầu kia của chuyến đi không có tên trong trích đoạn, nên đường vẽ tan dần vào chỗ trống.',
  },
  {
    id: 'MV-2b',
    stageId: 'ky-2',
    marker: '1917',
    statement: 'Năm 1917 trở lại Pháp.',
    legs: [null, 'phap'],
    at: ref(29),
    status: 'NEED VERIFICATION',
    caution: 'Trở lại từ đâu thì trích đoạn không nói.',
  },
  {
    id: 'MV-4a',
    stageId: 'ky-4',
    marker: '1934',
    statement: 'Thoát khỏi nhà tù của thực dân Anh ở Hồng Kông, năm 1934 trở lại Liên Xô.',
    legs: ['hong-kong', 'lien-xo'],
    at: ref(32),
    status: 'NEED VERIFICATION',
  },
  {
    id: 'MV-4b',
    stageId: 'ky-4',
    marker: '10-1938',
    statement: 'Tháng 10-1938, rời Liên Xô, đi qua Trung Quốc để trở về Việt Nam.',
    legs: ['lien-xo', 'trung-quoc', 'viet-nam'],
    at: ref(32),
    status: 'NEED VERIFICATION',
    caution:
      'Ba chặng này là ba tên nước, không phải ba điểm trên một tuyến đường. Đường vẽ nối ba vùng, không mô tả lộ trình.',
  },
];

/**
 * Differences found when the eight page scans were re-read for place.
 *
 * Kept as a register rather than corrected in silence, in the same way the
 * product already keeps `PRINTED_FORM_NOTES`.
 */
export interface PlaceReadingNote {
  id: string;
  printed: string;
  elsewhere: string;
  at: SourceRef;
  note: string;
}

export const PLACE_READING_NOTES: PlaceReadingNote[] = [
  {
    id: 'PR-01',
    printed: 'tại Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)',
    elsewhere:
      '`stages.ts` P4-10 diễn giải là “tại Pác Bó thuộc huyện Hà Quảng, tỉnh Cao Bằng”; sổ ngữ cảnh của dự án ghi “Pác Bó, huyện Hà Quảng, tỉnh Cao Bằng”.',
    at: ref(32),
    note: 'Bản in dùng dấu ngoặc đơn. Cả hai bản ghi thứ cấp đều là diễn giải. Nhãn trên bản khắc dùng đúng dạng in.',
  },
  {
    id: 'PR-02',
    printed: 'Là thày giáo ở Trường Dục Thanh, Phan Thiết',
    elsewhere: 'Sổ ngữ cảnh của dự án tóm tắt mốc 1910 mà không nhắc “Phan Thiết”.',
    at: ref(28),
    note: 'Đọc lại bản quét trang 28: “Phan Thiết” CÓ được in. Dữ liệu sản phẩm đúng; bản tóm tắt chỉ rút gọn. Dạng in “thày giáo” đã được ghi ở PF-03.',
  },
  {
    id: 'PR-03',
    printed: 'về gần biên giới Việt Nam – Trung Quốc',
    elsewhere: '`stages.ts` P4-8 viết dấu nối ngắn: “Việt Nam - Trung Quốc”.',
    at: ref(32),
    note: 'Bản in dùng gạch ngang dài. Khác biệt về dấu, không phải về nội dung; ghi lại để không ai coi là đã đối chiếu.',
  },
];

/* ---------------------------------------------------------------------------
 * Derived counts.
 *
 * Every number the product says about its own spatial coverage is computed
 * here, never written by hand. The product has been bitten once already by a
 * hand-written status constant that nobody moved when the data changed.
 * ------------------------------------------------------------------------- */

export function nodesOfStage(stageId: StageId): SpatialNode[] {
  return SPATIAL_NODES.filter((n) => n.stageId === stageId);
}

export function movementsOfStage(stageId: StageId): Movement[] {
  return MOVEMENTS.filter((m) => m.stageId === stageId);
}

export function placedNodes(nodes: readonly SpatialNode[]): SpatialNode[] {
  return nodes.filter((n) => n.kind === 'placed');
}

export function unplacedNodes(nodes: readonly SpatialNode[]): SpatialNode[] {
  return nodes.filter((n) => n.kind === 'unplaced');
}

/** Every node whose anchor is a turning point, with whether the excerpt places it. */
export function turningPointPlacement(): { placed: number; unplaced: number; region: number } {
  const turns = SPATIAL_NODES.filter((n) => n.anchor.where === 'turn');
  const seen = new Set<string>();
  let placed = 0;
  let unplaced = 0;
  let region = 0;
  for (const n of turns) {
    if (seen.has(n.anchor.id)) continue;
    seen.add(n.anchor.id);
    if (n.kind === 'placed') placed += 1;
    else if (n.kind === 'unplaced') unplaced += 1;
    else region += 1;
  }
  return { placed, unplaced, region };
}

/** How many places the excerpt names that cannot honestly become a point. */
export function placesWithoutCoordinate(): Place[] {
  return PLACES.filter((p) => p.coordinate === null);
}

/** The resolved place of a node, or null. */
export function placeOf(node: SpatialNode): Place | null {
  return node.placeId === null ? null : (PLACE_BY_ID.get(node.placeId) ?? null);
}

export const SPATIAL_STATUS: Provenance = 'NEED VERIFICATION';
