import React, { useEffect, useState } from 'react';
import { parse } from 'himalaya';
import BuyNowDialog from '@/components/blocks/HomeProdListing/BuyNowDialog';

const BuyNowButton = ({ onClick, href }) => {
  return <button onClick={() => onClick(href)}>Buy Now</button>;
};

const InnerHtml = ({ class_, content, isBlogDetail, locale }) => {
  const [dialogBuyNow, setDialogBuyNow] = useState(false);
  const [url_key, setUrlKey] = useState('');
  const openModal = () => {
    setDialogBuyNow(true)
    document.body.style.overflow = 'hidden';
  }
  const closeModal = () => {
    setDialogBuyNow(false);
    // Re-enable scrolling when the popup is closed
    document.body.style.overflow = 'auto';
  };

  const buyNowHandler = (href) => {
    let slug = href.replace('.html', '').replace(process.env.NEXT_PUBLIC_API_URL, '').replace(`/${locale}/`, '');
    setUrlKey(slug)
    openModal();
  };

  if (isBlogDetail) {
    const [modifiedHtmlContent, setModifiedHtmlContent] = useState('');

    useEffect(() => {
      // Parse the HTML string into JSON
      const jsonTree = parse(content);
      let href = '';

      // Function to traverse and filter/modify the JSON tree
      const filterAndModifyTree = (node) => {
        if (node.type === 'element' &&
          node.tagName === 'a' &&
          node.attributes.some((attr) => attr.key === 'class' || attr.value === 'product-item-photo')
        ) {
          node.attributes.some((attr) => {
            if (attr.key === 'href') {
              href = node.attributes.find((attr) => attr.key === 'href')?.value;
            }
          }
          )
          const hrefAttr = node.attributes.find((attr) => attr.key === 'href');
          if (hrefAttr) {
            hrefAttr.value = href.replace(process.env.NEXT_PUBLIC_API_URL, '').replace(`/${locale}/`, '/').replace('.html', '');
            return node;
          } else {
            return node;
          }
        }
        if (
          node.type === 'element' &&
          node.tagName === 'div' &&
          node.attributes.some((attr) => attr.key === 'class' && attr.value === 'product-item-inner')
        ) {
          // Replace the div with your custom component
          return {
            type: 'component',
            tagName: BuyNowButton,
            props: { onClick: buyNowHandler, href },
          };
        }

        if (node.children) {
          node.children = node.children.map(filterAndModifyTree);
        }

        return node;
      };

      // Filter and modify the JSON tree to replace the element with class "product-item-inner"
      const modifiedJsonTree = jsonTree.map(filterAndModifyTree);

      // Manually render the modified JSON tree
      const renderHtml = (node) => {
        if (node.type === 'element') {
          const attributes = node.attributes.reduce((acc, attr) => {
            if (attr.key && attr.value) {
              acc[attr.key] = attr.value;
            }
            return acc;
          }, {});

          const children = node.children.map(renderHtml);

          return React.createElement(node.tagName, attributes, ...children);
        } else if (node.type === 'text') {
          return node.content;
        } else if (node.type === 'component') {
          const Component = node.tagName;
          return <Component {...node.props} />;
        }

        return null;
      };

      // Render the modified JSON tree to React elements
      const modifiedReactElements = modifiedJsonTree.map(renderHtml);

      // Set the modified React elements to the state
      setModifiedHtmlContent(modifiedReactElements);
    }, [content]);
    return (
      <div className={class_ !== '' ? class_ : ''}>
        {
          dialogBuyNow ? <BuyNowDialog url_key={url_key} isDescriptionEnabled={false} setDialogBuyNow={setDialogBuyNow} closeModal={closeModal} pageName={'pageName'} /> : ''
        }
        {modifiedHtmlContent}
      </div>
    );
  } else {
    return (
      content && (
        <div
          className={class_ != "" ? class_ : ""}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )
    );
  }
};

InnerHtml.defaultProps = {};
export default InnerHtml;
