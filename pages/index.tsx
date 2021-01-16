import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import { GetStaticProps } from "next";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className="mb-16">
        <ul className="">
          {allPostsData.map(({ id, date, title, tags, description }) => (
            <li className="mb-3" key={id}>
              <Link href={`/articles/${id}`}>
                <a className="text-xl font-semibold text-link-blue ">{title}</a>
              </Link>
              <div className="flex mt-0.5">
                <div className="text-gray-500 text-base pt-1">
                  {date} :
                </div>
                <div>
                  {tags.map((tag: string) => {
                    return (
                      <Link href="" key={tag}>
                        <a className="text-xs bg-gray-100 text-gray-500 rounded ml-1.5 px-1 py-0.5">
                          {tag}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="text-gray-700 text-base mt-2 mb-8">
                {description}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
