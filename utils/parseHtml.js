// utils/parseHtml.js

import { parse } from 'himalaya';

export function parseHtml(htmlString) {
  const parsedHtml = parse(htmlString);
  return parsedHtml;
}

export function extractTextFromPTagsH1TagsAndButtons(parsedHtml) {
  const pTexts = [];
  const h1Texts = [];
  const buttonTexts = [];

  function traverse(node) {
    if (node.type === 'element') {
      if (node.tagName === 'p') {
        const text = extractText(node.children);
        pTexts.push(text);
      } else if (node.tagName === 'h1') {
        const text = extractText(node.children);
        h1Texts.push(text);
      } else if (node.tagName === 'button') {
        const text = extractText(node.children);
        buttonTexts.push(text);
      }

      if (node.children) {
        node.children.forEach(traverse);
      }
    }
  }

  function extractText(children) {
    return children.map((child) => {
      if (child.type === 'text') {
        return child.content;
      } else if (child.children) {
        return extractText(child.children);
      }
      return '';
    }).join(' ');
  }

  parsedHtml.forEach(traverse);

  return {
    pTexts,
    h1Texts,
    buttonTexts,
  };
}
