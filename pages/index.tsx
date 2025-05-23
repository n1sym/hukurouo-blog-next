import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";

export const config = {
  unstable_runtimeJS: false,
}

const accounts = [
  //{ name: "AtCoder", url: "https://atcoder.jp/users/hukurouo" },
  //{ name: "Github", url: "https://github.com/n1sym" },
  { name: "Tumbler", url: "https://hukurouo.tumblr.com" },
  { name: "Twitter", url: "https://twitter.com/hukurouo" },
  //{ name: "Twitter (tech)", url: "https://twitter.com/n1sym" },
  //{ name: "Zenn", url: "https://zenn.dev/hukurouo" },
]

const works = [
  { name: "iineum", url: "https://iineum.hukurouo.com" },
  { name: "pjsekai daily ranking", url: "https://pjsekai-song-daily-views.vercel.app/" },
  { name: "king halos", url: "https://king-halo.hukurouo.com/" },
  { name: "leading jockey", url: "https://leading-jockey.vercel.app/" },
  { name: "books card maker", url: "https://books-card-maker.web.app/" },
  { name: "10tuku", url: "https://10tuku.hukurouo.com/" },
  { name: "Game Of Life Mini", url: "https://gameoflife.hukurouo.com/" },
  { name: "space clock", url: "https://space-clock.hukurouo.com/" },
  { name: "voxel works", url: "https://voxel.hukurouo.com/" }
]

export default function Home() {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title>{siteTitle}</title>
        <meta
          property="og:image"
          content={`https://i.imgur.com/s123HpM.png`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary" />
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className="mb-4">
        <h1 className="text-2xl font-bold mb-4">hukurouo.com</h1>
      </section>
      <div className="flex flex-row flex-wrap">
      <section className="mb-4 w-48">
        <ul className="list-disc pl-5">
          <li className="my-1">
            <Link href={`/articles`} className="text-gray-800 underline leading-7 text-lg ">
              Blog
            </Link>
          </li>
          {accounts.map(({ name, url }) => (
            <li className="my-1" key={name}>
              {name == "Blog" ? (
                <Link href={`${url}`} className="text-gray-800 underline leading-7 text-lg ">
                  {name}
                </Link>
              ) : (<><Link
                href={`${url}`}
                className="text-gray-800 underline leading-7 text-lg "
                target="_blank"
                rel="noopener">
                {name}
              </Link></>)}
            </li>
          ))}
          
        </ul>
        <br></br>
        <p className="leading-7 text-lg">別名義 : <Link
          href={`https://n1sym.com/`}
          className="text-gray-800 underline leading-7 text-lg ">
              @n1sym
            </Link></p>
      </section>
      
      </div>
    </Layout>
  );
}
