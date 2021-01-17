import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import Articles from "../../components/Articles";
import { getAllTags, getSortedTagsPostsData } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Home({ allPostsData, tagName }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className="mb-8">
        <div className="mb-8 text-gray-700 text-lg">
          tags: {tagName}
        </div>
        <Articles allPostsData={allPostsData} tag/>
      </section>
      <section className="mb-16">
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTags()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPostsData = getSortedTagsPostsData(params.tag as string);
  const tagName = params.tag
  return {
    props: {
      allPostsData,
      tagName
    },
  };
};
