import * as fs from 'fs';

(async function() {
const in_path = process.argv[2] ?? "rounded"
const fix_path = process.argv[3] ?? "rounded_fixed"
const SVGFixer = require("oslllo-svg-fixer");

const fix_options = {
  showProgressBar: true,
  throwIfDestinationDoesNotExist: false,
};

await SVGFixer(`./${in_path}`, `./${fix_path}`, fix_options).fix();

const files = fs.readdirSync(`${fix_path}/`);
files.forEach(function (file, _index) {
    if (file.slice(-4) !== ".svg") return;
    const svg_glyph = fs.readFileSync(`${fix_path}/${file}`, 'utf-8').replace(/viewBox="0 0 264.58333 264.58333"/, `viewBox="0 0 1000 1000"`);
    fs.writeFileSync(`${fix_path}/${file}`, svg_glyph);
})

})();
