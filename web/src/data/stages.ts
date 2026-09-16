import type { Quotation, Stage } from './types';

/**
 * SOURCE CONTENT, bounded by the supplied excerpt `C2-02.pdf`.
 *
 * Rules applied throughout this file:
 *  - The five headings are the exact Vietnamese headings. No English alias
 *    ever replaces them in academic content.
 *  - Time markers keep exactly the precision printed in C2. A month-only or
 *    year-only marker is never upgraded to an exact date.
 *  - Evaluative or causal language that C2 asserts is flagged `evaluative`
 *    rather than restated as established fact.
 *  - Apparent print anomalies are recorded in `caution`, never silently repaired.
 *  - Organisation and work names are reproduced as printed.
 *
 * Every proposition below remains `SOURCE CONTENT - EXTERNAL VERIFICATION REQUIRED`
 * until a human compares it with the approved official textbook.
 */

const QUOTATIONS: Quotation[] = [
  {
    id: 'Q1',
    text: 'Quan trường là nô lệ trong những người nô lệ, lại càng nô lệ hơn',
    attribution: 'C2 dẫn là lời cụ Nguyễn Sinh Sắc thường tâm sự',
    locatorIds: ['L1'],
    at: 'C2 PDF p.2 / printed p.27',
  },
  {
    id: 'Q2',
    text: 'Đừng lấy phong cách nhà quan làm phong cách nhà ta',
    attribution: 'C2 dẫn là lời cụ Nguyễn Sinh Sắc thường dạy các con',
    locatorIds: ['L2'],
    at: 'C2 PDF p.2 / printed p.27',
  },
  {
    id: 'Q3',
    text: 'làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản',
    attribution:
      'C2 dẫn như mục tiêu và con đường cách mạng nêu trong Cương lĩnh chính trị đầu tiên của Đảng Cộng sản Việt Nam',
    locatorIds: ['L3'],
    at: 'C2 PDF p.5',
    caution:
      'Trong bản được cung cấp, cặp dấu ngoặc kép quanh hai trích đoạn Cương lĩnh in không cân đối. Giữ nguyên hiện trạng; cần đối chiếu bản sạch trước khi trích dẫn chính thức.',
  },
  {
    id: 'Q4',
    text: 'đánh đổ đế quốc Pháp, phong kiến An Nam và giai cấp tư sản phản cách mạng',
    attribution:
      'C2 dẫn như nhiệm vụ nêu trong Cương lĩnh chính trị đầu tiên của Đảng Cộng sản Việt Nam',
    locatorIds: ['L4'],
    at: 'C2 PDF p.5',
    caution:
      'Trong bản được cung cấp, cặp dấu ngoặc kép quanh hai trích đoạn Cương lĩnh in không cân đối. Giữ nguyên hiện trạng; cần đối chiếu bản sạch trước khi trích dẫn chính thức.',
  },
  {
    id: 'Q5',
    text: 'chỉ lo đến việc phản đế mà quên mất lợi ích giai cấp tranh đấu, ấy là một sự rất nguy hiểm',
    attribution:
      'C2 dẫn từ nghị quyết Hội nghị Trung ương Đảng họp tháng 10-1930, nhận xét về Hội nghị hợp nhất do Nguyễn Ái Quốc chủ trì',
    locatorIds: ['L5'],
    at: 'C2 PDF p.6 / printed p.31',
    caution:
      'Đây là lời phê phán trong bối cảnh lịch sử được C2 thuật lại, không phải tiếng nói của nhóm thực hiện sản phẩm.',
  },
  {
    id: 'Q6',
    text: 'Thủ tiêu chánh cương, sách lược và điều lệ Đảng',
    attribution: 'C2 dẫn là án nghị quyết của Hội nghị Trung ương Đảng tháng 10-1930',
    locatorIds: [],
    at: 'C2 PDF p.6 / printed p.31',
    caution:
      'Trích đoạn này không kèm chú thích số riêng trong bản được cung cấp. Không dùng chú thích lân cận để hợp thức hoá nó. Xem C2-R09.',
  },
  {
    id: 'Q7',
    text: 'Xin đồng chí giúp đỡ tôi thay đổi tình cảnh đau buồn này... Đừng để tôi sống quá lâu trong tình trạng không hoạt động và giống như là sống ở bên cạnh, ở bên ngoài của Đảng',
    attribution:
      'C2 dẫn là một đoạn trong thư Hồ Chí Minh gửi một lãnh đạo Quốc tế Cộng sản, đề ngày 6-6-1938',
    locatorIds: ['L6'],
    at: 'C2 PDF p.7',
    caution:
      'C2 không nêu tên người nhận. Không suy đoán danh tính. Câu dẫn vào đoạn thư này gắn với Chiến tranh thế giới thứ hai: xem C2-R05.',
  },
  {
    id: 'Q8',
    text: 'Trong lúc này quyền lợi dân tộc giải phóng cao hơn hết thảy. Chúng ta phải đoàn kết lại đánh đổ bọn đế quốc và bọn Việt gian đặng cứu giống nòi ra khỏi nước sôi lửa nóng',
    attribution: 'C2 dẫn là lời khẳng định của Hồ Chí Minh tại Hội nghị tháng 5-1941',
    locatorIds: ['L7'],
    at: 'C2 PDF p.7',
  },
  {
    id: 'Q9',
    text: 'Trong lúc này quyền lợi của bộ phận, của giai cấp phải đặt dưới sự sinh tử, tồn vong của quốc gia, của dân tộc. Trong lúc này, nếu không giải quyết được vấn đề dân tộc giải phóng, không đòi được độc lập, tự do cho toàn thể dân tộc, thì chẳng những toàn thể quốc gia dân tộc còn chịu mãi kiếp ngựa trâu, mà quyền lợi của bộ phận, giai cấp đến vạn năm cũng không đòi lại được',
    attribution: 'C2 dẫn là nghị quyết của Hội nghị Trung ương Đảng',
    locatorIds: ['L8'],
    at: 'C2 PDF p.7',
  },
  {
    id: 'Q10',
    text: 'Đến ngày thắng lợi, nhân dân ta sẽ xây dựng lại đất nước ta đàng hoàng hơn, to đẹp hơn!',
    attribution: 'C2 dẫn từ Lời kêu gọi đồng bào và chiến sĩ cả nước ngày 17-7-1966',
    locatorIds: ['L9'],
    at: 'C2 PDF p.10 / printed p.35',
  },
  {
    id: 'Q11',
    text: 'Toàn Đảng, toàn dân ta đoàn kết phấn đấu, xây dựng một nước Việt Nam hoà bình, thống nhất, độc lập dân chủ và giàu mạnh, và góp phần xứng đáng vào sự nghiệp cách mạng thế giới',
    attribution: 'C2 dẫn là điều mong muốn cuối cùng của Hồ Chí Minh trong Di chúc',
    locatorIds: ['L10'],
    at: 'C2 PDF p.10 / printed p.35',
  },
];

export const QUOTATION_BY_ID = new Map(QUOTATIONS.map((q) => [q.id, q]));
export const ALL_QUOTATIONS = QUOTATIONS;

export const STAGES: Stage[] = [
  {
    id: 'ky-1',
    ordinal: 1,
    heading:
      'Thời kỳ trước ngày 5-6-1911: Hình thành tư tưởng yêu nước và có chí hướng tìm con đường cứu nước mới',
    headingPeriod: 'Thời kỳ trước ngày 5-6-1911',
    headingClaim: 'Hình thành tư tưởng yêu nước và có chí hướng tìm con đường cứu nước mới',
    shortLabel: 'Chặng 1',
    at: 'C2 PDF pp.1-2; số trang in 27 nhìn thấy ở PDF p.2',
    railStart: 0,
    railEnd: 0.15,
    opening:
      'Trong thời kỳ này, Hồ Chí Minh tiếp thu truyền thống tốt đẹp của quê hương, gia đình và của dân tộc, hình thành nên tư tưởng yêu nước và tìm đường cứu nước.',
    context: [
      {
        id: 'P1-1',
        text: 'C2 mô tả Nghệ An là vùng đất giàu truyền thống yêu nước và nhiều nhân tài trong lịch sử dân tộc.',
        at: 'C2 PDF p.1',
        evaluative: true,
      },
      {
        id: 'P1-2',
        text: 'Hồ Chí Minh sinh ra trong một gia đình khoa bảng. Cụ Nguyễn Sinh Sắc đỗ phó bảng. C2 nêu rằng tinh thần yêu nước thương dân và nhân cách của cụ có ảnh hưởng lớn đến tư tưởng, nhân cách Hồ Chí Minh thuở niên thiếu.',
        at: 'C2 PDF pp.1-2 / printed p.27',
      },
      {
        id: 'P1-3',
        text: 'C2 nêu ảnh hưởng sâu sắc từ người mẹ, cụ Hoàng Thị Loan, qua tấm lòng nhân hậu và sự mẫn cảm của người mẹ.',
        at: 'C2 PDF p.2 / printed p.27',
      },
      {
        id: 'P1-4',
        text: 'Được theo học các vị túc Nho và tiếp xúc với nhiều loại sách báo tiến bộ ở các trường, lớp tại Vinh và tại kinh đô Huế; hiểu rõ tình cảnh nước nhà bị giặc ngoại xâm đô hộ.',
        at: 'C2 PDF p.2 / printed p.27',
      },
      {
        id: 'P1-5',
        text: 'Tham gia phong trào chống thuế ở Trung Kỳ (năm 1908).',
        at: 'C2 PDF p.2 / printed p.27',
      },
      {
        id: 'P1-6',
        text: 'Là thầy giáo ở Trường Dục Thanh, Phan Thiết, khi dạy học cũng như trong sinh hoạt, Hồ Chí Minh thường đem hết nhiệt tình truyền thụ cho học sinh lòng yêu nước và những suy nghĩ về vận mệnh nước nhà (năm 1910).',
        at: 'C2 PDF p.2 / printed p.27',
        caution:
          'Trong bản được cung cấp, câu này in lặp cụm “trong trong sinh hoạt”. Diễn giải ở đây dùng dạng một lần; dạng in được ghi lại trong sổ đối chiếu dạng chữ in, mục PF-13.',
      },
    ],
    development: [
      {
        id: 'P1-7',
        text: 'C2 nêu điểm đặc biệt của tuổi trẻ Hồ Chí Minh là suy ngẫm sâu sắc về Tổ quốc và thời cuộc.',
        at: 'C2 PDF p.2 / printed p.27',
        evaluative: true,
      },
      {
        id: 'P1-8',
        text: 'Tuy rất khâm phục tinh thần yêu nước của các vị tiền bối cách mạng nổi tiếng như Phan Bội Châu, Phan Châu Trinh, Hoàng Hoa Thám, Người phê phán, không tán thành và không đi theo các phương pháp, khuynh hướng cứu nước của các vị đó.',
        at: 'C2 PDF p.2 / printed p.27',
        caution:
          'Trích đoạn không in ra nội dung cụ thể của các phương pháp, khuynh hướng ấy. Không bổ sung thêm từ nguồn khác khi chưa kiểm chứng.',
      },
      {
        id: 'P1-9',
        text: 'Người muốn tìm hiểu những gì ẩn giấu sau sức mạnh của kẻ thù và học hỏi kinh nghiệm cách mạng trên thế giới.',
        at: 'C2 PDF p.2 / printed p.27',
      },
    ],
    turningPoints: [
      {
        id: 'TP1',
        marker: '5-6-1911',
        title: 'Đi ra nước ngoài tìm con đường cứu nước, cứu dân',
        before:
          'Tư tưởng yêu nước đã hình thành và đã bộc lộ trong hành động, nhưng gắn với khung cảnh trong nước và với các khuynh hướng cứu nước đương thời mà Người không tán thành.',
        after:
          'Ngày 5-6-1911, Hồ Chí Minh đi ra nước ngoài tìm con đường cứu nước, cứu dân.',
        shift:
          'Từ lòng yêu nước cùng thái độ phê phán các khuynh hướng cứu nước đương thời chuyển sang chí hướng đi tìm một con đường cứu nước mới.',
        passageIds: ['P1-8', 'P1-9'],
        quotationIds: [],
        caution:
          'Tiêu đề chặng 1 dừng ở mốc trước ngày 5-6-1911, trong khi thân bài nêu đúng ngày này. Xem C2-R01.',
      },
    ],
    quotations: ['Q1', 'Q2'],
    locatorIds: ['L1', 'L2'],
    markers: ['trước ngày 5-6-1911', '1908', '1910', '5-6-1911'],
    riskIds: ['C2-R01', 'C2-R09'],
    boundaries: [
      'C2 không in ra phương pháp, khuynh hướng cứu nước cụ thể của Phan Bội Châu, Phan Châu Trinh và Hoàng Hoa Thám.',
      'Trích đoạn mở đầu ở giữa một mạch lập luận trước đó về nhân tố chủ quan; phần đứng trước nằm ngoài phạm vi được giao.',
    ],
  },

  {
    id: 'ky-2',
    ordinal: 2,
    heading:
      'Thời kỳ từ giữa năm 1911 đến cuối năm 1920: Dần dần hình thành tư tưởng cứu nước, giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản',
    headingPeriod: 'Thời kỳ từ giữa năm 1911 đến cuối năm 1920',
    headingClaim:
      'Dần dần hình thành tư tưởng cứu nước, giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản',
    shortLabel: 'Chặng 2',
    at: 'C2 PDF pp.2-4; số trang in 27 và 29 nhìn thấy ở PDF pp.2 và 4',
    railStart: 0.13,
    railEnd: 0.4,
    opening:
      'Tư tưởng Hồ Chí Minh về cách mạng giải phóng dân tộc theo con đường của cách mạng vô sản được hình thành từng bước trong quá trình Hồ Chí Minh đi tìm đường cứu nước; đó là quá trình sống, làm việc, học tập, nghiên cứu lý luận và tham gia đấu tranh trong thực tế cách mạng ở nhiều nước trên thế giới.',
    context: [
      {
        id: 'P2-1',
        text: 'Trước hết, Người xác định đúng bản chất, thủ đoạn, tội ác của chủ nghĩa thực dân và tình cảnh nhân dân các nước thuộc địa.',
        at: 'C2 PDF p.2 / printed p.27',
      },
      {
        id: 'P2-2',
        text: 'Từ năm 1911 đến năm 1917, từ Pháp, Hồ Chí Minh đến nhiều nước trên thế giới.',
        at: 'C2 PDF p.2 / printed p.27',
      },
      {
        id: 'P2-3',
        text: 'Năm 1917 trở lại Pháp, Hồ Chí Minh tham gia phong trào công nhân Pháp đấu tranh chống chủ nghĩa thực dân.',
        at: 'C2 PDF p.3',
      },
      {
        id: 'P2-4',
        text: 'Năm 1919, Người gia nhập Đảng Xã hội của giai cấp công nhân Pháp. Theo C2, lý do là đây là tổ chức theo đuổi lý tưởng cao quý của Đại Cách mạng Pháp: Tự do, bình đẳng, bác ái.',
        at: 'C2 PDF p.3',
      },
    ],
    development: [
      {
        id: 'P2-5',
        text: 'Qua cuộc hành trình 1911-1917, ở Người hình thành một nhận thức mới: nhân dân lao động các nước, trong đó có giai cấp công nhân, đều bị bóc lột nên có thể là bạn của nhau; còn chủ nghĩa đế quốc, bọn thực dân ở đâu cũng là kẻ bóc lột, là kẻ thù của nhân dân lao động.',
        at: 'C2 PDF p.2 / printed p.27',
      },
      {
        id: 'P2-6',
        text: 'Ngày 18-6-1919, thay mặt những người Việt Nam yêu nước ở Pháp và lấy tên là Nguyễn Ái Quốc, Người gửi Yêu sách của nhân dân An Nam tới Hội nghị Vecxay, đòi quyền tự do, dân chủ cho nhân dân Việt Nam. C2 đánh giá đây là tiếng nói chính nghĩa đầu tiên của đại biểu phong trào giải phóng dân tộc Việt Nam trên diễn đàn quốc tế.',
        at: 'C2 PDF p.3',
        evaluative: true,
        caution: 'Giữ nguyên cách viết “Vecxay” đúng như bản in.',
      },
      {
        id: 'P2-7',
        text: 'Vào tháng 7-1920, qua nghiên cứu “Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa (Để trình bày tại Đại hội II Quốc tế Cộng sản)” của Lênin và nhiều tài liệu liên quan đến Quốc tế Cộng sản, Hồ Chí Minh đã tìm thấy và xác định phương hướng đấu tranh giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản.',
        at: 'C2 PDF p.3',
      },
      {
        id: 'P2-8',
        text: 'Tại Đại hội ở thành phố Tua, từ ngày 25 đến ngày 30-12-1920, Hồ Chí Minh cùng những người phái tả trong Đảng Xã hội Pháp bỏ phiếu tán thành Quốc tế Cộng sản và tham gia sáng lập Đảng Cộng sản Pháp. C2 nêu rằng Người trở thành người cộng sản Việt Nam đầu tiên.',
        at: 'C2 PDF pp.3-4',
        evaluative: true,
      },
    ],
    turningPoints: [
      {
        id: 'TP2',
        marker: '7-1920',
        title: 'Xác định phương hướng qua Sơ thảo luận cương của Lênin',
        before:
          'Đã nhận ra ai là bạn và ai là kẻ thù trên bình diện quốc tế, đã hoạt động trong phong trào công nhân và Đảng Xã hội Pháp; nhưng phương hướng giải phóng dân tộc chưa được xác định dứt khoát.',
        after:
          'Tìm thấy và xác định phương hướng đấu tranh giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản.',
        shift: 'Từ tìm kiếm chuyển sang xác định phương hướng.',
        passageIds: ['P2-5', 'P2-7'],
        quotationIds: [],
      },
      {
        id: 'TP3',
        marker: '25 đến 30-12-1920',
        title: 'Đại hội ở thành phố Tua',
        before:
          'Hoạt động trong Đảng Xã hội Pháp trên nền tảng chủ nghĩa yêu nước và nhận thức mới về cách mạng vô sản.',
        after:
          'Bỏ phiếu tán thành Quốc tế Cộng sản và tham gia sáng lập Đảng Cộng sản Pháp.',
        shift:
          'C2 gọi đây là bước ngoặt quan trọng trong cuộc đời Hồ Chí Minh: chủ nghĩa yêu nước kết hợp chặt chẽ với lập trường cách mạng vô sản.',
        passageIds: ['P2-8'],
        quotationIds: [],
        caution:
          'Trong bản được cung cấp, câu này in “bước ngoặt” ở lần thứ nhất và “bước ngoạt” ở lần thứ hai, đồng thời in tên Hồ Chí Minh bằng chữ hoa. Xem C2-R08.',
      },
    ],
    quotations: [],
    locatorIds: [],
    markers: [
      'từ giữa năm 1911 đến cuối năm 1920',
      '1911-1917',
      '1917',
      '1919',
      '18-6-1919',
      '7-1920',
      '25 đến 30-12-1920',
    ],
    riskIds: ['C2-R01', 'C2-R02', 'C2-R08', 'C2-R09'],
    boundaries: [
      'Các nhãn “đầu tiên” trong chặng này là đánh giá do C2 đưa ra; chúng cần kiểm chứng độc lập trước khi dùng như sự kiện đã xác lập.',
      'Không một chú thích số nào được in trong phần này của trích đoạn.',
    ],
  },

  {
    id: 'ky-3',
    ordinal: 3,
    heading:
      'Thời kỳ từ cuối năm 1920 đến đầu năm 1930: Hình thành những nội dung cơ bản tư tưởng về cách mạng Việt Nam',
    headingPeriod: 'Thời kỳ từ cuối năm 1920 đến đầu năm 1930',
    headingClaim: 'Hình thành những nội dung cơ bản tư tưởng về cách mạng Việt Nam',
    shortLabel: 'Chặng 3',
    at: 'C2 PDF pp.4-6; số trang in 29 và 31 nhìn thấy ở PDF pp.4 và 6',
    railStart: 0.37,
    railEnd: 0.59,
    opening:
      'Đây là thời kỳ mục tiêu, phương hướng cách mạng giải phóng dân tộc Việt Nam được cụ thể hoá và thể hiện rõ trong Cương lĩnh chính trị đầu tiên của Đảng Cộng sản Việt Nam.',
    context: [
      {
        id: 'P3-1',
        text: 'Hồ Chí Minh tích cực sử dụng báo chí Pháp lên án chủ nghĩa thực dân Pháp, thức tỉnh lương tri nhân dân Pháp và nhân loại tiến bộ, khơi dậy lòng yêu nước của nhân dân các dân tộc thuộc địa và của dân tộc Việt Nam.',
        at: 'C2 PDF p.4',
      },
      {
        id: 'P3-2',
        text: 'Mở đầu thời kỳ này, C2 dẫn một số bài báo đáng chú ý: Vấn đề dân bản xứ, báo L’Humanité 8-1919; Ở Đông Dương, báo L’Humanité 4-11-1920.',
        at: 'C2 PDF p.4',
        caution:
          'Hai mốc 8-1919 và 4-11-1920 nằm trước thời điểm mở đầu ghi trong tiêu đề chặng 3. Giữ nguyên vị trí như bản in. Xem C2-R04.',
      },
      {
        id: 'P3-3',
        text: 'Năm 1921, Hồ Chí Minh tham gia sáng lập Hội liên hiệp thuộc địa.',
        at: 'C2 PDF p.4',
      },
      {
        id: 'P3-4',
        text: 'Năm 1922, Người được bầu là Trưởng tiểu ban Nghiên cứu vấn đề dân tộc thuộc địa của Đảng Cộng sản Pháp và sáng lập báo Le Paria bằng tiếng Pháp, vừa làm chủ bút, tổng biên tập, vừa kiêm cả việc tổ chức phát hành báo trong nước Pháp và gửi đến các thuộc địa của Pháp, trong đó có Đông Dương.',
        at: 'C2 PDF p.4',
      },
      {
        id: 'P3-5',
        text: 'Tác phẩm Bản án chế độ thực dân Pháp, viết bằng tiếng Pháp, được xuất bản ở Pari năm 1925.',
        at: 'C2 PDF p.4 / printed p.29',
      },
      {
        id: 'P3-6',
        text: 'Tháng 6-1925, Hồ Chí Minh sáng lập tổ chức tiền thân của Đảng Cộng sản: Hội Việt Nam Thanh niên Cách mạng, và ra báo Thanh niên bằng tiếng Việt.',
        at: 'C2 PDF p.5 / printed p.29',
        caution:
          'Tên tổ chức được giữ đúng như bản in trong trích đoạn. Không thay bằng một biến thể tên gọi khác khi chưa đối chiếu bản gốc.',
      },
    ],
    development: [
      {
        id: 'P3-7',
        text: 'Người đẩy mạnh hoạt động lý luận chính trị và tổ chức, chuẩn bị cho việc thành lập Đảng Cộng sản Việt Nam; thông qua báo chí và các hoạt động thực tiễn, tích cực truyền bá chủ nghĩa Mác - Lênin vào phong trào công nhân và phong trào yêu nước Việt Nam.',
        at: 'C2 PDF p.4',
      },
      {
        id: 'P3-8',
        text: 'Tổng kết kinh nghiệm các cuộc cách mạng tư sản Anh, Pháp, Mỹ và nhất là kinh nghiệm Cách mạng Tháng Mười Nga, Hồ Chí Minh vạch rõ: cách mạng Việt Nam phải có đảng cộng sản với chủ nghĩa Mác - Lênin làm cốt để lãnh đạo; lực lượng cách mạng giải phóng dân tộc là toàn thể nhân dân Việt Nam, trong đó nòng cốt là liên minh công nông. Những nội dung đó được hình thành trong tác phẩm Đường cách mệnh, xuất bản năm 1927 ở Quảng Châu, Trung Quốc.',
        at: 'C2 PDF p.5 / printed p.29',
      },
      {
        id: 'P3-9',
        text: 'Vào đầu năm 1930, Hồ Chí Minh chủ trì Hội nghị hợp nhất các tổ chức cộng sản Việt Nam thành Đảng Cộng sản Việt Nam và thông qua các văn kiện do Người khởi thảo. Các văn kiện này là Cương lĩnh chính trị đầu tiên của Đảng Cộng sản Việt Nam.',
        at: 'C2 PDF p.5',
      },
      {
        id: 'P3-10',
        text: 'Cương lĩnh giương cao ngọn cờ độc lập dân tộc và chủ nghĩa xã hội, khẳng định sự lãnh đạo của Đảng Cộng sản Việt Nam, xác định liên minh công nông là lực lượng nòng cốt và coi cách mạng Việt Nam là một bộ phận của cách mạng thế giới. C2 nhận định chiến lược đại đoàn kết toàn dân tộc thấm trong từng câu chữ của Cương lĩnh.',
        at: 'C2 PDF p.5',
        evaluative: true,
      },
      {
        id: 'P3-11',
        text: 'C2 nhận định bản Cương lĩnh thể hiện rõ sự vận dụng sáng tạo và phát triển chủ nghĩa Mác - Lênin trong việc giải quyết mối quan hệ giai cấp - dân tộc - quốc tế trong đường lối cách mạng Việt Nam.',
        at: 'C2 PDF pp.5-6',
        evaluative: true,
      },
      {
        id: 'P3-12',
        text: 'C2 nhận định việc thành lập Đảng Cộng sản Việt Nam với Cương lĩnh chính trị đúng đắn và sáng tạo đã chấm dứt cuộc khủng hoảng về đường lối và tổ chức lãnh đạo cách mạng Việt Nam kéo dài suốt từ cuối thế kỷ XIX sang đầu năm 1930.',
        at: 'C2 PDF p.6',
        evaluative: true,
      },
    ],
    turningPoints: [
      {
        id: 'TP4',
        marker: 'đầu năm 1930',
        title: 'Cương lĩnh chính trị đầu tiên của Đảng Cộng sản Việt Nam',
        before:
          'Những nội dung cơ bản đã được truyền bá qua báo chí, tác phẩm và tổ chức tiền thân, nhưng chưa được kết tinh thành văn kiện chính thức của một chính đảng thống nhất.',
        after:
          'Hội nghị hợp nhất thông qua các văn kiện do Người khởi thảo, tức Cương lĩnh chính trị đầu tiên của Đảng Cộng sản Việt Nam.',
        shift:
          'Từ truyền bá và chuẩn bị chuyển sang kết tinh thành đường lối chính thức của một chính đảng.',
        passageIds: ['P3-8', 'P3-9', 'P3-10'],
        quotationIds: ['Q3', 'Q4'],
      },
    ],
    quotations: ['Q3', 'Q4'],
    locatorIds: ['L3', 'L4'],
    markers: [
      'từ cuối năm 1920 đến đầu năm 1930',
      '8-1919',
      '4-11-1920',
      '1921',
      '1922',
      '1925',
      '6-1925',
      '1927',
      'đầu năm 1930',
      'cuối thế kỷ XIX đến đầu năm 1930',
    ],
    riskIds: ['C2-R02', 'C2-R04', 'C2-R08', 'C2-R09'],
    boundaries: [
      'Trong bản được cung cấp, câu mở đầu chặng này in cụm “Cương lĩhh chính trị đầu tiên”. Đây là dấu hiệu lỗi in; cần đối chiếu bản sạch.',
      'Hai chú thích của chặng chỉ gắn với hai trích đoạn Cương lĩnh, không hợp thức hoá phần tự sự còn lại.',
    ],
  },

  {
    id: 'ky-4',
    ordinal: 4,
    heading:
      'Thời kỳ từ đầu năm 1930 đến đầu năm 1941: Vượt qua thử thách, giữ vững đường lối, phương pháp cách mạng Việt Nam đúng đắn, sáng tạo',
    headingPeriod: 'Thời kỳ từ đầu năm 1930 đến đầu năm 1941',
    headingClaim:
      'Vượt qua thử thách, giữ vững đường lối, phương pháp cách mạng Việt Nam đúng đắn, sáng tạo',
    shortLabel: 'Chặng 4',
    at: 'C2 PDF pp.6-8; số trang in 31 và 33 nhìn thấy ở PDF pp.6 và 8',
    railStart: 0.57,
    railEnd: 0.76,
    opening:
      'Những thử thách lớn với Hồ Chí Minh xuất hiện không chỉ từ phía kẻ thù, mà còn từ trong nội bộ những người cách mạng.',
    context: [
      {
        id: 'P4-1',
        text: 'Một số người trong Quốc tế Cộng sản và Đảng Cộng sản Việt Nam có những nhìn nhận sai lầm về Hồ Chí Minh do chịu ảnh hưởng quan điểm giáo điều tả khuynh xuất hiện trong Đại hội VI của Quốc tế Cộng sản.',
        at: 'C2 PDF p.6 / printed p.31',
      },
      {
        id: 'P4-2',
        text: 'Do không nắm vững tình hình các dân tộc thuộc địa và ở Đông Dương, tư tưởng của Hồ Chí Minh trong Cương lĩnh chính trị đầu tiên chẳng những không được hiểu và chấp nhận mà còn bị phê phán, bị coi là “hữu khuynh”, “dân tộc chủ nghĩa”.',
        at: 'C2 PDF p.6 / printed p.31',
        caution:
          'Hai nhãn phê phán này được giữ trong bối cảnh lịch sử mà C2 thuật lại. Đây không phải cách gọi của nhóm thực hiện sản phẩm.',
      },
      {
        id: 'P4-3',
        text: 'Hội nghị Trung ương Đảng họp tháng 10-1930 ra nghị quyết cho rằng Hội nghị hợp nhất Đảng do Nguyễn Ái Quốc chủ trì có nhiều sai lầm, và cho rằng việc phân chia thành trung, tiểu, đại địa chủ trong sách lược của Đảng là không đúng. Hội nghị ra án nghị quyết thủ tiêu chánh cương, sách lược và điều lệ Đảng; bỏ tên Đảng Cộng sản Việt Nam, lấy tên là Đảng Cộng sản Đông Dương, hoạt động theo chỉ thị của Quốc tế Cộng sản.',
        at: 'C2 PDF p.6 / printed p.31',
      },
      {
        id: 'P4-4',
        text: 'Thoát khỏi nhà tù của thực dân Anh ở Hồng Kông, năm 1934 Hồ Chí Minh trở lại Liên Xô, vào học Trường Quốc tế Lênin, sau đó làm nghiên cứu sinh tại Ban Sử của Viện Nghiên cứu các vấn đề dân tộc và thuộc địa của Quốc tế Cộng sản.',
        at: 'C2 PDF pp.6-7 / printed p.31',
      },
      {
        id: 'P4-5',
        text: 'Trong quãng thời gian từ năm 1934 đến năm 1938, Hồ Chí Minh vẫn còn bị hiểu lầm về một số hoạt động thực tế và quan điểm cách mạng.',
        at: 'C2 PDF p.7',
      },
    ],
    development: [
      {
        id: 'P4-6',
        text: 'C2 viết rằng khi Chiến tranh thế giới thứ hai bùng nổ, nhận thấy thời cuộc sẽ có những chuyển biến lớn và cần trở về nước trực tiếp tham gia lãnh đạo cách mạng Việt Nam, ngày 6-6-1938 Hồ Chí Minh gửi thư cho một lãnh đạo Quốc tế Cộng sản đề nghị cho phép trở về nước hoạt động. C2 ghi rằng đề nghị này được chấp nhận.',
        at: 'C2 PDF p.7',
        caution:
          'Câu này nối sự kiện Chiến tranh thế giới thứ hai bùng nổ với bức thư đề ngày 6-6-1938. Đây là xung đột niên đại nội tại của tài liệu. Giữ nguyên, không sửa. Xem C2-R05.',
      },
      {
        id: 'P4-7',
        text: 'Tháng 10-1938, Hồ Chí Minh rời Liên Xô, đi qua Trung Quốc để trở về Việt Nam.',
        at: 'C2 PDF p.7',
      },
      {
        id: 'P4-8',
        text: 'Tháng 12-1940, Hồ Chí Minh về gần biên giới Việt Nam - Trung Quốc, liên lạc với Trung ương Đảng Cộng sản Đông Dương và trực tiếp chỉ đạo cách mạng Việt Nam. Người mở lớp huấn luyện cán bộ và viết sách Con đường giải phóng, trong đó nêu ra phương pháp cách mạng giành chính quyền (1-1941).',
        at: 'C2 PDF p.7',
      },
      {
        id: 'P4-9',
        text: 'C2 nêu rằng tư tưởng Hồ Chí Minh được Đảng Cộng sản Đông Dương khẳng định trở thành yếu tố chỉ đạo cách mạng Việt Nam từ Hội nghị Trung ương Đảng tháng 5-1941.',
        at: 'C2 PDF p.7',
        evaluative: true,
        caution: 'Bản được cung cấp in lặp cụm “trở thành thành”. Xem C2-R08.',
      },
      {
        id: 'P4-10',
        text: 'Cuối tháng 1-1941, Hồ Chí Minh về nước. Tháng 5-1941, tại Pác Bó thuộc huyện Hà Quảng, tỉnh Cao Bằng, với tư cách cán bộ Quốc tế Cộng sản, Người chủ trì Hội nghị Ban Chấp hành Trung ương Đảng. Hội nghị này đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.',
        at: 'C2 PDF p.7',
      },
      {
        id: 'P4-11',
        text: 'Hội nghị tạm thời gác lại khẩu hiệu cách mạng điền địa, xoá bỏ vấn đề lập Chính phủ Liên bang Cộng hoà dân chủ Đông Dương, thay vào đó là chủ trương thành lập Chính phủ nhân dân của nước Việt Nam Dân chủ Cộng hoà, nêu chủ trương lập Mặt trận Việt Minh, thực hiện đại đoàn kết dân tộc trên cơ sở nòng cốt liên minh công nông, và nêu ra phương hướng khởi nghĩa vũ trang giành chính quyền.',
        at: 'C2 PDF p.8',
      },
      {
        id: 'P4-12',
        text: 'C2 nêu rằng nghị quyết Hội nghị Trung ương Đảng tháng 5-1941 hoàn chỉnh thêm một bước sự chuyển hướng chiến lược và sách lược của cách mạng Việt Nam được vạch ra từ Hội nghị Trung ương Đảng tháng 11-1939, và rằng sự chuyển hướng ấy thực chất là sự trở về với quan điểm Hồ Chí Minh đã nêu trong Cương lĩnh chính trị đầu tiên đầu năm 1930.',
        at: 'C2 PDF p.8',
        evaluative: true,
      },
    ],
    turningPoints: [
      {
        id: 'TP5',
        marker: '10-1930',
        title: 'Đường lối trong Cương lĩnh bị phê phán',
        before:
          'Cương lĩnh chính trị đầu tiên vừa được thông qua tại Hội nghị hợp nhất đầu năm 1930.',
        after:
          'Hội nghị Trung ương Đảng tháng 10-1930 ra nghị quyết phê phán Hội nghị hợp nhất, ra án nghị quyết thủ tiêu chánh cương, sách lược và điều lệ Đảng, và đổi tên Đảng.',
        shift:
          'Thử thách chuyển từ phía kẻ thù sang cả nội bộ phong trào cách mạng; đây là điểm mở đầu của giai đoạn giữ vững đường lối.',
        passageIds: ['P4-1', 'P4-2', 'P4-3'],
        quotationIds: ['Q5', 'Q6'],
      },
      {
        id: 'TP6',
        marker: '5-1941',
        title: 'Hội nghị Trung ương Đảng tại Pác Bó đặt giải phóng dân tộc lên hàng đầu',
        before:
          'Quan điểm đặt nhiệm vụ giải phóng dân tộc lên hàng đầu từng bị phê phán và không được chấp nhận trong nội bộ.',
        after:
          'Hội nghị do Người chủ trì đặt nhiệm vụ giải phóng dân tộc lên hàng đầu và nêu chủ trương lập Mặt trận Việt Minh.',
        shift:
          'Đường lối được giữ vững qua thử thách nay trở lại thành chủ trương chính thức của Đảng.',
        passageIds: ['P4-10', 'P4-11', 'P4-12'],
        quotationIds: ['Q8', 'Q9'],
        caution:
          'Tiêu đề chặng 4 kết thúc ở “đầu năm 1941”, trong khi phần văn dưới tiêu đề này thuật tiếp các sự kiện tháng 5-1941. Giữ nguyên bố cục như bản in. Xem C2-R03.',
      },
    ],
    quotations: ['Q5', 'Q6', 'Q7', 'Q8', 'Q9'],
    locatorIds: ['L5', 'L6', 'L7', 'L8'],
    markers: [
      'từ đầu năm 1930 đến đầu năm 1941',
      '10-1930',
      '1934',
      '1934-1938',
      '6-6-1938',
      '10-1938',
      '12-1940',
      '1-1941',
      'cuối tháng 1-1941',
      '5-1941',
      '11-1939',
    ],
    riskIds: ['C2-R03', 'C2-R05', 'C2-R08', 'C2-R09'],
    boundaries: [
      'C2 không nêu tên người nhận bức thư ngày 6-6-1938 và không đánh số thứ tự cho Hội nghị Trung ương tháng 10-1930 hay tháng 5-1941. Không bổ sung các chi tiết này.',
      'Mốc 11-1939 chỉ xuất hiện như một tham chiếu hồi cố bên trong chặng 4.',
    ],
  },

  {
    id: 'ky-5',
    ordinal: 5,
    heading:
      'Thời kỳ từ đầu năm 1941 đến tháng 9-1969: Tư tưởng Hồ Chí Minh tiếp tục phát triển, hoàn thiện, soi đường cho sự nghiệp cách mạng của Đảng và nhân dân ta',
    headingPeriod: 'Thời kỳ từ đầu năm 1941 đến tháng 9-1969',
    headingClaim:
      'Tư tưởng Hồ Chí Minh tiếp tục phát triển, hoàn thiện, soi đường cho sự nghiệp cách mạng của Đảng và nhân dân ta',
    shortLabel: 'Chặng 5',
    at: 'C2 PDF pp.8-10; số trang in 33 và 35 nhìn thấy ở PDF pp.8 và 10',
    railStart: 0.73,
    railEnd: 1,
    opening:
      'Trong thời kỳ này, tư tưởng Hồ Chí Minh và đường lối của Đảng cơ bản là thống nhất.',
    context: [
      {
        id: 'P5-1',
        text: 'C2 nêu rằng trong những lần làm việc với cán bộ, đảng viên, nhân dân các địa phương, ban, bộ, ngành, Hồ Chí Minh nhiều lần đưa ra những quan điểm sáng tạo, đi trước thời gian, càng ngày càng được Đảng làm sáng tỏ và tiếp tục phát triển.',
        at: 'C2 PDF p.8 / printed p.33',
        evaluative: true,
      },
      {
        id: 'P5-2',
        text: 'Ngày 19-5-1941, Hồ Chí Minh sáng lập Mặt trận Việt Minh. Ngày 22-12-1944, Người sáng lập Việt Nam tuyên truyền giải phóng quân, tiền thân của Quân đội nhân dân Việt Nam.',
        at: 'C2 PDF pp.8-9 / printed p.33',
      },
      {
        id: 'P5-3',
        text: 'Ngày 18-8-1945, Hồ Chí Minh ra Lời kêu gọi Tổng khởi nghĩa giành chính quyền. C2 thuật rằng Cách mạng Tháng Tám năm 1945 thành công, lật đổ chế độ phong kiến hơn ngàn năm, lật đổ ách thống trị của thực dân Pháp hơn 80 năm và giành lại độc lập dân tộc trực tiếp từ tay phát xít Nhật.',
        at: 'C2 PDF p.9 / printed p.33',
        caution:
          'Hai khoảng thời lượng “hơn ngàn năm” và “hơn 80 năm” là con số do C2 in ra; cần kiểm chứng trước khi sử dụng.',
      },
      {
        id: 'P5-4',
        text: 'Ngày 2-9-1945, Hồ Chí Minh đọc Tuyên ngôn Độc lập. Nước Việt Nam Dân chủ Cộng hoà ra đời. C2 nhận định sự kiện này mở ra một kỷ nguyên mới trong lịch sử dân tộc Việt Nam, kỷ nguyên độc lập dân tộc gắn liền với chủ nghĩa xã hội.',
        at: 'C2 PDF p.9 / printed p.33',
        evaluative: true,
      },
    ],
    development: [
      {
        id: 'P5-5',
        text: 'Từ ngày 2-9-1945 đến ngày 19-12-1946, với phương châm Dĩ bất biến ứng vạn biến, Hồ Chí Minh giữ vững mục tiêu đấu tranh cho chủ quyền độc lập dân tộc bằng các sách lược linh hoạt, mềm dẻo: khi thì tạm hoà hoãn với Tưởng để rảnh tay đối phó với thực dân Pháp, lúc thì tạm hoà hoãn với Pháp để đuổi quân Tưởng, giành thời gian củng cố lực lượng.',
        at: 'C2 PDF p.9',
      },
      {
        id: 'P5-6',
        text: 'Lời kêu gọi toàn quốc kháng chiến của Hồ Chí Minh ngày 19-12-1946 vừa thể hiện khái quát đường lối kháng chiến chống thực dân Pháp, vừa là lời thề bảo vệ Tổ quốc, với ý chí thà hy sinh tất cả chứ không chịu mất nước, nhất định không chịu làm nô lệ.',
        at: 'C2 PDF p.9',
      },
      {
        id: 'P5-7',
        text: 'Từ năm 1946 đến năm 1954, Đảng do Người làm lãnh tụ đề ra đường lối kháng chiến lâu dài, toàn dân, toàn diện, tự lực cánh sinh. Trong thời kỳ này, Hồ Chí Minh hoàn thiện lý luận cách mạng dân tộc dân chủ nhân dân và từng bước hình thành tư tưởng về xây dựng chủ nghĩa xã hội ở Việt Nam.',
        at: 'C2 PDF p.9',
      },
      {
        id: 'P5-8',
        text: 'Năm 1954, cuộc kháng chiến chống thực dân Pháp thắng lợi. C2 thuật rằng hoà bình lập lại ở miền Bắc Việt Nam và miền Bắc bắt đầu bước vào thời kỳ quá độ lên chủ nghĩa xã hội.',
        at: 'C2 PDF p.9',
        caution: 'Bản được cung cấp in “Hòa hình lập lại”. Xem C2-R08.',
      },
      {
        id: 'P5-9',
        text: 'Từ năm 1954 đến năm 1969, Hồ Chí Minh xác định và lãnh đạo thực hiện đường lối cùng một lúc thi hành hai nhiệm vụ chiến lược: xây dựng chủ nghĩa xã hội ở miền Bắc và tiếp tục cuộc cách mạng dân tộc dân chủ nhân dân ở miền Nam.',
        at: 'C2 PDF pp.9-10',
      },
      {
        id: 'P5-10',
        text: 'Trong thời kỳ này, Hồ Chí Minh bổ sung và hoàn thiện hệ thống quan điểm cơ bản của cách mạng Việt Nam trên tất cả các lĩnh vực chính trị, kinh tế, quân sự, văn hoá, đạo đức, đối ngoại.',
        at: 'C2 PDF p.10',
      },
      {
        id: 'P5-11',
        text: 'Ngày 17-7-1966, Hồ Chí Minh ra Lời kêu gọi đồng bào và chiến sĩ cả nước, trong đó nêu ra một chân lý lớn của thời đại: Không có gì quý hơn độc lập, tự do.',
        at: 'C2 PDF p.10 / printed p.35',
        caution: 'Bản được cung cấp in cụm “quân đội viễn Chính Mỹ” ở câu dẫn vào. Xem C2-R08.',
      },
      {
        id: 'P5-12',
        text: 'Trước khi đi xa, Người để lại Di chúc. C2 mô tả đây là một văn kiện lịch sử vô giá, kết tinh tư tưởng, trí tuệ, tâm hồn, đạo đức, phong cách của một lãnh tụ cách mạng.',
        at: 'C2 PDF p.10 / printed p.35',
        evaluative: true,
      },
    ],
    turningPoints: [
      {
        id: 'TP7',
        marker: '2-9-1945',
        title: 'Tuyên ngôn Độc lập và sự ra đời của nước Việt Nam Dân chủ Cộng hoà',
        before:
          'Đường lối đặt giải phóng dân tộc lên hàng đầu đã được tổ chức thành lực lượng: Mặt trận Việt Minh, Việt Nam tuyên truyền giải phóng quân, Lời kêu gọi Tổng khởi nghĩa.',
        after:
          'Nước Việt Nam Dân chủ Cộng hoà ra đời sau khi Tuyên ngôn Độc lập được đọc ngày 2-9-1945.',
        shift:
          'Từ đường lối và tổ chức chuyển sang hiện thực nhà nước; tư tưởng bước vào giai đoạn được kiểm nghiệm trong điều hành thực tế.',
        passageIds: ['P5-2', 'P5-3', 'P5-4'],
        quotationIds: [],
      },
      {
        id: 'TP8',
        marker: '1954',
        title: 'Hai nhiệm vụ chiến lược cùng một lúc',
        before:
          'Toàn bộ nỗ lực tập trung vào cuộc kháng chiến chống thực dân Pháp trong những năm 1946-1954.',
        after:
          'Từ năm 1954 đến năm 1969, đường lối thi hành đồng thời hai nhiệm vụ chiến lược ở hai miền.',
        shift:
          'Từ một nhiệm vụ kháng chiến chuyển sang cấu trúc hai nhiệm vụ song song, kéo theo việc bổ sung hệ thống quan điểm trên nhiều lĩnh vực.',
        passageIds: ['P5-8', 'P5-9', 'P5-10'],
        quotationIds: [],
      },
    ],
    quotations: ['Q10', 'Q11'],
    locatorIds: ['L9', 'L10'],
    markers: [
      'từ đầu năm 1941 đến tháng 9-1969',
      '19-5-1941',
      '22-12-1944',
      '18-8-1945',
      '8-1945',
      '2-9-1945',
      '2-9-1945 đến 19-12-1946',
      '1946-1954',
      '19-12-1946',
      '1954',
      '1954-1969',
      '17-7-1966',
    ],
    riskIds: ['C2-R03', 'C2-R06', 'C2-R08', 'C2-R09'],
    boundaries: [
      'Tiêu đề chặng dừng ở tháng 9-1969. Phần văn chạy tiếp tới năm 1975 và cụm “Ngày nay” được tách riêng thành vĩ thanh, không tính vào chặng này. Xem C2-R06.',
      'C2 không in ngày tháng cụ thể của Di chúc trong trích đoạn này.',
    ],
  },
];

/**
 * Material printed after the Stage 5 content, which exceeds the heading's
 * September 1969 endpoint. Kept separate and never used as evidence inside the
 * 1941 - 9/1969 period, nor as a present-day claim in 2026.
 * Basis: context section 8.3, risk C2-R06.
 */
export const EPILOGUE = {
  id: 'vi-thanh',
  label: 'Vĩ thanh nằm ngoài mốc tháng 9-1969',
  status: 'NEED VERIFICATION' as const,
  at: 'C2 PDF p.10 / printed p.35',
  passages: [
    'C2 viết rằng tư tưởng Hồ Chí Minh tiếp tục được Đảng Cộng sản Việt Nam vận dụng và phát triển trong thực tiễn cách mạng Việt Nam.',
    'C2 viết rằng từ năm 1975, cả nước hoà bình, độc lập, thống nhất đi lên chủ nghĩa xã hội.',
    'C2 kết bằng một câu mở đầu bằng cụm không ghi ngày “Ngày nay”.',
  ],
  handling:
    'Phần này vượt quá mốc kết thúc ghi trong tiêu đề chặng 5. Nó được trình bày tách riêng, không dùng làm bằng chứng bên trong thời kỳ 1941 - 9/1969, và không được dùng như một khẳng định về hiện tại năm 2026 khi chưa có nguồn chính thống cập nhật.',
};

/**
 * The excerpt ends immediately after two headings with no body text.
 * Basis: context section 8.3.
 */
export const EXCERPT_BOUNDARY = {
  headings: ['III. GIÁ TRỊ TƯ TƯỞNG HỒ CHÍ MINH', '1. Đối với cách mạng Việt Nam'],
  note: 'Trích đoạn được giao kết thúc ngay sau hai tiêu đề này. Không có phần thân bài cho mục III trong phạm vi được cung cấp, và sản phẩm này không dựng ra nội dung thay thế.',
};

/**
 * Stage boundaries drawn on the rail. The rail deliberately renders shared and
 * blurred boundaries rather than clean cuts, because that is how C2 prints them.
 */
export const BOUNDARIES = [
  {
    id: 'B1',
    between: ['ky-1', 'ky-2'] as const,
    kind: 'blurred' as const,
    label: '5-6-1911 / giữa năm 1911',
    riskId: 'C2-R01',
  },
  {
    id: 'B2',
    between: ['ky-2', 'ky-3'] as const,
    kind: 'shared' as const,
    label: 'cuối năm 1920',
    riskId: 'C2-R02',
  },
  {
    id: 'B3',
    between: ['ky-3', 'ky-4'] as const,
    kind: 'shared' as const,
    label: 'đầu năm 1930',
    riskId: null,
  },
  {
    id: 'B4',
    between: ['ky-4', 'ky-5'] as const,
    kind: 'shared' as const,
    label: 'đầu năm 1941',
    riskId: 'C2-R03',
  },
];

export const STAGE_BY_ID = new Map(STAGES.map((s) => [s.id, s]));
