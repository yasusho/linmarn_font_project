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

		// pemecepe lujot は変換したくない。
		// 逆に、以下のものは変換してよい。
		// - 「転写が漢字である燐字」
		// - 「転写に U+ が入っている『記号』『ドット付き文字』」
		// - 「転写が全角英数であるパイグ文字」
		// ということで、「転写の先頭が ASCII 外」または「転写が U+ で始まっている」または「その他特別に定める場合」
		// は許可、としたい。
		if (file[0] > '~' || file.startsWith("U+")) {
			const svg_glyph = fs.readFileSync(`${input_path}/${file}`, 'utf-8')
			.replace(/stroke-linecap:\s*round/g, "stroke-linecap:square")
			.replace(/stroke-linejoin:\s*round/g, "stroke-linejoin:miter");
			fs.writeFileSync(`${output_path}/${file}`, svg_glyph);
		}
	})
})();