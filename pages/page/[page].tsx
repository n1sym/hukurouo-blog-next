import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import Articles from "../../components/Articles";
import {
  getAllPages,
  getSortedPostsData,
  getPagesCount,
} from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

export default function Home({ allPostsData, nextPage, pagesCount, prevPage }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className="mb-8">
        <Articles allPostsData={allPostsData} />
      </section>
      {pagesCount + 1 == nextPage ? (
        <>
          <section className="mb-16">
            <Link href={`/page/${prevPage}`}>
              <a className="text-xl font-semibold text-link-blue">prev</a>
            </Link>
          </section>
        </>
      ) : (
        <>
          <section className="mb-16">
            {prevPage == 0 ? (
              <></>
            ) : (
              <>
                <Link href={`/page/${prevPage}`}>
                  <a className="text-xl font-semibold text-link-blue mr-8">
                    prev
                  </a>
                </Link>
              </>
            )}
            <Link href={`/page/${nextPage}`}>
              <a className="text-xl font-semibold text-link-blue">next</a>
            </Link>
          </section>
        </>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPages();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPostsData = getSortedPostsData(params.page as string);
  const pagesCount = getPagesCount();
  const nextPage = Number(params.page) + 1;
  const prevPage = Number(params.page) - 1;
  return {
    props: {
      allPostsData,
      pagesCount,
      nextPage,
      prevPage,
    },
  };
};
