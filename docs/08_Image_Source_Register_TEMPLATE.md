# Sổ đối chiếu nguồn ảnh tư liệu — HÀNH TRÌNH TƯ TƯỞNG

> **Cập nhật 17-9-2026 (bản thứ hai trong ngày).** Sản phẩm khai báo **11 vị trí ảnh**:
> một ở màn mở đầu, **năm vị trí chính** (mỗi chặng một) và **năm vị trí bổ trợ** (mỗi chặng một).
> **Bốn vị trí đã được điền** — `FS-open`, `FS-ky-2-b`, `FS-ky-3-b` và `FS-ky-5-b` — cả bốn
> bằng tư liệu do Thư viện quốc gia Pháp (BnF) giữ và công bố trên Gallica.
> **Bảy vị trí còn lại vẫn trống.**
>
> Ba trong bốn tư liệu **không phải ảnh chân dung**: một ảnh toàn cảnh hội trường, một trang báo
> và một bìa sách. Đó không phải sự tình cờ — xem mục 3, phần “Vì sao không có thêm ảnh chân dung”.
>
> ⚠️ **ĐÍNH CHÍNH — không xoá bản cũ.** Bản trước của chính tệp này mở đầu bằng câu
> *“Sản phẩm có sáu vị trí ảnh… Năm vị trí còn lại vẫn trống.”* Con số ấy **đúng khi viết**,
> nhưng mã nguồn sau đó khai báo thêm năm vị trí bổ trợ mà tệp này không được cập nhật theo.
> Bảng ở **mục 2** dưới đây đã được dựng lại cho khớp `FIGURE_SLOTS`. Bài học ghi lại để không
> lặp: **số vị trí phải đọc từ mã, không chép tay vào tài liệu.** Trang Kiểm chứng trong sản phẩm
> nay suy ra mọi con số từ dữ liệu, nên chính nó là nơi tra cứu đáng tin, không phải tệp này.
>
> Phần bản ghi của ảnh đã duyệt ở **mục 4** là bản ghi thật.
> Phần bảng trống ở **mục 6** giữ nhãn **`TEMPLATE - NOT EVIDENCE`** — không ô nào được điền
> trước, không ô nào được suy đoán, không ô nào được sinh ra bằng AI.
>
> Bản ghi chính thức thuộc Folder `08_Source_Verification_Log` (và Folder `02_Product_Final`
> cho tệp ảnh) trên Drive của nhóm.

---

## 0. Ba câu hỏi phải tách rời

Lần tìm nguồn đầu tiên (16–17/9) gộp ba câu hỏi này làm một và kết luận sai. Giữ lại đây để
không lặp lại:

| | Câu hỏi | Trả lời bằng gì |
|---|---|---|
| **A** | Ảnh có đúng là tài liệu được mô tả, và ai đang giữ nó? | Bản ghi của cơ quan giữ hiện vật, ký hiệu kho, số hiệu |
| **B** | Ngày, địa điểm, sự kiện đã xác thực đến đâu? | Ai **nói** dữ kiện đó — và chỉ chép lại đúng lời họ |
| **C** | Điều kiện sử dụng cho phép làm gì: tải về, đóng gói offline, hiển thị công khai, đổi kích thước? | Trang điều khoản của chính nơi giữ, đọc trực tiếp |

**Hai sai lầm đã mắc và đã sửa:**

1. Coi “trang không công bố điều khoản” là “nguồn cấm dùng lại”.
   → Đúng ra: **chưa xác lập điều kiện sử dụng**, cần hỏi, không phải bị từ chối.
2. Lấy niên đại mâu thuẫn của một ảnh làm lý do loại **về bản quyền**.
   → Niên đại đáng ngờ là vấn đề của **chú thích** (câu hỏi B), không phải của **quyền** (câu hỏi C).
   Với ảnh dẫn nhập thì không cần nêu ngày.
3. Kết luận về cả một kho ảnh chỉ từ **trang chủ**, chưa mở bản ghi hiện vật nào.

---

## 1. Quy tắc bắt buộc, không được nới

1. **Không dùng AI** để tạo, mô phỏng, biến dạng, phục dựng, tô màu, ghép mặt, làm chớp mắt,
   lip-sync hay làm chuyển động khuôn mặt/cơ thể của Bác Hồ hoặc bất kỳ lãnh tụ nào.
   **Không tạo giọng nói hay lời nói giả.** Cả hai văn bản quy định xếp việc này vào mức nặng
   nhất, với phạm vi khác nhau (`SG`: `chân dung Bác Hồ`; `HB`: `lãnh tụ`) — giữ cả hai phạm vi.
2. **Không đoán** ngày, địa điểm, sự kiện hay người trong ảnh. Chú thích chỉ nói đúng những gì
   nguồn nói. Nếu nguồn không nói, để trống và ghi `NEED VERIFICATION`.
3. **Không gắn ảnh vào một chặng** khi chưa xác thực rằng ảnh thực sự liên quan tới chặng đó.
4. **Không coi ảnh tìm qua công cụ tìm kiếm là đã xác thực.** Phải mở trang gốc.
5. **Không phủ hiệu ứng lên mặt nhân vật, không cắt ảnh làm sai bối cảnh.**
6. Nếu thiếu nguồn hoặc quyền sử dụng: **để vị trí đó bị chặn**, không dựng ảnh thay thế.

---

## 2. Mười một vị trí trong sản phẩm

Bảng này phải khớp `FIGURE_SLOTS` trong `web/src/data/figures.ts`. Nếu lệch, **mã là đúng**.

**Vị trí chính** mở đầu chương và nằm ở lối vào chặng.
**Vị trí bổ trợ** nằm **cạnh đúng nhịp mà nó chống đỡ** (trường `anchor` trong mã), và
**chỉ hiển thị khi đã được điền** — một vị trí bổ trợ còn trống thì nằm ở bản ghi này và ở trang
Kiểm chứng, **không** đặt một khung ảnh rỗng vào giữa phần đọc.

| Mã vị trí | Loại | Neo vào | Dùng để | Trạng thái |
|---|---|---|---|---|
| `FS-open` | chính | màn mở đầu | Đặt người học đối diện một tài liệu thật trước khi gặp câu hỏi dẫn đường | ✅ **ĐÃ ĐIỀN** — mục 4 |
| `FS-ky-1` | chính | lối vào chặng 1 | Dựng bối cảnh Việt Nam trước 5-6-1911 | `NOT YET EVIDENCED` |
| `FS-ky-1-b` | bổ trợ | bước ngoặt `TP1` (5-6-1911) | Tư liệu đương thời về môi trường học hành và phong trào mà trích đoạn nhắc | `NOT YET EVIDENCED` |
| `FS-ky-2` | chính | lối vào chặng 2 | Nối người trong ảnh với chặng hành trình qua nhiều nước | `NOT YET EVIDENCED` |
| `FS-ky-2-b` | bổ trợ | bước ngoặt `TP3` (25 đến 30-12-1920) | Cho thấy nơi diễn ra đại hội mà trích đoạn đặt làm bước ngoặt | ✅ **ĐÃ ĐIỀN** — mục 5 |
| `FS-ky-3` | chính | lối vào chặng 3 | Nối người trong ảnh với thời kỳ hình thành nội dung cơ bản | `NOT YET EVIDENCED` |
| `FS-ky-3-b` | bổ trợ | **đoạn `P3-2`** (bài báo trên L’Humanité 8-1919) | Đặt người học trước chính trang báo mà trích đoạn dẫn tên | ✅ **ĐÃ ĐIỀN** — mục 6 |
| `FS-ky-4` | chính | lối vào chặng 4 | Nối người trong ảnh với thời kỳ giữ vững quan điểm | `NOT YET EVIDENCED` |
| `FS-ky-4-b` | bổ trợ | bước ngoặt `TP6` (5-1941) | Tài liệu đương thời làm căn cứ đọc các trích dẫn nguyên văn | `NOT YET EVIDENCED` |
| `FS-ky-5` | chính | lối vào chặng 5 | Nối người trong ảnh với thời kỳ cuối cùng, kết thúc tháng 9-1969 | `NOT YET EVIDENCED` |
| `FS-ky-5-b` | bổ trợ | bước ngoặt `TP7` (2-9-1945) | Đặt người học trước chính bản in của văn kiện mà trích đoạn gọi tên | ✅ **ĐÃ ĐIỀN** — mục 7 |

---

## 3. Những nguồn đã kiểm ngày 17-9-2026, và kết quả

Ghi lại để không ai phải kiểm lại từ đầu. Cột “Trang đó ghi gì” là **nguyên văn**.

| Trang đã mở | Loại | Trang đó ghi gì | Kết quả |
|---|---|---|---|
| `https://baotanghochiminh.vn/` | Bảo tàng chính thức — **mới chỉ mở trang chủ** | “© 2017 Bảo tàng Hồ Chí Minh. All rights reserved.” | ⚠️ **CHƯA XÁC LẬP.** *Đính chính:* lần trước ghi “không dùng được”. Sai phương pháp — kết luận từ trang chủ, và coi việc không thấy điều khoản là cấm. Muốn dùng phải mở bản ghi hiện vật và **hỏi bảo tàng**. |
| `https://hochiminh.vn/` | Trang chính thức — **mới chỉ mở trang chủ** | “Bản quyền thuộc Cục Chuyển đổi số - Cơ yếu” | ⚠️ **CHƯA XÁC LẬP.** *Đính chính:* như trên. Một dòng ở chân trang không nói gì về việc có cho phép dùng cho giáo dục hay không. |
| `https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_-_1946_Portrait.jpg` | Kho cộng đồng — dùng để **tìm ứng viên**, không phải để xác thực | Nhãn “Public domain” (VN và Hoa Kỳ) + “CC Public Domain Mark 1.0”. Source: bài trên trang tạp chí phổ thông **HistoryNet**. Author: “Unknown author”. Date: “circa 1947”, tên tệp ghi 1946 | ❌ **LOẠI** — chỉ vì **câu hỏi C**: nhãn public domain dựa vào năm công bố lần đầu, mà tác giả lẫn năm công bố đều không xác định, và nguồn dẫn không phải cơ quan lưu trữ. *Đính chính:* lần trước còn gộp thêm việc ngày tháng mâu thuẫn vào lý do loại — đó là vấn đề của **câu hỏi B**, không phải C. |
| `https://gallica.bnf.fr/ark:/12148/btv1b9054078w` | **Thư viện quốc gia Pháp — bản ghi của chính hiện vật** | `dc:title` “Congrès communiste de Marseille : Nguyen Aïn Nuä'C délégué indochinois (gros plan)…”; `dc:creator` “Agence de presse Meurisse”; `dc:date` “1921”; `dc:coverage` “26 décembre 1921”; `dc:source` “…EI-13 (2702)”; `dc:identifier` “Meurisse 94447”; **`dc:rights` “domaine public”** | ✅ **ĐỦ CĂN CỨ** cho `FS-open`. Xem mục 4. |
| `https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica` | Điều kiện sử dụng do chính Gallica công bố | “La réutilisation non commerciale de ces contenus est libre et gratuite… maintien de la mention de source… « Source gallica.bnf.fr / Bibliothèque nationale de France »… La réutilisation commerciale… est payante et fait l'objet d'une licence.” | ✅ **ĐỦ CĂN CỨ** cho nhánh phi thương mại, với điều kiện giữ dòng ghi nguồn. |

### Bổ sung 17-9-2026 (phiên thứ hai) — tra cứu qua API SRU của Gallica

| Trang đã mở | Loại | Trang đó ghi gì | Kết quả |
|---|---|---|---|
| `gallica.bnf.fr/SRU?…query=(gallica all "congres de Tours 1920") and (dc.type all "image")` | BnF — tra cứu danh mục | 14 bản ghi ảnh báo chí Agence Meurisse nhan đề “Congrès de Tours”, tất cả `dc:rights` “domaine public”, cùng ký hiệu EI-13 (2660) | ✅ **ĐỦ CĂN CỨ** cho một tấm. Xem mục 5 |
| `gallica.bnf.fr/services/OAIRecord?ark=btv1b9038096h` (và 13 ark còn lại) | BnF — bản ghi hiện vật, mở **từng** bản | `dc:subject` “Parti socialiste SFIO (France). Congrès national (18 ; 1920 ; Tours)”; `dc:identifier` “Meurisse 85865”; `dc:coverage` “16 décembre 1920” | ✅ **ĐỦ CĂN CỨ** về nguồn và quyền. ⚠️ **Ngày không dùng được** — xem mục 5, dòng B′ |
| `gallica.bnf.fr/SRU?…query=(gallica all "delegue indochinois") and (dc.type all "image")` | BnF — tìm thêm ảnh có đại biểu Đông Dương | 5 bản ghi: một là tấm Marseille **đã dùng**; hai bản “Temple du Souvenir Indochinois” 1920 ghi `dc:rights` “conditions spécifiques d’utilisation (sous convention Emile Prudhomme)”; hai bản không liên quan | ❌ **KHÔNG CÓ THÊM.** Xác nhận lại kết luận của phiên trước |
| `gallica.bnf.fr/SRU?…query=(gallica all "Ho Chi Minh") and (dc.type all "image")` | BnF — tìm ảnh chân dung | 128 bản ghi, **toàn bộ** là ảnh vườn hoa **Thành phố Hồ Chí Minh** năm 1948 | ❌ **TRÙNG TÊN, KHÁC ĐỐI TƯỢNG** |
| `gallica.bnf.fr/SRU?…` cho “Fontainebleau”, “Le Paria”, “Proces de la colonisation francaise”, “Revendications du peuple annamite”, “intercoloniale”, “Phan Thiet” | BnF — tìm tài liệu mà trích đoạn gọi tên | Không truy vấn nào trả về đúng tài liệu. Bộ ảnh báo chí Meurisse/Rol trên Gallica **không phủ năm 1946** | ⚠️ **CHƯA XÁC LẬP.** Cần hỏi cơ quan lưu trữ Việt Nam |

**Kết luận của phiên này:** Gallica cho thêm **ba** hiện vật dùng được — một ảnh sự kiện và hai
tài liệu in mà chính trích đoạn gọi tên. **Bảy vị trí còn trống**, trong đó cả **năm vị trí chính**,
**không mở khoá được bằng tra cứu trực tuyến** — chúng cần người thật liên hệ cơ quan lưu trữ.

### Vì sao không có thêm ảnh chân dung — và vì sao ba trong bốn tư liệu là văn bản

Đây là kết quả, không phải lựa chọn phong cách.

Bản yêu cầu đặt mục tiêu: mỗi chặng có **một ảnh chân dung thật của Hồ Chí Minh** làm neo mở đầu.
Đã tra rất kỹ và **không đạt được**, vì những lý do ghi rõ dưới đây:

1. **Gallica chỉ có đúng một ảnh.** Truy vấn `delegue indochinois` trong ảnh trả về 5 bản ghi;
   bản duy nhất chụp đại biểu Đông Dương là tấm Marseille **đã dùng ở màn mở đầu**. Truy vấn
   `Ho Chi Minh` trong ảnh trả về 128 bản ghi và **toàn bộ** là ảnh vườn hoa **Thành phố Hồ Chí
   Minh** năm 1948 — trùng tên, khác đối tượng.
2. **Bộ ảnh báo chí Meurisse/Rol trên Gallica không phủ năm 1946**, nên hướng “ảnh chuyến đi Pháp
   năm 1946” không có gì để lấy.
3. **Các kho Việt Nam chưa xác lập điều kiện sử dụng.** `baotanghochiminh.vn` và `hochiminh.vn`
   mới chỉ mở trang chủ; muốn dùng phải **hỏi**. Thư xin phép ở mục 3b **chưa gửi cho ai**.

Theo đúng chỉ dẫn “nếu một chặng không có ảnh chân dung đủ căn cứ thì **không** thay bằng một ảnh
chân dung không liên quan”, năm vị trí chính vẫn để trống và neo thị giác của lối vào chặng vẫn là
**cột mốc thời gian in trong chặng**.

Cái *tìm được* lại là thứ khác và, với sản phẩm này, không kém giá trị: **những tài liệu mà chính
trích đoạn gọi tên**. Một trang báo mà trích đoạn dẫn tên và một bản in của văn kiện mà trích đoạn
nhắc tới chống đỡ đúng câu chữ của giáo trình, và **không phát sinh câu hỏi nhận diện người** —
không có khuôn mặt nào để nhận nhầm. Với một sản phẩm mà rủi ro lớn nhất là nói quá về một bức
ảnh, đó là một đánh đổi có lợi.

### Nguồn nên thử tiếp cho bảy ô còn trống (chưa hỏi)

Để trống cho người thật điền sau khi hỏi:

| Nơi định hỏi | Cách liên hệ | Ngày hỏi | Trả lời | Kết quả |
|---|---|---|---|---|
| Bảo tàng Hồ Chí Minh — xin phép dùng cho sản phẩm học tập phi thương mại | | | | |
| Trung tâm Lưu trữ quốc gia | | | | |
| Thư viện/ban tư liệu của trường | | | | |
| Giảng viên: trường có kho ảnh dùng được cho môn học không? | | | | |
| Gallica/BnF — còn ảnh nào khác hợp với từng chặng không | | | | |

---

## 3b. TEMPLATE - NOT EVIDENCE — bản nháp thư xin phép

> **Chưa gửi cho ai.** Không được gửi khi chưa có người trong nhóm đồng ý.
> **Không ai đã chấp thuận.** Không được ghi tên giảng viên hay cơ quan nào là đã đồng ý.
> Điền các chỗ `[…]` trước khi gửi.

**Chủ đề:** Xin phép sử dụng ảnh tư liệu cho sản phẩm học tập phi thương mại — học phần HCM202,
Trường Đại học FPT

> Kính gửi `[tên cơ quan / phòng tư liệu]`,
>
> Chúng em là nhóm sinh viên `[lớp]`, Trường Đại học FPT, đang thực hiện một sản phẩm học tập
> cho học phần HCM202 – Tư tưởng Hồ Chí Minh. Sản phẩm là một trang web trình bày quá trình hình
> thành và phát triển tư tưởng Hồ Chí Minh theo đúng nội dung giáo trình được giao.
>
> Chúng em xin phép được sử dụng ảnh tư liệu sau:
>
> - **Ảnh:** `[tên/ký hiệu ảnh]`
> - **Ký hiệu kho / số hiệu:** `[…]`
> - **Trang đã xem:** `[URL]`
>
> **Mục đích và phạm vi sử dụng dự kiến:**
>
> 1. **Mục đích:** hoàn toàn phi thương mại, phục vụ học tập trong một học phần đại học. Sản phẩm
>    không bán, không quảng cáo, không tạo doanh thu dưới bất kỳ hình thức nào.
> 2. **Nơi hiển thị:** `[một trang web nội bộ / đường dẫn ...]`, và trình chiếu tại buổi báo cáo
>    của lớp.
> 3. **Đóng gói ngoại tuyến:** sản phẩm có một bản HTML chạy không cần mạng, dùng trên một máy
>    tính tại buổi báo cáo. Ảnh sẽ được nhúng trong tệp đó. Đây là lý do chúng em cần lưu một bản
>    sao cục bộ thay vì dẫn liên kết.
> 4. **Chỉnh sửa dự kiến:** **chỉ thu nhỏ kích thước và đổi định dạng** cho phù hợp với web.
>    Chúng em **không** cắt cúp, **không** tô màu, **không** phục dựng, **không** chỉnh sửa nội
>    dung ảnh, và **không** dùng công cụ AI tác động lên ảnh dưới bất kỳ hình thức nào.
> 5. **Ghi nguồn:** chúng em sẽ hiển thị đầy đủ tên cơ quan giữ tài liệu, ký hiệu kho và dòng ghi
>    nguồn theo đúng yêu cầu của quý cơ quan, ngay bên cạnh ảnh.
>
> Nếu quý cơ quan có mẫu đơn hoặc quy trình riêng, xin hướng dẫn để chúng em thực hiện đúng.
> Nếu việc sử dụng cần phí hoặc không được phép, xin cho chúng em biết để gỡ ảnh khỏi sản phẩm.
>
> Em xin chân thành cảm ơn.
>
> `[họ tên]` — `[email]` — `[điện thoại]`
> Nhóm `[số]`, lớp `[…]`, Trường Đại học FPT

---

## 4. Bản ghi ảnh đã duyệt — `FS-open`

**Đây là bản ghi thật, không phải biểu mẫu.**

| Trường | Giá trị |
|---|---|
| Mã vị trí | `FS-open` — ảnh dẫn nhập ở màn mở đầu |
| Tệp trong sản phẩm | `web/public/tu-lieu/bnf-btv1b9054078w-900.webp` (900 × 1245, 90.080 byte) |
| Bản gốc đã lưu | `docs/anh-tu-lieu-goc/btv1b9054078w_f1_1800.jpg` (1800 × 2490, 583.346 byte)<br>SHA-256 `F15800C120DE2C8A1E4D98E39B1AB1B554AEA86969992EC23F18298860812FE6` |
| Lấy về từ | Gallica IIIF: `https://gallica.bnf.fr/iiif/ark:/12148/btv1b9054078w/f1/full/1800,/0/native.jpg` |
| **A. Nơi giữ, nguồn gốc** | Bibliothèque nationale de France, département Estampes et photographie, ký hiệu **EI-13 (2702)**. Tác giả: *Agence de presse Meurisse*. Số hiệu hãng: **Meurisse 94447**. **Số 94.447 được ghi tay ngay trên tấm kính ảnh**, trùng với bản ghi — tấm ảnh tự xác nhận nó là hiện vật được mô tả. |
| URL trang gốc | `https://gallica.bnf.fr/ark:/12148/btv1b9054078w` |
| Ngày mở trang để kiểm | 17-9-2026 |
| **B. Dữ kiện chú thích — do BnF ghi** | `dc:title` “Congrès communiste de Marseille : Nguyen Aïn Nuä'C délégué indochinois (gros plan) : [photographie de presse] / Agence Meurisse”; `dc:date` “1921”; `dc:coverage` “26 décembre 1921”. **Sản phẩm chỉ chép lại đúng những dữ kiện này, không thêm.** |
| **B′. Nhận diện người trong ảnh** | BnF ghi “Nguyen Aïn Nuä'C délégué indochinois” — phiên âm thời đó của **Nguyễn Ái Quốc**. Trang Wikimedia Commons dẫn lại tệp mô tả rõ là Hồ Chí Minh. Trích đoạn được giao cho biết Người lấy tên Nguyễn Ái Quốc khi hoạt động ở Pháp (`Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 29`). **Chuỗi này chưa được một nguồn học thuật được phê duyệt xác nhận độc lập → giữ `NEED VERIFICATION`.** |
| **C. Điều kiện sử dụng — nguyên văn** | Bản ghi BnF: `dc:rights` = “domaine public” / “public domain”.<br>Điều kiện của Gallica: *“La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France » ou « Source gallica.bnf.fr / BnF ». La réutilisation commerciale de ces contenus est payante et fait l'objet d'une licence.”* |
| Trang đã đọc điều kiện | `https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica` (đọc trực tiếp ngày 17-9-2026, không qua đoạn tóm tắt của công cụ tìm kiếm) |
| **C′. Cho phép làm gì** | Tải về ✅ · Đóng gói vào bản offline ✅ · Hiển thị công khai ✅ · Thu nhỏ / đổi định dạng ✅ (điều khoản không đặt giới hạn về kích thước hay định dạng). Điều kiện bắt buộc duy nhất: **giữ dòng ghi nguồn**. Sản phẩm không bán, không tạo doanh thu → thuộc nhánh phi thương mại. |
| Ghi nguồn hiển thị | `Source gallica.bnf.fr / Bibliothèque nationale de France` — hiện ngay dưới ảnh **và** trong ô xem lớn, không giấu sau nút |
| Đã chỉnh sửa gì | **Chỉ thu nhỏ và mã hoá lại.** Không cắt, không tô màu, không phục dựng, không làm nét. Mép tấm kính và số hiệu ghi tay được giữ nguyên vì chúng là một phần của tài liệu. |
| Gắn vào chặng nào | **Không gắn chặng nào** (`stageId: null`). Sự kiện trong bản ghi là Đại hội Marseille **tháng 12-1921**, không nằm trong trích đoạn được giao — trích đoạn nói về Đại hội **Tua tháng 12-1920**. |
| Trạng thái | `NEED VERIFICATION` — quyền sử dụng đã xác lập; phần nhận diện và dữ kiện chú thích vẫn chờ người thật đối chiếu |

---

## 5. Bản ghi ảnh đã duyệt — `FS-ky-2-b`

**Đây là bản ghi thật, không phải biểu mẫu.**

| Trường | Giá trị |
|---|---|
| Mã vị trí | `FS-ky-2-b` — vị trí **bổ trợ** của chặng 2, neo vào bước ngoặt `TP3` (mốc in: `25 đến 30-12-1920`) |
| Tệp trong sản phẩm | `web/public/tu-lieu/bnf-btv1b9038096h-1200.webp` (1200 × 875, 149.066 byte) |
| Bản gốc đã lưu | `docs/anh-tu-lieu-goc/btv1b9038096h_f1_1800.jpg` (1800 × 1313, 400.560 byte)<br>SHA-256 `87DA55E9C949DC1E115EB60689483388ECFC84928B8E24FD8630AA457D287591` |
| Lấy về từ | Gallica IIIF: `https://gallica.bnf.fr/iiif/ark:/12148/btv1b9038096h/f1/full/1800,/0/native.jpg` |
| **A. Nơi giữ, nguồn gốc** | Bibliothèque nationale de France, département Estampes et photographie, ký hiệu **EI-13 (2660)**. Tác giả: *Agence de presse Meurisse*. Số hiệu hãng: **Meurisse 85865**. **Số 85865 được ghi tay ngay trên tấm kính ảnh**, trùng với bản ghi — tấm ảnh tự xác nhận nó là hiện vật được mô tả. Thuộc recueil “Actualités 1920-09-26 — 1921-04-10”. |
| URL trang gốc | `https://gallica.bnf.fr/ark:/12148/btv1b9038096h` |
| Bản ghi Dublin Core đã đọc | `https://gallica.bnf.fr/services/OAIRecord?ark=btv1b9038096h` |
| Ngày mở trang để kiểm | 17-9-2026 |
| **B. Dữ kiện chú thích — do BnF ghi** | `dc:title` “Congrès de Tours : vue générale de la salle : [photographie de presse] / Agence Meurisse”; `dc:subject` “Parti socialiste SFIO (France). Congrès national (18 ; 1920 ; Tours)”; `dc:date` “1920”; `dc:coverage` “16 décembre 1920”; `dc:format` “1 photogr. nég. sur verre ; 13 x 18 cm (sup.) ou moins”. |
| **B′. MÂU THUẪN NGÀY — công bố, không làm phẳng** | `dc:coverage` ghi **16-12-1920**, còn trích đoạn in đại hội diễn ra **25 đến 30-12-1920**. Đã mở bản ghi OAI của **cả 14 tấm** cùng lô: 13 tấm ghi y hệt “16 décembre 1920” và một tấm ghi “27 février 1920” — một ngày không thể đúng cho một đại hội tháng 12. Kết luận: đây là **ngày gộp của cả recueil**, không phải ngày chụp. → **Trục sự kiện** dựa trên `dc:subject` của bản ghi. **Trục ngày: chưa xác lập.** Việc bản ghi và trích đoạn có nói về cùng một đại hội hay không vẫn cần một nguồn học thuật được phê duyệt xác nhận. |
| **B″. Nhận diện người trong ảnh** | **Không có.** Bản ghi của BnF **không nêu tên bất kỳ ai** trong tấm này, và sản phẩm cũng không nêu. Sản phẩm **không khẳng định** Nguyễn Ái Quốc có mặt trong khung hình. Đây là lý do chọn đúng tấm này: 13 tấm còn lại trong lô đều nêu tên người trong nhan đề (Cachin, Frossard, Rappoport, citoyenne Colliard…), và đặt một trong số đó lên chặng sẽ mời người xem đi tìm một khuôn mặt mà bản ghi không đặt ở đó. |
| **C. Điều kiện sử dụng — nguyên văn** | Bản ghi BnF: `dc:rights` = “domaine public” / “public domain”. Điều kiện của Gallica: *“La réutilisation non commerciale de ces contenus est libre et gratuite dans le respect de la législation en vigueur et notamment du maintien de la mention de source des contenus telle que précisée ci-après : « Source gallica.bnf.fr / Bibliothèque nationale de France »… La réutilisation commerciale de ces contenus est payante et fait l'objet d'une licence.”* |
| Trang đã đọc điều kiện | `https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica` |
| **C′. Cho phép làm gì** | Tải về ✅ · Đóng gói vào bản offline ✅ · Hiển thị công khai ✅ · Thu nhỏ / đổi định dạng ✅. Điều kiện bắt buộc duy nhất: **giữ dòng ghi nguồn**. Sản phẩm không bán, không tạo doanh thu → thuộc nhánh phi thương mại. |
| Ghi nguồn hiển thị | `Source gallica.bnf.fr / Bibliothèque nationale de France` — hiện ngay dưới ảnh **và** trong ô xem lớn |
| Đã chỉnh sửa gì | **Chỉ thu nhỏ 1800 → 1200 px và mã hoá lại sang WebP.** Không cắt, không tô màu, không phục dựng, không làm nét, không xoá vết. Mép tấm kính, các vệt xước và số hiệu ghi tay được giữ nguyên vì chúng là một phần của tài liệu. |
| Gắn vào chặng nào, **căn cứ nào** | Chặng 2 (`ky-2`), vị trí bổ trợ neo vào bước ngoặt `TP3`. **Căn cứ: trường `dc:subject` của chính bản ghi** nêu đích danh đại hội — không phải vì ảnh “trông đúng thời kỳ”. |
| Ai đã kiểm | Chưa có người thật kiểm. Bản ghi do AI dựng trong phiên 17-9-2026 và **cần người trong nhóm đối chiếu lại**. |
| Trạng thái | `NEED VERIFICATION` — quyền sử dụng đã xác lập; trục ngày **chưa xác lập**; việc nối bản ghi với đại hội trong trích đoạn vẫn chờ nguồn học thuật |

---

## 6. Bản ghi tư liệu đã duyệt — `FS-ky-3-b`

**Đây là bản ghi thật, không phải biểu mẫu.**

| Trường | Giá trị |
|---|---|
| Mã vị trí | `FS-ky-3-b` — vị trí **bổ trợ** của chặng 3, neo vào **đoạn `P3-2`**, tức chính câu trích đoạn dẫn tên bài báo |
| Tệp trong sản phẩm | `web/public/tu-lieu/bnf-bpt6k2993902-f3-1200.webp` (1200 × 1708, 705.074 byte) |
| Bản gốc đã lưu | `docs/anh-tu-lieu-goc/bpt6k2993902_f3_1800.jpg` (1800 × 2562, 1.838.288 byte)<br>SHA-256 `D55AEB5F3404E3C9649EED52285C3F1DC44F569969020C2F569760338C3F6060` |
| Lấy về từ | Gallica IIIF: `https://gallica.bnf.fr/iiif/ark:/12148/bpt6k2993902/f3/full/1800,/0/native.jpg` |
| **A. Nơi giữ, nguồn gốc** | Bibliothèque nationale de France. Nhật báo *L’Humanité*, số **5584**, ngày **2-8-1919**, trang 3. `dc:creator` “Parti communiste français. Auteur du texte”; `dc:publisher` “L’Humanité (Paris)”. |
| URL trang gốc | `https://gallica.bnf.fr/ark:/12148/bpt6k2993902` |
| Bản ghi Dublin Core đã đọc | `https://gallica.bnf.fr/services/OAIRecord?ark=bpt6k2993902` |
| Ngày mở trang để kiểm | 17-9-2026 |
| **B. Dữ kiện do BnF ghi** | `dc:date` “1919-08-02”; `dc:description` “02 août 1919”; `dc:description` “1919/08/02 (Numéro 5584)”. **Bản ghi mô tả cả số báo, không mô tả từng bài** — nó không nêu tên bài và không nêu tác giả bài. |
| **B′. Điều đọc được trên chính bản quét** | Cột ngoài cùng bên phải trang 3 mang đề mục in nghiêng “**En Indo-Chine**”, tít lớn “**LA QUESTION INDIGÈNE**”, và bài kết thúc bằng chữ ký in “**NGUYEN-AI-QUAC.**”. Cuối trang có dòng “FEUILLETON DU 2 AOÛT 1919”. Đã phóng to và đọc tận mắt, không dựa vào OCR. |
| **B″. Ba lớp dữ kiện, giữ tách rời** | (1) **Bản ghi** nói: đây là số báo L’Humanité ngày 2-8-1919. (2) **Trang báo** in: đề mục, tít và chữ ký nói trên. (3) **Trích đoạn** in: “Vấn đề dân bản xứ, báo L’Humanité 8-1919”. Ba lớp ấy khớp nhau về **tháng** và về **chủ đề**. Việc tên tiếng Việt “Vấn đề dân bản xứ” và tít tiếng Pháp “LA QUESTION INDIGÈNE” là cùng một bài, và việc người ký “NGUYEN-AI-QUAC” là nhân vật của trích đoạn, **đều chưa được một nguồn học thuật được phê duyệt xác nhận**. |
| **C. Điều kiện sử dụng — nguyên văn** | `dc:rights` “domaine public” / “public domain”. Điều kiện Gallica: *“La réutilisation non commerciale de ces contenus est libre et gratuite… « Source gallica.bnf.fr / Bibliothèque nationale de France »… La réutilisation commerciale… est payante et fait l’objet d’une licence.”* |
| Trang đã đọc điều kiện | `https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica` |
| **C′. Cho phép làm gì** | Tải về ✅ · Đóng gói offline ✅ · Hiển thị công khai ✅ · Thu nhỏ / đổi định dạng ✅. Điều kiện bắt buộc: **giữ dòng ghi nguồn**. |
| Ghi nguồn hiển thị | `Source gallica.bnf.fr / Bibliothèque nationale de France` — ngay dưới ảnh và trong ô xem lớn |
| Đã chỉnh sửa gì | **Chỉ thu nhỏ 1800 → 1200 px và mã hoá lại sang WebP.** **Không cắt cúp** — giữ nguyên cả trang báo, kể cả các cột không liên quan, vì cắt lấy riêng một cột sẽ làm mất bối cảnh trang và là một can thiệp vào ý nghĩa tài liệu. Ai muốn đọc kỹ thì bấm “Xem lớn”. |
| Gắn vào chặng nào, **căn cứ nào** | Chặng 3, neo vào đoạn `P3-2`. **Căn cứ: chính câu của trích đoạn** dẫn tên tờ báo và tháng, cộng với ngày trên bản ghi BnF. |
| Ai đã kiểm | Chưa có người thật kiểm. Cần người trong nhóm đối chiếu lại. |
| Trạng thái | `NEED VERIFICATION` |

---

## 7. Bản ghi tư liệu đã duyệt — `FS-ky-5-b`

**Đây là bản ghi thật, không phải biểu mẫu.**

| Trường | Giá trị |
|---|---|
| Mã vị trí | `FS-ky-5-b` — vị trí **bổ trợ** của chặng 5, neo vào bước ngoặt `TP7` (mốc in: `2-9-1945`) |
| Tệp trong sản phẩm | `web/public/tu-lieu/bnf-bpt6k42428601-f1-1100.webp` (1100 × 1484, 69.938 byte) |
| Bản gốc đã lưu | `docs/anh-tu-lieu-goc/bpt6k42428601_f1_1800.jpg` (1800 × 2428, 364.326 byte)<br>SHA-256 `F495ACDB26B0DCFAC3268D0F272BF74AC0455D43F9056FE559268E10D09E7651` |
| Lấy về từ | Gallica IIIF: `https://gallica.bnf.fr/iiif/ark:/12148/bpt6k42428601/f1/full/1800,/0/native.jpg` |
| **A. Nơi giữ, nguồn gốc** | Bibliothèque nationale de France, département Littérature et art, ký hiệu **4-INDOCH PIECE-68**. `dc:creator` “Hô ̀, Chí Minh (1890-1969). Auteur du texte”. Khổ “In 4°, 4 p.”. **Bìa tự xác nhận**: ký hiệu kho viết tay “4° Pièce Indoch 68” trùng bản ghi, kèm con dấu đỏ của cơ quan lưu chiểu Hà Nội. |
| URL trang gốc | `https://gallica.bnf.fr/ark:/12148/bpt6k42428601` |
| Bản ghi Dublin Core đã đọc | `https://gallica.bnf.fr/services/OAIRecord?ark=bpt6k42428601` |
| Ngày mở trang để kiểm | 17-9-2026 |
| **B. Dữ kiện do BnF ghi** | Nhan đề: “Việt Nam dân chủ cộng hòa...Tuyên ngôn độc lập do chủ tịch chính phủ lâm thời Việt Nam Hồ-Chí Minh đọc trong ngày độc lập 2-9-1945”; `dc:date` “**1945**”; `dc:subject` “Hô ̀, Chí Minh (1890-1969). Tuyên ngôn độc lập”. |
| **B′. Ngày in và ngày đọc là hai trục** | Bản ghi nêu niên đại **in** là “1945”, **không nêu ngày in**. Mốc “2-9-1945” là ngày **đọc** văn kiện, do chính bìa in ra. Sản phẩm không gộp hai trục ấy và không nói cuốn sách này được in ngày 2-9-1945. |
| **B″. Nhận diện** | **Không phát sinh.** Đây là tài liệu in, không phải ảnh chân dung — không có khuôn mặt nào để nhận diện. |
| **C. Điều kiện sử dụng — nguyên văn** | `dc:rights` “domaine public” / “public domain”; điều kiện Gallica như mục 6. |
| Trang đã đọc điều kiện | `https://gallica.bnf.fr/accueil/fr/html/conditions-dutilisation-de-gallica` |
| **C′. Cho phép làm gì** | Tải về ✅ · Đóng gói offline ✅ · Hiển thị công khai ✅ · Thu nhỏ / đổi định dạng ✅. Điều kiện bắt buộc: **giữ dòng ghi nguồn**. |
| Ghi nguồn hiển thị | `Source gallica.bnf.fr / Bibliothèque nationale de France` |
| Đã chỉnh sửa gì | **Chỉ thu nhỏ 1800 → 1100 px và mã hoá lại.** Không cắt, không tô màu, không phục dựng, không xoá con dấu hay ký hiệu kho viết tay — chúng là một phần của tài liệu. |
| Gắn vào chặng nào, **căn cứ nào** | Chặng 5, neo vào bước ngoặt `TP7`. **Căn cứ: trích đoạn in mốc 2-9-1945 và gọi tên “Tuyên ngôn Độc lập”**; bản ghi và bìa nêu đúng văn kiện ấy. |
| Ai đã kiểm | Chưa có người thật kiểm. |
| Trạng thái | `NEED VERIFICATION` |

---

## 8. TEMPLATE - NOT EVIDENCE — bản ghi cho ảnh tiếp theo

**Để trống.** Mỗi ảnh một bảng. **Tất cả các trường đều bắt buộc.** Thiếu một trường thì vị trí
vẫn bị chặn.

| Trường | Giá trị |
|---|---|
| Mã vị trí (`FS-…`) | |
| Tên tệp trong sản phẩm | |
| Bản gốc đã lưu + SHA-256 | |
| **A.** Nơi giữ, ký hiệu kho, tác giả, số hiệu | |
| URL trang gốc (mở được, không phải link tìm kiếm) | |
| Ngày mở trang để kiểm | |
| **B.** Dữ kiện chú thích — ai ghi, ghi gì (nguyên văn) | |
| **B′.** Nhận diện người trong ảnh — căn cứ nào | |
| **C.** Điều kiện sử dụng — **nguyên văn** từ trang gốc | |
| Trang đã đọc điều kiện | |
| **C′.** Cho phép: tải về / offline / hiển thị / đổi kích thước | |
| Ghi nguồn bắt buộc, hiển thị ở đâu | |
| Đã chỉnh sửa gì | |
| Ảnh thuộc chặng nào, và **căn cứ nào** để nói vậy | |
| Ai đã kiểm | |
| Trạng thái | `NEED VERIFICATION` cho tới khi có người thật xác nhận |

---

## 9. Cách mở khoá một vị trí trong mã nguồn

Khi một ảnh đã đủ cả sáu điều kiện ở mục 1 và bảng ở mục 4 đã đầy:

1. Đặt tệp ảnh vào `web/public/tu-lieu/`.
2. Thêm **một** bản ghi vào mảng `FIGURES` trong `web/src/data/figures.ts`, với `id` đúng bằng
   mã vị trí (`FS-open`, `FS-ky-2-b`, …), và `stageId` **trùng** với `stageId` của vị trí đó.
3. Không sửa gì khác. Vị trí chính sẽ tự hiển thị ảnh thay cho dòng “chưa có nguồn”; vị trí bổ trợ
   sẽ tự xuất hiện cạnh đúng nhịp mà trường `anchor` của nó trỏ tới.
4. Chạy `npm run test` — bộ kiểm thử sẽ bắt lỗi nếu thiếu bất kỳ trường nào, hoặc nếu `sourceUrl`
   là một link tìm kiếm.

> Kiểm thử **không** thay được việc kiểm quyền sử dụng. Nó chỉ bảo đảm bản ghi đầy đủ.
> Việc ảnh có được phép dùng hay không là **phán quyết của con người**.
