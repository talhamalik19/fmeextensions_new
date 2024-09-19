import ImageBlock from '@/components/global/ImageBlock'
import dlv from 'dlv'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBestSellerProducts, getProductsByFilter } from '@/pages/api/product'
import Card from '@/components/shared/Card'
import ProductCardPlaceholder from '@/components/shared/ProductCardPlaceholder'

export default function UpsellProd({ blockContent, setCartItems, sarabun }) {

    const [magento2Extensions, setMagento2Extensions] = useState(null);
    const [page, setPage] = useState(1);

    const fetchBestSellers = async () => {
        const bestSellerProducts = await getBestSellerProducts();
        if (dlv(bestSellerProducts, 'data.bestSellerProduct')) {
            const skusArray = dlv(bestSellerProducts, 'data.bestSellerProduct').map(sku => `"${sku}"`);
            const skusString = `[${skusArray.join(', ')}]`;
            const filterQuery = `filter: {sku: {in: ${skusString}}}`;
            const bestSellers = await getProductsByFilter(filterQuery, 6, 1);
            if (dlv(bestSellers, 'data.products.items')) {
                setMagento2Extensions(dlv(bestSellers, 'data.products.items'));
            }
        }
    };

    useEffect(() => {
        fetchBestSellers();
    }, [blockContent]);
    return (
        <>
            <div className="upsell_prod">
                <div className="shoping_title_row">
                    <h3 className={`${sarabun} title`}>
                        <ImageBlock image="/images/upsell products.png" /> {dlv(blockContent, 'title')}
                    </h3>
                </div>
                <div className="upsel_cart grid_custom mt-8 lg:mt-10">
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
        </>
    )
}
