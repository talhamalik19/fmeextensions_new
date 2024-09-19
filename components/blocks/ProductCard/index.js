import Link from "next/link"
import Image from "next/image";
import dlv from "dlv";
import { imageLoader } from "@/components/shared/imageLoader";
import RatingStar from "@/components/shared/RattingStar";
import { useState } from "react";
import BuyNowDialog from "../HomeProdListing/BuyNowDialog";
import { CalculateRating } from "@/components/shared/CalculateRating";

const ProductCard = ({ product, buyNowButton, productBasicInfo, ctaData, pageName }) => {
    const { ratingValue } = CalculateRating(product);


    const [dialogBuyNow, setDialogBuyNow] = useState(false);
    const openModal = () => {
        setDialogBuyNow(true)
        document.body.style.overflow = 'hidden';
    }
    const closeModal = () => {
        setDialogBuyNow(false);
        // Re-enable scrolling when the popup is closed
        document.body.style.overflow = 'auto';
    };
    return (
        <>
            {
                product && product.map((pdItem, index) => {
                    if (pdItem.name === 'Product') {
                        return (
                            <svg className="svg-placeholder" xmlns="http://www.w3.org/2000/svg" key={`card-placeholder-${index}`}>
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
                            </svg>

                        )
                    } else {
                        return (
                            <div className="prod_card" key={pdItem.id}>
                                <Link className="prod_image" href={pdItem.url_key}>
                                    <Image
                                        loader={imageLoader}
                                        src={dlv(pdItem, 'image.url')}
                                        alt={`${pdItem.name}`}
                                        width={422}
                                        height={205}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Link>
                                <div className="prod_dtl">
                                    <div className="review">
                                        <RatingStar ratings={ratingValue} />
                                        <span className="num_review">{dlv(pdItem, 'review_count')} review</span>
                                    </div>
                                    <Link className="prod_name secondary_title" href={pdItem.url_key}>{pdItem.name}</Link>
                                    <div className="prod_row">
                                        <p className="prod_price">${dlv(pdItem, 'price.regularPrice.amount.value')}</p>
                                        <div onClick={openModal}>
                                            {buyNowButton && <button className="primary_cta prod_cta" >{dlv(buyNowButton, 'text')}</button>}
                                        </div>
                                        {
                                            dialogBuyNow ? <BuyNowDialog url_key={pdItem.url_key} isDescriptionEnabled={false} setDialogBuyNow={setDialogBuyNow} closeModal={closeModal} pageName={pageName} /> : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                )
            }
        </>
    )
}

export default ProductCard;