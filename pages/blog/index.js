import Layout from '@/components/layout'
import dlv from 'dlv';
import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { scroller } from 'react-scroll';

const CategoryBlog = dynamic(() => import('@/components/blocks/BlogListing/CategoryBlog'), {
  ssr: true,
})

async function getPageData() {
  const selected_store = getCookie('store_code') || 'default';
  const response = await fetch(getStrapiURL('/graphql'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Store': `${selected_store}`
    },
    body: JSON.stringify({
      query: `
        query {
           blocks_data(identifiers : "support-menu,service-menu,main-header")
          }
        `,
      variables: {},
    }
    ),
  });

  return response.json();
}

const blogQuery = (page) => {
  return (`
    blog(pageSize: 10, currentPage: ${page}) {
      blogs_media_url
      blogs_count
      blogs_data {
        categories {
          category_id
          category_name
          category_url_key
          is_active
        }
        author {
          author_id
          name
          short_description
          image
          urlkey
          social_links {
            facebook_profile
            instagram_profile
            tiktok_profile
            linkedin_profile
            twitter_profile
            youtube_profile
          }
        }
        articles_id
        article_publish_date
        article_meta_title
        article_meta_description
        title
        featured
        identifier
        artilce_short_summary
        image
        thumbnail
        identifier
        articlesdetail
        related_products
        article_layout
      }
    }
  `)
}

export default function Blogs({ globalMagento, user, setUser, blogsCatgData, selectedCurrency, selectedStore, currencyData, storeData, slug, footer, blogBasicInfo, selectedPage, sarabun }) {
  const categories = dlv(blogsCatgData, 'data.blogcategories');
  const blogs_media_url = dlv(blogsCatgData, 'data.blog.blogs_media_url');
  const [page, setPage] = useState(selectedPage || 1);
  const [blogs, setBlogs] = useState(dlv(blogsCatgData, 'data.blog.blogs_data'));

  const fetchBlogs = async () => {
    const selected_store = getCookie('store_code') || 'default';
    try {
      const response = await fetch(getStrapiURL("/graphql"), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Store': `${selected_store}`
        },
        body: JSON.stringify({
          query: `{${blogQuery(page)}}`, variable: {},
        }),
      });

      const blogs = await response.json();
      setBlogs(dlv(blogs, 'data.blog.blogs_data'))
    } catch (e) { }
  }

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  let totalBlogsCount = Math.ceil(parseInt(dlv(blogsCatgData, 'data.blog.blogs_count')) / 10);

  let pageData = null;
  pageData = {
    meta_title: `${dlv(blogBasicInfo, '0.meta_title')}`,
    meta_description: `${dlv(blogBasicInfo, '0.meta_description')}`,
    url_key: `${slug}`
  }

  const scrollToDiv = (divId) => {
    scroller.scrollTo(divId, {
      duration: 1000,
      delay: 0,
      smooth: true
    });
  };

  const onPageChange = (currentPage) => {
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);

    // Set the new page query parameter
    queryParams.set('page', currentPage);

    // Reconstruct the URL with the updated query parameters
    const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    setPage(currentPage)
    scrollToDiv('blog_list')
  }

  const handleCategoryClick = () => {

  }

  return (
    <Layout pageData={pageData} globalMagento={globalMagento} user={user} setUser={setUser} selectedCurrency={selectedCurrency} selectedStore={selectedStore} currencyData={currencyData} storeData={storeData} footer={footer} getPageData={getPageData} isBlog={true}>
      <div className="main_container">
        <div className="blog_head">
          <div className="page_info">
            <h2 className="pg_title"></h2>
            <ul className="bdcrum">
              <li className="bdcrum_item"><Link href="/">Home</Link></li>
              <li className="bdcrum_item"><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <h2 className={`${sarabun} primary_title`}>{dlv(blogBasicInfo, '0.title')}</h2>
        </div>
      </div>
      <CategoryBlog selectedStore={selectedStore} blogBasicInfo={blogBasicInfo} categories={categories} blogs={blogs} blogsCatgData={blogsCatgData} handleCategoryClick={handleCategoryClick} blogs_media_url={blogs_media_url} totalBlogsCount={totalBlogsCount} page={page} onPageChange={onPageChange} sarabun={sarabun}/>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const locale = context.locale;
  let { page } = context.query;
  page = page ? parseInt(page) : 1;

  try {
    const cookies = context.req.cookies;
    const selectedCurrency = cookies.currency_code || 'USD';
    let newCookieValue = 'default';
    if (locale !== 'en') {
      newCookieValue = locale;
    }

    let categoriesBlogs = null;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com'}/api/blog`, {
          method: 'GET',
          headers: {
              'Content-Currency': `${selectedCurrency}`,
              'Store': `${newCookieValue}__false`,
          },
      });
      const responseData = await response.json();
      categoriesBlogs = responseData;

  } catch (e) { }

    const blog = JSON.parse(categoriesBlogs.data.blocks_data);

    const blocksData = JSON.parse(dlv(categoriesBlogs, 'data.cmsBlocks.items.0.blocks_data', []));
    const storeCurrency = JSON.parse(dlv(blocksData, '0.store_currency'));
    const footerNewsLetter = dlv(blocksData, '1');
    const footer = dlv(blocksData, '2');
    const footerBootom = dlv(blocksData, '3');
    const bestSellersBlock = dlv(blocksData, '4');
    const footerData = { footerNewsLetter: footerNewsLetter, footer: footer, footerBootom: footerBootom, bestSellersBlock: bestSellersBlock }
    const globalMagento = { children: JSON.parse(categoriesBlogs.data.cmsBlocks.items[0].content), footerData: footerData };

    return {
      props: { blogsCatgData: categoriesBlogs || null, preview: context.preview || null, slug: [context.resolvedUrl.replace(/\/\//g, '/')], blogBasicInfo: blog || null, globalMagento: globalMagento, storeData: storeCurrency, currencyData: storeCurrency.data.currency, selectedPage: page },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}