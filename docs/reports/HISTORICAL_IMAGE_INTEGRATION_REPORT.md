# Historical Image Integration — báo cáo, 18-9-2026, cập nhật 19-9-2026

> ## ĐÍNH CHÍNH 18-9-2026, 21:15 (+0700) — SỐ ĐO TRONG BÁO CÁO NÀY ĐÃ LỖI THỜI
>
> Báo cáo này **không bị sửa**. Nội dung phân tích giữ nguyên. Chỉ các **con số đo**
> là đã lỗi thời, và đây là cách đọc chúng:
>
> | Ghi trong báo cáo | Giá trị hiện hành, đo 18-9-2026 20:47-20:55 |
> |---|---|
> | kiểm thử đơn vị 113 / 115 / 116 | **136 đạt** (content 88, places 48) |
> | kiểm thử trình duyệt 183 / 213 / 228, hoặc "chưa chạy" | **255 đạt**, mã thoát 0 |
>
> Nguồn duy nhất cho số đo hiện hành: [`docs/MEASURED_STATE_2026-09-18.md`](../MEASURED_STATE_2026-09-18.md).
>
> Mọi con số cũ **đều đúng tại thời điểm chúng được ghi**. Bản ghi cũ không bị viết lại.

---

**HISTORICAL IMAGE INTEGRATION IMPLEMENTED — REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE**

> Đây là trạng thái đúng và không được nâng lên. Tám tài liệu đã lên sản phẩm, **cả tám vẫn mang
> `NEED VERIFICATION`**, và **chưa có một người thật nào kiểm lại một bản ghi nào**.
>
> **BẢN CẬP NHẬT 19-9-2026 — ba phán quyết của dự án.** Mục **5b** là phần mới và nên đọc trước:
> (1) tư liệu BnF năm 1946 **được giữ**, xếp `USE WITH CAUTION`, quyền tách thành **bốn trục**;
> (2) tấm chân dung Marseille **chuyển sang ô ảnh chính của chặng 3**, màn mở đầu trống lại;
> (3) chặng 4 **bị chặn, không bị đóng** —
> `BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`.
> Các mục cũ được **sửa tại chỗ và đánh dấu**, không viết đè.

---

## 1. Trạng thái xuất phát

Đọc từ mã (`FIGURE_SLOTS` trong `web/src/data/figures.ts`), không chép từ tài liệu — vì sổ nguồn
ảnh đã hai lần ghi sai số vị trí do chép tay.

| | Trước đợt này | Sau đợt này |
|---|---|---|
| Vị trí ảnh được khai báo | **11** | **13** |
| Vị trí đã điền | **4** | **8** |
| Vị trí còn trống | 7 | **5** |
| Vị trí **chính của một chặng** đã điền | **0 / 5** | **2 / 5** *(1 vào 18-9, +1 vào 19-9)* |
| Cơ quan giữ hiện vật | 1 (BnF) | **2** (BnF, Humazur / Université Côte d’Azur) |
| Lượt kiểm nguồn công bố trên trang Kiểm chứng | 15 | **26** *(23 vào 18-9, +3 phán quyết vào 19-9)* |
| Cột trạng thái trên bảng vị trí | 1 | **2** — chứng cứ, và quyết định dùng lại |
| Kích thước bản ngoại tuyến một tệp | 2,65 MB | **3,69 MB** *(đo lại 18-9-2026: 3.870.660 byte)* |

Bốn tài liệu có sẵn khi bắt đầu: tấm chân dung Marseille ở màn mở đầu (`FS-open`), ảnh toàn cảnh
hội trường Tours (`FS-ky-2-b`), trang L’Humanité 2-8-1919 (`FS-ky-3-b`), bìa bản in Tuyên ngôn Độc
lập 1945 (`FS-ky-5-b`). **Cả năm vị trí chính của năm chặng đều trống.**

**Trôi tài liệu đã phát hiện và đã sửa** (mục 8 của prompt yêu cầu kiểm):

- `CREATIVE_SPATIAL_JOURNEY_REPORT.md` viết *“Nine of eleven figure slots remain unfilled”* — đúng
  khi viết, sai từ 18-9. Đã đánh dấu `SUPERSEDED`, **không xoá**.
- `docs/08_Image_Source_Register_TEMPLATE.md` ghi *“Mười một vị trí”* và *“bảy ô còn trống”*. Đã
  dựng lại từ mã.
- `tools/figure-shots.mjs` dùng selector `.walk__figure` — **không phần tử nào từng mang lớp ấy**,
  nên ảnh chụp mang tên `36-stage-blocked` thực ra chụp đầu trang. Đã sửa.
- `tools/audit-density.mjs` chỉ đo `#/chang/ky-2`, tức chặng có ô ảnh **trống** — đo đúng trường
  hợp rẻ nhất. Đã thêm `#/chang/ky-5`.

---

## 2. Đối chiếu kho ảnh tham khảo

Toàn văn: [`REFERENCE_IMAGE_AUDIT.md`](REFERENCE_IMAGE_AUDIT.md) — bảng đủ 68 dòng.

Đếm bằng máy từ chính `_reference/creative_product_HCM202/src/data/hcm_data.json`:

| | |
|---|---|
| Sự kiện | 41 |
| Mục media | **68** (16 mục trỏ tới tệp trong kho, 52 mục là liên kết nóng — trong đó 2 là video) |
| Tên miền bên ngoài | 34 |
| Tệp ảnh có thật trong thư mục `public/image/` | **19** |
| Mục có **trang bản ghi hiện vật** | **0** |
| Mục có **ký hiệu kho / số hiệu** | **0** |
| Mục có **tên người chụp** | **0** |
| Mục có **điều kiện sử dụng** | **0** |

Quyết định: **52 `NEED VERIFICATION`, 16 `REJECT`, 0 `USE`, 0 `USE WITH CAUTION`.**

Một điểm được giữ đúng chữ: **“không tìm thấy điều khoản” ≠ “cấm dùng lại”.** 52 mục ở trạng thái
chưa xác lập, không phải bị từ chối. Đây chính là sai lầm mà sổ nguồn đã mắc ngày 16-9 và đã đính
chính; đợt này không lặp lại.

Một lý do **độc lập với bản quyền** để không nhập theo `phase`: kho chia giai đoạn theo **năm
tròn** (1911–1920), giáo trình 2019 chia theo **ngày liền kề chính xác** (6-6-1911 → 30-12-1920).
Một ảnh kho ghi `year: "1920"` có thể thuộc chặng 2 hoặc chặng 3 tuỳ ngày — mà kho không ghi ngày.

---

## 3. Ảnh dùng lại từ kho tham khảo

**Không có.** Zero trên 68.

Kho đóng góp ba thứ, không thứ nào là một tấm ảnh:

1. **Xác nhận hướng đi.** 34 tên miền, không một dòng điều kiện sử dụng ⇒ quay lại kho lưu trữ là
   lựa chọn được chứng minh, không phải thói quen.
2. **Chỉ ra hai bảo tàng quốc gia đáng hỏi** — `baotanglichsu.vn`, `baotanghochiminh.vn` — kèm bằng
   chứng tư liệu liên quan nằm ở đó. Nội dung cụ thể cho thư xin phép, **chưa gửi cho ai**.
3. **Một mô hình dữ liệu cần tránh:** một chuỗi `sourceMedia` duy nhất cho mọi thứ. Sản phẩm này
   giữ **sáu trục tách rời**, và nay có phép thử cấm hai trục mang cùng nội dung.

Không sao chép: bố cục, thư viện ảnh, chú thích, mã, CSS, chuyển cảnh, cấu trúc dữ liệu, cách trình
bày ảnh. Ghi chi tiết ở [`docs/REFERENCE_USE_RECORD_2026-09-17.md`](../REFERENCE_USE_RECORD_2026-09-17.md) mục 7.

---

## 4. Nguồn gốc của từng tài liệu được nhận

| Vị trí | Tài liệu | Cơ quan giữ, ký hiệu | Trang hiện vật | Quyền, **nguyên văn** |
|---|---|---|---|---|
| `FS-ky-1-b` | Bản đồ “Province de Nghe-An”, 1909, tấm XXXII của *Atlas général de l’Indo-Chine française* | **Humazur**, Université Côte d’Azur, BU Lettres Arts Sciences Humaines, Fonds ASEMI — **ASE 2296-65**, **ark:/17103/d610** | `humazur.univ-cotedazur.fr/s/Humazur/item/23566` | `dcterms:rights` “**Domaine public**”; trang điều kiện: “La réutilisation non commerciale des contenus est libre et gratuite… la mention de source « Humazur… » doit être maintenue **notamment celle figurant dans le filigrane des documents numérisés**.” |
| `FS-ky-3-c` | `le Paria`, số 2, **1-5-1922**, trang nhất | BnF, département Droit, économie, politique — **JO-35859** | `gallica.bnf.fr/ark:/12148/bpt6k7009345t` | `dc:rights` “domaine public”; điều kiện Gallica, nhánh phi thương mại, bắt buộc giữ dòng ghi nguồn |
| `FS-ky-5` | `France-Illustration` số 41, **13-7-1946**, bìa màu | BnF, département Philosophie, histoire, sciences de l’homme — **FOL-LC2-6766** | `gallica.bnf.fr/ark:/12148/bd6t5144731t/f82.item` | như trên |
| `FS-ky-5-c` | `France-Illustration` số 52, **28-9-1946**, **tr. 295** | BnF — **FOL-LC2-6766** | `gallica.bnf.fr/ark:/12148/bd6t5144731t/f3.item` | như trên |

**Không tài liệu nào dẫn nguồn về GitHub, Wikipedia hay Commons.** Một phép thử chặn điều đó bằng
máy (`never names a code host or a reference repository as a source`).

### Một định vị lạ, ghi đúng chứ không dọn cho gọn

Bìa màu của số 41 (13-7-1946) nằm ở **vue f82 của đối tượng số hoá mang nhãn 28-9-1946** (số 52,
129 vue). Lý do: **bìa màu và trang quảng cáo của tuần báo được đóng ở CUỐI tập giấy**. Đã kiểm
bằng cách mở f80, f81, f83 — cả ba là trang quảng cáo cùng tay sách. Locator công bố đúng như vậy.

### Ba sai sót của các đợt trước, sửa và giữ bản cũ

1. `SC-9` (17-9) kết luận Gallica **không có** `Le Paria`. **Sai vì cách đặt truy vấn.** `SC-19`
   ghi phần sửa; dòng cũ giữ nguyên.
2. Sổ nguồn (17-9) suy từ “bộ ảnh Meurisse/Rol không phủ 1946” ra “không có gì cho 1946”. Vế đầu
   đúng, **vế suy ra sai** — Gallica có *France-Illustration* 1945-1948, `domaine public`.
3. `SC-13` (17-9) treo `FS-ky-1-b` vì **người viết chưa tự mở lại trang điều kiện Humazur**. Lần
   này đã mở và đọc (`SC-18`).

---

## 5. Ma trận theo chặng

> **Bảng này là bản 19-9-2026**, sau ba phán quyết. Hai dòng đổi so với bản 18-9:
> màn mở đầu trống lại, và chặng 3 có ảnh chính. Cột cuối là **quyết định dùng lại**, mới.

| Chặng | Ảnh chính | Ảnh bổ trợ | Vai trò tự sự | Nguồn | Trạng thái chứng cứ | Đặt ở đâu | Dùng lại |
|---|---|---|---|---|---|---|---|
| **Mở đầu** | **TRỐNG từ 19-9** | — | Một tư liệu mở ra **CẢ** hành trình, không phải của riêng một chặng | — | `NOT YET EVIDENCED` | Màn mở đầu · tài liệu cũ đã chuyển sang chặng 3 (`SC-24`) | — |
| **1** — đến 5-6-1911 | **TRỐNG** | Bản đồ tỉnh Nghệ An, 1909 | Cho thấy vùng đất mà **câu mở đầu của chặng** gọi tên, có Vinh và Nam Đàn trên đó | Humazur ASE 2296-65 | `NEED VERIFICATION` | Đoạn **`P1-1`** — *chuyển từ `TP1`* | `USE` |
| **2** — 6-6-1911 → 30-12-1920 | **TRỐNG** | Toàn cảnh hội trường Đại hội Tours | Cho mốc “25 đến 30-12-1920” một không gian thật | BnF EI-13 (2660) | `NEED VERIFICATION` | Bước ngoặt `TP3` | `USE WITH CAUTION` |
| **3** — 31-12-1920 → 3-2-1930 | **Chân dung Agence Meurisse, BnF ghi 26-12-1921** — *mới 19-9* | (a) Trang 3 L’Humanité 2-8-1919 · (b) Trang nhất `le Paria` 1-5-1922 | **Chân dung của thời kỳ** — niên đại của bản ghi nằm trong khoảng của chặng. **KHÔNG** minh hoạ sự kiện: Đại hội Marseille nằm ngoài trích đoạn · (a) tờ báo mà trích đoạn dẫn tên bài · (b) **tờ báo mà trích đoạn nói Người sáng lập** | BnF EI-13 (2702) · (a) L’Humanité 5584 · (b) JO-35859 | `NEED VERIFICATION` | **Lối vào chặng** · (a) `P3-2` · (b) `P3-4` | `USE WITH CAUTION` · (a)(b) `USE` |
| **4** — 4-2-1930 → 28-1-1941 | **TRỐNG** | **TRỐNG** | — | — | **`BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`** (`SC-25`) | — | — |
| **5** — 29-1-1941 → 2-9-1969 | **Bìa `France-Illustration` số 41, 13-7-1946** | (a) Bìa bản in Tuyên ngôn Độc lập 1945 · (b) tr. 295 số 28-9-1946 | Chân dung của thời kỳ, tên do ấn phẩm in dưới ảnh · (a) văn kiện ở mốc 2-9-1945 · (b) tài liệu đương thời của giai đoạn “tạm hoà hoãn với Pháp” | BnF FOL-LC2-6766 · 4-INDOCH PIECE-68 | `NEED VERIFICATION` | **Lối vào chặng** · (a) `TP7` · (b) `P5-5` | `USE WITH CAUTION` · (a) `USE` · (b) `USE WITH CAUTION` |

### Vì sao hai ô ảnh chính được phép điền — và ba ô kia thì không

> **Sửa 19-9-2026.** Mục này viết ngày 18-9, khi mới có `FS-ky-5`. Nay có **hai** ô ảnh chính
> được điền, và chúng được phép vì **hai loại căn cứ khác nhau** — không nên gộp.

**`FS-ky-5` (chặng 5) — căn cứ: tên in dưới ảnh + ngày in.**

1. **Tên nhân vật do chính ấn phẩm in, ngay dưới bức ảnh, năm 1946** —
   “M. HO CHI MINH A VERSAILLES”. Đây là mức chứng cứ khác hẳn một ảnh được người dùng lại gán tên
   về sau (so `SC-3`, `SC-17`).
2. **Ngày in 13-7-1946 nằm trong thời kỳ của chặng 5** (29-1-1941 → 2-9-1969).

**`FS-ky-3` (chặng 3) — căn cứ: niên đại của bản ghi, và chỉ niên đại.**
Bản ghi của BnF ghi mốc **26-12-1921**, nằm trong khoảng **31-12-1920 → 3-2-1930**. Người trong ảnh
do BnF nêu tên trong nhan đề bản ghi (“Nguyen Aïn Nuä’C délégué indochinois”). **Sự kiện** trong
bản ghi — Đại hội Marseille — **nằm ngoài trích đoạn**, và ảnh **không bao giờ** được dùng để minh
hoạ nó; câu ấy hiển thị trong sản phẩm. Xem mục 5b, phán quyết 2.

Điều sản phẩm **không** nói, và ghi rõ trên màn hình: **trích đoạn được giao không kể chuyến đi
Pháp năm 1946.** Ảnh là **chân dung của thời kỳ**, không phải bằng chứng cho một sự kiện trích đoạn
nêu. Ngoài chi tiết “M. Danis… (à droite)” mà bìa in, sản phẩm **không chỉ mặt ai** trong hàng
người và không mô tả người đi giữa là ai.

**Ba ô chính còn lại** (`FS-ky-1`, `FS-ky-2`, `FS-ky-4`) và **ô màn mở đầu** (`FS-open`) không có
tấm nào đạt căn cứ nào trong hai loại trên, và §10 của đề bài nói rõ: thà để trống còn hơn mượn một
chân dung không liên quan. Chúng để trống, và trang Kiểm chứng nói vì sao.

---

## 5b. Ba phán quyết của dự án, 19-9-2026

Cả ba do **người** quyết định, sau khi đợt 18-9 nêu chúng ra và cố ý không tự trả lời.
Chúng được ghi **cạnh** những câu hỏi gốc, không thay thế: `SC-20`, `SC-22`, `SC-23` giữ nguyên
lời cũ trên trang Kiểm chứng.

### Phán quyết 1 — tư liệu BnF 1946: giữ, xếp `USE WITH CAUTION`, tách quyền thành bốn trục

Hai tờ *France-Illustration* 1946 **được giữ**. Điều thay đổi là **cách ghi quyền**.

Trước 19-9, mỗi ảnh có **một** trường `rights` gộp ba thứ: nơi giữ tuyên bố gì, điều kiện dùng lại
ra sao, và một câu kết luận của sản phẩm. Ba loại chứng cứ hàn vào một chuỗi — **đúng lỗi** mà các
trục nhận diện / niên đại / địa điểm đã được tách ra để tránh, với đúng kiểu hỏng ấy: nhãn
`domaine public` của nơi giữ **có thể bị đọc thành** đã giải quyết cả vị trí của người chụp.
Nó không giải quyết. Một bức ảnh mang **hai** câu hỏi quyền — của **bản số hoá**, mà nơi giữ nói
thay được, và của **người chụp**, mà nơi giữ không nói thay được.

Nay là bốn trường, cộng một quyết định:

| Trục | Trả lời câu gì | Bìa số 41 (13-7-1946) |
|---|---|---|
| `holderRightsStatus` | Nơi giữ tuyên bố gì về **bản số hoá họ giữ** | `dc:rights` “domaine public” / “public domain” |
| `reuseCondition` | **Điều kiện dùng lại**, nguyên văn | Điều khoản Gallica, nhánh phi thương mại, bắt buộc giữ dòng ghi nguồn |
| `printedCreatorCredit` | **Ghi người tạo lập in trên hiện vật**, hoặc `null` | “Phot. France-Illustration (Parnotte).” |
| `creatorRightsCheck` | **Quyền của người tạo lập** đã xác lập chưa | **CHƯA XÁC LẬP** |
| `reuse` | Quyết định rút ra **từ bốn trục trên, và chỉ từ chúng** | **`USE WITH CAUTION`** |

**Điều tuyệt đối không làm, và không làm:** biến trục 1 thành *“đã kiểm chứng độc lập quyền của
người chụp”*. Một phép thử chặn cả chuỗi tiếng Việt lẫn chuỗi tiếng Anh tương đương xuất hiện
trong dữ liệu.

**Quy tắc áp dụng nhất quán:** hiện vật **là ảnh chụp và có người tạo lập được nêu tên** (in trên
hiện vật hoặc trong bản ghi của nơi giữ) → `USE WITH CAUTION`. Hiện vật **in** (bản đồ, trang báo,
bìa sách) → `USE`, vì ở đó không phát sinh tác quyền nhiếp ảnh chồng lên tuyên bố của nơi giữ.

| `USE WITH CAUTION` — 4 | `USE` — 4 |
|---|---|
| `FS-ky-3` · ảnh báo chí Agence Meurisse 1921 | `FS-ky-1-b` · bản đồ 1909 |
| `FS-ky-2-b` · ảnh báo chí Agence Meurisse 1920 | `FS-ky-3-b` · trang L’Humanité 1919 |
| `FS-ky-5` · bìa France-Illustration 1946, **có in tên người chụp** | `FS-ky-3-c` · trang nhất Le Paria 1922 |
| `FS-ky-5-c` · trang 295 cùng ấn phẩm 1946, **không** in tên người chụp | `FS-ky-5-b` · bìa Tuyên ngôn Độc lập 1945 |

> **Một điểm người duyệt có thể muốn thu hẹp.** Đề bài chỉ nói về tư liệu **1946**. Báo cáo này
> áp cùng quy tắc cho **hai tấm Meurisse 1920/1921**, vì lỗ hổng lôgic là **như nhau**, chỉ khác
> niên đại — và xếp loại theo tuổi tài liệu sẽ là **suy đoán về thời hạn quyền**, việc mà sản phẩm
> không làm. Đây là lựa chọn **nhất quán**, không phải lựa chọn duy nhất; thu hẹp lại chỉ còn 1946
> là một quyết định hợp lệ nếu người duyệt muốn.

`USE WITH CAUTION` **không** nằm trong bộ từ vựng `Provenance` mà `AGENTS.md` mục 3 ấn định,
và **không được** nhét vào đó — làm vậy là âm thầm nới một danh sách mà văn bản quản trị bảo dùng
**đúng**. Nó là một **trục khác**, nên có kiểu riêng (`ReuseDecision`). Mỗi ảnh mang **cả hai**.
Trang Kiểm chứng nay có hai cột đúng vì lý do ấy.

### Phán quyết 2 — tấm chân dung Marseille chuyển sang chặng 3

**Đã chuyển.** `FS-open` → `FS-ky-3`; `stageId: null` → `'ky-3'`. (`SC-24`)

**Điều lập luận cũ nói đúng, và vẫn đúng:** Đại hội Marseille **không** nằm trong trích đoạn, và
ảnh này **không bao giờ** được dùng để minh hoạ đại hội ấy.

**Điều lập luận cũ làm sai:** nó để một dữ kiện về **SỰ KIỆN** quyết định một câu hỏi về
**THỜI KỲ**. Bản ghi BnF ghi mốc **26-12-1921**, nằm trong khoảng **31-12-1920 → 3-2-1930** của
chặng 3. Một chân dung đặt đúng tư cách chân dung nói về diện mạo trong một khoảng thời gian.

**Giới hạn đi theo tấm ảnh, không ở lại trong tài liệu.** Trường `eventCheck` nói nguyên văn rằng
sự kiện trong bản ghi nằm **NGOÀI** trích đoạn, và nó **hiển thị trong sản phẩm**. Một phép thử
đơn vị và một phép thử trình duyệt đều kiểm câu ấy còn trên màn hình sau khi chuyển.

**Vai trò tự sự được viết lại.** Câu cũ — *“nối người trong ảnh với thời kỳ hình thành những nội
dung cơ bản”* — mô tả một vị trí không ai điền nổi: nó đòi một tấm ảnh đứng thay cho **nội dung**
của cả chặng. Câu mới nêu đúng việc tấm ảnh làm **và nêu giới hạn trong cùng một câu**.

**Màn mở đầu.** Ô `FS-open` nay **trống và vẫn được khai báo**, hiện rõ là bị chặn. Hai phương án
bị loại, và lý do ghi rõ:

- **giữ cùng một tấm ở cả hai chỗ** — đề bài cấm “thẻ chân dung lặp lại”. Đề bài cho phép nhân đôi
  **nếu giải thích được vì sao nhân đôi làm trải nghiệm tốt hơn**. Không giải thích được: cùng một
  khuôn mặt, cùng một chú thích, cùng một dòng ghi nguồn, xuất hiện hai lần cách nhau một cú nhấp.
  Nó không thêm thông tin, không thêm ngữ cảnh, chỉ thêm một màn hình đầy hơn;
- **xoá hẳn ô** — làm một khoảng trống **biến mất** thay vì báo cáo nó. `AGENTS.md` mục 4 buộc ô
  chứng cứ rỗng phải hiện rõ là bị chặn.

Màn mở đầu nay do những thứ nó **vốn đã có** gánh, đúng như đề bài gợi ý: tên sản phẩm, hai dòng
dẫn nhập, **một** hành động chính, và **sợi chỉ hành trình** tự vẽ ra bên dưới. Không tài liệu nào
khác được đưa vào thế chỗ, vì cả tám tài liệu đều đã gắn với một chặng cụ thể và không tài liệu nào
có việc mở ra **cả** hành trình. Khi nào tìm được một tài liệu như thế, nó vào đây.

**Một quyết định đã ghi lý do vẫn có thể bị lật khi có căn cứ tốt hơn. Điều không được phép là lật
nó trong im lặng** — nên bản ghi cũ, lý do cũ, và chỗ sai của nó đều còn nguyên trong mã, trong sổ
nguồn ảnh, và trên trang Kiểm chứng.

### Phán quyết 3 — chặng 4 bị chặn, không bị đóng

**Cách nói cũ bị sửa.** `SC-23` ngày 18-9 viết chặng 4 *“trống vì trích đoạn ở chặng này không gọi
tên một hiện vật nào để lần”*; mục 12 của chính báo cáo này viết *“không có gì để lần ở kho châu
Âu”*. Cả hai **suy từ “các truy vấn đã làm không trả về gì” thành “không có gì tồn tại”**.

**Cách nói đúng, và là cách nói được dùng từ nay:**

> Chặng 4 **hiện chưa có tài liệu nào đạt yêu cầu chứng cứ và điều kiện dùng lại của dự án.**
> Trạng thái: **`BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`**.

Việc kho tham khảo không cung cấp được tư liệu truy nguyên được **không chứng minh** rằng không
tồn tại tư liệu phù hợp ở nơi khác.

**Các hướng còn để ngỏ, chưa thử:** Trung tâm Lưu trữ quốc gia I và III; Bảo tàng Hồ Chí Minh;
Bảo tàng Lịch sử Quốc gia; Thư viện Quốc gia Việt Nam; các kho lưu trữ ở Liên bang Nga và Trung
Quốc cho giai đoạn 1934-1940; ANOM cho hồ sơ hành chính thuộc địa.

**Không được đưa bất cứ thứ gì vào** cho tới khi nguồn gốc, liên quan tới chặng và điều kiện dùng
lại **cùng** vượt qua quy trình của dự án. Thư xin phép vẫn **chưa gửi cho ai** — **một con đường
còn để ngỏ, không phải bằng chứng rằng chặng 4 là bất khả**. (`SC-25`)

---

## 6. Ứng viên bị loại, và lý do

| Ứng viên | Vì sao loại |
|---|---|
| **Toàn bộ 68 mục của kho tham khảo** | 0 trang bản ghi hiện vật, 0 điều kiện sử dụng. 52 `NEED VERIFICATION`, 16 `REJECT`. Không phải “bị cấm” |
| Thẻ căn cước Nguyễn Ái Quấc 4-9-1919 (Commons) | 283×415 px; trường Credit dẫn **một blog** |
| Báo cáo mật thám 15-9-1919 và 1920 (Commons) | Credit **nhắc** “Trung tâm Lưu trữ quốc gia I” và “ANOM” nhưng **không kèm số hồ sơ nào**. Manh mối thật, chưa lần được |
| “Lời kêu gọi toàn quốc kháng chiến” 19-12-1946 (Commons) | Credit kèm ba liên kết **“Ecosia search”** — trang kết quả tìm kiếm, quy tắc dự án loại thẳng |
| *Le Procès de la Colonisation Française* (Commons) | Artist là **người tải lên Wikipedia**; 450×679; không cơ quan lưu trữ |
| *Thanh Niên* 1926 (Commons) | Credit ghi **“Own work”** cho một tờ báo năm 1926 |
| L’Humanité **4-11-1920** (bài thứ hai `P3-2` dẫn tên) | Số báo **có** trên Gallica nhưng **không có lớp văn bản** — không định vị được bài bằng máy. Và đặt thêm một trang L’Humanité cạnh `FS-ky-3-b` sẽ thành **hai tấm gần trùng nhau**, đúng thứ §9 gọi là “thẻ ảnh lặp lại” |
| 38 tấm còn lại cùng lô “Congrès communiste de Marseille” | Mọi tấm khác **nêu đích danh một người khác** trong nhan đề (Cachin, Frossard, Rappoport, Lucie Colliard…). Đặt một tấm như vậy vào chặng sẽ mời người xem đi tìm một khuôn mặt mà bản ghi không đặt ở đó |
| Ảnh du lịch đương đại (`Traveloka`, `LalaGo`, `Mia.vn`…) | Ảnh chụp địa điểm **ngày nay** minh hoạ sự kiện đầu thế kỷ XX — đúng loại sai lệch quy tắc dự án cấm |
| `history101.nyc` | **Dấu chìm thương mại ngay trong tên tệp** (`watermark_1024`) |

---

## 7. Tệp được thêm

Bản gốc lưu ở `docs/anh-tu-lieu-goc/`, bản web ở `web/public/tu-lieu/`.
**Cả bốn chỉ được thu nhỏ và mã hoá lại. Không cắt cúp một tệp nào.**

| Bản gốc | Kích thước | SHA-256 |
|---|---|---|
| `humazur_d610_ASE2296-65_1800.jpg` | 1800 × 1344 · 1.241.871 B | `8FB2AF399BB5EA6960095AA93A53B182C0F37739AE1C9C4D28F7EF401B696413` |
| `bpt6k7009345t_f1_1800.jpg` | 1800 × 2605 · 823.626 B | `DB11D78640469AB30BD290B55E294B20030D1BFD4AB6DECFF44E1BDC22F5F8C0` |
| `bd6t5144731t_f82_1800.jpg` | 1800 × 2484 · 817.349 B | `81B2D9CFA8100A23FBD0C582A7E987654A45F4B44D9D8150ACBDD9E12DA649BE` |
| `bd6t5144731t_f3_1800.jpg` | 1800 × 2511 · 695.822 B | `F37CAF15584649D78041E85D7E748636A07FD1FC61EA43F28658211C353686ED` |

| Bản giao ra | Kích thước | SHA-256 |
|---|---|---|
| `humazur-d610-1400.webp` | 1400 × 1045 · 332.400 B | `11111C264F86A87E4C86452AE282085FD738DD1F5136C872E3A096D59E1EAE5B` |
| `bnf-bpt6k7009345t-f1-1200.webp` | 1200 × 1737 · 226.968 B | `22F1FCF9B6B162EE3D4BBEC3106E99772264D5EB647D13769CEC41B8ABC18468` |
| `bnf-bd6t5144731t-f82-1000.webp` | 1000 × 1380 · 171.600 B | `D8CD60353FCE4995515FA2D05A440A2523E37BD1D7558404A53BAA89DBEC172C` |
| `bnf-bd6t5144731t-f3-1100.webp` | 1100 × 1534 · 144.260 B | `7B30EA139FE6BA2BBF9BCA309ADD58979A381F78B1CDA372B6A45A149CF26DC2` |

**Xử lý ảnh:** giảm kích thước bằng Lanczos và mã hoá WebP (Pillow 12.3.0). **Không** cắt, **không**
tô màu, **không** phục dựng, **không** xoá con dấu thư viện, dấu lưu chiểu hay ký hiệu kho viết tay
— chúng là một phần của tài liệu. Với Humazur, việc giữ phần ghi nguồn in chìm là **điều kiện sử
dụng bắt buộc**, nên việc không cắt không chỉ là nguyên tắc mà là nghĩa vụ.

**Không dùng AI ở bất kỳ khâu nào của ảnh.** Không tạo sinh, không mô phỏng, không ghép mặt, không
làm chuyển động, không lồng tiếng.

---

## 8. Thay đổi kiến trúc

**Giữ nguyên, không đụng tới:** bản khắc SVG và `atlas.ts`, `places.ts`, `land.ts`, sổ địa điểm,
điều hướng, cấu trúc chặng, hệ nguồn/bằng chứng, hỗ trợ ngoại tuyến, chế độ trình bày, giảm chuyển
động, và **toàn bộ dữ liệu học thuật** (`stages.ts`, `locators.ts`, `source.ts`, `types.ts`,
`project.ts` — **không tệp nào bị sửa**).

Thay đổi tối thiểu, chỉ những gì cần để đặt được ảnh:

| Tệp | Thay đổi |
|---|---|
| `web/src/data/figures.ts` | **18-9:** +4 bản ghi tài liệu; +2 vị trí bổ trợ (`FS-ky-3-c`, `FS-ky-5-c`); neo `FS-ky-1-b` chuyển `TP1` → `P1-1`; +8 lượt kiểm nguồn (`SC-16`…`SC-23`). **19-9:** kiểu mới `ReuseDecision`; trường `rights` tách thành **bốn trường** (`holderRightsStatus`, `reuseCondition`, `printedCreatorCredit`, `creatorRightsCheck`) + `reuse`; `FS-open` → `FS-ky-3` với `stageId: 'ky-3'`; hai vai trò viết lại; +3 phán quyết (`SC-24`…`SC-26`) |
| `web/src/components/verifyPage.ts` | **19-9:** thêm cột `Quyết định dùng lại` vào bảng vị trí. Ô trống hiện `—`, không mượn một quyết định nó chưa có |
| `web/src/lib/dom.ts` | **19-9:** `chipForStatus` nhận `CAUTION` (màu hổ phách, như mọi thứ còn để ngỏ) và `REJECT`. Trước đó `USE WITH CAUTION` sẽ rơi vào nhánh trung tính “đã quyết xong” — ngược hẳn nghĩa |
| `web/src/styles/components.css` | **19-9:** `.chip` đổi `overflow-wrap: anywhere` → `break-word` + `text-wrap: balance`. Khi bảng có thêm cột, ô hẹp lại và `NEED VERIFICATION` bị cắt thành `VERIFICATIO / N`. Nhãn thuộc bộ từ vựng kiểm soát nên phải đọc được nguyên từ |
| `web/src/styles/experience.css` | +1 quy tắc: giới hạn **chiều ngang** khung ảnh ở lối vào chặng (19rem / 15.5rem) |
| `web/src/components/figure.ts` | Sửa lời giải thích ô trống — câu cũ nói “chưa có ảnh nào”, không còn đúng |
| `web/src/components/stagePage.ts` | Sửa chú thích mã cho khớp trạng thái mới. **Không đổi logic.** |
| `web/src/test/content.test.ts` | **18-9:** +5 phép thử. **19-9:** +2 phép thử; phép thử `FS-open` viết lại thành phép thử `FS-ky-3` giữ nguyên ràng buộc về **sự kiện** |
| `web/e2e/figures.spec.ts` | **18-9:** cập nhật 3 phép thử đếm cứng, +4 phép thử. **19-9:** ba phép thử của màn mở đầu **đi theo tấm ảnh** sang chặng 3; +1 phép thử cho màn mở đầu ở trạng thái trống; đếm cứng cập nhật 23 → 26 lượt kiểm; +2 phép thử đếm quyết định dùng lại |
| `web/tools/figure-shots.mjs` | Sửa selector hỏng; +12 ảnh chụp trạng thái mới |
| `web/tools/audit-density.mjs` | +`#/chang/ky-5` vào tuyến đo |
| `web/tools/word-budget.mjs` | Phân loại lại bộ máy nguồn của figure sang cột signage |

**Không thành phần mới. Không phụ thuộc mới. Không rời khỏi mô hình `FigureSlot` đã có** — mô hình
vốn đã cho phép 1–3 vị trí bổ trợ mỗi chặng; đợt này là lần đầu dùng đến quyền ấy.

**Bản khắc SVG, sổ địa điểm và toàn bộ UX không liên quan: không đụng tới, cả ngày 18-9 lẫn 19-9.**
Thay đổi ngày 19-9 chạm vào bốn tệp giao diện, và cả bốn đều là **hệ quả trực tiếp** của việc tách
trục quyền: một cột mới trên bảng vị trí, một nhánh màu cho nhãn mới, và một quy tắc xuống dòng cho
nhãn bị ô hẹp làm vỡ. Không bố cục nào khác được mở lại.

`supportFor()` dùng `.find()` nên trả về đúng một vị trí cho mỗi nhịp. Hai vị trí mới neo vào hai
nhịp khác nhau (`P3-4`, `P5-5`), không đụng nhịp nào đang có, nên **không cần sửa hàm**.

---

## 9. Ảnh hưởng tới giao diện — quan sát kỹ thuật, đo được

**Không có tuyên bố nào về việc người học thích hơn hay hiểu hơn. Chưa có một người thật nào dùng
sản phẩm này.** Dưới đây chỉ là số đo và quan sát thiết kế.

**Mật độ ở lối vào chặng, đo bằng `tools/audit-density.mjs` (1440 px):**

| | `ky-2` (ô ảnh **trống**) | `ky-5` (ô ảnh **đã điền**) |
|---|---|---|
| Điều khiển trong màn đầu | 10 | **8** |
| Nhãn trạng thái | 4 | **3** |
| Số chữ | 190 | **171** |

Trái với dự đoán, **trạng thái đã điền nhẹ hơn trạng thái trống** ở màn đầu: ô trống phát sinh một
nhãn `CHƯA CÓ NGUỒN` và một nút “Vì sao chưa có ảnh?” ngay trong tầm nhìn, còn tài liệu và hai nút
của nó nằm dưới nếp gấp.

**Cân bằng bản khắc / ảnh, đo bằng vị trí thật:**

| | Desktop 1440 | Tablet 768 | Mobile 390 |
|---|---|---|---|
| Bản khắc kết thúc ở | 1032 px | 1214 px | 952 px |
| Khung ảnh | 304 × 413 | 248 × 335 | 248 × 335 |
| Tiêu đề chặng bắt đầu ở | 215 px | 1751 px | 1541 px |

Bản khắc vẫn là thứ chiếm màn hình đầu tiên; ảnh nằm ngay dưới nó. Trên máy tính để bàn tiêu đề ở
cột trái nên không bị đẩy. Trên tablet và điện thoại thứ tự là **bản khắc → ảnh → tiêu đề → chuyện**,
đúng thứ tự §25 của đề bài đặt ra; cái giá là tiêu đề lùi thêm khoảng 230 px so với trước.

**Một lần cân lại, có đo:** bản đầu đặt toàn văn phụ chú của bìa vào chú thích hiển thị. Trên điện
thoại **chữ chiếm nhiều chiều cao hơn chính tài liệu** — đảo ngược vai trò của một figure. Chú thích
được rút còn phần tít in trên bìa, **toàn bộ phụ chú chuyển nguyên văn sang trường `identification`**
(hiện trong ngăn “Nguồn và điều kiện”) và vẫn nằm trong `alt`; `locationCheck` giữ **hai cụm địa
danh** lấy ra từ phụ chú ấy, không phải toàn bộ phụ chú *(đính chính 18-9-2026: câu này trước ghi
“sang `identification` **và** `locationCheck`”, nói quá phần mà `locationCheck` thật sự mang)*. **Không mất một
chữ nào của ấn phẩm.** Khung ảnh nhờ đó tăng từ 216 px lên 248 px, và tiêu đề chặng nhích **lên**
14 px thay vì xuống.

**Một chỗ suýt tự lừa mình.** Khi thêm `.figure__cap` vào danh sách “signage” của `word-budget.mjs`,
màn mở đầu tụt từ `prose 98` xuống `prose 61` và **kết luận đổi từ `over, close` thành `OK`** *(đính
chính 18-9-2026: chiều của thay đổi được chú thích trong `word-budget.mjs` xác nhận, nhưng **hai con
số 98 và 61 không tái lập được** từ bất kỳ vật chứng nào còn lại — chúng thuộc một bản nháp đã bị
hoàn tác, và bản dựng hiện tại đo màn mở đầu ở `prose 104`)* — phép
đo đang nịnh sản phẩm. Danh sách đã được thu hẹp: chỉ dòng ghi nguồn, nhãn trạng thái và hai nút
chuyển sang signage; **chữ trong chú thích vẫn tính là prose**. Màn mở đầu trở lại `over, close`.
Chênh lệch thật còn lại: đúng **một dòng** (`stage 2 - passage stop`, prose 141 → 121), kết luận
`OVER` trước và sau như nhau.

> ⚠️ **ĐÍNH CHÍNH 18-9-2026 (rà soát nhất quán trước khi nộp).** Câu trên quy sai nguyên nhân.
> Chú thích trong chính `tools/word-budget.mjs` (dòng 68-74) ghi rằng phần dịch 141 → 121 ấy do mục
> `.figure__blocked-line` trong cùng bản nháp 18-9 gây ra, **không phải** do ba mục ghi nguồn / nhãn
> trạng thái / nút. Mục `.figure__blocked-line` sau đó đã bị gỡ khỏi danh sách signage. Đo lại ngày
> 18-9-2026: `stage 2 - passage stop` là `prose 141 + signage 26`, kết luận `OVER`.

**Không biến thành thư viện ảnh.** Không lưới ảnh, không carousel, không thẻ chân dung lặp lại,
không ảnh tràn màn hình cạnh tranh nhau. Mỗi chặng nhiều nhất **một ảnh ở lối vào và hai tài liệu
nằm rải trong phần đọc**, mỗi tài liệu cạnh đúng câu nó chống đỡ. Một phép thử cấm hai vị trí dùng
chung một tệp.

---

## 10. Ngoại tuyến và tiếp cận

**Ngoại tuyến** — `npm run build:offline` rồi `npm run check:offline`:

```
images inlined: 8
wrote         : dist\HCM202_HanhTrinhTuTuong_offline.html (3.68 MB)
…
--   no documentary image on opening
ok   documentary image inlined and decoded (chặng ky-1)   ×2
ok   documentary image inlined and decoded (chặng ky-2)
ok   documentary image inlined and decoded (chặng ky-3)   ×3
--   no documentary image on chặng ky-4
ok   documentary image inlined and decoded (chặng ky-5)   ×3
images checked: 9    fonts loaded from the bundle: 27
no network requests, no errors
```

> ⚠️ **ĐÍNH CHÍNH 19-9-2026.** Bản trước của mục này dán **transcript của ngày 18-9**, khi màn mở
> đầu còn ảnh: nó ghi `ok … (opening)` và `ky-3 ×2`. Sau phán quyết 2, màn mở đầu **không còn ảnh**
> và chặng 3 có **ba**. Transcript ở trên là output thật của lần chạy 19-9. Tổng vẫn là **9** —
> trùng hợp, không phải do không đổi: 0+2+1+3+0+3 thay vì 1+2+1+2+0+3. (Công cụ đếm **lượt hiển
> thị**, không đếm tệp: chặng 1 có 1 tệp nhưng hiện ở hai nơi khi đọc liền mạch.)

> ⚠️ **ĐÍNH CHÍNH 18-9-2026 (rà soát nhất quán trước khi nộp).** Transcript nguyên văn ở trên **được giữ y nguyên, không sửa một ký tự** — sửa số
> trong một đoạn ghi là output của máy thì chính là dựng transcript. Chạy lại `npm run build:offline`
> ngày 18-9-2026 trên đúng cây mã này cho **3.69 MB** (3.870.660 byte), không phải 3.68 MB; mọi
> dòng còn lại của transcript tái lập đúng từng chữ, kể cả `images inlined: 8`, phân bố
> 0 / ×2 / ×1 / ×3 / 0 / ×3, `images checked: 9` và `fonts loaded from the bundle: 27`.

Cả bốn tệp mới nhúng dạng data URI và **giải mã được với `naturalWidth ≠ 0` khi mở từ `file://`**.
Chặng 4 báo đúng là không có ảnh. Bản một tệp tăng 2,65 → **3,69 MB**, vẫn chạy bằng cách nhấp đúp,
không cần máy chủ, **không một yêu cầu mạng nào** — điều kiện của quy tắc “một máy tính, không AI”.

**Tiếp cận — đo, không phỏng đoán:**

| Kiểm | Kết quả |
|---|---|
| Tương phản chữ, hai chế độ sáng/tối (`tools/ux-audit.mjs`) | “all sampled text at or above the minimum” |
| Phóng chữ 200% | “no overflow, no clipped text” |
| Tràn ngang, 11 tuyến × 3 khổ (1440/768/390) | **none** |
| Vòng tiêu điểm trên nút “Xem lớn” của figure | `3px solid`, cao 44 px |
| **Focus Not Obscured (WCAG 2.2 AA)** | Tab tới nút, đo mọi phần tử `fixed`/`sticky` chồng lên hộp tiêu điểm: **0 phần tử**, cả desktop lẫn mobile; tiêu điểm cuộn trọn vào khung nhìn |
| Phóng to bằng bàn phím | Enter mở, Escape đóng, **tiêu điểm trở về đúng nút đã mở**; bẫy Tab giữ trong hộp thoại |
| Ảnh phóng to ở 390 px | Vừa khung nhìn, **tràn ngang = 0 px**; chú thích và dòng ghi nguồn đi kèm |
| `alt` | Mọi tài liệu có mô tả > 60 ký tự, **mô tả cái nhìn thấy, không diễn giải**. Bản đồ và ảnh hội trường **không nêu tên ai** — có phép thử chặn |
| Giảm chuyển động | Không hiệu ứng nào che nội dung; ảnh không bao giờ được làm chuyển động; đã chụp lại trạng thái `prefers-reduced-motion` |
| Dòng ghi nguồn | **Hiển thị cạnh ảnh, không giấu sau nút** — đây là **điều kiện của giấy phép**, không phải lựa chọn thiết kế |

---

## 11. Phép kiểm đã chạy thật

| Lệnh | Kết quả |
|---|---|
| `npm run typecheck` | ✅ sạch |
| `npm run lint` | ✅ sạch |
| `npm run test` | ✅ **113 / 113** (18-9: 111 · trước đợt: 106) — 2 tệp *(cập nhật 18-9-2026: nay là **116 / 116** sau ba phép thử thêm trong đợt rà soát nhất quán — xem FINAL_SUBMISSION_CONSISTENCY_AUDIT.md §E)* |
| `npm run build` | ✅ |
| `npx playwright test` | ✅ **228 / 228** (18-9: 225), ba khổ **laptop 1440 · tablet 768 · mobile 375** *(chạy lại 18-9-2026: **228 / 228**, exit 0, 5,6 phút)* |
| `npm run build:offline` | ✅ **3,69 MB**, 8 ảnh nhúng, 42 phông nhúng |
| `npm run check:offline` | ✅ 9 lượt ảnh giải mã, **no network requests, no errors** |
| `node tools/audit-density.mjs` | ✅ chạy, có thêm tuyến `ky-5` (18-9) và `ky-3` (19-9) — cả trạng thái ô ảnh **trống** (`ky-2`) lẫn **đã điền** đều được đo |
| `node tools/ux-audit.mjs` | ✅ tương phản đạt, 200% không tràn |
| `node tools/word-budget.mjs` | ✅ chạy — **mục 9** ghi lần thứ nhất phép đo suýt nịnh sản phẩm (`.figure__cap`), **mục 11** ghi lần thứ hai (`.figure__blocked-line`) *(đính chính 18-9-2026: dòng này gửi người đọc sang mục 9 để tìm cả hai; ở đó chỉ có một)* |
| `node tools/station-audit.mjs` | ✅ chạy |
| `node tools/figure-shots.mjs` | ✅ **24 ảnh chụp** vào `web/screenshots/flow/` — 12 thêm ngày 18-9, 5 thêm ngày 19-9, và **6 ảnh cũ được trỏ lại**: 5 sang chặng 3 (30, 31, 32, 34, 35) vì tấm ảnh chúng chụp đã chuyển, và `36-stage-blocked` sang `ky-2`, nay là lối vào bị chặn gần nhất |

**Kiểm thử không bị nới một phép nào, cả hai ngày.** Các phép đếm cứng được cập nhật **trung
thực** (11 → 13 vị trí, 4 → 8 đã điền, 15 → 23 → **26** lượt kiểm nguồn), và số được ghim **cố ý**
kèm lý do viết trong mã: một phép kiểm trình duyệt không import được module dữ liệu, nên con số
“suy ra” sẽ không kiểm gì cả — ghim số buộc người thêm vị trí phải nói ra điều mình vừa làm.

**Ba phép thử của màn mở đầu không bị xoá — chúng đi theo tấm ảnh.** Khi tấm chân dung chuyển sang
chặng 3, cách rẻ nhất là xoá ba phép thử ấy và viết lại từ đầu. Không làm vậy: cả ba được trỏ sang
`#/chang/ky-3` và **giữ nguyên từng khẳng định** — kích thước nội tại, `alt` dài hơn 60 ký tự,
dòng ghi nguồn hiển thị trên bề mặt, chú thích nhắc “Agence Meurisse”, nhãn trạng thái. Thêm vào
đó là phép thử mới cho màn mở đầu ở trạng thái trống.

**Phép thử mới ngày 18-9:**

- mọi tệp ảnh khai trong dữ liệu **phải tồn tại trên đĩa** (đọc danh sách thật qua `import.meta.glob`);
- **không tệp ảnh nào được dùng ở hai vị trí** — chặn “thẻ chân dung lặp lại” ngay từ dữ liệu;
- **các trục chứng cứ không được mang cùng một nội dung** — chặn việc chép câu trả lời của trục đã
  xác lập sang trục chưa xác lập, đúng sai lầm mà các đợt trước đã mắc. *(Đính chính 18-9-2026:
  dòng này ghi “bốn trục”. Phép thử nay quét **bảy** trục văn bản, và chú thích của chính nó ở
  `content.test.ts` ghi lại lần mở rộng ấy. “Bốn” là con số của bản trước và hiểu nhầm thành
  bảo đảm hiện hành thì là hiểu thấp đi.)*;
- điều kiện sử dụng phải đọc **trên chính tên miền của cơ quan giữ hiện vật**;
- **không trường nguồn nào được chứa** `github`, `gitlab`, `creative_product_HCM202`, `wikipedia`,
  `commons.wikimedia`;
- lối vào chặng đã điền phải hiện **dòng ghi nguồn, nhãn trạng thái và ảnh giải mã được**;
- mỗi tài liệu bổ trợ phải hiện **cùng nhịp với câu nó chống đỡ** (đi bộ tới đúng nhịp, không dừng
  ở nhịp đầu tiên có ảnh);
- bản đồ 1909 **không được nêu tên ai** trong `alt` hay chú thích;
- ảnh của chặng **phóng to được bằng bàn phím và trả tiêu điểm về đúng nút**;
- trang Kiểm chứng phải công bố **cả những gì không tìm được**: “nguồn phát hiện”,
  “CHƯA XÁC LẬP ĐIỀU KIỆN SỬ DỤNG”, “sai vì cách đặt truy vấn”, “KHÔNG tự chuyển”,
  “việc của người duyệt”.

**Phép thử mới ngày 19-9, cho ba phán quyết:**

- **quyết định dùng lại không được suy ra từ nhãn của nơi giữ**: `holderRightsStatus` và
  `reuseCondition` phải là **hai câu khác nhau**; `creatorRightsCheck` phải được trả lời riêng và
  dài hơn 40 ký tự; `reuse` phải nằm trong **tập hai giá trị khẳng định** `USE` / `USE WITH CAUTION`.
  *(Đính chính 18-9-2026: dòng này công bố dạng CŨ và YẾU HƠN của phép thử — “nằm trong bốn giá trị
  hợp lệ và không bao giờ là `REJECT`”. Chính dự án đã nhận ra đó là một lỗ hổng: nó cho lọt giá trị
  chưa quyết `NEED VERIFICATION`, tức một tài liệu có thể được hiển thị trên một quyết định chưa ai
  đưa ra. Phép thử đã được siết ngay trong ngày; báo cáo thì chưa, nên nó **nói thấp hơn** bảo đảm
  thật của chính mình.)*;
- **hiện vật nào có ghi người tạo lập in trên mình thì không được mang `USE`** — đây chính là phép
  thử sẽ đỏ nếu về sau có người đọc `domaine public` của BnF thành đã giải quyết vị trí của người
  chụp;
- **bốn bản ghi** — hai tấm Meurisse và hai tờ 1946 (`FS-ky-3`, `FS-ky-2-b`, `FS-ky-5`, `FS-ky-5-c`)
  — phải mang `USE WITH CAUTION` và `creatorRightsCheck` phải chứa “CHƯA XÁC LẬP”, ghim theo mã
  chứ không chỉ theo quy tắc chung. *(Đính chính 18-9-2026: dòng này chỉ kể hai tờ 1946, khiến hai
  tấm Meurisse trông như chỉ được quy tắc chung bảo vệ — ngược hẳn với lý do việc ghim theo mã tồn
  tại.)*;
- **không chuỗi nào tương đương “đã xác lập quyền của người chụp”** được xuất hiện trong dữ liệu,
  cả tiếng Việt lẫn tiếng Anh; *(đính chính 18-9-2026: phép thử này **chưa hề tồn tại** khi dòng
  trên được viết — không phép thử nào trong `content.test.ts` hay `figures.spec.ts` quét chuỗi ấy.
  Báo cáo đã công bố một bảo đảm mà sản phẩm không có, tức đúng loại sai lệch mà bản rà soát này đi
  tìm. Vì bảo đảm ấy là có thật và rẻ, nó **đã được viết vào** `content.test.ts` ngày 18-9-2026 thay
  vì xoá dòng công bố: phép thử mới đòi mỗi bản ghi trả lời câu hỏi người chụp theo đúng **một** trong
  hai cách trung thực — “CHƯA XÁC LẬP” hoặc “KHÔNG PHÁT SINH” — và quét chín chuỗi khẳng định ngược
  lại, ở cả hai ngôn ngữ. Kể từ 18-9 dòng trên là đúng; trước đó thì không.)*;
- tấm ảnh chuyển chặng phải nằm ở `ky-3`, khoảng thời gian của chặng phải chứa niên đại của bản
  ghi, **và** `eventCheck` phải vẫn chứa “Marseille” và “NGOÀI” — tức việc chuyển chặng **không**
  được nới rộng điều tấm ảnh khẳng định;
- **màn mở đầu phải còn khai báo vị trí, và vị trí ấy phải trống** — `FS-open` không có bản ghi
  nào, slot vẫn tồn tại, trạng thái `NOT YET EVIDENCED`, vai trò có ghi ngày chuyển; *(đính chính
  18-9-2026: phép khẳng định `NOT YET EVIDENCED` đã bị **gỡ** khỏi phép thử đơn vị này ngay trong
  ngày 19-9 vì nó là một đồng nhất thức — nó đọc lại chính dữ liệu vừa đọc. Thay vào đó là hai
  khẳng định khác: ô vẫn là vị trí **chính** và vẫn ở **lối vào**, để một lần sửa về sau không thể
  lặng lẽ hạ khoảng trống của màn mở đầu xuống thành một ô bổ trợ không ai dựng. Trạng thái
  `NOT YET EVIDENCED` thì vẫn đúng, chỉ là không còn được phép thử này ghim.)*;
- màn mở đầu vẫn phải là một màn mở đầu: tiêu đề, **một** hành động chính, sợi chỉ hành trình;
- bảng vị trí phải có đúng **4 `USE WITH CAUTION`** và **4 `USE`** (lọc khớp chính xác, vì
  `USE WITH CAUTION` có chứa chuỗi `USE`);
- trang Kiểm chứng phải công bố cả **bước ngoặt** của mỗi phán quyết, không chỉ kết quả:
  “ĐÃ CHUYỂN”, “SỰ KIỆN”, “THỜI KỲ”, “lật nó trong im lặng”,
  “BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED”, “không chứng minh”,
  “không phải bằng chứng rằng chặng 4 là bất khả”, “Parnotte”, “CHƯA XÁC LẬP”.

**Kiểm bằng mắt, thật:** 1440 / 768 / 390 px cho màn mở đầu *(đính chính 18-9-2026: đúng với
trạng thái **có ảnh** ngày 18-9. Với trạng thái **trống**, ảnh chụp chỉ tồn tại ở **1440 và 390** —
`tools/figure-shots.mjs` chụp ảnh 49 ở đúng hai khổ ấy và không có khổ tablet. Một lần nhìn bằng mắt
ở 768 px không thể bác bỏ được, nhưng nó không có vật chứng, trong khi mọi mục khác của câu này thì
có; nên nó được hạ xuống thành chưa có bằng chứng)*, cả năm lối vào chặng, ba tài liệu bổ trợ mới tại đúng nhịp của chúng,
ngăn nguồn, ảnh phóng to, trang Kiểm chứng (13 dòng vị trí + 26 dòng kiểm nguồn, **hai cột trạng
thái**), chế độ tối, chế độ giảm chuyển động, chế độ trình bày, và bản ngoại tuyến.

**Hai lỗi giao diện do chính thay đổi ngày 19-9 gây ra, phát hiện bằng mắt và đã sửa:**

1. thêm một cột làm các ô hẹp lại, và nhãn `NEED VERIFICATION` bị cắt giữa từ thành
   `VERIFICATIO / N`. Sửa ở `.chip`: xuống dòng **giữa các từ**, không giữa các chữ cái;
2. vị trí `FS-ky-5-c` được chèn ngay sau `FS-ky-5` nên bảng đọc thành 5, 5-c, 5-b. Đã sắp lại
   thành 5, 5-b, 5-c trong **mã**, và bảng suy ra từ mã nên tự khớp.

**Tràn ngang sau khi thêm cột:** đo lại `#/kiem-chung` ở 1440 / 768 / 390 px — **0 px cả ba**.

**Một chỗ nữa suýt tự lừa mình, lần thứ hai trong hai ngày.** Khi tấm ảnh rời màn mở đầu, ô trống
hiện một dòng giải thích dài chừng 50 chữ. `tools/word-budget.mjs` báo màn mở đầu đổi từ
`over, close` sang **`OK`** — trong khi `tools/audit-density.mjs` cho thấy số chữ ở màn hình đầu
trên điện thoại **tăng** từ 85 lên 150. Kết luận tốt lên trong khi màn hình dài ra, vì dòng của một
ô ảnh bị chặn được xếp là **apparatus** chứ không phải prose. Cách sửa: **cắt câu, không xếp loại
lại** — vai trò của `FS-open` rút còn khoảng 28 chữ, lý do đầy đủ nằm sau nút “Vì sao chưa có ảnh?”
và ở `SC-24`. Sau khi cắt: signage 65 → **43**, số chữ màn hình đầu trên desktop 158 → **136**.
Kết luận `OK` **lúc đó** đứng trên `prose 69` — giảm thật, vì chú thích ảnh đã đi cùng tấm ảnh —
chứ không đứng trên một lần đổi nhãn.

> ⚠️ **ĐÍNH CHÍNH 18-9-2026 (rà soát nhất quán trước khi nộp).** Hai con số và kết luận ở câu trên
> **đã bị chính lần thu hẹp sau đó lật lại**, và đoạn này vẫn viết ở thì hiện tại nên người đọc gặp
> chúng như trạng thái hiện hành. `.figure__blocked-line` đã được gỡ hẳn khỏi danh sách signage, nên
> câu vai trò của `FS-open` quay về cột prose. **Đo thật ngày 18-9-2026, chạy `node tools/word-budget.mjs`
> trên bản dựng hiện tại:** màn mở đầu là `prose 104 + signage 8`, kết luận **`over, close`** — không
> phải `OK`, không phải `prose 69`, không phải `signage 43`. Tổng chữ trong màn hình đầu không đổi
> (69+43 = 104+8 = 112); điều đổi là 35 chữ chuyển từ cột signage sang cột prose, đúng như phải thế.
> Con số 158 → 136 của `audit-density.mjs` vẫn đúng: đo lại ngày 18-9 cho `words=136` ở `#/` desktop.
> Ghi thêm cho đúng: câu vai trò của `FS-open` dài **35 chữ** theo chính cách đếm của công cụ, không
> phải “khoảng 28 chữ”.

**Mật độ ở lối vào chặng 3, sau khi nhận tấm ảnh** (`tools/audit-density.mjs`, 1440 px). Chặng 3
nay là chặng dày nhất sản phẩm — một ảnh chính **và hai** tài liệu bổ trợ — nên nó được thêm vào
tuyến đo:

| | `ky-2` (ô ảnh **trống**) | `ky-3` (ô ảnh **đã điền**, 2 tài liệu bổ trợ) |
|---|---|---|
| Điều khiển trong màn đầu | 10 | **9** |
| Nhãn trạng thái | 4 | **3** |
| Số chữ | 190 | **162** |

Như ngày 18-9: **trạng thái đã điền vẫn nhẹ hơn trạng thái trống** ở màn đầu, vì ô trống phát sinh
một nhãn và một nút giải thích ngay trong tầm nhìn.

---

## 12. Vị trí ảnh còn bị chặn

**Vẫn là năm vị trí** — `FS-ky-3` được điền và `FS-open` trống đi, một đổi một. **Danh sách đổi,
số lượng không đổi.**

| Vị trí | Trạng thái | Vì sao trống |
|---|---|---|
| `FS-open` (màn mở đầu) | `NOT YET EVIDENCED` | **Mới trống từ 19-9-2026.** Tài liệu của nó chuyển sang chặng 3, nơi niên đại của bản ghi thuộc về (`SC-24`). Không tài liệu nào trong tám tài liệu hiện có thay được, vì cả tám đều gắn với **một chặng cụ thể**; ô này cần một tư liệu mở ra **cả** hành trình |
| `FS-ky-1` (chính, chặng 1) | `NOT YET EVIDENCED` | Chưa tra được ảnh chân dung nào trước 5-6-1911 truy nguyên được. Trích đoạn ở chặng này nói về tuổi trẻ — giai đoạn ít ảnh báo chí |
| `FS-ky-2` (chính, chặng 2) | `NOT YET EVIDENCED` | Trong 39 tấm cùng lô “Congrès communiste de Marseille” và 14 tấm lô Tours, **chỉ một tấm** nhắc đại biểu Đông Dương — và tấm ấy nay ở chặng 3, nơi niên đại của nó thuộc về, chứ không phải chặng 2 |
| `FS-ky-4` (chính, chặng 4) | **`BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`** | **`SC-25`.** Các truy vấn đã thực hiện, ở các kho đã mở, chưa trả về gì. **Đó không phải bằng chứng rằng không tồn tại tư liệu phù hợp ở nơi khác** |
| `FS-ky-4-b` (bổ trợ, chặng 4) | **`BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`** | Như trên |

> ⚠️ **ĐÍNH CHÍNH 19-9-2026, không xoá bản cũ.** Bản 18-9 của mục này viết về chặng 4: *“Không có
> gì để lần ở kho châu Âu”*, và mô tả `FS-ky-3` là trống. Câu thứ nhất **suy quá xa** — nó biến
> “các truy vấn đã làm không trả về gì” thành “không có gì tồn tại”. Câu thứ hai đã hết đúng sau
> phán quyết 2. Cả hai được sửa ở trên; lý do ghi ở mục 5b.

**Hai ô của chặng 4 là ưu tiên cao nhất.** Các hướng còn để ngỏ, **chưa thử**: Trung tâm Lưu trữ
quốc gia I và III; Bảo tàng Hồ Chí Minh; Bảo tàng Lịch sử Quốc gia; Thư viện Quốc gia Việt Nam;
các kho lưu trữ ở Liên bang Nga và Trung Quốc cho giai đoạn 1934-1940; ANOM cho hồ sơ hành chính
thuộc địa. **Thư xin phép ở mục 3b của sổ nguồn ảnh vẫn chưa gửi cho ai — một con đường còn để
ngỏ, không phải bằng chứng rằng chặng 4 là bất khả.**

---

## 13. Việc còn cần người thật

1. **Mở lại từng `sourceUrl` và đọc lại bốn trục quyền** — `holderRightsStatus`, `reuseCondition`, `printedCreatorCredit`, `creatorRightsCheck` *(trường `rights` gộp đã bị tách ngày 19-9, không còn tồn tại)*. Cả tám bản ghi đều
   `NEED VERIFICATION`, và **chưa có người thật nào kiểm một bản ghi nào**.
2. ✅ **ĐÃ CÓ PHÁN QUYẾT 19-9-2026 (`SC-26`)** — nhãn `domaine public` trên ấn phẩm 1946. Kết
   quả: **giữ tư liệu, xếp `USE WITH CAUTION`, tách quyền thành bốn trục.** **Việc còn lại cho
   người duyệt:** xác lập tình trạng quyền của riêng người chụp, ghi trên bìa là “Parnotte” —
   trường `creatorRightsCheck` đang là **CHƯA XÁC LẬP** và phải ở nguyên đó cho tới khi có câu trả
   lời. Cũng cần một phán quyết phụ: có thu hẹp `USE WITH CAUTION` lại **chỉ cho tư liệu 1946**
   không, thay vì áp cả cho hai tấm Meurisse 1920/1921 như hiện nay?
3. ✅ **ĐÃ CÓ PHÁN QUYẾT 19-9-2026 (`SC-24`)** — tấm chân dung Marseille **đã chuyển** sang ô ảnh
   chính của chặng 3; màn mở đầu trống lại và vẫn khai báo. **Việc còn lại cho người duyệt:** xác
   nhận rằng khung trình bày ở chặng 3 thật sự chỉ nói “chân dung của thời kỳ” và không khiến người
   học hiểu là ảnh chụp một sự kiện của chặng.
4. **Xác nhận việc nhận diện.** Việc nhân vật mà BnF gọi là “Nguyen Aïn Nuä’C” và
   France-Illustration gọi là “Ho Chi Minh” đúng là nhân vật của trích đoạn **cần một nguồn học
   thuật được phê duyệt xác nhận**. Sản phẩm hiện chỉ nói: nguồn ghi như vậy.
5. **Gửi thư xin phép** tới Bảo tàng Hồ Chí Minh, Bảo tàng Lịch sử Quốc gia, và Trung tâm Lưu trữ
   quốc gia I. Bản nháp ở mục 3b sổ nguồn ảnh, **chưa gửi**.
6. **Lần hai manh mối ANOM / Trung tâm Lưu trữ quốc gia I** mà Commons nhắc tới nhưng không kèm số
   hồ sơ (`SC-17`).
7. **Đối chiếu tr.28–35 của bản quét với bản in chính thức được phê duyệt.** Nguồn học thuật nền
   vẫn là một bản quét **chưa được xác thực** (`GT-R08`); mọi thứ dựng trên nó thừa hưởng trạng thái
   ấy.
8. **Tìm tư liệu cho chặng 4** ở các kho chưa hỏi, liệt kê ở mục 12 và `SC-25`. Trạng thái là
   **bị chặn**, không phải đã đóng.
9. **Tìm một tư liệu cho màn mở đầu** — một tài liệu mà việc của nó là mở ra **cả** hành trình,
   không phải tư liệu của riêng một chặng.
10. **Kiểm thử người dùng thật và sửa dựa trên phản hồi thật:** *chưa làm, không mô phỏng, không
    tuyên bố là đã làm.*

---

## Trạng thái cuối

**HISTORICAL IMAGE INTEGRATION IMPLEMENTED — REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE**

Tám tài liệu trên sản phẩm, từ hai cơ quan giữ hiện vật, mỗi tài liệu cạnh đúng câu nó chống đỡ,
mỗi tài liệu mang dòng ghi nguồn mà giấy phép của nó đòi, và **cả tám đều nói ra rằng chúng chưa
được ai xác thực**. Bốn trong tám còn nói thêm một điều nữa: **được phép dùng, nhưng có một câu hỏi
về quyền của người tạo lập chưa ai trả lời.** Năm vị trí còn trống nói ra rằng chúng trống, nói vì
sao, và — với chặng 4 — nói rằng chúng **bị chặn chứ không bị đóng**.

Ba phán quyết ngày 19-9 làm sản phẩm **dè dặt hơn ở chỗ nói về quyền**, **chính xác hơn ở chỗ đặt
tấm ảnh**, và **mở hơn ở chỗ nói về cái chưa tìm thấy**. Không phán quyết nào thêm một tấm ảnh mới;
cả ba đều là về việc nói đúng hơn những gì đã có.

Đó là điều đợt này làm được. Nó **không** làm cho sản phẩm trở nên hoàn chỉnh về học thuật, và
không có gì trong báo cáo này được hiểu là như vậy.
