import { generateFonts, FontAssetType, OtherAssetType } from 'fantasticon';
import * as fs from 'fs';
(async function() {
const style_name = process.argv[2] ?? (() => { throw new Error("スタイル名を node fix_glyphs.js rounded のような形で指定して実行してください。") })()
const fix_path = `${style_name}_fixed`;
const out_path = `fonts`;
const glyph_map: { [key: string]: number } = {};
const files = fs.readdirSync(`${fix_path}/`);
files.forEach((file, index) => {
  if (file.slice(-4) !== ".svg") return;
  if (file.slice(0, 2).toUpperCase() === "U+") {
    // U+002F.svg
    //   ^^^^
    const codepoint = file.slice(2, -4);
    glyph_map[file.slice(-4)] = parseInt(codepoint, 16);
    console.log(file.slice(-4), codepoint);
  } else {
    glyph_map[file[0]] = file.codePointAt(0)!;
    console.log(file[0], file.codePointAt(0)!.toString(16))
  }
});
generateFonts({
  inputDir: `${fix_path}/`,
  outputDir: `${out_path}/`,
  name: `linzklar_${style_name}`,
  fontTypes: [FontAssetType.TTF, FontAssetType.WOFF],
  assetTypes: [
    OtherAssetType.CSS,
    OtherAssetType.HTML,
    OtherAssetType.JSON,
   /* OtherAssetType.TS */ // The TS asset is buggy; remove
  ],
  fontHeight: 480,
  codepoints: glyph_map
}).then(results => {
  console.log(results);
  // copy the resulting fonts into docs/
  // fs_extra.copy("fonts", "docs/fonts");
});
})();
