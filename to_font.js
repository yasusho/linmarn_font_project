"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fantasticon_1 = require("fantasticon");
const fs = __importStar(require("fs"));
(async function () {
    const style_name = process.argv[2] ?? (() => { throw new Error("スタイル名およびフォルダを node fix_glyphs.js rounded rounded/fixed のような形で指定して実行してください。"); })();
    const fix_path = process.argv[3] ?? (() => { throw new Error("スタイル名およびフォルダを node fix_glyphs.js rounded rounded/fixed のような形で指定して実行してください。"); })();
    const out_path = `fonts/${style_name}`;
    const glyph_map = {};
    const files = fs.readdirSync(`${fix_path}/`);
    files.forEach((file, index) => {
        if (file.slice(-4) !== ".svg")
            return;
        if (file.slice(0, 2).toUpperCase() === "U+") {
            // U+002F.svg
            //   ^^^^
            const codepoint = file.slice(2, -4);
            glyph_map[file.slice(0, -4)] = parseInt(codepoint, 16);
            console.log(file.slice(0, -4), codepoint);
        }
        else {
            glyph_map[file[0]] = file.codePointAt(0);
            console.log(file[0], file.codePointAt(0).toString(16));
        }
    });
    if (!fs.existsSync(out_path)) {
        fs.mkdirSync(out_path);
    }
    (0, fantasticon_1.generateFonts)({
        inputDir: `${fix_path}/`,
        outputDir: `${out_path}/`,
        name: `linzklar_${style_name}`,
        fontTypes: [fantasticon_1.FontAssetType.TTF, fantasticon_1.FontAssetType.WOFF],
        assetTypes: [
            fantasticon_1.OtherAssetType.CSS,
            fantasticon_1.OtherAssetType.HTML,
            fantasticon_1.OtherAssetType.JSON,
            /* OtherAssetType.TS */ // The TS asset is buggy; remove
        ],
        fontHeight: 480,
        codepoints: glyph_map
    }).then(results => {
        console.log(results);
        // CSS に入れると壊れる文字を CSS と HTML から除く
        fs.readFile(`${out_path}/linzklar_${style_name}.html`, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            const result = data
                .replace(/U\+/g, 'U-')
                .replace(/icon-!/g, 'icon-exclamation')
                .replace(/icon-,/g, 'icon-comma');
            fs.writeFile(`${out_path}/linzklar_${style_name}.html`, result, 'utf8', function (err) {
                if (err)
                    return console.log(err);
            });
        });
        fs.readFile(`${out_path}/linzklar_${style_name}.css`, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            const result = data
                .replaceAll('U+', 'U-')
                .replaceAll('icon-!', 'icon-exclamation')
                .replaceAll('icon-,', 'icon-comma')
                .replaceAll('icon-(', 'icon-left-paren')
                .replaceAll('icon-)', 'icon-right-paren')
                .replaceAll('icon-[', 'icon-left-square-bracket')
                .replaceAll('icon-]', 'icon-right-square-bracket')
                .replaceAll('icon-{', 'icon-left-curly-brace')
                .replaceAll('icon-}', 'icon-right-curly-brace');
            fs.writeFile(`${out_path}/linzklar_${style_name}.css`, result, 'utf8', function (err) {
                if (err)
                    return console.log(err);
            });
        });
    });
})();
