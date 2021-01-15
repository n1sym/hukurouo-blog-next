import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { images } from './remarkFigure'
import { links } from './remarkLink'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = convertYAML(fs.readFileSync(fullPath, 'utf8'))
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.reverse()
}

function convertYAML(fileContents){
  const keys = fileContents.split('---')[1].split('\n').filter((ele)=>{
    if (ele.includes(':')){return ele}
  })
  const body = fileContents.split('---')[2]
  let header = '---\n'
  keys.forEach((element)=>{
    if (element[element.length-1] === "'"){
      header += element + '\n'
    } else {
      const key = element.split(': ')[0]
      const value = element.split(': ')[1]
      header += key + ": '" + value + "'\n"
    }
  })
  return fileContents = header + '---\n' + body
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

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
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = convertYAML(fs.readFileSync(fullPath, 'utf8'))

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(images)
    .use(links)
    .use(require('remark-prism'))
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}