import ImageBlock from '@/components/global/ImageBlock'
import SectionCta from '@/components/global/SectionCta'
import dlv from 'dlv'
import Link from 'next/link'
import React from 'react'

export default function RelatedCard({blogStartup, blogClass}) {
    return (
        <>
            <div className={`blog_list ${blogClass}`}>
                <div className="normal_blog blog_card_outer">
                    {blogStartup.blogs_data && blogStartup.blogs_data.map((feat) =>
                        <div className="blog_card" key={feat.id}>
                            <Link href={`/blog/${feat.identifier}`} className="image" aria-label={`${feat.title}`}>
                                <ImageBlock image={`${process.env.NEXT_PUBLIC_API_URL}/media${dlv(feat,'image')}`} />
                            </Link>
                            <div className="blog_cnt">
                                {/* <span className="date">{feat.date}</span> */}
                                <Link aria-label={`${feat.title}`} href={`/blog/${feat.identifier}`} className='primary_title'>{feat.title}</Link>
                                <p className="primary_text">{feat.artilce_short_summary}</p>
                                {feat.blogListCta && <SectionCta props="Read More" ctaClass="secondary_cta" url={`/blogs/${feat.identifier}`} />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
