// Game content: a title and clue → answer pairs. Parsing pasted lists, limits, and share links.
export const LIMITS = { title: 80, field: 140, items: 120 };

// Turn pasted text into pairs. One pair per line; the clue and answer are split on a tab, " | ",
// " = ", " - ", ";" or the last comma, whichever appears first in that order.
export function parsePairs(text) {
  const out = [];
  for (const raw of String(text || "").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    let a = line, b = "";
    for (const sep of ["\t", " | ", " = ", " – ", " - ", ";"]) {
      const i = line.indexOf(sep);
      if (i > 0) { a = line.slice(0, i); b = line.slice(i + sep.length); break; }
    }
    if (!b) {
      const i = line.lastIndexOf(",");
      if (i > 0) { a = line.slice(0, i); b = line.slice(i + 1); }
    }
    a = a.trim(); b = b.trim();
    if (a || b) out.push({ a: a.slice(0, LIMITS.field), b: b.slice(0, LIMITS.field) });
  }
  return out.slice(0, LIMITS.items);
}

export function cleanContent(c) {
  const str = (v, n) => (typeof v === "string" ? v : "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, n);
  const items = (Array.isArray(c?.items) ? c.items : []).slice(0, LIMITS.items)
    .map((it) => (Array.isArray(it) ? { a: it[0], b: it[1] } : it))
    .map((it) => ({ a: str(it?.a, LIMITS.field), b: str(it?.b, LIMITS.field) }));
  return { title: str(c?.title, LIMITS.title), items };
}

function b64url(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function unb64url(str) {
  const s = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}
async function pipe(bytes, stream) {
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
}

// Share links carry the whole game in the URL fragment (#g=...), which never reaches a server.
export async function encodeGame({ title, items, game, options }) {
  const json = JSON.stringify({ v: 1, t: title, i: items.map((it) => [it.a, it.b]), g: game, o: options || {} });
  const bytes = new TextEncoder().encode(json);
  if (typeof CompressionStream !== "undefined") {
    try { return "z" + b64url(await pipe(bytes, new CompressionStream("deflate-raw"))); } catch { /* fall back */ }
  }
  return "j" + b64url(bytes);
}

export async function decodeGame(token, games, themes) {
  if (!token || token.length > 20000) throw new Error("bad link");
  const body = unb64url(token.slice(1));
  const bytes = token[0] === "z" ? await pipe(body, new DecompressionStream("deflate-raw")) : token[0] === "j" ? body : null;
  if (!bytes) throw new Error("bad link");
  const o = JSON.parse(new TextDecoder().decode(bytes));
  if (!o || o.v !== 1) throw new Error("bad link");
  const c = cleanContent({ title: o.t, items: o.i });
  const opt = o.o && typeof o.o === "object" ? o.o : {};
  return {
    ...c,
    game: Object.prototype.hasOwnProperty.call(games, o.g) ? o.g : "bingo",
    options: {
      paper: opt.paper === "a4" ? "a4" : "letter",
      theme: Object.prototype.hasOwnProperty.call(themes, opt.theme) ? opt.theme : "",
      cards: Math.max(1, Math.min(60, parseInt(opt.cards, 10) || 12)),
      credit: opt.credit !== false,
    },
  };
}
