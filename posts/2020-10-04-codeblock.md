---
title: nuxt/contentのコードブロックデザインを変える
date: 2020-10-04
categories: 技術
tags: []
---

デフォルトのデザインがいまいち好きくない･･･。

<img src="https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/image%2Frapture_20201004133104.png?alt=media&token=845a92e8-870d-495c-a2c0-661aecc12bc5" alt="" width="">


ということで変更してみます。

nuxt/contentでは`PrimeJS`を使用しているので、prismのテーマをインストールしましょう。

`npm install prism-themes`

テーマのラインナップはここで確認できます。

https://github.com/PrismJS/prism-themes

背景が黒地のだと白黒でちかちかしてしまうので、lightなやつが良いな。ということで`ghcolors`を選んでみました。

```js[nuxt.config.js]
content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-ghcolors.css'
      }
    }
  }
```

よい感じですね。