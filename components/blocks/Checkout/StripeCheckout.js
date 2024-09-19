import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import * as config from '../../../config';

export default function StripeCheckout({ setStripe, setElements }) {
    const stripe = useStripe();
    setStripe(stripe)
    const elements = useElements();
    setElements(elements)
    const [input, setInput] = useState({
        customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
        cardholderName: '',
    });

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#DB4D2D',
                textAlign: 'right',
                lineHeight: '50px',
                fontSize: '17px',
                color: '#DB4D2D',
                fontWeight: '500',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                    color: '#fce883',
                },
                '::placeholder': {
                    color: '#e4b0a4',
                },
            },
            invalid: {
                iconColor: '#ef2961',
                color: '#ef2961',
            },
        },
    };



    return (
        <>
            <fieldset className="form_check full">
            <div className="form_field full">
            <label htmlFor="cardholderName" className="form_label">Your Payment Details</label>
            <input
                    placeholder="Cardholder name"
                    className="form_item"
                    type="Text"
                    name="cardholderName"
                    onChange={handleInputChange}
                    required
                />
                </div>
                
                <div className="form_field full">
                    {/* Use the CardElement within the Elements provider */}
                    <CardElement
                        options={CARD_OPTIONS}
                        onChange={(e) => {
                            if (e.error) {
                                setPayment({ status: 'error' });
                                setErrorMessage(
                                    e.error.message ?? 'An unknown error occurred'
                                );
                            }
                        }}
                    />
                </div>
            </fieldset>
        </>
    )
}
