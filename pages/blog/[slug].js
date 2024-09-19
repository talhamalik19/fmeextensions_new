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
const BlogDetail = dynamic(() => import('@/components/blocks/BlogDetail'), {
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
          blocks_data(identifiers : "support-menu,service-menu,main-header,blog")
          }
        `,
            variables: {},
        }
        ),
    });

    return response.json();
}

const blogQuery = () => {
    return (`
      {
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
  `)
}

export default function Categories({ globalMagento, user, setUser, blogsCatgData, selectedCurrency, selectedStore, currencyData, storeData, slug, footer, blogBasicInfo, selectedPage, loadBlogs, isCategoryPage, sarabun }) {
    const selectedCategory = dlv(blogsCatgData, 'data.blogcategories.0.category_id');
    const [categories, setCategories] = useState(null);
    let blogs_media_url = dlv(blogsCatgData, 'data.blogcategories.0.blogs_media_url');
    if (!isCategoryPage) {
        blogs_media_url = dlv(blogsCatgData, 'data.blog.blogs_media_url');
    }
    const [page, setPage] = useState(selectedPage || 1);
    const [isPaginationClicked, setIsPaginationClicked] = useState(loadBlogs);
    const [blogs, setBlogs] = useState(null);

    const fetchBlogs = async () => {
        const selected_store = getCookie('store_code') || 'default';
        let filter = ``;
        let query = ``;
        if (isPaginationClicked) {
            filter = `filter: {url_key: "${slug}"},`;
            /* query = `blogs ${blogQuery()}`; */
        }
        query = `blogs ${blogQuery()}`;
        try {
            const response = await fetch(getStrapiURL("/graphql"), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Store': `${selected_store}`
                },
                body: JSON.stringify({
                    query: `{
                        blogcategories(${filter} pageSize: 100, currentPage: 1, blogpageSize:10, blogcurrentPage:${page}) {
                            category_id
                            category_name
                            url_key
                            status
                            blogs_count
                            blogs_media_url
                            ${query}
                          }
                    }
            `, variable: {},
                }),
            });

            const blogs = await response.json();
            setBlogs(dlv(blogs, 'data.blogcategories.0.blogs'))
            if (isPaginationClicked) {
                setBlogs(dlv(blogs, 'data.blogcategories.0.blogs'))
            } else {
                setCategories(dlv(blogs, 'data.blogcategories'))
            }
        } catch (e) { }
    }

    useEffect(() => {
        fetchBlogs();
    }, [page, slug]);

    useEffect(() => {
        if (isPaginationClicked) {
            setIsPaginationClicked(true)
            setPage(1);
            setBlogs(null)
            fetchBlogs();
        }
    }, [slug]);

    let totalBlogsCount = Math.ceil(parseInt(dlv(blogsCatgData, 'data.blogcategories.0.blogs_count')) / 10)
    let pageData = null;
    pageData = {
        meta_title: `${dlv(blogBasicInfo, '0.meta_title')}`,
        meta_description: `${dlv(blogBasicInfo, '0.meta_description')}`,
        url_key: `/blog/${slug}`
    }

    if (!isCategoryPage) {
        pageData = {
            meta_title: `${dlv(blogsCatgData, 'data.blog.blogs_data.0.article_meta_title') || dlv(blogsCatgData, 'data.blog.blogs_data.0.title')}`,
            meta_description: `${dlv(blogsCatgData, 'data.blog.blogs_data.0.article_meta_description') || dlv(blogsCatgData, 'data.blog.blogs_data.0.title')}`,
            url_key: `/blog/${slug}`
        }
    }else{
        pageData = {
            meta_title: `${dlv(blogsCatgData, 'data.blogcategories.0.meta_keywords') || dlv(blogsCatgData, 'data.blog.blogs_data.0.title')}`,
            meta_description: `${dlv(blogsCatgData, 'data.blogcategories.0.meta_description') || dlv(blogsCatgData, 'data.blog.blogs_data.0.title')}`,
            url_key: `/blog/${slug}`
        }
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
        setIsPaginationClicked(true)
        setPage(currentPage)
        scrollToDiv('blog_list')
    }

    const handleCategoryClick = () => {
        setIsPaginationClicked(true);
    }

    return (
        <Layout pageData={pageData} globalMagento={globalMagento} user={user} setUser={setUser} selectedCurrency={selectedCurrency} selectedStore={selectedStore} currencyData={currencyData} storeData={storeData} footer={footer} getPageData={getPageData} isBlog={true}>
            {isCategoryPage ? <>
                <div className="main_container">
                    <div className="blog_head">
                        <div className="page_info">
                            <h2 className="pg_title"></h2>
                            <ul className="bdcrum">
                                <li className="bdcrum_item"><Link href="/">Home</Link></li>
                                <li className="bdcrum_item"><Link href="/blog">Blog</Link></li>
                                <li className="bdcrum_item"><Link href="/blog">{dlv(blogsCatgData, 'data.blogcategories.0.category_name')}</Link></li>
                            </ul>
                        </div>
                        {
                            isCategoryPage ?
                            <h2 className={`${sarabun} primary_title`}>{dlv(blogBasicInfo, '0.category_title')?.replace('{category_name}',dlv(blogsCatgData, 'data.blogcategories.0.category_name'))}</h2>
                            :
                            <h2 className={`${sarabun} primary_title`}>{dlv(blogBasicInfo, '0.title')}</h2>
                        }
                    </div>
                </div>
                <CategoryBlog selectedStore={selectedStore} blogBasicInfo={blogBasicInfo} categories={categories} blogs={blogs} blogsCatgData={blogsCatgData} handleCategoryClick={handleCategoryClick} blogs_media_url={blogs_media_url} totalBlogsCount={totalBlogsCount} page={page} onPageChange={onPageChange} selectedCategory={selectedCategory} sarabun={sarabun}/>
            </> :
                <BlogDetail blogsCatgData={blogsCatgData} blogs_media_url={blogs_media_url} blogBasicInfo={blogBasicInfo} sarabun={sarabun}/>
            }
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query;
    const locale = context.locale;
    let { page } = context.query;
    page = page ? parseInt(page) : 1;
    let isCategoryPage = false;

    try {
        const cookies = context.req.cookies;
        const selectedCurrency = cookies.currency_code || 'USD';
        let newCookieValue = 'default';
        if (locale !== 'en') {
            newCookieValue = locale;
        }

        let categoriesBlogs = null;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com'}/api/blog_slug`, {
                method: 'GET',
                headers: {
                    'Content-Currency': `${selectedCurrency}`,
                    'Store': `${newCookieValue}__${slug}__false`,
                },
            });
            const responseData = await response.json();
            categoriesBlogs = responseData;
        } catch (e) { }

        if (dlv(categoriesBlogs, 'data.blogcategories') == null) {
            if (dlv(categoriesBlogs, 'data.blog') == null) {
                return {
                    redirect: {
                        destination: `/blog`,
                        permanent: false,
                    },
                };
            }
        } else {
            isCategoryPage = true;
        }

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
            props: { blogsCatgData: categoriesBlogs || null, preview: context.preview || null, slug: slug, blogBasicInfo: blog || null, globalMagento: globalMagento, storeData: storeCurrency, currencyData: storeCurrency.data.currency, selectedPage: page, loadBlogs: false, isCategoryPage: isCategoryPage },
        };
    } catch (error) {
        return {
            props: { error: error.message },
        };
    }
}