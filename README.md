<h1 align="center">Black Whale Nexus</h1>

An interactive intelligence archive for the full Hunter × Hunter **Succession
War continuity from chapter 340 onward** — from Beyond Netero's Dark Continent
announcement and the Hisoka–Chrollo deathmatch through the voyage itself: the
fourteen princes, their guards, the mafia families, the Phantom Troupe, Nen
abilities, assassinations, hidden alliances, and simultaneous storylines aboard
Black Whale No. 1.

Not a wiki: a story-intelligence system. Every record is **chapter-aware** — a
global clearance control (Anime-only / Manga up to chapter N / Full spoilers)
reconstructs what is *known* at that point in the story, not just hides text.

## Sections

| Route | Metaphor |
| --- | --- |
| `/` | Command Center — layered strategic situation board |
| `/characters` | Classified personnel dossiers (9-tab files) |
| `/web` | Conspiracy investigation board (force-directed network, 19 presets, chapter evolution) |
| `/princes` | Royal war council (cards, table, succession ring, risk evolution) |
| `/factions` | Group intelligence files |
| `/storylines` | Branching mission map (railway/git-graph) |
| `/timeline` | Ship voyage recorder with parallel-thread columns |
| `/chapters` | Incident reports with "What changed" diffs |
| `/map` | Naval tactical blueprint with occupancy scrubbing |
| `/nen` | Technical research archive with mechanics diagrams |
| `/knowledge` | Intelligence-clearance network (who knows what, since when) |
| `/deaths` | Death & status ledger |
| `/mysteries` | Analyst case board |
| `/compare` | Side-by-side analysis desk |
| `/theories` | Hypothesis room (never presented as canon; can be hidden globally) |
| `/glossary` | Reference codex |

`⌘K` / `Ctrl+K` opens the archive-wide command search.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion ·
d3-force · Zustand. Client-only; all content lives in typed local data under
[`src/data/`](src/data/). No backend, no CMS.

## Development

```bash
npm run dev        # dev server
npm run build      # production build
npm run lint       # biome check
npx tsx scripts/validate-content.ts   # referential-integrity check for the dataset
```

## Content model

Defined in [`src/lib/types.ts`](src/lib/types.ts). Key conventions:

- `revealCh` = the chapter the **reader** learns something; `ch` on history
  entries = when it becomes true in-universe. `0` means "known before chapter
  340" — the 2011 anime ends at chapter 339, so these records are visible even
  at Anime-only clearance.
- History is preserved (status, location, relationships, knowledge, risk),
  never overwritten — the spoiler engine (`src/lib/spoiler.ts`) replays it.
- Every load-bearing claim carries evidence with a confidence class:
  canonical / strong-inference / weak-inference / theory / unknown, surfaced
  in the UI. Uncertain records are hedged, marked `incomplete`, or omitted —
  never invented.

Unofficial fan project. Hunter × Hunter © Yoshihiro Togashi.
