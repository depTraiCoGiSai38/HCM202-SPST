# PROMPT LOG — phiên làm việc UX/UI, 16-9-2026

> **Trạng thái:** `PROJECT DECISION` về cách ghi chép. Nội dung các dòng dưới đây là bản ghi
> trung thực của phiên làm việc, không phải nguồn học thuật.
>
> **Đây là bản ghi làm việc, chưa phải bản nộp.** Sổ Prompt Log chính thức nằm ở
> Folder `07_AI_Declaration_Integrity_PromptLog` trên Drive của nhóm, theo biểu mẫu Word do bộ môn
> phát hành hoặc Sheet `02_AI_Prompt_Log` trong tệp Excel. Tên tệp biểu mẫu chính xác vẫn
> `NEED VERIFICATION` (xem ngữ cảnh dự án mục 12). Toàn bộ các dòng dưới đây phải được một
> người thật chép sang biểu mẫu đó trước khi nộp.

Sáu trường bắt buộc theo `AGENTS.md` mục 9: ngày dùng, công cụ AI, tác vụ hỗ trợ, câu lệnh
nguyên văn, tóm tắt output, cách đối chiếu kiểm chứng chéo với giáo trình gốc.

---

## Bối cảnh chung của phiên

Một phiên duy nhất, ngày **16-9-2026**, công cụ **Claude Code (Anthropic), chạy trong VS Code**.
Phiên gồm **một câu lệnh của người dùng** và **chín câu lệnh tra cứu** gửi tới script cục bộ
`ui-ux-pro-max` (script Python chạy trên máy, không phải mô hình AI, nhưng vẫn khai báo đầy đủ
để không có bước nào bị giấu).

**Phạm vi tác động:** chỉ giao diện và trải nghiệm. Phiên này **không thêm, không sửa, không
xoá một câu nội dung học thuật nào** lấy từ trích đoạn được giao. Xem mục “Đối chiếu kiểm chứng”
ở cuối.

---

## P-UX-01

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 16-9-2026 |
| **Công cụ AI** | Claude Code (Anthropic), mô hình Opus 5, chạy trong VS Code |
| **Tác vụ hỗ trợ** | Cải thiện UX/UI của sản phẩm web `HÀNH TRÌNH TƯ TƯỞNG`: audit hiện trạng, thiết kế lại màn mở đầu, tổng quan hành trình, nhịp đọc từng chặng và ba hoạt động; kiểm thử. |
| **Câu lệnh nguyên văn** | Xem tệp `docs/prompts/P-UX-01.txt` — câu lệnh dài, được lưu nguyên văn, không rút gọn. |
| **Tóm tắt output** | Một bản audit kho mã và tuân thủ; phát hiện hai màn hình (`#/doi-sanh`, `#/noi-ket`) không có đường dẫn nào trong sản phẩm; sửa điều hướng, màn mở đầu, tổng quan, nhịp đọc chặng (câu hỏi dẫn vào, thanh các phần, chế độ đọc liền mạch, cầu nối sang chặng sau), phản hồi giải thích trong hoạt động Nối kết và Tổng hợp; sửa 5 lỗi bố cục có sẵn ở cỡ chữ 200%; thêm 10 kiểm thử đơn vị và 9 kiểm thử trình duyệt. |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | **Không phát sinh nhu cầu đối chiếu nội dung học thuật, vì phiên này không tạo ra luận điểm học thuật mới.** Cụ thể: (a) năm tiêu đề tiếng Việt được kiểm thử tự động là khớp từng ký tự với mục 8.2 của ngữ cảnh dự án; (b) mọi chữ mới trên màn hình hoặc là câu hỏi của nhóm (đã gắn nhãn `DIỄN GIẢI CỦA NHÓM` kèm phần “Dựa trên”), hoặc là chữ đã lưu sẵn trong dữ liệu nguồn (vế sau của tiêu đề chặng, nhãn ranh giới, mã rủi ro, vị trí trong trích đoạn); (c) ba tệp PDF được kiểm SHA-256 khớp trước khi làm việc. **Việc đối chiếu trích đoạn được giao với bản giáo trình chính thống vẫn chưa được thực hiện và vẫn là `NEED VERIFICATION`.** |

### Lưu ý về cách đọc ba PDF trong phiên này

Máy không có công cụ dựng ảnh trang PDF (`pdftoppm`/poppler không được cài). Ba tệp được đọc
bằng cách **trích xuất văn bản** với thư viện `pypdf`, không phải bằng cách xem ảnh từng trang.
Hệ quả phải ghi nhận trung thực:

- toàn bộ văn bản của cả ba tệp đã đọc được và khớp với bản đồ nội dung trong ngữ cảnh dự án;
- nhưng **bố cục trang, ảnh chèn, con dấu, watermark và mã QR không được xem bằng mắt trong
  phiên này**. Ngữ cảnh dự án mục 2 nói rõ rằng trích xuất văn bản chỉ là chỉ mục, không thay
  thế việc soát trang. Bước soát trang bằng mắt vẫn còn nợ.

### Dấu hiệu bản in nhìn thấy khi trích xuất, chưa có trong sổ rủi ro

Ghi lại để một người thật kiểm, **không tự sửa và không tự thêm vào sản phẩm**:

| Chỗ | Dạng in thấy được | Trạng thái |
|---|---|---|
| Tiêu đề chặng 2, `C2 PDF p.2` | `giải phòng dân tộc` | `NEED VERIFICATION` — chưa nằm trong `C2-R08` |
| `C2 PDF p.4` | `Cương lĩhh chính trị` | `NEED VERIFICATION` — chưa nằm trong `C2-R08` |
| Tiêu đề chặng 5, `C2 PDF p.8` | `từ đầu năm l941` (chữ `l` thay vì số `1`) | `NEED VERIFICATION` — chưa nằm trong `C2-R08` |
| Tiêu đề mục III, `C2 PDF p.10` | `GIÁ TRỊ TƯ TƯỞNG HỒ CHỈ MINH` | `NEED VERIFICATION` — chưa nằm trong `C2-R08` |

Sản phẩm **không** hiển thị bốn dạng này và **không** sửa chúng. Chúng chỉ được ghi ở đây.

---

## P-UX-02 … P-UX-10 — tra cứu `ui-ux-pro-max`

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 16-9-2026 |
| **Công cụ** | Script cục bộ `.claude/skills/ui-ux-pro-max/scripts/search.py` (Python, dữ liệu CSV trên máy, không gọi mạng, không phải mô hình sinh văn bản) |
| **Tác vụ hỗ trợ** | Tra cứu hướng dẫn UX/UI cho từng vấn đề cụ thể đã phát hiện trong audit |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | **Không áp dụng.** Kết quả của script là khuyến nghị thiết kế, không phải nguồn học thuật, và không được dùng để chứng minh bất kỳ luận điểm nội dung nào. Mọi kết quả đều được đối chiếu với bối cảnh thực tế của sản phẩm trước khi áp dụng hoặc loại bỏ; bảng đối chiếu nằm ở `docs/UX_Design_Decisions_2026-09-16.md`. |

| Mã | Câu lệnh nguyên văn | Tóm tắt output | Quyết định |
|---|---|---|---|
| P-UX-02 | `search.py "educational museum storytelling history" --design-system --variance 6 --motion 4 --density 4 -p "Hanh Trinh Tu Tuong" -f markdown` | Trả về hệ thiết kế: mẫu `Scroll-Triggered Storytelling`, phong cách `Minimalism`, bảng màu đen/trắng phòng trưng bày, cặp phông `Inter + Playfair Display`, preset chuyển động `Stagger List`. | **Loại bỏ phần phông và màu** (xem lý do ở bảng đối chiếu). **Giữ** ghi chú về chỉ báo tiến trình và về việc phải đọc được khi tắt hiệu ứng cuộn. |
| P-UX-03 | `search.py "progressive disclosure complex content" --domain ux -n 6` | Kết quả lệch chủ đề (trả về truncation, placeholder, lazy loading). | **Loại bỏ.** Đã viết lại truy vấn theo đúng hợp đồng truy vấn của skill. |
| P-UX-04 | `search.py "multi-step progress back navigation" --domain ux -n 5` | `Progress Indicators`: hiện chỉ báo bước cho quy trình nhiều bước. `Back Button`: giữ lịch sử điều hướng đúng. | **Áp dụng**: thanh các phần của chặng thay cho bộ đếm trần. |
| P-UX-05 | `search.py "dragging movements alternative" --domain ux -n 4` | WCAG 2.2 AA: mọi thao tác kéo thả phải có phương án một con trỏ và bàn phím. | **Áp dụng như một điều kiện phải giữ**: ba hoạt động vốn đã dùng bấm/chọn, không dùng kéo thả. Đã xác nhận lại bằng kiểm thử bàn phím sẵn có. |
| P-UX-06 | `search.py "error clarity recovery path" --domain ux -n 5` | `Error Recovery`: thông báo lỗi phải kèm đường ra. `Error Messages`: phải được đọc lên bằng `aria-live`. | **Áp dụng**: phản hồi khi ghép sai ở màn Nối kết nay nói rõ vì sao và chỉ chỗ để đọc lại. |
| P-UX-07 | `search.py "empty state guidance action" --domain ux -n 4` + `"web target size pointer" --domain ux` | `Empty States`, `Active State`, `Deep Linking`, `Target Size (Minimum)` 24 CSS px cho web. | **Áp dụng** phần trạng thái hiện tại (`aria-current`) và kích thước đích. **Ghi nhận nhưng chưa làm** phần deep linking cho vị trí nhịp trong chặng. |
| P-UX-08 | `search.py "line length reading measure" --domain typography -n 4` | Chỉ trả về các cặp phông, không có hướng dẫn về độ dài dòng. | **Loại bỏ** — không có kết quả đúng chủ đề. Giữ nguyên token `--measure: 66ch` đang dùng. |
| P-UX-09 | `search.py "focus route change main content" --domain ux -n 4` | Bốn quy tắc về focus: `Focus Appearance`, `Focus States`, `Focus Not Obscured` (AA và AAA). | **Áp dụng như điều kiện kiểm tra**: đã soát lại thanh chỉ dẫn dính trên màn hẹp vì nó che vùng focus. |
| P-UX-10 | `search.py "reduced motion final readable state" --domain ux -n 4` | `Reduced Motion`, `Excessive Motion`, `Readable Font Size`, `Color Contrast` 4.5:1. | **Áp dụng phần đúng mục đích**: `Reduced Motion`. ⚠️ **Đính chính ngày 17-9-2026:** báo cáo trước đây viện dẫn `Color Contrast` từ truy vấn này làm căn cứ cho việc sửa tương phản. Đó là **gán căn cứ sai**: mục đích của truy vấn là reduced motion, `Color Contrast` chỉ là kết quả phụ tình cờ. Căn cứ đúng cho phần tương phản là quy tắc `color-contrast` trong Quick Reference §1 của `SKILL.md` — hướng dẫn chung của skill, không phải kết quả CLI của truy vấn này. Bản thân việc sửa và việc kiểm tra không thay đổi. |

Câu lệnh của chín lượt tra cứu được lưu nguyên văn trong bảng trên. Không có lượt nào bị bỏ sót.

---

## Đối chiếu kiểm chứng — phần đã làm và phần còn nợ

**Đã làm trong phiên này**

- Kiểm SHA-256 ba tệp PDF, cả ba khớp giá trị ghi trong `AGENTS.md`.
- Đọc toàn văn ba tệp bằng trích xuất văn bản; nội dung khớp bản đồ ở mục 8 của ngữ cảnh dự án.
- Kiểm thử tự động: năm tiêu đề khớp từng ký tự; mười ứng viên định vị không cái nào được
  đánh dấu đã kiểm chứng; `Sđd` không bị mở rộng; phần vĩ thanh sau 1969 không lọt vào chặng 5.

**Còn nợ, vẫn `NEED VERIFICATION` / `NOT YET EVIDENCED`**

- Đối chiếu trích đoạn được giao với bản giáo trình chính thống được phê duyệt.
- Soát mười ứng viên định vị với đúng tập và trang trong bản gốc.
- Soát bằng mắt từng trang PDF (phiên này chỉ trích xuất văn bản được).
- Bốn dạng in mới ghi ở trên.
- Phê duyệt Câu hỏi trung tâm và thông điệp cốt lõi.
- Thử nghiệm với người dùng thật. Không có dòng dữ liệu người dùng nào được tạo trong phiên này.
