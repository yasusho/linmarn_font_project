# linmarn_font_project
燐字のフォント作成用のファイルセット。

"fileset" フォルダにリネーム済みの空のsvgが置かれている。

## フォント一覧

命名の経緯については [AIL-MO-LETI-CEP/issues/issues/128](https://github.com/AIL-MO-LETI-CEP/issues/issues/128) のログも参照のこと。

### rounded【骨軸倉字】

状態：良

丸ゴシック。等幅ペメセペ・ルヨットと半角燐数字を備える。
- [定義済グリフ一覧](https://yasusho.github.io/linmarn_font_project/fonts/rounded/linzklar_rounded.html)
- woffファイルパス: `https://yasusho.github.io/linmarn_font_project/fonts/rounded/linzklar_rounded.woff`

### kakugo【硬骨軸倉字】

状態：可

角ゴシック。燐字については、後述の「角ゴ化作業」で対処する。等幅ペメセペ・ルヨットと半角燐数字についてはこの方法が効かないため、手作業で作り直す必要が出てくるが、できていない。

<hr>

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
