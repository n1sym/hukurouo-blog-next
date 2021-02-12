---
title: ライフゲームを作った
date: 2021-02-11
categories: 技術
tags: []
toc_flg: false
description: 
thumbnail: https://i.imgur.com/1dUkirGl.png
---

https://gameoflife.hukurouo.com/

https://i.imgur.com/ATupe3w.gif
グライダー

模造クリスタルのゲーム部（２）を読んで以来、ライフゲームはいつか作りたいと思っていた。ただシステムを再現するというのもつまらなかったので、スマホブラウザからでも手軽にライフゲームを体験できることを目指した。

https://i.imgur.com/OrkTEb0.png

UIのデザインはスマホ利用を意識して作った。最初は再生ボタンとかを上部に置いていたのですが、それだと片手でスマホを持っているときにかなり押しにくいことに気づき、全てのボタンを下部にまとめた。

今回もUIフレームワークはChakraを使用した。もう今後はずっとこれでやっていこうと思えるほど開発体験が素晴らしい。

gif画像生成は`gifencoder`を使った。jsでgifを生成する方法のドキュメントが古いものしか見つからなかったので自分で書こうかなと思ったが、独自のgifを生成したい需要ってあまり無さそうなんですよね。気が向いたら書こう。

https://i.imgur.com/ZVLlKnp.png
もぞくりゲーム部は最高なので読んでください。