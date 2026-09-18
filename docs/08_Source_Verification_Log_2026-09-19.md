# Sổ kiểm chứng nguồn — đối chiếu giáo trình gốc

> Thuộc Folder `08_Source_Verification_Log`.
> Nhóm 02 · HCM202 · Fall 2026 · Half1_SE1810

---

## SV-01 — Đối chiếu trích đoạn với bản in chính thức

| Trường | Nội dung |
|---|---|
| **Ngày kiểm** | 19-9-2026 |
| **Người kiểm** | Nhóm 02 |
| **Đối tượng kiểm** | `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` — bản quét 8 trang được giao, SHA-256 `a520532c4f5034aa7bdf69e7e63459a748c5899bd7e525ea313bec3ad70f720a` |
| **Đối chiếu với** | Bộ Giáo dục và Đào tạo, *Giáo trình Tư tưởng Hồ Chí Minh* (Dành cho bậc đại học – không chuyên ngành lý luận chính trị), Hà Nội, 2019 |
| **Phạm vi đối chiếu** | tr.28 – tr.35, đúng bằng phạm vi trích đoạn được giao |
| **Kết quả** | **Khớp hoàn toàn** |
| **Trạng thái sau khi kiểm** | `VERIFIED IN FILE` |

### Việc kiểm này bao phủ những gì

- Câu chữ của trích đoạn tr.28-35 đúng với bản in chính thức.
- Năm tiêu đề thời kỳ, và các mốc ngày ranh giới `5-6-1911/6-6-1911`, `30-12-1920/31-12-1920`, `3-2-1930/4-2-1930`, `28-1-1941/29-1-1941`.
- Số trang in dùng làm locator công khai.

### Việc kiểm này KHÔNG bao phủ

**Mười chú thích in trong trích đoạn.** Mỗi chú thích dẫn một cuốn sách khác, không phải chính giáo trình này:

| Mã | Dẫn tới | Trạng thái |
|---|---|---|
| L1 | Ban nghiên cứu lịch sử Đảng Trung ương, *Chủ tịch Hồ Chí Minh - Tiểu sử sự nghiệp*, Nxb Sự thật, 1980, tr.12 | `NEED VERIFICATION` |
| L2 | Song Thành (CB), *Hồ Chí Minh - Tiểu sử*, Nxb Lý luận Chính trị, 2006, tr.24-25 | `NEED VERIFICATION` |
| L3 | *Hồ Chí Minh Toàn tập*, 2011, t.3, tr.1 | `NEED VERIFICATION` |
| L4 | *Hồ Chí Minh Toàn tập*, 2011, t.3, tr.22 | `NEED VERIFICATION` |
| L5 | *Văn kiện Đảng Toàn tập*, 2005, t.2, tr.110-111 | `NEED VERIFICATION` |
| L6 – L10 | Xem `web/src/data/locators.ts` | `NEED VERIFICATION` |

Việc trích đoạn đã được xác thực **không** làm cho các chú thích của nó được xác thực theo. Muốn đóng phần này, phải mở đúng các cuốn trên tại đúng tập và trang rồi ghi thêm một mục vào sổ này.

Ba chú thích in chữ viết tắt `Sdd` chưa được giải. Giữ nguyên dạng in, không tự mở rộng, không tự chuẩn hoá thành `Sđd`.

---

## Ghi chú kỹ thuật

Thay đổi tương ứng trong mã nguồn:

- `web/src/data/source.ts` — `SOURCE.provenance` chuyển sang `VERIFIED IN FILE`, thêm `provenanceCheck` ghi nguyên văn ấn bản, phạm vi và kết quả.
- `web/src/data/locators.ts` — rủi ro `GT-R08` chuyển từ "tệp chưa được xác thực" sang bản ghi đã đối chiếu.
- `web/src/components/stagePage.ts` — dòng trạng thái ở mỗi chặng đọc theo kết quả đối chiếu.
- `web/src/data/types.ts` — bổ sung `VERIFIED IN FILE`, `SOURCE REQUIREMENT`, `REJECTED` vào danh mục `Provenance` cho khớp `AGENTS.md` §3.
- `web/src/test/content.test.ts` — thêm phép thử chặn việc trích đoạn đã xác thực "kéo theo" mười chú thích.
