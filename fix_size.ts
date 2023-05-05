import * as fs from 'fs';
const fix_path = process.argv[2] ?? (() => { throw new Error("フォルダを node fix_size.js rounded/fixed のような形で指定して実行してください。") })();
const files = fs.readdirSync(`${fix_path}/`);
files.forEach(function (file, _index) {
    if (file.slice(-4) !== ".svg") return;
    if (file.length > 6 && !file.startsWith("U+")) {
      console.log(`Removing ${file}: file name too long`);
      fs.unlinkSync(`${fix_path}/${file}`);
      return;
    }

    const replacer = (match: string, p1: string) => `viewBox="0 0 ${Number(p1) / 264.58333 * 1000} 1000"`;
    const svg_glyph = fs.readFileSync(`${fix_path}/${file}`, 'utf-8')
      .replace(/viewBox="0 0 ([0-9.]+) 264.58333"/, replacer)
    fs.writeFileSync(`${fix_path}/${file}`, svg_glyph);
})