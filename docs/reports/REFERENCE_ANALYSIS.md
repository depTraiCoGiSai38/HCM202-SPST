# REFERENCE ANALYSIS — `creative_product_HCM202`

> **Date inspected:** 2026-09-17
> **Reference:** <https://github.com/PhamXuanKhang/creative_product_HCM202>
> **Local copy:** `_reference/creative_product_HCM202` — cloned, git-ignored, never modified, never built, never committed
> **Status of this file:** `PROJECT DECISION` — a design-inspiration record. It is **not** an academic source and carries no locator authority.

---

## 0. What was actually inspected

A full (non-shallow) clone: 62 tracked files, 95 commits, HEAD `583f5c9` (2026-05-02). Working tree clean before and after; every read was `cat` / `grep` / `git log`. `git status --porcelain` empty at both ends.

Everything below is cited to a real file and line in that clone. Nothing was inferred from the README alone.

**Provenance note, recorded because it matters for an originality claim.** The reference's first commit is `db5eb94`, 2019-04-10, author *Chris Zhou*, message *"bootstrap metoorising mvp"*. The repository is a re-skin of `chrisrzhou/google-globe-trends`. The evidence is still live in the tree and not deleted:

- `src/components/about.js:13-42` still describes "**Google Globe Trends** … Data is fetched during build time using the google-trends-api library";
- `src/components/link.js:3-13` still hardcodes `chrisrzhou/google-globe-trends`, `metoorising.withgoogle.com`, a Netlify deploy URL;
- `src/components/overlay.js:23,36` still renders `<h2>Google Globe Trends</h2>` and `TOP 5 SEARCHING CITIES`.

Those four components are dead code — no import of them exists anywhere in `src`. This does not diminish the reference's usefulness as inspiration; it is recorded because "the globe idea" in that repo is itself inherited, which is a further reason our implementation must not be derived from its code.

---

## 1. Decomposition table

| Reference idea | Why it works | What we must NOT copy | Our original interpretation |
|---|---|---|---|
| **Space is the index**: you reach content by clicking a place, and the camera physically flies there (`config.js:20` `focusAnimationDuration: 1000`) | Makes retrieval feel like travel instead of like a table of contents. Location becomes memorable because reaching it costs a movement. | The react-globe wrapper, the camera-flight config, the `__focused__${id}` marker-recolour hack (`globe.js:39-42,155-177`), the three-texture load sequence. | Space is a **second reading of the same five stages**, never the only index. Our plate is a flat SVG in the existing paper palette; movement is a short focus transition, not a camera flight, and it is skipped entirely under reduced motion. |
| **The world holds still while you read** — focusing kills rotation, glow, zoom, tooltips, pointer events (`globe.js:184-189,215`) | The surface stops competing with the text at the exact moment text matters. A genuinely good instinct. | The specific disable-list and the `pointer-events` cut. | We never had rotation to stop. Instead the plate **recedes** at a turning point — the existing rule that the turning point is the loudest beat on the screen is extended to the spatial layer, which dims rather than dying. |
| **Forward/back navigation moves the planet** (`details.js:409-471`) — "next event" re-focuses the globe, so turning a page is a flight | Chronology and geography become the *same* scrubber. This is the single strongest idea in the reference. | The bookmark-tab component, the sort-by-numeric-`id` stepping, the `FOCUS` re-dispatch. | Adopted as a **principle, implemented from the opposite end**: our existing stage walker already steps through the excerpt's own printed order. The plate listens to that walker. We add no new stepper — the one that exists gains a spatial consequence. |
| **Markers encode a quantity, not just a position** — radius and hue scale with events-per-coordinate (`globe.js:15-68`) | A map that says something beyond "here" is worth more screen than one that does not. | The gold→orange→crimson→orchid→pink ramp, the `0.004 + n*0.002` radius formula, grouping by the string `"lat,lng"` (`state.js:9-16`). | Our marks encode **evidence status and narrative role**, not count: whether the excerpt *places* the event at all, and whether it is a turning point. Colour obeys the existing `--son` discipline — red means turning point / where you are / focus / the thread, never "there is a lot here". |
| **Per-event presentation templates** (`normal` / `grid` / `story_scroll`, `details.js:126-282`) | One rhythm for every item is monotonous; letting an item choose its shape keeps a long sequence alive. | `templateType` as a field **inside the data**, the carousel with its offset-centering track, the `story_scroll` contract. | Composition is chosen from **what the source supports**, not from an authoring flag: a placed node, an unplaced node and an open movement each render differently because they *are* different evidentiary objects. The shape is derived, never authored per record. |
| **A single full-bleed surface with no page chrome** (`index.scss:62` `body { overflow: hidden }`) | Removes the "website" frame completely; the product reads as an instrument. | Locking scroll, `position: fixed` on everything, the 35 % drawer. | We keep our document structure — it is what makes the product keyboard-navigable, printable, deep-linkable and offline-reliable, all of which the reference gives up. Our answer to "less chrome" was already won in the previous UX pass (6 nav systems → 2); the plate must not spend that budget. |

---

## 2. The five questions

### 2.1 What is the reference product's core interaction idea?

A single screen (`src/components/app.js:28-56`) holding a full-viewport auto-rotating WebGL globe, over which 41 event records are plotted as markers by `coordinates: [lat, lng]`. Two entry paths into the same record — click a marker, or open a top-right five-phase accordion (`timeline-bar.js:19-25`) and click a row. Selecting either flies the camera to the location, freezes the globe, and slides a detail drawer over the right 35 %. A left-edge tab then steps forward/backward through events by numeric `id`, re-flying the camera each time.

There is no router, no URL per event, no back-button support, and **no line is ever drawn between the 31 locations** — the journey is implied only by successive camera flights.

### 2.2 Why does it feel more like a creative product than a normal educational website?

Concretely, and only from what is in the code:

1. the primary surface is a rotating planet, not a document — the page cannot even be scrolled;
2. reaching content costs a movement through space;
3. the globe visibly reacts to reading state by going still;
4. paging forward physically travels;
5. markers are a visual encoding rather than pins;
6. items can change their own presentation shape;
7. it ships a seasonal alternate skin — something no ordinary courseware does;
8. overlays blur in and out rather than appearing.

The common thread: **the product has a world, and the interface is mostly absent from it.** That is the quality worth learning from, and it is a design principle, not an implementation.

### 2.3 Which ideas are general interaction principles rather than proprietary implementation?

General, and freely usable by anyone:

- spatial exploration of a historical sequence;
- geography and chronology sharing one control;
- a location opening a focused detail view;
- the background surface calming down while you read;
- progression through a journey as the main navigation metaphor;
- media attached to a meaningful point rather than pooled in a gallery.

These appear in published cartographic-storytelling practice generally; they are not this repository's invention — and, as §0 records, its own globe came from an earlier project.

Proprietary to the reference, and therefore off-limits:

- its 41-record dataset and every field name in it;
- its five phase labels and their wording;
- `react-globe` / Three.js configuration, textures and marker-material code;
- its SCSS, palette, drawer geometry, accordion, fade component;
- its information architecture (one screen, no URLs, right-hand 35 % drawer);
- its `templateType` mechanism and carousel.

### 2.4 What would constitute copying?

Any of: lifting a source file, component, class name or CSS rule; adopting its `{id, phase, year, location, coordinates, eventMeta, eventName, description, mediaUrl, sourceMedia, references, templateType}` record shape; re-using its event list, its phase wording, its images; reproducing the globe + right-drawer + top-right-accordion layout; adding Three.js *because* the reference uses Three.js; or rebuilding the same product with our text substituted — which is the subtlest and most serious form, and the one this file exists to guard against.

### 2.5 How will our version be materially different?

| Axis | Reference | Ours |
|---|---|---|
| Surface | WebGL sphere, `three` + `react-globe` | Flat SVG plate; **no 3D, no new runtime dependency** |
| Basemap | one equirectangular JPEG texture fetched from a third party's `raw.githubusercontent.com` (`config.js:7-12`) | public-domain Natural Earth land outline, decoded to path data at authoring time and **bundled as text**; no borders, because the excerpt spans 1911–1969 and modern borders would be an anachronism |
| What the map plots | 41 events, every one given a coordinate | only what the excerpt **prints**; events the excerpt does not place are shown as *unplaced*, on purpose |
| Lines between points | none drawn | drawn **only where the excerpt states a movement** — six statements in the whole excerpt, three of which have an unnamed far end and are drawn as open rays *(Correction, 2026-09-18: as shipped this is **four** movement statements, **two** with an unnamed far end, and the unnamed end is drawn as **two open rings**, not a ray — `atlas.ts` rejected the ray because a ray has to point somewhere.)* |
| What a mark encodes | how many events share a coordinate | evidence status and narrative role |
| Source apparatus | `references`: bare URLs, no page, no volume, no status | printed textbook page per claim, plus a per-place coordinate provenance record with its own status |
| Routing | one screen, no URLs | existing hash router; every stage and activity stays deep-linkable |
| Accessibility | 2 `aria-*` in the codebase, both on dead code; every control a `div onClick`; no keyboard path into the drawer; `<html lang="en">` on Vietnamese content | plate is decorative-by-default with the same information present as text; existing keyboard, focus, reduced-motion and 200 %-zoom guarantees preserved and re-tested |
| Offline | does not work — textures, fonts and ~76 % of media are remote | single-file offline build with zero network requests, verified by `npm run check:offline` |

The deepest difference is the thesis. The reference plots **a life**. We plot **a source**: the map goes exactly as far as the assigned excerpt goes, and stops visibly where the excerpt stops. A reader of the reference learns where Hồ Chí Minh went. A reader of ours learns where *this textbook excerpt says* he went — and, just as importantly, where it declines to say.

---

## 3. What was taken, in one sentence

Three general principles — *space as an index*, *chronology and geography sharing one control*, and *the background calming while you read* — and nothing else. No file, no line, no field name, no label, no asset, no colour, no layout.

---

## 4. Handling rules for `_reference/`

- read-only; already listed in `.gitignore` (`_reference/`) and confirmed untracked;
- never imported, bundled, built or deployed;
- never cited as an academic source, and never as evidence for a historical claim;
- this record is the originality trail and is referenced from the Prompt Log entry for this session.
