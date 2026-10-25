# Printable Game Maker

**Live:** https://theguysaccount.github.io/ai-board-game-maker/ · **Screens:** [desktop and phone](docs/screens/) · **Operations:** [OPERATIONS.md](OPERATIONS.md)

Turn any list of clues and answers into printable games. Pick one of eight original games, start from a ready-made topic or type your own words, preview every page, and download a print-ready PDF. Two of the games also play on screen: a bingo caller for the projector, and a memory match against the computer.

Everything runs in the browser. No account, no server, no AI calls at runtime: the games were designed in advance (original names, rules, layouts and boards on traditional public-domain mechanics), and the editor lays out each page from your list with fixed templates. PDFs are vector with the fonts embedded, so text is sharp at any size and copyable.

## The games

| Game | Mechanic | Players | Prints |
|---|---|---|---|
| Clue Bingo | bingo where the caller reads clues | 2–30+ | rules, caller list, unique numbered cards (up to 60) |
| Match Up | matching pairs: memory, pair fish, speed match | 1–6 | rules, clue and answer cards, answer key |
| Summit Scramble | roll-and-move race up a mountain | 2–4 | rules, landscape board with ropes and rockslides, climbers, die, question cards |
| I Have, Who Has? | loop cards for a whole class | 6–36 | rules, loop cards in a shuffled order, answer key |
| Talk Around It | describe without the forbidden words | 4–12 | rules, word cards (forbidden words drawn from each clue) |
| Act, Draw or Say | charades, drawing or describing | 4+ | rules, word cards with a private hint, action die |
| Claim the Grid | four (or three) in a row by answering | 2 | rules, numbered board, markers, numbered question cards |
| Quiz Night | team quiz | 2–8 teams | rules, host sheets, team answer sheet, scoreboard |

52 topic packs ship in the repo (34 live at launch, one more every Monday until March 2027): math facts, science, grammar, Spanish and French, geography, holidays and parties. Every answer is unique within its pack.

## Layout

```
src/
  assets/js/engine/   pure ES modules, shared by the browser, the build and the tests
    ttf.js            TrueType reader (metrics, cmap, names)
    pdfdoc.js         vector PDF writer: embedded TrueType (Identity-H + ToUnicode), shapes, links, Flate
    layout.js         display lists → SVG preview and PDF; text wrapping and fitting
    games.js          the eight games, their rules and themes
    content.js        list parsing, limits, share-link codec
  assets/js/app/      browser UI: editor.js, play.js (caller, memory), fonts.js, ui.js
  content/            packs.js (topics + weekly backlog), guides.js
scripts/
  build.mjs           dist/: pages, topic data, sitemap, robots, IndexNow key, manifest, share-card jobs
  og.mjs              share cards (1200x630 JPEG) and touch icon in headless Chrome
  selftest.mjs        end-to-end test in headless Chrome, plus independent PDF checks
  screens.mjs         docs/screens/ at 1280 px and 390 px
  linkcheck.mjs, indexnow.mjs, serve.mjs, preview.mjs (dev: one game → PDF + PNG)
tests/                node:test (engine, every game × every topic × both paper sizes, build)
```

## Run, test, deploy

Node 20+ (CI uses 24); Chrome for share cards, screenshots and the self-test. No npm packages.

```bash
npm test                         # 21 tests
node scripts/build.mjs           # → dist/ (PGM_BASE_URL sets canonical URLs)
node scripts/og.mjs              # share cards
node scripts/selftest.mjs        # end to end; samples in selftest-out/
node scripts/serve.mjs 4848      # http://127.0.0.1:4848/ai-board-game-maker/
```

Every push to `main` runs the tests, build and self-test, then deploys to GitHub Pages; nothing deploys if a step fails. See [OPERATIONS.md](OPERATIONS.md).

## Privacy

Lists stay in the browser's local storage; PDFs are made on the device; share links carry the list in the URL fragment, which never reaches a server.

## License

Code, game designs, layouts and topic lists: CC0 1.0, see [LICENSE](LICENSE). Fonts: Atkinson Hyperlegible and Lilita One under the SIL Open Font License 1.1 (in `src/assets/fonts/`), embedded unmodified in PDFs.
