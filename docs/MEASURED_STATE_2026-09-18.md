# Measured state — 2026-09-18

> **This file is the single source of truth for measured project numbers.**
> Other reports must link here instead of hard-coding counts into prose.
> Every row records the command, the result and the time of measurement.
>
> Numbers in this project have gone stale three times in one day. The rule that
> follows from that: **do not copy a number out of this file into permanent prose.**
> Run the command and read the current value.

---

## 1. Test suites

| Measurement | Command | Result | Measured at (+0700) |
|---|---|---|---|
| Unit tests | `npx vitest run` | **136 passed / 136** — `content.test.ts` 88, `places.test.ts` 48, 2 files | 2026-09-18 20:47 |
| Browser tests (e2e) | `npx playwright test` | **255 passed / 255**, exit code 0, 6.1 min | 2026-09-18 ~20:55 |
| TypeScript | `npm run typecheck` | pass, exit 0 | 2026-09-18 |
| Offline guard | `npm run check:offline` | no network requests, no errors | 2026-09-18 |
| Cartography audit | `node tools/carto-audit.mjs` | `cartography audit: no problems` | 2026-09-18 |

`web/test-results/.last-run.json` after the e2e run: `{"status": "passed", "failedTests": []}`.
Note that this file carries **no counts and no timestamp**, so it cannot by itself evidence how many
tests ran. It is also rewritten by every subsequent Playwright run.

## 2. Build artifacts

| Artifact | Value | Command | Measured at |
|---|---|---|---|
| Production JS bundle | `dist/assets/index-DY6GYKsl.js` — **406,104 bytes** | `npm run build` | 2026-09-18 20:47 |
| Production HTML | `dist/index.html` — 1,504 bytes | `npm run build` | 2026-09-18 20:47 |
| Single-file offline build | `dist/HCM202_HanhTrinhTuTuong_offline.html` — **3,929,378 bytes** | `npm run build:offline` | 2026-09-18 20:47 |

## 3. Repository

| Item | Value | Measured at |
|---|---|---|
| HEAD | `1f2033d` ("thay đổi layout") | 2026-09-18 |
| `git rev-list --left-right --count origin/main...main` | `0 0` — local and remote match at commit level | 2026-09-18 |
| Commits on `main` | 6 | 2026-09-18 |
| Working tree | **dirty** — 9 modified files, 5 untracked (the cartography sprint) | 2026-09-18 20:1x |

## 4. Public deployment — STALE

| Item | Current build (local) | Serving at `hcm202.fpt.ovh` |
|---|---|---|
| JS bundle | `index-DY6GYKsl.js` — 406,104 B | `index-RyEaeMT5.js` — **207,286 B** |
| `Bản khắc` occurrences | present | **0** |
| `plate` occurrences | present | **0** |
| Documentary images reachable | 8 | **4** (the other 4 return HTTP 404) |
| National-boundary / offshore layer | present | **absent** |

The served bundle corresponds to the repository at or before commit `c7a124d` (2026-09-17 14:44).

**A git push is not a deployment.** `origin/main` is up to date and the public site is still stale.
Re-deploying is outside any tool's authority here; it needs the person who deployed it.

Verification command after a re-deploy:

```sh
curl -s https://hcm202.fpt.ovh/ | grep -o 'assets/index-[A-Za-z0-9_-]*\.js'
# then download that bundle and grep for "Bản khắc" — absent means still stale
```

## 5. AI prompt-log artifacts

| Item | Count | Command |
|---|---|---|
| Prompt Log files | **11** | `ls -1 docs/07_AI_Prompt_Log_*.md \| wc -l` |
| Verbatim prompt files | **11** | `ls -1 docs/prompts/*.txt \| wc -l` |
| Declared prompt codes | **15** | P-UX-01, P-UX-11, P-UX-12, P-IMG-01, P-IMG-04, P-IMG-05, P-IMG-08, P-IMG-12, P-SRC-01, P-SPACE-01, P-LAYOUT-01, P-CARTO-01…04 |

15 codes but 11 `.txt` files, because the four `P-CARTO-*` prompts are stored **inline** in
`docs/07_AI_Prompt_Log_Cartography_2026-09-18.md` rather than as separate `.txt` files.
That mismatch is intentional and recorded, not an omission.

## 6. Superseded numbers

Every figure below was correct when written and is now out of date. The older records are
**not rewritten** — this table is how they are read.

| Figure | Where it appears | Correct as of | Current value |
|---|---|---|---|
| 113 unit tests | Product Dossier §3.3, Development Log §13, CREATIVE_SPATIAL_JOURNEY_REPORT, UX_REDESIGN_REPORT | before 13:40 on 18-9 | **136** |
| 115 unit tests | interim measurement | 13:53 on 18-9 | **136** |
| 116 unit tests | Release Evidence (scoped to commit `f0a70a9`), several root reports | 14:49 on 18-9 | **136** |
| 183 / 213 / 228 e2e | several root reports, `E2E_Run_Record_2026-09-18.md` | various on 18-9 | **255** |
| e2e "NOT RUN" / `status: failed` | Product Dossier §3.3, Development Log | before the first successful run on 18-9 | **255 passed, exit 0** |
| bundle `index-C-f4-ccB.js` | Release Evidence, Deployment Record | at commit `f0a70a9` | `index-DY6GYKsl.js` |
| offline build ≈1 MB, then 3,828,081 B | web/README.md, Concept Note | earlier builds | **3,929,378 B** |
| 4 commits | Concept Note, Development Log | 17-9 | **6** |

---

*Recorded 2026-09-18 by direct measurement on this machine. No number in this file was copied
from another document.*
