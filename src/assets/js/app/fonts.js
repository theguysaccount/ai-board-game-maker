// Load and parse the three game fonts once; layout and PDF export both use the parsed metrics.
import { parseTTF } from "../engine/ttf.js";
import { CFG } from "./ui.js";

let loading = null;
export function loadFonts() {
  if (!loading) {
    const get = (f) => fetch(CFG.base + "assets/fonts/" + f).then((r) => {
      if (!r.ok) throw new Error("font " + f);
      return r.arrayBuffer();
    }).then(parseTTF);
    loading = Promise.all([get("AtkinsonHyperlegible-Regular.ttf"), get("AtkinsonHyperlegible-Bold.ttf"), get("LilitaOne-Regular.ttf")])
      .then(([body, bold, display]) => ({ body, bold, display }));
  }
  return loading;
}
