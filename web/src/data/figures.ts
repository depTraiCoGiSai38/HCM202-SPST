import type { Provenance, StageId } from './types';

/**
 * Documentary photographs and printed documents.
 *
 * CORRECTED 18-9-2026: this file was titled "Documentary photographs" alone.
 * Four of the eight records are not photographs - a 1909 printed map, two
 * newspaper sheets and a pamphlet cover - and the whole reuse logic below turns
 * on exactly that distinction, because a printed document raises no separate
 * photographic-authorship question and a photograph does.
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
 * Re-done on that basis, `FS-open` was filled ON 17-9-2026 from a BnF item record
 * whose own `dc:rights` field reads "domaine public", under Gallica's published
 * conditions of use, both read directly rather than through a summary.
 *
 * TWO THINGS IN THAT SENTENCE HAVE SINCE MOVED, and it is dated rather than
 * rewritten so the reasoning stays legible. The record is no longer at
 * `FS-open`: it became `FS-ky-3` on 19-9-2026 (`SC-24`). And the holder's
 * `dc:rights` field is no longer treated as settling reuse on its own: it
 * answers for the digitised copy, not for Agence Meurisse, whose position is
 * unestablished (`SC-26`), so that record's decision is `USE WITH CAUTION`.
 *
 * WHERE THIS STANDS ON 19-9-2026. Eight of thirteen declared positions hold a
 * document, from two holding institutions: BnF (Gallica) and Humazur at
 * Université Côte d'Azur. Two stage entrances now carry a photograph, and each
 * is there for a stated reason rather than a general resemblance: stage 5's
 * magazine cover prints the subject's name in the caption under the picture,
 * and stage 3's plate carries a record date that falls inside that stage. Five
 * positions are blocked, the opening among them since its document moved to the
 * stage its own date belongs to (`SC-24`).
 *
 * STAGE 4 IS BLOCKED, NOT CLOSED. `SC-25`. Both of its positions are empty
 * because no document has yet cleared this project's evidence and reuse
 * requirements - which is a statement about what has been searched, not about
 * what exists. Archives not yet asked are listed there. Nothing goes in until
 * provenance, stage relevance and reuse conditions all clear.
 *
 * WHAT A REFERENCE REPOSITORY IS FOR. This pass began by reading every image
 * and every metadata field in a reference repository supplied on the machine.
 * Nothing from it is used. It records a publisher line per picture and never an
 * item record, a shelfmark, a photographer or a usage condition, so no asset in
 * it reaches conditions 1 and 2 below. That is `NEED VERIFICATION`, not
 * `REJECTED` on the merits, and `SC-16` says so in those words - the earlier
 * mistake of reading "no terms found" as "reuse forbidden" is not repeated.
 *
 * WHAT MAY NEVER GO IN HERE.
 *
 * No image generated, simulated, restored, colourised, face-swapped or
 * otherwise altered by AI, and no synthesised voice or words. Both rule
 * documents put AI simulation or distortion of the portrait in their most
 * serious category, with different scopes; nothing here goes near either. The
 * eight delivered files is a scale-down and re-encode of its own holder's
 * master - seven from the BnF, one from Humazur: nothing cropped, retouched or
 * colourised, and where a document carries plate edges or a pencilled reference
 * number they are left in place because they are part of the document.
 * (CORRECTED 18-9-2026: this said "the one delivered file" and "the BnF
 * master", written when a single record existed.)
 */

/**
 * What the project has decided it may do with a document.
 *
 * Deliberately NOT a member of `Provenance`. `Provenance` is the controlled
 * vocabulary AGENTS.md section 3 fixes for evidence, and `USE WITH CAUTION` is
 * not one of its terms; inventing a tenth term inside that union would quietly
 * widen a list the governance document says to use exactly. This is a separate
 * axis - what may be done with the file - and it lives in its own type so that
 * a reuse decision can never be mistaken for an evidence status, nor the other
 * way round. Every figure carries both.
 *
 *  - `USE`               the holder states its position, and no separate maker
 *                        claim arises from the item itself.
 *  - `USE WITH CAUTION`  the holder states its position, but the item is a
 *                        photograph whose own maker question is live and has
 *                        NOT been independently established - whether or not a
 *                        maker is actually named, because an absent credit
 *                        settles nothing either.
 *                        CORRECTED 18-9-2026: this said the unresolved position
 *                        is "published beside the picture". It is not. Beside a
 *                        filled picture a reader meets the caption, the required
 *                        credit line and the evidence-status chip; both `reuse`
 *                        and `creatorRightsCheck` are one control away, in the
 *                        "Nguồn và điều kiện" panel, and on the register at
 *                        `#/kiem-chung`. Published, and one click from the
 *                        picture - not on the same surface as it.
 *  - `NEED VERIFICATION` conditions not established. Nothing may be published.
 *  - `REJECT`            established and does not support inclusion.
 */
export type ReuseDecision = 'USE' | 'USE WITH CAUTION' | 'NEED VERIFICATION' | 'REJECT';

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
  /*
   * REUSE, SPLIT INTO FOUR AXES ON 19-9-2026.
   *
   * There used to be one field, `rights`, holding everything: what the holding
   * institution's record said, what its published terms said, and a sentence of
   * the product's own reasoning about whether that was enough. Three different
   * claims with three different kinds of evidence, welded into one string.
   *
   * That is the same mistake the identity/date/place axes were split to avoid,
   * and it had the same failure mode: a holder's `domaine public` label could
   * be read as though it settled the maker's own position, which it does not.
   * A photograph carries two rights questions - the digitised copy's, which the
   * holder speaks for, and the photographer's, which the holder does not. For
   * the two 1946 sheets the second question is live. CORRECTED 18-9-2026: the
   * reason used to read "because the magazine prints a photographer credit on
   * the page", which is true of ONE of them. The n° 41 cover prints "Phot.
   * France-Illustration (Parnotte)."; p.295 of n° 52 prints no photographer
   * line at all and its `printedCreatorCredit` is `null`. That sheet takes the
   * cautious decision precisely because an ABSENT credit settles nothing
   * either - the point the old wording lost.
   *
   * So: four fields that each answer one question, and `reuse`, which is the
   * decision that follows from them and may never be stronger than they are.
   */

  /** What the holding institution's OWN item record states, quoted. */
  holderRightsStatus: string;
  /** The holder's published reuse condition, quoted, never summarised. */
  reuseCondition: string;
  /** The page those conditions were read on. */
  rightsUrl: string;
  /**
   * A maker credit printed ON the item itself, verbatim.
   * `null` when the item carries none - which is a fact about the item, not an
   * absence of a maker, and the two are not the same thing.
   */
  printedCreatorCredit: string | null;
  /**
   * Whether that maker's own position was independently established, and how.
   * For everything here the honest answer is that it was not; the field says so
   * rather than letting the holder's label stand in for it.
   */
  creatorRightsCheck: string;
  /** The decision the four fields above support, and nothing beyond them. */
  reuse: ReuseDecision;
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
 * The documents the product carries.
 *
 * A record added here must carry every field, and `status` may be stronger than
 * `NEED VERIFICATION` only after a human has opened `sourceUrl` and read the
 * condition quoted in `reuseCondition`.
 */
export const FIGURES: DocumentaryFigure[] = [
  /*
   * REASSIGNED 19-9-2026: opening screen -> stage 3 entrance.
   *
   * THE PREVIOUS DECISION, KEPT IN FULL. From 17-9 to 18-9 this record sat at
   * `FS-open` with `stageId: null`, and the reason written here was: "the event
   * in the BnF record is the Marseille congress of December 1921, which the
   * assigned excerpt does not cover", so attaching it to a stage "because it
   * looks apt is exactly the inference the project forbids". On 18-9 the
   * question was reopened, recorded as `SC-22`, and deliberately NOT decided by
   * the agent, because reversing a reasoned decision is a human's call.
   *
   * THE RULING, 19-9-2026 (`SC-24`). Reversed, on the project's own authority.
   * What the earlier reasoning got right: the Marseille congress is not in the
   * excerpt, and this picture may never be used to illustrate that congress.
   * What it got wrong: it let a fact about the EVENT decide a question about
   * the PERIOD. The record's own date, 26-12-1921, falls inside stage 3
   * (31-12-1920 to 3-2-1930). A portrait placed as a portrait makes a claim
   * about what the person looked like within a period, not about an event - and
   * the product frames it exactly that way, in the role, the caption and
   * `eventCheck`, all of which continue to say the congress is out of scope.
   *
   * So the picture now does a stage-specific job instead of a generic one, and
   * nothing about what it asserts has been widened. `SC-22` stays on the
   * register with its original wording; `SC-24` records the reversal beside it.
   */
  {
    id: 'FS-ky-3',
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
    holderRightsStatus:
      'Bản ghi của BnF ghi `dc:rights` “domaine public” / “public domain”. Tuyên bố của cơ quan giữ hiện vật về bản số hoá họ giữ, chép lại nguyên văn.',
    reuseCondition:
      'Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không bán, không phát sinh doanh thu, nên thuộc nhánh phi thương mại; dòng ghi nguồn được hiển thị ngay cạnh ảnh.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    /*
     * The plate carries an agency number, not a photographer's credit line. The
     * number is recorded here because it is what the item actually bears.
     */
    printedCreatorCredit: 'Số hiệu hãng ảnh ghi tay trên tấm kính: 94.447 (trùng `dc:identifier` “Numéro commercial : Meurisse 94447”)',
    creatorRightsCheck:
      '**CHƯA XÁC LẬP.** Bản ghi của BnF nêu `dc:creator` “Agence de presse Meurisse”, tức hiện vật **có** một người tạo lập được nêu tên. Sản phẩm không tra và không tự kết luận về tình trạng quyền của riêng hãng ảnh ấy. Cùng một lỗ hổng lôgic như hai tờ France-Illustration 1946, chỉ khác niên đại; **cùng một quyết định `USE WITH CAUTION`, để nhất quán** chứ không phải để phân biệt theo tuổi của tài liệu.',
    reuse: 'USE WITH CAUTION',
    eventCheck:
      '**Bản ghi của BnF gắn ảnh với “Congrès communiste de Marseille”, và đại hội ấy nằm NGOÀI phạm vi trích đoạn được giao.** Điều đó không đổi sau khi ảnh được chuyển sang chặng 3 ngày 19-9-2026, và sản phẩm **không bao giờ** dùng ảnh này để minh hoạ đại hội Marseille. Điều được dùng là **niên đại**: bản ghi ghi 1921, mốc 26-12-1921, **nằm trong** thời kỳ của chặng 3 (31-12-1920 đến 3-2-1930). Đây là ảnh **chân dung của thời kỳ**, không phải bằng chứng cho một sự kiện. Bản thân niên đại vẫn **chưa** được một nguồn học thuật được phê duyệt đối chiếu.',
    locationCheck:
      'Chưa xác lập. Bản ghi của BnF không ghi địa điểm chụp; nhan đề chỉ nêu tên đại hội. Sản phẩm không suy ra địa điểm từ tên sự kiện.',
    offlineCheck:
      'Đã đóng gói. Tệp được nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` kiểm tra ảnh giải mã được với naturalWidth khác 0 khi mở từ file://.',
    /*
     * Attached to stage 3 on 19-9-2026, on the record's own DATE and on nothing
     * else. The event in that record - the Marseille congress - remains outside
     * the excerpt and is never illustrated by this picture; `eventCheck` says
     * so in the product, not only here. `SC-22` holds the question as it was
     * asked, `SC-24` the ruling.
     */
    stageId: 'ky-3',
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
    holderRightsStatus:
      'Bản ghi của BnF ghi `dc:rights` “domaine public” / “public domain”. Tuyên bố của cơ quan giữ hiện vật về bản số hoá họ giữ, chép lại nguyên văn.',
    reuseCondition:
      'Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không bán, không phát sinh doanh thu, nên thuộc nhánh phi thương mại; dòng ghi nguồn được hiển thị ngay cạnh ảnh.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    printedCreatorCredit: 'Số hiệu hãng ảnh ghi tay trên tấm kính: 85865 (trùng `dc:identifier` “Numéro commercial : Meurisse 85865”)',
    creatorRightsCheck:
      '**CHƯA XÁC LẬP.** Bản ghi của BnF nêu `dc:creator` “Agence de presse Meurisse”, tức hiện vật **có** một người tạo lập được nêu tên, và sản phẩm không tra, không tự kết luận về tình trạng quyền của riêng hãng ảnh ấy. Đây là ảnh chụp, nên câu hỏi này là câu hỏi thật — khác với một trang in không phát sinh quyền của người chụp. Vì vậy `USE WITH CAUTION`.',
    reuse: 'USE WITH CAUTION',
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
    holderRightsStatus:
      'Bản ghi của BnF ghi `dc:rights` “domaine public” / “public domain”. Tuyên bố của cơ quan giữ hiện vật về bản số hoá họ giữ, chép lại nguyên văn.',
    reuseCondition:
      'Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không bán, không phát sinh doanh thu, nên thuộc nhánh phi thương mại; dòng ghi nguồn được hiển thị ngay cạnh ảnh.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    printedCreatorCredit: null,
    creatorRightsCheck:
      '**KHÔNG PHÁT SINH CÂU HỎI CỦA NGƯỜI CHỤP.** Đây là **trang báo in**, không phải ảnh chụp, nên không có tác quyền nhiếp ảnh nào chồng lên tuyên bố của cơ quan giữ hiện vật. Bản ghi của BnF mô tả **cả số báo** và **không nêu tác giả bài nào**; bài trong ảnh tự ký “NGUYEN-AI-QUAC.” trên bản in. Việc chữ ký ấy thuộc về ai là câu hỏi của trục **nhận diện**, không phải của trục quyền, và được trả lời riêng ở đó.',
    reuse: 'USE',
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
    holderRightsStatus:
      'Bản ghi của BnF ghi `dc:rights` “domaine public” / “public domain”. Tuyên bố của cơ quan giữ hiện vật về bản số hoá họ giữ, chép lại nguyên văn.',
    reuseCondition:
      'Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không bán, không phát sinh doanh thu, nên thuộc nhánh phi thương mại; dòng ghi nguồn được hiển thị ngay cạnh ảnh.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    printedCreatorCredit: null,
    creatorRightsCheck:
      '**KHÔNG PHÁT SINH CÂU HỎI CỦA NGƯỜI CHỤP.** Đây là **bìa một ấn phẩm in**, không phải ảnh chụp. Bản ghi của BnF nêu `dc:creator` “Hô ̀, Chí Minh (1890-1969). Auteur du texte” — tức tác giả **văn bản**, do chính cơ quan giữ hiện vật nêu kèm niên đại. Sản phẩm không tự tính toán thời hạn quyền của bất kỳ ai; nó chép lại điều cơ quan giữ hiện vật tuyên bố và dừng ở đó.',
    reuse: 'USE',
    stageId: 'ky-5',
    status: 'NEED VERIFICATION',
  },

  /* ====================================================================
   * Added 18-9-2026.
   *
   * Four documents, from two holding institutions, found by opening item
   * records rather than by recognising a picture. Nothing below was taken from
   * the reference repository's image folder: that sweep is recorded in
   * REFERENCE_IMAGE_AUDIT.md and produced no asset that could clear the
   * conditions in `FIGURE_REQUIREMENTS`, because that repository records a
   * publisher line and never an archive item record or a usage condition.
   * ==================================================================== */

  /*
   * The place the excerpt opens on, as it was mapped inside the stage's period.
   *
   * Stage 1's first sentence is about Nghệ An. Until now the product named the
   * province and showed no province. This is a printed plate from the colonial
   * administration's own atlas, dated 1909 - inside the stage, which ends
   * 5-6-1911 - and it carries the two places the excerpt goes on to name: the
   * town of Vinh, with its own street plan inset, and the huyện of Nam Đàn.
   *
   * What it is NOT: it is not evidence about any person, and the product does
   * not use it as such. It is a colonial-administration document, named as one,
   * and it establishes a place at a date - nothing else.
   */
  {
    id: 'FS-ky-1-b',
    file: 'tu-lieu/humazur-d610-1400.webp',
    width: 1400,
    height: 1045,
    alt: 'Bản đồ in màu một tỉnh, chữ Pháp. Khung chú dẫn góc trên bên phải đề “PROVINCE DE NGHE-AN”, tỷ lệ “Echelle 1: 900000”, kèm bảng ký hiệu ranh giới, đường sá, đường điện báo, rừng, ruộng và trường học. Thân bản đồ ghi tên các huyện và làng, trong đó có “Hº DE NAM DAN”, “VINH” và “BEN THUY”; phía tây ghi “LAOS”, phía nam ghi “PROVINCE DE HA-TINH”. Góc dưới bên trái là một sơ đồ phố phường chèn thêm, đề “VILLE DE VINH — Echelle au 1:30000”, và một hình bán nguyệt ghi “Répartition de la population — Annamites 99,2 %”.',
    // Kept to the three facts a reader needs beside the sheet: what it is, when
    // it was printed, and what it belongs to. Creators, printer and format are
    // in `identification`, behind `Nguồn và điều kiện`. See the note on the
    // France-Illustration caption for why the inline line is kept short.
    caption:
      'Bản đồ in năm 1909, tấm số XXXII trong “Atlas général de l’Indo-Chine française”. Bản ghi của Humazur ghi nhan đề “Province de Nghe-An”, mô tả “Carte de la province de Nghệ An.”',
    identification:
      'Đây là **bản đồ in, không phải ảnh chân dung** — không có câu hỏi nhận diện người nào, và sản phẩm không dùng tấm này để nói bất cứ điều gì về một con người. Bản ghi của Humazur ghi tác giả “Gallois, Lucien (1857-1941)” và “Chabert-Ostland, Clément-Casimir de (1881-1915)”, nhà in “Imprimerie d’Extrême-Orient (Hanoi-Haiphong)”, khổ “18*24 cm”, số tấm “Planche XXXII”. Tấm bản đồ tự xác nhận là hiện vật được mô tả: dòng “PROVINCE DE NGHE-AN” và tỷ lệ “1:900000” in ngay trên khung chú dẫn, trùng với nhan đề và trường `schema:geo` “1:900.000” trong bản ghi; ký hiệu kho “ASE 2296-65” của bản ghi là ký hiệu của cả tập atlas.',
    eventCheck:
      'Bản ghi của Humazur ghi `dcterms:date` “1909”, và không nêu sự kiện nào — đây là tài liệu hành chính, không phải ảnh sự kiện. Mốc 1909 nằm TRONG thời kỳ của chặng 1 (đến ngày 5-6-1911). **Điều sản phẩm không nói:** bản đồ này không chứng minh, và không được dùng để gợi ý, bất kỳ điều gì về nơi ở hay hoạt động của một cá nhân trong năm ấy.',
    locationCheck:
      'Địa điểm CHÍNH LÀ chủ đề của tài liệu, và do bản ghi nêu: `dcterms:spatial` “Annam (Vietnam)”, mô tả “Carte de la province de Nghệ An.”. Hai địa danh mà trích đoạn được giao nhắc tới — Vinh và vùng Nam Đàn — đọc được trực tiếp trên tấm bản đồ. **Chưa xác lập:** ranh giới hành chính năm 1909 có trùng ranh giới hiện nay hay không; sản phẩm không so sánh hai thứ đó.',
    offlineCheck:
      'Đã đóng gói. Nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` kiểm ảnh giải mã được với naturalWidth khác 0 khi mở từ file://.',
    sourceName:
      'Humazur, thư viện số Université Côte d’Azur — BU Lettres Arts Sciences Humaines, Fonds ASEMI, ký hiệu ASE 2296-65, ark:/17103/d610',
    sourceUrl: 'https://humazur.univ-cotedazur.fr/s/Humazur/item/23566',
    /*
     * Humazur's own conditions name three things a reuser must print: the title,
     * this source line, and the date the file was taken. All three are here.
     */
    credit:
      'Province de Nghe-An — Source : Humazur, bibliothèque numérique d’Université Côte d’Azur - https://humazur.univ-cotedazur.fr; 18/09/2026',
    holderRightsStatus:
      'Bản ghi của Humazur ghi `dcterms:rights` “**Domaine public**”. Tuyên bố của cơ quan giữ hiện vật về bản số hoá họ giữ, chép lại nguyên văn.',
    reuseCondition:
      'Trang “Mentions légales et conditions d’utilisation” của chính Humazur ghi: “La réutilisation non commerciale des contenus est libre et gratuite dans le respect de la législation en vigueur ; la mention de source « Humazur, bibliothèque numérique d’Université Côte d’Azur » doit être maintenue notamment celle figurant dans le filigrane des documents numérisés. La réutilisation commerciale de ces contenus doit faire l’objet d’une licence.” Sản phẩm học tập này thuộc nhánh phi thương mại. Vì điều kiện buộc giữ cả phần ghi nguồn in chìm trên bản quét, tệp giao ra **không cắt cúp**: chỉ thu nhỏ và đổi định dạng.',
    rightsUrl: 'https://humazur.univ-cotedazur.fr/s/Humazur/page/mentions-legales',
    printedCreatorCredit: null,
    creatorRightsCheck:
      '**KHÔNG PHÁT SINH CÂU HỎI CỦA NGƯỜI CHỤP.** Đây là **bản đồ in**, không phải ảnh chụp. Bản ghi của Humazur nêu hai người vẽ — “Gallois, Lucien (1857-1941)” và “Chabert-Ostland, Clément-Casimir de (1881-1915)” — kèm niên đại, do chính cơ quan giữ hiện vật nêu. Sản phẩm **không tự tính thời hạn quyền** từ những niên đại ấy; nó chép lại tuyên bố `Domaine public` của nơi giữ và dừng ở đó.',
    reuse: 'USE',
    stageId: 'ky-1',
    status: 'NEED VERIFICATION',
  },

  /*
   * The newspaper the excerpt says he founded, as its own second issue.
   *
   * Stage 3 prints: `Năm 1922, Người được bầu là Trưởng tiểu ban Nghiên cứu vấn
   * đề dân tộc thuộc địa của Đảng Cộng sản Pháp và sáng lập báo Le Paria bằng
   * tiếng Pháp`. BnF holds the run. This is the issue of 1 May 1922.
   *
   * Two things are read off the sheet itself and kept apart from what the BnF
   * record says: the masthead, and the printed signature `Nguyên aï quâc.` at
   * the foot of the `ZOOLOGIE` column. The BnF record describes the ISSUE and
   * names no article and no author, exactly as with the L'Humanité sheet.
   *
   * A note kept rather than smoothed: the record's own description reads
   * `1922/05/01 (N2)`, so Gallica's earliest held issue is number 2, not the
   * first. The product does not call this the first issue.
   */
  {
    id: 'FS-ky-3-c',
    file: 'tu-lieu/bnf-bpt6k7009345t-f1-1200.webp',
    width: 1200,
    height: 1737,
    alt: 'Trang nhất một tờ báo cũ khổ lớn, giấy ngả vàng, chữ Pháp. Giữa đầu trang là măng-sét chữ lớn “le Paria”, bên phải măng-sét có ba chữ Hán in dọc hàng ngang; ngay dưới là dòng “TRIBUNE DES POPULATIONS DES COLONIES”. Bên trái ghi địa chỉ toà soạn “16, Rue Jacques-Callot, PARIS (6e)”, bên phải ghi “Abonnement, Un an : 3 francs”. Dòng trên cùng ghi “Première Année — N° 2”, “Le Numéro : VINGT-CINQ centimes” và “Lundi 1er Mai 1922”. Thân trang chia năm cột chữ nhỏ; một cột mang tít “ZOOLOGIE” và kết thúc bằng chữ ký in nghiêng “Nguyên aï quâc.”. Cuối trang có một tranh biếm hoạ vẽ nét: một người đội mũ cối cầm lá cờ đề “Civilisation supérieure”, tay kia xách túi, đi trước hai người đang khom lưng. Góc trên bên trái có ký hiệu kho viết tay “Jo.35859” và một con dấu tròn “DÉPÔT LÉGAL”.',
    caption:
      'Trang nhất số báo ngày 1-5-1922. Bản ghi của BnF ghi nhan đề “Le Paria : tribune des populations des colonies”, `dc:creator` “Union intercoloniale. Auteur du texte”, `dc:date` “1922-05-01”, số báo “1922/05/01 (N2)”, nơi xuất bản “[s.n.] (Paris)”.',
    identification:
      'Đọc trực tiếp trên bản quét: măng-sét “le Paria — TRIBUNE DES POPULATIONS DES COLONIES”, và bài dưới tít “ZOOLOGIE” kết thúc bằng chữ ký in “Nguyên aï quâc.” — một lối viết khác với “NGUYEN-AI-QUAC.” in trên L’Humanité năm 1919; cả hai được chép đúng như bản in, không chuẩn hoá về một dạng. Trích đoạn được giao cho biết Người lấy tên Nguyễn Ái Quốc khi hoạt động ở Pháp (Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 29) và nói Người sáng lập báo Le Paria (tr. 30). **Bản ghi của BnF không nêu tên bài và không nêu tác giả bài** — nó mô tả cả số báo. Việc người ký dưới bài này là nhân vật của trích đoạn **chưa được một nguồn học thuật được phê duyệt xác nhận**. Tờ báo tự xác nhận là hiện vật được mô tả: ký hiệu “Jo.35859” viết tay trên đầu trang trùng `dc:source` “…JO-35859”.',
    eventCheck:
      'Ngày do bản ghi nêu và do chính măng-sét in ra: “Lundi 1er Mai 1922”, khớp `dc:date` “1922-05-01”. Trích đoạn in mốc “Năm 1922” cho việc sáng lập báo. **Điều chưa xác lập, và được giữ nguyên chứ không làm phẳng:** bản ghi mô tả số này là “N2”, tức số Gallica giữ sớm nhất là số 2 chứ không phải số đầu tiên; sản phẩm **không** gọi đây là số ra mắt. Việc tờ báo này có đúng là tờ báo mà trích đoạn gọi tên hay không vẫn cần một nguồn học thuật được phê duyệt đối chiếu.',
    locationCheck:
      'Chưa xác lập theo nghĩa nơi chụp hay nơi diễn ra — đây là ấn phẩm, không phải ảnh. Bản ghi chỉ nêu nơi xuất bản “[s.n.] (Paris)”; chính trang báo in địa chỉ toà soạn “16, Rue Jacques-Callot, Paris (6e)”. Sản phẩm chép lại địa chỉ ấy như một dòng in trên báo, không coi đó là một địa điểm đã xác thực.',
    offlineCheck:
      'Đã đóng gói. Nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` kiểm ảnh giải mã được với naturalWidth khác 0 khi mở từ file://.',
    sourceName:
      'Bibliothèque nationale de France, département Droit, économie, politique, JO-35859 — Le Paria, số 2, ngày 1-5-1922',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/bpt6k7009345t',
    credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
    holderRightsStatus:
      'Bản ghi của BnF ghi `dc:rights` “domaine public” / “public domain”. Tuyên bố của cơ quan giữ hiện vật về bản số hoá họ giữ, chép lại nguyên văn.',
    reuseCondition:
      'Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không bán, không phát sinh doanh thu, nên thuộc nhánh phi thương mại; dòng ghi nguồn được hiển thị ngay cạnh ảnh.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    printedCreatorCredit: null,
    creatorRightsCheck:
      '**KHÔNG PHÁT SINH CÂU HỎI CỦA NGƯỜI CHỤP.** Đây là **trang báo in**, không phải ảnh chụp. Bản ghi của BnF nêu `dc:creator` “Union intercoloniale. Auteur du texte” — một tác giả **văn bản** ở dạng tổ chức, không phải người chụp ảnh. Chữ ký in “Nguyên aï quâc.” dưới bài thuộc trục **nhận diện** và được trả lời riêng ở đó.',
    reuse: 'USE',
    stageId: 'ky-3',
    status: 'NEED VERIFICATION',
  },

  /*
   * The first photograph of the subject the product has been able to attach to
   * a stage.
   *
   * Every earlier pass left all five stage anchors blocked, because the one
   * cleared portrait - the Marseille plate, which sat at the opening when this
   * was written and has been the stage 3 anchor since `SC-24` - carries an event
   * the excerpt does not cover. This one is different in the way that matters:
   * the magazine prints his name in the caption under the picture, and its own
   * date, 13-7-1946, falls inside stage 5 (29-1-1941 to 2-9-1969).
   *
   * Everything asserted here is printed ON the sheet: the title block
   * `France ILLUSTRATION`, `N° 41 13 JUILLET 1946 40 FRANCS`, the caption
   * `M. HO CHI MINH A VERSAILLES`, the names in the sub-caption, the
   * cross-reference `Voir l'article pages 29 à 33`, and the photographer credit
   * `Phot. France-Illustration (Parnotte)`.
   *
   * The odd locator is real and is not tidied away: the colour covers and the
   * advertising leaves of this weekly were bound at the END of the volume, so
   * n° 41's cover sits at view f82 of the digital object for the issue of
   * 28-9-1946. Views f80, f81 and f83 either side of it are the advertising
   * leaves from the same gathering, which is how this was checked.
   */
  {
    id: 'FS-ky-5',
    file: 'tu-lieu/bnf-bd6t5144731t-f82-1000.webp',
    width: 1000,
    height: 1380,
    /*
     * Describes what is visible. It names the people the sub-caption names and
     * does not attempt to say which figure in the group is which - the printed
     * caption places only one of them, "à droite", and the product does not
     * improve on that.
     */
    alt: 'Bìa tạp chí in màu. Băng đỏ trên cùng mang măng-sét “France ILLUSTRATION”, dưới đó một khung ghi “N° 41 — 13 JUILLET 1946 — 40 FRANCS”. Chiếm gần trọn bìa là ảnh đen trắng chụp một nhóm người mặc âu phục và quân phục đang đi trên lối sỏi, dưới một hàng cột vòm cong của một công trình đá có đài phun nước; phía sau là hàng cây và nhiều người đứng xem. Người đi giữa hàng đầu mặc áo đại cán sẫm màu, để râu. Góc dưới bên phải ảnh in dòng “Phot. France-Illustration (Parnotte).”, cạnh đó là hai con dấu tròn màu đỏ của thư viện. Dưới ảnh in chú thích “M. HO CHI MINH A VERSAILLES” và dòng nhỏ “Accompagné de M. Danis, directeur général de l’Architecture (à droite), de M. Sainteny et du général Salan, le président de la République viet-namienne traverse le Bosquet de la Colonnade. — Voir l’article pages 29 à 33.”',
    /*
     * Short on purpose, and not short of anything.
     *
     * The caption renders inline beside the picture, so its length is a layout
     * decision as well as an editorial one: the first draft ran the magazine's
     * full sub-caption here, and on a phone the words took more vertical space
     * than the document did, which inverts what a figure is for. What came out
     * is not lost - the sub-caption is reproduced word for word in
     * `identification` and `locationCheck`, both of which are one tap away
     * behind `Nguồn và điều kiện`, and in `alt`. Nothing the publication
     * printed has been dropped from the record; it has been moved to where it
     * is evidence rather than decoration.
     */
    caption:
      'Bìa tuần báo France-Illustration số 41, ngày 13-7-1946. Chú thích in trên bìa: “M. HO CHI MINH A VERSAILLES”. Ảnh ghi “Phot. France-Illustration (Parnotte).”',
    identification:
      '**Người trong ảnh do chính ấn phẩm nêu tên**, ngay dưới bức ảnh. Chú thích in trên bìa, nguyên văn và đầy đủ: “M. HO CHI MINH A VERSAILLES — Accompagné de M. Danis, directeur général de l’Architecture (à droite), de M. Sainteny et du général Salan, le président de la République viet-namienne traverse le Bosquet de la Colonnade. — Voir l’article pages 29 à 33.” Đây là mức chứng cứ khác với một ảnh chỉ được gán tên trong chú thích của người dùng lại sau này — tên nằm trong chính hiện vật, do toà soạn in năm 1946. **Chưa xác lập:** ngoài chi tiết “M. Danis… (à droite)”, bìa không nói ai là ai trong hàng người; sản phẩm **không** chỉ mặt bất kỳ ai trong khung hình và không mô tả người đi giữa là ai. Việc nhân vật mà France-Illustration gọi là “Ho Chi Minh” đúng là nhân vật của trích đoạn vẫn cần một nguồn học thuật được phê duyệt xác nhận.',
    eventCheck:
      'Ấn phẩm nêu hai mốc khác nhau và chúng được giữ tách rời: **ngày xuất bản** “13 JUILLET 1946”, in trên măng-sét; và **sự việc** được chú thích mô tả — một buổi đi qua Bosquet de la Colonnade ở Versailles — mà bìa **không ghi ngày**. Sản phẩm chỉ nêu ngày xuất bản, không suy ra ngày chụp. Mốc 7-1946 nằm TRONG thời kỳ của chặng 5 (từ 29-1-1941 đến 2-9-1969). **Điều chưa xác lập:** trích đoạn được giao **không kể** chuyến đi Pháp năm 1946; ảnh này được dùng làm ảnh chân dung của thời kỳ, không phải bằng chứng cho một sự kiện mà trích đoạn nêu.',
    locationCheck:
      'Địa điểm do chính chú thích in: “A VERSAILLES”, cụ thể hơn là “le Bosquet de la Colonnade”. Đó là lời của ấn phẩm, được chép lại đúng như vậy. **Chưa xác lập:** sản phẩm không đối chiếu độc lập kiến trúc trong ảnh với công trình mang tên ấy.',
    offlineCheck:
      'Đã đóng gói. Nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` mở từng chặng ở chế độ đọc liền mạch và kiểm ảnh giải mã được với naturalWidth khác 0 khi mở từ file://.',
    sourceName:
      'Bibliothèque nationale de France, département Philosophie, histoire, sciences de l’homme, FOL-LC2-6766 — France-Illustration, số 41, ngày 13-7-1946 (bìa màu đóng ở cuối tập, vue f82)',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/bd6t5144731t/f82.item',
    credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
    holderRightsStatus:
      'Bản ghi của BnF cho tập này ghi `dc:rights` “domaine public” / “public domain”. Đó là **tuyên bố của cơ quan giữ hiện vật về bản số hoá mà họ giữ**, và sản phẩm chép lại đúng như vậy — không hơn.',
    reuseCondition:
      'Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không bán, không phát sinh doanh thu, nên thuộc nhánh phi thương mại; dòng ghi nguồn được hiển thị ngay cạnh ảnh.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    printedCreatorCredit: 'Phot. France-Illustration (Parnotte).',
    creatorRightsCheck:
      '**CHƯA XÁC LẬP, và không được đọc thành đã xác lập.** Chính bìa in dòng ghi ảnh “Phot. France-Illustration (Parnotte).”, tức ấn phẩm **có** nêu một người chụp. Sản phẩm **không** tra được, và **không tự kết luận**, về tình trạng quyền của riêng người ấy — nhãn `domaine public` của BnF nói về bản số hoá do BnF giữ, **không** trả lời thay câu hỏi này. Đây là lý do duy nhất khiến quyết định dùng lại của ô này là `USE WITH CAUTION` chứ không phải `USE`, và nó cần một phán quyết của người duyệt.',
    reuse: 'USE WITH CAUTION',
    stageId: 'ky-5',
    status: 'NEED VERIFICATION',
  },

  /*
   * The one passage of stage 5 that is about negotiating with France, beside a
   * photograph of a signature with France.
   *
   * P5-5 prints the window `Từ ngày 2-9-1945 đến ngày 19-12-1946` and inside it
   * `lúc thì tạm hoà hoãn với Pháp`. The article this picture opens is about
   * exactly that: its own text says the Fontainebleau conference ended in a
   * provisional modus vivendi signed on the night of 14-15 September 1946.
   *
   * The excerpt does not name the conference, and neither does the product's
   * claim: the caption reproduces the magazine's line and nothing more.
   */
  {
    id: 'FS-ky-5-c',
    file: 'tu-lieu/bnf-bd6t5144731t-f3-1100.webp',
    width: 1100,
    height: 1534,
    alt: 'Một trang tạp chí, chữ Pháp. Đầu trang là tít hai dòng “APRÈS L’ACCORD DE PRINCIPE — FRANCO-VIETNAMIEN”, dưới đó ghi “par Max André”. Giữa trang là ảnh đen trắng chụp trong nhà: hai người đàn ông đứng bắt tay nhau hai bên một pho tượng Phật bằng đồng đặt trên bệ. Người bên trái gầy, để râu, mặc áo đại cán sẫm màu, tay trái cầm điếu thuốc; người bên phải đeo kính, tóc bạc, mặc com-lê kẻ. Dưới ảnh in chú thích in nghiêng “M. Ho Chi Minh et M. Marius Moutet après la signature de l’accord.” Nửa dưới trang là ba cột chữ nhỏ. Góc dưới bên phải in số trang 295.',
    caption:
      'Trang 295 của France-Illustration số 52, ngày 28-9-1946, mở đầu bài “Après l’accord de principe franco-vietnamien” của Max André. Chú thích ảnh do chính trang in: “M. Ho Chi Minh et M. Marius Moutet après la signature de l’accord.”',
    identification:
      '**Hai người trong ảnh do chính ấn phẩm nêu tên**, trong chú thích in ngay dưới ảnh: “M. Ho Chi Minh et M. Marius Moutet”. Chú thích không nói ai đứng bên nào, và sản phẩm cũng không nói. Việc nhân vật mà France-Illustration gọi là “Ho Chi Minh” đúng là nhân vật của trích đoạn vẫn cần một nguồn học thuật được phê duyệt xác nhận.',
    eventCheck:
      'Ba lớp dữ kiện, giữ tách rời: (1) **ngày xuất bản** do bản ghi và măng-sét nêu — 28-9-1946, số 52; (2) **sự việc** do chính bài báo nêu trong thân bài — hội nghị Fontainebleau “ouverte à Fontainebleau le 6 juillet” kết thúc bằng một “modus vivendi provisoire signé par le président Ho Chi Minh et M. Marius Moutet dans la nuit du 14 au 15 septembre 1946”; (3) **trích đoạn được giao** không nêu tên hội nghị này và không nêu văn kiện này — nó chỉ in khoảng “Từ ngày 2-9-1945 đến ngày 19-12-1946” và cụm “lúc thì tạm hoà hoãn với Pháp”. Sản phẩm **không** gán sự kiện của bài báo cho câu của trích đoạn; ảnh đứng cạnh đoạn ấy như một tài liệu đương thời của cùng khoảng thời gian.',
    locationCheck:
      'Chưa xác lập. Bài báo và chú thích không nêu nơi chụp; ảnh chụp trong một căn phòng không được ấn phẩm định danh. Sản phẩm không suy ra địa điểm từ tên hội nghị.',
    offlineCheck:
      'Đã đóng gói. Nhúng dạng data URI vào bản một-tệp ngoại tuyến; `npm run check:offline` kiểm ảnh giải mã được với naturalWidth khác 0 khi mở từ file://.',
    sourceName:
      'Bibliothèque nationale de France, département Philosophie, histoire, sciences de l’homme, FOL-LC2-6766 — France-Illustration, số 52, ngày 28-9-1946, tr. 295',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/bd6t5144731t/f3.item',
    credit: 'Source gallica.bnf.fr / Bibliothèque nationale de France',
    holderRightsStatus:
      'Bản ghi của BnF cho tập này ghi `dc:rights` “domaine public” / “public domain”. Như với bìa số 41: đó là tuyên bố của cơ quan giữ hiện vật **về bản số hoá họ giữ**, chép lại nguyên văn.',
    reuseCondition:
      'Điều kiện sử dụng của Gallica ghi: “La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »”. Sản phẩm học tập này không bán, không phát sinh doanh thu, nên thuộc nhánh phi thương mại; dòng ghi nguồn được hiển thị ngay cạnh ảnh.',
    rightsUrl: 'https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica',
    /*
     * The page itself prints no photographer line under this picture, unlike
     * the cover. That is recorded as what it is - the page carries no credit -
     * and NOT as "there is no photographer". An absent credit line settles
     * nothing; it only means the item does not name anyone.
     */
    printedCreatorCredit: null,
    creatorRightsCheck:
      '**CHƯA XÁC LẬP.** Trang này **không in** dòng ghi người chụp dưới bức ảnh — khác bìa số 41, vốn có in. Việc trang không nêu tên **không có nghĩa là không có người chụp**; nó chỉ có nghĩa là hiện vật không nêu ai. Cùng một ấn phẩm năm 1946, cùng một câu hỏi chưa trả lời, nên quyết định dùng lại giữ nguyên mức `USE WITH CAUTION` như bìa số 41, chờ phán quyết của người duyệt.',
    reuse: 'USE WITH CAUTION',
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
  /*
   * EMPTIED 19-9-2026, and deliberately kept declared.
   *
   * The document that filled this position moved to stage 3, where its own
   * recorded date puts it and where it does a stage-specific job instead of a
   * generic one (`SC-24`). Two things were considered and rejected for this
   * slot: leaving the same picture in both places, which the brief rules out as
   * a repeated portrait card and which would have bought nothing but a fuller
   * screen; and deleting the position, which would have made a gap disappear
   * rather than report it - AGENTS.md section 4 requires an empty evidence
   * field to stay visibly blocked.
   *
   * So the opening now carries what it already had beside the figure: the
   * title, the two-line introduction, one primary action, and the journey
   * thread that draws itself in below. If a document is ever found whose job
   * is genuinely to open the whole product rather than one stage, it goes here.
   */
  {
    id: 'FS-open',
    stageId: null,
    kind: 'primary',
    /*
     * Kept short deliberately, and the reason is measured rather than felt.
     *
     * The first version of this role ran about fifty words and rendered inline
     * on the front door, where the photograph used to be. Two numbers from
     * `tools/audit-density.mjs`: the opening's first-screen word count went
     * from 85 to 150 on a phone, and `tools/word-budget.mjs` moved the opening
     * from `over, close` to `OK` - not because there was less to read, but
     * because a blocked figure's line is classed as apparatus rather than
     * prose. A verdict improving while the screen got wordier is a measurement
     * flattering the product, which is the one thing these tools exist to stop.
     *
     * So the sentence was cut instead of reclassified. What a reader needs on
     * the front door is that the position is empty and roughly what belongs in
     * it; why it emptied is one control away, and the full record is on the
     * verification page with `SC-24`.
     */
    role: 'Một tư liệu mở ra CẢ hành trình, không phải tư liệu của riêng một chặng. Trống từ 19-9-2026, khi tấm ảnh ở đây chuyển sang đúng chặng mà niên đại của nó thuộc về.',
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
    role: 'Cho thấy vùng đất mà câu mở đầu của chặng gọi tên, đúng ở một thời điểm nằm trong chặng, để “Nghệ An” là một địa hình có Vinh và Nam Đàn trên đó chứ không chỉ là một địa danh đọc lướt qua.',
    /*
     * MOVED 18-9-2026: from the turning point to the stage's first passage.
     *
     * The anchor used to sit on TP1, the departure of 5-6-1911. The document
     * that filled the position is a map of the province the stage OPENS on, and
     * a map of Nghệ An beside the moment of leaving the country would have
     * pointed at the wrong sentence. P1-1 is the sentence about Nghệ An.
     */
    anchor: { where: 'passage', id: 'P1-1' },
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
    /*
     * Rewritten 19-9-2026 with the reassignment. The old sentence - "nối người
     * trong ảnh với thời kỳ hình thành những nội dung cơ bản" - described a
     * position nobody could fill, because it asked an image to stand for what
     * the stage was ABOUT. The role now states the narrower job the picture
     * actually does, and states the limit in the same breath, so the boundary
     * travels with the position rather than living only in the record.
     */
    role: 'Cho người học thấy khuôn mặt của nhân vật trong chính thời kỳ này — bản ghi của nơi giữ hiện vật ghi niên đại 26-12-1921, nằm trong khoảng 31-12-1920 đến 3-2-1930. Đây là chân dung của thời kỳ, KHÔNG phải minh hoạ cho một sự kiện: sự kiện trong bản ghi nằm ngoài trích đoạn và không bao giờ được sản phẩm dẫn ra.',
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
    id: 'FS-ky-3-c',
    stageId: 'ky-3',
    kind: 'supporting',
    role: 'Đặt người học trước chính tờ báo mà trích đoạn nói Người sáng lập, để câu “sáng lập báo Le Paria” có một măng-sét, một địa chỉ toà soạn và một chữ ký in ở cuối bài, thay vì một cái tên trong ngoặc.',
    anchor: { where: 'passage', id: 'P3-4' },
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
  {
    id: 'FS-ky-5-c',
    stageId: 'ky-5',
    kind: 'supporting',
    role: 'Đặt một tài liệu đương thời cạnh câu nói về giai đoạn “tạm hoà hoãn với Pháp”, để cụm sách lược ấy có một hình ảnh cụ thể của việc thương lượng thay vì chỉ là một mệnh đề.',
    anchor: { where: 'passage', id: 'P5-5' },
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
      'ĐỦ CĂN CỨ CHO Ô FS-open. (A) Nguồn gốc: do BnF giữ, có ký hiệu kho và số hiệu hãng ảnh, số này hiện ngay trên tấm kính. (B) Dữ kiện chú thích: ngày và sự kiện là do BnF ghi; chú thích trong sản phẩm chỉ chép lại đúng lời BnF, không thêm. (C) Điều kiện sử dụng: xem SC-5. Lưu ý: sự kiện trong bản ghi là Đại hội Marseille tháng 12-1921, KHÔNG nằm trong trích đoạn được giao, nên ảnh này không được gắn vào chặng nào. ⚠️ **ĐÍNH CHÍNH 19-9-2026 — xem `SC-24`:** câu cuối (“không được gắn vào chặng nào”) **đã bị lật**. Ảnh nay là ô ảnh chính của chặng 3, trên căn cứ **niên đại** 26-12-1921 nằm trong khoảng của chặng — không phải trên căn cứ sự kiện. **Điều vẫn đúng và không đổi:** Đại hội Marseille nằm ngoài trích đoạn, và ảnh **không bao giờ** được dùng để minh hoạ đại hội ấy. Thêm nữa, theo `SC-26`, vế (C) ở trên chỉ trả lời cho bản số hoá: quyền của hãng ảnh Meurisse **CHƯA XÁC LẬP**, nên quyết định dùng lại là `USE WITH CAUTION`.',
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
      'ỨNG VIÊN MẠNH, **chưa điền**. Đây là một kho mới mà nhóm chưa từng dùng; bản ghi và trang điều khoản do một tác nhân nghiên cứu mở, **người viết bản ghi này chưa tự mở lại trang điều khoản của Humazur**. Theo đúng kỷ luật “tự kiểm trước khi đưa vào sản phẩm”, vị trí `FS-ky-1-b` vẫn để trống cho tới khi có người mở lại và xác nhận. **ĐÍNH CHÍNH 18-9-2026:** việc mở lại ấy đã làm và được ghi ở `SC-18`; `FS-ky-1-b` **nay đã điền**, và bảng vị trí ngay trên trang này hiển thị đúng như vậy. Bản ghi cũ giữ nguyên vì nó ghi đúng trạng thái tại thời điểm viết, nhưng câu “vẫn để trống” **không còn đúng** và trước dòng đính chính này thì hai bảng trên cùng một trang đã mâu thuẫn nhau. Trạng thái xác thực của tài liệu vẫn là `NEED VERIFICATION`: điều đã thay đổi là vị trí đã có tài liệu, không phải tài liệu đã được xác thực.',
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

  /* ====================================================================
   * Vòng kiểm thứ tư, 18-9-2026.
   *
   * Vòng này bắt đầu từ kho ảnh của một kho tham khảo có sẵn trên máy, theo
   * đúng thứ tự mà đề bài đặt ra: tìm tại chỗ trước, ra ngoài sau. Kết quả của
   * bước tìm tại chỗ được ghi ở SC-16 và trong REFERENCE_IMAGE_AUDIT.md.
   * ==================================================================== */
  {
    id: 'SC-16',
    url: 'https://github.com/PhamXuanKhang/creative_product_HCM202',
    kind: 'Kho tham khảo đặt sẵn trên máy (`_reference/creative_product_HCM202`) — quét toàn bộ ảnh và siêu dữ liệu đi kèm',
    found:
      'Tệp `src/data/hcm_data.json` khai 41 sự kiện với **68 mục media**. Mỗi ảnh có một trường `sourceMedia` dạng một dòng, ví dụ “Nguồn: Báo Quân đội nhân dân”, “Nguồn: Bộ Tư Lệnh Lăng”, “Nguồn: Traveloka”, “Nguồn: LalaGo”, “Nguồn: Mia.vn”, “Nguồn: WEBTECH360”. **16 tệp ảnh** nằm trong `public/image/`; số còn lại là liên kết nóng tới máy chủ của báo chí và trang thương mại. **Không có ảnh nào kèm: trang bản ghi hiện vật, ký hiệu kho, tên người chụp, hay một dòng điều kiện sử dụng.** Giấy phép MIT ở gốc kho chỉ phủ mã nguồn, không phủ ảnh của bên thứ ba.',
    blocker:
      'Kho này dùng được với tư cách **nguồn phát hiện**, không phải nguồn xác thực — đúng như đề bài phân biệt. Không mục nào trong **68 mục** qua được điều kiện 1 và 2 của `FIGURE_REQUIREMENTS` (mở được trang bản ghi hiện vật; đọc được nguyên văn điều kiện sử dụng). **Ghi rõ trạng thái:** đây là CHƯA XÁC LẬP ĐIỀU KIỆN SỬ DỤNG, **không phải** “bị cấm dùng lại” — hai trạng thái khác nhau, và lần kiểm 16-17/9 đã một lần nhầm hai thứ đó. Ba manh mối đáng lần tiếp, đều dẫn tới cơ quan thật: baotanglichsu.vn (Bảo tàng Lịch sử Quốc gia), baotanghochiminh.vn (xem SC-1), và một tệp Commons dẫn về TIMEA của Đại học Rice. Không tệp nào trong ba nhóm ấy mở ra được bản ghi hiện vật trong vòng kiểm này. Bảng đầy đủ **68 dòng** nằm ở REFERENCE_IMAGE_AUDIT.md. *(Đính chính 19-9-2026: bản ghi này ban đầu in “58 đường dẫn ảnh”, “20 tệp” và “58 dòng”. Cả ba đều **đếm sai** — số đúng, đếm bằng máy từ chính tệp JSON, là 68 mục media và 16 tệp cục bộ, và đó là số mà REFERENCE_IMAGE_AUDIT.md đã in từ đầu. Trang này từng mâu thuẫn với tài liệu ấy.)*',
    outcome: 'rejected',
  },
  {
    id: 'SC-17',
    url: 'https://commons.wikimedia.org/wiki/Category:Ho_Chi_Minh_documents',
    kind: 'Kho ảnh cộng đồng — mở hạng mục tài liệu và đọc siêu dữ liệu từng tệp qua API',
    found:
      'Năm ứng viên được mở tận nơi. “Thẻ căn cước Nguyễn Ái Quấc, 4-9-1919”: 283×415 điểm ảnh, trường Credit dẫn một blog (danlambaovn.blogspot.com). “Secret service report 15-9-1919” và “security report 1920”: trường Credit có nhắc “Trung tâm Lưu trữ quốc gia I” và “(Nguồn: ANOM)” nhưng **không kèm số hồ sơ, ký hiệu hay trang bản ghi nào ở hai cơ quan đó**. “Lời kêu gọi toàn quốc kháng chiến 19-12-1946”: Credit dẫn một bài báo của Bảo tàng Lịch sử Quốc gia kèm ba liên kết “Ecosia search”. “Le Procès de la Colonisation Française”: Artist ghi là người tải lên trên Wikipedia tiếng Việt, 450×679. “Thanh Niên 1926”: Credit ghi “Own work” cho một tờ báo năm 1926.',
    blocker:
      '**Không tệp nào dùng được.** Lý do ghi tách rời: (a) nhãn “Public domain” trên Commons là kết luận của cộng đồng, không phải tuyên bố của cơ quan giữ hiện vật; (b) không tệp nào mở ra một trang hiện vật để kiểm; (c) một tệp dẫn thẳng tới trang kết quả tìm kiếm, mà quy tắc của dự án loại thẳng. Đây lại là trạng thái CHƯA XÁC LẬP, không phải “bị cấm”. **Manh mối để người sau lần tiếp:** hai bản báo cáo mật thám có thể có thật ở ANOM hoặc Trung tâm Lưu trữ quốc gia I; muốn dùng thì phải mở hồ sơ ở chính hai nơi đó, không phải trích lại Commons.',
    outcome: 'rejected',
  },
  {
    id: 'SC-18',
    url: 'https://humazur.univ-cotedazur.fr/s/Humazur/page/mentions-legales',
    kind: 'Université Côte d’Azur — Humazur, trang điều kiện sử dụng, **lần này do chính người viết bản ghi mở và đọc**',
    found:
      'Trang ghi ba chế độ tách bạch. Bản ghi mô tả tài liệu: CC BY 4.0. Nội dung có giấy phép mở: CC BY-SA 4.0. Tài liệu thuộc phạm vi Luật 78-753: “La réutilisation non commerciale des contenus est libre et gratuite dans le respect de la législation en vigueur ; la mention de source « Humazur, bibliothèque numérique d’Université Côte d’Azur » doit être maintenue notamment celle figurant dans le filigrane des documents numérisés. La réutilisation commerciale de ces contenus doit faire l’objet d’une licence.” Trang cũng nêu ba thứ bắt buộc phải ghi khi dùng lại: nhan đề, dòng “Source : Humazur, bibliothèque numérique d’Université Côte d’Azur - https://humazur.univ-cotedazur.fr;”, và ngày lấy tệp.',
    blocker:
      'GỠ ĐƯỢC ĐIỂM TREO CỦA SC-13. Bản ghi hiện vật 23566 ghi `dcterms:rights` “Domaine public”, nên tấm bản đồ rơi vào nhánh phi thương mại của đoạn Luật 78-753. Sản phẩm học tập này không bán, không tạo doanh thu. Ba dòng bắt buộc được in ngay cạnh ảnh. Vì điều kiện buộc **giữ cả phần ghi nguồn in chìm trên bản quét**, tệp giao ra không cắt cúp — chỉ thu nhỏ và đổi sang WebP. Đã điền vào `FS-ky-1-b`.',
    outcome: 'cleared',
  },
  {
    id: 'SC-19',
    url: 'https://gallica.bnf.fr/ark:/12148/bpt6k7009345t',
    kind: 'BnF Gallica — tờ Le Paria, mở bản ghi số báo và xem tận mắt trang nhất',
    found:
      'Truy vấn `(dc.title all "Paria") and (dc.type all "fascicule")` trả về bản ghi bộ báo `cb32832110q`: “Le Paria : tribune des populations des colonies”, 1922-1926, 23 số. Bản ghi số đầu tiên Gallica giữ: `dc:date` “1922-05-01”, `dc:description` “1922/05/01 (N2)”, `dc:creator` “Union intercoloniale. Auteur du texte”, `dc:source` “Bibliothèque nationale de France, département Droit, économie, politique, JO-35859”, `dc:rights` “domaine public”. Xem trực tiếp trang nhất: măng-sét “le Paria — TRIBUNE DES POPULATIONS DES COLONIES”, “Première Année — N° 2”, “Lundi 1er Mai 1922”, địa chỉ “16, Rue Jacques-Callot, PARIS (6e)”; bài dưới tít “ZOOLOGIE” kết thúc bằng chữ ký in “Nguyên aï quâc.”; góc trang có ký hiệu kho viết tay “Jo.35859” trùng `dc:source`, kèm dấu “DÉPÔT LÉGAL”.',
    blocker:
      'Đã điền vào `FS-ky-3-c`. Ba lớp giữ tách rời, như với tờ L’Humanité: (1) bản ghi BnF mô tả **cả số báo**, không nêu tên bài và không nêu tác giả bài; (2) chính trang báo in măng-sét và chữ ký; (3) trích đoạn nói Người “sáng lập báo Le Paria”. **Một điểm không làm phẳng:** số Gallica giữ sớm nhất mang số 2, nên sản phẩm không gọi đây là số ra mắt. Lưu ý thêm: lần kiểm SC-9 đã tìm “Le Paria” và kết luận không có — kết luận ấy **sai vì cách đặt truy vấn**, không phải vì Gallica thiếu tài liệu; bản ghi vẫn giữ lại ở SC-9 để thấy sai ở đâu.',
    outcome: 'cleared',
  },
  {
    id: 'SC-20',
    url: 'https://gallica.bnf.fr/ark:/12148/bd6t5144731t/f82.item',
    kind: 'BnF Gallica — tuần báo France-Illustration năm 1946, mở bản ghi tập và xem tận mắt bìa số 41',
    found:
      'Bản ghi tập: `dc:title` “France-Illustration”, `dc:description` “1946/09/28 (A2,N52)”, `dc:source` “Bibliothèque nationale de France, département Philosophie, histoire, sciences de l’homme, FOL-LC2-6766”, `dc:rights` “domaine public”, 129 vue ảnh. Xem trực tiếp vue f82: bìa in màu, măng-sét “France ILLUSTRATION”, khung “N° 41 — 13 JUILLET 1946 — 40 FRANCS”, ảnh chiếm gần trọn bìa, chú thích in “M. HO CHI MINH A VERSAILLES — Accompagné de M. Danis, directeur général de l’Architecture (à droite), de M. Sainteny et du général Salan, le président de la République viet-namienne traverse le Bosquet de la Colonnade. — Voir l’article pages 29 à 33.”, ghi ảnh “Phot. France-Illustration (Parnotte).”, kèm hai dấu tròn của thư viện.',
    blocker:
      'Đã điền vào `FS-ky-5` — **vị trí ảnh chính đầu tiên của một chặng được điền**. Điều làm nó khác tấm Marseille ở màn mở đầu: tên người **do chính ấn phẩm in dưới ảnh**, và ngày in 13-7-1946 nằm trong thời kỳ của chặng 5. **Định vị lạ, ghi đúng chứ không dọn cho gọn:** bìa màu và các trang quảng cáo của tuần báo được đóng ở CUỐI tập, nên bìa số 41 nằm ở vue f82 của đối tượng số hoá mang số 28-9-1946. Đã kiểm bằng cách mở f80, f81 và f83 — cả ba đều là trang quảng cáo cùng tay sách. **Chưa xác lập:** trích đoạn được giao không kể chuyến đi Pháp năm 1946, nên ảnh được dùng làm chân dung của thời kỳ, không phải bằng chứng cho một sự kiện trích đoạn nêu; và nhãn “domaine public” cho một ấn phẩm 1946 là tuyên bố của BnF, sản phẩm chép lại chứ không tự kết luận thay.',
    outcome: 'cleared',
  },
  {
    id: 'SC-21',
    url: 'https://gallica.bnf.fr/ark:/12148/bd6t5144731t/f3.item',
    kind: 'BnF Gallica — France-Illustration số 52, trang 295, đọc cả ảnh lẫn thân bài',
    found:
      'Xem trực tiếp: tít “APRÈS L’ACCORD DE PRINCIPE — FRANCO-VIETNAMIEN par Max André”; ảnh giữa trang với chú thích in nghiêng “M. Ho Chi Minh et M. Marius Moutet après la signature de l’accord.”; thân bài mở đầu: “La Conférence franco-vietnamienne, ouverte à Fontainebleau le 6 juillet… s’est terminée par un modus vivendi provisoire signé par le président Ho Chi Minh et M. Marius Moutet dans la nuit du 14 au 15 septembre 1946.” Số trang in ở chân trang: 295.',
    blocker:
      'Đã điền vào `FS-ky-5-c`, gắn vào đoạn P5-5. Ba lớp giữ tách rời: ngày **xuất bản** (28-9-1946), **sự việc** mà bài báo thuật (ký modus vivendi đêm 14 rạng 15-9-1946), và **điều trích đoạn in** (chỉ nêu khoảng “từ 2-9-1945 đến 19-12-1946” và cụm “tạm hoà hoãn với Pháp”). **Trích đoạn không nêu tên hội nghị này và không nêu văn kiện này** — ảnh đứng cạnh đoạn ấy như tài liệu đương thời cùng khoảng thời gian, không phải minh hoạ cho một sự kiện trích đoạn kể.',
    outcome: 'cleared',
  },
  {
    id: 'SC-22',
    url: 'https://gallica.bnf.fr/ark:/12148/btv1b9054078w',
    kind: 'Câu hỏi để ngỏ, ghi lại thay vì tự quyết — tấm chân dung Marseille và ô ảnh chính của chặng 3',
    found:
      'Bản ghi của BnF ghi niên đại “1921” và mốc “26 décembre 1921” cho tấm chân dung đang dùng ở màn mở đầu. Mốc ấy **nằm trong** thời kỳ của chặng 3 (từ 31-12-1920 đến 3-2-1930). Đề bài của đợt này cho phép dùng một tấm chân dung làm neo của chặng nếu giao diện trình bày nó **chỉ như một chân dung** và không ngụ ý tương đương về sự kiện hay ngày tháng. Đã tra lại toàn bộ 39 tấm cùng lô “Congrès communiste de Marseille” trên Gallica: **chỉ một tấm duy nhất** có nhắc đại biểu Đông Dương, chính là tấm đang dùng.',
    blocker:
      '**KHÔNG tự chuyển.** Có thể lập luận rằng tấm này đủ điều kiện làm ảnh chính của chặng 3. Nhưng nó đang là cửa vào của cả sản phẩm, và đề bài cấm lặp lại cùng một tấm chân dung ở hai chỗ; chuyển nó đi thì màn mở đầu trống. Hai hướng loại trừ nhau, và lần quyết định trước — để tấm này ngoài mọi chặng vì sự kiện trong bản ghi nằm ngoài trích đoạn — là một quyết định đã ghi rõ lý do. **Lật một quyết định như thế là việc của người duyệt, không phải của tác nhân.** Ghi lại ở đây để có người trả lời: ô ảnh chính của chặng 3 vẫn trống, và trống vì lý do này chứ không phải vì không tìm được gì.',
    outcome: 'unresolved',
  },
  {
    id: 'SC-23',
    url: 'https://gallica.bnf.fr/services/Issues?ark=ark:/12148/cb327877302/date&date=1920',
    kind: 'BnF Gallica — tra các tài liệu còn lại mà trích đoạn gọi tên, cho chặng 2 và chặng 4',
    found:
      'Số L’Humanité ngày 4-11-1920 có trên Gallica (`bpt6k299842n`) — đây là bài thứ hai mà đoạn P3-2 dẫn tên: “Ở Đông Dương, báo L’Humanité 4-11-1920”. **Số này không có lớp văn bản**: cả `texteBrut` lẫn ContentSearch đều trả về rỗng, nên không định vị được bài bằng máy. Với chặng 4: không tra được tài liệu nào mà trích đoạn gọi tên — trích đoạn nêu nghị quyết Hội nghị Trung ương tháng 10-1930, thời gian ở Liên Xô 1934-1938, và Hội nghị Trung ương lần thứ tám tháng 5-1941, không nêu một ấn phẩm hay hiện vật nào có thể tra ở kho châu Âu.',
    blocker:
      'Hai kết quả khác nhau, ghi tách rời. (1) Số 4-11-1920: **có thể lần tiếp**, nhưng phải lật từng trang bằng mắt; và dù tìm được thì đặt thêm một trang L’Humanité nữa cạnh trang đã dùng ở `FS-ky-3-b` sẽ thành hai tấm gần như trùng nhau, đúng thứ mà đề bài gọi là “thẻ ảnh lặp lại”. Chưa điền. (2) Chặng 4: **hai ô `FS-ky-4` và `FS-ky-4-b` hiện chưa có tài liệu nào đạt yêu cầu chứng cứ và điều kiện dùng lại của dự án.** ⚠️ **ĐÍNH CHÍNH 19-9-2026 — xem `SC-25`:** bản ghi này ban đầu viết “trống vì trích đoạn ở chặng này không gọi tên một hiện vật nào để lần”, một cách nói **quá mạnh**. Điều đúng là: **các truy vấn đã thực hiện, ở các kho đã mở, chưa trả về gì**. Đó không phải bằng chứng rằng không kho nào trên thế giới có tài liệu phù hợp.',
    outcome: 'unresolved',
  },

  /* ====================================================================
   * Ba phán quyết của dự án, 19-9-2026.
   *
   * Cả ba đều do người quyết định, không phải do tác nhân tự quyết. Chúng
   * được ghi ở đây, cạnh chính những câu hỏi đã nêu ra, chứ không thay thế
   * những câu hỏi ấy: `SC-20`, `SC-22` và `SC-23` giữ nguyên lời cũ.
   * ==================================================================== */
  {
    id: 'SC-24',
    url: 'https://gallica.bnf.fr/ark:/12148/btv1b9054078w',
    kind: 'PHÁN QUYẾT CỦA DỰ ÁN — trả lời câu hỏi mà `SC-22` để ngỏ',
    found:
      '`SC-22` ngày 18-9 nêu câu hỏi và **cố ý không tự trả lời**: tấm chân dung Marseille mang mốc 26-12-1921 của BnF, **nằm trong** thời kỳ của chặng 3 (31-12-1920 đến 3-2-1930), nhưng nó đang là ảnh mở đầu của cả sản phẩm và một quyết định trước đó đã ghi rõ lý do để nó ngoài mọi chặng. Ngày 19-9 dự án ra phán quyết: **chuyển tấm ảnh sang ô ảnh chính của chặng 3.**',
    blocker:
      '**ĐÃ CHUYỂN.** Lý do của phán quyết, và giới hạn của nó, ghi tách rời. **Điều lập luận cũ nói đúng và vẫn đúng:** đại hội Marseille **không** nằm trong trích đoạn, và ảnh này **không bao giờ** được dùng để minh hoạ đại hội ấy — trường `eventCheck` nói đúng câu đó, và nó hiển thị trong sản phẩm chứ không chỉ nằm trong mã. **Điều lập luận cũ làm sai:** nó để một dữ kiện về **SỰ KIỆN** quyết định một câu hỏi về **THỜI KỲ**. Một bức chân dung đặt đúng tư cách chân dung nói về diện mạo của nhân vật trong một khoảng thời gian, không nói về một sự kiện. **Hệ quả cho màn mở đầu:** ô `FS-open` nay trống và **vẫn được khai báo**, hiện rõ là đang bị chặn. Hai phương án bị loại: giữ cùng một tấm ở cả hai chỗ (đề bài cấm “thẻ chân dung lặp lại”, và việc nhân đôi không thêm gì ngoài một màn hình đầy hơn), và xoá hẳn ô ấy (làm biến mất một khoảng trống thay vì báo cáo nó). **Một quyết định đã ghi lý do vẫn có thể bị lật khi có căn cứ tốt hơn — điều không được phép là lật nó trong im lặng.**',
    outcome: 'cleared',
  },
  {
    id: 'SC-25',
    url: 'https://gallica.bnf.fr/services/Issues?ark=ark:/12148/cb327877302/date&date=1920',
    kind: 'PHÁN QUYẾT CỦA DỰ ÁN — chặng 4 không bị đóng vĩnh viễn',
    found:
      'Bản ghi `SC-23` ngày 18-9 kết luận về chặng 4 bằng câu “trống vì trích đoạn ở chặng này không gọi tên một hiện vật nào để lần”, và báo cáo tổng kết nói “không có gì để lần ở kho châu Âu”. Cả hai cách nói đều **suy từ “các truy vấn đã làm không trả về gì” thành “không có gì tồn tại”**.',
    blocker:
      '**SỬA CÁCH NÓI, GIỮ SỰ THẬT.** Trạng thái đúng của chặng 4 là: **`BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`** — hiện chưa có tài liệu nào đạt yêu cầu chứng cứ và điều kiện dùng lại của dự án. Việc kho tham khảo không cung cấp được tư liệu truy nguyên được **không chứng minh** rằng không tồn tại tư liệu phù hợp ở nơi khác. Các hướng còn để ngỏ, chưa thử: Trung tâm Lưu trữ quốc gia I và III, Bảo tàng Hồ Chí Minh, Bảo tàng Lịch sử Quốc gia, Thư viện Quốc gia Việt Nam, các kho lưu trữ ở Liên bang Nga và Trung Quốc cho giai đoạn 1934-1940, và ANOM cho hồ sơ hành chính thuộc địa. **Không được đưa bất cứ thứ gì vào cho tới khi nguồn gốc, liên quan tới chặng và điều kiện dùng lại cùng vượt qua quy trình của dự án.** Thư xin phép vẫn **chưa gửi cho ai** — đó là **một con đường còn để ngỏ, không phải bằng chứng rằng chặng 4 là bất khả**.',
    outcome: 'unresolved',
  },
  {
    id: 'SC-26',
    url: 'https://gallica.bnf.fr/ark:/12148/bd6t5144731t/f82.item',
    kind: 'PHÁN QUYẾT CỦA DỰ ÁN — giữ tư liệu BnF năm 1946, nhưng xếp loại dè dặt',
    found:
      '`SC-20` ngày 18-9 nêu rằng nhãn `domaine public` của BnF cho một ấn phẩm năm **1946** là tuyên bố của cơ quan giữ hiện vật, và bìa số 41 **có in** dòng ghi ảnh “Phot. France-Illustration (Parnotte).”. Câu hỏi để ngỏ: tuyên bố ấy có nói gì về quyền của riêng người chụp không?',
    blocker:
      '**GIỮ TƯ LIỆU, XẾP LOẠI DÈ DẶT.** Phán quyết: hai tờ France-Illustration 1946 **được giữ lại** trong sản phẩm, nhưng mang quyết định dùng lại **`USE WITH CAUTION`**, và **bốn trục quyền được lưu tách rời** thay vì gộp thành một câu: (1) **nơi giữ tuyên bố gì** — `dc:rights` “domaine public” của BnF, về bản số hoá họ giữ; (2) **điều kiện dùng lại** — điều khoản Gallica, nhánh phi thương mại, bắt buộc giữ dòng ghi nguồn; (3) **ghi người tạo lập in trên hiện vật** — “Phot. France-Illustration (Parnotte).” trên bìa số 41, **không có** trên trang 295; (4) **quyền của người tạo lập** — **CHƯA XÁC LẬP**. Điều tuyệt đối không được làm, và không được làm: biến (1) thành “đã kiểm chứng độc lập quyền của người chụp”. Hai thứ ấy khác nhau, và khoảng cách giữa chúng nay có một trường riêng để nói ra. **Cùng một lôgic được áp cho hai tấm ảnh báo chí Agence Meurisse 1920/1921** (`FS-ky-3`, `FS-ky-2-b`) — cũng `USE WITH CAUTION` — vì lỗ hổng là như nhau, chỉ khác niên đại; xếp loại theo tuổi tài liệu sẽ là suy đoán về thời hạn quyền, việc mà sản phẩm không làm. Bốn tài liệu **in** (bản đồ, hai trang báo, bìa sách) mang `USE`, vì ở đó không phát sinh câu hỏi tác quyền nhiếp ảnh nào chồng lên tuyên bố của nơi giữ.',
    outcome: 'cleared',
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
