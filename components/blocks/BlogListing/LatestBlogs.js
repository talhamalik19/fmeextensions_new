import { imageLoader } from '@/components/shared/imageLoader';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { parse } from 'himalaya';
import he from 'he';
import dlv from 'dlv';

const extractAllText = (nodes) => {
  return nodes.map((node) => {
    if (node.type === 'text') {
      return node.content;
    } else if (node.children) {
      return extractAllText(node.children);
    }
    return null;
  }).flat().filter(Boolean).join(' ');
};

export default function LatestBlogs({ latestblogsgData, formatPublishDate, customBlocksData }) {
  const parsedContentL = parse(he.decode(dlv(latestblogsgData, 'blogs_data.0.articlesdetail')));
  const shortDescriptionL = extractAllText(parsedContentL);
  return (
    <>
      <div className="section_gradient">
        <div className="section_padding">
          <div className="main_container">
            <div className={`blog_list_container latest_blog`}>
              <div className="blog_sec_head">
                <h2 className="title">{dlv(customBlocksData, '3.text_discover')}</h2>
                <Link href={`${dlv(customBlocksData, '3.btn_explore_more.field_redirect')}`} className='primary_cta secondary_cta'>{dlv(customBlocksData, '3.btn_explore_more.field_text')}</Link>
              </div>

              <div className={`blog_list reverse_col`}>
                <div className="featured_blog blog_card_outer">
                  <div className="blog_card">
                    {dlv(latestblogsgData, 'blogs_data.0.image') && <Link href={`/blog/${dlv(latestblogsgData, 'blogs_data.0.identifier')}`} className="loading_action image" aria-label={`${dlv(latestblogsgData, 'blogs_data.0.title')}`}>
                      {dlv(latestblogsgData, 'blogs_data.0.image') &&
                        <Image
                          className='loading_action rounded-3xl'
                          loader={imageLoader}
                          src={`${latestblogsgData.blogs_media_url}${dlv(latestblogsgData, 'blogs_data.0.image')}`}
                          alt={``}
                          width={636}
                          height={297}
                          style={{ width: '100%', height: 'auto' }}
                        />}
                    </Link>}
                    <div className="blog_cnt">
                      <span className="date">{formatPublishDate(dlv(latestblogsgData, 'blogs_data.0.article_publish_date'))}</span>
                      <Link href={`/blog/${dlv(latestblogsgData, 'blogs_data.0.identifier')}`} className='loading_action primary_title' aria-label={`${dlv(latestblogsgData, 'blogs_data.0.title')}`}>
                        {dlv(latestblogsgData, 'blogs_data.0.title')}
                      </Link>
                      <p className="primary_text" style={{WebkitLineClamp:'8'}}>{shortDescriptionL}</p>
                      <div className='blog_btm_row'>
                        <div className='posted_in'>
                          {`${dlv(customBlocksData, '3.text_posted_in')} `}
                          {dlv(latestblogsgData, 'blogs_data.0.categories').map(({ category_id, category_name, category_url_key, is_active }, index) => (
                            <span key={category_id}>
                              <Link href={`/blog/${category_url_key}`}>{category_name}</Link>
                              {index < dlv(latestblogsgData, 'blogs_data.0.categories.length') - 1 && ", "}
                            </span>
                          ))}

                        </div>
                        <div className='aurthor_info'>
                          <p className='ath_text'>{dlv(customBlocksData, '3.text_posted_by')} <Link href={`/blog/author/${dlv(latestblogsgData, 'blogs_data.0.author.urlkey')}`}>{dlv(latestblogsgData, 'blogs_data.0.author.name')}</Link></p>
                        </div>
                      </div>
                      <Link aria-label={`${dlv(latestblogsgData, 'blogs_data.0.title')}`} href={`/blog/${dlv(latestblogsgData, 'blogs_data.0.identifier')}`} className='loading_action primary_cta secondary_cta' >{dlv(customBlocksData, '3.btn_read_more.field_text')}</Link>
                    </div>
                  </div>
                </div>

                <div className="normal_blog blog_card_outer">
                  {dlv(latestblogsgData, 'blogs_data') && dlv(latestblogsgData, 'blogs_data').map((feat, index) => {
                    if (feat.articlesdetail && index != 0) {
                      const parsedContent = parse(he.decode(feat.articlesdetail));

                      // Find the first paragraph and use it as a short description
                      const shortDescription = extractAllText(parsedContent);
                      return (
                        <div className="blog_card" key={feat.articles_id}>
                          <div className="blog_cnt">
                            <span className="date">{formatPublishDate(feat.article_publish_date)}</span>
                            <Link href={`/blog/${feat.identifier}`} className='loading_action primary_title' aria-label={`${feat.title}`}>
                              {feat.title}
                            </Link>
                            <p className="primary_text">{shortDescription}</p>
                            <div className='blog_btm_row'>
                              <div className='posted_in'>
                                {`${dlv(customBlocksData, '3.text_posted_in')} `}
                                {feat.categories.map(({ category_id, category_name, category_url_key, is_active }, index) => (
                                  <span key={category_id}>
                                    <Link href={`/blog/${category_url_key}`}>{category_name}</Link>
                                    {index < feat.categories.length - 1 && ", "}
                                  </span>
                                ))}

                              </div>
                              <div className='aurthor_info'>
                                <p className='ath_text'>{dlv(customBlocksData, '3.text_posted_by')} <Link href={`/blog/author/${dlv(feat, 'author.urlkey')}`}>{dlv(feat, 'author.name')}</Link></p>
                              </div>
                            </div>
                            <Link aria-label={`${feat.title}`} href={`/blog/${feat.identifier}`} className='loading_action primary_cta secondary_cta mt-8' >{dlv(customBlocksData, '3.btn_read_more.field_text')}</Link>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
