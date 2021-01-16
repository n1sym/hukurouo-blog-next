---
title: 2020年にkindle本をどれだけ買ったのかを調べた
date: 2020-12-26
categories: 技術
tags: []
toc_flg: true
description: 
thumbnail: https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/images%2Frapture_20201226130235.png?alt=media&token=4668884b-32d8-4d61-a144-076d40805dcc
---

今年から本格的に電子書籍に移行した。アニメを見る機会が減り、その分漫画や小説を読む時間が増えたように思う。

どれだけ本を買ったのだろうと気になったので調べてみよう。

## GASでスクリプトを作る

kindleの購入履歴は全てGmailに送られてくるようになっているので、そこから購入データを読み取ってスプレッドシートに書き出したい。

まさに`GoogleAppScript`の使い所ということで、gsコードを書いていきます。

~~~ts
function searchMail() {
  const query = '"ご購入ありがとうございます。購入したkindle本はクラウドに保存され、コンテンツと端末の管理から確認できます。"';
  const start = 0;
  const max = 200; // ここは任意で。デフォ値は500です。
  const threads = GmailApp.search(query, start, max);
  getSubject(threads)
}

function getSubject(threads){
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);
  const values = [];
  for(const messages of messagesForThreads){
    const plainBody = messages[0].getPlainBody();
    if (messages[0].getDate() < new Date("2020/01/01 00:00:00")){
      break;
    }
    const arr = plainBody.split(/\r\n|\n/);
    const filterArr = arr.filter(str => str.includes("注文合計: "))
    const nedan = Number(filterArr[0].split(" ").reverse()[0].replace(",",""))
    const record = [
      messages[0].getDate(),
      nedan,
    ];
    values.push(record);
  }
  if(values.length > 0){
    SpreadsheetApp.getActiveSheet()
      .getRange(2, 1, values.length, values[0].length).setValues(values);
  }
}
~~~

一覧がシートに書き出されたのでsum関数で集計。合計金額は 136,989 円でした。

## グラフにしてみる

せっかくなので月別で集計してグラフにしてみます。

~~~ts{}[]
// 日時のログを月別に集計するQUERY関数
=QUERY($A$1:$B,"
  select month(A)+1, sum(B) 
  where A is not null 
  group by month(A)+1
", true)
~~~

<figure><img src="https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/images%2Frapture_20201226130235.png?alt=media&token=4668884b-32d8-4d61-a144-076d40805dcc"><figcaption>意外とばらつきがあった。</figcaption></figure>