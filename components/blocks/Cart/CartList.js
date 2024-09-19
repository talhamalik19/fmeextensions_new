import { imageLoader } from '@/components/shared/imageLoader'
import Image from "next/image";
import dlv from 'dlv'
import { useEffect, useState } from 'react'
import DiscountBlock from './DiscountBlock';
import CartCTA from './CartCTA';
import { removeCartItem, updateCartItem } from '@/pages/api/cart';
import CartPaymentMethod from './CartPaymentMethod'
import Link from 'next/link';
import ShopingSteps from '../Checkout/ShopingSteps';
import UpsellProd from './UpsellProd';
import EmptyCart from './EmptyCart';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/cartSlice';
import LoadingAnimation from '@/components/shared/LoadingAnimation';
import { getCookie } from 'cookies-next';

export default function CartList({ cartData, blockContent, pageName, cupponDialog, setCupponDialog, openModal, sarabun }) {
    const [currencySymbol, setCurrencySymbol] = useState('')

    try {
        useEffect(()=>{
            const symbol = getCookie('symbol_currency') || '$';
            setCurrencySymbol(symbol)
        }, [])
        
    } catch (error) {
        console.log(error)
    }
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [cartItems, setCartItems] = useState(cartData);
    const applied_coupons = dlv(cartItems, 'applied_coupons') || [];
    const updateCartItemQuantity = async (index, newQuantity, id) => {
        const cart = await updateCartItem(id, newQuantity);
        if (dlv(cart, 'data.updateCartItems.cart')) {
            let quantity = dlv(cart, 'data.updateCartItems.cart.items').reduce((total, item) => {
                return total + parseInt(item.quantity);
            }, 0);
            dispatch(cartActions.setItems(quantity));
            setCartItems(dlv(cart, 'data.updateCartItems.cart'));
        }

    };

    const handleQtyMinus = (index, id) => {
        if (cartItems && cartItems.items && cartItems.items[index]) {
            // Ensure the quantity doesn't go below 1
            const currentQuantity = cartItems.items[index].quantity;
            const newQuantity = Math.max(currentQuantity - 1, 1);
            updateCartItemQuantity(index, newQuantity, id);
        }
    };

    const handleQtyPlus = (index, id) => {
        if (cartItems && cartItems.items && cartItems.items[index]) {
            // Ensure the quantity doesn't exceed 10 (or your desired maximum)
            const currentQuantity = cartItems.items[index].quantity;
            const newQuantity = Math.min(currentQuantity + 1);
            updateCartItemQuantity(index, newQuantity, id);
        }
    };

    const handleDeleteCartItem = async (index, id) => {
        // Show confirmation dialog
        const confirmed = window.confirm("Are you sure you want to delete this item?");

        if (confirmed) {
            setIsLoading(true)
            if (cartItems && cartItems.items && cartItems.items[index]) {
                // Create a copy of the cart items array
                const updatedCartItems = [...cartItems.items];

                // Remove the item at the specified index
                updatedCartItems.splice(index, 1);

                // Update the state with the modified cart items array
                setCartItems({ ...cartItems, items: updatedCartItems });
                const cart = await removeCartItem(id);
                if (dlv(cart, 'data.removeItemFromCart.cart')) {
                    let quantity = dlv(cart, 'data.removeItemFromCart.cart.items').reduce((total, item) => {
                        return total + parseInt(item.quantity);
                    }, 0);
                    dispatch(cartActions.setItems(quantity));
                    setCartItems(dlv(cart, 'data.removeItemFromCart.cart'));
                    setIsLoading(false)
                }
            }
        }
    };

    let discounts = null;
    if (cartItems) {
        const items = [...cartItems.items];

        // Extract and flatten discounts into a single array
        discounts = items.reduce((acc, item) => {
            return acc.concat(item.prices.discounts);
        }, []);
    }
    const [couponCode, setCouponCode] = useState(applied_coupons.length > 0 ? applied_coupons[0].code : '');
    const [isCouponApplied, setIsCouponApplied] = useState(applied_coupons.length > 0);

    useEffect(() => {
        setCouponCode(applied_coupons.length > 0 ? applied_coupons[0].code : '');
        setIsCouponApplied(applied_coupons.length > 0);
    }, [applied_coupons]);

    const discountElements = discounts && discounts
        .filter(discount => dlv(discount, 'label') !== undefined && dlv(discount, 'label') !== null)
        .map((discount, index) => (
            dlv(discount, 'label')
        )).slice(0, 1);

    return (
        <>
            {dlv(cartItems, 'items.length') > 0 ?
                <>
                    <div className="lg:w-2/4 p-5 md:p-[50px] col_pd bg-secondaryColor">
                        <ShopingSteps cartItems={cartItems} steps={dlv(blockContent, 'steps')} />
                        <div className="cart_listing pt-10">
                            <div className="shoping_title_row">
                                <h3 className={`${sarabun} title`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="34" viewBox="0 0 24 34" fill="none">
                                        <path d="M17.5333 5.35196C16.6394 3.11732 14.1813 2 11.9467 2C9.71204 2 7.25394 3.11732 6.36009 5.35196C6.24835 5.68715 5.46623 7.47486 6.36009 8.70391C7.14221 9.82123 8.70645 9.82123 11.9467 9.82123C15.1869 9.82123 16.7511 9.82123 17.5333 8.70391C18.4271 7.47486 17.645 5.68715 17.5333 5.35196Z" stroke="#253D4E" strokeWidth="2.2" strokeMiterlimit="10" />
                                        <path d="M19.7654 32.0554H4.23464C3.00559 32.0554 2 31.0498 2 29.8208V12.1672C2 10.9381 3.00559 9.93252 4.23464 9.93252H19.7654C20.9944 9.93252 22 10.9381 22 12.1672V29.8208C22 31.0498 20.9944 32.0554 19.7654 32.0554Z" stroke="#253D4E" strokeWidth="2.2" strokeMiterlimit="10" />
                                    </svg>
                                    {dlv(blockContent, 'cards.0.heading')}
                                </h3>
                                {/* <Link href={dlv(blockContent, 'cards.0.button.0.field_redirect') || ''} className="shoping_highlighted_link shoping_cart_link">
                                    {dlv(blockContent, 'cards.0.button.0.field_text')}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M1 10.5117L11 1.51172M11 1.51172V10.1517M11 1.51172H1.4" stroke="#414141" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Link> */}
                            </div>
                            <div className="cart_listing_inner">
                                <table className='w-full'>
                                    <tbody>
                                        {
                                            dlv(cartItems, 'items') && dlv(cartItems, 'items').map((cartItem, index) => {
                                                return (
                                                    <tr key={`cart-item-${index}`} className='border-solid border-b-[1px] border-[#FFF7F2]'>
                                                        <td data-th="Product Name" className='cart_prod_block'>
                                                            <div className="prod_info flex flex-col xl:flex-row items-start gap-2 md:gap-5">
                                                                <div className="image_block w-12 lg:w-16 xl:w-20">
                                                                    <Image
                                                                        loader={imageLoader}
                                                                        src={dlv(cartItem, 'product.thumbnail.url')}
                                                                        alt={dlv(cartItem, 'product.thumbnail.label')}
                                                                        width={100}
                                                                        height={100}
                                                                        style={{ height: 'auto', }}
                                                                    />
                                                                </div>
                                                                <div className="prod_info">
                                                                    <h3 className={`${sarabun} prod_name`}>{dlv(cartItem, 'product.name')}<Link href={`${dlv(cartItem, 'product.url_key')}?update=true&configuration_id=${cartItem.id}` || ''} className='shoping_highlighted_link mt-3 loading_action'>
                                                                        Edit
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                            <path d="M1 10.5117L11 1.51172M11 1.51172V10.1517M11 1.51172H1.4" stroke="#414141" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>
                                                                    </Link></h3>
                                                                    <div className="downloadable_item">
                                                                        {dlv(cartItem, "customizable_options") && (<>
                                                                            {dlv(cartItem, 'customizable_options.length') > 0 && <span className='block'>Options</span>}
                                                                            {dlv(cartItem, 'customizable_options') && (
                                                                                <ul className='downloadable_item_list px-1 py-1'>
                                                                                    {
                                                                                        dlv(cartItem, 'customizable_options').map((option, index) =>
                                                                                            dlv(option, 'values').map((value, index) => (
                                                                                                (<li key={index} className='block-list'>{value.label}</li>)
                                                                                            ))
                                                                                        )
                                                                                    }
                                                                                </ul>

                                                                            )}</>)}

                                                                        {dlv(cartItem, "links") && (<>
                                                                            {dlv(cartItem, 'links.length') > 0 && <span className='block'>Download</span>}
                                                                            {dlv(cartItem, 'links') && (
                                                                                <ul className='downloadable_item_list px-1 py-1'>
                                                                                    {
                                                                                        dlv(cartItem, 'links').map((downloadItem, index) =>
                                                                                            (<li key={index} className='block-list'>{downloadItem.title}</li>)
                                                                                        )
                                                                                    }
                                                                                </ul>
                                                                            )}
                                                                        </>)}

                                                                    </div>
                                                                    <div className="qty">
                                                                        <div className="prod_qty">
                                                                            <div className="qty_block">
                                                                                <button className='qty_btn minus' onClick={(e) => {
                                                                                    handleQtyMinus(index, cartItem.id);
                                                                                }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="2" viewBox="0 0 15 2" fill="none">
                                                                                        <path d="M15 2H0V0H15V2Z" fill="#253D4E" />
                                                                                    </svg>
                                                                                </button>
                                                                                <input
                                                                                    type="text"
                                                                                    name="qty"
                                                                                    value={cartItem.quantity} // Bind quantity here
                                                                                    onChange={(e) => {
                                                                                        const newQuantity = e.target.value;
                                                                                        // You should update cartItem.quantity when the input changes
                                                                                        // Here, you can call a function to update the quantity in your cart
                                                                                        updateCartItemQuantity(index, newQuantity, cartItem.id);
                                                                                    }}
                                                                                    className='qty_field'
                                                                                />

                                                                                <button className='qty_btn pluse' onClick={(e) => {
                                                                                    handleQtyPlus(index, cartItem.id);
                                                                                }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                                                        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#253D4E" />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td data-th="Price" className='cart_price text-center'>{currencySymbol}{dlv(cartItem, 'prices.price.value')} </td>
                                                        <td data-th="Delete" className='delete_cart text-center'>
                                                            <button className='dtl_btn' onClick={(e) => {
                                                                handleDeleteCartItem(index, cartItem.id);
                                                            }}>
                                                                <svg className='m-auto' xmlns="http://www.w3.org/2000/svg" width="23" height="25" viewBox="0 0 23 25" fill="none">
                                                                    <path d="M8.88636 4.16667H14.1136C14.1136 3.476 13.8383 2.81362 13.3481 2.32524C12.858 1.83687 12.1932 1.5625 11.5 1.5625C10.8068 1.5625 10.142 1.83687 9.65188 2.32524C9.16173 2.81362 8.88636 3.476 8.88636 4.16667ZM7.31818 4.16667C7.31818 3.0616 7.75876 2.00179 8.54301 1.22039C9.32725 0.438987 10.3909 0 11.5 0C12.6091 0 13.6727 0.438987 14.457 1.22039C15.2412 2.00179 15.6818 3.0616 15.6818 4.16667H22.2159C22.4239 4.16667 22.6233 4.24898 22.7703 4.39549C22.9174 4.542 23 4.74072 23 4.94792C23 5.15512 22.9174 5.35383 22.7703 5.50034C22.6233 5.64686 22.4239 5.72917 22.2159 5.72917H20.8464L19.574 20.9406C19.4815 22.0472 18.9749 23.0787 18.1548 23.8306C17.3347 24.5825 16.261 24.9999 15.1465 25H7.85345C6.73899 24.9999 5.66525 24.5825 4.84516 23.8306C4.02507 23.0787 3.51852 22.0472 3.42595 20.9406L2.15364 5.72917H0.784091C0.576137 5.72917 0.3767 5.64686 0.229655 5.50034C0.0826092 5.35383 0 5.15512 0 4.94792C0 4.74072 0.0826092 4.542 0.229655 4.39549C0.3767 4.24898 0.576137 4.16667 0.784091 4.16667H7.31818ZM4.98891 20.8104C5.0487 21.5265 5.37638 22.194 5.90697 22.6806C6.43756 23.1672 7.13232 23.4374 7.85345 23.4375H15.1465C15.8677 23.4374 16.5624 23.1672 17.093 22.6806C17.6236 22.194 17.9513 21.5265 18.0111 20.8104L19.274 5.72917H3.72705L4.98891 20.8104ZM9.14773 9.375C9.35568 9.375 9.55512 9.45731 9.70216 9.60382C9.84921 9.75034 9.93182 9.94905 9.93182 10.1562V19.0104C9.93182 19.2176 9.84921 19.4163 9.70216 19.5628C9.55512 19.7094 9.35568 19.7917 9.14773 19.7917C8.93977 19.7917 8.74034 19.7094 8.59329 19.5628C8.44625 19.4163 8.36364 19.2176 8.36364 19.0104V10.1562C8.36364 9.94905 8.44625 9.75034 8.59329 9.60382C8.74034 9.45731 8.93977 9.375 9.14773 9.375ZM14.6364 10.1562C14.6364 9.94905 14.5538 9.75034 14.4067 9.60382C14.2597 9.45731 14.0602 9.375 13.8523 9.375C13.6443 9.375 13.4449 9.45731 13.2978 9.60382C13.1508 9.75034 13.0682 9.94905 13.0682 10.1562V19.0104C13.0682 19.2176 13.1508 19.4163 13.2978 19.5628C13.4449 19.7094 13.6443 19.7917 13.8523 19.7917C14.0602 19.7917 14.2597 19.7094 14.4067 19.5628C14.5538 19.4163 14.6364 19.2176 14.6364 19.0104V10.1562Z" fill="#6D6D75" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="resp_cart_totals_blk">
                                    <div className='bg-secondaryColor rounded-lg py-2 lg:py-7'>
                                        <div className="cart_total cart_sub_total  flex justify-between">
                                            <div className="title">{dlv(blockContent, 'cards.2.sub_total_text')}</div>
                                            <div className="value">{currencySymbol}{dlv(cartItems.prices, 'subtotal_excluding_tax.value')}</div>
                                        </div>
                                        {discountElements.length > 0 && <div className="cart_total cart_sub_total flex justify-between">
                                            {discountElements && <div className="title">{`Discount (${discountElements})`}</div>}
                                            { dlv(cartItems, 'prices.discount') != null && <div className="value">{currencySymbol}{dlv(cartItems, 'prices.discount.amount.value')}</div>}
                                        </div>}
                                        {dlv(cartItems.prices, 'applied_taxes.length') > 0 && <div className="cart_total cart_grand_total flex justify-between">
                                            {dlv(cartItems.prices, 'applied_taxes').map((tax) => (
                                                <>
                                                    <div div key={dlv(tax, 'label')} className='title'>{dlv(tax, 'label')}</div>
                                                    <div div key={dlv(tax, 'label')} className='value'>{currencySymbol}{dlv(tax, 'amount.value')}</div>
                                                </>
                                            ))}
                                        </div>}
                                        <div className="cart_total cart_grand_total flex justify-between">
                                            <div className="title">{dlv(blockContent, 'cards.2.grand_total_text')}</div>
                                            <div className="value">{currencySymbol}{dlv(cartItems.prices, 'grand_total.value')}</div>
                                        </div>
                                    </div>

                                    <div className="cart_cuppon">
                                        {dlv(blockContent, 'cards.2') && <span className="apply_cuppon" onClick={openModal}>
                                            {isCouponApplied ? dlv(blockContent, 'cards.2.button.1.field_text') : dlv(blockContent, 'cards.2.button.0.field_text')}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M1 10.5117L11 1.51172M11 1.51172V10.1517M11 1.51172H1.4" stroke="#414141" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </span>}
                                    </div>
                                </div>
                                <CartCTA blockContent={blockContent} />
                                {cartItems && <DiscountBlock applied_coupons={applied_coupons} couponCode={couponCode} isCouponApplied={isCouponApplied} setIsCouponApplied={setIsCouponApplied} setCouponCode={setCouponCode} setCartItems={setCartItems} blockContent={blockContent} cupponDialog={cupponDialog} setCupponDialog={setCupponDialog} />}
                                <UpsellProd setCartItems={setCartItems} cartData={cartData} pageName={pageName} blockContent={blockContent} sarabun={sarabun}/>
                            </div>
                        </div>

                    </div>
                    <CartPaymentMethod isCouponApplied={isCouponApplied} prices={cartItems.prices} discounts={discounts} blockContent={blockContent} openModal={openModal} />
                </>
                :
                <EmptyCart setCartItems={setCartItems} cartItems={cartItems} blockContent={blockContent} sarabun={sarabun}/>
            }
            <LoadingAnimation isLoading={isLoading} />
        </>
    )
}
