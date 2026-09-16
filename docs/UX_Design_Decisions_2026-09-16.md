# Căn cứ các lựa chọn thiết kế — phiên UX/UI 16-9-2026

> **Trạng thái:** mọi mục trong tệp này là `PROJECT DECISION`.
> Không mục nào là yêu cầu lấy từ ba tệp PDF của học phần.
> Cẩm nang yêu cầu có bằng chứng cho mọi lựa chọn thiết kế (`CM-005`); tệp này là bản ghi đó.
>
> Bản rút gọn của `DD-1` đến `DD-10` cũng hiển thị ngay trong sản phẩm, ở màn `#/kiem-chung`,
> mục “Căn cứ của các lựa chọn thiết kế”.

---

## 1. Bảng áp dụng `ui-ux-pro-max`

Vấn đề → kết quả/rule của skill → thay đổi thực hiện → cách kiểm tra.

| # | Vấn đề tìm thấy trong audit | Lệnh tra cứu và rule trả về | Thay đổi thực hiện | Cách kiểm tra |
|---|---|---|---|---|
| 1 | Cần một hướng thiết kế cho toàn sản phẩm để đối chiếu với hiện trạng | `--design-system --variance 6 --motion 4 --density 4`. Trả về mẫu `Scroll-Triggered Storytelling`; phong cách `Minimalism`; bảng màu đen/trắng; phông `Inter + Playfair Display`; preset `Stagger List` | **Loại bỏ phần phông và màu.** Giữ phông `Be Vietnam Pro` + `Source Serif 4` đang dùng: `Playfair Display` không có bộ dấu tiếng Việt đầy đủ, mà sản phẩm này đặt dấu tiếng Việt lên hàng đầu. Giữ bảng màu giấy cũ vì `--son` đang mang nghĩa xác định (bước ngoặt, vị trí hiện tại, focus) mà bảng đen/trắng sẽ xoá mất. **Giữ** hai ghi chú trong mẫu: phải có chỉ báo tiến trình, và phải đọc được khi tắt hiệu ứng cuộn | Đọc `design-system/hanh-trinh-tu-tuong/MASTER.md` trước khi sửa. **Không chạy `--force`**, không ghi đè tài liệu thiết kế. Không đổi một token màu hay phông nào |
| 2 | Nội dung một chặng bị khoá sau 11–20 lần bấm, không có bản đồ, không đọc liền được | `"multi-step progress back navigation" --domain ux` → `Progress Indicators`: hiện chỉ báo bước cho quy trình nhiều bước | Thay bộ đếm trần `1 / 11` bằng thanh các phần của chặng (Bối cảnh · Chuyển biến · Bước ngoặt · Nguyên văn · Ranh giới) kèm số nhịp từng phần và phần đang đứng; thêm chế độ **Đọc liền mạch** dựng đúng các nhịp ấy trên một trang | Kiểm thử trình duyệt `guidance.spec.ts` đối chiếu số trạm ở hai chế độ, kiểm tra thanh phần đổi trạng thái khi nhảy, và kiểm tra bước ngoặt vẫn phải mở ra chứ không hiện sẵn |
| 3 | Ghép sai ở màn Nối kết chỉ nói “Chưa khớp”, không nói vì sao | `"error clarity recovery path" --domain ux` → `Error Recovery`: thông báo lỗi phải kèm đường ra; `Error Messages`: phải được `aria-live` đọc lên | Phản hồi nay nêu vị trí trong trích đoạn của cả hai mục đang được ghép và nhắc lại quy tắc đọc. Hai vị trí đều là dữ liệu đã lưu, không phải đáp án | `guidance.spec.ts` kiểm tra thông báo có chứa vị trí `C2 PDF` và lựa chọn đang giữ không bị xoá. `aria-live` vốn đã có trên `.join__status` |
| 4 | Hoạt động kéo thả cần phương án bấm và bàn phím | `"dragging movements alternative" --domain ux` → WCAG 2.2 AA: mọi thao tác kéo phải có phương án một con trỏ và bàn phím | **Không phải sửa.** Ba hoạt động vốn đã dùng bấm/chọn, không dùng kéo thả. Ghi lại như một điều kiện phải giữ | `keyboard.spec.ts` sẵn có đã đi hết hai hoạt động bằng bàn phím; đã chạy lại và vẫn xanh |
| 5 | Màn hình hiện tại không được đánh dấu trong điều hướng | `"empty state guidance action" --domain ux` → `Active State`: vị trí hiện tại phải được đánh dấu rõ | Bốn mục mới trong thanh chỉ dẫn dùng `aria-current="page"`, đánh dấu bằng cả độ đậm và một đường viền, không chỉ bằng màu | `guidance.spec.ts` kiểm tra đúng một mục được đánh dấu và dấu ấy đi theo màn hình |
| 6 | Kích thước vùng bấm | `"web target size pointer" --domain ux` → `Target Size (Minimum)`: web cần 24 CSS px, không áp dụng con số 44pt của iOS làm chuẩn web | Mọi nút mới đặt `min-block-size: 2.75rem`, vượt xa mức tối thiểu | Kiểm thử sẵn có `interactive controls meet the 44px touch target minimum` chạy trên cả ba khung màn |
| 7 | Tương phản và cỡ chữ | ⚠️ **Đính chính ngày 17-9-2026.** Dòng này trước đây ghi căn cứ là `"reduced motion final readable state" --domain ux` → `Color Contrast`. **Gán căn cứ như vậy là sai:** mục đích của truy vấn đó là reduced motion; `Color Contrast` chỉ là kết quả phụ số 4 tình cờ trả về. Căn cứ đúng cho việc sửa tương phản là quy tắc `color-contrast` 4.5:1 trong **phần Quick Reference §1 của `SKILL.md`**, tức hướng dẫn chung của skill, **không phải** kết quả CLI của truy vấn đó | Sửa một chỗ không đạt: `.walk__phase-n` đứng trên nền chìm chỉ đạt ≈4.2:1, đổi sang `--ink-soft` | Script `tools/ux-audit.mjs` đo tương phản thật của 36 lớp chữ trên 11 tuyến, ở cả nền sáng và nền tối. Việc sửa và việc kiểm tra đều đúng; chỉ phần ghi căn cứ là sai và nay được đính chính |
| 8 | Focus bị che bởi thanh dính | `"focus route change main content" --domain ux` → `Focus Not Obscured (Minimum)` AA: thanh dính không được che vùng focus | Trên màn hẹp, thanh chỉ dẫn thôi dính. Trước đó nó chiếm khoảng một phần năm chiều cao màn hình, và sắp phải gánh thêm bốn mục nữa | Chụp màn hình ở 390px; `no horizontal overflow` và kiểm thử bàn phím chạy lại trên khung mobile |
| 9 | Độ dài dòng đọc | `"line length reading measure" --domain typography` → **kết quả lệch chủ đề**, chỉ trả về các cặp phông | **Loại bỏ, không có kết quả đúng chủ đề.** Đã thử lại một lần theo hợp đồng truy vấn của skill. Giữ nguyên token `--measure: 66ch` đang dùng | Ghi nhận trung thực ở đây; không viện dẫn skill cho lựa chọn này |
| 10 | Bố trí nội dung theo lớp | `"progressive disclosure complex content" --domain ux` → **kết quả lệch chủ đề** | **Loại bỏ.** Việc chia lớp dựa vào cấu trúc sẵn có của sản phẩm (kính lúp bằng chứng) | Ghi nhận trung thực ở đây |

**Giới hạn phải nói rõ:** `ui-ux-pro-max` là bộ dữ liệu khuyến nghị thiết kế chạy trên máy.
Nó **không phải nguồn học thuật** và **không phải bằng chứng người dùng**. Không kết quả nào của
nó được dùng để chứng minh một luận điểm nội dung, và không kết quả nào chứng minh sản phẩm này
dễ hiểu hơn với người học — điều đó chỉ có thể biết bằng thử nghiệm với người dùng thật.

---

## 2. Thay đổi token thiết kế

Không có token màu, phông hay khoảng cách nào bị đổi giá trị. Không thêm token mới.

Hai giá trị trong `tokens.css` giữ nguyên dù hệ thiết kế do skill sinh ra đề xuất khác:

| Token | Giá trị giữ nguyên | Vì sao không theo đề xuất của skill |
|---|---|---|
| `--font-apparatus` | `Be Vietnam Pro` | Skill đề xuất `Inter`. `Be Vietnam Pro` được thiết kế cho tiếng Việt, xử lý dấu chồng trên nguyên âm đã có dấu (ế, ộ, ữ) tốt hơn. Đây là tiêu chí đầu tiên của sản phẩm này |
| `--font-narrative` | `Source Serif 4` | Skill đề xuất `Playfair Display` chỉ ở dạng nghiêng cho trích dẫn; phông này không phủ đủ bộ dấu tiếng Việt |
| `--son`, `--cham`, `--verify` | giữ nguyên | Bảng đen/trắng của skill sẽ xoá mất nghĩa đang gán cho từng màu: đỏ là bước ngoặt và vị trí, chàm là bộ máy dẫn nguồn, hổ phách là chưa kiểm chứng |

Bốn giá trị CSS được sửa vì lý do bố cục, không phải vì thẩm mỹ:

| Chỗ | Trước | Sau | Vì sao |
|---|---|---|---|
| `.walk__panel` | `min-block-size: 20rem` | `14rem` | 20rem để lại khoảng trống bằng khoảng hai phần năm màn hình dưới một đoạn ngắn |
| `.thread--opening` | `clamp(9rem, 22vh, 14rem)` | `clamp(6rem, 14vh, 10rem)` | Danh sách năm chặng có tên nay gánh phần cấu trúc; sợi chỉ chỉ còn gánh phần hướng đi |
| `.figures` | `minmax(14rem, 1fr)` | `minmax(min(14rem, 100%), 1fr)` | 14rem là sàn cứng; ở cỡ chữ lớn nó rộng hơn cả trang |
| `.walk__phase-n` | `--ink-faint` | `--ink-soft` | Tương phản trên nền chìm chỉ đạt ≈4.2:1 |

---

## 3. Lỗi bố cục có sẵn được sửa trong phiên này

Năm lỗi dưới đây **có từ trước phiên này** và không do các thay đổi UX gây ra. Chúng lộ ra khi
chạy kiểm tra cỡ chữ 200%, là mức mà tiêu chí `Resize text` yêu cầu.

| Chỗ | Triệu chứng | Nguyên nhân | Sửa |
|---|---|---|---|
| `[hidden]` toàn cục | Phần tử đặt `hidden` vẫn hiện nếu CSS có đặt `display` | Quy tắc của tác giả thắng quy tắc `[hidden]` của trình duyệt | Thêm một quy tắc `[hidden] { display: none !important }` trong `base.css` |
| `.app > *` | Tiêu đề masthead không xuống dòng đặt sàn chiều rộng cho **cả trang** | Grid item mặc định `min-width: auto` | Thêm `min-inline-size: 0`, đúng cách `.shell > *` đã làm |
| `.figures` | Thẻ số trên màn kiểm chứng rộng hơn trang | `minmax(14rem, 1fr)` là sàn cứng | `minmax(min(14rem, 100%), 1fr)` |
| `.join__stages`, `.duo__picker`, `.walk__controls` | Hàng nút tràn ngang | Flex row không có `flex-wrap` | Thêm `flex-wrap: wrap` |
| `.atlas__stage-link` | Nhãn chặng 5 chạy khỏi mép phải | Nhãn đặt tuyệt đối, không biết còn bao nhiêu chỗ | Thêm biến `--atlas-room` tính từ `railStart`, đưa vào `min()` |

---

## 4. Những gì phiên này **không** làm

- Không thêm, sửa hay xoá một câu nội dung học thuật nào lấy từ trích đoạn.
- Không sửa một dạng in nào trong trích đoạn; bốn dạng in mới nhìn thấy được ghi vào Prompt Log
  để người thật kiểm, không đưa vào sản phẩm.
- Không chuyển bất kỳ mục nào từ `NEED VERIFICATION` sang trạng thái mạnh hơn.
- Không giải quyết `DOCUMENT CONFLICT` nào, không đặt nhãn phiên bản cuối.
- Không tạo dữ liệu người dùng, khảo sát, phản hồi hay kết quả kiểm thử người dùng.
- Không đưa vị trí nhịp trong chặng vào địa chỉ URL. Đây là việc còn nợ: nó cần đổi cách định
  tuyến, mà đổi định tuyến sẽ đụng tới việc chuyển focus khi đổi tuyến — rủi ro không tương xứng
  với lợi ích trong phạm vi phiên này.
