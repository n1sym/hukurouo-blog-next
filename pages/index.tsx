import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Articles from "../components/Articles";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import Link from "next/link";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title>{siteTitle}</title>
        <meta
          property="og:image"
          content={`https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/image%2Fwh.png?alt=media&token=5adfeea7-d45b-463e-b2f4-edceae1ab06e`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary" />
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className="mb-8">
        <Articles allPostsData={allPostsData}/>
      </section>
      <section className="mb-16">
        <Link href={`/page/2`}>
         <a className="text-xl font-semibold text-link-blue">next page</a>
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
