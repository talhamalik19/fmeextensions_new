import SectionCta from '@/components/global/SectionCta';
import dlv from 'dlv';
import styles from './home-banner.module.css';

const HomeBanner = ({ title, heading, image, button, isMobile, card, sarabun }) => {
    const componentClassName = `${styles.homeBannerBackground}`;
    return (
        <div className="home_banner">
            <div className="banner_container">
                <div className={`banner`} >
                    <div className="banner_cnt">
                        {heading && <h1 className={`title ${sarabun}`}>{heading}</h1>}
                        {title && <p className={`banner_text ${sarabun}`}>{title}</p>}
                        {
                            button && <div className="section_cta">
                                <SectionCta props={`${button.field_text}`} url={`${button.field_redirect}`} />
                            </div>
                        }

                        {card && <div className='baner_cnt_count'>
                            {
                                card.map((items, index) =>
                                    <div key={index} className='count_item'>
                                        <strong className={`${sarabun}`}>{dlv(items,'count')}</strong> {dlv(items,'text')}
                                    </div>
                                )
                            }
                        </div>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
