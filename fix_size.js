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
const fix_path = process.argv[2] ?? (() => { throw new Error("フォルダを node fix_size.js rounded/fixed のような形で指定して実行してください。"); })();
const files = fs.readdirSync(`${fix_path}/`);
const glyph_list = [];
files.forEach(function (file, _index) {
    if (file.slice(-4) !== ".svg")
        return;
    if (file.length > 6 && !file.startsWith("U+")) {
        console.log(`Removing ${file}: file name too long`);
        fs.unlinkSync(`${fix_path}/${file}`);
        return;
    }
    const replacer = (match, p1) => `viewBox="0 0 ${Number(p1) / 264.58333 * 1000} 1000"`;
    const svg_glyph = fs.readFileSync(`${fix_path}/${file}`, 'utf-8')
        .replace(/viewBox="0 0 ([0-9.]+) 264.58333"/, replacer);
    fs.writeFileSync(`${fix_path}/${file}`, svg_glyph);
    if (fix_path.startsWith("rounded") && svg_glyph.includes("M46.989 25.157 C 40.310 26.523,34.197 31.379,30.113 38.560 L 26.667 44.621 26.667 500.808")) {
        // dummy glyph
    }
    else {
        glyph_list.push(file.slice(0, -4));
    }
});
fs.writeFileSync(`${fix_path}/!non_dummy_glyph_list.json`, JSON.stringify(glyph_list, null, 2), 'utf-8');
