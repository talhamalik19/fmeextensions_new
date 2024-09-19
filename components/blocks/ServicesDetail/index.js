import { useEffect, useState } from 'react'
import HeroInfo from '../HeroInfo';
import BdCrum from '../PageHeader/BdCrum';
import SectionCta from '@/components/global/SectionCta';
import RattingStar from '@/components/shared/RattingStar';
import dlv from 'dlv'
import BannerHighlighted from './BannerHighlighted';
import ReviewDialog from '@/components/shared/ReviewDialog';
import { imageLoader } from '@/components/shared/imageLoader';
import Image from 'next/image';
import ProductFaq from '../ProductFeatures/ProductFaq';
import ProductReview from '../ProductFeatures/ProductReview';
import { customBlocks } from '@/pages/api/page';
import InnerHtml from '@/components/shared/InnerHtml';
import BuyNowDialog from "../HomeProdListing/BuyNowDialog";
import { CalculateRating } from '@/components/shared/CalculateRating';

export default function ServicesDetail({ pageName, product,sarabun }) {
  const [dialogBuyNow, setDialogBuyNow] = useState(false);
    const [blockContent, setBlockContent] = useState([]);

    let sections = [];
  try{
    sections = JSON.parse(product.description.html) || '';
  }catch(e){}

    const parentNav = 'Services';

    const fetchProducts = async () => {
        const customBlocksData = await customBlocks('product-services-page');
        try {
            setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0]);
        } catch (e) { }
    };

    useEffect(() => {
        fetchProducts();
    }, [product]);

    const openModal = () => {
      setDialogBuyNow(true)
      document.body.style.overflow = 'hidden';
  }
  const closeModal = () => {
      setDialogBuyNow(false);
      // Re-enable scrolling when the popup is closed
      document.body.style.overflow = 'auto';
  };

  const { ratingValue } = CalculateRating(product);

  return (
    <div className="services_dtl_wraper">
        <div className="secondary_banner_container">
                <div className="section_bg">
                    <div className="main_container">
                        <BdCrum pageName={`services/${product?.name}`} parentNav={parentNav} sarabun={sarabun}/>

                      <div className="secondary_banner">
                          <div className="secondary_banner_block image_col">
                              <Image
                              loader={imageLoader}
                              src={dlv(product,'image.url')}
                              alt={dlv(product,'image.label')}
                              width={587}
                              height={306}
                              style={{width:'100%',height:'auto'}}
                              />
                          </div>
                          <div className="secondary_banner_block">
                              {dlv(blockContent,'button3') && <SectionCta props={dlv(blockContent,'button3.field_text')} ctaClass="cta_link" url={dlv(blockContent,'button3.field_redirect')} />}
                              <h1 className={`${sarabun} banner_title`}>{dlv(product,'name')}</h1>
                              {dlv(product,'extensions_included') && <p className="banner_text">{dlv(product,'extensions_included')}</p>}
                              <div className='service_rating'>
                                  <RattingStar ratings={ratingValue} />
                                  <span className="txt">Based on {dlv(product,'review_count')} reviews</span>
                                  <div className="review_link">
                                      {dlv(blockContent,'links') && <ReviewDialog blockContent={blockContent} product={product} />}
                                  </div>
                              </div>
                              <div className="mt-6 lg:mt-8" onClick={openModal}>
                                 {<button className="primary_cta prod_cta" >Add to cart</button>}
                               </div>
                               {dialogBuyNow ? <BuyNowDialog url_key={product.url_key} isDescriptionEnabled={false} setDialogBuyNow={setDialogBuyNow} closeModal={closeModal} pageName={pageName} sarabun={sarabun}/> : ''}
                          </div>
                      </div>
                    </div>
                </div>
                {dlv(blockContent,'button2') && <BannerHighlighted blockContent={blockContent} sarabun={sarabun}/>}
            </div>
            <div className="services_details">
            <InnerHtml content={dlv(product, 'description.html')} />
          </div>
        {product && <ProductFaq product={product} blockContent={blockContent} sarabun={sarabun}/>}
        {product && <ProductReview product={product} blockContent={blockContent} sarabun={sarabun}/>}
        <HeroInfo blockContent={blockContent} sarabun={sarabun}/>
    </div>
  )
}
