# HÀNH TRÌNH TƯ TƯỞNG

Sản phẩm web tương tác cho học phần HCM202, trình bày năm thời kỳ trong mục II của
trích đoạn được giao (`C2-02.pdf`).

> **Trạng thái dự án:** `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`
> Sản phẩm chạy được và đã qua kiểm thử kỹ thuật, nhưng **chưa** có ai đối chiếu nội dung
> học thuật với giáo trình chính thống, và **chưa** có dữ liệu thử nghiệm người dùng thật.

---

## 1. Chạy sản phẩm

Cần Node.js 20 trở lên. Lần đầu:

```bash
cd web
npm install
```

Nếu npm báo `1 package has install scripts not yet covered by allowScripts`, chạy thêm:

```bash
npm approve-scripts esbuild
```

### Chế độ phát triển

```bash
npm run dev
```

Mở địa chỉ mà Vite in ra, thường là `http://localhost:5173`.

### Bản dựng để demo và để nộp

```bash
npm run build     # tạo thư mục dist/
npm run preview   # phục vụ dist/ tại http://localhost:4173
```

Thư mục `dist/` là bản để nộp vào Folder `02_Product_Final` và để phục vụ qua máy chủ.
Toàn bộ phông chữ và tài nguyên đã đóng gói bên trong nên **không cần mạng**.

> **Lưu ý đã kiểm chứng:** không mở thẳng `dist/index.html` từ USB. Bản dựng nạp mã
> bằng ES module kèm thuộc tính `crossorigin`; khi mở bằng `file://`, trang có
> origin `null` và Chrome chặn cả script lẫn CSS theo CORS — màn hình trắng hoàn toàn.

### Bản một tệp để chiếu tại Showcase

```bash
npm run build:offline    # tạo dist/HCM202_HanhTrinhTuTuong_offline.html
npm run check:offline    # kiểm tra lại: 11 tuyến, 0 request mạng, 0 lỗi
```

Tệp đó tự chứa toàn bộ CSS, mã và 42 tệp phông (dạng data URI), khoảng 1 MB.
**Nhấp đúp để mở, không cần máy chủ, không cần mạng.** Đây là tệp nên chép vào USB
và dùng trên máy trình chiếu theo quy tắc No-AI live rebuttal (một máy tính).

---

## 2. Mạch trải nghiệm

| Đường dẫn | Màn hình | Vai trò trong lập luận |
|---|---|---|
| `#/` | Câu hỏi trung tâm | Mở bằng đúng một câu hỏi, kèm tên năm chặng sẽ đi qua và trạng thái phê duyệt |
| `#/hanh-trinh` | Tổng quan năm chặng | Sơ đồ dải, danh sách năm chặng kèm vế sau của tiêu đề, và tên của từng mối nối |
| `#/chang/ky-1` … `ky-5` | Từng chặng | Câu hỏi dẫn vào → bối cảnh → chuyển biến → bước ngoặt → ranh giới → cầu nối sang chặng sau |
| `#/doi-sanh` | Đối sánh | Một câu hỏi, đặt cho hai chặng khác nhau |
| `#/noi-ket` | Nối kết | Ghép trải nghiệm với nhận thức mà trích đoạn gắn vào |
| `#/tong-hop` | Tổng hợp | Dựng lại trình tự năm chặng, quay về câu hỏi trung tâm |
| `#/kiem-chung` | Kiểm chứng | Toàn bộ những gì **chưa** được xác thực, kèm căn cứ các lựa chọn thiết kế |

Bốn màn hình sau năm chặng có mục riêng trong thanh chỉ dẫn, ở mọi màn hình có thanh đó, và có
thẻ dẫn ở cuối trang tổng quan. Trước đây `#/doi-sanh` và `#/noi-ket` không có đường dẫn nào
trong sản phẩm.

### Hai cách đọc một chặng

| Chế độ | Làm gì |
|---|---|
| **Đi từng nhịp** (mặc định) | Mỗi màn hình một nhịp, có thanh chỉ vị trí và nút Trước/Tiếp |
| **Đọc liền mạch** | Đúng những nhịp ấy, đúng thứ tự in, trên một trang |

Hai chế độ hiển thị **cùng một nội dung**: không chế độ nào thêm, bớt, gộp hay rút ngắn điều gì.
Lựa chọn được ghi nhớ trong trình duyệt của người xem.

Thanh phía trên mỗi chặng cho biết chặng gồm những phần nào (Bối cảnh · Chuyển biến · Bước ngoặt ·
Nguyên văn · Ranh giới), mỗi phần có bao nhiêu nhịp, đang đứng ở phần nào, và bấm để đi thẳng tới.

### Nhịp của một chặng

| Chỗ | Làm gì |
|---|---|
| **Câu hỏi dẫn vào chặng** | Chặng mở bằng một câu hỏi của nhóm, không phải một khẳng định |
| **Thử đoán trước khi đọc** | Tuỳ chọn, đóng sẵn. Ba câu trả lời **thật** của ba chặng; chỉ một câu là của chặng này |
| **Bước ngoặt** | Đứng ở phía gần trước, tự mở ra, rồi thấy **cả hai phía cạnh nhau** kèm câu tóm tắt |
| **Đã làm rõ trong chặng này** | Lề bên cạnh phần đọc; mỗi bước ngoặt đã mở để lại câu nói rõ điều gì đã thay đổi |
| **Sợi chỉ đi tiếp** | Cuối chặng: ranh giới dùng chung, vế sau tiêu đề chặng sau, và **câu hỏi chặng sau mở đầu** |

Bảng “Thử đoán” **không bịa phương án sai**. Cả ba câu đều là câu trả lời đã lưu của một chặng có
thật, kèm vị trí trong trích đoạn; câu sai với chặng này là câu đúng của chặng khác, và phản hồi
nói rõ là chặng nào. Sáu kiểm thử đơn vị khoá lại điều này.

### Phím tắt khi trình bày

| Phím | Tác dụng |
|---|---|
| `P` | Mở hoặc đóng chế độ trình bày |
| `←` `→` | Chuyển nhịp |
| `Home` `End` | Về nhịp đầu hoặc nhịp cuối |
| `Esc` | Thoát chế độ trình bày |

Chế độ trình bày có bảy nhịp, tổng 11,5 phút, nằm trong khung 10 - 12 phút của buổi
Showcase. Mỗi nhịp hiển thị gợi ý cho người nói và thời lượng dự kiến. Nút **Bắt đầu giờ**
chạy đồng hồ và chuyển sang màu nhấn khi vượt 12 phút.

Chế độ trình bày tự điều hướng phần demo sang đúng màn hình của từng nhịp, nên chỉ cần
**một máy tính** đúng như quy tắc No-AI live rebuttal.

---

## 3. Kiểm thử

```bash
npm run typecheck   # TypeScript, chế độ strict
npm run lint        # ESLint + typescript-eslint
npm run test        # Vitest: các bất biến học thuật
npm run build       # typecheck + dựng bản production
npm run e2e         # Playwright: 3 khung màn hình, cần đã chạy npm run build
```

Ngoài ra, sau khi đã `npm run build` và `npm run preview`:

```bash
node tools/ux-audit.mjs   # tương phản thật của chữ trên 11 tuyến, nền sáng và nền tối,
                          # cộng kiểm tra cỡ chữ 200%: không tràn ngang, không cắt chữ
node tools/ux-shots.mjs   # chụp các màn đã sửa ở 3 khung, kèm nền tối và reduced motion
```

`npm run test` không kiểm tra giao diện. Nó khoá các bất biến học thuật: năm tiêu đề đúng
từng ký tự, mười ứng viên định vị không bao giờ được đánh dấu đã kiểm chứng, `Sđd` không
bao giờ được mở rộng, phần vĩ thanh sau 1969 không lọt vào chặng 5, và kịch bản trình bày
không trôi ra ngoài khung 10 - 12 phút.

`npm run e2e` dùng Chrome đã cài trên máy (`channel: 'chrome'`), không tải trình duyệt riêng.

---

## 4. Ranh giới học thuật

Đọc `AGENTS.md` và `HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md` ở thư mục gốc trước khi
sửa bất kỳ nội dung học thuật nào. Những điều sau là bắt buộc:

- Nội dung học thuật chỉ nằm trong trích đoạn được giao. Không mở rộng ra ngoài.
- Năm tiêu đề tiếng Việt phải giữ nguyên văn. Tên tiếng Anh rút gọn chỉ dùng trong mã nguồn,
  không bao giờ thay thế tiêu đề trong nội dung hiển thị.
- Các căng thẳng niên đại `C2-R01` đến `C2-R09` phải giữ nguyên, không sửa.
- Chữ viết tắt `Sđd` không bao giờ được suy đoán mở rộng.
- Không tạo, không mô phỏng, không làm biến dạng chân dung của bất kỳ nhân vật nào.
- Không tạo dữ liệu khảo sát, phản hồi hay người dùng giả lập.

Trang `#/kiem-chung` hiển thị toàn bộ sổ ghi nhận này cho người xem. Nếu thêm một luận điểm
mới, phải thêm cả vị trí trong trích đoạn và trạng thái kiểm chứng của nó.

---

## 5. Cấu trúc mã nguồn

```
web/
  src/
    data/          nội dung học thuật và dữ liệu tương tác
      stages.ts      năm chặng, trích dẫn, bước ngoặt, vĩ thanh
      locators.ts    mười ứng viên định vị, sổ rủi ro, đối chiếu dạng chữ in
      interactions.ts trục đối sánh, cặp nối kết, kịch bản trình bày
      project.ts     câu hỏi trung tâm, thông điệp, khai báo, căn cứ thiết kế
      types.ts       mô hình dữ liệu và nhãn xuất xứ
    components/    các màn hình và thanh chỉ dẫn năm chặng
    lib/           dựng DOM, định tuyến, tuỳ chọn người xem
    styles/        token thiết kế, bố cục, thành phần, chế độ trình bày
    test/          kiểm thử bất biến học thuật
  e2e/             kiểm thử trình duyệt
  tools/           script phụ trợ khi phát triển, không thuộc sản phẩm
```

Nội dung học thuật nằm trong `src/data/`, tách khỏi phần hiển thị. Sửa nội dung thì sửa ở đó;
`src/components/` chỉ trình bày lại những gì dữ liệu nói.
