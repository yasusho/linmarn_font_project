# linmarn_font_project
燐字のフォント作成用のファイルセット。
"fileset" フォルダにリネーム済みの空のsvgが置かれている。

## パス化
`npm install` の後に `node fix_glyphs.js rounded` とかでいけるはず

## サイズ調整
パス化をした後に `node fix_size.js rounded` とかでいけるはず

## フォント化
サイズ調整をした後に `node to_font.js rounded` でいけるはず

## 定義済みグリフの一覧ができるページ
- rounded: https://yasusho.github.io/linmarn_font_project/fonts/linzklar_rounded.html
