import { useEffect, useState } from 'react'
import BlogSideBar from './BlogSideBar'
import InnerHtml from '@/components/shared/InnerHtml';
import dlv from 'dlv';
import Link from 'next/link';
import { customBlocks } from '@/pages/api/page';

export default function BlogContentWraper({ blogProduct, blogContent, locale, setCartItems }) {
  // Sidebar Sticky effect og blog Detail page
  const [isSticky, setIsSticky] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const blogContent = document.querySelector('.blog_dtl_container');
      if (blogContent) {
        const rect = blogContent.getBoundingClientRect();
        const isContainerVisible = rect.top <= 0;
        setIsSticky(isContainerVisible);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        window.addEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll)
        setIsSticky(false);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to handleResiz

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  // 
  const [blockContent, setBlockContent] =useState([]);
  const fetchBlockContent = async () => {
    const customBlocksData = await customBlocks('block-blog-created');
    try{
      setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0])
    } catch(e) {
    }
  };
  useEffect(() => {
    fetchBlockContent()
  }, []);
  return (
    <>
      <div className="section_padding">
        <div className="main_container">
          <div className={`blog_dtl_container ${isSticky ? 'sticky' : ''}`}>
            <BlogSideBar blogProduct={blogContent.related_products} />
            {/* <BlogContent/> */}
            <div className="blog_content_sec">
            <InnerHtml content={dlv(blogContent, 'articlesdetail')} locale={locale} setCartItems={setCartItems} />
            {blockContent && <p className="fme_blog_created primary_text">{dlv(blockContent, 'text')} <Link href={`/${dlv(blockContent,'button.field_redirect')}`}>{dlv(blockContent,'button.field_text')}</Link></p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
