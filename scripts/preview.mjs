// Dev tool: build one game as a PDF and as SVG pages, and screenshot the SVG pages.
//   node scripts/preview.mjs <game> [pack] [out-dir]
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { parseTTF } from "../src/assets/js/engine/ttf.js";
import { buildGame } from "../src/assets/js/engine/games.js";
import { pageSvg, pagesPdf } from "../src/assets/js/engine/layout.js";

const [game = "bingo", packId = "", outDir = "/tmp"] = process.argv.slice(2);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const font = (f) => parseTTF(fs.readFileSync(path.join(ROOT, "src/assets/fonts", f)));
const fonts = { body: font("AtkinsonHyperlegible-Regular.ttf"), bold: font("AtkinsonHyperlegible-Bold.ttf"), display: font("LilitaOne-Regular.ttf") };
let content;
if (packId) {
  const { PACKS } = await import("../src/content/packs.js");
  const p = PACKS.find((x) => x.id === packId);
  content = { title: p.title, items: p.items.map(([a, b]) => ({ a, b })) };
} else {
  content = { title: "Planets and the solar system", items: [
    ["The planet closest to the Sun", "Mercury"], ["The hottest planet, wrapped in thick clouds", "Venus"], ["The planet we live on", "Earth"], ["The red planet", "Mars"],
    ["The largest planet in our solar system", "Jupiter"], ["The planet famous for its bright rings", "Saturn"], ["The planet that spins on its side", "Uranus"], ["The farthest planet from the Sun", "Neptune"],
    ["The star at the center of our solar system", "The Sun"], ["Earth's natural satellite", "The Moon"], ["A dwarf planet that was once called the ninth planet", "Pluto"], ["The path a planet follows around the Sun", "Orbit"],
    ["A ball of ice and dust with a glowing tail", "Comet"], ["A streak of light when a space rock burns up in the air", "Meteor"], ["A rocky object that orbits the Sun, often between Mars and Jupiter", "Asteroid"], ["The force that keeps the planets in orbit", "Gravity"],
    ["When the Moon blocks the Sun's light", "Solar eclipse"], ["A huge group of stars, like the Milky Way", "Galaxy"], ["A bowl-shaped hole made when something hits a planet or moon", "Crater"], ["A person trained to travel into space", "Astronaut"],
    ["A tool that makes faraway things look closer", "Telescope"], ["The time it takes Earth to orbit the Sun", "One year"], ["The time it takes Earth to spin once", "One day"], ["A group of stars that forms a picture in the sky", "Constellation"],
  ].map(([a, b]) => ({ a, b })) };
}
const pages = buildGame(game, content, fonts, { site: "theguysaccount.github.io/ai-board-game-maker", siteShort: "theguysaccount.github.io/ai-board-game-maker", cards: 4 });
const pdf = await pagesPdf(pages, fonts, { title: game });
fs.writeFileSync(path.join(outDir, `${game}.pdf`), pdf);
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'PGM Body';src:url(data:font/ttf;base64,${fs.readFileSync(path.join(ROOT, "src/assets/fonts/AtkinsonHyperlegible-Regular.ttf")).toString("base64")})}
@font-face{font-family:'PGM Bold';src:url(data:font/ttf;base64,${fs.readFileSync(path.join(ROOT, "src/assets/fonts/AtkinsonHyperlegible-Bold.ttf")).toString("base64")})}
@font-face{font-family:'PGM Display';src:url(data:font/ttf;base64,${fs.readFileSync(path.join(ROOT, "src/assets/fonts/LilitaOne-Regular.ttf")).toString("base64")})}
body{margin:0;background:#888;display:flex;flex-wrap:wrap;gap:8px;padding:8px}svg{background:#fff}</style>${pages.slice(0, 6).map((p) => pageSvg(p, { width: p.w > p.h ? 560 : 430 })).join("")}`;
const tmp = path.join(os.tmpdir(), `pv-${game}.html`);
fs.writeFileSync(tmp, html);
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=2000", `--screenshot=${path.join(outDir, game + ".png")}`, "--window-size=1340,1150", "file://" + tmp], { stdio: "ignore" });
console.log(game, pages.length, "pages", pdf.length, "bytes");
