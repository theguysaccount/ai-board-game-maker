// Display lists: every game builds pages of simple drawing ops, which render to SVG (preview)
// and to PDF (print) from the same layout. Units are points, origin top-left.
//
// ops: { t: "rect", x, y, w, h, fill, stroke, lw, r, dash }
//      { t: "line", x1, y1, x2, y2, stroke, lw, dash }
//      { t: "circle", cx, cy, r, fill, stroke, lw }
//      { t: "path", d: [["M",x,y],["L",x,y],["Q",..],["C",..],["Z"]], fill, stroke, lw, dash }
//      { t: "text", s, x, y, font: "body"|"bold"|"display", size, color, align }   (y = baseline)
//      { t: "rot", cx, cy, deg, ops: [...] }
//      { t: "link", x, y, w, h, url }
import { PdfDoc } from "./pdfdoc.js";

export const PAPER = {
  letter: { label: "US Letter", w: 612, h: 792 },
  a4: { label: "A4", w: 595.28, h: 841.89 },
};

export const FONT_FAMILIES = { body: "PGM Body", bold: "PGM Bold", display: "PGM Display" };

// fonts: { body, bold, display } parsed TTFs (see ttf.js).
export function makeText(fonts) {
  const F = (k) => fonts[k] || fonts.body;
  const width = (s, font, size) => F(font).width(s, size);

  // Greedy word wrap; words longer than the line are split (and `wrap.split` is set).
  function wrap(text, font, size, maxW) {
    const words = String(text ?? "").split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = "";
    wrap.split = false;
    for (let w of words) {
      while (width(w, font, size) > maxW && w.length > 1) {
        wrap.split = true;
        let cut = w.length - 1;
        while (cut > 1 && width(w.slice(0, cut) + "-", font, size) > maxW) cut--;
        if (cur) { lines.push(cur); cur = ""; }
        lines.push(w.slice(0, cut) + "-");
        w = w.slice(cut);
      }
      const t = cur ? cur + " " + w : w;
      if (!cur || width(t, font, size) <= maxW) cur = t;
      else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }

  // Largest size (down to minSize) at which the text fits the box. Returns { size, lines, lh }.
  // Prefers sizes where no word has to be broken; breaks words only if nothing else fits.
  function fit(text, font, maxW, maxH, maxSize = 24, minSize = 6, lineHeight = 1.18) {
    let fallback = null;
    for (let size = maxSize; size >= minSize; size -= 0.5) {
      const lines = wrap(text, font, size, maxW);
      const lh = size * lineHeight;
      if (lines.length * lh <= maxH && lines.every((l) => width(l, font, size) <= maxW + 0.01)) {
        if (!wrap.split) return { size, lines, lh };
        fallback = fallback || { size, lines, lh };
      }
    }
    if (fallback) return fallback;
    const size = minSize, lh = size * lineHeight;
    let lines = wrap(text, font, size, maxW);
    const max = Math.max(1, Math.floor(maxH / lh));
    if (lines.length > max) { lines = lines.slice(0, max); lines[max - 1] = lines[max - 1].replace(/\s*\S*$/, "") + "…"; }
    return { size, lines, lh };
  }

  // Text block centred (or aligned) in a box, vertically centred. Returns ops.
  function box(text, x, y, w, h, { font = "body", color = "#1b1b1b", align = "center", maxSize = 24, minSize = 6, valign = "middle", lineHeight } = {}) {
    const { size, lines, lh } = fit(text, font, w, h, maxSize, minSize, lineHeight);
    const total = lines.length * lh;
    const asc = size * 0.78;
    let top = valign === "top" ? y : valign === "bottom" ? y + h - total : y + (h - total) / 2;
    const ax = align === "center" ? x + w / 2 : align === "right" ? x + w : x;
    return lines.map((s, i) => ({ t: "text", s, x: ax, y: top + i * lh + asc + (lh - size) / 2, font, size, color, align }));
  }

  return { width, wrap, fit, box };
}

// ---------- renderers ----------

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const n = (v) => Math.round(v * 100) / 100;

function svgPath(d) {
  return d.map((c) => c[0] + c.slice(1).map(n).join(" ")).join(" ");
}
function svgPaint(o) {
  return `fill="${o.fill || "none"}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${n(o.lw ?? 1)}"${o.dash ? ` stroke-dasharray="${o.dash.join(" ")}"` : ""} stroke-linecap="round" stroke-linejoin="round"` : ""}`;
}

function svgOps(ops) {
  let s = "";
  for (const o of ops) {
    switch (o.t) {
      case "rect": s += `<rect x="${n(o.x)}" y="${n(o.y)}" width="${n(o.w)}" height="${n(o.h)}"${o.r ? ` rx="${n(o.r)}"` : ""} ${svgPaint(o)}/>`; break;
      case "line": s += `<line x1="${n(o.x1)}" y1="${n(o.y1)}" x2="${n(o.x2)}" y2="${n(o.y2)}" ${svgPaint({ stroke: o.stroke || "#000", lw: o.lw, dash: o.dash })}/>`; break;
      case "circle": s += `<circle cx="${n(o.cx)}" cy="${n(o.cy)}" r="${n(o.r)}" ${svgPaint(o)}/>`; break;
      case "path": s += `<path d="${svgPath(o.d)}" ${svgPaint(o)}/>`; break;
      case "text": s += `<text x="${n(o.x)}" y="${n(o.y)}" font-family="${FONT_FAMILIES[o.font] || FONT_FAMILIES.body}" font-size="${n(o.size)}" fill="${o.color || "#000"}"${o.align === "center" ? ' text-anchor="middle"' : o.align === "right" ? ' text-anchor="end"' : ""} xml:space="preserve">${esc(o.s)}</text>`; break;
      case "rot": s += `<g transform="rotate(${o.deg} ${n(o.cx)} ${n(o.cy)})">${svgOps(o.ops)}</g>`; break;
      case "link": break;
    }
  }
  return s;
}

export function pageSvg(page, { width, title } = {}) {
  const w = width ? ` width="${width}" height="${n((width * page.h) / page.w)}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(page.w)} ${n(page.h)}"${w} role="img"${title ? ` aria-label="${esc(title)}"` : ""}><rect width="${n(page.w)}" height="${n(page.h)}" fill="#fff"/>${svgOps(page.ops)}</svg>`;
}

function pdfOps(p, ops, keys) {
  for (const o of ops) {
    switch (o.t) {
      case "rect": p.rect(o.x, o.y, o.w, o.h, o); break;
      case "line": p.line(o.x1, o.y1, o.x2, o.y2, o); break;
      case "circle": p.circle(o.cx, o.cy, o.r, o); break;
      case "path": p.path(o.d, o); break;
      case "text": p.text(o.s, o.x, o.y, { font: keys[o.font] || keys.body, size: o.size, color: o.color, align: o.align }); break;
      case "rot": p.rotated(o.cx, o.cy, o.deg, (pp) => pdfOps(pp, o.ops, keys)); break;
      case "link": p.link(o.x, o.y, o.w, o.h, o.url); break;
    }
  }
}

export async function pagesPdf(pages, fonts, meta = {}) {
  const doc = new PdfDoc(meta);
  const keys = { body: doc.addFont(fonts.body), bold: doc.addFont(fonts.bold), display: doc.addFont(fonts.display) };
  for (const pg of pages) pdfOps(doc.addPage(pg.w, pg.h), pg.ops, keys);
  return doc.save();
}
