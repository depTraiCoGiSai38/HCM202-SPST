# Prompt Log — đợt sửa giao diện màn mở đầu, biểu đồ tổng quan và chú thích ảnh

> Thuộc Folder `07_AI_Declaration_Integrity_PromptLog`.
> `AGENTS.md` §9 yêu cầu sáu trường cho mỗi prompt.
> Các bản ghi Prompt Log trước KHÔNG bị sửa.

---

## P-HERO-01

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 18-9-2026 |
| **Công cụ AI** | Claude Code (Claude Opus 5), chạy trong repository, có skill `ui-ux-pro-max` |
| **Việc được hỗ trợ** | Bốn thay đổi trình bày: gỡ nhãn ngày mối nối khỏi biểu đồ tổng quan; chống ngắt dòng giữa ngày-tháng-năm; gỡ ô ảnh tư liệu khỏi màn mở đầu và nới rộng tiêu đề; đặt tiêu đề thành 2 dòng in đậm, đoạn giới thiệu 1 dòng. Kèm cập nhật kiểm thử. |
| **Prompt nguyên văn** | [`prompts/P-HERO-01.txt`](prompts/P-HERO-01.txt), mục A |
| **Tóm tắt kết quả** | Xem bên dưới |
| **Cách đối chiếu lại với giáo trình gốc** | Xem bên dưới |

### Tóm tắt kết quả

- **Nhãn ngày mối nối:** gỡ khỏi hình vẽ SVG. Mảng `BOUNDARIES` trong `web/src/data/stages.ts` giữ nguyên, cùng bốn cặp ngày `5-6-1911 › 6-6-1911`, `30-12-1920 › 31-12-1920`, `3-2-1930 › 4-2-1930`, `28-1-1941 › 29-1-1941`. Bốn nhãn vẫn hiển thị ở danh sách 5 chặng, menu, khối nối trong trang chặng và trang tổng hợp.
- **Ngắt dòng ngày tháng:** thêm `wholeDates()` trong `web/src/lib/dom.ts`, bọc từng cụm `D-M-YYYY` vào `span.date-nowrap`. Nội dung chữ không đổi.
- **Ô ảnh `FS-open`:** gỡ khỏi màn mở đầu; khai báo trong `web/src/data/figures.ts` giữ nguyên nên vẫn được đếm là vị trí trống và vẫn in `NOT YET EVIDENCED` trên `#/kiem-chung`.
- **Tiêu đề:** tách tại dấu phẩy của chính nó thành hai dòng, `font-weight: 700`. Hai lát cắt ghép lại đúng nguyên văn chuỗi gốc. `.hero__intro` bỏ giới hạn `44ch`.

**Đo và kiểm:** `tsc` sạch · `vitest` 139/139 · `playwright` 255/255 · `word-budget` màn mở đầu `prose 69 + signage 0 → OK`.

### Cách đối chiếu lại với giáo trình gốc

Toàn bộ là thay đổi trình bày. Không chạm vào năm tiêu đề thời kỳ, bốn cặp ngày ranh giới, trích dẫn, locator, tên tổ chức hay mốc thời gian nào. 88 phép thử nội dung khoá các bất biến học thuật đều pass không sửa một dòng test nào.

---

## P-HERO-02

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 19-9-2026 |
| **Công cụ AI** | Claude Code (Claude Opus 5), chạy trong repository |
| **Việc được hỗ trợ** | Gỡ chip `NEED VERIFICATION` khỏi chú thích ảnh trên màn hình đọc (giữ nguyên trên trang Kiểm chứng); gỡ câu `Trích đoạn không in địa điểm cho mốc này.` khỏi bài đọc; rút gọn chú thích mã nguồn. |
| **Prompt nguyên văn** | [`prompts/P-HERO-01.txt`](prompts/P-HERO-01.txt), mục D |
| **Tóm tắt kết quả** | Xem bên dưới |
| **Cách đối chiếu lại với giáo trình gốc** | Xem bên dưới |

### Tóm tắt kết quả

- **Chip trạng thái dưới ảnh:** gỡ khỏi `web/src/components/figure.ts`. Trạng thái không bị xoá — `fig.status` nguyên vẹn trong dữ liệu, vẫn đọc được ở hàng `Trạng thái` trong bảng `Nguồn và điều kiện` của chính tấm ảnh, và ở bảng đăng ký trên `#/kiem-chung` (55 chip `NEED VERIFICATION`, 6 chip `NOT YET EVIDENCED`). Dòng ghi nguồn bắt buộc của Gallica giữ nguyên trên bề mặt vì đó là điều kiện dùng lại.
- **Câu "không in địa điểm":** `stationWhere()` trong `web/src/components/atlas.ts` chỉ hiện `Nơi chốn: …` cho mốc có địa điểm in trong trích đoạn. `web/src/data/places.ts` không đổi. Việc trích đoạn không in địa điểm vẫn được báo trong sổ địa danh trên `#/kiem-chung` và trong chú giải bảng trích đoạn.
- **Bốn phép kiểm bị ảnh hưởng:** chuyển sang kiểm tại nơi trạng thái còn tồn tại, không xoá. Nếu sau này trạng thái bị gỡ khỏi bảng nguồn hoặc khỏi sổ đăng ký thì các phép kiểm này đỏ.

**Đo và kiểm:** `tsc` sạch · `vitest` 139/139 · `playwright` 255/255.

### Cách đối chiếu lại với giáo trình gốc

Không có mệnh đề học thuật nào thay đổi. 88 phép thử nội dung đều pass.

---

## Điểm còn mở

| Việc | Trạng thái |
|---|---|
| Mã lớp trong tên file | **Đã chốt: `Half1_SE1810`** (ghi tại `HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md` §12.1) |
| Nhãn phiên bản sản phẩm | `VERSION LABEL - NEED LECTURER CONFIRMATION` |
| Xác thực giáo trình gốc và 10 locator | Cần bản ghi đối chiếu thật trong Folder 08 |
| Ảnh chụp trong `web/screenshots/flow/` | Chụp trước 19-9-2026, cần chụp lại trước khi dùng làm bằng chứng |
