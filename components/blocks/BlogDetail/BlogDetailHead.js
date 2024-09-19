import dlv from 'dlv'
import BdCrum from '../PageHeader/BdCrum'
import SectionCta from '@/components/global/SectionCta'

export default function BlogDetailHead({parentNav, pageName, blogHead, categories, author}) {
  // Function to format date according to system's locale
  const formatPublishDate = (date) => {
    try {
      const formattedDate = new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date));

      // Check if formattedDate is a valid string
      if (formattedDate && formattedDate !== 'Invalid Date') {
        return formattedDate;
      } else {
        // Return a default value or the original date if formatting fails
        return date;
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      // Return a default value or the original date if an error occurs
      return date;
    }
  };
    return (
        <>
            <div className="main_container">
                <div className="blog_dtl_head">
                    <BdCrum pageName={pageName} parentNav={parentNav} />
                    <div className="blog_dtl_dt">
                      {categories && categories.map((category, index)=>(
                        <SectionCta key={`${category.id}`} props={`${category.category_name}`} ctaClass="secondary_cta" url={`/blog/${category.category_url_key}`}/>
                      ))}
                        {formatPublishDate(dlv(blogHead,'article_publish_date')) && <span className="blog_label date">{formatPublishDate(dlv(blogHead,'article_publish_date'))}</span>}
                        {author && <span className='blog_label'>{author.name}</span>}
                    </div>
                    {dlv(blogHead,'title') && <h1 className="title">{dlv(blogHead,'title')}</h1>}
                </div>
            </div>
        </>
    )
}
