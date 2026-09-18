# UX_REDESIGN_REPORT — HÀNH TRÌNH TƯ TƯỞNG

> **Trạng thái chung của dự án:** `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`
> **Trạng thái của đợt thiết kế lại này:** `UX REDESIGN IMPLEMENTED — REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`
>
> Ngày: 17-9-2026 · Phiên: P-UX-12 · Prompt nguyên văn: [`docs/prompts/P-UX-12.txt`](docs/prompts/P-UX-12.txt)
>
> Mọi lựa chọn trong tệp này là `PROJECT DECISION`. Không mục nào là yêu cầu lấy từ ba tệp PDF
> của học phần. Không mục nào là bằng chứng người dùng thật.

**Mục lục**

1. [Trạng thái tài liệu](#0-trước-khi-bắt-đầu--trạng-thái-tài-liệu)
2. [PHASE 1 — Audit](#1-phase-1--audit)
3. [PHASE 2 — Quyết định thiết kế](#2-phase-2--project-design-decision)
4. [PHASE 3 — Triển khai](#3-phase-3--redesign-đã-triển-khai)
5. [Ảnh: đã thêm gì, nguồn nào, trạng thái nào](#4-ảnh-đã-thêm-gì-nguồn-nào-trạng-thái-nào)
6. [Hoạt ảnh đã triển khai](#5-hoạt-ảnh-đã-triển-khai)
7. [Trải nghiệm trên điện thoại](#6-trải-nghiệm-trên-điện-thoại)
8. [PHASE 4 — Kiểm thử đã chạy](#7-phase-4--kiểm-thử-đã-chạy)
9. [Kiến trúc trước / sau](#8-kiến-trúc-trước--sau)
10. [Sử dụng `ui-ux-pro-max`](#9-sử-dụng-ui-ux-pro-max)
11. [Rủi ro còn lại và việc chờ người kiểm](#10-rủi-ro-còn-lại-và-việc-chờ-người-kiểm)

---

## 0. Trước khi bắt đầu — trạng thái tài liệu

Kiểm tra SHA-256 ba tệp PDF được kiểm soát, ngày 17-9-2026:

| Tệp | Kết quả |
|---|---|
| `C2-02.pdf` | khớp `F8AB7AA8…BEB485E` |
| `LLCT_Fall2026_Student_Guideline_TT_v2.0_FINAL.pdf` | khớp `B37D8F67…6AC3D51A` |
| `TT_CamNang_HoSo_ToanDien_Fall2026.pdf` | khớp `3F940830…CADF54A` |

Không có `SOURCE FILE CHANGED - RE-AUDIT REQUIRED`.

**Ba tệp mà bản yêu cầu nhắc đến nhưng không tồn tại trong repository:**

| Tệp được nhắc | Thực tế |
|---|---|
| `AGENTS_v2.md` | **không có.** Bản hiện hành là `AGENTS.md` (v3.0 forensic final) |
| `HCM202_PROJECT_CONTEXT_v2.0.md` | **không có.** Bản hiện hành là `HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md` |
| `MASTER.md` ở gốc | **không có** ở gốc. Có `design-system/hanh-trinh-tu-tuong/MASTER.md`, đã đọc |

Không dựng ra nội dung thay cho ba tệp trên. Nếu chúng thật sự tồn tại ở nơi khác,
đợt thiết kế lại này **chưa** được đối chiếu với chúng.

---

## 1. PHASE 1 — AUDIT

### 1.1 Cách đo

Audit này **không** dựa vào cảm nhận. `web/tools/audit-density.mjs` đo, trong phạm vi màn hình
đầu tiên (fold) của từng tuyến, trên 7 tuyến × 3 khung màn (1440×900, 834×1112, 390×844):

- số **hệ điều hướng** cùng hiện diện;
- số nút/liên kết, tách **chrome** (ngoài `<main>`) và **nội dung** (trong `<main>`);
- số **nhãn trạng thái / cờ xuất xứ / bộ đếm** thường trực, **kèm bảng phân tách theo lớp**;
- số **cỡ chữ khác nhau**;
- số **từ**;
- số **ảnh**.

**Mốc đối chiếu là thật.** Số "trước" lấy bằng cách dựng `git worktree` ở commit `91d52c2`
(trạng thái đã commit), build và đo bằng **cùng một phiên bản script**.

> **Đính chính về chính công cụ đo.** Bản đầu của script này đếm nhãn trạng thái bằng một danh
> sách 6 bộ chọn, trong đó **2 bộ chọn đã chết** (`.walk__phase-n`, `.join__stage-count` — các
> phần tử ấy vừa bị gỡ), đồng thời **bỏ sót** phần lớn những bộ đếm mà bản yêu cầu thật sự hỏi
> tới. Con số "6 → 1" từng được báo cáo là sản phẩm của một công cụ chỉ biết bộ chọn của bản
> mới. Script hiện tại liệt kê **mọi** nhãn trạng thái, cờ xuất xứ và bộ đếm thường trực tồn tại
> **ở một trong hai bản**, và in ra phân tách theo lớp. Toàn bộ số ở mục 8 đã đo lại bằng công
> cụ đã sửa, trên cả hai bản.

### 1.2 Kết quả đo — trạng thái trước khi sửa

| Tuyến | Hệ điều hướng (desktop) | chrome : nội dung (desktop) | Nhãn trạng thái (desktop) | Từ trong fold (desktop) |
|---|---|---|---|---|
| `#/` | 1 | 4 : 12 | 0 | **511** |
| `#/hanh-trinh` | 1 | 4 : 7 | 0 | 296 |
| `#/chang/ky-2` | **6** | **14 : 22** | **11** | 178 |
| `#/doi-sanh` | 4 | 14 : 14 | 5 | 330 |
| `#/noi-ket` | 4 | 14 : 9 | **11** | 255 |
| `#/tong-hop` | 3 | 14 : 9 | 4 | 185 |
| `#/kiem-chung` | 4 | 14 : 8 | 4 | 176 |

Sáu hệ điều hướng cùng hiện trên một màn chặng: thanh đầu trang · cột 5 chặng ·
danh sách 4 điểm đến trong cột · thanh các phần của chặng · dải mốc nhịp · nút Trước/Tiếp.
Mười một nhãn trên màn chặng: 2 cờ xuất xứ · 1 bộ đếm nhịp · 4 số lượng trên các nút phần chặng
· 4 nhãn trong danh sách điểm đến.

### 1.3 Các vấn đề, theo mức độ

Mỗi mục: **Vấn đề → Vì sao rối hoặc khô → Ảnh hưởng tới việc học → Mức độ → Hướng sửa.**

#### A. `CRITICAL` — Sáu hệ điều hướng cùng lúc trên một màn chặng

- **Vấn đề.** 6 hệ điều hướng trong cùng fold ở `#/chang/ky-2` (desktop và tablet); 14 trên 36 nút
  trong fold thuộc khung sản phẩm chứ không thuộc chặng.
- **Vì sao rối.** Bốn trong sáu hệ trả lời cùng một câu hỏi — "tôi đang ở đâu, đi tiếp thế nào" —
  bằng bốn ngôn ngữ thị giác khác nhau. Người học phải chọn *dùng cái nào* trước khi chọn *đọc gì*.
- **Ảnh hưởng tới việc học.** Chú ý tiêu vào việc đọc giao diện thay vì đọc lịch sử.
- **Mức độ.** `CRITICAL`.
- **Hướng sửa.** Một hệ điều hướng duy nhất (mục lục mở theo yêu cầu) + một dải chỉ vị trí
  **không chứa liên kết**. Bỏ cột bên; bỏ hàng nút phần chặng; bỏ thanh chuyển chặng cuối trang.

#### B. `CRITICAL` — Trên điện thoại, khung sản phẩm lấn át nội dung

- **Vấn đề.** Ở 390px, ba tuyến có tỉ lệ **14 nút khung : 2 nút nội dung**. Trên màn chặng, bốn
  hệ điều hướng xếp chồng phía trên phần đọc.
- **Vì sao rối.** Trên màn hẹp, thứ tự đọc là thứ tự cuộn.
- **Ảnh hưởng tới việc học.** Ấn tượng đầu tiên là "bảng điều khiển", không phải "triển lãm".
- **Mức độ.** `CRITICAL`.
- **Hướng sửa.** Cột bên biến mất; thanh đầu trang rút còn 2 hàng; công cụ và dải vị trí dùng chung một hàng.

#### C. `HIGH` — Màn mở đầu đòi hỏi cam kết đọc trước khi tự giới thiệu

- **Vấn đề.** **511 từ** trong fold ở 1440px; câu hỏi trung tâm là tiêu đề trang và là vật thể lớn nhất.
- **Vì sao khô.** Một câu hỏi dài không đọc được bằng một cái liếc.
- **Ảnh hưởng tới việc học.** Câu hỏi trung tâm bị lướt qua như một khối chữ.
- **Mức độ.** `HIGH`.
- **Hướng sửa.** Fold: danh tính + một ảnh tư liệu thật + hai dòng dẫn + một hành động chính.
  Câu hỏi trung tâm xuống mục riêng **CÂU HỎI DẪN ĐƯỜNG**, **nguyên văn từng ký tự**.

#### D. `HIGH` — Cấu trúc của chặng được chào mời như một thực đơn

- **Vấn đề.** Năm nút "phần của chặng" nằm ngang phía trên mỗi chặng, mỗi nút kèm số nhịp.
- **Vì sao khô.** Đó là mục lục của một chương mà người đọc *đang đứng bên trong*.
- **Ảnh hưởng tới việc học.** Cấu trúc được **đọc** thay vì được **cảm thấy**.
- **Mức độ.** `HIGH`.
- **Hướng sửa.** Bỏ hàng nút; tên phần đang đọc thành một dòng chú trên sợi chỉ; chỗ đổi loại nhịp
  vẽ thành một vạch cao hơn trên chính sợi chỉ.

#### E. `HIGH` — Không có neo thị giác ở lối vào chặng

- **Vấn đề.** 0 ảnh trên mọi tuyến trừ màn mở đầu; cỡ chữ lớn nhất trong fold của một chặng là 23px.
- **Vì sao khô.** Một trang lịch sử không có neo thị giác đọc như một trang tài liệu.
- **Mức độ.** `HIGH`.
- **Hướng sửa.** Xem mục 4 — chỗ bản yêu cầu và tình trạng bản quyền ảnh va nhau.

#### F. `HIGH` — Bước ngoặt không phá vỡ nhịp

- **Vấn đề.** `.station--turn` **không có một quy tắc CSS nào**; nó thừa hưởng đúng khuôn của một
  đoạn văn thường. Mốc thời gian của bước ngoặt được đặt ở `--step-0` (18px) — **nhỏ hơn** chữ
  thân bài bên cạnh nó (23px).
- **Vì sao khô.** Khoảnh khắc mà cả chặng tồn tại vì nó lại trông y hệt đoạn văn trước đó.
- **Ảnh hưởng tới việc học.** Không có "à, đây là lý do giai đoạn này quan trọng".
- **Mức độ.** `HIGH`.
- **Hướng sửa.** Bước ngoặt rộng hơn thước đọc, đặt trên một mặt nền riêng, mở bằng mốc in ở cỡ
  trưng bày, và có hai sợi hội tụ thành một.

#### G. `HIGH` — Không có nhịp SUY NGẪM, và ba hoạt động không được mời vào mạch hành trình

- **Vấn đề.** Bản yêu cầu nêu 8 phần cho mỗi chặng; phần thứ 7 — REFLECTION — **không tồn tại ở
  bất kỳ đâu**. Lời mời "sau chặng 2 → Đối sánh" và "sau chặng 5 → Tổng hợp" cũng không có.
- **Vì sao khô.** Chặng kết thúc bằng một nút sang chặng sau; không có chỗ nào để dừng lại.
- **Mức độ.** `HIGH`.
- **Hướng sửa.** Thêm nhịp **Suy ngẫm** ngay trước phần bàn giao, dựng từ chính hai vị trí
  trước/sau đã lưu của chặng; đặt lời mời hoạt động ở đó.

#### H. `HIGH` — Bốn màn không có bất kỳ liên kết nào

- **Vấn đề.** `#/doi-sanh`, `#/noi-ket`, `#/tong-hop`, `#/kiem-chung`: **0 thẻ `a`** trong toàn bộ
  `<main>`, và **0 nút hành động chính**. Màn tổng hợp — đích của hành trình — không đưa người học
  đi đâu cả.
- **Mức độ.** `HIGH`.
- **Hướng sửa.** Một khối "đi tiếp" dùng chung cho cả bốn: một dòng nói vừa làm gì, một hành động
  chính, tối đa một hành động phụ.

#### I. `HIGH` — Thứ tự trên điện thoại ngược với thứ tự bản yêu cầu nêu

- **Vấn đề.** Bản yêu cầu nêu rõ: chân dung → mốc → hook → bối cảnh → tương tác → bằng chứng →
  bàn giao. Thực tế khi xếp dọc: vị trí ảnh đứng **thứ 7 trên 7**, cột mốc đứng thứ 6.
- **Mức độ.** `HIGH`.
- **Hướng sửa.** Hai vỏ bọc dùng `display: contents` dưới 64rem để cả bảy phần thành con của một
  lưới, rồi sắp bằng `order` đúng thứ tự bản yêu cầu nêu.

#### J. `MEDIUM` — Tài liệu bị dồn xuống cuối chặng

- **Vấn đề.** Mọi trích dẫn nguyên văn được nối sau toàn bộ đoạn văn và bước ngoặt. Ở một chặng,
  bước ngoặt dẫn Q5 và Q6 nằm ở nhịp 3 còn Q5, Q6 nằm ở nhịp 14 và 15.
- **Vì sao khô.** Một tài liệu đọc cách khẳng định nó chống đỡ mười một màn hình là tài liệu không
  làm việc gì.
- **Mức độ.** `MEDIUM`.
- **Hướng sửa.** Trích dẫn đứng ngay sau bước ngoặt dẫn nó; trích dẫn không được bước ngoặt nào
  dẫn thì giữ nguyên vị trí cuối, theo thứ tự đã lưu.

#### K. `MEDIUM` — Nhãn trạng thái, số đếm và mã kiểm toán thường trực

- **Vấn đề.** 11 nhãn trong fold của màn chặng; 11 trên `#/noi-ket` (5 nút chặng, mỗi nút in sẵn
  "N cặp"). Vị trí trong năm chặng được nói **bốn lần cùng lúc** trên một màn. Mã như `C2-R01`
  hiện trần trên mặt đọc.
- **Mức độ.** `MEDIUM`.
- **Hướng sửa.** Một bộ đếm cho một câu hỏi; mã kiểm toán nhường chỗ cho tiêu đề rủi ro đọc được,
  mã giữ trong cây khả truy cập và trong bản ghi.

#### L. `MEDIUM` — Thang chữ trôi

- **Vấn đề.** Hai cỡ vi mô tuỳ tiện (`0.625rem`, `0.6875rem`) viết tay ở 20 chỗ; `h1` của chặng
  thừa hưởng `font-size: 2em` của trình duyệt.
- **Mức độ.** `MEDIUM`.
- **Hướng sửa.** Một token vi mô `--step--3`; đặt cỡ tường minh cho `h1`.

#### M. `MEDIUM` — Đỏ là màu của mọi trạng thái "đang bật"

- **Vấn đề.** `--son` được tệp token dành riêng cho bốn nghĩa (bước ngoặt, vị trí hiện tại, focus
  và hành động chính, sợi chỉ), nhưng mọi nút ở trạng thái được chọn đều đỏ. Trên màn đối sánh,
  một trục được chọn, một chặng được chọn và các đoạn sợi chỉ cùng đỏ một lúc.
- **Mức độ.** `MEDIUM`.
- **Hướng sửa.** Trạng thái được chọn chuyển sang màu chàm apparatus.

#### N. `MEDIUM` — Thanh dính che vùng focus khi chữ phóng to

- **Vấn đề.** `scroll-margin` của `:focus-visible` là hằng số `7rem`; thanh đầu trang cao 107px
  trên laptop, 112px trên điện thoại, cao hơn nữa ở cỡ chữ 200%.
- **Mức độ.** `MEDIUM` (WCAG 2.2 AA `focus-not-obscured`).
- **Hướng sửa.** Đo chiều cao thật, công bố thành `--chrome-h`.

#### O. `MEDIUM` — Hai công tắc tắt chuyển động không tương đương

- **Vấn đề.** Công tắc trong sản phẩm rút thời lượng còn 1ms nhưng **không đặt lại
  `animation-delay`**, nên một hoạt ảnh vào có `fill: both` vẫn giữ phần tử ở `opacity: 0` suốt
  thời gian trễ. Đúng thứ mà công tắc ấy sinh ra để loại bỏ.
- **Mức độ.** `MEDIUM`.
- **Hướng sửa.** Đặt lại cả `animation-delay` và `transition-delay` ở cả hai công tắc.

#### P. `LOW` — Chữ chạy rộng hơn thước đọc ở ba màn hoạt động

- **Vấn đề.** `.duo__note` và `.brief` đặt `78ch`, rộng hơn thước đọc học thuật 66ch — đoạn chữ
  rộng nhất trong sản phẩm là ghi chú xuất xứ, không phải phần đọc.
- **Mức độ.** `LOW`. **Hướng sửa.** Cắt về `--measure`.

#### Q. `LOW` — Mục lục không phải một landmark điều hướng

- **Vấn đề.** Hệ điều hướng duy nhất của sản phẩm là một `div[role=dialog]` chứa hai danh sách
  trần, không có `nav` nào.
- **Mức độ.** `LOW`. **Hướng sửa.** Đổi thân mục lục thành `nav` có tên.

---

## 2. PHASE 2 — PROJECT DESIGN DECISION

Toàn bộ mục 2 là `PROJECT DECISION`.

### 2.1 ONE-SENTENCE DESIGN DIRECTION

> Một phòng trưng bày tư liệu đọc được: mỗi chặng mở ra như một chương có số, có mốc thời gian
> in lớn và có tư liệu bên cạnh; bước ngoặt phá vỡ nhịp; và tại mỗi thời điểm chỉ có **một** thứ
> để nhìn, **một** việc để làm.

### 2.2 LEARNING JOURNEY

`Màn mở đầu` → `Câu hỏi dẫn đường` → `Tổng quan 5 chặng` → `Chặng 1…5`, mỗi chặng đi qua tám nhịp
**cảm thấy được chứ không in thành tám thẻ**:

| # | Nhịp | Nằm ở đâu trong sản phẩm |
|---|---|---|
| 1 | ORIENTATION | `CHẶNG 0N / 05`, cụm thời kỳ cỡ trưng bày, dải vị trí dưới thanh đầu trang |
| 2 | CONTEXT | các nhịp `Bối cảnh và trải nghiệm` trên sợi chỉ |
| 3 | EXPERIENCE | cùng nhóm nhịp trên, theo đúng đoạn trích đoạn in |
| 4 | TRANSFORMATION | các nhịp `Chuyển biến nhận thức` |
| 5 | TURNING POINT | nhịp `Bước ngoặt` — rộng hơn, nền riêng, mốc in cỡ trưng bày, hai sợi hội tụ |
| 6 | EVIDENCE | trích dẫn nguyên văn **đứng ngay sau bước ngoặt dẫn nó**, cộng kính lúp `Nguồn và trạng thái` |
| 7 | REFLECTION | nhịp **Suy ngẫm**: hai vị trí trước/sau của chính chặng, đặt cạnh nhau, và một câu hỏi không chấm điểm |
| 8 | BRIDGE | phần bàn giao, kèm câu hỏi mở đầu của chặng kế |

Sau chặng 2, 3 và 5, nhịp Suy ngẫm mời vào một hoạt động (mục 3.8). Cả ba hoạt động và bản ghi
kiểm chứng vẫn vào thẳng được bất cứ lúc nào từ mục lục.

### 2.3 PRIMARY NAVIGATION MODEL

**Một hệ duy nhất: mục lục mở theo yêu cầu.**

- `MỤC LỤC` là nút đầu tiên của thanh đầu trang, mở một `dialog` chứa một `nav` có tên, gồm **mọi**
  điểm đến: bản đồ hành trình, 5 chặng (kèm hai ranh giới dùng chung), 4 điểm đến sau chặng.
- Bên ngoài mục lục, khung sản phẩm **không còn** liên kết điều hướng nào. Cột bên đã bị xoá;
  thanh chuyển chặng cuối trang đã bị xoá.
- **Dải vị trí** dưới thanh đầu trang trả lời "tôi đang ở đâu": năm vạch + `Chặng 2 / 5 · <thời kỳ>`.
  **Không chứa liên kết, không nhận focus** → là chỉ báo, không phải hệ điều hướng thứ hai.
- Bên trong một chặng: **Trước/Tiếp** và các mốc nhịp trên sợi chỉ.
- "Đi tiếp đâu" do phần bàn giao trả lời ở cuối chặng, và do khối "đi tiếp" trả lời ở bốn màn còn lại.

**Vẫn còn 2 hệ trên màn chặng ở desktop** (thanh đầu trang + dải mốc nhịp). Dải mốc nhịp là bộ
điều khiển *bên trong* chặng, không phải hệ điều hướng giữa các màn; công cụ đo đếm nó như một hệ
và báo cáo giữ nguyên con số ấy thay vì định nghĩa lại cho vừa.

### 2.4 STAGE TEMPLATE

```
CHẶNG 02 / 05                          [vị trí tư liệu — đã điền hoặc ghi rõ đang bị chặn]

Thời kỳ từ giữa năm 1911               MỐC THỜI GIAN IN TRONG CHẶNG
đến cuối năm 1920                        1911-1917   1917   1919
Dần dần hình thành tư tưởng…             18-6-1919   7-1920   25 đến 30-12-1920

│ CÂU HỎI DẪN VÀO CHẶNG  [DIỄN GIẢI CỦA NHÓM]
│ Từ việc sống, làm việc…?
│ ⌕ Câu hỏi này của ai?

[Thử đoán trước khi đọc · không bắt buộc]   [⌕ Nguồn và trạng thái]   [Đọc liền mạch]
```

**Chữ lớn là cụm thời kỳ *đúng như trích đoạn in ra*, không phải một khoảng số nén lại.**
Bản yêu cầu gợi ý `1911 — 1920`; không dùng, vì trích đoạn in *"từ giữa năm 1911 đến cuối năm
1920"* và rút `giữa năm 1911` thành `1911` là kiểu nâng cấp độ chính xác mà `C2-R01`, `C2-R02`,
`C2-R03` được lập ra để ngăn. Cùng lý do ấy, mốc ở bước ngoặt in nguyên `25 đến 30-12-1920`, không
rút thành `1920`.

### 2.5 IMAGE STRATEGY — và một mệnh lệnh **không** thực hiện được

Bản yêu cầu nêu: *"EVERY STAGE MUST HAVE A PRIMARY AUTHENTIC IMAGE OF HỒ CHÍ MINH."*

**Mệnh lệnh này không được thực hiện, và không nên được thực hiện bằng tư liệu hiện có.**

> ⚠️ **ĐÍNH CHÍNH 18-9-2026 — đọc trước phần 2.5.** Toàn bộ các câu ở thì hiện tại trong mục này
> nói về trạng thái ảnh **đã bị đợt Historical Image Integration lật lại**, và bản gốc được giữ
> nguyên bên dưới vì lịch sử đính chính là một phần của hồ sơ. Trạng thái thật, đọc thẳng từ
> `web/src/data/figures.ts` ngày 18-9-2026:
>
> - **13 vị trí** được khai báo, không phải 11: một ở màn mở đầu, năm vị trí **chính** (mỗi chặng
>   một) và **bảy** vị trí **bổ trợ** — chặng 3 và chặng 5 mỗi chặng có hai.
> - **8 đã điền, 5 còn trống**, không phải 4/7 và không phải 1/10. Năm ô còn trống là `FS-open`,
>   `FS-ky-1`, `FS-ky-2`, `FS-ky-4`, `FS-ky-4-b`.
> - **`FS-open` KHÔNG còn chứa tấm ảnh Marseille.** Tấm `btv1b9054078w` đã chuyển sang ô ảnh chính
>   của **chặng 3** (`FS-ky-3`) theo phán quyết `SC-24`, căn cứ duy nhất là niên đại 26-12-1921 nằm
>   trong khoảng của chặng. Màn mở đầu nay **trống nhưng vẫn được khai báo**.
> - Câu “**một** bức ảnh đã đủ căn cứ” và “vẫn là ảnh duy nhất đủ căn cứ” **không còn đúng**: sản
>   phẩm mang **tám** tài liệu, từ **hai** cơ quan giữ hiện vật (BnF và Humazur).
> - “Năm vị trí chính vẫn trống” **không còn đúng**: `FS-ky-3` và `FS-ky-5` đã điền.
> - Trục quyền **không còn là một trục**: nó đã được tách thành bốn trường riêng cộng một quyết
>   định `reuse` (`USE` 4 · `USE WITH CAUTION` 4). Bảng “sáu trục” ở mục 4.2 vì thế cũng đã cũ.
>
> **Không tài liệu nào trong tám tài liệu ấy đã được người thật xác thực** — cả tám vẫn mang
> `NEED VERIFICATION`. Xem `HISTORICAL_IMAGE_INTEGRATION_REPORT.md` và
> `FINAL_SUBMISSION_CONSISTENCY_AUDIT.md`.


- Tính tới hôm nay, **một** bức ảnh đã đủ căn cứ trên cả sáu trục tách rời: bản ghi BnF Gallica
  `btv1b9054078w`, Agence Meurisse. Ảnh này ở **màn mở đầu**.
- Tra cứu SRU trên Gallica cho thấy loạt ảnh Đại hội Marseille chỉ có **đúng một** tấm chụp đại
  biểu Đông Dương; các bản kẽm còn lại là người khác.
- Sản phẩm khai báo **11 vị trí**: 1 ở màn mở đầu, 5 vị trí **chính** (mỗi chặng một), 5 vị trí
  **bổ trợ** (mỗi chặng một).
  > **CẬP NHẬT 17-9-2026, sau đợt tìm tư liệu lần ba.** Câu này trước ghi “**1 đã điền, 10 còn bị
  > chặn**” — đúng khi viết. Nay là **4 đã điền, 7 còn bị chặn**: thêm ảnh Đại hội Tua
  > (`FS-ky-2-b`), trang báo L’Humanité 2-8-1919 (`FS-ky-3-b`) và bản in Tuyên ngôn Độc lập 1945
  > (`FS-ky-5-b`), tất cả do BnF giữ. **Năm vị trí chính vẫn trống** — không có thêm ảnh chân dung
  > nào đủ căn cứ. Chi tiết ở `docs/08_Image_Source_Register_TEMPLATE.md` và
  > `docs/07_AI_Prompt_Log_Images3_2026-09-17.md`.
- Mười vị trí còn lại hiển thị đúng trạng thái bị chặn kèm lý do — theo `AGENTS.md` §4. *(Đính chính 18-9-2026: nay là **năm** vị trí còn trống, không phải mười. Nguyên tắc — vị trí trống phải hiện trạng thái bị chặn kèm lý do — không đổi, và một điểm được làm rõ trong đợt rà soát này: quy tắc ấy áp dụng cho các ô **chính**; một ô **bổ trợ** còn trống thì không hiện gì trong mạch đọc mà chỉ hiện ở sổ trên `#/kiem-chung`, đúng như `figures.ts` mô tả.)*
  Trên một chặng, hai vị trí đang bị chặn gộp thành **một** ghi chú nêu tên cả hai, để không lặp
  cùng một cờ hai lần trên một màn.
- **Không** lấp bằng ảnh không liên quan. **Không** tạo, mô phỏng, tô màu, phục dựng hay làm
  chuyển động chân dung bằng AI.

**Thay thế cho ảnh, ở nơi chưa có ảnh:** cột **mốc thời gian in trong chặng**, đặt lớn, dùng phông
marker — chính là thứ bản yêu cầu gọi tên trong phần hướng thị giác ("large historical dates").
Mọi mốc cùng một cỡ: nhấn mạnh một mốc hơn mốc khác sẽ là sản phẩm tự quyết định mốc nào quan
trọng hơn, một khẳng định mà trích đoạn không đưa ra.

### 2.6 MOTION STRATEGY

Xem mục 5 để biết chi tiết từng hoạt ảnh và ràng buộc.

### 2.7 DESIGN TOKENS

Giữ bảng màu giấy/mực và ba phông đang dùng — chúng được chọn vì **bộ dấu tiếng Việt**.
Thay đổi trong đợt này:

| Token | Thay đổi | Lý do |
|---|---|---|
| `--step--3: 0.6875rem` | **mới** | gộp hai cỡ vi mô tuỳ tiện viết tay ở 20 chỗ thành một |
| `--chrome-h` | **mới**, đặt bằng JS | chiều cao thật của thanh dính, để `scroll-margin` của focus không còn là hằng số sai ở 2/3 cỡ màn |
| `--son` | ghi chú sửa lại, phạm vi thu hẹp | "chặng hiện tại trong cột bên" → "vị trí hiện tại"; mọi trạng thái *được chọn* chuyển sang `--cham` |

**Năm vai của chữ:** DISPLAY `--step-4`/`--step-5` · EDITORIAL SERIF `--step-1` · BODY `--step-0` ·
SANS UI `--step--1` · SOURCE `--step--2`, cộng một cỡ dấu vi mô `--step--3`.
Ngoài hai con số bên trong SVG của hai sơ đồ, **không còn `font-size` viết tay nào** trong toàn bộ CSS.

---

## 3. PHASE 3 — REDESIGN (đã triển khai)

Theo đúng thứ tự bản yêu cầu đặt ra.

### 3.1 Điều hướng toàn cục

- **Mới** `web/src/components/menu.ts` — một `dialog` chứa một `nav` có tên, giữ mọi điểm đến;
  bẫy Tab, `Escape` đóng, bấm nền mờ đóng, trả focus về nút đã mở, `aria-current` đánh dấu vị trí.
- **Xoá** `web/src/components/rail.ts` và toàn bộ CSS của nó (5 878 byte trong `layout.css`,
  cộng một mục riêng trong `experience.css`).
- **Xoá** thanh chuyển chặng cuối trang (`pager`) — hệ di chuyển thứ ba trên màn chặng, mà liên kết
  tiến của nó lặp lại đúng việc phần bàn giao đã làm, sớm hơn một màn và không kèm lý do.
- **Mới** `web/src/components/journeybar.ts` — dải vị trí, không liên kết, không focus.
- Thanh đầu trang chuyển từ `flex-wrap` sang **lưới hai hàng tường minh**.
- Mục lục **tự đóng khi tuyến đổi**, kể cả khi đổi do nút Back của trình duyệt.

### 3.2 Màn mở đầu

Danh tính → tiêu đề trưng bày → **hai dòng** dẫn → **một** hành động chính + **một** phụ, và
**một ảnh tư liệu thật** chiếm nửa phải. Câu hỏi trung tâm sang mục **CÂU HỎI DẪN ĐƯỜNG**,
**nguyên văn từng ký tự**. **511 từ → 117 từ** trong fold ở 1440px.

### 3.3 Vỏ của chặng

`CHẶNG 02 / 05` · cụm thời kỳ cỡ trưng bày · vế còn lại của tiêu đề nhỏ hơn một bậc.
`h1` mang **đúng** tiêu đề chính thức: hai vế cộng dấu hai chấm ghép lại bằng đúng chuỗi đã lưu,
không nhân bản vào một bản sao ẩn. Cột phải: vị trí tư liệu, rồi mốc thời gian in trong chặng.

### 3.4 Hình ảnh

Xem mục 2.5 và mục 4.

### 3.5 Dòng thời gian và bước ngoặt

- Sợi chỉ giữ hình học đã có (ranh giới cuối 1920 và đầu 1941 vẽ **chồng lấn**, theo `C2-R01/R02/R03`).
- **Vạch cao** ở mỗi chỗ loại nhịp đổi — lấy từ hai nhịp liền nhau, nên một chặng quay lại phần
  chuyển biến sau bước ngoặt sẽ có vạch ở **mọi** chỗ đổi thật, không chỉ chỗ đầu tiên.
- **Bước ngoặt phá vỡ nhịp**: rộng hơn thước đọc (`min(56rem, 100%)`), nền `--paper-sunk`, một
  đường đỏ 2px phía trên, mốc in ở `--step-3`, và **hai sợi hội tụ thành một** — phần thân sau
  điểm gặp chỉ được vẽ khi người học đã vượt qua.

### 3.6 Nội dung chặng

- Hàng 5 nút "phần của chặng" bị **bỏ**; thay bằng dòng chú `ĐANG ĐỌC <tên phần>` trên sợi chỉ.
- **Bỏ số thứ tự phần.** `phần N / M` chạy **ngược** ở bốn trong năm chặng, vì trích đoạn xen kẽ
  đoạn chuyển biến với bước ngoặt: caption hiện `phần 2 / 5`, rồi `phần 3 / 5`, rồi `phần 2 / 5`.
  Một con số chạy ngược không phải vị trí, nó là mâu thuẫn — và nó là tín hiệu cấu trúc duy nhất
  còn lại sau khi bỏ hàng nút. Tên phần thì luôn đúng.
- **Trích dẫn đứng cạnh bước ngoặt dẫn nó**, không dồn xuống cuối chặng.
- Số đếm trên năm nút chọn chặng ở `#/noi-ket` rút còn **một** số, cho chặng đang chọn.

### 3.7 Chuyển cảnh

Lối vào chương lắng xuống một lần khi tới chặng: số chương → tiêu đề → neo tư liệu.
Không scroll hijack; không hoạt ảnh nào ở các nhịp sau lối vào.

### 3.8 Suy ngẫm và ba hoạt động

**Mới.** Nhịp **Suy ngẫm** xuất hiện ngay trước phần bàn giao, ở cùng thời điểm:

- hai vị trí của chính chặng — vị trí trích đoạn **mở** chặng (trước bước ngoặt đầu) và vị trí
  trích đoạn **khép** chặng (sau bước ngoặt cuối) — đặt cạnh nhau, mỗi bên kèm mốc in của nó;
- một câu hỏi: *"Giữa hai vị trí trên, điều gì đã thay đổi — và trích đoạn đặt sự thay đổi ấy ở đâu?"*;
- một dòng nói rõ: **không chấm điểm, không có ô trả lời, sản phẩm không ghi nhận rằng bạn đã hiểu**.

Câu tóm tắt bước ngoặt của nhóm **không** in ở đây — nó đã nằm trong bản ghi bên lề và chỉ hiện ra
khi người học tự vượt qua bước ngoặt. Ở đây chỉ có câu hỏi.

Lời mời hoạt động, đặt trong nhịp Suy ngẫm:

| Sau chặng | Lời mời | Đi tới |
|---|---|---|
| 2 | "Bạn vừa đi qua hai chặng đầu tiên. Cùng một câu hỏi, đặt cho cả hai, sẽ cho thấy điều gì?" | `Đối sánh hai chặng` → `#/doi-sanh/ky-1/ky-2` |
| 3 | "Ba chặng đã đi qua đều gắn một việc đã làm với một nhận thức." | `Nối trải nghiệm với nhận thức` → `#/noi-ket` |
| 5 | "Bây giờ hãy nhìn lại toàn bộ hành trình." | `Tổng hợp 5 chặng` → `#/tong-hop` |

Điểm sau chặng 2 và sau chặng 5 là hai điểm bản yêu cầu nêu đích danh. Điểm sau chặng 3 là
`PROJECT DECISION`: đó là chỗ sớm nhất mà trích đoạn đã đặt đủ cặp trải nghiệm–nhận thức để bài
tập có gì làm việc.

Tuyến `#/doi-sanh` nay nhận một cặp chặng trong địa chỉ (`#/doi-sanh/ky-1/ky-2`), nên lời mời đưa
người học tới đúng hai chặng vừa đi qua. Id không hợp lệ bị bỏ qua, không được tin.

### 3.9 Ngăn nguồn, và khối "đi tiếp"

- Kính lúp bằng chứng (`lensTrigger`) là ngăn nguồn mà bản yêu cầu mô tả: một nút nhẹ mở ra một
  bảng chứa mã, nguồn, phần, trang/tập khi có, và trạng thái xác minh.
- **Mới** `web/src/components/whatnext.ts` — khối "đi tiếp" dùng chung cho `#/doi-sanh`,
  `#/noi-ket`, `#/tong-hop` và `#/kiem-chung`, bốn màn trước đây **không có một liên kết nào**
  trong `<main>`. Một dòng nói vừa làm gì, một hành động chính, tối đa một phụ.
  Hành động chính trỏ tới chặng chưa mở tiếp theo — hoặc tới tổng quan khi cả năm đã mở.
  "Đã mở" ở đây là một dấu trang, không phải một khẳng định về việc hiểu.

---

## 4. Ảnh: đã thêm gì, nguồn nào, trạng thái nào

> ⚠️ **ĐÍNH CHÍNH 18-9-2026 — đọc trước toàn bộ phần 4.** Mọi bảng và mọi câu ở thì hiện tại
> trong phần này mô tả trạng thái ngày 17-9-2026 và **đã bị lật lại**. Cụ thể: mục 4.1 xếp
> `btv1b9054078w` vào `FS-open` — tấm ấy **nay ở `FS-ky-3`**, và `FS-open` **trống**; mục 4.2
> trình bày quyền như **một** trục, nay là **bốn** trường riêng cộng một quyết định `reuse`; mục
> 4.3 nói `FS-open` “đã điền và đang hiển thị ở màn mở đầu”, điều **không còn đúng**. Bản gốc được
> giữ nguyên, không sửa chữ nào, vì nó ghi đúng trạng thái tại thời điểm viết và vì việc dự án đã
> đổi ý là thứ phải nhìn thấy được. Trạng thái hiện hành: **13 vị trí · 8 đã điền · 5 còn trống**,
> tám tài liệu từ hai cơ quan giữ hiện vật, cả tám vẫn `NEED VERIFICATION`.


### 4.1 Ảnh đã thêm trong toàn bộ dự án

| Vị trí | Ảnh | Nguồn | Trạng thái |
|---|---|---|---|
| `FS-open` (màn mở đầu) | Ảnh báo chí trên kính ảnh, Agence Meurisse | BnF, dép. Estampes et photographie, EI-13 (2702) · `gallica.bnf.fr/ark:/12148/btv1b9054078w` | `NEED VERIFICATION` |

**Đợt thiết kế lại này không thêm ảnh mới nào.** Ảnh trên được tích hợp ở đợt trước và vẫn là ảnh
duy nhất đủ căn cứ.

Ghi nguồn bắt buộc, hiển thị cùng ảnh chứ không giấu sau một nút:
`Source gallica.bnf.fr / Bibliothèque nationale de France`.

### 4.2 Sáu trục kiểm, giữ tách rời

Bản yêu cầu buộc giữ **riêng** sáu trục. Trước đợt này, ngày và sự kiện nằm lẫn trong `caption`,
địa điểm không có trục nào, đóng gói ngoại tuyến chỉ có trong tệp đăng ký ngoài mã. Nay mỗi trục
là một trường riêng, hiển thị thành một dòng riêng trong kính lúp, và có kiểm thử đơn vị buộc
chúng không được sao chép lẫn nhau:

| Trục | Trạng thái của `FS-open` |
|---|---|
| Nhận diện người trong ảnh | BnF ghi "Nguyen Aïn Nuä'C délégué indochinois"; chuỗi nhận diện **chưa** được nguồn học thuật đã phê duyệt xác nhận độc lập |
| Sự kiện và niên đại | Bản ghi gắn với Đại hội Marseille, niên đại 1921, mốc 26-12-1921 — **ngoài phạm vi trích đoạn**, và **chưa** xác lập để gắn vào chặng nào |
| Địa điểm | **Chưa xác lập.** Bản ghi không ghi địa điểm chụp |
| Nguồn ảnh | BnF Gallica, mở được trang bản ghi để kiểm |
| Điều kiện sử dụng | `dc:rights` "domaine public"; điều kiện Gallica cho dùng lại phi thương mại, kèm ghi nguồn |
| Đóng gói ngoại tuyến | **Đã đóng gói**, `npm run check:offline` kiểm ảnh giải mã được với `naturalWidth` khác 0 từ `file://` |

### 4.3 Một lỗi trung thực đã sửa

Màn `#/kiem-chung` — mặt duy nhất có nhiệm vụ nói đúng trạng thái bằng chứng — **báo cáo sai**.
Nó in "Hiện chưa vị trí nào được điền" và gắn `NOT YET EVIDENCED` cho **mọi** hàng, kể cả `FS-open`,
trong khi `FS-open` đã điền và đang hiển thị ở màn mở đầu với trạng thái `NEED VERIFICATION`.

Nguyên nhân: trạng thái tổng là một hằng số viết tay; khi bức ảnh đầu tiên đủ căn cứ, hằng số ấy
không ai dời. Theo `AGENTS.md` đây là hướng sai **không được** để lại. Đã sửa: mọi con số và mọi
trạng thái trên màn ấy nay **suy ra từ dữ liệu**, và hai kiểm thử đơn vị mới buộc bản ghi không
thể lệch khỏi dữ liệu theo cả hai chiều.

### 4.4 Vì sao mỗi vị trí ảnh tồn tại

Mỗi vị trí nay trả lời "vì sao ảnh này ở đây" chứ không phải "ảnh này đặt ở đâu". Trước đợt này
cả năm vị trí chặng dùng chung một câu mẫu — `Tư liệu cho thời kỳ …` — đổi mỗi cụm thời kỳ.
Có kiểm thử đơn vị cấm câu mẫu ấy quay lại và cấm hai vị trí dùng chung một mô tả.

---

## 5. Hoạt ảnh đã triển khai

| Hoạt ảnh | Nó giúp người học nhận ra điều gì | Ràng buộc |
|---|---|---|
| Sợi chỉ tự vẽ ở màn mở đầu | hành trình có hướng và có điểm bắt đầu | vẽ **một lần**, kết thúc ở trạng thái đã vẽ xong |
| Lối vào chương lắng xuống (số chương → tiêu đề → neo) | thứ tự tiếp nhận một chương mới | 420ms, so le tối đa 120ms, chạy **một lần**, chỉ ở lối vào |
| Vệt đã đi trên sợi chỉ dài ra theo bước | tiến trình bên trong chặng | chuyển tiếp `stroke-dasharray`, theo chỉ số nhịp |
| **Hai sợi hội tụ ở bước ngoặt** | hai vị trí của trích đoạn gặp nhau ở đúng điểm mà bước ngoặt đánh dấu | phần thân sau điểm gặp **chỉ** được vẽ khi người học tự vượt qua; tắt chuyển động thì nó đơn giản là đã ở đó |
| Hai vế bước ngoặt trượt vào khi vượt qua | *điều gì đã thay đổi* | không tự chạy; chỉ khi người học tự vượt qua |
| Vạch cao trên sợi chỉ ở chỗ đổi loại nhịp | một phần của chặng vừa kết thúc | tĩnh, không phải hoạt ảnh |

**Không có:** nảy, trôi nổi, xoay ngẫu nhiên, phóng to quá mức, chiếm quyền cuộn, hoạt ảnh lặp trang trí.

**Quy tắc chân dung, giữ tuyệt đối:** không hoạt ảnh nào tác động lên *chủ thể* trong ảnh. Chỉ
khung, lớp nền, chú thích và bố cục quanh ảnh được phép chuyển động.

**`prefers-reduced-motion`:** toàn bộ quy tắc chuyển động nằm *bên trong*
`@media (prefers-reduced-motion: no-preference)`; khi tắt, mọi thứ đã ở trạng thái cuối,
`opacity: 1`. **Không nội dung nào chỉ lộ ra nhờ hoạt ảnh**, và có kiểm thử cho điều đó.
Công tắc trong sản phẩm nay đặt lại cả `animation-delay` và `transition-delay`, nên hai công tắc
hành xử như nhau — trước đợt này công tắc trong sản phẩm vẫn để phần tử ở `opacity: 0` suốt thời
gian trễ.

---

## 6. Trải nghiệm trên điện thoại

Bản yêu cầu nêu một thứ tự bắt buộc cho màn chặng ở khung hẹp. Trước và sau:

| Vị trí | Bản yêu cầu | Trước | Sau |
|---|---|---|---|
| 1 | chân dung | số chương | số chương |
| 2 | mốc thời gian | tiêu đề | **vị trí tư liệu** |
| 3 | hook | vế claim | **mốc thời gian** |
| 4 | bối cảnh | câu hỏi dẫn vào | tiêu đề + vế claim |
| 5 | tương tác | thử đoán | câu hỏi dẫn vào |
| 6 | bằng chứng | nguồn và trạng thái | thử đoán |
| 7 | bàn giao | **mốc thời gian** | nguồn và trạng thái |
| 8 | — | **vị trí tư liệu** | — |

Cách làm: hai vỏ bọc dùng `display: contents` dưới 64rem, nên cả bảy phần trở thành con của một
lưới và `order` sắp được đúng thứ tự. Hai vỏ bọc không mang ngữ nghĩa nào nên không mất gì trong
cây khả truy cập; thứ tự DOM vẫn đọc đúng nếu thuộc tính không được hỗ trợ.

Các thay đổi khác dành riêng cho khung hẹp:

- thanh đầu trang **2 hàng** thay vì 3: công cụ và dải vị trí dùng chung hàng thứ hai, nút trình bày
  bỏ nhãn chữ và giữ tên khả truy cập. Đo được **112px ≈ 13%** chiều cao màn hình;
- dải vị trí bỏ phần thời kỳ (tiêu đề chặng ngay bên dưới đã nói), giữ `Chặng N / 5`;
- cột mốc thời gian chạy ngang, cuộn trong chính nó thay vì kéo dài trang; *(đính chính 18-9-2026: cột mốc thời gian ở lối vào chặng **đã bị gỡ** trong đợt hành trình không gian — bản khắc thay chỗ nó, và CSS của cột cũ đã xoá.)*
- mũi tên giữa hai vị trí ở nhịp Suy ngẫm quay xuống, vì hai vị trí nay đọc theo chiều dọc;
- cột bên biến mất hoàn toàn; không còn bất kỳ sidebar nhiều tầng thường trực nào.

---

## 7. PHASE 4 — Kiểm thử đã chạy

Chạy ngày 17-9-2026 trên máy đang phát triển, Chrome.

| Hạng mục | Cách chạy | Kết quả |
|---|---|---|
| Luồng đầy đủ × 3 khung màn | Playwright, 3 project (1440 / 768 / 375), 59 kiểm thử mỗi project | **177 / 177 đạt** *(đính chính 18-9-2026: con số của ngày 17-9. Bộ kiểm thử nay là **76 spec × 3 khung = 228**, và bộ đơn vị là **113**.)* |
| Ràng buộc nội dung | Vitest | **67 / 67 đạt** |
| Bàn phím | các bộ `keyboard*.spec.ts`; 25 điểm dừng Tab trên màn chặng ở laptop và mobile | đạt; không điểm dừng nào bị thanh dính che |
| Chữ 200% | `tools/ux-audit.mjs`, `html { font-size: 200% }`, 11 tuyến × 390px | **không tràn ngang, không cắt chữ** |
| Tương phản | `tools/ux-audit.mjs`, đo thật 36 lớp chữ, nền sáng và nền tối | **mọi mẫu ≥ ngưỡng** |
| Giảm chuyển động | `prefers-reduced-motion: reduce` | sợi chỉ đã vẽ sẵn; lối vào chương `animation-name: none`, `opacity: 1` |
| Ngoại tuyến | `npm run check:offline` trên tệp `file://` | 11/11 tuyến dựng được, **0 yêu cầu mạng, 0 lỗi**, ảnh giải mã được, 27 phông từ bundle |
| Chế độ trình bày | trong kiểm tra ngoại tuyến (phím `P`) | mở được |
| Mật độ giao diện | `tools/audit-density.mjs`, 7 tuyến × 3 khung, cả hai bản | xem mục 8 |

### 7.1 Kiểm thử mới thêm trong đợt này

- dải vị trí gọi tên **từng** địa chỉ trong sáu địa chỉ, và không chứa liên kết nào;
- mục lục mở/đóng bằng bàn phím và trả focus về nút đã mở;
- thanh dính không che bất kỳ điểm dừng Tab nào, ở hai khung màn;
- lối vào chương chạy **một lần**, không lặp, trễ ≤ 0,2s, và tắt hẳn khi giảm chuyển động;
- caption phần chặng **không bao giờ** in một con số vị trí, ở mọi nhịp của cả chặng;
- bản ghi ảnh tư liệu **suy ra từ dữ liệu** theo cả hai chiều;
- sáu trục kiểm của một bức ảnh là sáu trường riêng và không sao chép lẫn nhau;
- mỗi vị trí ảnh có mô tả vai trò riêng, không dùng lại câu mẫu cũ;
- mỗi chặng có một vị trí chính và một vị trí bổ trợ, cả hai nêu tên trên màn. *(Đính chính 18-9-2026: chặng 3 và chặng 5 nay mỗi chặng có **hai** vị trí bổ trợ; phép thử còn lại khoá “một vị trí **chính** mỗi chặng”, không khoá số vị trí bổ trợ.)*

### 7.2 Hai lỗi thật, tìm ra nhờ kiểm tra chứ không nhờ đọc lại

**Bản ngoại tuyến hỏng toàn bộ.** Mọi tuyến chết với `Unexpected token '<'`.
`tools/bundle-offline.mjs` nhúng script bằng `String.prototype.replace` với chuỗi thay thế; trình
rút gọn đặt tên một biến cấp module là `$`, nên `isMenuOpen()` biên dịch thành
`return!!($&&!$.hidden)`. Chuỗi `$&` trong *chuỗi thay thế* có nghĩa "chèn lại đoạn vừa khớp" — thẻ
`<script src=…>` bị chèn vào giữa bundle và phần còn lại bị cắt: 181 KB còn 58 KB. Đã sửa bằng
**hàm** thay thế, nên không định danh nào trong tương lai kích hoạt lại được.

**Dải vị trí trống trên 4 trong 8 màn.** Khoá theo tên tuyến của router thay vì theo địa chỉ; hai
thứ này khác nhau (`#/noi-ket` có tên tuyến là `connect`). Phát hiện nhờ chụp màn hình, không nhờ
kiểm thử — nên đã bổ sung kiểm thử đi qua **từng** địa chỉ.

### 7.3 Những gì **chưa** được kiểm tra

- **Không có người dùng thật nào được kiểm thử.** Không có dữ liệu khảo sát, không có phản hồi
  giảng viên, không có kết quả Showcase. `docs/09_User_Test_Plan_TEMPLATE.md` vẫn là
  `TEMPLATE - NOT EVIDENCE`.
- Chỉ chạy trên Chrome. Chưa kiểm Safari, Firefox, iOS, Android thật.
- Chưa kiểm bằng trình đọc màn hình thật (NVDA/VoiceOver). Mọi khẳng định về khả năng truy cập ở
  trên là khẳng định **về mã và về hình học**, không phải về trải nghiệm đã quan sát.
- Chưa đối chiếu với `AGENTS_v2.md` / `HCM202_PROJECT_CONTEXT_v2.0.md` — hai tệp này không tồn tại.

---

## 8. Kiến trúc trước / sau

Mọi con số dưới đây đo bằng **cùng một phiên bản** `tools/audit-density.mjs` trên cả hai bản.

### 8.1 Hệ điều hướng cùng hiện trong fold

| Tuyến | desktop | tablet | mobile |
|---|---|---|---|
| `#/` | 1 → 1 | 1 → 1 | 1 → 1 |
| `#/hanh-trinh` | 1 → 1 | 1 → 1 | 1 → 1 |
| `#/chang/ky-2` | **6 → 2** | **6 → 1** | **4 → 1** |
| `#/doi-sanh` | 4 → 2 | 4 → 2 | 4 → 2 |
| `#/noi-ket` | 4 → 2 | 4 → 2 | 4 → 2 |
| `#/tong-hop` | 3 → 1 | 3 → 1 | 3 → 1 |
| `#/kiem-chung` | 4 → 2 | 4 → 2 | 4 → 2 |

### 8.2 Nút khung so với nút nội dung, trong fold

| | trước | sau |
|---|---|---|
| Nút khung, mọi tuyến sau màn mở đầu | **14** | **5** |
| `#/doi-sanh` mobile | 14 : 2 | 5 : 4 |
| `#/tong-hop` mobile | 14 : 2 | 5 : 5 |
| `#/kiem-chung` mobile | 14 : 2 | 5 : 5 |
| `#/chang/ky-2` desktop | 14 : 22 | 5 : 16 |

### 8.3 Nhãn trạng thái, cờ xuất xứ và bộ đếm thường trực trong fold

| Tuyến | trước | sau | thành phần còn lại |
|---|---|---|---|
| `#/chang/ky-2` desktop | **11** | **4** | 2 cờ xuất xứ · `CHẶNG 02 / 05` · `Chặng 2 / 5` |
| `#/chang/ky-2` tablet | 10 | 4 | như trên |
| `#/chang/ky-2` mobile | 7 | 4 | như trên |
| `#/noi-ket` desktop | **11** | **3** | 1 cờ xuất xứ · `Chặng 2 / 5` · trạng thái hoạt động |
| `#/doi-sanh` desktop | 5 | 2 | 1 cờ xuất xứ · `Chặng 2 / 5` |
| `#/tong-hop` desktop | 4 | 1 | `Chặng 2 / 5` |
| `#/kiem-chung` desktop | 4 | 1 | `Chặng 2 / 5` |

**Nói cho đúng:** bốn nhãn còn lại trên một màn chặng **không** có cái nào là nhãn tuỳ ý. Hai cờ
xuất xứ là `AGENTS.md` bắt buộc (`DIỄN GIẢI CỦA NHÓM` và `CHƯA CÓ NGUỒN`); `CHẶNG 02 / 05` là thứ
chính bản yêu cầu đặt tên trong mẫu lối vào chặng; `Chặng 2 / 5` là chỉ báo vị trí duy nhất.
Những nhãn đã biến mất đều là nhãn tuỳ ý: 4 số lượng trên nút phần chặng, 5 số cặp trên nút chọn
chặng, 4 nhãn trong danh sách điểm đến thường trực, và bản sao thứ tư của vị trí trong năm chặng.

### 8.4 Từ trong fold, màn mở đầu

| | desktop | tablet | mobile |
|---|---|---|---|
| trước | **511** | 391 | 155 |
| sau | **117** | 80 | 80 |

### 8.5 Cỡ chữ khác nhau trong fold

Giảm trên 5 trong 7 tuyến; **tăng** trên màn chặng (5 → 6) vì chữ trưng bày được **cố ý** đưa vào
lối vào chương — trước đó màn chặng hoàn toàn không có chữ trưng bày, cỡ lớn nhất chỉ 23px.
Điều đạt được: mọi cỡ chữ nay lấy từ thang token.

### 8.6 Ảnh trong fold

| | trước | sau |
|---|---|---|
| `#/` desktop / tablet / mobile | 1 / 1 / 0 | **1 / 1 / 1** *(đính chính 18-9-2026: nay là **0 / 0 / 0** — màn mở đầu không còn ảnh tư liệu nào ở bất kỳ khổ nào, vì `FS-open` đã trống; một phép thử trình duyệt khoá đúng điều đó.)* |
| mọi tuyến khác | 0 | 0 |

> **Đính chính.** Bản đầu của công cụ đo đếm ảnh trên **toàn trang** trong khi cột được gắn nhãn
> là "trong fold". Đã sửa; số ở bảng này là số trong fold trên cả hai bản.

---

## 9. Sử dụng `ui-ux-pro-max`

### 9.1 Phương pháp đã dùng

- Đọc `SKILL.md` đầy đủ.
- Chạy CLI thật: `python .claude/skills/ui-ux-pro-max/scripts/search.py "<truy vấn>" --domain ux`.
- **Một truy vấn — một mục đích.** Kết quả lệch chủ đề thì thử lại **một lần** với truy vấn hẹp
  hơn; vẫn lệch thì **loại bỏ** và ghi rõ "không tìm được kết quả phù hợp".

### 9.2 Bảng: vấn đề → căn cứ → thay đổi → cách kiểm tra

| # | Vấn đề | Truy vấn và kết quả | Thay đổi | Cách kiểm tra |
|---|---|---|---|---|
| 1 | Sáu hệ điều hướng (A, B) | `"single primary navigation model one system"` → **lệch**. Hẹp hơn: `"navigation hierarchy overloaded nav"` → **vẫn lệch**. **Không có kết quả CLI phù hợp.** Căn cứ là **hướng dẫn chung của SKILL.md**, bảng Rule Categories mục 9, anti-pattern `Overloaded nav` | Một mục lục duy nhất; xoá cột bên và thanh chuyển chặng; dải vị trí không chứa liên kết | `audit-density.mjs`: 6 → 2 / 6 → 1 / 4 → 1. `app.spec.ts`: `nav.rail` có 0 phần tử; dải vị trí có 0 nút/liên kết |
| 2 | Vị trí hiện tại phải được chỉ ra (A) | `"current location indicator active state"` → **đúng chủ đề**: `Active State` — *"Current page/section should be visually indicated"* | `aria-current` trong mục lục; dải vị trí đánh dấu bằng vạch đậm **và** bằng chữ, không chỉ bằng màu | `app.spec.ts` + `guidance.spec.ts`: đúng một mục được đánh dấu; dải vị trí gọi tên **từng** địa chỉ trong 6 địa chỉ |
| 3 | Thanh dính che vùng focus (N) | `"sticky header obscuring content offset"` → **đúng chủ đề**: `Sticky Navigation` — *"Fixed nav should not obscure content"*, Do: *"Add padding-top to body equal to nav height"* | `ResizeObserver` đo chiều cao thật → `--chrome-h`; `scroll-margin` của `:focus-visible` = `calc(var(--chrome-h) + var(--space-s))` | Kiểm thử mới: Tab 25 lần ở laptop và mobile, mỗi điểm dừng phải nằm dưới mép dưới của thanh |
| 4 | Nhãn dài bị cắt trên dải vị trí | Không chạy truy vấn riêng. **Hướng dẫn chung của SKILL.md** §5 `compact-label-overflow`, §6 `truncation-strategy` — ưu tiên xuống dòng hơn cắt chữ | Dải vị trí tách hai phần; điện thoại bỏ phần thời kỳ; ở 200% chữ nhãn **xuống dòng** | `ux-audit.mjs`: trước khi sửa 6 tuyến tràn ngang (tệ nhất 535px > 390px); sau khi sửa **không tuyến nào tràn** |
| 5 | Một hành động chính mỗi màn (C, H) | Không chạy truy vấn riêng. **Hướng dẫn chung của SKILL.md** §4 `primary-action` — mỗi màn một CTA chính, hành động phụ lép vế | Màn mở đầu: 1 chính + 1 phụ. Bốn màn trước đây không có liên kết nào nay có khối "đi tiếp" cùng một ngữ pháp | `audit-density.mjs`: nút trong `<main>` ở fold màn mở đầu = **2** |

**Giới hạn phải nói rõ:** `ui-ux-pro-max` là bộ dữ liệu khuyến nghị thiết kế chạy trên máy.
Nó **không phải nguồn học thuật** và **không phải bằng chứng người dùng**. Không kết quả nào của nó
được dùng để đổi một câu, một mốc thời gian, một thuật ngữ hay một trạng thái xác minh nào.

### 9.3 Điều CLI **không** cho được

Hai truy vấn về mô hình điều hướng duy nhất và một truy vấn về chuyển cảnh
(`"page transition spatial continuity forward navigation"`) đều trả về kết quả lệch chủ đề.
Bộ dữ liệu `ux-guidelines.csv` mỏng ở các chủ đề này. Các quyết định tương ứng dựa vào **số đo của
chính dự án** cộng hướng dẫn chung trong `SKILL.md`, và được ghi đúng như vậy.

---

## 10. Rủi ro còn lại và việc chờ người kiểm

### 10.1 Việc bản yêu cầu nêu mà **chưa** làm, kèm lý do

| Việc | Trạng thái | Lý do |
|---|---|---|
| Ảnh chân dung thật cho **mỗi** chặng | `DECLINED_WITH_REASON` | Vẫn đúng sau đợt tìm lần ba: Gallica chỉ có đúng một ảnh đại biểu Đông Dương và nó đã ở màn mở đầu; truy vấn “Ho Chi Minh” trả về ảnh vườn hoa Thành phố Hồ Chí Minh 1948. Lấp bằng ảnh khác hoặc ảnh AI đều bị `AGENTS.md` cấm |
| 1–3 ảnh bổ trợ **hiển thị** cho mỗi chặng | `PARTIAL` | **3 trong 5 chặng nay đã có** một tư liệu bổ trợ thật, nằm cạnh đúng nhịp nó chống đỡ. Hai chặng còn lại (`ky-1`, `ky-4`) vẫn trống |
| Nhãn `Trải nghiệm → Tiếp thu lý luận → Bước ngoặt` quanh ảnh | `PARTIAL` | Cấu trúc ba bước có (Trước đó → tiêu đề bước ngoặt → Sau đó, cộng hai sợi hội tụ), nhưng **không** dùng đúng ba nhãn trong ví dụ của bản yêu cầu: hai trong ba nhãn ấy không phải chữ của trích đoạn, và đặt chúng vào sẽ là thêm một khẳng định |
| "Nội bộ mỗi chặng có thể khác nhau" | `PARTIAL` | Năm chặng dùng chung một khuôn; khác nhau ở số nhịp, số bước ngoặt và số trích dẫn, không khác ở bố cục |
| Ảnh full-bleed | `NOT_DONE` | Không có ảnh nào để đặt full-bleed. Bước ngoặt là nhịp duy nhất rộng hơn thước đọc |

### 10.2 Rủi ro còn lại

- **Nội dung học thuật vẫn `NEED VERIFICATION`.** Trích đoạn `C2-02.pdf` mang dấu hiệu xuất xứ
  Studocu. Không kiểm thử nào ở trên xác thực nội dung; chúng chỉ chứng minh sản phẩm hiển thị
  đúng thứ đã lưu.
- **Không có bằng chứng người dùng.** Mọi khẳng định trong tệp này là về mã, về hình học và về số
  đo, không phải về việc người học đã trải nghiệm hay hiểu ra điều gì.
- **Một trình duyệt.** Chrome.
- **Nhãn phiên bản sản phẩm** vẫn `VERSION LABEL - NEED LECTURER CONFIRMATION`.

### 10.3 Việc chờ người

1. Chạy kiểm thử người dùng thật và ghi vào `docs/09_User_Test_Plan_TEMPLATE.md`.
2. Đối chiếu mọi nội dung học thuật với giáo trình chính thống; gỡ `NEED VERIFICATION` khi đã đối chiếu.
3. Xác nhận vị trí của `AGENTS_v2.md`, `HCM202_PROJECT_CONTEXT_v2.0.md` nếu chúng tồn tại.
4. Ra phán quyết của giảng viên về nhãn phiên bản sản phẩm.
5. Tiếp tục tìm ảnh tư liệu đủ căn cứ cho 10 vị trí còn bị chặn — hoặc quyết định giữ cột mốc thời
   gian làm neo.
6. Kiểm trên trình duyệt và thiết bị thật ngoài Chrome; kiểm bằng trình đọc màn hình thật.

---

## 11. Ranh giới học thuật đã giữ

- Năm tiêu đề thời kỳ: **nguyên văn**, có kiểm thử đơn vị so từng ký tự.
- Câu hỏi trung tâm: **nguyên văn**, có kiểm thử ghép lại hai vế đã sắp chữ.
- Chuỗi thời gian và ranh giới chồng lấn (`C2-R01`, `C2-R02`, `C2-R03`): giữ nguyên; **không** nén
  cụm thời kỳ hay mốc bước ngoặt thành khoảng số dù bản yêu cầu gợi ý như vậy.
- `NEED VERIFICATION`, `NOT YET EVIDENCED`, `DOCUMENT VARIANCE`, `DOCUMENT CONFLICT`: giữ nguyên.
- Vị trí tư liệu chưa đủ căn cứ: **để trống và thấy rõ là đang bị chặn**, kèm lý do.
- Không tạo/mô phỏng/biến dạng chân dung bằng AI; không hoạt ảnh nào tác động lên chủ thể trong ảnh.
- Không viết "Bạn đã hiểu". Sản phẩm chỉ ghi *đã mở*, *đã vượt qua*, *đã nối* — và nhịp Suy ngẫm
  nói thẳng ra điều đó trên màn hình.

---

`UX REDESIGN IMPLEMENTED — REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`
