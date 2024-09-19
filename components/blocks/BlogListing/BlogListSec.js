import SectionCta from '@/components/global/SectionCta'
import BlogCard from './BlogCard'
import CatFilter from '../ProductFilter/CatFilter'

export default function BlogListSec({ blogListing, blogClass, secClass }) {
  const blogCat = [
    { id: 1, cat: 'All'},
    { id: 2, cat: 'Catalog',},
    { id: 3, cat: 'Administration',},
    { id: 4, cat: 'Image & Media',},
    { id: 5, cat: 'Content Management',},
    { id: 6, cat: 'Cart & Checkout',},
    { id: 7, cat: 'Product Pricing',},
    { id: 8, cat: 'Legal',},
    { id: 9, cat: 'Sales & Promotin',},
    { id: 10, cat: 'Website Security Geoip',},
    { id: 11, cat: 'Speed Optimization',},
    { id: 12, cat: 'User Experience',},
]
  return (
    <div className="section_gradient">
      <div className="section_padding">
        <div className="main_container">
          <div className={`blog_list_container ${secClass}`}>
            <div className="blog_sec_head">
              <h2 className="title">{blogListing.title}</h2>
              {blogListing.ctaCnt && <SectionCta props={blogListing.ctaCnt} ctaClass="secondary_cta" url={''} />}
            </div>
            {blogListing.blog_cat && <CatFilter filter={blogCat} />}
            <BlogCard blogStartup={blogListing} blogClass={blogClass}/>
          </div>
        </div>
      </div>
    </div>
  )
}
