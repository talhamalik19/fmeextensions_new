import BlogSlider from '@/components/blocks/BlogListing/BlogSlider';
import BlogHeader from '@/components/blocks/BlogListing/BlogHeader';
import CategoryBlog from '@/components/blocks/BlogListing/CategoryBlog';
import LatestBlogs from '@/components/blocks/BlogListing/LatestBlogs';
import dlv from "dlv";
import { useEffect, useState } from 'react';

const CategoryIndex = ({ globalMagento, blogsCatgData, latestblogsgData, category_id, pageName, isLandingPage = true, selectedPage, bannerSlider, blogBasicInfo, singleCategory, getPageData }) => {
  const [customBlocksData, setCustomBlocksData] = useState([]);
    const fetchPageData = async () => {
        const pageData = await getPageData();
        setCustomBlocksData(JSON.parse(pageData.data.blocks_data));
    }

    useEffect(() => {
        fetchPageData();
      }, [globalMagento]);
  // Function to format date according to system's locale
  const formatPublishDate = (date) => {
    try {
      const formattedDate = new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date));

      // Check if formattedDate is a valid string
      if (formattedDate && formattedDate !== 'Invalid Date') {
        return formattedDate;
      } else {
        // Return a default value or the original date if formatting fails
        return date;
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      // Return a default value or the original date if an error occurs
      return date;
    }
  };

  return (
    <>
      <BlogHeader pageName={pageName} title={isLandingPage ? dlv(blogBasicInfo,'title') : dlv(singleCategory,'category_name')} />
      {isLandingPage && <BlogSlider blogSlider={bannerSlider} />}
      <CategoryBlog customBlocksData={customBlocksData} blogBasicInfo={blogBasicInfo} globalMagento={globalMagento} blogsCatgData={dlv(blogsCatgData,'data.blogcategories',[])} category_id={category_id} formatPublishDate={formatPublishDate} pageName={pageName} selectedPage={selectedPage} isLandingPage={isLandingPage} />
      {dlv(latestblogsgData, 'blogs_data.length') > 0 && <LatestBlogs customBlocksData={customBlocksData} latestblogsgData={latestblogsgData} formatPublishDate={formatPublishDate} />}
    </>
  );
}

export default CategoryIndex;
