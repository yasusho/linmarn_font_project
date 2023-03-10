# linmarn_font_project
燐字のフォント作成用のファイルセット。

"fileset" フォルダにリネーム済みの空のsvgが置かれている。

## フォント一覧
### rounded【骨軸倉字】
丸ゴシック。等幅ペメセペ・ルヨットと半角燐数字を備える。
- [定義済グリフ一覧](https://yasusho.github.io/linmarn_font_project/fonts/rounded/linzklar_rounded.html)
- woffファイルパス: `https://yasusho.github.io/linmarn_font_project/fonts/rounded/linzklar_rounded.woff`

## フォントファイル出力
（"example" フォルダのsvgを統合したい場合の例）

1. 以下のコマンドを順に実行
```
// ライブラリのインストール
$ npm install

// パス化 (ストロークフォントでない場合は不要)
$ node fix_glyphs.js example

// サイズ調整
$ node fix_size.js example

// フォント化
$ node to_font.js example
```

2. "fonts/example" フォルダに html, css, ttf, woff, json の 5 ファイルが作成される

## 角ゴ化作業

```
$ node to_kakugo.js
```

を走らせ、できた kakugo フォルダをエクスプローラなどで一覧表示する。

角ゴの方で「折れたストローク」となるべきところを見つけたら、**roundedの方を**いじってもう一度 `node to_kakugo.js` を走らせる。

なべぶたのような、「折れたストローク」では解決しないやつは、一旦無視。
