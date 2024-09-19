import Pagination from '@/components/shared/Pagination';
import { formatPublishDate } from '@/components/shared/formatDate';
import { imageLoader } from '@/components/shared/imageLoader';
import dlv from 'dlv';
import Image from 'next/image';
import Link from 'next/link'
import { parse } from 'himalaya';
import he from 'he';
import { extractAllText } from './extractAllText';
import Search from '@/components/global/Header/Search';

function removeTrailingSlash(url) {
  return url?.replace(/\/$/, '');
}

export default function CategoryBlog({ selectedStore, blogBasicInfo, categories, blogs, blogsCatgData, handleCategoryClick, blogs_media_url, totalBlogsCount, page, onPageChange, selectedCategory, is_author = false, sarabun }) {
  return (
    <>
      <div className="section_gradient">
        <div className="section_padding">
          <div className="main_container">
            <div className="blog_list_container">
              {
                is_author ?
                  <>
                  <div className="blog_sec_hd_upt">
                    <div className="blog_sec_head">
                      <h2 className={`${sarabun} title`}>{is_author ? dlv(blogBasicInfo, '0.author_page_description') : dlv(blogBasicInfo, '0.category_page_description')}</h2>
                    </div>
                    <Search isBlog={true} selectedStore={selectedStore} />
                  </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-2 md:p-4">
                      <img
                        src={`${removeTrailingSlash(blogs_media_url)}${dlv(blogs, '0.author.image', '')}`}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                        alt="Author"
                      />
                      <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="block text-gray-700 text-sm md:text-lg font-semibold posted_in">
                          {dlv(blogs, '0.author.name', '')}
                        </span>
                        <span className="block mt-1 text-gray-600 primary_text !pb-0">
                          {dlv(blogs, '0.author.short_description', '')}
                        </span>
                        <div className="flex space-x-3 ">
                          {dlv(dlv(blogs, '0.author.description')?.split(','), '0') && <a href={dlv(dlv(blogs, '0.author.description').split(','), '0')} target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 64 64" width="40" height="40"><circle cx="32" cy="32" r="31" fill="#000000" style={{ fill: "transparent" }}></circle><path d="M 41.116 18.375 h 4.962 l -10.8405 12.39 l 12.753 16.86 H 38.005 l -7.821 -10.2255 L 21.235 47.625 H 16.27 l 11.595 -13.2525 L 15.631 18.375 H 25.87 l 7.0695 9.3465 z m -1.7415 26.28 h 2.7495 L 24.376 21.189 H 21.4255 z" fill="#DB4D2D"></path></svg>
                          </a>}
                          {dlv(dlv(blogs, '0.author.description')?.split(','), '1') && <a href={dlv(dlv(blogs, '0.author.description').split(','), '1')} target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 64 64" width="40" height="40"><circle cx="32" cy="32" r="31" fill="#007fb1" style={{ fill: "transparent" }}></circle><path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z" fill="#DB4D2D"></path></svg>
                          </a>}
                          {dlv(dlv(blogs, '0.author.description')?.split(','), '2') && <a href={dlv(dlv(blogs, '0.author.description').split(','), '2')} target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 64 64" width="40" height="40"><circle cx="32" cy="32" r="31" fill="#3b5998" style={{ fill: "transparent" }}></circle><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="#DB4D2D"></path></svg>
                          </a>}
                        </div>
                      </div>
                    </div>
                  </>
                  :
                  <div className="blog_sec_hd_upt">
                    <div className="blog_sec_head">
                      <h2 className={`${sarabun} title`}>{is_author ? dlv(blogBasicInfo, '0.author_page_description') : dlv(blogBasicInfo, '0.category_page_description')}</h2>
                    </div>
                    <Search isBlog={true} selectedStore={selectedStore} />
                  </div>
              }
              {
                is_author ?
                  <>
                  </>
                  :
                  <div className="cat_filter" id="2">
                    {
                      categories ? categories.map(({ category_id, category_name, url_key, status }) => {
                        if (status) {
                          return (
                            <Link key={`category_id-${category_id}`} className="loading_action" aria-label={`${category_name}`} href={`/blog/${url_key}`} onClick={handleCategoryClick}>
                              <div className={`loading_action filter_radio ${category_id == selectedCategory ? 'checked' : ''}`}>
                                <div className="loading_action radio_block"><input type="radio" name={`${category_name}`}
                                  id={`${category_name}`} checked={category_id == selectedCategory ? 'true' : 'false'} /><label className="loading_action"
                                    for={`${category_name}`}>{category_name}</label></div>
                              </div>
                            </Link>
                          )
                        }
                      })
                        :
                        <>
                          <svg className="svg-placeholder-heading" xmlns="http://www.w3.org/2000/svg" width="100%" height="100px">
                            <defs>
                              <linearGradient id="myGradient" gradientTransform="rotate(20)">
                                <stop offset="5%" stopColor="#eee">
                                  <animate attributeName="stop-color" values="#EEEEEE; #CCCCCC; #EEEEEE" dur="2s" repeatCount="indefinite"></animate>
                                </stop>
                                <stop offset="95%" stopColor="#f6f6f6">
                                  <animate attributeName="stop-color" values="#EEEEEE; #DDDDDD; #EEEEEE" dur="3s" repeatCount="indefinite"></animate>
                                </stop>
                              </linearGradient>
                            </defs>
                            <rect fill="url(#myGradient)" width="95%" height="35px" x="10px" y="0px" rx="10" ry="10" />
                            <rect fill="url(#myGradient)" width="40%" height="35px" x="10px" y="45px" rx="10" ry="10" />
                          </svg>
                        </>
                    }
                  </div>
              }
            </div>
            <div className="blog_list_container" id="blog_list">
              <div className="blog_list blog-two-col">
                <div className="normal_blog blog_card_outer">
                  {
                    blogs != null ? blogs.map(({
                      article_publish_date,
                      articles_id,
                      artilce_short_summary,
                      author,
                      categories,
                      identifier,
                      image,
                      thumbnail,
                      articlesdetail,
                      title }, index) => {
                      const parsedContent = parse(he.decode(articlesdetail));
                      const shortDescription = extractAllText(parsedContent);
                      return (
                        <div class="blog_card" key={`article-${articles_id}`}>
                          <Link class="loading_action" aria-label={`${title}`} href={`/blog/${identifier}`}>
                            <Image
                              loader={imageLoader}
                              alt={`${title}`}
                              width="636"
                              height="297"
                              class="loading_action rounded-3xl"
                              src={`${blogs_media_url}${thumbnail != 'no_image.png' ? thumbnail : image || image}`}
                              priority={index == 0 ? true : false}
                              style={{ color: "transparent", width: "100%", height: "auto" }} />
                          </Link>
                          <div class="loading_action blog_cnt pt-3">
                            <span class="loading_action block date">{formatPublishDate(article_publish_date)}</span>
                            <div class="loading_action mt-2">
                              <Link href={`/blog/${identifier}`} class={`${sarabun} loading_action primary_title`}>{title}</Link>
                              <p class="loading_action primary_text">
                                {artilce_short_summary || shortDescription}
                              </p>
                              <div class="blog_btm_row">
                                <div className='posted_in'>
                                  {`${dlv(blogBasicInfo, '0.text_posted_in', '')} `}
                                  {categories.map(({ category_id, category_name, category_url_key, is_active }, index) => (
                                    <span key={category_id}>
                                      <Link href={`/blog/${category_url_key}`}>{category_name}</Link>
                                      {index < categories.length - 1 && ", "}
                                    </span>
                                  ))}

                                </div>
                                <div className='aurthor_info'>
                                  <p className='ath_text'>{dlv(blogBasicInfo, '0.text_posted_by', '')} <Link className='loading_action' href={`/blog/author/${dlv(author, 'urlkey')}`}>{dlv(author, 'name')}</Link></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                      :

                      dlv(blogsCatgData, 'data.blogcategories.0.blogs') ?
                        dlv(blogsCatgData, 'data.blogcategories.0.blogs', []).map(({
                          article_publish_date,
                          articles_id,
                          artilce_short_summary,
                          author,
                          categories,
                          identifier,
                          image,
                          thumbnail,
                          articlesdetail,
                          title }, index) => {
                          const parsedContent = parse(he.decode(articlesdetail));
                          const shortDescription = extractAllText(parsedContent);
                          return (
                            <div class="blog_card" key={`article-${articles_id}`}>
                              <Link class="loading_action" aria-label={`${title}`} href={`/blog/${identifier}`}>
                                <Image
                                  loader={imageLoader}
                                  alt={`${title}`}
                                  width="636"
                                  height="297"
                                  class="loading_action rounded-3xl"
                                  src={`${blogs_media_url}${thumbnail || image}`}
                                  priority={index == 0 ? true : false}
                                  style={{ color: "transparent", width: "100%", height: "auto" }} />
                              </Link>
                              <div class="loading_action blog_cnt pt-3">
                                <span class="loading_action block date">{formatPublishDate(article_publish_date)}</span>
                                <div class="loading_action mt-2">
                                  <Link href={`/blog/${identifier}`} class={`${sarabun} loading_action primary_title`}>{title}</Link>
                                  <p class="loading_action primary_text">
                                    {artilce_short_summary || shortDescription}
                                  </p>
                                  <div class="blog_btm_row">
                                    <div className='posted_in'>
                                      {`${dlv(blogBasicInfo, '0.text_posted_in', '')} `}
                                      {categories.map(({ category_id, category_name, category_url_key, is_active }, index) => (
                                        <span key={category_id}>
                                          <Link href={`/blog/${category_url_key}`}>{category_name}</Link>
                                          {index < categories.length - 1 && ", "}
                                        </span>
                                      ))}

                                    </div>
                                    <div className='aurthor_info'>
                                      <p className='ath_text'>{dlv(blogBasicInfo, '0.text_posted_by', '')} <Link className='loading_action' href={`/blog/author/${dlv(author, 'urlkey')}`}>{dlv(author, 'name')}</Link></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }) :
                        <>No Record Found</>

                  }
                </div>
              </div>
              {totalBlogsCount > 1 && <Pagination totalPages={totalBlogsCount} currentPage={page} nextText={`Next`} prevText={`Prev`} onPageChange={onPageChange} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}