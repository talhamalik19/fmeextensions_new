import { A11y, Navigation, Scrollbar, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import dlv from 'dlv';
import Link from 'next/link';
import BlogBannerPlaceholder from '@/components/shared/BlogBannerPlaceholder';
import { imageLoader } from '@/components/shared/imageLoader';
import Image from 'next/image';
import styles from './blog-style.module.css';

export default function BlogSlider({ blogSlider }) {
    const componentClassName = `${styles.sliderBackground}`;
    return (
        <>
            {blogSlider && blogSlider.blogBanner ?
                <div className="blog_slider">
                    <Swiper modules={[Navigation, Scrollbar, A11y, Autoplay]} navigation spaceBetween={20} slidesPerView={1} centeredSlides={true} loop={true} autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }} >
                        {blogSlider.blogBanner &&
                            blogSlider.blogBanner.map((blogItem, index) =>
                                <SwiperSlide key={blogItem.id} style={{ '--bg-image': `${dlv(blogItem, 'bg')}` }}>
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
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
                :
                <BlogBannerPlaceholder />
            }
        </>
    )
}
