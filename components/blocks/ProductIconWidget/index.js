import SectionHeadLeft from "@/components/global/SectionHeadLeft";
import SectionCta from "@/components/global/SectionCta";
import dlv from "dlv";
import Image from "next/image";
import { imageLoader } from "@/components/shared/imageLoader";

const ProductIconWidget = ({ sectionBg, cntAlignClass, heading, description, cards, text, button }) => {
    return (
        <>
            <div className={sectionBg === true ? 'section_bg' :''}>
                <div className="section_padding">
                    <div className="main_container">
                        <div className="prod_icon_container">
                            <SectionHeadLeft title={heading} desc={description} />
                            <div className={`prod_icon_grid ${cntAlignClass}`}>
                                <div className="icon_widget_container grid_custom">
                                    {
                                        cards && cards.map((item, index) =>
                                            <div className="icon_widget" key={`icon-widget-${index}`}>
                                                <div className="icon center-img">
                                                    <Image
                                                        loader={imageLoader}
                                                        src={dlv(item, 'image.url')}
                                                        alt={dlv(item, 'image.alt')}
                                                        width={68}
                                                        height={68}
                                                        style={{  height: 'auto' }}
                                                    />
                                                </div>
                                                <div className="icon_cnt">
                                                    <h3 className="secondary_title">{dlv(item, 'title')}</h3>
                                                    <p className="primary_text">{dlv(item, 'text')}</p>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                                <div className="section_cta">
                                    {text && <p className="primary_text">{text}</p>}
                                    {button && <SectionCta props={button.text} url={button.href} ctaClass='secondary_cta' />}

                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductIconWidget;