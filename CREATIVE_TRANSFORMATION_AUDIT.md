# CREATIVE TRANSFORMATION AUDIT

> **Date:** 2026-09-17
> **Scope:** the state of the product immediately before the spatial-journey work
> **Status:** `PROJECT DECISION` — an engineering/design audit. No item here is a requirement from the three rule PDFs.
> **Project status, unchanged by this audit:** `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

Preconditions checked before writing this file:

- all four controlled PDFs present; **all four SHA-256 values match** `AGENTS.md` (2019 textbook `A5205…20A`, Student Guideline `B37D8…51A`, Handbook `3F940…54A`, legacy C2 `F8AB7…85E`);
- `git status` clean at `030bb8b`;
- the 2019 migration verified independently — see §0;
- the product was built and run, and every route photographed at 1440 / 768 / 390 px before anything was changed.

---

## 0. Gate check — is the 2019 migration complete?

**Yes.** The creative work is cleared to proceed on this point.

| Check | Result |
|---|---|
| Public citation label | `SOURCE.name === 'Giáo trình Tư tưởng Hồ Chí Minh - 2019'` (`web/src/data/source.ts:36`) |
| Locators are printed pages | `ref()` stores the **printed** page; the PDF sheet is derived by `pdfPageOf()` and used only in the magnifier's audit row (`source.ts:48-120`) |
| Five stage boundaries | exactly `5-6-1911 trở về trước` / `6-6-1911 → 30-12-1920` / `31-12-1920 → 3-2-1930` / `4-2-1930 → 28-1-1941` / `29-1-1941 → 2-9-1969` (`stages.ts`) |
| Stage 5 free of `hoàn thiện` | confirmed in the heading |
| Stale active `C2 PDF p.N` | **none.** Every remaining `C2` string in `web/src` is either a code comment recording the migration or a `SUPERSEDED_RISKS.formerId` audit entry |
| Machine-enforced | `content.test.ts:871-892` serialises the published data and asserts it contains no `C2 PDF`, `C2-02`, `C2-R`, `Giáo trình … - 2021`, or `printed p.` |
| Historical records rewritten? | no — old Prompt Logs and `SOURCE_MIGRATION_2019_REPORT.md` left as written |

**Additionally verified first-hand for this session**, by extracting the eight embedded page images from the image-only 2019 scan and reading them (the file has no text layer, so this is the only way):

- tr.28 prints `Trường Dục Thanh, Phan Thiết` — resolving a variance where the context file's §8.2 summary omits `Phan Thiết`. **The product data was right; the summary was abbreviated.**
- tr.32 prints `tại Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)` — **with parentheses**, matching neither `stages.ts` P4-10 (`Pác Bó thuộc huyện…`) nor context §8.2 (`Pác Bó, huyện…`). Both secondary records paraphrase. The printed form is the one now used for the map label, and the difference is registered.
- tr.29 prints `Từ năm 1911 đến năm 1917, từ Pháp, Hồ Chí Minh đến nhiều nước trên thế giới.` — **no destination country is named anywhere in that span.**
- tr.29 prints `Hội nghị Vécxây (18-6-1919)` and `tại Đại hội ở thành phố Tua (từ ngày 25 đến ngày 30-12-1920)` — `Tua` carries **no country**.
- tr.30 prints `xuất bản ở Pari năm 1925` and `xuất bản năm 1927 ở Quảng Châu, Trung Quốc` — both are **places of publication**, not statements that the subject was present.
- tr.32 confirms the registered print anomalies `trở thành thành` and the abbreviation set as `Sdd`.

---

## A. What currently works well

1. **The academic data layer is the strongest asset in the repository.** `stages.ts` holds the five exact headings, 70-odd printed-page references, evaluative-claim flags, per-passage cautions and explicit `boundaries` arrays naming what the excerpt does *not* say. Almost nothing needs to be re-derived for a spatial layer — the excerpt's own structure is already modelled.
2. **Evidence is genuinely visible and genuinely honest.** Ten locator candidates carried as candidates; the unresolved abbreviation never expanded; a superseded-risk audit trail kept so a removal can be checked rather than trusted; a derived (not hand-written) figure status after a bug where that surface reported falsely.
3. **Image provenance is handled at archival standard.** Four BnF items cleared through three *separate* axes — identity, event/date, usage terms — with `locationCheck` already a distinct field that mostly reads "chưa xác lập". That field is exactly the hook a spatial layer needs. *(Correction, 2026-09-18: superseded by the documentary pass. There are now **eight** documents from **two** holders — seven BnF, one Humazur — and the usage-terms axis was split into four separate fields plus an explicit `reuse` decision. "Mostly reads chưa xác lập" is still fair for `locationCheck`.)*
4. **The previous UX pass genuinely worked.** Navigation systems in the fold 6 → 2 desktop, 6 → 1 tablet; chrome controls 14 → 5; opening fold 511 → 117 words; status labels on a stage 11 → 4.
5. **Offline is real, not aspirational.** A single 2.44 MB HTML file, fonts and images inlined as data URIs, checked by a tool that fails on *any* non-`file://` request.
6. **The token system is better than the generated design system it came from**, and the deviations are documented — Be Vietnam Pro over Inter and the rejection of Playfair Display are justified by Vietnamese diacritic stacking, not taste.
7. **Test coverage is a real constraint**: 78 content invariants + 61 e2e specs × 3 viewports. *(Correction, 2026-09-18: those were the counts before the spatial-journey and documentary passes. The suites now hold **115 unit tests** — 87 in `content.test.ts`, 28 in `places.test.ts` — and **76 e2e specs × 3 viewports = 228 tests**. The point of the row, that the tests are a constraint on what may change, is unaffected.)*

## B. Why it still feels like a website rather than a creative experience

Measured against the "more world, less UI" target, on the screenshots taken before any change:

1. **The product moves through time and text, never through space.** The overview is a temporal staircase; a stage is a pager. There is no `map`, `geo`, `coord`, `lat` or `lon` anywhere in `web/src`. The excerpt's geography — the thing that makes this a *journey* — is invisible.
2. **A stage entrance is a bare list of dates beside a block of prose.** Stage 2's right column is six date strings in a column. It is the visual anchor by default, not by design, and the previous pass admitted as much.
3. **Stage 2 — the most geographic stage in the excerpt — currently has no image and no spatial content at all**, only an honest "chưa có nguồn" note. It is the emptiest screen in the product and the richest in the source.
4. **The reading model is `1 / 11` with Trước/Tiếp.** Faithful and well-built, but a pager is the interface grammar of a document, not of an experience. Nothing about *where* or *what changed* is carried by the movement itself.
5. **Nothing differentiates the five stages spatially.** All five render through the same template, so the enormous difference between them — stage 1 names five places in Vietnam; stage 2 crosses the world and names two — is invisible.
6. **The turning point is well designed but purely typographic.** Its "before → after" is two paragraphs. The excerpt's turns are also turns *in place*, and that is unused.

## C. Reference decomposition

Recorded in full in `REFERENCE_ANALYSIS.md`. Taken: three general principles — space as index, chronology and geography sharing one control, the background calming while you read. Not taken: any file, line, field name, label, asset, colour or layout; and specifically not Three.js, not `react-globe`, not the 41-record schema, not its five phase labels, and not its single-screen/right-drawer architecture.

## D. Originality boundary

The line is drawn at the thesis, not at the pixels. The reference maps **a life**; we map **a source**. Our map is only allowed to go where the assigned excerpt goes, must show visibly where the excerpt stops, and may never fill a gap with general historical knowledge. Concretely that forbids: a departure port on 5-6-1911, an itinerary for 1911–1917, a venue for the early-1930 unification conference, a square for 2-9-1945, a city for the July 1920 reading, and Hà Nội as an event location (it appears in the excerpt only inside footnote publisher addresses).

## E. Academic opportunities — what can legitimately become a spatial node

From the excerpt only, re-read from the page scans:

| Stage | Placed by the excerpt | Granularity |
|---|---|---|
| 1 | Nghệ An · Vinh · kinh đô Huế · Trung Kỳ · Trường Dục Thanh, Phan Thiết | province → **exact site** |
| 2 | Pháp (departure base, and return in 1917) · thành phố Tua · Hội nghị Vécxây (a conference *name*, receiving a document) | country / city |
| 3 | Pari (publication) · Quảng Châu, Trung Quốc (publication) · nước Pháp · Đông Dương (distribution) | city / country / region |
| 4 | Hồng Kông · Liên Xô · Trung Quốc · gần biên giới Việt Nam – Trung Quốc · **Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)** | country → **exact site** |
| 5 | Việt Nam · miền Bắc · miền Nam | country / region |

**Only two exact-site nodes exist in the entire excerpt** — Trường Dục Thanh (1910) and Pác Bó (5-1941).

Movement is stated exactly six times: departure 5-6-1911 (origin and destination both unnamed); `từ Pháp … đến nhiều nước` 1911–1917 (destinations unnamed); `trở lại Pháp` 1917; Hồng Kông → Liên Xô 1934; Liên Xô → Trung Quốc → Việt Nam 10-1938; arrival `gần biên giới` 12-1940.

And the finding that makes the map worth building: **26 dated events in the excerpt carry no place at all** — including six of the eight turning points. The excerpt locates the *journey* far better than it locates the *turns*. *(Correction, 2026-09-18: those were the pre-implementation counts. The shipped data, which is what the register prints, has **18** unplaced nodes out of 40, and of the eight turning points **5 are unplaced, 2 are placed and 1 is a named region**. The shape of the finding is unchanged; the numbers in this sentence are not the numbers on screen.)*

## F. Technical options

| | Approach | Verdict |
|---|---|---|
| **A** | existing stack + SVG/2D plate | **CHOSEN** |
| B | Canvas 2D | rejected — needs a parallel text path for accessibility, no DOM nodes to focus, and gains nothing at 40-odd marks |
| C | WebGL / globe | rejected — a new multi-hundred-KB dependency, a WebGL-failure fallback to build and test, worse offline risk, and it would make the product resemble the reference for no evidentiary gain |
| D | hybrid 2D + enhanced spatial layer | rejected as unnecessary: with ~40 marks, A *is* the experience |

Detailed scoring is in `SPATIAL_JOURNEY_DESIGN_DECISION.md` §10. The deciding facts: the product has three runtime dependencies, all fonts; `lib/svg.ts` already provides a namespaced builder and a Catmull-Rom path helper; the offline build inlines by scanning `dist/` for known asset paths and would need rework for binary textures; and WCAG-level keyboard access is free with SVG elements and expensive on a canvas.

## G. Current architecture — disposition

| Component / model | Disposition |
|---|---|
| `data/stages.ts`, `locators.ts`, `source.ts`, `types.ts` | **remain untouched as the academic backbone.** The spatial layer references passage and turn ids; it never restates a claim |
| `data/figures.ts` | **remains**; its `locationCheck` field becomes the join point between a figure and a place |
| **new** `data/places.ts` | gazetteer + spatial nodes + unplaced register + land geometry, all with their own provenance |
| **new** `components/atlas.ts` | the plate; one component, three compositions |
| `components/stagePage.ts` | **adapt minimally** — the entrance's date column becomes the stage plate; the walker gains a spatial consequence |
| `components/journeyPage.ts` | **adapt** — gains the whole-excerpt plate under the existing thread |
| `components/openingPage.ts` | **adapt** — one quiet section below the fold; the fold itself is not touched |
| `components/verifyPage.ts` | **adapt** — coordinate provenance and unplaced events join the register |
| `components/thread.ts`, `journeybar.ts`, `menu.ts` | **untouched.** The plate must not become a second navigation system |
| `components/evidence.ts`, `sources.ts` | **reused as-is** for the plate's source affordances |
| dead `.pager` CSS (`components.css:690-745`) | leave; out of scope, and removing it is unrelated churn |

## H. UX risk — where a map could make this confusing again

| Risk | Control adopted |
|---|---|
| The plate becomes a **third navigation system** and undoes fix A | The plate is never the only path to a node and adds no standing destination list. On a stage it *replaces* the date column rather than joining it |
| **Chrome-control budget (5) blown** | The plate ships **no zoom, pan or reset controls**. Framing is chosen per composition from the data |
| **Badge budget (4 on a stage) blown** | The plate adds no badge. Evidence stays behind the existing `Nguồn và trạng thái` lens |
| **Red loses its meaning** | Plate marks obey the existing `--son` discipline: red = turning point, current position, focus, the thread. Ordinary placed marks are ink; apparatus is `--cham` |
| **The map steals the turning point's primacy** | At a turning point the plate recedes; the turn stays the widest, loudest beat |
| Mobile becomes **pan-to-read** | Mobile gets a fixed framing and no gestures; every mark's information is in the text flow beneath it |
| Word budget (60–90 in fold) breached | Plate labels are signage, not prose; measured with `word-budget.mjs` after the change |

## I. Evidence risk — what is still unverified

1. **The base source itself.** `GT-R08`: the 2019 file is an unauthenticated image-only scan with a handwritten mark on every page. Everything the plate shows inherits `NEED VERIFICATION`.
2. **Coordinates are a new evidence class this product did not previously have.** They are not in the textbook. They are sourced from Wikidata item records with QID, URL, returned value, stated precision and retrieval date recorded per place, and they carry their own `NEED VERIFICATION` status. A coordinate is never presented as a textbook claim.
3. **Granularity mismatches**, each recorded rather than smoothed: `Tua` has no printed country; `gần biên giới` contains the word *near* and is a zone, not a point; `Liên Xô` is a former state whose Wikidata coordinate is a coarse centroid; the Wikidata item for `Pác Bó` is labelled *Hang Pác Bó* (the cave) in Vietnamese while the excerpt names the locality.
4. **`Vécxây` is a conference name**, not a positional statement, and must be marked as the destination of a document rather than of a person.
5. **`Pari` and `Quảng Châu` are publication places.** Rendering them as "where he was" would exceed the source.
6. **Figure ↔ place joins stay unproven.** Every cleared BnF figure already records `locationCheck` as not established; the plate must not upgrade that by proximity. *(Correction, 2026-09-18: the rule stands, the premise does not. `FS-ky-5` records a place its publication printed and `FS-ky-1-b` is a Humazur item, so "every cleared BnF figure" no longer covers the set.)*
7. **Nine of eleven figure slots remain unfilled**, and no user-testing evidence exists. Neither is changed by this work. *(Correction, 2026-09-18: the product now declares **13** slots, of which **8 are filled and 5 empty** — `FS-open`, `FS-ky-1`, `FS-ky-2`, `FS-ky-4`, `FS-ky-4-b`. The second half of the sentence is unchanged and still true: **no user-testing evidence exists.**)*

---

## Conclusion

The migration gate passes; the academic and provenance infrastructure is strong enough to carry a spatial layer without rebuilding it; the honest content of the excerpt's geography is unusually interesting *because* it is sparse; and the main design risk is not technical but budgetary — the plate must spend none of the density budget the previous pass won.

Proceed to `SPATIAL_JOURNEY_DESIGN_DECISION.md`, then to a Stage 2 vertical slice.
