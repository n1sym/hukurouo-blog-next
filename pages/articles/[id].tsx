import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import styles from "./articles.module.css";

export const config = {
  unstable_runtimeJS: false,
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta name="og:title" content={postData.title} />
        {postData.thumbnail ? (
          <>
            <meta property="og:image" content={postData.thumbnail} />
            <meta name="twitter:card" content="summary_large_image" />
          </>
        ) : (
          <>
            <meta
              property="og:image"
              content={`https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/image%2Fwh.png?alt=media&token=5adfeea7-d45b-463e-b2f4-edceae1ab06e`}
            />
            <meta name="twitter:card" content="summary" />
          </>
        )}
      </Head>
      <article className={`${styles.article} mt-16 mb-8`}>
        <div className="text-2xl font-bold leading-snug	">{postData.title}</div>
        <div className="text-gray-500 mt-2 mb-8">{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
