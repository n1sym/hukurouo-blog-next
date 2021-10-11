import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";

const name = "hukurouo.com";
export const siteTitle = "hukurouo";

type typeLayout = {
  children: React.ReactNode;
  home?: boolean;
};

export default function Layout({ children, home }: typeLayout) {
  return (
    <div className={styles.container}>
      <header className="mb-6">
        {!home && (
          <>
            <div className="text-lg">
              <Link href="/">
                <a className="text-gray-700 underline">{name}</a>
              </Link>

              <span> {">"} </span>
              <Link href="/articles">
                <a className="text-gray-700 underline">{"blog"}</a>
              </Link>
            </div>
          </>
        )}
      </header>
      <main>{children}</main>
      <div className="mb-24"></div>
    </div>
  );
}
