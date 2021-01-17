import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { images } from "./remarkFigure";
import { links } from "./remarkLink";

const postsDirectory = path.join(process.cwd(), "posts");

type PostItem = {
  id: string;
  title: string;
  date: string;
  categories: string;
  tags: string[];
  description?: string;
  toc_flg?: boolean;
  thumbnail?: string;
};

export function getSortedPostsData(page: string) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory).reverse();
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = convertYAML(fs.readFileSync(fullPath, "utf8"));
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    } as PostItem;
  });
  // Sort posts by date
  const pageNum = Number(page) - 1;
  return allPostsData
    .filter((data) => !data.tags.includes("advent"))
    .slice(20 * pageNum, 20 + 20 * pageNum);
}

export function getSortedTagsPostsData(tag: string){
  const fileNames = fs.readdirSync(postsDirectory).reverse();
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = convertYAML(fs.readFileSync(fullPath, "utf8"));
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    } as PostItem;
  });
  return allPostsData
    .filter((data) => data.tags.includes(tag))
}

function convertYAML(fileContents) {
  const keys = fileContents
    .split("---")[1]
    .split("\n")
    .filter((ele) => {
      if (ele.includes(":")) {
        return ele;
      }
    });
  const body = fileContents.split("---")[2];
  let header = "---\n";
  keys.forEach((element) => {
    if (element[element.length - 1] === "'" || element.includes("tags")) {
      header += element + "\n";
    } else {
      const key = element.split(": ")[0];
      const value = element.split(": ")[1];
      header += key + ": '" + value + "'\n";
    }
  });
  return (fileContents = header + "---\n" + body);
}

export function getAllPages() {
  const fileNames = fs.readdirSync(postsDirectory);
  const pagesCount = Math.floor(fileNames.length / 20);
  const array = Array(pagesCount)
    .fill(null)
    .map((_, i) => i + 1);
  return array.map((fileName) => {
    return {
      params: {
        page: String(fileName)
      },
    };
  });
}

export function getAllTags(){
  const fileNames = fs.readdirSync(postsDirectory).reverse();
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = convertYAML(fs.readFileSync(fullPath, "utf8"));
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    } as PostItem;
  });
  const array = allPostsData.map((post)=>{return post.tags[0]}).filter((tag) => tag !== undefined)
  const uniqArray = Array.from(new Set(array))
  return uniqArray.map((tag) => {
    return {
      params: {
        tag: tag
      },
    };
  });
}

export function getPagesCount() {
  const fileNames = fs.readdirSync(postsDirectory);
  return Math.floor(fileNames.length / 20);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = convertYAML(fs.readFileSync(fullPath, "utf8"));

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(images)
    .use(links)
    .use(require("remark-prism"))
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
