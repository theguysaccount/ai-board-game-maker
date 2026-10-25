// Build the site into a temporary folder and check what search engines and visitors get.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { PACKS } from "../src/content/packs.js";
import { GAMES } from "../src/assets/js/engine/games.js";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), "pgm-build-"));
const BASE = "https://example.github.io/ai-board-game-maker";
const DAY = "2026-11-20";
let pages = [];

before(() => {
  execFileSync(process.execPath, ["scripts/build.mjs"], { cwd: ROOT, stdio: "pipe", env: { ...process.env, PGM_OUT: path.relative(ROOT, OUT), PGM_BASE_URL: BASE, PGM_TODAY: DAY } });
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  pages = walk(OUT).filter((f) => f.endsWith("index.html")).map((f) => ({ file: f, html: fs.readFileSync(f, "utf8") }));
});

test("a page for every game and every published topic, and none for the backlog", () => {
  const published = PACKS.filter((p) => p.publish <= DAY);
  assert.ok(published.length < PACKS.length);
  for (const p of PACKS) assert.equal(fs.existsSync(path.join(OUT, "topics", p.id, "index.html")), p.publish <= DAY, p.id);
  for (const g of Object.keys(GAMES)) assert.ok(fs.existsSync(path.join(OUT, "games", g, "index.html")), g);
  const data = JSON.parse(fs.readFileSync(path.join(OUT, "assets/data/packs.json"), "utf8"));
  assert.deepEqual(data.map((p) => p.id).sort(), published.map((p) => p.id).sort());
});

test("unique titles, descriptions, canonical URLs and share cards", () => {
  const titles = new Set(), descs = new Set();
  for (const { file, html } of pages) {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(title && title.length <= 110, `${file}: ${title}`);
    assert.ok(desc && desc.length >= 50 && desc.length <= 320, `${file}: description length ${desc?.length}`);
    assert.ok(canon?.startsWith(BASE + "/"), file);
    assert.ok(!titles.has(title), "duplicate title " + title);
    assert.ok(!descs.has(desc), "duplicate description " + desc);
    titles.add(title); descs.add(desc);
    assert.match(html, /<meta property="og:image" content="https:\/\/[^"]+\.jpg">/);
    for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) JSON.parse(m[1]);
  }
});

test("internal links and assets resolve", () => {
  for (const { file, html } of pages) {
    for (const m of html.matchAll(/(?:href|src)="(\/ai-board-game-maker\/[^"#?]*)/g)) {
      const rel = m[1].replace("/ai-board-game-maker/", "");
      if ((rel.startsWith("og/") && rel.endsWith(".jpg")) || rel === "apple-touch-icon.png") continue; // drawn by scripts/og.mjs
      let target = path.join(OUT, rel);
      if (rel === "" || rel.endsWith("/")) target = path.join(target, "index.html");
      assert.ok(fs.existsSync(target), `${path.relative(OUT, file)} links to missing ${m[1]}`);
    }
  }
});

test("sitemap, robots, IndexNow key and manifest agree", () => {
  const locs = [...fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length >= 40);
  assert.ok(!locs.some((u) => u.includes("/play/")));
  assert.match(fs.readFileSync(path.join(OUT, "robots.txt"), "utf8"), new RegExp(`Sitemap: ${BASE}/sitemap.xml`));
  const key = fs.readFileSync(path.join(ROOT, "src/indexnow-key.txt"), "utf8").trim();
  assert.match(key, /^[a-f0-9]{32}$/);
  assert.equal(fs.readFileSync(path.join(OUT, key + ".txt"), "utf8"), key);
  const manifest = JSON.parse(fs.readFileSync(path.join(OUT, "manifest.json"), "utf8"));
  assert.deepEqual(Object.keys(manifest.pages).sort(), locs.slice().sort());
});

test("topic pages show the whole list and link every game that fits", () => {
  const p = PACKS.find((x) => x.id === "europe-capitals");
  const html = fs.readFileSync(path.join(OUT, "topics", p.id, "index.html"), "utf8");
  for (const [a, b] of p.items) { assert.ok(html.includes(a), a); assert.ok(html.includes(b), b); }
  for (const g of Object.keys(GAMES)) assert.ok(html.includes(`make/?game=${g}&amp;pack=${p.id}`) || html.includes(`make/?game=${g}&pack=${p.id}`), g);
});

test("the editor and play pages load their scripts; play is not indexed", () => {
  const make = fs.readFileSync(path.join(OUT, "make/index.html"), "utf8");
  assert.match(make, /assets\/js\/app\/editor\.js\?v=/);
  assert.match(make, /window\.PGM=\{"base":"\/ai-board-game-maker\/"/);
  const play = fs.readFileSync(path.join(OUT, "play/index.html"), "utf8");
  assert.match(play, /<meta name="robots" content="noindex">/);
});
