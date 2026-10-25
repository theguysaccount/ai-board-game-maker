// Play on screen: a bingo caller for the projector, and a memory match against the computer.
import { h, CFG, toast, track, store, pageUrl } from "./ui.js";
import { GAMES, THEMES } from "../engine/games.js";
import { decodeGame } from "../engine/content.js";

const root = document.getElementById("app");

async function load() {
  const packId = new URLSearchParams(location.search).get("pack");
  if (packId) {
    const packs = await fetch(CFG.base + "assets/data/packs.json").then((r) => r.json()).catch(() => []);
    const p = packs.find((x) => x.id === packId);
    if (p) return { title: p.title, items: p.items.map(([a, b]) => ({ a, b })) };
  }
  const hash = location.hash.match(/^#g=(.+)$/);
  if (hash) {
    try { return await decodeGame(hash[1], GAMES, THEMES); } catch { toast("That link is incomplete; using your saved list instead."); }
  }
  const d = store.get("pgm.draft.v1");
  if (d && Array.isArray(d.items)) return { title: d.title, items: d.items, game: d.game };
  const packs = await fetch(CFG.base + "assets/data/packs.json").then((r) => r.json()).catch(() => []);
  const p = packs[0];
  return p ? { title: p.title, items: p.items.map(([a, b]) => ({ a, b })) } : { title: "", items: [] };
}

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

async function main() {
  const mode = new URLSearchParams(location.search).get("mode") === "memory" ? "memory" : "caller";
  const data = await load();
  const items = (data.items || []).filter((it) => it.a && it.b);
  if (items.length < 4) {
    root.replaceChildren(h("div", { class: "wrap narrow play" }, h("h1", {}, "Nothing to play yet"), h("p", {}, "Add at least four clue-and-answer pairs in the editor first."), h("a", { class: "btn", href: CFG.base + "make/" }, "Open the editor")));
    return;
  }
  track("play_" + mode);
  if (mode === "caller") caller(data.title, items); else memory(data.title, items);
}

function caller(title, items) {
  let order = shuffle(items), i = -1, shown = false;
  const clue = h("div", { class: "clue", "aria-live": "polite" }, "Press “Next clue” to start");
  const answer = h("div", { class: "answer" });
  const called = h("div", { class: "called" });
  const count = h("p", { class: "muted" });
  const next = () => {
    if (i >= order.length - 1) { clue.textContent = "That's every clue!"; answer.textContent = ""; return; }
    i++; shown = false;
    clue.textContent = order[i].a;
    answer.textContent = "";
    count.textContent = `Clue ${i + 1} of ${order.length}`;
    if (i > 0) called.prepend(h("span", {}, order[i - 1].b));
  };
  const reveal = () => { if (i >= 0) { shown = !shown; answer.textContent = shown ? order[i].b : ""; } };
  addEventListener("keydown", (e) => { if (e.key === " " || e.key === "ArrowRight") { e.preventDefault(); next(); } if (e.key === "a") reveal(); });
  root.replaceChildren(h("div", { class: "wrap play caller" },
    h("h1", {}, "Bingo caller"),
    h("p", { class: "muted" }, `${title || "Your list"} · put this on a big screen. Space or → for the next clue, A to show the answer.`),
    clue, answer, count,
    h("div", { class: "row", style: { justifyContent: "center", maxWidth: "560px", margin: "0 auto" } },
      h("button", { type: "button", class: "btn big", onclick: next }, "Next clue"),
      h("button", { type: "button", class: "btn secondary big", onclick: reveal }, "Show answer"),
      h("button", { type: "button", class: "btn ghost", onclick: () => { order = shuffle(items); i = -1; called.replaceChildren(); clue.textContent = "Shuffled. Press “Next clue”."; answer.textContent = ""; count.textContent = ""; } }, "Start over")),
    h("h2", { class: "small", style: { fontSize: "1.1rem" } }, "Already called"), called,
    h("p", { style: { marginTop: "30px" } }, h("a", { href: pageUrl("make/") }, "← Back to the editor to print bingo cards"))));
}

function memory(title, items) {
  const pairs = shuffle(items).slice(0, 10);
  let cards, up, found, scores, turn, busy, seen, level = "medium";
  const memoryChance = { easy: 0.3, medium: 0.6, hard: 0.9 };
  const grid = h("div", { class: "memory" });
  const scoreLine = h("div", { class: "scores", "aria-live": "polite" });
  const msg = h("p", { class: "center", "aria-live": "polite" });
  const reset = () => {
    cards = shuffle(pairs.flatMap((it, k) => [{ k, text: it.a, kind: "clue" }, { k, text: it.b, kind: "answer" }]));
    up = []; found = new Set(); scores = { you: 0, bot: 0 }; turn = "you"; busy = false; seen = new Map();
    draw(); msg.textContent = "Your turn: flip two cards to find a clue and its answer.";
  };
  const draw = () => {
    grid.replaceChildren(...cards.map((c, idx) => {
      const isUp = up.includes(idx) || found.has(idx);
      return h("button", { type: "button", class: "mcard" + (found.has(idx) ? " found" : isUp ? " up" : "") + (c.byBot && found.has(idx) ? " bot" : ""), disabled: isUp || busy || turn !== "you",
        "aria-label": isUp ? `${c.kind}: ${c.text}` : `Card ${idx + 1}, face down`, onclick: () => flip(idx) }, isUp ? c.text : "?");
    }));
    scoreLine.replaceChildren(h("span", {}, `You: ${scores.you}`), h("span", {}, `Computer: ${scores.bot}`));
  };
  const remember = (idx) => { if (Math.random() < memoryChance[level]) seen.set(idx, cards[idx].k); };
  const flip = (idx) => {
    if (busy || up.includes(idx) || found.has(idx)) return;
    up.push(idx); remember(idx); draw();
    if (up.length === 2) settle("you");
  };
  const settle = (who) => {
    const [x, y] = up;
    busy = true;
    if (cards[x].k === cards[y].k) {
      found.add(x); found.add(y); seen.delete(x); seen.delete(y);
      if (who === "bot") { cards[x].byBot = cards[y].byBot = true; }
      scores[who]++; up = []; busy = false;
      if (found.size === cards.length) return end();
      msg.textContent = who === "you" ? "A pair! Go again." : "The computer found a pair and goes again.";
      draw();
      if (who === "bot") setTimeout(botTurn, 900);
    } else {
      msg.textContent = who === "you" ? "Not a pair." : "The computer missed.";
      draw();
      setTimeout(() => {
        up = []; busy = false;
        turn = who === "you" ? "bot" : "you";
        draw();
        if (turn === "bot") { msg.textContent = "The computer's turn…"; setTimeout(botTurn, 700); } else msg.textContent = "Your turn.";
      }, 1300);
    }
  };
  const botTurn = () => {
    turn = "bot"; busy = false;
    const open = cards.map((_, i) => i).filter((i) => !found.has(i));
    // A remembered pair, if it knows one.
    const byK = new Map();
    for (const [i, k] of seen) if (!found.has(i)) { if (byK.has(k)) { up = [byK.get(k), i]; break; } byK.set(k, i); }
    if (up.length !== 2) {
      const first = open[Math.floor(Math.random() * open.length)];
      const known = [...seen].find(([i, k]) => k === cards[first].k && i !== first && !found.has(i));
      const rest = open.filter((i) => i !== first);
      up = [first, known ? known[0] : rest[Math.floor(Math.random() * rest.length)]];
    }
    up.forEach(remember);
    draw();
    setTimeout(() => settle("bot"), 1100);
  };
  const end = () => {
    draw();
    msg.textContent = scores.you > scores.bot ? `You win, ${scores.you} to ${scores.bot}!` : scores.you < scores.bot ? `The computer wins, ${scores.bot} to ${scores.you}. Rematch?` : `A tie, ${scores.you} each!`;
    track("memory_finished");
  };
  root.replaceChildren(h("div", { class: "wrap play" },
    h("h1", {}, "Match Up: memory"),
    h("p", { class: "muted" }, `${title || "Your list"} · find each clue and its answer. Play against the computer.`),
    h("div", { class: "row", style: { maxWidth: "520px" } },
      h("label", { class: "small", style: { flex: "none", margin: 0 } }, "Computer: "),
      h("select", { "aria-label": "Computer skill", onchange: (e) => { level = e.target.value; reset(); } }, ["easy", "medium", "hard"].map((l) => h("option", { value: l, selected: l === level }, l[0].toUpperCase() + l.slice(1)))),
      h("button", { type: "button", class: "btn ghost small", onclick: reset }, "New game")),
    scoreLine, msg, grid,
    h("p", { style: { marginTop: "26px" } }, h("a", { href: pageUrl("make/") + "?game=match" }, "← Print these as Match Up cards"))));
  reset();
}

main();
