import Layout from '@/components/layout'
import React, { useEffect } from 'react'
import { getCategoriesBlogs } from '../api/blogs'
import { getCookie } from 'cookies-next';
import { getStrapiURL } from '@/utils';
import dlv from 'dlv';
import Link from 'next/link';
import styles from '../../components/blocks/BlogListing/blog-style.module.css';
import Image from 'next/image';
import { imageLoader } from '@/components/shared/imageLoader';
import BlogSlider from '@/components/blocks/BlogListing/BlogSlider';

function capitalizeFirstLetter(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/[_-]/g, ' ');
  } catch (e) {
    return string
  }
}

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
          blocks_data(identifiers : "support-menu,service-menu")
          }
        `,
      variables: {},
    }
    ),
  });

  return response.json();
}

export default function Articles({ globalMagento, user, setUser, blogsCatgData, latestblogsgData, category_id, selectedCurrency, selectedStore, currencyData, storeData, slug, footer, bannerSlider, blogBasicInfo, sarabun }) {
  let pageData = null;
  pageData = {
    meta_title: `${blogBasicInfo.meta_title}`,
    meta_description: `${blogBasicInfo.meta_description}`,
    url_key: `${slug}`
  }
  let breadCrumbs = slug;
  try {
    breadCrumbs = slug.split('/');
  } catch (e) {

  }

  function handleCarouselMove(positive = true) {
    const carousel = document.querySelector(".carouself-container");
    const slide = document.querySelector(".carouself-slide");
    const slideWidth = slide.clientWidth;
    carousel.scrollLeft = positive ? carousel.scrollLeft + slideWidth : carousel.scrollLeft - slideWidth;
  }

  const componentClassName = `${styles.sliderBackground}`;
  return (
    <Layout pageData={pageData} globalMagento={globalMagento} user={user} setUser={setUser} selectedCurrency={selectedCurrency} selectedStore={selectedStore} currencyData={currencyData} storeData={storeData} footer={footer} getPageData={getPageData}>
      <div className="main_container">
        <div className="blog_head">
          <div className="page_info">
            <ul className='bdcrum'>
              <li className='bdcrum_item'><Link href={'/'}>Home</Link></li>
              {breadCrumbs && breadCrumbs.map((bc) => {
                if (bc) {
                  return (
                    <li className='bdcrum_item'>{<Link href={`/${bc}`}>{capitalizeFirstLetter(bc.replaceAll('/', '').replace(/(\?|&)module=[^&]*(&|$)/, '$1').replace('?', ''))}</Link>}</li>
                  )
                }
              }
              )}
            </ul>
          </div>
          <h2 className={`${sarabun} primary_title`}>{dlv(blogBasicInfo, 'title')}</h2>
        </div>
      </div>
      <BlogSlider blogSlider={bannerSlider} />
      <div className='blog_slider'>
        <div className='swiper'>
          <div className='swiper-wrapper' style={{ display: "unset" }}>
            <main className="mainC">
              <div className="carouself-container" dir="ltr">
                {bannerSlider.blogBanner &&
                  bannerSlider.blogBanner.map((blogItem, index) =>
                    <div key={blogItem.id} className='carouself-slide blog_slider_bg' style={{ background: "linear-gradient(185deg, #FFBE9D 16.07%, #FFE5D6 85.57%)" }}>
                      <Link href={`blog/${dlv(blogItem, 'link.0.field_redirect')}`} className={`loading_action blog_slider_bg ${componentClassName}`}>
                        <div className="blog_slider_inner loading_action">
                          <div className="blog_slider_block">
                            <h1 className="loading_action blog_slider_title">{dlv(blogItem, 'title')}</h1>
                          </div>
                          <div className="blog_slider_block">
                            <Image
                              loader={imageLoader}
                              src={dlv(blogItem, 'image.0.url')}
                              alt={`Slider`}
                              width={547}
                              height={415}
                              style={{ height: 'auto' }}
                              priority={index === 0 ? true : false}
                              className='loading_action'
                            />
                          </div>
                        </div>
                      </Link>
                      <div className="blog_slider_btm_row">
                        <Link href={`blog/${dlv(blogItem, 'link.0.field_redirect')}`} className="type">{dlv(blogItem, 'plan.0.field_text')}</Link>
                        <a href={dlv(blogItem, 'subTitle[0].field_redirect')} className="subTitle">{dlv(blogItem, 'subTitle[0].field_text')}</a>
                      </div>
                    </div>
                  )
                }
              </div>
            </main>
          </div>
          <div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-1aee2788648ad9a1" onClick={() => handleCarouselMove(true)}></div>
          <div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-1aee2788648ad9a1" onClick={() => handleCarouselMove(false)}></div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const locale = context.locale;

  let isblogPage = false;
  let category_id = 2;
  let blog = null;

  try {
    const cookies = context.req.cookies;
    let newCookieValue = 'default';
    if (locale !== 'en') {
      newCookieValue = locale;
    }
    const categoriesBlogs = await getCategoriesBlogs(1, newCookieValue);
    const bannerSlider = JSON.parse(categoriesBlogs.data.blocks_data)[0];
    const blog = JSON.parse(categoriesBlogs.data.blocks_data)[1];

    const blocksData = JSON.parse(dlv(categoriesBlogs, 'data.cmsBlocks.items.0.blocks_data', []));
    const storeCurrency = JSON.parse(dlv(blocksData, '0.store_currency'));
    const footerNewsLetter = dlv(blocksData, '1');
    const footer = dlv(blocksData, '2');
    const footerBootom = dlv(blocksData, '3');
    const bestSellersBlock = dlv(blocksData, '4');
    const footerData = { footerNewsLetter: footerNewsLetter, footer: footer, footerBootom: footerBootom, bestSellersBlock: bestSellersBlock }
    const globalMagento = { children: JSON.parse(categoriesBlogs.data.cmsBlocks.items[0].content), footerData: footerData };

    return {
      props: { isblogPage: isblogPage, blogsCatgData: categoriesBlogs || null, latestblogsgData: categoriesBlogs.data.blog || null, preview: context.preview || null, slug: [context.resolvedUrl.replace(/\/\//g, '/')], category_id: category_id || null, blogBasicInfo: blog || null, bannerSlider: bannerSlider || null, globalMagento: globalMagento, storeData: storeCurrency, currencyData: storeCurrency.data.currency },
    };
  } catch (error) {
    return {
      props: { blogsCatgData: null, latestblogsgData: null },
    };
  }
}