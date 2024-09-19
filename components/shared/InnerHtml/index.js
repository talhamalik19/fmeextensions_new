import React from 'react';
import he from 'he';

const InnerHtml = ({ class_, content, isBlogDetail, locale }) => {
  let htmlContent = content;
  try{
    htmlContent = content.replaceAll('data-element="desktop_image"','data-element="desktop_image" loading="lazy" width="565" height="385" style="width:auto;height:auto"').replaceAll('data-element="mobile_image"','data-element="mobile_image" loading="lazy" width="310" height="211" style="width:auto;height:auto"');
  }catch(e){}

  if (isBlogDetail) {
    // Handle blog details if needed
  } else {
    return (
      content && (
        <div
          className={class_ !== "" ? class_ : ""}
          dangerouslySetInnerHTML={{ __html: he.decode(htmlContent) }}
        ></div>
      )
    );
  }
};

InnerHtml.defaultProps = {};
export default InnerHtml;
