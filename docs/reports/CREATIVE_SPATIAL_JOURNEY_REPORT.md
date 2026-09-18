# CREATIVE SPATIAL JOURNEY — REPORT

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

> **Date:** 2026-09-17
> **Work:** turning the existing HCM202 product into a spatial learning experience without disturbing its academic, verification, accessibility, offline or UX work.
> **Status:** `CREATIVE PRODUCT IMPLEMENTED — REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

No claim anywhere in this report says that learners understand more, engage more, remember more, or prefer this. No user testing was done, none exists, and none is implied. Everything below is a measurement, a count, or a design decision with its reason.

---

## 1. Starting state

Checked before anything was edited:

- **All four controlled PDFs present, all four SHA-256 values match `AGENTS.md`** — 2019 textbook `A5205…20A`, Student Guideline `B37D8…51A`, Handbook `3F940…54A`, legacy C2 `F8AB7…85E`.
- **The 2019 source migration is complete** for every active public locator. Every remaining `C2` string in `web/src` is either a code comment recording the migration or a `SUPERSEDED_RISKS.formerId` audit entry, and `content.test.ts:871-892` enforces this by serialising the published data and asserting it contains no `C2 PDF`, `C2-02`, `C2-R`, `Giáo trình … - 2021` or `printed p.`. **The creative work was cleared to proceed on stale-locator grounds.**
- The product was built, run, and photographed on every route at 1440 / 768 / 390 px.
- Baseline tests at that point: **78 unit, 213 browser checks, all passing.**

**A commit landed mid-session that was not mine:** `c7a124d` *"xóa verification của chặng 5"*, by `depTraiCoGiSai38`, removing the one-line epilogue notice from the stage 5 screen. It is reported rather than reverted. Checked: the same caveat is still visible in the product through stage 5's own boundary station (`GT-R04`, naming 1975 and `Ngày nay` as outside the 2-9-1969 endpoint) and through the risk register on `#/kiem-chung`, and `EPILOGUE.status === 'NEED VERIFICATION'` is still asserted by a unit test. So the removal took out a duplicate, not an evidence path. My work is built on top of that commit.

### What was read first-hand, because it had to be

The 2019 file has no text layer. Its eight embedded page images were extracted with a stdlib-only script and read directly. That produced three differences from the project's own secondary records, all now registered in `PLACE_READING_NOTES` and printed on `#/kiem-chung` rather than smoothed away:

| | Printed on the scan | What a project record said |
|---|---|---|
| `PR-01` | `tại Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)` — **parentheses** | `stages.ts` P4-10: "…thuộc huyện…"; context §8.2: "Pác Bó, huyện…" |
| `PR-02` | `Là thày giáo ở Trường Dục Thanh, Phan Thiết` | context §8.2 omits `Phan Thiết`. **The product data was right; the summary was abbreviated.** |
| `PR-03` | `biên giới Việt Nam – Trung Quốc` (en dash) | `stages.ts` P4-8 uses a hyphen |

Also confirmed by eye on the scans: `trở thành thành` (tr.32), `Sdd` not `Sđd` (tr.32), `thày giáo` (tr.28) — the registered print anomalies are real.

## 2. Reference analysis

Full decomposition in [`REFERENCE_ANALYSIS.md`](REFERENCE_ANALYSIS.md); the originality trail is in [`docs/REFERENCE_USE_RECORD_2026-09-17.md`](../REFERENCE_USE_RECORD_2026-09-17.md).

`_reference/creative_product_HCM202` was cloned, read, and never modified — `git status --porcelain` empty before and after, and the directory is git-ignored. It is **not an academic source** and is cited nowhere in the product.

What it is: a single-screen React 16 app with a full-viewport `react-globe` WebGL sphere, 41 event records each carrying `[lat, lng]`, a right-hand 35 % drawer, and a top-right phase accordion. What it is not: routed, keyboard-operable, or offline-capable — two `aria-*` attributes exist in the whole codebase and both sit on dead code; every primary control is a `div` with `onClick`; globe textures, fonts and ~76 % of media are fetched from third parties at runtime.

Recorded because it bears on originality: its first commit is `db5eb94`, 2019-04-10, *"bootstrap metoorising mvp"* by Chris Zhou. It is a re-skin of `chrisrzhou/google-globe-trends`, and the evidence is still in the tree (`about.js:13-42`, `link.js:3-13`, `overlay.js:23,36`). Its globe is itself inherited.

**Three general principles were taken and nothing else:** space as an index; chronology and geography sharing one control; the background calming while you read.

## 3. Originality boundary

Not taken: any file, line, field name, label, asset, colour or layout; `react-globe`/`three`; its 41-record 13-field schema; its five phase labels (which do not match the 2019 edition's exact dated boundaries, and which its own code and README state differently from each other); its one-screen/right-drawer architecture; its `templateType` mechanism; its coordinate-string grouping. And specifically not the subtlest form — the same product with our text in it.

**The thesis is the difference.** The reference maps *a life*. This maps *a source*.

## 4. New product concept

> **BẢN KHẮC — the plate. A documentary map that travels exactly as far as the assigned excerpt travels, and stops visibly where the excerpt stops.**

Reading the eight pages for *place* rather than *date* turns up something worth building around, and it is a finding about the document, not about history:

- the excerpt names a place for some events and not for others;
- it states a movement in drawable form exactly **4** times, and **2** of those 4 have an end it never names;
- and of its **8 turning points, only 2 carry a printed location.**

**The excerpt locates the journey far better than it locates the turns.** A map that quietly filled those gaps from general knowledge would be inventing historical facts — the category both rule documents place in their most serious band. So the gaps are the design.

The suggested framing in the brief ("geography reveals the five-stage development of thought") is adopted with that correction, recorded in [`SPATIAL_JOURNEY_DESIGN_DECISION.md`](SPATIAL_JOURNEY_DESIGN_DECISION.md) §1.

## 5. Academic–spatial model

Three mark kinds, because the excerpt does exactly three things:

| Kind | Meaning | Drawn as |
|---|---|---|
| `placed` | a place is printed, and it reduces to a point | a mark on the land |
| `named-region` | a place is printed but is **not** a point (`Trung Kỳ`, `Đông Dương`, `miền Bắc`, `miền Nam`, `gần biên giới…`) | listed, never pinned |
| `unplaced` | a date, and no place at all | an em dash in the list, nothing on the land |

Plus: a **line** only where the excerpt states a movement; **open rings** where such a movement has an unnamed far end — rings and not a ray, because a ray must point somewhere and pointing somewhere is naming a destination the page does not give; a **wash** and never a pin for a country, because a country is not a point.

Marker weight follows *the excerpt's* granularity, never the coordinate record's precision. Colour obeys the existing `--son` discipline unchanged: turning points, where you are, focus, the thread. Kind is never carried by colour alone — shape, position and text all state it (`color-not-only`).

## 6. Verified spatial nodes

**19 places, 40 nodes, 4 movements**, every one anchored to a passage / turning point / quotation id that already existed in `stages.ts`, so no node adds a claim to the source.

| Stage | Nodes | placed | named-region | unplaced | Framing, and why |
|---|---:|---:|---:|---:|---|
| 1 | 6 | 4 | 1 | 1 | Vietnam — the **densest** stage for place names in the whole excerpt |
| 2 | 8 | 5 | 0 | 3 | **the whole world** — not because it has many points but because it has almost none: six years of travel, one named country |
| 3 | 8 | 3 | 1 | 4 | France ↔ South China — the two places are where **texts were published**, not where the subject is said to have been |
| 4 | 8 | 4 | 1 | 3 | Eurasia — the only stage stating a multi-leg route, ending at the excerpt's most precise location |
| 5 | 10 | 0 | 3 | 7 | Vietnam — **nothing is drawable at all**; the stage names only a country and two half-countries |

- **16** nodes are drawable as a point; **18** carry a date and no place; **6** name a region that is not a point.
- **Only 2 exact-site places exist in eight pages:** `Trường Dục Thanh, Phan Thiết` (1910) and `Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)` (5-1941).
- Turning points: **2 placed, 5 unplaced, 1 region.**
- Movements: `từ Pháp … đến nhiều nước` (open), `trở lại Pháp` 1917 (open), Hồng Kông → Liên Xô 1934, Liên Xô → Trung Quốc → Việt Nam 10-1938.

**Coordinates are a new class of evidence** and are handled as such: 14 of 19 places carry one, each quoting a Wikidata item — id, URL, returned lat/lon, **the precision the record itself publishes**, and the retrieval date. Wikidata is a checkable source, not an authority under the Student Guideline's hierarchy, so every coordinate stays `NEED VERIFICATION`. The other 5 places record *why* they cannot be a point.

## 7. Nodes rejected / blocked

Every one of these was left empty on purpose, and a named unit test now fails if a later edit fills it:

| Not placed | Because |
|---|---|
| Departure, `5-6-1911` | the excerpt prints no port, city, ship or direction — only "đi ra nước ngoài" |
| The 1911–1917 travel | **no destination country is named anywhere.** `Anh`, `Mỹ`, `Nga` do appear — on tr.30, in stage 3, as the names of *revolutions summarised in a book*. Turning those into destinations would be fabricating history |
| Reading Lenin's theses, `7-1920` | no place printed — and it is the stage's central turning point |
| Founding `Hội Việt Nam Thanh niên Cách mạng`, `6-1925` | no place. `Quảng Châu` is printed for `Đường cách mệnh` in **1927** and may not be lent backwards |
| The unification conference, `đầu năm 1930` | no place printed |
| Return to the country, `cuối tháng 1-1941` | no place. Pác Bó belongs to **5-1941** |
| Reading the `Tuyên ngôn Độc lập`, `2-9-1945` | no square, no city, no capital in this text |
| `Hà Nội` | appears in the excerpt **only** inside footnote publisher addresses — a different kind of datum entirely |
| `Bến Nhà Rồng`, `Sài Gòn`, `Ba Đình`, `Mátxcơva`, … | never printed; blocked by a test that names them |

Also deliberately qualified rather than promoted: `Hội nghị Vécxây` is a **conference name receiving a document**, not a statement that anyone went there; `Pari` and `Quảng Châu` are **places of publication**; `thành phố Tua` carries **no country** in the text.

## 8. Image integration

The image protocol is untouched and nothing was added to it. The plate adds no image, fills no slot, and does not upgrade any provenance. ~~The nine unfilled slots remain unfilled and visibly blocked.~~ **SUPERSEDED 18-9/19-9-2026:** five of thirteen are unfilled and visibly blocked — see `HISTORICAL_IMAGE_INTEGRATION_REPORT.md`. The statement about *this* pass is still true: the spatial work added no image and upgraded no provenance.

One change, minimal as the brief asked: the stage entrance's side column now runs **plate → primary figure** instead of **dates → primary figure**, and on narrow screens the order is `plate → figure → heading → story`, matching the specified mobile sequence. Supporting figures stay attached to the passage / turn / quotation they explain, which was already true.

The plate may point at a figure but may never establish one: every cleared BnF item records `locationCheck` as not established, and proximity on a map is not evidence. *(Correction, 2026-09-18: the rule still holds and the plate still never establishes a place, but the premise has moved. After the documentary pass there are eight figures from two institutions, not four from one; `FS-ky-5` records a place its own publication printed, `FS-ky-1-b` records a `dcterms:spatial` value and is held by Humazur, not the BnF. So "every cleared BnF item records `locationCheck` as not established" is no longer true as written.)*

## 9. Motion system

Budget unchanged at one to two movements per screen, and **nothing is revealed only by motion**.

- Plate marks **do not animate** — no pulsing, bouncing, particles, spinning or autoplay.
- The overview plate's land fades in once, on first view, for the same reason the overview thread already draws itself once.
- No camera flight, no scroll-jacking, no lens flare.
- Under `prefers-reduced-motion` or the in-product switch the fade is skipped and the plate is simply already drawn. Verified by a browser check that loads with reduced motion and asserts every mark and row is present.

## 10. Technical architecture decision

**Option A — the existing Vite + TypeScript stack, flat SVG, zero new runtime dependencies.** Options B (Canvas), C (WebGL globe) and D (hybrid) were scored in the design record; the full table is there.

Two facts decided it:

1. The product has three runtime dependencies, all fonts. `lib/svg.ts` already provides a namespaced element builder and a Catmull-Rom path helper. SVG gives keyboard access, text scaling and reduced motion for free; Canvas and WebGL each require a parallel DOM to be built and tested.
2. **The skill's own data says so.** `search.py "geographic map data" --domain chart` returns *Geographic Data → Data Volume Threshold: `<1000 regions: SVG; ≥1000: Canvas/WebGL (Deck.gl)`*. This plate draws about twenty marks. Adding Three.js would have been a dependency taken on to resemble the reference — exactly what the brief forbids.

**Basemap:** Natural Earth 1:110 m land via `world-atlas@2.0.2` (ISC; Natural Earth is public domain), decoded by `tools/build-land.mjs` into **52 KB of plain SVG path text, committed to the repo**. No runtime fetch, no build-time network. **Land only — no country borders**, because the excerpt spans 1911–1969 and present-day boundaries would be an anachronism asserted beneath the content. Equirectangular projection, so a viewBox is written in degrees; its high-latitude stretching is stated in the register rather than hidden. Rings crossing the antimeridian are split rather than drawn across the plate. Zoom is capped at a 24° window so the plate cannot imply precision the 1:110 m data does not have.

Bundle cost: JS **207.05 kB → 302.39 kB** (gzip 60.42 → 95.17 kB). Offline single file **2.44 MB → 2.53 MB**.

## 11. Accessibility fallback

There is no WebGL, so there is no WebGL failure mode. Beyond that:

- The drawing is `aria-hidden`, `focusable="false"`, and **contains no focusable element** — an aria-hidden subtree that can take focus is a keyboard trap. A browser check asserts this.
- Everything the plate draws is present as text beside it. **If the SVG did not render, no stage, node, claim, source or activity would become unreachable.** This is the skill's own recommended fallback for geographic data ("*sortable region table plus geographic summary*").
- Where a marker has no printed date, the cell is left visually empty with the fact stated for a screen reader — **because an em dash already means "no place given" in the next column, and one glyph carrying two meanings in one row is a wrong drawing, not a legend problem.** Found by looking at a screenshot, not by a test.
- Contrast: `tools/ux-audit.mjs` samples ~60 selectors across 11 routes in **both themes** — **all sampled text at or above the minimum.**
- 200 % text at 390 / 834 / 1440 px: **no overflow, no clipped text** (see §17 for the two bugs this found).

## 12. Offline behaviour

`npm run build:offline` → **2.53 MB single file, 42 fonts and 4 images inlined.** *(Correction, 2026-09-18: that was the state on 2026-09-17. The documentary pass added four more figures; re-run on 2026-09-18 the bundle is **3.69 MB with 42 fonts and 8 images inlined**, and `check:offline` reports 9 image appearances decoded, no network requests, no errors.)*

`npm run check:offline`: 11/11 routes render, traverse reaches a turning point, presentation mode opens, 4 documentary images decode from `data:` URIs, 27 fonts load from the bundle, and — a new check added for this work — **the plate draws from `file://` with 53,723 characters of path and 4 marks.** Final line: **`no network requests, no errors`.**

That check was added because the offline bundler rewrites the script with string replacement in order to inline images, and a replacement going wrong around a 52 KB path string would not throw — it would silently produce a plate with no coastline, on the one build that runs at the Showcase. (Writing it also exposed a bug in the check itself: it re-issued the same hash, which does not re-render, so it measured a deliberately collapsed element. It now moves to a different stage.)

## 13. Mobile design

Mobile is a different composition, not a shrunken one, and **map manipulation is never required to reach content** — there is no map manipulation at all, on any screen.

Order at 390 px: `plate → place/period list → image → heading → story → evidence → next`, matching the specified sequence. The plate has a fixed framing, no gestures, no controls, and is capped so it cannot push the reading off screen.

It also removed an old defect: the stage entrance's date strip used to scroll sideways and clip its last marker off the edge. The list now runs down the page with a place beside each date — nothing to scroll, nothing to clip.

Cost, measured honestly: the stage-2 reading controls sit further down the page than before — desktop 1010 → 1131 px, tablet 1177 → 1758, mobile 1267 → 1709. They were **already below the fold in the baseline at every width**, so this is not a new class of problem, but on tablet and mobile the distance roughly doubled. That is the price of putting spatial context first on a phone, which is what the brief specifies.

## 14. Existing UX preserved

Measured with `tools/audit-density.mjs`, the same instrument as the previous pass. The plate **replaces** the bare date column; it is not added beside it.

| Budget from the previous pass | After this work |
|---|---|
| Navigation systems on a stage screen | **1** desktop / 1 tablet / 1 mobile (was 2/1/1) |
| Chrome controls in the fold after the opening: **5** | **5** on every route, every width |
| Status labels on a stage screen: **4**, all mandatory | **4** — `station__flag` ×2, `walk__chapter`, `jbar__where`. **No badge was added.** |
| Distinct type sizes on a stage screen: 6 | **6** |
| No literal `font-size` outside SVG units | held |
| Red means turning point / where you are / focus / the thread | held — plate marks and open rings are turning points and the thread in space; ordinary marks are ink |
| No permanent rail, no duplicate pager, no phase tab bar, no "you are here" repetition | none reintroduced |
| Plate's own controls | **zero** — no zoom, no pan, no reset; framing is authored per stage from the content |

Word budget (target 60–90 prose words in the fold): opening 98 (was 98), journey overview 67 (was 67), stage-2 states 141 / 109 / 138 (was 122 / 139 / 168). *(Correction, 2026-09-18: `opening 98` is the one number on this line that has moved. The opening photograph was reassigned to stage 3 and the slot now shows a blocked line whose role sentence counts as prose, so the real current figure is **opening 104 + signage 8, verdict `over, close`**. Re-measured by running `node tools/word-budget.mjs` against the current build on 2026-09-18; every other number on this line reproduces exactly.)*

`tools/station-audit.mjs`, every stop of all five stages: **27 of 85 states over 90 words — identical to the baseline's 27 of 85.** Stated plainly: the one-line place note is classified as signage in that tool, in the same category as `.station__marker`, which is already there. Counted instead as prose it would be **33 of 85**. Both numbers are given so the effect of that line is visible rather than absorbed. *(Correction, 2026-09-18: re-run today `tools/station-audit.mjs` reports **28 of 85**, not 27. The count moved after this report was written. The 33-if-counted-as-prose figure was not re-derived today and is left exactly as it stood.)*

## 15. Files changed

**New — product**

| File | Lines | What |
|---|---:|---|
| `web/src/data/places.ts` | 1,021 | 19 places, 40 nodes, 4 movements, 3 reading notes, derived counters |
| `web/src/data/land.ts` | 37 | generated land path, 126 rings, 4,067 points, licence in the header |
| `web/src/components/atlas.ts` | ~760 | the plate, the stage block, the overview section, the per-stop line |
| `web/src/components/placeRegister.ts` | 216 | coordinate provenance and the unplaced list, for `#/kiem-chung` |
| `web/src/styles/atlas.css` | ~360 | plate styling; every colour an existing token |

**New — tooling and tests**

| File | Lines | What |
|---|---:|---|
| `web/src/test/places.test.ts` | 322 | 28 invariants, written to fail if a gap gets filled |
| `web/e2e/atlas.spec.ts` | 186 | 10 browser checks × 3 viewports |
| `web/tools/build-land.mjs` | 187 | regenerates the land path; the only thing here that fetches |
| `web/tools/plate-shots.mjs` | 70 | 16 screenshots: five stages, three widths, both themes, reduced motion |

**Modified** — `stagePage.ts` (plate replaces the date column; per-stop line; reflection line), `journeyPage.ts` (overview section; boundary label split), `verifyPage.ts` (register section), `main.ts` (one import), `experience.css` (mobile order; dead date-column CSS removed; boundary-label wrapping), `interactive.css` (register grid minimum sizes), `offline-check.mjs`, `station-audit.mjs`, `word-budget.mjs`.

**New — records** — `REFERENCE_ANALYSIS.md`, `CREATIVE_TRANSFORMATION_AUDIT.md`, `SPATIAL_JOURNEY_DESIGN_DECISION.md`, this report, `docs/07_AI_Prompt_Log_SpatialJourney_2026-09-17.md`, `docs/REFERENCE_USE_RECORD_2026-09-17.md`, `docs/prompts/P-SPACE-01.txt` (the complete prompt, verbatim).

**Not touched:** `stages.ts`, `locators.ts`, `source.ts`, `types.ts`, `figures.ts`, `project.ts`. **No academic proposition was added, altered or removed.** The Central Question is unchanged, character for character.

## 16. Tests actually run

Everything below was run; nothing is projected.

| Command | Result |
|---|---|
| `npm run typecheck` | pass |
| `npm run lint` | pass |
| `npm run test` | **106 passed** (78 existing + 28 new) — *2026-09-18: now **113**, after the documentary pass added 7* |
| `npm run build` | pass — JS 302.39 kB, CSS 106.91 kB |
| `npm run e2e` | **213 passed, 0 failed** (71 specs × laptop 1440 / tablet 768 / mobile 375), 8.7 min — *2026-09-18: the suite is now **76 specs × 3 viewports = 228 tests**, after `atlas.spec.ts` and the figure specs were added* |
| `npm run build:offline` | 2.53 MB, 42 fonts, 4 images |
| `npm run check:offline` | 11/11 routes, plate draws, **no network requests, no errors** |
| `node tools/ux-audit.mjs` | **exit 0** — contrast at or above minimum in both themes; 200 % text clean at 390/834/1440 |
| `node tools/audit-density.mjs` | 7 routes × 3 widths; budgets held (§14) |
| `node tools/word-budget.mjs` | 6 states (§14) |
| `node tools/station-audit.mjs` | 85 states; 27 over 90 words, same as baseline |
| `node tools/plate-shots.mjs` | 16 screenshots, no page errors |

Baselines were measured, not assumed: a `git worktree` at `c7a124d` was built and served alongside, and `word-budget`, `station-audit` and `ux-audit` were run against **both** builds with the same tool version.

## 17. Remaining risks

**Three real defects were found and fixed during this work. Two were found by looking, not by a test.**

1. **An em dash meaning two different things in one row** — "no date" in the marker column and "no place" in the next. Found in a screenshot. The marker cell is now empty with the fact given to screen readers.
2. **Stage 5's plate is legitimately empty and read as broken.** The caption is now derived and changes when nothing is drawable.
3. **Horizontal overflow at 375 px on `#/kiem-chung`** (377 > 376), caught by the existing e2e check. Cause: a Wikidata URL is one unbreakable token. Fixed per the skill's `long-token-wrapping` rule — `overflow-wrap: anywhere` on the URL and on the numeric data line, with the Vietnamese prose deliberately left alone.

Two **pre-existing** bugs surfaced and were fixed as well: `.register` and `.register__item` lacked `min-inline-size: 0`, so a long token could make a card wider than its list; and `.atlas__boundary` was `white-space: nowrap`, so at 200 % text the last joint label pushed `#/hanh-trinh` to 426 px — present in the baseline too. Each date now keeps `nowrap` individually while the label may wrap between them.

Open risks:

- **The base source is still an unauthenticated scan** (`GT-R08`). Everything the plate shows inherits `NEED VERIFICATION`.
- **Coordinates are unverified by design.** They are quoted from Wikidata, not from an approved source, and Wikidata is not in the Student Guideline's hierarchy.
- **Granularity mismatches**, all recorded, none resolved: `Tua` has no printed country; `gần biên giới` contains the hedge *near*; `Liên Xô` is a former state with a coarse centroid; the Wikidata item for `Pác Bó` is labelled *Hang Pác Bó* — **the cave, not the locality the excerpt names.**
- Stage-2 reading states remain over the 90-word budget, as they were before this work.
- ~~Nine of eleven figure slots remain unfilled.~~ **SUPERSEDED 18-9-2026, not deleted:** the
  documentary pass took this to **five of thirteen unfilled**, and declared two further
  supporting positions while doing so. Stage 5's entrance now holds a photograph. See
  `HISTORICAL_IMAGE_INTEGRATION_REPORT.md`; the authoritative counts are derived from
  `FIGURE_SLOTS` on the verification page, not from this line.
- No user evidence of any kind exists.

## 18. Human verification still needed

1. Compare tr.28–35 of the supplied scan against the **approved official edition**, including the three reading notes in `PLACE_READING_NOTES`.
2. Check every coordinate against a source the course documents accept — or rule that a map without surveyed coordinates is acceptable for this product.
3. Rule on whether `Hội nghị Vécxây` may carry a mark at all, given that the excerpt states only that a document was sent *to* it.
4. Rule on whether publication places (`Pari`, `Quảng Châu`) should be visually distinct from places of presence beyond the wording already used.
5. Confirm the Central Question and the product title, both still `PROJECT DECISION — NEED APPROVAL`.
6. Rule on the product version label, still `VERSION LABEL — NEED LECTURER CONFIRMATION`.
7. The **five** remaining unfilled figure slots — **`FS-open`**, `FS-ky-1`, `FS-ky-2`,
   `FS-ky-4`, `FS-ky-4-b` — the unresolved `Sdd` abbreviation, the ten locator candidates, and
   the `DOCUMENT CONFLICT` register all still need their rulings. *(The number was nine when
   this report was written. **Corrected 19-9-2026:** an earlier amendment of this line listed
   `FS-ky-3` among the empty slots and omitted `FS-open` — the two that ruling 2 swapped.)*

   The two questions raised on 18-9-2026 were **both answered on 19-9-2026** and are no longer
   open: `SC-22` → `SC-24`, the Marseille portrait moved to stage 3's entrance; `SC-20` →
   `SC-26`, the 1946 material is kept but classified `USE WITH CAUTION` with the rights split
   into four axes. What remains open from them: the photographer's own position, recorded as
   **CHƯA XÁC LẬP**, and whether that caution should apply only to 1946 material.
8. Real user testing and evidence-based revision: **not done, not simulated, not claimed.**

---

**Status: `CREATIVE PRODUCT IMPLEMENTED — REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`**

### Appendix — how `ui-ux-pro-max` was used

The skill is installed at `.claude/skills/ui-ux-pro-max` and was invoked and run, not merely cited. Python 3.13.15; `scripts/search.py` is the only CLI entry point.

| Query actually run | What it returned | What it changed here |
|---|---|---|
| `"interactive historical atlas museum editorial storytelling" --design-system --variance 4 --motion 4 --density 2` | pattern *Scroll-Triggered Storytelling*; style *Minimalism & Swiss*; **Inter + Playfair Display**; a GSAP `Stagger List` preset | **Palette and fonts rejected, on the record** — Playfair Display lacks full Vietnamese diacritic coverage, and a black/white palette would erase the assigned meanings of `--son`, `--cham` and `--verify`. This repeats the documented 16-9 decision rather than reopening it. The GSAP preset was not used: the project has no GSAP and adding one for a fade would breach the smallest-technology rule. **Kept** from the pattern: a progress indicator, and the narrative must be readable with effects off. |
| `"museum archival editorial exhibition" --domain style` | `editorial-grid-magazine` — *"Light ✓ / Dark ✓, Performance cost:low, Accessibility risk:low, requires: contrast-text-4.5, keyboard, visible-focus, reduced-motion"* | Confirmed the existing editorial direction and gave the four-item accessibility contract this work was then held to. |
| `"geographic map data" --domain chart` | *Geographic Data* → **`<1000 regions: SVG; ≥1000: Canvas/WebGL`**; *"location meaning cannot depend on color alone"*; fallback *"sortable region table plus geographic summary"* | **Decided Option A.** Twenty marks is far under the SVG threshold. Drove the text-list-beside-the-drawing fallback, and the rule that mark kind is never carried by colour alone. |
| `"reduced motion scroll storytelling" --domain ux` | *Reduced Motion* (High) and *Motion Sensitivity* (High) — *"present the final readable state without parallax or scroll-jacking"*; *Excessive Motion* — *"animate 1–2 key elements per view maximum"* | Held the 1–2 movement budget; the plate animates one element once, and under reduced motion is simply already drawn. |
| `"keyboard navigation interactive map region" --domain ux` | *Keyboard Navigation* (High); *Compact Control Semantics* (**Critical**) — *"prefer a button and expose pressed or selected state… don't use a clickable div"* | The drawing takes no focus at all and the list is the control, so no `div`-as-control was created. |
| `"color alone conveys meaning" --domain ux` | *Color Only* (High); *Color Contrast* (High, 4.5:1) | Mark kind is carried by shape, position and text as well as colour; `ux-audit.mjs` measures the composed result in both themes. |
| `"decorative svg aria hidden text alternative" --domain ux` | *ARIA Labels* (High) — accessible names for icon-only controls | Confirmed the decorative-SVG treatment `lib/svg.ts` already sets. |
| Quick Reference §6 `long-token-wrapping` | *"Let URLs, IDs and user content reflow with `overflow-wrap: anywhere`… do not apply `word-break: break-all` to normal prose"* | The exact fix for the 375 px overflow. Applied to the URL and the numeric data line **only**; Vietnamese prose left alone. |
| Quick Reference §4 `primary-action`, §5 `mobile-first` / `horizontal-scroll` | one primary CTA per screen; no horizontal scroll on mobile | The opening fold was left untouched (one primary action), and horizontal overflow is now clean at 375/390/768/1440. |

`design-system/hanh-trinh-tu-tuong/MASTER.md` was **read and not overwritten**; `--force` was never used, and no token value was changed by this work.

**One deviation from the brief, stated rather than buried.** §16 suggests the opening run *invitation → space appears → guiding question*. The opening was left structurally as it is. Its fold is a measured artefact of the previous pass — 511 → 117 words, one primary action — and it already ends with the five-stage thread; adding a second drawing there would duplicate the overview one screen later and spend a budget that was expensively won. The spatial reading lives on the overview, which the existing secondary action opens, and a learner who goes straight into stage 1 meets the plate immediately anyway.
