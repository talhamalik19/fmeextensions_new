import SectionCta from "@/components/global/SectionCta";
import FeatBannerBlock from "./FeatBannerBlock";
import dlv from "dlv";


const FeaturedBanners = ({ cards, text, button, sarabun }) => {
    const primaryBanner = cards[0];
    const secondaryBanner = [
        cards[1],
        cards[2],
    ]

    return (
        <>
            <div className="section_bg">
                <div className="section_padding">
                    <div className="main_container">
                        <div className="feat_banner">
                            <div className="feat_banner_inner">
                                <div className="left_col">
                                    <FeatBannerBlock featBanner={primaryBanner} featBannerClass="vertical" sarabun={sarabun}/>
                                </div>
                                <div className="right_col">
                                    {
                                        secondaryBanner.map((sndBanner, index) =>
                                            <FeatBannerBlock key={`feat-${index}`} featBanner={sndBanner} featBannerClass="horizontal" sarabun={sarabun}/>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="section_cta">
                            {text && <p className="primary_text">{text}</p>}
                            {button &&<SectionCta props={dlv(button,'field_text')} ctaClass="secondary_cta" url={dlv(button,'field_redirect')}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedBanners;