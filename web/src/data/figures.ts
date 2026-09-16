import type { Provenance, StageId } from './types';

/**
 * Documentary photographs.
 *
 * HOW A SLOT IS CLEARED.
 *
 * Three questions, kept apart, because they have different evidence and
 * different answers:
 *
 *   A. Is the document what it is said to be, and who holds it?
 *   B. What are its caption facts - date, place, event - and who states them?
 *   C. What do the usage conditions permit: download, offline packaging,
 *      public display, resizing?
 *
 * A CORRECTION TO THE EARLIER PASS. On 17-9-2026 this file recorded that no
 * photograph could be used, on reasoning that merged those three questions. Two
 * errors are corrected rather than deleted. First, "no reuse terms published"
 * was treated as "reuse prohibited"; absence of a stated condition is an
 * unestablished condition, not a refusal. Second, a candidate was rejected
 * partly because its date was internally inconsistent - but a doubtful date is a
 * caption problem, not a copyright problem, and for an opening portrait no date
 * needs to be asserted at all. A third weakness: one holding institution was
 * judged from its homepage rather than from an item record.
 *
 * Re-done on that basis, `FS-open` is now filled from a BnF item record whose
 * own `dc:rights` field reads "domaine public", under Gallica's published
 * conditions of use, both read directly rather than through a summary.
 *
 * WHAT MAY NEVER GO IN HERE.
 *
 * No image generated, simulated, restored, colourised, face-swapped or
 * otherwise altered by AI, and no synthesised voice or words. Both rule
 * documents put AI simulation or distortion of the portrait in their most
 * serious category, with different scopes; nothing here goes near either. The
 * one delivered file is a scale-down and re-encode of the BnF master: nothing
 * cropped, retouched or colourised, and the plate edges and pencilled reference
 * number are left in place because they are part of the document.
 */

export interface DocumentaryFigure {
  id: string;
  /** Path under `public/`, relative, e.g. `tu-lieu/xxx.webp`. */
  file: string;
  /** Intrinsic pixel size. Both are required so the box is reserved before load. */
  width: number;
  height: number;
  /** What is visible in the photograph, described without interpreting it. */
  alt: string;
  /** The caption, which may state only what the source itself states. */
  caption: string;
  /** Holding institution or publication, named exactly as it names itself. */
  sourceName: string;
  /** The page a person can open to check. Never a search-result link. */
  sourceUrl: string;
  /**
   * The attribution the source requires, verbatim and in its own language.
   * Displayed with the picture, not hidden behind a disclosure: where a source
   * makes attribution a condition of reuse, satisfying it is not optional.
   */
  credit: string;
  /** The usage condition, quoted from the source, not summarised. */
  rights: string;
  /** The page those conditions were read on. */
  rightsUrl: string;
  /**
   * Who says this is who, and on what basis. Kept separate from `caption`
   * because identifying the subject and describing the document are different
   * claims with different evidence behind them.
   */
  identification: string;
  /** Which stage it belongs to, and only once the connection is verified. */
  stageId: StageId | null;
  status: Provenance;
}

/**
 * Cleared photographs. Empty by design; see the note above.
 *
 * A record added here must carry every field, and `status` may be stronger than
 * `NEED VERIFICATION` only after a human has opened `sourceUrl` and read the
 * usage condition quoted in `rights`.
 */
export const FIGURES: DocumentaryFigure[] = [
  {
    id: 'FS-open',
    file: 'tu-lieu/bnf-btv1b9054078w-900.webp',
    width: 900,
    height: 1245,
    /*
     * Describes what is visible, and stops there. The pencilled number is part
     * of the document and is described rather than edited out.
     */
    alt: 'Ảnh chân dung đen trắng, chụp gần một người đàn ông trẻ, tóc đen chải ngược, mặc áo khoác sẫm màu với sơ mi cổ trắng và cà vạt, nhìn thẳng vào ống kính; phía sau là mặt tiền một toà nhà. Trên tấm kính ảnh có ghi tay số hiệu 94.447.',
    /*
     * The caption says what the holding institution says, in its own words, and
     * adds nothing. BnF's catalogue title uses the period transliteration
     * "Nguyen Aïn Nuä'C"; that spelling is kept rather than silently corrected.
     */
    caption:
      'Ảnh báo chí trên kính ảnh, Agence Meurisse. Bản ghi của BnF ghi nhan đề: “Congrès communiste de Marseille : Nguyen Aïn Nuä’C délégué indochinois (gros plan)”, niên đại 1921, mốc ghi trong bản ghi là 26-12-1921.',
    identification:
      'BnF ghi người trong ảnh là “Nguyen Aïn Nuä’C délégué indochinois” — cách phiên âm thời đó của tên Nguyễn Ái Quốc. Trang Wikimedia Commons dẫn lại tệp này mô tả rõ là Hồ Chí Minh, “ici nommé Nguyen Ai Quoc”. Trích đoạn được giao cho biết Người lấy tên Nguyễn Ái Quốc khi hoạt động ở Pháp (C2 PDF tr.3). Chuỗi nhận diện này chưa được một nguồn học thuật được phê duyệt xác nhận độc lập, nên vẫn giữ NEED VERIFICATION.',
    sourceName: 'Bibliothèque nationale de France, département Estampes et photographie, EI-13 (2702)',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/btv1b9054078w',
    // Required by Gallica's conditions of use; shown with the picture.
    credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
    rights:
      'Bản ghi của BnF ghi dc:rights “domaine public” / “public domain”. Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không phát sinh doanh thu nên thuộc nhánh phi thương mại.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    // Deliberately not attached to a stage: the event in the BnF record is the
    // Marseille congress of December 1921, which the assigned excerpt does not
    // cover. See the note in SOURCING_CHECKS.
    stageId: null,
    status: 'NEED VERIFICATION',
  },
];

/** Where in the product a documentary figure would sit. */
export interface FigureSlot {
  id: string;
  /** Null means the opening screen rather than a stage. */
  stageId: StageId | null;
  /** What this position is for, in the argument. */
  role: string;
}

export const FIGURE_SLOTS: FigureSlot[] = [
  {
    id: 'FS-open',
    stageId: null,
    role: 'Ảnh dẫn nhập ở màn mở đầu, đứng cạnh câu hỏi trung tâm.',
  },
  {
    id: 'FS-ky-1',
    stageId: 'ky-1',
    role: 'Tư liệu cho thời kỳ trước ngày 5-6-1911.',
  },
  {
    id: 'FS-ky-2',
    stageId: 'ky-2',
    role: 'Tư liệu cho thời kỳ từ giữa năm 1911 đến cuối năm 1920.',
  },
  {
    id: 'FS-ky-3',
    stageId: 'ky-3',
    role: 'Tư liệu cho thời kỳ từ cuối năm 1920 đến đầu năm 1930.',
  },
  {
    id: 'FS-ky-4',
    stageId: 'ky-4',
    role: 'Tư liệu cho thời kỳ từ đầu năm 1930 đến đầu năm 1941.',
  },
  {
    id: 'FS-ky-5',
    stageId: 'ky-5',
    role: 'Tư liệu cho thời kỳ từ đầu năm 1941 đến tháng 9-1969.',
  },
];

/**
 * What was actually checked when looking for a usable photograph.
 *
 * Recorded so the gap is auditable and so nobody repeats the search. Each entry
 * quotes what the page said rather than characterising it.
 */
export interface SourcingCheck {
  id: string;
  /** The page opened. */
  url: string;
  /** What kind of holder this is. */
  kind: string;
  /** What the page stated, quoted. */
  found: string;
  /** Where it leaves the three questions. */
  blocker: string;
  /** Whether this check produced a usable document. */
  outcome: 'cleared' | 'unresolved' | 'rejected';
}

export const SOURCING_CHECKS: SourcingCheck[] = [
  {
    id: 'SC-1',
    url: 'https://baotanghochiminh.vn/',
    kind: 'Bảo tàng chính thức — mới chỉ mở trang chủ',
    found: '“© 2017 Bảo tàng Hồ Chí Minh. All rights reserved.”',
    blocker:
      'ĐÍNH CHÍNH: lần kiểm trước kết luận “không dùng được” chỉ từ trang chủ, và coi việc không thấy điều khoản là cấm. Cả hai đều sai phương pháp. Đúng ra: đây là trạng thái CHƯA XÁC LẬP ĐIỀU KIỆN SỬ DỤNG. Muốn dùng ảnh của bảo tàng thì phải mở bản ghi từng hiện vật và hỏi bảo tàng, chứ không suy ra từ một dòng ở chân trang chủ.',
    outcome: 'unresolved',
  },
  {
    id: 'SC-2',
    url: 'https://hochiminh.vn/',
    kind: 'Trang chính thức — mới chỉ mở trang chủ',
    found: '“Bản quyền thuộc Cục Chuyển đổi số - Cơ yếu”',
    blocker:
      'ĐÍNH CHÍNH: như trên. Một dòng tuyên bố bản quyền ở chân trang không nói gì về việc có cho phép dùng lại cho mục đích giáo dục hay không. Trạng thái đúng là CHƯA XÁC LẬP, cần hỏi trực tiếp.',
    outcome: 'unresolved',
  },
  {
    id: 'SC-3',
    url: 'https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_-_1946_Portrait.jpg',
    kind: 'Kho ảnh cộng đồng — dùng để tìm ứng viên, không phải để xác thực',
    found:
      'Nhãn “Public domain” (Việt Nam và Hoa Kỳ) và “Creative Commons Public Domain Mark 1.0”. Trường Source dẫn một bài trên trang tạp chí phổ thông HistoryNet. Trường Author: “Unknown author”. Trường Date: “circa 1947”, trong khi tên tệp ghi 1946.',
    blocker:
      'Về điều kiện sử dụng: nhãn public domain ở đây dựa vào năm công bố lần đầu, mà cả tác giả lẫn năm công bố đều không xác định, và nguồn dẫn không phải một cơ quan lưu trữ — nên căn cứ chưa xác lập. ĐÍNH CHÍNH: lần trước gộp thêm việc ngày tháng mâu thuẫn vào lý do loại; đó là vấn đề của chú thích, không phải của bản quyền, và với một ảnh dẫn nhập thì không cần nêu ngày. Ứng viên này bị loại chỉ vì lý do thứ nhất.',
    outcome: 'rejected',
  },
  {
    id: 'SC-4',
    url: 'https://gallica.bnf.fr/ark:/12148/btv1b9054078w',
    kind: 'Thư viện quốc gia Pháp (BnF) — bản ghi của chính hiện vật',
    found:
      'Bản ghi OAI của BnF ghi: dc:title “Congrès communiste de Marseille : Nguyen Aïn Nuä’C délégué indochinois (gros plan) : [photographie de presse] / Agence Meurisse”; dc:creator “Agence de presse Meurisse”; dc:date “1921”; dc:coverage “26 décembre 1921”; dc:source “Bibliothèque nationale de France, département Estampes et photographie, EI-13 (2702)”; dc:identifier “Numéro commercial : Meurisse 94447”; và dc:rights “domaine public” / “public domain”. Trên chính tấm kính ảnh có ghi tay số 94.447, trùng với số trong bản ghi.',
    blocker:
      'ĐỦ CĂN CỨ CHO Ô FS-open. (A) Nguồn gốc: do BnF giữ, có ký hiệu kho và số hiệu hãng ảnh, số này hiện ngay trên tấm kính. (B) Dữ kiện chú thích: ngày và sự kiện là do BnF ghi; chú thích trong sản phẩm chỉ chép lại đúng lời BnF, không thêm. (C) Điều kiện sử dụng: xem SC-5. Lưu ý: sự kiện trong bản ghi là Đại hội Marseille tháng 12-1921, KHÔNG nằm trong trích đoạn được giao, nên ảnh này không được gắn vào chặng nào.',
    outcome: 'cleared',
  },
  {
    id: 'SC-5',
    url: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    kind: 'Điều kiện sử dụng do chính Gallica công bố',
    found:
      '“La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France » ou « Source gallica.bnf.fr / BnF ». La réutilisation commerciale de ces contenus est payante et fait l’objet d’une licence.”',
    blocker:
      'Cho phép: tải về, dùng lại phi thương mại, hiển thị công khai, với một điều kiện bắt buộc là giữ dòng ghi nguồn. Sản phẩm học tập này không bán, không tạo doanh thu, nên thuộc nhánh phi thương mại. Điều khoản không đặt giới hạn về định dạng hay kích thước, nên việc thu nhỏ và đổi sang WebP để phân phối nằm trong phạm vi đó. Dòng ghi nguồn được hiển thị ngay cạnh ảnh, không giấu sau nút.',
    outcome: 'cleared',
  },
];

export const FIGURE_STATUS: Provenance = 'NOT YET EVIDENCED';

/** What has to be true before a slot may be filled. */
export const FIGURE_REQUIREMENTS = [
  'Nguồn là cơ quan lưu trữ, bảo tàng hoặc cơ quan chính thức, và mở được trang gốc để kiểm.',
  'Điều kiện sử dụng được ghi nguyên văn từ trang gốc, không tóm tắt, không suy đoán.',
  'Chú thích chỉ nói đúng những gì nguồn nói. Không đoán ngày, địa điểm, sự kiện hay người trong ảnh.',
  'Việc ảnh thuộc về chặng nào phải được xác thực trước khi gắn vào chặng đó.',
  'Không dùng AI để tạo, mô phỏng, phục dựng, tô màu hay làm chuyển động chân dung.',
];
