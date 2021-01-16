---
title: 過去に書いた記事をインポートしました
date: 2020-10-28
categories: 日記
tags: []
---

2015~2017年にはてなブログで書いていた記事（アニメ、なろう小説、ゲームなどの感想文）と、去年あたりに書いていたプログラミング日記を hukurouo.web に取り込みました。


以下、はてなブログのエクスポートデータからmdファイルを生成するコードです。本文ははてなキーワード汚染が酷かったので直接コピペしてました。

```rb[]
Encoding.default_external = 'utf-8'
data = ""

File.foreach("owlhoot.hateblo.jp.export.txt"){|line|
  data += line + ",,"
}

data = data.to_s.split("--------\n,,")

p data.size
p data[0]
p data[1]


data.each do |d|
  cont = d.split(",,")
  title = cont[1].split(":")[1]
  row_date = cont[2]
  date = row_date[10..13] + "-" + row_date[15..16] + "-" + row_date[18..19]

  File.open('C:\code\scripts\md2' + "\\" + date + ".md", mode = 'w'){|f|
    f.write("---\n")
    f.write('title: ' + title)
    f.write('date: ' + date + "\n")
    f.write("categories: 感想文\n")
    f.write("tags: [小説家になろう]\n")
    f.write("---\n")
  }
end
```