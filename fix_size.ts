import * as fs from 'fs';
const fix_path = process.argv[2] ?? (() => { throw new Error("フォルダを node fix_size.js rounded/fixed のような形で指定して実行してください。") })();
const files = fs.readdirSync(`${fix_path}/`);
const glyph_list: string[] = [];
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
    
    if (fix_path.startsWith("rounded") && svg_glyph.includes("M46.989 25.157 C 40.310 26.523,34.197 31.379,30.113 38.560 L 26.667 44.621 26.667 500.808")) {
      // dummy glyph
    } else {
      glyph_list.push(file.slice(0, -4));
    }
});

fs.writeFileSync(`${fix_path}/!non_dummy_glyph_list.json`, JSON.stringify(glyph_list, null, 2), 'utf-8');