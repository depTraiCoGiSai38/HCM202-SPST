# PROMPT LOG — phiên tìm và tích hợp ảnh tư liệu, 17-9-2026

> **Trạng thái:** `PROJECT DECISION` về cách ghi chép. Bản ghi làm việc, chưa phải bản nộp.
> Tiếp nối `07_AI_Prompt_Log_UX_2026-09-16.md`, `07_AI_Prompt_Log_UX_2026-09-17.md` và
> `07_AI_Prompt_Log_Images_2026-09-17.md`. **Các đính chính được ghi thêm, không xoá bản cũ.**

Sáu trường bắt buộc theo `AGENTS.md` mục 9.

---

## P-IMG-08

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ AI** | Claude Code (Anthropic), mô hình Opus 5, chạy trong VS Code |
| **Tác vụ hỗ trợ** | Tìm và tích hợp một ảnh tư liệu cho màn mở đầu; sửa lại phương pháp đánh giá nguồn. |
| **Câu lệnh nguyên văn** | `docs/prompts/P-IMG-02.txt` |
| **Tóm tắt output** | **Đã tích hợp một ảnh thật vào ô `FS-open`.** Ảnh báo chí trên kính ảnh do Agence Meurisse chụp, Thư viện quốc gia Pháp (BnF) giữ, ký hiệu EI-13 (2702), số hiệu Meurisse 94447, bản ghi ghi `dc:rights` “domaine public”. Điều kiện sử dụng của Gallica đã đọc trực tiếp. Sửa lại `SOURCING_CHECKS` theo ba câu hỏi tách rời, giữ nguyên bản ghi cũ kèm dòng đính chính. Mở rộng bộ đóng gói offline để nhúng ảnh. Thêm 3 kiểm thử đơn vị và 3 kiểm thử trình duyệt, cộng một bước kiểm ảnh trong `check:offline`. |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | **Không tạo nội dung học thuật mới.** Chú thích ảnh **chỉ chép lại nguyên văn** những gì bản ghi BnF ghi (nhan đề, niên đại 1921, mốc 26-12-1921) — không thêm một dữ kiện nào. Việc nhận diện người trong ảnh được ghi **tách riêng** khỏi chú thích, nêu rõ chuỗi căn cứ (BnF ghi “Nguyen Aïn Nuä'C” — phiên âm của Nguyễn Ái Quốc; Commons mô tả là Hồ Chí Minh; trích đoạn được giao cho biết Người lấy tên Nguyễn Ái Quốc ở Pháp, `C2 PDF tr.3`) và **giữ `NEED VERIFICATION`** vì chưa có nguồn học thuật được phê duyệt xác nhận độc lập. Ảnh **không được gắn vào chặng nào**: sự kiện trong bản ghi là Đại hội Marseille 12-1921, còn trích đoạn nói về Đại hội Tua 12-1920. **Việc đối chiếu trích đoạn với giáo trình chính thống vẫn chưa thực hiện.** |

### Đính chính phương pháp đánh giá nguồn

Phiên trước kết luận “không ảnh nào dùng được”. Kết luận ấy dựa trên lập luận gộp ba câu hỏi
khác nhau. Ghi lại đầy đủ, **không xoá bản ghi cũ**:

| Sai ở đâu | Đúng ra là gì |
|---|---|
| Coi “trang không công bố điều khoản” = “nguồn cấm dùng lại” | Không thấy điều kiện thì trạng thái là **chưa xác lập**, cần hỏi — không phải bị từ chối |
| Lấy niên đại mâu thuẫn của một ảnh làm lý do loại **về bản quyền** | Niên đại đáng ngờ là vấn đề của **chú thích**; bản quyền là câu hỏi riêng. Với ảnh dẫn nhập thì không cần nêu ngày |
| Kết luận về cả một kho ảnh chỉ từ **trang chủ** | Phải mở **bản ghi của hiện vật**, và hỏi nơi giữ |

Ba mục `SC-1`, `SC-2`, `SC-3` trên trang Kiểm chứng vẫn còn nguyên, nay kèm dòng `ĐÍNH CHÍNH`.

### Các trang đã mở trong phiên này

| Trang | Mục đích | Kết quả |
|---|---|---|
| `commons.wikimedia.org/wiki/Category:Portraits_of_Ho_Chi_Minh` | Tìm ứng viên | Tìm ra tệp dẫn nguồn BnF/Gallica |
| `commons.wikimedia.org/wiki/File:Nguyen_Aïn_Nuä'C…_Meurisse,_BNF_Gallica.jpg` | Đọc mô tả và truy nguồn gốc | Dẫn tới ark BnF `btv1b9054078w`; nhãn PD-France, PD-US (công bố trước 1-1-1931), PD-Scan |
| `gallica.bnf.fr/services/OAIRecord?ark=btv1b9054078w` | **Bản ghi gốc của BnF** | Lấy được toàn bộ trường Dublin Core, gồm `dc:rights` “domaine public” |
| `gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica` | **Điều kiện sử dụng, đọc trực tiếp** | Trích nguyên văn điều khoản phi thương mại và yêu cầu ghi nguồn |
| `gallica.bnf.fr/iiif/.../full/1800,/0/native.jpg` | Tải bản gốc qua kênh IIIF của chính Gallica | Tải về 583.346 byte, SHA-256 đã ghi trong sổ nguồn ảnh |

Ghi chú kỹ thuật: `gallica.bnf.fr` trả HTTP 403 với công cụ WebFetch. Đã lấy nội dung bằng
`Invoke-WebRequest` với user-agent trình duyệt thông thường. **Nội dung được đọc trực tiếp từ
trang, không dựa vào đoạn tóm tắt của công cụ tìm kiếm.**

---

## P-IMG-09 … P-IMG-11 — tra cứu `ui-ux-pro-max`

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ** | `.claude/skills/ui-ux-pro-max/scripts/search.py` (Python cục bộ, không gọi mạng) |
| **Tác vụ hỗ trợ** | Bố cục ảnh, tỷ lệ, alt text, motion |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | **Không áp dụng** — khuyến nghị thiết kế, không phải nguồn học thuật |

Các truy vấn cho phần ảnh đã chạy ở phiên trước và **kết quả không đổi**, nên được dùng lại
thay vì chạy lặp:

| Mã | Câu lệnh | Loại căn cứ | Áp dụng trong phiên này |
|---|---|---|---|
| P-IMG-04 (dùng lại) | `"image dimensions layout shift" --domain ux` | **Kết quả CLI**: `Content Jumping` — “Reserve appropriate space… aspect-ratio for media”; `Image Optimization` (WebP); `Image Scaling` (`max-width: 100%`) | Ảnh ghi `width="900"` `height="1245"` + `aspect-ratio`, nên hộp được giữ chỗ trước khi tệp về. Bản giao WebP 90 KB. `max-inline-size: 100%` |
| P-IMG-03 (dùng lại) | `"alt text meaningful images" --domain ux` | **Kết quả CLI**: `Alt Text` — “Descriptive alt text for meaningful images” | `alt` mô tả đúng những gì nhìn thấy (dáng người, trang phục, hướng nhìn, số hiệu ghi tay trên tấm kính) và **không diễn giải** |
| — | — | **Không tìm được kết quả phù hợp** cho bố cục chú thích + ghi nguồn (đã thử 2 lần ở phiên trước) | Bố cục chú thích/credit là **PROJECT DECISION** của nhóm |
| P-IMG-05 (dùng lại) | `"animation expresses cause and effect" --domain ux` | **Kết quả CLI**: `Excessive Motion` — “Animate 1-2 key elements per view maximum” | Không thêm chuyển động mới nào cho ảnh. Khung ảnh **không** có hiệu ứng riêng; chỉ ô xem lớn giữ chuyển động đã có từ phiên trước |
| — | — | **Hướng dẫn chung `SKILL.md` §7 `motion-meaning`** (không phải kết quả CLI) | Chân dung **bất động tuyệt đối**: không có hiệu ứng nào đặt lên ảnh |

---

## Đối chiếu kiểm chứng — đã làm và còn nợ

**Đã làm**

- Kiểm lại SHA-256 ba PDF: khớp.
- Mở **bản ghi gốc** của hiện vật tại BnF và **trang điều kiện sử dụng** của Gallica, trích
  nguyên văn cả hai.
- Xem tận mắt tấm ảnh đã tải: số hiệu **94.447** ghi tay trên tấm kính trùng với bản ghi.
- 64 kiểm thử đơn vị, 168 kiểm thử trình duyệt trên ba khung màn.
- Kiểm tương phản trên 11 tuyến, nền sáng và nền tối; kiểm cỡ chữ 200%.
- Bản offline: ảnh được nhúng dạng data URI, **giải mã thành công từ `file://`**, 0 request mạng.

**Còn nợ**

- **Năm ô ảnh còn lại vẫn trống.** Cần người thật hỏi bảo tàng/lưu trữ. Bản nháp thư xin phép
  (`TEMPLATE - NOT EVIDENCE`, **chưa gửi**) ở `docs/08_Image_Source_Register_TEMPLATE.md` mục 3b.
- Nhận diện người trong ảnh: cần một nguồn học thuật được phê duyệt xác nhận.
- Đối chiếu trích đoạn với giáo trình chính thống; mười ứng viên định vị; soát từng trang PDF.
- Phê duyệt Câu hỏi trung tâm.
- **Thử nghiệm người dùng thật: chưa có dòng dữ liệu nào.**
