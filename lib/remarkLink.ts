import isUrl from 'is-url';
import { visitParents as visit } from 'unist-util-visit-parents'; // 名前付きエクスポートを使用
import { convert } from 'unist-util-is';
import { Node } from 'unist';

const isAbsolutePath = (value: string) => value.startsWith('/');
const isRelativePath = (value: string) =>
  value.startsWith('./') || value.startsWith('../');
const isImgPath = (value: string) =>
  isAbsolutePath(value) || isRelativePath(value);
const isInteractive = convert(['link', 'linkReference']);

export const links = () => {
  return transform;
};

function transform(tree: Node) {
  visit(tree, 'text', ontext);
}

function ontext<V extends Node & { value?: string }>(node: V, parents: Node[]) {
  if (!node.value) return; // 型ガードを追加
  const value = String(node.value).trim();

  const lines = value.split('\n');

  if (lines.length > 2) return;
  const [linkPath, caption] = lines;

  if (isUrl(linkPath) || isImgPath(linkPath)) {
    let interactive = false;
    let length = parents.length;
    const siblings = (parents[length - 1] as any).children as Node[]; // 型キャストを追加

    // Check if we’re in interactive content.
    while (length--) {
      if (isInteractive(parents[length])) {
        interactive = true;
        break;
      }
    }
    if (interactive) return;

    const link = {
      type: 'html',
      position: node.position,
      value: `<a href="${linkPath}" target="_blank" rel="noopener">
      ${caption ? caption : `<span> ${linkPath}</span>`}
      </a>`,
    };

    siblings[siblings.indexOf(node)] = link;
  }
}