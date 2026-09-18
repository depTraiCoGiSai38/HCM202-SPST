# CARTOGRAPHY AND NATIONAL BOUNDARIES — IMPLEMENTATION REPORT

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

> Sprint: national boundaries and Vietnamese offshore representation for `BẢN KHẮC`
> Date: 2026-09-18
> Companion audit: `CARTOGRAPHY_AUDIT.md`
> Prompt log: `docs/07_AI_Prompt_Log_Cartography_2026-09-18.md`
> Project status: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

This is a `PROJECT DECISION` record. Nothing in it evidences any claim in
`Giáo trình Tư tưởng Hồ Chí Minh - 2019`.

---

## 1. Starting cartography

`BẢN KHẮC` drew one layer: Natural Earth 1:110m **land**, via
`world-atlas@2.0.2` `land-110m.json`, fetched once by `tools/build-land.mjs`,
decoded to 52 KB of SVG path text and committed. Equirectangular projection,
`x = lon`, `y = -lat`. Douglas-Peucker at 0.1°. 126 rings, 4 067 points. Framing
authored per stage; no zoom, no pan, no controls. The SVG is `aria-hidden` and
every fact it draws is also printed as text beside it.

Absent by explicit decision: **all** national boundaries. Absent as a
consequence: every offshore island, including Hoàng Sa and Trường Sa.

---

## 2. Problem identified

Captured in `screenshots/cartography/before/` at 1920 / 1440 / 768 / 390 px
before any change:

- **Vietnam-framed stages (1 and 5)** — mainland Southeast Asia rendered as one
  undifferentiated land mass. Nothing distinguished Vietnam from Laos, Cambodia,
  Thailand or China. The sea east of the coast was entirely empty.
- **World-framed stages (2, and the journey overview)** — continents with no
  internal structure. The `Pháp` country wash sat on western Europe with nothing
  to say which country it marked.
- **Stage 5** — no historical marks at all (the excerpt places none of its
  events), so the plate was a blank coastline blob that read as a rendering
  fault rather than as the finding it is.

The original reason for omitting borders was sound and is not discarded:
present-day borders under a 1911-1969 narrative are an anachronism **if presented
as historical fact**. What this sprint does is separate two things that decision
had merged — a border as a *historical claim* (still refused) from a border as
*orientation context* (now drawn, and labelled as such in the product's own
voice).

---

## 3. Sources evaluated

Full comparison in `CARTOGRAPHY_AUDIT.md` §4. Summary:

| Candidate | Outcome |
|---|---|
| **Vietnamese state geospatial data** (Cục Đo đạc Bản đồ và TTĐL VN, `bandovn.vn`, VNSDI, `thongtin.diagioi.gov.vn`, NXB TN-MT&BĐ) | **Not obtainable.** Order catalogues with fees and purpose-declaring forms, token-gated raster tiles, WFS returning an empty FeatureCollection, and PDF at 1:9 000 000. No open licence anywhere. No bulk scraping or token circumvention attempted. |
| **Natural Earth 1:110m** (already in use) | Retained for land + boundaries. Measured: **zero** geometry in either archipelago's extent. |
| **Natural Earth 1:10m, default worldview** | **Rejected.** Attributes the 7 Hoàng Sa islets to China and makes Trường Sa a stateless `PGA` feature. |
| **Natural Earth 1:10m, Vietnam point-of-view** | **Selected** for the archipelagos. |
| `ne_110m_admin_0_boundary_lines_land` | Rejected: Natural Earth 5.x against a 4.1.0-lineage land layer. Version consistency preferred. |
| `ne_10m_admin_0_disputed_areas` | Rejected: its Spratly `NOTE_BRK` omits Vietnam entirely. |
| OpenStreetMap / Geofabrik / Overpass | Viable but unnecessary once the POV edition was found; ODbL attribution and weaker version pinning. |
| GADM | Rejected: licence restricts commercial use, Admin-1 heavy. |
| Tracing from screenshots | Prohibited by the brief and by `AGENTS.md` §4. Not done. |

**Finding worth stating plainly:** there is no lawful, reproducible,
redistributable route to authoritative Vietnamese government vector geometry for
a bundled student product. That is a real constraint, not a shortcut.

---

## 4. Chosen boundary / cartographic source

| Layer | Dataset | Version | Licence |
|---|---|---|---|
| Coastline | `world-atlas@2.0.2` `land-110m.json` (Natural Earth 1:110m land) | `world-atlas@2.0.2` | ISC wrapper; Natural Earth public domain |
| National boundaries | `world-atlas@2.0.2` `countries-110m.json` (Natural Earth 1:110m Admin-0) | `world-atlas@2.0.2` | as above |
| Archipelago positions | `ne_10m_admin_0_countries_vnm.geojson` | theme **5.1.1** (fetched from release `v5.1.2`) | public domain |
| Vietnam's coastal islands | `ne_10m_admin_0_countries_vnm.geojson` | theme **5.1.1** (fetched from release `v5.1.2`) | public domain |
| Archipelago names + extents | `ne_10m_geography_regions_polys.geojson` | theme **5.0.0** (fetched from release `v5.1.2`) | public domain |

**Three versions, three different things.** Natural Earth versions each theme
independently, so the release tag is not the theme version: at `v5.1.2` the
Vietnam point-of-view theme is **5.1.1** and the geography-regions theme is
**5.0.0**, read from each artifact's own `.VERSION.txt`. `world-atlas@2.0.2` is a
third version of a third thing. An earlier draft of this report recorded the tag
as though it were the theme version, which misstates provenance; corrected, and a
unit test now asserts the theme versions so it cannot drift back.

Retrieval date `2026-09-18`, recorded in the generated file and printed in the
register.

Boundaries come from the **same package at the same version** as the land, so
both layers carry one Natural Earth vintage and cannot drift apart. The
archipelagos must come from a different scale because they do not exist at
1:110m; that mixing of scales is stated in the register rather than hidden.

---

## 5. Vietnam representation convention

### 5.1 Why the archipelagos are shown at all

`QCVN 80:2024/BTNMT` (Quy chuẩn kỹ thuật quốc gia về bản đồ hành chính), issued
by `Thông tư số 28/2024/TT-BTNMT` ngày 29-11-2024, amended by
`Thông tư số 24/2025/TT-BNNMT` ngày 20-6-2025, clause **1.1**:

> Bản đồ phải thể hiện đúng chủ quyền lãnh thổ Việt Nam bao gồm đất liền, biển,
> đảo, quần đảo.

A plate that stopped at the mainland coastline would omit something the
Vietnamese standard treats as part of showing the country at all. Clause **1.2**
fixes the extent at 102°-118° E, 4°30'-23°30' N; `Thông tư 17/2018/TT-BTNMT`
Điều 20 repeats it. Both archipelagos fall inside it, and a unit test holds that.

### 5.2 National boundary treatment

Admin-0 only, derived **topologically** rather than downloaded separately.
TopoJSON shares an arc between the polygons that meet along it, so an arc used by
two or more **countries** is a national land boundary and an arc used by one is
coastline. Of 595 arcs: **326 shared and drawn**, 269 left to the land layer.
That is exactly the Admin-0 *boundary lines land* theme, with no line drawn twice
and no coastline doubled.

Drawn as **open polylines, never closed** — a border separates two countries
rather than enclosing one. A test fails if a `Z` ever appears in the path.

**Verified clean:** zero border vertices fall inside the South China Sea
archipelago box, so no maritime or disputed-boundary convention leaks in from the
third-party dataset. A unit test holds this.

### 5.3 Vietnam's coastal islands

A first draft of this report claimed these arrived with the 1:110m layer. **That
was wrong, and measuring it is how it was caught:** a scan of `land-110m.json`
finds **zero** vertices anywhere near Phú Quốc, Côn Đảo or the Hạ Long group. At
1:110m Vietnam is a single mainland polygon and nothing else. Left there, the
plate would have been mainland-only — the exact reduction brief §7 rules out.

QCVN 80 clause 1.1 names `đảo` separately from `quần đảo`, so they are required.
**24 island polygons** come from the same Vietnam point-of-view file, simplified
at 0.01° (a much finer tolerance than the world layers, because Douglas-Peucker
at 0.1° would collapse an island 0.2° wide into nothing). 225 points, 3 KB.

Unlike the archipelagos these are kept as **real polygons at true scale** and
given the land's own fill, because that is what they are: Phú Quốc is about 49 km
across and is a legitimate shape to draw. Nothing is enlarged. The mainland part
is skipped so the coastline is not drawn twice from two datasets at two scales.
A test asserts Phú Quốc is present in this layer **and absent from the world
layer**, so the reason this layer exists cannot quietly stop being true.

### 5.4 Hoàng Sa

7 islets. Extent 111.027°-113.334° E, 15.590°-17.018° N. Printed name
`quần đảo Hoàng Sa`, read from the `name_vi` field of
`ne_10m_geography_regions_polys` (item `Q274388`). Map label: `Hoàng Sa`.

### 5.5 Trường Sa

12 islets. Extent 111.870°-117.883° E, 7.131°-12.083° N. Printed name
`quần đảo Trường Sa`, same source (item `Q215664`). Map label: `Trường Sa`.

### 5.6 Why this representation was chosen

**Points, not polygons.** The real islets are **0.3-1.7 km** across. At the
closest framing this plate allows (26° of longitude across a 1000-unit canvas)
that is a fraction of one pixel. A true-scale polygon would render as nothing;
an enlarged polygon would draw a landmass that does not exist. Each islet is
therefore reduced to one representative point — the mean of its source polygon's
outer ring — and drawn as a small **symbol** in the coastline's own colour, never
with the land fill. The extent each group really covers is carried in the data
and published in the register, so the true size is stated in words rather than
implied by the drawing. This is the ordinary cartographic answer at this scale
and it satisfies brief §15: nothing is enlarged to look like real land area.

**The Vietnam point-of-view edition, named.** Natural Earth publishes 33
point-of-view editions at 10m which show each worldview *"according to de jure
boundaries (as prescribed by the home country's law and/or local conventions)"*.
In the **default** edition the Hoàng Sa islets are attributed to China and
Trường Sa is a separate stateless feature. Using the default would have published
a third party's *de facto* reading as though it were this project's — which brief
§11 forbids and which would be wrong for a Vietnamese academic product. The
choice is recorded in the build tool, in the generated file header, in the
register, and in a test that fails if a regeneration ever points at the default
file.

**Label form.** `Hoàng Sa` and `Trường Sa` — the proper names, which the symbol
beside them already identifies as island groups. Deliberately **no**
administrative attribution, for two reasons: QCVN 80 clause 4.1.8 b) names the
required *components* but prescribes **no string, no parenthesis syntax and no
capitalisation**, deferring to `yêu cầu của cơ quan nhà nước có thẩm quyền`; and
the currently correct administrative form is unresolved, since the 2025 circular
deleted `cấp huyện` from that clause and the districts are reported to have
become `đặc khu` from 01-7-2025. Printing a form the regulation does not contain
would be citing a source for words it does not carry. The full sourced strings
`quần đảo Hoàng Sa` / `quần đảo Trường Sa` are printed in the register.

**Note: the inset treatment described below was removed after delivery — see
§18. It is kept here because the reasoning that produced it also produced the
point-symbol justification that the product still relies on.**

**Two enlarged insets, which is where the archipelagos are actually shown.**
This replaced an earlier treatment in which each group was drawn as one large
open ring on the main plate. That was rejected, correctly: a circle locates an
archipelago and says nothing about it. `QCVN 80:2024/BTNMT` clause 4.1.2 asks for
more than presence — it asks that the group's **`mật độ phân bố các đảo`** and its
**`hình dạng và hướng`** survive generalization, and none of those three can
survive at a scale where the whole of Hoàng Sa is 1.5° wide.

So each Vietnam-framed plate carries a dedicated inset per group: the **window**
is enlarged, the islands are not, and every islet sits at its true relative
position. 7 marks for Hoàng Sa, 12 for Trường Sa, over a half-degree graticule
that supplies north and scale. Each inset prints the window it covers. On a phone
they stack one per row rather than shrinking, because two side by side in 356 px
leaves neither readable.

**Constant-size marks are what the standard prescribes, not a workaround.**
Clause 4.1.2 draws an island of ≥ 0.5 mm² `theo tỷ lệ` (to scale) and one below
that `không theo tỷ lệ`; clause 4.8 defines that as a symbol with
`kích thước quy ước, không theo kích thước thực` — a conventional size, not the
object's real one. These islets are 0.3–1.7 km across: even inside the inset the
largest measures about 3.5 px² against a threshold of roughly 7 px² at 96 dpi.
Every one is below it. No island's area is enlarged, because area is not what is
being drawn — and the text above the insets says exactly that to the reader.

**Resolve, or symbolise — decided by measurement, not by framing.** The renderer
measures how wide each cluster actually lands on the canvas. Where it spans at
least 45 canvas units — the in-country framings, stages 1 and 5 — the islets are
drawn individually and the group is named. Below that the group is drawn as **one
open ring** and the label is dropped.

This was not the first implementation, and the reason it changed is worth
recording. The first version drew all 19 islets at every framing. The independent
visual review measured the result and found that at the whole-world framing the
marks **merged into two solid filled masses** — 19×17 px and 16×16 px at 1920,
in a tone *darker than any land on the plate*, sitting beside the Vietnam node
cluster. They read as two islands larger than Hainan. That is precisely what
brief §15 forbids, and it was on the product's entry view. Three independent
verifiers confirmed it by pixel measurement.

The fix is the ordinary small-scale cartographic answer: one symbol per island
group. **Open, never filled** — a ring cannot be misread as land area at any
size, which a filled disc demonstrably can. The label goes with it, because a
name beside a four-unit cluster is unreadable anyway, and the text beside the
plate carries the fact for every reader either way.

### 5.7 Source / standard followed — and the limit of that claim

The product follows the **cited** Natural Earth Vietnam point-of-view edition
named above, and says so in the register. It follows `QCVN 80:2024/BTNMT` clause
1.1 as the *reason* the archipelagos are represented.

It does **not** claim compliance with QCVN 80 or `Thông tư 17/2018/TT-BTNMT`.
Điều 19 of that circular requires the border to be taken from the published
`bộ bản đồ chuẩn biên giới quốc gia`, which is not publicly obtainable. That gap
is stated in the product itself, on the verification page, not only here.

**No software implementation resolves a territorial or legal dispute, and nothing
here claims to.** The South China Sea is subject to international dispute. What
this product asserts is narrower and checkable: that it draws what the named,
pinned, publicly downloadable source says, and that no coordinate in it was
written from memory or generated by a model.

---

## 6. Country-border implementation

**Build** — `tools/build-land.mjs`, extended. Authoring tool, run by hand, never
part of `npm run build`. It fetches, decodes, simplifies and writes
`src/data/land.ts` as committed text.

Generated exports: `LAND_PATH`, `BORDER_PATH`, `VN_ISLANDS_PATH`,
`ARCHIPELAGOS`, `LAND_SIMPLIFY_DEGREES`, `LAND_MIN_WINDOW_DEGREES`,
`ARCHIPELAGO_MIN_SPREAD_UNITS`, `CARTOGRAPHY_SOURCES`, `CARTOGRAPHY_RETRIEVED`,
`CARTOGRAPHY_PROJECTION`. The file header carries full
provenance for all three layers, including the reason each source was chosen.

The provenance printed in the register is **generated from the same constants the
geometry was built from**, so it cannot drift from the data the way a
hand-written constant does — this register has reported falsely once before from
exactly that cause.

**Reproducibility, demonstrated not asserted:** re-running the tool regenerated
the coastline layer **byte-identical** to the committed one — 53 723 characters,
verified by string comparison against `git show HEAD:web/src/data/land.ts`.

**Render** — `web/src/components/atlas.ts`. Land and boundaries share one
transform, so a border can never drift from the coastline it ends on. Both use
`vector-effect: non-scaling-stroke`, so widths are in screen pixels and the
hierarchy holds at a 26° window and a 348° one alike.

**Line-weight hierarchy** — `web/src/styles/atlas.css`, and asserted by tests.
These are the **corrected** values; see §16 for the ones that shipped first and
why they failed.

| Layer | Weight | Ink | Contrast vs land |
|---|---|---|---|
| Coastline | 0.6 px × 1.00 = **0.60** | `--rule-strong` | 1.97:1 (+ a land/sea tonal step) |
| Country border | 1.0 px × 0.75 = **0.75** | `--ink-faint` | 3.09:1 nominal, **2.93–3.04:1 painted** |
| Historical route | 1.4 px × 0.70 = **0.98** | `--son` | 3.61:1, and chromatic |
| Turning point | r7 solid | `--son` | highest |

`coastline < border < route`, which is the ordering the brief asks for. The
border needs more contrast than the coastline, not less, because the coastline
gets a second cue for free — land and sea are different fills, so it reads as a
tonal step as well as a line. A border separates land from land and has only the
line.

Border solid, not dashed — a dashed line reads as *uncertain*, which would be the
product making a claim about the boundary rather than drawing the source.

**Corrections made during the work**, all recorded in the code:

1. A first pass raised border opacity to 0.8 on narrow screens, on the assumption
   that the line thinned out as the plate shrank. That was wrong —
   `non-scaling-stroke` holds the width in screen pixels — and it made the width
   with the worst crowding the loudest as well. Removed.
2. The archipelago label used `allInnerTexts()` in a test; SVG `<text>` has no
   `innerText`, so the assertion failed on a label that was drawing correctly.
   Changed to `allTextContents()`.
3. The whole visibility failure in §16, which is the substantial one.

---

## 7. Why province boundaries were excluded

Because the brief requires it, and because the implementation makes it
**structurally impossible** rather than merely filtered.

`countries-110m.json` contains Admin-0 geometry only. There is no Admin-1
geometry in the file, so no province, state, prefecture, county, district or
commune line can enter the product through this path even by accident. That is a
stronger guarantee than a filter, which could be removed.

Two tests hold it anyway: a segment-count ceiling (326 national land boundaries;
an Admin-1 dataset would be several times that) in both the unit suite and the
e2e suite, run against the rendered DOM.

The visual consequence is the one the brief asks for: `COUNTRY A | COUNTRY B |
COUNTRY C`, not a province mesh. The historical journey is not an
administrative-map exercise.

---

## 8. Historical-node integrity

**No historical location was invented, added, moved, placed or removed.**

`web/src/data/places.ts` is **byte-unchanged** from `HEAD` — verified by
`git diff`, which reports no change to that file. So are `stages.ts`,
`source.ts`, `locators.ts` and `figures.ts`.

Specifically unchanged: every `placed`, `named-region` and `unplaced` node, every
`MOVEMENT`, every turning-point placement, and every coordinate with its Wikidata
provenance. Country borders becoming visible did **not** authorise filling an
unplaced historical event with a location. Stage 5 still has no drawable
historical mark, and still says so in its own caption.

The 88 assertions in `content.test.ts` pass unchanged.

---

## 9. Offline implementation

No runtime network request was added. No tile server, no Google Maps, no Mapbox,
no OSM tiles, no remote GeoJSON, no vector service.

All geometry is fetched once at authoring time by a tool that is **not** part of
`npm run build`, converted to plain text, and committed. `npm run build` needs no
network.

`npm run check:offline` drives the single-file build from a `file://` URL with no
server and fails on any request that is not `file://`. Extended in this sprint to
measure the new layers, because a bundler string-replacement going wrong around a
31 KB path would not throw — it would silently produce a plate with no borders,
or with the archipelagos missing, on the one build that runs at the Showcase.

```
ok   plate draws offline (53723 chars of path, 4 marks)
ok   national boundaries draw offline (30977 chars, open polylines)
ok   Hoàng Sa and Trường Sa draw offline (19 island marks, both named)
ok   cartographic source record bundles (13 entries, standard and limits stated)
no network requests, no errors
```

---

## 10. Accessibility

The plate remains **supplemental**. The SVG is `aria-hidden`, carries no
focusable element, and adds no control — borders, island marks and their labels
all live inside that decorative layer, so none is enumerated by a screen reader
and none can trap a keyboard user. Tests hold all of this.

No learner depends on interpreting geographic lines visually. Every cartographic
fact is available as text, in two places: the plate's evidence lens, and the new
`Nền bản đồ: nguồn, quy ước và giới hạn` section of the verification register,
which carries each layer's dataset, version, URL, licence and processing, both
archipelagos with their extent and printed name, and seven explicit limitations.

**Measured contrast** (`tools/carto-audit.mjs`, both themes, against the colour
actually painted behind the glyph):

| | light | dark | requirement |
|---|---|---|---|
| `.plate__isle-label` | **4.53:1** | **5.17:1** | 4.5:1 — text |

**Painted, not nominal.** The audit now rasterises the plate and measures the ink
that actually lands on screen against the fill it crosses — which is the only
measurement that would have caught the visibility failure in §16:

| Sampled region | Painted contrast |
|---|---|
| Border over land, Indochina | **2.93:1** |
| Border over land, Africa/Eurasia | **3.04:1** |
| Archipelago symbols over sea | **4.53:1** |

WCAG 1.4.11's 3:1 minimum formally covers graphical objects *"required to
understand the content"*, and this plate is deliberately not one — it is
`aria-hidden` and every fact it carries is also text. But "not formally required"
turned out to be a bad reason to leave a layer unmeasured, so the painted values
are now gated at 2.6:1 rather than merely printed.

**Reduced motion:** no border, island mark or island label animates or
transitions, in either motion setting — asserted by the audit, not just by the
stylesheet. The existing single `plate-settle` fade on the land layer is
untouched.

**200% text zoom and overflow:** no horizontal overflow at 1920 / 1440 / 768 /
390, plain or at 200%. One real defect was found and fixed here: dataset
filenames such as `ne_10m_admin_0_countries_vnm.geojson` are single unbreakable
38-character tokens and set a 572 px minimum on the register card, pushing a
390 px viewport into horizontal scroll at 200% text. Fixed with
`overflow-wrap: anywhere` on that field only — `long-token-wrapping`,
ui-ux-pro-max Quick Reference §6 — leaving the Vietnamese prose around it to wrap
on word boundaries.

---

## 11. Bundle and performance effect

| | Before | After | Δ |
|---|---|---|---|
| `src/data/land.ts` | 55 282 B | 101 342 B | +46 060 B |
| — `LAND_PATH` | 53 723 chars | **53 723 chars** | **0, byte-identical** |
| — `BORDER_PATH` | — | 30 977 chars | new |
| — `VN_ISLANDS_PATH` | — | 3 126 chars | new |
| JS bundle | 356.24 kB | 406.10 kB | +49.86 kB (+14.0 %) |
| JS gzipped | 109.25 kB | 126.74 kB | +17.49 kB (+16.0 %) |
| CSS bundle | 110.36 kB | 111.16 kB | +0.80 kB (+0.7 %) |
| CSS gzipped | 16.60 kB | 16.75 kB | +0.15 kB |
| Offline single file | 3 878 689 B | 3 929 352 B | +50 663 B (+1.3 %) |

The offline file — the artefact that actually runs at the Showcase — grows
**1.3 %**. Most of its 3.7 MB is inlined fonts and documentary images.

Simplification was chosen, not defaulted: boundaries use the same Douglas-Peucker
tolerance as the land (0.1°), giving 30 KB. Coarser settings were measured
(0.2° → 22.8 KB, 0.35° → 17.1 KB) and rejected — the saving is small and the
0.1° tolerance is already the honest limit of 1:110m source data.

**Neither island layer was reduced to hit a size target.** The archipelago
representation costs about 400 bytes for 19 coordinate pairs plus names and
extents; Vietnam's 24 coastal islands cost 3 KB. There was never a trade-off to
make.

No raw GIS data reaches the browser: no shapefile, no GeoJSON, no TopoJSON, no
projection library. Only preprocessed SVG path strings and a small array. Atlas
render behaviour is unchanged — two extra `<path>` elements, and either 19
`<circle>` plus 2 `<text>` (in-country framings) or 2 `<circle>` (everywhere
else) per plate.

---

## 12. Tests actually run

All results below are copied from actual runs.

| Command | Result |
|---|---|
| `npm run typecheck` | pass |
| `npm run lint` | pass |
| `npm run test` | **139 passed** (was 116; +23 cartography) |
| `npm run build` | pass |
| `npm run e2e` | **255 passed** (was 228; +9 cartography tests × 3 browser projects = +27, after the inset tests were removed with the insets) |
| `npm run build:offline` | pass — 3.75 MB single file |
| `npm run check:offline` | pass — no network requests, no errors |
| `node tools/carto-audit.mjs` | pass — including the painted-pixel acceptance stage |

Two e2e tests failed on a run and were fixed, not suppressed: one used
`allInnerTexts()` on SVG `<text>`, which has no `innerText`; the other asserted
`border < coastline`, the inverted ranking described in §16.

**New unit tests (23)** — boundary geometry is real and within world coordinates;
boundaries are open polylines, never closed; segment count within the Admin-0
range; **no border vertex inside the archipelago box**; exactly two archipelagos;
Vietnamese names match the cited source **and never match `/Wake/i`**; islet
counts 7 and 12 preserved through the build transformation; every islet inside
its published extent; both extents inside the standard's 102-118 E / 4.5-23.5 N
window; label threshold still labels the in-country framings; a source record per
layer with URL and licence; the Vietnam POV edition is the one cited; sources
pinned to a tag, never `/master/`; retrieval date and projection caveat present;
**no cartographic source may carry a `tr. N` textbook locator**; geometry is
committed text, not a URL.

**New e2e tests (14)** — the boundary path renders, is **heavier than the
coastline**, is not transparent, is at least a full pixel wide and **is not the
same ink as the coastline** (the three specific ways §16 failed), all read from
computed style; the layer is national-only with no province mesh; a Vietnam-framed plate shows 19 island marks and both names, and the island
fill differs from the land fill; stage 5 has no marks but a complete basemap; the
world plate keeps the marks and drops the labels; the basemap adds nothing to the
accessibility tree and no keyboard trap; the register carries the sources, the
standard, the POV edition and all four limitation statements; the cartographic
facts are reachable as text from the evidence lens.

**Extended** — `tools/offline-check.mjs` now measures the border path, the 19
island marks, both labels and the register section from the `file://` build.

**New tool** — `tools/carto-audit.mjs`: contrast in both themes, the weight
ranking, overflow at four widths plain and at 200% text, and motion in both
settings.

Per brief §32, **no test adjudicates a political claim.** They check that the
product renders the cited source correctly and that the citation is still
attached. A test cannot settle a territorial dispute and none pretends to.

---

## 13. Screens inspected

Screenshots at 1920 / 1440 / 768 / 390 px in `screenshots/cartography/before/`
and `/after/`, generated by the new `tools/carto-shots.mjs`, inspected by eye —
not merely generated.

| View | Finding |
|---|---|
| **Journey overview** (1920/1440/768/390, + dark) | Country structure now gives orientation; the red route, the country washes and the black marks remain unmistakably the foreground. It does not read as a political world map — no fills, no colour, only restrained hairlines. |
| **Stage 1, Vietnam-framed** (all four widths, + dark, + reduced motion) | Vietnam's outline is now legible against Laos, Cambodia and China, and its coastal islands are drawn. Hoàng Sa and Trường Sa resolve into labelled islet clusters in previously empty sea, each label clear of its own marks after the `hanging` baseline fix. Historical marks still dominate. |
| **Stage 2, world-framed** (all four widths, + dark) | Borders give the `Pháp` wash a country to sit in. Each archipelago is one open ring — no filled mass, no label — after the blob defect was fixed. At 390 px the mesh is quiet after the opacity correction. |
| **Stage 3, Eurasia** (1440) | Paris and Guangzhou read clearly at the two ends of the frame; borders orient without crowding. Archipelagos symbolised, not resolved. |
| **Stage 4, regional** (all four widths) | The stage with the only multi-leg route. The red route lines are clearly the loudest element; borders sit well beneath them. Archipelagos are symbols here, which also removed the label/route collision the review found. |
| **Stage 5, Vietnam-framed** (1440, 390) | The biggest single improvement. Previously a blank blob that read as broken; now a legible map of Vietnam — mainland, coastal islands, both archipelagos named — with deliberately nothing marked on it, which is what makes the caption's finding land. |
| **Verification page** (1440, 390, + section crops) | The new source record reads cleanly in the register's established card pattern; URLs and dataset names wrap; no overflow at 390 px. Captured as a section, not `fullPage` — see §15.5. |

An independent multi-agent visual review of these screenshots was run after
implementation, restricted to the six items brief §39 allows. Its outcome is
recorded in §15.

---

## 14. Remaining cartographic limitations

1. **The enacted QCVN 80 text was not read.** `vbpl.vn` returns 404 for the
   indexed attachment, `thuvienphapluat.vn` returns 403, `vbpl.moj.gov.vn`
   refused connection. Every clause quoted comes from a **pre-signature draft
   PDF** whose own `Lời nói đầu` still has the circular number and date blank.
   Clause numbering is corroborated by the 2025 amending circular, which cites
   the same ids. **A human must open the enacted text before any of this wording
   is published as a quotation.** `NEED VERIFICATION`.
2. **This is not a compliant map product.** `Thông tư 17/2018/TT-BTNMT` Điều 19
   requires the state-published `bộ bản đồ chuẩn biên giới quốc gia`. This
   product does not use it, because no public supply route was found. No
   compliance is claimed, in this report or in the product.
3. **No administrative attribution on the archipelago labels**, because QCVN 80
   prescribes no string and the current administrative form (`đặc khu` since
   01-7-2025) is unresolved.
4. **Two scales are mixed** — 1:110m basemap, 1:10m archipelagos. Unavoidable:
   the archipelagos do not exist at 1:110m. Stated in the register.
5. **The projection preserves neither area, distance nor shape.** Equirectangular
   stretches horizontally with latitude. Stated in the register, not hidden.
6. **`data.gov.vn` and `open.data.gov.vn` were unreachable** from this network
   (connection failure, not 404). The "no open Vietnamese vector geometry"
   conclusion is as strong as that gap allows; someone on a Vietnamese network
   should re-check.
7. **12 of 652 border-arc endpoints** sit 0.1-0.5° from the coastline polyline,
   because the land layer is `ne_110m_land` while the borders come from
   `ne_110m_admin_0_countries`. 154 snap exactly; 486 are correctly inland. No
   visible artefact was found in any framing the product uses, but this has not
   been exhaustively checked worldwide.
8. **Natural Earth POV editions exist only at 10m.** There is no 110m Vietnam
   point-of-view file, so the world basemap's boundary layer is the default
   worldview — which at 1:110m contains no South China Sea island geometry at
   all, so there is nothing for the two worldviews to disagree about there. A
   unit test holds that.
9. **The Vietnam POV file's treatment of maritime claims was not examined.**
   `ne_10m_admin_0_boundary_lines_maritime_indicator_chn.shp` exists upstream and
   was not opened. No maritime boundary of any kind is drawn by this product.
10. **Natural Earth attribute values were read from the `master` branch during
    research**, while the build pins tag `v5.1.2`. The two field values the
    product depends on (`name_vi` for both archipelagos) were re-verified at
    `v5.1.2` directly.
11. **Modern borders under a 1911-1969 narrative.** Orientation context only.
    Year-by-year historical boundary reconstruction is out of scope (brief §17,
    §42).
12. **Admin-0 density at the widest framing on a phone.** Through Europe and
    West Africa the 1:110m mesh reads more as texture than as individual
    countries at 390 px. Quietening it further would fade the borders around
    France and Vietnam too, where the story is. Accepted rather than traded away.
13. **Vietnam's coastal islands are 1:10m against a 1:110m mainland.** They are
    more finely drawn than the coastline they sit beside. Unavoidable: the 1:110m
    dataset does not contain them at all. Imperceptible at the sizes used, but
    stated rather than hidden.
14. **At framings wider than the in-country one, each archipelago is one symbol,
    not its islets, and is unlabelled.** That is deliberate — see §15.1 — but it
    means a reader who only ever opens the overview sees a mark without a name.
    The text beside the plate and the register both carry the names regardless.

---

## 15. Independent visual review

Four independent reviewers examined the rendered screenshots after
implementation, restricted to the six items brief §39 allows: boundary
readability, map density, label hierarchy, route/border competition, mobile
cartography and atlas/story balance. Every non-trivial finding was then passed to
a separate verifier prompted to **refute** it by opening the same file, with the
standing instruction that a remedy which would make the basemap *louder* is wrong
by construction.

**Outcome: 1 blocking and 5 should-fix findings confirmed; 2 refuted.** Three
were fixed, one was already addressed, one is refuted-and-recorded, and one is
accepted as a limitation.

### What the borders themselves scored

Not a finding. Measured stroke cores: border median luminance 217 against a
225-238 fill; coastline 198; route 129; turning point 23. The reviewers
independently confirmed the route is unmistakably the loudest line, the black
marks dominate the Vietnam framings, the overview still reads as a journey rather
than a political world map, and Admin-0 only — they checked Central Asia and
Indochina at 2-4× zoom and found no sub-national lines.

### 1. BLOCKING, confirmed by three verifiers, FIXED

At wide framings the 19 islet marks **merged into two solid filled masses** —
19×17 px and 16×16 px at 1920, luminance 172 against an ocean of 227, *darker
than any land on the plate*, sitting beside the Vietnam node cluster and about
two-thirds the diameter of a turning point. They read as two islands larger than
Hainan, on the product's entry view. This is exactly what brief §15 forbids.

Cause: the marks were sized in canvas units while the cluster's *spread* shrinks
with the framing, so at 348° seven marks of radius 2.4 fell inside four units.

Fixed by measuring the cluster's actual spread on the canvas and, below 45 units,
drawing **one open ring** per group instead — open precisely because a ring
cannot be misread as land area at any size. See §5.6. Held by a unit test on the
threshold arithmetic and an e2e test that asserts `fill: none`.

### 2. Label collided with the historical route at the regional framing, FIXED

Confirmed at 390 px (1.0 px separation) and 1440 px: the route's southern
terminus landed inside the glyphs of `Hoàng Sa`. Brief §16 forbids this.

Fixed by the same change: the regional framing no longer resolves either cluster,
so it draws a symbol and no label. The collision cannot recur there.

### 3. Label overlapped its own islets on mobile, FIXED

The label hung a constant 18 canvas units below the southernmost islet, measured
from the text **baseline** — but the cap height is set in CSS and doubles below
48 rem, so on a phone the text climbed back up into the cluster it names.

Fixed with `dominant-baseline: hanging`, which anchors the **top** of the text
instead, making the clearance independent of the font size.

### 4. Border mesh too dense at phone width, ALREADY ADDRESSED

Reviewers measured the world framing at 390 px against a build in which a
narrow-screen rule had raised border opacity to 0.8. That rule rested on a wrong
assumption — `non-scaling-stroke` holds the width in screen pixels, so the line
never thinned — and it made the width with the worst crowding the loudest as
well. It was reverted to 0.6 before the review returned. See §6.

### 5. Verification screenshot appeared to repeat the page three times, FIXED

A tooling defect, not a product one: `fullPage` on a 44 302 px route produces a
stitched capture in which the header reappears, because the page is far taller
than Chrome's capture surface. `tools/carto-shots.mjs` now captures the section
that changed rather than the whole page.

### 6. REFUTED — "archipelago labels are darker than the route, lighten them"

The observation was right (on stage 5 the labels are the only dark marks on the
plate) but the verifier refuted both the reasoning and the remedy, and the
refutation is correct:

- the brief's ladder is a **line-weight** hierarchy, implemented as
  0.6 px / 0.5 px×0.68 / 1.4 px / r7; a text glyph is not in that ladder, and
  comparing a neutral glyph core to a chromatic hairline by raw luminance does
  not show the label out-shouting anything;
- `--ink-faint` is **the bottom of the ink ramp**. The requested luminance band
  contains only *line* tokens, whose contrast would be 2.2-2.8:1 against today's
  5.05:1 — **below WCAG AA**, with the Vietnamese diacritics in `Hoàng` and
  `Trường` the first thing to go;
- the size half was factually wrong: the label is sized in canvas units, so its
  apparent size is constant across breakpoints;
- stage 5's emptiness is a property of the stage data — it plotted nothing before
  this sprint either, because the excerpt places none of its events.

**No change made.** Recorded because the finding will recur to anyone who
measures glyph luminance against stroke luminance.

### 7. Accepted as a limitation — Admin-0 density at the widest framing

At the whole-world framing on a phone, the 1:110m boundary mesh through Europe
and West Africa is dense relative to the render size and reads more as texture
than as individual countries. Quietening it further would fade the borders around
France and Vietnam too — where the story actually is — and removing them at wide
framings would remove the orientation the sprint exists to add. Recorded in §14
rather than traded away.

---

## 16. Visual acceptance failure, and the root cause

The first implementation of this sprint was **rejected on visual acceptance**.
Every structural check passed and the rendered product did not meet the
requirement. This section records why, because the failure mode is the
interesting part and hiding it would waste it.

### 16.1 What was rejected

> Country boundaries are either too faint, visually indistinguishable from
> coastlines, hidden behind land styling, or not sufficiently visible at the
> actual viewport scale. […] Hoàng Sa is not visibly identifiable; Trường Sa is
> not visibly identifiable; no readable labels are visible.

Correct on every count.

### 16.2 Why it technically passed

Everything that was checked was true. The border path was in the SVG (30 977
characters, 326 open polylines). The archipelago geometry was present (7 + 12
islets, both named from the cited source). 136 unit tests, 255 e2e tests, the
offline check and a contrast audit all passed. An independent four-agent visual
review ran and reported the borders a success.

Each of those verified **presence**. None verified **perceptibility**. The
contrast audit came closest and still missed it, because it sampled *computed
style* — the colour the layer was told to be — and then explicitly declined to
gate the basemap lines on the ground that they are decorative. That reasoning was
sound for WCAG and useless for this: the question is not whether a decorative
layer owes a contrast ratio, it is whether the thing can be seen at all.

### 16.3 The three root causes, each measured

**1. The border used the coastline's own ink.** Both were `rgb(185,171,149)` —
`--rule-strong`. The border was then made *thinner* (0.5 px vs 0.6 px) and *part
transparent* (0.68), so against the land fill it composited to **1.56:1** while
the coastline sat at **1.97:1**. The border was the faintest line on the plate
and the same hue as the line it had to be distinguished from. No amount of width
tuning fixes that; it needed a different token.

**2. Sub-pixel strokes lose about half their contrast to antialiasing.** This one
was invisible even to the composited arithmetic. A 0.8 px stroke is spread across
two pixel rows and reaches its nominal colour in neither: rasterising the plate
and measuring showed **2.15:1 painted against 4.53:1 nominal**. Only going to a
full pixel recovered it — the same layer at 1.0 px measures **2.93–3.04:1**
painted.

**3. Canvas units are not CSS pixels, and the plate is small.** The plate sits in
a reading column and measures **536 CSS px wide at a 1440 px viewport**, so one
canvas unit renders at about **0.54 px**. Everything sized in canvas units was
therefore about half the size it appeared to be in the source:

| | Canvas units | Rendered, before | Rendered, after |
|---|---|---|---|
| Islet mark radius | 2.4 → 3.6 | **1.29 px** | 1.93–2.64 px |
| Archipelago label | 21 → 28 | **11.25 px** | 14.2–20.6 px |

An 11 px label in the palest ink token, and 2.6 px dots in the palest *line*
token, are what "not visibly identifiable" looks like.

Two further contributors, both ruled out by measurement rather than assumed:
**z-order** — the basemap group is the first child of the SVG and nothing paints
over it; and **crop** — every one of the six authored framings contains both
archipelagos, verified against their published extents.

### 16.4 What changed

- Border: `--ink-faint`, **1.0 px**, opacity 0.75 — a different ink from the
  coastline, a full pixel wide, and now *above* the coastline in the ranking
  rather than below it.
- Islet marks: `--ink-faint`, radius 3.6 canvas units.
- **An open group ring round each archipelago at every framing.** This is the
  substantive design change. The islets are 0.3–1.7 km across and can never be
  more than specks without falsifying their size, so a small open locator marks each
  group where it cannot resolve, and the enlarged insets carry the distribution.
  Open rather than filled, because a filled mark at this size reads as land area.
- Label: 28 canvas units, anchored below the ring rather than below the cluster.

No island's true area was enlarged, no geometry was invented, no province layer
appeared, and the route remains the loudest line on the plate.

### 16.5 What now prevents a repeat

`tools/png.mjs` — a dependency-free PNG reader — and a **visual acceptance stage
in `tools/carto-audit.mjs`** that rasterises the plate and measures the ink that
actually lands on screen, against the fill it crosses:

```
ok  painted border over land (Indochina)      2.93:1 vs fill rgb(244,239,230)
ok  painted border over land (Africa/Eurasia) 3.04:1 vs fill rgb(244,239,230)
ok  painted archipelago symbols over sea      4.53:1 vs fill rgb(234,227,214)
```

Plus an e2e guard asserting the three specific ways it failed: the border is not
transparent, is at least a full pixel, and **is not the same ink as the
coastline**. And the weight assertion was inverted — it had encoded
`border < coastline`, so the wrong ordering passed an audit written to catch it.
It now asserts `coastline < border < route`.

### 16.6 The honest lesson

A test suite can only fail on what it was pointed at. This one was pointed at
whether the cartography was *correct* — right source, right convention, right
counts, nothing invented — and it was, all along. It was never pointed at whether
the cartography was *visible*, and a layer can be perfectly correct and not there.

---

## 17. Second visual rejection: the ring was not a representation

The visibility fixes in §16 made the archipelagos *findable*. They did not make
them *legible as archipelagos*, and the operator rejected that too:

> Two large open circles are currently being used to represent Hoàng Sa and
> Trường Sa. These circles are only orientation/group markers. They do NOT
> adequately represent the spatial distribution, shape, or orientation of the
> archipelagos.

Correct. And this time the standard says so explicitly. `QCVN 80:2024/BTNMT`
clause 4.1.2, read directly from the text rather than summarised:

> Đối với quần đảo, cụm đảo phải lưu ý lựa chọn sao cho thể hiện được **mật độ
> phân bố các đảo** đồng thời thể hiện đúng **hình dạng và hướng** của quần đảo,
> cụm đảo đó.

Distribution density, shape, direction. A circle carries none of the three. It
answers *where is it* and nothing else, which is a locator's job, not a
representation's — and §16 had promoted a locator into a representation because
the failure it was fixing was a visibility failure.

**What changed:** two dedicated insets, described in §5.6. The main plate keeps a
*small* locator where the group cannot resolve, and nothing larger.

**What the same reading of clause 4.1.2 also settled**, and this was the more
useful find: the 0.5 mm² threshold and clause 4.8's definition of
`ký hiệu không theo tỷ lệ` mean a constant-size symbol is the **prescribed**
treatment for islands this small, not a compromise forced by the medium. That
removed a doubt carried through §5.6 and §16 about whether any point symbol
"falsely enlarges" an island. It does not; it is what the standard asks for.

**A provenance error found in the same pass.** The operator flagged that Natural
Earth's Vietnam POV download is documented as 5.1.1 while this report said
v5.1.2. Both are true of different things, and the report was conflating them:
`v5.1.2` is the *release tag* the files were fetched from, and the *theme*
versions at that tag are 5.1.1 (Vietnam POV) and 5.0.0 (geography regions), read
from each artifact's own `.VERSION.txt`. Corrected throughout, and a unit test
now asserts the theme versions.

---

## 18. Names removed, insets removed — scope correction

After the insets were delivered, the operator ruled:

> không cần viết trực tiếp chữ Hoàng Sa - Trường Sa vào đâu nhé
>
> xóa luôn 2 ô phóng to đi nhé, vì project này nói về Tư tưởng Hồ Chí Minh, chứ
> không nói về 2 Quần đảo

That is a scope correction and it is right. The requirement had been met and then
overshot: two dedicated inset maps, two on-plate labels and a named register
section had turned a basemap detail into a feature of a product whose subject is
the formation of Hồ Chí Minh's thought across five stages, 1911-1969. Naming the
two groups on the plate also made a sovereignty statement this product has no
need and no standing to make.

**Removed**

- both inset panels, and all their code, styling, tests and screenshots;
- the on-plate text labels;
- the group locator rings (they existed to locate the insets);
- every occurrence of either name from anything a reader can reach — plate,
  evidence lens, verification register — and from the shipped bundle. Verified:
  `grep` over `dist/assets/*.js` and `*.css` returns **0**.

**Kept**

- the offshore island geometry itself, unnamed, as restrained symbols at the
  in-country framings. A map of Vietnam that stopped at the mainland coastline
  would leave out what the source actually contains, and `QCVN 80:2024/BTNMT`
  clause 1.1 names `đảo, quần đảo` alongside `đất liền` and `biển`;
- the full source record in the register — dataset, theme version, URL, licence,
  published extent, resolved extent, point-symbol treatment and its QCVN basis —
  written without naming either group;
- the build tool's internal reading of the source's name field, which is how the
  right features are selected and validated. It stops at the tool; nothing is
  emitted.

**At wide framings the plate now draws nothing there.** Not a ring, not a mark.
The islets fall within a few canvas units of each other at a world framing, the
1:110m dataset the rest of the plate is built from does not contain them at all,
and the register says so in words. Silence is the honest answer at that scale,
and it also disposes of the merged-blob and giant-circle failures for good.

**Guards.** An e2e test asserts the two names appear nowhere in the rendered page
body at either framing, and a unit test asserts no display name ships in the
data — checked structurally, so a name cannot return under a different key. The
cartographic audit now fails if any text element reappears on the plate.

---

## 19. Status

Unchanged by this sprint, and not improved by it:

`REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

This sprint delivered a `PROJECT DECISION` basemap. It authenticates nothing
about the excerpt, evidences no historical claim, and settles no legal or
territorial question. What it does is draw a named, pinned, publicly downloadable
cartographic source correctly, say exactly which source and which edition it
followed, and publish its own limits inside the product where a human can check
them.
