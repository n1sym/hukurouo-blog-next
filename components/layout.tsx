import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";

const name = "hukurouo.com 🦉";
export const siteTitle = "hukurouo.com";

type typeLayout = {
  children: React.ReactNode;
  home?: boolean;
};

export default function Layout({ children, home }: typeLayout) {
  return (
    <div className={styles.container}>
      <Head>
      </Head>
      <header className="mb-12">
        <h2 className="flex justify-center items-center font-bold text-2xl mt-8 mb-6 mx-5">
          <Link href="/">
            <a className="text-gray-700">{name}</a>
          </Link>
        </h2>
        <div className="flex justify-center">
          <div className="inline-grid grid-flow-col gap-x-4">
            <a href="https://twitter.com/hukurouo" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(75, 82, 88)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="https://github.com/hukurouo" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(75, 82, 88)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-github"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://hukurouo.tumblr.com/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(75, 82, 88)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-image"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
