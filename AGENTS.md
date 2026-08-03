# Black Whale Nexus

An intelligence-archive web app for the Hunter × Hunter Succession War
(manga chapters 340–416). Most work here is **content data**, not code.

**Before editing anything under `src/data/`, read [`docs/DATA_GUIDE.md`](docs/DATA_GUIDE.md).**
It records the source-of-truth workflow (Hunterpedia), the content model, the
mandatory validate/typecheck/build loop, canon decisions already made, and the
gotchas. Skipping it reintroduces mistakes we've already fixed.

Quick facts: canon comes from Hunterpedia only (never memory); every change must
pass `npx tsx scripts/validate-content.ts` at 0 errors; the design is finished —
don't change it without an explicit request; commit only when asked, with no
co-author trailer.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
