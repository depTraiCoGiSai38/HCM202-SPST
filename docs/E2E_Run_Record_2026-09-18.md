# Bản ghi lần chạy kiểm thử trình duyệt (E2E) — 18-9-2026

> ## ĐÍNH CHÍNH 18-9-2026, 21:15 (+0700) — ĐÃ CÓ LẦN CHẠY MỚI HƠN
>
> Bản ghi này **không bị sửa**: con số **228 passed** là đúng tại thời điểm nó được đo.
>
> Lần chạy gần nhất, `npx playwright test` lúc khoảng **20:55 ngày 18-9-2026**, cho
> **255 passed / 255**, mã thoát 0, 6,1 phút. Chênh lệch đến từ các phép kiểm thêm vào
> trong đợt làm bản đồ cùng ngày.
>
> Câu ở mục cuối — *"từ nay đọc là 228/228"* — vì vậy **không còn đúng**. Nguồn duy nhất
> cho số đo hiện hành: [`MEASURED_STATE_2026-09-18.md`](MEASURED_STATE_2026-09-18.md).
>
> Câu *"thử nghiệm với người dùng thật (Folder 09), vốn vẫn chưa diễn ra"* ở mục
> "Ranh giới của bằng chứng này" **vẫn đúng** và không thay đổi.

> Bản ghi kỹ thuật. Thuộc Folder `04_Product_Prototype_DevelopmentLog`.
> **KHÔNG** thuộc Folder `09_Interaction_Feedback_Evidence`: đây là kiểm thử tự động,
> không phải bằng chứng người dùng thật.
>
> Trạng thái tổng thể của dự án: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.

---

## Vì sao có bản ghi này

Trước ngày 18-9-2026, kho mã không có một kết quả chạy E2E thành công nào. Tệp
`web/test-results/.last-run.json` ghi `"status": "failed"` với lỗi
`net::ERR_CONNECTION_REFUSED` tại `http://localhost:4173` — nghĩa là **không có máy chủ
xem thử đang chạy** lúc đó, chứ không phải sản phẩm hỏng. Vì chưa có kết quả đạt thật,
mọi tài liệu hồ sơ đều ghi hạng mục này là `NOT YET EVIDENCED`.

Lần chạy dưới đây là lần đầu có kết quả đạt thật.

## Cách chạy

    cd web
    npm run build
    npx playwright test --reporter=list

`web/playwright.config.ts` tự khởi động máy chủ xem thử bằng
`npm run preview -- --port 4173 --strictPort`, nên không cần dựng server thủ công.
Playwright dùng Chrome đã cài trên máy (`channel: 'chrome'`), không tải trình duyệt riêng.

Ứng dụng **không bị thay đổi** để chạy phép kiểm này. Chỉ có bản dựng `dist/` được tạo lại.

## Kết quả

| Hạng mục | Giá trị |
|---|---|
| Ngày chạy | 18-9-2026, khoảng 14:50 - 14:56 (+0700) |
| Kết quả | **228 passed** |
| Thất bại | 0 |
| Thời gian chạy | 5,9 phút |
| Mã thoát | 0 |
| `.last-run.json` sau khi chạy | `{"status": "passed", "failedTests": []}` |

Bảy tệp đặc tả trong `web/e2e/`: `activities.spec.ts`, `app.spec.ts`, `atlas.spec.ts`,
`figures.spec.ts`, `guidance.spec.ts`, `keyboard-guess.spec.ts`, `keyboard.spec.ts`.
Mỗi tệp chạy trên ba khung màn hình: laptop 1440x900, tablet 768x1024, mobile 375x812.

Nhật ký thô đầy đủ: `docs/E2E_Run_Log_2026-09-18.txt`.

## Ranh giới của bằng chứng này

Phải nói rõ để không bị hiểu quá lên:

- Kết quả này chứng minh **hành vi giao diện của bản dựng từ cây làm việc hiện tại**
  đạt các phép kiểm đã viết. Nó **không** chứng minh nội dung học thuật đã được kiểm chứng.
- Nó **không** áp dụng cho bản đang chạy công khai tại `hcm202.fpt.ovh`. Bản công khai
  là một bản dựng cũ hơn; xem bản ghi triển khai trong Folder 02.
- Nó **không** thay thế cho việc thử nghiệm với người dùng thật (Folder 09), vốn vẫn
  chưa diễn ra.
- Các phép kiểm này do chính nhóm viết. Chúng khoá lại hành vi mà nhóm cho là đúng,
  không phải một chuẩn bên ngoài.

## Đính chính đối với các tài liệu lập trước đó

Các tài liệu hồ sơ lập ngày 18-9-2026 trước lần chạy này đều ghi E2E là
`NOT YET EVIDENCED` kèm lý do `ERR_CONNECTION_REFUSED`. Cách ghi ấy **đúng tại thời điểm viết**.

Từ bản ghi này trở đi, trạng thái đúng của hạng mục kiểm thử trình duyệt là:
**228/228 đạt, chạy ngày 18-9-2026**, với các ranh giới nêu ở mục trên.

Bản ghi cũ không bị xoá, theo đúng cách dự án xử lý mọi đính chính.
