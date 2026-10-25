// A small vector PDF writer: pages, shapes, embedded TrueType text (Identity-H, with a ToUnicode
// map so text stays searchable and copyable), links, and Flate compression when available.
// Coordinates are in points (1/72 in) with the origin at the TOP-LEFT of the page, y down.

const enc = new TextEncoder();
const f2 = (n) => {
  const v = Math.round(n * 100) / 100;
  return Object.is(v, -0) ? "0" : String(v);
};

export function hexToRgb(hex) {
  const h = String(hex || "#000").replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full.slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
const rgb = (hex) => hexToRgb(hex).map((v) => f2(Math.round(v * 1000) / 1000)).join(" ");

async function deflate(bytes) {
  if (typeof CompressionStream === "undefined") return null;
  try {
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  } catch {
    return null;
  }
}

const K = 0.5523;

class Page {
  constructor(doc, w, h) {
    this.doc = doc;
    this.w = w;
    this.h = h;
    this.ops = [];
    this.fonts = new Set();
    this.links = [];
  }
  Y(y) { return this.h - y; }
  _paint({ fill, stroke, lw = 1, dash, cap, join } = {}) {
    const o = [];
    if (fill) o.push(`${rgb(fill)} rg`);
    if (stroke) {
      o.push(`${rgb(stroke)} RG`, `${f2(lw)} w`);
      o.push(dash ? `[${dash.map(f2).join(" ")}] 0 d` : "[] 0 d");
      if (cap != null) o.push(`${cap} J`);
      if (join != null) o.push(`${join} j`);
    }
    const op = fill && stroke ? "B" : fill ? "f" : stroke ? "S" : "n";
    return { pre: o.join(" "), op };
  }
  rect(x, y, w, h, opts = {}) {
    const { pre, op } = this._paint(opts);
    const r = Math.min(opts.r || 0, w / 2, h / 2);
    if (!r) { this.ops.push(`q ${pre} ${f2(x)} ${f2(this.Y(y + h))} ${f2(w)} ${f2(h)} re ${op} Q`); return this; }
    const c = r * K;
    const p = [
      `${f2(x + r)} ${f2(this.Y(y))} m`,
      `${f2(x + w - r)} ${f2(this.Y(y))} l`,
      `${f2(x + w - r + c)} ${f2(this.Y(y))} ${f2(x + w)} ${f2(this.Y(y + r - c))} ${f2(x + w)} ${f2(this.Y(y + r))} c`,
      `${f2(x + w)} ${f2(this.Y(y + h - r))} l`,
      `${f2(x + w)} ${f2(this.Y(y + h - r + c))} ${f2(x + w - r + c)} ${f2(this.Y(y + h))} ${f2(x + w - r)} ${f2(this.Y(y + h))} c`,
      `${f2(x + r)} ${f2(this.Y(y + h))} l`,
      `${f2(x + r - c)} ${f2(this.Y(y + h))} ${f2(x)} ${f2(this.Y(y + h - r + c))} ${f2(x)} ${f2(this.Y(y + h - r))} c`,
      `${f2(x)} ${f2(this.Y(y + r))} l`,
      `${f2(x)} ${f2(this.Y(y + r - c))} ${f2(x + r - c)} ${f2(this.Y(y))} ${f2(x + r)} ${f2(this.Y(y))} c h`,
    ];
    this.ops.push(`q ${pre} ${p.join(" ")} ${op} Q`);
    return this;
  }
  line(x1, y1, x2, y2, opts = {}) {
    const { pre } = this._paint({ stroke: opts.stroke || "#000", lw: opts.lw, dash: opts.dash, cap: opts.cap ?? 1 });
    this.ops.push(`q ${pre} ${f2(x1)} ${f2(this.Y(y1))} m ${f2(x2)} ${f2(this.Y(y2))} l S Q`);
    return this;
  }
  ellipse(cx, cy, rx, ry, opts = {}) {
    const { pre, op } = this._paint(opts);
    const ox = rx * K, oy = ry * K, Y = (v) => f2(this.Y(v)), X = f2;
    this.ops.push(`q ${pre} ${X(cx - rx)} ${Y(cy)} m ${X(cx - rx)} ${Y(cy - oy)} ${X(cx - ox)} ${Y(cy - ry)} ${X(cx)} ${Y(cy - ry)} c ` +
      `${X(cx + ox)} ${Y(cy - ry)} ${X(cx + rx)} ${Y(cy - oy)} ${X(cx + rx)} ${Y(cy)} c ` +
      `${X(cx + rx)} ${Y(cy + oy)} ${X(cx + ox)} ${Y(cy + ry)} ${X(cx)} ${Y(cy + ry)} c ` +
      `${X(cx - ox)} ${Y(cy + ry)} ${X(cx - rx)} ${Y(cy + oy)} ${X(cx - rx)} ${Y(cy)} c h ${op} Q`);
    return this;
  }
  circle(cx, cy, r, opts) { return this.ellipse(cx, cy, r, r, opts); }
  // cmds: [["M",x,y],["L",x,y],["C",x1,y1,x2,y2,x,y],["Q",x1,y1,x,y],["Z"]]
  path(cmds, opts = {}) {
    const { pre, op } = this._paint(opts);
    const out = [];
    let cx = 0, cy = 0;
    for (const c of cmds) {
      const t = c[0];
      if (t === "M") { out.push(`${f2(c[1])} ${f2(this.Y(c[2]))} m`); [cx, cy] = [c[1], c[2]]; }
      else if (t === "L") { out.push(`${f2(c[1])} ${f2(this.Y(c[2]))} l`); [cx, cy] = [c[1], c[2]]; }
      else if (t === "C") { out.push(`${f2(c[1])} ${f2(this.Y(c[2]))} ${f2(c[3])} ${f2(this.Y(c[4]))} ${f2(c[5])} ${f2(this.Y(c[6]))} c`); [cx, cy] = [c[5], c[6]]; }
      else if (t === "Q") {
        // Convert a quadratic to a cubic.
        const [qx, qy, x, y] = c.slice(1);
        const c1x = cx + (2 / 3) * (qx - cx), c1y = cy + (2 / 3) * (qy - cy), c2x = x + (2 / 3) * (qx - x), c2y = y + (2 / 3) * (qy - y);
        out.push(`${f2(c1x)} ${f2(this.Y(c1y))} ${f2(c2x)} ${f2(this.Y(c2y))} ${f2(x)} ${f2(this.Y(y))} c`);
        [cx, cy] = [x, y];
      } else if (t === "Z") out.push("h");
    }
    this.ops.push(`q ${pre} ${out.join(" ")} ${op} Q`);
    return this;
  }
  // Draw `fn` rotated by `deg` (clockwise on the page) around (cx, cy).
  rotated(cx, cy, deg, fn) {
    const a = (-deg * Math.PI) / 180, co = Math.cos(a), si = Math.sin(a);
    const px = cx, py = this.Y(cy);
    this.ops.push(`q 1 0 0 1 ${f2(px)} ${f2(py)} cm ${f2(co)} ${f2(si)} ${f2(-si)} ${f2(co)} 0 0 cm 1 0 0 1 ${f2(-px)} ${f2(-py)} cm`);
    fn(this);
    this.ops.push("Q");
    return this;
  }
  // y is the BASELINE. align: left | center | right.
  text(str, x, y, { font, size = 12, color = "#000", align = "left" } = {}) {
    const f = this.doc._font(font);
    const s = String(str);
    if (!s) return this;
    let w = 0;
    let hex = "";
    for (const ch of s) {
      const cp = ch.codePointAt(0);
      const g = f.ttf.glyph(cp);
      f.used.set(g, cp);
      w += f.ttf.advances[g];
      hex += g.toString(16).padStart(4, "0");
    }
    w = (w * size) / f.ttf.unitsPerEm;
    const tx = align === "center" ? x - w / 2 : align === "right" ? x - w : x;
    this.fonts.add(f.key);
    this.ops.push(`BT ${rgb(color)} rg /${f.key} ${f2(size)} Tf 1 0 0 1 ${f2(tx)} ${f2(this.Y(y))} Tm <${hex}> Tj ET`);
    return this;
  }
  link(x, y, w, h, url) {
    this.links.push({ rect: [x, this.Y(y + h), x + w, this.Y(y)], url });
    return this;
  }
}

export class PdfDoc {
  constructor(meta = {}) {
    this.meta = meta;
    this.pages = [];
    this.fontList = [];
  }
  addFont(ttf) {
    const existing = this.fontList.find((f) => f.ttf === ttf);
    if (existing) return existing.key;
    const key = "F" + (this.fontList.length + 1);
    this.fontList.push({ key, ttf, used: new Map([[0, 0]]) });
    return key;
  }
  _font(key) {
    const f = this.fontList.find((x) => x.key === key);
    if (!f) throw new Error("unknown font " + key);
    return f;
  }
  addPage(w, h) {
    const p = new Page(this, w, h);
    this.pages.push(p);
    return p;
  }

  async save() {
    const objs = [];
    const alloc = () => { objs.push(null); return objs.length; };
    const set = (n, body, stream) => { objs[n - 1] = { body, stream }; };
    const catalog = alloc(), pagesRoot = alloc(), info = alloc();

    // Fonts
    const fontRefs = {};
    for (const f of this.fontList) {
      const t = f.ttf;
      const scale = 1000 / t.unitsPerEm;
      const type0 = alloc(), cid = alloc(), desc = alloc(), file = alloc(), tounicode = alloc();
      fontRefs[f.key] = type0;
      const used = [...f.used.keys()].sort((a, b) => a - b);
      const W = used.map((g) => `${g} [${Math.round(t.advances[g] * scale)}]`).join(" ");
      set(type0, `<< /Type /Font /Subtype /Type0 /BaseFont /${t.psName} /Encoding /Identity-H /DescendantFonts [${cid} 0 R] /ToUnicode ${tounicode} 0 R >>`);
      set(cid, `<< /Type /Font /Subtype /CIDFontType2 /BaseFont /${t.psName} /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${desc} 0 R /DW ${Math.round(t.advances[0] * scale)} /W [${W}] /CIDToGIDMap /Identity >>`);
      const bb = t.bbox.map((v) => Math.round(v * scale)).join(" ");
      const flags = 32 | (t.italicAngle ? 64 : 0);
      set(desc, `<< /Type /FontDescriptor /FontName /${t.psName} /Flags ${flags} /FontBBox [${bb}] /ItalicAngle ${f2(t.italicAngle)} /Ascent ${Math.round(t.ascender * scale)} /Descent ${Math.round(t.descender * scale)} /CapHeight ${Math.round(t.capHeight * scale)} /StemV ${t.weight >= 600 ? 140 : 80} /FontFile2 ${file} 0 R >>`);
      const z = await deflate(t.bytes);
      set(file, `<< /Length ${(z || t.bytes).length} /Length1 ${t.bytes.length}${z ? " /Filter /FlateDecode" : ""} >>`, z || t.bytes);
      // ToUnicode: glyph id → code point, at most 100 entries per block.
      const pairs = used.filter((g) => f.used.get(g)).map((g) => {
        const cp = f.used.get(g);
        const u16 = cp > 0xffff ? [0xd800 + ((cp - 0x10000) >> 10), 0xdc00 + ((cp - 0x10000) & 0x3ff)] : [cp];
        return `<${g.toString(16).padStart(4, "0")}> <${u16.map((u) => u.toString(16).padStart(4, "0")).join("")}>`;
      });
      let blocks = "";
      for (let i = 0; i < pairs.length; i += 100) {
        const chunk = pairs.slice(i, i + 100);
        blocks += `${chunk.length} beginbfchar\n${chunk.join("\n")}\nendbfchar\n`;
      }
      const cmap = `/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n${blocks}endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend\n`;
      set(tounicode, `<< /Length ${enc.encode(cmap).length} >>`, enc.encode(cmap));
    }

    // Pages
    const pageRefs = [];
    for (const p of this.pages) {
      const pageObj = alloc(), content = alloc();
      pageRefs.push(pageObj);
      const raw = enc.encode(p.ops.join("\n"));
      const z = await deflate(raw);
      set(content, `<< /Length ${(z || raw).length}${z ? " /Filter /FlateDecode" : ""} >>`, z || raw);
      const fontRes = [...p.fonts].map((k) => `/${k} ${fontRefs[k]} 0 R`).join(" ");
      const annots = [];
      for (const l of p.links) {
        const a = alloc();
        set(a, `<< /Type /Annot /Subtype /Link /Rect [${l.rect.map(f2).join(" ")}] /Border [0 0 0] /A << /S /URI /URI ${pdfString(l.url)} >> >>`);
        annots.push(`${a} 0 R`);
      }
      set(pageObj, `<< /Type /Page /Parent ${pagesRoot} 0 R /MediaBox [0 0 ${f2(p.w)} ${f2(p.h)}] /Resources << /Font << ${fontRes} >> >> /Contents ${content} 0 R${annots.length ? ` /Annots [${annots.join(" ")}]` : ""} >>`);
    }
    set(pagesRoot, `<< /Type /Pages /Kids [${pageRefs.map((r) => `${r} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`);
    set(catalog, `<< /Type /Catalog /Pages ${pagesRoot} 0 R >>`);
    set(info, `<< /Title ${pdfString(this.meta.title || "Printable game")} /Creator ${pdfString(this.meta.creator || "Board Game Maker")} /Producer ${pdfString("Board Game Maker")} >>`);

    // Serialize
    const chunks = [];
    let len = 0;
    const push = (d) => { const b = typeof d === "string" ? enc.encode(d) : d; chunks.push(b); len += b.length; };
    push("%PDF-1.7\n%\xE2\xE3\xCF\xD3\n");
    const offsets = [];
    objs.forEach((o, i) => {
      offsets[i] = len;
      push(`${i + 1} 0 obj\n${o.body}\n`);
      if (o.stream) { push("stream\n"); push(o.stream); push("\nendstream\n"); }
      push("endobj\n");
    });
    const xref = len;
    let x = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
    for (const off of offsets) x += String(off).padStart(10, "0") + " 00000 n \n";
    push(x);
    push(`trailer\n<< /Size ${objs.length + 1} /Root ${catalog} 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    const out = new Uint8Array(len);
    let o = 0;
    for (const c of chunks) { out.set(c, o); o += c.length; }
    return out;
  }
}

// PDF text string: ASCII as a literal string, anything else as UTF-16BE hex with a BOM.
export function pdfString(s) {
  s = String(s);
  if (/^[\x20-\x7e]*$/.test(s)) return "(" + s.replace(/([\\()])/g, "\\$1") + ")";
  let hex = "FEFF";
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    const u = cp > 0xffff ? [0xd800 + ((cp - 0x10000) >> 10), 0xdc00 + ((cp - 0x10000) & 0x3ff)] : [cp];
    for (const v of u) hex += v.toString(16).padStart(4, "0").toUpperCase();
  }
  return `<${hex}>`;
}
