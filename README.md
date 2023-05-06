# linmarn_font_project
燐字のフォント作成用のファイルセット。

"fileset" フォルダにリネーム済みの空のsvgが置かれている。

## 開発者のための注意

package.json にある

```json
  "overrides": {
    "fantasticon": {
      "glob": "7.2.0"
    }
  }
```

は https://github.com/tancredi/fantasticon/issues/470 を避けるためのもの。

以下のコマンドを実行していて No SVGs found というエラーに直面したら、package-lock.json と node_modules/ を一度全削除してから npm install してください。

https://github.com/npm/cli/issues/4232 によれば

```bash
npm uninstall fantasticon && npm install fantasticon
```

でもできるらしいです。

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

### herm_giaru【美門倉官字】

状態：可

楷書フォント。[84字燐字紹介PDF](https://github.com/yasusho/linmarn_table_pdf)に由来する。

<hr>

## フォントファイル出力

1. 以下のコマンドを順に実行

元の SVG データがストロークで書かれているフォントの場合:
（`example` フォルダのsvgを統合したい場合の例なので、適宜 `example` を `rounded` とかに読み替えて実行すること）

```bash
# ライブラリのインストール
$ npm install

# パス化
$ node fix_glyphs.js example
# これにより example フォルダから svg ファイルが読まれて example/fixed フォルダに出力される

# サイズ調整
$ node fix_size.js example/fixed
# これにより example/fixed フォルダ内の svg ファイルが上書きされ、サイズがアドホックに直される
# このプロセスが必要なのは、px と mm 周りでの面倒が存在するから
# 詳しくは https://github.com/yasusho/linmarn_font_project/issues/9

# フォント化
$ node to_font.js example example/fixed
# 最初の example はフォント名であり、出力したフォントファイルに埋め込まれたりする
# 次の example/fixed は svg が入っているフォルダの場所である
```

元の SVG データが閉じたパスで書かれているフォントの場合:

```bash
# todo: 書いて試す
```

2. "fonts/example" フォルダに html, css, ttf, woff, json の 5 ファイルが作成される

## 角ゴ化作業

```
$ node to_kakugo.js
```

を走らせ、できた kakugo フォルダをエクスプローラなどで一覧表示する。

角ゴの方で「折れたストローク」となるべきところを見つけたら、**roundedの方を**いじってもう一度 `node to_kakugo.js` を走らせる。

なべぶたのような、「折れたストローク」では解決しないやつは、一旦無視。
