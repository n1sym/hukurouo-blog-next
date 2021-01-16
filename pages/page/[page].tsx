import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import Articles from "../../components/Articles";
import { getAllPages, getSortedPostsData } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from "next/link";

export default function Home({ allPostsData, nextPage }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className="mb-16">
        <Articles allPostsData={allPostsData}/>
      </section>
      <section className="mb-16">
        <Link href={`/page/${nextPage}`}>
         <a className="text-xl font-semibold text-link-blue">next page</a>
        </Link>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPages()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPostsData = getSortedPostsData(params.page as string);
  const nextPage = Number(params.page) + 1
  return {
    props: {
      allPostsData,
      nextPage
    },
  };
};
