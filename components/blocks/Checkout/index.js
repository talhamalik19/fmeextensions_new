import BillingInfo from './BillingInfo';
import PaymentMethod from './PaymentMethod';
import OrderReview from './OrderReview';
import ShopingSteps from './ShopingSteps';
import React, { useEffect, useRef, useState } from 'react';
import dlv from 'dlv';
import { getCartItems } from '@/pages/api/cart';
import { customBlocks } from '@/pages/api/page';

export default function index({ user, setUser, checkoutAgreements,sarabun }) {
    const [cart, setCart] = useState([]);
    const [defaultBilling, setDefaultBilling] = useState(null);
    const [IsLoginForm, setIsLoginForm] = useState(false)
    const [isOrderButtonClicked, setIsOrderButtonClicked] = useState(false)
    const [payPalUrl, setPaypalUrl] = useState(null)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
    const [blockContent, setBlockContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentError, setPaymentError] = useState([]);
    const [stripe, setStripe] = useState(null);
    const [elements, setElements] = useState(null);
    const recaptchaRef = useRef(null);

    let customer = user || null;
    

    // Fetch the cart items if they are initially undefined
    useEffect(() => {

        try {
            if (customer) {
                const addressArray = dlv(customer, 'data.customer.addresses');
                const selectedAddressId = dlv(customer, 'data.customer.default_billing');
    
                const defaultBilling = addressArray.find((address) => dlv(address, 'id') == selectedAddressId) || null;
                setDefaultBilling(defaultBilling)
            }
        } catch (e) { }

        const getCart = async () => {
            const customBlocksData = await customBlocks('empty-cart');
            try {
                setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0]);
            } catch (e) {  }
            const cart = await getCartItems();
            if (dlv(cart, 'data') === null) {
                const cart = await getCartItems();
                setCart(dlv(cart, 'data.cart'));
                setSelectedPaymentMethod(dlv(cart, 'data.cart.selected_payment_method.code'))
            } else {
                setCart(dlv(cart, 'data.cart'));
                setSelectedPaymentMethod(dlv(cart, 'data.cart.selected_payment_method.code'))
            }

        }
        getCart();
    }, [user]); // Add initialCart as a dependency

    // const steps = [
    //     { id: 1, text: 'Choose Extension', active: true, tick: false },
    //     { id: 2, text: 'Cart/Checkout', active: true, tick: true },
    //     { id: 3, text: 'Download', active: false, tick: false },
    // ];
    

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="checkout shoping_pg">
            <div className="checkout_inner">
                <div className="checkout_sec">
                    {IsLoginForm ? <div className="checkout_sec_inner">
                        <div className="checkout_block shoping_block">
                            {dlv(blockContent,'steps') && <ShopingSteps cartItems={cart} steps={dlv(blockContent,'steps')} />}
                            <BillingInfo recaptchaRef={recaptchaRef} cart={cart} isOrderButtonClicked={isOrderButtonClicked} customer={customer} setDefaultBilling={setDefaultBilling} setUser={setUser} IsLoginForm={IsLoginForm} setIsLoginForm={setIsLoginForm} sarabun={sarabun} />
                            {dlv(cart, 'available_payment_methods') && <PaymentMethod setPaypalUrl={setPaypalUrl} availablePaymentMethods={dlv(cart, 'available_payment_methods')} setSelectedPaymentMethod={setSelectedPaymentMethod} selectedPaymentMethod={selectedPaymentMethod} setIsLoading={setIsLoading} setPaymentError={setPaymentError} setStripe={setStripe} setElements={setElements} sarabun={sarabun}/>}
                        </div>
                        <div className="checkout_block shoping_block highlighted_col">
                            <div className="sticky top-5">
                                {cart && <OrderReview recaptchaRef={recaptchaRef} blockContent={blockContent} payPalUrl={payPalUrl} isOrderButtonClicked={isOrderButtonClicked} setIsOrderButtonClicked={setIsOrderButtonClicked} IsLoginForm={IsLoginForm} cart={cart} setCart={setCart} checkoutAgreements={checkoutAgreements} defaultBilling={defaultBilling} selectedPaymentMethod={selectedPaymentMethod} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} paymentError={paymentError} setPaymentError={setPaymentError} stripe={stripe} elements={elements} />}
                            </div>
                        </div>
                    </div> :
                        <form className="checkout_sec_inner" onSubmit={handleSubmit}>
                            <div className="checkout_block shoping_block">
                            {dlv(blockContent,'steps') && <ShopingSteps cartItems={cart} steps={dlv(blockContent,'steps')}/>}
                                <BillingInfo recaptchaRef={recaptchaRef} cart={cart} isOrderButtonClicked={isOrderButtonClicked} customer={customer} setDefaultBilling={setDefaultBilling} setUser={setUser} IsLoginForm={IsLoginForm} setIsLoginForm={setIsLoginForm} sarabun={sarabun}/>
                                {cart && <PaymentMethod setPaypalUrl={setPaypalUrl} availablePaymentMethods={dlv(cart, 'available_payment_methods')} setSelectedPaymentMethod={setSelectedPaymentMethod} selectedPaymentMethod={selectedPaymentMethod} setIsLoading={setIsLoading} setPaymentError={setPaymentError} setStripe={setStripe} setElements={setElements} sarabun={sarabun}/>}
                            </div>
                            <div className="checkout_block shoping_block highlighted_col">
                                <div className="sticky top-5">
                                    {cart && <OrderReview recaptchaRef={recaptchaRef} blockContent={blockContent} payPalUrl={payPalUrl} isOrderButtonClicked={isOrderButtonClicked} setIsOrderButtonClicked={setIsOrderButtonClicked} IsLoginForm={IsLoginForm} cart={cart} setCart={setCart} checkoutAgreements={checkoutAgreements} defaultBilling={defaultBilling} selectedPaymentMethod={selectedPaymentMethod} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} paymentError={paymentError} setPaymentError={setPaymentError} stripe={stripe} elements={elements} />}
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}
