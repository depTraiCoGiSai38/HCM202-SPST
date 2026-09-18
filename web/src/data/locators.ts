import { noteRef, ref } from './source.ts';
import type { LocatorCandidate, RiskNote, SourceRef } from './types';

/**
 * The ten numbered notes printed in the supplied excerpt of
 * `Giáo trình Tư tưởng Hồ Chí Minh - 2019` (printed tr.28-35).
 *
 * These are LOCATOR CANDIDATES ONLY. A note is never promoted to a verified
 * citation here, the unresolved "Sdd" abbreviation is never expanded, and a
 * nearby note never authenticates the paragraph around it.
 *
 * MIGRATED 2026-09-17 from the earlier `C2-02.pdf` excerpt. Each note's printed
 * text was re-transcribed from the 2019 page scan at magnification rather than
 * carried across, because the two editions do not print these notes identically.
 * The differences that were found are recorded in each entry's `caution`.
 */
export const LOCATORS: LocatorCandidate[] = [
  {
    id: 'L1',
    printed:
      'Ban nghiên cứu lịch sử Đảng Trung ương: Chủ tịch Hồ Chí Minh - Tiểu sử sự nghiệp, Nxb Sự thật, Hà Nội, 1980, tr.12.',
    at: noteRef(28, 1),
    attachedTo: 'Câu nói thứ nhất được giáo trình gán cho cụ Nguyễn Sinh Sắc',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L2',
    printed:
      'Học viện Chính trị quốc gia Hồ Chí Minh – Song Thành (Chủ biên): Hồ Chí Minh - Tiểu sử, Nxb Lý luận Chính trị, Hà Nội, 2006, tr.24-25.',
    at: noteRef(28, 2),
    attachedTo: 'Câu nói thứ hai được giáo trình gán cho cụ Nguyễn Sinh Sắc',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L3',
    printed: 'Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2011, t.3, tr.1.',
    at: noteRef(31, 1),
    attachedTo: 'Trích đoạn về mục tiêu, con đường trong Cương lĩnh chính trị đầu tiên',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L4',
    printed: 'Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2011, t.3, tr.22.',
    at: noteRef(31, 2),
    attachedTo: 'Trích đoạn về nhiệm vụ đánh đổ trong Cương lĩnh chính trị đầu tiên',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L5',
    printed:
      'Đảng Cộng sản Việt Nam: Văn kiện Đảng: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2005, t.2, tr.110-111.',
    at: noteRef(31, 1, 'Văn kiện Đảng'),
    attachedTo: 'Trích nghị quyết Hội nghị Trung ương Đảng tháng 10-1930',
    status: 'NEED VERIFICATION',
    caution:
      'Trang 31 đánh số chú thích lại từ đầu: hai chú thích “1” và “2” dẫn Hồ Chí Minh: Toàn tập, rồi một chú thích “1” thứ hai dẫn Văn kiện Đảng. Giữ nguyên cách đánh số của bản in, không tự đánh lại thành “3”.',
  },
  {
    id: 'L6',
    printed: 'Học viện Chính trị quốc gia Hồ Chí Minh: Hồ Chí Minh - Tiểu sử, Sdd, tr. 250.',
    at: noteRef(32, 1),
    attachedTo: 'Trích bức thư đề ngày 6-6-1938',
    status: 'NEED VERIFICATION',
    caution:
      'Chữ viết tắt chưa được giải quyết và bản 2019 in là “Sdd” chứ không phải “Sđd”. Giữ nguyên dạng in; không suy đoán tài liệu đầy đủ mà nó thay thế. Xem GT-R05 và GT-R06.',
  },
  {
    id: 'L7',
    printed: 'Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2011, t.3, tr. 230.',
    at: noteRef(32, 2),
    attachedTo: 'Trích lời Hồ Chí Minh tại Hội nghị tháng 5-1941',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L8',
    printed:
      'Đảng Cộng sản Việt Nam: Văn kiện Đảng toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2000, t.7, tr.113.',
    at: noteRef(32, 3),
    attachedTo: 'Trích nghị quyết Hội nghị Trung ương Đảng tháng 5-1941',
    status: 'NEED VERIFICATION',
    caution:
      'Bản trích đoạn trước đây in số trang mập mờ là “tr.l13”, ký tự đầu trông giống chữ “l”. Bản 2019 in rõ “tr.113”, nên điểm mập mờ đó đã được giải quyết bằng bản in mới. Bản thân số trang vẫn cần đối chiếu với nguyên bản Văn kiện Đảng.',
  },
  {
    id: 'L9',
    printed: 'Hồ Chí Minh: Toàn tập, Sdd, t.15, tr. 131.',
    at: noteRef(35, 1),
    attachedTo: 'Trích Lời kêu gọi ngày 17-7-1966',
    status: 'NEED VERIFICATION',
    caution:
      'Chữ viết tắt chưa được giải quyết và bản 2019 in là “Sdd”. Giữ nguyên dạng in; không suy đoán tài liệu đầy đủ mà nó thay thế. Xem GT-R05 và GT-R06.',
  },
  {
    id: 'L10',
    printed: 'Hồ Chí Minh: Toàn tập, Sdd, t.15, tr. 624.',
    at: noteRef(35, 2),
    attachedTo: 'Trích điều mong muốn cuối cùng trong Di chúc',
    status: 'NEED VERIFICATION',
    caution:
      'Chữ viết tắt chưa được giải quyết và bản 2019 in là “Sdd”. Giữ nguyên dạng in; không suy đoán tài liệu đầy đủ mà nó thay thế. Xem GT-R05 và GT-R06.',
  },
];

/**
 * In-body publication markers that carry no numbered note at all.
 * All five are printed in the 2019 excerpt (tr.30 and tr.32).
 */
export const UNNOTED_MARKERS: string[] = [
  'Vấn đề dân bản xứ, báo L’Humanité, 8-1919',
  'Ở Đông Dương, báo L’Humanité, 4-11-1920',
  'Bản án chế độ thực dân Pháp, Pari, 1925',
  'Đường cách mệnh, Quảng Châu, 1927',
  'Con đường giải phóng, 1-1941',
];

/**
 * Chronology and text-risk register for the 2019 base source.
 * These are preserved and surfaced in the interface. They are never repaired.
 *
 * MIGRATED 2026-09-17. The register was rebuilt against the 2019 edition rather
 * than renamed, because the edition change genuinely resolves some risks and
 * sharpens others. What the previous edition made risky, and what became of it,
 * is recorded in `SUPERSEDED_RISKS` below instead of being deleted.
 */
export const RISKS: RiskNote[] = [
  {
    id: 'GT-R01',
    title: 'Hai bài báo 8-1919 và 4-11-1920 nằm trong chặng mở đầu từ ngày 31-12-1920',
    issue:
      'Dưới chặng 3, cụm “Đầu thời kỳ này” dẫn vào hai bài trên báo L’Humanité đề ngày 8-1919 và 4-11-1920, trong khi tiêu đề chặng 3 bắt đầu từ ngày 31-12-1920. Cả hai mốc đều nằm trước điểm mở đầu của chặng.',
    handling:
      'Đây là căng thẳng phân kỳ nội tại của tài liệu, và bản 2019 làm nó rõ hơn bản trước vì mốc mở đầu chặng nay là một ngày xác định. Giữ nguyên vị trí; không lặng lẽ chuyển hai mốc này sang chặng khác.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'GT-R02',
    title: 'Câu về Chiến tranh thế giới thứ hai gắn với bức thư đề ngày 6-6-1938',
    issue:
      'Một câu trong chặng 4 nối “Khi Chiến tranh thế giới thứ hai bùng nổ...” với bức thư đề ngày 6-6-1938 (trang 32).',
    handling:
      'Đây là xung đột niên đại nội tại của tài liệu và nó vẫn còn nguyên trong bản 2019. Giữ nguyên nguyên trạng; không sửa chữa theo trí nhớ.',
    status: 'DOCUMENT CONFLICT',
  },
  {
    id: 'GT-R03',
    title: 'Tiêu đề chặng 4 dừng ở ngày 28-1-1941 nhưng phần văn thuật tiếp tháng 5-1941',
    issue:
      'Tiêu đề chặng 4 ghi “đến ngày 28-1-1941”, trong khi phần văn nằm dưới tiêu đề này thuật tiếp Hội nghị Trung ương Đảng tháng 5-1941 và nghị quyết của hội nghị (trang 32-33).',
    handling:
      'Giữ nguyên bố cục như bản in. Không chuyển các sự kiện tháng 5-1941 sang chặng 5 và không sửa mốc kết thúc của tiêu đề.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'GT-R04',
    title: 'Phần cuối vượt quá mốc ngày 2-9-1969',
    issue:
      'Tiêu đề chặng 5 kết thúc ở ngày 2-9-1969, nhưng phần văn sau đó chạy tới năm 1975 và cụm không ghi ngày “Ngày nay” (trang 35).',
    handling:
      'Tách riêng thành phần vĩ thanh; không dùng làm bằng chứng nằm trong thời kỳ 29-1-1941 - 2-9-1969 và không dùng như một khẳng định đương đại năm 2026.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'GT-R05',
    title: 'Ba chú thích dùng một chữ viết tắt chưa được giải quyết',
    issue:
      'Ba trong mười chú thích thay tên tài liệu đầy đủ bằng một chữ viết tắt (trang 32 và trang 35).',
    handling:
      'Không bao giờ mở rộng chữ viết tắt này. Trích dẫn ba mục đó theo đúng dạng in cho tới khi đối chiếu được nguyên bản.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'GT-R06',
    title: 'Các dạng chữ in bất thường trong bản 2019',
    issue:
      'Bản 2019 in cụm lặp “trở thành thành” (trang 32), in “pháp” không viết hoa trong cụm “chống thực dân pháp” (trang 34), in chữ viết tắt là “Sdd” thay vì “Sđd” (trang 32, 35), và in “thày giáo” (trang 28).',
    handling:
      'Dùng diễn giải trung thực kèm nhãn cần kiểm chứng; không biến lỗi in thành trích dẫn có thẩm quyền và cũng không lặng lẽ chuẩn hoá như thể đã kiểm tra. Xem sổ đối chiếu dạng chữ in.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'GT-R07',
    title: 'Phần lớn mệnh đề tự sự không có chú thích trực tiếp',
    issue:
      'Đa số câu kể trong trích đoạn không kèm chú thích riêng. Cả chặng 2 không có một chú thích số nào.',
    handling:
      'Không bao giờ dùng một chú thích ở gần để hợp thức hoá cả một chặng hoặc cả một đoạn.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'GT-R08',
    title: 'Tệp nguồn là bản quét, đã đối chiếu bản in chính thức',
    issue:
      'Tệp được cung cấp là bản quét tám trang, không có lớp văn bản, do PDF-XChange Lite tạo, và mỗi trang đều có một dấu viết tay ở chân trang. Bản thân tệp không mang dấu hiệu xuất bản nào.',
    handling:
      'Nhóm đã đối chiếu tệp với Bộ Giáo dục và Đào tạo, Giáo trình Tư tưởng Hồ Chí Minh (Dành cho bậc đại học – không chuyên ngành lý luận chính trị), Hà Nội, 2019, tr.28-35, ngày 19-9-2026: khớp hoàn toàn. Nội dung và câu chữ của trích đoạn vì vậy đã có bản in chính thức đứng sau. Việc đối chiếu này KHÔNG mở rộng sang mười chú thích in trong trích đoạn — mỗi chú thích dẫn một cuốn khác và giữ trạng thái riêng.',
    status: 'VERIFIED IN FILE',
  },
];

/**
 * Risks that belonged to the previous base excerpt and what became of them when
 * the base source moved to the 2019 edition.
 *
 * This is an audit trail, not an active register. It exists so that removing a
 * risk from `RISKS` can be checked rather than taken on trust. Nothing here is
 * rendered as a current risk of the product.
 */
export interface SupersededRisk {
  /** The identifier used while `C2-02.pdf` was the base source. */
  formerId: string;
  title: string;
  /** What the 2019 edition prints instead. */
  outcome: string;
  resolution: 'RESOLVED' | 'CARRIED OVER' | 'PARTLY RESOLVED';
  /** The entry in `RISKS` that now carries it, when it was carried over. */
  nowId?: string;
}

export const SUPERSEDED_RISKS: SupersededRisk[] = [
  {
    formerId: 'C2-R01',
    title: 'Ranh giới 5-6-1911 và “giữa năm 1911”',
    outcome:
      'Bản 2019 ghi chặng 1 là “từ ngày 5-6-1911 trở về trước” và chặng 2 là “từ ngày 6-6-1911”, nên ranh giới là hai ngày liền nhau, không còn mờ.',
    resolution: 'RESOLVED',
  },
  {
    formerId: 'C2-R02',
    title: 'Cuối năm 1920 là ranh giới dùng chung',
    outcome:
      'Bản 2019 ghi chặng 2 kết thúc ngày 30-12-1920 và chặng 3 bắt đầu ngày 31-12-1920, nên hai chặng không còn dùng chung một mốc.',
    resolution: 'RESOLVED',
  },
  {
    formerId: 'C2-R03',
    title: 'Đầu năm 1941 là ranh giới dùng chung',
    outcome:
      'Bản 2019 ghi chặng 4 kết thúc ngày 28-1-1941 và chặng 5 bắt đầu ngày 29-1-1941. Ranh giới hết mờ, nhưng căng thẳng “tiêu đề dừng ở tháng 1, phần văn thuật tiếp tháng 5” thì vẫn còn.',
    resolution: 'PARTLY RESOLVED',
    nowId: 'GT-R03',
  },
  {
    formerId: 'C2-R04',
    title: 'Hai bài báo 8-1919 và 4-11-1920 nằm trong chặng mở đầu từ cuối năm 1920',
    outcome: 'Vẫn còn, và rõ hơn vì mốc mở đầu chặng 3 nay là ngày 31-12-1920.',
    resolution: 'CARRIED OVER',
    nowId: 'GT-R01',
  },
  {
    formerId: 'C2-R05',
    title: 'Câu về Chiến tranh thế giới thứ hai gắn với bức thư đề ngày 6-6-1938',
    outcome: 'Vẫn còn nguyên trong bản 2019, trang 32.',
    resolution: 'CARRIED OVER',
    nowId: 'GT-R02',
  },
  {
    formerId: 'C2-R06',
    title: 'Phần cuối vượt quá mốc tháng 9-1969',
    outcome: 'Vẫn còn; mốc kết thúc của tiêu đề nay là ngày 2-9-1969.',
    resolution: 'CARRIED OVER',
    nowId: 'GT-R04',
  },
  {
    formerId: 'C2-R07',
    title: 'Chú thích dùng chữ viết tắt; năm trang chẵn không hiện số in',
    outcome:
      'Nửa sau đã được giải quyết: cả tám trang của bản 2019 đều hiện số trang in (28 đến 35), nên không còn phải trích theo vị trí PDF. Chữ viết tắt chưa giải quyết thì vẫn còn.',
    resolution: 'PARTLY RESOLVED',
    nowId: 'GT-R05',
  },
  {
    formerId: 'C2-R08',
    title: 'Các dấu hiệu lỗi in nhìn thấy được',
    outcome:
      'Phần lớn đã được giải quyết: bản 2019 in đúng “bước ngoặt”, “Hòa bình lập lại”, “quân đội viễn chinh Mỹ”, “Cương lĩnh”, và in một lần “trong sinh hoạt”. Cụm lặp “trở thành thành” thì vẫn còn, và bản 2019 có các dạng in riêng của nó.',
    resolution: 'PARTLY RESOLVED',
    nowId: 'GT-R06',
  },
  {
    formerId: 'C2-R09',
    title: 'Phần lớn mệnh đề tự sự không có chú thích trực tiếp',
    outcome: 'Vẫn còn nguyên.',
    resolution: 'CARRIED OVER',
    nowId: 'GT-R07',
  },
];

/**
 * Differences between what the 2019 pages print and the wording this product
 * uses in its Vietnamese paraphrases.
 *
 * MIGRATED 2026-09-17. Every entry below was read directly from the 2019 page
 * scan at magnification. The previous register also carried entries observed in
 * the *text layer* of the old file; the 2019 file has no text layer at all, so
 * those observations cannot be reproduced and were not carried over. They are
 * recorded in `SUPERSEDED_RISKS` under C2-R08 rather than silently dropped.
 *
 * Nothing here is a verbatim quotation. Where the product does quote verbatim,
 * it reproduces the printed form and does not substitute these readings.
 */
export interface PrintedFormNote {
  id: string;
  printed: string;
  used: string;
  at: SourceRef;
  where: string;
  /** True when the form is also named in the active risk register. */
  registered: boolean;
}

export const PRINTED_FORM_NOTES: PrintedFormNote[] = [
  {
    id: 'PF-01',
    printed: 'trở thành thành yếu tố chỉ đạo',
    used: 'trở thành yếu tố chỉ đạo',
    at: ref(32),
    where: 'Câu về Hội nghị Trung ương Đảng tháng 5-1941, cụm lặp vắt qua chỗ xuống dòng',
    registered: true,
  },
  {
    id: 'PF-02',
    printed: 'chống thực dân pháp',
    used: 'chống thực dân Pháp',
    at: ref(34),
    where: 'Câu về thắng lợi năm 1954; chữ “pháp” in không viết hoa',
    registered: true,
  },
  {
    id: 'PF-03',
    printed: 'thày giáo',
    used: 'thầy giáo',
    at: ref(28),
    where: 'Câu về việc dạy học ở Trường Dục Thanh năm 1910',
    registered: true,
  },
];

export const LOCATOR_BY_ID = new Map(LOCATORS.map((l) => [l.id, l]));
export const RISK_BY_ID = new Map(RISKS.map((r) => [r.id, r]));
