# Prompt Log — đợt chuyển sản phẩm sang trải nghiệm không gian, 17-9-2026

> Bản ghi này thuộc Folder `07_AI_Declaration_Integrity_PromptLog`.
> `AGENTS.md` §9 yêu cầu sáu trường cho mỗi prompt: ngày dùng, công cụ AI, việc được hỗ trợ,
> prompt nguyên văn, tóm tắt kết quả, cách đối chiếu lại với giáo trình gốc.
>
> Các bản ghi Prompt Log trước KHÔNG bị sửa. Đây là một mục mới, đứng sau chúng.
>
> Trạng thái: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.

---

## P-SPACE-01

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ AI** | Claude Code (Claude Opus 5, cửa sổ ngữ cảnh 1M), chạy trong repository, có skill `ui-ux-pro-max` cài sẵn tại `.claude/skills/ui-ux-pro-max` |
| **Việc được hỗ trợ** | Chuyển sản phẩm hiện có thành một trải nghiệm học tập có chiều không gian: khảo sát kho tham chiếu, kiểm lại việc chuyển nguồn sang giáo trình 2019, dựng lớp dữ liệu nơi chốn, dựng thành phần bản khắc, viết kiểm thử, đo lại mật độ giao diện, và viết các bản ghi bắt buộc. Không thay đổi một mệnh đề học thuật nào. |
| **Prompt nguyên văn** | Lưu đầy đủ, không cắt: [`prompts/P-SPACE-01.txt`](prompts/P-SPACE-01.txt) |
| **Tóm tắt kết quả** | Xem bên dưới |
| **Cách đối chiếu lại với giáo trình gốc** | Xem bên dưới |

### Tóm tắt kết quả

**Việc kiểm tra bắt buộc trước khi sửa bất cứ thứ gì.**

- Băm SHA-256 của cả bốn tệp PDF được kiểm và **khớp toàn bộ** với `AGENTS.md`.
- Việc chuyển nguồn sang `Giáo trình Tư tưởng Hồ Chí Minh - 2019` được kiểm độc lập và **đã hoàn tất**
  cho mọi trích dẫn công khai đang hoạt động: mọi chuỗi `C2` còn lại trong `web/src` đều là chú thích
  mã ghi lại chính việc chuyển nguồn, hoặc là mục `SUPERSEDED_RISKS.formerId` trong sổ kiểm toán.
  `content.test.ts:871-892` khoá điều này bằng máy.
- Sản phẩm được build và chạy, chụp toàn bộ tuyến ở 1440 / 768 / 390 px **trước khi** sửa gì.

**Đọc trực tiếp bản quét, vì tệp 2019 không có lớp văn bản.**
Tám ảnh trang nhúng trong tệp được tách ra bằng một script chỉ dùng thư viện chuẩn, rồi đọc tận mắt.
Ba kết quả được ghi vào `PLACE_READING_NOTES` thay vì làm phẳng:

- tr.28 **có in** `Trường Dục Thanh, Phan Thiết` — bản tóm tắt trong sổ ngữ cảnh của dự án lược mất
  `Phan Thiết`. **Dữ liệu sản phẩm đúng, bản tóm tắt chỉ rút gọn.**
- tr.32 in `tại Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)` — **có dấu ngoặc đơn**, khác cả hai bản ghi
  thứ cấp của chính dự án. Nhãn trên bản khắc nay dùng đúng dạng in.
- tr.32 in dấu gạch ngang dài trong `biên giới Việt Nam – Trung Quốc`.
- Đồng thời xác nhận lại tận mắt các dạng in đã đăng ký: `trở thành thành` (tr.32), `Sdd` (tr.32),
  `thày giáo` (tr.28).

**Điều đọc ra được, và nó trở thành ý tưởng của sản phẩm.**
Khi đọc tám trang để tìm *nơi chốn* thay vì *thời gian*, điều hiện ra là trích đoạn đặt hành trình
vào không gian kỹ hơn hẳn so với cách nó đặt các bước ngoặt: **trong 8 bước ngoặt chỉ 2 bước có in
địa điểm**, và 18 sự việc có ngày tháng nhưng không có nơi chốn nào. Cả trích đoạn chỉ có **hai**
địa điểm ở mức chính xác một công trình, và chỉ **bốn** câu nói thẳng ra một chuyến đi, trong đó hai
câu không nêu tên đầu kia. Vì vậy sản phẩm không dựng một bản đồ hành trình; nó dựng **bản đồ của
một nguồn**, đi xa đúng bằng chỗ nguồn đi và dừng lại nhìn thấy được ở chỗ nguồn dừng.

**Đã làm.**

1. `web/src/data/places.ts` — sổ địa danh, 37 nút không gian, 4 câu chuyển động, sổ đọc lại bản quét.
   Mọi nút đều trỏ về một đoạn / bước ngoặt / trích dẫn đã có trong `stages.ts`, nên **không nút nào
   thêm một khẳng định nào vào nguồn**.
2. `web/src/data/land.ts` + `tools/build-land.mjs` — đường bờ biển Natural Earth 1:110m (miền công
   cộng) giải mã sẵn thành path, đóng gói dạng chữ. **Không vẽ biên giới quốc gia**, vì trích đoạn
   trải từ 1911 đến 1969.
3. `web/src/components/atlas.ts` + `styles/atlas.css` — bản khắc. **Không Three.js, không phụ thuộc
   mới lúc chạy.**
4. Lối vào chặng: bản khắc **thay thế** cột mốc thời gian trần, không đứng cạnh nó.
5. Mỗi nhịp đi trong chặng có thêm **một dòng** nói nơi chốn, hoặc nói rằng trích đoạn không nêu.
6. `#/hanh-trinh` có thêm một mục đọc năm chặng theo nơi chốn. Không thêm liên kết nào.
7. `#/kiem-chung` có thêm mục `noi-chon`: xuất xứ từng toạ độ và danh sách những chỗ không định vị.
8. 28 kiểm thử đơn vị mới + 10 kiểm thử trình duyệt mới, viết để **fail nếu ai đó lấp một chỗ trống**.

**Toạ độ được xử lý như một lớp bằng chứng mới.** Chúng không có trong giáo trình. Mỗi toạ độ dẫn từ
bản ghi Wikidata của địa danh, kèm mã, đường dẫn, giá trị và **độ chính xác do chính bản ghi công
bố**, cùng ngày đọc. Wikidata là nguồn kiểm được, **không phải** nguồn có thẩm quyền theo thứ bậc
nguồn của tài liệu hướng dẫn, nên mọi toạ độ giữ `NEED VERIFICATION`.

**Một lỗi do chính kiểm thử mới bắt được:** `viet-nam` thiếu ghi chú nói rằng toạ độ cấp quốc gia là
một giá trị đại diện chứ không phải một địa điểm. Đã bổ sung.

**Hai lỗi thiết kế do nhìn ảnh chụp mà thấy, không phải do kiểm thử:** một dấu gạch ngang mang hai
nghĩa khác nhau ở hai cột của cùng một dòng, và chặng 5 có bản khắc trống hợp lệ nhưng đọc như bị
hỏng cho tới khi dòng chú thích nói ra vì sao.

### Cách đối chiếu lại với giáo trình gốc

- **Không một mệnh đề học thuật nào được thêm, sửa hay bỏ.** `stages.ts`, `locators.ts`, `source.ts`
  và `types.ts` không bị đụng tới. Lớp không gian chỉ *trỏ* vào chúng bằng id.
- Mỗi địa danh được chép đúng dạng in sau khi **mở lại bản quét trang tương ứng** ở mức phóng to, chứ
  không chép từ bản tóm tắt. Ba chỗ lệch tìm được đã ghi ở `PLACE_READING_NOTES` và in ra ở trang
  Kiểm chứng.
- Mỗi nút không gian mang một `SourceRef` và đi qua đúng bộ dựng trích dẫn cũ, nên nhãn công khai
  luôn là `Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. N`. Một kiểm thử bắt buộc điều này cho **mọi**
  nút.
- Những chỗ trích đoạn **không** nêu địa điểm được khoá lại bằng kiểm thử có tên riêng: ngày 5-6-1911,
  Hội nghị hợp nhất đầu năm 1930, ngày 2-9-1945, tháng 7-1920, tháng 6-1925, và việc về nước cuối
  tháng 1-1941. Một danh sách tên đất **không** có trong trích đoạn (Bến Nhà Rồng, Sài Gòn, Ba Đình,
  Mátxcơva, …) bị cấm bằng kiểm thử.
- `Hà Nội` bị cấm làm nơi diễn ra sự việc: trong trích đoạn nó chỉ xuất hiện trong địa chỉ nhà xuất
  bản ở phần chú thích, là một loại dữ kiện khác hẳn.
- Trạng thái xác thực **không** được nâng ở bất kỳ đâu. `GT-R08` vẫn đứng: tệp 2019 là bản quét chưa
  được xác thực, nên mọi thứ ở đây thừa hưởng `NEED VERIFICATION`.

### Giới hạn của lần làm này

- Không có bằng chứng người dùng thật, và không có câu nào trong sản phẩm hay trong báo cáo nói rằng
  người học hiểu hơn, thích hơn hay nhớ hơn.
- Chín trên mười một vị trí ảnh tư liệu vẫn trống, đúng như trước.
- Bản khắc chưa được một người đối chiếu với bản giáo trình chính thức được phê duyệt.
- Kho tham chiếu `_reference/creative_product_HCM202` **không phải là nguồn học thuật** và không được
  dẫn như nguồn ở bất kỳ đâu; nó chỉ là tư liệu tham khảo thiết kế. Xem `REFERENCE_ANALYSIS.md`.
