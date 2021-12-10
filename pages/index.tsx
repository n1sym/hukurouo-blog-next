import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";

export const config = {
  unstable_runtimeJS: false,
}

const navigations = [
  {name: "AtCoder", url: "https://atcoder.jp/users/hukurouo"},
  {name: "Blog", url: "/articles"},
  {name: "Blog (tech)", url: "https://tech.hukurouo.com"},
  {name: "Github", url: "https://github.com/hukurouo"},
  {name: "Tumbler", url: "https://hukurouo.tumblr.com"},
  {name: "Twitter", url: "https://twitter.com/hukurouo"},
  {name: "Twitter2", url: "https://twitter.com/hukurouo_code"},
  {name: "Zenn", url: "https://zenn.dev/hukurouo"},
]

const works = [
  {name: "iineum", url: "https://iineum.hukurouo.com"},
  {name: "king halos", url: "https://king-halo.hukurouo.com/"},
  {name: "books card maker", url: "https://books-card-maker.web.app/"},
  {name: "10tuku", url: "https://10tuku.hukurouo.com/"},
  {name: "Game Of Life Mini", url: "https://gameoflife.hukurouo.com/"},
  {name: "susumeru", url: "https://susumeru.herokuapp.com/index"},
  {name: "hit and blow", url: "https://game-club.vercel.app/hitandblow/"},
  {name: "space clock", url: "https://space-clock.hukurouo.com/"},
  {name: "voxel works", url: "https://voxel.hukurouo.com/"}
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
      <section className="mb-8">
        <h1 className="text-3xl font-bold my-4 font-mono"># hukurouo.com</h1>
        <img src="https://avatars.githubusercontent.com/u/49607363?v=4" width="200" height="200"></img>
      </section>
      <section className="mb-8">
        <h1 className="text-3xl font-bold my-4 font-mono"># Navigation</h1>
      <ul className="list-disc pl-5">
      {navigations.map(({ name, url}) => (
        <li className="my-2" key={name}>
          {name=="Blog" ? (
            <Link href={`${url}`}>
            <a className="text-gray-800 underline leading-7 text-lg ">{name}</a>
          </Link>
        ):(<><Link href={`${url}`}>
        <a className="text-gray-800 underline leading-7 text-lg " target="_blank" rel="noopener">{name}</a>
      </Link></>)}
          
        </li>
      ))}
      </ul>
      </section>
      <section className="mb-8">
        <h1 className="text-3xl font-bold my-4 font-mono"># Works</h1>
        <ul className="list-disc pl-5">
      {works.map(({ name, url}) => (
        <li className="my-2" key={name}>
          <Link href={`${url}`}>
            <a className="text-gray-800 underline leading-7 text-lg " target="_blank" rel="noopener">{name}</a>
          </Link>
        </li>
      ))}
      </ul>
      </section>
    </Layout>
  );
}
