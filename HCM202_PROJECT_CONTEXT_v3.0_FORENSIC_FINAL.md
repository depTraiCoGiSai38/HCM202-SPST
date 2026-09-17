# HCM202 CREATIVE PRODUCT - FORENSIC PERSISTENT CONTEXT

> **Revision:** v3.0 forensic final  
> **Audit date:** 2026-09-16  
> **Course:** HCM202 - Tư tưởng Hồ Chí Minh  
> **Term named by the rule documents:** Fall 2026  
> **Primary academic content source:** `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` (printed tr.28-35)  
> **Legacy / comparison reference:** `C2-02.pdf` - retired as base source on 2026-09-17, retained for migration trace  
> **Intended use:** persistent project context for a coding agent working on a new machine or in a new session  
> **Current completion state:** `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

This file is a source-grounded rebuild. It distinguishes document requirements from project choices and from unverified facts. It must not be treated as an academic source.

---

## 0. READ THIS FIRST

Before changing code, content, design, slides, evidence, or dossier files:

1. Read this file completely.
2. Read the local PDF files completely:
   - `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` (primary academic source; image-only scan, render the pages)
   - `LLCT_Fall2026_Student_Guideline_TT_v2.0_FINAL.pdf`
   - `TT_CamNang_HoSo_ToanDien_Fall2026.pdf`
   - `C2-02.pdf` (legacy comparison reference only; it controls no locator)
3. Confirm that the three files match the SHA-256 values in section 2. If a hash differs, write `SOURCE FILE CHANGED - RE-AUDIT REQUIRED` and do not reuse old locators as if they were still valid.
4. Inspect the repository and version-control status without modifying existing work.
5. Produce a Repository + Compliance Audit before implementation.
6. Never invent a source, locator, quotation, historical fact, current datum, survey, participant, response, feedback item, screenshot, interview record, test result, lecturer comment, defense question, ownership record, worklog entry, or revision rationale.
7. Mark anything not established by authentic evidence as `NEED VERIFICATION` or `NOT YET EVIDENCED`.
8. If two source documents cannot both be satisfied, record `DOCUMENT CONFLICT`, preserve each position with its own locator, and request a human ruling. Do not choose silently.
9. Do not declare the project complete while a mandatory requirement or evidence item remains unresolved.

---

## 1. EVIDENCE CLASSES AND STATUS LANGUAGE

Use these labels consistently. They are operational labels for this project; they are not terms claimed to appear in the three PDFs.

| Label | Meaning |
|---|---|
| `SOURCE REQUIREMENT` | A rule stated in one or both Fall 2026 rule documents. |
| `SOURCE CONTENT` | Academic content transcribed or faithfully summarized from `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf`. |
| `PROJECT INPUT` | A fact supplied by the user, such as the assigned filename/topic label. It is not automatically an academic fact. |
| `PROJECT DECISION` | A design, technical, or framing choice made for this product. It must not be presented as a document requirement. |
| `VERIFIED IN FILE` | The wording or fact was visually located in the named PDF. This does not independently authenticate the PDF, its citations, or its legal claims. |
| `NEED VERIFICATION` | A claim, locator, external authority, provenance point, or decision has not been independently verified. |
| `NOT YET EVIDENCED` | The required real-world artifact is absent, for example actual user data or a signed-off revision record. |
| `DOCUMENT VARIANCE` | Two documents differ in wording, scope, detail, or terminology but may still be jointly satisfiable. Preserve both. |
| `DOCUMENT CONFLICT` | Two instructions appear impossible to satisfy simultaneously or create an unresolved version/timing rule. Preserve both and obtain a human ruling. |
| `REJECTED` | A proposed claim or artifact has been disproved or is prohibited. Record the reason; do not silently delete audit history. |

### Verification rule

`VERIFIED IN FILE` is never equivalent to final academic verification. The two Fall 2026 documents require cross-verification of source locators. A sentence appearing in `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` proves only that it appears in the assigned excerpt until a human checks the required approved source.

---

## 2. AUDIT BASIS, HASHES, AND LOCATOR CONVENTION

The audit corpus, after the base-source migration of 2026-09-17:

| Code | Exact filename | Pages | Bytes | SHA-256 | Role |
|---|---|---:|---:|---|---|
| `GT` | `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` | 8 | 1,157,396 | `A520532C4F5034AA7BDF69E7E63459A748C5899BD7E525EA313BEC3AD70F720A` | PRIMARY academic source |
| `SG` | `LLCT_Fall2026_Student_Guideline_TT_v2.0_FINAL.pdf` | 9 | 1,683,134 | `B37D8F67A30B0E9ECC3E5F1E8D8BE3DD7C8855C691767A7445D5AA376AC3D51A` | rule document |
| `HB` | `TT_CamNang_HoSo_ToanDien_Fall2026.pdf` | 5 | 239,742 | `3F9408308ADE107FDB7C1D9201E462E7879CA76B9A98EB1359E8578D0CADF54A` | rule document |
| `C2` | `C2-02.pdf` | 10 | 597,384 | `F8AB7AA8BE1FB327F3DCE15027DD813CB971DDC8240864A2E745BDA30BEB485E` | LEGACY / comparison only |

The two rule documents' 14 pages were rendered and visually inspected in the original
forensic pass. All 8 pages of `GT` were rendered and read page by page during the
2026-09-17 migration; `GT` has NO text layer at all, so text extraction was not
available for it and every reading came from the rendered page.

`C2` no longer controls any locator. It is kept so the migration can be re-checked.

`SG PDF p.1` names `ThS. Nguyễn Trung Hiếu` as lecturer. This is verified only as document text; current instructor identity or authority on a particular class remains `NEED VERIFICATION` if operationally relevant.

### Locator convention

- `SG PDF p.N` means the one-based page index in the 9-page Student Guideline. The document shows no printed page numbers.
- `HB PDF p.N` means the one-based page index in the 5-page handbook. The document shows no printed page numbers.
- A public academic citation is `Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. N`, using the
  PRINTED textbook page. A range uses the smallest accurate span, e.g. `tr. 29–31`.
- `GT` prints its page number at the foot of every one of its eight pages, so the printed
  page is always available and the PDF sheet number is never published. The mapping is
  PDF 1 = tr.28 through PDF 8 = tr.35; it is evidenced on all eight pages, not assumed.
- The PDF sheet is retained for internal audit strings only.
- Locators were re-derived per claim during the migration, by reading the 2019 page each
  claim appears on. They were NOT produced by shifting the old C2 page numbers: the two
  editions set this material differently, so no constant offset exists between them.

### Audit limitation concerning prior artifacts

The referenced chat exposed a 30,576-byte predecessor named `HCM202_PROJECT_CONTEXT.md`, which was audited. The chat mentioned `HCM202_PROJECT_CONTEXT_v2.0.md` and `AGENTS_v2.md` as content references, but their file bodies were not materialized in the accessible workspace or thread attachment list. Therefore:

- an exact byte-for-byte audit of those two named v2 artifacts was not possible;
- this v3 file is a clean, source-grounded replacement plus an audit of the accessible predecessor;
- no claim is made that every sentence of the inaccessible v2 artifacts was compared;
- the missing artifact bodies remain `NEED VERIFICATION` if historical diff provenance is required.

---

## 3. AUTHORITY AND SOURCE BOUNDARIES

### 3.1 Project rule documents

Both rule documents apply. Neither contains an explicit precedence clause.

- `SG` governs the Student Product & Showcase Track for HCM202 and MLN111, the five golden standards, course/Assignment structure, source hierarchy, sanctions, 3C, No-AI live rebuttal, the detailed 15-folder dossier, naming convention, and five-week lifecycle.
- `HB` restates many of the same controls and adds or changes detail in several places, including evidence for design choices, terminology variants, a repeat-offense rule, and a shorter 15-folder description.

When their wording differs, retain both in the compliance record. A strict implementation may satisfy both only if it does not erase the difference or misquote either source.

The product-format lists are examples, not an exhaustive mandate. SG names infographic/handbook, animation or reportage video, interactive website, podcast and simulation game. HB names infographic, animation video, interactive website, digital handbook, podcast and mini-app. The group must still identify the audience/beneficiary and educational purpose.

### 3.2 Academic content scope

`Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` is the assigned content excerpt for this
project, covering printed pages 28 to 35. It contains:

- Section II, `QUÁ TRÌNH HÌNH THÀNH VÀ PHÁT TRIỂN TƯ TƯỞNG HỒ CHÍ MINH`, from its heading;
- five named historical periods;
- Section III's heading, its first subsection heading, and the opening of that
  subsection's body text.

Unlike the retired C2 excerpt, the 2019 excerpt does not begin mid-argument: it opens at
the Section II heading on tr.28. It also runs slightly further at the end, into the body
of III.1.a on tr.35. That body is outside the assigned content and is not used as
product content.

Do not expand a product claim beyond what the supplied excerpt or an approved, verified additional source supports.

### 3.3 Citation hierarchy stated by the Student Guideline

The following hierarchy is itself a `SOURCE REQUIREMENT` from `SG PDF p.3`:

1. **Nguồn 1 - Chuẩn đầu tiên, bắt buộc 100%:** the official `Giáo trình Tư tưởng Hồ Chí Minh` issued by Bộ GD&ĐT, stated as applicable 2021-2026 and published by NXB Chính trị quốc gia Sự thật. Definitions, concepts, and analytical frameworks must use the textbook page and section as the primary basis.
2. **Nguồn 2 - Tra cứu bổ trợ & Văn kiện gốc:** `Hồ Chí Minh Toàn tập`, 15 volumes, NXB Chính trị quốc gia Sự thật, 2011, used to check original speeches/writings and lock the exact volume/page.
3. **Nguồn 3 - Chủ trương, chính sách & Bối cảnh thời đại:** Văn kiện Đại hội Đảng VII, IX, XI, XII and XIII; the drafts/orientations for Đại hội XIV; `Nghị quyết Trung ương`; `Hiến pháp`; and `pháp luật hiện hành`.

The hierarchy does not list AI output as an academic source. Operationally, this project must never treat AI output as verified academic evidence. This is a derived integrity control, not a claim that the PDFs contain the verbatim sentence `AI is not an academic source`.

### 3.4 Source-provenance risk in the supplied academic file

The retired `C2-02.pdf` displayed Studocu/Studersnel branding and a download QR/watermark, and its metadata title named a Studocu copy of a textbook. That provenance problem is one reason the base source was migrated on 2026-09-17.

The replacement does not remove the problem. `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` is an image-only scan: 8 pages, 8 grayscale image objects, no text layer, produced by `PDF-XChange Lite 11.0.1`, with a handwritten or stamped mark at the foot of every page. It carries no publisher imprint page in the supplied range. It has NOT been authenticated as the official Bộ GD&ĐT / NXB Chính trị quốc gia Sự thật edition.

Status: `SOURCE PROVENANCE CONFLICT - NEED VERIFICATION`.

Operational consequence:

- use the 2019 file to preserve the assigned content boundary and wording;
- do not state that this particular file has been authenticated as the official edition;
- before final submission, a human must compare its claims, printed pages, and citations with the approved official textbook/source copy;
- footnotes printed in it are locator candidates, not independently verified locators;
- migrating the base source did not upgrade any claim's verification status.

### 3.5 External legal/institutional citations

The rule documents cite instruments such as `QĐ 862/QĐ-ĐHFPT`, `Quyết định 766/QĐ-ĐHFPT`, `Điều 10 Thông tư 49/2026/TT-BGDĐT`, `NQ 35-NQ/TW`, and departmental rules/dashboards. These identifiers are `VERIFIED IN FILE`, but their existence, version, effective date, applicability, and quoted effect were not independently authenticated in this three-file audit.

HB attributes the Assignment 40% structure to FPT University examination rules (`QĐ 862/QĐ-ĐHFPT`) and a Fall 2026 department dashboard. HB also prints the claim that `Thông tư 49/2026/TT-BGDĐT` took effect on 15/08/2026. Preserve these only as statements made by HB; the cited materials were not supplied.

Status: `NEED VERIFICATION` before representing them as externally confirmed legal or institutional facts.

---

## 4. PROJECT DECISIONS - DO NOT MISLABEL AS SOURCE REQUIREMENTS

The following items came from the earlier project brief/context, not from a rule that mandates them:

| Item | Current project state | Boundary |
|---|---|---|
| Product format: interactive educational website | `PROJECT DECISION` | Both rule documents list an interactive website as an example, not as the required format. Do not say the documents mandate a website. |
| Working concept: `HÀNH TRÌNH TƯ TƯỞNG` | `PROJECT DECISION - NEED CONFIRMATION` | This title is not in any of the three PDFs. |
| Design direction: interactive historical journey / digital museum / editorial learning experience | `PROJECT DECISION - NEED CONFIRMATION` | Not a rubric phrase or document requirement. |
| Draft Central Question in section 5 | `PROJECT DECISION - NEED LECTURER/TEAM APPROVAL` | The documents require one Central Question but do not supply its wording. |
| English stage aliases such as Roots/Search/Formation/Test/Realization | `PROJECT DECISION` | Never replace the five Vietnamese academic headings with these aliases. |
| Claim-Evidence-Analysis-Connection-Source UI pattern | `PROJECT DECISION` | Useful as a design hypothesis; not a required schema in the PDFs. |
| Proposed interactions, screen maps, responsive rules, accessibility rules, framework, component structure | `PROJECT DECISION` | Inspect the repository first. Do not attribute them to the PDFs. |
| A fixed user-test sample size or questionnaire | `NOT SPECIFIED BY SOURCES` | The PDFs provide no minimum sample size or required questionnaire. Do not invent one. |

### Preserved working product brief from the accessible predecessor

This subsection preserves continuity with the earlier project context. Every item here is a `PROJECT DECISION / DESIGN HYPOTHESIS`, not a rule-document quotation and not proof that it has already been implemented.

**Working product form:** interactive educational website / digital historical learning experience.

**Working concept:** `HÀNH TRÌNH TƯ TƯỞNG - 5 chặng đường, một quá trình hình thành và phát triển`.

**Experience direction:** interactive historical journey, digital museum and editorial learning experience. It should not become a marketing landing page, textbook pasted into HTML, PowerPoint converted to a site, decorative date-only timeline, unverified AI history experience, or a game that trivializes academic content.

**Working learning model:**

`CONTEXT -> EXPERIENCE / PRACTICE -> RECOGNITION -> IDEOLOGICAL DEVELOPMENT -> REVOLUTIONARY APPLICATION -> SIGNIFICANCE`

This model may help learning design, but it must never replace the textbook's terminology or force claims that the source does not support.

**Working journey architecture:** title; Central Question; journey overview; the five exact stages with transition/turning-point moments; cross-stage connection; final synthesis; source/evidence library; and a real-feedback entry point. English aliases such as Roots, Search, Formation, Test or Realization may be internal UI aids only; never substitute them for the exact Vietnamese headings in academic content.

**Interaction hypotheses:**

- a persistent five-stage journey timeline that communicates structure rather than decorative scroll motion;
- turning-point questions asking what changed, followed by explanation and visible evidence;
- a `Connect the Ideas` activity linking historical/practical experience with supported recognition or ideological development, with each pair tied to a verified claim;
- a final synthesis in which the learner reconstructs the five-stage logic and returns to the Central Question;
- an optional map only for places verified by approved sources.

**Working visual direction:** serious, readable, contemporary, educational, historically respectful and visually distinctive; editorial typography, archival-document framing, restrained texture, chapter markers, large date typography, modest motion and source drawers. Avoid decorative excess, generic marketing patterns or unverifiable historical imagery. These are preferences to validate, not rubric text.

**Engineering-quality hypothesis:** responsive desktop/tablet/mobile behavior, semantic structure, readable text, adequate contrast, keyboard/touch access where appropriate, visible focus, no hover-only critical action, reduced-motion support, no unnecessary autoplay and sensible performance. These are project quality choices unless another approved source separately requires them.

**Repository hypothesis:** keep academic content in structured data where practical, including stages, events, claims, sources and interactions; every quiz answer must map to verified content; do not replace a working architecture merely to adopt a preferred framework. Inspect the repository before applying any proposed structure.

**Working product goal:** build an original interactive learning product that helps students understand the five-stage process in the assigned excerpt while remaining traceable, verifiable, testable, revisable and compliant with the Fall 2026 rules.

### Draft Central Question retained as a project hypothesis

> Vì sao tư tưởng Hồ Chí Minh không hình thành trong một thời điểm, mà được hình thành và phát triển qua quá trình trải nghiệm thực tiễn, tiếp thu lý luận, lựa chọn con đường cách mạng và kiểm nghiệm trong thực tiễn cách mạng Việt Nam?

This wording may guide prototyping only after it is recorded as a project decision. It is not approved merely because it appears here.

Working one-sentence core message: the process described in the assigned excerpt develops through connected historical stages rather than isolated events. This is also a project hypothesis and requires audience/lecturer validation.

---

## 5. DOCUMENT VARIANCES AND CONFLICTS

### 5.1 `DOCUMENT CONFLICT` - v2 timing and the source of revision evidence

The documents do not yield one unambiguous final-version sequence:

- `SG PDF p.1` says completed `v2.0` must record revision based on actual comments from the lecturer and viewers.
- `SG PDF p.6` describes `v0.1`, `v1.0`, and `v2.0` in Folder 04.
- `SG PDF p.9` says Week 4 analyzes user feedback and upgrades the product to `v2.0` before the Week 5 Showcase.
- `SG PDF pp.7, 9` says Folder 12 records feedback from the lecturer and audience after the Showcase and how the old `v1.0` was upgraded to `v2.0`, while Week 5 packages the completed final product.
- `HB PDF p.1` says `v1.0 -> v2.0` is based on comments from the lecturer and peers.
- `HB PDF p.5` places the Folder 12 v2 revision report after the defense and mentions lecturer comments.

Unresolved question: is `v2.0` the Week 4 pre-Showcase revision, the post-Showcase final revision, or a label reused for both?

Required handling:

1. Preserve all source clauses.
2. Do not invent `v2.1`, `v3.0`, or a substitute lifecycle as if the documents required it.
3. Use temporary labels such as `VERSION LABEL - NEED LECTURER CONFIRMATION` in working records.
4. Obtain a lecturer ruling before final folder/file naming.

### 5.2 Material `DOCUMENT VARIANCE` register

| ID | Topic | Student Guideline position | Handbook position | Required handling |
|---|---|---|---|---|
| `DV-01` | Evidence basis for recognition | Product value requires evidence for every claim (`SG PDF p.1`). | Evidence-based system must substantiate every design choice (`HB PDF p.1`). | Preserve both; maintain academic claim evidence and design-decision evidence. |
| `DV-02` | Academic First wording | Protect concepts, historical context, chronology, and textbook argument (`SG PDF p.1`). | Protect concepts, historical context, and `lập luận mácxít` (`HB PDF p.1`). | Preserve both phrases; do not collapse `lập luận giáo trình` and `lập luận mácxít` into an invented synonym. |
| `DV-03` | Evidence Visible scope | Every citation, datum, and historical material shows exact volume/page (`SG PDF p.1`). | Every citation, datum, and argument has a clear source location in the textbook and `Hồ Chí Minh Toàn tập` (`HB PDF p.1`). | Preserve both scopes. Current web/legal sources create a locator-format gap. |
| `DV-04` | Revision contributors | Lecturer and viewers (`SG PDF p.1`); Week 3 users are classmates/students in the school (`SG PDF pp.8-9`). | Lecturer and peers (`HB PDF p.1`); Folder 12 later mentions lecturer comments (`HB PDF p.5`). | Record the actual contributor type for every feedback item; do not fabricate missing categories. |
| `DV-05` | A1 criterion 1.3 name | `Sáng tạo & Mỹ thuật` (`SG PDF p.2`). | `Tính sáng tạo & Thẩm mỹ` (`HB PDF p.2`). | Keep each title with its source; score remains 2.0 in both. |
| `DV-06` | A1 practical context | Current official data/events linked to present Vietnam (`SG PDF p.2`). | Current official data/events linked specifically to present Vietnamese socioeconomic context (`HB PDF p.2`). | Satisfy both if possible; do not claim a current example without an approved current source. |
| `DV-07` | Fabricated data in red category | Fake survey data (`SG PDF p.4`). | Fake experimental data (`HB PDF p.3`). | Prohibit fabrication in both named scopes. Do not narrow either wording. |
| `DV-08` | AI image/video subject | AI simulation/distortion of the portrait of Bác Hồ (`SG PDF p.4`). | AI simulation/distortion of `lãnh tụ` (`HB PDF p.3`). | Preserve both exact subject scopes. Block a proposed asset if it violates either clause; record the scope variance as `NEED VERIFICATION` rather than silently rewriting the rule. |
| `DV-09` | Orange copying detail | Partial plagiarism is named (`SG PDF p.4`). | Partial plagiarism and copying another group's structure are named (`HB PDF p.3`). | Preserve the added handbook prohibition. |
| `DV-10` | Yellow-error detail | Citation format, spelling, sparse Prompt Log, and minor date confusion (`SG PDF pp.4-5`). | APA/Chicago error, incomplete Prompt Log parameters, or minor date/term confusion (`HB PDF p.4`). | Preserve the union and exact source wording. The sources do not choose APA versus Chicago. |
| `DV-11` | Repeat offenses | No repeat-offense escalation appears in SG. | Second repetition raises one sanction level; from the third repetition the red level applies (`HB PDF p.4`). | Retain the handbook rule and mark undefined counting/scope `NEED VERIFICATION`. |
| `DV-12` | Product Dossier Part 4 | `Kết quả kiểm thử thực tế & khuyến nghị lan tỏa` (`SG PDF p.6`). | `Kết quả & Ý nghĩa` (`HB PDF p.4`). | Preserve both headings/contents; do not replace one with an invented hybrid without recording the decision. |
| `DV-13` | File naming | SG supplies an exact syntax and examples (`SG PDF p.8`). | HB requires a naming index but supplies no syntax (`HB PDF p.5`). | Use the SG syntax; retain HB's index/audit purpose. |
| `DV-14` | Lifecycle | SG gives a 5-week/10-slot lifecycle (`SG PDF pp.8-9`). | HB gives version and post-defense requirements but no weekly lifecycle (`HB PDF pp.4-5`). | Use SG timing while retaining the conflict in section 5.1. |
| `DV-15` | Source hierarchy | SG defines three source levels (`SG PDF p.3`). | HB does not provide a full hierarchy. | Do not invent a second hierarchy for HB. |
| `DV-16` | Course/rubric authority | SG provides course grading and cites several bases in its sanction table. | HB attributes Assignment 40% to `QĐ 862/QĐ-ĐHFPT` and a Fall 2026 dashboard (`HB PDF p.1`). | Preserve all attributions as document statements; external validity remains `NEED VERIFICATION`. |

No other direct contradiction was established in the three-file audit. Absence of a detail from one document does not cancel a detail present in the other.

---

## 6. NON-NEGOTIABLE SOURCE REQUIREMENTS

### 6.1 Five golden standards

The two rule documents name the same five standards, with wording variances preserved in section 5:

1. `Academic First`
2. `One Central Argument`
3. `Evidence Visible`
4. `Interaction Matters`
5. `Revision Trace`

Source locators: `SG PDF p.1`; `HB PDF p.1`.

### 6.2 3K

The handbook names the mandatory principle exactly as:

`Khai báo - Kiểm chứng - Không sao chép`

Source locator: `HB PDF p.3`. The Student Guideline requires the group to sign this commitment in the Concept Note: `SG PDF p.5`.

Do not invent formal definitions beyond what the documents operationalize through Prompt Log disclosure, cross-verification, originality, and anti-plagiarism rules.

### 6.3 Absolute evidence boundaries

- Operational control derived from the source hierarchy: AI output is not accepted as a verified academic source. This formulation is not a verbatim PDF quotation.
- Every AI prompt used for the project must be transparently recorded in the Prompt Log. The Handbook separately names undisclosed `significant` AI assistance as an orange violation; that narrower wording does not reduce the Student Guideline's full-disclosure requirement.
- `100% nguồn dẫn` must be authenticated; volume/page must be cross-checked where the documents require it.
- A source or locator that has not been checked cannot be labeled verified.
- Real user data, feedback, screenshots, interviews, defense records, worklogs, and revisions must be authentic.
- Do not create evidence-shaped placeholders that look completed. Label templates clearly.

### 6.4 No-AI live rebuttal

Exact shared operational rule, with source wording retained:

- On the presentation/defense podium, students may use one computer for slides/product demo.
- Using a phone or secondary computer to prompt AI for live answers to questions from the lecturer or other groups/audience is prohibited.
- The stated sanction is zero for the whole criterion 2.2, `Phản biện`.

Source locators: `SG PDF p.5`; `HB PDF p.4`.

Do not broaden or narrow this clause by guessing about devices or activities not named in the documents.

---

## 7. CURRENT PROJECT STATUS ON A NEW MACHINE

Unless repository evidence proves otherwise, initialize these states:

| Item | Initial state |
|---|---|
| Central Question approval | `NEED VERIFICATION` |
| Topic Bank registration / exact Topic ID approval | `NEED VERIFICATION` |
| Official-textbook provenance of the supplied 2019 file | `NEED VERIFICATION` |
| 2019 excerpt claims cross-checked against approved Source 1 | `NEED VERIFICATION` |
| 2019 footnote locators cross-checked against original volumes | `NEED VERIFICATION` |
| Current official-source evidence for criterion 1.2 | `NEED VERIFICATION` |
| Prompt Log completeness | `NOT YET EVIDENCED` until the real log is found |
| Prototype v0.1/v1.0/v2.0 history | `NOT YET EVIDENCED` until files/commits are found |
| Real user testing | `NOT YET EVIDENCED` until raw artifacts are found |
| Lecturer/viewer/peer feedback | `NOT YET EVIDENCED` until authentic records are found |
| Evidence-based revision | `NOT YET EVIDENCED` until linked to authentic feedback |
| Worklog and ownership | `NOT YET EVIDENCED` until authentic records are found |
| Showcase/3C/defense log | `NOT YET EVIDENCED` until the events occur and records exist |
| External legal/institutional citations | `NEED VERIFICATION` |
| Overall project completion | `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE` |

Do not convert any initial state to a stronger status without inspecting the corresponding artifact.

---

## 8. ACADEMIC CONTENT MAP - `Giáo trình Tư tưởng Hồ Chí Minh - 2019`, tr.28-35

### 8.1 Scope and use rule

The content below is a faithful, bounded map of what appears in the supplied 8-page
excerpt (printed tr.28-35). Every narrative proposition is
`SOURCE CONTENT - EXTERNAL VERIFICATION REQUIRED` unless explicitly labeled only as a
heading or boundary. A nearby footnote does not authenticate a whole paragraph.

MIGRATED 2026-09-17 from the retired `C2-02.pdf` excerpt. The substantive five-stage
content is very close between the two editions, but the 2019 edition prints more precise
stage boundaries, corrects several printing anomalies, and paginates differently. Nothing
below was carried across unchecked; every heading, page and note was re-read from the 2019
page scans.

The governing heading in the excerpt is:

`II. QUÁ TRÌNH HÌNH THÀNH VÀ PHÁT TRIỂN TƯ TƯỞNG HỒ CHÍ MINH`

Source locator: `tr.28`.

The excerpt opens at this heading. Unlike the retired excerpt it does not begin
mid-sentence, so there is no preceding subjective-factors passage to account for.

### 8.2 Exact five-period structure

| Stage | Exact source heading | Source-bounded content present in the excerpt | Locator | Control |
|---|---|---|---|---|
| 1 | `Thời kỳ từ ngày 5-6-1911 trở về trước: Hình thành tư tưởng yêu nước và chí hướng tìm con đường cứu nước mới` | Influences of homeland, family and nation; Nguyễn Sinh Sắc and Hoàng Thị Loan; progressive reading in Vinh and Huế; participation in the 1908 anti-tax movement in Trung Kỳ; teaching at Trường Dục Thanh in 1910; admiration for the patriotism but rejection of the rescue approaches of Phan Bội Châu, Phan Châu Trinh and Hoàng Hoa Thám; departure abroad on 5-6-1911. | `tr.28` | Keep the exact heading and date. Do not add the unprinted methods of the three predecessors. Note the heading form is `từ ngày 5-6-1911 trở về trước`, which INCLUDES that date in stage 1. |
| 2 | `Thời kỳ từ ngày 6-6-1911 đến ngày 30-12-1920: Hình thành tư tưởng cứu nước, giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản` | Gradual development through living, work, study, theory and revolutionary practice; travel 1911-1917; return to France in 1917; joining the French Socialist Party in 1919; `Yêu sách của nhân dân An Nam` at `Hội nghị Vécxây` on 18-6-1919; study of Lênin's theses in July 1920; the Tours congress from 25 to 30-12-1920; support for the Comintern; participation in founding the French Communist Party; the text calls him the first Vietnamese communist and treats the moment as a turning point linking patriotism with a proletarian revolutionary position. | `tr.28–29` | The stage OPENS ON 6-6-1911, the day after stage 1 closes. Do not write 5-6-1911. The 2019 claim half has no `Dần dần`. Preserve `Vécxây` as the source spelling. `First` and other evaluative claims require independent checking. |
| 3 | `Thời kỳ từ ngày 31-12-1920 đến ngày 3-2-1930: Hình thành những nội dung cơ bản tư tưởng về cách mạng Việt Nam` | Use of the press and revolutionary organization; the two L'Humanité article candidates printed as `8-1919` and `4-11-1920`; formation of `Hội liên hiệp thuộc địa` in 1921; Le Paria activity in 1922; `Bản án chế độ thực dân Pháp` in Pari in 1925; in June 1925 the exact printed organization name `Hội Việt Nam Thanh niên Cách mạng` and newspaper Thanh niên; `Đường cách mệnh`, Quảng Châu, 1927; the early-1930 unification conference and `Cương lĩnh chính trị đầu tiên`; Party leadership, worker-peasant alliance, national unity, and the `giai cấp - dân tộc - quốc tế` relationship. | `tr.29–31` | Do not silently change the printed organization name. The 1919/1920 article dates sit inside a stage that now opens on an exact date, 31-12-1920; retain this periodization tension (`GT-R01`). |
| 4 | `Thời kỳ từ ngày 4-2-1930 đến ngày 28-1-1941: Vượt qua thử thách, giữ vững đường lối, phương pháp cách mạng Việt Nam đúng đắn, sáng tạo` | Internal and external challenges; the doctrinaire influence the text attributes to `Đại hội VI của Quốc tế Cộng sản`; historically situated criticisms `hữu khuynh` and `dân tộc chủ nghĩa`; the October 1930 Central Committee conference and Party-name change; return to the Soviet Union in 1934; continued misunderstanding 1934-1938; a letter dated 6-6-1938 requesting return to activity; departure from the Soviet Union through China in October 1938; reaching the Vietnam-China border in December 1940; `Con đường giải phóng` dated 1-1941; return to Vietnam at the end of January 1941; the May 1941 conference at Pác Bó, huyện Hà Quảng, tỉnh Cao Bằng, placing national liberation first. | `tr.31–33` | Keep the criticism labels in historical quotation/context, not as the project's voice. Do not invent a conference number or the 1938 letter addressee. The WWII/6-6-1938 sentence is a chronology conflict (`GT-R02`). The heading stops at 28-1-1941 while the body narrates May 1941 (`GT-R03`). |
| 5 | `Thời kỳ từ ngày 29-1-1941 đến ngày 2-9-1969: Tư tưởng Hồ Chí Minh tiếp tục phát triển, soi đường cho sự nghiệp cách mạng của Đảng và nhân dân ta` | Basic unity of Hồ Chí Minh Thought and Party line as framed by the textbook; founding Mặt trận Việt Minh on 19-5-1941; founding `Việt Nam tuyên truyền giải phóng quân` on 22-12-1944; `Lời kêu gọi Tổng khởi nghĩa` on 18-8-1945 and the August Revolution; `Tuyên ngôn Độc lập` on 2-9-1945; flexible strategy from 2-9-1945 to 19-12-1946 under `Dĩ bất biến ứng vạn biến`; `Lời kêu gọi toàn quốc kháng chiến` on 19-12-1946; the 1946-1954 resistance; transition after 1954; `hai nhiệm vụ chiến lược` pursued simultaneously 1954-1969; development across politics, economics, military affairs, culture, ethics and foreign affairs; the call of 17-7-1966; `Di chúc`. | `tr.33–35` | The claim half has NO `hoàn thiện,` in this edition. The endpoint is the exact date 2-9-1969, not `tháng 9-1969`. Do not treat evaluative or causal language as independently verified. Keep the post-1969 narrative separate as an epilogue. |

### 8.3 Post-period epilogue and excerpt boundary

After the Stage 5 material, `tr.35` continues to 1975 and an undated `Ngày nay`. This
exceeds the stage heading's endpoint of 2-9-1969. Treat it as
`POST-PERIOD EPILOGUE - CURRENTNESS NEEDS VERIFICATION`, not as evidence inside the
29-1-1941 - 2-9-1969 period and not as a current claim in 2026.

`tr.35` then prints three headings and continues into body text:

- `III. GIÁ TRỊ TƯ TƯỞNG HỒ CHÍ MINH`
- `1. Đối với cách mạng Việt Nam`
- `a. Tư tưởng Hồ Chí Minh đưa cách mạng giải phóng dân tộc Việt Nam đến thắng lợi và bắt đầu xây dựng một xã hội mới trên đất nước ta`

This differs from the retired excerpt, which stopped at the second heading with no body
text. The body of III.1.a lies outside the assigned content (Section II) and is not used
as product content. Do not treat its presence as licence to extend the product's scope.

### 8.4 Chronology and text-risk register

| Risk ID | Source issue | Required handling |
|---|---|---|
| `GT-R01` | Under Stage 3, `Đầu thời kỳ này` introduces L'Humanité candidates dated 8-1919 and 4-11-1920, both before the stage's own opening date of 31-12-1920. | `DOCUMENT INTERNAL PERIODIZATION TENSION - NEED VERIFICATION`; do not move them silently. |
| `GT-R02` | A sentence connects `Khi Chiến tranh thế giới thứ hai bùng nổ...` to a return-request letter dated 6-6-1938 (tr.32). | `DOCUMENT INTERNAL CHRONOLOGY CONFLICT - NEED VERIFICATION`; preserve the source and do not repair it from memory. |
| `GT-R03` | The Stage 4 heading ends 28-1-1941 while the body under it narrates the May 1941 conference and its resolution. | Preserve the printed arrangement. Do not move the May 1941 events into Stage 5 and do not alter the heading's endpoint. |
| `GT-R04` | Stage 5 is headed through 2-9-1969, but the prose reaches 1975 and `Ngày nay`. | Separate the epilogue and verify any present-day use. |
| `GT-R05` | Three printed notes replace the full title with an unresolved abbreviation. | Never expand it. Cite those notes exactly as printed. |
| `GT-R06` | Visible printed forms in the 2019 pages include the duplicated `trở thành thành` (tr.32), lower-case `pháp` in `chống thực dân pháp` (tr.34), the abbreviation printed `Sdd` rather than `Sđd` (tr.32, tr.35), and `thày giáo` (tr.28). | Use a faithful paraphrase and record both forms; do not turn a printed form into an authoritative quotation and do not silently normalise it. |
| `GT-R07` | Most narrative claims have no direct note; Stage 2 carries no numbered note at all. | Never use a nearby note to validate a whole stage or paragraph. |
| `GT-R08` | The supplied file is an unauthenticated image-only scan with a handwritten mark on every page. | Keep provenance `NEED VERIFICATION`; a human must compare against the approved official edition before submission. |

Risks retired by the migration, recorded so their removal can be checked rather than
trusted. The product keeps this audit trail in `web/src/data/locators.ts` as
`SUPERSEDED_RISKS`:

| Former ID | What the 2019 edition prints | Outcome |
|---|---|---|
| `C2-R01` | Stage 1 `từ ngày 5-6-1911 trở về trước`, Stage 2 `từ ngày 6-6-1911`. | RESOLVED - the boundary is two consecutive days, not a blur. |
| `C2-R02` | Stage 2 ends 30-12-1920; Stage 3 opens 31-12-1920. | RESOLVED - no shared boundary. |
| `C2-R03` | Stage 4 ends 28-1-1941; Stage 5 opens 29-1-1941. | PARTLY RESOLVED - the blur is gone; the heading/body tension survives as `GT-R03`. |
| `C2-R04` | Same two article dates, now under an exactly dated stage. | CARRIED OVER as `GT-R01`. |
| `C2-R05` | Same sentence, tr.32. | CARRIED OVER as `GT-R02`. |
| `C2-R06` | Same epilogue; endpoint now 2-9-1969. | CARRIED OVER as `GT-R04`. |
| `C2-R07` | All eight pages show printed numbers; the abbreviation is still unresolved. | PARTLY RESOLVED - page-number half resolved; abbreviation survives as `GT-R05`. |
| `C2-R08` | 2019 prints `bước ngoặt`, `Hòa bình lập lại`, `quân đội viễn chinh Mỹ`, `Cương lĩnh`, and `trong sinh hoạt` correctly. | PARTLY RESOLVED - four anomalies gone; `trở thành thành` survives, and new 2019 forms are registered, as `GT-R06`. |
| `C2-R09` | Unchanged. | CARRIED OVER as `GT-R07`. |

### 8.5 Controlled time markers

Retain only the precision printed in the 2019 edition. The full marker set found in the
excerpt is:

- Stage 1: `từ ngày 5-6-1911 trở về trước`; 1908; 1910; 5-6-1911.
- Stage 2: `từ ngày 6-6-1911 đến ngày 30-12-1920`; 1911-1917; 1917; 1919; 18-6-1919; 7-1920; 25 to 30-12-1920.
- Stage 3: `từ ngày 31-12-1920 đến ngày 3-2-1930`; 8-1919; 4-11-1920; 1921; 1922; 1925; 6-1925; 1927; `đầu năm 1930`; `cuối thế kỷ XIX đến đầu năm 1930`.
- Stage 4: `từ ngày 4-2-1930 đến ngày 28-1-1941`; 10-1930; 1934; 1934-1938; 6-6-1938; 10-1938; 12-1940; 1-1941; `cuối tháng 1-1941`; 5-1941; and the retrospective marker 11-1939.
- Stage 5: `từ ngày 29-1-1941 đến ngày 2-9-1969`; 19-5-1941; 22-12-1944; 18-8-1945; 8-1945; 2-9-1945; 2-9-1945 to 19-12-1946; 1946-1954; 19-12-1946; 1954; 1954-1969; 17-7-1966.
- Epilogue: 1975; `Ngày nay`.

Do not upgrade month-only or year-only markers to exact dates, and do not downgrade the
five stage boundaries, which this edition prints as exact dates. The source also prints
the relative durations `hơn ngàn năm` and `hơn 80 năm` in its August Revolution account;
both require verification before use.

---

## 9. PRINTED LOCATOR CANDIDATES

These are exactly the ten numbered notes visible in the 2019 excerpt, transcribed from the
page scans. They are not verified sources. A final citation may use them only after the
cited work and page have been opened and checked.

| Locator | Printed candidate | Nearby item | Status |
|---|---|---|---|
| `L1` - tr.28, note 1 | `Ban nghiên cứu lịch sử Đảng Trung ương: Chủ tịch Hồ Chí Minh - Tiểu sử sự nghiệp, Nxb Sự thật, Hà Nội, 1980, tr.12.` | First Nguyễn Sinh Sắc quotation | `NEED VERIFICATION` |
| `L2` - tr.28, note 2 | `Học viện Chính trị quốc gia Hồ Chí Minh – Song Thành (Chủ biên): Hồ Chí Minh - Tiểu sử, Nxb Lý luận Chính trị, Hà Nội, 2006, tr.24-25.` | Second Nguyễn Sinh Sắc quotation | `NEED VERIFICATION` |
| `L3` - tr.31, note 1 | `Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2011, t.3, tr.1.` | First-Platform objective quotation | `NEED VERIFICATION` |
| `L4` - tr.31, note 2 | `Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2011, t.3, tr.22.` | First-Platform overthrow formulation | `NEED VERIFICATION` |
| `L5` - tr.31, note 1 of the second run | `Đảng Cộng sản Việt Nam: Văn kiện Đảng: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2005, t.2, tr.110-111.` | October 1930 conference criticism | `NEED VERIFICATION` - tr.31 restarts its note numbering, so this page carries two notes numbered `1`. Preserve that; do not renumber it `3`. |
| `L6` - tr.32, note 1 | `Học viện Chính trị quốc gia Hồ Chí Minh: Hồ Chí Minh - Tiểu sử, Sdd, tr. 250.` | 1938 letter quotation | `NEED VERIFICATION` - abbreviation unresolved, printed `Sdd` |
| `L7` - tr.32, note 2 | `Hồ Chí Minh: Toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2011, t.3, tr. 230.` | May 1941 Hồ Chí Minh quotation | `NEED VERIFICATION` |
| `L8` - tr.32, note 3 | `Đảng Cộng sản Việt Nam: Văn kiện Đảng toàn tập, Nxb Chính trị quốc gia, Hà Nội, 2000, t.7, tr.113.` | May 1941 conference-resolution quotation | `NEED VERIFICATION` - the retired excerpt printed this page ambiguously as `tr.l13`; the 2019 page prints `tr.113`. The number itself is still unchecked against Văn kiện Đảng. |
| `L9` - tr.35, note 1 | `Hồ Chí Minh: Toàn tập, Sdd, t.15, tr. 131.` | 17-7-1966 call quotation | `NEED VERIFICATION` - abbreviation unresolved, printed `Sdd` |
| `L10` - tr.35, note 2 | `Hồ Chí Minh: Toàn tập, Sdd, t.15, tr. 624.` | `Di chúc` final-wish quotation | `NEED VERIFICATION` - abbreviation unresolved, printed `Sdd` |

The abbreviation in L6, L9 and L10 must never be expanded by guesswork, and must not be
normalised to `Sđd` either: this edition prints it without the bar.

Also unverified are in-body publication markers without numbered notes: `Vấn đề dân bản
xứ`, L'Humanité, 8-1919; `Ở Đông Dương`, L'Humanité, 4-11-1920; `Bản án chế độ thực dân
Pháp`, Pari, 1925; `Đường cách mệnh`, Quảng Châu, 1927; and `Con đường giải phóng`, 1-1941.

Note the migration did NOT convert these entries into textbook citations. L3, L4, L7, L9
and L10 point at `Hồ Chí Minh: Toàn tập`, and L5 and L8 at `Văn kiện Đảng`; those remain
original-document sources in their own right, recorded separately from the textbook that
reproduces them.

---

## 10. COURSE AND ASSESSMENT CONTROLS

### 10.1 Course structure in the Student Guideline

| Item | Exact rule-document statement | Locator | Status/control |
|---|---|---|---|
| Delivery | `New Slot 135 phút`: 10 slots across 5 weeks; 2 slots per week | `SG PDF p.1`; the New Slot label also appears in `HB PDF p.1` | `SOURCE REQUIREMENT`; the cited external basis remains unverified. |
| Slot arithmetic | 1 slot = 3 sessions = 135 continuous minutes | `SG PDF p.1` | Do not treat 135 minutes as one group's presentation time. |
| Total in-class time | 30 sessions = 1,350 minutes = 22.5 teaching hours | `SG PDF p.1` | Preserve the arithmetic exactly. |
| Total workload | 22.5 teaching hours + 76.5 self-study/project hours = 100 hours = 2 credits | `SG PDF p.1` | Preserve the arithmetic exactly. |
| Preparation | Students complete textbook pre-reading at home; class time is for Socratic discussion, Edunext debate and project work | `SG PDF pp.1-2` | Do not schedule first reading as in-slot work. |
| Participation | 10%, composed of attendance and active Edunext interaction | `SG PDF p.2` | Course-level requirement. |
| Absence | `<= 20%` | `SG PDF p.2` | Rounding/enforcement are not specified. |
| Progress Test | 20%; objective multiple-choice test; 20 minutes | `SG PDF p.2` | Course-level requirement. |
| Final Exam | 30%; centralized computer-based multiple-choice exam; 60 minutes; organized by the testing office | `SG PDF p.2` | Course-level requirement. |
| Final Exam condition | Score `>= 4.0` | `SG PDF p.2` | The nearby text does not restate the scale; do not invent it. |
| Coursera | `Coursera 100%` certificate completed on time is a prerequisite for Final Exam eligibility | `SG PDF p.2` | Calendar due date is `NEED VERIFICATION`. |
| Assignment | 40%, split into two independently graded 20% components | `SG PDF p.2`; `HB PDF p.1` | External institutional basis remains `NEED VERIFICATION`. |

### 10.2 Assignment 1 - product/content, 20%, group score

The vector is `3-1-2-2-2`, total 10 points. The narrative phrases below describe the `Xuất sắc (8.5 - 10đ)` band; neither document supplies lower-band descriptors or rounding rules.

| Criterion | SG title and excellent-band content | HB title and excellent-band content | Required evidence/control |
|---|---|---|---|
| 1.1 /3.0 | `Lý luận & Phân tích`: correct textbook use, deep answer to the Central Question, logical argument, no copying the book | Same title; adds sharp argument and no sophistry | Claim-level theory mapping; verified textbook page and subsection; original analysis. |
| 1.2 /1.0 | `Tính thực tiễn`: current data/events from official sources linked to present-day Vietnam | Same title; specifies the present Vietnamese socioeconomic context | Currentness and official provenance both `NEED VERIFICATION` until evidence is opened. |
| 1.3 /2.0 | `Sáng tạo & Mỹ thuật`: vivid, modern, smooth user experience, original, not copied | `Tính sáng tạo & Thẩm mỹ`: professional visuals/art, harmonious layout, smooth UX, original form, no copying a ready-made template | Retain both criterion-name variants; preserve design evidence and authorship. |
| 1.4 /2.0 | `Liêm chính AI`: 100% Prompt Log, volume/page cross-check, no fabricated source | `Liêm chính AI & Kiểm chứng`: transparent Prompt Log, 100% sources checked by volume/page, `zero hallucination` | Log every used prompt under SG; authenticate each cited locator. |
| 1.5 /2.0 | `Tương tác & Hiệu quả`: real-user data and v2 revision log based on feedback | Same title; real user experience, feedback analysis, evidence-based v2 | Raw authentic interaction evidence, analysis, and a feedback-to-change link. |

### 10.3 Assignment 2 - presentation/defense, 20%

The vector is `3-4-3`, total 10 points: 7 group points and 3 individual points.

`DOCUMENT INTERNAL AMBIGUITY`: SG calls the component `Thuyết trình` in its bullet list and `Báo cáo` in its table. HB calls it `Thuyết Trình & Phản Biện`. Preserve those terms with attribution; do not claim one is the only original title.

| Criterion | Scope | Excellent-band content | Control |
|---|---|---|---|
| 2.1 `Trình bày logic` /3.0 | Group | Clear/attractive or properly designed slides; roles distributed evenly; confident, fluent delivery; time control; no reading from slides | The Folder 05 script allocates time minute-by-minute to 100% of members and names theory, demo and interaction-data roles. |
| 2.2 `Phản biện 3C` /4.0 | Group | Sharp direct Q&A using `Context - Concept - Conflict`; strict `No-AI live rebuttal`; the HB descriptor includes `bản lĩnh thật` | Follow the device prohibition and retain actual defense questions/answers only after the event. `Bản lĩnh thật` is qualitative and not operationally defined. |
| 2.3 `Đánh giá nội bộ` /3.0 | Individual | Lecturer evaluates Worklog, actual understanding and ability to defend the product | Peer Factor is completely abolished. Folder 11 is evidence, not a multiplication formula. Lecturer grades 2.3 directly. |

### 10.4 Exact 3C meanings

From `SG PDF p.5`:

1. `Context` - establish the real-world context (`Xác lập bối cảnh thực tế`).
2. `Concept` - link closely to a theoretical principle in the textbook (`Gắn chặt vào nguyên lý lý luận giáo trình`).
3. `Conflict` - identify a contradiction, paradox, or gap in the argument.

Every challenge question and debate is required to use all three layers. Do not invent an additional C or replace the order.

---

## 11. 3K, FLAG SYSTEM, AND SANCTIONS

This section records what the two PDFs state. It is not an independent legal interpretation. The cited institutional/legal bases remain `NEED VERIFICATION` under section 3.5.

### 11.1 Flag matrix

| Level | Student Guideline wording/scope | Handbook wording/scope | Stated consequence | Unresolved point |
|---|---|---|---|---|
| `CỜ ĐỎ - Vi phạm đặc biệt nghiêm trọng` | Denying the ideological foundation or the Party's leadership role; distorting history; full plagiarism or having someone else do the whole assignment; AI doing the whole assignment without verification; fake `số liệu khảo sát`; invented source or fake locator; AI image/video simulating or distorting `chân dung Bác Hồ` | Same ideological/history and whole-work categories; fake `số liệu thực nghiệm`; AI image/video simulating or distorting `lãnh tụ` | `Điểm cấu phần Assignment = 0/10`; cancel the group work/result; referral/report to the relevant department/university disciplinary process for consideration | Whether all consequences are automatic/cumulative, the meaning of `cấu phần`, and individual-versus-group treatment are not resolved. Image and fabricated-data scopes are `DOCUMENT VARIANCE`; retain both. |
| `CỜ CAM - Vi phạm nghiêm trọng` | `nguồn rác mạng xã hội` as the main argument; partial plagiarism; undeclared AI support; selectively truncating a quotation so the essence of Bác's statement is distorted | `nguồn rác, nguồn không chính thống` as the main argument; partial plagiarism; copying another group's structure; significant undeclared AI assistance; truncating a quotation so the essence of the thought is distorted | Direct deduction of 2.0-4.0 points; SG says correct and resubmit `v2` within 24 hours, while HB says correct and resubmit the product within 24 hours; corrected score capped at `<= 7.0/10` | Trigger time for 24 hours, score unit affected, and how to choose a value within the range are not specified. |
| `CỜ VÀNG - Lỗi kỹ thuật / Nhắc nhở` | Citation-format error; spelling error; sparse/cursory Prompt Log; secondary historical-date confusion that does not distort the essence | Citation-format or APA/Chicago error; incomplete Prompt Log parameters; secondary date or term confusion that does not affect the essence | Deduction of 0.5-1.0 point; HB additionally says to correct directly at the defense | The documents do not choose APA versus Chicago, define accumulation, or specify how to select 0.5 versus 1.0. |

Source locators: `SG PDF pp.4-5`; `HB PDF pp.3-4`.

The red table prints `Điều 10, Khoản 1, 2, 3 TT 49/2026/TT-BGDĐT & NQ 35-NQ/TW`; the orange row cites `Quyết định 766/QĐ-ĐHFPT` and, in HB, a departmental LLCT rule; the yellow row cites a departmental grading rule. These are document attributions only and remain `NEED VERIFICATION`.

### 11.2 Repeat-offense rule found only in the Handbook

`HB PDF p.4` states:

- when a group or individual repeats the same flag level for the second time, the sanction is automatically raised by one level;
- from the third repeat onward, the highest red level applies and the whole Assignment receives zero.

The Student Guideline contains no repeat-offense clause. Its silence is not a contradiction and does not erase the Handbook clause.

`NEED VERIFICATION`: the Handbook does not define the counting period, whether categories combine, what exactly constitutes the `same flag level`, whether `third repeat` means third occurrence or a later recurrence, or how the raised level maps in every case. Do not automate this sanction without a human ruling and authentic incident records.

### 11.3 No-AI live rebuttal remains a separate criterion-level rule

The No-AI violation produces zero for the entire criterion 2.2. Do not confuse that with the red-row `Assignment = 0/10` consequence. See section 6.4.

---

## 12. REQUIRED 15-FOLDER DOSSIER

One official Google Drive is required with all folders `00` through `14`. Week 1 requires lecturer access, but the permission level is not specified. Folder presence alone does not prove valid content.

| Folder | Exact purpose and required contents | Evidence/status gate | Source locator |
|---|---|---|---|
| `00_README_HuongDanNopHoSo` | Submission guide and pre-deadline/Showcase dossier checklist. SG requires class code, group number, Topic ID, product name, shared Drive link, online product link, and `[x]` for every checklist item. HB also names member list and main-product link. | Real links and complete checklist; no invented link or checked box. Exact template filename typography is `NEED VERIFICATION`. | `SG PDF p.5`; `HB PDF p.4` |
| `01_Registration_ConceptNote` | Week 1 Topic ID registration, Central Question, target/beneficiary audience, product format, learning purpose, preliminary member allocation, and signed `Khai báo - Kiểm chứng - Không sao chép`. HCM202 uses Bank 21; Bank 63 is named for MLN111. | Topic ID and CQ require real group/lecturer approval. The actual topic bank was not supplied. | `SG PDF p.5`; `HB PDF p.4` |
| `02_Product_Final` | Actual highest-quality final product. SG examples/requirements: high-resolution PNG/PDF for infographic/handbook; 1080p MP4 for video/reportage; HTML/JS or zipped source plus a working web link for web app/game. HB lists high-resolution PNG, MP4, web-app link and digital-handbook PDF as examples. | Store only the real deliverable/link and test link access. `Highest quality` is qualitative except for the explicit 1080p video value. | `SG PDF p.5`; `HB PDF p.4` |
| `03_Product_Dossier` | SG four parts: (1) `Đặt vấn đề & tính cấp thiết` mapped to 1.2; (2) `Cơ sở lý luận giáo trình và khóa nguồn` mapped to 1.1; (3) `Đặc tả thiết kế & quy trình sản xuất sáng tạo` mapped to 1.3 and 1.4; (4) `Kết quả kiểm thử thực tế & khuyến nghị lan tỏa` mapped to 1.5. HB four-part formulation: `Đặt vấn đề -> Khung lý luận giáo trình -> Đặc tả sản phẩm & Quy trình -> Kết quả & Ý nghĩa`. | `DOCUMENT VARIANCE`: preserve both structures and obtain a human ruling on formal headings. Do not claim an invented hybrid is quoted from either document. | `SG PDF p.6`; `HB PDF p.4` |
| `04_Product_Prototype_DevelopmentLog` | Chronological idea sketch `v0.1`, first prototype `v1.0`, upgraded revision `v2.0`, reasons for design changes, and design evolution. | Never overwrite earlier evidence. Revision reasons require authentic evidence. Version timing is the `DOCUMENT CONFLICT` in section 5.1. | `SG PDF p.6`; `HB PDF p.4` |
| `05_Showcase_Slides_Script` | Showcase `.pptx` plus speaking-role script allocated minute-by-minute to 100% of members; identify who presents theory, demos the product and analyzes interaction data. | Actual file and timed script; no invented member/role. Exact named template filename is `NEED VERIFICATION`. | `SG PDF p.6`; `HB PDF p.4` |
| `06_Defense_Log_PhanBienBaoVe_3C` | Actual lecturer and peer/audience challenge questions structured with `Context - Concept - Conflict`, plus summaries of the group's direct answers. | May be an empty, clearly labeled template before defense; may be marked complete only after authentic live questions/answers exist. | `SG PDF p.6`; `HB PDF p.4` |
| `07_AI_Declaration_Integrity_PromptLog` | Academic-integrity commitment plus Prompt Log. SG names a Word template or Excel sheet `02_AI_Prompt_Log`; its fields are date used, AI tool, support task, original prompt, output summary, and how the group cross-checked it against the original textbook. HB names tool, prompt, purpose and cross-verification evidence. SG Week 3 requires full declaration of all prompts used. | One truthful row per used prompt. Do not replace a required field with an invented field. The actual Word template and any ambiguous full filename typography are `NEED VERIFICATION`. | `SG PDF p.6`; `HB PDF p.4` |
| `08_Source_Verification_Log` | Use Excel sheet `03_Source_Verification_Map` or a Word table. Map every product argument/claim to an official source, exact volume, exact page and a verbatim verification quotation. SG requires 100% of cited sources authenticated; HB emphasizes the textbook and `Hồ Chí Minh Toàn tập`. | Unopened source or page stays `NEED VERIFICATION`. For current official sources without volumes, record the available exact official locator and flag the volume-rule gap; never invent a volume. | `SG PDF pp.6-7`; `HB PDF p.5` |
| `09_Interaction_Feedback_Evidence` | Real evidence that users interacted with the product: SG names Google Forms result summary with percentage charts, screenshots of interactions/comments, and/or direct-interview minutes; the lifecycle also names Google Forms or interviews and screenshots. HB names viewer Google Forms data, interaction screenshots and test minutes/records. | Raw/summary artifacts must be authentic. The documents specify no minimum sample, questionnaire, demographic quota or success threshold. | `SG PDF p.7`; `HB PDF p.5` |
| `10_Group_Process_Worklog` | Weekly Excel sheet `01_Worklog_TienDo`, updated by the group leader with task, responsible member, deadline, completion status and evidence-result link. HB also names task allocation, deadlines and actual completion level. | Weekly authentic entries. SG calls this the number-one basis for lecturer assessment of individual contribution. No fabricated backfill. | `SG PDF p.7`; `HB PDF p.5` |
| `11_Individual_Contribution_Ownership` | Each member uses the Word template or Excel sheet `05_Individual_Contribution` to declare assigned work, contribution percentage and group trust rating A/B/C. Self- and cross-assessment provide transparent evidence. | One truthful declaration per member. A/B/C semantics and calculation are not defined. Lecturer combines evidence with actual performance and grades 2.3 directly; no Peer Factor. | `SG PDF p.7`; `HB PDF p.5` |
| `12_Final_Revision_Reflection` | SG: aggregate real lecturer/audience feedback; table `feedback item -> old v1.0 -> change/upgrade in v2.0 -> final product link`; lessons-learned reflection after Showcase. HB: v2 revision and reflection, including using lecturer comments to improve after defense. HB p.1 separately names lecturer and peers; SG p.1 names lecturer and viewers. | `DOCUMENT CONFLICT` on timing/version label and `DOCUMENT VARIANCE` on feedback actors. Do not prefill feedback or claim a completed revision before the event. | `SG PDF pp.1, 7, 9`; `HB PDF pp.1, 5` |
| `13_GV_Review_Checklist` | `Logs_Checklists_Template_FA26.xlsx`, sheet `06_GV_Rubric_Checklist`; student self-audit of all A1 `3-1-2-2-2` and A2 `3-4-3` criteria before lecturer grading. HB identifies this as the lecturer's official checklist/score sheet. | Preserve official template if obtained. It was not included among the three source PDFs. | `SG PDF pp.7-8`; `HB PDF p.5` |
| `14_File_Naming_Index` | Index for department-standard file naming and academic audit. SG supplies the exact pattern and two examples; HB supplies no syntax. | Validate every submitted filename against the SG pattern while retaining HB's index purpose. | `SG PDF p.8`; `HB PDF p.5` |

### 12.1 File naming stated by the Student Guideline

Required pattern:

`[MÃ_MÔN]_[LỚP]_[NHÓM]_[TÊN_THÀNH_PHẦN]_[PHIÊN_BẢN].[ĐỊNH_DẠNG]`

Printed examples:

- `HCM202_SE1801_Nhom02_01_ConceptNote_v1.0.docx`
- `HCM202_SE1801_Nhom02_03_ProductDossier_v2.0.docx`

Source locator: `SG PDF p.8`.

Several other template names show visually ambiguous spacing/underscore sequences before `FA26`. Do not reconstruct those filenames from appearance. Obtain the actual template files and mark them `NEED VERIFICATION` until then.

---

## 13. FIVE-WEEK / TEN-SLOT LIFECYCLE

This weekly lifecycle is stated in SG; HB does not provide a weekly lifecycle. HB's absence is not a contradiction.

| Week / slots | Required work | Required evidence named by SG | Stop condition |
|---|---|---|---|
| Week 1 / Slots 01-02 | Form a group of 4-5; elect a leader; create all 15 Drive folders and grant lecturer access; select HCM202 Topic ID from Bank 21; establish Central Question; submit the Folder 01 Concept Note | Folders `00`, `01` | Bank content, Topic ID approval, CQ approval, member identities or Drive permission cannot be invented. |
| Week 2 / Slots 03-04 | Research the official textbook; identify `các luận điểm mácxít trục`; create the Source Verification Map; build first test version Prototype v1.0; draft the detailed Product Dossier outline | Folders `03`, `04`, `08`, `10` | Supplied 2019 file provenance remains unresolved; source entries cannot be marked authenticated before original-source checking. |
| Week 3 / Slots 05-06 | Put Prototype v1.0 before real target users; examples are classmates and students in the institution; collect Google Forms or interview data and interaction screenshots; fully disclose all AI prompts used | Folders `07`, `09`, `10` | No synthetic user, response, quote, chart, interview or screenshot. No minimum sample is stated. |
| Week 4 / Slots 07-08 | Analyze user feedback; revise/upgrade product to v2.0; complete the full Product Dossier; lock 100% cited sources; create Showcase slides and minute-by-minute role script; practice 3C and prepare for direct defense | Folders `03`, `04`, `05`, `10` | `Lock` means resolve or explicitly flag a citation; it never authorizes a guessed locator. Version label remains subject to section 5.1. |
| Week 5 / Slots 09-10 | Showcase before class and lecturer for 10-12 minutes; direct 3C Q&A for at most 20 minutes under No-AI; record actual defense minutes; complete individual contribution assessment; receive in-class feedback; write reflection; package completed product | Folders `06`, `11`, `02`, `12`; final completion evidence is all folders `00`-`14` | The 10-12-minute Showcase and maximum-20-minute Q&A are separate. Actual post-event evidence is mandatory. |

No exact calendar dates are printed for Weeks 1-5. Do not invent them.

---

## 14. MASTER COMPLIANCE MATRIX

`Source status` confirms only that the requirement was found in the named PDF. `Project gate` states what must exist before project compliance can be claimed.

| ID | Requirement/control | Source locator | Source status | Project gate |
|---|---|---|---|---|
| `CM-001` | Use only the exact Fall 2026 rule-document editions named in section 2 | `SG PDF p.1`; `HB PDF p.1` | `VERIFIED IN FILE` | Re-audit if a source hash changes. |
| `CM-002` | Creative product transforms Political Theory knowledge for an identified audience/beneficiary | `SG PDF p.1`; `HB PDF p.1` | `VERIFIED IN FILE` | Approved audience and educational purpose in Folder 01. |
| `CM-003` | Preserve 100% academic accuracy | `SG PDF p.1`; `HB PDF p.1` | `VERIFIED IN FILE` | Human/source review of all public content. |
| `CM-004` | Evidence every academic claim | `SG PDF p.1` | `VERIFIED IN FILE` | Every published claim linked to an authenticated record in Folder 08. |
| `CM-005` | Evidence every design choice | `HB PDF p.1` | `VERIFIED IN FILE` | Design decision record with real basis; format is not specified by source. |
| `CM-006` | `Academic First` | `SG PDF p.1`; `HB PDF p.1` | `VERIFIED IN FILE` | No distortion of concepts, historical context, chronology, textbook argument, or `lập luận mácxít`. |
| `CM-007` | One Central Question and one-sentence core message | `SG PDF p.1`; `HB PDF p.1` | `VERIFIED IN FILE` | CQ approval and a tested one-sentence message. |
| `CM-008` | `Evidence Visible` with exact locators | `SG PDF p.1`; `HB PDF p.1` | `VERIFIED IN FILE` | Viewer-facing locator display; unknown values marked `NEED VERIFICATION`. |
| `CM-009` | Real interaction data measures communication effectiveness | `SG PDF p.1`; `HB PDF p.1` | `VERIFIED IN FILE` | Authentic Folder 09 artifacts and analysis; no invented threshold. |
| `CM-010` | `Revision Trace` from v1.0 to v2.0 | `SG PDF pp.1, 6-9`; `HB PDF pp.1, 4-5` | `VERIFIED IN FILE`; `DOCUMENT CONFLICT` on timing | Both versions plus authentic feedback-to-change records; human ruling on final version label. |
| `CM-011` | Official textbook is Source 1; page and subsection for definitions/frameworks | `SG PDF p.3` | `VERIFIED IN FILE` | Approved official copy opened and checked. Supplied 2019 file provenance is unresolved. |
| `CM-012` | `Hồ Chí Minh Toàn tập`, 15 volumes, 2011, for original writings with exact volume/page | `SG PDF p.3` | `VERIFIED IN FILE` | Correct volume/page opened; no inferred `Sđd`. |
| `CM-013` | Official Party/state/current-law document classes are Source 3 | `SG PDF p.3` | `VERIFIED IN FILE` | Current official document and exact available locator opened. |
| `CM-014` | Do not treat AI output as an academic source | Derived from the SG source hierarchy and SG/HB verification rules | `OPERATIONAL CONSEQUENCE - NOT VERBATIM SOURCE WORDING` | AI output never occupies the verified source/evidence field. |
| `CM-015` | Excerpt boundary, exact five headings and controlled chronology | `GT tr.28-35` | `VERIFIED IN FILE`; external claims unverified | Implement from section 8 without silently repairing tensions or typos. Stage 2 opens 6-6-1911 and stage 5 omits `hoàn thiện`. |
| `CM-016` | Ten numbered footnotes are candidates only | `GT tr.28, 31, 32, 35` | `VERIFIED IN FILE` | Open every original work/page before promoting a locator. Never expand the abbreviation printed `Sdd`. |
| `CM-017` | Course delivery is 10 slots/5 weeks with 135-minute slot and stated workload arithmetic | `SG PDF p.1` | `VERIFIED IN FILE` | Planning/status uses exact values. |
| `CM-018` | Textbook pre-reading occurs at home | `SG PDF pp.1-2` | `VERIFIED IN FILE` | Course plan does not consume slot time for required first reading. |
| `CM-019` | Course weights and eligibility conditions | `SG PDF p.2` | `VERIFIED IN FILE` | Preserve Participation 10%, Progress 20%, Final 30%, Assignment 40%, absence, Final and Coursera conditions. |
| `CM-020` | A1 1.1 theory/analysis /3.0 | `SG PDF p.2`; `HB PDF pp.1-2` | `VERIFIED IN FILE` | Verified theory mapping and original analysis. |
| `CM-021` | A1 1.2 practical relevance /1.0 | `SG PDF p.2`; `HB PDF p.2` | `VERIFIED IN FILE` | Current official evidence connected to present Vietnam; currentness verified. |
| `CM-022` | A1 1.3 creativity/art or aesthetics /2.0 | `SG PDF p.2`; `HB PDF p.2` | `VERIFIED IN FILE`; terminology variance | Original design and UX evidence; preserve both criterion titles. |
| `CM-023` | A1 1.4 AI integrity/verification /2.0 | `SG PDF p.2`; `HB PDF p.2` | `VERIFIED IN FILE` | Full Prompt Log and authenticated locators; zero fabricated sources. |
| `CM-024` | A1 1.5 interaction/effectiveness /2.0 | `SG PDF pp.2-3`; `HB PDF p.2` | `VERIFIED IN FILE` | Real-user evidence, analysis and linked revision. |
| `CM-025` | A2 2.1 logical presentation /3.0 group | `SG PDF p.3`; `HB PDF p.2` | `VERIFIED IN FILE` | Timed script, all members, fluent delivery, no slide reading. |
| `CM-026` | A2 2.2 direct 3C rebuttal /4.0 group | `SG PDF p.3`; `HB PDF p.2` | `VERIFIED IN FILE` | Actual 3C defense and No-AI compliance. |
| `CM-027` | A2 2.3 Ownership /3.0 individual | `SG PDF p.3`; `HB PDF pp.2-3` | `VERIFIED IN FILE` | Worklog, actual understanding/defense, direct lecturer score. |
| `CM-028` | Peer Factor completely abolished | `SG PDF p.3`; `HB PDF p.3` | `VERIFIED IN FILE` | No multiplier/formula; Folder 11 remains evidence only. |
| `CM-029` | 3C order and meanings | `SG PDF p.5`; `HB PDF p.2` | `VERIFIED IN FILE` | Every logged defense item has Context, Concept and Conflict. |
| `CM-030` | One presentation/demo computer; no phone/secondary computer for live AI answers | `SG PDF p.5`; `HB PDF p.4` | `VERIFIED IN FILE` | Live setup confirmed; violation is zero for criterion 2.2. |
| `CM-031` | Exact 3K terms and signed commitment | `SG PDF p.5`; `HB PDF p.3` | `VERIFIED IN FILE` | Signed Folder 01 declaration. |
| `CM-032` | Red behaviors and consequences | `SG PDF p.4`; `HB PDF p.3` | `VERIFIED IN FILE`; scope variances | Prevent violations; human/institutional ruling for ambiguous score/process scope. |
| `CM-033` | Orange behaviors, 2.0-4.0 deduction, 24-hour correction, <=7.0 cap | `SG PDF p.4`; `HB PDF p.3` | `VERIFIED IN FILE` | Preserve exact sanction; trigger and score unit `NEED VERIFICATION`. |
| `CM-034` | Yellow behaviors and 0.5-1.0 deduction | `SG PDF pp.4-5`; `HB PDF p.4` | `VERIFIED IN FILE`; detail variances | Technical QA; human decision within range. |
| `CM-035` | Handbook repeat-offense escalation | `HB PDF p.4` | `VERIFIED IN FILE`; SG silent | Authentic incident history and human ruling on undefined counting/scope. |
| `CM-036` | Folder 00 README/checklist | `SG PDF p.5`; `HB PDF p.4` | `VERIFIED IN FILE` | All required fields, real links and 15-folder check. |
| `CM-037` | Folder 01 registration/concept | `SG PDF p.5`; `HB PDF p.4` | `VERIFIED IN FILE` | Bank 21 Topic ID, CQ, audience, purpose/format, allocation and 3K. |
| `CM-038` | Folder 02 final product | `SG PDF p.5`; `HB PDF p.4` | `VERIFIED IN FILE` | Actual format-appropriate artifact and working link. |
| `CM-039` | Folder 03 academic dossier | `SG PDF p.6`; `HB PDF p.4` | `VERIFIED IN FILE`; Part 4 variance | All four source formulations covered without misattribution. |
| `CM-040` | Folder 04 v0.1/v1.0/v2.0 development log | `SG PDF p.6`; `HB PDF p.4` | `VERIFIED IN FILE`; timing conflict | Preserved versions and evidence-based reasons. |
| `CM-041` | Folder 05 slides/script | `SG PDF p.6`; `HB PDF p.4` | `VERIFIED IN FILE` | PPTX plus minute roles for 100% members. |
| `CM-042` | Folder 06 actual 3C defense log | `SG PDF p.6`; `HB PDF p.4` | `VERIFIED IN FILE` | No completed log until the event occurs. |
| `CM-043` | Folder 07 declaration and Prompt Log | `SG PDF p.6`; `HB PDF p.4` | `VERIFIED IN FILE`; field-detail variance | Every used prompt logged with all SG fields. |
| `CM-044` | Folder 08 source verification | `SG PDF pp.6-7`; `HB PDF p.5` | `VERIFIED IN FILE` | Every claim mapped to authentic exact locator and verification quotation. |
| `CM-045` | Folder 09 interaction evidence | `SG PDF p.7`; `HB PDF p.5` | `VERIFIED IN FILE` | Authentic form/interview/screenshot/test artifacts only. |
| `CM-046` | Folder 10 weekly Worklog | `SG PDF p.7`; `HB PDF p.5` | `VERIFIED IN FILE` | Weekly owner/deadline/status/evidence entries. |
| `CM-047` | Folder 11 individual contribution/ownership | `SG PDF p.7`; `HB PDF p.5` | `VERIFIED IN FILE` | Per-member work, percentage, A/B/C declaration and real performance. |
| `CM-048` | Folder 12 final revision/reflection | `SG PDF pp.7, 9`; `HB PDF p.5` | `VERIFIED IN FILE`; timing/actor conflict | Real post-event feedback, comparison table, reflection and human version ruling. |
| `CM-049` | Folder 13 official review/self-audit checklist | `SG PDF pp.7-8`; `HB PDF p.5` | `VERIFIED IN FILE` | Obtain actual template; complete A1/A2 self-audit. |
| `CM-050` | Folder 14 naming index | `SG PDF p.8`; `HB PDF p.5` | `VERIFIED IN FILE`; HB omits syntax | Every filename checked against SG pattern and indexed. |
| `CM-051` | Week 1 gate | `SG PDF p.8` | `VERIFIED IN FILE` | 4-5 members, leader, Drive+lecturer access, Bank 21/CQ, Folders 00-01. |
| `CM-052` | Week 2 gate | `SG PDF p.8` | `VERIFIED IN FILE` | Textbook/theory/source map, v1.0, dossier outline, Folders 03/04/08/10. |
| `CM-053` | Week 3 gate | `SG PDF pp.8-9` | `VERIFIED IN FILE` | Real user testing, full AI disclosure, Folders 07/09/10. |
| `CM-054` | Week 4 gate | `SG PDF p.9` | `VERIFIED IN FILE` | Feedback analysis, v2.0, full dossier/sources, slides/script/3C, Folders 03/04/05/10. |
| `CM-055` | Week 5 gate | `SG PDF p.9` | `VERIFIED IN FILE` | 10-12 minute Showcase, <=20 minute 3C, actual logs/reflection/final, all 15 folders. |
| `CM-056` | File-naming pattern | `SG PDF p.8` | `VERIFIED IN FILE` | Exact component order and extension; do not guess other template names. |
| `CM-057` | External legal/institutional attributions | `SG PDF pp.3-4`; `HB PDF pp.1, 3-4` | `VERIFIED AS DOCUMENT TEXT ONLY` | `NEED VERIFICATION` before external/legal claim. |
| `CM-058` | No fabricated evidence of any kind | Cross-cutting SG/HB requirements | `VERIFIED IN FILE` | Templates clearly labeled; actual-data fields stay empty until real events. |
| `CM-059` | No mandatory item may be marked complete by mere folder presence | `SG PDF pp.5-9`; `HB PDF pp.4-5` | Faithful operational control | Inspect content, authenticity, source status and links. |
| `CM-060` | Overall completion requires all mandatory evidence and human verification of unresolved conflicts | Cross-cutting | Faithful operational control | Status remains `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE` until every gate passes. |

### 14.1 Atomic audit coverage

The forensic working audit registered:

- `C2-001` through `C2-110`: 110 source-content, boundary, locator, chronology and terminology items.
- `SG-001` through `SG-120`: 120 rule and lifecycle items.
- `HB-001` through `HB-090`: 90 rule, rubric, sanction and dossier items.

All IDs were checked for continuity and all 24 pages were visually reviewed.

This paragraph records the original forensic pass of 2026-09-16, which audited
`C2-02.pdf`. It is left as written because it is a record of what was actually done. The
`C2-0NN` item IDs belong to that pass and to the retired excerpt; the academic content the
product now publishes is governed by sections 8 and 9 above, which were re-derived from
`Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` on 2026-09-17. The migration itself is
recorded in `SOURCE_MIGRATION_2019_REPORT.md`. The matrix above consolidates aligned atomic items into 60 implementation controls without turning document differences into false agreement.

---

## 15. SOURCE-BOUNDED RECORD SCHEMAS

These schemas preserve fields explicitly required by the PDFs. Fields labeled `optional operational field` may help engineering but must not be represented as mandated source fields.

### 15.1 Source Verification Map - Folder 08

Minimum source-required data for every product claim/argument:

- exact product claim/argument;
- official source identity;
- exact volume when the source has a volume;
- exact page;
- verbatim quotation used for verification;
- textbook subsection for definitions, concepts and analytical frameworks.

Allowed operational additions: `Claim ID`, product location/screen, source class 1/2/3, verifier, verification date, link/file hash, and status. These additions do not replace the minimum fields.

Project operational status flow, not source wording:

`UNVERIFIED -> NEED VERIFICATION -> VERIFIED AGAINST OPEN SOURCE`

Never move an entry to the final state from memory, from an AI answer, from a search snippet, or from the textbook footnote alone.

### 15.2 Prompt Log - Folder 07

Required SG fields for each used prompt:

1. date used;
2. AI tool;
3. task for which support was used;
4. original prompt;
5. output summary;
6. how the group cross-checked it against the original textbook.

HB also names tool, prompt, purpose and cross-verification evidence. SG's fuller list is additional detail, not text attributed to HB.

Optional operational additions may include operator, model/version if known, output file/link, human decision, risk and disposition. Never omit the original prompt or checking method in favor of an optional field.

### 15.3 Weekly Worklog - Folder 10

Source-required fields:

- task;
- responsible member;
- deadline;
- completion status;
- evidence-result link.

The group leader updates it weekly. Hours, approval signatures, formulas and automatic contribution scoring are not specified.

### 15.4 Interaction evidence - Folder 09

Store only artifacts actually produced by the chosen real method:

- Google Forms result summary and percentage charts;
- interaction/comment screenshots;
- direct-interview minutes;
- and/or the real test records named in the Handbook.

Label a blank questionnaire or form `TEMPLATE - NOT EVIDENCE`. The PDFs do not prescribe a participant minimum, question set, demographic distribution or statistical threshold.

### 15.5 Revision record - Folders 04 and 12

Required trace elements include:

- preserved `v0.1`, `v1.0`, `v2.0` artifacts in chronological order;
- a short reason for each design change;
- for Folder 12, actual feedback item, old v1.0 state, change/upgrade in v2.0, final product link and group lessons/reflection.

Record the real actor for each feedback item exactly as known. Do not invent lecturer, peer, viewer or audience feedback merely to satisfy all document wordings. Apply the version-label conflict protocol in section 5.1.

### 15.6 Individual contribution - Folder 11

Each member declares:

- assigned work;
- contribution percentage;
- group trust rating A/B/C.

The source does not define A/B/C semantics or a formula. The lecturer uses the table plus actual performance to grade criterion 2.3 directly. Never reconstruct Peer Factor.

### 15.7 Design-decision evidence

HB requires evidence for every design choice but specifies no schema. A project may use a table such as `Decision`, `Reason`, `Evidence`, `Alternative`, `Effect`, and `Status`, but that table is a `PROJECT DECISION`, not a quoted document template.

---

## 16. VERIFIED NEGATIVE BOUNDARIES

None of the three supplied PDFs provides or proves:

- the project's approved Bank 21 Topic ID or final Central Question;
- a mandatory website, framework, programming language, repository layout, visual style, route map or interaction pattern;
- an actual survey questionnaire, sample-size minimum, participant demographics, recruitment method, consent/privacy protocol or success threshold;
- actual survey responses, charts, interviews, screenshots, lecturer comments, peer comments, audience feedback, defense questions, answers, worklogs or contribution percentages;
- exact calendar dates for Weeks 1-5 or the Coursera deadline;
- final Drive permission level, root-folder name, retention policy or duplicate-file policy;
- the actual Word/Excel template files whose names are referenced;
- a complete citation style decision between APA and Chicago;
- lower rubric bands, rounding rules, a 2.3 scoring formula or automatic sanction-selection rules;
- definitions for `nguồn rác`, `nguồn chính thống`, `AI hỗ trợ đáng kể`, `AI làm thay toàn bộ`, `lãnh tụ`, `mô phỏng`, `biến dạng`, `bản lĩnh thật`, or the A/B/C trust ratings;
- independent authenticity of the 2019 file, its ten footnotes, or any external legal/institutional citation;
- a source-defined resolution to the v2 timing conflict.

Plausible values are still invented values. Use `NEED VERIFICATION`.

---

## 17. REQUIRED AGENT WORKFLOW

### 17.1 At the start of every new-machine session

1. Verify all three source filenames and hashes.
2. Read this file, then inspect the three PDFs at the locators relevant to the task.
3. Inspect repository status, current implementation, real dossier artifacts and available templates.
4. Produce a short gap report against section 14 before changing files.
5. Separate each proposed change into `SOURCE REQUIREMENT`, `SOURCE CONTENT`, or `PROJECT DECISION`.
6. Stop any claim or evidence item that lacks authentication; label it.

### 17.2 Before implementing academic content

1. Map the proposed claim to C2 and the required approved source hierarchy.
2. Check chronology and terminology against section 8.
3. Open the original source at its exact locator.
4. Store the verification record in Folder 08.
5. Only then expose the claim as verified content.

### 17.3 Before implementing a design feature

1. State the project hypothesis and targeted rubric/control.
2. Record evidence for the design decision because HB requires design-choice evidence.
3. Do not label an interaction, layout, component or aesthetic choice as a PDF requirement unless the PDF actually states it.
4. Preserve accessibility, responsive quality and testing as good engineering choices when adopted, but attribute them as project choices unless a supplied source mandates them.

### 17.4 Before declaring a milestone complete

Check all of the following:

- required folder set for that week exists;
- contents, not only folder names, satisfy the source fields;
- every academic claim is verified or visibly blocked;
- real-world evidence is authentic and linked;
- Prompt Log covers every prompt used;
- Worklog and ownership records are truthful;
- version/revision assertions match real artifacts;
- no unresolved `DOCUMENT CONFLICT` has been silently resolved;
- no required link is inaccessible;
- no generated placeholder looks like completed evidence.

If any check fails, the milestone is not complete.

### 17.5 Final release gate

The product may be described as ready for final submission only after:

1. all 15 folders contain their required authentic artifacts;
2. all public claims and locators have been authenticated;
3. A1 and A2 self-audits are complete;
4. real user testing and evidence-based revision are present;
5. actual Showcase/defense records exist where applicable;
6. unresolved version, template-name, source-provenance and institutional-rule questions have human rulings;
7. no red, orange or unresolved yellow issue remains concealed;
8. a human performs final academic and submission review.

---

## 18. FORENSIC REVISION NOTES

Relative to the accessible 30,576-byte predecessor, this release materially adds or corrects:

- exact course logistics, workload arithmetic, grade weights and eligibility conditions;
- the full three-level source hierarchy and textbook-subsection requirement;
- source-provenance risk for the supplied C2 copy;
- exact five C2 period headings, content boundaries, all 40 time markers, all ten numbered locator candidates, `Sđd` controls, chronology conflicts and the post-1969 epilogue;
- the complete red/orange/yellow flag system, stated sanctions, sanction ambiguities and HB-only repeat-offense clause;
- exact No-AI live-rebuttal device rule and criterion-2.2 consequence;
- detailed contents and evidence gates for all 15 folders;
- the exact SG filename pattern and examples;
- five weekly gates and the required evidence folders for each;
- full Prompt Log disclosure instead of a weaker `significant use only` rule;
- direct lecturer scoring of criterion 2.3 and the distinction between ownership evidence and abolished Peer Factor;
- preservation of both `chân dung Bác Hồ` and `lãnh tụ` image-rule scopes;
- preservation of both Product Dossier Part 4 formulations;
- explicit `DOCUMENT CONFLICT` treatment for v2 timing and feedback actors;
- explicit `NEED VERIFICATION` handling for external authorities, templates and all absent real-world evidence.

Because the named v2 file bodies were not retrievable, these are not represented as a byte-for-byte changelog against `HCM202_PROJECT_CONTEXT_v2.0.md` or `AGENTS_v2.md`.

---

## 19. RELEASE STATE

This file is suitable as the controlling source-grounded project context for a new machine, provided the agent also has the exact three PDFs and verifies their hashes.

It does not certify that the product itself, its citations, its dossier or its evidence is complete.

Final status: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.
