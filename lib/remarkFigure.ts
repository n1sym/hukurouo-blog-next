import isUrl from 'is-url'
import visit from 'unist-util-visit-parents'
import convert from 'unist-util-is/convert'

const isImgExt = (value) => /(\.|=)(svg|png|jpg|jpeg|gif)/.test(value)
const isAbsolutePath = (value) => value.startsWith('/')
const isRelativePath = (value) =>
  value.startsWith('./') || value.startsWith('../')
const isImgPath = (value) => isAbsolutePath(value) || isRelativePath(value)
// @ts-ignore
const isInteractive = convert(['link', 'linkReference'])

export const images = () => {
  return transform
}

function transform(tree) {
  visit(tree, 'text', ontext)
}

function ontext(node, parents) {
  const value = String(node.value).trim()
  const lines = value.split('\n')

  if (lines.length > 2) return
  let [imgPath, caption] = lines

  if(imgPath.includes('\r')){imgPath = imgPath.split('\r')[0]}
  if(!caption){caption = ''}
  if ((isUrl(imgPath) || isImgPath(imgPath)) && isImgExt(imgPath)) {
    let interactive = false
    let length = parents.length
    const siblings = parents[length - 1].children

    // Check if we’re in interactive content.
    while (length--) {
      if (isInteractive(parents[length])) {
        interactive = true
        break
      }
    }

    const figure = {
      type: 'html',
      position: node.position,
      value: `<figure><img src="${imgPath}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`,
    }

    siblings[siblings.indexOf(node)] = figure
  }
}