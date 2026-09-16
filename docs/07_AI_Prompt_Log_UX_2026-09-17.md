# PROMPT LOG — phiên làm việc UX/UI lần 2, 17-9-2026

> **Trạng thái:** `PROJECT DECISION` về cách ghi chép. Đây là bản ghi làm việc, chưa phải bản nộp.
> Sổ Prompt Log chính thức nằm ở Folder `07_AI_Declaration_Integrity_PromptLog` trên Drive của
> nhóm. Tên tệp biểu mẫu chính xác vẫn `NEED VERIFICATION`.
>
> Tiếp nối `docs/07_AI_Prompt_Log_UX_2026-09-16.md`. Phần đính chính cho phiên trước đã được ghi
> ngay trong tệp đó, không xoá dòng cũ.

Sáu trường bắt buộc theo `AGENTS.md` mục 9: ngày dùng, công cụ AI, tác vụ hỗ trợ, câu lệnh
nguyên văn, tóm tắt output, cách đối chiếu kiểm chứng chéo với giáo trình gốc.

---

## P-UX-11

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ AI** | Claude Code (Anthropic), mô hình Opus 5, chạy trong VS Code |
| **Tác vụ hỗ trợ** | Tiếp tục cải thiện độ hấp dẫn của sản phẩm: audit luồng người học mới, tạo một nhịp khám phá (khơi tò mò → suy nghĩ trước → khoảnh khắc hiểu → dẫn sang chặng sau), tăng sức hút thị giác, kiểm thử. |
| **Câu lệnh nguyên văn** | `docs/prompts/P-UX-11.txt` — lưu nguyên văn, không rút gọn. |
| **Tóm tắt output** | Audit xác nhận 14 thay đổi của phiên trước đều tồn tại trong mã. Ba điểm yếu quan sát được: gần một nửa màn chặng trống ở màn rộng; bước ngoặt — khoảnh khắc quan trọng nhất — bị một khoảng trống 180px và chỉ hiện một phía một lúc; không có lý do nào để sang chặng sau ngoài chữ “Tiếp”. Đã triển khai: hành động mở đầu cụ thể; bảng “Thử đoán trước khi đọc” không bắt buộc, dựng hoàn toàn từ câu trả lời đối sánh có sẵn; bước ngoặt hiện cả hai phía cạnh nhau; lề phải mang bản ghi “Đã làm rõ trong chặng này”; cầu nối in câu hỏi mở đầu của chặng sau. Thêm 6 kiểm thử đơn vị và 5 kiểm thử trình duyệt. |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | **Không phát sinh nhu cầu đối chiếu nội dung học thuật mới, vì phiên này không tạo ra một câu nội dung học thuật nào.** Cụ thể: (a) toàn bộ chữ trong bảng “Thử đoán” là câu trả lời đã lưu sẵn trong `COMPARE_AXES`, kèm vị trí trong trích đoạn — **không có phương án sai nào được bịa ra**, mỗi phương án đều là câu trả lời thật của một chặng khác; (b) câu hỏi in trong cầu nối là chính câu hỏi dẫn vào của chặng sau, đã có từ phiên trước; (c) bản ghi “Đã làm rõ” chỉ hiển thị `marker`, `title` và `shift` đã lưu; (d) sáu kiểm thử đơn vị mới khoá lại việc không được dùng ô mà trích đoạn để trống làm phương án. **Việc đối chiếu trích đoạn với giáo trình chính thống vẫn chưa được thực hiện và vẫn là `NEED VERIFICATION`.** |

### Đọc ba PDF trong phiên này

Đã kiểm lại SHA-256 của cả ba tệp trước khi làm việc; cả ba khớp giá trị trong `AGENTS.md`.
Nội dung ba tệp đã được đọc toàn văn ở phiên 16-9-2026 và không thay đổi kể từ đó.
**Hạn chế cũ vẫn còn:** máy không có công cụ dựng ảnh trang PDF, nên việc **soát từng trang bằng
mắt vẫn chưa được thực hiện**. Bốn dạng in ghi ở Prompt Log phiên trước vẫn ở trạng thái chờ
người thật kiểm; phiên này không thêm dạng nào và không sửa dạng nào.

---

## P-UX-12 … P-UX-19 — tra cứu `ui-ux-pro-max`

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ** | Script cục bộ `.claude/skills/ui-ux-pro-max/scripts/search.py` (Python, dữ liệu CSV trên máy, không gọi mạng, không sinh văn bản) |
| **Tác vụ hỗ trợ** | Tra cứu hướng dẫn UX/UI cho từng vấn đề quan sát được trong audit |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | **Không áp dụng.** Kết quả là khuyến nghị thiết kế, không phải nguồn học thuật và không phải bằng chứng người học. |

**Nguyên tắc áp dụng cho phiên này, sau góp ý về phiên trước:** mỗi truy vấn có **đúng một mục
đích**; chỉ trích dẫn kết quả **thực sự trả lời đúng mục đích đó**; kết quả phụ tình cờ không
được dùng làm căn cứ cho việc khác; kết quả lệch thì thử lại **một lần** rồi ghi
“không tìm được kết quả phù hợp”. Ranh giới giữa **kết quả CLI** và **hướng dẫn chung trong
`SKILL.md`** được ghi rõ ở từng dòng.

| Mã | Câu lệnh nguyên văn | Mục đích | Kết quả có đúng mục đích không | Quyết định |
|---|---|---|---|---|
| P-UX-12 | `search.py "interactive history exhibit guided narrative" --design-system --variance 6 --motion 5 --density 4 -p "Hanh Trinh Tu Tuong" -f markdown` | Hướng thị giác toàn sản phẩm | ❌ **Không.** Trả về mẫu `Hero + Features + CTA` của trang giới thiệu sản phẩm, bảng màu xanh/cam kiểu SaaS, phông `Outfit` | **Loại bỏ toàn bộ.** Thử lại một lần với truy vấn hẹp hơn |
| P-UX-13 | `search.py "museum exhibit storytelling" --design-system --variance 6 --motion 5 --density 4 -f markdown` | Như trên, thử lại hẹp hơn | ⚠️ **Một phần.** Mẫu `Scroll-Triggered Storytelling` đúng loại sản phẩm; phần màu và phông lại là bảng đen/trắng đã bị loại ở phiên trước | **Áp dụng phần mẫu:** “Use progress indicator” và “CTA Placement: End of each chapter (mini) + Final climax CTA”. **Loại bỏ lại phần màu và phông**, cùng lý do đã ghi: `Playfair Display` không đủ bộ dấu tiếng Việt, và bảng đen/trắng sẽ xoá nghĩa đang gán cho `--son`/`--cham`/`--verify` |
| P-UX-14 | `search.py "state transition animation meaning" --domain ux -n 5` | Chuyển động thể hiện một thay đổi trạng thái | ✅ **Có**, ở kết quả 1: `Cancellable State Transitions` — “Cancel or replace prior motion; set the final semantic state directly”, “Don't depend on animationend or transitionend for required state correctness” | **Áp dụng.** Hàm `setPhase` của bước ngoặt nay giữ và huỷ timer đang chờ, đặt trạng thái cuối trực tiếp. Kết quả 2–5 lệch mục đích, **không trích dẫn** |
| P-UX-15 | `search.py "whitespace grouping visual hierarchy" --domain ux -n 5` | Xử lý khoảng trống lớn ở màn rộng | ❌ **Không.** Trả về hover states, breadcrumbs, heading hierarchy, font scale | **Loại bỏ.** Thử lại một lần |
| P-UX-16 | `search.py "line length characters per line" --domain ux -n 4` | Như trên, hỏi thẳng về độ dài dòng | ✅ **Có**, kết quả 1: `Line Length` — “Limit to 65-75 characters per line”, “**Don't: Full-width text on large screens**” | **Áp dụng, và nó đổi hướng xử lý:** không nới rộng cột chữ. Giữ `--measure: 66ch` và **giao việc cho phần lề** bằng bản ghi “Đã làm rõ trong chặng này” |
| P-UX-17 | `search.py "progress indicator multi-step process" --domain ux -n 4` | Cảm giác tiến triển qua năm chặng | ✅ **Có**, kết quả 1: `Progress Indicators` — “Step indicators or progress bar”, ví dụ “Step 2 of 4 indicator” | **Áp dụng**: dòng `2 / 5 chặng của hành trình` và `Đã mở n trên m bước ngoặt`. Kết quả 2–4 lệch mục đích, **không trích dẫn** |
| P-UX-18 | `search.py "comparison before after side by side" --domain ux -n 4` | Cách trình bày hai trạng thái trước/sau | ❌ **Không.** Trả về đúng một kết quả `Gaze Hover` của VisionOS | **Loại bỏ.** Thử lại một lần |
| P-UX-19 | `search.py "content comparison two states" --domain ux -n 4` | Như trên, thử lại | ❌ **Không.** Trả về empty states, hover, loading, active states | **Không tìm được kết quả phù hợp.** Bộ dữ liệu của skill không có quy tắc về bố cục so sánh trước/sau. Thiết kế phần này **không có căn cứ từ skill**; căn cứ là chính logic của nội dung: thay đổi từ trạng thái này sang trạng thái kia **là** nội dung của một bước ngoặt, nên nó phải đọc được chứ không phải nhớ được |
| P-UX-20 | `search.py "heading stands out from body" --domain ux -n 3` | Nhấn mạnh câu tóm tắt bước ngoặt | ✅ **Có**, kết quả 1: `Heading Clarity` — “Clear size/weight difference”. Kết quả 3 `Heading Hierarchy` cũng đúng mục đích: không nhảy cấp tiêu đề | **Áp dụng**: câu `station__shift` giữ cỡ `--step-2` ở phông kể chuyện; các khối mới dùng `p`, không chèn thêm cấp tiêu đề nào |

Chín lượt tra cứu, ghi nguyên văn ở bảng trên. Không lượt nào bị bỏ sót. **Ba lượt bị loại bỏ vì
kết quả lệch mục đích** (P-UX-12, P-UX-15, P-UX-18) và **một vấn đề không tìm được kết quả phù
hợp** (P-UX-19).

---

## Đối chiếu kiểm chứng — phần đã làm và phần còn nợ

**Đã làm trong phiên này**

- Kiểm lại SHA-256 ba tệp PDF: cả ba khớp.
- Kiểm tra bằng mã rằng 14 thay đổi được báo cáo ở phiên trước đều tồn tại thật.
- Kiểm thử tự động: 57 kiểm thử đơn vị, 135 kiểm thử trình duyệt trên ba khung màn.
- Sáu kiểm thử đơn vị mới khoá lại nguyên tắc: mọi phương án trong bảng “Thử đoán” phải là câu
  trả lời đã lưu của một chặng thật, có vị trí trong trích đoạn, và không được dùng ô mà trích
  đoạn để trống.

**Còn nợ, vẫn `NEED VERIFICATION` / `NOT YET EVIDENCED`**

- Đối chiếu trích đoạn được giao với bản giáo trình chính thống được phê duyệt.
- Soát mười ứng viên định vị với đúng tập và trang trong bản gốc.
- Soát bằng mắt từng trang PDF.
- Bốn dạng in ghi ở Prompt Log phiên 16-9-2026.
- Phê duyệt Câu hỏi trung tâm và thông điệp cốt lõi.
- **Thử nghiệm với người dùng thật.** Không có dòng dữ liệu người dùng nào được tạo trong phiên
  này. Mọi nhận định về việc sản phẩm có hấp dẫn hơn hay không vẫn là **giả thuyết**.
