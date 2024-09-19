import SectionCta from '@/components/global/SectionCta';
import BdCrum from '../PageHeader/BdCrum';
import Image from 'next/image';
import { imageLoader } from '@/components/shared/imageLoader';
import dlv from 'dlv';

export default function ServicesBanner({ pageName, banner, parentNav, sarabun }) {
    return (
        <>
            <div className="secondary_banner_container">
                <div className="section_bg">
                    <div className="main_container">
                        <BdCrum pageName={pageName} parentNav={parentNav} sarabun={sarabun}/>

                        <div className="secondary_banner">
                            <div className="secondary_banner_block image_col">
                                {dlv(banner, 'banner_image') ? <Image
                                    loader={imageLoader}
                                    src={dlv(banner, 'banner_image.0.url')}
                                    // alt={`${dlv(banner.image, 'alt')}`}
                                    width={442}
                                    height={350}
                                    style={{ height: 'auto', margin: 'auto' }}
                                />
                                    :
                                    <div className="placeholderCartTotal">
                                        <div className="animated-background"></div>
                                        <div className="animated-background"></div>
                                    </div>
                                }
                            </div>
                            <div className="secondary_banner_block">
                                {
                                    banner ? banner &&
                                    dlv(banner, 'banner_button.field_text') && <SectionCta props={`${dlv(banner, 'banner_button.field_text')}`} ctaClass="cta_link" url={`${dlv(banner, 'banner_button.field_redirect')}`} />
                                        :
                                        <div className="placeholderlist">
                                            <div className="animated-background"></div>
                                        </div>
                                }
                                {dlv(banner, 'banner_title') ?
                                    <h2 className={`${sarabun} banner_title`}>{dlv(banner, 'banner_title')}</h2>
                                    :
                                    <div className="placeholderlist mt-4">
                                        <div className="animated-background"></div>
                                        <div className="animated-background"></div>
                                        <div className="animated-background"></div>
                                    </div>
                                }
                                <p className="banner_text">{dlv(banner, 'banner_short_desc')}</p>
                                {/* {banner.ratingCount && <div className="service_rating">
                                    <RatingStar ratings={banner.ratingCount} />
                                    <span className="text">Based on {banner.reviewCount} reviews - <SectionCta props='add a review' ctaClass="link" url={''} /></span>
                                </div>} */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* {banner.highlightedRow && <BannerHighlighted highlightedRow={banner.highlightedRow} />} */}
            </div>
        </>
    )
}
