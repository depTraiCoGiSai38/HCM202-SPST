# SOURCE MIGRATION REPORT — `SOURCE_MIGRATION_2021_TO_2019`

> ## ĐÍNH CHÍNH 18-9-2026, 21:15 (+0700) — DỮ KIỆN MỚI VỀ ẤN BẢN GIÁO TRÌNH
>
> Báo cáo này **không bị sửa**. Nhưng kết luận của nó về việc "chưa thoả mãn yêu cầu
> Nguồn 1 của Student Guideline" được viết khi chưa biết một dữ kiện sau:
>
> Bảng tính **do giảng viên sở hữu** (`HCM202_SE1810_Fall2026_Half 1`, chủ sở hữu
> `hieunt328@fpt.edu.vn`), sheet `HCM202 — RESOURCE REGISTRY · FALL 2026`, liệt kê tài
> liệu số 1 của học phần là:
>
> > `1. Giáo trình TTHCM` … **(Phiên bản PDF năm 2019 của Bộ Giáo dục và Đào tạo)**
> > tệp `GT học phần Tư tưởng HCM_2019.pdf`, 27.127.799 byte
>
> **Ấn bản 2019 là ấn bản giảng viên công bố cho học phần này.** Rủi ro "dùng sai ấn bản"
> và nguy cơ dính cờ `CAM01` vì vậy **giảm mạnh**.
>
> Vẫn còn một khác biệt văn bản chưa được giải quyết: Cẩm nang do giảng viên cập nhật
> 13-9-2026, mục 3, vẫn ghi Nguồn 1 là bản *"áp dụng 2021-2026"*. Theo AGENTS.md §5,
> giữ nguyên cả hai, không chọn bên. Trạng thái: `DOCUMENT CONFLICT`.
>
> Việc **vẫn chưa làm**: đối chiếu trích đoạn 8 trang của nhóm với bản đầy đủ của giảng viên
> ở trang in 28-35. Tệp ấy nay đã nằm trong Drive được chia sẻ cho nhóm, nên đây là việc
> nhóm tự làm được. Chi tiết: Folder 08 `..._08_SourceVerificationLog_v1.2`.

> **Date:** 2026-09-17
> **Scope:** the primary academic content source of the HCM202 creative product
> **Project status after this migration:** `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

This migration changed **which book the product cites and where it points**. It did
**not** verify any claim, and it did **not** upgrade the status of any locator. Every one
of the ten locator candidates was `NEED VERIFICATION` before it and is `NEED VERIFICATION`
after it.

---

## 1. Old source → new source

| | Old | New |
|---|---|---|
| File | `C2-02.pdf` | `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` |
| Pages | 10 PDF pages | 8 PDF pages |
| Printed pages | odd pages 27, 29, 31, 33, 35 visible; even pages obscured | **all eight visible: 28–35** |
| Public citation | `C2 PDF p.3` | `Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 29` |
| Text layer | present | **none — image-only scan** |
| Provenance marks | Studocu / Studersnel branding, download QR | `PDF-XChange Lite 11.0.1`, handwritten mark at the foot of every page |
| Role now | **LEGACY / COMPARISON REFERENCE** — retained, controls no locator | **PRIMARY ACADEMIC CONTENT SOURCE** |

**Reason for the migration:** the assigned academic base source was changed by the
project owner. The retired excerpt additionally carried third-party (Studocu) provenance
branding, which conflicted with the Student Guideline's requirement that the official
textbook be Source 1. The replacement does **not** resolve that requirement — see §8.

`C2-02.pdf` has **not** been deleted. It is kept so this migration can be re-checked.

## 2. SHA-256

| File | SHA-256 | Status |
|---|---|---|
| `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` | `A520532C4F5034AA7BDF69E7E63459A748C5899BD7E525EA313BEC3AD70F720A` | **NEW — primary source** |
| `C2-02.pdf` | `F8AB7AA8BE1FB327F3DCE15027DD813CB971DDC8240864A2E745BDA30BEB485E` | unchanged; superseded for locator purposes |
| `LLCT_Fall2026_Student_Guideline_TT_v2.0_FINAL.pdf` | `B37D8F67A30B0E9ECC3E5F1E8D8BE3DD7C8855C691767A7445D5AA376AC3D51A` | unchanged, re-verified |
| `TT_CamNang_HoSo_ToanDien_Fall2026.pdf` | `3F9408308ADE107FDB7C1D9201E462E7879CA76B9A98EB1359E8578D0CADF54A` | unchanged, re-verified |

All three pre-existing hashes were re-verified at the start of this work and matched
`AGENTS.md`. No old hash was overwritten; the 2019 entry was **added** and C2's was
relabelled as legacy.

### How the 2019 file was read

The file has **no text layer**: 8 pages, 8 grayscale image objects (827×1170), 2 fonts
which belong only to the `PDF-XChange` evaluation watermark. `pdftotext` returns the
watermark and nothing else. The eight page images were therefore extracted and read
visually, and every decision point was re-read at 4×–9× magnification before being
written into the data. The printed page number was read at the foot of each of the eight
pages to establish the page map, rather than inferred.

## 3. Files changed

**New**

| File | Purpose |
|---|---|
| `web/src/data/source.ts` | the source model: identity, page map, and the three citation renderers |
| `SOURCE_MIGRATION_2019_REPORT.md` | this report |
| `docs/07_AI_Prompt_Log_SourceMigration_2026-09-17.md` | new Prompt Log entry |
| `docs/prompts/P-SRC-01.txt` | the migration prompt, verbatim |
| `web/tools/migration-shots.mjs` | the visual check used for §7 |

**Data layer**

| File | Change |
|---|---|
| `web/src/data/types.ts` | added `SourceRef`; `at` changed from a prose `string` to `SourceRef` on 6 interfaces |
| `web/src/data/stages.ts` | 70 locators; 5 headings (×3 fields); 5 rail ranges; 5 marker sets; 5 risk-id sets; 8 cautions; `BOUNDARIES`; `EPILOGUE`; `EXCERPT_BOUNDARY`; 42 narrative source references |
| `web/src/data/locators.ts` | all 10 locator candidates re-transcribed; risk register rebuilt as `GT-R01`..`GT-R08`; new `SUPERSEDED_RISKS` audit trail; printed-form register rebuilt |
| `web/src/data/interactions.ts` | 20 compare-axis locators, 12 experience-link locators, presentation beat PB-2 |
| `web/src/data/project.ts` | `SECTION_HEADING_AT`; design decision `DD-1` re-grounded with a correction note; `DD-16`; 5 stage-entry `basis` texts |
| `web/src/data/figures.ts` | the two textbook cross-references only — **archival sources untouched** |

**Components** — `evidence.ts` (the locator renderer), `comparePage.ts`, `connectPage.ts`,
`sources.ts`, `stagePage.ts`, `verifyPage.ts`, `journeyPage.ts`, `synthesisPage.ts`,
`thread.ts`, `menu.ts`, `openingPage.ts`, `presentation.ts`.

**Styles** — `experience.css`, `layout.css`: six `[data-kind='blurred']` rules removed.
Each was a decorative override (dotted border, alert colour) on top of a base rule that
stays, so nothing is left unstyled. `.journey__mark[data-kind='blurred']` was deliberately
left alone: no component emits `.journey__mark`, so it was already dead before this work.

**Tests and tooling** — `web/src/test/content.test.ts`, `e2e/app.spec.ts`,
`e2e/activities.spec.ts`, `e2e/guidance.spec.ts`, `e2e/keyboard.spec.ts`,
`tools/verification-report.mjs`, `tools/shots.mjs`, `package.json`, `tsconfig.json`.

**Governance** — `AGENTS.md`, `HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md` (sections
0, 1, 2, 3.2, 3.4, 4, 7, 8, 9, 13, 14 and the compliance matrix), `web/README.md`,
`docs/08_Image_Source_Register_TEMPLATE.md`.

### The data model

The previous model stored a prose locator (`'C2 PDF p.2 / printed p.27'`) and rendered it
through a regular-expression rewrite. That could not keep the PDF page and the printed
page apart reliably, which is exactly the distinction the brief requires. The model is now:

```ts
ref(29)        // -> { page: 29 }
ref(29, 31)    // -> { page: 29, pageEnd: 31 }
noteRef(31, 1) // -> { page: 31, note: 1 }
```

with three renderers, so the public and internal forms cannot be confused:

| Renderer | Output | Used for |
|---|---|---|
| `locatorText` | `tr. 29–31` | the repeated inline evidence chips |
| `citeSource` | `Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 29–31` | every actual citation: source drawer, verification tables, quotation footers, stage source line, evidence magnifier |
| `auditRef` | `… · tr. 29–31 · PDF tr. 2–4` | the magnifier's "nguyên dạng lưu trữ" row only |

The stored value is the **printed** page; the PDF sheet is derived. A public citation
therefore cannot be built from a file-relative number by accident.

**Compactness decision (`PROJECT DECISION`).** The brief asks both that public citations
carry the exact label and that the long label not dominate the UX. These are satisfied
together: every actual citation prints the full exact label, while the dozens of repeated
micro-chips print `tr. N` and open a magnifier that shows the full citation and the audit
string. No screen shows only a bare page number as its citation.

## 4. Stage-boundary and heading changes

All five headings changed. Two of them differ from the wording supplied in the migration
brief; **the printed source was followed**, per `AGENTS.md` §4.

| # | Old (2021/C2) | New (2019, as printed) |
|---|---|---|
| 1 | Thời kỳ **trước ngày** 5-6-1911: Hình thành tư tưởng yêu nước và **có** chí hướng tìm con đường cứu nước mới | Thời kỳ **từ ngày 5-6-1911 trở về trước**: Hình thành tư tưởng yêu nước và chí hướng tìm con đường cứu nước mới |
| 2 | Thời kỳ **từ giữa năm 1911 đến cuối năm 1920**: **Dần dần** hình thành tư tưởng cứu nước… | Thời kỳ **từ ngày 6-6-1911 đến ngày 30-12-1920**: Hình thành tư tưởng cứu nước… |
| 3 | Thời kỳ **từ cuối năm 1920 đến đầu năm 1930**: … | Thời kỳ **từ ngày 31-12-1920 đến ngày 3-2-1930**: … |
| 4 | Thời kỳ **từ đầu năm 1930 đến đầu năm 1941**: … | Thời kỳ **từ ngày 4-2-1930 đến ngày 28-1-1941**: … |
| 5 | Thời kỳ **từ đầu năm 1941 đến tháng 9-1969**: … tiếp tục phát triển, **hoàn thiện**, soi đường… | Thời kỳ **từ ngày 29-1-1941 đến ngày 2-9-1969**: … tiếp tục phát triển, soi đường… |

### Two corrections to the migration brief

| Item | Brief said | Source prints | Evidence |
|---|---|---|---|
| Stage 2 opening date | `từ ngày 5-6-1911` | **`từ ngày 6-6-1911`** | read at 4× on tr.28; corroborated by the edition's own pattern — every boundary is two consecutive days (30-12/31-12, 3-2/4-2, 28-1/29-1), and 5-6-1911 already belongs to stage 1 via `trở về trước` |
| Stage 5 claim | `tiếp tục phát triển, hoàn thiện, soi đường` | **no `hoàn thiện`** | read at 4× on tr.33; `hoàn thiện` is the retired edition's wording |

Both corrections are `NEED HUMAN VERIFICATION` (see §8).

### Consequence: the boundaries are no longer blurred

This is the one substantive design change the migration forced. The retired excerpt
printed vague boundaries **shared** by two consecutive headings (`cuối năm 1920` closing
one stage and opening the next). The product encoded that faithfully: overlapping rail
ranges, dotted "frayed" joints, and copy explaining the overlap.

The 2019 edition prints **exact consecutive dates on both sides of every joint**, so the
overlap is no longer supported by the source and was removed:

- rail ranges are now contiguous and disjoint (`0 → 0.14 → 0.385 → 0.58 → 0.745 → 1`),
  keeping the previous visual proportions by taking the midpoint of each old overlap;
- `BOUNDARIES` entries became `kind: 'exact'` and now carry both dates, e.g.
  `30-12-1920 › 31-12-1920`;
- the blurred-joint CSS, the "Ranh giới in mờ" label, the overview and synthesis copy
  about overlap, and the presentation beat PB-2 were all updated;
- design decision `DD-1`, whose whole justification was the shared boundary, was
  re-grounded and carries a dated `ĐÍNH CHÍNH` note explaining why. It was **not**
  silently deleted.

## 5. Locator migration

Assigned **per claim, by reading the 2019 page each claim appears on**. No fixed offset
was applied — the two editions set this material differently, so none exists. Old C2 PDF
page → new printed page is many-to-many at the edges:

| Old C2 locator | New printed page | Content anchor |
|---|---|---|
| `C2 PDF p.1`, `p.2 / printed p.27` | **tr.28** | Section II heading, stage 1 in full, stage 2's heading line |
| `C2 PDF p.3` | **tr.29** | stage 2 body: 1911-1917, 1919, Vécxây, 7-1920, Tours |
| `C2 PDF p.4` | **tr.29–30** | Tours/turning point on tr.29; L'Humanité articles, 1921, 1922 on tr.30 |
| `C2 PDF p.5 / printed p.29` | **tr.30–31** | works and organisations on tr.30; the Cương lĩnh quotations on tr.31 |
| `C2 PDF p.6 / printed p.31` | **tr.31–32** | stage 4 heading, Oct 1930 on tr.31; the Party rename completes on tr.32 |
| `C2 PDF p.7` | **tr.32** | 1934, 6-6-1938 letter, 10-1938, 12-1940, 5-1941 Pác Bó |
| `C2 PDF p.8 / printed p.33` | **tr.33** | stage 5 heading, 19-5-1941, 22-12-1944, 18-8-1945, 2-9-1945 |
| `C2 PDF p.9` | **tr.33–34** | the 2-9-1945→19-12-1946 passage opens on tr.33 and runs on tr.34 |
| `C2 PDF p.10 / printed p.35` | **tr.34–35** | 17-7-1966 lead-in on tr.34; the quotation completes, and Di chúc sits, on tr.35 |

### The ten locator candidates

| ID | New locator | Change to the printed text |
|---|---|---|
| L1 | tr.28, note 1 | moved from printed p.27; `;` → `:` after the issuing body |
| L2 | tr.28, note 2 | moved from printed p.27; `Nxb Lý luận Chính trị` capitalised as printed |
| L3 | tr.31, note 1 | was `C2 PDF p.5`; C2's `tr 1` is printed `tr.1.` in 2019 |
| L4 | tr.31, note 2 | was `C2 PDF p.5` |
| L5 | tr.31, note 1 of the **second run** | tr.31 restarts its footnote numbering, so the page carries two notes numbered `1`. Preserved, not renumbered. |
| L6 | tr.32, note 1 | abbreviation printed **`Sdd`**, not `Sđd` |
| L7 | tr.32, note 2 | — |
| L8 | tr.32, note 3 | C2's ambiguous `t.7 tr.l13.` is printed **`t.7, tr.113.`** in 2019 |
| L9 | tr.35, note 1 | abbreviation printed **`Sdd`** |
| L10 | tr.35, note 2 | abbreviation printed **`Sdd`** |

**Original sources were not collapsed into the textbook label.** L3, L4, L7, L9 and L10
still point at `Hồ Chí Minh: Toàn tập`; L5 and L8 at `Văn kiện Đảng`. The BnF / Gallica /
Wikimedia archival image records in `figures.ts` were left untouched apart from the two
inline cross-references to the assigned excerpt.

### Risk register

Rebuilt against the 2019 edition rather than renamed, because the edition genuinely
changes which risks exist. `SUPERSEDED_RISKS` records all nine former entries so the
removals can be checked instead of trusted, and a test enforces that every former risk is
either `RESOLVED` or points at a live entry.

| Former | Outcome | Now |
|---|---|---|
| `C2-R01` blurred 5-6-1911 boundary | **RESOLVED** | — |
| `C2-R02` shared `cuối năm 1920` | **RESOLVED** | — |
| `C2-R03` shared `đầu năm 1941` | PARTLY RESOLVED | `GT-R03` |
| `C2-R04` 8-1919 / 4-11-1920 in stage 3 | carried over, sharper | `GT-R01` |
| `C2-R05` WWII ↔ 6-6-1938 letter | carried over | `GT-R02` |
| `C2-R06` epilogue past the endpoint | carried over | `GT-R04` |
| `C2-R07` abbreviation + obscured page numbers | PARTLY RESOLVED — all 8 printed numbers visible | `GT-R05` |
| `C2-R08` print anomalies | PARTLY RESOLVED — see below | `GT-R06` |
| `C2-R09` most claims unnoted | carried over | `GT-R07` |

`GT-R08` is new: the supplied file is an unauthenticated image-only scan.

**Printed forms.** The 2019 pages print correctly what C2 printed wrong: `bước ngoặt`,
`Hòa bình lập lại`, `quân đội viễn chinh Mỹ`, `Cương lĩnh`, `trong sinh hoạt`, and
balanced quotation marks around the Cương lĩnh quotations. Those cautions were removed
because asserting them would claim a defect that is not on the page. What the 2019 pages
*do* print, and the register now carries: the duplicated `trở thành thành` (tr.32),
lower-case `chống thực dân pháp` (tr.34), `thày giáo` (tr.28), and the abbreviation as
`Sdd` (tr.32, tr.35). The earlier register also held entries observed in the *text layer*
of the old file; the 2019 file has no text layer, so those cannot be reproduced and were
not carried over.

## 6. Remaining references to the retired source, and why

There are **zero stale active references**. Every remaining occurrence is a deliberate
record:

| Location | Why it stays |
|---|---|
| `web/src/data/locators.ts` — `SUPERSEDED_RISKS`, header comment | the migration audit trail; a test asserts `C2-R01` is still recorded here |
| `web/src/data/stages.ts`, `source.ts`, `types.ts` — `MIGRATED 2026-09-17` comments | explain why values changed, so the change is reviewable |
| `web/src/test/content.test.ts` | the guard tests, which assert the old labels are **absent** |
| `AGENTS.md`, context file | declare C2 as the legacy/comparison reference and record the hash history |
| `UX_REDESIGN_REPORT.md`, `docs/07_AI_Prompt_Log_*` (16 and 17-9), `docs/UX_Design_Decisions_2026-09-16.md` | **historical records.** They describe work genuinely done while C2 was the base source and were not rewritten. `UX_Design_Decisions_2026-09-16.md` records that a test then checked for `C2 PDF`; that test now checks `tr. `, and this report is the record of that change. |

A regression test fails the build if `C2 PDF`, `C2-02`, `C2-R`, `printed p.` or
`Giáo trình Tư tưởng Hồ Chí Minh - 2021` reappears in published academic data.

## 7. Validation run

| Check | Result |
|---|---|
| `npm run typecheck` | pass |
| `npm run lint` | pass |
| `npm run test` | **78 passed** (was 69 before the migration; 9 net new tests) |
| `npm run build` | pass |
| `npm run e2e` | **183 passed**, 0 failed, across laptop / tablet / mobile |
| `npm run build:offline` | pass — 2.44 MB single file, 42 fonts and 4 images inlined |
| `npm run check:offline` | pass — no network requests, no errors |
| `node tools/verification-report.mjs` | runs; prints 2019 citations |

Tests were strengthened, not weakened. New coverage: the exact 2019 headings pinned
character for character (including the two easily-reintroduced errors), contiguous rail
geometry, dated joints, the restarted tr.31 footnote numbering, `SUPERSEDED_RISKS`
completeness, every `SourceRef` inside tr.28–35, every citation matching the exact label,
the absence of retired labels in published data, and a check that no registered printed
form is normalised without a caution — which caught a real gap during this work.

**Rendered UI inspected** at `#/hanh-trinh`, all five stage routes, the evidence
magnifier, the stage hand-off, `#/kiem-chung` and `#/tong-hop`, at 1440×900 and 375×812.
Screenshots in `web/screenshots/migration/` (git-ignored). The overview shows the five
exact headings and four dated joints; the magnifier prints
`Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 28–29`; the verification register prints the
re-transcribed footnotes with `NEED VERIFICATION` intact. The mobile heading does not
overflow. This visual pass also caught four stale sentences still describing the old
overlapping model, which were then fixed.

## 8. Still requiring human verification

Migrating the source verified nothing. Outstanding, unchanged or newly raised:

1. **Provenance of the 2019 file** — `NEED VERIFICATION`. An image-only scan from
   `PDF-XChange Lite` with a handwritten mark on every page and no imprint page in the
   supplied range. It is **not** authenticated as the official Bộ GD&ĐT / NXB Chính trị
   quốc gia Sự thật edition. The Student Guideline's Source 1 requirement is **not yet
   satisfied** by this file.
2. **The two corrections to the brief** — stage 2 opening on `6-6-1911`, and stage 5
   without `hoàn thiện`. Read at magnification from the scan and internally corroborated,
   but a human should confirm both against a clean copy, because the brief said otherwise.
3. **All ten locator candidates** — still `NEED VERIFICATION`. None has been opened in
   `Hồ Chí Minh: Toàn tập` or `Văn kiện Đảng`.
4. **The unresolved abbreviation** in L6, L9, L10 — never expanded, and deliberately not
   normalised from the printed `Sdd`.
5. **Per-claim page assignments** — each was placed by reading the 2019 page, but the
   assignments have not been independently re-checked by a second reader.
6. **The 2019 printed forms** — whether `trở thành thành`, lower-case `pháp`, `thày giáo`
   and `Sdd` are true printing errors or artefacts of this scan needs a clean edition.
7. **`GT-R02`** remains a `DOCUMENT CONFLICT` (WWII sentence ↔ 6-6-1938 letter) and needs
   a lecturer ruling on how the product should present it.
8. Everything already outstanding before this work: Central Question approval, Topic ID,
   real user testing, feedback-linked revision, worklog, ownership, defense records, the
   `v2.0` timing conflict, and the external legal/institutional citations.

---

**Project status is unchanged by this migration:**

`REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`
