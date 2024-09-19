import Link from 'next/link'
import CheckoutProductInfo from './CheckoutProductInfo'
import { useEffect, useState } from 'react';
import dlv from 'dlv'
import { placeOrder, setBillingAddressOnCart, setPaymentMethod } from '@/pages/api/checkout';
import { useRouter } from 'next/router';
import ApplyCoupon from '@/components/shared/ApplyCoupon';
import signup from '@/pages/api/signup';
import { assignCustomerToCart } from '@/pages/api/cart';
import LoadingAnimation from '@/components/shared/LoadingAnimation';
import { fetchPostJSON } from '@/utils/api-helpers';
import { formatAmountForStripe } from '@/utils/stripe-helpers';
import CheckoutProductsPlaceholder from '@/components/shared/CheckoutProductsPlaceholder';
import checkoutButtonsClickListner from '@/utils/hooks/checkoutButtonsClickListner';
import { getCookie } from "cookies-next";

export default function OrderReview({ cart, setCart, blockContent, checkoutAgreements, defaultBilling, setIsOrderButtonClicked, selectedPaymentMethod, payPalUrl, setUser, isLoading, setIsLoading, paymentError, setPaymentError, stripe, elements, recaptchaRef }) {
    const appliedCoupons = dlv(cart, 'applied_coupons') || [];
    const [isCouponApplied, setIsCouponApplied] = useState(appliedCoupons.length > 0);

    useEffect(() => {
        // This will be triggered whenever appliedCoupons changes
        setIsCouponApplied(appliedCoupons.length > 0);
    }, [appliedCoupons]);

    const [terms, setTerms] = useState(false);
    const router = useRouter();
    const handleCompleteOrder = async (event) => {
        setIsLoading(true)
        setIsOrderButtonClicked(true)
        let isBillingSet = false;
        let billingInfo = null;
        if (defaultBilling === null) {
            isBillingSet = false;
            setPaymentError('Default Billing Address is not set');
            return
        } else if (defaultBilling === '') {
            setPaymentError('Please complete address information');
            setIsLoading(false)
            return
        } else if (defaultBilling !== null) {
            isBillingSet = true;
            billingInfo = defaultBilling;
            setPaymentError([])
        }
        if (!terms) {
            setPaymentError('Please check terms & conditions');
            setIsLoading(false)
            return
        } else if (!selectedPaymentMethod) {
            setPaymentError('Please Select Payment Method!');
            setIsLoading(false)
            return
        }
        if (billingInfo && billingInfo.password && terms && selectedPaymentMethod) {
            isBillingSet = false;
            if (selectedPaymentMethod == 'stripe_payments') {
                const { error: submitError } = await elements.submit();
                if (submitError) {
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                    setIsLoading(false)
                    return;
                }
                const paymentMethod = await stripe.createPaymentMethod({
                    elements: elements,
                    params: {
                        billing_details: {
                            name: `${billingInfo.firstname} ${billingInfo.lastname}`
                        }
                    }
                })

                if (paymentMethod.error) {
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                    setIsLoading(false)
                    setPaymentError(paymentMethod.error.message)
                    return
                }

                const userLogin = await signup(billingInfo.firstname, billingInfo.lastname, billingInfo.email, billingInfo.password, billingInfo.token, false);
                if (dlv(userLogin, 'data.customer.email')) {
                    setUser(userLogin)
                    isBillingSet = true;
                    const assignCustomer = await assignCustomerToCart()
                    const settingAddress = await setBillingAddressOnCart(billingInfo);
                    if (dlv(settingAddress, 'errors')) {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setIsLoading(false)
                        setPaymentError(dlv(settingAddress, 'errors')[0].message);
                        return
                    }
                } else {
                    if (userLogin.errors) {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setIsLoading(false)
                        setPaymentError(userLogin.errors[0].message)
                        isBillingSet = false;
                    }
                }

                const paymentMethodId = paymentMethod.paymentMethod.id;

                const settingPaymentMethod = await setPaymentMethod('stripe_payments', null, paymentMethodId);
                if (settingPaymentMethod.data.setPaymentMethodOnCart.cart) {
                    setIsLoading(false)
                    window.location.href = `/Thankyou?order_id=${settingPaymentMethod.data.placeOrder.order.order_number}`;
                }
                setIsLoading(false)
            }
            else {
                const userLogin = await signup(billingInfo.firstname, billingInfo.lastname, billingInfo.email, billingInfo.password, billingInfo.token, false);
                if (dlv(userLogin, 'data.customer.email')) {
                    setUser(userLogin)
                    isBillingSet = true;
                    const assignCustomer = await assignCustomerToCart()
                    const settingAddress = await setBillingAddressOnCart(billingInfo);
                    if (dlv(settingAddress, 'data.setBillingAddressOnCart.cart')) {
                        if (payPalUrl) {
                            if (getCookie('login_user') && selectedPaymentMethod) {
                                window.location.href = payPalUrl;
                            } else {
                                window.location.href = '/login';
                            }
                            return;
                        }
                        else if (selectedPaymentMethod == 'stripe_payments_checkout') {
                            if (getCookie('login_user')) {
                                const convertedLineItems = dlv(cart, 'items').map(item => ({
                                    name: item.product.name,
                                    quantity: item.quantity,
                                    currency: item.prices.price.currency,
                                    amount: formatAmountForStripe(item.prices.price.value, item.prices.price.currency), // Convert to cents, assuming the original value is in dollars
                                }));

                                const convertedLineTaxes = dlv(cart, 'prices.applied_taxes').map(item => ({
                                    name: item.label,
                                    quantity: 1,
                                    currency: item.amount.currency,
                                    amount: formatAmountForStripe(item.amount.value, item.amount.currency), // Convert to cents, assuming the original value is in dollars
                                }));

                                // Combine line items and taxes
                                const allLineItems = [...convertedLineItems, ...convertedLineTaxes];

                                const response = await fetchPostJSON('/api/checkout_sessions', {
                                    amount: dlv(cart, 'prices.grand_total.value'),
                                    discount: dlv(cart, 'prices.discount'),
                                    lineItems: allLineItems,
                                });

                                setIsLoading(false)
                                window.location.href = response.url
                            }
                        }
                        else if (selectedPaymentMethod != 'paypal_express') {
                            const order = await placeOrder(true, billingInfo.email);
                            if (dlv(order, 'data.placeOrder') != null) {
                                window.location.href = `/Thankyou?order_id=${dlv(order, 'data.placeOrder.order.order_number')}`;
                            } else if (dlv(order, 'errors')) {
                                if (recaptchaRef.current) {
                                    recaptchaRef.current.reset();
                                }
                                setIsLoading(false)
                                setPaymentError(order.errors[0].message);
                            }
                        }
                    } else {
                        if (dlv(settingAddress, 'errors')) {
                            if (recaptchaRef.current) {
                                recaptchaRef.current.reset();
                            }
                            setIsLoading(false)
                            setPaymentError(dlv(settingAddress, 'errors')[0].message);
                        }
                    }
                } else {
                    if (userLogin.errors) {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setIsLoading(false)
                        setPaymentError(userLogin.errors[0].message)
                        isBillingSet = false;
                    }
                }
            }
        } else if (terms && selectedPaymentMethod && billingInfo) {
            const settingAddress = await setBillingAddressOnCart(billingInfo);
            if (dlv(settingAddress, 'data.setBillingAddressOnCart.cart')) {
                if (payPalUrl && selectedPaymentMethod) {
                    if (getCookie('login_user')) {
                        window.location.href = payPalUrl;
                    } else {
                        window.location.href = '/login';
                    }
                    return;
                }
                else if (selectedPaymentMethod == 'stripe_payments') {
                    const { error: submitError } = await elements.submit();
                    if (submitError) {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setIsLoading(false)
                        return;
                    }

                    const paymentMethod = await stripe.createPaymentMethod({
                        elements: elements,
                        params: {
                            billing_details: {
                                name: `${billingInfo.firstname} ${billingInfo.lastname}`
                            }
                        }
                    })

                    if (paymentMethod.error) {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setIsLoading(false)
                        setPaymentError(paymentMethod.error.message)
                        return
                    }

                    const paymentMethodId = paymentMethod.paymentMethod.id;

                    const settingPaymentMethod = await setPaymentMethod('stripe_payments', null, paymentMethodId);
                    if (settingPaymentMethod.errors) {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setPaymentError(settingPaymentMethod.errors[0].message)
                        setIsLoading(false)
                        return
                    }
                    if (settingPaymentMethod.data.setPaymentMethodOnCart.cart) {
                        setIsLoading(false)
                        window.location.href = `/Thankyou?order_id=${settingPaymentMethod.data.placeOrder.order.order_number}`;
                    }
                    setIsLoading(false)
                }
                else if (selectedPaymentMethod == 'stripe_payments_checkout') {

                    const convertedLineItems = dlv(cart, 'items').map(item => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        currency: item.prices.price.currency,
                        amount: formatAmountForStripe(item.prices.price.value, item.prices.price.currency), // Convert to cents, assuming the original value is in dollars
                    }));

                    const convertedLineTaxes = dlv(cart, 'prices.applied_taxes').map(item => ({
                        name: item.label,
                        quantity: 1,
                        currency: item.amount.currency,
                        amount: formatAmountForStripe(item.amount.value, item.amount.currency), // Convert to cents, assuming the original value is in dollars
                    }));

                    // Combine line items and taxes
                    const allLineItems = [...convertedLineItems, ...convertedLineTaxes];

                    const response = await fetchPostJSON('/api/checkout_sessions', {
                        amount: dlv(cart, 'prices.grand_total.value'),
                        discount: dlv(cart, 'prices.discount'),
                        lineItems: allLineItems,
                    });

                    setIsLoading(false)
                    window.location.href = response.url
                }
                else if (selectedPaymentMethod != 'paypal_express') {
                    const order = await placeOrder(true, billingInfo.email);
                    if (dlv(order, 'data.placeOrder') != null) {
                        window.location.href = `/Thankyou?order_id=${dlv(order, 'data.placeOrder.order.order_number')}`;
                    } else if (dlv(order, 'errors')) {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setIsLoading(false)
                        if (order.errors[0].message.includes('Unable to place order: A server error stopped your order from being placed. Please try to place your order again')) {
                            setPaymentError('Please Select Payment Method!');
                        } else {
                            setPaymentError(order.errors[0].message);
                        }
                    }
                }
            } else {
                if (dlv(settingAddress, 'errors')) {
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                    setPaymentError(dlv(settingAddress, 'errors')[0].message);
                }
            }
        }
    }
    const handleTerms = (event) => {
        setTerms(!terms)
    }
    const [cupponDialog, setCupponDialog] = useState(false)
    const closeModal = () => {
        setCupponDialog(false);
        // Re-enable scrolling when the popup is closed
    };

    const openModal = () => {
        setCupponDialog(true)
    }

    checkoutButtonsClickListner(openModal, 'checkout-btns')

    return (
        dlv(cart, 'items.length') > 0 ? <>
            <div className="checkout_block_inner order_review">
                {cart && <CheckoutProductInfo cartItems={cart} setCart={setCart} />}
                <LoadingAnimation isLoading={isLoading} />
                <div className="section_cta checkout_cta">
                    {isCouponApplied ? <div className='primary_cta cta_link checkout-btns'>Cancel Coupon</div> :
                        <div className='primary_cta cta_link checkout-btns'>Apply Coupon</div>}
                    <div className="form_block">
                        <div className="form_check full">
                            <input type="checkbox" name="" id="terms" className="form_check" checked={terms} onChange={handleTerms} required />
                            <label htmlFor="terms" className="form_check_label"> {dlv(checkoutAgreements[0], 'checkbox_text')}
                                <Link target='_blank' href={'/terms-conditions'} className='shoping_highlighted_link'>
                                    {dlv(checkoutAgreements[0], 'name')}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M1 10.5117L11 1.51172M11 1.51172V10.1517M11 1.51172H1.4" stroke="#414141" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Link>
                            </label>
                        </div>
                    </div>
                    {paymentError && <p className='mt-4 text-red-500'>{paymentError}</p>}
                    {<button className="primary_cta shoping_btn" onClick={handleCompleteOrder}>Complete Order</button>}
                </div>
            </div>
            {cupponDialog && <ApplyCoupon applied_coupons={dlv(cart, 'applied_coupons') || []} setCartItems={setCart} blockContent={blockContent} closeModal={closeModal} isCouponApplied={isCouponApplied} setIsCouponApplied={setIsCouponApplied} />}
        </>
            :
            <CheckoutProductsPlaceholder />
    )
}
