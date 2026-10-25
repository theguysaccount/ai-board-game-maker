// Draw the 1200 x 630 share cards listed in dist/og-jobs.json and the 180 x 180 touch icon with
// headless Chrome. Fonts are inlined so text renders exactly as on the site.
//   node scripts/og.mjs
import fs from "node:fs";
import path from "node:path";
import { launch } from "./lib/chrome.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIST = path.join(ROOT, process.env.PGM_OUT || "dist");
const { jobs, logo } = JSON.parse(fs.readFileSync(path.join(DIST, "og-jobs.json"), "utf8"));
const font = (fam, file) => `@font-face{font-family:'${fam}';src:url(data:font/ttf;base64,${fs.readFileSync(path.join(ROOT, "src/assets/fonts", file)).toString("base64")}) format('truetype');}`;
const fonts = font("PGM Body", "AtkinsonHyperlegible-Regular.ttf") + font("PGM Bold", "AtkinsonHyperlegible-Bold.ttf") + font("PGM Display", "LilitaOne-Regular.ttf");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const card = (j) => `<!doctype html><meta charset="utf-8"><style>${fonts}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:#FFFAF2;display:grid;grid-template-columns:560px 1fr;align-items:center;font-family:'PGM Body',sans-serif;color:#1B1B1F}
.art{height:630px;display:grid;place-items:center;background:#F6EFE2;overflow:hidden}
.art svg{width:${"${w}"};height:auto;max-height:560px;box-shadow:0 12px 34px rgba(40,30,10,.25);transform:rotate(-3deg);background:#fff}
.txt{padding:0 56px 0 44px}
.kicker{font:28px 'PGM Display';color:#D9622B;display:flex;gap:12px;align-items:center}
.kicker svg{width:46px;height:46px}
h1{font:${j.title.length > 36 ? 50 : 62}px/1.08 'PGM Display';margin:22px 0 18px}
p{font:30px/1.3 'PGM Body';margin:0;color:#5E6470}
</style><div class="art">${j.svg}</div><div class="txt"><div class="kicker">${logo}Printable Game Maker</div><h1>${esc(j.title)}</h1><p>${esc(j.sub)}</p></div>`;

const chrome = await launch();
try {
  const page = await chrome.newPage({ width: 1200, height: 630 });
  const tmp = path.join(DIST, "og-tmp.html");
  for (const j of jobs) {
    const landscape = /viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/.exec(j.svg);
    const wide = landscape && +landscape[1] > +landscape[2];
    fs.writeFileSync(tmp, card(j).replace("${w}", wide ? "520px" : "380px"));
    await page.goto("file://" + tmp, 100);
    await page.eval(`document.fonts.ready.then(() => true)`);
    await page.screenshot(path.join(DIST, j.file), { clip: { x: 0, y: 0, width: 1200, height: 630 } });
  }
  fs.writeFileSync(tmp, `<!doctype html><style>html,body{margin:0;background:#FFFAF2;width:180px;height:180px;display:grid;place-items:center}svg{width:150px;height:150px}</style>${logo}`);
  await page.viewport(180, 180);
  await page.goto("file://" + tmp, 80);
  await page.screenshot(path.join(DIST, "apple-touch-icon.png"), { clip: { x: 0, y: 0, width: 180, height: 180 } });
  fs.rmSync(tmp);
  fs.rmSync(path.join(DIST, "og-jobs.json"));
  console.log(`drew ${jobs.length} share cards and the touch icon`);
} finally {
  await chrome.close();
}
