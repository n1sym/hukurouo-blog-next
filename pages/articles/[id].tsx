import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import styles from "./articles.module.css";
import Link from "next/link";
import { useState } from 'react'

export const config = {
  unstable_runtimeJS: false,
}

export default function Post({ postData }) {
  const [isDisplay, setIsDisplay] = useState(false)
  function postIine(title: string) {
    const url = postData.url
    const data = {"username":"blog", "content": title + "がいいねされました"}
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    }).catch(error => console.error(error));
    toggleDisplay()
  }
  function toggleDisplay() {
    setIsDisplay(!isDisplay)
  }

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
        <button className="bg-transparent text-blue-700 border py-2 px-4 ml-4 mr-2 rounded-full hover:bg-gray-100" disabled={isDisplay ? true : false } onClick={() => postIine(postData.title)}>
          👍
        </button>
        <span className="input-group" style={{ display: isDisplay ? '' : 'none' }}> {"<"} thank you ! </span>
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
