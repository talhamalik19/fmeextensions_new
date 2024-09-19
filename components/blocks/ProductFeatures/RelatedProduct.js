import Card from "@/components/shared/Card"
import dlv from "dlv"
import { useState } from "react";

export default function RelatedProduct({ relatedProd, heading, productBasicInfo, blockContent,sarabun }) {
    const [pageSize, setPageSize] = useState(3);
    const numberOfPage = Math.ceil(relatedProd.length / pageSize);
    const [page, setPage] = useState(1);
    return (
        <div className="section_padding">
            <div className="main_container">
                <div className="related_product">
                    {/* {relatedProd && <h3 className="primary_title">{heading}</h3>} */}
                    <div className="prod_listing grid_4">
                        <div class="prod_card hm_lst_cnt">
                            {heading && <h2 class={`${sarabun} primary_title`}>{heading}</h2>}
                            {dlv(blockContent,'related_prod_desc') && <p class="primary_text">{dlv(blockContent,'related_prod_desc')}</p>}
                        </div>
                        {relatedProd.length > 0 ? relatedProd.map((item, index) => {
                            if (item.type !== 4) {
                                return (<Card
                                    key={index}
                                    product={item}
                                    buyNowButton={dlv(blockContent, 'button')}
                                    isLast={index === relatedProd.length - 1}
                                    newLimit={() => setPage(page)}
                                    relatedProd={item} //For Buy Now Popup
                                    pageName={'pageName'}
                                    blockContent={blockContent}
                                    sarabun={sarabun}
                                />)
                            }
                        })
                            :
                            <>
                                <div className="prod_card"><svg className="svg-placeholder" xmlns="http://www.w3.org/2000/svg">
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
                                    <rect fill="url(#myGradient)" className="svg-placeholder-image" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-title" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-date" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-description-first-line" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-description-second-line" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-author-name" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-button" rx="25" ry="25" />
                                </svg></div>
                                <div className="prod_card"><svg className="svg-placeholder" xmlns="http://www.w3.org/2000/svg">
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
                                    <rect fill="url(#myGradient)" className="svg-placeholder-image" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-title" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-date" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-description-first-line" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-description-second-line" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-author-name" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-button" rx="25" ry="25" />
                                </svg></div>
                                <div className="prod_card"><svg className="svg-placeholder" xmlns="http://www.w3.org/2000/svg">
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
                                    <rect fill="url(#myGradient)" className="svg-placeholder-image" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-title" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-date" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-description-first-line" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-description-second-line" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-author-name" />
                                    <rect fill="url(#myGradient)" className="svg-placeholder-button" rx="25" ry="25" />
                                </svg></div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
