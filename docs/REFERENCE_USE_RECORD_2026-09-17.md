# Reference use record — 17-9-2026

> Folder `07_AI_Declaration_Integrity_PromptLog` / `03_Product_Dossier` (nguồn gốc thiết kế).
> Trạng thái: `PROJECT DECISION`. Bản ghi này bảo vệ đường dây tính nguyên gốc của sản phẩm.
>
> **Kho tham chiếu KHÔNG phải là một nguồn học thuật.** Nó không được dẫn ở bất kỳ đâu trong sản
> phẩm, không xuất hiện trong bất kỳ trích dẫn nào, và không hợp thức hoá một mệnh đề lịch sử nào.
> Nó chỉ là tư liệu tham khảo về thiết kế.

---

## 1. Kho được xem

| | |
|---|---|
| Địa chỉ | <https://github.com/PhamXuanKhang/creative_product_HCM202> |
| Ngày xem | 17-9-2026 |
| Bản sao cục bộ | `_reference/creative_product_HCM202` |
| Trạng thái bản sao | clone đầy đủ, 62 tệp, 95 commit, HEAD `583f5c9` (2-5-2026) |
| Cách xử lý | **CHỈ ĐỌC.** `git status --porcelain` rỗng trước và sau. Đã nằm trong `.gitignore` (`_reference/`), không commit, không build, không đóng gói, không triển khai. |

**Một ghi chú về xuất xứ, ghi ra vì nó liên quan trực tiếp đến tính nguyên gốc.** Commit đầu tiên của
kho ấy là `db5eb94`, ngày 10-4-2019, tác giả *Chris Zhou*, nội dung `bootstrap metoorising mvp`. Kho
là bản khoác áo mới của `chrisrzhou/google-globe-trends`; bằng chứng còn nguyên trong cây mã và chưa
bị xoá (`src/components/about.js:13-42`, `link.js:3-13`, `overlay.js:23,36` — cả bốn tệp này là mã
chết, không nơi nào import). Nói cách khác, chính quả địa cầu ở đó cũng là thứ được kế thừa. Đây là
thêm một lý do để phần triển khai của chúng tôi không được dẫn xuất từ mã của nó.

## 2. Đã nghiên cứu những gì

Đọc trực tiếp mã nguồn, không đọc qua README: `package.json`, `src/config.js`, `src/state.js`,
`src/index.scss` (916 dòng), `src/data/hcm_data.json` (41 bản ghi), và toàn bộ `src/components/`.

Nội dung nghiên cứu: ý tưởng tương tác cốt lõi, cách sự kiện gắn với toạ độ, kiến trúc thông tin,
ngôn ngữ thị giác, chiến lược tài nguyên, tình trạng tiếp cận và tình trạng ngoại tuyến.

## 3. Đã lấy đúng ba thứ, và đều là nguyên tắc chung

1. **Không gian làm chỉ mục** — tới nội dung bằng cách đi qua một nơi chốn.
2. **Niên đại và địa lý dùng chung một điều khiển** — lật sang mục kế tiếp thì cũng là dịch chuyển
   trong không gian.
3. **Nền lặng đi khi người ta đọc** — bề mặt thôi tranh chấp với chữ đúng lúc chữ trở nên quan trọng.

Ba điều này là nguyên tắc tương tác phổ biến trong thực hành kể chuyện bản đồ, không phải phát minh
của kho ấy — và như mục 1 đã ghi, quả địa cầu của nó cũng là đồ kế thừa.

## 4. Đã cố ý KHÔNG lấy

- một tệp, một dòng mã, một tên trường, một nhãn, một tài nguyên, một màu, một bố cục nào;
- `react-globe`, `three`, kết cấu ảnh của quả địa cầu, mã vật liệu điểm đánh dấu;
- mô hình dữ liệu 41 bản ghi và 13 trường của nó;
- năm nhãn giai đoạn của nó (vốn không khớp với ranh giới ngày xác định của giáo trình 2019, và
  trong chính kho ấy còn tồn tại hai cách ghi khác nhau giữa mã và README);
- kiến trúc một-màn-hình với ngăn kéo 35% bên phải và bảng xếp gấp ở góc trên bên phải;
- cơ chế `templateType` và băng ảnh cuộn ngang;
- cách gắn sự kiện với toạ độ bằng cách gom theo chuỗi `"lat,lng"`;
- và — điều tinh vi nhất — **không dựng lại cùng một sản phẩm với chữ của mình thay vào**.

## 5. Những quyết định nguyên gốc rút ra từ đó

| Trục | Kho tham chiếu | Sản phẩm này |
|---|---|---|
| Bề mặt | quả cầu WebGL | bản khắc SVG phẳng, **không phụ thuộc mới lúc chạy** |
| Nền bản đồ | một ảnh JPEG tải từ `raw.githubusercontent.com` của một bên thứ ba | Natural Earth miền công cộng, giải mã sẵn thành chữ và đóng gói kèm; **không vẽ biên giới**, vì trích đoạn trải từ 1911 đến 1969 |
| Cái gì được đặt lên bản đồ | cả 41 sự kiện, mỗi sự kiện một toạ độ | **chỉ những gì trích đoạn in ra**; chỗ nguồn không nêu thì để trống và nói rõ là để trống |
| Đường nối | không vẽ | **chỉ vẽ ở chỗ trích đoạn nói thẳng ra một chuyến đi** — bốn câu trong tám trang, hai trong số đó không nêu tên đầu kia |
| Dấu hiệu mã hoá điều gì | số sự kiện trùng toạ độ | trạng thái bằng chứng và vai trò tự sự |
| Bộ máy nguồn | danh sách URL trần | số trang in cho từng mệnh đề, cộng một sổ xuất xứ toạ độ riêng có trạng thái riêng |
| Định tuyến | một màn hình, không URL | router theo hash sẵn có; mọi chặng và hoạt động vẫn dẫn link được |
| Tiếp cận | 2 thuộc tính `aria-*` trong cả kho, cả hai nằm trên mã chết | lớp vẽ là trang trí, mọi thông tin đều có mặt dưới dạng chữ; bàn phím, tiêu điểm, giảm chuyển động và phóng chữ 200% đều được kiểm lại |
| Ngoại tuyến | không chạy được | bản một tệp, **không một yêu cầu mạng nào**, có công cụ kiểm |

**Khác biệt sâu nhất nằm ở luận đề.** Kho tham chiếu vẽ **một cuộc đời**. Sản phẩm này vẽ **một
nguồn**: bản đồ đi xa đúng bằng chỗ trích đoạn được giao đi, và dừng lại nhìn thấy được ở chỗ trích
đoạn dừng. Người đọc kho kia biết Hồ Chí Minh đã đi những đâu. Người đọc sản phẩm này biết **trang
giáo trình được giao nói Người đã đi những đâu — và ở đâu thì nó không nói.**

## 6. Phân tích đầy đủ

`REFERENCE_ANALYSIS.md` ở thư mục gốc, kèm bảng phân rã từng ý tưởng và trả lời năm câu hỏi bắt buộc,
mọi dẫn chiếu đều kèm đường dẫn tệp và số dòng thật trong bản sao cục bộ.

---

## 7. Bổ sung 18-9-2026 — lần thứ hai mở kho, lần này vì ảnh chứ vì thiết kế

Mục 1–6 viết ngày 17-9 và nói về **thiết kế**. Ngày 18-9 kho được mở lại với một mục đích khác:
tìm **ảnh tư liệu lịch sử**. Kết quả được ghi tách riêng ở đây để không trộn hai lần xem.

| | |
|---|---|
| Ngày xem lại | 18-9-2026 |
| Mục đích | Tìm ảnh tư liệu, theo đúng thứ tự đề bài đặt: **tìm tại chỗ trước, ra ngoài sau** |
| Cách xử lý | **CHỈ ĐỌC**, như lần trước. Kho không bị sửa. Không clone lại. |
| Phạm vi đã đọc | `src/data/hcm_data.json` (toàn bộ 41 sự kiện), `public/image/` (**19 tệp** — *đính chính 18-9-2026: bản ghi này in “20 tệp”, đếm sai; thư mục có 19 tệp, cả trên đĩa lẫn trong chỉ mục git. Đây là con số mà `SC-16` trong `figures.ts` đã ghi là đếm sai nhưng chưa sửa ở đây*), `public/`, `readme.md`, `AGENTS.md` |
| Kết quả | **0 ảnh được dùng.** Bảng đầy đủ 68 mục: [`../REFERENCE_IMAGE_AUDIT.md`](../REFERENCE_IMAGE_AUDIT.md) |

**Vì sao 0.** Kho ghi **một dòng nhà phát hành** cho mỗi ảnh và không ghi gì thêm. Đếm bằng máy từ
chính tệp JSON: **0 mục** có trang bản ghi hiện vật, **0 mục** có ký hiệu kho hay số hiệu, **0 mục**
có tên người chụp, **0 mục** có điều kiện sử dụng. Giấy phép MIT ở gốc kho phủ **mã nguồn**, không
phủ ảnh của bên thứ ba mà kho dẫn lại — 52 trong 68 mục là **liên kết nóng** tới máy chủ của báo
chí và trang thương mại, không phải tệp của kho.

**Trạng thái được ghi cho đúng.** Đây là **`NEED VERIFICATION`** cho 52 mục và **`REJECT`** cho 16
mục, **không phải “bị cấm dùng lại”**. Hai trạng thái ấy khác nhau; sổ nguồn ảnh của dự án đã một
lần nhầm chúng với nhau ngày 16-9 và đã đính chính, nên lần này không lặp lại.

**Kho vẫn đóng góp ba thứ, và không thứ nào là một tấm ảnh:**

1. **Nó xác nhận hướng đi.** Sau khi thấy 34 tên miền mà không một dòng điều kiện sử dụng nào,
   việc quay về BnF Gallica và Humazur — nơi mỗi hiện vật có trường quyền riêng và một trang điều
   kiện công bố — là lựa chọn **được chứng minh**, không phải thói quen.
2. **Nó chỉ ra hai bảo tàng quốc gia đáng hỏi** (`baotanglichsu.vn`, `baotanghochiminh.vn`) kèm
   bằng chứng rằng tư liệu liên quan thật sự nằm ở đó. Đây là nội dung cụ thể cho thư xin phép ở
   mục 3b của sổ nguồn ảnh — **vẫn chưa gửi cho ai**.
3. **Nó cho thấy một mô hình dữ liệu cần tránh.** Kho lưu một chuỗi `sourceMedia` duy nhất cho mỗi
   ảnh. Sản phẩm này lưu **sáu trục tách rời**, và từ 18-9 có một phép thử **cấm hai trục mang cùng
   một nội dung** — để một trục đã xác lập không bao giờ bảo lãnh cho một trục chưa xác lập.

**Điều tiếp tục KHÔNG lấy từ kho**, đúng §16 của đề bài: bố cục giao diện, cách dựng thư viện ảnh,
chú thích nguyên văn, mã thành phần, CSS, hiệu ứng chuyển cảnh, cấu trúc dữ liệu, cách trình bày ảnh.

**Một ràng buộc bằng máy được thêm vào.** `web/src/test/content.test.ts` nay có phép thử
`never names a code host or a reference repository as a source`: mọi trường nguồn của một ảnh đã đưa
vào sản phẩm **không được chứa** `github`, `gitlab`, `creative_product_HCM202`, `wikipedia` hay
`commons.wikimedia`. Nếu về sau có ảnh nào thật sự đến từ kho này, dòng được phép ghi là
`Discovered via: PhamXuanKhang/creative_product_HCM202` và **chỉ ở sổ nội bộ**, không bao giờ ở
chỗ ghi nguồn lịch sử.
