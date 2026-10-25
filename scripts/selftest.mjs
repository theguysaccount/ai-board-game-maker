// End-to-end self-test in headless Chrome against the built site (dist/):
//  1. every sitemap page loads with an h1, no console errors and no sideways scroll on a phone;
//  2. the editor builds every game, takes a pasted list, refuses a too-short list, and makes PDFs;
//  3. share links reopen the same game; the bingo caller and memory match run;
//  4. sample PDFs are checked by independent tools (qpdf, pdftoppm or macOS sips when present) and
//     saved, with rendered first pages, to selftest-out/.
// Exits non-zero on any failure, so the deploy stops and the live site stays as it was.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { launch } from "./lib/chrome.mjs";
import { createServer } from "./serve.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIST = path.join(ROOT, process.env.PGM_OUT || "dist");
const OUTDIR = path.join(ROOT, "selftest-out");
const BASE_PATH = JSON.parse(fs.readFileSync(path.join(DIST, "make", "index.html"), "utf8").match(/window\.PGM=(\{.*?\});/)[1]).base;
const failures = [];
const check = (ok, msg) => { if (!ok) { failures.push(msg); console.log("  FAIL", msg); } else console.log("  ok  ", msg); };
const has = (cmd) => { try { execFileSync("which", [cmd], { stdio: "ignore" }); return true; } catch { return false; } };

const server = createServer(BASE_PATH);
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const ORIGIN = `http://127.0.0.1:${server.address().port}`;
const local = (u) => { const x = new URL(u); return ORIGIN + BASE_PATH + x.pathname.slice(BASE_PATH.length) + x.search + x.hash; };
fs.rmSync(OUTDIR, { recursive: true, force: true });
fs.mkdirSync(OUTDIR, { recursive: true });

const chrome = await launch();
try {
  console.log("pages");
  const urls = [...fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => local(m[1]));
  check(urls.length >= 40, `sitemap lists ${urls.length} pages`);
  const desk = await chrome.newPage({ width: 1280, height: 900 });
  const phone = await chrome.newPage({ width: 390, height: 844, mobile: true, scale: 2 });
  let bad = 0;
  for (const u of urls) {
    const res = await fetch(u);
    if (res.status !== 200) { bad++; check(false, `${res.status} ${u}`); }
    for (const [name, pg] of [["desktop", desk], ["phone", phone]]) {
      const before = pg.errors.length;
      await pg.goto(u, 120);
      const h1 = await pg.eval(`document.querySelector("h1")?.textContent || ""`);
      const overflow = await pg.eval(`document.documentElement.scrollWidth - innerWidth`);
      if (!h1 || overflow > 2 || pg.errors.length > before) { bad++; check(false, `${name} ${u.replace(ORIGIN, "")}: h1="${h1.slice(0, 30)}" overflow=${overflow} ${pg.errors.slice(before).join(" | ")}`); }
    }
  }
  check(bad === 0, `${urls.length} pages load on desktop and phone with an h1, no errors and no sideways scroll`);

  console.log("editor");
  const ed = phone;
  await ed.goto(ORIGIN + BASE_PATH + "make/", 200);
  await ed.eval(`localStorage.clear()`);
  await ed.goto(ORIGIN + BASE_PATH + "make/?game=bingo&pack=planets-solar-system", 300);
  await ed.waitFor(`document.querySelectorAll(".preview .pages svg").length > 2`);
  check(/Clue Bingo · \d+ pages/.test(await ed.eval(`document.querySelector(".preview p.small").textContent`)), "editor previews a bingo game from a topic link");
  const games = ["bingo", "match", "summit", "loop", "taboo", "ads", "grid", "quiz"];
  for (const g of games) {
    await ed.eval(`document.querySelector('input[name=game][value="${g}"]').click()`);
    await new Promise((r) => setTimeout(r, 450));
    const ok = await ed.eval(`document.querySelector(".error").hidden && document.querySelectorAll(".preview .pages svg").length >= 2`);
    check(ok, `editor previews ${g}`);
  }
  const pdfs = await ed.eval(`(async () => {
    const { pagesPdf } = await import("${BASE_PATH}assets/js/engine/layout.js");
    const { buildGame, GAMES } = await import("${BASE_PATH}assets/js/engine/games.js");
    const { loadFonts } = await import("${BASE_PATH}assets/js/app/fonts.js");
    const fonts = await loadFonts();
    const packs = await (await fetch("${BASE_PATH}assets/data/packs.json")).json();
    const week = Math.floor(Date.now() / 6048e5);
    const pack = packs[week % packs.length];
    const out = {};
    for (const g of Object.keys(GAMES)) {
      if (pack.items.length < GAMES[g].min) continue;
      const pages = buildGame(g, { title: pack.title, items: pack.items.map(([a, b]) => ({ a, b })) }, fonts, { site: "selftest", cards: 4, paper: g === "summit" ? "a4" : "letter" });
      const bytes = await pagesPdf(pages, fonts, { title: pack.title });
      let bin = ""; for (let i = 0; i < bytes.length; i += 32768) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 32768));
      out[g] = { pages: pages.length, b64: btoa(bin) };
    }
    return { pack: pack.id, out };
  })()`);
  console.log(`  sample topic this week: ${pdfs.pack}`);
  for (const [g, r] of Object.entries(pdfs.out)) {
    const buf = Buffer.from(r.b64, "base64");
    const file = path.join(OUTDIR, `${g}.pdf`);
    fs.writeFileSync(file, buf);
    const text = buf.toString("latin1");
    const sx = +text.match(/startxref\n(\d+)/)[1];
    const pageCount = +(text.match(/\/Type \/Pages \/Kids \[[^\]]*\] \/Count (\d+)/) || [])[1];
    check(text.startsWith("%PDF-1.7") && text.slice(sx, sx + 4) === "xref" && pageCount === r.pages, `${g}.pdf: ${r.pages} pages, ${buf.length} bytes, valid cross-reference`);
    if (has("qpdf")) {
      try { execFileSync("qpdf", ["--check", file], { stdio: "pipe" }); check(true, `${g}.pdf passes qpdf --check`); }
      catch (e) { check(false, `${g}.pdf fails qpdf --check: ${String(e.stdout || e.message).slice(0, 300)}`); }
    }
    const png = path.join(OUTDIR, `${g}-page1.png`);
    try {
      if (has("pdftoppm")) execFileSync("pdftoppm", ["-png", "-r", "60", "-f", "1", "-l", "1", "-singlefile", file, png.replace(/\.png$/, "")], { stdio: "pipe" });
      else if (has("sips")) execFileSync("sips", ["-s", "format", "png", file, "--out", png], { stdio: "pipe" });
      if (fs.existsSync(png)) check(fs.statSync(png).size > 8000, `${g}.pdf renders (page 1 → ${fs.statSync(png).size} bytes PNG)`);
    } catch (e) { check(false, `${g}.pdf would not render: ${String(e.stderr || e.message).slice(0, 200)}`); }
  }

  // Switch topics through the topic menu: an untouched topic is replaced without a prompt.
  await ed.eval(`(async () => { const sel = document.querySelector('select[aria-label="Start from a topic"]'); sel.value = "europe-capitals"; sel.dispatchEvent(new Event("change", { bubbles: true })); await new Promise((r) => setTimeout(r, 450)); })()`);
  check((await ed.eval(`document.querySelector("#title").value`)) === "Capitals of Europe" && /24 pairs/.test(await ed.eval(`document.querySelector(".preview p.small").textContent`)), "choosing a topic from the menu loads it");

  // Paste a list, then a too-short list
  await ed.eval(`(async () => {
    const det = [...document.querySelectorAll("details summary")].find((s) => /Paste a list/.test(s.textContent)).parentElement; det.open = true;
    det.querySelector("textarea").value = "Her hometown\\tSavannah\\nFavorite dessert - Peach cobbler\\nYear she married = 1962\\nFirst car; Ford Falcon\\nGrandchildren, 9\\nFavorite song\\tMoon River\\nFirst dog - Biscuit\\nWhere they met = A dance hall\\nSecret ingredient\\tNutmeg\\nFavorite color - Green";
    [...det.querySelectorAll("button")].find((b) => /Add these/.test(b.textContent)).click();
    await new Promise((r) => setTimeout(r, 50));
    document.querySelector('input[name=game][value="bingo"]').click();
    await new Promise((r) => setTimeout(r, 500));
  })()`);
  check(/10 pairs/.test(await ed.eval(`document.querySelector(".preview p.small").textContent`)), "a pasted list replaces the sample topic (10 pairs)");
  await ed.eval(`(async () => { for (let i = 0; i < 6; i++) document.querySelector(".pair:last-child .icon-btn").click(); await new Promise((r) => setTimeout(r, 500)); })()`);
  check(await ed.eval(`!document.querySelector(".error").hidden && /needs at least 9/.test(document.querySelector(".error").textContent) && document.querySelector(".preview .btn").disabled`), "a too-short list shows why and disables the download");
  await ed.screenshot(path.join(OUTDIR, "phone-editor.png"));

  console.log("share and play");
  const token = await ed.eval(`(async () => { const c = await import("${BASE_PATH}assets/js/engine/content.js"); return c.encodeGame({ title: "Shared quiz", items: Array.from({ length: 12 }, (_, i) => ({ a: "Question " + i, b: "Answer " + i })), game: "summit", options: { paper: "a4" } }); })()`);
  const sh = await chrome.newPage({ width: 1280, height: 900 });
  await sh.goto(ORIGIN + BASE_PATH + "make/#g=" + token, 400);
  await sh.waitFor(`document.querySelectorAll(".preview .pages svg").length > 2`);
  check(/Summit Scramble · \d+ pages · A4 · 12 pairs/.test(await sh.eval(`document.querySelector(".preview p.small").textContent`)), "a share link reopens the same game, paper and list");
  await sh.goto(ORIGIN + BASE_PATH + "play/?mode=caller&pack=spanish-greetings", 400);
  await sh.eval(`[...document.querySelectorAll("button")].find((b) => /Next clue/.test(b.textContent)).click(); [...document.querySelectorAll("button")].find((b) => /Show answer/.test(b.textContent)).click();`);
  check(/Clue 1 of 24/.test(await sh.eval(`document.body.textContent`)) && (await sh.eval(`document.querySelector(".answer").textContent`)).length > 0, "bingo caller shows a clue and its answer");
  await sh.goto(ORIGIN + BASE_PATH + "play/?mode=memory&pack=plants", 400);
  await sh.eval(`document.querySelectorAll(".mcard")[0].click(); document.querySelectorAll(".mcard")[1].click();`);
  await new Promise((r) => setTimeout(r, 200));
  check((await sh.eval(`document.querySelectorAll(".mcard.up, .mcard.found").length`)) >= 2, "memory match flips cards");
  await sh.screenshot(path.join(OUTDIR, "desktop-memory.png"));
  check(!desk.errors.length && !phone.errors.length && !sh.errors.length, "no console errors anywhere " + [...desk.errors, ...phone.errors, ...sh.errors].join(" | "));
} catch (e) {
  failures.push("crashed: " + (e.stack || e));
  console.error(e);
} finally {
  await chrome.close();
  server.close();
}

fs.writeFileSync(path.join(OUTDIR, "report.txt"), failures.length ? "FAILED\n" + failures.join("\n") + "\n" : "PASSED\n");
if (failures.length) { console.error(`\nself-test FAILED (${failures.length}):\n - ` + failures.join("\n - ")); process.exit(1); }
console.log("\nself-test passed");
