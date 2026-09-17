# PROMPT LOG — phiên tìm và tích hợp tư liệu lần ba, 17-9-2026

> Tiếp nối `07_AI_Prompt_Log_Images_2026-09-17.md` và `07_AI_Prompt_Log_Images2_2026-09-17.md`.
> **Các đính chính được ghi thêm, không xoá bản cũ.**
>
> Sáu trường bắt buộc theo `AGENTS.md` mục 9.
>
> Trạng thái: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.

---

## P-IMG-12

| Trường | Nội dung |
|---|---|
| **Ngày dùng** | 17-9-2026 |
| **Công cụ AI** | Claude Code (Anthropic), mô hình Opus 5, chạy trong VS Code. Có skill `ui-ux-pro-max`. Phần tra cứu diện rộng chạy bằng 25 tác nhân con, mỗi ứng viên được một tác nhân khác thẩm định đối kháng. |
| **Tác vụ hỗ trợ** | Tìm, xác minh và tích hợp tư liệu lịch sử thật cho năm chặng; mở rộng mô hình dữ liệu để ảnh bổ trợ nằm cạnh đúng nhịp nó chống đỡ; sửa sai lệch số liệu trong tài liệu. **Không** thiết kế lại UX. |
| **Câu lệnh nguyên văn** | [`prompts/P-IMG-03.txt`](prompts/P-IMG-03.txt) (11.512 ký tự) |
| **Tóm tắt output** | Xem bên dưới |
| **Cách đối chiếu kiểm chứng chéo với giáo trình gốc** | Xem bên dưới |

### Tóm tắt output

**Ba tư liệu mới được tích hợp, tất cả do BnF giữ và công bố trên Gallica, tất cả `dc:rights`
“domaine public”:**

| Vị trí | Tư liệu | Neo vào | Vì sao |
|---|---|---|---|
| `FS-ky-2-b` | Ảnh báo chí Agence Meurisse, “Congrès de Tours : vue générale de la salle”, ark `btv1b9038096h` | bước ngoặt `TP3` (25 đến 30-12-1920) | Trích đoạn đặt Đại hội Tua làm bước ngoặt của chặng |
| `FS-ky-3-b` | L’Humanité số 5584, ngày 2-8-1919, trang 3, ark `bpt6k2993902` | đoạn `P3-2` | Chính câu trích đoạn dẫn tên tờ báo và tháng |
| `FS-ky-5-b` | Bản in *Tuyên ngôn Độc lập* 1945, ark `bpt6k42428601` | bước ngoặt `TP7` (2-9-1945) | Trích đoạn gọi tên văn kiện và in mốc ấy |

**Ba tấm đều tự xác thực**: số hiệu hoặc ký hiệu kho ghi tay trên chính hiện vật trùng với trường
định danh trong bản ghi (Meurisse 85865; “4° Pièce Indoch 68” ↔ 4-INDOCH PIECE-68).

**Thay đổi kiến trúc, tối thiểu.** `FigureSlot` được thêm một trường `anchor` với bốn dạng —
`entrance`, `passage`, `turn`, `quote`. Vị trí **chính** luôn là `entrance` và mở đầu chương. Vị
trí **bổ trợ** khai báo đúng nhịp nó chống đỡ và **chỉ hiển thị khi đã được điền**; vị trí bổ trợ
còn trống nằm ở trang Kiểm chứng, **không** đặt một khung ảnh rỗng vào giữa phần đọc. Một kiểm thử
đơn vị buộc mọi `anchor` phải trỏ tới một nhịp có thật trong đúng chặng ấy.

**Sửa sai lệch số liệu.** `docs/08_Image_Source_Register_TEMPLATE.md` mở đầu bằng “Sản phẩm có sáu
vị trí ảnh” trong khi mã đã khai báo mười một. Đã dựng lại bảng cho khớp `FIGURE_SLOTS` và **ghi
đính chính ngay trên đầu tệp thay vì xoá câu cũ**. Bản ghi quyết định thiết kế trong
`data/project.ts` cũng còn con số “sáu”; đã thêm dòng đính chính, giữ nguyên câu gốc.

**Điều tìm được và điều không tìm được.** Mục tiêu của bản yêu cầu là mỗi chặng một ảnh chân dung
thật của Hồ Chí Minh. **Không đạt.** Gallica chỉ có đúng một ảnh đại biểu Đông Dương và nó **đã**
dùng ở màn mở đầu; truy vấn “Ho Chi Minh” trong ảnh trả về 128 bản ghi toàn là ảnh vườn hoa
**Thành phố** Hồ Chí Minh năm 1948; bộ ảnh báo chí Meurisse/Rol không phủ năm 1946. Năm vị trí
chính vẫn để trống, neo thị giác của lối vào chặng vẫn là cột mốc thời gian in trong chặng.

### Cách đối chiếu kiểm chứng chéo với giáo trình gốc

1. **Mỗi tư liệu neo vào một câu mà trích đoạn thật sự in.** Không tư liệu nào được gắn vì “trông
   đúng thời kỳ”. Căn cứ gắn chặng được ghi thành một trường riêng trong từng bản ghi.
2. **Ba lớp dữ kiện được giữ tách rời** ở tư liệu L’Humanité, vì chúng khác nhau: (a) **bản ghi
   BnF** chỉ mô tả cả số báo, không nêu tên bài, không nêu tác giả bài; (b) **chính trang báo** in
   đề mục “En Indo-Chine”, tít “LA QUESTION INDIGÈNE” và chữ ký “NGUYEN-AI-QUAC.”, đọc tận mắt sau
   khi phóng to, không dựa vào OCR; (c) **trích đoạn** gọi bài là “Vấn đề dân bản xứ”. Ba lớp khớp
   nhau về tháng và chủ đề. Việc chúng là **một** bài, và việc người ký là nhân vật của trích đoạn,
   **chưa được nguồn học thuật được phê duyệt xác nhận** → `NEED VERIFICATION`.
3. **Một mâu thuẫn ngày được công bố chứ không làm phẳng.** Bản ghi ảnh Đại hội Tua ghi
   `dc:coverage` “16 décembre 1920”, còn trích đoạn in “25 đến 30-12-1920”. Đã mở bản ghi của **cả
   14 tấm** cùng lô: 13 tấm ghi y hệt ngày ấy và một tấm ghi “27 février 1920” — tức đây là **ngày
   gộp của recueil**, không phải ngày chụp. Kết luận ghi rõ: **trục sự kiện** dựa trên `dc:subject`;
   **trục ngày chưa xác lập**. Biên bản tốc ký của chính đại hội (ark `bpt6k215450z`) nêu ngày họp
   “les 25, 26, 27, 28, 29 & 30 décembre 1920”, được ghi làm đối chứng — **không** dùng để “sửa”
   bản ghi của BnF.
4. **Ngày in và ngày đọc được giữ tách rời** ở bản in Tuyên ngôn: bản ghi nêu niên đại in “1945”
   và không nêu ngày in; mốc 2-9-1945 là ngày **đọc**.
5. **Ba tệp PDF.** Kiểm SHA-256 ngày 17-9-2026: cả ba khớp `AGENTS.md` mục 1.
6. **Còn nợ.** Việc đối chiếu trích đoạn với giáo trình chính thống vẫn **chưa thực hiện**. Không
   bản ghi nào ở trên xác thực nội dung học thuật; chúng chỉ xác thực rằng tài liệu là thật, do ai
   giữ, và được phép dùng.

### Các trang đã mở trong phiên này

| Trang | Mục đích | Kết quả |
|---|---|---|
| `gallica.bnf.fr/SRU?…congres de Tours 1920…image` | Tra danh mục | 14 ảnh Agence Meurisse, tất cả `domaine public` |
| `gallica.bnf.fr/services/OAIRecord?ark=…` × 14 | Mở **từng** bản ghi Dublin Core | Phát hiện ngày gộp của recueil |
| `gallica.bnf.fr/iiif/…/btv1b9038096h/f1/…` | Tải bản gốc | 400.560 byte; xem tận mắt: số 85865 ghi tay trùng bản ghi |
| `gallica.bnf.fr/ark:/12148/bpt6k2993902` + OAI | Số báo L’Humanité 2-8-1919 | `domaine public`; tải trang 3, phóng to đọc tít và chữ ký |
| `gallica.bnf.fr/ark:/12148/bpt6k42428601` + OAI | Bản in Tuyên ngôn Độc lập | `domaine public`; xem bìa, ký hiệu kho trùng bản ghi |
| `gallica.bnf.fr/SRU?…delegue indochinois…` | Tìm thêm ảnh chân dung | Chỉ có tấm **đã dùng**; hai bản “Temple du Souvenir Indochinois” có điều kiện riêng, không phải public domain |
| `gallica.bnf.fr/SRU?…Ho Chi Minh…image` | Tìm ảnh chân dung | 128 bản ghi, **toàn bộ** là vườn hoa Thành phố Hồ Chí Minh 1948 |
| `gallica.bnf.fr/SRU?…Fontainebleau / Le Paria / Proces de la colonisation / Revendications / intercoloniale / Phan Thiet` | Tìm tài liệu trích đoạn gọi tên | Không truy vấn nào trả về đúng tài liệu |
| `humazur.univ-cotedazur.fr/s/Humazur/item/23566` và `/22226` | Kho mới: bản đồ Nghệ An 1909; ảnh Phan Châu Trinh | **Ứng viên mạnh, chưa điền** — xem ghi chú dưới |

### Ghi chú trung thực về Humazur và về giới hạn của phiên

- **Humazur (Université Côte d’Azur)** là một kho mới, có bản ghi hiện vật đầy đủ và trường
  `Droits: Domaine public`. Bản ghi và trang điều khoản do **một tác nhân nghiên cứu** mở và trích
  nguyên văn. **Người chịu trách nhiệm phiên này chưa tự mở lại trang điều khoản của Humazur**, nên
  theo đúng kỷ luật “tự kiểm trước khi đưa vào sản phẩm”, `FS-ky-1-b` **vẫn để trống**. Đây là công
  việc cụ thể và khả thi cho phiên sau.
- **Ảnh Phan Châu Trinh bị loại cho vị trí chính**, hai lý do ghi tách rời: trục ngày ghi thẳng là
  “Inconnue” và phỏng đoán của nơi giữ phần lớn nằm **sau** mốc 5-6-1911 của chặng; và đặt chân
  dung một người khác làm neo mở đầu chặng sẽ khiến người học tưởng đó là nhân vật của hành trình.
- **Gallica chặn IP** sau khoảng một tá lệnh SRU liên tiếp. Một số truy vấn về báo chí Pháp năm
  1908 trả về rỗng **sau** thời điểm bị chặn, nên chúng là **chưa kết luận**, không phải kết quả
  âm tính. Cần chạy lại từ một IP khác trước khi ai đó kết luận là không có.
- **Một nhầm lẫn dễ mắc đã được ghi lại để không ai mắc**: mọi ảnh “Latouche-Tréville” trên Gallica
  là **tuần dương hạm** Pháp, không phải tàu buôn “Amiral Latouche-Tréville”. Thêm nữa, **trích
  đoạn được giao không nêu tên con tàu nào**.

### `ui-ux-pro-max` trong phiên này

| Căn cứ | Loại | Áp dụng |
|---|---|---|
| `SKILL.md` §3 `lazy-load-below-fold`, `image-dimension` | **Hướng dẫn chung**, không phải kết quả CLI | Ảnh bổ trợ nằm sâu trong chặng, `loading="lazy"`, và ghi `width`/`height` + `aspect-ratio` nên hộp được giữ chỗ trước khi tệp về |
| `SKILL.md` §7 `excessive-motion`, `motion-meaning` | **Hướng dẫn chung** | **Không thêm một chuyển động nào** cho ảnh mới. Khung ảnh không có hiệu ứng riêng |
| `SKILL.md` §1 `alt-text` | **Hướng dẫn chung** | `alt` mô tả đúng những gì nhìn thấy — kể cả băng-rôn, con dấu và ký hiệu kho viết tay — và **không diễn giải** |

Các truy vấn CLI cho phần bố cục ảnh đã chạy ở phiên trước (`P-IMG-03`, `P-IMG-04`, `P-IMG-05`) và
**kết quả không đổi**, nên được dùng lại thay vì chạy lặp. Không viện dẫn kết quả CLI nào mới trong
phiên này.
