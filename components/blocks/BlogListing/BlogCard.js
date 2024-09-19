import { imageLoader } from '@/components/shared/imageLoader';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react';
import { parse } from 'himalaya';
import he from 'he';
import dlv from 'dlv';

const extractAllText = (nodes) => {
    let textFound = false;

    const result = nodes.map((node) => {
        if (textFound) {
            return null; // Skip mapping if a text node has already been found
        }

        if (node.type === 'text') {
            textFound = true; // Set the flag to true when a text node is found
            return node.content;
        } else if (node.children) {
            return extractAllText(node.children);
        }

        return null;
    }).flat().filter(Boolean).join(' ');

    return result;
};

export default function BlogCard({ blogStartup, blogClass, formatPublishDate, customBlocksData }) {
    
    return (
        <>
            <div className={`blog_list ${blogClass}`}>
                <div className="featured_blog blog_card_outer">
                    {blogStartup.map((feat, index) => {
                        if (feat.articlesdetail && index == 0) {
                            const parsedContent = parse(he.decode(feat.articlesdetail));

                            // Find the first paragraph and use it as a short description
                            const shortDescription = extractAllText(parsedContent);
                            return (
                                <div className="blog_card" key={feat.articles_id}>
                                    {feat.image && <Link href={`/blog/${feat.identifier}`} className="loading_action image" aria-label={`${feat.title}`}>
                                        {feat.image &&
                                            <Image
                                                className='loading_action rounded-3xl'
                                                loader={imageLoader}
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/media/${feat.image}`}
                                                alt={``}
                                                width={636}
                                                height={297}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        }
                                    </Link>}
                                    <div className="blog_cnt">
                                        <span className="date">{formatPublishDate(feat.creation_time)}</span>
                                        <Link aria-label={`${feat.title}`} href={`/blog/${feat.identifier}`} className='loading_action primary_title'>
                                            {feat.title}
                                        </Link>
                                        <p className="primary_text" style={{WebkitLineClamp:'12'}}>{feat.artilce_short_summary || shortDescription}</p>
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
                                        {dlv(customBlocksData, '3.btn_read_more.field_text') && <Link aria-label={`${feat.title}`} href={`/blog/${feat.identifier}`} className='loading_action primary_cta secondary_cta' >{dlv(customBlocksData, '3.btn_read_more.field_text')}</Link>}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>

                <div className="normal_blog blog_card_outer">
                    {blogStartup.map((feat, index) => {
                        if (feat.articlesdetail && index != 0) {
                            const parsedContent = parse(he.decode(feat.articlesdetail));

                            // Find the first paragraph and use it as a short description
                            const shortDescription = extractAllText(parsedContent);
                            return (
                                <div className="blog_card" key={feat.articles_id}>
                                    <Link href={`/blog/${feat.identifier}`} className="loading_action image" aria-label={`${feat.title}`}>
                                        {feat.image &&
                                            <Image
                                                className='loading_action rounded-3xl'
                                                loader={imageLoader}
                                                src={`${feat.image}`}
                                                alt={``}
                                                width={636}
                                                height={297}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        }
                                    </Link>
                                    <div className="blog_cnt">
                                        <span className="date">{formatPublishDate(feat.creation_time)}</span>
                                        <Link href={`/blog/${feat.identifier}`} className='loading_action primary_title'>
                                            {feat.title}
                                        </Link>
                                        <p className="loading_action primary_text">{feat.artilce_short_summary || shortDescription}</p>
                                        <div className='blog_btm_row'>
                                            <div className='posted_in'>
                                                {`${dlv(customBlocksData, '3.text_posted_in','')} `}
                                                {feat.categories.map(({ category_id, category_name, category_url_key, is_active }, index) => (
                                                    <span key={category_id}>
                                                        <Link href={`/blog/${category_url_key}`}>{category_name}</Link>
                                                        {index < feat.categories.length - 1 && ", "}
                                                    </span>
                                                ))}

                                            </div>
                                            <div className='aurthor_info'>
                                                <p className='ath_text'>{dlv(customBlocksData, '3.text_posted_by','')} <Link href={`/blog/author/${dlv(feat, 'author.urlkey')}`}>{dlv(feat, 'author.name')}</Link></p>
                                            </div>
                                        </div>
                                        {dlv(customBlocksData, '3.btn_read_more.field_text') && <Link aria-label={`${feat.title}`} href={`/blog/${feat.identifier}`} className='loading_action primary_cta secondary_cta' >{dlv(customBlocksData, '3.btn_read_more.field_text')}</Link>}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}
