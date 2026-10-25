# Decisions

**D1. A library of original games, not a game generator.** Machine-driven mode has no AI at runtime, and the evaluator's biggest risk is "generated rules can be unbalanced or derivative; one disappointing game kills word of mouth". Eight games designed and tested once, each on a traditional mechanic people already understand, give consistent quality. Users supply the content, which is what makes a game theirs.

**D2. One content model for every game.** Every game plays from the same list of clue → answer pairs (Talk Around It derives its forbidden words from the clue). One list = eight games, and switching games is one click.

**D3. Original names and rules; public-domain mechanics only.** Bingo, matching pairs, roll-and-move, loop cards, word guessing, charades/drawing, four in a row and pub quizzes are traditional. Names (Summit Scramble, Talk Around It, Claim the Grid, ...), rules text, boards and card layouts are written for this project. Commercial game names, art and trade dress are avoided entirely; the footer says we are not affiliated with any publisher.

**D4. Vector PDFs with embedded fonts, written from scratch.** A 300-line PDF writer embeds the TrueType fonts (Identity-H with a ToUnicode map), so text is crisp, searchable and copyable, and files stay around 100 KB. The same display list draws the SVG preview, so the preview matches the print. No PDF library to maintain.

**D5. Legible type.** Atkinson Hyperlegible (Braille Institute) for card text, designed for low-vision readers; Lilita One for titles. Both OFL, embedded unmodified. A test checks every character of every topic exists in the fonts that draw it, because a missing glyph would print as a blank box (it caught the ★ in the START label).

**D6. Topic packs written now, published weekly.** 52 checked packs (34 at launch, 18 queued weekly to 2027-03-01). Answers are unique per pack (bingo and matching need it). Contested content (a disputed capital, attribution debates) is kept out.

**D7. Playtest on screen, in two forms.** The brief's "browser playtest mode with AI opponents" becomes a bingo caller for the projector and a memory match against a computer opponent with three skill levels. Both run from the same list, with no server.

**D8. Static site on GitHub Pages; money slot off.** Pages forbids commerce, so the print-on-demand link only appears when `PGM_SHOP_URL` is set, after moving hosting (OPERATIONS.md key 2).

**D9. Share links in the URL fragment.** The whole game (list and options) is deflated into `#g=…`, so a colleague can open, edit and print it, and nothing is stored or logged server-side. Decoding validates every field.

**D10. Weekly self-test prints real PDFs and checks them with other tools.** Every run builds this week's topic as a PDF for all eight games and checks them with `qpdf --check` and `pdftoppm` on the runner (macOS `sips` locally), so a PDF regression cannot ship even if my own parser agrees with my own writer.
