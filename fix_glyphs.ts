import * as fs from 'fs';

(async function() {
const in_path = process.argv[2] ?? (() => { throw new Error("入力パスを node fix_glyphs.js rounded のような形で指定して実行してください。") })()
const fix_path = `${in_path}_fixed`
const SVGFixer = require("oslllo-svg-fixer");

const fix_options = {
  showProgressBar: true,
  throwIfDestinationDoesNotExist: false,
};

await SVGFixer(`./${in_path}`, `./${fix_path}`, fix_options).fix();

const files = fs.readdirSync(`${fix_path}/`);
files.forEach(function (file, _index) {
    if (file.slice(-4) !== ".svg") return;
    if (file.length > 6) {
      console.log(`Removing ${file}: file name too long`);
      fs.unlinkSync(`${fix_path}/${file}`);
      return;
    }
    const svg_glyph = fs.readFileSync(`${fix_path}/${file}`, 'utf-8').replace(/viewBox="0 0 264.58333 264.58333"/, `viewBox="0 0 1000 1000"`);
    fs.writeFileSync(`${fix_path}/${file}`, svg_glyph);
})

})();
