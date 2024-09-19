import ApplyCoupon from '@/components/shared/ApplyCoupon';

export default function DiscountBlock({ applied_coupons, setCartItems, blockContent, cupponDialog, setCupponDialog, isCouponApplied, setIsCouponApplied }) {
  const closeModal = () => {
    setCupponDialog(false);
    // Re-enable scrolling when the popup is closed
    document.body.style.overflow = 'auto';
  };
  return (
    <>
      <div className="disc_block px-5 py-6">
        {/* <div className="block w-full">
          <h3 className="title text-lg md:text-xl pb-3">{dlv(blockContent, 'cards.1.heading')}</h3>
          <p className="primary_text">{dlv(blockContent, 'cards.1.title')}</p>
        </div> */}
      </div>

      {/* Apply Cuppon Dialog Box */}

      {cupponDialog && <ApplyCoupon applied_coupons={applied_coupons} setCartItems={setCartItems} blockContent={blockContent} closeModal={closeModal} isCouponApplied={isCouponApplied} setIsCouponApplied={setIsCouponApplied}/>}
    </>
  );
}
