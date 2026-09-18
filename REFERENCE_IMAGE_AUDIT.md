# Đối chiếu kho ảnh tham khảo — `_reference/creative_product_HCM202`

> **Ngày kiểm: 18-9-2026.** Trạng thái tổng thể của dự án vẫn là
> `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.
>
> Tệp này là bước 5 và 6 trong thứ tự thi hành của đợt "Historical Image Integration":
> **quét kho tham khảo có sẵn trên máy trước khi tra cứu bên ngoài**, và ghi lại kết quả
> của từng ảnh trước khi tích hợp bất cứ thứ gì.
>
> Kho tham khảo nằm ở `_reference/creative_product_HCM202`, đã được `.gitignore` từ trước,
> và **không bị sửa đổi trong đợt này**. Nó chỉ được đọc.
>
> **Cập nhật 19-9-2026.** Bốn thay đổi, do ba phán quyết của dự án — xem mục 0b.
> Kết luận của bảng **không đổi**: vẫn 0 ảnh được dùng, vẫn 52 `NEED VERIFICATION` và
> 16 `REJECT`.

---

## 0. Kết luận trước, để không ai phải đọc hết bảng mới biết

**Không ảnh nào trong kho tham khảo được đưa vào sản phẩm.**

Lý do, nói cho chính xác:

- kho này ghi **một dòng nhà phát hành** cho mỗi ảnh (ví dụ `Nguồn: Báo Quân đội nhân dân`,
  `Nguồn: Bộ Tư Lệnh Lăng`, `Nguồn: Traveloka`);
- nó **không ghi**: trang bản ghi hiện vật, ký hiệu kho, số hiệu, tên người chụp,
  năm chụp do cơ quan lưu trữ xác nhận, hay bất kỳ dòng điều kiện sử dụng nào;
- giấy phép MIT ở gốc kho phủ **mã nguồn**, không phủ ảnh của bên thứ ba mà kho dẫn lại.

Theo `FIGURE_REQUIREMENTS` trong `web/src/data/figures.ts`, điều kiện 1 và 2 là
"mở được trang gốc của cơ quan lưu trữ để kiểm" và "điều kiện sử dụng được ghi nguyên văn
từ trang gốc". Không dòng nào trong 68 dòng dưới đây đạt được cả hai.

**Đây là trạng thái `NEED VERIFICATION`, KHÔNG phải `REJECTED` về bản chất.**
Hai trạng thái ấy khác nhau, và bản kiểm ngày 16–17/9 đã một lần nhầm chúng với nhau
(xem `SC-1`, `SC-2` trong sổ nguồn của sản phẩm). Không tìm thấy điều khoản
**không có nghĩa là** cấm dùng lại. Nghĩa là chưa ai đi hỏi.

Giá trị thật của kho này trong đợt vừa rồi là **nguồn phát hiện**: nó cho thấy
những cơ quan nào có thể đang giữ tư liệu gốc. Ba manh mối dẫn tới cơ quan thật được
ghi ở mục 3.

---

## 0b. Cập nhật 19-9-2026 — bốn điều được sửa sau ba phán quyết của dự án

### (a) Bộ từ vựng quyết định nay là bộ từ vựng của chính sản phẩm

Khi bảng này được viết ngày 18-9, bốn giá trị `USE` / `USE WITH CAUTION` / `NEED VERIFICATION` /
`REJECT` chỉ tồn tại **trong tài liệu này**. Từ 19-9 chúng là một kiểu dữ liệu trong mã
(`ReuseDecision` trong `web/src/data/figures.ts`), mỗi ảnh đã đưa vào sản phẩm mang một giá trị,
và **trang Kiểm chứng hiển thị nó thành một cột riêng**.

Nghĩa là: bảng dưới đây và sản phẩm nay nói **cùng một thứ tiếng**. Một ứng viên bị xếp
`NEED VERIFICATION` ở đây và một ảnh đang chạy trong sản phẩm được xếp `USE WITH CAUTION` nằm trên
cùng một thang.

`USE WITH CAUTION` **không** được nhét vào bộ từ vựng `Provenance` mà `AGENTS.md` mục 3 ấn định —
nó là một trục khác (được phép làm gì với tệp), nên có kiểu riêng. Mỗi ảnh mang **cả hai**:
một trạng thái chứng cứ **và** một quyết định dùng lại.

### (b) Bốn ảnh đang chạy trong sản phẩm nay cũng mang `USE WITH CAUTION`

Bảng này xếp loại **ứng viên bị loại**. Để đối xứng, đây là xếp loại của **tám tài liệu đã dùng**:

| `USE WITH CAUTION` — 4 | `USE` — 4 |
|---|---|
| `FS-ky-3` · ảnh báo chí Agence Meurisse 1921 | `FS-ky-1-b` · bản đồ 1909 |
| `FS-ky-2-b` · ảnh báo chí Agence Meurisse 1920 | `FS-ky-3-b` · trang L’Humanité 1919 |
| `FS-ky-5` · bìa France-Illustration 1946 | `FS-ky-3-c` · trang nhất Le Paria 1922 |
| `FS-ky-5-c` · trang 295 cùng ấn phẩm 1946 | `FS-ky-5-b` · bìa Tuyên ngôn Độc lập 1945 |

Quy tắc: hiện vật **là ảnh chụp và có người tạo lập được nêu tên** → `USE WITH CAUTION`; hiện vật
**in** → `USE`. Chi tiết ở sổ nguồn ảnh, mục 2b phán quyết 1.

### (c) Chặng 4 bị **chặn**, không bị **đóng**

Bảng này ghi rằng kho tham khảo không cung cấp được gì truy nguyên được cho chặng 4. Điều đó đúng
và không đổi. Điều **được sửa** là kết luận rút ra từ nó.

> **Sai:** “không có gì để lần”.
> **Đúng:** chặng 4 **hiện chưa có tài liệu nào đạt yêu cầu chứng cứ và điều kiện dùng lại của
> dự án** — trạng thái `BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`.

Việc kho tham khảo không có tư liệu truy nguyên được **không chứng minh** rằng không tồn tại tư
liệu phù hợp ở nơi khác. Các hướng chưa thử được liệt kê ở `SC-25` và ở sổ nguồn ảnh mục 2b.

### (d) Một manh mối của bảng này vẫn còn nguyên giá trị

Mục 3 dưới đây nêu ba manh mối dẫn tới cơ quan thật. Hai trong ba — Bảo tàng Lịch sử Quốc gia và
Bảo tàng Hồ Chí Minh — nay là **đường đi cụ thể cho chặng 4**, chứ không còn là ghi chú chung.
Thư xin phép vẫn **chưa gửi cho ai**.

---

## 1. Kho tham khảo có gì, đo bằng số

| | |
|---|---|
| Sự kiện khai trong `src/data/hcm_data.json` | 41 |
| Tổng số mục media | **68** |
| Mục media trỏ tới một tệp trong kho (đường dẫn `/image/…` trong `hcm_data.json`) | 16 |
| Tệp ảnh có thật trong thư mục `public/image/` | **19** *(đếm ngày 18-9-2026; ba tệp — `muvsar.png`, `muvsful.png`, `muvsmc.png` — không được `hcm_data.json` dẫn tới)* |
| Liên kết nóng tới máy chủ bên ngoài | 52 |
| Số tên miền bên ngoài khác nhau | 34 |
| Mục không có dòng `sourceMedia` nào | 5 |
| Mục là video YouTube, không phải ảnh | 2 |
| Mục kèm **trang bản ghi hiện vật** | **0** |
| Mục kèm **ký hiệu kho / số hiệu** | **0** |
| Mục kèm **tên người chụp** | **0** |
| Mục kèm **điều kiện sử dụng** | **0** |

Cấu trúc dữ liệu của kho, đọc trực tiếp từ tệp JSON, chỉ có các trường:
`id`, `phase`, `year`, `location`, `coordinates`, `eventMeta`, `eventName`,
`description`, `mediaUrl`, `sourceMedia`, `references`, `templateType`, `__comment`.
**Không có trường nào dành cho quyền sử dụng, tác giả ảnh, hay định danh hiện vật.**

---

## 2. Vì sao "phân kỳ" của kho tham khảo không dùng thẳng được

Kho chia hành trình thành 5 `phase`. Sản phẩm này cũng có 5 chặng.
**Hai cách chia không trùng nhau**, và việc gán ảnh theo số `phase` sẽ sai chặng.

| | Kho tham khảo (`phase`) | Sản phẩm này (chặng, theo Giáo trình 2019) |
|---|---|---|
| 1 | 1890–1911 | Thời kỳ từ ngày **5-6-1911** trở về trước |
| 2 | 1911–1920 | Thời kỳ từ ngày **6-6-1911** đến ngày **30-12-1920** |
| 3 | 1920–1930 | Thời kỳ từ ngày **31-12-1920** đến ngày **3-2-1930** |
| 4 | 1930–1941 | Thời kỳ từ ngày **4-2-1930** đến ngày **28-1-1941** |
| 5 | 1941–1969 | Thời kỳ từ ngày **29-1-1941** đến ngày **2-9-1969** |

Ranh giới của Giáo trình 2019 là **ngày liền kề chính xác**; ranh giới của kho tham khảo
là **năm tròn**. Một ảnh mà kho xếp vào `phase 2` với `year: "1920"` có thể rơi vào
chặng 2 hoặc chặng 3 của sản phẩm tuỳ ngày cụ thể — mà kho không ghi ngày cụ thể.
Đây là một lý do độc lập với vấn đề bản quyền để không nhập ảnh theo `phase`.

---

## 3. Ba manh mối dẫn tới cơ quan thật, ghi lại để người sau lần tiếp

Kho tham khảo không xác thực được gì, nhưng nó **chỉ đúng hướng** ở ba chỗ:

1. **`baotanglichsu.vn` — Bảo tàng Lịch sử Quốc gia.** 3 ảnh dẫn từ đây (mục id=28, id=36).
   Đây là một bảo tàng quốc gia, tức một cơ quan giữ hiện vật thật. Kho chỉ dẫn đường dẫn
   tệp trong thư mục `DataFiles/Uploaded/`, **không dẫn bản ghi hiện vật nào**.
   → Việc cần làm: mở bản ghi từng hiện vật ở chính bảo tàng, và hỏi điều kiện sử dụng.
2. **`baotanghochiminh.vn` — Bảo tàng Hồ Chí Minh.** 2 ảnh (mục id=32, id=35), đường dẫn
   dạng `pic/PhotoAlbum/...`. Đã kiểm trang chủ ở `SC-1` và kết luận **CHƯA XÁC LẬP ĐIỀU KIỆN
   SỬ DỤNG** — không phải bị cấm.
   → Việc cần làm: như trên.
3. **`upload.wikimedia.org` — 2 tệp.** Một tệp dẫn về **TIMEA** (Travelers in the Middle East
   Archive, Đại học Rice) cho ảnh Port Said; một tệp là ảnh Nhà sàn ở Hà Nội, gốc Flickr.
   TIMEA là một kho lưu trữ đại học có thật và có điều khoản công bố.
   → Nhưng ảnh Port Said thuộc mục id=10, mà **trích đoạn được giao không kể chặng đường
   qua Port Said**, nên dù xác thực được cũng không có chỗ đặt.

Ngoài ba manh mối trên, phần còn lại là báo chí, cổng thông tin địa phương, trang du lịch
(`Traveloka`, `LalaGo`, `Mia.vn`), trang thương mại (`fortunapost` bán bưu thiếp cổ),
một trang có **đóng dấu chìm thương mại ngay trong tên tệp** (`history101.nyc`, tên tệp chứa
`watermark_1024`), và một blog cá nhân.

---

## 4. Bảng đầy đủ 68 mục

Cột **Quyết định** chỉ nhận một trong bốn giá trị: `USE`, `USE WITH CAUTION`,
`NEED VERIFICATION`, `REJECT`.

Vì **không mục nào có trang bản ghi hiện vật và không mục nào có điều kiện sử dụng**,
ba trục *Original source*, *Rights* đều là `không ghi` cho toàn bộ bảng, và trục
*Identity / Event-date / Location* chỉ có giá trị mà **chính kho tham khảo tự khai**,
không phải giá trị đã xác thực. Cột *Chặng ứng viên* là chặng của **sản phẩm này** mà
mốc năm của kho rơi vào, tính theo mục 2; dấu `—` nghĩa là nằm ngoài phạm vi trích đoạn.

| # | phase | Năm (kho tự khai) | Địa điểm (kho tự khai) | Tệp / máy chủ | `sourceMedia` (kho tự khai) |
|---|---|---|---|---|---|
| 1 | 1 | 19-5-1890 | Nghệ An, Việt Nam | file.qdnd.vn | Báo Quân đội nhân dân |
| 1 | 1 | 19-5-1890 | Nghệ An, Việt Nam | files-vnportal.camau.gov.vn | Cổng TTĐT xã Lý Văn Lâm (Cà Mau) |
| 1 | 1 | 19-5-1890 | Nghệ An, Việt Nam | bna.1cdn.vn | Báo Nghệ An |
| 1 | 1 | 19-5-1890 | Nghệ An, Việt Nam | ik.imagekit.io | Traveloka |
| 2 | 1 | 1895 | Huế, Việt Nam | thanhuyhue.vn | Thành ủy Huế |
| 2 | 1 | 1895 | Huế, Việt Nam | nha-bac-hue-2.jpg | Bộ Tư Lệnh Lăng |
| 2 | 1 | 1895 | Huế, Việt Nam | nha-bac-hue-3.jpg | Bộ Tư Lệnh Lăng |
| 2 | 1 | 1895 | Huế, Việt Nam | nha-bac-hue-4.jpg | Bộ Tư Lệnh Lăng |
| 2 | 1 | 1895 | Huế, Việt Nam | nha-bac-hue-5.jpg | Bộ Tư Lệnh Lăng |
| 2 | 1 | 1895 | Huế, Việt Nam | nha-bac-hue-6.jpg | Bộ Tư Lệnh Lăng |
| 2 | 1 | 1895 | Huế, Việt Nam | nha-bac-hue-9.jpg | Bộ Tư Lệnh Lăng |
| 2 | 1 | 1895 | Huế, Việt Nam | nha-bac-hue-16.jpg | Bộ Tư Lệnh Lăng |
| 2 | 1 | 1895 | Huế, Việt Nam | nha-bac-hue-12.jpg | Bộ Tư Lệnh Lăng |
| 2 | 1 | 1895 | Huế, Việt Nam | baoquankhu4.com.vn | Báo quân khu 4 |
| 3 | 1 | 1901 | Nghệ An, Việt Nam | www.evn.com.vn | Tập đoàn Điện lực Việt Nam (EVN) |
| 3 | 1 | 1901 | Nghệ An, Việt Nam | file.qdnd.vn | Báo Quân đội nhân dân |
| 3 | 1 | 1901 | Nghệ An, Việt Nam | scontent.iocvnpt.com | Cổng TTĐT Du lịch Nam Đàn (Nghệ An) |
| 4 | 1 | 1906 | Huế, Việt Nam | hue.gov.vn | Cổng TTĐT Thừa Thiên Huế |
| 4 | 1 | 1906 | Huế, Việt Nam | bna.1cdn.vn | Báo Nghệ An |
| 4 | 1 | 1906 | Huế, Việt Nam | nguyen-sinh-sac.jpg | Nụ Cười Mê Kông |
| 5 | 1 | 1909 | Bình Định, Việt Nam | static.tuoitre.vn | Báo tuổi trẻ |
| 6 | 1 | 1910 | Bình Thuận, Việt Nam | phan-thiet-1.jpg | Báo Dân trí |
| 6 | 1 | 1910 | Bình Thuận, Việt Nam | lalago.vn | LalaGo |
| 6 | 1 | 1910 | Bình Thuận, Việt Nam | media.baobinhphuoc.com.vn | Báo Bình Phước |
| 6 | 1 | 1910 | Bình Thuận, Việt Nam | media.baobinhphuoc.com.vn | Báo Bình Phước |
| 7 | 1 | 5-6-1911 | Sài Gòn, Việt Nam | file.qdnd.vn | Báo Quân đội nhân dân |
| 7 | 1 | 5-6-1911 | Sài Gòn, Việt Nam | file.qdnd.vn | Báo Quân đội nhân dân |
| 7 | 1 | 5-6-1911 | Sài Gòn, Việt Nam | media-cdn-v2.laodong.vn | Báo Lao Động |
| 7 | 1 | 5-6-1911 | Sài Gòn, Việt Nam | youtu.be | (không ghi) |
| 8 | 2 | 08-06-1911 | Singapore | vcdn1-kinhdoanh.vnecdn.net | VnExpress |
| 9 | 2 | 11-06-1911 | Colombo, Sri Lanka | vantainhanhvn.com | vantainhanhvn |
| 10 | 2 | 30-06-1911 | Port Said, Ai Cập | upload.wikimedia.org | Wikipedia |
| 11 | 2 | 06-07-1911 | Marseille, Pháp | cangmacxay1.jpg | Truyền Hình Nghệ An |
| 12 | 2 | 1912 | Le Havre, Pháp | www.fortunapost.com | fortunapost |
| 13 | 2 | 12-1912 | New York, Hoa Kỳ | www.history101.nyc | history101 |
| 14 | 2 | 1913 | Boston, Hoa Kỳ | vstatic.vietnam.vn | VIETNAM.VN |
| 15 | 2 | 5-1914 | London, Anh | cdnmedia.baotintuc.vn | Báo tin tức Thông Tấn Xã Việt Nam |
| 16 | 2 | 1917 | Paris, Pháp | img.webtech360.com | WEBTECH360 |
| 17 | 2 | 18-06-1919 | Versailles, Pháp | file3.qdnd.vn | Quân Đội Nhân Dân |
| 18 | 2 | 18-06-1919 | Paris, Pháp | media-cdn-v2.laodong.vn | Lao Động |
| 19 | 3 | 1920 | Tours, Pháp | baoquankhu4.com.vn | Quân Khu Bốn |
| 20 | 3 | 1922 | Marseille, Pháp | vietnamesecommunity.wordpress.com | Thông tấn xã Việt Nam |
| 21 | 3 | 1924 | Moskva, Liên Xô | baoquankhu4.com.vn | Báo Quân Khu Bốn |
| 21 | 3 | 1924 | Moskva, Liên Xô | baoquankhu4.com.vn | (không ghi) |
| 22 | 3 | 1925 | Quảng Châu, Trung Quốc | baoquankhu4.com.vn | Báo Quân Khu Bốn |
| 23 | 3 | 15-6-1927 | Moskva, Liên Xô | cdn.tienphong.vn | Báo tiên phong |
| 24 | 3 | 11-1927 | Berlin, Đức | tennguoidepnhat.net | Công tác quân sự của Đảng trong nông dân - tennguoidepnhat.net |
| 25 | 3 | 12-1927 | Bruxelles, Bỉ | hdll.vn | Trang thông tin điện tử Hội đồng Lý luận trung ương |
| 26 | 3 | 7-1928 | Thái Lan | laichau.gov.vn | Cổng thông tin điện lực Tỉnh Lai Châu |
| 27 | 3 | 3-2-1930 | Hương Cảng, Trung Quốc | baoquankhu4.com.vn | Báo Quân Khu Bốn |
| 28 | 4 | 1931 | Hồng Kông, Trung Quốc | baotanglichsu.vn | Bảo tàng Lịch sử Quốc gia |
| 28 | 4 | 1931 | Hồng Kông, Trung Quốc | baotanglichsu.vn | (không ghi) |
| 29 | 4 | 1933 | Thượng Hải, Trung Quốc | bac-ho-voi-ban-quoc-te-1.jpg | Bộ tư lệnh lăng |
| 30 | 4 | 1934 | Moskva, Liên Xô | images.hcmcpv.org.vn | Đảng bộ thành phố Hồ Chí Minh |
| 31 | 4 | 1938 | Diên An, Trung Quốc | vietnamese.cri.cn | Báo Cri Online |
| 32 | 4 | 1938 | Quế Lâm (Quảng Tây), Trung Quốc | baotanghochiminh.vn | Bảo tàng Hồ Chí Minh |
| 33 | 4 | 1939 | Quý Dương, Trung Quốc | mia.vn | Mia.vn |
| 34 | 4 | 1940 | Vân Nam, Trung Quốc | vov2.vov.vn | VOV |
| 35 | 4 | 1941 | Tĩnh Tây, Trung Quốc | baotanghochiminh.vn | Bảo tàng Hồ Chí Minh |
| 36 | 5 | 1941 | Cao Bằng, Việt Nam | cdn.tienphong.vn | Báo Tiền Phong |
| 36 | 5 | 1941 | Cao Bằng, Việt Nam | baotanglichsu.vn | Bảo tàng Lịch sử Quốc gia |
| 37 | 5 | 1945 | Hà Nội, Việt Nam | youtu.be | Báo Vietnamnet |
| 38 | 5 | 1946 | Hà Nội, Việt Nam | loi-keu-goi-ho-chi-minh.jpg | Báo Vietnamnet |
| 39 | 5 | 1951 | Chiến khu Việt Bắc | 1951.jpg | Thanh ủy Bắc Ninh |
| 40 | 5 | 1954 | Hà Nội, Việt Nam | upload.wikimedia.org | Wikipedia |
| 41 | 5 | 1969 | Nhà 67, Hà Nội, Việt Nam | file3.qdnd.vn | Báo Quân đội Nhân dân |
| 41 | 5 | 1969 | Nhà 67, Hà Nội, Việt Nam | bacho_03_1.jpg | (không ghi) |
| 41 | 5 | 1969 | Nhà 67, Hà Nội, Việt Nam | bacho04.jpg | (không ghi) |

### Quyết định, áp cho toàn bảng

Không cần một cột lặp lại 68 lần cùng một giá trị. Quyết định được ghi theo nhóm,
và lý do của từng nhóm là khác nhau:

| Nhóm | Số mục | Quyết định | Lý do |
|---|---|---|---|
| Ảnh dẫn từ **bảo tàng quốc gia** (`baotanglichsu.vn`, `baotanghochiminh.vn`) | 4 | **NEED VERIFICATION** | Cơ quan giữ hiện vật có thật, nhưng kho chỉ dẫn đường dẫn tệp, không dẫn bản ghi hiện vật và không có điều kiện sử dụng. Phải hỏi chính bảo tàng. |
| Ảnh dẫn từ **báo chí và cổng thông tin nhà nước** | 32 | **NEED VERIFICATION** | Toà soạn là nơi **đăng lại**, không phải nơi giữ hiện vật. Dòng `Nguồn: Báo …` cho biết ai đăng, không cho biết ai giữ bản gốc, ai chụp, hay ai cho phép dùng lại. |
| Ảnh **nằm trong kho** (`public/image/*`) | 14 | **NEED VERIFICATION** | Là bản sao cục bộ của cùng loại ảnh trên; việc nằm trong một kho mã nguồn không tạo ra xuất xứ. Giấy phép MIT của kho phủ mã, không phủ ảnh. |
| Ảnh dẫn từ **Wikimedia Commons** | 2 | **NEED VERIFICATION** | Xem `SC-17`: nhãn trên Commons là kết luận của cộng đồng, không phải tuyên bố của cơ quan giữ hiện vật. Một trong hai dẫn về TIMEA (Đại học Rice) và **có thể lần tiếp**, nhưng sự kiện của ảnh (Port Said) nằm ngoài trích đoạn nên không có ô để đặt. |
| Ảnh dẫn từ **trang du lịch / thương mại** (`Traveloka`, `LalaGo`, `Mia.vn`, `fortunapost`, `vantainhanhvn`, `webtech360`, `iocvnpt`) | 7 | **REJECT** | Không phải cơ quan lưu trữ, và một số là ảnh đương đại chụp địa điểm ngày nay chứ không phải tư liệu lịch sử. Dùng một ảnh du lịch hôm nay để minh hoạ một sự kiện đầu thế kỷ XX là đúng loại sai lệch mà quy tắc dự án cấm. |
| Ảnh có **dấu chìm thương mại trong chính tên tệp** (`history101.nyc`, `watermark_1024`) | 1 | **REJECT** | Điều kiện sử dụng không những chưa xác lập mà còn có dấu hiệu ngược lại. |
| Ảnh dẫn từ **blog / trang cá nhân** (`tennguoidepnhat.net`, `vietnamesecommunity.wordpress.com`) | 2 | **REJECT** | Không truy nguyên được. Cùng loại với `SC-3`. |
| **Video YouTube** | 2 | **REJECT** | Không phải ảnh; ngoài phạm vi đợt này, và sản phẩm không nhúng nội dung từ máy chủ bên thứ ba. |
| Mục **không có cả dòng `sourceMedia`** | 4 | **REJECT** | Không có nổi một dòng nhà phát hành. |

Cộng dồn: **52 `NEED VERIFICATION`, 16 `REJECT`, 0 `USE`, 0 `USE WITH CAUTION`.**

> Một mục có thể thoả nhiều nhóm — chẳng hạn vừa là tệp trong kho vừa dẫn từ báo chí,
> hoặc vừa dẫn từ bảo tàng vừa thiếu dòng `sourceMedia`. Khi ấy nó được tính vào **nhóm
> chặt hơn**, đúng một lần. Vì vậy nhóm bảo tàng đếm 4 chứ không phải 5: một ảnh của
> Bảo tàng Lịch sử Quốc gia không có dòng `sourceMedia` nào nên rơi xuống nhóm cuối.
> Các số trên được đếm bằng máy từ chính tệp JSON, không đếm tay, và cộng đúng 68.

---

## 5. Điều kho tham khảo **đã** thay đổi trong đợt này

Ba thứ, và đều không phải là một tấm ảnh:

1. **Nó xác nhận rằng hướng đi đúng là kho lưu trữ, không phải báo chí.** Sau khi thấy
   34 tên miền mà không một dòng điều kiện sử dụng nào, việc quay lại BnF Gallica —
   nơi mỗi hiện vật có `dc:rights` riêng và một trang điều kiện công bố — là lựa chọn
   được chứng minh chứ không phải thói quen.
2. **Nó chỉ ra hai bảo tàng quốc gia đáng hỏi**, kèm bằng chứng rằng tư liệu liên quan
   thật sự nằm ở đó. Đây là nội dung cụ thể cho thư xin phép hiện vẫn **chưa gửi cho ai**.
3. **Nó cho thấy một mô hình dữ liệu cần tránh.** Kho tham khảo lưu một chuỗi
   `sourceMedia` duy nhất cho mỗi ảnh. Sản phẩm này lưu sáu trục tách rời — nhận diện,
   sự kiện/niên đại, địa điểm, nơi giữ, điều kiện sử dụng, đóng gói ngoại tuyến — và
   `content.test.ts` nay có một phép thử **cấm hai trục mang cùng một nội dung**, để một
   trục đã xác lập không bao giờ bảo lãnh cho một trục chưa xác lập.

## 6. Điều **không** được lấy từ kho tham khảo

Theo đúng mục 16 của đề bài, đợt này **không** sao chép từ kho tham khảo:
bố cục giao diện, cách dựng thư viện ảnh, chú thích nguyên văn, mã thành phần, CSS,
hiệu ứng chuyển cảnh, cấu trúc dữ liệu, hay cách trình bày ảnh.
Kiến trúc bản khắc SVG, sổ địa điểm, và toàn bộ hệ trình bày của sản phẩm giữ nguyên.

## 7. Nếu có ảnh nào từ kho này được dùng về sau

Ghi nguồn phải trỏ về **cơ quan lưu trữ gốc**, không bao giờ trỏ về GitHub.
Dòng được phép ghi thêm, và chỉ ở sổ nội bộ, là:

```text
Discovered via: PhamXuanKhang/creative_product_HCM202
```

`content.test.ts` có một phép thử chặn mọi chuỗi `github`, `gitlab`,
`creative_product_HCM202`, `wikipedia`, `commons.wikimedia` xuất hiện trong bất kỳ
trường nguồn nào của một ảnh đã đưa vào sản phẩm.
