import React from 'react'
import RelatedCard from './RelatedCard';
import SectionCta from '@/components/global/SectionCta';

export default function RelatedBlog({relatedBlog}) {
  
  return (
    <>
      <div className="section_bg">
        <div className="section_padding">
          <div className="main_container">
            <div className="blog_list_container related">
              <div className="blog_sec_head">
                <h2 className="title">A few more things we think you’ll like:</h2>
                {RelatedBlog.ctaCnt && <SectionCta props={RelatedBlog.ctaCnt} ctaClass="secondary_cta" url={''} />}
              </div>
              <RelatedCard blogStartup={relatedBlog} blogClass="related_inner"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
