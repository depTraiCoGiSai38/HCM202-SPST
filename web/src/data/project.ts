import { ref } from './source.ts';
import type { Provenance, StageId } from './types';

/**
 * PROJECT DECISIONS. None of the items in this file is a requirement taken from
 * the three PDFs. They are the group's own framing choices, labelled so that
 * they can never be mistaken for source requirements.
 * Basis: HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md section 4.
 */

export const PRODUCT_TITLE = 'HÀNH TRÌNH TƯ TƯỞNG';
export const PRODUCT_SUBTITLE = '5 chặng đường, một quá trình hình thành và phát triển';

export const PRODUCT_TITLE_STATUS: Provenance = 'PROJECT DECISION';

/**
 * The Central Question retained from the project context as a hypothesis.
 * It is NOT approved merely by appearing here.
 */
export const CENTRAL_QUESTION =
  'Vì sao tư tưởng Hồ Chí Minh không hình thành trong một thời điểm, mà được hình thành và phát triển qua quá trình trải nghiệm thực tiễn, tiếp thu lý luận, lựa chọn con đường cách mạng và kiểm nghiệm trong thực tiễn cách mạng Việt Nam?';

export const CENTRAL_QUESTION_STATUS = 'PROJECT DECISION - NEED LECTURER/TEAM APPROVAL';

/** Working one-sentence core message. A hypothesis requiring validation. */
export const CORE_MESSAGE =
  'Theo trình tự mà trích đoạn được giao trình bày, tư tưởng Hồ Chí Minh hiện ra như một quá trình gồm năm thời kỳ nối tiếp và chuyển hoá lẫn nhau, chứ không phải một tập hợp sự kiện rời rạc.';

export const CORE_MESSAGE_STATUS = 'PROJECT DECISION - NEED AUDIENCE/LECTURER VALIDATION';

export const SECTION_HEADING = 'II. QUÁ TRÌNH HÌNH THÀNH VÀ PHÁT TRIỂN TƯ TƯỞNG HỒ CHÍ MINH';
export const SECTION_HEADING_AT = ref(28);

/**
 * The reading model used to organise each stage screen.
 * A learning-design aid only. It never replaces the textbook's own terminology and never
 * forces a claim the excerpt does not support.
 */
export const READING_MODEL = [
  {
    id: 'boi-canh',
    label: 'Bối cảnh và trải nghiệm',
    hint: 'Những gì trích đoạn ghi nhận là hoàn cảnh, hoạt động và thực tiễn đã trải qua.',
  },
  {
    id: 'chuyen-bien',
    label: 'Chuyển biến nhận thức',
    hint: 'Những gì trích đoạn mô tả là nhận thức, phương hướng hoặc quan điểm được hình thành.',
  },
  {
    id: 'buoc-ngoat',
    label: 'Bước ngoặt',
    hint: 'Thời điểm mà chính trích đoạn trình bày như một sự đổi hướng.',
  },
] as const;

export const READING_MODEL_STATUS: Provenance = 'PROJECT DECISION';

/**
 * The opening question of each stage.
 *
 * `PROJECT DECISION`. These sentences are the group's, not the excerpt's. They
 * exist so that a stage begins by asking something rather than by asserting
 * something, which is the one shape a framing sentence can take without adding
 * a claim to the source.
 *
 * Two rules constrain every entry below, and a unit test enforces the first:
 *
 *  1. it must be a question, so it states nothing;
 *  2. everything it presupposes must already be printed in that stage's own
 *     heading or body. `basis` records where, so the magnifier can show it.
 *
 * None of them may be answered from outside the assigned excerpt.
 */
export interface StageEntry {
  question: string;
  /** What in the stage the question is built from, for the evidence magnifier. */
  basis: string;
}

export const STAGE_ENTRY: Record<StageId, StageEntry> = {
  'ky-1': {
    question:
      'Điều gì khiến một người đã có tư tưởng yêu nước lại không đi theo những con đường cứu nước đang có, mà quyết định đi tìm một con đường khác?',
    basis:
      'Tiêu đề chặng nói tới việc “chí hướng tìm con đường cứu nước mới”. Phần thân chặng ghi lại việc không tán thành, không đi theo phương pháp và khuynh hướng cứu nước của các vị tiền bối, rồi đi ra nước ngoài ngày 5-6-1911.',
  },
  'ky-2': {
    question:
      'Từ việc sống, làm việc và đi qua nhiều nước, đến chỗ xác định một con đường cụ thể — trích đoạn đặt bước chuyển ấy ở thời điểm nào?',
    basis:
      'Câu mở đầu chặng nói tư tưởng ấy “được hình thành từng bước”. Phần thân chặng ghi lại hành trình 1911-1917, việc nghiên cứu Sơ thảo luận cương vào tháng 7-1920 và Đại hội ở thành phố Tua cuối tháng 12-1920.',
  },
  'ky-3': {
    question:
      'Khi phương hướng đã được xác định, những nội dung cơ bản của tư tưởng về cách mạng Việt Nam được hình thành bằng những việc gì?',
    basis:
      'Tiêu đề chặng nói tới việc hình thành “những nội dung cơ bản”. Phần thân chặng ghi lại hoạt động báo chí, tổ chức, tác phẩm và Cương lĩnh chính trị đầu tiên vào đầu năm 1930.',
  },
  'ky-4': {
    question:
      'Thử thách trong chặng này đến từ đâu, và trích đoạn cho thấy đường lối đã được giữ vững như thế nào?',
    basis:
      'Tiêu đề chặng nói tới việc “vượt qua thử thách, giữ vững đường lối”. Phần thân chặng ghi lại thử thách từ phía kẻ thù và từ trong nội bộ, rồi Hội nghị tháng 5-1941.',
  },
  'ky-5': {
    question:
      'Sau khi đường lối được giữ vững, trích đoạn ghi lại những gì để cho thấy tư tưởng ấy tiếp tục phát triển?',
    basis:
      'Tiêu đề chặng nói tới việc “tiếp tục phát triển, soi đường”. Phần thân chặng ghi lại các mốc từ ngày 19-5-1941 đến Di chúc, trong khung thời gian tới ngày 2-9-1969.',
  },
};

export const STAGE_ENTRY_STATUS: Provenance = 'PROJECT DECISION';

/**
 * Where the product goes after the five stages.
 *
 * `PROJECT DECISION`. This is the navigation model, nothing more. It exists
 * because three of these four screens previously had no link anywhere in the
 * product: they were reachable only by typing the address or by driving the
 * presentation. A screen nobody can find is not an interaction.
 *
 * `kind` separates the three activities from the verification register, which
 * is a record rather than something to do.
 */
export interface AfterStagesEntry {
  route: string;
  label: string;
  /** What the learner does there, in one line. */
  purpose: string;
  kind: 'activity' | 'register';
}

export const AFTER_STAGES: AfterStagesEntry[] = [
  {
    route: '#/doi-sanh',
    label: 'Đối sánh',
    purpose: 'Đặt cùng một câu hỏi cho hai chặng khác nhau và xem câu trả lời đổi ra sao.',
    kind: 'activity',
  },
  {
    route: '#/noi-ket',
    label: 'Nối kết',
    purpose: 'Ghép một trải nghiệm với nhận thức mà trích đoạn đặt ngay cạnh nó.',
    kind: 'activity',
  },
  {
    route: '#/tong-hop',
    label: 'Tổng hợp',
    purpose: 'Dựng lại trình tự năm chặng rồi trở về câu hỏi trung tâm.',
    kind: 'activity',
  },
  {
    route: '#/kiem-chung',
    label: 'Kiểm chứng',
    purpose: 'Xem toàn bộ những gì chưa được xác thực, kèm cách xử lý.',
    kind: 'register',
  },
];

/**
 * What each activity is for, said before the activity starts.
 *
 * `PROJECT DECISION`. `goal` is what the learner should be able to do
 * afterwards; `how` is the instruction. Neither states anything about the
 * source, so neither needs a locator - but neither may promise a result the
 * product has not measured, so no effectiveness wording appears here.
 */
export const ACTIVITY_BRIEFS: Record<string, { goal: string; how: string }> = {
  'doi-sanh': {
    goal: 'Nhận ra khoảng cách giữa hai chặng bằng cách so cùng một câu hỏi.',
    how: 'Chọn một trục câu hỏi, rồi chọn hai chặng. Hai câu trả lời hiện ra đúng ở vị trí hai chặng đó nằm trên sợi chỉ.',
  },
  'noi-ket': {
    goal: 'Thấy rằng mỗi nhận thức trong trích đoạn đều đi liền với một việc đã làm.',
    how: 'Chọn một trải nghiệm bên trái, rồi chọn nhận thức mà trích đoạn gắn vào nó. Ghép sai thì thử lại, không tính điểm.',
  },
  'tong-hop': {
    goal: 'Dựng lại mạch năm chặng bằng chính năm tiêu đề, không dùng trí nhớ rời rạc.',
    how: 'Chọn một đoạn rồi đặt vào vị trí bạn cho là đúng. Đặt sai thì lấy ra và thử lại.',
  },
};

/**
 * Statements the product shows about itself. Written so that a viewer can tell
 * exactly what has and has not been verified.
 */
export const INTEGRITY_STATEMENTS = [
  {
    id: 'IS-1',
    title: 'Sản phẩm học tập, không phải nguồn học thuật',
    body: 'Đây là sản phẩm sáng tạo của sinh viên trong học phần HCM202. Nó không phải là giáo trình, không phải bản gốc và không thay thế nguồn chính thống. Mọi nội dung học thuật ở đây được giới hạn trong trích đoạn được giao và vẫn cần đối chiếu với giáo trình chính thức.',
    status: 'PROJECT DECISION' as Provenance,
  },
  {
    id: 'IS-2',
    title: 'Ranh giới nội dung',
    body: 'Toàn bộ nội dung học thuật lấy từ trích đoạn 10 trang được giao. Trích đoạn bắt đầu giữa chừng một mạch lập luận và kết thúc ngay sau tiêu đề mở đầu của mục III. Sản phẩm không dựng thêm phần nội dung nằm ngoài ranh giới đó. ⚠️ ĐÍNH CHÍNH 18-9-2026: cả ba vế của câu trên đều đã cũ và sai so với chính dữ liệu của sản phẩm. (1) Trích đoạn được giao là TÁM trang in, trang 28 đến 35 — SOURCE.pdfPages là 8, không phải 10; con số 10 là của trích đoạn C2 cũ. (2) Trích đoạn KHÔNG bắt đầu giữa chừng một mạch lập luận: ranh giới của chặng 1 ghi rõ bản 2019 bắt đầu ngay ở tiêu đề mục II trên trang 28. (3) Trích đoạn KHÔNG kết thúc ngay sau tiêu đề mở đầu của mục III: EXCERPT_BOUNDARY ghi bản quét mở mục III trên trang 35 rồi chạy tiếp sang phần thân bài của mục III.1.a, và phần thân bài ấy nằm ngoài nội dung được giao nên sản phẩm không dùng làm nội dung học thuật. Vế cuối của câu gốc — không dựng thêm nội dung ngoài ranh giới — vẫn đúng và không đổi.',
    status: 'SOURCE CONTENT' as Provenance,
  },
  {
    id: 'IS-3',
    title: 'Xuất xứ của tệp được giao cần kiểm chứng',
    body: 'Tệp nội dung được giao chưa được xác thực là bản chính thức. Nó là bản quét chỉ có ảnh, không có lớp văn bản, do PDF-XChange Lite 11.0.1 tạo, và mỗi trang có một dấu viết tay ở chân trang. Tệp được dùng để giữ đúng ranh giới nội dung được phân công, nhưng chưa được xác thực là ấn bản chính thức của Bộ GD&ĐT / NXB Chính trị quốc gia Sự thật. Trước khi nộp, một người thật phải đối chiếu từng luận điểm, số trang in và chú thích với bản giáo trình chính thống được phê duyệt. ⚠️ ĐÍNH CHÍNH 18-9-2026: câu này trước đây ghi tệp được giao “mang dấu hiệu xuất xứ của một nền tảng chia sẻ tài liệu”. Vế ấy GÁN SAI NGUỒN. Dấu hiệu Studocu thuộc về tệp C2-02.pdf đã nghỉ, không thuộc bản quét 2019 đang dùng — xem chú thích đầu tệp source.ts và bản ghi chuyển nguồn. Vấn đề xuất xứ thật của tệp 2019 là bản quét không lớp văn bản kèm dấu viết tay, đã ghi thành rủi ro GT-R08. Kết luận “chưa được xác thực” không đổi; chỉ lý do là khác.',
    status: 'NEED VERIFICATION' as Provenance,
  },
  {
    id: 'IS-4',
    title: 'Mười chú thích chỉ là ứng viên định vị',
    body: 'Mười chú thích được in trong trích đoạn được trình bày nguyên văn như ứng viên định vị. Ba chú thích dùng chữ viết tắt “Sdd” — đúng dạng bản 2019 in, không phải dạng “Sđd” đã chuẩn hoá — và không bao giờ được suy đoán mở rộng. Không chú thích nào ở đây được đánh dấu là đã kiểm chứng.',
    status: 'NEED VERIFICATION' as Provenance,
  },
  {
    id: 'IS-5',
    title: 'Không tạo và không mô phỏng chân dung',
    body: 'Sản phẩm không tạo, không mô phỏng và không làm biến dạng chân dung Bác Hồ hay bất kỳ lãnh tụ nào bằng AI hoặc bằng phương tiện khác. Toàn bộ ngôn ngữ thị giác là chữ, số liệu thời gian, đường kẻ và bố cục tư liệu.',
    status: 'PROJECT DECISION' as Provenance,
  },
  {
    id: 'IS-6',
    title: 'Không có dữ liệu người dùng giả lập',
    body: 'Các hoạt động tương tác trong sản phẩm chỉ chạy trên máy của người xem và không được ghi nhận, không được tổng hợp, không tạo ra số liệu khảo sát. Mọi bằng chứng tương tác thực tế phải đến từ việc thử nghiệm với người dùng thật và được lưu riêng.',
    status: 'NOT YET EVIDENCED' as Provenance,
  },
  {
    id: 'IS-7',
    title: 'Những mâu thuẫn trong tài liệu được giữ nguyên',
    body: 'Trích đoạn chứa một số căng thẳng về niên đại và một số dấu hiệu lỗi in. Sản phẩm hiển thị chúng đúng như đang có, kèm cách xử lý, thay vì lặng lẽ sửa lại. Việc giải quyết dứt điểm cần bản sạch và ý kiến của giảng viên.',
    status: 'DOCUMENT CONFLICT' as Provenance,
  },
];

/**
 * Design-decision evidence. Kept in the product because the Handbook requires
 * evidence for design choices. The reasons are the group's, not the PDFs'.
 */
export const DESIGN_DECISIONS = [
  {
    id: 'DD-1',
    decision: 'Thanh chỉ dẫn năm chặng vẽ ranh giới bằng mốc ngày xác định',
    reason:
      'Giáo trình 2019 ghi mỗi ranh giới bằng hai ngày liền nhau: 5-6-1911 với 6-6-1911, 30-12-1920 với 31-12-1920, 3-2-1930 với 4-2-1930, 28-1-1941 với 29-1-1941. Vẽ ranh giới mờ sẽ trình bày sai cấu trúc của tài liệu.',
    evidence:
      'Năm tiêu đề chặng in ở các trang 28, 29, 31 và 33 của giáo trình 2019; sổ rủi ro thay thế ghi ở mục SUPERSEDED_RISKS trong dữ liệu nguồn của sản phẩm.',
    alternative:
      'Thanh thời gian cắt rời theo mốc năm, bị loại vì làm mất đặc điểm của nguồn. ĐÍNH CHÍNH 17-9-2026: quyết định trước đây vẽ ranh giới chồng lấn, vì trích đoạn học thuật cũ để hai tiêu đề liền nhau dùng chung một mốc mờ (“cuối năm 1920”, “đầu năm 1941”). Khi nguồn học thuật chuyển sang giáo trình 2019, các mốc ấy là ngày xác định và không còn chồng lấn, nên lý do của quyết định cũ không còn đứng vững. Đây là thay đổi do nguồn quy định, không phải lựa chọn thẩm mỹ.',
  },
  {
    id: 'DD-2',
    decision:
      'Không dùng AI tạo, mô phỏng, phục dựng hay làm chuyển động chân dung. Ảnh tư liệu thật thì có vị trí sẵn nhưng phải qua kiểm nguồn và điều kiện sử dụng',
    reason:
      'Cả hai văn bản quy định đều xếp việc dùng AI tạo hình ảnh mô phỏng, biến dạng chân dung vào mức vi phạm nặng nhất, với phạm vi khác nhau. Phần cấm AI là tuyệt đối và không thay đổi. Phần ảnh tư liệu thật là một câu hỏi khác: nó phụ thuộc vào nguồn và quyền sử dụng, chứ không phụ thuộc vào việc có nên có ảnh hay không.',
    evidence:
      'Biến thể tài liệu DV-08 trong ngữ cảnh dự án. Ngày 17-9-2026 đã mở ba nguồn để kiểm; kết quả từng nguồn được in ở mục “Ảnh tư liệu: vị trí còn trống” trên trang này. ĐÍNH CHÍNH 18-9-2026: “ba nguồn” là con số của riêng ngày 17-9-2026 và đã cũ — sổ kiểm nguồn nay có hai mươi sáu lượt. Tên mục được dẫn cũng đã đổi thành “Ảnh tư liệu: vị trí đã điền và vị trí còn trống”. Cả hai con số trên trang ấy đều suy ra từ dữ liệu, nên chúng là con số đáng tin, không phải câu này.',
    alternative:
      'Bản quyết định trước đây loại bỏ hoàn toàn hình ảnh người. Nay được thay bằng: các vị trí ảnh có thật trong sản phẩm, vị trí nào chưa có nguồn thì bị chặn và ghi rõ lý do, thay vì không tồn tại. Lý do sửa: một vị trí bị chặn và nói rõ vì sao thì kiểm toán được, còn một vị trí không tồn tại thì không. ĐÍNH CHÍNH 17-9-2026: câu này từng ghi “sáu vị trí”. Con số ấy đúng khi viết, nhưng sản phẩm nay khai báo mười một vị trí — một ở màn mở đầu, năm vị trí chính và năm vị trí bổ trợ. ĐÍNH CHÍNH 18-9-2026: mười một cũng đã cũ — sản phẩm khai báo mười ba vị trí, vì chặng 3 và chặng 5 mỗi chặng nhận thêm một vị trí bổ trợ. Bài học lặp lại lần thứ ba trong ba ngày và vì vậy được ghi thẳng vào đây: SỐ VỊ TRÍ PHẢI ĐỌC TỪ DỮ LIỆU, KHÔNG VIẾT TAY. Con số duy nhất đáng tin là con số trang Kiểm chứng suy ra từ FIGURE_SLOTS; mọi con số viết tay, kể cả câu này, đều sẽ cũ đi.',
  },
  {
    id: 'DD-3',
    decision: 'Nguồn hiển thị ngay cạnh nội dung, không giấu trong trang cuối',
    reason:
      'Tiêu chuẩn Evidence Visible yêu cầu người xem tự kiểm chứng được. Đặt bộ máy chú thích ở lề bài đọc giúp kiểm chứng ngay tại chỗ.',
    evidence: 'Tiêu chuẩn Evidence Visible nêu trong cả hai văn bản quy định.',
    alternative: 'Danh mục nguồn gom ở cuối trang, bị loại vì tách rời khỏi luận điểm.',
  },
  {
    id: 'DD-4',
    decision: 'Phông chữ và toàn bộ tài nguyên được đóng gói kèm sản phẩm',
    reason:
      'Buổi Showcase diễn ra trên một máy tính duy nhất. Sản phẩm phải chạy được kể cả khi không có mạng.',
    evidence: 'Quy tắc chỉ dùng một máy tính trên bục trình bày.',
    alternative: 'Tải phông chữ từ dịch vụ ngoài, bị loại vì phụ thuộc đường truyền.',
  },
  {
    id: 'DD-5',
    decision: 'Chế độ trình bày có ngân sách thời gian hiển thị theo từng nhịp',
    reason:
      'Thời lượng Showcase được ấn định 10 - 12 phút. Người trình bày cần thấy mình đang ở đâu trong ngân sách đó.',
    evidence: 'Mốc thời lượng 10 - 12 phút trong lộ trình tuần 5.',
    alternative: 'Trình chiếu rời bằng phần mềm khác, bị loại vì tách khỏi sản phẩm được chấm.',
  },
  {
    id: 'DD-6',
    decision: 'Ba hoạt động và sổ kiểm chứng có mục trong thanh chỉ dẫn',
    reason:
      'Trước lần sửa này, hai màn hình Đối sánh và Nối kết không có bất kỳ đường dẫn nào trong sản phẩm; chỉ có thể tới bằng cách gõ địa chỉ hoặc qua chế độ trình bày. Một màn hình không ai tìm thấy thì không phải là tương tác.',
    evidence:
      'Rà soát toàn bộ mã nguồn tìm các đường dẫn tới #/doi-sanh và #/noi-ket: không có kết quả nào ngoài kịch bản trình bày. Một kiểm thử trình duyệt hiện khoá lại điều này.',
    alternative:
      'Chỉ thêm liên kết ở cuối chặng 5, bị loại vì buộc người xem phải đi hết năm chặng mới thấy được các hoạt động.',
  },
  {
    id: 'DD-7',
    decision: 'Mỗi chặng mở đầu bằng một câu hỏi của nhóm, không phải một khẳng định',
    reason:
      'Chặng cần một câu dẫn vào để người học biết mình đang đi tìm điều gì. Viết dưới dạng câu hỏi là cách duy nhất đặt được một câu của nhóm trước phần trích đoạn mà không thêm khẳng định nào vào nguồn.',
    evidence:
      'Mỗi câu hỏi kèm phần “Dựa trên” chỉ rõ chỗ trong tiêu đề và thân chặng mà nó dựa vào. Một kiểm thử đơn vị bắt buộc mọi câu phải kết thúc bằng dấu hỏi.',
    alternative:
      'Một câu tóm tắt chặng, bị loại vì đó sẽ là một luận điểm mới của nhóm đặt trước nội dung nguồn.',
  },
  {
    id: 'DD-8',
    decision: 'Một chặng có thể đi từng nhịp hoặc đọc liền mạch',
    reason:
      'Mỗi chặng có từ 11 đến 20 nhịp. Bắt buộc bấm hết chừng đó lần trước khi được đọc là một khoản phí, không phải một thiết kế. Chế độ đọc liền mạch dựng đúng những nhịp ấy, đúng thứ tự in, trên một trang.',
    evidence:
      'Một kiểm thử trình duyệt đối chiếu số trạm ở hai chế độ và kiểm tra rằng bước ngoặt vẫn phải được mở ra chứ không hiện sẵn.',
    alternative:
      'Bỏ hẳn lối đi từng nhịp, bị loại vì chính lối đi ấy là thứ tạo nhịp kể và giữ mỗi màn hình một ý.',
  },
  {
    id: 'DD-9',
    decision: 'Thay bộ đếm “1 / 11” bằng thanh các phần của chặng',
    reason:
      'Một con số cho biết đã đi được bao xa nhưng không cho biết đang đọc loại nội dung gì, còn gì ở phía trước, hay làm sao tới thẳng bước ngoặt. Thanh này hiển thị các phần, số nhịp trong từng phần và phần đang đứng.',
    evidence:
      'Số nhịp trong mỗi phần được đếm trực tiếp từ dữ liệu chặng, không nhập tay. Bộ đếm cũ vẫn giữ nguyên bên cạnh.',
    alternative:
      'Danh sách đầy đủ từng nhịp, bị loại vì hai mươi mục sẽ lấn át chính nội dung đang đọc.',
  },
  {
    id: 'DD-10',
    decision: 'Cuối mỗi chặng có một cầu nối sang chặng kế tiếp',
    reason:
      'Một chặng dừng lại mà không nói gì sẽ để người đọc tự đoán chặng sau liên quan thế nào. Cầu nối in vế sau trong tiêu đề chính thức của chặng kế tiếp và hai ngày kế tiếp nhau mà giáo trình 2019 in ở hai bên mối nối.',
    evidence:
      'Toàn bộ chữ trong cầu nối lấy từ dữ liệu đã lưu: tiêu đề chặng kế tiếp và bản ghi ranh giới, kèm mã rủi ro khi có.',
    alternative:
      'Một câu tóm tắt mối liên hệ do nhóm viết, bị loại vì sẽ thêm một diễn giải nữa ở đúng chỗ người đọc dễ nhầm là nguồn.',
  },
  {
    id: 'DD-11',
    decision: 'Hành động chính ở màn mở đầu gọi tên chặng mà nó mở ra',
    reason:
      'Nhãn “Bắt đầu hành trình” không nói nó dẫn đi đâu, và nó dẫn tới một bản đồ, nên cú bấm đầu tiên đổi lấy sự định hướng chứ chưa phải sự tiến tới. Nhãn mới in số chặng và mốc thời gian của chặng đó, và đi thẳng vào chặng.',
    evidence:
      'Nhãn lấy từ ordinal và vế trước của tiêu đề chính thức; tiêu đề đầy đủ vẫn là tên mà trình đọc màn hình đọc lên. Bản đồ năm chặng vẫn còn, ở nút phụ ngay cạnh.',
    alternative:
      'Giữ nguyên nhãn cũ và chỉ đổi đích, bị loại vì vấn đề nằm ở chỗ nhãn không nói gì, không phải ở đích.',
  },
  {
    id: 'DD-12',
    decision: 'Mỗi chặng có một bảng “Thử đoán trước khi đọc”, không bắt buộc',
    reason:
      'Chặng đặt câu hỏi ở lối vào rồi trả lời ngay, nên người học không kịp hình thành một phán đoán để đối chiếu. Một lần đoán trước khi đọc tạo ra chỗ dựa đó.',
    evidence:
      'Cả ba phương án đều là câu trả lời đã lưu trong trục đối sánh của một chặng có thật, kèm vị trí trong trích đoạn. Không phương án sai nào được bịa ra: phương án sai với chặng này là phương án đúng của chặng khác, và phản hồi nói rõ là chặng nào. Sáu kiểm thử đơn vị khoá lại điều này, trong đó có kiểm thử cấm dùng ô mà trích đoạn để trống làm phương án.',
    alternative:
      'Viết thêm phương án nhiễu cho đúng dạng trắc nghiệm, bị loại dứt khoát: một câu nghe hợp lý nhưng sai về quá trình hình thành tư tưởng Hồ Chí Minh chính là loại bịa đặt mà hai văn bản quy định xếp vào mức nặng nhất.',
  },
  {
    id: 'DD-13',
    decision: 'Bước ngoặt hiện cả hai trạng thái cạnh nhau sau khi được mở',
    reason:
      'Sự đổi hướng từ trạng thái này sang trạng thái kia chính là nội dung của một bước ngoặt. Trước đây phần “trước đó” bị gỡ đi khi mở, nên toàn bộ sức nặng của khoảnh khắc dồn vào trí nhớ về một đoạn văn vừa biến mất.',
    evidence:
      'Điều mà thao tác mở bảo đảm không đổi và vẫn được kiểm thử: phần “sau đó” và câu tóm tắt không tồn tại trên trang cho tới khi người xem tự mở.',
    alternative:
      'Hiện sẵn cả hai từ đầu, bị loại vì như vậy sẽ không còn khoảnh khắc nào để mở ra.',
  },
  {
    id: 'DD-14',
    decision: 'Lề bên cạnh phần đọc mang bản ghi “Đã làm rõ trong chặng này”',
    reason:
      'Cột chữ giữ độ dài dòng dễ đọc, nên ở màn rộng gần một nửa chặng bỏ trống. Nới rộng cột chữ sẽ đổi một vấn đề lấy một vấn đề nặng hơn, nên phần lề nhận việc: giữ lại những bước ngoặt đã mở, mỗi cái kèm câu nói rõ điều gì đã thay đổi.',
    evidence:
      'Một dòng chỉ được điền khi chính người xem mở bước ngoặt đó. Mốc thời gian, tiêu đề và câu tóm tắt đều là giá trị đã lưu, giống hệt phần các trạm hiển thị.',
    alternative:
      'Nới cột chữ ra toàn bộ chiều rộng, bị loại vì dòng quá dài làm việc đọc khó hơn.',
  },
  {
    id: 'DD-15',
    decision: 'Vị trí ảnh trống hiển thị một dòng ghi rõ đang bị chặn, không phải một khung xám',
    reason:
      'Có hai cách xử lý sai. Một khung xám trông như ảnh tải hỏng và mời người ta nộp sản phẩm như vậy. Không hiển thị gì thì khoảng trống biến mất khỏi tầm mắt và không ai còn nhớ là còn nợ. Một dòng ngắn, đúng màu hổ phách mà sản phẩm vẫn dùng cho “chưa có bằng chứng”, thì vừa không chiếm chỗ đọc vừa không thể lọt qua.',
    evidence:
      'Sáu vị trí và ba nguồn đã kiểm được in đầy đủ ở mục “Ảnh tư liệu: vị trí còn trống” trên trang Kiểm chứng, kèm nguyên văn điều mỗi trang ghi. ĐÍNH CHÍNH 18-9-2026: cả hai con số viết tay ở câu trên đều đã cũ, và tên mục cũng đã đổi. FIGURE_SLOTS nay khai báo mười ba vị trí — tám đã điền, năm còn trống — và SOURCING_CHECKS nay có hai mươi sáu lượt kiểm nguồn; mục ấy nay mang tên “Ảnh tư liệu: vị trí đã điền và vị trí còn trống”. Đây đúng là lỗi mà DD-2 đã phải sửa hai lần và đã viết thành quy tắc trong chính bản ghi này: số vị trí và số lượt kiểm phải đọc từ dữ liệu, không viết tay. Bản ghi này bị bỏ sót ở cả hai lần sửa ấy.',
    alternative:
      'Dựng ảnh minh hoạ thay thế hoặc ảnh do AI tạo, bị loại tuyệt đối theo cả hai văn bản quy định.',
  },
  {
    id: 'DD-16',
    decision: 'Sợi chỉ ở màn tổng quan tự vẽ một lần theo đúng thứ tự năm chặng',
    reason:
      'Điều bản vẽ muốn nói là năm tiêu đề làm thành một quá trình liên tục. Vẽ cùng lúc thì nó đọc như một sơ đồ tĩnh; vẽ lần lượt từ trái sang phải thì mắt đi đúng con đường người đọc sắp đi, và bốn mối nối được thấy là chỗ chặng trước khép lại để chặng sau mở ra, chứ không phải bốn đoạn rời nhau.',
    evidence:
      'Chuyển động không giấu gì: mọi liên kết sống ngay từ đầu, không phải chờ. Khi tắt chuyển động thì các đường đơn giản là đã vẽ sẵn. Hai kiểm thử trình duyệt khoá cả hai trạng thái.',
    alternative:
      'Vẽ lại mỗi lần vào trang, bị loại vì lặp đi lặp lại sẽ thành phiền; nó chạy một lần rồi thôi.',
  },
  {
    id: 'DD-17',
    decision: 'Mở bước ngoặt làm sáng một nhịp ở dòng tương ứng trong bản ghi bên lề',
    reason:
      'Thao tác xảy ra ở cột đọc còn kết quả được ghi ở lề, nên rất dễ không nhận ra là vừa có gì đó được ghi lại. Một nhịp sáng ngắn trên đúng dòng vừa được điền nói rằng thao tác đã có kết quả, và kết quả nằm ở đâu.',
    evidence:
      'Chỉ chạy đúng lúc dòng chuyển từ “chưa mở” sang “đã mở”, không chạy khi vẽ lại, nên bước qua lại giữa các nhịp không làm lề nhấp nháy. Chữ trong dòng đọc được suốt thời gian đó, không mờ đi rồi hiện lại.',
    alternative:
      'Cho cả dòng trượt vào, bị loại vì như vậy chữ sẽ không đọc được trong lúc chuyển động.',
  },
  {
    id: 'DD-18',
    decision: 'Mỗi màn hình chỉ có một hoặc hai chuyển động',
    reason:
      'Quá nhiều chuyển động gây phân tán và khó chịu. Ngân sách được giữ chặt: màn tổng quan có một (sợi chỉ tự vẽ), màn chặng có một (bước ngoặt hiện ra cùng câu tóm tắt) cộng một nhịp phản hồi ở lề, ảnh lớn có một (tài liệu tiến lại gần). ĐÍNH CHÍNH 18-9-2026: bản kê viết tay ở trên đã cũ. Màn tổng quan nay có hai chuyển động — sợi chỉ tự vẽ và bản khắc hiện dần (plate-settle); chú thích trong atlas.css tự gọi nó là “chuyển động thứ hai của màn tổng quan, sau sợi chỉ”. Ở chế độ đọc liền mạch, đầu chặng còn có thêm chapter-open. Ngân sách “một hoặc hai chuyển động mỗi màn hình” vẫn giữ ở màn tổng quan; riêng chế độ đọc liền mạch cần một lần rà lại của người thật. Chỉ bản kê là sai, không phải quyết định.',
    evidence:
      'Không có chuyển động lặp vô hạn, không autoplay, không hiệu ứng cuộn ép, không âm thanh. Mọi chuyển động đều tắt hoàn toàn khi hệ thống yêu cầu giảm chuyển động, và nội dung vẫn đầy đủ.',
    alternative:
      'Thêm chuyển động cho từng phần tử xuất hiện, bị loại vì sẽ vượt xa ngân sách và làm chậm thao tác.',
  },
  {
    id: 'DD-19',
    decision:
      'Đánh giá nguồn ảnh bằng ba câu hỏi tách rời: nguồn gốc, dữ kiện chú thích, điều kiện sử dụng',
    reason:
      'Lần tìm nguồn trước gộp ba câu hỏi ấy làm một và kết luận sai theo hai cách. Một, coi “trang không công bố điều khoản” là “nguồn cấm dùng lại”; không thấy điều kiện thì trạng thái đúng là chưa xác lập, không phải bị từ chối. Hai, lấy việc niên đại của một ảnh mâu thuẫn làm lý do loại về bản quyền; niên đại đáng ngờ là vấn đề của chú thích, còn bản quyền là câu hỏi khác. Thêm một điểm yếu nữa: kết luận về cả một kho ảnh chỉ từ trang chủ, chưa mở bản ghi của hiện vật nào.',
    evidence:
      'Bản ghi cũ không bị xoá. Các mục SC-1 đến SC-3 trên trang Kiểm chứng vẫn còn nguyên, kèm dòng ĐÍNH CHÍNH nói rõ sai ở đâu và trạng thái đúng là gì.',
    alternative:
      'Sửa lặng lẽ bản ghi cũ cho gọn, bị loại: lịch sử đính chính là một phần của hồ sơ, không phải thứ để dọn đi.',
  },
  /*
   * DD-20 carried two statements that the rulings of 19-9-2026 overturned, and
   * it carried them on the Verify page, where a reader meets them as current.
   * Corrected the way DD-1, DD-2 and DD-19 correct themselves: the 17-9 wording
   * stays word for word, and the correction is appended inside the same entry.
   * Deleting it would hide that the project changed its mind, which is the one
   * thing AGENTS.md treats as worse than having been wrong.
   */
  {
    id: 'DD-20',
    decision:
      'Ô ảnh mở đầu dùng ảnh báo chí của BnF, không gắn vào chặng nào, và luôn hiển thị dòng ghi nguồn. ⚠️ ĐÍNH CHÍNH 19-9-2026 (SC-24): vế “không gắn vào chặng nào” ĐÃ BỊ LẬT. Tấm ảnh nay là ô ảnh chính của chặng 3 (`FS-ky-3`), và ô mở đầu `FS-open` trống nhưng vẫn được khai báo. Vế “luôn hiển thị dòng ghi nguồn” không đổi.',
    reason:
      'Bản ghi của chính BnF ghi dc:rights là “domaine public”, và điều kiện sử dụng của Gallica cho phép dùng lại phi thương mại miễn phí với đúng một điều kiện: giữ dòng ghi nguồn. Sản phẩm học tập này không bán và không tạo doanh thu. Số hiệu 94.447 ghi tay trên tấm kính ảnh trùng với số trong bản ghi, nên tấm ảnh tự xác nhận nó đúng là hiện vật được mô tả. ⚠️ ĐÍNH CHÍNH 19-9-2026 (SC-26): câu “với đúng một điều kiện” nói THIẾU, và thiếu đúng chỗ nguy hiểm. Nhãn “domaine public” của BnF chỉ trả lời cho BẢN SỐ HOÁ mà BnF giữ; nó KHÔNG trả lời thay cho quyền của người chụp. Bản ghi nêu dc:creator “Agence de presse Meurisse”, và quyền của riêng hãng ảnh ấy CHƯA XÁC LẬP. Vì vậy quyết định dùng lại của tấm này là USE WITH CAUTION, không phải đã sạch quyền. Bốn trục quyền được lưu tách rời trong figures.ts kể từ 19-9.',
    evidence:
      'Đã mở trực tiếp bản ghi OAI của hiện vật và trang điều kiện sử dụng của Gallica, trích nguyên văn cả hai; không dựa vào đoạn tóm tắt của công cụ tìm kiếm. Dòng ghi nguồn hiển thị ngay dưới ảnh và đi kèm cả khi xem lớn, vì đó là điều kiện của giấy phép chứ không phải lựa chọn trình bày. Bổ sung 19-9-2026: trục “quyền của người tạo lập” nay là một trường riêng và hiển thị trong ngăn “Nguồn và điều kiện” của chính tấm ảnh, đọc là CHƯA XÁC LẬP.',
    alternative:
      'Gắn ảnh này vào một chặng, bị loại dứt khoát: sự kiện trong bản ghi là Đại hội Marseille tháng 12-1921, không nằm trong trích đoạn được giao — trích đoạn nói về Đại hội Tua tháng 12-1920. Gắn vào chặng vì “trông hợp” đúng là kiểu suy diễn mà dự án cấm. ⚠️ ĐÍNH CHÍNH 19-9-2026 (SC-24): lập luận trên ĐÚNG về sự kiện và vẫn đúng — ảnh không bao giờ được dùng để minh hoạ Đại hội Marseille — nhưng nó SAI ở chỗ để một dữ kiện về SỰ KIỆN quyết định một câu hỏi về THỜI KỲ. Bản ghi ghi mốc 26-12-1921, nằm trong khoảng 31-12-1920 đến 3-2-1930 của chặng 3, nên tấm ảnh được gắn vào chặng ấy như một CHÂN DUNG CỦA THỜI KỲ, trên căn cứ niên đại và chỉ niên đại.',
  },
];
