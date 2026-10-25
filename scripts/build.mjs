// Build the static site into dist/: copy assets, render every page, write the published topic
// data, sitemap, robots, IndexNow key, a content manifest and the share-card jobs.
//   PGM_BASE_URL=https://owner.github.io/ai-board-game-maker node scripts/build.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { parseTTF } from "../src/assets/js/engine/ttf.js";
import { GAMES, RULES, buildGame } from "../src/assets/js/engine/games.js";
import { pageSvg } from "../src/assets/js/engine/layout.js";
import { PACKS, SUBJECTS } from "../src/content/packs.js";
import { GUIDE, ABOUT } from "../src/content/guides.js";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, process.env.PGM_OUT || "dist");
const BASE_URL = (process.env.PGM_BASE_URL || "http://127.0.0.1:4848/ai-board-game-maker").replace(/\/$/, "");
const BASE = new URL(BASE_URL + "/").pathname;
const TODAY = process.env.PGM_TODAY || new Date().toISOString().slice(0, 10);
const CONTENT_DATE = "2026-10-25";
const CFG = { base: BASE, site: BASE_URL, shop: process.env.PGM_SHOP_URL || "", support: process.env.PGM_SUPPORT_URL || "", goatcounter: process.env.PGM_GOATCOUNTER || "", repo: process.env.PGM_REPO || "theguysaccount/ai-board-game-maker" };
const SITE = "Printable Game Maker";
const L = (p = "") => BASE + p.replace(/^\//, "");
const ABS = (p = "") => BASE_URL + "/" + p.replace(/^\//, "");
const HOST = BASE_URL.replace(/^https?:\/\//, "");

const font = (f) => parseTTF(fs.readFileSync(path.join(SRC, "assets/fonts", f)));
const FONTS = { body: font("AtkinsonHyperlegible-Regular.ttf"), bold: font("AtkinsonHyperlegible-Bold.ttf"), display: font("LilitaOne-Regular.ttf") };

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
const hashOf = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);
const fileHash = (p) => hashOf(fs.readFileSync(p));
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    if (e.isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b);
  }
}

const published = PACKS.filter((p) => p.publish <= TODAY);
const pages = [];
const ogJobs = [];

const LOGO = `<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="10" width="36" height="46" rx="6" fill="#0F8B8D" transform="rotate(-10 24 33)"/><rect x="20" y="8" width="36" height="46" rx="6" fill="#D9622B" transform="rotate(8 38 31)"/><rect x="28" y="30" width="22" height="22" rx="5" fill="#fff" stroke="#1B1B1F" stroke-width="2.5"/><circle cx="34" cy="36" r="2.4" fill="#1B1B1F"/><circle cx="44" cy="46" r="2.4" fill="#1B1B1F"/><circle cx="39" cy="41" r="2.4" fill="#1B1B1F"/></svg>`;

function gamePages(gameId, pack, opts = {}) {
  return buildGame(gameId, { title: pack.title, items: pack.items.map(([a, b]) => ({ a, b })) }, FONTS, { credit: true, site: HOST, siteShort: HOST, siteUrl: BASE_URL, cards: 2, ...opts });
}
// A page thumbnail as inline SVG (fonts come from the site's @font-face rules).
const thumb = (page, title) => pageSvg(page, { title });
// The most telling page of each game for previews.
const SHOWCASE = { bingo: 2, match: 1, summit: 1, loop: 1, taboo: 1, ads: 1, grid: 1, quiz: 1 };

function layout(p) {
  const url = ABS(p.path);
  const og = ABS(p.og || "og/home.jpg");
  const css = L("assets/css/site.css") + "?v=" + fileHash(path.join(SRC, "assets/css/site.css"));
  const scripts = (p.scripts || []).map((s) => `<script type="module" src="${L(s)}?v=${fileHash(path.join(SRC, s))}"></script>`).join("");
  const gc = CFG.goatcounter ? `<script>if(navigator.doNotTrack!=="1"&&!navigator.globalPrivacyControl){var s=document.createElement("script");s.async=1;s.src="https://gc.zgo.at/count.js";s.dataset.goatcounter=${json(CFG.goatcounter)};document.head.appendChild(s);}</script>` : "";
  const nav = [["make/", "Make a game"], ["games/", "Games"], ["topics/", "Topics"], ["how-to-make-a-board-game/", "How-to"]];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
${p.noindex ? '<meta name="robots" content="noindex">' : ""}
<meta property="og:type" content="${p.ogType || "website"}">
<meta property="og:site_name" content="${SITE}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(p.ogAlt || "A printable game page")}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#d9622b">
<link rel="icon" href="${L("favicon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${L("apple-touch-icon.png")}">
<link rel="manifest" href="${L("site.webmanifest")}">
<link rel="stylesheet" href="${css}">
<script>window.PGM=${json({ base: CFG.base, site: CFG.site, shop: CFG.shop, support: CFG.support, goatcounter: CFG.goatcounter })};</script>
${gc}
${[].concat(p.schema || []).filter(Boolean).map((s) => `<script type="application/ld+json">${json(s)}</script>`).join("\n")}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head"><div class="wrap"><a class="brand" href="${L()}">${LOGO}<span>${SITE}</span></a>
<nav class="site-nav" aria-label="Main">${nav.map(([h, t]) => `<a href="${L(h)}"${p.path === h ? ' aria-current="page"' : ""}>${t}</a>`).join("")}</nav></div></header>
<main id="main">
${p.body}
</main>
<footer class="site-foot"><div class="wrap">
<nav aria-label="Footer"><a href="${L("games/")}">All games</a><a href="${L("topics/")}">All topics</a><a href="${L("play/?mode=caller")}">Bingo caller</a><a href="${L("about/")}">About and privacy</a><a href="https://github.com/${CFG.repo}">Source code</a>${CFG.support ? `<a href="${esc(CFG.support)}" rel="noopener">Support this free tool</a>` : ""}</nav>
<p>Free printable games. Nothing you type is uploaded. Every game here is an original design on a traditional public-domain game mechanic; not affiliated with any game publisher. Code and content are public domain (CC0); fonts are under the SIL Open Font License.</p>
</div></footer>
${scripts}
</body>
</html>
`;
}

const article = (p) => ({
  "@context": "https://schema.org", "@type": "Article", headline: p.h1, description: p.desc, datePublished: p.published || CONTENT_DATE, dateModified: p.updated || CONTENT_DATE,
  author: { "@type": "Organization", name: SITE, url: ABS() }, publisher: { "@type": "Organization", name: SITE, url: ABS(), logo: { "@type": "ImageObject", url: ABS("apple-touch-icon.png") } },
  mainEntityOfPage: ABS(p.path), image: ABS(p.og || "og/home.jpg"), inLanguage: "en",
});
const crumbs = (list) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: list.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: ABS(p) })) });
const crumbHtml = (list) => `<nav class="crumbs" aria-label="Breadcrumb">${list.map(([n, p], i) => (i < list.length - 1 ? `<a href="${L(p)}">${esc(n)}</a> › ` : `<span>${esc(n)}</span>`)).join("")}</nav>`;
const og = (file, title, sub, svg) => { ogJobs.push({ file, title, sub, svg }); return file; };

// ---------- pages ----------

function home() {
  const planets = PACKS.find((p) => p.id === "planets-solar-system");
  const board = gamePages("summit", planets)[1], bingoCard = gamePages("bingo", planets)[2];
  const games = Object.entries(GAMES).map(([id, g]) => {
    const pg = gamePages(id, planets)[SHOWCASE[id]];
    return `<a class="game-card" href="${L(`games/${id}/`)}"><div class="thumb">${thumb(pg, `${g.name} sample page`)}</div><h3>${esc(g.name)}</h3><p>${esc(g.short)}</p></a>`;
  }).join("");
  const bySubject = SUBJECTS.map((s) => {
    const list = published.filter((p) => p.subject === s);
    return list.length ? `<h3>${esc(s)}</h3><ul class="tag-list">${list.map((p) => `<li><a href="${L(`topics/${p.id}/`)}">${esc(p.title)}</a></li>`).join("")}</ul>` : "";
  }).join("");
  const faq = [
    ["Is it free?", "Yes. Every game, every topic and every PDF is free, with no sign-up and no watermark."],
    ["Can I use my own words?", "Yes. Type or paste any list of clues and answers: spelling words, a chapter's vocabulary, questions about the birthday girl. Every game works from the same list."],
    ["What do I need to print?", "Any home or school printer. Card stock makes sturdier cards. The PDFs are vector, so text stays sharp at any size, on US Letter or A4."],
    ["Can I play without printing?", "Two games run on screen: a bingo caller for the projector, and a memory match against the computer."],
    ["Are these copies of famous games?", "No. Every game is an original design with its own name and rules, built on traditional public-domain mechanics like bingo, matching pairs and roll-and-move."],
    ["Do you keep my lists?", "No. Your list stays in your browser. Share links carry the list inside the link itself; nothing is uploaded."],
  ];
  const body = `
<section class="hero"><div class="wrap">
  <div>
    <h1>Turn any word list into a printable game</h1>
    <p class="lead">Pick one of eight original games, start from a topic or type your own clues and answers, and download a print-ready PDF in a couple of minutes. For classrooms, parties and family game night. Free, no sign-up.</p>
    <div class="cta"><a class="btn big" href="${L("make/")}">Make a game</a><a class="btn secondary" href="${L("topics/")}">Browse ${published.length} topics</a></div>
    <p class="small muted">Bingo · Matching cards · A mountain-race board game · I Have, Who Has? · Word guessing · Act, draw or say · Four in a row · Quiz night</p>
  </div>
  <div class="hero-art">${thumb(bingoCard, "A printable bingo card")}${thumb(board, "A printable board game")}</div>
</div></section>
<section class="wrap">
  <h2>How it works</h2>
  <ol class="steps">
    <li class="card"><h3>Pick a game</h3><p>Eight original games built on classic mechanics: bingo, matching pairs, a roll-and-move race, loop cards, word guessing, charades and drawing, four in a row and a team quiz.</p></li>
    <li class="card"><h3>Add your words</h3><p>Start from a ready topic, or type or paste your own clue and answer pairs. One list feeds every game, so you can switch games in a click.</p></li>
    <li class="card"><h3>Print and play</h3><p>Download a print-ready PDF with rules, cards, boards, dice and answer keys. Or put the bingo caller on the big screen.</p></li>
  </ol>
</section>
<section class="wrap">
  <h2>The games</h2>
  <div class="game-grid">${games}</div>
</section>
<section class="wrap">
  <h2>Ready-made topics</h2>
  <p>Every topic works with every game. A new topic is added every week.</p>
  ${bySubject}
</section>
<section class="wrap narrow">
  <h2>Questions</h2>
  <dl class="faq">${faq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join("")}</dl>
  <p><a class="btn big" href="${L("make/")}">Make a game now</a></p>
</section>`;
  pages.push({
    path: "", title: "Printable Game Maker: free printable classroom and party games you can edit",
    ogTitle: "Printable Game Maker: turn any word list into a printable game",
    desc: "Make free printable games from any word list: bingo, matching cards, a board game, I Have Who Has, word guessing, charades and quiz sheets. Edit online, print the PDF.",
    body, og: og("og/home.jpg", "Turn any word list into a printable game", "Eight original games · free PDFs", thumb(board)), updated: CONTENT_DATE,
    schema: [
      { "@context": "https://schema.org", "@type": "WebSite", name: SITE, url: ABS() },
      { "@context": "https://schema.org", "@type": "WebApplication", name: SITE, url: ABS("make/"), applicationCategory: "EducationalApplication", operatingSystem: "Any (web browser)", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Make printable classroom and party games from any list of clues and answers." },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  });
}

function appPages() {
  pages.push({
    path: "make/", title: "Make a printable game from your own words",
    desc: "Pick a game, type or paste your clues and answers, preview every page and download a print-ready PDF. Bingo, matching cards, a board game and more.",
    body: `<div id="app"><div class="wrap app"><h1>Make a printable game</h1><p>Loading the editor… It needs JavaScript; nothing you type is uploaded.</p></div></div>`,
    scripts: ["assets/js/app/editor.js"], updated: CONTENT_DATE, og: "og/home.jpg",
  });
  pages.push({
    path: "play/", title: "Play on screen: bingo caller and memory match", noindex: true, sitemap: false,
    desc: "A bingo caller for the big screen and a memory match against the computer, using your own clue and answer list.",
    body: `<div id="app"><div class="wrap play"><h1>Play on screen</h1><p>Loading…</p></div></div>`,
    scripts: ["assets/js/app/play.js"],
  });
}

function gamesPages() {
  const planets = PACKS.find((p) => p.id === "planets-solar-system");
  const cards = Object.entries(GAMES).map(([id, g]) => `<a class="game-card" href="${L(`games/${id}/`)}"><div class="thumb">${thumb(gamePages(id, planets)[SHOWCASE[id]], `${g.name} sample page`)}</div><h3>${esc(g.name)}</h3><p>${esc(g.blurb)}</p></a>`).join("");
  pages.push({
    path: "games/", title: "Eight printable games you can fill with your own words", h1: "The games",
    desc: "Eight original printable games on classic mechanics: bingo, matching pairs, a roll-and-move board game, loop cards, word guessing, charades and drawing, four in a row and a team quiz.",
    body: `<div class="wrap article">${crumbHtml([["Home", ""], ["Games", "games/"]])}<h1>The games</h1><p class="lead narrow">Each game is an original design with its own rules, built on a traditional mechanic that has been played for generations. All eight use the same list of clues and answers, so one list gives you a week of activities.</p><div class="game-grid">${cards}</div></div>`,
    schema: [article({ path: "games/", h1: "The games", desc: "Eight printable games." }), crumbs([["Home", ""], ["Games", "games/"]])], updated: CONTENT_DATE,
  });
  const sample = { bingo: "spanish-greetings", match: "animal-classification", summit: "multiplication-6-9", loop: "fractions-decimals", taboo: "human-body", ads: "dinosaurs", grid: "europe-capitals", quiz: "literary-terms" };
  for (const [id, g] of Object.entries(GAMES)) {
    const pack = PACKS.find((p) => p.id === sample[id] && p.publish <= TODAY) || published[0];
    const pgs = gamePages(id, pack);
    const R = RULES[id];
    const good = published.filter((p) => p.items.length >= g.min).slice(0, 14);
    const title = `${g.name}: a free printable ${g.mechanic} game you can edit`;
    const ogFile = og(`og/game-${id}.jpg`, g.name, `Free printable ${g.mechanic} game`, thumb(pgs[SHOWCASE[id]]));
    pages.push({
      path: `games/${id}/`, title, h1: g.name,
      desc: `${g.name}: ${g.blurb} Free PDF with rules, ready-made topics or your own words. ${g.players} players, ages ${g.ages}.`.slice(0, 300),
      body: `<div class="wrap article">${crumbHtml([["Home", ""], ["Games", "games/"], [g.name, `games/${id}/`]])}
<div class="split"><div>
<h1>${esc(g.name)}</h1>
<p class="lead">${esc(g.blurb)}</p>
<div class="chips"><span class="chip-static">Players: ${esc(g.players)}</span><span class="chip-static">Ages ${esc(g.ages)}</span><span class="chip-static">${esc(g.time)}</span><span class="chip-static">Needs ${g.min}+ pairs</span></div>
<h2>What you need</h2><ul>${R.need.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
<h2>${id === "match" ? "Three ways to play" : "How to play"}</h2><ol>${R.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
<h2>Make it easier or harder</h2><ul>${R.variations.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
<h2>Sample pages</h2><p class="muted">From the “${esc(pack.title)}” topic. The PDF also includes the rules and any boards, dice or answer keys.</p>
<div class="thumbs">${pgs.slice(0, 4).map((pg, i) => thumb(pg, `${g.name} page ${i + 1}`)).join("")}</div>
<h2>Ready-made topics for ${esc(g.name)}</h2>
<ul class="tag-list">${good.map((p) => `<li><a href="${L(`make/?game=${id}&pack=${p.id}`)}">${esc(p.title)}</a></li>`).join("")}</ul>
</div>
<aside class="card"><h2 style="margin-top:0">Make your own</h2><p>Use a topic or type your own clues and answers. The PDF is ready in seconds.</p><a class="btn" href="${L(`make/?game=${id}`)}">Make ${esc(g.name)}</a>${id === "bingo" ? `<p class="small" style="margin-top:12px"><a href="${L("play/?mode=caller")}">Open the on-screen bingo caller</a></p>` : id === "match" ? `<p class="small" style="margin-top:12px"><a href="${L("play/?mode=memory")}">Play memory against the computer</a></p>` : ""}</aside>
</div></div>`,
      og: ogFile, ogType: "article", updated: CONTENT_DATE,
      schema: [article({ path: `games/${id}/`, h1: g.name, desc: g.blurb, og: ogFile }), crumbs([["Home", ""], ["Games", "games/"], [g.name, `games/${id}/`]])],
    });
  }
}

function topicPages() {
  const groups = SUBJECTS.map((s) => {
    const list = published.filter((p) => p.subject === s);
    return list.length ? `<h2>${esc(s)}</h2><table class="list"><tr><th></th><th>Topic</th><th>Level</th><th>Pairs</th></tr>${list.map((p, i) => `<tr><td>${i + 1}</td><td><a href="${L(`topics/${p.id}/`)}">${esc(p.title)}</a></td><td>${esc(p.level)}</td><td>${p.items.length}</td></tr>`).join("")}</table>` : "";
  }).join("");
  pages.push({
    path: "topics/", title: `${published.length} ready-made topics for printable classroom and party games`, h1: "Topics",
    desc: `${published.length} ready-made clue and answer lists for printable games: math facts, science, grammar, Spanish and French, geography, holidays and parties. A new topic every week.`,
    body: `<div class="wrap article narrow">${crumbHtml([["Home", ""], ["Topics", "topics/"]])}<h1>Topics</h1><p class="lead">Each topic is a checked list of clues and answers that works with all eight games. Open one to see the list, preview the games and download the PDFs, or load it in the editor and change anything you like.</p>${groups}</div>`,
    schema: [article({ path: "topics/", h1: "Topics", desc: "Ready-made topics." }), crumbs([["Home", ""], ["Topics", "topics/"]])],
    updated: published.map((p) => p.publish).sort().at(-1),
  });
  for (const p of published) {
    const sameSubject = published.filter((x) => x.subject === p.subject && x.id !== p.id).slice(0, 8);
    const show = ["bingo", "match", "summit"].filter((g) => p.items.length >= GAMES[g].min);
    const previews = show.map((g) => thumb(gamePages(g, p)[SHOWCASE[g]], `${GAMES[g].name}: ${p.title}`)).join("");
    const ogFile = og(`og/topic-${p.id}.jpg`, p.title, `${p.items.length} clues · printable bingo, cards and board game`, thumb(gamePages("bingo", p)[SHOWCASE.bingo]));
    pages.push({
      path: `topics/${p.id}/`, title: `${p.title}: printable bingo, matching cards and board game`, h1: p.title,
      desc: `${p.title} (${p.level}): ${p.items.length} clues and answers ready for printable bingo, matching cards, a board game, I Have Who Has and more. Free PDF, editable.`,
      body: `<div class="wrap article">${crumbHtml([["Home", ""], ["Topics", "topics/"], [p.title, `topics/${p.id}/`]])}
<div class="split"><div>
<h1>${esc(p.title)}</h1>
<div class="chips"><span class="chip-static">${esc(p.subject)}</span><span class="chip-static">${esc(p.level)}</span><span class="chip-static">${p.items.length} clues and answers</span></div>
<p class="lead">${esc(p.intro)}</p>
<h2>Games with this list</h2>
<div class="thumbs">${previews}</div>
<ul class="tag-list" style="margin-top:14px">${Object.entries(GAMES).filter(([, g]) => p.items.length >= g.min).map(([id, g]) => `<li><a href="${L(`make/?game=${id}&pack=${p.id}`)}">${esc(g.name)}</a></li>`).join("")}</ul>
<h2>The list</h2>
<table class="list"><tr><th></th><th>Clue</th><th>Answer</th></tr>${p.items.map(([a, b], i) => `<tr><td>${i + 1}</td><td>${esc(a)}</td><td><b>${esc(b)}</b></td></tr>`).join("")}</table>
${sameSubject.length ? `<h2>More ${esc(p.subject.toLowerCase())} topics</h2><ul class="tag-list">${sameSubject.map((x) => `<li><a href="${L(`topics/${x.id}/`)}">${esc(x.title)}</a></li>`).join("")}</ul>` : ""}
</div>
<aside class="card"><h2 style="margin-top:0">Print it</h2><p>Open this list in the editor, pick a game, change any word, and download the PDF.</p>
<a class="btn" href="${L(`make/?game=bingo&pack=${p.id}`)}">Make bingo cards</a>
<p style="margin-top:10px"><a class="btn secondary" href="${L(`make/?game=summit&pack=${p.id}`)}">Make the board game</a></p>
<p class="small" style="margin-top:10px"><a href="${L(`play/?mode=caller&pack=${p.id}`)}">Bingo caller on screen</a> · <a href="${L(`play/?mode=memory&pack=${p.id}`)}">Memory vs the computer</a></p></aside>
</div></div>`,
      og: ogFile, ogType: "article", published: p.publish, updated: p.publish,
      schema: [article({ path: `topics/${p.id}/`, h1: p.title, desc: p.intro.slice(0, 160), og: ogFile, published: p.publish, updated: p.publish }), crumbs([["Home", ""], ["Topics", "topics/"], [p.title, `topics/${p.id}/`]]),
        { "@context": "https://schema.org", "@type": "LearningResource", name: `${p.title} games`, educationalLevel: p.level, learningResourceType: "Game", isAccessibleForFree: true, url: ABS(`topics/${p.id}/`), inLanguage: "en" }],
    });
  }
}

function guidePages() {
  pages.push({
    path: "how-to-make-a-board-game/", title: "How to make your own board game or card game (printable, step by step)", h1: "How to make your own board game",
    desc: "Make a classroom or party board game in an afternoon: choose a mechanic, write good questions, playtest, then print and assemble it. With free printable templates.",
    body: `<div class="wrap article narrow">${crumbHtml([["Home", ""], ["How to make a board game", "how-to-make-a-board-game/"]])}<h1>How to make your own board game</h1>${GUIDE(L)}</div>`,
    schema: [article({ path: "how-to-make-a-board-game/", h1: "How to make your own board game", desc: "A step-by-step guide." }), crumbs([["Home", ""], ["How to make a board game", "how-to-make-a-board-game/"]])], updated: CONTENT_DATE, og: "og/home.jpg",
  });
  pages.push({
    path: "about/", title: "About Printable Game Maker: how it works, privacy and credits", h1: "About",
    desc: "How Printable Game Maker works, why nothing you type leaves your browser, how the games were designed, and credits.",
    body: `<div class="wrap article narrow">${crumbHtml([["Home", ""], ["About", "about/"]])}<h1>About Printable Game Maker</h1>${ABOUT(L, CFG)}</div>`,
    schema: [crumbs([["Home", ""], ["About", "about/"]])], updated: CONTENT_DATE, og: "og/home.jpg",
  });
}

function writeAll() {
  fs.rmSync(OUT, { recursive: true, force: true });
  copyDir(path.join(SRC, "assets"), path.join(OUT, "assets"));
  fs.mkdirSync(path.join(OUT, "assets/data"), { recursive: true });
  fs.writeFileSync(path.join(OUT, "assets/data/packs.json"), JSON.stringify(published.map(({ id, title, subject, level, items }) => ({ id, title, subject, level, items }))));
  home(); appPages(); gamesPages(); topicPages(); guidePages();
  const manifest = {};
  const titles = new Set();
  for (const p of pages) {
    if (titles.has(p.title)) throw new Error("duplicate title " + p.title);
    titles.add(p.title);
    const file = path.join(OUT, p.path, "index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, layout(p));
    if (p.sitemap !== false && !p.noindex) manifest[ABS(p.path)] = hashOf(p.body + p.title + p.desc);
  }
  fs.writeFileSync(path.join(OUT, "404.html"), layout({ path: "404.html", title: "Page not found · Printable Game Maker", desc: "This page does not exist.", noindex: true, body: `<div class="wrap narrow article"><h1>That page isn't here</h1><p>Try the <a href="${L()}">home page</a> or <a href="${L("make/")}">make a game</a>.</p></div>` }));
  const lastmod = Object.fromEntries(pages.map((p) => [ABS(p.path), p.updated || CONTENT_DATE]));
  const urls = Object.keys(manifest);
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${u}</loc><lastmod>${lastmod[u]}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: ${L("play/")}\n\nSitemap: ${ABS("sitemap.xml")}\n`);
  const key = fs.readFileSync(path.join(SRC, "indexnow-key.txt"), "utf8").trim();
  fs.writeFileSync(path.join(OUT, `${key}.txt`), key);
  fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify({ built: TODAY, pages: manifest }, null, 1));
  fs.writeFileSync(path.join(OUT, "favicon.svg"), LOGO.replace('aria-hidden="true"', 'xmlns="http://www.w3.org/2000/svg"'));
  fs.writeFileSync(path.join(OUT, "site.webmanifest"), JSON.stringify({ name: SITE, short_name: "Game Maker", start_url: L("make/"), display: "standalone", background_color: "#fffaf2", theme_color: "#d9622b", icons: [{ src: L("apple-touch-icon.png"), sizes: "180x180", type: "image/png" }, { src: L("favicon.svg"), sizes: "any", type: "image/svg+xml" }] }));
  fs.writeFileSync(path.join(OUT, "og-jobs.json"), JSON.stringify({ logo: LOGO, jobs: ogJobs }));
  console.log(`built ${pages.length} pages, ${ogJobs.length} share cards, ${published.length}/${PACKS.length} topics published (today ${TODAY}) → ${path.relative(ROOT, OUT)}/ for ${BASE_URL}`);
}

writeAll();
