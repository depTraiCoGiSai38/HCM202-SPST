# HCM202 PROJECT AGENT INSTRUCTIONS

> Revision: v3.0 forensic final  
> Audit date: 2026-09-16  
> Project status: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

These are project-operation instructions, not an academic source. They govern any coding agent working on this HCM202 creative-product repository.

Deployment: place this file at the repository root. Place `HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md` and the three exact PDFs in the root as well, or update only the explicit paths while preserving filenames and hashes. Do not rename this file if relying on Codex's standard project-instruction discovery.

## 1. Mandatory reading order

Before planning, writing, editing, generating media, or declaring status:

1. Read this file completely.
2. Read `HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md` completely.
3. Locate and read all four exact PDFs:
   - `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` - the PRIMARY ACADEMIC CONTENT SOURCE
   - `LLCT_Fall2026_Student_Guideline_TT_v2.0_FINAL.pdf`
   - `TT_CamNang_HoSo_ToanDien_Fall2026.pdf`
   - `C2-02.pdf` - LEGACY / COMPARISON REFERENCE ONLY, see below
4. Verify their SHA-256 values:
   - Textbook 2019: `A520532C4F5034AA7BDF69E7E63459A748C5899BD7E525EA313BEC3AD70F720A`
   - Student Guideline: `B37D8F67A30B0E9ECC3E5F1E8D8BE3DD7C8855C691767A7445D5AA376AC3D51A`
   - Handbook: `3F9408308ADE107FDB7C1D9201E462E7879CA76B9A98EB1359E8578D0CADF54A`
   - C2 (legacy): `F8AB7AA8BE1FB327F3DCE15027DD813CB971DDC8240864A2E745BDA30BEB485E`

### Base-source migration, 2026-09-17

The academic base source moved from `C2-02.pdf` to
`Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf` (8 scanned pages = printed tr.28-35).
`SOURCE_MIGRATION_2019_REPORT.md` is the migration record.

- Every PUBLIC textbook citation uses the label `Giáo trình Tư tưởng Hồ Chí Minh - 2019`
  and a PRINTED page, for example `Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 29`.
- `C2 PDF p.N`, `C2-02.pdf` and any 2021-edition label must never appear as a public citation.
- `C2-02.pdf` is NOT deleted. It stays as the comparison reference that the migration
  was audited against, and it no longer controls any locator.
- The 2019 file has no text layer: it is an image-only scan produced by
  `PDF-XChange Lite`, with a handwritten mark at the foot of every page. It is NOT
  authenticated as the official Bộ GD&ĐT / NXB Chính trị quốc gia Sự thật edition.
  Its provenance stays `NEED VERIFICATION`, exactly as C2's did. Read it by rendering
  the pages; text extraction returns only the watermark.
5. Inspect the repository, version-control state, dossier artifacts and available templates before changing anything.

If a source is missing or its hash differs, write `SOURCE FILE CHANGED - RE-AUDIT REQUIRED`. Do not reuse old locators as verified facts.

## 2. Controlling context

`HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md` is the controlling project context. Its source boundaries, exact terminology, document-variance register, `DOCUMENT CONFLICT` records, academic content map, locator candidates, rubric, sanctions, 15-folder dossier, lifecycle, compliance matrix and release gates are mandatory.

Do not replace its exact Vietnamese source terms with convenient synonyms. Do not silently resolve a conflict or apparent typo.

## 3. Source and evidence protocol

Use these statuses exactly:

- `SOURCE REQUIREMENT`
- `SOURCE CONTENT`
- `PROJECT INPUT`
- `PROJECT DECISION`
- `VERIFIED IN FILE`
- `NEED VERIFICATION`
- `NOT YET EVIDENCED`
- `DOCUMENT VARIANCE`
- `DOCUMENT CONFLICT`
- `REJECTED`

`VERIFIED IN FILE` means only that wording was found in a supplied PDF. It does not authenticate that PDF, its footnotes, or an external legal/institutional authority.

The Student Guideline's hierarchy controls source handling:

1. Official HCM202 textbook as Source 1. Definitions, concepts and analytical frameworks require page plus subsection.
2. `Hồ Chí Minh Toàn tập`, 15 volumes, 2011, for original works with exact volume and page.
3. Named official Party/state/current-law document classes for policy and contemporary context.

Operational rule derived from the hierarchy: AI output is never accepted as verified academic evidence. This is not presented as a verbatim sentence from either PDF.

The supplied 2019 textbook file is an unauthenticated scan. Use it to preserve the assigned content boundary and wording, but keep its provenance and every academic claim `NEED VERIFICATION` until compared with the approved official source. The retired `C2-02.pdf` additionally carried Studocu/Studersnel provenance indicators; that is one reason the base source moved, and it is not a reason to treat the 2019 file as authenticated.

The ten numbered footnotes in the 2019 excerpt are locator candidates only. Three of them replace the full title with an unresolved abbreviation, printed in this edition as `Sdd`; it must never be expanded by guesswork, and must not be silently normalised to `Sđd` either. All eight pages of the 2019 excerpt do show their printed page numbers, so a locator is always given as a printed textbook page; the PDF sheet number is kept for internal audit only and is never published.

## 4. Absolute prohibitions

Never invent, infer into existence, or backfill:

- a source, URL, title, edition, quotation, page, volume, subsection or legal locator;
- a historical fact, date, organization name or current datum;
- a survey participant, response, chart, interview, screenshot, test result or effectiveness metric;
- lecturer, peer, viewer or audience feedback;
- a defense question, answer, meeting minute, worklog entry, contribution percentage or A/B/C rating;
- a prototype, version history, revision reason, approval, Drive permission or completed checklist;
- a template filename where the PDF typography is ambiguous;
- a sample-size threshold, questionnaire, deadline, scoring formula or conflict ruling absent from the sources.

Templates must be labeled `TEMPLATE - NOT EVIDENCE`. Empty evidence fields stay empty and visibly blocked.

## 5. Document conflict protocol

Both Fall 2026 rule documents apply. Neither provides a precedence clause.

When wording differs:

1. preserve each position with its own PDF locator;
2. label a compatible difference `DOCUMENT VARIANCE`;
3. label an impossible or timing/version collision `DOCUMENT CONFLICT`;
4. do not choose a side or merge wording into a false quotation;
5. obtain a human/lecturer ruling when implementation depends on the answer.

Always retain these known differences:

- AI image/video scope: SG says `chân dung Bác Hồ`; HB says `lãnh tụ`.
- fabricated data: SG says survey data; HB says experimental data.
- Product Dossier Part 4: SG says real testing results and dissemination recommendations; HB says results and significance.
- revision actors/timing: lecturer/viewers, lecturer/peers, user feedback before Showcase, and lecturer/audience feedback after Showcase all appear; the final `v2.0` timing is unresolved.
- HB alone contains repeat-offense escalation.
- SG provides the exact file-naming syntax; HB requires the index but provides no syntax.

Do not invent `v2.1` or `v3.0` as the source-required product version. Use `VERSION LABEL - NEED LECTURER CONFIRMATION` until ruled.

## 6. Academic content controls

Use the five exact period headings as the 2019 edition prints them, recorded in context section 8. Do not replace them with English aliases or shorter labels in academic content. Two of them are easy to get wrong from memory or from the older edition: stage 2 opens on `6-6-1911`, not 5-6-1911, and stage 5 does NOT contain the word `hoàn thiện`.

Respect all chronology controls of the 2019 edition, especially:

- exact consecutive stage boundaries - 5-6-1911/6-6-1911, 30-12-1920/31-12-1920,
  3-2-1930/4-2-1930, 28-1-1941/29-1-1941 - which must not be softened back into the
  older edition's overlapping `cuối năm 1920` / `đầu năm 1941` language;
- 8-1919 and 4-11-1920 article markers appearing under the stage headed from 31-12-1920;
- the stage 4 heading ending 28-1-1941 while its own body narrates May 1941;
- the WWII sentence tied to a letter dated 6-6-1938;
- the Stage 5 heading ending 2-9-1969 while later prose reaches 1975 and undated `Ngày nay`;
- apparent printed anomalies that require a clean-edition check.

Do not repair, relocate, modernize, or normalize these from memory. Preserve historically situated organization names and terms.

## 7. Non-negotiable project controls

- `Academic First`
- `One Central Argument`
- `Evidence Visible`
- `Interaction Matters`
- `Revision Trace`
- `Khai báo - Kiểm chứng - Không sao chép`
- one approved Central Question and a one-sentence core message
- claim-level source verification and design-choice evidence
- full disclosure of every AI prompt used
- authentic real-user evidence and feedback-linked revision
- A1 vector `3-1-2-2-2`
- A2 vector `3-4-3`, with 7 group points and 3 individual points
- Peer Factor completely abolished; criterion 2.3 is lecturer-scored directly
- exact 15-folder dossier and SG naming pattern
- Week 1-5 evidence gates
- No-AI live rebuttal: one computer for slides/demo; no phone or secondary computer to prompt AI for live answers; violation gives zero for all criterion 2.2

Flag rules and sanctions must be represented exactly as context section 11 states. Do not independently apply an ambiguous sanction formula.

The exact dossier folders are:

```text
00_README_HuongDanNopHoSo
01_Registration_ConceptNote
02_Product_Final
03_Product_Dossier
04_Product_Prototype_DevelopmentLog
05_Showcase_Slides_Script
06_Defense_Log_PhanBienBaoVe_3C
07_AI_Declaration_Integrity_PromptLog
08_Source_Verification_Log
09_Interaction_Feedback_Evidence
10_Group_Process_Worklog
11_Individual_Contribution_Ownership
12_Final_Revision_Reflection
13_GV_Review_Checklist
14_File_Naming_Index
```

Folder names do not prove folder contents. Apply context section 12 to every folder.

## 8. Work procedure

At the start of a task:

1. identify the requested outcome;
2. report current repository and compliance state;
3. list affected controls from the master compliance matrix;
4. distinguish source requirements from project decisions;
5. identify any missing source, evidence or human ruling;
6. make only scoped, reversible changes while preserving user work.

For academic content:

1. map the claim to the 2019 textbook excerpt and the required source class;
2. check exact terminology and chronology;
3. open the original source at the exact locator;
4. record the verification in Folder 08;
5. publish only after authentication.

For design/code:

1. inspect the existing architecture before choosing tools;
2. link the feature to a rubric/control or label it `PROJECT DECISION`;
3. preserve evidence for the design choice;
4. verify the implementation in proportion to risk;
5. do not claim that a framework, UI pattern, animation, accessibility rule or responsive breakpoint came from the PDFs unless it actually did.

For user testing, Showcase and defense, prepare clearly labeled templates if asked, but never pre-populate actual results or mark an event complete before it occurs.

## 9. Prompt Log requirement

For every AI prompt used, retain at least:

- date used;
- AI tool;
- support task;
- original prompt;
- output summary;
- how it was cross-checked against the original textbook.

Optional metadata may supplement but never replace these fields.

## 10. Completion gate

Do not say `complete`, `verified`, `submission-ready`, or equivalent unless all relevant controls pass with authentic artifacts.

Final submission readiness requires:

- all 15 folders with required real contents;
- every public claim and locator authenticated;
- complete Prompt Log, Source Verification Map, Worklog and Ownership evidence;
- real user testing and evidence-based revision;
- actual post-event defense/feedback records where applicable;
- A1/A2 self-audit;
- working links and correct filenames;
- human rulings for unresolved version, provenance, template and institutional questions;
- final human academic/submission review.

Until then, report the narrow truthful status and keep overall state:

`REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

## 11. First prompt on a new machine

```text
Read AGENTS.md and HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md completely before doing anything.

Verify the filenames and SHA-256 hashes of:
1. Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf   (primary academic source)
2. LLCT_Fall2026_Student_Guideline_TT_v2.0_FINAL.pdf
3. TT_CamNang_HoSo_ToanDien_Fall2026.pdf
4. C2-02.pdf   (legacy comparison reference only; it controls no locator)

The 2019 PDF is an image-only scan with no text layer. Render its pages to read it.

Then inspect the repository and git status without modifying files.
Produce a Repository + Compliance Audit covering the current implementation, academic/source risks, missing authentic evidence, document conflicts, dossier gaps, and the safest next task.
Do not delete, refactor, regenerate, or mark anything complete until that audit is finished.
```
