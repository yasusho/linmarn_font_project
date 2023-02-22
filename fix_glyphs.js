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
const fs = __importStar(require("fs"));
(async function () {
    const in_path = process.argv[2] ?? (() => { throw new Error("入力パスを node fix_glyphs.js rounded のような形で指定して実行してください。"); })();
    const fix_path = `${in_path}_fixed`;
    const SVGFixer = require("oslllo-svg-fixer");
    const fix_options = {
        showProgressBar: true,
        throwIfDestinationDoesNotExist: false,
    };
    await SVGFixer(`./${in_path}`, `./${fix_path}`, fix_options).fix();
    const files = fs.readdirSync(`${fix_path}/`);
    files.forEach(function (file, _index) {
        if (file.slice(-4) !== ".svg")
            return;
        if (file.length > 6 && !file.startsWith("U+")) {
            console.log(`Removing ${file}: file name too long`);
            fs.unlinkSync(`${fix_path}/${file}`);
            return;
        }
        const svg_glyph = fs.readFileSync(`${fix_path}/${file}`, 'utf-8').replace(/viewBox="0 0 264.58333 264.58333"/, `viewBox="0 0 1000 1000"`);
        fs.writeFileSync(`${fix_path}/${file}`, svg_glyph);
    });
})();
