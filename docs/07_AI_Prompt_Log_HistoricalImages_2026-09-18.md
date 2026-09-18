# Prompt Log — đợt tích hợp ảnh tư liệu lịch sử, 18-9-2026

> Bản ghi này thuộc Folder `07_AI_Declaration_Integrity_PromptLog`.
> `AGENTS.md` §9 yêu cầu sáu trường cho mỗi prompt: ngày dùng, công cụ AI, việc được hỗ trợ,
> prompt nguyên văn, tóm tắt kết quả, cách đối chiếu lại với giáo trình gốc.
>
> Các bản ghi Prompt Log trước **KHÔNG bị sửa**. Đây là một mục mới, đứng sau chúng.
>
> Trạng thái: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.

---

## P-IMG-04

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 18-9-2026 |
| **Công cụ AI** | Claude Code (Claude Opus 5, cửa sổ ngữ cảnh 1M), chạy trong repository, có skill `ui-ux-pro-max` cài sẵn tại `.claude/skills/ui-ux-pro-max` |
| **Việc được hỗ trợ** | Quét kho ảnh tham khảo trên máy; tra cứu kho lưu trữ để tìm tư liệu ảnh có thể kiểm chứng; đọc bản ghi hiện vật và trang điều kiện sử dụng; tải bản gốc, tính SHA-256, tạo bản web; điền bốn vị trí ảnh trong dữ liệu sản phẩm; cập nhật kiểm thử và tài liệu; chạy toàn bộ phép kiểm; viết ba bản ghi bắt buộc. **Không thay đổi một mệnh đề học thuật nào.** |
| **Prompt nguyên văn** | Lưu đầy đủ, không cắt: [`prompts/P-IMG-04.txt`](prompts/P-IMG-04.txt) |
| **Tóm tắt kết quả** | Xem bên dưới |
| **Cách đối chiếu lại với giáo trình gốc** | Xem bên dưới |

---

### Tóm tắt kết quả

**Việc kiểm tra trước khi sửa bất cứ thứ gì.**
Đọc `CLAUDE.md`, `AGENTS.md`, `CREATIVE_SPATIAL_JOURNEY_REPORT.md`,
`SPATIAL_JOURNEY_DESIGN_DECISION.md`, `REFERENCE_ANALYSIS.md`, sổ nguồn ảnh, và các Prompt Log
trước. Đọc mô hình vị trí ảnh **từ mã** (`FIGURE_SLOTS`) chứ không chép từ tài liệu — đúng bài học
đã ghi hai lần trong sổ nguồn. Build và chạy sản phẩm, chụp toàn bộ ba khổ màn hình **trước khi**
sửa gì.

**Kho tham khảo: quét hết, dùng zero.**
Đọc toàn bộ `_reference/creative_product_HCM202`: 41 sự kiện, **68 mục media**, 34 tên miền.
Kết quả đếm bằng máy từ chính tệp JSON: **0 mục** có trang bản ghi hiện vật, **0 mục** có ký hiệu
kho, **0 mục** có tên người chụp, **0 mục** có điều kiện sử dụng. Trường duy nhất về nguồn là một
dòng nhà phát hành (`Nguồn: Báo …`, `Nguồn: Traveloka`, `Nguồn: Mia.vn`).
**Không ảnh nào được đưa vào sản phẩm.** Trạng thái ghi đúng là **`NEED VERIFICATION`**
(52 mục) và **`REJECT`** (16 mục) — **không phải “bị cấm dùng lại”**. Bảng đầy đủ và lý do từng
nhóm ở `REFERENCE_IMAGE_AUDIT.md`.

Kho này vẫn có giá trị, và giá trị ấy được ghi lại: nó xác nhận rằng hướng đi đúng là **kho lưu
trữ**, không phải báo chí; và nó chỉ ra **hai bảo tàng quốc gia đáng hỏi** (Bảo tàng Lịch sử Quốc
gia, Bảo tàng Hồ Chí Minh) kèm bằng chứng rằng tư liệu liên quan thật sự nằm ở đó. Đó là nội dung
cụ thể cho thư xin phép — **vẫn chưa gửi cho ai**.

**Bốn tài liệu mới, từ hai cơ quan giữ hiện vật.**

| Vị trí | Tài liệu | Nơi giữ |
|---|---|---|
| `FS-ky-1-b` | Bản đồ “Province de Nghe-An”, 1909, tấm XXXII của “Atlas général de l’Indo-Chine française” | **Humazur, Université Côte d’Azur** — ASE 2296-65, ark:/17103/d610 |
| `FS-ky-3-c` | Trang nhất `le Paria` số 2, ngày 1-5-1922 | BnF — JO-35859 |
| `FS-ky-5` | Bìa `France-Illustration` số 41, 13-7-1946, “M. HO CHI MINH A VERSAILLES” | BnF — FOL-LC2-6766 |
| `FS-ky-5-c` | `France-Illustration` số 52, 28-9-1946, tr. 295, ảnh ký modus vivendi | BnF — FOL-LC2-6766 |

Số vị trí đã điền: **4/11 → 8/13** (hai vị trí bổ trợ mới được khai báo cho chặng 3 và chặng 5;
mô hình dữ liệu vốn đã cho phép 1–3 vị trí bổ trợ mỗi chặng).

**`FS-ky-5` là vị trí ảnh chính đầu tiên của một chặng được điền.**
Lý do được phép điền là hẹp, và phải đọc đúng: **ấn phẩm tự in tên nhân vật trong chú thích ngay
dưới bức ảnh, năm 1946**, và ngày in 13-7-1946 nằm trong thời kỳ của chặng 5. Đó là mức chứng cứ
khác hẳn một ảnh được người dùng lại gán tên về sau. **Bốn vị trí chính còn lại vẫn trống** và
không được lấp bằng một chân dung mượn — đúng quy tắc §10 của prompt.

**Ba sai sót của các đợt trước được sửa và ghi lại, không xoá bản cũ.**

1. `SC-9` (17-9) kết luận Gallica **không có** tờ `Le Paria`. **Sai vì cách đặt truy vấn**, không
   phải vì Gallica thiếu tài liệu. Dòng cũ giữ nguyên; `SC-19` ghi phần sửa.
2. Sổ nguồn (17-9) viết “bộ ảnh báo chí Meurisse/Rol **không phủ năm 1946**”, và suy ra rằng
   hướng ảnh 1946 không có gì để lấy. Vế đầu đúng, **vế suy ra sai**: Gallica có tuần báo
   *France-Illustration* 1945-1948 với `dc:rights` “domaine public”. Đã đính chính tại chỗ.
3. `SC-13` (17-9) để `FS-ky-1-b` trống vì **người viết bản ghi chưa tự mở lại trang điều kiện của
   Humazur**. Lần này đã mở và đọc trực tiếp (`SC-18`), nên điểm treo được gỡ đúng cách.

**Một quyết định KHÔNG tự lấy, và được ghi lại để hỏi người duyệt.**
Tấm chân dung Marseille đang ở màn mở đầu mang mốc 26-12-1921 của BnF, **nằm trong** thời kỳ của
chặng 3. §15 của prompt cho phép dùng một chân dung làm neo của chặng nếu giao diện trình bày nó
chỉ như chân dung. Nhưng chuyển nó sang chặng 3 sẽ làm trống màn mở đầu, và §9 cấm lặp một chân
dung ở hai chỗ; hơn nữa quyết định để tấm này ngoài mọi chặng là một quyết định **đã ghi rõ lý do**
từ đợt trước. `SC-22` ghi lại nguyên trạng câu hỏi, và ô ảnh chính của chặng 3 vẫn trống — **trống
vì lý do này, không phải vì không tìm được gì**.

> *[Đính chính 19-9-2026 — xem P-IMG-05 và `SC-25`: đoạn ngay dưới đây suy từ “truy vấn chưa trả
> về gì” thành “không có gì để tra”. Bản ghi P-IMG-04 **không bị sửa** theo quy ước của tệp này;
> dòng này là con trỏ tới chỗ đã sửa. Trạng thái đúng của chặng 4:
> `BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`.]*

**Chặng 4 vẫn trống cả hai ô, và lý do là của nguồn chứ không phải của người tìm.**
`SC-23`: trích đoạn ở chặng 4 **không gọi tên một ấn phẩm hay hiện vật nào** — nó nêu nghị quyết
Hội nghị Trung ương 10-1930, thời gian ở Liên Xô 1934-1938, và Hội nghị Trung ương lần thứ tám
5-1941. Không có gì để tra ở kho châu Âu.

**Kiến trúc: mở rộng tối thiểu, không viết lại.**
Bản khắc SVG, sổ địa điểm, điều hướng, chế độ trình bày, hỗ trợ ngoại tuyến — **giữ nguyên**.
Thay đổi về mã chỉ gồm: hai vị trí bổ trợ mới trong dữ liệu; một neo chuyển từ `TP1` sang `P1-1`
(vì tài liệu là bản đồ tỉnh mà chặng **mở đầu** bằng, không phải mốc rời đi); một quy tắc CSS giới
hạn **chiều ngang** của khung ảnh ở lối vào chặng — không bao giờ giới hạn chiều cao, vì khung lấy
đúng tỷ lệ của tài liệu và giới hạn chiều cao sẽ cắt hoặc viền đen tài liệu.

**Kiểm thử: không nới một phép nào, thêm sáu phép mới.**
Các phép kiểm đếm cứng được cập nhật **trung thực** (11 → 13 vị trí, 4 → 8 đã điền, 15 → 23 lượt
kiểm nguồn), và số được ghim cố ý kèm lý do: một phép kiểm trình duyệt không import được module dữ
liệu, nên con số suy ra sẽ không kiểm gì cả. Phép kiểm mới: mọi tệp ảnh phải **tồn tại trên đĩa**;
**không ảnh nào được dùng hai lần**; **bốn trục chứng cứ không được mang cùng một nội dung**;
điều kiện sử dụng phải đọc **trên chính tên miền của nơi giữ hiện vật**; và **không trường nguồn
nào được chứa** `github`, `gitlab`, `creative_product_HCM202`, `wikipedia`, `commons.wikimedia`.

**Một chỗ suýt tự lừa mình, và cách xử lý.**
Khi thêm `.figure__cap` vào danh sách “signage” của `tools/word-budget.mjs`, con số của màn mở đầu
tụt từ `prose 98` xuống `prose 61` và **kết luận đổi từ `over, close` thành `OK`** — tức là phép đo
đang nịnh sản phẩm. Danh sách được thu hẹp lại: chỉ dòng ghi nguồn, nhãn trạng thái và hai nút mới
chuyển sang cột signage; **chữ trong chú thích vẫn tính là prose**. Màn mở đầu trở lại
`over, close`. Chênh lệch thật sau khi thu hẹp: đúng **một dòng** thay đổi
(`stage 2 - passage stop`, `prose 141 → 121`), kết luận `OVER` trước và sau như nhau.

---

### Cách đối chiếu lại với giáo trình gốc

Mỗi tài liệu được gắn vào một câu **cụ thể** của trích đoạn, và việc gắn ấy được kiểm ngược lại
bản in:

| Vị trí | Câu trong trích đoạn (Giáo trình Tư tưởng Hồ Chí Minh - 2019) | Căn cứ gắn |
|---|---|---|
| `FS-ky-1-b` | `P1-1`, tr. 28: “Nghệ An là vùng đất giàu truyền thống yêu nước…” | Tài liệu là bản đồ **chính tỉnh ấy**, năm 1909, nằm trong thời kỳ của chặng. Hai địa danh mà `P1-4` nhắc — **Vinh** và vùng **Nam Đàn** — đọc được trực tiếp trên tấm bản đồ. |
| `FS-ky-3-c` | `P3-4`, tr. 30: “Năm 1922… **sáng lập báo Le Paria** bằng tiếng Pháp…” | Bản ghi BnF là chính tờ báo mang tên ấy, ra năm ấy. |
| `FS-ky-5` | Tiêu đề chặng 5, tr. 32: “Thời kỳ từ ngày **29-1-1941** đến ngày **2-9-1969**” | Ngày in 13-7-1946 **nằm trong** khoảng ấy; tên nhân vật do ấn phẩm in dưới ảnh. |
| `FS-ky-5-c` | `P5-5`, tr. 33-34: “Từ ngày 2-9-1945 đến ngày 19-12-1946… lúc thì **tạm hoà hoãn với Pháp**…” | Tài liệu đương thời của chính khoảng ấy, về chính việc thương lượng với Pháp. |

**Điều được kiểm ngược trên chính bản quét giáo trình**, không lấy từ trí nhớ:
mốc `5-6-1911` / `6-6-1911`, `30-12-1920` / `31-12-1920`, `3-2-1930` / `4-2-1930`,
`28-1-1941` / `29-1-1941`, `2-9-1969`; tên `Le Paria` in nguyên văn ở tr. 30; và cụm
“tạm hoà hoãn với Pháp” ở `P5-5`. **Không mốc nào bị làm tròn, nới, hay chuyển sang cách ghi khác.**

**Điều AI KHÔNG được dùng để làm, và đã không làm:**
không tạo, mô phỏng, phục dựng, tô màu, ghép mặt, làm chuyển động hay lồng tiếng bất kỳ tư liệu
nào. Bốn tệp giao ra chỉ được **thu nhỏ và mã hoá lại**; **không cắt cúp**; con dấu thư viện, dấu
lưu chiểu và ký hiệu kho viết tay đều **giữ nguyên** vì chúng là một phần của tài liệu — và với
Humazur, việc giữ phần ghi nguồn in chìm là **điều kiện sử dụng bắt buộc**.

**Điều AI không thay thế được:**
không dữ kiện nào ở đây được coi là đã xác thực học thuật. Cả tám tài liệu vẫn mang
`NEED VERIFICATION`. Việc nhân vật mà BnF và France-Illustration gọi tên đúng là nhân vật của trích
đoạn **cần một nguồn học thuật được phê duyệt xác nhận**, và **chưa có người thật kiểm** một bản
ghi nào.

---

## P-IMG-05

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 19-9-2026 |
| **Công cụ AI** | Claude Code (Claude Opus 5, cửa sổ ngữ cảnh 1M), chạy trong repository |
| **Việc được hỗ trợ** | Thi hành **ba phán quyết của dự án** do người ra quyết định: xếp loại dè dặt cho tư liệu BnF 1946 và tách quyền thành bốn trục; chuyển tấm chân dung Marseille sang ô ảnh chính của chặng 3; sửa cách nói về chặng 4 từ “đóng” sang “bị chặn”. Cập nhật mã, kiểm thử, ba tài liệu, và chạy lại toàn bộ phép kiểm. **Không thay đổi một mệnh đề học thuật nào. Không thêm một tấm ảnh mới nào.** |
| **Prompt nguyên văn** | Lưu đầy đủ, không cắt: [`prompts/P-IMG-05.txt`](prompts/P-IMG-05.txt) |
| **Tóm tắt kết quả** | Xem bên dưới |
| **Cách đối chiếu lại với giáo trình gốc** | Xem bên dưới |

---

### Tóm tắt kết quả

**Điểm chung của cả ba phán quyết:** không phán quyết nào thêm một tấm ảnh. Cả ba đều là về việc
**nói đúng hơn** những gì đã có — dè dặt hơn ở chỗ nói về quyền, chính xác hơn ở chỗ đặt tấm ảnh,
mở hơn ở chỗ nói về cái chưa tìm thấy.

**Phán quyết 1 — tư liệu 1946: giữ, xếp `USE WITH CAUTION`, tách quyền thành bốn trục.**
Trường `rights` cũ gộp ba thứ vào một chuỗi: nơi giữ tuyên bố gì, điều kiện dùng lại ra sao, và một
câu kết luận. Đó là **đúng lỗi** mà các trục nhận diện / niên đại / địa điểm đã được tách ra để
tránh, với đúng kiểu hỏng ấy: nhãn `domaine public` **có thể bị đọc thành** đã giải quyết cả vị trí
của người chụp. Nay là bốn trường riêng — `holderRightsStatus`, `reuseCondition`,
`printedCreatorCredit`, `creatorRightsCheck` — cộng `reuse`.

Bìa số 41 **có in** “Phot. France-Illustration (Parnotte).”; trang 295 **không in** dòng nào.
Cả hai đều ghi `creatorRightsCheck` là **CHƯA XÁC LẬP**, và việc trang không nêu tên được ghi là
**hiện vật không nêu ai**, không phải “không có người chụp”.

Quy tắc được áp **nhất quán**, không chỉ cho 1946: hiện vật **là ảnh chụp và có người tạo lập được
nêu tên** → `USE WITH CAUTION` (4 tài liệu, gồm cả hai tấm Meurisse 1920/1921); hiện vật **in** →
`USE` (4 tài liệu). Xếp loại theo **tuổi** tài liệu sẽ là suy đoán về thời hạn quyền — việc mà sản
phẩm không làm. Người duyệt có thể thu hẹp lại chỉ còn 1946; báo cáo nêu rõ đó là lựa chọn hợp lệ.

`USE WITH CAUTION` **không** được nhét vào bộ từ vựng `Provenance` của `AGENTS.md` mục 3 — làm vậy
là âm thầm nới một danh sách mà văn bản quản trị bảo dùng **đúng**. Nó có kiểu riêng
(`ReuseDecision`), và trang Kiểm chứng nay có **hai cột**.

**Phán quyết 2 — chuyển tấm chân dung Marseille sang chặng 3.**
`FS-open` → `FS-ky-3`; `stageId: null` → `'ky-3'`. Lập luận cũ **đúng** ở chỗ: Đại hội Marseille
nằm ngoài trích đoạn, và ảnh không bao giờ được dùng để minh hoạ nó. Lập luận cũ **sai** ở chỗ: nó
để một dữ kiện về **sự kiện** quyết định một câu hỏi về **thời kỳ**. Mốc 26-12-1921 của bản ghi nằm
trong khoảng 31-12-1920 → 3-2-1930.

**Giới hạn đi theo tấm ảnh, không ở lại trong tài liệu:** `eventCheck` vẫn nói sự kiện nằm
**NGOÀI** trích đoạn, và câu ấy **hiển thị trong sản phẩm**. Một phép thử đơn vị và một phép thử
trình duyệt đều kiểm câu ấy còn trên màn hình sau khi chuyển — tức việc chuyển chặng không được
nới rộng điều tấm ảnh khẳng định.

**Màn mở đầu:** ô `FS-open` trống lại và **vẫn được khai báo**. Không nhân đôi tấm ảnh (không giải
thích được vì sao nhân đôi làm trải nghiệm tốt hơn: cùng khuôn mặt, cùng chú thích, cùng dòng ghi
nguồn, cách nhau một cú nhấp), và không xoá ô (làm khoảng trống biến mất thay vì báo cáo nó).
Màn mở đầu do tên sản phẩm, hai dòng dẫn nhập, một hành động chính và **sợi chỉ hành trình** gánh.

**Phán quyết 3 — chặng 4 bị chặn, không bị đóng.**
Hai câu bị sửa: `SC-23` viết chặng 4 *“trống vì trích đoạn không gọi tên một hiện vật nào để lần”*,
và báo cáo viết *“không có gì để lần ở kho châu Âu”*. Cả hai **suy từ “các truy vấn đã làm không
trả về gì” thành “không có gì tồn tại”**. Trạng thái đúng:
`BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`, kèm danh sách các kho **chưa hỏi**.

**Ba phán quyết được ghi thành `SC-24`, `SC-25`, `SC-26`, đặt CẠNH `SC-20`, `SC-22`, `SC-23` chứ
không thay thế chúng.** Lời cũ, lý do cũ và chỗ sai của chúng đều còn nguyên trên trang Kiểm chứng.

**Kiểm thử: không nới một phép nào.** Ba phép thử của màn mở đầu **đi theo tấm ảnh** sang chặng 3
và giữ nguyên từng khẳng định, thay vì bị xoá và viết lại. Thêm một phép thử cho màn mở đầu ở trạng
thái trống, hai phép thử đơn vị cho mô hình quyền, và các phép thử đếm quyết định dùng lại.
Phép thử quan trọng nhất của đợt này: **hiện vật nào có ghi người tạo lập in trên mình thì không
được mang `USE`** — nó sẽ đỏ nếu về sau có người đọc `domaine public` thành đã giải quyết vị trí
của người chụp.

**Hai lỗi giao diện do chính thay đổi này gây ra, tự phát hiện bằng mắt và đã sửa:** cột mới làm ô
hẹp lại khiến `NEED VERIFICATION` bị cắt giữa từ thành `VERIFICATIO / N`; và thứ tự vị trí đọc
thành 5, 5-c, 5-b. Cả hai được sửa ở gốc.

---

### Cách đối chiếu lại với giáo trình gốc

Đợt này **không thêm, không sửa, không bỏ một mệnh đề học thuật nào**. Điều duy nhất được đối chiếu
lại với bản in là **khoảng thời gian của chặng 3**, vì nó là căn cứ của phán quyết 2:

| Kiểm | Kết quả |
|---|---|
| Tiêu đề chặng 3, `Giáo trình Tư tưởng Hồ Chí Minh - 2019`, tr. 31 | “Thời kỳ từ ngày **31-12-1920** đến ngày **3-2-1930**” |
| Mốc trong bản ghi BnF của tấm ảnh | `dc:date` “1921”, `dc:coverage` “26 décembre 1921” |
| Mốc ấy có nằm trong khoảng của chặng không | **Có** — và đó là **toàn bộ** căn cứ của việc gắn chặng |
| Trích đoạn có kể Đại hội Marseille không | **Không.** Trích đoạn kể Đại hội **Tua**, 25 đến 30-12-1920 (tr. 29). Ảnh **không bao giờ** được dùng để minh hoạ Marseille |

Mốc `31-12-1920` và `3-2-1930` được kiểm lại trực tiếp trên bản quét, không lấy từ trí nhớ, và
`content.test.ts` khoá chúng bằng máy qua `headingPeriod` của chặng 3.

**Điều AI không được dùng để làm, và đã không làm:** không tạo, mô phỏng, phục dựng, tô màu, ghép
mặt, làm chuyển động hay lồng tiếng bất kỳ tư liệu nào. **Không tệp ảnh nào bị thêm, sửa, cắt hay
mã hoá lại trong đợt này** — tám tệp giao ra giữ nguyên byte và nguyên mã băm SHA-256 của ngày 18-9.

**Điều AI không thay thế được:** cả tám tài liệu vẫn `NEED VERIFICATION`; bốn tài liệu nay còn mang
thêm `USE WITH CAUTION` với `creatorRightsCheck` là **CHƯA XÁC LẬP**. **Chưa có người thật nào kiểm
một bản ghi nào.**
