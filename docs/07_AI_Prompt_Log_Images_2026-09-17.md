# PROMPT LOG — phiên làm việc ảnh tư liệu và hoạt ảnh, 17-9-2026

> **Trạng thái:** `PROJECT DECISION` về cách ghi chép. Bản ghi làm việc, chưa phải bản nộp.
> Sổ chính thức thuộc Folder `07_AI_Declaration_Integrity_PromptLog` trên Drive của nhóm.
> Tiếp nối `07_AI_Prompt_Log_UX_2026-09-16.md` và `07_AI_Prompt_Log_UX_2026-09-17.md`.

Sáu trường bắt buộc theo `AGENTS.md` mục 9.

---

## P-IMG-01

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ AI** | Claude Code (Anthropic), mô hình Opus 5, chạy trong VS Code |
| **Tác vụ hỗ trợ** | Kể chuyện bằng ảnh tư liệu và hoạt ảnh có ý nghĩa: audit, tìm nguồn ảnh, dựng hệ thống vị trí ảnh, thêm hoạt ảnh, kiểm thử. |
| **Câu lệnh nguyên văn** | `docs/prompts/P-IMG-01.txt` |
| **Tóm tắt output** | **Không ảnh nào được đưa vào sản phẩm.** Ba nguồn đã mở và kiểm; cả ba không đủ điều kiện (chi tiết ở mục dưới). Theo đúng chỉ dẫn “nếu thiếu nguồn hoặc quyền sử dụng, giữ mục đó bị chặn”, đã dựng: sáu vị trí ảnh có kiểu dữ liệu đầy đủ, trạng thái chặn hiển thị rõ, khung ảnh + chú thích + nguồn + ô xem lớn sẵn sàng, một mục mới trên trang Kiểm chứng công bố sáu vị trí và ba nguồn đã kiểm. Thêm ba hoạt ảnh và giữ ngân sách 1–2 chuyển động mỗi màn. Thêm 5 kiểm thử đơn vị và 6 kiểm thử trình duyệt. |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | **Không phát sinh nội dung học thuật mới, nên không có luận điểm nào cần đối chiếu.** Phiên này không thêm, sửa hay xoá một câu nội dung học thuật nào; các tệp `stages.ts`, `locators.ts`, `interactions.ts` vẫn nguyên hash. Riêng với ảnh: **việc kiểm nguồn đã được thực hiện thật** — ba trang đã được mở và trích nguyên văn điều mỗi trang ghi — và kết quả là **không trang nào cho phép dùng lại**, nên không có ảnh nào được đưa vào. **Việc đối chiếu trích đoạn với giáo trình chính thống vẫn chưa thực hiện và vẫn là `NEED VERIFICATION`.** |

### Ba nguồn đã mở, và vì sao không dùng được

| Trang | Loại | Nguyên văn trang ghi | Kết luận |
|---|---|---|---|
| `baotanghochiminh.vn` | Bảo tàng chính thức | “© 2017 Bảo tàng Hồ Chí Minh. All rights reserved.” | Không có điều kiện cho phép dùng lại → **không tải về** |
| `hochiminh.vn` | Trang chính thức | “Bản quyền thuộc Cục Chuyển đổi số - Cơ yếu” | Như trên → **không tải về** |
| `commons.wikimedia.org/.../Ho_Chi_Minh_-_1946_Portrait.jpg` | Kho ảnh cộng đồng | Nhãn “Public domain” + “CC Public Domain Mark 1.0”; Source: **HistoryNet** (tạp chí phổ thông); Author: “Unknown author”; Date: “circa 1947” | **Không phải cơ quan lưu trữ.** Tên tệp ghi “1946” nhưng trường ngày ghi “circa 1947” — mâu thuẫn nội tại. Cơ sở hết hạn bản quyền dựa vào năm công bố lần đầu mà tác giả lẫn năm công bố đều không xác định → **không dùng** |

**Nguyên tắc đã áp dụng:** không tải, không đóng gói, không gắn vào chặng nào, không dựng ảnh
thay thế, và **không dùng AI tạo/mô phỏng/phục dựng/tô màu/làm chuyển động chân dung** dưới bất
kỳ hình thức nào.

---

## P-IMG-02 … P-IMG-07 — tra cứu `ui-ux-pro-max`

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ** | `.claude/skills/ui-ux-pro-max/scripts/search.py` (Python cục bộ, không gọi mạng, không sinh văn bản) |
| **Tác vụ hỗ trợ** | Tra cứu về phân cấp hình ảnh và motion |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | **Không áp dụng** — khuyến nghị thiết kế, không phải nguồn học thuật, không phải bằng chứng người học |

Nguyên tắc giữ từ phiên trước: mỗi truy vấn **một mục đích**; chỉ trích dẫn kết quả **đúng mục
đích**; lệch thì thử lại **một lần** rồi ghi “không tìm được kết quả phù hợp”; ghi rõ đâu là
**kết quả CLI** và đâu là **hướng dẫn chung trong `SKILL.md`**.

| Mã | Câu lệnh | Mục đích | Đúng mục đích? | Quyết định |
|---|---|---|---|---|
| P-IMG-02 | `"image caption credit" --domain ux -n 4` | Phân cấp ảnh – chú thích – nguồn | ❌ Trả về tối ưu ảnh, scaling, asset weight | **Loại bỏ.** Thử lại |
| P-IMG-03 | `"alt text meaningful images" --domain ux -n 4` | Như trên, thu hẹp | ⚠️ Trúng **alt text** (KQ1 `Alt Text`: “Descriptive alt text for meaningful images”) nhưng **vẫn không có quy tắc nào về chú thích/ghi nguồn** | **Áp dụng** phần alt text. Về bố cục chú thích + ghi nguồn: **không tìm được kết quả phù hợp** — thiết kế phần đó là quyết định của nhóm, không có căn cứ từ skill |
| P-IMG-04 | `"image dimensions layout shift" --domain ux -n 4` | Tránh nhảy bố cục khi ảnh tải | ✅ KQ2 `Content Jumping`: “Reserve appropriate space… **aspect-ratio for media**”. KQ3 `Image Optimization` (WebP, srcset), KQ4 `Image Scaling` (`max-width: 100%`) | **Áp dụng cả ba**: mỗi ảnh ghi `width`/`height` + `aspect-ratio` nên hộp được giữ chỗ trước khi tệp về; `max-inline-size: 100%`; quy ước WebP ghi trong sổ nguồn ảnh |
| P-IMG-05 | `"animation expresses cause and effect" --domain ux -n 5` | Chuyển động thể hiện nhân quả | ⚠️ Một phần. KQ1 `Excessive Motion`: “**Animate 1-2 key elements per view maximum**”. KQ3 `Continuous Animation`: “Infinite animations are distracting”. KQ4 `Reduced Motion` | **Áp dụng cả ba như ràng buộc** — và KQ1 **cắt bớt kế hoạch**: ngân sách xuống 1–2 chuyển động mỗi màn. KQ2, KQ5 lệch mục đích, **không trích dẫn**. Riêng ý “mỗi hoạt ảnh phải thể hiện quan hệ nhân–quả” là **hướng dẫn chung `motion-meaning` ở Quick Reference §7 của `SKILL.md`, không phải kết quả CLI** |
| P-IMG-06 | `"modal dismiss escape close" --domain ux -n 4` | Đóng ô xem ảnh lớn | ⚠️ Chỉ 1 kết quả, `Focus States` — đúng về **vòng focus trong modal**, **không nói gì về cách đóng** | **Áp dụng** phần focus ring. Cách đóng (Esc, nút đóng, bấm nền, trả focus về nút mở, giữ Tab trong hộp) lấy từ **hướng dẫn chung `modal-escape` / `escape-routes` trong `SKILL.md`**, không phải kết quả CLI |
| P-IMG-07 | `"museum exhibit storytelling" --design-system` | Hướng thị giác kể chuyện | ⚠️ Một phần (đã chạy ở phiên trước, kết quả không đổi): mẫu `Scroll-Triggered Storytelling` đúng loại; phần màu/phông vẫn là bảng đen–trắng | **Giữ** “Use progress indicator”. **Loại lại** màu/phông, cùng lý do đã ghi hai phiên trước: dấu tiếng Việt và nghĩa đang gán cho `--son`/`--cham`/`--verify` |

**Tóm lại:** 2 truy vấn cho kết quả đúng mục đích (P-IMG-04, và một phần P-IMG-03/05/06);
**1 vấn đề không tìm được kết quả phù hợp** (bố cục chú thích + ghi nguồn);
**2 phần thiết kế dựa trên hướng dẫn chung của `SKILL.md`, không phải kết quả CLI** (nhân–quả
của chuyển động; cách đóng hộp thoại).

---

## Đối chiếu kiểm chứng — đã làm và còn nợ

**Đã làm**

- Kiểm lại SHA-256 ba PDF: khớp.
- Mở và trích nguyên văn ba trang nguồn ảnh; kết luận: không trang nào cho phép dùng lại.
- 62 kiểm thử đơn vị, 162 kiểm thử trình duyệt trên ba khung màn, đều xanh.
- Kiểm tương phản 65 lớp chữ trên 11 tuyến, nền sáng và nền tối; kiểm cỡ chữ 200%.
- Bản offline: 11 tuyến, **0 request mạng, 0 lỗi**.

**Còn nợ**

- **Chưa có ảnh tư liệu nào.** Cần một người thật xin phép cơ quan lưu trữ/bảo tàng, hoặc hỏi
  giảng viên xem trường có kho ảnh dùng được không. Biểu mẫu trống:
  `docs/08_Image_Source_Register_TEMPLATE.md`.
- Đối chiếu trích đoạn với giáo trình chính thống.
- Soát mười ứng viên định vị; soát từng trang PDF bằng mắt.
- Bốn dạng in đã ghi ở phiên 16-9.
- Phê duyệt Câu hỏi trung tâm.
- **Thử nghiệm người dùng thật.** Không có dòng dữ liệu nào được tạo. Mọi nhận định về việc sản
  phẩm hấp dẫn hơn vẫn là **giả thuyết**.
