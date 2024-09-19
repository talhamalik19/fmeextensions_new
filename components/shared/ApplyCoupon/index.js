import { applyCouponToCart, removeCouponFromCart } from '@/pages/api/cart';
import { useState, useEffect } from 'react';
import dlv from 'dlv'
import checkoutButtonsClickListner from '@/utils/hooks/checkoutButtonsClickListner';

export default function ApplyCoupon({ applied_coupons, setCartItems, blockContent, closeModal, isCouponApplied, setIsCouponApplied }) {
  const [couponCode, setCouponCode] = useState(applied_coupons.length > 0 ? applied_coupons[0].code : '');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleApplyCoupon = async () => {
    if(isCouponApplied){
      handleCancelCoupon();
    }else{
      const coupon = await applyCouponToCart(couponCode);
    if (coupon.data.applyCouponToCart) {
      setIsCouponApplied(true);
      setCartItems(coupon.data.applyCouponToCart.cart)
      setErrorMessage(null)
      closeModal();
    } else if (coupon.errors) {
      setErrorMessage(coupon.errors[0].message);
    }
    }
  };

  const handleCancelCoupon = async () => {
    const coupon = await removeCouponFromCart();
    if (coupon.data.removeCouponFromCart.cart.applied_coupons == null) {
      setIsCouponApplied(false);
      setCartItems(coupon.data.removeCouponFromCart.cart);
      setErrorMessage(null)
      closeModal();
    } else if (coupon.errors) {
      setErrorMessage(coupon.errors[0].message);
    }
  };

  const handleApplyTokenKeyPress = (e) => {
    if (e.key === "Enter") {
      setCouponCode(e.target.value)
      handleApplyCoupon();
    }
  };

  useEffect(() => {
    setCouponCode(applied_coupons.length > 0 ? applied_coupons[0].code : '');
    setIsCouponApplied(applied_coupons.length > 0);
  }, [applied_coupons]);

  const overlayBg = {
    backgroundColor: 'rgba(228, 113, 67, 0.40)',
  };
  const backGroundGlass = {
    backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
    border: '1px solid #fff',
  };

  checkoutButtonsClickListner(handleApplyCoupon, 'coupon-btn')

  return (
    <div className="dialog_main overlay fixed inset-0 z-20">
        <div style={overlayBg} className='dialog_size fixed inset-0 w-full h-full' onClick={closeModal}></div>
        <div className='dialog_position flex items-center justify-center min-h-screen px-5'>
          <div style={backGroundGlass} className='dialog_block max-w-lg w-full p-3 rounded-lg relative'>
            <div className="flex justify-end absolute top-5 right-5">
              <button className="p-2 text-gray-400 rounded-full bg-[#FFEADE] cursor-pointer"
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none">
                  <path d="M19 1L1 19M1 1L19 19" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className='bg-secondaryColor py-6 px-6 md:py-6 md:px-6 xl:py-8 xl:px-8 rounded-lg'>
              {dlv(blockContent,'cards.2.heading') && <h3 className='text-2xl md:text-3xl xl:text-4xl font-semibold text-center text-titleColor'>{dlv(blockContent,'cards.2.heading')}</h3>}
              {dlv(blockContent,'cards.2.title') && <p className='text-base md:text-lg xl:text-lg py-4 xl:py-4 text-center text-textColor md:w-9/12 m-auto'>{dlv(blockContent,'cards.2.title')}</p>}
              <div className="cuppon_field form_field full">
                <input className={`form_item ${isCouponApplied ? 'cursor-not-allowed bg-gray-200' : ''}`}
                  type="text"
                  name=""
                  id=""
                  value={couponCode}
                  readOnly={isCouponApplied}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyUpCapture={handleApplyTokenKeyPress}
                />
              </div>
              {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
              <div className="dialog_cta flex flex-wrap items-center justify-center gap-5 pt-4 xl:pt-5">
                {dlv(blockContent,'cards.2') &&
                  <>
                    <div className='coupon-btn text-base md:text-lg xl:text-xl min-w-[10em] bg-primaryColor text-secondaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-transparent hover:text-primaryColor transition-all cursor-pointer'>
                      {isCouponApplied ? dlv(blockContent,'cards.2.button.1.field_text') : dlv(blockContent,'cards.2.button.0.field_text')}
                    </div>
                  </>
                }
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}
