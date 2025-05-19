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
    <Layout>
      {/* Keep the existing code here */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h1 className="text-xl font-bold my-4"># Tags</h1>
      </section>
      {["良かった作品","ノベルゲーム","漫画"].map((tag: string) => {
                    return (
                      <Link href={`/tag/${tag}`} key={tag} className="mr-3">

                        <span className="text-gray-700 underline"> #{tag} </span>

                      </Link>
                    );
                  })}
      <section>
        <h1 className="text-xl font-bold my-4"># Pages</h1>
      </section>
      <section className="mb-8">
        <Articles allPostsData={allPostsData} />
      </section>
      {pagesCount + 1 == nextPage ? (
        <>
          <section className="mb-8">
            <Link href={`/page/${prevPage}`} className="text-xl font-semibold">
              prev
            </Link>
          </section>
        </>
      ) : (
        <>
          <section className="mb-8">
            {prevPage == 0 ? (
              <></>
            ) : (
              <>
                <Link href={`/page/${prevPage}`} className="text-xl font-semibold mr-8">
                  
                    prev
                  
                </Link>
              </>
            )}
            <Link href={`/page/${nextPage}`} className="text-xl font-semibold">
              next
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
