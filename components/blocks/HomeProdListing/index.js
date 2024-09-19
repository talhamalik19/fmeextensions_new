import InnerHtml from "@/components/shared/InnerHtml";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import useBestSellerButtonClick from "@/utils/hooks/useBestSellerButtonClick";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { imageLoader } from "@/components/shared/imageLoader";
import RatingStar from "@/components/shared/RattingStar";
import { CalculateRating } from "@/components/shared/CalculateRating";
import dlv from "dlv";
const BuyNowDialog = dynamic(() => import('../HomeProdListing/BuyNowDialog'));

const HomeProdListing = ({ pageName, currency_symbol, globalMagento, pageData, cards, sarabun }) => {
  const combined = [...(pageData?.bestSellers?.items || []), ...(pageData?.latestProducts?.items || [])];
  const uniqueIds = new Set(combined.map(item => item.id));
  
  const uniqueBestSellers = (pageData?.bestSellers?.items || []).filter(item => {
    // Remove from set after processing to avoid removing items in both arrays
    const isUnique = uniqueIds.has(item.id);
    uniqueIds.delete(item.id);
    return isUnique;
});

const uniqueLatestProducts = (pageData?.latestProducts?.items || []).filter(item => uniqueIds.has(item.id));

  const [dialogBuyNow, setDialogBuyNow] = useState(false);
  const [url_key, setUrlKey] = useState(null);
  const closeModal = () => {
    setDialogBuyNow(false);
    document.body.style.overflow = 'auto';
  };

  const handleButtonClick = async (event, isNewTab) => {
    if (!isNewTab && event.target.getAttribute('entity-id')) {
      const url_key = event.target.getAttribute('url-key');
      setUrlKey(url_key);
      setDialogBuyNow(true);
      document.body.style.overflow = 'hidden';
    }
  };

  useBestSellerButtonClick(handleButtonClick);

  useEffect(() => {
    const symbol = getCookie('currency_code') || 'USD';
    const prices = document.getElementsByClassName('price_bestsellers');
    for (let i in prices) {
      try {
        prices[i].classList.remove('active');
      } catch (e) { }
    }
    const active_prices = document.getElementsByClassName(symbol);
    for (let i in active_prices) {
      try {
        active_prices[i].classList.add('active');
      } catch (e) { }
    }

  }, [globalMagento]);

  return (
    <div className="">
      <div className={`section_padding`}>
        <div className="main_container">
         
          <div className="prod_listing grid_4">
            <div class="prod_card hm_lst_cnt">
              <h2 class={`primary_title ${sarabun}`}>{dlv(cards,'0.heading','')}</h2>
              <p class="primary_text">{dlv(cards,'0.text')}</p>
              <div class="section_cta">
                {
                 <Link class="primary_cta" href={`${dlv(cards,'0.button.1.field_redirect')}`}>{dlv(cards,'0.button.1.field_text')}</Link>
                }
              </div>
            </div>
            {
              uniqueBestSellers?.map((item) => {
                const { ratingValue } = CalculateRating(item);
                return (
                  <div class="prod_card"><Link aria-label={item?.name} class="loading_action prod_image" href={`${item?.url_key}`}>
                    <Image
                      loader={imageLoader}
                      src={`${item?.thumbnail?.url}`}
                      alt={`${item?.thumbnail?.label}`}
                      width={85}
                      height={85}
                      style={{ color: "transparent", width: "85px", height: "auto" }}
                      className='loading_action'
                    />
                  </Link>
                    <div class="prod_dtl">
                      <Link class={`${sarabun} prod_name secondary_title loading_action`} href={`${item?.url_key}`}>{item?.name}</Link>
                      <div class="review">
                        <div class="flex gap-[3] align-middle items-center">
                          <RatingStar ratings={item?.overall_average_rating}/>
                        </div>
                        {item?.review_count > 0 && <span className={`num_review ${sarabun}`}>{item?.review_count} Review{item?.review_count > 1 && 's'}</span>}
                      </div>
                      <p class="primary_text">{item?.short_description?.html}</p>
                      <div class="prod_row">
                        <p class={`${sarabun} prod_price`}>{currency_symbol}{item?.price?.regularPrice?.amount?.value}</p>
                        <div>
                          <button class="primary_cta prod_cta" url-key={`${item?.url_key}`} entity-id={item?.id}>{dlv(cards,'0.button.0.field_text')}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* <div className="section_cta pd_lst_cta">
          <Link rel="stylesheet" href="magento-2-extensions" className="primary_cta secondary_cta" >View All Extensions</Link>
        </div> */}
      </div>

      <div className={`section_padding section_bg`}>
        <div className="main_container">
          {/* <div className="section_head">
            <div className="home_pd_lst">
              <h2 className="primary_title">{heading}</h2>
            </div>
          </div> */}
          <div className="prod_listing grid_4">
            <div class="prod_card hm_lst_cnt" style={{backgroundColor:'#FFEFE4'}}>
              <h2 class={`primary_title ${sarabun}`}>{dlv(cards,'1.heading','')}</h2>
              <p class="primary_text">{dlv(cards,'1.text')}</p>
              <div class="section_cta">
                {
                 <Link class="primary_cta" href={`${dlv(cards,'1.button.1.field_redirect')}`}>{dlv(cards,'1.button.1.field_text')}</Link>
                }
              </div>
            </div>
            {
              uniqueLatestProducts?.map((item) => {
                const { ratingValue } = CalculateRating(item);
                return (
                  <div class="prod_card"><Link aria-label={item?.name} class="loading_action prod_image" href={`${item?.url_key}`}>
                    <Image
                      loader={imageLoader}
                      src={`${item?.thumbnail?.url}`}
                      alt={`${item?.thumbnail?.label}`}
                      width={85}
                      height={85}
                      style={{ color: "transparent", width: "85px", height: "auto" }}
                      className='loading_action'
                    />
                  </Link>
                    <div class="prod_dtl">
                      <Link class={`${sarabun} prod_name secondary_title loading_action`} href={`${item?.url_key}`}>{item?.name}</Link>
                      <div class="review">
                        <div class="flex gap-[3] align-middle items-center">
                          <RatingStar ratings={item?.overall_average_rating} />
                        </div>
                        {item?.review_count > 0 && <span className={`num_review ${sarabun}`}>{item?.review_count} Review{item?.review_count > 1 && 's'}</span>}
                      </div>
                      <p class="primary_text">{item?.short_description?.html}</p>
                      <div class="prod_row">
                        <p class={`${sarabun} prod_price`}>{currency_symbol}{item?.price?.regularPrice?.amount?.value}</p>
                        <div>
                          <button class="primary_cta prod_cta" url-key={`${item?.url_key}`} entity-id={item?.id}>{dlv(cards,'1.button.0.field_text')}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* <div className="section_cta pd_lst_cta">
          <Link rel="stylesheet" href="magento-2-extensions" className="primary_cta secondary_cta" >View All Extensions</Link>
        </div> */}
      </div>
      {dialogBuyNow && <BuyNowDialog url_key={url_key} isDescriptionEnabled={false} setDialogBuyNow={setDialogBuyNow} closeModal={closeModal} pageName={pageName} />}
    </div>
  )
}

export default HomeProdListing;