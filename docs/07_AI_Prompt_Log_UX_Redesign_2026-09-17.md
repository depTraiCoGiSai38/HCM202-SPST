# Prompt Log — đợt thiết kế lại UX/UI, 17-9-2026

> Bản ghi này thuộc Folder `07_AI_Declaration_Integrity_PromptLog`.
> `AGENTS.md` §9 yêu cầu sáu trường cho mỗi prompt: ngày dùng, công cụ AI, việc được hỗ trợ,
> prompt nguyên văn, tóm tắt kết quả, cách đối chiếu lại với giáo trình gốc.
>
> Trạng thái: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.

---

## P-UX-12

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ AI** | Claude Code (Claude Opus 5), chạy trong repository, có skill `ui-ux-pro-max` |
| **Việc được hỗ trợ** | Thiết kế lại UX/UI toàn sản phẩm theo 5 giai đoạn bắt buộc: audit có số đo → tuyên bố hướng thiết kế → triển khai → kiểm thử → báo cáo. Không đụng tới nội dung học thuật. |
| **Prompt nguyên văn** | Lưu đầy đủ, không cắt: [`prompts/P-UX-12.txt`](prompts/P-UX-12.txt) (17 778 ký tự) |
| **Tóm tắt kết quả** | Xem bên dưới |
| **Cách đối chiếu lại với giáo trình gốc** | Xem bên dưới |

### Tóm tắt kết quả

**Đo trước khi sửa.** Viết `web/tools/audit-density.mjs`; lấy mốc đối chiếu bằng cách dựng
`git worktree` ở commit `91d52c2`, build và đo bằng chính script đó trên 7 tuyến × 3 khung màn.
Số "trước" trong báo cáo là số đo thật, không phải ước lượng.

**Thay đổi chính.**

1. Gộp 6 hệ điều hướng thành 1 (mục lục mở theo yêu cầu) + 1 dải chỉ vị trí không chứa liên kết.
   Xoá `components/rail.ts`, xoá thanh chuyển chặng cuối trang, và xoá toàn bộ CSS của chúng.
2. Màn mở đầu: danh tính + ảnh tư liệu + 2 dòng dẫn + 1 hành động chính. Câu hỏi trung tâm
   chuyển sang mục riêng `CÂU HỎI DẪN ĐƯỜNG`, **nguyên văn**.
3. Lối vào chặng dựng thành lối vào chương: `CHẶNG 02 / 05`, cụm thời kỳ cỡ trưng bày,
   cột mốc thời gian in trong chặng làm neo thị giác.
4. Bỏ hàng 5 nút "phần của chặng"; thay bằng một dòng chú trên sợi chỉ và một vạch cao ở mỗi chỗ
   đổi loại nhịp. **Bỏ số thứ tự phần**, vì nó chạy ngược ở 4 trong 5 chặng.
5. **Bước ngoặt phá vỡ nhịp**: rộng hơn thước đọc, nền riêng, mốc in cỡ trưng bày, hai sợi hội tụ
   thành một khi người học tự vượt qua.
6. **Thêm nhịp Suy ngẫm** trước phần bàn giao, dựng từ hai vị trí trước/sau đã lưu của chặng, và
   đặt ở đó lời mời vào ba hoạt động (sau chặng 2, 3 và 5).
7. **Thêm khối "đi tiếp"** cho bốn màn trước đây không có một liên kết nào trong `<main>`.
8. Trích dẫn nguyên văn chuyển về đứng cạnh bước ngoặt dẫn nó, thay vì dồn xuống cuối chặng.
9. Thứ tự trên điện thoại sắp lại đúng thứ tự bản yêu cầu nêu (chân dung → mốc → hook).
10. Khai báo vị trí ảnh **bổ trợ** cho mỗi chặng; viết lại toàn bộ mô tả vai trò để trả lời
    "vì sao ảnh này ở đây"; tách sáu trục kiểm thành sáu trường riêng.
11. Gộp hai cỡ chữ vi mô thành `--step--3`; đo chiều cao thanh dính thành `--chrome-h`; chuyển mọi
    trạng thái *được chọn* khỏi màu đỏ; cắt chữ rộng 78ch về thước đọc; mục lục thành `nav` có tên.

**Kết quả đo sau khi sửa** (cùng một phiên bản công cụ trên cả hai bản). Hệ điều hướng trên màn
chặng: 6 → 2 (desktop), 6 → 1 (tablet), 4 → 1 (mobile). Nút khung trong fold: 14 → 5 trên mọi tuyến
sau màn mở đầu. Từ trong fold màn mở đầu: 511 → 117. Nhãn trạng thái thường trực: màn chặng 11 → 4,
`#/noi-ket` 11 → 3, `#/tong-hop` 4 → 1. Thanh đầu trang ở 390px: 3 dải xếp chồng → 2 hàng, 112px.

**Ba lỗi thật, đã tự phát hiện và sửa:**

- **Bản ghi kiểm chứng báo cáo sai trạng thái bằng chứng.** `#/kiem-chung` in "Hiện chưa vị trí nào
  được điền" và gắn `NOT YET EVIDENCED` cho mọi hàng, kể cả bức ảnh đã đủ căn cứ và đang hiển thị
  ở màn mở đầu. Nguyên nhân: trạng thái tổng là hằng số viết tay, không ai dời khi bức ảnh đầu tiên
  đủ căn cứ. Theo `AGENTS.md` đây là hướng sai không được để lại. Đã sửa: mọi con số và trạng thái
  trên màn ấy suy ra từ dữ liệu, kèm hai kiểm thử đơn vị buộc hai bên không thể lệch nhau.
- **Bản dựng ngoại tuyến hỏng toàn bộ** (`Unexpected token '<'`), do lỗi tiềm ẩn trong
  `tools/bundle-offline.mjs`: chuỗi `$&` trong mã đã rút gọn bị `String.replace` hiểu là chỉ thị.
  Đã sửa bằng hàm thay thế.
- **Dải chỉ vị trí trống trên 4 trong 8 màn**, do khoá theo tên tuyến của router thay vì theo địa
  chỉ. Đã sửa và đã thêm kiểm thử đi qua **từng** địa chỉ.

**Và một đính chính về chính công cụ đo.** Bản đầu của `tools/audit-density.mjs` đếm nhãn trạng
thái bằng một danh sách trong đó hai bộ chọn đã chết, đồng thời bỏ sót phần lớn bộ đếm mà bản yêu
cầu hỏi tới; nó cũng đếm ảnh trên toàn trang trong khi cột được gắn nhãn là "trong fold". Con số
"6 → 1" từng báo cáo là sản phẩm của công cụ ấy. Công cụ đã sửa để liệt kê mọi nhãn tồn tại ở **một
trong hai bản** và in phân tách theo lớp; mọi số trong báo cáo đã đo lại trên cả hai bản.

**Kiểm thử sau cùng:** 177/177 Playwright trên 3 khung màn; 67/67 Vitest; tương phản đạt;
chữ 200% không tràn; ngoại tuyến 11/11 tuyến, 0 yêu cầu mạng; chế độ trình bày mở được.

**Điều AI **không** làm được và đã nói rõ:** mệnh lệnh *"EVERY STAGE MUST HAVE A PRIMARY AUTHENTIC
IMAGE OF HỒ CHÍ MINH"* trong prompt **không thực hiện được** — tính tới nay chỉ một bức ảnh đủ căn
cứ trên cả ba mặt (định danh/xuất xứ, sự kiện ghi trong bản ghi, điều kiện sử dụng), và nó đang ở
màn mở đầu. Sản phẩm khai báo **11 vị trí** (1 màn mở đầu + 5 vị trí chính + 5 vị trí bổ trợ);
**1 đã điền, 10 còn bị chặn** và hiển thị rõ là đang bị chặn. Không lấp bằng ảnh không liên quan,
không tạo ảnh bằng AI.

### Cách đối chiếu lại với giáo trình gốc

Đợt này **không sửa một câu nội dung học thuật nào**. Việc đối chiếu vì vậy là kiểm tra rằng
nội dung đã lưu **không bị thay đổi** bởi các thay đổi giao diện:

1. **Năm tiêu đề thời kỳ.** Kiểm thử đơn vị `each heading matches the exact Vietnamese wording,
   character for character` so từng ký tự với hằng số `EXACT_HEADINGS`. Lối vào chặng nay sắp chữ
   tiêu đề thành hai vế, nên kiểm thử `period and claim parts recompose into the full heading`
   khẳng định `headingPeriod + ': ' + headingClaim` **bằng đúng** chuỗi `heading` đã lưu, cho cả
   năm chặng. Kiểm thử trình duyệt `the five exact headings are rendered in full` đọc lại
   `textContent` của `h1` trên từng chặng và so với chuỗi gốc.
2. **Câu hỏi trung tâm.** Câu được sắp chữ thành hai vế tại chỗ ngắt `mà được hình thành`;
   kiểm thử đơn vị ghép hai vế lại và so với `CENTRAL_QUESTION`. Không ký tự nào bị thêm hoặc bớt.
3. **Chuỗi thời gian.** Bản yêu cầu gợi ý in mốc dạng `1911 — 1920`. **Đã từ chối.** Trích đoạn in
   *"từ giữa năm 1911 đến cuối năm 1920"*; nén thành khoảng số là nâng cấp độ chính xác mà
   `C2-R01`, `C2-R02`, `C2-R03` cấm. Cột mốc thời gian hiển thị **đúng chuỗi đã lưu**, đúng thứ tự,
   cùng một cỡ chữ — nhấn một mốc hơn mốc khác sẽ là một khẳng định mà trích đoạn không đưa ra.
   Kiểm thử `journey geometry encodes the printed boundaries` vẫn khẳng định ranh giới cuối 1920 và
   đầu 1941 được vẽ **chồng lấn**.
4. **Ba tệp PDF.** Kiểm SHA-256 ngày 17-9-2026: cả ba khớp giá trị ghi trong `AGENTS.md` §1.
5. **Vẫn phải làm bằng tay.** Bản thân trích đoạn `C2-02.pdf` mang dấu hiệu xuất xứ Studocu và
   vẫn ở trạng thái `NEED VERIFICATION`. Không kiểm thử nào ở trên xác thực *nội dung học thuật*;
   chúng chỉ chứng minh sản phẩm hiển thị đúng thứ đã lưu. Việc đối chiếu với giáo trình chính
   thống là việc của người, chưa làm.

### Kết quả CLI của `ui-ux-pro-max` đã dùng

Ba truy vấn, mỗi truy vấn một mục đích:

| Truy vấn | Kết quả | Dùng làm gì |
|---|---|---|
| `"current location indicator active state" --domain ux` | `Active State` — vị trí hiện tại phải được chỉ ra bằng thị giác | Đánh dấu chặng hiện tại trong mục lục và trên dải vị trí |
| `"sticky header obscuring content offset" --domain ux` | `Sticky Navigation` — thanh dính không được che nội dung; cần khoảng bù bằng chiều cao thanh | Đo chiều cao thật thành `--chrome-h`, dùng cho `scroll-margin` của focus |
| `"page transition spatial continuity forward navigation" --domain ux` | **lệch chủ đề** | **Loại bỏ.** Không viện dẫn cho quyết định chuyển cảnh |

Hai truy vấn về "một mô hình điều hướng duy nhất" đều lệch chủ đề (đã thử lại một lần với truy vấn
hẹp hơn theo hợp đồng của skill). Căn cứ cho quyết định gộp điều hướng vì vậy là **số đo của chính
dự án** cộng **hướng dẫn chung trong `SKILL.md`** (bảng Rule Categories mục 9, anti-pattern
`Overloaded nav`) — **không phải** một kết quả CLI, và được ghi đúng như vậy trong
[`../UX_REDESIGN_REPORT.md`](reports/UX_REDESIGN_REPORT.md) §5.

---

## Ghi chú về cách ghi căn cứ

Đợt 16-9-2026 từng gán nhầm một kết quả phụ (`Color Contrast`) của một truy vấn về reduced motion
làm căn cứ cho việc sửa tương phản; lỗi đó đã được đính chính tại chỗ trong
`UX_Design_Decisions_2026-09-16.md` và `07_AI_Prompt_Log_UX_2026-09-16.md`.

Từ đợt đó trở đi, kỷ luật được giữ và tiếp tục giữ trong đợt này: **một truy vấn — một mục đích**;
kết quả lệch chủ đề thì thử lại **một lần** với truy vấn hẹp hơn, vẫn lệch thì **loại bỏ và ghi rõ**;
**không** gán kết quả phụ của truy vấn này làm căn cứ cho quyết định khác; và luôn tách
*hướng dẫn chung của skill* khỏi *kết quả CLI thật*.
