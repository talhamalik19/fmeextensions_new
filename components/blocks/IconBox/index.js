import SectionHead from "@/components/global/SectionHead";
import dlv from "dlv";
import Image from "next/image";
import { imageLoader } from "@/components/shared/imageLoader";

const IconBox = ({ pageName, heading, cards, sarabun }) => {
    const homeIconBox = [
        {id:1, image:'images/free-update.png', title:'Free Updates', text:'We make sure you get quality extensions...'},
        {id:2, image:'images/money-back.png', title:'45 Days MoneyBack', text:'Aiming to improve and diversify our offers, we increase...'},
        {id:3, image:'images/free-support.png', title:'Free Support', text:'Aiming to improve and diversify our offers, we increase...'},
        {id:4, image:'images/time.png', title:'Any Time Available', text:'24/7 hours and diversify our offers, we increase...'},
    ]
    return (
        <>

            <div className={pageName === 'about' ? 'section_bg' : ''}>
                <div className="section_padding">
                    <div className="main_container">
                        <div className="icon_box">
                        {heading && <SectionHead title={heading} sarabun={sarabun}/>}

                            <div className="icon_widget_container grid_custom">
                                {
                                    cards && cards.map((card, index) =>
                                        <div className="icon_widget" key={`icon_widget-${index}`}>
                                            <div className="icon center-img">
                                                <Image
                                                    loader={imageLoader}
                                                    src={dlv(card.icon[0],'url')}
                                                    alt={`${dlv(card.icon[0],'alt')}`}
                                                    width={57}
                                                    height={57}
                                                />
                                            </div>
                                            <div className="icon_cnt">
                                                {card.heading &&
                                                    <h3 className={`${sarabun} secondary_title`}>{card.heading}</h3>
                                                }
                                                {card.text &&
                                                    <p className="primary_text">{card.text}</p>
                                                }
                                                
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default IconBox;