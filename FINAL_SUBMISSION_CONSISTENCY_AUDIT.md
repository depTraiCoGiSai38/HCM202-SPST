# FINAL SUBMISSION CONSISTENCY AUDIT
## HCM202 — HÀNH TRÌNH TƯ TƯỞNG

> **Date:** 2026-09-18
> **Kind:** verification-only pass. No redesign, no new features, no new historical claims, no new image search.
> **Question asked:** do CODE ↔ DATA ↔ UI ↔ TESTS ↔ REPORTS ↔ VERIFICATION RECORDS describe the same product?
> **Answer:** they do now, for everything corrected in §C — **except two items that need a human, not an edit**
> (the impossible date, and one unverifiable design-evidence record). So the phrase
> `FINAL SUBMISSION CONSISTENCY AUDIT PASSED` is **withheld**; see *Completion condition* at the end.
> **Overall project status, unchanged:** `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

Every number in this document was recomputed by executing the product's own data and tools. No number
was copied from an earlier report. Where a recomputed number is worse than the published one, the worse
number is what appears here.

**Method.** `web/src/data/*.ts` was executed through `vite-node`; the reference repository was counted by
parsing `hcm_data.json` rather than grepping it; every tool cited was run and its output pasted. Twelve
independent audit passes were run over separate dimensions, and each of their findings was then given to a
separate adversarial checker whose default was to refute it. 98 findings survived that check; 58 were
refuted and dropped. Four refutations corrected this audit's own work and are recorded in §C.4.

---

## A. Recomputed current state

### A.1 Documentary figures

Derived from `web/src/data/figures.ts`. A slot is filled when a `FIGURES` record shares its id;
`FigureSlot` has no `figureId` field, so id equality is the only join.

| Quantity | Value |
|---|---|
| Declared positions (`FIGURE_SLOTS`) | **13** |
| Filled | **8** |
| Empty | **5** |
| Records (`FIGURES`) | **8** |
| `figureFilledCount()` | 8 |
| `figureStatus()` | `NEED VERIFICATION` |
| Orphan records (a record with no slot) | 0 |
| Records whose `stageId` disagrees with their slot's | 0 |

**The five empty positions are exactly:** `FS-open`, `FS-ky-1`, `FS-ky-2`, `FS-ky-4`, `FS-ky-4-b`.
`FS-ky-3` is **filled** — it holds the reassigned Marseille plate.

**Reuse decisions** (`reuse`, a separate axis from evidence status):

| Decision | Count | Records |
|---|---:|---|
| `USE` | **4** | `FS-ky-1-b`, `FS-ky-3-b`, `FS-ky-3-c`, `FS-ky-5-b` |
| `USE WITH CAUTION` | **4** | `FS-ky-2-b`, `FS-ky-3`, `FS-ky-5`, `FS-ky-5-c` |
| `NEED VERIFICATION` | **0** | — |
| `REJECT` | **0** | — |

**Evidence status** (`status`, the `Provenance` axis): `NEED VERIFICATION` for **all 8**. Nothing in this
product has been authenticated by a person.

**Primary anchors.** Six slots carry `kind: 'primary'` — the opening plus one per stage. Two are filled:

| Stage | Slot | State |
|---|---|---|
| — (opening) | `FS-open` | EMPTY |
| `ky-1` | `FS-ky-1` | EMPTY |
| `ky-2` | `FS-ky-2` | EMPTY |
| `ky-3` | `FS-ky-3` | FILLED · `bnf-btv1b9054078w-900.webp` · `USE WITH CAUTION` |
| `ky-4` | `FS-ky-4` | EMPTY |
| `ky-5` | `FS-ky-5` | FILLED · `bnf-bd6t5144731t-f82-1000.webp` · `USE WITH CAUTION` |

### A.2 Source checks

`SOURCING_CHECKS` holds **26** entries:

| `outcome` | Count | Ids |
|---|---:|---|
| `cleared` | **12** | SC-4, 5, 6, 7, 10, 11, 18, 19, 20, 21, 24, 26 |
| `unresolved` | **8** | SC-1, 2, 9, 12, 13, 22, 23, 25 |
| `rejected` | **6** | SC-3, 8, 14, 15, 16, 17 |

"Rejected candidates" is **6 checks**, not 6 photographs, and the six are not all the same kind of thing:
**three are rejected items** (SC-3 a Commons file, SC-14 a Humazur portrait, SC-15 a Gallica item opened to
test a likely confusion), **two are rejected searches** (SC-8 a Gallica query, SC-17 a Commons category read
file by file), and **one is a rejected repository** (SC-16, the local reference repo). The count is of
checks, and this document does not call them anything else.

### A.3 Reference repository — counted, with the noun stated each time

`_reference/creative_product_HCM202`. The brief flagged two conflicting pairs, "58 URLs / 20 files" and
"68 entries / 16 files". Both are now settled. **They counted different things, and one was simply wrong.**

| Quantity — stated precisely | Value |
|---|---:|
| Events in `src/data/hcm_data.json` | **41** |
| `mediaUrl` **entries** across those events (35 arrays + 6 bare strings) | **68** |
| — of them, unique **remote http(s) URLs** | **52** |
| — of them, unique **local `/image/…` paths** | **16** |
| — of the 68, entries ending in an image extension | 65 |
| — of the 68, entries not ending in an image extension | 3 (2 YouTube links + 1 extensionless image URL) |
| Distinct **domains** among the remote entries | **34** |
| **Files on disk** in `public/image/` | **19** |
| — of the 19, referenced from `hcm_data.json` | 16 |
| — of the 19, referenced by nothing (`muvsar.png`, `muvsful.png`, `muvsmc.png`) | 3 |
| Rows in the `REFERENCE_IMAGE_AUDIT.md` §4 table | **68** |
| Images taken from this repository into the product | **0** |

So: **68 is right** and every entry is distinct. **16 is right but was mislabelled** — it is the number of
media entries pointing at a local file, not the number of files in the directory. **20 was wrong**; the
directory holds 19, on disk and in the git index alike. **58 was wrong** and had already been retracted
inside `figures.ts` (`SC-16`), but the retraction had not reached `docs/REFERENCE_USE_RECORD_2026-09-17.md`.

### A.4 Spatial layer, locators, risks

| Quantity | Value |
|---|---:|
| `PLACES` | 19 |
| `SPATIAL_NODES` | 40 — placed **16**, named-region **6**, unplaced **18** |
| `MOVEMENTS` | **4** (MV-2a, MV-2b, MV-4a, MV-4b), **2** with an unnamed end |
| Turning points | 8 — placed **2**, named region **1**, unplaced **5** |
| `PLACE_READING_NOTES` | 3 |
| `placesWithoutCoordinate()` | 5 |
| Places with a coordinate but no `CoordinateSource` | **0** |
| `SPATIAL_STATUS` | `NEED VERIFICATION` |
| `LOCATORS` | 10 — **3** print the unresolved abbreviation as `Sdd` |
| `RISKS` / `SUPERSEDED_RISKS` | **8** / 9 |
| `UNNOTED_MARKERS` / `PRINTED_FORM_NOTES` | 5 / 3 |

### A.5 Measurements, re-run today

`node tools/word-budget.mjs` (target 60–90 prose words in the fold):

```
opening                    prose 104  + signage   8   over, close
journey overview           prose  67  + signage  59   OK
stage 2 - passage stop     prose 141  + signage  26   OVER
stage 2 - turn, before     prose 109  + signage  21   over, close
stage 2 - turn, after      prose 138  + signage  32   OVER
presentation beat 3        prose  24  + signage  50   OK
```

`node tools/station-audit.mjs` → **28 of 85** states over 90 words.
`node tools/audit-density.mjs`, desktop 1440: `#/` words 136 · `ky-2` controls 10 / badges 4 / words 190 ·
`ky-3` controls 9 / badges 3 / words 162 / imgs 1 · `ky-5` controls 8 / badges 3 / words 171.
`npm run build:offline` → **3.69 MB** (3,870,660 bytes), 42 fonts and **8 images** inlined.
`npm run check:offline` → 11 routes ok, plate draws, **9 image appearances** decoded, 27 fonts from the
bundle, **no network requests, no errors**.

---

## B. Contradictions found

Every item below was reproduced against the live code, data or a tool run before being recorded.

### B.1 The product stated a false count on its own verification screen — the worst class of defect here

1. **`#/kiem-chung` published `0` where the answer is `3`.** The summary counted the unresolved
   abbreviation with `LOCATORS.filter((l) => l.printed.includes('Sđd'))` — the **normalised** spelling.
   `AGENTS.md` §3 forbids the product from normalising it, so no `printed` field contains that form and the
   filter matched nothing. The register therefore told a reader that **zero** footnotes use the
   abbreviation. `content.test.ts` had asserted the correct 3 in the data the whole time; nothing compared
   the data with what the screen said about it. The row label also printed the forbidden `Sđd` form, as did
   `INTEGRITY_STATEMENTS` (IS-4) and an interaction note.
2. **The risk register said `Chín mục` (nine entries) above a list of eight.** The summary table on the
   same page already printed `RISKS.length` = 8, so one page carried two counts.
3. **`SC-13` said `FS-ky-1-b` "vẫn để trống"** (still empty) while the slot table on the same page showed
   it filled and the stage 1 screen displayed its picture. The re-check that resolved it is `SC-18`.
4. **The table of contents** still named the figure section "vị trí còn trống" (positions still empty)
   after the section's own heading had been renamed to include filled ones.
5. **The sourcing-check table header read "Vì sao chưa dùng được"** (why this could not be used) over 26
   rows of which **12 are `outcome: 'cleared'`** and say the opposite.
6. **The figure section lede stated the filling rule as two conditions**, the blocked lens on the stage
   screens states it as three, and `FIGURE_REQUIREMENTS` printed twenty lines below states five.

### B.2 Rendered design decisions carried stale hand-written numbers

7. **`DD-15`** still read "**Sáu vị trí và ba nguồn** đã kiểm" — six positions and three sources — against
   13 positions and 26 checks. This is the same number `DD-2` had already corrected twice, and `DD-2`'s own
   correction states in capitals that the count must be read from the data and never written by hand.
   `DD-15` was missed by both of those corrections.
8. **`DD-2`'s** evidence still offered "ba nguồn" with a present-tense pointer at a register that now
   prints 26 checks, and named a section whose title had changed.
9. **`DD-18`'s** motion inventory said the overview carries one movement. It carries two — `atlas.css`'s own
   comment calls `plate-settle` "the overview's second after the thread" — and continuous-reading mode adds
   `chapter-open` on the stage screen.

### B.3 The Historical Image Integration report advertised a guard the product did not have

10. **§11 listed, among the tests added on 19-9, a banned-string test that did not exist.** No test in
    `content.test.ts` or `figures.spec.ts` scanned the data for any string equivalent to "photographer
    rights established", in either language. The report published a guarantee the product did not carry.
    This is the single most serious report defect found, because it is the class of claim the whole
    verification apparatus exists to make trustworthy.

### B.4 §9 and §11 measurement claims overturned by re-running the tools

11. **§11 concluded the opening screen reads `OK` on `prose 69` with `signage 43`.** Re-run today it is
    **`prose 104 + signage 8`, verdict `over, close`**. Those were the right numbers only while
    `.figure__blocked-line` was still classified as signage; the file records that classification being
    reverted, and §9 of the same report already says `over, close`. The report contradicted itself.
    (Total in-fold words are unchanged at 112 — 35 words moved from signage to prose, which is correct.)
12. **§9 attributed the surviving `141 → 121` shift to the credit / status / controls entries.**
    `word-budget.mjs` records that it came from a `.figure__blocked-line` entry in the same draft.
13. **§11 said the evidence-axis sweep covers four axes.** It covers seven.
14. **§11 published the superseded, weaker `reuse` assertion** — "in the four valid values and never
    `REJECT`" — the exact form the project itself identified as a hole letting `NEED VERIFICATION` through.
    The report **understated its own guarantee**.
15. **§11 named two id-pinned records** where the test pins four.
16. **§11 listed a `NOT YET EVIDENCED` assertion** that had been removed the same day as a tautology and
    replaced by two different ones.
17. **§11's cross-reference sent readers to §9 for "hai lần"** (both self-flattery episodes); §9 documents
    one, §11 documents the other.
18. **The offline bundle is 3.69 MB, not 3.68 MB** (3,870,660 bytes by the bundler's own formula), in four
    places.
19. **§9 overstated `locationCheck`**, which holds two place phrases from the sub-caption, not the whole of it.
20. **§11 claimed a 768 px eye-check of the emptied opening** for which no artefact exists — `figure-shots.mjs`
    captures that state at 1440 and 390 only.
21. **§9's `prose 98 → 61` pair cannot be reproduced** from any surviving artefact; it belongs to a reverted draft.

### B.5 Four reports had never been corrected for the documentary work at all

22. **`UX_REDESIGN_REPORT.md`** asserted in the present tense, in three places, that exactly **one** image is
    sufficiently evidenced and that it sits on the **opening screen**; and that the product declares 11
    slots with 4 filled / 7 blocked, five primaries empty, ten positions still blocked.
23. **`CREATIVE_TRANSFORMATION_AUDIT.md`** said nine of eleven slots unfilled; four BnF items on three axes;
    26 unplaced events including six of eight turning points; 78 + 61 tests.
24. **`SPATIAL_JOURNEY_DESIGN_DECISION.md`** said six movements with three unnamed ends; specified the open
    end as **a ray**, which the implementation deliberately rejected in favour of two open rings; said the
    register prints 26 unplaced nodes, where it prints 18; said nine unfilled slots.
25. **`REFERENCE_ANALYSIS.md`** repeated the six-movements / three-unnamed-ends / open-rays claim.
26. **`CREATIVE_SPATIAL_JOURNEY_REPORT.md`** carried `opening 98` (now 104), `27 of 85` (now 28 of 85),
    106 unit tests (now 116), 213 e2e (suite is now 228), and a 2.53 MB / 4-image offline state (now 3.69 MB / 8).
27. **Three reports shared one overstated premise:** "every cleared BnF figure records `locationCheck` as not
    established". `FS-ky-5` records a place its own publication printed, and `FS-ky-1-b` is a **Humazur** item,
    not a BnF one.

### B.6 The active evidence register contradicted itself

28. **`docs/08_Image_Source_Register_TEMPLATE.md` pointed the `AGENTS.md` §4 compliance statement at the wrong
    sections:** it said the real record is "mục 4" and the blank `TEMPLATE - NOT EVIDENCE` table is "mục 6".
    There are now eight real records, and **mục 6 is one of them**. The sentence directed a reader at real
    evidence and called it a blank template — precisely the confusion §4 exists to prevent.
29. The same file said all **five stage primaries are still empty** (two are filled), that the Marseille plate
    is **in use at the opening** (it is at stage 3), that the entrance's visual anchor is the **date column**
    (removed by the spatial pass), and counted **five** primary slots where the code declares six.
30. **`docs/REFERENCE_USE_RECORD_2026-09-17.md`** carried the retracted "20 tệp".
31. **`docs/UX_Design_Decisions_2026-09-16.md`** recorded a test asserting the retired `C2 PDF` locator label
    (the test asserts `tr. `), and recorded a contrast fix to a selector — `.walk__phase-n` — that exists in
    no stylesheet. It also presents itself as the `CM-005` design-choice evidence record while covering only
    `DD-1`–`DD-10` of the twenty now rendered.

### B.7 Stale comments — misleading maintenance documentation

32. `figures.ts` was titled "Documentary photographs" while half its records are printed documents, and the
    distinction is what its entire reuse logic turns on.
33. `figures.ts` said "**the one delivered file** … of **the BnF master**" — eight files, two holders.
34. `figures.ts` justified the four-axis rights split with "the magazine prints a photographer credit on the
    page", true of one of the two 1946 sheets; the other prints none, and takes the cautious decision
    *because* an absent credit settles nothing either.
35. `figures.ts` defined `USE WITH CAUTION` as "published **beside the picture**". Beside the picture a reader
    meets caption, credit and status chip; `reuse` and `creatorRightsCheck` are one control away.
36. `figure.ts`'s module comment said **every** empty slot renders a blocked line. Only **primary** slots do —
    `supportFor()` returns `null` for an unfilled supporting slot, so `FS-ky-4-b` is declared, empty and
    invisible on the stage 4 screen.
37. `figure.ts`'s blocked lens promised a per-position reason on the verification page for every empty slot.
    Two of the five have one (`SC-25`); the others have only the general record.
38. `figure.ts`'s creator-credit fallback said the item "prints no maker credit at all", where the accurate
    statement is that it prints no **photographer** credit.
39. `stagePage.ts` said `compact` shows "the stage number and its period". The chapter element is not rendered
    past the entrance at all.
40. `experience.css` justified the full-height hero by "it is holding one image"; the opening holds no image.
41. `content.test.ts` headed the whole documentary block with "The registry is empty on purpose".
42. `e2e/figures.spec.ts` stated the product has "no photograph that has cleared", above tests that drive eight.
43. `atlas.spec.ts` said the badge budget is 4 and guarded against "a fifth"; the line below asserts `<= 3`.
44. `activities.spec.ts` said "ten locators, **nine** risks", rendered as a table. There are eight risks and they
    render as a list; nine is the *superseded* risk count.

### B.8 Weak and tautological tests

45. Two assertions re-implemented the function under test on both sides — `figureFilledCount()` compared with a
    copy of its own body, `slotStatus` likewise. They could not fail for any dataset.
46. `fig.status` was **never read by any test in either suite**. A record promoted from `NEED VERIFICATION` to
    `VERIFIED IN FILE` would have kept rendering its chip with the whole run green.
47. The caption-date guard put `fig.caption` inside the haystack it searched for a year extracted from
    `fig.caption`. It held for every possible dataset.
48. `SOURCING_CHECKS.length` was asserted as `> 0` — one entry would pass — and `outcome`, the field that says
    whether a source cleared, was never read.
49. Nothing bound the reuse decision to the **rendering**: `figureSlot()` renders from membership in `FIGURES`
    alone, so a record whose `reuse` slipped to `NEED VERIFICATION` would have gone on being displayed,
    credited and enlargeable.
50. Weak negatives where the valid state space was known exactly: `not.toBe('entrance')` on a four-member union,
    `not.toHaveCount(0)` where stage 4 draws exactly two movement paths, `not.toBe('')` where the shortest real
    value is 135 characters, `not.toHaveCount(0)` on `table` standing in for "ten locators".
51. Two e2e assertions asserted the **normalised** `Sđd` was visible. Both passed — one off a hand-written column
    label whose count rendered `0`, the other off a caution sentence that names both forms in order to contrast
    them. They would have gone on passing if the printed form had been silently normalised, which is the one
    thing they exist to prevent.

### B.9 Date integrity — reported, deliberately not rewritten. See §F.1

52. The repository dates a day of work **19-9-2026**. Today is **2026-09-18**; `git log -1` gives
    `2026-09-17T14:44:29+07:00` and every affected file has mtime `2026-09-18`. **19-9-2026 has not occurred.**
    Counted at the end of this pass, the date appears **108 times across 20 files** — **76** carrying the year
    and **32** written bare as `19-9`, two of them in CSS comments that the brief's file filter did not reach.
    It reaches rendered product strings, the active image register, four active reports, and — most seriously —
    the `Ngày dùng` field of a Prompt Log entry and its stored prompt file, a field `AGENTS.md` §9 makes
    mandatory and §4 forbids inventing.
    *This audit initially reproduced the error:* two corrections it appended to the image register were stamped
    `19-9-2026`, copied from the wording they were correcting. Both were re-dated to `18-9-2026` before this
    document was finished, and the slip is recorded here rather than quietly fixed.

---

## C. Corrections made

All corrections follow the project's existing convention: **the old wording is kept, the correction is appended
and dated.** Nothing was deleted to make the record look better, and no historical Prompt Log was touched.

### C.1 Code — behaviour

| File | Change |
|---|---|
| `web/src/components/verifyPage.ts` | The abbreviation count filters on the printed form `Sdd`. The register now publishes **3** where it published `0`. |
| `web/src/components/verifyPage.ts` | The row label prints `Sdd`, the form the 2019 edition uses, not the normalised `Sđd` that `AGENTS.md` forbids. |
| `web/src/components/verifyPage.ts` | The risk lede is derived from `RISKS.length` instead of the hand-written "Chín". |
| `web/src/components/verifyPage.ts` | Sourcing-check column header → "Kết quả của lần kiểm"; it heads 12 cleared rows as well as 14 others. |
| `web/src/components/verifyPage.ts` | Contents entry matches the section heading it links to. |
| `web/src/components/verifyPage.ts` | Figure lede points at the five conditions actually printed below it. |
| `web/src/data/project.ts`, `interactions.ts` | `IS-4` and the presentation note print `Sdd`, with the contrast to `Sđd` stated rather than silently normalised. |

### C.2 Code — records and rendered prose

`DD-2`, `DD-15`, `DD-18` each carry a dated `ĐÍNH CHÍNH` giving the real counts and naming the renamed section.
`DD-15`'s correction records that it was the record both earlier corrections missed. `SC-13` carries a dated
correction pointing at `SC-18` and stating that the two tables on that page had been contradicting each other.

### C.3 Comments

Corrected in place, each with the old claim quoted and dated: the `figures.ts` file title and its
"one delivered file / BnF master", "photographer credit on the page" and "published beside the picture"
passages; `figure.ts`'s module comment (primary vs supporting), its per-slot-reason promise and its creator-credit
fallback; `stagePage.ts`'s compact-header comment and its `Sdd` reference; `experience.css`'s hero justification;
`content.test.ts`'s "registry is empty" docstring and its "one supporting position per stage" title;
`figures.spec.ts`'s file docstring; `atlas.spec.ts`'s badge-budget comment; `activities.spec.ts`'s
"ten locators, nine risks".

### C.4 Where this audit corrected itself

Four findings this audit initially accepted were overturned by its own adversarial checkers, and the record is
kept rather than tidied:

- **"Seven provenance checks".** The heading was changed from "six" to "seven"; a checker showed the docstring
  above it names the **six brief-mandated axes** while the body iterates **seven fields**, because the rights
  axis became two fields. The heading now names both numbers and the docstring explains the difference. The
  first change was wrong.
- **"`.colophon` flatters the word budget".** Measured rather than argued: the colophon's top edge sits at
  1584–2713 px on every measured route against a 900 px fold, so it is already excluded by the viewport test and
  the exclusion changes **no published number**. Reported in §F.4, not corrected.
- **"`SC-16`'s 68 is a miscount".** Re-derived by parsing the JSON: `hcm_data.json` really does declare **68**
  distinct `mediaUrl` entries. The disputing count of 65 was of image-*extension* strings — a different quantity.
  `SC-16` is correct and was left alone.
- **`places.ts`'s `legs` contract and its 4-movements/2-unnamed-ends statement** were both challenged and both
  held on re-derivation. Left alone.

### C.5 Tests strengthened — see §E

### C.6 Reports and registers

Dated corrections were appended in `HISTORICAL_IMAGE_INTEGRATION_REPORT.md` (§2, §9, §10, §11),
`CREATIVE_SPATIAL_JOURNEY_REPORT.md` (§12, §14, §16 and the plate/figure rule),
`CREATIVE_TRANSFORMATION_AUDIT.md`, `SPATIAL_JOURNEY_DESIGN_DECISION.md`, `REFERENCE_ANALYSIS.md`,
`REFERENCE_IMAGE_AUDIT.md`, `UX_REDESIGN_REPORT.md` (two correction boxes at §2.5 and §4 plus four inline notes),
`docs/08_Image_Source_Register_TEMPLATE.md`, `docs/REFERENCE_USE_RECORD_2026-09-17.md` and
`docs/UX_Design_Decisions_2026-09-16.md`.

**One quoted transcript was deliberately not edited.** §10 of the Historical Image Integration report pastes the
verbatim output of `check:offline`. Changing a number inside a pasted machine transcript would be fabricating a
transcript. A dated note beneath it records that a re-run gives 3.69 MB and that every other line reproduces
exactly.

---

## D. Report statements revalidated

### D.1 §9 and §11 of `HISTORICAL_IMAGE_INTEGRATION_REPORT.md`, sentence by sentence

**Confirmed SUPPORTED by re-running the cited tool or reading the cited code:**

- the §9 density table (10/8 controls, 4/3 badges, 190/171 words) — exact against `audit-density.mjs`;
- the §9 engraving/figure balance table — all nine positions exact against live DOM measurement at 1440/768/390;
- the §9 stage-3 density table (10/9, 4/3, 190/162) — exact;
- the §9 claim that only credit, status chip and the two controls moved to signage and that caption text still
  counts as prose — exact against the selector list in `word-budget.mjs`;
- the §9 claim that the opening reads `over, close` — reproduced;
- the §9 "at most one entrance image and two supporting documents per stage", and the test forbidding one file
  in two positions;
- §11 `typecheck`, `lint` clean; `test` 2 files; `build` ok;
- §11 `check:offline` "9 lượt ảnh giải mã, no network requests, no errors" — reproduced verbatim;
- §11 `ux-audit` "tương phản đạt, 200% không tràn" — reproduced verbatim;
- §11 `figure-shots.mjs` "24 ảnh chụp", split 12 added 18-9 / 5 added 19-9 / 6 re-pointed (30, 31, 32, 34, 35 to
  stage 3; 36 to `ky-2`) — every number correct; the 24th is `33-register`, unchanged;
- §11 "11 → 13 vị trí, 4 → 8 đã điền, 15 → 23 → 26 lượt kiểm nguồn" — the pinned counts really were raised, and
  a diff of the test files shows assertions added and none loosened;
- §11 "trang Kiểm chứng (13 dòng vị trí + 26 dòng kiểm nguồn, hai cột trạng thái)" — exact;
- §11 "đúng 4 `USE WITH CAUTION` và 4 `USE`" — exact;
- §11 the three opening tests re-pointed to `#/chang/ky-3` keeping every assertion — verified by diff;
- §11 "Tràn ngang … 0 px cả ba" — `overflow-diag` gives `scrollWidth=375 client=375`;
- §11 "số chữ màn hình đầu trên desktop 158 → 136" — `audit-density` gives `#/` words 136.

**Corrected as STALE / OVERSTATED / UNSUPPORTED:** items 10–21 of §B above. Each now carries a dated correction
inside the section it belongs to.

### D.2 Statements that were true and are now also *guarded*

§11's banned-string bullet described a guard that did not exist. Because the guard is real and cheap, it was
**written** rather than the claim deleted, and the bullet now records honestly that the test dates from 18-9 and
not from 19-9. This is the one place where this pass added code rather than only correcting prose, and it was
done to make a published claim true rather than to add a feature.

---

## E. Tests strengthened

Unit suite **113 → 116**; every addition binds a real data relationship rather than a string.

| Test | What it now binds |
|---|---|
| *renders a photograph only where an affirmative reuse decision exists* | **New.** Walks all 13 slots through the real `figureSlot()` renderer under jsdom. For a filled slot: the decision must be in `{USE, USE WITH CAUTION}`, the `<img>` must carry the record's own `src` and `alt`, and the required credit **and** the evidence status must be present in the rendered text. For an empty slot: no `<img>`, the blocked class, the `CHƯA CÓ NGUỒN` flag and the slot's role. This closes the hole the brief names: a record silently set to `NEED VERIFICATION` now fails instead of continuing to display. |
| *never claims a maker rights position has been established* | **New.** Every record must answer the maker question in exactly one of the two honest ways — `CHƯA XÁC LẬP` or `KHÔNG PHÁT SINH` — never both, never neither; plus a nine-string scan, in Vietnamese and English, over `FIGURES` and `SOURCING_CHECKS` for any assertion of clearance. |
| *publishes the same abbreviation count the locator data holds* | **New.** Pins 3 records printing `Sdd` and **0** printing `Sđd`, so the regression that made the register publish `0` cannot return. |
| *derives the documentary status from the records* | Was two copies of the functions under test. Now pins 13 / 8 / 5 and the exact empty-slot id list, and reads `fig.status` for every record — the first time any test in either suite had done so. The pin is deliberate and documented: promoting a record past `NEED VERIFICATION` must turn the suite red. |
| *records what was checked* | `> 0` → exactly 26, with 12 / 8 / 6 by `outcome`, the `outcome` vocabulary asserted, and a new check that **no published figure cites a source a check rejected**. |
| *never states a caption fact the source did not state* | The haystack no longer contains the caption the needle came from. A year in a caption must now appear on an axis that was actually checked. |
| *anchors every supporting position* | `not.toBe('entrance')` → `toContain` over the three-member positive set. |
| `places.test.ts` country caution | `not.toBe('')` → a positive length threshold. |
| `atlas.spec.ts` stage-4 movements | `not.toHaveCount(0)` → exactly 2. |
| `activities.spec.ts` verification appendix | `table` existence → ten locator ids in the locator table, the printed `Sdd` form visible, and the summary card for the abbreviation asserted to read **3**. |
| `app.spec.ts` locator lens | Asserted the normalised `Sđd`; now asserts the printed `Sdd`. |

---

## F. Remaining human-verification items

### F.1 The impossible date — the largest open item, and deliberately not auto-fixed

The repository records a day of work as **19-9-2026**, a day that has not occurred (§B.9). **Nothing was
rewritten**, for a reason that should be stated plainly rather than assumed:

- `AGENTS.md` and this brief forbid rewriting the Prompt Logs and stored prompts — they are the integrity trail,
  and two of them carry the fabricated date in the `Ngày dùng` field that `AGENTS.md` §9 makes mandatory;
- if the ~60 occurrences in code and reports were corrected to 18-9 while those historical records could not be,
  **code and history would then disagree** — a new contradiction, worse than the one being fixed;
- the narrative also distinguishes an "18-9 pass" from a "19-9 pass"; collapsing both onto 18-9 would make
  several dated corrections read as though they corrected themselves on the same day they were written.

So the only two coherent options are *rewrite everything including the history* (forbidden) or *disclose once and
change nothing* (taken). **A human must rule on this before submission.** Recommended: one dated disclosure at the
head of the Prompt Log and the image register, stating that all work labelled 19-9-2026 was performed on
18-9-2026, that the substantive rulings are unaffected, and that only the date label is wrong.

### F.2 Evidence that does not exist and must not be implied

1. **No person has verified any of the eight documents.** All eight are `NEED VERIFICATION`; `sourceUrl` and the
   quoted `reuseCondition` of each still need a human to open and read them.
2. **No photographer's rights position has been established for any record.** Four are `USE WITH CAUTION`
   precisely because that question is open.
3. **The 2019 textbook scan is unauthenticated** (`GT-R08`); everything built on it inherits that status.
4. **No user testing exists.** `docs/09_User_Test_Plan_TEMPLATE.md` is a template and is labelled as one.
5. **Permission letters have not been sent to anyone.** §3b of the image register is a draft.
6. **Stage 4 has no document.** Its status is `BLOCKED — FURTHER ARCHIVAL / INSTITUTIONAL RESEARCH REQUIRED`
   (`SC-25`) — blocked, not closed, and not evidence that nothing suitable exists elsewhere.
7. **The opening position is empty** and needs a document whose job is to open the whole journey.
8. **The subject's identification** — BnF's "Nguyen Aïn Nuä'C", France-Illustration's "Ho Chi Minh" — needs an
   approved academic source to confirm.

### F.3 Rulings a human still owes

9. Whether `USE WITH CAUTION` should be narrowed to the 1946 material only, rather than also covering the two
   Agence Meurisse plates (the register asks this question itself).
10. Whether the stage 3 framing reads to a learner as "a portrait **of the period**" and not as a photograph of
    an event in the period.
11. The product version label — still `VERSION LABEL - NEED LECTURER CONFIRMATION`.
12. `docs/UX_Design_Decisions_2026-09-16.md` records a contrast fix to `.walk__phase-n`, a selector present in no
    stylesheet; the nearest real class still uses the token the record says was replaced. **The CSS was not
    changed** — contrast passes today (`ux-audit`: "all sampled text at or above the minimum"), so changing it on
    the strength of an unverifiable record would be guessing. A human should establish which class was actually
    changed.

### F.4 Reported, measured, not acted on

13. **`.colophon` in `word-budget.mjs`'s skip list** is not a narrow "signage" exclusion — it holds the academic-scope
    disclaimer and the AI-non-fabrication declaration, 75 words. Measured: it sits at 1584–2713 px on every measured
    route against a 900 px fold, so it is already excluded by the viewport test and removing it from the list would
    change **no published number**. Left alone; recorded so nobody later mistakes it for a defensible exclusion.
14. **`word-budget.mjs` visits only one of the five stages** (`ky-2`), and that is the stage whose entrance figure is
    blocked — so no measured route renders a filled figure, and the three figure-apparatus exclusions are never
    exercised by the tool. The metric is not being flattered; the coverage is simply narrow.
15. **Markdown emphasis renders literally.** `h()` sets `textContent`, and many data strings carry `**bold**` and
    backticks — including the row that discloses the unresolved photographer right. A reader sees the asterisks.
    Fixing it means either stripping the markup from the data or adding a renderer; both are outside a
    verification-only pass. Flagged for a decision.

---

## G. Product facts that MUST NOT be claimed in the submission

Stated as prohibitions, because each one is a claim the evidence does not support.

1. **Do not claim learners understand more, remember more, engage more, or prefer this product.** No user testing
   has been done. Nothing in this repository measures a learner.
2. **Do not claim academic verification is complete.** All eight documents and every locator are
   `NEED VERIFICATION`; the base textbook scan is itself unauthenticated.
3. **Do not claim all rights are cleared.** Four documents carry `USE WITH CAUTION` with the photographer's
   position explicitly unestablished; a holder's `domaine public` label answers for the digitised copy only.
4. **Do not claim every stage has an authentic primary image.** Four of the six primary positions are empty.
5. **Do not claim stage 4 has been shown to have no suitable material.** The queries run returned nothing; that is
   not the same statement.
6. **Do not present the counts in this document as fixed.** They are true at 2026-09-18 and derived from the data;
   read them from the Verify screen, which derives them too, rather than quoting this page.
7. **Do not present `docs/08_Image_Source_Register_TEMPLATE.md` §3b or §8, or `docs/09_User_Test_Plan_TEMPLATE.md`,
   as evidence.** They are templates and are labelled `TEMPLATE - NOT EVIDENCE`.
8. **Do not describe the work as done on 19-9-2026** until §F.1 has a human ruling.
9. **Do not claim the e2e suite proves the product is correct.** It proves 228 specific assertions hold across
   three viewports.

---

## Validation run for this pass

Every line below was produced by running the command, on the tree as this document leaves it.

| Command | Result |
|---|---|
| `npm run typecheck` | ✅ clean |
| `npm run lint` | ✅ clean |
| `npm run test` | ✅ **116 / 116** (88 `content.test.ts` + 28 `places.test.ts`), 2 files |
| `npm run build` | ✅ |
| `npm run build:offline` | ✅ **3.69 MB** (3,870,660 bytes), 42 fonts and 8 images inlined |
| `npm run check:offline` | ✅ 11 routes, plate draws, **9 image appearances decoded**, 27 fonts, **no network requests, no errors** |
| `npx playwright test` | ✅ **228 / 228 passed**, exit 0, 5.6 min — laptop 1440 · tablet 768 · mobile 375. See the note below. |
| `node tools/ux-audit.mjs` | ✅ contrast "all sampled text at or above the minimum"; 200 % text "no overflow, no clipped text" |
| `node tools/overflow-diag.mjs` | ✅ `scrollWidth=375 client=375` — no horizontal overflow |
| `node tools/word-budget.mjs` | ✅ ran; real output in §A.5, including the two `OVER` states |
| `node tools/audit-density.mjs` | ✅ ran; 11 routes × 3 widths; figures in §A.5 |
| `node tools/station-audit.mjs` | ✅ ran; **28 of 85** states over 90 words |

**A note on the browser suite, because it matters and is easy to misreport.** The suite declares
**228 tests** (76 specs × laptop 1440 / tablet 768 / mobile 375). Three runs during this audit did **not**
reach 228: two reported 203 and 206 passed with 22–25 failures, and a third stopped at 174. **Not one of
those was an assertion failure.** Every one was the preview server dying under a run that was sharing it
with another process — `net::ERR_CONNECTION_REFUSED` and `ERR_HTTP_RESPONSE_CODE_FAILURE` at
`http://localhost:4173/`, plus one Playwright failure to create its own `test-results` directory. Once the
port was freed so Playwright started and owned its own server for the whole run, the suite passed
**228 / 228, exit 0, in 5.6 minutes**. That is the number in the table above, and it is this pass's own run
on the tree as this document leaves it.

This is recorded in full rather than reduced to the green number, because "228/228" and "203 passed" came
from the same code on the same day, and a reader who saw only one of them would draw the wrong conclusion
about either the product or the tooling.

---

## Completion condition

The brief permits the words `FINAL SUBMISSION CONSISTENCY AUDIT PASSED` only when **zero** known
contradictions remain between active code, active data, rendered UI, active reports, verification registers
and tests.

**That phrase is withheld.** Every contradiction listed in §B was corrected, and the full validation suite was
re-run green afterwards, **except the two below — and neither can be closed by this kind of pass without doing
something the brief forbids:**

1. **The impossible date (§B.9 / §F.1).** 108 occurrences across 20 files record work as done on 19-9-2026, a
   day that has not occurred. The six surfaces agree *with each other* — so the strict six-way test is not what
   fails — but they agree on something that is not true, and the date reaches the rendered product, the active
   register, and the one Prompt Log field `AGENTS.md` §9 makes mandatory. Correcting only the surfaces that may
   be edited would put code and integrity trail into a new disagreement; correcting all of them means rewriting
   the integrity trail, which §12 of this brief forbids. **It needs a human ruling, not an edit.**
2. **`docs/UX_Design_Decisions_2026-09-16.md` row 7 / line 55 (§F.3.12).** An active design-evidence record
   describes a contrast fix to `.walk__phase-n`, a selector in no stylesheet, and the nearest real class still
   carries the token the record says was replaced. Contrast passes today, so the product is not wrong — the
   *evidence record* is unverifiable. Changing the CSS to match the record would be guessing at which class was
   actually edited, and changing the record to match the CSS would be inventing history. **It needs the person
   who made that change.**

Everything else listed in §B is corrected, and §D records which statements were revalidated as already true so
that the coverage of this pass is auditable rather than asserted.

---

*This document states what was recomputed, what was corrected, and what is still missing. It does not state
that the product is finished, verified, or ready to submit. The project status remains*
**`REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.**
