// The game editor: pick a game, start from a topic or type your own clue → answer list, preview
// every page, and download a print-ready PDF. Everything happens in the browser.
import { h, CFG, toast, track, store, shareOrCopy, pageUrl, slug } from "./ui.js";
import { GAMES, THEMES, buildGame } from "../engine/games.js";
import { pageSvg, pagesPdf, PAPER } from "../engine/layout.js";
import { parsePairs, cleanContent, encodeGame, decodeGame, LIMITS } from "../engine/content.js";
import { loadFonts } from "./fonts.js";

const KEY = "pgm.draft.v1";
const root = document.getElementById("app");
let fonts = null;
let packs = [];
let S = null;
let pages = [];
let timer = 0;

const defaults = () => ({ game: "bingo", title: "", items: [], packId: "", options: { paper: "letter", theme: "", cards: 12, credit: true } });
const save = () => store.set(KEY, S);
const filled = () => S.items.filter((it) => it.a.trim() && it.b.trim());

async function init() {
  const params = new URLSearchParams(location.search);
  [fonts, packs] = await Promise.all([loadFonts(), fetch(CFG.base + "assets/data/packs.json").then((r) => r.json()).catch(() => [])]);
  S = Object.assign(defaults(), store.get(KEY) || {});
  S.options = Object.assign(defaults().options, S.options || {});
  const hash = location.hash.match(/^#g=(.+)$/);
  if (hash) {
    try {
      const g = await decodeGame(hash[1], GAMES, THEMES);
      S = { ...defaults(), game: g.game, title: g.title, items: g.items, options: g.options };
      toast("Opened a shared game. Edit it or download the PDF.");
      track("share_opened");
    } catch { toast("That game link is incomplete, so it could not be opened."); }
    history.replaceState(null, "", location.pathname + location.search);
  }
  if (params.get("game") && GAMES[params.get("game")]) S.game = params.get("game");
  const pack = packs.find((p) => p.id === params.get("pack"));
  if (pack) loadPack(pack, false);
  if (!S.items.length) loadPack(packs.find((p) => p.id === "planets-solar-system") || packs[0], false);
  save();
  render();
}

function loadPack(p, ask = true) {
  if (!p) return;
  // Only ask when the list holds the user's own words; an untouched topic is simply replaced.
  if (ask && filled().length && !S.packId && !confirm(`Replace your ${filled().length} pairs with “${p.title}”?`)) return false;
  S.title = p.title;
  S.items = p.items.map(([a, b]) => ({ a, b }));
  S.packId = p.id;
  return true;
}

function render() {
  const pairsBox = h("div", { class: "pairs" });
  const drawPairs = () => {
    pairsBox.replaceChildren(
      h("div", { class: "pair-head" }, h("span"), h("span", {}, "Clue or question"), h("span", {}, "Answer"), h("span")),
      ...S.items.map((it, i) => h("div", { class: "pair" },
        h("span", { class: "n" }, String(i + 1)),
        h("input", { type: "text", value: it.a, maxlength: LIMITS.field, "aria-label": `Clue ${i + 1}`, oninput: (e) => { it.a = e.target.value; S.packId = ""; changed(); } }),
        h("input", { type: "text", value: it.b, maxlength: LIMITS.field, "aria-label": `Answer ${i + 1}`, oninput: (e) => { it.b = e.target.value; S.packId = ""; changed(); } }),
        h("button", { type: "button", class: "icon-btn", "aria-label": `Remove pair ${i + 1}`, onclick: () => { S.items.splice(i, 1); drawPairs(); changed(); } }, "×"))));
  };
  drawPairs();

  const gamePicker = h("div", { class: "picker", role: "radiogroup", "aria-label": "Game" }, Object.entries(GAMES).map(([id, g]) => h("label", {},
    h("input", { type: "radio", name: "game", value: id, checked: S.game === id, onchange: () => { S.game = id; drawOptions(); changed(); track("game_" + id); } }),
    h("span", {}, h("b", {}, g.name), h("small", {}, g.short)))));

  const subjects = [...new Set(packs.map((p) => p.subject))];
  const packSelect = h("select", { "aria-label": "Start from a topic", onchange: (e) => {
    const p = packs.find((x) => x.id === e.target.value);
    if (p && loadPack(p) !== false) { titleIn.value = S.title; drawPairs(); changed(); track("pack_loaded"); }
    e.target.value = "";
  } }, h("option", { value: "" }, "Start from a topic…"), subjects.map((s) => h("optgroup", { label: s }, packs.filter((p) => p.subject === s).map((p) => h("option", { value: p.id }, `${p.title} (${p.items.length})`)))));
  const titleIn = h("input", { id: "title", type: "text", value: S.title, maxlength: LIMITS.title, placeholder: "e.g. Grandma's 80th birthday quiz", oninput: (e) => { S.title = e.target.value; changed(); } });
  const pasteBox = h("textarea", { rows: 6, placeholder: "One pair per line, clue and answer separated by a tab, “ - ” or “ = ”.\nThe largest planet - Jupiter\nCapital of France = Paris" });

  const optionsBox = h("div");
  const drawOptions = () => {
    optionsBox.replaceChildren(
      h("div", { class: "row" },
        h("div", { class: "field" }, h("label", { for: "paper" }, "Paper"),
          h("select", { id: "paper", onchange: (e) => { S.options.paper = e.target.value; changed(); } }, Object.entries(PAPER).map(([k, v]) => h("option", { value: k, selected: S.options.paper === k }, v.label)))),
        S.game === "bingo" ? h("div", { class: "field" }, h("label", { for: "cards" }, "Bingo cards"),
          h("input", { id: "cards", type: "number", min: 1, max: 60, value: S.options.cards, oninput: (e) => { S.options.cards = Math.max(1, Math.min(60, parseInt(e.target.value, 10) || 1)); changed(); } })) : null),
      h("div", { class: "field" }, h("label", {}, "Colors"),
        h("div", { class: "swatches", role: "radiogroup", "aria-label": "Colors" },
          [["", "Game default", "conic-gradient(#B8336A 0 25%, #1F6FB2 0 50%, #2E7D4F 0 75%, #D9622B 0)"], ...Object.entries(THEMES).map(([k, t]) => [k, t.label, t.main])].map(([k, label, bg]) =>
            h("label", { title: label }, h("input", { type: "radio", name: "theme", checked: S.options.theme === k, "aria-label": label, onchange: () => { S.options.theme = k; changed(); } }), h("span", { style: { background: bg } }))))),
      h("label", { class: "row small", style: { fontWeight: 400 } },
        h("input", { type: "checkbox", checked: S.options.credit !== false, style: { flex: "none", width: "22px", height: "22px" }, onchange: (e) => { S.options.credit = e.target.checked; changed(); } }),
        h("span", {}, "Small site link on each page and card (helps other teachers and families find this free tool)")));
  };
  drawOptions();

  const status = h("p", { class: "small muted", "aria-live": "polite" });
  const err = h("p", { class: "error", role: "alert", hidden: true });
  const thumbs = h("div", { class: "pages" });
  const bPdf = h("button", { type: "button", class: "btn" }, "Download the PDF");
  bPdf.onclick = async () => {
    if (!pages.length) return;
    const label = bPdf.textContent;
    bPdf.disabled = true; bPdf.textContent = "Making the PDF…";
    try {
      const pdf = await pagesPdf(pages, fonts, { title: `${S.title || "My game"}: ${GAMES[S.game].name}` });
      const a = h("a", { href: URL.createObjectURL(new Blob([pdf], { type: "application/pdf" })), download: `${slug(S.title || "my game")}-${slug(GAMES[S.game].name)}.pdf` });
      document.body.append(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
      track("pdf_download");
      track("pdf_" + S.game);
    } catch (e) { console.error(e); toast("Sorry, the PDF could not be made."); }
    bPdf.disabled = false; bPdf.textContent = label;
  };
  const bShare = h("button", { type: "button", class: "btn secondary", onclick: async () => {
    const url = pageUrl("make/") + "#g=" + await encodeGame(S);
    const r = await shareOrCopy({ title: S.title || "A printable game", text: `${GAMES[S.game].name}: ${S.title}`, url });
    if (r === "copied") toast("Link copied. It contains your whole list, so anyone with it can print the game.");
    track("share");
  } }, "Share a link");
  const bPlay = h("a", { class: "btn ghost", href: "#", onclick: async (e) => {
    e.preventDefault();
    const mode = S.game === "match" ? "memory" : "caller";
    location.href = pageUrl(`play/?mode=${mode}`) + "#g=" + await encodeGame(S);
  } }, "Play on screen");

  root.replaceChildren(h("div", { class: "wrap app" },
    h("h1", {}, "Make a printable game"),
    h("p", { class: "muted" }, "Pick a game, give it your words, download the PDF. Nothing is uploaded; your list is saved in this browser."),
    h("div", { class: "editor" },
      h("div", {},
        h("details", { class: "panel", open: true }, h("summary", {}, "1. Pick a game"), h("div", {}, gamePicker)),
        h("details", { class: "panel", open: true }, h("summary", {}, "2. Your words"), h("div", {},
          h("div", { class: "field" }, packSelect),
          h("div", { class: "field" }, h("label", { for: "title" }, "Title"), titleIn),
          pairsBox,
          h("div", { class: "row", style: { marginTop: "10px" } },
            h("button", { type: "button", class: "btn ghost small", onclick: () => { if (S.items.length >= LIMITS.items) return toast(`Up to ${LIMITS.items} pairs`); S.items.push({ a: "", b: "" }); drawPairs(); pairsBox.querySelector(".pair:last-child input")?.focus(); } }, "+ Add a pair"),
            h("button", { type: "button", class: "btn ghost small", onclick: () => { S.items = S.items.map((it) => ({ a: it.b, b: it.a })); S.packId = ""; drawPairs(); changed(); } }, "Swap clues and answers"),
            h("button", { type: "button", class: "btn ghost small", onclick: () => { if (!confirm("Clear the whole list?")) return; S.items = [{ a: "", b: "" }]; S.title = ""; titleIn.value = ""; S.packId = ""; drawPairs(); changed(); } }, "Clear")),
          h("details", { style: { marginTop: "12px" } }, h("summary", { class: "small" }, "Paste a list from a spreadsheet or document"),
            pasteBox,
            h("button", { type: "button", class: "btn small", style: { marginTop: "8px" }, onclick: () => {
              const got = parsePairs(pasteBox.value);
              if (!got.length) return toast("No pairs found. Put one clue and answer on each line.");
              // Pasting over an untouched ready-made topic replaces it; otherwise the pairs are added.
              const replace = filled().length === 0 || !!S.packId;
              S.items = (replace ? [] : S.items.filter((it) => it.a || it.b)).concat(got).slice(0, LIMITS.items);
              if (replace && S.packId) { S.title = ""; titleIn.value = ""; }
              S.packId = ""; pasteBox.value = ""; drawPairs(); changed();
              toast(`Added ${got.length} pairs`);
              track("pasted");
            } }, "Add these pairs")))),
        h("details", { class: "panel" }, h("summary", {}, "3. Options"), h("div", {}, optionsBox))),
      h("div", { class: "previewcol" },
        h("div", { class: "preview" },
          h("div", { class: "actions", style: { marginTop: 0, marginBottom: "10px" } }, bPdf, bShare, bPlay),
          status, err, thumbs,
          CFG.shop ? h("div", { class: "shop-slot", style: { marginTop: "12px" } }, h("p", { class: "small" }, h("b", {}, "Want a boxed copy? "), "Download the PDF, then upload it here:"), h("a", { class: "btn small", href: CFG.shop, target: "_blank", rel: "noopener" }, "Order a printed copy")) : null)))));

  function changed() {
    save();
    clearTimeout(timer);
    timer = setTimeout(preview, 250);
  }

  function preview() {
    const g = GAMES[S.game];
    const content = { title: S.title || "My game", items: filled() };
    try {
      pages = buildGame(S.game, content, fonts, { paper: S.options.paper, theme: S.options.theme || g.theme, cards: S.options.cards, credit: S.options.credit, site: CFG.site.replace(/^https?:\/\//, ""), siteShort: CFG.site.replace(/^https?:\/\//, ""), siteUrl: CFG.site });
      err.hidden = true;
      bPdf.disabled = false;
      status.textContent = `${g.name} · ${pages.length} pages · ${PAPER[S.options.paper].label} · ${content.items.length} pairs`;
      thumbs.replaceChildren(...pages.map((p, i) => h("button", { type: "button", "aria-label": `Page ${i + 1}, zoom in`, html: pageSvg(p, { title: `Page ${i + 1}` }), onclick: () => zoom(p) })));
    } catch (e) {
      pages = [];
      bPdf.disabled = true;
      err.hidden = false;
      err.textContent = e.message;
      thumbs.replaceChildren();
      status.textContent = "";
    }
  }
  preview();
}

function zoom(page) {
  const close = () => { box.remove(); removeEventListener("keydown", onKey); };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  const box = h("div", { class: "zoom", role: "dialog", "aria-label": "Page preview", onclick: (e) => { if (e.target === box) close(); } },
    h("button", { type: "button", class: "btn small close", onclick: close }, "Close"),
    h("div", { html: pageSvg(page) }));
  document.body.append(box);
  addEventListener("keydown", onKey);
  box.querySelector("button").focus();
}

addEventListener("hashchange", () => { if (/^#g=/.test(location.hash)) location.reload(); });
init();
