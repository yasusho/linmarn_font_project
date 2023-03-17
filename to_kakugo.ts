import * as fs from 'fs';
(async function () {
	const input_path = "rounded"; // process.argv[2] ?? (() => { throw new Error("スタイル名を node to_kakugo.js rounded のような形で指定して実行してください。") })()
	const output_path = "kakugo";
	if (!fs.existsSync(output_path)) {
		fs.mkdirSync(output_path);
	}
	const files = fs.readdirSync(`${input_path}/`);

	files.forEach(function (file, _index) {
		if (file.slice(-4) !== ".svg") return;
		if (file.length > 6 && !file.startsWith("U+")) {
			console.log(`Removing ${file}: file name too long`);
			return;
		}

		const svg_glyph = fs.readFileSync(`${input_path}/${file}`, 'utf-8')
			.replace(/stroke-linecap:\s*round/g, "stroke-linecap:square")
			.replace(/stroke-linejoin:\s*round/g, "stroke-linejoin:bevel");
		fs.writeFileSync(`${output_path}/${file}`, svg_glyph);
	})
})();