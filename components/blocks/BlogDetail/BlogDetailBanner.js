import { imageLoader } from '@/components/shared/imageLoader'
import dlv from 'dlv'
import Image from 'next/image'

export default function BlogDetailBanner({blogDtl}) {
  return (
    <>
      <div className="blog_dtl_banner">
        <div className="main_container">
          <div className="section_gradient">
            <div className="blog_dtl_banner_inner">
              {/* <div className="block">
                <h2 className="title">{dlv(blogDtl,'title')}</h2>
              </div> */}
              <div className="block blog_feat_banner">
                { dlv(blogDtl, 'image') && <Image
                  loader={imageLoader}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/media${dlv(blogDtl, 'image')}`}
                  alt={`${dlv(blogDtl,'title')}`}
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
    
    </>
  )
}
