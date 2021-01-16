import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja" className="font-body text-base text-gray-700 break-words">
        <Head>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}