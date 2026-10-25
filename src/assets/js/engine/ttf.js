// A small TrueType reader: just what layout and PDF embedding need (metrics, advance widths,
// the Unicode → glyph map and names). Works in browsers and Node on an ArrayBuffer/Uint8Array.

export function parseTTF(input) {
  const u8 = input instanceof Uint8Array ? input : new Uint8Array(input);
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  const tag = dv.getUint32(0);
  if (tag !== 0x00010000 && tag !== 0x74727565) throw new Error("not a TrueType font");
  const numTables = dv.getUint16(4);
  const tables = {};
  for (let i = 0; i < numTables; i++) {
    const o = 12 + i * 16;
    const name = String.fromCharCode(u8[o], u8[o + 1], u8[o + 2], u8[o + 3]);
    tables[name] = { offset: dv.getUint32(o + 8), length: dv.getUint32(o + 12) };
  }
  for (const need of ["head", "hhea", "hmtx", "maxp", "cmap"]) if (!tables[need]) throw new Error("font is missing " + need);

  const head = tables.head.offset;
  const unitsPerEm = dv.getUint16(head + 18);
  const bbox = [dv.getInt16(head + 36), dv.getInt16(head + 38), dv.getInt16(head + 40), dv.getInt16(head + 42)];
  const hhea = tables.hhea.offset;
  const ascender = dv.getInt16(hhea + 4), descender = dv.getInt16(hhea + 6), lineGap = dv.getInt16(hhea + 8);
  const numberOfHMetrics = dv.getUint16(hhea + 34);
  const numGlyphs = dv.getUint16(tables.maxp.offset + 4);

  const advances = new Uint16Array(numGlyphs);
  let last = 0;
  for (let g = 0; g < numGlyphs; g++) {
    if (g < numberOfHMetrics) last = dv.getUint16(tables.hmtx.offset + g * 4);
    advances[g] = last;
  }

  // cmap: prefer format 12 (full Unicode), else format 4 (BMP).
  const cm = tables.cmap.offset;
  let f4 = -1, f12 = -1;
  for (let i = 0, n = dv.getUint16(cm + 2); i < n; i++) {
    const pid = dv.getUint16(cm + 4 + i * 8), eid = dv.getUint16(cm + 6 + i * 8), off = cm + dv.getUint32(cm + 8 + i * 8);
    const fmt = dv.getUint16(off);
    if (fmt === 12 && (pid === 3 && eid === 10 || pid === 0)) f12 = off;
    if (fmt === 4 && (pid === 3 && (eid === 1 || eid === 0) || pid === 0)) f4 = f4 < 0 ? off : f4;
  }
  const cmap = new Map();
  if (f12 >= 0) {
    for (let i = 0, n = dv.getUint32(f12 + 12); i < n; i++) {
      const o = f12 + 16 + i * 12, start = dv.getUint32(o), end = dv.getUint32(o + 4), g0 = dv.getUint32(o + 8);
      for (let c = start; c <= end; c++) cmap.set(c, g0 + c - start);
    }
  } else if (f4 >= 0) {
    const segX2 = dv.getUint16(f4 + 6);
    const ends = f4 + 14, starts = ends + segX2 + 2, deltas = starts + segX2, ranges = deltas + segX2;
    for (let i = 0; i < segX2 / 2; i++) {
      const end = dv.getUint16(ends + i * 2), start = dv.getUint16(starts + i * 2), delta = dv.getInt16(deltas + i * 2), ro = dv.getUint16(ranges + i * 2);
      for (let c = start; c <= end && c !== 0xffff; c++) {
        let g;
        if (ro === 0) g = (c + delta) & 0xffff;
        else {
          g = dv.getUint16(ranges + i * 2 + ro + (c - start) * 2);
          if (g) g = (g + delta) & 0xffff;
        }
        if (g) cmap.set(c, g);
      }
    }
  }

  let capHeight = Math.round(bbox[3] * 0.7), xHeight = Math.round(bbox[3] * 0.5), weight = 400;
  if (tables["OS/2"]) {
    const os2 = tables["OS/2"].offset, ver = dv.getUint16(os2);
    weight = dv.getUint16(os2 + 4);
    if (ver >= 2 && tables["OS/2"].length >= 96) { xHeight = dv.getInt16(os2 + 86); capHeight = dv.getInt16(os2 + 88); }
  }
  const italicAngle = tables.post ? dv.getInt32(tables.post.offset + 4) / 65536 : 0;

  // PostScript name (nameID 6), used as the PDF BaseFont.
  let psName = "EmbeddedFont";
  if (tables.name) {
    const nt = tables.name.offset, count = dv.getUint16(nt + 2), strOff = nt + dv.getUint16(nt + 4);
    for (let i = 0; i < count; i++) {
      const r = nt + 6 + i * 12;
      const pid = dv.getUint16(r), nameId = dv.getUint16(r + 6), len = dv.getUint16(r + 8), off = dv.getUint16(r + 10);
      if (nameId !== 6) continue;
      let s = "";
      if (pid === 3 || pid === 0) for (let k = 0; k < len; k += 2) s += String.fromCharCode(dv.getUint16(strOff + off + k));
      else for (let k = 0; k < len; k++) s += String.fromCharCode(u8[strOff + off + k]);
      s = s.replace(/[^A-Za-z0-9-]/g, "");
      if (s) { psName = s; break; }
    }
  }

  const font = {
    bytes: u8, unitsPerEm, bbox, ascender, descender, lineGap, capHeight, xHeight, italicAngle, weight, numGlyphs, advances, cmap, psName,
    glyph(cp) { return cmap.get(cp) || 0; },
    has(ch) { return cmap.has(ch.codePointAt(0)); },
    // Width of a string in user units at `size`.
    width(text, size) {
      let w = 0;
      for (const ch of String(text)) w += advances[cmap.get(ch.codePointAt(0)) || 0];
      return (w * size) / unitsPerEm;
    },
  };
  return font;
}
