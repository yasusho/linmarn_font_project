(async function () {
    const in_path = process.argv[2] ?? (() => { throw new Error("入力パスを node fix_glyphs.js rounded のような形で指定して実行してください。"); })();
    const fix_path = `${in_path}_fixed`;
    const SVGFixer = require("oslllo-svg-fixer");
    const fix_options = {
        showProgressBar: true,
        throwIfDestinationDoesNotExist: false,
    };
    await SVGFixer(`./${in_path}`, `./${fix_path}`, fix_options).fix();
})();
