# State: 2026-10-25

**Works (live):**
- Editor: 8 games, 34 topics, paste-in lists, live page previews, vector PDF download (Letter or A4), share links, themes, bingo card count.
- Play on screen: bingo caller; memory match against the computer (easy, medium, hard).
- 48 indexable pages (home, 8 game pages, 34 topic pages, topics and games indexes, how-to, about) with share cards and structured data.
- 21 tests (every game × every topic × both paper sizes, font coverage, PDF structure) and a Chrome self-test with independent PDF checks, on every deploy and weekly.

**Origin:** one Apple Note (Dec 2025): "i want a board game ai where i can build a game try it, and buy it", quoted in the build prompt. No code or design existed.

**Known gaps:**
- No custom domain, analytics or print shop yet (keys in OPERATIONS.md).
- PDFs cover Latin-script languages only (accents included); no right-to-left or CJK fonts.
- No accounts or saved library beyond the browser's local storage, by design.

**Worth reusing:** `src/assets/js/engine/pdfdoc.js` + `ttf.js` (dependency-free vector PDF with embedded TrueType), `layout.js` (one display list → SVG and PDF), `scripts/lib/chrome.mjs`, the self-test pattern.
