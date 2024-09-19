import ImageBlock from '@/components/global/ImageBlock';
import { setPaymentMethod, createPaypalExpressToken } from '@/pages/api/checkout';
import dlv from 'dlv';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { getCookie } from 'cookies-next';
import { getStrapiURL } from '@/utils';
import { getCartItems } from '@/pages/api/cart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_pEe6pRwLQKWYbnhXJUlZCarw00V5bUkizA');

export default function PaymentMethod({ availablePaymentMethods, setSelectedPaymentMethod, selectedPaymentMethod, setPaypalUrl, defaultBilling, setIsLoading, setPaymentError, setStripe, setElements, sarabun }) {
    // Initialize an object to hold isLoading states for each payment method
    const [isLoadingStates, setIsLoadingStates] = useState({});

    useEffect(() => {
        if (selectedPaymentMethod == 'paypal_express') {
            const createToken = async () => {
                const token = await createPaypalExpressToken();
                if (dlv(token, 'data.createPaypalExpressToken.paypal_urls.start')) {
                    setPaypalUrl(dlv(token, 'data.createPaypalExpressToken.paypal_urls.start'));
                }
            }
            createToken();
        }
    }, [selectedPaymentMethod]);

    const handlePaymentMethodChange = async (event) => {
        const paymentMethodCode = event.target.value;
        setIsLoadingStates({ ...isLoadingStates, [paymentMethodCode]: true });
        const cart_id_client = getCookie('cart_id');
        const jwt_client = getCookie('jwt');
        const selected_currency = getCookie('currency_code');
        const selected_store = getCookie('store_code');
        let token = false;
        let headers = {
            'Content-Type': 'application/json',
            'Content-Currency': `${selected_currency}`,
            'Store': `${selected_store}`
        };

        if (jwt_client) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt_client}`,
                'Content-Currency': `${selected_currency}`,
                'Store': `${selected_store}`
            };
        }

        if (paymentMethodCode == 'paypal_express') {
            const createToken = await createPaypalExpressToken();
            if (dlv(createToken, 'data.createPaypalExpressToken.paypal_urls.start')) {
                setPaypalUrl(dlv(createToken, 'data.createPaypalExpressToken.paypal_urls.start'));
                token = dlv(createToken, 'data.createPaypalExpressToken.token');
            }
        } else {
            setPaypalUrl(null);
        }

        const response = await fetch(getStrapiURL('/graphql'), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                query: `mutation {
                setPaymentMethodOnCart(input: {
                  cart_id: "${cart_id_client}"
                  payment_method: {
                    code: "${paymentMethodCode}"
                    ${token ? `paypal_express: {
                        payer_id: ""
                        token: "${token}"
                      }` : ''}
                  }
                }) {
                  cart {
                    selected_payment_method {
                      code
                      title
                    }
                  }
                }
              }`,
                variables: {},
            }),
        });

        const setPaymentMethodResponse = await response.json();

        if (dlv(setPaymentMethodResponse, 'data.setPaymentMethodOnCart.cart.selected_payment_method.code')) {
            const cartItems = await getCartItems();

            if (dlv(cartItems, 'data.cart.selected_payment_method.code') == paymentMethodCode) {
                setSelectedPaymentMethod(paymentMethodCode)
            } else {
                setSelectedPaymentMethod(null);
            }
        } else if (dlv(setPaymentMethodResponse, 'errors.0')) {
            setPaymentError(dlv(setPaymentMethodResponse, 'errors.0.message'))
        }

        setIsLoading(false);

        setIsLoadingStates({ ...isLoadingStates, [paymentMethodCode]: false });
    };

    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {/*...*/ },
        paymentMethodCreation: "manual"
    };

    const free = availablePaymentMethods && Array.isArray(availablePaymentMethods)
        ? availablePaymentMethods.filter((paymentMethod) => paymentMethod.code === 'free')
        : [];

    const freePaymentMethod = async () => {
        setSelectedPaymentMethod('free')
        const selected = await setPaymentMethod('free');
        setPaypalUrl(null);
    }

    const paypalPaymentMethod = async () => {
        setSelectedPaymentMethod('paypal_express')
        const selected = await setPaymentMethod('paypal_express');
    }

    useEffect(() => {
        if (free.length > 0) {
            freePaymentMethod();
        } else {
            //paypalPaymentMethod();
        }
    }, [free]);

    return (
        <>
            <div className="checkout_block_inner payment_method">
                <div className="shoping_title_row">
                    <h3 className={`${sarabun} title`}>
                        <ImageBlock image="/images/payment_method.png" /> Payment Methods
                    </h3>
                </div>

                {free.length > 0 ?
                    availablePaymentMethods
                        .filter((paymentMethod) => paymentMethod.code === 'free') // Filter only 'free' payment method
                        .map((paymentMethod, index) => (
                            <div className="form_check full" key={dlv(paymentMethod, 'code')}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id={dlv(paymentMethod, 'code')}
                                    className="form_check"
                                    value={dlv(paymentMethod, 'code')}
                                    checked={selectedPaymentMethod === dlv(paymentMethod, 'code')}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label
                                    htmlFor={dlv(paymentMethod, 'code')}
                                    className={`form_check_label ${isLoadingStates[paymentMethod.code] ? 'opacity-70' : ''}`}
                                    style={{ display: 'unset' }}
                                >
                                    {/* Your code for displaying payment method information */}
                                    {dlv(paymentMethod, 'code') === 'paypal_express' && <ImageBlock image='/images/pp-acceptance-medium.png' />}
                                    {dlv(paymentMethod, 'code') === 'paypal_express_bml' && <ImageBlock image='/images/ppc-acceptance-medium.png' />}
                                    {dlv(paymentMethod, 'code') === 'stripe_payments' && <ImageBlock image='/images/stripe-payment.webp' />}
                                    {dlv(paymentMethod, 'code') === 'stripe_payments_checkout' && <ImageBlock image='/images/stripe-payment.webp' />} {dlv(paymentMethod, 'title')}
                                    {isLoadingStates[paymentMethod.code] && (
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="spinner"></div>
                                        </div>
                                    )}
                                </label>
                            </div>
                        ))

                    : <div className="form_block">
                        {availablePaymentMethods && availablePaymentMethods.map((paymentMethod, index) => {
                            return (
                                <div className="form_check full" key={dlv(paymentMethod, 'code')}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        id={dlv(paymentMethod, 'code')}
                                        className="form_check"
                                        value={dlv(paymentMethod, 'code')}
                                        checked={selectedPaymentMethod === dlv(paymentMethod, 'code')}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label htmlFor={dlv(paymentMethod, 'code')} className={`form_check_label ${isLoadingStates[paymentMethod.code] ? 'opacity-70' : ''}`} style={{ display: 'unset' }}>
                                        {dlv(paymentMethod, 'code') === 'paypal_express' && <ImageBlock image='/images/pp-acceptance-medium.png' />}{dlv(paymentMethod, 'code') === 'paypal_express_bml' && <ImageBlock image='/images/ppc-acceptance-medium.png' />}{dlv(paymentMethod, 'code') === 'stripe_payments' && <ImageBlock image='/images/stripe-payment.webp' />}{dlv(paymentMethod, 'code') === 'stripe_payments_checkout' && <ImageBlock image='/images/stripe-payment.webp' />} {dlv(paymentMethod, 'title')}
                                        {isLoadingStates[paymentMethod.code] && (
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <div className="spinner"></div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            )
                        })}
                        {selectedPaymentMethod == 'stripe_payments' &&
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm setStripe={setStripe} setElements={setElements} />
                            </Elements>
                        }
                    </div>}
            </div>
        </>
    );
}
