# SPATIAL JOURNEY — DESIGN DECISION RECORD

> **Date:** 2026-09-17 · **Status:** `PROJECT DECISION`
> Nothing in this file is a requirement taken from the three rule PDFs. It is the group's design reasoning, recorded because the Handbook requires evidence for design choices (`HB PDF p.1`, control `CM-005`).
> **Project status, unchanged:** `REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE`

---

## 1. One-sentence direction

> **A documentary map plate that travels exactly as far as the assigned excerpt travels — placing what the textbook places, leaving visibly unplaced what it does not, and drawing a line only where the textbook actually states a movement.**

The suggested framing in the brief — *"geography reveals the five-stage development of thought rather than simply plotting travel"* — is adopted with one correction the source forced. Once the excerpt is read for place rather than for date, the striking fact is not that geography reveals the development of thought. It is that **the excerpt places the journey far better than it places the turns**: of eight turning points, only two carry a printed location. So the plate reveals the development of thought partly *by failing to locate it* — and that gap is the lesson, not a defect to be papered over.

Working name of the surface: **`BẢN KHẮC`** (the plate), to keep it distinct from *bản đồ* in the loose sense, and from the existing overview which the product already calls a map of the five stages.

---

## 2. Experience model

Four things a learner should be able to do that they could not before:

1. see **where** the excerpt puts a stage, at the granularity the excerpt supports and no finer;
2. see **which dated events the excerpt does not locate at all** — presented as a deliberate, labelled state, not as an absence;
3. see **the six movement statements** the excerpt actually makes, three of which have an unnamed far end; *(Correction, 2026-09-18: as shipped, `MOVEMENTS` holds **four** statements — MV-2a, MV-2b, MV-4a, MV-4b — of which **two** have an unnamed far end. `placeRegister.ts` prints the count straight from the data, so four is the number a reader sees.)*
4. move through a stage and watch the plate follow the same walk they were already taking.

The plate never introduces a claim. Every mark resolves to a passage, turning point or quotation id that already exists in `stages.ts`, and therefore to a printed page.

**Product narration vs academic claim.** The plate's own words — *"Trích đoạn không in địa điểm"*, *"chưa rõ điểm đến"* — are statements about the **source document**, not about history. They are true by inspection of the excerpt and are labelled as the group's framing wherever they could be mistaken for textbook wording. No plate string is ever given a textbook locator unless it is quoting the excerpt.

---

## 3. Map role

The plate is a **second reading of the same five stages**, and never the only one. It is subordinate to the text in three specific ways:

- it carries no information that is not also present as text in the same view;
- it is decorative-by-default in the accessibility tree, exactly as `lib/svg.ts` already establishes for the thread;
- it recedes at a turning point, because the turning point must remain the loudest beat on the screen (protected regression from the previous pass).

It is **not** a basemap for browsing, not a tile viewer, and has no zoom, pan or reset control.

---

## 4. Navigation model

**No new navigation system.** This is the hardest constraint in the project: the previous pass cut simultaneously-visible navigation systems from six to two, and the measured budget is 5 chrome controls in the fold after the opening screen.

Therefore:

- the stage plate **replaces** the stage entrance's bare date column rather than being added beside it — same slot, same information, plus place;
- plate marks are focusable and activatable, but they act on the **existing** stage walker; they do not constitute a second stepper;
- the whole-excerpt plate lives inside the existing journey overview as one more section; it adds no destination list;
- nothing in the plate links to another route except through affordances that already existed.

Net effect on the density instrument should be **zero new navigation systems, zero new badges, zero new chrome controls**. This is measured, not asserted — see §14.

---

## 5. Stage grammar — how the five stages use space differently

The brief's hypothesis (§15: stage 1 Vietnam-focused, stage 2 international, stage 5 back to Vietnam) was checked against the excerpt before implementation. **It is broadly right but for a reason the brief did not anticipate, and one stage contradicts it.**

| Stage | Framing | Why the source justifies it |
|---|---|---|
| 1 | Vietnam | five named places, all in Vietnam, plus one exact site (Trường Dục Thanh). The **densest** stage for place names in the whole excerpt |
| 2 | World | the only stage that spans two continents — but it names just **one** city abroad (`thành phố Tua`). The 1911–1917 span names **no destination at all**. The plate shows a world mostly empty, which is what the excerpt actually says |
| 3 | France ↔ South China | the places printed here are **where texts were published** (`Pari` 1925, `Quảng Châu` 1927), not where the subject is said to have been. Rendered as a distinct mark kind |
| 4 | Eurasia | the only stage with a genuine multi-leg movement the excerpt states outright, ending at the excerpt's most precise location, `Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng)` |
| 5 | Vietnam | only country and half-country regions (`miền Bắc`, `miền Nam`). **Not one of its dated events carries a place** — the plate is almost entirely unplaced marks, and that is the honest picture |

The asymmetry is deliberate and evidence-driven. No stage is given marks to balance another.

---

## 6. Mark grammar

Three mark kinds, because the excerpt supports exactly three evidentiary states:

| Kind | Meaning | Rendering |
|---|---|---|
| `placed` | the excerpt prints a place for this event | a mark on the plate at the place's coordinate; mark weight follows the **granularity the excerpt supports** (exact site → small firm dot; city → dot; country/region → a soft halo, never a pin, because a country is not a point) |
| `unplaced` | the excerpt gives a date but no place | sits in a labelled band **off the land**, tied to nothing, with no leader line to anywhere |
| `open` | the excerpt states a movement whose far end it does not name | **Overturned in implementation, 2026-09-18.** Specified here as *a ray leaving the known end and fading out*; the product draws **two open rings centred on the end that IS named**. `atlas.ts` gives the reason in its own header: a ray has to point somewhere, and pointing is a claim the excerpt does not make; rings say only "outward from here, and the page does not say how far". |

Turning points additionally take the red accent, which is already reserved for exactly that meaning. A placed ordinary passage is ink; apparatus is indigo. **Red never means "clickable" here, as it never does elsewhere in this product.**

Colour is never the only channel: kind is also carried by shape and by the text label, satisfying `color-not-only`.

---

## 7. Image strategy

Unchanged in its protocol, extended in its placement.

- Primary anchors stay at the stage entrance; supporting figures stay attached to the narrative anchor they explain (`FigureAnchor` already models `passage` / `turn` / `quote`). No gallery is introduced.
- The plate **may point at** a figure whose place is established, but it may not *establish* one: every cleared BnF figure currently records `locationCheck` as not established, and proximity on a plate is not evidence. A figure is never moved onto the plate. *(Correction, 2026-09-18: the rule holds and is still enforced; the premise is out of date. Of the eight documents now carried, `FS-ky-5` records a place printed by its own publication and `FS-ky-1-b` is held by Humazur rather than the BnF.)*
- Unfilled slots keep their existing blocked-and-labelled treatment. The plate adds no image and fills no slot.
- Absolutely unchanged: no AI-generated, simulated, restored, colourised or animated portrait. Motion happens **around** a document, never inside a historical person's image.

## 8. Motion strategy

One motion language, and the existing budget of **1–2 movements per screen** is not increased.

- the plate's marks **do not animate individually** — no bouncing pins, no pulsing, no particles;
- the whole-excerpt plate draws its land once on first view, in the same manner and for the same reason the overview thread already self-draws once;
- moving between stops eases the plate's framing rather than cutting, at `--dur-base` with the existing `--ease-out`;
- **no auto-rotation, no autoplay, no scroll-jacking, no lens flare, no camera flight.**

Under `prefers-reduced-motion` or the in-product switch: framing changes become immediate, the draw-on is skipped and the plate is simply already drawn. **No content is behind motion** — every mark and every label is in the DOM regardless.

## 9. Source strategy

Evidence stays visible but secondary, exactly as now.

- No verification dashboard is placed on the plate.
- A mark's page locator is reached through the **existing** evidence lens, not a new panel.
- Coordinate provenance is a **new evidence class** and is therefore given its own place in the existing verification register (`#/kiem-chung`) rather than on the reading surface: per place, the Wikidata QID, the item URL, the returned latitude/longitude, the **stated precision**, the retrieval date, and `NEED VERIFICATION`.
- The register also gains the **unplaced list** — the 26 dated events the excerpt does not locate — because that is a finding about the source, and this product's register is where findings about the source live. *(Correction, 2026-09-18: the register prints **18**, derived from `SPATIAL_NODES.filter(kind === 'unplaced')`. 26 was the pre-implementation estimate and is not the number on screen.)*

## 10. Technical choice

**Option A: the existing Vite + TypeScript stack, flat SVG, no new runtime dependency.**

| Criterion | A: SVG | B: Canvas | C: WebGL globe | D: hybrid |
|---|---|---|---|---|
| New runtime deps | **0** | 0 | ~150–600 KB | ~150–600 KB |
| Offline single-file build | works unchanged (path data is text) | works | binary textures need new inlining work | same risk |
| Keyboard access | **free** — marks are real focusable elements | must be rebuilt by hand | must be rebuilt by hand | partly |
| Screen-reader fallback | already solved by the existing decorative-SVG rule | needs a parallel DOM | needs a parallel DOM | needs a parallel DOM |
| Reduced motion | CSS, already wired | manual | manual | manual |
| 200 % text zoom (an existing gate) | text scales natively | text is pixels | text is pixels | partial |
| Presentation mode | inherits | inherits | GPU risk on a classroom machine | GPU risk |
| Mobile performance | negligible | good | worst | poor |
| Suits ~40 marks | **yes** | overkill | far overkill | overkill |

Decisive: the product ships three runtime dependencies, all fonts; `lib/svg.ts` already provides the namespaced builder and a Catmull-Rom helper; the offline bundler works by finding known asset paths in `dist/` and inlining them, which a texture pipeline would complicate; and the brief's own instruction is to choose the smallest technology that achieves the experience. **Three.js would have been a dependency added to resemble the reference, which is precisely what §11 of the brief forbids.**

### Basemap

- **Geometry:** Natural Earth 1:110 m land, via the pre-built TopoJSON in `world-atlas@2.0.2` (ISC; Natural Earth itself is public domain). Decoded with a stdlib script at authoring time to plain SVG path data and **committed as text** — there is no runtime fetch and no build-time network dependency.
- **Land only, no country borders.** The excerpt spans 1911–1969; modern political borders would be an anachronism the source does not support, and drawing them would assert boundaries the textbook never mentions. Coastlines are stable across that period.
  > **SUPERSEDED 2026-09-18** by the cartography sprint — see `CARTOGRAPHY_AUDIT.md` §6. The anachronism argument stands and was not discarded; what changed is that it now separates a border drawn as a *historical claim* (still refused) from one drawn as *orientation context* (now drawn, and labelled as such in the product's own voice). National Admin-0 boundaries, Vietnam's coastal islands, and Hoàng Sa / Trường Sa are all now rendered. No province boundaries.
- **Projection:** equirectangular (plate carrée), `x = longitude`, `y = −latitude`. Chosen because it is trivially invertible, needs no projection library, and lets a viewBox be written directly in degrees. Its distortion at high latitude is stated in the register rather than hidden.
- **Simplification:** Douglas–Peucker at 0.1°, giving ~53 KB of path text — about 2 % of the 2.44 MB offline bundle.
- **Zoom is capped at roughly a 24–30° window.** Below that, 1:110 m source data would be over-zoomed and the plate would imply a precision the geometry does not have.

## 11. Mobile model

Mobile is a different composition, not a shrunken one. Map manipulation is **never** required to reach content.

```
plate, fixed framing, no gestures
↓  place / period
↓  image, only where one is cleared
↓  story
↓  what changed
↓  evidence (existing lens)
↓  next
```

The plate is capped in height so it cannot push the reading off the screen, carries no controls, and — as everywhere else — every mark's information is also in the text beneath it.

## 12. Accessibility fallback

There is no WebGL, so there is no WebGL failure mode. Beyond that:

- the plate is `aria-hidden` by default (the established rule: the drawn layer never carries information not also present as text); where a mark is interactive it is a real focusable element with an accessible name;
- **if SVG did not render at all, no stage, node, claim, source, activity or route would become unreachable** — the plate is additive to a document that already worked;
- keyboard: existing tab order preserved; plate marks join it in reading order, not in geographic order;
- the existing 44 px minimum target applies to any interactive mark;
- contrast for every new text layer is measured in both themes by `tools/ux-audit.mjs`, which fails the build on a violation;
- 200 % text on 390 px stays clean — an existing gate that this work must not break.

## 13. Originality boundary

Stated in full in `REFERENCE_ANALYSIS.md`. Operative rules for implementation: no file, line, field name, label, asset, colour or layout from the reference; no Three.js; no 41-record schema; no phase wording; no globe-plus-right-drawer architecture; and — the subtle one — **not the same product with our text in it**. The thesis difference (a map of a *source*, not of a *life*) is what has to be visible in the result, not just in this document.

## 14. How this will be checked

Not by assertion. After the vertical slice and again after rollout:

- `npm run typecheck`, `lint`, `test`, `build`, `e2e`, `build:offline`, `check:offline`;
- `tools/ux-audit.mjs` — contrast in both themes and 200 % text at 390/834/1440; it exits non-zero on failure;
- `tools/audit-density.mjs` — navigation systems, chrome vs content controls, badges, type sizes, words, images in the fold, before and after;
- `tools/word-budget.mjs` and `tools/station-audit.mjs` — the 60–90-word budget;
- manual screenshots at 1440 / 768 / 390 in both themes, plus reduced motion and the offline file.

**No claim about learner understanding, engagement or preference will be made anywhere.** Only measurable design and technical facts. Real user evidence does not exist for this product and its absence is not filled.

---

## 15. What this record does not decide

- whether the supplied 2019 scan is the official edition (`GT-R08`, human check required);
- whether any coordinate is correct — Wikidata is a recorded, checkable source, not an authority under the Student Guideline's hierarchy, and every coordinate stays `NEED VERIFICATION`;
- the product version label, which remains `VERSION LABEL - NEED LECTURER CONFIRMATION`;
- anything about the nine unfilled figure slots. *(Correction, 2026-09-18: **five** of **thirteen** declared slots are unfilled. This record still decides nothing about them.)*
