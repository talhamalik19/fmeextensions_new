import React from 'react'
import ShopingSteps from '../Checkout/ShopingSteps'
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { imageLoader } from '@/components/shared/imageLoader';
import dlv from 'dlv';
import Link from 'next/link';
import Card from '@/components/shared/Card';
import ProductCardPlaceholder from '@/components/shared/ProductCardPlaceholder';
import { getBestSellerProducts, getProductsByFilter } from '@/pages/api/product';

const shuffleAndTakeSix = (array) => {
    const shuffledArray = [...array];
  
    // Perform the Fisher-Yates shuffle
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    // Return only the first 6 elements
    return shuffledArray.slice(0, 10);
  };

export default function EmptyCart({ cartItems, setCartItems, blockContent, sarabun }) {
    const [magento2Extensions, setMagento2Extensions] = useState(null);
    const [page, setPage] = useState(1);

    const fetchBestSellers = async () => {
        const bestSellerProducts = await getBestSellerProducts();
        if (dlv(bestSellerProducts, 'data.bestSellerProduct')) {
            const skusArray = dlv(bestSellerProducts, 'data.bestSellerProduct').map(sku => `"${sku}"`);
            const shuffledSkus = shuffleAndTakeSix(skusArray);
            const skusString = `[${shuffledSkus.join(', ')}]`;
            const filterQuery = `filter: {sku: {in: ${skusString}}}`;
            const bestSellers = await getProductsByFilter(filterQuery, 6, 1);
            if (dlv(bestSellers, 'data.products.items')) {
                setMagento2Extensions(dlv(bestSellers, 'data.products.items'));
            }
        }
    };

    useEffect(() => {
        fetchBestSellers();
    }, [cartItems]);



    return (
        <>
            <div className="section_padding w-full">
                <div className="empty_cart max-w-[1400px] w-full m-auto ">
                    <div className=" w-full p-5 md:py-[40px] md:px-[50px] bg-secondaryColor rounded-[10px] shadow-sm">
                        <ShopingSteps cartItems={cartItems} steps={dlv(blockContent, 'steps')} bkHome={blockContent}/>
                        <div className="empty_cart py-4 md:py-6 lg:py-10">
                            <div className='text-center'>
                                {dlv(blockContent, 'image') && dlv(blockContent, 'image') ?
                                    <Image
                                        loader={imageLoader}
                                        src={dlv(blockContent, 'image.0.url')}
                                        alt={`${dlv(blockContent, 'image.0.alt')}`}
                                        width={80}
                                        height={80}
                                        className='empty_cart_icon'
                                        style={{ width: "auto", height: "auto", margin: 'auto' }}
                                    />
                                    :
                                    <div className="placeholderlist">
                                        <div className="animated-background"></div>
                                    </div>
                                }
                                <div className='empty_cart_content py-4 lg:py-5 space-y-2 lg:space-y-4'>
                                    {dlv(blockContent, 'heading') !== null ? dlv(blockContent, 'heading') &&
                                        <h2 className={`${sarabun} empty_crt_title`}>{dlv(blockContent, 'heading')}</h2>
                                        :
                                        <div className="placeholderlist">
                                            <div className="animated-background"></div>
                                        </div>
                                    }
                                    {dlv(blockContent, 'text') !== null ? dlv(blockContent, 'text') &&
                                        <p className='empty_crt_text'>{dlv(blockContent, 'text')}</p>
                                        :
                                        <div className="placeholderlist">
                                            <div className="animated-background"></div>
                                        </div>
                                    }
                                </div>
                                {dlv(blockContent, 'button') !== null ? dlv(blockContent, 'button') &&
                                    <Link href={dlv(blockContent, 'button.field_redirect') || ''} className='primary_cta secondary_cta loading_action'>{dlv(blockContent, 'button.field_text')}</Link>
                                    :
                                    <div className="placeholderlist">
                                        <div className="animated-background"></div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="empty_cart_prod py-10 border-t border-solid border-[#EBEBEB]">
                            <h2 className={`text-xl md:text-2xl xl:text-3xl font-medium text-titleColor text-center ${sarabun}`}>{dlv(blockContent, 'title')}</h2>
                            <div className="empty_cart_prod_list grid_4 mt-6">
                                {magento2Extensions ? magento2Extensions.map((item, index) => {
                                    if (item.type !== 4) {
                                        return (
                                            <Card
                                                key={index}
                                                product={item}
                                                buyNowButton={dlv(blockContent, 'button1')}
                                                isLast={index === magento2Extensions.length - 1}
                                                newLimit={() => setPage(page)}
                                                magento2Extensions={item} //For Buy Now Popup
                                                pageName={'cart'}
                                                setCartItems={setCartItems}
                                                sarabun={sarabun}
                                            />
                                        )
                                    }
                                })
                                    :
                                    <ProductCardPlaceholder />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
