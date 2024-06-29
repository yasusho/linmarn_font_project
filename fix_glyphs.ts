import * as fs from "fs";
import md5 from "md5";
(async function () {
  const in_path = process.argv[2] ?? (() => { throw new Error("入力パスを node fix_glyphs.js rounded のような形で指定して実行してください。") })()
  const fix_path = `${in_path}/fixed`
  const md5_cache_directory = `${in_path}/md5_cache_path`
  const SVGFixer = require("oslllo-svg-fixer");

  const fix_options = {
    showProgressBar: true,
    throwIfDestinationDoesNotExist: false,
  };

  if (!fs.existsSync(fix_path)) {
    fs.mkdirSync(fix_path);
  }

  if (!fs.existsSync(md5_cache_directory)) {
    fs.mkdirSync(md5_cache_directory);
  }

  const files = await fs.promises.readdir(`./${in_path}`);

  for await (const file of files) {
    if (file.endsWith(".svg")) {
      const md5_filepath = `${md5_cache_directory}/${file}.md5`;

      const svg_content = fs.readFileSync(`./${in_path}/${file}`, { encoding: 'utf-8' });
      const current_hash = md5(svg_content, { encoding: 'utf-8' });
      const cached_hash = (() => {
        try { return fs.readFileSync(md5_filepath, { encoding: 'utf-8' }); } catch { return null }
      })();

      if (cached_hash === null) {
        console.log(`No cache found for ${file}. Generating...`)
      } else if (current_hash !== cached_hash) {
        console.log(`Change detected in ${file} (md5 does not match). Generating...`);
      } else { continue; }

      fs.writeFileSync(md5_filepath, current_hash);
      await SVGFixer(`./${in_path}/${file}`, `./${fix_path}`, fix_options).fix();
    }
  }

})();
