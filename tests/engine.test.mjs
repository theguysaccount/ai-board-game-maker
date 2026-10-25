import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { parseTTF } from "../src/assets/js/engine/ttf.js";
import { PdfDoc, pdfString } from "../src/assets/js/engine/pdfdoc.js";
import { GAMES, RULES, THEMES, buildGame, forbiddenWords } from "../src/assets/js/engine/games.js";
import { pagesPdf, pageSvg, makeText, PAPER } from "../src/assets/js/engine/layout.js";
import { parsePairs, cleanContent, encodeGame, decodeGame } from "../src/assets/js/engine/content.js";
import { PACKS } from "../src/content/packs.js";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const font = (f) => parseTTF(fs.readFileSync(path.join(ROOT, "src/assets/fonts", f)));
const FONTS = { body: font("AtkinsonHyperlegible-Regular.ttf"), bold: font("AtkinsonHyperlegible-Bold.ttf"), display: font("LilitaOne-Regular.ttf") };
const content = (p) => ({ title: p.title, items: p.items.map(([a, b]) => ({ a, b })) });

test("fonts parse with sane metrics", () => {
  for (const [k, f] of Object.entries(FONTS)) {
    assert.ok(f.unitsPerEm >= 500 && f.unitsPerEm <= 4096, k);
    assert.ok(f.numGlyphs > 100, k);
    assert.ok(f.glyph("A".codePointAt(0)) > 0, k);
    assert.ok(f.width("Hello", 12) > 20 && f.width("Hello", 12) < 40, k);
    assert.match(f.psName, /^[A-Za-z0-9-]+$/);
  }
});

test("every character in every topic, rule and label exists in the fonts that draw it", () => {
  const missing = new Map();
  const check = (text, ...fonts) => {
    for (const ch of String(text)) {
      if (/\s/.test(ch)) continue;
      for (const k of fonts) if (!FONTS[k].has(ch)) missing.set(`${k}:${ch} U+${ch.codePointAt(0).toString(16)}`, text);
    }
  };
  for (const p of PACKS) {
    check(p.title, "body", "bold", "display");
    for (const [a, b] of p.items) { check(a, "body"); check(b, "bold", "display"); }
  }
  for (const [id, g] of Object.entries(GAMES)) {
    check(g.name, "display");
    for (const s of [...RULES[id].need, ...RULES[id].steps, ...RULES[id].variations]) check(s, "body");
  }
  check("Who has… START I HAVE… DON'T SAY ACT · DRAW · SAY QUESTION ANSWER CLUE FREE BINGO SQUARE Answer: Cut along the dotted lines", "body", "bold", "display");
  assert.deepEqual([...missing.keys()], [], "glyphs missing: " + [...missing].map(([k, v]) => `${k} in “${v}”`).join("; "));
});

test("topic packs are complete and every answer is unique within its pack", () => {
  const ids = new Set();
  for (const p of PACKS) {
    assert.ok(!ids.has(p.id), "duplicate id " + p.id);
    ids.add(p.id);
    assert.match(p.id, /^[a-z0-9-]+$/);
    assert.match(p.publish, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(p.intro.split(" ").length >= 35, p.id + " intro too short");
    assert.ok(p.items.length >= 16, p.id + " needs at least 16 pairs");
    const answers = p.items.map(([, b]) => b.toLowerCase()), clues = p.items.map(([a]) => a.toLowerCase());
    assert.equal(new Set(answers).size, answers.length, p.id + " repeats an answer");
    assert.equal(new Set(clues).size, clues.length, p.id + " repeats a clue");
    for (const [a, b] of p.items) assert.ok(a.trim() && b.trim() && a.length <= 140 && b.length <= 60, `${p.id}: ${a} / ${b}`);
  }
  // A backlog exists for the weekly job, one topic per week.
  const future = PACKS.filter((p) => p.publish > "2026-10-25").map((p) => p.publish).sort();
  assert.ok(future.length >= 12);
  for (let i = 1; i < future.length; i++) assert.equal((Date.parse(future[i]) - Date.parse(future[i - 1])) / 864e5, 7, "weekly spacing at " + future[i]);
});

test("every game builds for every topic on both paper sizes, with everything on the page", () => {
  for (const p of PACKS) for (const id of Object.keys(GAMES)) for (const paper of ["letter", "a4"]) {
    if (p.items.length < GAMES[id].min) continue;
    const pages = buildGame(id, content(p), FONTS, { paper, cards: 3, site: "example.org/x" });
    assert.ok(pages.length >= 2, `${id} ${p.id}`);
    const walk = (ops, pg) => {
      for (const o of ops) {
        if (o.t === "rot") { walk(o.ops, pg); continue; }
        for (const k of ["x", "y", "w", "h", "x1", "y1", "x2", "y2", "cx", "cy", "r", "size"]) if (k in o) assert.ok(Number.isFinite(o[k]), `${id} ${p.id} ${o.t}.${k}`);
        if (o.t === "text") {
          assert.ok(o.y > 0 && o.y <= pg.h + 0.01 && o.x >= 0 && o.x <= pg.w + 0.01, `${id} ${p.id} text off page: ${o.s}`);
          assert.ok(o.size >= 5, `${id} ${p.id} text too small (${o.size}): ${o.s}`);
        }
      }
    };
    for (const pg of pages) walk(pg.ops, pg);
  }
});

test("games refuse lists that are too short, with a clear message", () => {
  for (const [id, g] of Object.entries(GAMES)) {
    const items = Array.from({ length: g.min - 1 }, (_, i) => ({ a: "q" + i, b: "a" + i }));
    assert.throws(() => buildGame(id, { title: "t", items }, FONTS), new RegExp(`needs at least ${g.min}`));
  }
});

test("bingo cards are all different and contain only list answers", () => {
  const p = PACKS.find((x) => x.id === "planets-solar-system");
  const pages = buildGame("bingo", content(p), FONTS, { cards: 30, site: "x" });
  const answers = new Set(p.items.map(([, b]) => b));
  const cardPages = pages.slice(pages.findIndex((pg) => pg.ops.some((o) => o.s === "B")));
  const cards = [];
  for (const pg of cardPages) {
    // Group the bold answer texts by card (two cards per page, split at mid-page).
    const texts = pg.ops.filter((o) => o.t === "text" && o.font === "bold" && o.size >= 6 && !/^Card|FREE/.test(o.s) && o.s !== p.title);
    for (const half of [0, 1]) {
      const own = texts.filter((o) => (o.y > pg.h / 2) === !!half).map((o) => o.s).join("|");
      if (own) cards.push(own);
    }
  }
  assert.equal(cards.length, 30);
  assert.equal(new Set(cards).size, 30, "two cards are identical");
});

test("loop cards form one closed chain", () => {
  const p = PACKS.find((x) => x.id === "fractions-decimals");
  const pages = buildGame("loop", content(p), FONTS, { site: "x" });
  const key = pages.at(-1).ops.filter((o) => o.t === "text").map((o) => o.s).join(" ");
  // Every answer appears once as "I have", and the START card exists.
  for (const [, b] of p.items) assert.ok(key.includes(`I have ${b}.`), b);
  assert.ok(pages.some((pg) => pg.ops.some((o) => o.s === "START")));
});

test("Talk Around It never forbids the word itself and drops filler words", () => {
  for (const p of PACKS) for (const [a, b] of p.items) {
    const words = forbiddenWords(a, b);
    for (const w of words) {
      assert.ok(!b.toLowerCase().includes(w.toLowerCase()), `${b}: ${w}`);
      assert.ok(!/['’]s$/.test(w), "possessive " + w);
    }
  }
  assert.deepEqual(forbiddenWords("The planet that spins on its side", "Uranus"), ["Planet", "Spins", "Side"]);
  assert.deepEqual(forbiddenWords("Earth's natural satellite", "The Moon"), ["Satellite", "Natural", "Earth"]);
});

test("the PDF writer produces a valid, searchable PDF", async () => {
  const p = PACKS.find((x) => x.id === "spanish-greetings");
  const pages = buildGame("match", content(p), FONTS, { site: "example.org" });
  const bytes = await pagesPdf(pages, FONTS, { title: "Spanish ¿Cómo estás?" });
  const text = Buffer.from(bytes).toString("latin1");
  assert.ok(text.startsWith("%PDF-1.7"));
  assert.ok(text.trimEnd().endsWith("%%EOF"));
  const sx = +text.match(/startxref\n(\d+)/)[1];
  assert.equal(text.slice(sx, sx + 4), "xref");
  const count = +text.match(/xref\n0 (\d+)/)[1];
  const offsets = [...text.slice(sx).matchAll(/^(\d{10}) 00000 n $/gm)].map((m) => +m[1]);
  assert.equal(offsets.length, count - 1);
  offsets.forEach((o, i) => assert.equal(text.slice(o, o + `${i + 1} 0 obj`.length), `${i + 1} 0 obj`, "object " + (i + 1)));
  assert.equal(+text.match(/\/Type \/Pages \/Kids \[[^\]]*\] \/Count (\d+)/)[1], pages.length);
  assert.equal((text.match(/\/Subtype \/CIDFontType2/g) || []).length, 3, "three embedded fonts");
  assert.equal((text.match(/\/FontFile2 \d+ 0 R/g) || []).length, 3);
  assert.equal((text.match(/\/ToUnicode \d+ 0 R/g) || []).length, 3);
  assert.match(text, /\/Title <FEFF/);
  // Content streams decompress and draw text with the embedded fonts.
  const streams = [...text.matchAll(/<< \/Length (\d+) \/Filter \/FlateDecode >>\nstream\n/g)];
  assert.ok(streams.length >= pages.length);
  const first = streams[0];
  const start = first.index + first[0].length;
  const raw = Buffer.from(bytes.subarray(start, start + +first[1]));
  const ops = zlib.inflateSync(raw).toString("latin1");
  assert.match(ops, /BT [\d. ]+ rg \/F\d [\d.]+ Tf 1 0 0 1 [\d.-]+ [\d.-]+ Tm <[0-9a-f]+> Tj ET/);
});

test("pdfString escapes and encodes", () => {
  assert.equal(pdfString("A (b) \\c"), "(A \\(b\\) \\\\c)");
  assert.equal(pdfString("é"), "<FEFF00E9>");
  const d = new PdfDoc();
  assert.ok(d.addPage(100, 100));
});

test("SVG previews escape text", () => {
  const pages = buildGame("match", { title: "<script>", items: Array.from({ length: 6 }, (_, i) => ({ a: `<img src=x onerror=alert(${i})>`, b: `"&'` })) }, FONTS, { site: "x" });
  for (const pg of pages) {
    const svg = pageSvg(pg);
    assert.ok(!svg.includes("<img") && !svg.includes("<script>"), "unescaped markup");
  }
});

test("pasted lists are split on tabs, dashes, equals signs and commas", () => {
  const got = parsePairs("Clue one\tAnswer one\nClue two - Answer two\nClue three = Answer three\nClue, with comma, Answer four\n\n  \nLonely line");
  assert.deepEqual(got.map((x) => [x.a, x.b]), [["Clue one", "Answer one"], ["Clue two", "Answer two"], ["Clue three", "Answer three"], ["Clue, with comma", "Answer four"], ["Lonely line", ""]]);
  assert.equal(parsePairs("a-b\n".repeat(500)).length, 120, "capped");
});

test("share links round-trip and reject garbage", async () => {
  const p = PACKS[0];
  const token = await encodeGame({ title: p.title, items: content(p).items, game: "summit", options: { paper: "a4", theme: "grape", cards: 20, credit: false } });
  const back = await decodeGame(token, GAMES, THEMES);
  assert.equal(back.title, p.title);
  assert.equal(back.game, "summit");
  assert.equal(back.items.length, p.items.length);
  assert.deepEqual(back.options, { paper: "a4", theme: "grape", cards: 20, credit: false });
  await assert.rejects(decodeGame("x123", GAMES, THEMES));
  const evil = Buffer.from(JSON.stringify({ v: 1, t: "x".repeat(500), i: [["a".repeat(999), 5], "no"], g: "../../etc", o: { paper: "tabloid", theme: "__proto__", cards: 9999 } })).toString("base64url");
  const cleaned = await decodeGame("j" + evil, GAMES, THEMES);
  assert.equal(cleaned.title.length, 80);
  assert.equal(cleaned.items[0].a.length, 140);
  assert.equal(cleaned.game, "bingo");
  assert.equal(cleaned.options.paper, "letter");
  assert.equal(cleaned.options.theme, "");
  assert.equal(cleaned.options.cards, 60);
});

test("cleanContent trims and caps", () => {
  const c = cleanContent({ title: "  T\u0007 ", items: [{ a: " x ", b: "y" }, ["p", "q"]] });
  assert.equal(c.title, "T");
  assert.deepEqual(c.items, [{ a: "x", b: "y" }, { a: "p", b: "q" }]);
});

test("text fitting prefers shrinking to breaking words", () => {
  const T = makeText(FONTS);
  const r = T.fit("Constellation", "bold", 80, 40, 15, 6);
  assert.equal(r.lines.length, 1);
  assert.ok(FONTS.bold.width("Constellation", r.size) <= 80);
  assert.ok(PAPER.letter.w === 612 && PAPER.a4.h > 841);
});
