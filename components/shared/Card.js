import { useEffect, useRef } from 'react';
import Link from 'next/link';
import dlv from 'dlv';
import Image from 'next/image';
import RatingStar from './RattingStar';
import { useState } from 'react';
import BuyNowDialog from '../blocks/HomeProdListing/BuyNowDialog';
import Badge from '../blocks/ProductCard/Badge';
import { imageLoader } from './imageLoader';
import { CalculateRating } from './CalculateRating';
import { getCookie } from "cookies-next";
import he from 'he';

export default function Card({
  product,
  buyNowButton,
  newLimit,
  isLast,
  pageName,
  setCartItems,
  priority = false,
  sarabun
}) {
  const [currencySymbol, setCurrencySymbol] = useState('')
  const { ratingValue } = CalculateRating(product);
  /**
   * Select the Card component with useRef
   */
  const cardRef = useRef();
  /**
   * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
   */
  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  try {
    useEffect(() => {
      const symbol = getCookie('symbol_currency') || '$';
      setCurrencySymbol(symbol)
    }, [])

  } catch (error) {
    console.log(error)
  }

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
      <div className="prod_card" ref={cardRef}>
        <Badge badgeText={product?.badge} />
        <Link aria-label={`${product?.name}`} className="loading_action prod_image" href={`/${product?.url_key}`}>
          <Image
            loader={imageLoader}
            src={product?.thumbnail?.url}
            alt={''}
            width={85}
            height={85}
            style={{  height: 'auto' }}
            priority={priority}
            className='loading_action'
          />
        </Link>
        <div className="prod_dtl">
          <Link className={`prod_name secondary_title loading_action ${sarabun}`} href={`/${product?.url_key}`}>
            {product?.name}
            {product?.categories && product?.categories.some(category => category.url_key === 'magento-2-extensions') ? <span> M2</span> : null}
            {product?.categories && product?.categories.some(category => category.url_key === 'magento-1-extensions') ? <span> M1</span> : null}
          </Link>
          <div className="review">
            <div className='flex gap-[3] align-middle items-center'><RatingStar ratings={product?.overall_average_rating} /></div>
            {product?.review_count > 0 && <span className={`${sarabun} num_review`}>{product?.review_count} Review{product?.review_count > 1 && 's'}</span>}
          </div>
          {product?.short_description && <p className="primary_text" dangerouslySetInnerHTML={{ __html: he.decode(product?.short_description?.html) }} />}
          <div className="prod_row">
            <p className={`${sarabun} prod_price`}>
              {currencySymbol}{product?.specialPrice ? product?.specialPrice : product?.price?.regularPrice?.amount?.value}
              {' '}
              {product?.specialPrice ? (
                <del className='primary_text font-medium'>
                  {currencySymbol}{product?.price?.regularPrice?.amount?.value}
                </del>) : ('')}</p>
            <div onClick={openModal}>
              {buyNowButton && <button className="primary_cta prod_cta" >{dlv(buyNowButton, 'field_text')}</button>}
            </div>
            {
              dialogBuyNow ? <BuyNowDialog setCartItems={setCartItems} url_key={product?.url_key} isDescriptionEnabled={false} setDialogBuyNow={setDialogBuyNow} closeModal={closeModal} pageName={pageName} /> : ''
            }
          </div>
        </div>
      </div>
    </>
  );
}
