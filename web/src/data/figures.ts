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
  /**
   * The event and date check, on its own.
   *
   * The brief for this product requires identity, event/date, location, source,
   * rights and offline packaging to be maintained SEPARATELY. They used to be
   * partly merged into `caption` and `identification`, which made it possible
   * to read a cleared identity as a cleared date. Each axis now states what was
   * established and what was not, in its own field, so a gap in one cannot be
   * borrowed from another.
   */
  eventCheck: string;
  /** The place check, on its own. States plainly when no place is established. */
  locationCheck: string;
  /** Whether the file is packaged into the single-file offline build. */
  offlineCheck: string;
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
      'BnF ghi người trong ảnh là “Nguyen Aïn Nuä’C délégué indochinois” — cách phiên âm thời đó của tên Nguyễn Ái Quốc. Trang Wikimedia Commons dẫn lại tệp này mô tả rõ là Hồ Chí Minh, “ici nommé Nguyen Ai Quoc”. Trích đoạn được giao cho biết Người lấy tên Nguyễn Ái Quốc khi hoạt động ở Pháp (Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 29). Chuỗi nhận diện này chưa được một nguồn học thuật được phê duyệt xác nhận độc lập, nên vẫn giữ NEED VERIFICATION.',
    sourceName: 'Bibliothèque nationale de France, département Estampes et photographie, EI-13 (2702)',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/btv1b9054078w',
    // Required by Gallica's conditions of use; shown with the picture.
    credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
    rights:
      'Bản ghi của BnF ghi dc:rights “domaine public” / “public domain”. Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không phát sinh doanh thu nên thuộc nhánh phi thương mại.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    eventCheck:
      'Bản ghi của BnF gắn ảnh với “Congrès communiste de Marseille”, ghi niên đại 1921 và mốc 26-12-1921. Đại hội Marseille nằm NGOÀI phạm vi trích đoạn được giao, và bản thân niên đại chưa được một nguồn học thuật được phê duyệt đối chiếu. Vì vậy: sự kiện có ghi trong bản ghi nguồn, nhưng CHƯA xác lập để gắn vào bất kỳ chặng nào.',
    locationCheck:
      'Chưa xác lập. Bản ghi của BnF không ghi địa điểm chụp; nhan đề chỉ nêu tên đại hội. Sản phẩm không suy ra địa điểm từ tên sự kiện.',
    offlineCheck:
      'Đã đóng gói. Tệp được nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` kiểm tra ảnh giải mã được với naturalWidth khác 0 khi mở từ file://.',
    // Deliberately not attached to a stage: the event in the BnF record is the
    // Marseille congress of December 1921, which the assigned excerpt does not
    // cover. See the note in SOURCING_CHECKS.
    stageId: null,
    status: 'NEED VERIFICATION',
  },

  /*
   * The hall of the congress the excerpt makes the turning point of stage 2.
   *
   * Why this one, out of the fourteen Agence Meurisse plates of the same
   * congress that BnF holds: it is the only view that identifies no individual.
   * Every other plate in the batch names people in its title - Cachin,
   * Frossard, Rappoport, la citoyenne Colliard - and putting one of those on
   * this stage would invite a reader to look for a face the record does not
   * place there. This one shows the room, and the room is what the excerpt's
   * sentence is about.
   *
   * The product does NOT claim Nguyễn Ái Quốc appears in this photograph. The
   * BnF record names no individual in it, and neither does the caption here.
   */
  {
    id: 'FS-ky-2-b',
    file: 'tu-lieu/bnf-btv1b9038096h-1200.webp',
    width: 1200,
    height: 875,
    /*
     * Describes what is visible, including the banner text and the agency
     * number written on the plate, and stops there. No individual is named,
     * because the record names none.
     */
    alt: 'Ảnh đen trắng chụp từ trên cao một hội trường đông người. Phía cuối phòng là bàn chủ toạ với vài người ngồi; phía trước là các dãy bàn dài phủ đầy giấy tờ, đại biểu ngồi và đứng quanh bàn; hai bên là ban công có người đứng xem. Trên tường treo hai băng-rôn lớn chữ Pháp: “L’ÉMANCIPATION DES TRAVAILLEURS SERA L’ŒUVRE DES TRAVAILLEURS EUX-MÊMES” và một băng-rôn bị khuất hai đầu còn đọc được “…AIRES DE TOUS PAYS UNISS…”. Trên tấm kính ảnh có ghi tay số 85865.',
    /*
     * Only what BnF's own record states, including the date field that does not
     * fit. See `eventCheck` - the discrepancy is published, not resolved.
     */
    caption:
      'Ảnh báo chí trên kính ảnh, Agence Meurisse. Bản ghi của BnF ghi nhan đề: “Congrès de Tours : vue générale de la salle”, chủ đề “Parti socialiste SFIO (France). Congrès national (18 ; 1920 ; Tours)”, niên đại “1920”, và mốc `dc:coverage` “16 décembre 1920”.',
    identification:
      'Bản ghi của BnF **không nêu tên bất kỳ ai** trong ảnh này, và sản phẩm cũng không nêu. Đây là ảnh toàn cảnh hội trường, không phải ảnh chân dung. Sản phẩm **không khẳng định** Nguyễn Ái Quốc có mặt trong khung hình. Tấm kính ảnh tự xác nhận là hiện vật được mô tả: số 85865 ghi tay trên kính trùng với `dc:identifier` “Numéro commercial : Meurisse 85865”.',
    eventCheck:
      'Trường `dc:subject` của BnF ghi sự kiện là “Parti socialiste SFIO (France). Congrès national (18 ; 1920 ; Tours)”. Trích đoạn được giao gọi sự kiện này là “Đại hội Tua” và in thời gian “từ 25 đến 30-12-1920”. **Ngày trong bản ghi không khớp và không dùng được**: `dc:coverage` ghi “16 décembre 1920”, nhưng cả 13 tấm khác cùng lô đều ghi đúng một ngày ấy và một tấm còn ghi “27 février 1920” — đây là ngày gộp của cả recueil (EI-13 (2660), “Actualités 1920-09-26 — 1921-04-10”), không phải ngày chụp. Vì vậy: **trục sự kiện dựa trên `dc:subject` của bản ghi; trục ngày chưa xác lập**. Việc bản ghi và trích đoạn có nói về cùng một đại hội hay không vẫn cần một nguồn học thuật được phê duyệt xác nhận.',
    locationCheck:
      'Chưa xác lập theo trường riêng. Bản ghi không có trường địa điểm; địa danh “Tours” chỉ xuất hiện trong nhan đề và trong tên sự kiện ở `dc:subject`. Sản phẩm không suy ra địa chỉ hay toà nhà cụ thể từ đó.',
    offlineCheck:
      'Đã đóng gói. Tệp được nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` kiểm mọi ảnh giải mã được với naturalWidth khác 0 khi mở từ file://.',
    sourceName: 'Bibliothèque nationale de France, département Estampes et photographie, EI-13 (2660)',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/btv1b9038096h',
    credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
    rights:
      'Bản ghi của BnF ghi `dc:rights` “domaine public” / “public domain”. Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không phát sinh doanh thu nên thuộc nhánh phi thương mại.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    /*
     * Attached to stage 2 on the basis of the record's own subject field, not
     * on period resemblance. The excerpt makes this congress the turning point
     * of the stage; the slot it fills is anchored to that turning point.
     */
    stageId: 'ky-2',
    status: 'NEED VERIFICATION',
  },

  /*
   * The newspaper page the excerpt names, as it was printed.
   *
   * The 2019 textbook prints, in the passage this figure is anchored to, an article candidate
   * given as `Vấn đề dân bản xứ, báo L'Humanité 8-1919`. This is that issue,
   * scanned by BnF. Read directly off the scan: page 3 carries a column headed
   * `En Indo-Chine` with the headline `LA QUESTION INDIGÈNE`, and the article
   * ends with the printed signature `NGUYEN-AI-QUAC.`
   *
   * Three different things are recorded in three different fields below, and
   * none of them stands in for another: what the BnF RECORD says (an issue of
   * L'Humanité of 2 August 1919), what the PAGE ITSELF prints (the heading and
   * the signature), and what the EXCERPT says (a Vietnamese article title and a
   * month). That the three describe one article is likely, and is exactly the
   * kind of thing this product does not get to assert on its own.
   */
  {
    id: 'FS-ky-3-b',
    file: 'tu-lieu/bnf-bpt6k2993902-f3-1200.webp',
    width: 1200,
    height: 1708,
    alt: 'Trang báo cũ, chữ Pháp, chia thành bảy cột chữ nhỏ dày đặc. Đầu trang ghi tên báo “L’HUMANITÉ” và số trang 3. Cột ngoài cùng bên phải có dòng đề mục in nghiêng “En Indo-Chine” và tít lớn “LA QUESTION INDIGÈNE”; cuối bài trong cột ấy in chữ ký “NGUYEN-AI-QUAC.”. Cuối trang là một mục feuilleton đề “FEUILLETON DU 2 AOÛT 1919”.',
    caption:
      'Trang 3 của nhật báo L’Humanité. Bản ghi của BnF ghi nhan đề “L’Humanité : journal socialiste quotidien”, `dc:date` “1919-08-02”, và số báo “1919/08/02 (Numéro 5584)”.',
    identification:
      'Đọc trực tiếp trên bản quét: cột ngoài cùng bên phải mang đề mục “En Indo-Chine”, tít “LA QUESTION INDIGÈNE”, và bài kết thúc bằng chữ ký in “NGUYEN-AI-QUAC.”. Trích đoạn được giao cho biết Người lấy tên Nguyễn Ái Quốc khi hoạt động ở Pháp (Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 29). **Bản ghi của BnF không nêu tên bài và không nêu tác giả bài** — nó mô tả cả số báo, không mô tả từng bài. Việc người ký “NGUYEN-AI-QUAC” dưới bài này là cùng một người với nhân vật của trích đoạn **chưa được một nguồn học thuật được phê duyệt xác nhận**, nên giữ `NEED VERIFICATION`.',
    eventCheck:
      'Ngày do bản ghi nêu, và khớp với trích đoạn: `dc:date` “1919-08-02”, `dc:description` “02 août 1919”, và chính trang báo in “FEUILLETON DU 2 AOÛT 1919”. Trích đoạn in mốc “8-1919”. **Điều chưa xác lập:** trích đoạn gọi bài là “Vấn đề dân bản xứ”, còn trang báo in tít “LA QUESTION INDIGÈNE”. Hai tên ấy có phải cùng một bài hay không là việc của một nguồn học thuật được phê duyệt, không phải suy luận của sản phẩm.',
    locationCheck:
      'Chưa xác lập theo nghĩa nơi chụp hay nơi diễn ra. Bản ghi chỉ nêu nơi xuất bản: `dc:publisher` “L’Humanité (Paris)”.',
    offlineCheck:
      'Đã đóng gói. Nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` mở từng chặng ở chế độ đọc liền mạch, cuộn tới từng ảnh và kiểm ảnh giải mã được với naturalWidth khác 0 khi mở từ file://.',
    sourceName: 'Bibliothèque nationale de France — L’Humanité, số 5584, ngày 2-8-1919',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/bpt6k2993902',
    credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
    rights:
      'Bản ghi của BnF ghi `dc:rights` “domaine public” / “public domain”. Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không phát sinh doanh thu nên thuộc nhánh phi thương mại.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    stageId: 'ky-3',
    status: 'NEED VERIFICATION',
  },

  /*
   * The printed text the excerpt names at 2-9-1945.
   *
   * The cover self-authenticates the same way the other plates do: the BnF
   * shelfmark written on it by hand matches the record's own `dc:source`. It
   * also carries the red legal-deposit stamp of the Hanoi office.
   *
   * A text document, not a portrait, so no identity question arises and none is
   * answered.
   */
  {
    id: 'FS-ky-5-b',
    file: 'tu-lieu/bnf-bpt6k42428601-f1-1100.webp',
    width: 1100,
    height: 1484,
    alt: 'Bìa một cuốn sách mỏng in trên giấy ngả vàng. Trên cùng in “VIỆT-NAM DÂN CHỦ CỘNG HÒA”, dưới đó “ĐỘC LẬP TỰ DO HẠNH PHÚC”. Giữa bìa là dòng chữ lớn màu đỏ “TUYÊN NGÔN ĐỘC LẬP”. Dưới nữa in “DO CHỦ TỊCH CHÍNH PHỦ LÂM THỜI VIỆT-NAM HỒ-CHÍ-MINH ĐỌC TRONG “NGÀY ĐỘC LẬP” 2-9-1945”. Góc trên bên phải có một con dấu tròn màu đỏ của cơ quan lưu chiểu Hà Nội. Góc trên bên trái và góc dưới bên phải có ký hiệu kho viết tay “4° Pièce Indoch 68”.',
    caption:
      'Bản in năm 1945. Bản ghi của BnF ghi nhan đề: “Việt Nam dân chủ cộng hòa...Tuyên ngôn độc lập do chủ tịch chính phủ lâm thời Việt Nam Hồ-Chí Minh đọc trong ngày độc lập 2-9-1945”; `dc:date` “1945”; khổ “In 4°, 4 p.”.',
    identification:
      'Đây là **tài liệu in, không phải ảnh chân dung** — không có câu hỏi nhận diện người nào. Bìa tự xác nhận là hiện vật được mô tả: ký hiệu kho viết tay “4° Pièce Indoch 68” trùng `dc:source` “Bibliothèque nationale de France, département Littérature et art, 4-INDOCH PIECE-68”. Bản ghi ghi `dc:creator` “Hô ̀, Chí Minh (1890-1969). Auteur du texte”.',
    eventCheck:
      'Bản ghi nêu niên đại in là “1945”, không nêu ngày in. Mốc “2-9-1945” là ngày **đọc** văn kiện — do chính bìa in ra và do nhan đề bản ghi nhắc lại — **không phải** ngày in cuốn sách này. Hai trục ấy được giữ tách rời: trích đoạn in mốc 2-9-1945 cho việc đọc Tuyên ngôn, còn tài liệu này là một bản in của văn kiện ấy.',
    locationCheck:
      'Bản ghi không nêu nơi in. Con dấu đỏ trên bìa là dấu của cơ quan lưu chiểu ở Hà Nội, tức nơi **nộp lưu chiểu**, không phải nơi in hay nơi đọc. Sản phẩm không suy ra nơi in từ con dấu.',
    offlineCheck:
      'Đã đóng gói. Nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` kiểm ảnh giải mã được khi mở từ file://.',
    sourceName: 'Bibliothèque nationale de France, département Littérature et art, 4-INDOCH PIECE-68',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/bpt6k42428601',
    credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
    rights:
      'Bản ghi của BnF ghi `dc:rights` “domaine public” / “public domain”. Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không phát sinh doanh thu nên thuộc nhánh phi thương mại.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    stageId: 'ky-5',
    status: 'NEED VERIFICATION',
  },
];

/** Where in the product a documentary figure would sit. */
export interface FigureSlot {
  id: string;
  /** Null means the opening screen rather than a stage. */
  stageId: StageId | null;
  /**
   * The primary visual anchor of a screen, or a supporting document beside it.
   *
   * The brief for this product asks each stage for one primary anchor and one
   * to three supporting visuals. Declaring the supporting positions is how the
   * gap becomes auditable: without them the register could report every
   * position filled while the stages carried no context material at all.
   */
  kind: 'primary' | 'supporting';
  /**
   * Why an image would be here - the narrative job it does, not where it sits.
   *
   * These used to read `Tư liệu cho thời kỳ từ giữa năm 1911 đến cuối năm 1920`
   * on every stage: a placement, repeated with the period swapped. The brief
   * asks each image to answer "why is this image here", and lists the valid
   * answers - introduces context, establishes time and place, illustrates a
   * verified event, connects a person to the stage, supports a turning point,
   * helps interpret a document - and one invalid one, "because the page needs
   * more pictures". Each role below is one of the valid answers, written for
   * that stage.
   *
   * A role is a statement about what the product would use an image FOR. It is
   * not a claim that any such image exists, has been found, or has cleared.
   */
  role: string;
  /**
   * Where in the stage the figure belongs.
   *
   * A primary anchor opens the chapter, so it is always `entrance`. A
   * supporting figure is only worth having next to the thing it supports: a
   * document read eleven screens away from the claim it evidences does no work.
   * `passage`, `turn` and `quote` name a station by the id the stage data
   * already uses, so the placement is data rather than layout guesswork.
   *
   * A supporting position renders in the reading flow ONLY when it is filled.
   * An unfilled one stays declared and visibly blocked in the verification
   * register instead of putting an empty frame into the middle of a stage,
   * which would repeat a gap rather than report it.
   */
  anchor: FigureAnchor;
}

/** A station in the stage flow that a figure can sit beside. */
export type FigureAnchor =
  | { where: 'entrance' }
  | { where: 'passage'; id: string }
  | { where: 'turn'; id: string }
  | { where: 'quote'; id: string };

export const FIGURE_SLOTS: FigureSlot[] = [
  {
    id: 'FS-open',
    stageId: null,
    kind: 'primary',
    role: 'Đặt người học đối diện một tài liệu thật ngay trước khi gặp câu hỏi dẫn đường, để hành trình mở ra bằng một tư liệu chứ không bằng một khối chữ.',
    anchor: { where: 'entrance' },
  },
  {
    id: 'FS-ky-1',
    stageId: 'ky-1',
    kind: 'primary',
    role: 'Dựng bối cảnh Việt Nam mà trích đoạn mô tả ở chặng này, trước thời điểm 5-6-1911.',
    anchor: { where: 'entrance' },
  },
  {
    id: 'FS-ky-1-b',
    stageId: 'ky-1',
    kind: 'supporting',
    role: 'Một tư liệu đương thời về môi trường học hành và phong trào mà trích đoạn nhắc tới ở chặng này, giúp hình dung nơi chốn thay vì chỉ đọc tên nó.',
    anchor: { where: 'turn', id: 'TP1' },
  },
  {
    id: 'FS-ky-2',
    stageId: 'ky-2',
    kind: 'primary',
    role: 'Nối người trong ảnh với chặng hành trình qua nhiều nước mà trích đoạn ghi lại ở thời kỳ này.',
    anchor: { where: 'entrance' },
  },
  {
    id: 'FS-ky-2-b',
    stageId: 'ky-2',
    kind: 'supporting',
    role: 'Cho thấy nơi diễn ra đại hội mà trích đoạn đặt làm bước ngoặt của chặng này, để mốc “25 đến 30-12-1920” có một không gian thật thay vì chỉ là một dòng chữ.',
    anchor: { where: 'turn', id: 'TP3' },
  },
  {
    id: 'FS-ky-3',
    stageId: 'ky-3',
    kind: 'primary',
    role: 'Nối người trong ảnh với thời kỳ hình thành những nội dung cơ bản của tư tưởng về cách mạng Việt Nam.',
    anchor: { where: 'entrance' },
  },
  {
    id: 'FS-ky-3-b',
    stageId: 'ky-3',
    kind: 'supporting',
    role: 'Đặt người học trước chính trang báo mà trích đoạn dẫn tên, để dòng “Vấn đề dân bản xứ, báo L’Humanité 8-1919” trở thành một tờ báo có thật chứ không phải một dòng chú thích.',
    anchor: { where: 'passage', id: 'P3-2' },
  },
  {
    id: 'FS-ky-4',
    stageId: 'ky-4',
    kind: 'primary',
    role: 'Nối người trong ảnh với thời kỳ giữ vững quan điểm mà trích đoạn đặt ở chặng này.',
    anchor: { where: 'entrance' },
  },
  {
    id: 'FS-ky-4-b',
    stageId: 'ky-4',
    kind: 'supporting',
    role: 'Một tài liệu đương thời làm căn cứ đọc các trích dẫn nguyên văn của chặng này, thay vì để chúng đứng một mình.',
    anchor: { where: 'turn', id: 'TP6' },
  },
  {
    id: 'FS-ky-5',
    stageId: 'ky-5',
    kind: 'primary',
    role: 'Nối người trong ảnh với thời kỳ cuối cùng mà trích đoạn ghi, kết thúc ở ngày 2-9-1969.',
    anchor: { where: 'entrance' },
  },
  {
    id: 'FS-ky-5-b',
    stageId: 'ky-5',
    kind: 'supporting',
    role: 'Đặt người học trước chính bản in của văn kiện mà trích đoạn gọi tên ở mốc 2-9-1945, để bước ngoặt ấy có một tài liệu đọc được.',
    anchor: { where: 'turn', id: 'TP7' },
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
  {
    id: 'SC-6',
    url: 'https://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&query=(gallica+all+%22congres+de+Tours+1920%22)+and+(dc.type+all+%22image%22)',
    kind: 'BnF Gallica — tra cứu qua API SRU, rồi mở từng bản ghi hiện vật',
    found:
      '14 bản ghi ảnh báo chí Agence Meurisse mang nhan đề “Congrès de Tours”, tất cả `dc:rights` “domaine public”, cùng ký hiệu kho EI-13 (2660), cùng thuộc recueil “Actualités 1920-09-26 — 1921-04-10”. Đã mở bản ghi OAI của cả 14 để đọc từng trường.',
    blocker:
      'Một tấm dùng được: `btv1b9038096h` “vue générale de la salle” — tấm duy nhất trong lô không nêu tên người nào trong nhan đề, nên không mời người xem đi tìm một khuôn mặt mà bản ghi không đặt ở đó. Đã điền vào `FS-ky-2-b`.',
    outcome: 'cleared',
  },
  {
    id: 'SC-7',
    url: 'https://gallica.bnf.fr/services/OAIRecord?ark=btv1b9038096h',
    kind: 'BnF Gallica — bản ghi hiện vật, đọc trực tiếp toàn bộ Dublin Core',
    found:
      '`dc:subject` “Parti socialiste SFIO (France). Congrès national (18 ; 1920 ; Tours)”; `dc:identifier` “Numéro commercial : Meurisse 85865”; `dc:source` “Bibliothèque nationale de France, département Estampes et photographie, EI-13 (2660)”; `dc:rights` “domaine public”; `dc:coverage` “16 décembre 1920”.',
    blocker:
      'MÂU THUẪN NGÀY, đã công bố chứ không làm phẳng: `dc:coverage` ghi 16-12-1920, trong khi trích đoạn in đại hội diễn ra 25 đến 30-12-1920. Cả 13 tấm khác cùng lô đều ghi đúng ngày ấy và một tấm ghi “27 février 1920” — đây là ngày gộp của recueil, không phải ngày chụp. Trục sự kiện dựa trên `dc:subject`; trục ngày giữ nguyên trạng thái chưa xác lập.',
    outcome: 'cleared',
  },
  {
    id: 'SC-8',
    url: 'https://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&query=(gallica+all+%22delegue+indochinois%22)+and+(dc.type+all+%22image%22)',
    kind: 'BnF Gallica — tra cứu ảnh có đại biểu Đông Dương',
    found:
      '5 bản ghi. Một là tấm Marseille đã dùng ở màn mở đầu (`btv1b9054078w`). Hai bản ghi “Temple du Souvenir Indochinois” 1920 mang `dc:rights` “conditions spécifiques d’utilisation (sous convention Emile Prudhomme)” — KHÔNG phải domaine public. Hai bản còn lại không liên quan.',
    blocker:
      'Không có thêm ảnh chân dung nào dùng được. Truy vấn “Ho Chi Minh” trong ảnh trả về 128 bản ghi nhưng toàn bộ là ảnh vườn hoa **Thành phố Hồ Chí Minh** năm 1948 — trùng tên, khác đối tượng.',
    outcome: 'rejected',
  },
  {
    id: 'SC-9',
    url: 'https://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&query=(dc.title+all+%22Fontainebleau%22)+and+(dc.type+all+%22image%22)',
    kind: 'BnF Gallica — tìm ảnh báo chí chuyến đi Pháp 1946, và các tài liệu trích đoạn gọi tên',
    found:
      'Không có ảnh nào về hội nghị Fontainebleau 1946: kết quả là maquette trang phục 1772 và ảnh bán đấu giá năm 1920. Các truy vấn cho “Le Paria”, “Le Procès de la colonisation française”, “Revendications du peuple annamite”, “Union intercoloniale” và “Phan Thiết” đều không trả về đúng tài liệu.',
    blocker:
      'Bộ ảnh báo chí Meurisse/Rol trên Gallica không phủ năm 1946. Bốn vị trí chính và bốn vị trí bổ trợ còn lại vẫn cần hỏi cơ quan lưu trữ Việt Nam — xem thư xin phép ở sổ nguồn ảnh, **chưa gửi cho ai**.',
    outcome: 'unresolved',
  },
  {
    id: 'SC-10',
    url: 'https://gallica.bnf.fr/ark:/12148/bpt6k2993902',
    kind: 'BnF Gallica — số báo L’Humanité ngày 2-8-1919, mở bản ghi và xem tận mắt bản quét',
    found:
      'Bản ghi: `dc:date` “1919-08-02”, `dc:description` “1919/08/02 (Numéro 5584)”, `dc:rights` “domaine public”. Xem trực tiếp trang 3 của bản quét: cột ngoài cùng bên phải có đề mục “En Indo-Chine”, tít “LA QUESTION INDIGÈNE”, và bài ký tên in “NGUYEN-AI-QUAC.”. Cuối trang có dòng “FEUILLETON DU 2 AOÛT 1919”.',
    blocker:
      'Đã điền vào `FS-ky-3-b`. Ba lớp dữ kiện được giữ TÁCH RỜI: (1) bản ghi BnF chỉ mô tả cả số báo, KHÔNG nêu tên bài và KHÔNG nêu tác giả bài; (2) chính trang báo in tít và chữ ký; (3) trích đoạn gọi bài là “Vấn đề dân bản xứ”. Việc ba lớp ấy nói về cùng một bài vẫn cần nguồn học thuật được phê duyệt.',
    outcome: 'cleared',
  },
  {
    id: 'SC-11',
    url: 'https://gallica.bnf.fr/ark:/12148/bpt6k42428601',
    kind: 'BnF Gallica — bản in Tuyên ngôn Độc lập năm 1945, mở bản ghi và xem tận mắt bìa',
    found:
      'Bản ghi: nhan đề “Việt Nam dân chủ cộng hòa...Tuyên ngôn độc lập do chủ tịch chính phủ lâm thời Việt Nam Hồ-Chí Minh đọc trong ngày độc lập 2-9-1945”; `dc:creator` “Hô ̀, Chí Minh (1890-1969). Auteur du texte”; `dc:date` “1945”; `dc:source` “…4-INDOCH PIECE-68”; `dc:rights` “domaine public”. Xem bìa: ký hiệu kho viết tay “4° Pièce Indoch 68” trùng bản ghi, kèm dấu đỏ của cơ quan lưu chiểu Hà Nội.',
    blocker:
      'Đã điền vào `FS-ky-5-b`. Là tài liệu in, không phải ảnh chân dung, nên không phát sinh câu hỏi nhận diện. Ngày in và ngày đọc được giữ tách rời: bản ghi chỉ nêu niên đại “1945”.',
    outcome: 'cleared',
  },
  {
    id: 'SC-12',
    url: 'https://gallica.bnf.fr/ark:/12148/bpt6k215450z',
    kind: 'BnF Gallica — biên bản tốc ký Đại hội lần thứ 18 của SFIO',
    found:
      'Nhan đề bản ghi nêu nguyên văn: “18e congrès national tenu à Tours les 25, 26, 27, 28, 29 & 30 décembre 1920 : compte-rendu sténographique”. `dc:rights` “domaine public”.',
    blocker:
      'KHÔNG điền vào vị trí nào — dùng làm **đối chứng cho trục ngày** của `FS-ky-2-b`: chính văn kiện của đại hội nêu ngày họp là 25–30 tháng 12 năm 1920, khớp mốc “25 đến 30-12-1920” mà trích đoạn in, và cho thấy mốc “16 décembre 1920” trong bản ghi ảnh là ngày gộp của recueil chứ không phải ngày chụp.',
    outcome: 'unresolved',
  },
  {
    id: 'SC-13',
    url: 'https://humazur.univ-cotedazur.fr/s/Humazur/item/23566',
    kind: 'Université Côte d’Azur — Humazur, bản ghi hiện vật (bản đồ tỉnh Nghệ An, 1909)',
    found:
      'Bản ghi nêu: Cote “ASE 2296-65”, ark:/17103/d610, tác giả “Gallois, Lucien (1857-1941)”, Date “1909”, mô tả “Carte de la province de Nghệ An.”, Droits “Domaine public”. Trang điều khoản của chính nơi giữ có nêu điều kiện dùng lại phi thương mại.',
    blocker:
      'ỨNG VIÊN MẠNH, **chưa điền**. Đây là một kho mới mà nhóm chưa từng dùng; bản ghi và trang điều khoản do một tác nhân nghiên cứu mở, **người viết bản ghi này chưa tự mở lại trang điều khoản của Humazur**. Theo đúng kỷ luật “tự kiểm trước khi đưa vào sản phẩm”, vị trí `FS-ky-1-b` vẫn để trống cho tới khi có người mở lại và xác nhận.',
    outcome: 'unresolved',
  },
  {
    id: 'SC-14',
    url: 'https://humazur.univ-cotedazur.fr/s/Humazur/item/22226',
    kind: 'Université Côte d’Azur — Humazur, bản ghi ảnh chân dung Phan Châu Trinh',
    found:
      'Bản ghi nêu: Cote “PH37-2”, ark:/17103/cnqj, Créateur “Inconnu”, **Date “Inconnue”**, Couverture temporelle “1910-1926 ?” (dấu hỏi là của chính nơi giữ), Droits “Domaine public”.',
    blocker:
      '**LOẠI cho vị trí chính.** Hai lý do, ghi tách rời: (1) trục ngày — bản ghi ghi thẳng là “Inconnue”, và phỏng đoán của nơi giữ phần lớn nằm SAU mốc 5-6-1911 của chặng; (2) đặt chân dung một người khác làm neo mở đầu chặng sẽ khiến người học tưởng đó là nhân vật của hành trình. Trích đoạn có gọi tên Phan Châu Trinh, nên ảnh này không phải “không liên quan” — nhưng nó không phải neo của chương.',
    outcome: 'rejected',
  },
  {
    id: 'SC-15',
    url: 'https://gallica.bnf.fr/ark:/12148/btv1b10679505q',
    kind: 'BnF Gallica — tra “Latouche-Tréville”, kiểm một nhầm lẫn dễ mắc',
    found:
      'Mọi kết quả ảnh đều là **tuần dương hạm bọc thép Pháp “Latouche-Tréville”**, không phải tàu buôn “Amiral Latouche-Tréville” của hãng Chargeurs Réunis.',
    blocker:
      '**LOẠI.** Dùng tấm này sẽ là đúng loại nhầm lẫn “trông giống nên chắc là đúng” mà quy tắc của dự án cấm. Ghi lại để không ai mắc lại. Lưu ý thêm: **trích đoạn được giao không nêu tên con tàu nào**, nên vị trí này không cần một con tàu.',
    outcome: 'rejected',
  },
];

/**
 * The state of the documentary-image programme as a whole, derived rather than
 * asserted.
 *
 * It used to be a hand-written constant reading `NOT YET EVIDENCED`. When the
 * first photograph cleared its source and its usage condition, the constant did
 * not move - so the verification register, the one surface whose job is to
 * state the evidence truthfully, went on reporting that nothing had cleared
 * while the product displayed something that had. Deriving it means the
 * register cannot drift from the data again.
 */
export function figureStatus(): Provenance {
  return FIGURES.length === 0 ? 'NOT YET EVIDENCED' : 'NEED VERIFICATION';
}

/** How many of the declared positions hold a cleared photograph. */
export function figureFilledCount(): number {
  return FIGURE_SLOTS.filter((slot) => FIGURES.some((f) => f.id === slot.id)).length;
}

/** The provenance state of one position, from the data. */
export function slotStatus(slotId: string): Provenance {
  const fig = FIGURES.find((f) => f.id === slotId);
  return fig ? fig.status : 'NOT YET EVIDENCED';
}

/** What has to be true before a slot may be filled. */
export const FIGURE_REQUIREMENTS = [
  'Nguồn là cơ quan lưu trữ, bảo tàng hoặc cơ quan chính thức, và mở được trang gốc để kiểm.',
  'Điều kiện sử dụng được ghi nguyên văn từ trang gốc, không tóm tắt, không suy đoán.',
  'Chú thích chỉ nói đúng những gì nguồn nói. Không đoán ngày, địa điểm, sự kiện hay người trong ảnh.',
  'Việc ảnh thuộc về chặng nào phải được xác thực trước khi gắn vào chặng đó.',
  'Không dùng AI để tạo, mô phỏng, phục dựng, tô màu hay làm chuyển động chân dung.',
];
