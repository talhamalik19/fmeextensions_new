import React from 'react'
import ProductOptions from './ProductOptions.';

const ProductComboDialog = ({ close_dialog, popup, product, mainProduct, globalMagento, closeModal, cartFromCartProvider, sarabun }) => {
    const overlayBg = {
        backgroundColor: 'rgba(228, 113, 67, 0.40)',
    };
    const backGroundGlass = {
        backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
        border: '1px solid #fff',
    };

    return (
        <div className="combo_deal_dialog dialog_main overlay fixed inset-0 z-20">
            <div style={overlayBg} className="dialog_size fixed inset-0 w-full h-full" onClick={close_dialog}></div>
            <div className="dialog_position h-full flex items-center justify-center min-h-screen px-4 py-4">
                <div className="popup-content-h h-full popup_ask_cnt flex items-center justify-center flex-col max-w-3xl w-full">
                    <div style={backGroundGlass} className="dialog_block max-w-3xl w-full p-3 rounded-lg relative h-full">
                        <div className=" bg-secondaryColor py-8 px-8 md:py-6 md:px-10 xl:py-6 xl:px-12 rounded-lg overflow-x-auto h-full">
                            <div className="popup-content-scroll bg-secondaryColor rounded-lg overflow-y-auto h-full">
                                <div className="flex justify-end absolute top-5 right-5">
                                    <button className="p-2 text-gray-400 rounded-full bg-[#FFEADE] cursor-pointer"
                                        onClick={close_dialog}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none">
                                            <path d="M19 1L1 19M1 1L19 19" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="dialog_height popup_inner text-center">
                                    <ProductOptions
                                        product={product}
                                        globalMagento={globalMagento}
                                        closeModal={closeModal}
                                        mainProduct={mainProduct}
                                        cartFromCartProvider={cartFromCartProvider}
                                        sarabun={sarabun}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductComboDialog