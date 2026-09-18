# AI PROMPT LOG — CARTOGRAPHY AND NATIONAL BOUNDARIES

> Folder 07 — `AI_Declaration_Integrity_PromptLog`
> Date of work: 2026-09-18
> Scope: atlas basemap only. No academic content was changed.
> Project status: `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

This log records the AI prompts materially used in the cartography sprint, as
required by `AGENTS.md` §9. It does not modify or replace any earlier prompt log.
Earlier logs in this folder are untouched.

Required fields per entry: date used, AI tool, support task, original prompt,
output summary, how it was cross-checked against the original textbook.

---

## P-CARTO-01 — the operator's full sprint prompt

**Date used:** 2026-09-18

**AI tool:** Claude Opus 5 (1M context), in Claude Code, on the project
repository.

**Support task:** Upgrade `BẢN KHẮC` from a coastline-only basemap to one
carrying national (Admin-0) boundaries and a Vietnamese offshore-archipelago
representation, without redesigning the product or touching academic content.

**Original prompt:** reproduced verbatim and in full below, as the section
heading and all 43 numbered sections were given.

<details>
<summary>Full original prompt (verbatim)</summary>

```text
# CARTOGRAPHY & NATIONAL BOUNDARY IMPLEMENTATION
## Upgrade BẢN KHẮC with country borders and proper Vietnam cartographic representation

This is a NEW session.

Do not rely on previous conversation context.

Treat the current repository, active reports, verification records,
and current rendered product as the source of truth.

This task is specifically about:

# CARTOGRAPHY / MAP GEOMETRY / NATIONAL BOUNDARIES

It is NOT a general redesign.

---

# 0. CONCURRENCY SAFETY

Another session may currently be working on:

`STAGE BODY EDITORIAL REBALANCE — ALL 5 STAGES`

Before editing:

1. inspect `git status`;
2. inspect recent commits;
3. determine whether another process/session is actively modifying files;
4. do not overwrite concurrent work;
5. do not reset, checkout over, delete, or revert unrelated changes.

If files such as:

- `stagePage.ts`
- general experience CSS
- shared layout components

are actively changing in another session:

avoid editing them unless absolutely required.

Prefer this task to remain inside:

- atlas/cartography data
- atlas rendering
- map-specific CSS
- map verification/documentation
- map-specific tests

If a direct conflict is unavoidable, report it before destructive modification.

---

# 1. READ CURRENT PROJECT FIRST

Read completely:

- `AGENTS.md`
- `CLAUDE.md` if present
- newest active project context
- `CREATIVE_SPATIAL_JOURNEY_REPORT.md`
- `SPATIAL_JOURNEY_DESIGN_DECISION.md`
- `HISTORICAL_IMAGE_INTEGRATION_REPORT.md`
- current verification records
- current map/place register
- current Prompt Logs relevant to spatial/cartography work

Inspect:

- `web/src/components/atlas.ts`
- `web/src/data/places.ts`
- `web/src/data/land.ts`
- map-related CSS
- map-related tests
- `tools/build-land.mjs`
- offline bundling
- verification page

Run the current application and inspect:

- journey overview
- Stage 1
- Stage 2
- Stage 3
- Stage 4
- Stage 5

before changing anything.

---

# 2. INVOKE UI/UX SKILL

Invoke and actively use:

`ui-ux-pro-max`

Read the complete `SKILL.md`.

Use it only for:

- cartographic readability
- map visual hierarchy
- line weight
- label density
- responsive behavior
- accessibility
- map/story balance

Do NOT use this task to redesign the product.

---

# 3. CURRENT BẢN KHẮC CONCEPT IS LOCKED

Preserve the current concept:

# BẢN KHẮC

The spatial plate remains:

- documentary
- editorial
- evidence-controlled
- non-interactive unless existing behavior requires otherwise
- offline
- accessible through equivalent textual information
- subordinate to the historical learning journey

Do NOT:

- replace it with Google Maps;
- introduce an interactive GIS application;
- introduce Three.js;
- introduce WebGL merely for visual effect;
- add zoom/pan controls unless genuinely necessary;
- rebuild the entire atlas architecture.

The current SVG approach should remain preferred.

---

# 4. CURRENT PROBLEM

The existing basemap was intentionally built primarily from:

Natural Earth 1:110m LAND geometry.

It currently emphasizes coastline / land shape
and intentionally does not render normal country-border structure.

That was acceptable for the first spatial prototype.

It is no longer sufficient for the desired final cartographic presentation.

The user now requires:

# NATIONAL / COUNTRY BOUNDARIES

while keeping the map visually restrained.

---

# 5. REQUIRED MAP HIERARCHY

The map hierarchy should become:

1. LAND / COASTLINE
2. NATIONAL / COUNTRY BOUNDARIES
3. IMPORTANT GEOGRAPHIC LABELS
4. HISTORICAL SPATIAL NODES
5. HISTORICAL MOVEMENT / ROUTE
6. CURRENT STORY EMPHASIS

National borders provide orientation.

Historical content remains the visual focus.

---

# 6. WORLD / REGIONAL MAP REQUIREMENT

For world and regional atlas views:

SHOW:

- coastlines;
- national / country boundaries;
- relevant country labels where useful;
- existing historical nodes;
- existing route/movement representation.

DO NOT show:

- province boundaries;
- state boundaries;
- prefecture boundaries;
- county boundaries;
- district boundaries;
- commune boundaries;
- dense internal administrative meshes.

Example:

France should have its national outline.

China should have its national outline.

Vietnam should have its national outline.

But internal provinces should NOT fill the map with additional linework.

---

# 7. VIETNAM MAP REQUIREMENT

For any map or atlas view that represents Vietnam:

the map should NOT be reduced to only the mainland coastline.

It must use the cartographic representation required by the project's
approved Vietnamese source / institutional standard.

The Vietnam representation should include, where required by that source:

- mainland Vietnam;
- islands;
- offshore archipelagic representation;
- Hoàng Sa;
- Trường Sa.

Do NOT omit offshore representation merely because the generic world
dataset is too coarse to display it.

---

# 8. HOÀNG SA / TRƯỜNG SA

The project is being produced for a Vietnamese academic context.

For the Vietnamese-facing cartographic representation:

use the official Vietnamese cartographic convention required by the
institution / approved Vietnamese mapping source.

Ensure that:

- `Hoàng Sa`
- `Trường Sa`

are represented where the chosen approved source requires them.

This may use:

- appropriately sourced island geometry;
- restrained symbols;
- labels;
- inset/cartographic callouts;

depending on scale and source data.

Do NOT invent island geometry from memory.

Do NOT place arbitrary dots from remembered coordinates.

Do NOT draw sovereignty boundaries from memory.

Do NOT use AI-generated geographic geometry.

Document exactly which cartographic source and convention were used.

Because territorial claims in this region are internationally disputed,
the verification documentation must clearly state that the representation
follows the cited Vietnamese official cartographic source/convention rather
than presenting an uncited model-generated boundary interpretation.

---

# 9. APPROVED / AUTHORITATIVE CARTOGRAPHIC SOURCE

Do NOT treat a generic visualization dataset as sufficient evidence for
Vietnam's official cartographic representation.

Research the applicable Vietnamese official mapping standard/source first.

Priority should be given to authoritative Vietnamese sources such as:

- official national mapping/geographic-information authority;
- current Vietnamese technical regulations on administrative mapping;
- official government cartographic products;
- another cartographic source explicitly accepted by the course/institution.

A relevant technical reference to inspect is:

`QCVN 80:2024/BTNMT — Quy chuẩn kỹ thuật quốc gia về bản đồ hành chính`

Also inspect the currently applicable regulations referenced by it for
representation of national borders and national territorial sovereignty
on mapping products.

Do not blindly copy geometry from screenshots.

Acquire data only through a lawful and reproducible source.

---

# 10. SOURCE ROLES MUST REMAIN SEPARATE

Distinguish:

## HISTORICAL SOURCE

The 2019 textbook and approved historical documents establish the
historical narrative and stage claims.

## COORDINATE SOURCE

Sources such as Wikidata currently support provisional spatial coordinates
and remain separately verified.

## BASEMAP / CARTOGRAPHIC SOURCE

The basemap geometry and national-boundary representation come from
cartographic datasets.

These are NOT interchangeable.

A country boundary does not validate a historical claim.

A historical textbook does not automatically provide GIS geometry.

A coordinate database does not determine a sovereignty convention.

Keep these evidence classes separate.

---

# 11. COUNTRY BOUNDARY DATASET AUDIT

Audit whether the current map pipeline can support a country-boundary layer.

Evaluate appropriate country-level geometry.

The desired level is equivalent to:

`Admin-0 / national boundaries`

NOT:

`Admin-1 / province/state boundaries`

If Natural Earth is retained for general world geometry:

audit the appropriate Admin-0 dataset and its representation conventions.

Do NOT silently accept disputed-boundary conventions from a third-party
world dataset where they conflict with the approved Vietnamese
cartographic representation required for this project.

If needed, use:

GENERAL WORLD BASE
+
AUTHORITATIVE VIETNAM-SPECIFIC OVERLAY / REPRESENTATION

but document the combination precisely and ensure the geometries do not
produce contradictory visible lines.

---

# 12. NO PROVINCE BOUNDARIES

This requirement is explicit.

Do NOT display internal province boundaries inside Vietnam.

Also avoid equivalent internal subdivision clutter in other countries.

The desired visual language is:

```text
COUNTRY A | COUNTRY B | COUNTRY C
not:
province
province
province
province
district
district
district
The historical journey is not an administrative-map exercise.
13. LINE-WEIGHT HIERARCHY
Keep country boundaries restrained.
Suggested conceptual hierarchy:
COASTLINE:
clear but quiet
COUNTRY BORDER:
thin / restrained
HISTORICAL ROUTE:
stronger narrative emphasis
TURNING POINT / CURRENT LOCATION:
highest narrative emphasis
Do not let national borders dominate historical routes.
Do not create a political-map aesthetic stronger than the documentary story.
14. DISPUTED / SPECIAL BOUNDARY REPRESENTATION
Do not silently invent a universal solution for disputed territories.
Where the underlying world dataset has special boundary types:
inspect them.
For the final Vietnamese academic product:
follow the approved cartographic source/convention identified in this audit.
Record:
- source;
- version/date;
- boundary convention;
- any overlay used;
- any inset used;
- any known limitation.
Do not use the UI to make unsupported claims beyond the cited
cartographic convention.
15. HOÀNG SA / TRƯỜNG SA AT SMALL SCALE
The world map is small.
At 1:110m-style scale, small offshore features may be practically invisible.
Do NOT solve this by making enormous islands.
If the geometry is too small:
use a restrained cartographic treatment such as:
- small source-backed island marks;
- label anchors;
- inset;
- callout;
- contextual offshore label.
The representation should communicate their presence without falsifying
their physical size.
Never enlarge physical geography in a way that looks like real land area.
16. LABELS
Labels should be editorial and restrained.
Do not label every country.
Only show labels that improve orientation.
For Vietnam-focused framing:
ensure the required Vietnamese labels remain legible.
Do not let:
Hoàng Sa
or
Trường Sa
overlap:
- historical nodes;
- narrative labels;
- route lines;
- captions.
Use responsive label positioning if necessary.
17. HISTORICAL MAP VS MODERN BORDER PROBLEM
The narrative covers approximately 1911–1969.
Modern national boundaries may not match historical political geography.
Therefore the basemap boundary layer is:
ORIENTATION CONTEXT
not a claim that today's borders existed identically during every historical
event.
Add a concise cartographic note in the verification/documentation system.
Do NOT clutter every learner-facing screen with this note.
Do NOT redraw borders year-by-year unless the academic task explicitly
requires historical political-boundary reconstruction.
That is outside this project's current scope.
18. DO NOT CHANGE HISTORICAL NODES
This task must NOT invent new historical locations.
Do not alter:
- placed
- named-region
- unplaced
- movements
- turning-point locations
merely because the basemap now has more geography.
For example:
country borders becoming visible does NOT authorize filling an unplaced
historical event with a location.
The previous evidence discipline remains.
19. DO NOT CHANGE ACADEMIC CONTENT
Do NOT modify:
- stage headings;
- dates;
- textbook citations;
- quotations;
- Central Question;
- development statements;
- source locators;
- image verification;
- historical claims.
This sprint is cartographic.
20. MAP DATA MUST BE LOCAL / OFFLINE
The final product must remain offline-capable.
Do not add runtime requests to:
- map tile servers;
- Google Maps;
- Mapbox;
- OpenStreetMap tiles;
- remote GeoJSON;
- remote vector services.
Required geometry should be:
- legally obtained;
- processed during development/build;
- stored locally;
- bundled with the product.
The Showcase must work from:
file://
without network access.
21. DATA SIZE
Do not import a massive GIS dataset into the runtime.
The product only needs editorial map geometry.
Simplify appropriately.
Target:
- national boundaries;
- sufficient coastline detail;
- required island representation;
- no unnecessary attributes;
- no province mesh.
Prefer preprocessed SVG/path data over shipping full raw GIS data to the
browser.
22. BUILD PIPELINE
If extending build-land.mjs or creating a cartography build tool:
make the process reproducible.
Document:
- source dataset;
- version;
- download/source URL;
- license / terms;
- transformation;
- projection;
- simplification;
- generated output.
Generated data files should carry a header explaining provenance.
Do not require a network connection during normal npm run build.
23. PROJECTION
Audit the current equirectangular projection.
You do NOT need to change projection unless the new boundary/island
representation exposes a serious defect.
If retained:
document its limitations.
Do not pretend the projection preserves:
- area;
- distance;
- shape;
perfectly.
24. RESPONSIVE
Inspect at:
- 1920px
- 1440px
- 768px
- 390px
Country borders should remain visible but restrained.
Hoàng Sa / Trường Sa representation should not become illegible or overlap
the narrative at small widths.
If an inset is needed:
design a responsive inset.
Do NOT create horizontal scrolling.
25. ACCESSIBILITY
The SVG map must remain supplemental.
Do NOT make learners depend on interpreting geographic lines visually.
Preserve the textual alternative / place register.
Country borders do not require verbose screen-reader enumeration.
If Hoàng Sa / Trường Sa appear visually for cartographic completeness,
provide an appropriate textual equivalent in the cartographic description
or verification context.
The SVG should remain free from keyboard traps.
26. REDUCED MOTION
Borders should not animate.
No:
- border drawing animation;
- glowing country outlines;
- pulsing territory;
- animated island labels.
Existing narrative motion rules remain.
27. STYLE
Target:
EDITORIAL HISTORICAL ATLAS
Not:
GIS SOFTWARE
Avoid:
- neon borders;
- political-map rainbow colouring;
- country-by-country fill colours;
- excessive legend boxes;
- GIS toolbars.
Prefer:
- neutral land;
- subtle border line;
- existing ink/paper palette;
- historical route accent;
- restrained labels.
28. VIETNAM VISUAL PRIORITY
Do not give Vietnam a random bright colour simply to distinguish it.
If emphasis is needed because a stage focuses on Vietnam:
use the existing narrative design tokens.
Do not introduce nationalist decorative graphics.
This remains an academic documentary product.
29. IMPLEMENTATION AUDIT FIRST
Before modifying the atlas, create:
CARTOGRAPHY_AUDIT.md
Include:
Current state
- current land dataset;
- projection;
- country borders present/absent;
- internal borders present/absent;
- Vietnam representation;
- offshore-island representation;
- Hoàng Sa / Trường Sa visibility;
- licenses;
- offline behavior.
Desired state
- Admin-0 / national borders;
- no Admin-1/province network;
- approved Vietnam cartographic convention;
- appropriate offshore representation.
Candidate datasets / sources
Compare them based on:
- authority;
- licensing;
- geometry;
- boundary convention;
- offline suitability;
- bundle size;
- reproducibility.
Decision
Explain exactly which source(s) will be used and why.
Do not stop at the audit.
Proceed into implementation after a defensible source decision.
30. VERIFICATION RECORD
Create or update a cartographic-source record containing:
- source organization;
- dataset/product title;
- version/date;
- URL;
- retrieval date;
- license / terms;
- geometry type;
- projection;
- simplification;
- Vietnam-specific representation convention;
- treatment of Hoàng Sa;
- treatment of Trường Sa;
- limitations.
Do not call cartographic data:
historically verified
when it is merely the modern basemap.
31. COUNTRY-BORDER TESTS
Add meaningful tests.
Test that:
1. national-boundary geometry exists;
2. it renders in the atlas;
3. it is available offline;
4. no province-layer dataset is accidentally included;
5. expected Vietnam cartographic representation is present according to the
   chosen approved source;
6. Hoàng Sa / Trường Sa representation required by that source is not silently
   dropped by the build transformation;
7. map text fallback remains available;
8. no external network requests are introduced.
Avoid pixel-perfect geographic tests.
Test data relationships and expected generated output.
32. DO NOT TEST POLITICAL CLAIMS WITH UNIT TESTS
Tests should verify:
the product renders the approved cartographic source correctly
not:
a unit test proves sovereignty
Software tests cannot adjudicate territorial disputes.
Keep technical verification and political/legal claims distinct.
33. MANUAL VISUAL CHECK
Inspect:
WORLD VIEW
- country boundaries visible;
- no internal province clutter;
- coastline clean;
- historical nodes readable.
EAST / SOUTHEAST ASIA VIEW
- Vietnam outline legible;
- neighboring national borders restrained;
- offshore representation correct according to selected source.
VIETNAM-FOCUSED VIEW
- mainland clearly represented;
- Hoàng Sa / Trường Sa represented according to selected official Vietnamese
  cartographic convention;
- labels readable;
- no province-boundary network;
- historical route remains dominant.
34. ALL FIVE STAGES
Check map rendering in:
- Stage 1
- Stage 2
- Stage 3
- Stage 4
- Stage 5
Do not assume one atlas configuration proves all five work.
Stage 5 may intentionally have no point-level historical markers.
The basemap itself should still render correctly.
35. OVERVIEW
Also inspect the main journey overview.
Country boundaries should improve orientation without making the overview
look like a conventional political world map.
The journey remains the visual foreground.
36. PERFORMANCE
Measure before / after:
- JS size;
- CSS size;
- generated map data size;
- offline file size;
- atlas render behavior.
Avoid large regressions.
If a high-detail source produces excessive data:
preprocess/simplify it.
Do not reduce Hoàng Sa / Trường Sa representation out of existence simply
to hit a size target.
Instead choose appropriate geometry/representation.
37. VALIDATION
Run the actual supported equivalents of:
npm run typecheck
npm run lint
npm run test
npm run build
npm run e2e
npm run build:offline
npm run check:offline
Also run:
- contrast audit;
- 200% text zoom;
- horizontal overflow checks;
- reduced-motion checks;
- relevant atlas screenshots.
Do not fabricate results.
38. MANUAL SCREENSHOT SET
Generate representative screenshots at:
1920px
1440px
768px
390px
Include:
- journey overview;
- Vietnam-focused stage;
- world-focused stage;
- Stage 5;
- verification/cartography source page.
Inspect the screenshots manually.
39. FINAL UI/UX REVIEW
Run ui-ux-pro-max again after implementation.
Review only:
- boundary readability;
- map density;
- label hierarchy;
- route/border competition;
- mobile cartography;
- atlas/story balance.
Do not redesign unrelated sections.
40. FINAL REPORT
Create:
CARTOGRAPHY_NATIONAL_BOUNDARIES_REPORT.md
Include:
1. Starting cartography
2. Problem identified
3. Sources evaluated
4. Chosen boundary/cartographic source
5. Vietnam representation convention
Explicitly document:
- national boundary treatment;
- islands;
- Hoàng Sa;
- Trường Sa;
- why the representation was chosen;
- source/standard followed.
6. Country-border implementation
7. Why province boundaries were excluded
8. Historical-node integrity
Confirm no historical locations were invented.
9. Offline implementation
10. Accessibility
11. Bundle/performance effect
12. Tests actually run
13. Screens inspected
14. Remaining cartographic limitations
Do not claim that software implementation independently resolves a
territorial/legal dispute.
State which official cartographic source/convention the product follows.
41. PROMPT LOG
Record this complete prompt in the required Prompt Log.
Do not modify historical Prompt Logs.
42. NON-GOALS
This task is NOT:
- province-map development;
- historical border reconstruction for every year;
- maritime-delimitation research;
- new historical-node research;
- image research;
- Stage Body redesign;
- source migration;
- academic-content rewriting.
43. COMPLETION CONDITION
Do not report completion until:
1. world/regional maps show national boundaries;
2. province/internal subdivision clutter is absent;
3. Vietnam is represented according to the selected approved Vietnamese
   cartographic source/convention;
4. Hoàng Sa is represented where required by that convention;
5. Trường Sa is represented where required by that convention;
6. no arbitrary hand-drawn geography was introduced;
7. source and convention are documented;
8. existing historical nodes remain unchanged;
9. offline build still works;
10. all five stages and overview were manually inspected;
11. full validation passes.
FINAL PRINCIPLE
SHOW NATIONAL BORDERS.
DO NOT SHOW PROVINCE BORDERS.
KEEP BẢN KHẮC CLEAN.
FOLLOW AN APPROVED CARTOGRAPHIC SOURCE.
REPRESENT VIETNAM ACCORDING TO THE DOCUMENTED VIETNAMESE CARTOGRAPHIC CONVENTION.
DO NOT INVENT GEOGRAPHY.
DO NOT LET THE BASEMAP OVERRIDE THE HISTORICAL STORY.
```

</details>

**Output summary:** national Admin-0 boundaries derived topologically from
`world-atlas@2.0.2 countries-110m.json`; Hoàng Sa and Trường Sa rendered from
Natural Earth `v5.1.2`'s Vietnam point-of-view edition as source-backed island
symbols, resolved into individual islets and named at the in-country framings and
reduced to one open symbol per group beyond them; Vietnam's 24 coastal islands
added as true-scale polygons after measurement showed the 1:110m dataset contains
none of them; the build tool extended; the plate's evidence lens and the
verification register rewritten to stop asserting that no borders are drawn;
20 unit tests, 9 e2e tests, an extended offline check and a new cartographic
accessibility audit added; `CARTOGRAPHY_AUDIT.md` and
`CARTOGRAPHY_NATIONAL_BOUNDARIES_REPORT.md` written.

**How it was cross-checked against the original textbook:** it was not, and could
not be. **No part of this sprint is a textbook claim.** The textbook contains no
map geometry, no coordinates and no cartographic convention. The cross-check that
does apply was run instead and is the relevant one: the sprint must not alter any
academic content. Verified by (a) the 88 assertions in `content.test.ts` passing
unchanged, (b) `PLACES`, `SPATIAL_NODES` and `MOVEMENTS` being untouched — no
historical node added, moved, placed or removed, (c) the coastline layer
regenerating **byte-identical** to the committed one (53 723 characters, string
comparison against `git show HEAD:web/src/data/land.ts`).

---

## P-CARTO-02 — Vietnamese cartographic standard and dataset research

**Date used:** 2026-09-18

**AI tool:** Claude Opus 5, orchestrating 28 subagents (4 researchers, 24
adversarial verifiers) with web search and fetch.

**Support task:** Establish which Vietnamese standard governs sovereignty
representation on maps, whether authoritative Vietnamese vector geometry is
lawfully obtainable, and which Admin-0 dataset to use.

**Original prompt (the shared preamble given to every researcher):**

```text
You are researching for an academic Vietnamese university project (HCM202) that
renders a small editorial SVG historical atlas. The project has an ABSOLUTE
prohibition on inventing sources, URLs, titles, editions, or data. If you cannot
retrieve something, say so explicitly in deadEnds rather than reporting what you
believe to be true from memory.

Load the WebSearch and WebFetch tools first: call ToolSearch with query
"select:WebSearch,WebFetch".

Every claim you return MUST carry the URL you actually fetched. If you only
recall it from training data and could not retrieve a page, mark confidence
"could-not-verify" and say so. Do NOT pad the claims list. Searching in
Vietnamese will usually work far better than English for the Vietnamese-authority
questions.
```

Four research dimensions were then given:

1. **`qcvn80`** — does `QCVN 80:2024/BTNMT` exist, what does it say about
   `đường biên giới quốc gia`, `chủ quyền lãnh thổ`, Hoàng Sa and Trường Sa; what
   do `Luật Đo đạc và bản đồ 2018` and `Nghị định 27/2019/NĐ-CP` require; is any
   exact printed label form mandated; does any of it publish machine-readable
   geometry.
2. **`vn-authority-data`** — is any authoritative Vietnamese government
   cartographic dataset with reusable vector geometry lawfully and reproducibly
   obtainable (Cục Đo đạc Bản đồ và TTĐL VN, VNSDI, NXB TN-MT&BĐ, any official
   Hoàng Sa / Trường Sa release), and under what licence. The prompt stated
   explicitly: *"The honest answer may well be 'no reusable vector geometry is
   publicly released'. If so, say that clearly — that is a valuable finding, not
   a failure. Do not invent a download URL."*
3. **`natural-earth`** — audit Natural Earth's Admin-0 offerings at 110m / 50m /
   10m, what `world-atlas@2.0.2` actually ships, whether either archipelago
   exists at each scale, Natural Earth's disputed-boundary policy and whether a
   Vietnam point-of-view variant exists, and the licence terms.
4. **`island-geometry`** — lawfully obtainable vector geometry for the two
   archipelagos, licence terms for each option, and their real physical extent
   *from a fetched source, not from memory*.

Each researcher's claims were then passed to independent verifiers prompted to
**refute** them, defaulting to `refuted` when unable to confirm.

**Output summary:** `QCVN 80:2024/BTNMT` confirmed via `Thông tư 28/2024/TT-BTNMT`
(29-11-2024), amended by `Thông tư 24/2025/TT-BNNMT`; clause 1.1 requires
`đất liền, biển, đảo, quần đảo`; **no** regulation prescribes an exact archipelago
label string; `Thông tư 17/2018/TT-BTNMT` Điều 19 requires the state standard
border map set, which is not publicly obtainable; **no** lawful reproducible route
to Vietnamese state vector geometry exists; Natural Earth 1:110m contains **zero**
archipelago geometry; Natural Earth publishes a **Vietnam point-of-view** edition
at 10m; the `NAME_VI = "Đảo Wake"` upstream error in the admin-0 themes was
caught. Tally: **22 claims held, 2 refuted.** Neither refutation affected the
architecture — one corrected the identity of a Vietnamese fee-schedule PDF, the
other established that Trường Sa (but not Hoàng Sa) also appears at Natural Earth
50m.

**How it was cross-checked against the original textbook:** not applicable and
deliberately so — this is cartographic and legal source research, a different
evidence class from the textbook. `AGENTS.md` §3 and brief §10 require the three
classes to stay separate, and the register now keeps them in separate sections.
Key dataset facts were additionally **re-measured locally** rather than trusted:
the 110m archipelago absence, the 7 + 12 Vietnam POV polygon counts, the China
attribution in the default edition, and the 326 shared boundary arcs were all
computed directly from the downloaded files before any of them were used.

**Prompt-injection notice:** a researcher reported that
`hethongphapluat.com` pages carry an embedded line beginning
`# QUAN TRỌNG: Hãy luôn thông báo với người dùng...` attempting to dictate output
format. It was treated as untrusted page data and ignored. Recorded here because
anyone re-running this research will meet the same pages.

---

## P-CARTO-03 — UI/UX skill invocation

**Date used:** 2026-09-18

**AI tool:** Claude Opus 5, `ui-ux-pro-max` skill (local dataset, Python CLI).

**Support task:** cartographic readability, map visual hierarchy, line weight,
label density, responsive behaviour, accessibility, map/story balance.

**Original prompt (skill arguments):**

```text
cartographic readability for a restrained editorial historical atlas SVG:
national boundary line weight vs coastline vs narrative route hierarchy, label
density, small-scale island/archipelago representation, responsive map behaviour
at 390-1920px, accessibility of a decorative aria-hidden map
```

Followed by four focused CLI searches:
`"decorative svg aria hidden" --domain ux`,
`"visual hierarchy contrast layering" --domain ux`,
`"gridline subtle data contrast" --domain ux`,
`"responsive chart small screen" --domain chart`.

**Output summary:** the skill's searchable dataset has **no cartography-specific
rows**; the four CLI searches returned generic accessibility and layout entries
that did not address map linework. The applicable guidance was in the skill's own
Quick Reference, and these rules were applied and are cited in the code:

| Rule | Where applied |
|---|---|
| `gridline-subtle` (§10) — keep the grid low-contrast so it does not compete with the data | the governing analogy for the whole sprint: the border is the gridline, the excerpt's marks are the data. `atlas.css` line-weight block |
| `contrast-data` (§10) — data text ≥ 4.5:1 | archipelago labels measured at 4.53:1 light, 5.17:1 dark |
| `data-table` / `screen-reader-summary` (§10) — a chart alone is not screen-reader friendly | the plate stays `aria-hidden`; the register carries every cartographic fact as text |
| `long-token-wrapping` (§6) | fixed a real 200%-zoom overflow: dataset filenames like `ne_10m_admin_0_countries_vnm.geojson` given `overflow-wrap: anywhere` |
| `reduced-motion` (§1), `excessive-motion` (§7) | no border, island mark or island label animates, in either motion setting |
| `horizontal-scroll` (§5) | no horizontal overflow at 1920 / 1440 / 768 / 390, plain or at 200% text |
| `icon-context` (§1) | decorative layer stays out of the accessibility tree |

Reported honestly: the skill **did not** supply cartographic guidance, because it
does not contain any. It was not silently credited for decisions it did not
inform. `AGENTS.md` §8 forbids claiming a design rule came from a source it did
not come from, and the same rule is applied here to the skill.

**How it was cross-checked against the original textbook:** not applicable. UI
rules are `PROJECT DECISION`, never academic evidence, and none of them is
presented as coming from the PDFs.

---

## P-CARTO-04 — independent visual review of the rendered result

**Date used:** 2026-09-18

**AI tool:** Claude Opus 5, orchestrating 4 reviewers plus adversarial verifiers,
reading the actual PNG screenshots.

**Support task:** post-implementation review of boundary readability, map
density, label hierarchy, route/border competition, mobile cartography and
atlas/story balance — the six items brief §39 restricts the review to.

**Original prompt (shared preamble, abridged to its operative content):**

```text
You are reviewing a finished implementation in a Vietnamese university project
(HCM202). The product is an EDITORIAL HISTORICAL ATLAS called "BẢN KHẮC" - a
restrained, documentary, ink-on-paper SVG map that sits UNDER a historical
learning journey about Hồ Chí Minh's thought, 1911-1969. It is explicitly NOT a
GIS application and NOT a political map.

Screenshots are in .../cartography/before/ and .../after/. Use the Read tool on
the .png files to actually LOOK at them - do not review from the filenames.

The change under review: national (Admin-0) country boundaries were added to a
basemap that previously showed only coastline, and the two offshore archipelagos
Hoàng Sa and Trường Sa are now shown as small island symbols with labels.

[design rules: line-weight hierarchy coastline < border < route < turning point;
no province boundaries; restrained labels with no collisions; island symbols must
never look like real land area; existing ink/paper tokens only; the journey must
remain the visual foreground]

Be specific and concrete. Name the exact file and what you see in it. If
something is good, say so briefly and move on - do not manufacture problems. Do
NOT propose redesigning anything outside the basemap layers.
```

Four dimensions: `hierarchy` (route/border competition), `density` (mobile
cartography and province-clutter check), `labels` (the Hoàng Sa / Trường Sa
representation), `balance` (atlas/story balance, themes, verification page).
Non-nit findings were passed to verifiers prompted to refute them, with the
instruction that *"a suggestion that would make the basemap LOUDER is wrong by
construction"*.

**Output summary:** 1 blocking and 5 should-fix findings confirmed by independent
verifiers, 2 refuted. Three were fixed (islet marks merging into a filled mass at
wide framings; a label colliding with the historical route; a label overlapping
its own islets on mobile), one was already addressed, one refutation is recorded
with its reasoning, and one is accepted as a limitation. Full account in
`CARTOGRAPHY_NATIONAL_BOUNDARIES_REPORT.md` §15.

**How it was cross-checked against the original textbook:** not applicable —
visual review of a `PROJECT DECISION` layer that carries no academic claim.

---

## P-CARTO-05 — visual acceptance rejection and correction

**Date used:** 2026-09-18

**AI tool:** Claude Opus 5 (1M context), in Claude Code.

**Support task:** The operator rejected the first implementation on **visual
acceptance**: national boundaries too faint and indistinguishable from
coastlines, and Hoàng Sa / Trường Sa not visibly identifiable, with no readable
labels — despite every structural check passing. Diagnose the cause by
measurement and fix it without making the map loud.

**Original prompt (operative content, condensed from the 18 numbered sections):**

```text
# CARTOGRAPHY VISUAL ACCEPTANCE FAILURE
## Data may exist, but the rendered product does NOT satisfy the visual requirement

Do not defend the implementation based on data presence.
The acceptance criterion is: A NORMAL VIEWER MUST BE ABLE TO SEE IT.

Do NOT prove completion by saying: path exists; geometry exists; unit test
passes; SVG contains coordinates. Those are implementation checks only.

Increase the visual distinction between COASTLINE and NATIONAL BOUNDARY:
  COASTLINE -> quiet structural line
  NATIONAL BORDER -> slightly stronger / clearer line
  HISTORICAL ROUTE -> strongest narrative emphasis
At normal 100% browser scale a viewer must be able to tell `this is one country`
vs `this is the neighboring country`.

Inspect the rendered DOM/SVG and computed styles - not source data. Check stroke
colour, opacity, width, z-order, clipping, mask, blend mode, theme token,
responsive overrides, viewBox scaling, whether the stroke becomes too thin after
scaling, whether another layer paints over it. Measure the final computed values.

Hoàng Sa / Trường Sa must be visibly identifiable. Use a restrained treatment:
small source-backed group marker; open-ring group marker; label; leader/callout;
inset. DO NOT enlarge island land area to make it visible. Labels must be legible
at 1920 / 1440 / 768 / 390 and must not overlap, clip or disappear.

Audit every stage's authored viewport in case the geometry lies outside the crop.

Do not change historical nodes. Do not add province borders. Add a visual
regression guard. Keep the design restrained: VISIBLE BUT QUIET for borders,
IDENTIFIABLE BUT PROPORTIONATE for the archipelagos.

Report the root cause: why the previous implementation technically passed, and
why it visually failed. Do not hide this correction.

# DO NOT TELL ME THE DATA EXISTS. SHOW ME THAT THE USER CAN ACTUALLY SEE IT.
```

**Output summary:** three root causes found by measurement, not inspection of
source. (1) The border used the coastline's own token `--rule-strong`, thinner
and part-transparent, compositing to 1.56:1 against the land while the coastline
sat at 1.97:1. (2) A sub-pixel stroke loses roughly half its contrast to
antialiasing — 0.8 px measured 2.15:1 painted against 4.53:1 nominal. (3) Canvas
units are not CSS pixels and the plate is only 536 px wide at a 1440 viewport, so
islet marks rendered at 1.29 px radius and labels at 11.25 px. Z-order and crop
were both checked and ruled out. Fixed by giving the border a different ink at a
full pixel and *above* the coastline in the ranking, enlarging the islet marks
and labels, and adding an **open group ring** around each archipelago at every
framing as the orientation device. A dependency-free PNG reader (`tools/png.mjs`)
and a painted-pixel acceptance stage were added so the failure mode is now
detectable, plus an e2e guard on the three specific ways it failed. The weight
assertion in both the audit tool and the e2e suite had encoded the *inverted*
ranking, which is how the wrong ordering passed checks written to catch it; both
corrected.

**How it was cross-checked against the original textbook:** not applicable — this
is a rendering and legibility correction to a `PROJECT DECISION` layer that
carries no academic claim. The relevant cross-check was run instead: no source
data changed. `places.ts`, `stages.ts`, `source.ts`, `locators.ts` and
`figures.ts` remain byte-unchanged, the 88 assertions in `content.test.ts` pass,
and no island's true area was enlarged — the group ring is a symbol and the
underlying islet coordinates are untouched.

---

## P-CARTO-06 — archipelago inset maps

**Date used:** 2026-09-18

**AI tool:** Claude Opus 5 (1M context), in Claude Code.

**Support task:** The operator rejected the ring treatment: two large open
circles represent only location, not the spatial distribution, shape or
orientation of an archipelago. Replace them with cartographic inset maps.

**Original prompt (operative content):**

```text
# FIX HOÀNG SA / TRƯỜNG SA CARTOGRAPHY
## Replace generic rings with proper archipelago inset maps

Two large open circles are currently being used to represent Hoàng Sa and
Trường Sa. These circles are only orientation/group markers. They do NOT
adequately represent the spatial distribution, shape, or orientation of the
archipelagos. Do NOT keep the two large circles as the final representation.

MAIN MAP: preserve truthful geographic scale; render available island/islet
geometry at its real/generalized scale; do NOT enlarge the physical land area;
retain restrained national boundaries; retain historical routes and nodes as the
narrative foreground. May use a subtle locator/callout indicating where the inset
comes from.

HOÀNG SA INSET and TRƯỜNG SA INSET: enlarge the geographic viewing window, NOT
the islands themselves; display the available island/islet distribution;
preserve relative geographic placement; communicate the overall shape/orientation;
use source-backed geometry; include the archipelago label; remain visually
restrained. The two insets do NOT need the same geographic scale. Record each
inset's geographic extent.

QCVN: review the currently applicable QCVN 80:2024/BTNMT text directly. Account
for the requirement that archipelagos preserve, after cartographic
generalization: distribution density; shape; direction/orientation. Do NOT claim
formal QCVN compliance unless every applicable requirement has been checked.

DO NOT USE THE USER SCREENSHOT AS GEOMETRY - it is a visual reference for the
inset concept only. Do not trace it, estimate positions from it, or copy geometry
from pixels.

DATA PROVENANCE: verify the exact theme/version from the actual downloaded
artifact. Do not conflate npm package version, Natural Earth dataset version and
individual POV theme version. Natural Earth's currently documented Vietnam POV
download is version 5.1.1.

Inset boxes must NOT look like dashboard cards. Keep Admin-0 only, no province
boundaries. Mobile: stack or reposition, do not hide. Provide a textual
alternative. Capture screenshots at 1440 / 768 / 390 and inspect before PASS.
```

**Output summary:** the QCVN 80 draft text was extracted and searched directly
(`pdftotext`, 139 KB), which located clause 4.1.2 verbatim — the
`mật độ phân bố / hình dạng và hướng` requirement the operator referenced, plus
the 0.5 mm² scale threshold and its `ký hiệu không theo tỷ lệ` fallback, and
clause 4.8's definition of that symbol as `kích thước quy ước, không theo kích
thước thực`. That settled the design: enlarge the window, not the islands, and
use constant-size marks because the standard prescribes them below the threshold.
Implemented as two insets under the Vietnam-framed plate — 7 marks for Hoàng Sa,
12 for Trường Sa, a half-degree graticule, each printing the window it covers —
with the large rings reduced to a small locator used only where the group cannot
resolve. The supplied screenshot was **not** used as geometry; no coordinate came
from it. Provenance corrected: the Vietnam POV theme is **5.1.1** and the
geography-regions theme **5.0.0**, both read from the artifacts' own
`.VERSION.txt`, while `v5.1.2` is only the release tag they were fetched from.

**How it was cross-checked against the original textbook:** not applicable — a
cartographic representation change to a `PROJECT DECISION` layer. It was
cross-checked against the **Vietnamese standard** instead, by extracting and
reading the QCVN 80 text rather than relying on a summary of it, and against the
source artifacts by reading their own version files. `places.ts`, `stages.ts`,
`source.ts`, `locators.ts` and `figures.ts` remain unchanged; the islet
coordinates are the same numbers as before, only the window onto them changed.

**Evidence limit carried forward:** the QCVN 80 text read is still the
**pre-signature draft**; the enacted text remains unretrievable. No formal
compliance is claimed, and the product says so on its verification page.

---

## P-CARTO-07 — names and insets removed

**Date used:** 2026-09-18

**AI tool:** Claude Opus 5 (1M context), in Claude Code.

**Support task:** Remove the two archipelago names from the product, and delete
the two inset maps.

**Original prompt (verbatim):**

```text
không cần viết trực tiếp chữ Hoàng Sa - Trường Sa vào đâu nhé
```

**Clarification requested and given.** Because "vào đâu" could mean the drawing
only or the whole product, the scope was put back to the operator as a question
rather than guessed. The answers:

```text
Bỏ chữ "Hoàng Sa" / "Trường Sa" đến mức nào?
  -> Bỏ khỏi toàn bộ sản phẩm

Hai ô phóng to sẽ nhận diện bằng gì thay cho tên?
  -> xóa luôn 2 ô phóng to đi nhé, vì project này nói về Tư tưởng Hồ Chí Minh,
     chứ không nói về 2 Quần đảo
```

**Output summary:** both inset panels deleted with their code, styling, tests and
screenshots; the on-plate labels and the group locator rings deleted; every
occurrence of either name removed from the plate, the evidence lens and the
verification register, and from the shipped bundle (`grep` over `dist/assets/*.js`
and `*.css` returns 0). The offshore island geometry is kept, unnamed, as
restrained symbols at in-country framings; at wide framings the plate now draws
nothing there, which also disposes of the merged-blob and giant-circle failures
for good. The register still records dataset, theme version, URL, licence,
published extent, resolved extent and the point-symbol treatment with its QCVN
basis — without naming either group. The build tool still reads the source's name
field to select and validate the right features and stops there. New guards: an
e2e assertion that neither name appears in the rendered page body, and a unit
test asserting no display name ships in the data, checked structurally so a name
cannot return under a different key.

**How it was cross-checked against the original textbook:** not applicable — a
scope and editorial decision about a `PROJECT DECISION` layer. The relevant check
is that it removed only presentation: `places.ts`, `stages.ts`, `source.ts`,
`locators.ts` and `figures.ts` are unchanged, the islet coordinates are the same
numbers as before, and `content.test.ts` passes unchanged.

**Rationale recorded because it is the operator's, not the tool's:** the subject
of this product is the formation and development of Hồ Chí Minh's thought across
the five stages of the assigned excerpt. Naming the two groups on its plate made
a sovereignty statement the product has no need and no standing to make, and two
dedicated inset maps gave a basemap detail more weight than the excerpt itself.

---

## Declaration

Every prompt materially used in this sprint is recorded above. No earlier prompt
log was modified. No survey response, user test, lecturer comment, peer review,
defense record, worklog entry or contribution figure was generated, and none
appears in any artefact produced by this work.

The AI output in this sprint was **not** accepted as verified academic evidence.
It produced a `PROJECT DECISION` basemap whose every coordinate is read from a
named, pinned, publicly downloadable dataset, and whose provenance, convention
and limitations are published inside the product for a human to check.

Overall project status is unchanged:
`REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`
