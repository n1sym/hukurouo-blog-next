---
title: ブログを軽量化した
date: 2020-12-05
categories: 技術
tags: []
toc_flg: true
---

他の方のエンジニアブログと比べると、当ブログの読み込みが遅い気がする。

LightHouseなどで調べてみたら、とにもかくにもファイルサイズが大きいのが原因っぽい。なので、ビルド後のファイルサイズを減らしてパフォーマンス改善を試みることにした。

## ページを減らす

今までは各カテゴリの記事一覧のページにそれぞれ vueファイルを用意していた。

`pages\articles\kansoubun.vue`
`pages\articles\gizyutu.vue`
`pages\articles\nikki.vue`

これを１つに纏めた。

`pages\articles\category\_category.vue`

あとは使っていないvueファイルを消したりした。

全体のファイルサイズをメモするのを忘れたのでビルド時間で比較していきます。

Time: 29199ms => Time: 23030ms


## Bootstrap を消す

正直ろくに使っていなかったので（タグのコンポーネントくらい？）思い切って消してみた。

Time: 23030ms　=> 7244ms

なんと、ここまで短くなるとは。これは結構効果がありそう。

サイトのデザインはChromeのデベロッパーツールでそれぞれのCSSとにらめっこして１つずつ再現していった。割と難航したが、ほぼほぼ元の形にできたのでよかった。


## moment.js を消す

`npm run build -a` でバンドルファイルを解析してみたら、moment.jsのサイズが1/3を占めていた。各国のローカライズデータが全て入っていたのが要因のようだ。このブログのdate値処理はそこまで複雑なことをしているわけではないので、これもアンインストールしておいた。

![](https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/image%2Frapture_20201207000244.png?alt=media&token=924be131-ef93-4adc-a9fc-05545cf6e6a9)





サイトの読み込み速度改善は他にも色々方法がありそうな気がするので、気が向いたらやってみよう。