import LoadingAnimation from '@/components/shared/LoadingAnimation'
import { imageLoader } from '@/components/shared/imageLoader'
import { removeCartItem, updateCartItem } from '@/pages/api/cart'
import checkoutButtonsClickListner from '@/utils/hooks/checkoutButtonsClickListner'
import dlv from 'dlv'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'

export default function CheckoutProductInfo({ cartItems, setCart }) {
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currencySymbol, setCurrencySymbol] = useState('')

    try {
        useEffect(()=>{
            const symbol = getCookie('symbol_currency') || '$';
            setCurrencySymbol(symbol)
        },[])
        
    } catch (error) {
        console.log(error)
    }

    const router = useRouter();
    const handleDeleteCartItem = async (index, id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");

        if (confirmed) {
            setIsLoading(true)
            if (cartItems && cartItems.items && cartItems.items[index]) {
                // Create a copy of the cart items array
                const updatedCartItems = [...cartItems.items];

                // Remove the item at the specified index
                updatedCartItems.splice(index, 1);

                // Update the state with the modified cart items array
                setCart({ ...cartItems, items: updatedCartItems });
                if (updatedCartItems.length == 0) {
                    setCart([])
                }
                const cart = await removeCartItem(id);
                if (cart.data.removeItemFromCart.cart) {
                    setOpenModal(false)
                    if (!cart.data.removeItemFromCart.cart.items.length) {
                        setIsLoading(false)
                        router.push('/cart');
                    } else {
                        setCart(cart.data.removeItemFromCart.cart);
                        setIsLoading(false)
                    }

                }
            }
        }
    };

    const updateCartItemQuantity = async (index, newQuantity, id) => {
        const cart = await updateCartItem(id, newQuantity);
        if (dlv(cart, 'data.updateCartItems.cart')) {
            setCart(dlv(cart, 'data.updateCartItems.cart'));
        }

    };
    const handleQtyMinus = async (event) => {
        setIsLoading(true);
        const id = event.target.getAttribute('prod-id');
        const index = event.target.getAttribute('qty-index');
    
        if (cartItems && cartItems.items && cartItems.items[index]) {
            // Ensure the quantity doesn't go below 1
            const currentQuantity = cartItems.items[index].quantity;
            const newQuantity = Math.max(currentQuantity - 1, 1);
    
            try {
                await updateCartItemQuantity(index, newQuantity, id);
            } catch (error) {
                console.error('Error updating cart item quantity:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    checkoutButtonsClickListner(handleQtyMinus, 'qty_minus')

    const handleQtyPlus = async (event) => {
        setIsLoading(true);
        const id = event.target.getAttribute('prod-id');
        const index = event.target.getAttribute('qty-index');
    
        if (cartItems && cartItems.items && cartItems.items[index]) {
            // Ensure the quantity doesn't exceed 10 (or your desired maximum)
            const currentQuantity = cartItems.items[index].quantity;
            const newQuantity = Math.min(currentQuantity + 1);
    
            try {
                await updateCartItemQuantity(index, newQuantity, id);
            } catch (error) {
                console.error('Error updating cart item quantity:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    checkoutButtonsClickListner(handleQtyPlus, 'qty_plus')

    let discounts = null;
    if (dlv(cartItems, 'items')) {
        const items = [...cartItems.items];

        // Extract and flatten discounts into a single array
        discounts = items.reduce((acc, item) => {
            return acc.concat(item.prices.discounts);
        }, []);
    }

    const discountElements = discounts && discounts
    .filter(discount => dlv(discount, 'label') !== undefined && dlv(discount, 'label') !== null)
    .map((discount, index) => (
        dlv(discount, 'label')
    )).slice(0,1);

    return (
        <div className="check_prod">
            <div className="shoping_prod">
                {
                    cartItems.items ? dlv(cartItems, 'items') && dlv(cartItems, 'items').map((prod, index) =>(<>
                        <div className="prod">
                            <div className="prod_basic_info">
                                <div className="image">
                                    <Image
                                        loader={imageLoader}
                                        src={dlv(prod, 'product.thumbnail.url')}
                                        alt=''
                                        width={60}
                                        height={60}
                                        style={{ height: "auto", borderRadius: "6px" }}
                                    />
                                </div>
                                <div>
                                    <div className="pd">
                                        <p className="text-base md:text-lg text-[#1A2130]">{dlv(prod, 'product.name')}</p>
                                    </div>
                                    <div className='cart'>
                                        <div className='cart_inner'>
                                            <div className='cart_listing'>
                                                <div className="qty">
                                                    <div className="prod_qty">
                                                        <div className="qty_block">
                                                            <div className='qty_btn minus qty_minus' style={{ backgroundColor: 'white' }} prod-id={prod.id} qty-index={index}>
                                                                <svg className='qty_minus' xmlns="http://www.w3.org/2000/svg" width="15" height="2" viewBox="0 0 15 2" fill="none"  prod-id={prod.id} qty-index={index}>
                                                                    <path d="M15 2H0V0H15V2Z" fill="#253D4E" />
                                                                </svg>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                name="qty"
                                                                value={prod.quantity} // Bind quantity here
                                                                onChange={(e) => {
                                                                    const newQuantity = e.target.value;
                                                                    // You should update cartItem.quantity when the input changes
                                                                    // Here, you can call a function to update the quantity in your cart
                                                                    updateCartItemQuantity(index, newQuantity, prod.id);
                                                                }}
                                                                className='qty_field qty_btn'
                                                            />

                                                            <div className='qty_btn pluse qty_plus' style={{ backgroundColor: 'white' }} prod-id={prod.id} qty-index={index}>
                                                                <svg className='qty_plus' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"  prod-id={prod.id} qty-index={index}>
                                                                    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#253D4E" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className="text-lg font-medium text-[#1A2130]">
                                    {currencySymbol}{dlv(prod, 'prices.price.value')}
                                </div>
                                <div className="delete cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19" fill="none" onClick={(e) => {
                                        handleDeleteCartItem(index, prod.id);
                                    }}>
                                        <path d="M6.56818 3.16667H10.4318C10.4318 2.64176 10.2283 2.13835 9.866 1.76718C9.50372 1.39602 9.01235 1.1875 8.5 1.1875C7.98765 1.1875 7.49628 1.39602 7.134 1.76718C6.77171 2.13835 6.56818 2.64176 6.56818 3.16667ZM5.40909 3.16667C5.40909 2.32681 5.73474 1.52136 6.3144 0.927495C6.89405 0.33363 7.68024 0 8.5 0C9.31976 0 10.1059 0.33363 10.6856 0.927495C11.2653 1.52136 11.5909 2.32681 11.5909 3.16667H16.4205C16.5742 3.16667 16.7216 3.22922 16.8303 3.34057C16.9389 3.45192 17 3.60294 17 3.76042C17 3.91789 16.9389 4.06891 16.8303 4.18026C16.7216 4.29161 16.5742 4.35417 16.4205 4.35417H15.4082L14.4678 15.9149C14.3994 16.7559 14.0249 17.5398 13.4188 18.1113C12.8126 18.6827 12.019 18.9999 11.1953 19H5.80473C4.98099 18.9999 4.18736 18.6827 3.58121 18.1113C2.97505 17.5398 2.60065 16.7559 2.53223 15.9149L1.59182 4.35417H0.579545C0.42584 4.35417 0.278431 4.29161 0.169745 4.18026C0.061059 4.06891 0 3.91789 0 3.76042C0 3.60294 0.061059 3.45192 0.169745 3.34057C0.278431 3.22922 0.42584 3.16667 0.579545 3.16667H5.40909ZM3.68745 15.8159C3.73165 16.3601 3.97385 16.8674 4.36602 17.2372C4.7582 17.6071 5.27171 17.8124 5.80473 17.8125H11.1953C11.7283 17.8124 12.2418 17.6071 12.634 17.2372C13.0262 16.8674 13.2684 16.3601 13.3125 15.8159L14.246 4.35417H2.75477L3.68745 15.8159ZM6.76136 7.125C6.91507 7.125 7.06248 7.18756 7.17116 7.29891C7.27985 7.41025 7.34091 7.56128 7.34091 7.71875V14.4479C7.34091 14.6054 7.27985 14.7564 7.17116 14.8678C7.06248 14.9791 6.91507 15.0417 6.76136 15.0417C6.60766 15.0417 6.46025 14.9791 6.35156 14.8678C6.24288 14.7564 6.18182 14.6054 6.18182 14.4479V7.71875C6.18182 7.56128 6.24288 7.41025 6.35156 7.29891C6.46025 7.18756 6.60766 7.125 6.76136 7.125ZM10.8182 7.71875C10.8182 7.56128 10.7571 7.41025 10.6484 7.29891C10.5398 7.18756 10.3923 7.125 10.2386 7.125C10.0849 7.125 9.93752 7.18756 9.82884 7.29891C9.72015 7.41025 9.65909 7.56128 9.65909 7.71875V14.4479C9.65909 14.6054 9.72015 14.7564 9.82884 14.8678C9.93752 14.9791 10.0849 15.0417 10.2386 15.0417C10.3923 15.0417 10.5398 14.9791 10.6484 14.8678C10.7571 14.7564 10.8182 14.6054 10.8182 14.4479V7.71875Z" fill="#1A2130" />
                                    </svg>
                                </div>
                            </div>
                        </div></>)
                    )
                        :
                        <div className="placeholderCartTotal">
                            <div className="animated-background"></div>
                        </div>
                }
            </div>
            <div className="bill_table mt-10 mb-10 bg-secondaryColor rounded-xl p-2">
                {dlv(cartItems, 'prices') && <table className='w-full'>
                    <tbody>
                        <tr>
                            <th className='rounded-tr-md text-base md:text-lg font-normal text-[#1A2130] p-3 md:p-4 text-left'>Subtotal</th>
                            <td className='rounded-tr-md text-base md:text-lg font-medium text-[#1A2130] p-3 md:p-4 text-right'>{currencySymbol}{dlv(cartItems, 'prices.subtotal_excluding_tax.value')}</td>
                        </tr>
                        {discountElements.length > 0 && <tr>
                            <th className='rounded-tr-md text-lg md:text-xl font-normal text-[#1A2130] p-3 md:p-4 text-left'>{`Discount (${discountElements})`}</th>
                            {dlv(cartItems, 'prices.discount') != null && <td className='rounded-tr-md text-lg md:text-xl font-medium text-[#1A2130] p-3 md:p-4 text-right'>{currencySymbol}{dlv(cartItems, 'prices.discount.amount.value')}</td>}
                        </tr>}
                        {dlv(cartItems, 'prices.applied_taxes.length') > 0 &&
                            dlv(cartItems, 'prices.applied_taxes').map((tax) => (
                                <tr key={dlv(tax, 'label')}>
                                    <th className='rounded-tr-md text-lg md:text-xl font-normal text-[#1A2130] p-3 md:p-4 text-left'>{dlv(tax, 'label')}</th>
                                    <td className='rounded-tr-md text-lg md:text-xl font-medium text-[#1A2130] p-3 md:p-4 text-right'>{currencySymbol}{dlv(tax, 'amount.value')}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <th className='rounded-tr-md text-lg md:text-xl font-normal text-[#1A2130] p-3 md:p-4 text-left'>Grand Total</th>
                            <td className='rounded-tr-md text-lg md:text-xl font-medium text-[#1A2130] p-3 md:p-4 text-right'>{currencySymbol}{dlv(cartItems, 'prices.grand_total.value')}</td>
                        </tr>
                    </tbody>
                </table>}
            </div>
            <LoadingAnimation isLoading={isLoading}/>
        </div>
    )
}
