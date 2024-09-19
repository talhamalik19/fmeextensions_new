import dlv from 'dlv';
import ArticleSchema from '@/components/schema/Article';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const BlogSideBar = dynamic(() => import('@/components/blocks/BlogDetail/BlogSideBar'), {
    ssr: true,
  })
import InnerHtml from '@/components/shared/InnerHtml';
import Link from 'next/link';
import { formatPublishDate } from '@/components/shared/formatDate';
import { imageLoader } from '@/components/shared/imageLoader';
import Image from 'next/image';

export default function BlogDetail({ blogsCatgData, blogs_media_url, blogBasicInfo, sarabun }) {
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

    return (
        <>
            <div className="blog_dtl_wraper">
                <div className="main_container">
                    <div className="blog_dtl_head">
                        <div className="page_info">
                            <h2 className="pg_title"></h2>
                            <ul className="bdcrum">
                                <li className="bdcrum_item"><Link href="/">Home</Link></li>
                                <li className="bdcrum_item"><Link href="/blog">Blog</Link></li>
                                <li className="bdcrum_item"><Link href="/blog">{dlv(blogsCatgData, 'data.blog.blogs_data.0.title')}</Link></li>
                            </ul>
                        </div>
                        <div className="blog_dtl_dt">
                            {dlv(blogsCatgData, 'data.blog.blogs_data.0.categories') && dlv(blogsCatgData, 'data.blog.blogs_data.0.categories').map((category, index) => (
                                <Link key={`${category.category_id}`} className={`loading_action primary_cta secondary_cta`} href={`/blog/${dlv(category, 'category_url_key')}`}>{dlv(category, 'category_name')}</Link>
                            ))}
                            {dlv(blogsCatgData, 'data.blog.blogs_data.0.article_publish_date') && <span className="blog_label date">{formatPublishDate(dlv(blogsCatgData, 'data.blog.blogs_data.0.article_publish_date'))}</span>}
                            {dlv(blogsCatgData, 'data.blog.blogs_data.0.author') && <span className='blog_label'><Link className='loading_action' href={`/blog/author/${dlv(blogsCatgData, 'data.blog.blogs_data.0.author.urlkey')}`}>{dlv(blogsCatgData, 'data.blog.blogs_data.0.author.name')}</Link></span>}
                        </div>
                        {dlv(blogsCatgData, 'data.blog.blogs_data.0.title') && <h1 className={`${sarabun} title`}>{dlv(blogsCatgData, 'data.blog.blogs_data.0.title')}</h1>}
                    </div>
                </div>
                <div className="blog_dtl_banner">
                    <div className="main_container">
                        <div className="section_gradient">
                            <div className="blog_dtl_banner_inner">
                                <div className="block blog_feat_banner">
                                    {dlv(blogsCatgData, 'data.blog.blogs_data.0.image') && <Image
                                        loader={imageLoader}
                                        src={`${blogs_media_url}${dlv(blogsCatgData, 'data.blog.blogs_data.0.image')}`}
                                        alt={`${dlv(blogsCatgData, 'data.blog.blogs_data.0.title')}`}
                                        width={586}
                                        height={384}
                                        style={{ width: '100%', height: 'auto' }}
                                        priority
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section_padding">
                    <div className="main_container">
                        <div className={`blog_dtl_container ${isSticky ? 'sticky' : ''}`}>
                            <BlogSideBar blogProduct={dlv(blogsCatgData, 'data.blog.blogs_data.0.related_products')} sarabun={sarabun}/>
                            <div className="blog_content_sec">
                                <InnerHtml content={dlv(blogsCatgData, 'data.blog.blogs_data.0.articlesdetail')} />
                                {blogBasicInfo && <p className="fme_blog_created primary_text">{dlv(blogBasicInfo, '1.text')} <Link href={`/${dlv(blogBasicInfo, '1.button.field_redirect')}`}>{dlv(blogBasicInfo, '1.button.field_text')}</Link></p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ArticleSchema article={dlv(blogsCatgData,'data.blog')} />
        </>
    )
}
