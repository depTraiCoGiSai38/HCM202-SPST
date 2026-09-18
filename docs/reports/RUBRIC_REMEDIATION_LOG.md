# RUBRIC REMEDIATION LOG

> **Date:** 2026-09-18, 21:20 (+0700)
> **Trigger:** reassessment against the authoritative department rubric `RUBRIC BỘ MÔN v4.1`, found in the
> lecturer-owned gradebook `HCM202_SE1810_Fall2026_Half 1`.
> **Method:** six parallel read-only audits (repository, production, Folders 01-04, Folders 05-14, Folder 07+08
> integrity, local reports), each finding then adversarially verified by an independent pass that tried to refute
> it. 117 findings survived verification; 8 were refuted and **not acted on** — those are listed in §3.
>
> This log does not hide earlier mistakes, including mistakes made by earlier AI-assisted passes on this project.

---

## 1. Changes applied

| # | Issue | Old state | New state | Evidence | Rubric impact | File changed |
|---|---|---|---|---|---|---|
| R-01 | Locator matrix claimed a verification that never happened | Folder 08 §3 printed **`ĐÃ XÁC MINH`** for all ten locators L1-L10 | Two separate columns: transcription `VERIFIED IN FILE`, originals **`NEED VERIFICATION`** for all ten | `web/src/data/locators.ts:24,32,39,46,54,63,72,80,89,98` all read `status: 'NEED VERIFICATION'`; `content.test.ts` forbids any other value; the same document's §3 intro, §7 and §9 all said the originals were never opened; Folder 07 said the opposite of the table | **Removes a `RED04` exposure** (fabricated verification → 0/10 component). Criterion 1.4 | NEW Drive doc `..._08_SourceVerificationLog_v1.2` (v1.0 preserved) |
| R-02 | Five AI sessions used but never declared | Prompt Log declared **10** codes, "9 log files + 10 verbatim prompts" | **15** codes declared: + `P-LAYOUT-01`, `P-CARTO-01`, `-02`, `-03`, `-04`; counts corrected to **11 log files + 11 verbatim prompt files** | `ls -1 docs/07_AI_Prompt_Log_*.md \| wc -l` → 11; `ls -1 docs/prompts/*.txt \| wc -l` → 11; `grep "^## P-CARTO"` → 4 headings; strings `P-LAYOUT-01` / `P-CARTO` absent from the Drive document | **Removes a `CAM03` exposure** (undeclared AI → −2-4 pts, cap ≤7/10). Criterion 1.4 | NEW Drive doc `..._07_AIPromptLog_BoSung_2026-09-18_v1.1` (v1.0 preserved) |
| R-03 | Every dossier document said the Showcase had not happened | 8 documents asserted `CHƯA DIỄN RA`; Folder 06 template said so in capitals | `SHOWCASE COMPLETED — EVIDENCE RECORD INCOMPLETE`, with every verifiable fact recorded and every content field marked `[CẦN NHÓM XÁC NHẬN]` | Gradebook `SHOWCASE / PRESENTATION SCHEDULE`: Nhóm 2 · Slot 4 · **17/9/2026** · TT&PB · challengers Nhóm 7, Nhóm 5. Attendance sheet: all four members `P` for Slots 1-4 | Stops the dossier telling the grader the group missed its own slot. Criteria **2.1 /3 + 2.2 /4** | NEW Drive doc `..._06_ShowcaseDefenseRecord_2026-09-17_v1.0` |
| R-04 | Criterion 1.5 written off as having no basis | Folder 00 blockers doc: *"Tiêu chí 1.5 Tương tác (/2.0đ) hiện không có căn cứ"*; Dossier PHẦN IV framed 1.5 as requiring user-testing data | Documented inventory of **15 reachable interactive mechanisms**, each traced to file, line and route, with browser-test proof | v4.1 1.5 Mức 3 = *"game/trắc nghiệm hoặc hoạt động kiểm tra kiến thức cơ bản"*; product has a 3-option quiz at every stage entrance, a 12-pair matching activity, a 5-piece ordering activity, a 4-axis comparison tool, 8 reversible turning-point crossings. 255 browser tests pass, incl. `e2e/activities.spec.ts`, `e2e/keyboard.spec.ts` | Criterion **1.5**: from ~0 to **1.5 – 1.75** | NEW Drive doc `..._09_InteractionEvidence_v1.1` |
| R-05 | Textbook edition framed as the dossier's largest open violation | Folder 08 §1: *"Đây là rủi ro lớn nhất của cả hồ sơ"*; several reports repeat "wrong edition" | Risk **materially reduced**; residual difference recorded as `DOCUMENT CONFLICT`, neither side chosen | Lecturer's `RESOURCE REGISTRY` lists course text as *"(Phiên bản PDF năm 2019 của Bộ Giáo dục và Đào tạo)"*, file `GT học phần Tư tưởng HCM_2019.pdf`, 27,127,799 B. README mục 3 still says *"áp dụng 2021-2026"* | Reduces `CAM01` exposure. Criteria 1.1, 1.2 | `..._08_...v1.2`; banner in `SOURCE_MIGRATION_2019_REPORT.md` |
| R-06 | `.pptx` carried as a mandatory missing deliverable | Context file row 05 required a Showcase `.pptx`; Showcase Script listed it as missing; README listed "make the slide deck" as outstanding | Marked **`SUPERSEDED RUBRIC REQUIREMENT`**, original wording preserved. **No `.pptx` created** | v4.1 contains no `.pptx` deliverable; slides appear in 2.1 only as *"không đọc slide"*. Lecturer's 13-9 README does not restate it. It survives only in `SG PDF p.6` as packaging | Removes a phantom blocker from 2.1 | `HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md` (05 row) |
| R-07 | Test counts stale in at least 9 documents, in three mutually incompatible versions | 113 / 115 / 116 unit; 183 / 213 / 228 e2e; e2e also recorded as "NOT RUN" and `status: failed` | Single canonical record: **136 unit, 255 e2e**, with command and timestamp | `npx vitest run` → 136 passed (content 88, places 48) at 20:47; `npx playwright test` → 255 passed, exit 0, 6.1 min | Criterion 1.4 (accuracy of self-reporting) | NEW `docs/MEASURED_STATE_2026-09-18.md`; banners on 7 root reports |
| R-08 | `origin/main` described as unbuildable | Dossier §3.4 and Development Log §8.5: cloning `origin/main` *"sẽ không dựng được"* | Obsolete — all nine modules are on `origin/main` | `git rev-list --left-right --count origin/main...main` → `0 0`; HEAD `1f2033d`; `git cat-file -e origin/main:<path>` succeeds for all nine | Removes a self-inflicted defect claim. Criterion 1.4 | Recorded in Folder 00 doc + banners |
| R-09 | Topic ID recorded as unregistered | Dossier closing table: Topic ID *"CHƯA CÓ"* | Obsolete | Gradebook `ĐĂNG KÝ TOPIC`: Nhóm 2 · `HCM-TT-C2-02` · **"Đã đăng ký"** | Removes a false compliance gap | Folder 00 doc |
| R-10 | Group recorded as having one evidenced member / possibly undersized | Blockers doc COMPLIANCE-02: *"chỉ có một thành viên có bằng chứng"*; several docs assumed a 5-person group | Obsolete — roster confirms exactly 4, all matching | Lecturer roster: SE194494 (Trưởng nhóm), SE193264, SE196501, SE196604, all Nhóm 2 | Removes a false gap. Criterion 2.3 | Folder 00 doc |
| R-11 | Git account → person mapping held as unverifiable | Folder 11 item 5: *"Nhiều khả năng là Bùi Phong Giang … chưa có xác nhận bằng văn bản — NEED VERIFICATION"* | Resolved at identity level | Roster maps `buiphonggianghinhanh@gmail.com` → **SE194494 Bùi Phong Giang, Trưởng nhóm**; that address owns the dossier Drive | Criterion 2.3 | Folder 00 doc, Prompt Log addendum PHẦN 4 |
| R-12 | Prompt Log internally contradictory about member participation | §2.1 named three performers; PHẦN 4 said only one member has traces | Both preserved; correct reading stated: only the leader's participation is evidenced, the other two are `NOT YET EVIDENCED` and must self-declare | `git log` shows one author across all 6 commits | Criterion 2.3 | Prompt Log addendum PHẦN 4 |
| R-13 | Three reports asserted no lecturer/audience feedback had *taken place* | e.g. `STAGE_BODY_EDITORIAL_REBALANCE_REPORT.md:563-564` | Narrowed to the truthful claim: none is **recorded in this repository**; the Showcase did take place on 17-9-2026 | Verifier explicitly cautioned against replacing one unqualified assertion with its opposite — wording follows that caution | Criterion 2.2 | Banners on 3 root reports |

---

## 2. Deliberately not done

| Item | Why |
|---|---|
| Create a `.pptx` | Not required by the current rubric; the user instructed against it; the Showcase is already over |
| Fill any user-testing result, participant, survey figure or screenshot | No such data exists. `RED04` |
| Fill any Showcase question, answer, timing, or speaker allocation | Nobody recorded them. Only the four members can, from memory |
| Fill or "fix" Folder 11 contribution percentages and A/B/C ratings | `AGENTS.md` §4 forbids inferring these. The existing uniform 25%/"A" is flagged, not replaced |
| Rewrite historical prompt logs (`docs/07_AI_Prompt_Log_*.md`, `docs/prompts/`) | They are append-only historical records. Stale statements inside them are correct-as-of-writing |
| Commit or push the cartography sprint | A repository action belonging to the repo owner |
| Re-deploy the public site | Outside any tool's authority here; needs the person who deployed it |
| Edit existing Google Docs in place | The Drive connector cannot modify existing document content. Every correction is therefore a **new versioned document**, with the superseded one preserved — which also matches this project's "append a dated correction, never delete" convention |

---

## 3. Findings that were refuted and NOT acted on

The verification pass rejected eight claims. Recording them matters as much as recording the accepted ones.

| Claim | Why it was rejected |
|---|---|
| "Folder 07 treats the empty user-testing folder as a compliance gap under a superseded requirement" | The quoted row sits in a **misconduct self-audit** about fabricating experimental data, not a compliance-gap list. The characterisation was wrong |
| "Submission Blockers lists slide-deck production as an outstanding item — remove it" | The quote was accurate but the proposed fix was wrong: **a `.pptx` IS still named in `SG PDF p.6`** as a Folder 05 packaging item. Acting on the original wording would have destroyed a live, if unscored, requirement. Handled instead as `SUPERSEDED FOR SCORING` + `NEEDS LECTURER CONFIRMATION` |
| "Dossier declares the browser suite NOT RUN and `.last-run.json` says failed" | The file's provenance in the claim was impossible (timestamps did not support it); a concurrent Playwright run had rewritten the file mid-audit |
| "Development Log's 'one git author across four commits' is stale / means one evidenced member" | Misdiagnosed and under-scoped; the underlying sentence is an evidence statement, not an error |
| "README member table has five rows, three blank, and invents a fifth role" | Four rows are blank, not three, and row 5 is an explicitly empty slot, not an invented role |
| "Worklog cross-references Showcase to Folder 02 and user testing to Folder 10" | The document uses a two-folder convention and the prescribed folder is already listed first in both cases |
| "Spatial-journey report treats the Showcase build as upcoming" | No future tense exists in the cited sentence |
| "web/README.md heads the offline bundle as the file to project at the Showcase" | Quote accurate but the finding was overstated and its second locator wrong; the section is live operational documentation |

---

## 4. Verification note

Every accepted finding was re-checked by an independent pass instructed to **refute** it, defaulting to
rejection under uncertainty. Several accepted findings came back with corrections that were folded into the
remediation rather than ignored — notably:

- the Prompt Log shortfall was **five** codes, not two as first claimed;
- the Showcase is evidenced as **scheduled for a now-past date plus full attendance**, not as a recorded
  completion — so the wording used throughout says exactly that, and the event's *content* is treated as
  unrecorded;
- the "dead CSS" range attached to the orphaned `sources.ts` module was partly live and was not touched.

---

*Recorded 2026-09-18. Superseded documents are preserved, not deleted. No status in this project was raised to
"verified" without a person to stand behind it.*
