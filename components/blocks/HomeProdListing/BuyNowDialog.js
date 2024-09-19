import React, { useEffect, useState } from 'react'
import ProductDetail from '../ProductDetail';
import { searchProduct } from '@/pages/api/search';
import dlv from 'dlv';

export default function BuyNowDialog({ url_key, closeModal, pageName, setCartItems }) {
    const [product, setProduct] = useState(null);
    const [productBasicInfo, setProductBasicInfo] = useState(null);
    const filterQuery = `filter: {url_key: {eq: "${url_key}"}}`;

    const fetchProduct = async () => {
        const product = await searchProduct(filterQuery);
        try{
            setProduct({...dlv(product,'data.products.items')[0], ...product?.data?.currency});
            const basic = {
                id: dlv(dlv(product,'data.products.items')[0],'id'),
                image: dlv(dlv(product,'data.products.items')[0],'image'),
                name: dlv(dlv(product,'data.products.items')[0],'name'),
                sku: dlv(dlv(product,'data.products.items')[0],'sku')
            }
            setProductBasicInfo(basic)
        }catch(e){}
    }
    useEffect(()=>{
        fetchProduct();
    },[url_key]);

    const overlayBg = {
        backgroundColor: 'rgba(228, 113, 67, 0.40)',
    };
    const backGroundGlass = {
        backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
        border: '1px solid #fff',
    };

    return (
        <>
            <div className="buy_now_dialog dialog_main overlay fixed inset-0 z-20">
                <div style={overlayBg} className='dialog_size fixed inset-0 w-full h-full' onClick={closeModal}></div>
                <div className='dialog_position flex items-center justify-center min-h-screen px-5'>
                    <div style={backGroundGlass} className='dialog_block max-w-6xl w-full p-3 rounded-lg relative'>
                        <div className="flex justify-end absolute top-6 right-8">
                            <button className="p-2 text-gray-400 rounded-full bg-[#E47143] cursor-pointer"
                                onClick={() => closeModal(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none">
                                    <path d="M19 1L1 19M1 1L19 19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className='dialog_height bg-secondaryColor py-8 px-8 md:py-18 md:px-10 lg:py-10 lg:px-12 rounded-lg overflow-y-auto'>
                            <div className="prod_dtl_popup">
                                <ProductDetail setCartItems={setCartItems} isDescriptionEnabled={false} closeModal={closeModal} product={product} pageName={pageName} productBasicInfo={productBasicInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
