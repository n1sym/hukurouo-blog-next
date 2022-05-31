import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import styles from "./articles.module.css";
import Link from "next/link";
import { IineButton } from "../../components/IineButton";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta name="og:title" content={postData.title} />
      </Head>
      <article className={`${styles.article} mt-8 mb-4`}>
        <div className="text-2xl font-bold mb-4">{postData.title}</div>
        <div className="mt-2 mb-4">{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <div className="border mt-8 mb-8"></div>
        <span>twitter: </span>
        <Link href={`https://twitter.com/hukurouo`}>
          <a className="text-gray-800 leading-7" target="_blank" rel="noopener">{"@hukurouo"}</a>
        </Link> 
        <IineButton webhook_url={postData.url} title={postData.title}/>
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
  postData.url = process.env.DISCORD_WEBHOOK_URL
  return {
    props: {
      postData
    },
  };
};
