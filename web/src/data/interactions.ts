import { ref } from './source.ts';
import type { CompareAxis, ExperienceLink, PresentationBeat } from './types';

/**
 * Cross-stage comparison.
 *
 * PROVENANCE. Both halves of this structure are the group's work, not the
 * excerpt's:
 *
 *  - the questions are comparison axes the group designed. Giáo trình 2019 does not pose
 *    them, and no heading or sentence in the excerpt asks them;
 *  - each answer is the group's compression of what that stage prints. Several
 *    draw on more than one passage, which is why some `at` values span a page
 *    range rather than naming a single printed page.
 *
 * So an answer is evidence-linked but it is NOT verbatim source text, and it
 * must never be presented as `SOURCE CONTENT`. What the excerpt supplies is the
 * material each answer rests on, at the `at` recorded with it.
 *
 * Where the excerpt says nothing on an axis, the answer says so and carries a
 * caution. Those blanks are never filled by inference.
 */
export const COMPARE_AXES: CompareAxis[] = [
  {
    id: 'CA-1',
    question: 'Con đường cứu nước được xác định như thế nào?',
    answers: {
      'ky-1': {
        text: 'Chưa xác định. Người khâm phục tinh thần yêu nước của các vị tiền bối nhưng không tán thành, không đi theo phương pháp và khuynh hướng cứu nước của họ, và quyết định đi ra nước ngoài để tìm.',
        at: ref(28),
      },
      'ky-2': {
        text: 'Được xác định là con đường cách mạng vô sản, sau khi nghiên cứu Sơ thảo luận cương của Lênin vào tháng 7-1920.',
        at: ref(29),
      },
      'ky-3': {
        text: 'Được cụ thể hoá thành đường lối và phương pháp cách mạng Việt Nam, kết tinh trong Cương lĩnh chính trị đầu tiên vào đầu năm 1930.',
        at: ref(31),
      },
      'ky-4': {
        text: 'Bị phê phán trong nội bộ rồi được giữ vững; đến Hội nghị tháng 5-1941 thì nhiệm vụ giải phóng dân tộc được đặt lên hàng đầu.',
        at: ref(31, 33),
      },
      'ky-5': {
        text: 'Được thực hiện trong thực tiễn nhà nước và kháng chiến, rồi mở rộng thành hai nhiệm vụ chiến lược cùng lúc trong những năm 1954-1969.',
        at: ref(33, 34),
      },
    },
  },
  {
    id: 'CA-2',
    question: 'Lực lượng cách mạng được nhìn nhận ra sao?',
    answers: {
      'ky-1': {
        text: 'Trích đoạn chưa nêu một quan niệm về lực lượng cách mạng trong chặng này.',
        at: ref(28),
        caution: 'Không suy luận bổ sung cho ô trống này.',
      },
      'ky-2': {
        text: 'Hình thành nhận thức rằng nhân dân lao động các nước, trong đó có giai cấp công nhân, đều bị bóc lột nên có thể là bạn của nhau.',
        at: ref(29),
      },
      'ky-3': {
        text: 'Xác định lực lượng cách mạng giải phóng dân tộc là toàn thể nhân dân Việt Nam, trong đó nòng cốt là liên minh công nông.',
        at: ref(30),
      },
      'ky-4': {
        text: 'Chủ trương lập Mặt trận Việt Minh, thực hiện đại đoàn kết dân tộc trên cơ sở nòng cốt liên minh công nông.',
        at: ref(33),
      },
      'ky-5': {
        text: 'Mặt trận Việt Minh được sáng lập ngày 19-5-1941; Việt Nam tuyên truyền giải phóng quân được sáng lập ngày 22-12-1944; đường lối kháng chiến là toàn dân, toàn diện.',
        at: ref(33, 34),
      },
    },
  },
  {
    id: 'CA-3',
    question: 'Quan hệ giữa dân tộc và giai cấp được đặt như thế nào?',
    answers: {
      'ky-1': {
        text: 'Trích đoạn chưa đặt vấn đề này trong chặng 1.',
        at: ref(28),
        caution: 'Không suy luận bổ sung cho ô trống này.',
      },
      'ky-2': {
        text: 'Chủ nghĩa yêu nước kết hợp chặt chẽ với lập trường cách mạng vô sản, theo cách Giáo trình 2019 mô tả bước ngoặt tại Đại hội Tua tháng 12-1920.',
        at: ref(29),
      },
      'ky-3': {
        text: 'Giáo trình 2019 nhận định Cương lĩnh thể hiện sự vận dụng sáng tạo trong việc giải quyết mối quan hệ giai cấp - dân tộc - quốc tế.',
        at: ref(31),
      },
      'ky-4': {
        text: 'Quan điểm của Người bị coi là “hữu khuynh”, “dân tộc chủ nghĩa”; đến tháng 5-1941, nghị quyết Hội nghị nêu rằng quyền lợi của bộ phận, của giai cấp phải đặt dưới sự sinh tử, tồn vong của quốc gia, của dân tộc.',
        at: ref(31, 32),
      },
      'ky-5': {
        text: 'Giáo trình 2019 nhận định tư tưởng Hồ Chí Minh và đường lối của Đảng trong thời kỳ này cơ bản là thống nhất.',
        at: ref(33),
      },
    },
  },
  {
    id: 'CA-4',
    question: 'Thử thách chính đến từ đâu?',
    answers: {
      'ky-1': {
        text: 'Tình cảnh nước nhà bị giặc ngoại xâm đô hộ, và sự bế tắc của các khuynh hướng cứu nước đương thời mà Người không tán thành.',
        at: ref(28),
      },
      'ky-2': {
        text: 'Chủ nghĩa thực dân và chế độ thuộc địa, được nhận diện qua cuộc hành trình qua nhiều nước.',
        at: ref(29),
      },
      'ky-3': {
        text: 'Trích đoạn nhấn vào công việc truyền bá và tổ chức; thử thách được đặt thành trọng tâm ở chặng kế tiếp.',
        at: ref(30),
      },
      'ky-4': {
        text: 'Thử thách xuất hiện không chỉ từ phía kẻ thù mà còn từ trong nội bộ những người cách mạng, gồm cả việc bị phê phán và bị đổi tên Đảng.',
        at: ref(31, 32),
      },
      'ky-5': {
        text: 'Chính quyền cách mạng non trẻ trải qua thử thách được Giáo trình 2019 mô tả là ngàn cân treo sợi tóc, rồi tới hai cuộc kháng chiến.',
        at: ref(34),
      },
    },
  },
];

/**
 * Lived practice paired with the recognition the excerpt attaches to it.
 *
 * PROVENANCE. An earlier version of this comment claimed each pair was
 * traceable to one printed passage and that nothing here was inferred. Neither
 * is exactly true, so it is corrected rather than left standing:
 *
 *  - the wording on both sides is the group's compression, not verbatim text;
 *  - several pairs rest on more than one passage - EL-7, EL-8 and EL-12 carry
 *    `at` values spanning a page range. EL-11 is stored as a single page,
 *    `Giáo trình 2019 PDF p.9`; an earlier version of this note listed it here in error.
 *    The locator itself is left exactly as recorded, because whether it should
 *    span further has not been checked against the excerpt;
 *  - the excerpt does place these experiences and recognitions together, but
 *    deciding where one pair ends and the next begins is the group's reading.
 *
 * Each pair therefore carries its location in the excerpt so a reader can check
 * it, and is labelled as the group's reading rather than as source wording.
 */
export const EXPERIENCE_LINKS: ExperienceLink[] = [
  {
    id: 'EL-1',
    stageId: 'ky-1',
    experience:
      'Theo học các vị túc Nho, tiếp xúc sách báo tiến bộ ở Vinh và kinh đô Huế, tham gia phong trào chống thuế ở Trung Kỳ năm 1908, dạy học ở Trường Dục Thanh năm 1910.',
    recognition:
      'Hình thành tư tưởng yêu nước và thể hiện rõ tư tưởng yêu nước trong hành động.',
    at: ref(28),
  },
  {
    id: 'EL-2',
    stageId: 'ky-1',
    experience:
      'Suy ngẫm về Tổ quốc và thời cuộc, đối chiếu với các khuynh hướng cứu nước của những vị tiền bối cách mạng nổi tiếng.',
    recognition:
      'Không tán thành và không đi theo các phương pháp, khuynh hướng đó; muốn tìm hiểu những gì ẩn giấu sau sức mạnh của kẻ thù và học hỏi kinh nghiệm cách mạng trên thế giới.',
    at: ref(28),
  },
  {
    id: 'EL-3',
    stageId: 'ky-2',
    experience: 'Từ năm 1911 đến năm 1917, từ Pháp đi tới nhiều nước trên thế giới.',
    recognition:
      'Hình thành nhận thức mới: nhân dân lao động các nước, trong đó có giai cấp công nhân, đều bị bóc lột nên có thể là bạn của nhau; còn chủ nghĩa đế quốc, bọn thực dân ở đâu cũng là kẻ bóc lột.',
    at: ref(29),
  },
  {
    id: 'EL-4',
    stageId: 'ky-2',
    experience:
      'Thay mặt những người Việt Nam yêu nước ở Pháp gửi Yêu sách của nhân dân An Nam tới Hội nghị Vécxây ngày 18-6-1919.',
    recognition: 'Bước nhận thức mới về quyền tự do, dân chủ của nhân dân.',
    at: ref(29),
  },
  {
    id: 'EL-5',
    stageId: 'ky-2',
    experience:
      'Nghiên cứu Sơ thảo luận cương của Lênin và nhiều tài liệu liên quan đến Quốc tế Cộng sản vào tháng 7-1920, cùng với hoạt động thực tế trong Đảng Xã hội Pháp.',
    recognition:
      'Tìm thấy và xác định phương hướng đấu tranh giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản.',
    at: ref(29),
  },
  {
    id: 'EL-6',
    stageId: 'ky-3',
    experience:
      'Tổng kết kinh nghiệm các cuộc cách mạng tư sản Anh, Pháp, Mỹ và nhất là kinh nghiệm Cách mạng Tháng Mười Nga.',
    recognition:
      'Vạch rõ cách mạng Việt Nam phải có đảng cộng sản với chủ nghĩa Mác - Lênin làm cốt để lãnh đạo, với lực lượng nòng cốt là liên minh công nông.',
    at: ref(30),
  },
  {
    id: 'EL-7',
    stageId: 'ky-3',
    experience:
      'Hoạt động báo chí và tổ chức: Hội liên hiệp thuộc địa năm 1921, báo Le Paria năm 1922, Hội Việt Nam Thanh niên Cách mạng và báo Thanh niên tháng 6-1925.',
    recognition:
      'Từng bước truyền bá chủ nghĩa Mác - Lênin và lý luận cách mạng trong những người yêu nước và công nhân, chuẩn bị cho việc thành lập Đảng.',
    at: ref(30),
  },
  {
    id: 'EL-8',
    stageId: 'ky-4',
    experience:
      'Bị phê phán trong nội bộ, bị hiểu lầm trong những năm 1934-1938, học tập và nghiên cứu ở Liên Xô.',
    recognition:
      'Giữ vững quan điểm đã nêu trong Cương lĩnh chính trị đầu tiên, và đề nghị được trở về nước trực tiếp tham gia lãnh đạo cách mạng.',
    at: ref(32),
    caution: 'Câu dẫn vào bức thư ngày 6-6-1938 chứa xung đột niên đại. Xem GT-R02.',
  },
  {
    id: 'EL-9',
    stageId: 'ky-4',
    experience:
      'Về gần biên giới Việt Nam - Trung Quốc tháng 12-1940, mở lớp huấn luyện cán bộ và viết sách Con đường giải phóng vào tháng 1-1941.',
    recognition: 'Nêu ra phương pháp cách mạng giành chính quyền.',
    at: ref(32),
  },
  {
    id: 'EL-10',
    stageId: 'ky-5',
    experience:
      'Lãnh đạo Đảng và chính quyền cách mạng non trẻ từ ngày 2-9-1945 đến ngày 19-12-1946, khi thì tạm hoà hoãn với Tưởng, lúc thì tạm hoà hoãn với Pháp.',
    recognition:
      'Giữ vững mục tiêu bằng sách lược linh hoạt, theo phương châm Dĩ bất biến ứng vạn biến.',
    at: ref(33, 34),
  },
  {
    id: 'EL-11',
    stageId: 'ky-5',
    experience: 'Lãnh đạo cuộc kháng chiến chống thực dân Pháp trong những năm 1946-1954.',
    recognition:
      'Hoàn thiện lý luận cách mạng dân tộc dân chủ nhân dân và từng bước hình thành tư tưởng về xây dựng chủ nghĩa xã hội ở Việt Nam.',
    at: ref(34),
  },
  {
    id: 'EL-12',
    stageId: 'ky-5',
    experience:
      'Xác định và lãnh đạo thực hiện hai nhiệm vụ chiến lược cùng một lúc trong những năm 1954-1969.',
    recognition:
      'Bổ sung, hoàn thiện hệ thống quan điểm cơ bản trên các lĩnh vực chính trị, kinh tế, quân sự, văn hoá, đạo đức, đối ngoại.',
    at: ref(34),
  },
];

/**
 * Presentation script for the 10-12 minute Showcase slot.
 *
 * The minute budget is a PROJECT DECISION on how to spend the slot. The slot
 * length itself comes from the Week 5 lifecycle entry. Speaker notes are
 * presenter guidance, not academic claims.
 */
export const PRESENTATION_BEATS: PresentationBeat[] = [
  {
    id: 'PB-1',
    minutes: 1,
    kicker: 'Mở',
    title: 'Câu hỏi trung tâm',
    route: '#/',
    notes: [
      'Đọc nguyên văn câu hỏi trung tâm, không diễn giải thêm.',
      'Nêu rõ: đây là câu hỏi của nhóm, chưa phải câu hỏi do tài liệu quy định.',
      'Nêu ranh giới nội dung: toàn bộ sản phẩm nằm trong trích đoạn được giao.',
    ],
  },
  {
    id: 'PB-2',
    minutes: 1.5,
    kicker: 'Khung',
    title: 'Năm chặng và bốn ranh giới xác định',
    route: '#/hanh-trinh',
    notes: [
      'Đọc đủ năm tiêu đề đúng nguyên văn tiếng Việt.',
      'Chỉ vào bốn mối nối trên thanh chỉ dẫn, mỗi mối nối là hai ngày kế tiếp nhau.',
      'Nói rõ: giáo trình 2019 ghi mốc từng ngày, nên các chặng khép vào nhau chứ không chồng lấn.',
    ],
  },
  {
    id: 'PB-3',
    minutes: 2,
    kicker: 'Chiều sâu',
    title: 'Một bước ngoặt được mở ra',
    route: '#/chang/ky-2',
    notes: [
      'Mở bước ngoặt tháng 7-1920, đọc phần trước và phần sau.',
      'Nhấn vào chỗ đổi hướng: từ tìm kiếm sang xác định phương hướng.',
      'Mở tiếp bước ngoặt Đại hội Tua và chỉ ra lỗi in đã được ghi chú thay vì sửa lặng lẽ.',
    ],
  },
  {
    id: 'PB-4',
    minutes: 2,
    kicker: 'Lập luận',
    title: 'Cùng một câu hỏi, năm câu trả lời khác nhau',
    route: '#/doi-sanh',
    notes: [
      'Chọn trục “Con đường cứu nước được xác định như thế nào?”.',
      'So sánh chặng 1 với chặng 3 để thấy khoảng cách nhận thức.',
      'Chỉ ra hai ô mà trích đoạn không nói gì, và nói rõ nhóm không suy diễn bù vào.',
    ],
  },
  {
    id: 'PB-5',
    minutes: 1.5,
    kicker: 'Tương tác',
    title: 'Nối trải nghiệm với nhận thức',
    route: '#/noi-ket',
    notes: [
      'Mời một người trong lớp chọn thử một cặp.',
      'Khi ghép đúng, đọc vị trí trong trích đoạn hiện ra kèm theo.',
      'Nói rõ: hoạt động này chỉ chạy trên máy, không thu thập dữ liệu người dùng.',
    ],
  },
  {
    id: 'PB-6',
    minutes: 2,
    kicker: 'Kiểm chứng',
    title: 'Những gì chưa được kiểm chứng',
    route: '#/kiem-chung',
    notes: [
      'Mở sổ ghi nhận: mười ứng viên định vị, ba chú thích dùng “Sđd”.',
      'Mở xung đột niên đại GT-R02 và giải thích vì sao nhóm không sửa.',
      'Nêu xuất xứ của tệp được giao vẫn cần đối chiếu bản chính thức.',
    ],
  },
  {
    id: 'PB-7',
    minutes: 1.5,
    kicker: 'Đóng',
    title: 'Trở lại câu hỏi trung tâm',
    route: '#/tong-hop',
    notes: [
      'Cho chạy phần tổng hợp: người xem dựng lại mạch năm chặng.',
      'Đọc thông điệp cốt lõi trong một câu.',
      'Kết bằng điều còn phải làm: đối chiếu nguồn và thử nghiệm với người dùng thật.',
    ],
  },
];

/** Total is checked by a unit test so the script cannot silently drift. */
export const PRESENTATION_BUDGET_MIN = 10;
export const PRESENTATION_BUDGET_MAX = 12;
