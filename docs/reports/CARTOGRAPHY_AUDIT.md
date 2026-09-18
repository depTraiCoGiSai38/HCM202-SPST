# CARTOGRAPHY AUDIT

> Sprint: national boundaries and Vietnamese offshore representation for `BẢN KHẮC`
> Audit date: 2026-09-18
> Project status: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

This is an engineering and source audit of the atlas basemap. It is a
`PROJECT DECISION` record, not an academic source. Nothing in it evidences any
claim in `Giáo trình Tư tưởng Hồ Chí Minh - 2019`.

---

## 0. Scope and concurrency

This sprint is **cartographic only**. It changes no stage heading, date,
citation, quotation, Central Question, development statement, source locator,
image record or historical claim, and it adds no historical location.

At the start of work `git status` was clean on `main` at `1f2033d`. Another
session was working on `STAGE_BODY_EDITORIAL_REBALANCE — ALL 5 STAGES`; its
output (`STAGE_BODY_EDITORIAL_REBALANCE_REPORT.md`,
`docs/07_AI_Prompt_Log_StageBodyRebalance_2026-09-18.md`) was already committed
and no source file was being modified when this work began. This sprint
deliberately stayed inside cartography files and did not touch `stagePage.ts`,
`experience.css` or any shared layout component.

---

## 1. Current state, before this sprint

### Land dataset

| Property | Value |
|---|---|
| Source | `world-atlas@2.0.2`, file `land-110m.json` |
| Upstream | Natural Earth 1:110m land (`ne_110m_land.shp`), via TopoJSON |
| Licence | world-atlas ISC; Natural Earth public domain |
| Acquisition | fetched once by `tools/build-land.mjs`, decoded to SVG path text, committed |
| Runtime | no fetch; 52 KB of path data as a string in the bundle |
| Geometry | 126 rings, 4 067 points, Douglas-Peucker 0.1°, 2 dp |
| Projection | equirectangular, `x = lon`, `y = -lat` |
| Framing | authored per stage; no zoom, no pan, no reset |

### What was present and absent

| Layer | Before |
|---|---|
| Coastline | **present** |
| National (Admin-0) boundaries | **absent — deliberately** |
| Province / Admin-1 boundaries | absent |
| Vietnam representation | mainland coastline only |
| Offshore islands | absent |
| Hoàng Sa | **absent** |
| Trường Sa | **absent** |
| Offline behaviour | fully offline, verified by `tools/offline-check.mjs` |

### The reason the borders were originally omitted

Recorded in three places (`tools/build-land.mjs`, `land.ts` header,
`SPATIAL_JOURNEY_DESIGN_DECISION.md` §Basemap) and stated to the reader twice in
the product:

> Không vẽ đường biên giới quốc gia: trích đoạn trải từ năm 1911 đến năm 1969,
> nên biên giới ngày nay sẽ là một mốc thời gian sai đặt dưới chân nội dung.

That argument is real and is **not discarded** by this sprint — it is answered
differently. See §6.

### What the before-screenshots actually showed

`screenshots/cartography/before/` was captured at 1920 / 1440 / 768 / 390 px
before any change:

- `vietnam-stage1-w1440.png` — mainland Southeast Asia as one undifferentiated
  land mass. Nothing distinguishes Vietnam from Laos, Cambodia, Thailand or
  China. The sea east of the coast is entirely empty.
- `world-stage2-w1440.png` — continents with no internal structure. The `Pháp`
  country wash sits on western Europe with nothing to say which country it is.
- `vietnam-stage5-w1440.png` — this stage legitimately has no historical marks,
  so the plate was a blank coastline blob that reads as a rendering fault.

---

## 2. Desired state

1. `Admin-0` national boundaries, for orientation.
2. **No** `Admin-1` province/state/prefecture/district network, anywhere.
3. Vietnam represented per an approved Vietnamese cartographic convention, not
   reduced to the mainland coastline.
4. Appropriate offshore representation of Hoàng Sa and Trường Sa.
5. Basemap subordinate to the historical narrative at all times.
6. Offline, reproducible, documented, no runtime network.

---

## 3. The Vietnamese cartographic standard

Researched first, before any dataset was chosen. Findings, with the caveat that
the **enacted** text of QCVN 80 could not be opened — see §3.4.

### 3.1 `QCVN 80:2024/BTNMT` — Quy chuẩn kỹ thuật quốc gia về bản đồ hành chính

Issued by `Thông tư số 28/2024/TT-BTNMT` ngày 29-11-2024 của Bộ trưởng Bộ Tài
nguyên và Môi trường. Amended by `Thông tư số 24/2025/TT-BNNMT` ngày 20-6-2025,
in force 01-7-2025.

The clause that governs this project:

> **1.1** Bản đồ phải thể hiện đúng chủ quyền lãnh thổ Việt Nam bao gồm đất
> liền, biển, đảo, quần đảo.

> **1.2** Bản đồ thể hiện lãnh thổ trong phạm vi khoảng kinh tuyến từ 102° - 118°
> độ kinh Đông, vĩ tuyến từ 04°30 - 23°30 độ vĩ Bắc.

Clause **3.1** does not define the border line itself; it delegates to Điều 18
Luật Đo đạc và bản đồ. Clause **4.1.8 b)** requires archipelago labels to carry
the archipelago name **plus** the governing provincial administrative unit
**plus** the country name Việt Nam, `theo yêu cầu của cơ quan nhà nước có thẩm
quyền`. The 2025 circular deleted `cấp huyện` from that clause.

### 3.2 What the standard does NOT do

- It **never names** Hoàng Sa or Trường Sa in its normative text. The only
  occurrence is `QĐ. TRƯỜNG SA` as a **typography specimen** for symbol no. 50
  (`Tên quần đảo lớn`, Arial BI, 2.5-11 mm) in the symbol appendix.
- It prescribes **no exact printed label string**, no parenthesis syntax and no
  capitalisation. The widely-seen printed form
  `QUẦN ĐẢO HOÀNG SA (HUYỆN HOÀNG SA, TP. ĐÀ NẴNG)` is **publishing practice,
  not regulation**. This project therefore does not reproduce it: doing so would
  be citing a regulation for a string the regulation does not contain.
- It publishes **no machine-readable geometry**. It is a representation,
  labelling, format and source-provenance standard; the coordinates must be
  obtained from the state.

### 3.3 `Luật Đo đạc và bản đồ 2018` and `Thông tư 17/2018/TT-BTNMT`

`Điều 18` of the Law requires accurate depiction and mandates the state-issued
standard border map set. `Thông tư 17/2018/TT-BTNMT` `Điều 19` is decisive:

> Sản phẩm đo đạc và bản đồ, xuất bản phẩm bản đồ thể hiện lãnh thổ Việt Nam
> phải sử dụng đường biên giới quốc gia, điểm đặc trưng phân bố lãnh thổ theo
> bộ bản đồ chuẩn biên giới quốc gia được công bố.

`Điều 20` fixes the same 4°30'-23°30' N / 102°00'-118°00' E extent and requires
inset maps (`bản đồ phụ`) for products covering Đà Nẵng, Khánh Hòa,
Bà Rịa - Vũng Tàu and Kiên Giang.

**Consequence for this project, stated plainly:** a map product that draws its
border from a third-party dataset does **not** satisfy `Điều 19`. This product
does not, and therefore **does not claim compliance** with QCVN 80 or
Thông tư 17/2018. That is recorded in the product itself, on the verification
page, not only here.

### 3.4 Evidence limits — `NEED VERIFICATION`

- The enacted QCVN 80 text could not be retrieved. `vbpl.vn` returns 404 for the
  indexed attachment; `thuvienphapluat.vn` returns 403; `vbpl.moj.gov.vn`
  refused connection. Every QCVN 80 clause quoted above comes from a
  **pre-signature draft PDF** hosted by Sở Nông nghiệp và Môi trường Lạng Sơn,
  whose `Lời nói đầu` still reads `Thông tư số /2024/TT-BTNMT ngày tháng năm
  2024` with the number and date blank.
- The clause numbering is corroborated: `Thông tư 24/2025/TT-BNNMT` (official
  signed PDF, mae.gov.vn) amends clauses by exactly those ids
  (`đoạn b điểm 4.1.8 Mục II.I.II`).
- The 28-5-2025 effective date of Thông tư 28/2024 is **search-summary only** and
  is not asserted anywhere in the product.
- Since 01-7-2025 `huyện Hoàng Sa` and `huyện Trường Sa` are reported to have
  become `đặc khu`. The resolutions were not opened. This is one reason no
  administrative attribution is printed on the map label.
- A human must open the enacted QCVN 80 before any of this wording is published
  as a quotation in the dossier.

---

## 4. Candidate sources evaluated

### 4.1 Vietnamese state geospatial data — investigated first, not available

| Route | Finding |
|---|---|
| Cục Đo đạc, Bản đồ và TTĐL VN (`dosmvn.mae.gov.vn`) | news and legal documents only |
| `bandovn.vn` | order/request catalogue: login, cart, mandatory `Phiếu yêu cầu cung cấp thông tin, dữ liệu, sản phẩm ĐĐBĐ`, fee schedule. Not a download site |
| VNSDI (`vnsdi.mae.gov.vn`) | national administrative map served as Esri **tiled raster**; HTTP 499 `Token Required` anonymously; both ArcGIS Enterprise portals unreachable on 2026-09-18 |
| `thongtin.diagioi.gov.vn` | WMS `GetMap` returns raster PNG; WFS `GetFeature` returns an **empty FeatureCollection** anonymously |
| NXB Tài nguyên - Môi trường và Bản đồ VN | post-merger 34-province maps released free, but as **PDF at 1:9 000 000** plus a raster viewer; `sapnhap.bando.com.vn` is a MapProxy raster cache with no WFS |
| Official open release of Hoàng Sa / Trường Sa geometry | **none found** |

Legal position: `Luật Đo đạc và bản đồ 27/2018` Điều 41.3.đ places administrative
boundary data in the `cung cấp rộng rãi` class, but Điều 41.5.c requires payment,
Điều 42.1 vests state ownership, `Nghị định 27/2019` Điều 21 requires an
identity-bearing purpose-declaring request form, and
`Thông tư 47/2024/TT-BTC` prices the digital Vietnam administrative map at
4 000 000 VND/bộ. `Nghị định 18/2020` Điều 10-11 makes off-purpose use and
onward provision separately finable.

**Conclusion: no lawful, reproducible, redistributable route to authoritative
Vietnamese government vector geometry exists for a bundled student product.**
No bulk tile-scraping or token circumvention was attempted, and none is offered
— that would itself be the offence `Nghị định 18/2020` Điều 10.1 penalises.

*Gap:* `data.gov.vn` and `open.data.gov.vn` were **unreachable** from this
network (connection failure, not 404). Someone on a Vietnamese network should
re-check both before this is treated as settled.

### 4.2 Natural Earth at 1:110m — measured, not assumed

Every arc of `land-110m.json` and `countries-110m.json` was decoded and tested
for membership of the Paracel box (110.8-113.4 E, 15.5-17.3 N) and the Spratly
box (111.5-117.5 E, 7.3-11.6 N).

**Result: zero geometry, both files, both boxes.** The dataset the plate is
already built from cannot show either archipelago at any zoom. Confirmed
independently by a second researcher. At 1:110m Natural Earth ships no
`disputed_areas` and no `minor_islands` theme at all.

### 4.3 Natural Earth 1:10m default worldview — REJECTED

| File | Hoàng Sa | Trường Sa |
|---|---|---|
| `ne_10m_admin_0_countries` (default) | 7 polygons attributed to **China** (`id 156`) | separate stateless feature `Spratly Is.`, `ADM0_A3 = PGA` |
| `world-atlas@2.0.2 countries-10m.json` | same 7 polygons inside China | `Spratly Is.` with `id: null` |

Taking this would have published a third party's *de facto* reading as if it
were this project's. Brief §11 forbids exactly that, and it would be wrong for a
Vietnamese academic product. **Rejected.**

### 4.4 Natural Earth 1:10m Vietnam point-of-view — SELECTED

`ne_10m_admin_0_countries_vnm.geojson`. Natural Earth publishes 33 point-of-view
editions at 10m which "show the worldview for several dozen countries according
to de jure boundaries (as prescribed by the home country's law and/or local
conventions)".

Measured directly at tag `v5.1.2`:

| | default | Vietnam POV |
|---|---|---|
| features | 258 | **248** |
| Vietnam polygons | 25, bbox to 109.472 E | **44, bbox to 115.849 E** |
| Paracel polygons | in China | **in Vietnam (7)** |
| Spratly polygons | separate `PGA` feature | **in Vietnam (12)** |
| China bbox min-lat | 15.775 | **18.169** |
| separate `Spratly Is.` feature | present | **absent** |

Public domain. Reproducible. Pinned by tag.

### 4.5 Other options considered

| Option | Outcome |
|---|---|
| `ne_110m_admin_0_boundary_lines_land` | viable, but is Natural Earth 5.x while the shipped land is 4.1.0 lineage — **rejected for version mismatch** |
| `ne_10m_admin_0_disputed_areas` | Paracel `NOTE_BRK` = "Admin. by China; Claimed by Vietnam and Taiwan"; Spratly `NOTE_BRK` **omits Vietnam entirely**. Rejected |
| OpenStreetMap / Geofabrik / Overpass | ODbL attribution obligations, no version pinning as simple as a tag; unnecessary once 4.4 was available |
| GADM | licence restricts commercial use; Admin-1 heavy; rejected |
| Screenshot tracing | prohibited by the brief and by `AGENTS.md` §4 |

### 4.6 A data trap that was avoided

In `ne_10m_admin_0_countries` **and** `ne_10m_admin_0_map_units`, the Spratly
feature's `NAME_VI` is wrongly set to **`Đảo Wake`** — Wake Island, in the north
Pacific. Publishing that field would have printed the wrong name on the map.

The correct Vietnamese strings exist only in `ne_10m_geography_regions_polys`:
`quần đảo Hoàng Sa` (`Q274388`) and `quần đảo Trường Sa` (`Q215664`). The build
tool reads names **only** from that layer, asserts they begin `quần đảo`, and a
unit test fails if either string ever matches `/Wake/i`.

---

## 5. Decision

| Layer | Source | Version | Why |
|---|---|---|---|
| Coastline | `world-atlas@2.0.2` `land-110m.json` | pinned | unchanged; regenerated byte-identical |
| National boundaries | `world-atlas@2.0.2` `countries-110m.json` | pinned | **same package, same version** as the land, so one Natural Earth vintage; Admin-0 only |
| Archipelago positions | `ne_10m_admin_0_countries_vnm.geojson` | Natural Earth `v5.1.2` | Vietnam point-of-view edition, chosen and documented |
| Vietnam's coastal islands | `ne_10m_admin_0_countries_vnm.geojson` | Natural Earth `v5.1.2` | QCVN 80 clause 1.1 names `đảo` beside `quần đảo`, and 1:110m has none of them |
| Archipelago names + extents | `ne_10m_geography_regions_polys.geojson` | Natural Earth `v5.1.2` | correct `name_vi`; avoids the `Đảo Wake` error |

**A measured correction during the work.** A draft of this audit stated that
Vietnam's coastal islands arrived with the 1:110m layer. Measuring it disproved
that: `land-110m.json` has **zero** vertices anywhere near Phú Quốc, Côn Đảo or
the Hạ Long group, and at 1:110m Vietnam is a single mainland polygon. 24 island
polygons were therefore added from the Vietnam point-of-view file (225 points,
3 KB), kept as **real polygons at true scale** — Phú Quốc is about 49 km across —
and simplified at 0.01°, because 0.1° would collapse an island 0.2° wide into
nothing. The mainland part is skipped so the coastline is not drawn twice.

**Boundary derivation.** Not a separate download. TopoJSON shares an arc between
the polygons that meet along it, so an arc used by **two or more countries** is a
national land boundary and an arc used by one is coastline. Taking only the
shared arcs yields exactly the Admin-0 *boundary lines land* theme with no line
drawn twice and no coastline doubled. Of 595 arcs: **326 shared** (drawn), 269
coastline (left to the land layer).

**Province boundaries are structurally impossible here.** The source file
contains no Admin-1 geometry at all, so no province line can enter the product
through this path even by accident. That is a stronger guarantee than filtering.

**Verified clean:** zero border vertices fall inside the South China Sea
archipelago box, so no maritime or disputed-boundary convention leaks in from
the third-party dataset. A unit test holds this.

---

## 6. How the original "no borders" argument is answered

The 2026-09-17 decision was right that **present-day borders under a 1911-1969
narrative are an anachronism if presented as historical fact.** This sprint does
not overturn that; it separates two things the original decision merged:

- drawing a border as a **historical claim** — still refused;
- drawing a border as **orientation context** — now done, and labelled as such.

The product now says so in its own voice, in the plate's evidence lens and in the
register:

> Biên giới trên nền bản đồ là biên giới hiện nay, vẽ ra để người đọc biết một
> dấu nằm trong nước nào. Đó KHÔNG phải là khẳng định rằng biên giới ngày nay đã
> tồn tại y như vậy ở mọi mốc thời gian mà trích đoạn nêu.

Year-by-year historical boundary reconstruction is explicitly out of scope
(brief §17, §42).

---

## 7. Evidence classes remain separate

| Class | Carries | Never carries |
|---|---|---|
| Historical source — `Giáo trình ... 2019` | stage claims, dates, printed place names, printed page locators | GIS geometry |
| Coordinate record — Wikidata | lat/lon for a named place, with item id, URL, published precision, retrieval date | sovereignty conventions |
| Basemap — Natural Earth | coastline, national boundaries, island positions | any academic locator |

The register keeps them in three separate sections. A unit test fails if any
cartographic source record ever grows a `tr. N` textbook page citation.

---

## 8. Known limitations carried forward

1. Enacted QCVN 80 text unread — `NEED VERIFICATION`.
2. Product is **not** a compliant map product under Thông tư 17/2018 Điều 19.
3. Archipelago labels carry **no** administrative attribution, because QCVN 80
   prescribes no string and the current administrative form (`đặc khu` since
   01-7-2025) is unresolved.
4. Two scales are mixed: 1:110m basemap, 1:10m archipelagos. Unavoidable — the
   archipelagos do not exist at 1:110m. Stated in the register.
5. Equirectangular preserves neither area, distance nor shape.
6. `data.gov.vn` unreachable from this network; the "no open Vietnamese vector
   geometry" conclusion is as strong as that gap allows.
7. 12 of 652 border-arc endpoints sit 0.1-0.5° from the coastline polyline
   (`land-110m` is `ne_110m_land`, the borders come from
   `ne_110m_admin_0_countries`); 154 snap to it exactly, 486 are correctly
   inland. No visible artefact was found in any of the framings the product
   uses.
8. Natural Earth POV editions exist only at 10m — there is no 110m Vietnam POV.
9. Vietnam's coastal islands are 1:10m against a 1:110m mainland, so they are
   more finely drawn than the coastline beside them. Unavoidable, imperceptible
   at the sizes used, and stated rather than hidden.
10. At framings wider than the in-country one, each archipelago is drawn as one
    open symbol rather than its individual islets, and is unlabelled. Below about
    45 canvas units of cluster spread the islets merge into a filled mass darker
    than the land, which reads as an island that does not exist — the independent
    visual review caught exactly that, and the symbol is the fix. The names
    remain in the text beside the plate and in the register at every framing.

---

## 9. What this audit does not do

It does not adjudicate a territorial dispute, and nothing built on it claims to.
The South China Sea is subject to international dispute. This product follows the
**cited** Vietnam point-of-view edition named in §5 and says so; it does not
present an uncited model-generated boundary interpretation, and no coordinate in
it was written from memory.
