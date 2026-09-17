# Prompt Log — Chuyển nguồn học thuật sang Giáo trình Tư tưởng Hồ Chí Minh - 2019

> Thư mục dossier: `07_AI_Declaration_Integrity_PromptLog`
> Trạng thái tổng thể của dự án: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

Bản ghi này **bổ sung**, không thay thế và không sửa các Prompt Log trước đó.
Các Prompt Log đề ngày 16 và 17-9-2026 mô tả công việc thực hiện khi nguồn học thuật
nền vẫn còn là `C2-02.pdf`. Chúng được giữ nguyên vì đó là điều đã thực sự xảy ra.

---

## P-SRC-01

| Trường | Nội dung |
|---|---|
| **Ngày sử dụng** | 17-9-2026 |
| **Công cụ AI** | Claude Code (Claude Opus 5, 1M context) |
| **Nhiệm vụ được hỗ trợ** | Chuyển nguồn học thuật nền của sản phẩm từ trích đoạn `C2-02.pdf` sang `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` (trang in 28-35): đọc và đối chiếu hai bản, cập nhật toàn bộ định vị trang, tiêu đề chặng, sổ rủi ro, chú thích, kiểm thử và tài liệu quản trị. |
| **Prompt gốc** | Lưu nguyên văn tại `docs/prompts/P-SRC-01.txt`. |
| **Tóm tắt đầu ra** | Đã tạo mô hình nguồn có cấu trúc (`web/src/data/source.ts`) tách riêng *tệp nguồn*, *trang PDF* và *trang in*; chuyển 70 định vị trong `stages.ts`, 32 định vị trong `interactions.ts`, 10 ứng viên định vị trong `locators.ts`; sửa 5 tiêu đề chặng theo đúng bản in 2019; dựng lại sổ rủi ro thành `GT-R01`..`GT-R08` kèm sổ `SUPERSEDED_RISKS` ghi kết cục của `C2-R01`..`C2-R09`; cập nhật thành phần giao diện, kiểm thử đơn vị, kiểm thử trình duyệt, công cụ báo cáo, `AGENTS.md` và tệp ngữ cảnh dự án. Báo cáo đầy đủ: `SOURCE_MIGRATION_2019_REPORT.md`. |
| **Cách đối chiếu với giáo trình gốc** | Tệp 2019 **không có lớp văn bản** — mọi trang là ảnh quét. Vì vậy không thể trích xuất văn bản để đối chiếu máy. Tám trang được tách ra thành ảnh và **đọc trực tiếp bằng mắt**; các điểm quyết định (ngày mở chặng 2, cụm từ trong tiêu đề chặng 5, mười chú thích, các dạng chữ in bất thường) được **phóng to 4x đến 9x** rồi đọc lại trước khi ghi vào dữ liệu. Số trang in được đọc ở chân từng trang để lập bản đồ trang, không suy ra bằng phép cộng trừ. |

### Hai điểm bản 2019 khác với mô tả trong prompt

Prompt yêu cầu chuyển nguồn có nêu sẵn năm tiêu đề chặng. Khi đối chiếu với bản in,
hai tiêu đề trong prompt **không khớp** với bản 2019. Bản in được ưu tiên, theo
`AGENTS.md` mục 4 (không được suy diễn hoặc chép lại câu chữ không có trong nguồn):

| Mục | Prompt nêu | Bản 2019 in | Xử lý |
|---|---|---|---|
| Chặng 2, ngày mở | `từ ngày 5-6-1911` | `từ ngày 6-6-1911` | Dùng `6-6-1911`. Đọc lại ở mức phóng to 4x. Phù hợp với quy luật của chính bản in: mỗi ranh giới là hai ngày liền nhau (30-12/31-12; 3-2/4-2; 28-1/29-1). |
| Chặng 5, vế sau | `tiếp tục phát triển, hoàn thiện, soi đường...` | `tiếp tục phát triển, soi đường...` | Bỏ chữ `hoàn thiện`. Đây là câu chữ của bản 2021, không có trong bản 2019. |

Hai điểm này **chưa được người xác nhận**. Xem mục cần kiểm chứng trong
`SOURCE_MIGRATION_2019_REPORT.md`.

### Giới hạn phải nêu rõ

- AI **không** được dùng làm nguồn học thuật. Mọi câu chữ học thuật trong sản phẩm
  đều lấy từ bản in và vẫn mang nhãn `SOURCE CONTENT - EXTERNAL VERIFICATION REQUIRED`.
- Việc chuyển nguồn **không** nâng trạng thái kiểm chứng của bất kỳ mệnh đề nào.
  Trước và sau khi chuyển, toàn bộ mười ứng viên định vị vẫn là `NEED VERIFICATION`.
- Tệp 2019 **chưa được xác thực** là bản chính thức của Bộ GD&ĐT / NXB Chính trị
  quốc gia Sự thật. Đây là bản quét do `PDF-XChange Lite` tạo, có dấu viết tay ở chân
  mỗi trang. Xuất xứ vẫn là `NEED VERIFICATION`.
- Việc đọc bằng mắt trên ảnh quét là thao tác của AI trong phiên làm việc này. Nó
  **không thay thế** việc một người mở bản giáo trình chính thức và đối chiếu.
