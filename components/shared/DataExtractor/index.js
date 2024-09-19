const { parse } = require('himalaya');

function extractInfo(html, _class) {
    const infoList = [];
  
    const tree = parse(html);
  
    let currentInfo = null;
  
    function traverse(node) {
      if (node.type === 'element') {
        if (
          node.tagName === 'figure' &&
          node.attributes.some(attr => attr.key === 'class' && attr.value.includes(_class))
        ) {
          currentInfo = {}; // Create a new object for each occurrence
  
          for (const attr of node.attributes) {
            switch (attr.key) {
              case 'class':
                currentInfo.class = attr.value;
                break;
              case 'style':
                currentInfo.style = attr.value;
                break;
              default:
                // Handle other attributes as needed
                break;
            }
          }
        }
  
        if (currentInfo && node.tagName === 'a') {
          for (const attr of node.attributes) {
            switch (attr.key) {
              case 'href':
                currentInfo.href = attr.value;
                break;
              case 'title':
                currentInfo.title = attr.value;
                break;
              case 'target':
                currentInfo.target = attr.value;
                break;
              default:
                // Handle other attributes as needed
                break;
            }
          }
  
          for (const aChildNode of node.children) {
            if (aChildNode.type === 'element' && aChildNode.tagName === 'img') {
              const imgInfo = {};
  
              for (const attr of aChildNode.attributes) {
                switch (attr.key) {
                  case 'src':
                    imgInfo.src = attr.value;
                    break;
                  case 'alt':
                    imgInfo.alt = attr.value;
                    break;
                  case 'title':
                    imgInfo.title = attr.value;
                    break;
                  default:
                    // Handle other attributes as needed
                    break;
                }
              }
  
              if (!currentInfo.img) {
                currentInfo.img = imgInfo;
              } else {
                currentInfo.img.desktop = imgInfo;
              }
            }
          }
        }
      }
  
      for (const childNode of node.children || []) {
        traverse(childNode);
      }
  
      if (currentInfo && node.tagName === 'figure') {
        infoList.push(currentInfo);
        currentInfo = null; // Reset currentInfo after processing
      }
    }
  
    traverse({ type: 'element', tagName: 'root', children: tree });
  
    return infoList;
  }

  function extractText(html, _class) {
    const texts = [];
  
    const tree = parse(html);
  
    let insideTitle = false;
    let currentTitle = '';
  
    function traverse(node) {
      if (node.type === 'element') {
        if (node.tagName === 'div') {
          for (const attr of node.attributes) {
            if (attr.key === 'class' && attr.value.includes(_class)) {
              insideTitle = true;
            }
          }
        }
      } else if (node.type === 'text' && insideTitle) {
        currentTitle += node.content;
      }
  
      for (const childNode of node.children || []) {
        traverse(childNode);
      }
  
      if (node.type === 'element' && node.tagName === 'div' && insideTitle) {
        texts.push({ text: currentTitle });
        currentTitle = '';
        insideTitle = false;
      }
    }
  
    traverse({ type: 'element', tagName: 'root', children: tree });
  
    return texts;
  }
  
  function extractLinkInfo(html, _class) {
    const linkList = [];
  
    const tree = parse(html);
  
    function traverse(node) {
      if (node.type === 'element') {
        if (
          node.tagName === 'div' &&
          node.attributes.some(attr => attr.key === 'class' && attr.value.includes(_class))
        ) {
          const currentLink = {};
  
          for (const childNode of node.children) {
            if (childNode.type === 'element' && childNode.tagName === 'a') {
              for (const attr of childNode.attributes) {
                switch (attr.key) {
                  case 'href':
                    currentLink.href = attr.value;
                    break;
                  case 'title':
                    currentLink.title = attr.value;
                    break;
                  case 'target':
                    currentLink.target = attr.value;
                    break;
                  default:
                    // Handle other attributes as needed
                    break;
                }
              }
              
              currentLink.text = extractTextFromNode(childNode);
              
              linkList.push(currentLink);
            }
          }
        }
  
        for (const childNode of node.children) {
          traverse(childNode);
        }
      }
    }
  
    function extractTextFromNode(node) {
      if (node.type === 'element' && node.children) {
        return node.children.map(child => {
          if (child.type === 'text') {
            return child.content.trim();
          } else {
            return extractTextFromNode(child);
          }
        }).join(' ');
      }
      return '';
    }
  
    traverse({ type: 'element', tagName: 'root', children: tree });
  
    return linkList;
  }

  module.exports = { extractInfo, extractText, extractLinkInfo };