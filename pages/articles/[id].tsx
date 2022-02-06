import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import styles from "./articles.module.css";
import Link from "next/link";

export const config = {
  unstable_runtimeJS: false,
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta name="og:title" content={postData.title} />
      </Head>
      <article className={`${styles.article} mt-8 mb-8 lg:text-lg`}>
        <div className="text-3xl font-bold my-4 font-mono">{postData.title}</div>
        <div className="mt-2 mb-4">{postData.date}</div>
        <div className="">
        {postData.tags.map((tag: string) => {
                    return (
                      <Link href={`/tag/${tag}`} key={tag}>
                        <a>
                          <span className="text-gray-800 underline"> # {tag}</span>
                        </a>
                      </Link>
                    );
                  })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <div className="border mt-8 mb-8"></div>
        <span>twitter: </span>
        <Link href={`https://twitter.com/hukurouo`}>
          <a className="text-gray-800 leading-7 text-lg " target="_blank" rel="noopener">{"@hukurouo"}</a>
        </Link>
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
