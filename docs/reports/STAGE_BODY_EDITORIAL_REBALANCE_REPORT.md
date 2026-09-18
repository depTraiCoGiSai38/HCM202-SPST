# Stage body editorial rebalance — all five stages

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
>
> **Về buổi Showcase:** báo cáo này được viết khi chưa biết buổi Showcase của Nhóm 2
> đã diễn ra **ngày 17-9-2026, Slot 4** (lịch do giảng viên sở hữu, sheet
> `SHOWCASE / PRESENTATION SCHEDULE`). Mọi câu trong báo cáo này hàm ý buổi ấy
> *chưa diễn ra* đều phải đọc lại theo nghĩa hẹp: **chưa có bản ghi nào của buổi ấy
> trong kho mã**. Bản ghi sự kiện: Folder 06, `..._06_ShowcaseDefenseRecord_2026-09-17_v1.0`.

---

> Date: 18-9-2026
> Scope: **layout, composition and visual rhythm only.** No academic content, locator,
> source label, quotation, chronology, provenance or verification status was changed.
> Project status is unchanged: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`.

---

## 1. Problem observed

The stage body had exactly **one** composition. Every stop of every stage — an ordinary
passage, a printed quotation, a turning point, the stage's closing boundary — was rendered
into a single column capped at `--measure` (`66ch`) and pinned to the inline start of
whatever width the screen offered.

Two facts in the stylesheet produced the defect together:

1. `.station { max-inline-size: var(--measure) }` — `experience.css:2143`. The measure was
   enforced on the **container**, not on the prose. Every non-prose sibling inside that
   container was pinned as collateral.
2. **There was no breakpoint above 1280px.** `.walk__body` went to two columns at
   `min-width: 80rem` and never changed again, so 1280px and 1920px received the identical
   composition and the whole extra 640px was dumped into an unbounded `1fr`.

Measured with `tools/body-balance.mjs` at a 1920×1080 viewport, walking every stop of all
five stages:

| | measured |
|---|---|
| content canvas (`.main`) | 1872px |
| reading track (`.walk__column`) | 1488px |
| margin record (`.walk__margin`) | 336px |
| painted station inside the track | **642px** |
| **dead band inside the track** | **846px = 45% of the canvas** |

**69 of 85 body states** carried a dead band wider than 35% of the canvas — and it was not
one stage's problem:

| stage | offending states |
|---|---|
| ky-1 | 12 |
| ky-2 | 9 |
| ky-3 | 15 |
| ky-4 | 18 |
| ky-5 | 15 |

By kind: 53 passages, 11 quotations, 5 boundaries. Turning points were less bad (32%) only
because `.station--turn` had its own wider cap of `56rem`.

A note on how this was measured. A naive "empty right side" reading of the page edge reports
**zero**, because the margin record does reach the right edge of the canvas. The band a
viewer actually sees is *between* the reading and that margin, inside the reading track. The
tool measures that, and it measures the union of elements that actually paint ink
(`.station`, `.station__where`, `.station__support`, `.reflect`, `.bridge`) rather than their
containers — otherwise the new transparent composition wrapper would report a full canvas by
construction and the number would be meaningless.

Three states were worst, and all three are in the prompt's list of symptoms:

- **A printed quotation** — the most exhibit-like object in the product — rendered as a
  642px text block in the far left of a 1920px screen.
- **SUY NGẪM (reflection)** — capped at `66ch`, so the two positions it sets against each
  other were two ~250px columns with an arrow between them, and the question the stage had
  been building towards was the same size as the prose above it.
- **The stage boundary** — the stage's closing statement of what the excerpt does *not* say,
  rendered as a narrow left-hand list.

---

## 2. Existing architecture audited

Read before any change: `AGENTS.md`, `CLAUDE.md`,
`HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md`, `CREATIVE_SPATIAL_JOURNEY_REPORT.md`,
`HISTORICAL_IMAGE_INTEGRATION_REPORT.md`, `SPATIAL_JOURNEY_DESIGN_DECISION.md`,
`CREATIVE_TRANSFORMATION_AUDIT.md`, `UX_REDESIGN_REPORT.md`. All four controlled PDFs were
hash-verified against `AGENTS.md` §1 and all four matched.

### 2.1 What renders a stage body

`src/components/stagePage.ts` builds an ordered list of **stations** (`buildStations`), then
renders one at a time into `.walk__panel` (guided traverse) or all of them into `.walk__flow`
(continuous reading). Per stop it appended three **siblings**:

```
.walk__panel
├─ .station            ← passageView / quoteView / boundaryView / turnStation
├─ .station__where     ← stationWhere()  (atlas.ts) — optional
└─ .station__support   ← figureSlot()    (figure.ts) — optional, only when filled
```

Because they were siblings of the panel, the layout could only ever stack them.

### 2.2 What secondary material actually exists

This is the finding that determined the design. The material available to fill a side column
is **sparse**, and the honest inventory is:

| stage | stops | stops with a place line | stops with a **filled** figure |
|---|---|---|---|
| ky-1 | 13 | 5 | 1 |
| ky-2 | 11 | 6 | 1 |
| ky-3 | 16 | 7 | 2 |
| ky-4 | 20 | 7 | **0** |
| ky-5 | 17 | 8 | 2 |

Two consequences:

- **Only 6 of the 77 body stops in the whole product have a documentary figure that is
  actually filled.** Stage 4 has none at all — every one of its figure positions is blocked.
- The place line is **one sentence**, and on more than half of stops it is not a place at all
  but the printed statement that the excerpt records none. Given a column of its own it would
  be a caption stranded in open space.

So "fill the right side" was never available as a solution, and the prompt's §4 is the
correct instruction: where there is no meaningful secondary material, **centre deliberately**.

### 2.3 Constraints the audit found, which the design had to honour

From the recorded decisions:

- `--son` (red) means exactly four things — turning point, current position, focus and
  primary action, the thread. No composition may take it as a structural signal.
- **No new navigation system.** Nav systems on a stage screen must stay at 1, chrome controls
  in the fold at 5. No in-body section index, no second stepper.
- Status labels on a stage: 4, all mandatory. Distinct type sizes on a stage: 6. **No
  hand-written `font-size`** outside two SVG diagrams.
- Motion budget 1–2 movements per screen, and **no animation after the entrance**.
- The turning point **must remain the loudest beat on the screen** — a protected regression.
- A supporting figure must not be the size of the stage anchor; that would turn a stage into
  a gallery. Images are never cropped, and the credit line is a licence condition.
- Word budget: the recorded method forbids making a budget look neutral by reclassifying
  prose as signage.

From the test suite, the load-bearing contracts:

- `.station__where` must stay a descendant of `.walk__panel` (`e2e/atlas.spec.ts:110`).
- `.walk__flow .station` must equal the stop count, and `data-station` must stay on the
  element carrying the `station` class (`e2e/guidance.spec.ts:188-189`) — so any wrapper must
  carry neither.
- `.gained` must contain zero controls (`e2e/keyboard-guess.spec.ts:49`).
- `.gained__item` must be **visible and filling in during the walk** — asserted at the
  entrance and immediately after crossing a turning point (`e2e/guidance.spec.ts:343`,
  `e2e/figures.spec.ts:634`). This is why the margin record was **not** moved to the boundary
  screen, which was the first design considered.
- One `h1` per route; no horizontal overflow at 1440/768/375; every visible button on the
  asserted routes ≥44px. (The assertion visits only two routes — see §9a, item 6, for the
  two controls that were outside its reach and were 42px.)

---

## 3. Reusable compositions implemented

A single wrapper now carries the composition, chosen from the material the stop actually has.
It is chosen in `compositionOf()` **from the stored data, never from the stage id** — there is
no `if (stage === 2)` anywhere in the change.

```
.walk__panel
└─ div.compose[data-comp]      ← new, carries neither `station` nor `data-station`
   ├─ .station
   ├─ .station__where          ← optional
   └─ .station__support        ← optional
```

| composition | chosen when | desktop behaviour (≥80rem) |
|---|---|---|
| `center` | passage or quotation with no filled figure | reading column **centred on the thread's axis**, with a 12rem margin beside it — always reserved, like a printed page's margin, and carrying the place line as a catalogue note on the stops where the excerpt prints one. A counterweight column opposite the margin keeps the reading column itself, not the group around it, on the axis (see §9a, item 1) |
| `split` | passage or quotation whose figure position is **genuinely filled** | reading `66ch` + a 15–26rem document column beside it, the pair centred |
| `turn` | any turning point | the widest composition, `76rem`, centred — wider than every other stop so the break still reads as a break |
| `boundary` | the stage's closing stop | `76rem`; the statements the excerpt does not make run **across** the spread, beside the margin record of what it did make clear |

Plus two end-of-stage treatments that are not stations:

| treatment | change |
|---|---|
| **reflection spread** (`.reflect`) | measure cap removed; now `76rem` centred. The two positions face each other across a `--space-2xl` gap at `--step-1`; the question moves from a left-ruled `--step-1` paragraph to a centred `--step-2` statement with a rule above it; the quieter material centres under it |
| **hand-off** (`.bridge`) | keeps its own narrow 54ch measure — it is a card about one destination, not a spread — but centres on the axis instead of dropping to the far inline start |

### 3.1 The shared axis

The thread (`.walk__track`), its caption and the pager (`.walk__controls`) were full-width
while the reading under them was 642px at the inline start, so the drawing of the stage and
the stage itself were two unrelated objects. They are now sized to the same `76rem` axis the
widest composition uses, and the pager centres on it. The thread is still the spanning
element — wider than every composition beneath it — but it is now the axis they hang from.

One implementation note worth keeping: this uses an explicit `inline-size`, **not**
`max-inline-size` with auto margins. Auto margins on a grid item drop it to fit-content, and
the thread's only child with a width is an SVG at `inline-size: 100%`, which contributes
nothing to an intrinsic measurement — the thread would then be sized by its own viewBox.

### 3.2 What was deliberately not changed

- **The reading measure.** `66ch` is a recorded decision and long lines are harder to read.
  No composition widens the prose. Measured line length is **32–63ch before and after**.
- **The margin record.** It is the stage's accumulating argument, it is explicitly sanctioned
  as right-column material, and three tests require it to fill in during the walk.
- **The stage entrance.** Not touched. `.walk__head` and its descendants are unmodified.

### 3.3 Stage-specific exceptions

**None.** Every rule keys on `data-comp` or on a station class. The only conditional is
`:has(> .station__where)`, which is content-aware, not stage-aware.

---

## 4. All-five-stage coverage

Enumerated from the running product by walking every stop of every stage:

| stage | stops | `center` | `split` | `turn` | `boundary` | place line | filled figure |
|---|---|---|---|---|---|---|---|
| ky-1 | 13 | 10 | 1 | 1 | 1 | 5 | 1 |
| ky-2 | 11 | 8 | 0 | 2 | 1 | 6 | 1 |
| ky-3 | 16 | 12 | 2 | 1 | 1 | 7 | 2 |
| ky-4 | 20 | 17 | 0 | 2 | 1 | 7 | 0 |
| ky-5 | 17 | 13 | 1 | 2 | 1 | 8 | 2 |
| **all** | **77** | **60** | **4** | **8** | **5** | **33** | **6** |

Observed sequences (this is the rhythm, and it differs per stage because the excerpt gave
each stage different material — not because any stage was special-cased):

```
ky-1  split  center ×8  turn  center ×2  boundary
ky-2  center ×7  turn  center  turn  boundary
ky-3  center  split  center  split  center ×6  turn  center ×4  boundary
ky-4  center ×3  turn  center ×11  turn  center ×3  boundary
ky-5  center ×4  turn  split  center ×6  turn  center ×4  boundary
```

**ky-2** — two turning points, so two spreads; its one filled figure sits under a turn.
**ky-3** — the stage with the most archival imagery; two image-led splits, and they do not
compete with the atlas because the atlas leaves the screen after the entrance.
**ky-4** — the stage the prompt flagged. It has **no filled figure anywhere**, so it never
produces a `split`; 17 of its 20 stops are `center`. All are symmetrically centred, which is
why a stage with no imagery no longer collapses to the left.
**ky-5** — three filled positions, one at the entrance (untouched), one on a turn, one on a
passage. The documentary images and the atlas do not compete: the atlas is entrance-only.

---

## 5. Before / after

Screenshots: `web/screenshots/rebalance/before/` and `web/screenshots/rebalance/after/`
(100 files each side, written by `web/tools/rebalance-shots.mjs`, which finds each state kind
by asking the running page rather than hard-coding stop numbers).

Note for whoever collects the dossier: `web/.gitignore` ignores `screenshots/`, so these files
exist on this machine but are **not** in version control, and no screenshot in this repository
ever has been. The tool is committed and regenerates either side on demand — `before` needs the
pre-change code (`git stash push -- src/` → `npm run build` → capture → `git stash pop`).

The set deliberately covers the states that were worst, not only the ones that improved most:

| required state | files |
|---|---|
| ordinary passage, no image | `s1..s5-passage-{1920,1440,768,390}` |
| turning point, both sides | `s1..s5-turn-{before,crossed}-{1920,1440}` |
| reflection | `s1..s5-reflect-{1920,1440}` |
| stage boundary | `s1..s5-boundary-{1920,1440,768,390}` |
| printed quotation | `s1,s3,s4,s5-quote-{1920,1440}` |
| state with a historical image | `s1,s2,s3,s5-figure-{1920,1440}` |
| continuous reading | `s3-flow-1920` |
| the locked entrance, as the record it did not change | `s2-entrance-{1920,1440,390}` |

**On the locked entrance.** The before set was regenerated from the original code (`git stash`
→ rebuild → capture → restore) so both sides are complete and comparable. Comparing the three
entrance captures by hash: **1440 and 390 are pixel-identical before and after.** 1920 differs,
and the reason is visible at the very bottom of the frame — the thread's caption now begins at
x=160 instead of x=24, because the thread and pager were re-axed. That is body apparatus, not
the entrance. No selector in the diff touches `.walk__head` or any of its descendants, and
`stagePage.ts`'s `stageHead()`, `.walk__portrait` and `stagePlate()` are untouched.

**On the blocked-figure state.** The set has no `*-blocked-*` file, and that is the correct
result rather than a gap: `supportFor()` returns `null` for an unfilled position, so a blocked
supporting figure renders **nothing at all** in the reading flow. There is no empty frame and
no orphaned label to photograph. A blocked *primary* position renders one ochre line at the
stage entrance, which is locked and unchanged (`figures.spec.ts:207-217` still asserts it).

### Measured result

| viewport | states | states with >35% dead band — before | after | dead band range before | after |
|---|---|---|---|---|---|
| 1920px | 85 | **69** | **0** | 32–45% | 7–23% |
| 1440px | 85 | 0 | 0 | 8–26% | 0–17% |
| 768px | 85 | 0 | 0 | 0–19% | 0–19% |
| 390px | 85 | 0 | 0 | 0% | 0% |

Worst single dead band at 1920px: **846px → 423px**, and the 423px is now split into two
equal margins around a centred block rather than sitting on one side.

By kind at 1920px:

| kind | n | before | after |
|---|---|---|---|
| passage | 53 | 45% | 10–23% |
| quotation | 11 | 45% | 16–23% |
| turning point (both sides) | 16 | 32% | 7% |
| boundary | 5 | 45% | 7% |

Every state at 1920px is now classified `centred` by the tool — meaning its two gutters are
within 10% of each other, which is the measurable difference between authored whitespace and
leftover space.

To keep the comparison honest, the *before* figures above were **re-measured on the original
code** with the final version of the tool (`git stash` → rebuild → measure → restore), so both
sides use an identical metric.

### What the numbers are not

This is a structural audit of the rendered layout. It is not evidence about learning,
engagement, retention or preference, and no such claim is made anywhere in this report. No
user testing has been carried out.

---

## 6. Image-present vs image-absent behaviour

| situation | behaviour |
|---|---|
| filled supporting figure on a passage or quotation | `split` — reading and document side by side, figure column 15–26rem, narrower than it was when stacked underneath (34rem) and still clearly unlike the entrance anchor |
| filled supporting figure on a **turning point** | the turn spread wins; the document sits beneath it at the spread's own width, because a figure beside the before/after pair would compete with the moment the stage exists for |
| **blocked** figure position | renders nothing in the body. No empty frame, no reserved aspect ratio, no image-shaped vacancy, and no column opened to hold an absence |
| no figure declared | `center`. This is the ordinary case — 60 of 77 stops |
| a whole stage with no imagery (ky-4) | 17 centred stops, 2 turn spreads, 1 boundary spread. The layout does not degrade |

No figure was added, removed, re-anchored, re-captioned or re-statused. `FIGURE_SLOTS`,
`FIGURES` and every `NEED VERIFICATION` / `NOT YET EVIDENCED` label are untouched.

---

## 7. Desktop / tablet / mobile

**1920 and 1440 (≥80rem).** The composition family is active. Content is centred on a 76rem
axis shared with the thread and the pager. At 1440 the track is narrower, so the same
compositions sit closer to full width — dead band 0–13%.

**768 (tablet).** Below 80rem the margin record stops being a column and stacks under the
reading; every composition is one column at the reading measure. The column contrast is not
maintained by squeezing two narrow text columns. The turn's before/after pair goes to two
columns at ≥60rem and stacks below that, which is pre-existing behaviour.

**390 (mobile).** A single intentional flow: heading → offers → thread → pager → the stop →
place line → figure where present → reflection → hand-off → the margin record. No horizontal
scrolling (`scrollWidth = clientWidth = 375`, checked by `tools/overflow-diag.mjs` and by
`e2e/app.spec.ts:62-68` across 11 routes × 3 viewports). No tiny side columns. No desktop
empty-space simulation.

---

## 8. Accessibility

- **DOM order is the reading order.** The composition wrapper preserves the existing sequence
  — station, then place line, then figure. Nothing is visually reordered against the DOM;
  the one grid placement that moves an element (`.station__where` into the left margin of a
  centred block) moves it to column 1 **of the same row**, and it already followed the station
  in the DOM, so a screen reader still reads the passage and then its place note.
- No new focusable element and no new landmark were introduced. The wrapper is a plain `div`.
- The 25-press Tab traverse on `/#/chang/ky-2` still passes, and the margin record still holds
  zero controls.
- 200% text zoom: `tools/ux-audit.mjs` reports **no overflow, no clipped text**.
- Contrast: all sampled text at or above the minimum, both themes.
- Reduced motion: no motion was added. The compositions are pure grid; with animation off
  every state renders identically. `e2e/app.spec.ts:558-562` still finds the reduced-motion
  transition on the first `.station`.
- Image `alt` behaviour, figure captions, credits and status chips are unchanged.
- One `h1` per route still holds on all 11 routes.

---

## 9. Files changed

| file | change |
|---|---|
| `web/src/components/stagePage.ts` | added `compositionOf()` and `composed()`; both render paths (guided traverse and continuous reading) now wrap a stop with its place line and figure in `.compose[data-comp]`. No change to what any station contains |
| `web/src/styles/experience.css` | the composition family; removed the blanket `.station` measure cap in favour of per-composition caps; widened `.station--turn` from 56rem to 76rem; reflection spread; boundary spread; bridge centring; thread/pager axis; `.station__support` keyed on composition instead of sibling adjacency |
| `web/tools/body-balance.mjs` | **new.** The structural audit: walks every stop of every stage at four widths and records canvas, track, painted content width, secondary width, dead band and mode |
| `web/tools/rebalance-shots.mjs` | **new.** The before/after record, with state kinds discovered from the running page |
| `docs/07_AI_Prompt_Log_StageBodyRebalance_2026-09-18.md` | **new.** Prompt Log entry; no previous log was modified |
| `docs/prompts/P-LAYOUT-01.txt` | **new.** The verbatim prompt |

No data file was touched. `stages.ts`, `figures.ts`, `places.ts`, `locators.ts`,
`interactions.ts`, `project.ts` and `source.ts` are unchanged — which is the mechanical
reason no academic claim, locator or status could have moved.

### 9.1 An unauthorised academic edit was made during this work, caught, and reverted

This has to be recorded rather than quietly cleaned up.

The repository was clean when this work began. While the architecture audit was running, an
edit appeared in two data files that **no part of this task asked for and that I did not
make**:

```
src/data/stages.ts   P3-6.text
src/data/places.ts   SN3-thanh-nien.title
-  Hội Việt Nam Thanh niên Cách mạng
+  Hội Việt Nam Cách mạng Thanh niên
```

It is a historically situated organisation name, and swapping the word order is exactly what
`AGENTS.md` §6 forbids ("Preserve historically situated organization names and terms"). The
record it sits on carries its own instruction against it: *"Tên tổ chức được giữ đúng như bản
in trong trích đoạn. Không thay bằng một biến thể tên gọi khác khi chưa đối chiếu bản gốc."*

**It was reverted with `git checkout --`**, and the printed form is restored — verified by
grep: 1 occurrence in `stages.ts`, 2 in `places.ts`. `git diff` is now exactly the two files
listed above, and `src/data/` is byte-identical to `HEAD`.

Two consequences worth stating plainly:

- Every test and audit figure reported in §10 was **re-run after the revert**, so no number in
  this report was measured against the altered text.
- This is the reason §10 is worth more than an assurance. The mechanical checks — the unchanged
  `git diff --stat` for `src/data/`, the unchanged word-budget and station-audit baselines —
  are what caught it, and they are the reason it could be caught at all.

A second file, `src/styles/atlas.css`, also showed as modified; it turned out to be a
line-ending rewrite with **byte-identical content under `git diff`**, and it was restored too.

---

## 9a. Adversarial verification pass, and what it changed

The manual check required by the prompt was run as a structured pass rather than a
spot-check: every stop of every stage was inspected at 1920 / 1440 / 768 / 390, on both
sides of each crossing, plus the reflection, the hand-off and continuous reading — and
**every reported defect was then independently re-opened by a second pass whose job was to
refute it**, with a default of "refuted unless reproduced". 20 findings survived.

That pass found four defects **this rebalance had introduced** and which the aggregate
measurement in §5 did not catch, because each was a defect the dead-band metric is blind to:

| # | what was wrong | fix |
|---|---|---|
| 1 | **The reading column alternated 120px between consecutive centre stops.** The 12rem margin was added by `:has(> .station__where)` only on stops where the excerpt prints a place, and because the group was centred, reserving it sometimes moved the prose by half its width. Measured across stages the left edge ran `L R R R L R L L`; in continuous reading that is a visibly ragged left edge down one document | the margin is now **reserved on every centre stop**, like a printed page's margin, with a counterweight column opposite it so the reading column itself — not the group around it — sits on the thread's axis. Measured after: **one** distinct left edge (447px) across all centre stops, prose centre 768 = thread centre 768 |
| 2 | **The split composition stranded the place line.** The figure spanned two grid rows, so grid shared its surplus height between them and dropped the place line 195–298px below the passage. On one ky-3 stop the orphaned line was the ochre "the excerpt prints no place here" — an evidentiary qualifier floating away from the passage it qualifies | a third row now absorbs the picture's surplus. Measured after: **32px**, the ordinary grid gap |
| 3 | **The figure caption ran wider than its picture in a turn spread.** Widening `.station__support` to 76rem left the frame at its 34rem cap but let the caption run the full 1216px — a first line of ~160 characters ending 501px past the edge of the picture it describes | the whole figure, not just the frame, is bound to the plate width. Measured after: caption **544px** = frame 544px |
| 4 | **The reflection's invitation button was 521px off the axis**, alone at the far left under a fully centred spread — a source-order collision, because the pre-existing `.reflect__invite { justify-self: start }` sits later in the file than the media query that centred it, and a media query adds no specificity | scoped through `.reflect` so it wins. Measured after: button centre 768 = question centre 768 |

It also found defects that **predate this pass**. Two were contained enough to fix here,
and both are noted as pre-existing in the code:

| # | what was wrong | fix |
|---|---|---|
| 5 | **Every turning point drew a stray floating line at 768 and 390.** `.turn__stem` hides itself with `stroke-dasharray: 132` — exactly its own path length — but also carries `vector-effect: non-scaling-stroke`, so the browser measures that dash in screen pixels. Below 52rem the head collapses to one column and the `preserveAspectRatio="none"` drawing stretched to 688px, rendering the stem 349px long while the dash covered only 132 of them. A detached ~130px rule was painted in mid-air **before** crossing, when nothing should be drawn at all, and again **after** crossing, breaking "one line continuing where two arrived" into two pieces | the drawing is capped at its own viewBox width below 52rem, so the horizontal scale stays 1 and the dash and the path agree. Measured after: SVG 260px, path 132, dash 132px, at both widths. It also un-squashes `.turn__meet` from a 24×8 ellipse back to a 9×8 circle |
| 6 | **`.station__more` / `.station__back` measured 42px**, the only two selectors in the stylesheets undercutting `--target-min`. The test that asserts the 44px floor visits `/#/chang/ky-2`, which has no split passage, so the two controls that broke it were never reached | the override was dropped so `.btn`'s own `var(--target-min)` applies. Measured after: **44px** |

The rest were refuted on reproduction — among them the uncrossed turning point's "empty
right half" (it is the far side's reserved arrival zone, and the crossed state lands exactly
in it), the 36px stop-marks (36×88px, well above the applicable target-size minimum, with
32–76px gaps), and several reported scroll positions that turned out to be artifacts of the
measuring harness rather than of the page.

## 10. Tests actually run

| check | command | result |
|---|---|---|
| Typecheck | `npm run typecheck` | pass |
| Lint | `npm run lint` | pass |
| Unit | `npm run test` | **116 passed** (2 files) |
| Build | `npm run build` | pass |
| End-to-end | `npm run e2e` | **228 passed** (desktop + tablet + mobile projects) |
| Offline bundle | `npm run build:offline` | pass — 3.70 MB, 42 fonts and 8 images inlined |
| Offline check | `npm run check:offline` | pass — 9 images checked, 27 fonts, **no network requests, no errors** |
| Contrast + 200% zoom | `node tools/ux-audit.mjs` | "all sampled text at or above the minimum"; "no overflow, no clipped text" |
| Density / nav / badge / type-size budget | `node tools/audit-density.mjs` | desktop stage: nav **1**, chrome controls **5**, badges **4**, type sizes **6** — all at the recorded budgets |
| Horizontal overflow | `node tools/overflow-diag.mjs` | `scrollWidth=375 client=375` |
| Word budget | `node tools/word-budget.mjs` | **141 / 109 / 138** — identical to the recorded baseline |
| Stop word count | `node tools/station-audit.mjs` | **28 of 85 states over 90 words** — identical to the recorded baseline |
| Horizontal balance | `node tools/body-balance.mjs` | table in §5 |

The word-budget and station-audit figures matching their recorded baselines exactly is the
evidence that no prose was reclassified as signage to flatter a number — the failure mode the
image-integration report records as "một chỗ suýt tự lừa mình".

No test was deleted, weakened or rewritten. No new brittle pixel assertion was added.

---

## 11. Remaining weaknesses, and one thing that needs a decision

### 11.1 Found, reproduced, and NOT fixed — needs a ruling

**On a phone and on a tablet, the first advance out of a stage entrance lands the reader on
a blank screen.** This is the most serious thing the verification pass found, it is fully
reproducible, and it is **pre-existing** — it is not caused by this rebalance.

What happens: the scroll is applied while `.walk__head` is still `data-mode="full"` (1423px
tall at 390, 2135px at 768). The head then collapses to compact, the document shrinks — 2733px
to 1486px at 390 — and the browser clamps the pending scroll to the new maximum, which is the
document bottom. Measured at 390 on ky-2: the reader lands at `scrollY 642` with the station
at `top −112`, the pager at `top −180`, and a viewport containing the masthead, the margin
record, an empty band and the footer — **no words of the passage they just asked for, and no
pager to go on or back**. It reproduces on all five stages at 360 / 390 / 414 and at 768; the
station is fully off-screen in 9 of 15 measured combinations and the pager is lost in all 15.
It is unavoidable rather than an over-scroll: at 390 the minimum scroll needed to bring "Tiếp"
into view is 909px while the post-collapse maximum is 642px.

It is left unfixed deliberately. The fix is a **scroll-anchoring behaviour change** — re-anchoring
the view when the head collapses — not a composition change, and the product currently makes a
deliberate choice *not* to scroll on stop change (the only two `scrollTo` calls in `src/` are on
route change and in the verification page). Changing that is a product-interaction decision,
and it is yours to make, not one to slip into a layout sprint. It also sits close to the locked
stage entrance. **Recommend treating it as the next task.**

### 11.2 Found, reproduced, out of scope for a layout pass

3. **The disabled pager button is indistinguishable from a live one, and still hovers.** At the
   last stop, "Tiếp" is `disabled` but computes byte-identical colours, opacity and `cursor:
   pointer` to its enabled state, and `:hover` still animates it. A moving false affordance.
   Pre-existing; it is a control-state question, not a layout one.

4. **ky-5 stop 2 prints the same sentence twice.** Two spatial nodes (`19-5-1941` and
   `22-12-1944`) share the anchor `P5-2`, and the renderer emits a constant sentence for an
   unplaced node that names nothing it belongs to, so the reader sees
   "Trích đoạn không in địa điểm cho mốc này." repeated verbatim. Six other two-item stops print
   two *distinct* lines, so this breaks a pattern the product sets six times over. Pre-existing.
   Fixing it means either changing data (§21 forbids it here) or changing `atlas.ts` to name the
   marker on the line. This rebalance moved the note into the margin, where it wraps to two
   lines, which makes the repeat more visible than it was.

5. **At 200% text zoom on a 390px screen the compact heading's first line is fully hidden**
   behind the sticky masthead — not dimmed, erased, at 0.88 alpha plus `blur(10px)`. The reader
   sees the orphan fragment "2-9-1969" under the masthead rule. Pre-existing, and in the locked
   entrance's compact bar.

### 11.3 Considered and deliberately left

6. **An uncrossed turning point has an empty right half inside its card.** Two independent
   verifiers reproduced the geometry and both refused to call it a defect: after crossing, the
   far side lands at 765.8–1330.3, which is *precisely* the space in question. It is the far
   side's reserved arrival zone, on the card's own tinted surface, with a reserved height that
   stops the layout jumping at the moment of the crossing. Centring the single state was
   rejected because it would move the text exactly when the reader acts.

7. **`center` is 60 of 77 stops.** The rhythm the prompt sketches — split, centre, turn,
   reverse split, reflection, boundary — is only as varied as the material allows, and the
   material is thin: 6 filled figures in the whole product. A more varied rhythm would require
   either more verified imagery (out of scope, and not obtainable by decision) or putting
   something in the side column that does not earn its place.

8. **No reverse split was implemented.** §17 allows one where it improves rhythm and source
   hierarchy. With 4 image-led splits in the entire product there is not enough of a pattern
   for a variation on it to read as anything but an inconsistency.

9. **At 1920px a bare centred passage still leaves 23% of the canvas on each side.** It is
   symmetric and deliberate, and the thread above it spans wider, but it is a wide page.

10. **Tablet (768px) is unchanged in structure** — one column, dead band 0–19%, exactly as
   before. The defect was a desktop one; 768px never had it. The prompt's suggestion of a
   55/45 tablet split was not taken, because at 768px a 45% secondary column would be ~330px
   and there is nothing to put in it on 70% of stops.

11. **Stage 4 remains the plainest stage**, because it is the only stage with no filled figure
   anywhere. Its 20 stops are carried by typography and centring alone. That is the honest
   rendering of what the excerpt and the figure register currently support.

12. **Line length is 32–63ch**, unchanged. The short end is short passages, not a narrow
   column. No change was made to the measure.

Nothing here is a claim about how a learner experiences the product. No user testing,
lecturer review or audience feedback has taken place, and none is recorded.

---

## 12. Status

Layout work: complete and validated as listed in §10.

Project status: unchanged —

`REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`
