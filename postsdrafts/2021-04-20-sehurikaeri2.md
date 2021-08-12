---
title: SE備忘録 2020年下期
date: 2021-04-29
categories: 技術
tags: []
---
システムエンジニアに就いて一年が経った。2020年下期を振り返る。

https://hukurouo.com/articles/2020-10-20-se-hurikaeri1
SE備忘録 2020年上期

## 会社でやったこと

- 10月
  - 組織改編に伴う社内システムの改修対応
    - 色んな部署の人に話を聞いて要件をまとめるなどした
    - 伝言ゲームの発生、ギリギリのスケジュールなど反省点が多かった
    - 今まで開発部のメンバーだけで仕事をしていたので、急に登場人物が増えて大変だった。このあたりからコミュニケーション能力の重要さを実感していく
  - メール配信システム改修（中規模）
    - 初めて大きめの改修を担当した。2週間ほどかけて、要件定義、設計、実装、テスト、リリースを行った
- 11月
  - メール配信システム改修（大規模）
    - 先輩と2人チームで対応を行った。自分は主に画面の実装、全域に渡るテスト計画作成を担当した
    - テスト計画作成はかなり大変だったが、とにかく隅から隅までソースコードを読みまくることによってシステム設計への理解が深まった感がある。明確に読みやすいところと読みにくいところがあったりして、こういう設計なら読みやすくなるのかという知見を得ることができた。
  - Goのログ集計システムレビュー
    - Goを読むのは初めてだったので勉強になった。冗長になったとしても読みやすさを重視する言語設計はかなり好きだな～と感じた。
- 12月
  - GASを使用した広告レポート自動出力機構の作成
    - GoogleAppScriptを使用した開発。1人でヒアリングからリリース運用まで担当した。小規模ではあるものの新規システム開発だったので、技術スタック（GoogleAdManagerAPI, xml, clasp, GCP, OAuth2.0など）も割と自由に決められて楽しかった。
    - 特にGoogle周りのシステムに関してはかなり知見が貯まった。
- 1-3月
  - GoogleAdManagerのラッパーシステム開発
    - 12月に引き続き、GASを使用した開発。GoogleAdManagerAPIから取得できる様々なデータを結合して整形して出力するなどした。とにかくコードを書きまくることができたので楽しかった。
    - slack, googleFormとの連携なども行った。WebHookは神。
    - ウェブ広告システムの勉強にもなって良かった

## 趣味でやったこと

- 主に触ったのは React, Next, TypeScript, firebase
  - 12月にはTypeScriptを勉強する1人アドベントカレンダーをやったりした
    - https://nuxt-ts-sample.netlify.app/advent/ 
  - すっかりTypeScript派になってしまった。型最高！
- 今期はかなりのモチベーションがあり色々なものを作れて良かった

### 作ったもの

#### 名刺代わりの10冊メーカー
  - https://books-card-maker.web.app/
  - Vue / Firebase
  - 小説10冊の表紙絵を並べた画像を生成できるシステムを、#名刺代わりの小説10選というハッシュタグと組み合わせたもの。
  - OGP画像の動的生成、シェアボタンの実装など、ツイッターでの拡散されやすさを狙った。
  - 小説へのamazonリンクにアフィリエイトを設定したりしてあわよくば臨時収入を図れるかと思ったが、そんな上手くいくはずもなく、累計UU数は200人程度に留まった。

#### Voxel Works
- https://hukurouo-voxel.netlify.app/
- webpack / Babel / Three.js
- MagicaVoxel で作った3Dオブジェクトを Three.js でレンダリングした。マウス or スワイプ操作でカメラを動かすことができる。
- Zennに『MagicaVoxelで作った3Dオブジェクトをサイトに表示させるまで』という記事を投稿した。
  - https://zenn.dev/hukurouo/articles/three-js-article-1

#### nuxt-ts-sample
- https://nuxt-ts-sample.netlify.app/
- Nuxt / TypeScript
- 1人アドベントカレンダー中に作った。Nuxt + TypeScript の勉強をアウトプットするための場。
  - TODOリスト
    - https://nuxt-ts-sample.netlify.app/todolist
  - ランダム猫画像
    - https://nuxt-ts-sample.netlify.app/axios/
  - 画像アップローダー
    - https://nuxt-ts-sample.netlify.app/uploader/
- 学習過程をまとめてZennに『Nuxt+TypeScript で Vuex/axios を型安全にする』という記事を投稿した
  - https://zenn.dev/hukurouo/articles/nuxt-ts-sample

#### iineum
- https://twi-iine-museum.netlify.app/
- React / tailwindcss / TwitterAPI / AWS Lambda
- twitterでいいねした画像をMasonry(石畳状)レイアウトで並べて表示するサイト
- 今期作った中だと一番気に入っており、今でも定期的にいいねした画像を眺めたりしている。他の人がいいねした画像もユーザー指定で見れるのも楽しい（自画自賛）
- ハンズオン形式の本にしてZennに投稿した
  - https://zenn.dev/hukurouo/books/iineum-hands-on
  - いいねが91ついたので嬉しい

#### ブログをNext.jsに置き換え
- https://hukurouo.com/
- Next / Vercel
- TypeScript化、OGP画像生成、タグ機能の実装など
- md -> html 変換を自前で実装したので、色々とカスタマイズできるようになり、ブログ執筆が楽になった


#### 5chtree
- https://5chtree.hukurouo.com/
- Next / Chakra
- ほとんど自分用に、5chログをツリー表示にするやつを作った
- 5chはAPIを公開していないので、スレッドからテキスト情報を直接コピペする形になった。正規表現を駆使してテキストをパースして組み直すみたいなことを内部で行っている。
- 作った当初はよく使っていたが、最近はあまり使っていない。コピペをして他のサイトに移すという一連動作の面倒くささを舐めていた。

#### 10つくるやつ
- https://10tuku.hukurouo.com/
- Next / Chakra / Firebase
- ミニゲームっぽいものを作りたいという気持ちがあり、そういえば車のナンバープレートで10をつくるのが好きだったなと思い出したのが製作のきっかけになった。
- タイムアタックのランキング機能をつけてみたら、予想以上に色んな人が遊んでくれてかなり嬉しかった。

#### ライフゲーム Mini
- Next / Chakra / Firebase / gifencoder
- https://gameoflife.hukurouo.com/
- 模造クリスタルのゲーム部リスペクト。スマホブラウザからでも手軽にライフゲームを体験できることを目指した。
- シェア時に映えるかなと思い、gif画像生成機能も実装した。

## やりたいこと

- いまのところ興味があるのはアニメーションあたり
  - そろそろポートフォリオページみたいなのを作ってみたいので、そのあたりに活かせたら良いなーと思っていたり


## 読んだ技術本

特に良かった本は太字になっています

- SQLパズル
- SQLアンチパターン
- **SQL実践入門**
- リレーショナルデータベース入門
- **ソフトウェアのテスト技術**
- 初めての自動テスト
- **理科系の作文技術**
