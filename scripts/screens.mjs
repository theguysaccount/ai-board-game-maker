// Screenshots of the key screens at desktop (1280 px) and phone (390 px) widths → docs/screens/.
//   node scripts/screens.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { launch } from "./lib/chrome.mjs";
import { createServer } from "./serve.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "docs", "screens");
let base = process.argv[2], server;
if (!base) {
  const bp = JSON.parse(fs.readFileSync(path.join(ROOT, "dist", "make", "index.html"), "utf8").match(/window\.PGM=(\{.*?\});/)[1]).base;
  server = createServer(bp);
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  base = `http://127.0.0.1:${server.address().port}${bp.replace(/\/$/, "")}`;
}
base = base.replace(/\/$/, "");
fs.mkdirSync(OUT, { recursive: true });
const chrome = await launch();
try {
  for (const [label, w, h, mobile] of [["desktop", 1280, 900, false], ["phone", 390, 844, true]]) {
    const page = await chrome.newPage({ width: w, height: h, mobile, scale: 1 });
    const shot = async (name, url, prep, wait = 700) => {
      if (url) await page.goto(base + url, 500);
      if (prep) await page.eval(prep);
      await new Promise((r) => setTimeout(r, wait));
      await page.screenshot(path.join(OUT, `${name}-${label}.png`));
      console.log("saved", `${name}-${label}.png`);
    };
    await shot("home", "/");
    await shot("game-page", "/games/summit/");
    await shot("topic-page", "/topics/spanish-greetings/");
    await page.goto(base + "/make/", 300);
    await page.eval(`localStorage.clear()`);
    await shot("editor", "/make/?game=summit&pack=human-body", null, 1200);
    await shot("editor-bingo", "/make/?game=bingo&pack=christmas", mobile ? `window.scrollTo(0, document.querySelector(".previewcol").offsetTop - 10)` : null, 1200);
    await shot("bingo-caller", "/play/?mode=caller&pack=europe-capitals", `[...document.querySelectorAll("button")].find((b) => /Next clue/.test(b.textContent)).click()`);
    await shot("memory", "/play/?mode=memory&pack=animal-classification", `document.querySelectorAll(".mcard")[0].click(); document.querySelectorAll(".mcard")[3].click();`, 300);
    await page.close();
  }
} finally {
  await chrome.close();
  server?.close();
}
