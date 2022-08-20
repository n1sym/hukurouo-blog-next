import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import Articles from "../../components/Articles";
import { getSortedPostsData } from "../../lib/posts";
import { GetStaticProps } from "next";
import Link from "next/link";

export const config = {
  unstable_runtimeJS: false,
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      {/* Keep the existing code here */}
      <Head>
        <title>{siteTitle}</title>
        <meta name="og:title" content={siteTitle} />
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h1 className="text-xl font-bold my-4"># Tags</h1>
      </section>
      {["良かった作品","ノベルゲーム","漫画","プロセカ"].map((tag: string) => {
                    return (
                      <Link href={`/tag/${tag}`} key={tag}>
                        <a className="mr-3">
                          <span className="text-gray-700 underline"> # {tag} </span>
                        </a>
                      </Link>
                    );
                  })}
      <section>
        <h1 className="text-xl font-bold my-4"># Pages</h1>
      </section>
      <section className="mb-8">
        <Articles allPostsData={allPostsData}/>
      </section>
      <section className="mb-8">
        <Link href={`/page/2`}>
         <a className="text-xl font-semibold">next</a>
        </Link>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData('1');
  return {
    props: {
      allPostsData,
    },
  };
};
