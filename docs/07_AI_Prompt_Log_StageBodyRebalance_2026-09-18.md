# Prompt Log — đợt cân bằng lại bố cục phần thân chặng, 18-9-2026

> Bản ghi này thuộc Folder `07_AI_Declaration_Integrity_PromptLog`.
> `AGENTS.md` §9 yêu cầu sáu trường cho mỗi prompt: ngày dùng, công cụ AI, việc được hỗ trợ,
> prompt nguyên văn, tóm tắt kết quả, cách đối chiếu lại với giáo trình gốc.
>
> Các bản ghi Prompt Log trước **KHÔNG bị sửa**. Đây là một mục mới, đứng sau chúng.
>
> Trạng thái: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.

---

## P-LAYOUT-01

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 18-9-2026 |
| **Công cụ AI** | Claude Code (Claude Opus 5, cửa sổ ngữ cảnh 1M), chạy trong repository, có skill `ui-ux-pro-max` cài sẵn tại `.claude/skills/ui-ux-pro-max` |
| **Việc được hỗ trợ** | **Chỉ bố cục, thành phần và nhịp thị giác của phần THÂN năm chặng.** Đo lại bố cục đang có bằng trình duyệt thật; kiểm toán kiến trúc renderer, toàn bộ trần chiều rộng trong CSS, vật liệu phụ thực có theo từng chặng, và các ràng buộc của bộ kiểm thử; dựng một họ bố cục dùng lại được ở mức trạng thái ngữ nghĩa; chạy toàn bộ phép kiểm và phép đo; chụp ảnh trước/sau; viết báo cáo và bản ghi này. **Không thay đổi một mệnh đề học thuật, một định vị, một nhãn nguồn, một trích dẫn, một mốc thời gian, một xuất xứ ảnh hay một trạng thái kiểm chứng nào.** |
| **Prompt nguyên văn** | Lưu đầy đủ, không cắt: [`prompts/P-LAYOUT-01.txt`](prompts/P-LAYOUT-01.txt) |
| **Tóm tắt kết quả** | Xem bên dưới |
| **Cách đối chiếu lại với giáo trình gốc** | Xem bên dưới |

---

### Tóm tắt kết quả

**Kiểm tra trước khi sửa bất cứ thứ gì.**
Đọc `CLAUDE.md`, `AGENTS.md`, `HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md`,
`CREATIVE_SPATIAL_JOURNEY_REPORT.md`, `HISTORICAL_IMAGE_INTEGRATION_REPORT.md`,
`SPATIAL_JOURNEY_DESIGN_DECISION.md`, `CREATIVE_TRANSFORMATION_AUDIT.md`,
`UX_REDESIGN_REPORT.md`. Kiểm tra SHA-256 của cả bốn PDF được kiểm soát: **cả bốn khớp**
với `AGENTS.md` §1. Build và chạy sản phẩm, **đo và chụp trước khi sửa**.

**Vấn đề được ĐO, không được đoán.**
Viết `web/tools/body-balance.mjs`: đi qua từng nhịp của cả năm chặng ở bốn khổ màn hình và
ghi các sự kiện quan sát được — không có "điểm cân bằng" tự chế. Ở 1920px: khung nội dung
1872px, rãnh đọc 1488px, nhưng khối chữ chỉ **642px**, để lại **846px = 45% khung** không có
nội dung nào. **69 trên 85 trạng thái thân chặng** ở tình trạng đó, **cả năm chặng**
(ky-1: 12, ky-2: 9, ky-3: 15, ky-4: 18, ky-5: 15).

Hai dòng CSS cùng gây ra: `.station { max-inline-size: 66ch }` đặt khổ đọc lên **hộp chứa**
chứ không lên chữ, nên mọi thành phần khác bị ghim theo; và **không có điểm ngắt nào trên
1280px**, nên 1280px và 1920px nhận đúng một bố cục, toàn bộ 640px thừa đổ vào một `1fr`
không chặn.

**Phát hiện quyết định thiết kế: vật liệu phụ rất mỏng.**
Kiểm kê từ chính dữ liệu sản phẩm: **chỉ 6 trên 77 nhịp** của cả sản phẩm có vị trí ảnh tư
liệu **đã điền**; **chặng 4 không có ảnh nào**. Dòng địa điểm chỉ là **một câu**, và quá nửa
số nhịp thì đó là câu nói rằng trích đoạn **không** in địa điểm. Vì vậy "lấp đầy nửa phải"
chưa bao giờ là lời giải. Lời giải đúng là điều §4 của prompt yêu cầu: **căn giữa có chủ ý**.

**Họ bố cục, chọn theo dữ liệu, không theo mã chặng.**
Một lớp bọc `div.compose[data-comp]` mới; `compositionOf()` chọn từ vật liệu thực của nhịp:
`center` (60/77 nhịp) · `split` (4, chỉ khi ảnh **đã điền**) · `turn` (8, rộng nhất, để bước
ngoặt vẫn là nhịp mạnh nhất màn hình) · `boundary` (5, trải ngang). Thêm hai xử lý cuối
chặng: **SUY NGẪM** thành một khoảng dừng trải rộng (câu hỏi trung tâm chuyển từ `--step-1`
lề trái sang `--step-2` căn giữa) và **cầu nối** căn giữa. **Không có một ngoại lệ riêng cho
chặng nào** — không có `if (stage === 2)` ở bất kỳ đâu.

**Những gì cố ý KHÔNG đổi.**
Khổ đọc `66ch` (một quyết định đã ghi; độ dài dòng đo được **32–63ch trước và sau**, y hệt).
Sổ lề `.gained` (ba bài kiểm thử yêu cầu nó điền dần **trong lúc đi**, nên phương án đưa nó
xuống màn ranh giới đã bị bác). **Lối vào chặng: không chạm vào.**

**Kết quả đo lại, cùng một thước.**
Số "trước" được **đo lại trên mã gốc** bằng bản cuối của công cụ (`git stash` → build → đo →
khôi phục), nên hai vế dùng đúng một phép đo. Ở 1920px: **69 → 0** trạng thái vượt ngưỡng
35%; dải băng chết **32–45% → 7–23%**; trường hợp xấu nhất **846px → 423px**, và 423px đó
nay là hai lề bằng nhau quanh một khối căn giữa chứ không dồn về một phía.

**Toàn bộ phép kiểm đã chạy, không có phép nào bị nới.**
`typecheck` · `lint` · `test` (**116 passed**) · `build` · `e2e` (**228 passed**) ·
`build:offline` · `check:offline` (**không có yêu cầu mạng, không lỗi**) · `ux-audit`
(tương phản đạt; **200% chữ không tràn, không cắt**) · `audit-density` (màn chặng desktop:
nav **1**, điều khiển trong màn **5**, nhãn **4**, cỡ chữ **6** — đúng các ngưỡng đã ghi) ·
`overflow-diag` (`375 = 375`).

**Hai con số cố tình được để nguyên, và đó là bằng chứng.**
`word-budget` vẫn **141 / 109 / 138** và `station-audit` vẫn **28 / 85 vượt 90 chữ** — trùng
khít baseline đã ghi. Đó là bằng chứng rằng **không có chữ nào bị xếp lại thành "signage"**
để làm đẹp ngân sách — đúng cái bẫy mà `HISTORICAL_IMAGE_INTEGRATION_REPORT.md` §9 đã ghi là
"một chỗ suýt tự lừa mình".

**Một sửa đổi học thuật KHÔNG được phép đã xuất hiện, bị phát hiện và đã hoàn nguyên.**
Việc này phải được ghi, không được lặng lẽ dọn đi. Cây làm việc **sạch** khi bắt đầu. Trong lúc
chạy kiểm toán kiến trúc, hai tệp dữ liệu xuất hiện một thay đổi mà **không phần nào của nhiệm
vụ này yêu cầu**:

```
src/data/stages.ts   P3-6.text
src/data/places.ts   SN3-thanh-nien.title
-  Hội Việt Nam Thanh niên Cách mạng
+  Hội Việt Nam Cách mạng Thanh niên
```

Đây là **tên một tổ chức lịch sử**, và đảo trật tự từ đúng là điều `AGENTS.md` §6 cấm
("Preserve historically situated organization names and terms"). Chính bản ghi đó mang sẵn
lời cấm: *"Tên tổ chức được giữ đúng như bản in trong trích đoạn. Không thay bằng một biến thể
tên gọi khác khi chưa đối chiếu bản gốc."*

**Đã hoàn nguyên bằng `git checkout --`**; dạng in được khôi phục (kiểm bằng grep: 1 lần trong
`stages.ts`, 2 lần trong `places.ts`), và `src/data/` nay **trùng khít byte với `HEAD`**.
**Toàn bộ phép kiểm và phép đo trong bản ghi này đã được chạy LẠI sau khi hoàn nguyên**, nên
không con số nào được đo trên văn bản đã bị sửa. Một tệp thứ hai, `src/styles/atlas.css`, cũng
hiện là đã đổi, nhưng chỉ là ghi lại ký tự xuống dòng — nội dung trùng khít dưới `git diff` —
và cũng đã khôi phục.

Điều đáng rút ra: thứ bắt được nó là **phép kiểm cơ học**, không phải lời cam đoan —
`git diff --stat` trên `src/data/`, cộng với hai con số `word-budget` và `station-audit` phải
trùng baseline. Đó là lý do mục "cách đối chiếu" bên dưới được viết bằng bằng chứng chứ không
bằng khẳng định.

**Một lượt soát phản biện sau khi dựng xong, và sáu lỗi đã sửa.**
Mỗi nhịp của cả năm chặng được soát ở 1920/1440/768/390, cả hai phía mỗi bước ngoặt, cùng phần
suy ngẫm, cầu nối và chế độ đọc liền mạch; **mỗi lỗi báo về đều được mở lại bởi một lượt thứ hai
có nhiệm vụ bác bỏ nó**, mặc định là "bác bỏ nếu không tái hiện được". 20 lỗi trụ lại. Bốn lỗi
**do chính đợt này gây ra** đã sửa: lề trái của cột đọc nhảy 120px giữa các nhịp liền nhau; bố
cục `split` bỏ rơi dòng địa điểm cách đoạn văn 195–298px; chú thích ảnh chạy rộng hơn chính bức
ảnh trong bố cục bước ngoặt; nút mời ở phần suy ngẫm lệch 521px khỏi trục. Hai lỗi **có từ
trước** cũng sửa vì đủ gọn: nét `.turn__stem` vẽ ra một đoạn thẳng lạc lơ lửng ở 768/390 trong
**mọi** bước ngoặt của **cả năm chặng**, và hai nút `.station__more`/`.station__back` chỉ cao
42px so với mức 44px mà chính dự án tự đặt. Chi tiết và số đo ở
`STAGE_BODY_EDITORIAL_REBALANCE_REPORT.md` §9a.

**Một lỗi nghiêm trọng được tìm ra nhưng CỐ Ý KHÔNG sửa, cần người quyết định.**
Trên điện thoại và máy tính bảng, cú bấm "Tiếp" đầu tiên rời lối vào chặng đưa người đọc tới một
**màn hình trắng**: đầu chặng co từ `full` sang `compact`, tài liệu ngắn lại (2733px → 1486px ở
390), và trình duyệt kẹp cuộn về đáy tài liệu. Đo ở 390 trên ky-2: `scrollY 642`, nhịp ở
`top −112`, thanh chuyển nhịp ở `top −180` — **không một chữ nào của đoạn vừa yêu cầu, và không
có nút để đi tiếp hay lùi**. Tái hiện trên cả năm chặng ở 360/390/414 và ở 768. **Có từ trước,
không do đợt này gây ra.** Không sửa vì đây là thay đổi **hành vi cuộn**, không phải thay đổi bố
cục, và sản phẩm đang cố ý **không** cuộn khi đổi nhịp; đó là một quyết định về tương tác, thuộc
về con người. Đề nghị đưa thành nhiệm vụ kế tiếp.

**Điểm yếu còn lại được ghi thẳng**, gồm cả nửa phải trống bên trong thẻ bước ngoặt **chưa
băng qua** (cố ý: phía xa không được tồn tại trong DOM trước khi người đọc băng qua, và có
bài kiểm thử giữ điều đó), việc `center` chiếm 60/77 nhịp vì vật liệu mỏng, và việc **không**
dựng "reverse split". Xem `STAGE_BODY_EDITORIAL_REBALANCE_REPORT.md` §11.

---

### Cách đối chiếu lại với giáo trình gốc

**Không có gì để đối chiếu, và đó là điều phải chứng minh chứ không phải điều được nói suông.**

Đợt này **không tạo ra một mệnh đề học thuật nào**. Cách kiểm chứng điều đó là cơ học chứ
không phải bằng lời hứa:

1. **Không tệp dữ liệu nào bị chạm.** `git diff --stat` chỉ liệt kê hai tệp trong `src/`:
   `components/stagePage.ts` và `styles/experience.css`. Toàn bộ `src/data/` —
   `stages.ts`, `figures.ts`, `places.ts`, `locators.ts`, `interactions.ts`, `project.ts`,
   `source.ts` — **không đổi một ký tự**. Mọi tiêu đề chặng, mốc thời gian, ranh giới, trích
   dẫn nguyên văn, định vị in, ghi chú bản in, xuất xứ ảnh và trạng thái kiểm chứng đều nằm
   trong các tệp đó. Không sửa chúng thì không thể làm lệch chúng.
2. **Thay đổi trong `stagePage.ts` là thay đổi cấu trúc, không phải nội dung.** Hàm mới
   `composed()` chỉ **bọc** ba phần tử vốn đã được render kề nhau; không có chuỗi văn bản nào
   được thêm, bớt, gộp, rút gọn hay viết lại. `passageView`, `quoteView`, `boundaryView`,
   `turnStation` không đổi.
3. **Bộ kiểm thử nội dung là chốt chặn, và nó vẫn xanh.** `src/test/content.test.ts` giữ các
   bất biến học thuật — trong đó có bất biến "hai nửa tiêu đề ghép lại đúng từng ký tự thành
   tiêu đề in" cho cả năm chặng. **116/116 phép kiểm đơn vị đạt.** 228 phép kiểm e2e đạt,
   bao gồm các phép kiểm về ghi nguồn ảnh, chú thích, trạng thái `NEED VERIFICATION`,
   `CHƯA CÓ NGUỒN` và định vị trang in.
4. **Số chữ không đổi.** `word-budget` và `station-audit` trả về đúng baseline cũ. Nếu có câu
   nào bị sửa, rút gọn hay xếp loại lại, hai con số này đã lệch.

**Điều đợt này KHÔNG làm, và phải nói rõ:** nó **không** xác thực bất kỳ mệnh đề nào. Bản
scan `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` vẫn là bản không có lớp chữ, chưa được xác
thực là ấn bản chính thống; mọi định vị vẫn là `NEED VERIFICATION`; `Sdd` vẫn để nguyên,
không mở rộng và không chuẩn hoá thành `Sđd`. Việc đối chiếu với giáo trình chính thống
**vẫn chưa được thực hiện** và vẫn là việc của con người.

**Vai trò của `ui-ux-pro-max` trong đợt này**: được gọi và dùng cho bố cục, khổ đọc, khoảng
trắng và nhịp thị giác. Nó **không** được dùng để mở lại bất kỳ quyết định nguồn, thuật ngữ
hay kiểm chứng nào. Lưu ý đã ghi: tệp `design-system/hanh-trinh-tu-tuong/MASTER.md` do skill
sinh ra đề xuất bảng màu và bộ chữ **khác** với hệ thiết kế sản phẩm đang dùng
(`tokens.css`); theo §18 của prompt, hệ đang dùng được giữ nguyên và đề xuất của skill
**không** được áp dụng.

---

### Trạng thái sau đợt này

Phần việc bố cục: xong và đã kiểm như liệt kê ở trên.

Trạng thái dự án: **không đổi** —

`REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`
