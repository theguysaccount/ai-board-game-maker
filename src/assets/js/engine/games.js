// The game library. Every game is original (names, rules text, layouts) and built on classic,
// public-domain mechanics: bingo, matching pairs, roll-and-move racing, loop cards, word guessing,
// charades and drawing, four-in-a-row, and a pub-style quiz. All of them play from the same
// content: a list of { a: clue or question, b: answer }.
import { PAPER, makeText } from "./layout.js";
import { makeRng } from "./rng.js";

export const THEMES = {
  berry: { label: "Berry", main: "#B8336A", dark: "#7A1F45", light: "#FBE3EC", accent: "#F2B134" },
  ocean: { label: "Ocean", main: "#1F6FB2", dark: "#123F66", light: "#E1EEF9", accent: "#F28C28" },
  forest: { label: "Forest", main: "#2E7D4F", dark: "#1B4D30", light: "#E3F2E8", accent: "#E3B23C" },
  grape: { label: "Grape", main: "#6A3FA0", dark: "#40235F", light: "#EEE6F8", accent: "#2EC4B6" },
  sunset: { label: "Sunset", main: "#D9622B", dark: "#8F3A1C", light: "#FDE9DF", accent: "#2B6CB0" },
  teal: { label: "Teal", main: "#0F8B8D", dark: "#0A5657", light: "#DDF3F3", accent: "#EC4E20" },
  slate: { label: "Slate", main: "#2D3A4A", dark: "#18212B", light: "#E7EBF0", accent: "#E9B949" },
};
const INK = "#1B1B1F", MUTED = "#5E6470", CUT = "#B9BEC7";

export const GAMES = {
  bingo: {
    name: "Clue Bingo", short: "Bingo cards where the caller reads clues, not answers.", theme: "berry", min: 9,
    players: "2 to 30+", ages: "6+", time: "15–30 min", mechanic: "bingo",
    blurb: "Every card is different. The caller reads a clue; players cover its answer. First full line wins.",
  },
  match: {
    name: "Match Up", short: "Clue cards and answer cards for memory, pair fish and speed matching.", theme: "ocean", min: 6,
    players: "1 to 6", ages: "5+", time: "10–20 min", mechanic: "matching pairs",
    blurb: "One deck, three games: a memory match, a pair-fishing card game, and a race against the clock.",
  },
  summit: {
    name: "Summit Scramble", short: "A roll-and-move race up a mountain, with question cards.", theme: "forest", min: 8,
    players: "2 to 4", ages: "7+", time: "20–30 min", mechanic: "roll and move",
    blurb: "Race from base camp to the summit. Question spaces, ropes that pull you up and rockslides that send you down.",
  },
  loop: {
    name: "I Have, Who Has?", short: "Loop cards that chain a whole class together.", theme: "grape", min: 6,
    players: "6 to 36", ages: "6+", time: "10 min", mechanic: "loop cards",
    blurb: "Hand out every card. Each answer leads to the next question until the chain comes back to the start.",
  },
  taboo: {
    name: "Talk Around It", short: "Describe the word without saying the words on the card.", theme: "teal", min: 8,
    players: "4 to 12", ages: "8+", time: "20 min", mechanic: "word guessing",
    blurb: "Get your team to guess the word at the top without using any of the words underneath it.",
  },
  ads: {
    name: "Act, Draw or Say", short: "Roll the action die, then act, draw or describe the word.", theme: "sunset", min: 8,
    players: "4+", ages: "6+", time: "20 min", mechanic: "charades and drawing",
    blurb: "The action die decides: act it out, draw it, or describe it. Your team has a minute to guess.",
  },
  grid: {
    name: "Claim the Grid", short: "Answer a numbered question to claim its square; four in a row wins.", theme: "slate", min: 9,
    players: "2", ages: "7+", time: "15 min", mechanic: "four in a row",
    blurb: "A head-to-head board game: answer right to claim a square, and line up four before your opponent.",
  },
  quiz: {
    name: "Quiz Night", short: "Host sheet, team answer sheets and a scoreboard.", theme: "ocean", min: 5,
    players: "2 to 8 teams", ages: "8+", time: "30–45 min", mechanic: "team quiz",
    blurb: "Everything for a quiz: questions for the host, answer sheets for each team and a scoreboard.",
  },
};

export const RULES = {
  bingo: {
    need: ["One bingo card per player (every card is different)", "The caller list", "Counters: beans, coins, or a pencil"],
    steps: [
      "Give each player a card. Cards are numbered so you can check a winner.",
      "The caller reads a clue from the caller list, in any order, and ticks it off.",
      "Players find the answer on their card and cover it. One square per clue.",
      "The first player to complete a line across, down or corner to corner calls “Bingo!” and reads back their squares. The caller checks them against the ticked clues.",
      "Keep going for a second line, the four corners, or a full card.",
    ],
    variations: ["For younger players, read the answer instead of the clue.", "Blackout: the first full card wins.", "Let the winner be the next caller."],
  },
  match: {
    need: ["The cards, cut apart. Each pair is a clue card and its answer card."],
    steps: [
      "Memory: shuffle every card face down in a grid. Take turns flipping two. A clue and its answer is a pair: keep it and go again. Otherwise flip them back. Most pairs wins.",
      "Pair Fish: deal five cards each and stack the rest. On your turn, ask one player for the match to a card in your hand. If they have it, take it and lay the pair down; if not, draw a card. Most pairs wins.",
      "Speed Match: lay all the clue cards face up and race to put each answer card on its clue. Time it, then try to beat your time.",
    ],
    variations: ["Use only half the deck for younger players.", "Play Memory in teams: talk it over before you flip."],
  },
  summit: {
    need: ["The board", "The question cards, cut apart and shuffled face down", "A climber for each player (cut out and fold) or a coin each", "A six-sided die, or build the paper one"],
    steps: [
      "Everyone starts at Base Camp.",
      "On your turn, roll the die and move that many spaces up the trail.",
      "Land on a ? space: the player on your left reads you a question card. Answer right and roll again. Answer wrong and move back one space.",
      "Land at the bottom of a rope and climb straight to its top. Land at the top of a rockslide and slide down to its bottom.",
      "The first climber to reach the Summit wins. You don't need an exact roll.",
    ],
    variations: ["Teams of two share a climber and talk over each answer.", "Harder: answer a question correctly to leave Base Camp."],
  },
  loop: {
    need: ["The cards, cut apart. Hand out every card; some players can hold two."],
    steps: [
      "The player with the START card reads it aloud: “I have …. Who has …?”",
      "Everyone listens. The player whose card answers the question reads theirs next.",
      "Keep going around the room until the chain comes back to the START card.",
      "Time the whole loop and try to beat the class record next time.",
    ],
    variations: ["Play in two groups with two sets and race.", "The answer key on the last page shows the full order."],
  },
  taboo: {
    need: ["The cards", "A one-minute timer (a phone works)", "Paper for keeping score"],
    steps: [
      "Split into two teams. One player draws cards and describes the word at the top to their team without saying it, or any word in the “Don't say” list.",
      "Each correct guess scores a point. Then draw the next card.",
      "No gestures, no rhymes, no spelling. Saying a forbidden word skips the card and gives a point to the other team.",
      "When the minute is up, the other team plays. Most points when the cards run out wins.",
    ],
    variations: ["Easier: allow gestures.", "Harder: add a word of your own to every “Don't say” list."],
  },
  ads: {
    need: ["The cards", "The action die (cut, fold and tape) or a regular die", "Paper and pencils for drawing", "A one-minute timer"],
    steps: [
      "Split into two teams. On your turn, roll the action die: ACT means act it out without words, DRAW means draw it with no letters or numbers, SAY means describe it without saying the word.",
      "With a regular die: 1 or 2 is ACT, 3 or 4 is DRAW, 5 or 6 is SAY.",
      "Draw a card and do what the die says. The small hint at the bottom is for you only.",
      "If your team guesses within a minute, score a point. Then the other team plays. Most points wins.",
    ],
    variations: ["Everyone plays: whoever guesses first takes the next turn.", "Bonus point for guessing in under 15 seconds."],
  },
  grid: {
    need: ["The board", "The numbered question cards, face down in number order", "Ten markers of each color (cut out), or coins and buttons"],
    steps: [
      "Choose who goes first. On your turn, pick a square that nobody has claimed.",
      "Your opponent reads the question card with that square's number.",
      "Answer right and put your marker on the square. Answer wrong and the square stays open.",
      "Claim four squares in a row, across, down or corner to corner, to win. If every square is claimed without a row, the player with more squares wins.",
    ],
    variations: ["Play in two teams: the team talks before answering.", "Three in a row on the small board for younger players."],
  },
  quiz: {
    need: ["One answer sheet per team", "The host's question sheet", "Pens", "The scoreboard"],
    steps: [
      "The host reads each question twice. Teams write their answers on their sheet and keep quiet.",
      "After each round of ten, teams swap sheets with a neighbor and mark them while the host reads the answers.",
      "Write each team's round score on the scoreboard. Most points after the last round wins.",
      "Tie? The host asks a question with a number for an answer, and the closest team wins.",
    ],
    variations: ["Joker round: each team picks one round to score double.", "Play solo: one sheet each."],
  },
};

const STOP = new Set(("a an the and or of to in on at by for from with without is are was were be been being it its this that these those which who whom what whats when where why how as into onto than then there their theirs they them our ours we you your yours he she his her hers him i me my mine not no yes do does did done can could would should will may might must also very more most some any all each every one two three four five six seven eight nine ten first last big small part called name kind type something someone anything anyone thing things used use uses make makes made has have had " +
  "takes take taken took gets get got keeps keep kept looks look looked live lives lived follows follow goes go went comes come came gives give gave puts put says say said around between about after before over under through near far often usually always sometimes once like just really many much few lot lots way ways same other another such only even still well good").split(" "));

// "Don't say" words for Talk Around It: the most telling words of the clue.
export function forbiddenWords(a, b, max = 4) {
  const target = String(b).toLowerCase();
  const seen = new Set();
  const words = String(a).toLowerCase().replace(/[^\p{L}\p{N}\s'’-]/gu, " ").split(/\s+/)
    .map((w) => w.replace(/['’]s$/, "").replace(/^['’-]+|['’-]+$/g, ""))
    .filter((w) => w.length > 2 && !STOP.has(w) && !target.includes(w) && !w.includes(target) && !seen.has(w) && seen.add(w));
  return words.sort((x, y) => y.length - x.length).slice(0, max).map((w) => w.charAt(0).toUpperCase() + w.slice(1));
}

// ---------- shared drawing ----------

function cardGrid(P, cols = 3, rows = 3, cw = 180, ch = 252) {
  const gx = (P.w - cols * cw) / 2, gy = (P.h - rows * ch) / 2;
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ x: gx + c * cw, y: gy + r * ch, w: cw, h: ch, c, r });
  return { cells, gx, gy, cols, rows, cw, ch };
}

function cutMarks(ops, g, P) {
  const L = 10;
  for (let c = 0; c <= g.cols; c++) {
    const x = g.gx + c * g.cw;
    ops.push({ t: "line", x1: x, y1: Math.max(2, g.gy - L), x2: x, y2: g.gy - 2, stroke: CUT, lw: 0.6 });
    ops.push({ t: "line", x1: x, y1: g.gy + g.rows * g.ch + 2, x2: x, y2: Math.min(P.h - 2, g.gy + g.rows * g.ch + L), stroke: CUT, lw: 0.6 });
  }
  for (let r = 0; r <= g.rows; r++) {
    const y = g.gy + r * g.ch;
    ops.push({ t: "line", x1: Math.max(2, g.gx - L), y1: y, x2: g.gx - 2, y2: y, stroke: CUT, lw: 0.6 });
    ops.push({ t: "line", x1: g.gx + g.cols * g.cw + 2, y1: y, x2: Math.min(P.w - 2, g.gx + g.cols * g.cw + L), y2: y, stroke: CUT, lw: 0.6 });
  }
  for (const cell of g.cells) ops.push({ t: "rect", x: cell.x, y: cell.y, w: cell.w, h: cell.h, stroke: CUT, lw: 0.4, dash: [2, 3] });
}

function footer(ops, P, ctx, extra = "") {
  if (!ctx.credit) return;
  const s = `${extra ? extra + "  ·  " : ""}Made with Printable Game Maker · ${ctx.site}`;
  ops.push({ t: "text", s, x: P.w / 2, y: P.h - 9, font: "body", size: 6.5, color: MUTED, align: "center" });
}

// A card shell: rounded frame, colored top band with a label. Returns the content box.
function cardShell(ops, cell, th, label, { fill = "#fff", band = th.main, small = "" } = {}, ctx) {
  const x = cell.x + 7, y = cell.y + 7, w = cell.w - 14, h = cell.h - 14;
  ops.push({ t: "rect", x, y, w, h, r: 10, fill, stroke: band, lw: 2 });
  ops.push({ t: "path", d: [["M", x, y + 30], ["L", x, y + 10], ["Q", x, y, x + 10, y], ["L", x + w - 10, y], ["Q", x + w, y, x + w, y + 10], ["L", x + w, y + 30], ["Z"]], fill: band });
  ops.push({ t: "text", s: label, x: x + w / 2, y: y + 20, font: "display", size: 12.5, color: "#fff", align: "center" });
  if (ctx.credit) ops.push({ t: "text", s: ctx.siteShort, x: x + w / 2, y: y + h - 5, font: "body", size: 5, color: "#9AA0AA", align: "center" });
  if (small) ops.push({ t: "text", s: small, x: x + w - 8, y: y + h - 5, font: "bold", size: 6, color: "#9AA0AA", align: "right" });
  return { x: x + 9, y: y + 38, w: w - 18, h: h - 52 };
}

function answerStrip(ops, T, box, answer, th) {
  // The answer, upside down at the bottom of the card, so the reader can check it.
  const hgt = 34, y = box.y + box.h - hgt;
  ops.push({ t: "line", x1: box.x, y1: y - 4, x2: box.x + box.w, y2: y - 4, stroke: th.light, lw: 1, dash: [3, 3] });
  const inner = T.box(answer, box.x, y, box.w, hgt, { font: "bold", color: th.dark, maxSize: 13, minSize: 6 });
  ops.push({ t: "rot", cx: box.x + box.w / 2, cy: y + hgt / 2, deg: 180, ops: inner });
  return { ...box, h: box.h - hgt - 8 };
}

function rulesPage(P, T, ctx, game, th, title, extraNote) {
  const g = GAMES[game], R = RULES[game];
  const ops = [];
  const m = 44;
  ops.push({ t: "rect", x: 0, y: 0, w: P.w, h: 118, fill: th.main });
  ops.push({ t: "text", s: g.name, x: m, y: 62, font: "display", size: 38, color: "#fff" });
  ops.push(...T.box(title, m, 74, P.w - 2 * m, 30, { font: "bold", color: "#fff", align: "left", maxSize: 17, minSize: 9 }));
  let y = 146;
  const chips = [`Players: ${g.players}`, `Ages: ${g.ages}`, `Time: ${g.time}`];
  let x = m;
  for (const c of chips) {
    const w = T.width(c, "bold", 10.5) + 22;
    ops.push({ t: "rect", x, y: y - 15, w, h: 22, r: 11, fill: th.light });
    ops.push({ t: "text", s: c, x: x + 11, y: y, font: "bold", size: 10.5, color: th.dark });
    x += w + 8;
  }
  y += 30;
  const section = (head) => { ops.push({ t: "text", s: head, x: m, y, font: "display", size: 19, color: th.dark }); y += 23; };
  const para = (text, { bullet = "", size = 12.5, indent = 0 } = {}) => {
    const lines = T.wrap(text, "body", size, P.w - 2 * m - 18 - indent);
    lines.forEach((l, i) => {
      if (i === 0 && bullet) ops.push({ t: "text", s: bullet, x: m + indent, y, font: "bold", size, color: th.main });
      ops.push({ t: "text", s: l, x: m + 18 + indent, y, font: "body", size, color: INK });
      y += size * 1.38;
    });
    y += 4;
  };
  section("You need");
  for (const n of R.need) para(n, { bullet: "•" });
  y += 6;
  section(game === "match" ? "Three ways to play" : "How to play");
  R.steps.forEach((s, i) => para(s, { bullet: `${i + 1}.` }));
  y += 6;
  section("Make it easier or harder");
  for (const v of R.variations) para(v, { bullet: "•" });
  if (extraNote) { y += 6; section("Good to know"); para(extraNote); }
  ops.push({ t: "line", x1: m, y1: P.h - 54, x2: P.w - m, y2: P.h - 54, stroke: th.light, lw: 1 });
  ops.push({ t: "text", s: "Change the words, the topic or the colors, and print it again for free:", x: m, y: P.h - 36, font: "body", size: 9.5, color: MUTED });
  const url = ctx.siteUrl;
  ops.push({ t: "text", s: ctx.site, x: m, y: P.h - 22, font: "bold", size: 10, color: th.main });
  ops.push({ t: "link", x: m, y: P.h - 32, w: T.width(ctx.site, "bold", 10), h: 14, url });
  return { w: P.w, h: P.h, ops };
}

function shuffleSeeded(arr, seed) {
  return makeRng(seed).shuffle(arr);
}

// A printable die (cross-shaped net) with labels or pips.
function dieNet(ops, x, y, s, faces, th, T) {
  const pos = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
  const tabs = [];
  pos.forEach(([c, r], i) => {
    const fx = x + c * s, fy = y + r * s;
    ops.push({ t: "rect", x: fx, y: fy, w: s, h: s, fill: "#fff", stroke: INK, lw: 1.2 });
    const f = faces[i];
    if (typeof f === "number") {
      const P = { 1: [[0.5, 0.5]], 2: [[0.28, 0.28], [0.72, 0.72]], 3: [[0.28, 0.28], [0.5, 0.5], [0.72, 0.72]], 4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]], 5: [[0.28, 0.28], [0.72, 0.28], [0.5, 0.5], [0.28, 0.72], [0.72, 0.72]], 6: [[0.28, 0.25], [0.72, 0.25], [0.28, 0.5], [0.72, 0.5], [0.28, 0.75], [0.72, 0.75]] }[f];
      for (const [px, py] of P) ops.push({ t: "circle", cx: fx + px * s, cy: fy + py * s, r: s * 0.08, fill: INK });
    } else {
      ops.push({ t: "rect", x: fx + 6, y: fy + 6, w: s - 12, h: s - 12, r: 8, fill: f.color });
      ops.push(...T.box(f.label, fx + 8, fy + 8, s - 16, s - 16, { font: "display", color: "#fff", maxSize: 18, minSize: 8 }));
    }
  });
  // Glue tabs on the outer edges that need them.
  const tab = (x1, y1, x2, y2, nx, ny) => {
    const d = s * 0.18;
    tabs.push({ t: "path", d: [["M", x1, y1], ["L", x1 + nx * d + (x2 - x1) * 0.15, y1 + ny * d + (y2 - y1) * 0.15], ["L", x2 + nx * d - (x2 - x1) * 0.15, y2 + ny * d - (y2 - y1) * 0.15], ["L", x2, y2]], fill: "#F1F2F4", stroke: CUT, lw: 0.8, dash: [3, 2] });
  };
  tab(x + s, y, x + 2 * s, y, 0, -1);
  tab(x + 2 * s, y, x + 2 * s, y + s, 1, 0);
  tab(x, y + s, x, y + 2 * s, -1, 0);
  tab(x + s, y + 3 * s, x + 2 * s, y + 3 * s, 0, 1);
  tab(x + 2 * s, y + 2 * s, x + 2 * s, y + 3 * s, 1, 0);
  tab(x + 4 * s, y + s, x + 4 * s, y + 2 * s, 1, 0);
  ops.unshift(...tabs);
}

// ---------- the games ----------

function bingo(content, opts, ctx) {
  const { P, T, th, items, title } = ctx;
  const n = items.length;
  const size = opts.grid || (n >= 24 ? 5 : n >= 16 ? 4 : 3);
  const cells = size * size - (size === 5 ? 1 : 0);
  const count = Math.max(1, Math.min(60, opts.cards || 12));
  const pages = [rulesPage(P, T, ctx, "bingo", th, title, size === 5 ? "The center square is free." : `With ${n} words the cards use a ${size} × ${size} grid. Add more words for a bigger grid.`)];

  // Caller list
  const callerItems = shuffleSeeded(items.map((it, i) => ({ ...it, i })), ctx.seed + "caller");
  const perPage = 26;
  for (let p0 = 0; p0 < callerItems.length; p0 += perPage) {
    const ops = [];
    ops.push({ t: "text", s: "Caller list", x: 44, y: 58, font: "display", size: 26, color: th.main });
    ops.push({ t: "text", s: `${title} · read the clue, players cover the answer · tick each one as you call it`, x: 44, y: 78, font: "body", size: 9.5, color: MUTED });
    let y = 100;
    for (const it of callerItems.slice(p0, p0 + perPage)) {
      ops.push({ t: "rect", x: 44, y, w: 12, h: 12, r: 2, stroke: th.main, lw: 1.2 });
      const lines = T.wrap(it.a, "body", 10.5, 330);
      ops.push({ t: "text", s: lines.length > 2 ? lines.slice(0, 2).join(" ").slice(0, 120) + "…" : lines[0], x: 64, y: y + 10, font: "body", size: 10.5, color: INK });
      if (lines[1] && lines.length <= 2) ops.push({ t: "text", s: lines[1], x: 64, y: y + 22, font: "body", size: 10.5, color: INK });
      ops.push(...T.box(it.b, 410, y - 1, P.w - 454, 24, { font: "bold", color: th.dark, align: "right", maxSize: 10.5, minSize: 6 }));
      y += 25.5;
      ops.push({ t: "line", x1: 44, y1: y - 3, x2: P.w - 44, y2: y - 3, stroke: "#E6E8EC", lw: 0.6 });
    }
    footer(ops, P, ctx);
    pages.push({ w: P.w, h: P.h, ops });
  }

  // Cards: two per page.
  const used = new Set();
  const cardsData = [];
  for (let k = 0; k < count; k++) {
    let pick;
    for (let attempt = 0; attempt < 30; attempt++) {
      pick = shuffleSeeded(items.map((it, i) => i), `${ctx.seed}card${k}-${attempt}`).slice(0, Math.min(cells, n));
      const key = pick.slice().sort((a, b) => a - b).join(",") + "|" + pick.join(",");
      if (!used.has(key)) { used.add(key); break; }
    }
    cardsData.push(pick);
  }
  const cw = Math.min(P.w - 72, 540), cardH = (P.h - 60) / 2;
  for (let k = 0; k < count; k += 2) {
    const ops = [];
    for (let j = 0; j < 2 && k + j < count; j++) {
      const x0 = (P.w - cw) / 2, y0 = 26 + j * (cardH + 8);
      const head = 46;
      ops.push({ t: "rect", x: x0, y: y0, w: cw, h: cardH - 6, r: 14, fill: "#fff", stroke: th.main, lw: 2.5 });
      ops.push({ t: "path", d: [["M", x0, y0 + head], ["L", x0, y0 + 14], ["Q", x0, y0, x0 + 14, y0], ["L", x0 + cw - 14, y0], ["Q", x0 + cw, y0, x0 + cw, y0 + 14], ["L", x0 + cw, y0 + head], ["Z"]], fill: th.main });
      if (size === 5) {
        "BINGO".split("").forEach((L, i) => ops.push({ t: "text", s: L, x: x0 + 14 + ((cw - 28) / 5) * (i + 0.5), y: y0 + 34, font: "display", size: 27, color: "#fff", align: "center" }));
      } else {
        ops.push({ t: "text", s: "BINGO", x: x0 + cw / 2, y: y0 + 34, font: "display", size: 27, color: "#fff", align: "center" });
      }
      ops.push({ t: "text", s: `Card ${k + j + 1}`, x: x0 + cw - 14, y: y0 + head + 13, font: "bold", size: 8, color: MUTED, align: "right" });
      ops.push(...T.box(title, x0 + 14, y0 + head + 3, cw - 90, 13, { font: "bold", color: MUTED, align: "left", maxSize: 8, minSize: 6 }));
      const gx = x0 + 14, gy = y0 + head + 20, gw = cw - 28, gh = cardH - 6 - head - 34;
      const cwid = gw / size, chgt = gh / size;
      const pick = cardsData[k + j];
      let idx = 0;
      for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
        const x = gx + c * cwid, y = gy + r * chgt;
        const free = size === 5 && r === 2 && c === 2;
        ops.push({ t: "rect", x, y, w: cwid, h: chgt, fill: free ? th.light : "#fff", stroke: th.main, lw: 1.2 });
        if (free) {
          ops.push(...starPath(x + cwid / 2, y + chgt / 2 - 6, Math.min(cwid, chgt) * 0.2, th.accent));
          ops.push({ t: "text", s: "FREE", x: x + cwid / 2, y: y + chgt - 8, font: "display", size: 11, color: th.dark, align: "center" });
        } else {
          const it = items[pick[idx++ % pick.length]];
          ops.push(...T.box(it.b, x + 5, y + 4, cwid - 10, chgt - 8, { font: "bold", color: INK, maxSize: size === 3 ? 20 : 15, minSize: 6 }));
        }
      }
    }
    footer(ops, P, ctx);
    pages.push({ w: P.w, h: P.h, ops });
  }
  return pages;
}

function starPath(cx, cy, R, fill) {
  const d = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? R * 0.42 : R, a = -Math.PI / 2 + (i * Math.PI) / 5;
    d.push([i ? "L" : "M", cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  d.push(["Z"]);
  return [{ t: "path", d, fill, stroke: "#00000033", lw: 0.6 }];
}

function cardsPages(P, T, ctx, list, draw, perPage = 9) {
  const pages = [];
  const g = cardGrid(P);
  for (let i = 0; i < list.length; i += perPage) {
    const ops = [];
    cutMarks(ops, g, P);
    list.slice(i, i + perPage).forEach((item, j) => draw(ops, g.cells[j], item, i + j));
    footer(ops, P, ctx, `Cut along the dotted lines`);
    pages.push({ w: P.w, h: P.h, ops });
  }
  return pages;
}

function match(content, opts, ctx) {
  const { P, T, th, items, title } = ctx;
  const cards = [];
  items.forEach((it, i) => { cards.push({ kind: "clue", text: it.a, i }); cards.push({ kind: "answer", text: it.b, i }); });
  const pages = [rulesPage(P, T, ctx, "match", th, title, "Clue cards have a solid top band; answer cards have an outlined one, so a pair is always one of each.")];
  pages.push(...cardsPages(P, T, ctx, cards, (ops, cell, c) => {
    if (c.kind === "clue") {
      const b = cardShell(ops, cell, th, "CLUE", {}, ctx);
      ops.push(...T.box(c.text, b.x, b.y, b.w, b.h, { font: "body", color: INK, maxSize: 17, minSize: 7 }));
    } else {
      const x = cell.x + 7, y = cell.y + 7, w = cell.w - 14, h = cell.h - 14;
      ops.push({ t: "rect", x, y, w, h, r: 10, fill: th.light, stroke: th.main, lw: 2 });
      ops.push({ t: "rect", x: x + 8, y: y + 6, w: w - 16, h: 22, r: 8, fill: "#fff", stroke: th.main, lw: 1.2 });
      ops.push({ t: "text", s: "ANSWER", x: x + w / 2, y: y + 21, font: "display", size: 12.5, color: th.main, align: "center" });
      if (ctx.credit) ops.push({ t: "text", s: ctx.siteShort, x: x + w / 2, y: y + h - 5, font: "body", size: 5, color: "#9AA0AA", align: "center" });
      ops.push(...T.box(c.text, x + 10, y + 40, w - 20, h - 56, { font: "bold", color: th.dark, maxSize: 22, minSize: 7 }));
    }
  }));
  pages.push(answerKey(P, T, ctx, th, title, items.map((it) => [it.a, it.b]), "Answer key"));
  return pages;
}

function answerKey(P, T, ctx, th, title, rows, heading, numbered = true) {
  const ops = [];
  ops.push({ t: "text", s: heading, x: 44, y: 58, font: "display", size: 26, color: th.main });
  ops.push({ t: "text", s: title, x: 44, y: 78, font: "body", size: 10, color: MUTED });
  let y = 98;
  const size = rows.length > 30 ? 8.5 : 10;
  const step = rows.length > 30 ? 20.5 : 22.5;
  rows.forEach(([a, b], i) => {
    if (y > P.h - 40) return;
    if (numbered) ops.push(...T.box(String(i + 1), 40, y, 20, step - 2, { font: "bold", color: th.main, align: "right", maxSize: size, minSize: 6 }));
    ops.push(...T.box(a, 66, y, 300, step - 2, { font: "body", color: INK, align: "left", maxSize: size, minSize: 6 }));
    ops.push(...T.box(b, 376, y, P.w - 420, step - 2, { font: "bold", color: th.dark, align: "left", maxSize: size, minSize: 6 }));
    y += step;
    ops.push({ t: "line", x1: 44, y1: y - 2, x2: P.w - 44, y2: y - 2, stroke: "#E6E8EC", lw: 0.6 });
  });
  footer(ops, P, ctx);
  return { w: P.w, h: P.h, ops };
}

function questionCards(P, T, ctx, th, items, label, numbered = false) {
  return cardsPages(P, T, ctx, items, (ops, cell, it, i) => {
    let b = cardShell(ops, cell, th, numbered ? `${label} ${i + 1}` : label, {}, ctx);
    b = answerStrip(ops, T, b, `Answer: ${it.b}`, th);
    ops.push(...T.box(it.a, b.x, b.y, b.w, b.h, { font: "body", color: INK, maxSize: 16, minSize: 7 }));
  });
}

function summit(content, opts, ctx) {
  const { T, th, items, title } = ctx;
  const P = ctx.P;
  const L = { w: P.h, h: P.w }; // landscape board
  const ops = [];
  const sky = "#DDEFFA";
  ops.push({ t: "rect", x: 0, y: 0, w: L.w, h: L.h, fill: sky });
  // Mountains
  ops.push({ t: "path", d: [["M", -20, L.h], ["L", 150, 240], ["L", 250, 330], ["L", 430, 110], ["L", 560, 260], ["L", 650, 190], ["L", L.w + 20, L.h], ["Z"]], fill: "#C9D6DF" });
  ops.push({ t: "path", d: [["M", 390, 159], ["L", 430, 110], ["L", 470, 159], ["L", 452, 150], ["L", 437, 164], ["L", 420, 150], ["L", 405, 164], ["Z"]], fill: "#fff" });
  ops.push({ t: "path", d: [["M", -20, L.h], ["L", 120, 420], ["L", 300, 520], ["L", 480, 380], ["L", 640, 470], ["L", L.w + 20, 360], ["L", L.w + 20, L.h], ["Z"]], fill: "#B5D6B2" });
  // Clouds
  for (const [cx, cy, s] of [[120, 70, 1], [600, 60, 1.2], [700, 130, 0.8]]) {
    ops.push({ t: "circle", cx, cy, r: 16 * s, fill: "#fff" }, { t: "circle", cx: cx + 18 * s, cy: cy - 8 * s, r: 20 * s, fill: "#fff" }, { t: "circle", cx: cx + 40 * s, cy, r: 15 * s, fill: "#fff" });
  }
  // Title
  ops.push({ t: "rect", x: 470, y: 22, w: 300, h: 70, r: 14, fill: "#fff", stroke: th.main, lw: 2.5 });
  ops.push({ t: "text", s: "Summit Scramble", x: 620, y: 58, font: "display", size: 30, color: th.main, align: "center" });
  ops.push(...T.box(title, 482, 64, 276, 22, { font: "bold", color: MUTED, maxSize: 11, minSize: 6 }));

  // Trail: 36 spaces, four rows of nine, snaking up.
  const rowsY = [535, 420, 305, 190];
  const xs = Array.from({ length: 9 }, (_, i) => 135 + i * 68);
  const spaces = [];
  rowsY.forEach((y, r) => {
    const order = r % 2 ? xs.slice().reverse() : xs;
    order.forEach((x) => spaces.push({ x, y }));
  });
  const ropes = [[5, 14], [16, 25], [22, 31]]; // up (1-based)
  const slides = [[13, 6], [27, 20], [34, 26]]; // down
  const ropeAt = new Map(ropes.map(([a, b]) => [a, b])), slideAt = new Map(slides.map(([a, b]) => [a, b]));
  const isQ = (n) => !ropeAt.has(n) && !slideAt.has(n) && n % 3 === 2;
  // Trail line
  const trail = [["M", 60, 535]];
  spaces.forEach((s) => trail.push(["L", s.x, s.y]));
  trail.push(["L", 60, 175]);
  ops.push({ t: "path", d: trail, stroke: "#8A6F4E", lw: 10, cap: 1 });
  ops.push({ t: "path", d: trail, stroke: "#E9D8B8", lw: 6, dash: [1, 9] });
  // Rockslides (gray zigzag) and ropes (brown with knots)
  for (const [from, to] of slides) {
    const a = spaces[from - 1], b = spaces[to - 1];
    const d = [["M", a.x, a.y]];
    const steps = 7;
    for (let k = 1; k < steps; k++) {
      const t = k / steps, px = a.x + (b.x - a.x) * t, py = a.y + (b.y - a.y) * t;
      const nx = -(b.y - a.y), ny = b.x - a.x, len = Math.hypot(nx, ny);
      d.push(["L", px + ((k % 2 ? 10 : -10) * nx) / len, py + ((k % 2 ? 10 : -10) * ny) / len]);
    }
    d.push(["L", b.x, b.y]);
    ops.push({ t: "path", d, stroke: "#6B7280", lw: 6 }, { t: "path", d, stroke: "#B9BEC7", lw: 2.5 });
    ops.push({ t: "circle", cx: (a.x + b.x) / 2 + 6, cy: (a.y + b.y) / 2 + 8, r: 5, fill: "#8D939C" }, { t: "circle", cx: (a.x + b.x) / 2 - 8, cy: (a.y + b.y) / 2 - 2, r: 4, fill: "#8D939C" });
  }
  for (const [from, to] of ropes) {
    const a = spaces[from - 1], b = spaces[to - 1];
    const mx = (a.x + b.x) / 2 + 26, my = (a.y + b.y) / 2;
    const d = [["M", a.x, a.y], ["Q", mx, my, b.x, b.y]];
    ops.push({ t: "path", d, stroke: "#6B4423", lw: 7 }, { t: "path", d, stroke: "#C8955A", lw: 4, dash: [6, 4] });
    for (const t of [0.33, 0.66]) {
      const px = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * mx + t * t * b.x, py = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * my + t * t * b.y;
      ops.push({ t: "circle", cx: px, cy: py, r: 5, fill: "#6B4423" });
    }
  }
  // Spaces
  spaces.forEach((s, i) => {
    const n = i + 1;
    let fill = "#fff", stroke = th.dark, label = String(n), lc = INK, size = 11;
    if (isQ(n)) { fill = th.accent; label = "?"; size = 20; lc = th.dark; }
    if (ropeAt.has(n)) { fill = "#F4E3C9"; }
    if (slideAt.has(n)) { fill = "#E3E5E9"; }
    ops.push({ t: "circle", cx: s.x, cy: s.y, r: 23, fill, stroke, lw: 2 });
    ops.push({ t: "text", s: label, x: s.x, y: s.y + size * 0.36, font: label === "?" ? "display" : "bold", size, color: lc, align: "center" });
    if (label === "?") ops.push({ t: "text", s: String(n), x: s.x, y: s.y + 18, font: "bold", size: 6, color: th.dark, align: "center" });
    if (ropeAt.has(n)) ops.push({ t: "text", s: "ROPE", x: s.x, y: s.y + 18, font: "bold", size: 6, color: "#6B4423", align: "center" });
    if (slideAt.has(n)) ops.push({ t: "text", s: "SLIDE", x: s.x, y: s.y + 18, font: "bold", size: 6, color: "#4B5563", align: "center" });
  });
  // Base camp and summit
  ops.push({ t: "path", d: [["M", 28, 560], ["L", 60, 505], ["L", 92, 560], ["Z"]], fill: th.main, stroke: th.dark, lw: 2 });
  ops.push({ t: "path", d: [["M", 52, 560], ["L", 60, 540], ["L", 68, 560], ["Z"]], fill: th.dark });
  ops.push({ t: "text", s: "BASE CAMP", x: 60, y: 578, font: "display", size: 12, color: th.dark, align: "center" });
  ops.push({ t: "line", x1: 60, y1: 190, x2: 60, y2: 120, stroke: INK, lw: 3 });
  ops.push({ t: "path", d: [["M", 61, 121], ["L", 100, 134], ["L", 61, 147], ["Z"]], fill: th.accent, stroke: INK, lw: 1.2 });
  ops.push({ t: "path", d: [["M", 24, 205], ["L", 60, 168], ["L", 96, 205], ["Z"]], fill: "#fff", stroke: INK, lw: 1.5 });
  ops.push({ t: "text", s: "SUMMIT", x: 60, y: 224, font: "display", size: 14, color: th.dark, align: "center" });
  // Legend
  const lg = [["?", "Question: answer right, roll again", th.accent], ["", "Rope: climb up", "#F4E3C9"], ["", "Rockslide: slide down", "#E3E5E9"]];
  lg.forEach(([s, t, c], i) => {
    const x = 560 + (i === 0 ? 0 : 0), y = 110 + i * 22;
    ops.push({ t: "circle", cx: x, cy: y, r: 8, fill: c, stroke: th.dark, lw: 1 });
    if (s) ops.push({ t: "text", s, x, y: y + 4, font: "display", size: 10, color: th.dark, align: "center" });
    ops.push({ t: "text", s: t, x: x + 14, y: y + 4, font: "bold", size: 9.5, color: INK });
  });
  if (ctx.credit) ops.push({ t: "text", s: `Made with Printable Game Maker · ${ctx.site}`, x: L.w - 14, y: L.h - 8, font: "body", size: 6.5, color: MUTED, align: "right" });
  const board = { w: L.w, h: L.h, ops };

  // Climbers and die
  const pieces = [];
  pieces.push({ t: "text", s: "Climbers and die", x: 44, y: 58, font: "display", size: 26, color: th.main });
  pieces.push({ t: "text", s: "Cut out each climber, fold along the middle line and stand it up. Cut out the die, fold on the lines and tape the tabs.", x: 44, y: 78, font: "body", size: 9.5, color: MUTED });
  const colors = ["#D7263D", "#1F6FB2", "#2E7D4F", "#F2B134"];
  colors.forEach((col, i) => {
    const x = 60 + i * 130, y = 110, w = 90, h = 150;
    pieces.push({ t: "rect", x, y, w, h, fill: "#fff", stroke: CUT, lw: 1, dash: [3, 3] });
    pieces.push({ t: "line", x1: x, y1: y + h / 2, x2: x + w, y2: y + h / 2, stroke: CUT, lw: 1 });
    const climber = (cy, flip) => {
      const o = [];
      o.push({ t: "circle", cx: x + w / 2, cy: cy - 22, r: 10, fill: col, stroke: INK, lw: 1 });
      o.push({ t: "rect", x: x + w / 2 - 14, y: cy - 11, w: 28, h: 30, r: 8, fill: col, stroke: INK, lw: 1 });
      o.push({ t: "rect", x: x + w / 2 + 8, y: cy - 8, w: 12, h: 22, r: 4, fill: "#6B4423", stroke: INK, lw: 1 });
      o.push({ t: "text", s: `${i + 1}`, x: x + w / 2 - 2, y: cy + 9, font: "display", size: 13, color: "#fff", align: "center" });
      return flip ? [{ t: "rot", cx: x + w / 2, cy: cy, deg: 180, ops: o }] : o;
    };
    pieces.push(...climber(y + 45, true), ...climber(y + h - 30, false));
  });
  dieNet(pieces, 150, 330, 78, [1, 2, 3, 5, 4, 6], th, T); // opposite faces add up to 7
  footer(pieces, P, ctx);

  return [rulesPage(P, T, ctx, "summit", th, title, "Print the board on its own page in landscape. Spaces with ? send you to the question cards; the answer is printed upside down at the bottom of each card."),
    board, { w: P.w, h: P.h, ops: pieces }, ...questionCards(P, T, ctx, th, shuffleSeeded(items, ctx.seed + "q"), "QUESTION")];
}

function loop(content, opts, ctx) {
  const { P, T, th, items, title } = ctx;
  const order = shuffleSeeded(items.map((_, i) => i), ctx.seed + "loop");
  const chain = order.map((idx, k) => ({ have: items[idx].b, who: items[order[(k + 1) % order.length]].a, start: k === 0, n: k + 1 }));
  const deck = shuffleSeeded(chain, ctx.seed + "deal");
  const pages = [rulesPage(P, T, ctx, "loop", th, title, `There are ${chain.length} cards. Every card must be handed out, or the chain breaks.`)];
  pages.push(...cardsPages(P, T, ctx, deck, (ops, cell, c) => {
    const b = cardShell(ops, cell, th, c.start ? "START" : "I HAVE…", { band: c.start ? th.accent : th.main, small: `#${c.n}` }, ctx);
    if (c.start) for (const dx of [-34, 34]) ops.push(...starPath(cell.x + cell.w / 2 + dx, cell.y + 22, 6.5, "#fff"));
    const top = b.h * 0.42;
    if (c.start) ops.push({ t: "text", s: "I have…", x: b.x + b.w / 2, y: b.y + 8, font: "bold", size: 9, color: MUTED, align: "center" });
    ops.push(...T.box(c.have, b.x, b.y + (c.start ? 12 : 0), b.w, top - (c.start ? 12 : 0), { font: "bold", color: th.dark, maxSize: 20, minSize: 7 }));
    ops.push({ t: "rect", x: b.x - 2, y: b.y + top + 4, w: b.w + 4, h: b.h - top - 4, r: 8, fill: th.light });
    ops.push({ t: "text", s: "Who has…", x: b.x + b.w / 2, y: b.y + top + 18, font: "display", size: 11, color: th.main, align: "center" });
    ops.push(...T.box(c.who + "?", b.x + 4, b.y + top + 24, b.w - 8, b.h - top - 28, { font: "body", color: INK, maxSize: 13, minSize: 6 }));
  }));
  const lc = (t) => (/^(A|An|The|This|That|These|Those|What|Which|How|When|Where|Why|Who|Its|Their|Our|One|Two|Three)\b/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t);
  pages.push(answerKey(P, T, ctx, th, title, chain.map((c) => [`I have ${lc(c.have)}.`, `Who has ${lc(c.who)}?`]), "The order (card numbers)"));
  return pages;
}

function taboo(content, opts, ctx) {
  const { P, T, th, items, title } = ctx;
  const pages = [rulesPage(P, T, ctx, "taboo", th, title, "The “Don't say” words come from each clue, so the card matches what you've been learning. Cross one out and write your own if you like.")];
  pages.push(...cardsPages(P, T, ctx, shuffleSeeded(items, ctx.seed + "t"), (ops, cell, it) => {
    const b = cardShell(ops, cell, th, "TALK AROUND IT", {}, ctx);
    ops.push(...T.box(it.b, b.x, b.y, b.w, 56, { font: "display", color: th.dark, maxSize: 22, minSize: 8 }));
    ops.push({ t: "rect", x: b.x - 2, y: b.y + 64, w: b.w + 4, h: b.h - 64, r: 8, fill: "#FDECEA" });
    ops.push({ t: "text", s: "DON'T SAY", x: b.x + b.w / 2, y: b.y + 82, font: "display", size: 11, color: "#C0392B", align: "center" });
    const words = forbiddenWords(it.a, it.b);
    const list = words.length ? words : ["(no extra words)"];
    const slot = Math.min(26, (b.h - 96) / Math.max(4, list.length));
    list.forEach((w, i) => ops.push(...T.box(w, b.x + 6, b.y + 90 + i * slot, b.w - 12, slot, { font: "bold", color: INK, maxSize: 13, minSize: 6 })));
  }));
  return pages;
}

function ads(content, opts, ctx) {
  const { P, T, th, items, title } = ctx;
  const modes = { act: { label: "ACT", color: "#D7263D" }, draw: { label: "DRAW", color: "#1F6FB2" }, say: { label: "SAY", color: "#2E7D4F" } };
  const pages = [rulesPage(P, T, ctx, "ads", th, title)];
  pages.push(...cardsPages(P, T, ctx, shuffleSeeded(items, ctx.seed + "ads"), (ops, cell, it) => {
    const b = cardShell(ops, cell, th, "ACT · DRAW · SAY", {}, ctx);
    ops.push(...T.box(it.b, b.x, b.y + 6, b.w, b.h * 0.55, { font: "display", color: th.dark, maxSize: 24, minSize: 8 }));
    const hy = b.y + b.h * 0.62;
    ops.push({ t: "line", x1: b.x, y1: hy, x2: b.x + b.w, y2: hy, stroke: th.light, lw: 1, dash: [3, 3] });
    ops.push({ t: "text", s: "Hint, just for you:", x: b.x + b.w / 2, y: hy + 14, font: "bold", size: 7.5, color: MUTED, align: "center" });
    ops.push(...T.box(it.a, b.x, hy + 18, b.w, b.y + b.h - hy - 18, { font: "body", color: MUTED, maxSize: 10, minSize: 6 }));
  }));
  const ops = [];
  ops.push({ t: "text", s: "The action die", x: 44, y: 58, font: "display", size: 26, color: th.main });
  ops.push({ t: "text", s: "Cut around the outside, fold on every line, and tape or glue the tabs inside.", x: 44, y: 78, font: "body", size: 10, color: MUTED });
  dieNet(ops, 150, 140, 90, [modes.act, modes.draw, modes.say, modes.act, modes.draw, modes.say], th, T);
  footer(ops, P, ctx);
  pages.push({ w: P.w, h: P.h, ops });
  return pages;
}

function grid(content, opts, ctx) {
  const { P, T, th, items, title } = ctx;
  const size = items.length >= 16 ? 4 : 3;
  const qs = shuffleSeeded(items, ctx.seed + "grid").slice(0, size * size);
  const pages = [rulesPage(P, T, ctx, "grid", th, title, size === 4 ? "Four in a row wins." : `With ${items.length} questions the board is 3 × 3, so three in a row wins. Add more for the 4 × 4 board.`)];
  const ops = [];
  ops.push({ t: "rect", x: 0, y: 0, w: P.w, h: 104, fill: th.main });
  ops.push({ t: "text", s: "Claim the Grid", x: P.w / 2, y: 56, font: "display", size: 38, color: "#fff", align: "center" });
  ops.push(...T.box(title, 60, 66, P.w - 120, 26, { font: "bold", color: "#fff", maxSize: 14, minSize: 8 }));
  const S = Math.min(P.w - 90, P.h - 250), cell = S / size, gx = (P.w - S) / 2, gy = 140;
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
    const n = r * size + c + 1;
    ops.push({ t: "rect", x: gx + c * cell, y: gy + r * cell, w: cell, h: cell, fill: (r + c) % 2 ? th.light : "#fff", stroke: th.dark, lw: 2 });
    ops.push({ t: "text", s: String(n), x: gx + c * cell + cell / 2, y: gy + r * cell + cell / 2 + 16, font: "display", size: 44, color: th.main, align: "center" });
  }
  ops.push({ t: "text", s: size === 4 ? "Four in a row wins: across, down or corner to corner." : "Three in a row wins: across, down or corner to corner.", x: P.w / 2, y: gy + S + 32, font: "bold", size: 13, color: INK, align: "center" });
  footer(ops, P, ctx);
  pages.push({ w: P.w, h: P.h, ops });
  const mk = [];
  mk.push({ t: "text", s: "Markers", x: 44, y: 58, font: "display", size: 26, color: th.main });
  mk.push({ t: "text", s: "Cut out ten of each. Player one plays stars, player two plays circles.", x: 44, y: 78, font: "body", size: 10, color: MUTED });
  for (let i = 0; i < 20; i++) {
    const cx = 92 + (i % 5) * 107, cy = 150 + Math.floor(i / 5) * 120;
    mk.push({ t: "circle", cx, cy, r: 44, fill: "#fff", stroke: CUT, lw: 1, dash: [3, 3] });
    if (i < 10) mk.push(...starPath(cx, cy + 3, 34, th.accent));
    else mk.push({ t: "circle", cx, cy, r: 30, fill: th.main, stroke: INK, lw: 1 }, { t: "circle", cx, cy, r: 16, fill: "#fff" });
  }
  footer(mk, P, ctx);
  pages.push({ w: P.w, h: P.h, ops: mk });
  pages.push(...questionCards(P, T, ctx, th, qs, "SQUARE", true));
  return pages;
}

function quiz(content, opts, ctx) {
  const { P, T, th, items, title } = ctx;
  const rounds = [];
  for (let i = 0; i < items.length; i += 10) rounds.push(items.slice(i, i + 10));
  const pages = [rulesPage(P, T, ctx, "quiz", th, title, `${items.length} questions in ${rounds.length} round${rounds.length > 1 ? "s" : ""}. Print one answer sheet per team.`)];
  // Host sheets: up to two rounds per page.
  for (let r = 0; r < rounds.length; r += 2) {
    const ops = [];
    ops.push({ t: "text", s: "Host sheet", x: 44, y: 58, font: "display", size: 26, color: th.main });
    ops.push({ t: "text", s: `${title} · keep this one hidden`, x: 44, y: 78, font: "body", size: 10, color: MUTED });
    let y = 100;
    for (let k = r; k < Math.min(r + 2, rounds.length); k++) {
      ops.push({ t: "rect", x: 44, y, w: P.w - 88, h: 24, r: 6, fill: th.light });
      ops.push({ t: "text", s: `Round ${k + 1}`, x: 54, y: y + 17, font: "display", size: 14, color: th.dark });
      y += 32;
      rounds[k].forEach((it, j) => {
        ops.push(...T.box(`${j + 1}.`, 40, y - 1, 22, 28, { font: "bold", color: th.main, align: "right", maxSize: 10, minSize: 6.5 }));
        ops.push(...T.box(it.a, 68, y - 1, 330, 28, { font: "body", color: INK, align: "left", maxSize: 10, minSize: 6.5 }));
        ops.push(...T.box(it.b, 410, y - 1, P.w - 454, 28, { font: "bold", color: th.dark, align: "left", maxSize: 10, minSize: 6.5 }));
        y += 30;
      });
      y += 10;
    }
    footer(ops, P, ctx);
    pages.push({ w: P.w, h: P.h, ops });
  }
  // Team answer sheet
  const sheet = [];
  sheet.push({ t: "rect", x: 0, y: 0, w: P.w, h: 92, fill: th.main });
  sheet.push({ t: "text", s: "Quiz Night", x: 44, y: 50, font: "display", size: 30, color: "#fff" });
  sheet.push(...T.box(title, 44, 58, P.w - 88, 22, { font: "bold", color: "#fff", align: "left", maxSize: 12, minSize: 7 }));
  sheet.push({ t: "text", s: "Team name:", x: 44, y: 124, font: "bold", size: 13, color: INK });
  sheet.push({ t: "line", x1: 130, y1: 126, x2: P.w - 44, y2: 126, stroke: INK, lw: 1 });
  const colW = (P.w - 88 - 20) / 2;
  const perCol = 5;
  let rowsY = 150;
  for (let k = 0; k < Math.min(rounds.length, 4); k++) {
    const x0 = 44 + (k % 2) * (colW + 20), y0 = rowsY + Math.floor(k / 2) * 300;
    sheet.push({ t: "rect", x: x0, y: y0, w: colW, h: 284, r: 10, stroke: th.main, lw: 1.5 });
    sheet.push({ t: "text", s: `Round ${k + 1}`, x: x0 + 12, y: y0 + 22, font: "display", size: 14, color: th.dark });
    sheet.push({ t: "text", s: "Score:", x: x0 + colW - 70, y: y0 + 22, font: "bold", size: 10, color: MUTED });
    sheet.push({ t: "rect", x: x0 + colW - 34, y: y0 + 8, w: 24, h: 20, r: 4, stroke: th.main, lw: 1 });
    rounds[k].forEach((_, j) => {
      const ly = y0 + 50 + j * 23;
      sheet.push({ t: "text", s: `${j + 1}`, x: x0 + 22, y: ly, font: "bold", size: 10, color: th.main, align: "right" });
      sheet.push({ t: "line", x1: x0 + 30, y1: ly + 2, x2: x0 + colW - 12, y2: ly + 2, stroke: "#C9CDD4", lw: 0.8 });
    });
  }
  if (rounds.length > 4) sheet.push({ t: "text", s: "More rounds: use a second sheet.", x: P.w / 2, y: P.h - 24, font: "body", size: 9, color: MUTED, align: "center" });
  footer(sheet, P, ctx);
  pages.push({ w: P.w, h: P.h, ops: sheet });
  // Scoreboard
  const sb = [];
  sb.push({ t: "text", s: "Scoreboard", x: 44, y: 58, font: "display", size: 26, color: th.main });
  const cols = Math.min(rounds.length, 6) + 2;
  const tw = P.w - 88, cw0 = 150, cwr = (tw - cw0) / (cols - 1);
  const hdr = ["Team", ...rounds.slice(0, 6).map((_, k) => `R${k + 1}`), "Total"];
  hdr.forEach((h, i) => {
    const x = i === 0 ? 44 : 44 + cw0 + (i - 1) * cwr;
    sb.push({ t: "rect", x, y: 80, w: i === 0 ? cw0 : cwr, h: 30, fill: th.main, stroke: "#fff", lw: 1 });
    sb.push({ t: "text", s: h, x: x + (i === 0 ? cw0 : cwr) / 2, y: 100, font: "display", size: 13, color: "#fff", align: "center" });
  });
  for (let r = 0; r < 8; r++) for (let i = 0; i < hdr.length; i++) {
    const x = i === 0 ? 44 : 44 + cw0 + (i - 1) * cwr;
    sb.push({ t: "rect", x, y: 110 + r * 40, w: i === 0 ? cw0 : cwr, h: 40, fill: r % 2 ? th.light : "#fff", stroke: "#C9CDD4", lw: 0.8 });
  }
  footer(sb, P, ctx);
  pages.push({ w: P.w, h: P.h, ops: sb });
  return pages;
}

const BUILDERS = { bingo, match, summit, loop, taboo, ads, grid, quiz };

// Build every page of a game. content: { title, items: [{a,b}] }; opts: { paper, theme, cards, credit, seed, site, siteUrl }
export function buildGame(gameId, content, fonts, opts = {}) {
  const g = GAMES[gameId];
  if (!g) throw new Error("unknown game " + gameId);
  const items = (content.items || []).map((it) => ({ a: String(it.a ?? "").trim(), b: String(it.b ?? "").trim() })).filter((it) => it.a && it.b);
  if (items.length < g.min) throw new Error(`${g.name} needs at least ${g.min} clue-and-answer pairs (you have ${items.length}).`);
  const P = PAPER[opts.paper] || PAPER.letter;
  const th = THEMES[opts.theme] || THEMES[g.theme];
  const T = makeText(fonts);
  const site = opts.site || "printable game maker";
  const ctx = {
    P, T, th, items, title: String(content.title || "My game").slice(0, 80),
    seed: (opts.seed || "") + (content.title || "") + items.length,
    credit: opts.credit !== false, site, siteShort: opts.siteShort || site, siteUrl: opts.siteUrl || "https://" + site,
  };
  return BUILDERS[gameId](content, opts, ctx);
}

export function gameFits(gameId, n) {
  return n >= GAMES[gameId].min;
}
