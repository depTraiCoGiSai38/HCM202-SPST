import type { LocatorCandidate, RiskNote } from './types';

/**
 * The ten numbered notes printed in the C2 excerpt.
 *
 * These are LOCATOR CANDIDATES ONLY. A note is never promoted to a verified
 * citation here, "Sdd" is never expanded, and a nearby note never authenticates
 * the paragraph around it.
 * Basis: HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md section 9.
 */
export const LOCATORS: LocatorCandidate[] = [
  {
    id: 'L1',
    printed:
      'Ban nghiên cứu lịch sử Đảng Trung ương; Chủ tịch Hồ Chí Minh - Tiểu sử sự nghiệp, Nxb Sự thật, Hà Nội, 1980, tr.12',
    at: 'C2 PDF p.2 / printed p.27, note 1',
    attachedTo: 'Câu nói thứ nhất được C2 gán cho cụ Nguyễn Sinh Sắc',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L2',
    printed:
      'Học viện Chính trị quốc gia Hồ Chí Minh - Song Thành (Chủ biên): Hồ Chí Minh - Tiểu sử, Nxb Lý luận chính trị, Hà Nội, 2006, tr.24-25',
    at: 'C2 PDF p.2 / printed p.27, note 2',
    attachedTo: 'Câu nói thứ hai được C2 gán cho cụ Nguyễn Sinh Sắc',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L3',
    printed: 'Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội 2011, t.3, tr 1',
    at: 'C2 PDF p.5, note 1',
    attachedTo: 'Trích đoạn về mục tiêu, con đường trong Cương lĩnh chính trị đầu tiên',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L4',
    printed: 'Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2011, t.3, tr.22',
    at: 'C2 PDF p.5, note 2',
    attachedTo: 'Trích đoạn về nhiệm vụ đánh đổ trong Cương lĩnh chính trị đầu tiên',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L5',
    printed:
      'Đảng Cộng sản Việt Nam: Văn kiện Đảng: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2005, t.2, tr.110-111',
    at: 'C2 PDF p.6 / printed p.31, note 1',
    attachedTo: 'Trích nghị quyết Hội nghị Trung ương Đảng tháng 10-1930',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L6',
    printed: 'Học viện Chính trị quốc gia Hồ Chí Minh: Hồ Chí Minh - Tiểu sử, Sđd, tr. 250.',
    at: 'C2 PDF p.7, note 1',
    attachedTo: 'Trích bức thư đề ngày 6-6-1938',
    status: 'NEED VERIFICATION',
    caution: 'Chữ viết tắt "Sđd" chưa được giải quyết. Không suy đoán tài liệu đầy đủ mà nó thay thế.',
  },
  {
    id: 'L7',
    printed: 'Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2011, t.3, tr.230.',
    at: 'C2 PDF p.7, note 2',
    attachedTo: 'Trích lời Hồ Chí Minh tại Hội nghị tháng 5-1941',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'L8',
    printed:
      'Đảng Cộng sản Việt Nam: Văn kiện Đảng toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2000, t.7 tr.l13.',
    at: 'C2 PDF p.7, note 3',
    attachedTo: 'Trích nghị quyết Hội nghị Trung ương Đảng tháng 5-1941',
    status: 'NEED VERIFICATION',
    caution:
      'Số trang trong bản được cung cấp hiển thị là "tr.l13", ký tự đầu trông giống chữ "l". Giữ nguyên, không tự sửa thành "tr.113"; cần đối chiếu bản sạch.',
  },
  {
    id: 'L9',
    printed: 'Hồ Chí Minh: Toàn tập, Sđd, t.15, tr.131.',
    at: 'C2 PDF p.10 / printed p.35, note 1',
    attachedTo: 'Trích Lời kêu gọi ngày 17-7-1966',
    status: 'NEED VERIFICATION',
    caution: 'Chữ viết tắt "Sđd" chưa được giải quyết. Không suy đoán tài liệu đầy đủ mà nó thay thế.',
  },
  {
    id: 'L10',
    printed: 'Hồ Chí Minh: Toàn tập, Sđd, t.15, tr.624.',
    at: 'C2 PDF p.10 / printed p.35, note 2',
    attachedTo: 'Trích điều mong muốn cuối cùng trong Di chúc',
    status: 'NEED VERIFICATION',
    caution: 'Chữ viết tắt "Sđd" chưa được giải quyết. Không suy đoán tài liệu đầy đủ mà nó thay thế.',
  },
];

/**
 * In-body publication markers that carry no numbered note at all.
 * Basis: context section 9, closing paragraph.
 */
export const UNNOTED_MARKERS: string[] = [
  'Vấn đề dân bản xứ, báo L’Humanité, 8-1919',
  'Ở Đông Dương, báo L’Humanité, 4-11-1920',
  'Bản án chế độ thực dân Pháp, Pari, 1925',
  'Đường cách mệnh, Quảng Châu, 1927',
  'Con đường giải phóng, 1-1941',
];

/**
 * Chronology and text-risk register carried straight from context section 8.4.
 * These are preserved and surfaced in the interface. They are never repaired.
 */
export const RISKS: RiskNote[] = [
  {
    id: 'C2-R01',
    title: 'Ranh giới 5-6-1911 và “giữa năm 1911”',
    issue:
      'Chặng 1 kết thúc trước ngày 5-6-1911; chặng 2 mở đầu “từ giữa năm 1911”; phần thân bài nêu 5-6-1911 là ngày đi ra nước ngoài.',
    handling:
      'Giữ nguyên cả ba cách diễn đạt. Không định nghĩa lại điểm bắt đầu của chặng 2 đúng bằng ngày 5-6-1911.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'C2-R02',
    title: 'Cuối năm 1920 là ranh giới dùng chung',
    issue: 'Chặng 2 kết thúc ở cuối năm 1920 và chặng 3 bắt đầu từ cuối năm 1920.',
    handling:
      'Coi cuối năm 1920 là ranh giới chuyển tiếp dùng chung; không dựng ra một mốc cắt rời nhau.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'C2-R03',
    title: 'Đầu năm 1941 là ranh giới dùng chung',
    issue: 'Chặng 4 kết thúc ở đầu năm 1941 và chặng 5 bắt đầu từ đầu năm 1941.',
    handling: 'Giữ nguyên cả hai tiêu đề; không tự đặt ra một ngày cắt chính xác.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'C2-R04',
    title: 'Hai bài báo 8-1919 và 4-11-1920 nằm trong chặng mở đầu từ cuối năm 1920',
    issue:
      'Dưới chặng 3, cụm “Đầu thời kỳ này” dẫn vào hai bài trên báo L’Humanité đề ngày 8-1919 và 4-11-1920, trong khi tiêu đề chặng 3 bắt đầu từ cuối năm 1920.',
    handling:
      'Đây là căng thẳng phân kỳ nội tại của tài liệu. Giữ nguyên vị trí; không lặng lẽ chuyển hai mốc này sang chặng khác.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'C2-R05',
    title: 'Câu về Chiến tranh thế giới thứ hai gắn với bức thư đề ngày 6-6-1938',
    issue:
      'Một câu trong chặng 4 nối “Khi Chiến tranh thế giới thứ hai bùng nổ...” với bức thư đề ngày 6-6-1938.',
    handling:
      'Đây là xung đột niên đại nội tại của tài liệu. Giữ nguyên nguyên trạng; không sửa chữa theo trí nhớ.',
    status: 'DOCUMENT CONFLICT',
  },
  {
    id: 'C2-R06',
    title: 'Phần cuối vượt quá mốc tháng 9-1969',
    issue:
      'Tiêu đề chặng 5 kết thúc ở tháng 9-1969, nhưng phần văn sau đó chạy tới năm 1975 và cụm không ghi ngày “Ngày nay”.',
    handling:
      'Tách riêng thành phần vĩ thanh; không dùng làm bằng chứng nằm trong thời kỳ 1941 - 9/1969 và không dùng như một khẳng định đương đại năm 2026.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'C2-R07',
    title: 'Ba chú thích dùng “Sđd”; năm trang chẵn không hiện số in',
    issue:
      'Ba trong mười chú thích dùng “Sđd”. Các trang chẵn xen giữa không hiện số trang in trong bản dựng được cung cấp.',
    handling:
      'Không bao giờ mở rộng “Sđd”. Trích dẫn các trang đó theo vị trí PDF cho tới khi đối chiếu được bản gốc.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'C2-R08',
    title: 'Các dấu hiệu lỗi in nhìn thấy được',
    issue:
      'Bản được cung cấp hiển thị “bước ngoạt”, cụm lặp “trở thành thành”, “Hòa hình lập lại”, “quân đội viễn Chính Mỹ”.',
    handling:
      'Dùng diễn giải trung thực kèm nhãn cần kiểm chứng; không biến lỗi in thành trích dẫn có thẩm quyền và cũng không lặng lẽ chuẩn hoá như thể đã kiểm tra.',
    status: 'NEED VERIFICATION',
  },
  {
    id: 'C2-R09',
    title: 'Phần lớn mệnh đề tự sự không có chú thích trực tiếp',
    issue: 'Đa số câu kể trong trích đoạn không kèm chú thích riêng.',
    handling:
      'Không bao giờ dùng một chú thích ở gần để hợp thức hoá cả một chặng hoặc cả một đoạn.',
    status: 'NEED VERIFICATION',
  },
];

/**
 * Differences between the text layer of the supplied file and the wording this
 * product uses in its Vietnamese paraphrases.
 *
 * Risk C2-R08 registers four such forms from visual page inspection. The
 * remaining entries below were observed in the extracted text layer of the same
 * file. Whether each one is a genuine printing anomaly or an artefact of the
 * file's text layer is itself unresolved, so both forms are recorded and
 * neither is presented as the authoritative reading.
 *
 * Nothing here is a verbatim quotation. Where the product does quote verbatim,
 * it reproduces the printed form and does not substitute these readings.
 */
export interface PrintedFormNote {
  id: string;
  printed: string;
  used: string;
  at: string;
  where: string;
  registered: boolean;
}

export const PRINTED_FORM_NOTES: PrintedFormNote[] = [
  {
    id: 'PF-01',
    printed: 'bước ngoạt',
    used: 'bước ngoặt',
    at: 'C2 PDF p.4',
    where: 'Câu về Đại hội Tua, lần xuất hiện thứ hai trong cùng câu',
    registered: true,
  },
  {
    id: 'PF-02',
    printed: 'trở thành thành yếu tố chỉ đạo',
    used: 'trở thành yếu tố chỉ đạo',
    at: 'C2 PDF p.7',
    where: 'Câu về Hội nghị Trung ương Đảng tháng 5-1941',
    registered: true,
  },
  {
    id: 'PF-03',
    printed: 'Hòa hình lập lại',
    used: 'hoà bình lập lại',
    at: 'C2 PDF p.9',
    where: 'Câu về năm 1954',
    registered: true,
  },
  {
    id: 'PF-04',
    printed: 'quân đội viễn Chính Mỹ',
    used: 'quân đội viễn chinh Mỹ',
    at: 'C2 PDF p.10 / printed p.35',
    where: 'Câu dẫn vào Lời kêu gọi ngày 17-7-1966. Sản phẩm không dùng lại cụm này trong nội dung hiển thị.',
    registered: true,
  },
  {
    id: 'PF-05',
    printed: 'giải phòng dân tộc Việt Nam',
    used: 'giải phóng dân tộc Việt Nam',
    at: 'C2 PDF p.2 / tiêu đề chặng 2',
    where: 'Tiêu đề chặng 2. Sản phẩm hiển thị tiêu đề theo dạng chuẩn hoá ghi trong ngữ cảnh dự án.',
    registered: false,
  },
  {
    id: 'PF-06',
    printed: 'từ đầu năm l941',
    used: 'từ đầu năm 1941',
    at: 'C2 PDF p.8 / tiêu đề chặng 5',
    where: 'Tiêu đề chặng 5; ký tự đầu của năm trông giống chữ "l" thay vì số 1.',
    registered: false,
  },
  {
    id: 'PF-07',
    printed: 'Cương lĩhh chính trị đầu tiên',
    used: 'Cương lĩnh chính trị đầu tiên',
    at: 'C2 PDF p.4',
    where: 'Câu mở đầu chặng 3',
    registered: false,
  },
  {
    id: 'PF-08',
    printed: 'những người phải tả',
    used: 'những người phái tả',
    at: 'C2 PDF p.3',
    where: 'Câu về Đại hội ở thành phố Tua',
    registered: false,
  },
  {
    id: 'PF-09',
    printed: 'là kẻ thủ của nhân dân lao động',
    used: 'là kẻ thù của nhân dân lao động',
    at: 'C2 PDF p.2 / printed p.27',
    where: 'Câu về nhận thức mới hình thành trong hành trình 1911-1917',
    registered: false,
  },
  {
    id: 'PF-10',
    printed: 'nhâu cách của cụ Nguyễn Sinh Sắc',
    used: 'nhân cách của cụ Nguyễn Sinh Sắc',
    at: 'C2 PDF p.2 / printed p.27',
    where: 'Câu về ảnh hưởng của cụ Nguyễn Sinh Sắc',
    registered: false,
  },
  {
    id: 'PF-11',
    printed: 'Hội nghị hiệp nhất Đảng',
    used: 'Hội nghị hợp nhất Đảng',
    at: 'C2 PDF p.6 / printed p.31',
    where: 'Câu dẫn vào trích nghị quyết tháng 10-1930. Cùng trích đoạn dùng "hợp nhất" ở chỗ khác.',
    registered: false,
  },
  {
    id: 'PF-13',
    printed: 'khi dạy học cũng như trong trong sinh hoạt',
    used: 'khi dạy học cũng như trong sinh hoạt',
    at: 'C2 PDF p.2 / printed p.27',
    where: 'Câu về việc dạy học ở Trường Dục Thanh năm 1910',
    registered: false,
  },
  {
    id: 'PF-12',
    printed: 'GIÁ TRỊ TƯ TƯỞNG HỒ CHỈ MINH',
    used: 'GIÁ TRỊ TƯ TƯỞNG HỒ CHÍ MINH',
    at: 'C2 PDF p.10 / printed p.35',
    where: 'Tiêu đề mở đầu mục III, nằm ở ranh giới cuối của trích đoạn',
    registered: false,
  },
];

export const LOCATOR_BY_ID = new Map(LOCATORS.map((l) => [l.id, l]));
export const RISK_BY_ID = new Map(RISKS.map((r) => [r.id, r]));
