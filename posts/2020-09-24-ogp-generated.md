---
title: nuxt/contentでOGPを生成する
date: 2020-09-24
categories: 技術
tags: []
---

OGPを作ります。

![OGP](https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/image%2Frapture_20200923234722.png?alt=media&token=866e43c6-972c-4324-806b-1b3b92f10907)

こういうやつ。

nuxtのOGPについてはこの記事が詳しいです。

[nuxt.js(v2)でSEOに必要なmeta(OGP)を入れたい](https://qiita.com/amishiro/items/b7260116b282d2cf2756)

nuxt/contentでは動的にコンテンツを生成しているので、各ページで自動でmetaタグを設定できるようにしたいです。まずはmixinファイルを作成します。

assets/mixins/meta.js
```js
export default {
  data() {
    return {
      meta: {
        title: "",
        type: "",
        url: "",
      },
      // ベースとなるurl。自分の環境に合わせてください。
      base: "https://hukurouo.web.app"
    };
  },
  head() {
    // 相対パスを取得。例えば'/item/1'とか
    const path = this.$route.path;

    // ここでmetaの中身を更新
    this.meta.title = this.articles.title;
    this.meta.type = "article";
    this.meta.url = this.base + path;

    // ここから先でmetaタグを書いていく
    return {
      title: this.meta.title,
      meta: [
        { hid: "og:title", property: "og:title", content: this.meta.title },
        { hid: "og:type", property: "og:type", content: this.meta.type },
        { hid: "og:url", property: "og:url", content: this.meta.url },
        { name: "twitter:title", content: this.meta.title },
        { name: "twitter:text:title", content: this.meta.title }
      ]
    };
  }
};
```

あとはこれを`_slug`でimportして起動させます。

pages/articles/_slug.vue
```js
import Meta from '~/assets/mixins/meta'
export default {
  async asyncData ({ $content, params }) {
    const articles = await $content('articles', params.slug || 'index').fetch()
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return { articles, prev, next }
  },
  mixins: [Meta],
}
```

これにて完了。

[Card validator](https://cards-dev.twitter.com/validator) でURLを打ち込むと、twitterでのOGPが確認できます。