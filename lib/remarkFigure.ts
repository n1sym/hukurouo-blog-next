import isUrl from 'is-url';
import { visitParents as visit } from 'unist-util-visit-parents'; // 修正
import { convert } from 'unist-util-is';
import { Node } from 'unist';

const isImgExt = (value: string) => /(\.|=)(svg|png|jpg|jpeg|gif)/.test(value);
const isAbsolutePath = (value: string) => value.startsWith('/');
const isRelativePath = (value: string) =>
  value.startsWith('./') || value.startsWith('../');
const isImgPath = (value: string) => isAbsolutePath(value) || isRelativePath(value);
const isInteractive = convert(['link', 'linkReference']);

export const images = () => {
  return transform;
};

function transform(tree: Node) {
  visit(tree, 'text', ontext);
}

function ontext(node: Node & { value?: string }, parents: Node[]) {
  if (!node.value) return; // 型ガードを追加
  const value = String(node.value).trim();
  const lines = value.split('\n');

  if (lines.length > 2) return;
  let [imgPath, caption] = lines;

  if (imgPath.includes('\r')) {
    imgPath = imgPath.split('\r')[0];
  }
  if (!caption) {
    caption = '';
  }
  if ((isUrl(imgPath) || isImgPath(imgPath)) && isImgExt(imgPath)) {
    let interactive = false;
    let length = parents.length;
    const siblings = (parents[length - 1] as any).children;

    // Check if we’re in interactive content.
    while (length--) {
      if (isInteractive(parents[length])) {
        interactive = true;
        break;
      }
    }

    const figure = {
      type: 'html',
      position: node.position,
      value: `<figure><img src="${imgPath}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`,
    };

    siblings[siblings.indexOf(node)] = figure;
  }
}