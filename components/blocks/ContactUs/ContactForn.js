import { submitContactUs } from '@/pages/api/submitform';
import dlv from 'dlv';
import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm({ button }) {
    const [yourName, setYourName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState({});
    const recaptchaRef = React.createRef();
    let token = false;

    const validateForm = () => {
        const errors = {};

        if (!yourName.trim()) {
            errors.yourName = 'Your Name is required';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            errors.email = 'Invalid Email Address';
        }

        if (!website.trim()) {
            errors.website = 'Website is required';
        }

        if (!message.trim()) {
            errors.message = 'Message is required';
        }

        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            const formData = {
                yourName,
                email,
                website,
                message
            };
            try {
                const data = await submitContactUs(formData, token);
                if (dlv(data, 'data.contactusFormSubmit.message')) {
                    setYourName('')
                    setEmail('')
                    setWebsite('')
                    setMessage('')
                    setSubmit(dlv(data, 'data.contactusFormSubmit.message'))
                    token = false;
                    setError('')
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                } else {
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                    setError({ captcha: data.errors[0].message });
                }


            } catch (error) {
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
                console.error('Error submitting form:', error);
            }
        } else {
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
            setError(errors);
        }
    };

    const onReCAPTCHAChange = (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
        token = captchaCode;
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form_block" method='POST'>
                <div className="form_field full">
                    <input type="text" name="yourName" id="name" value={yourName} className="form_item" required placeholder='Your Name *' onChange={(e) => setYourName(e.target.value)} />
                    {error.yourName && <p className='error text-sm text-red pt-1'>{error.yourName}</p>}
                </div>
                <div className="form_field full">
                    <input type="email" name="email" id="email" value={email} className="form_item" required placeholder='Your Email *' onChange={(e) => setEmail(e.target.value)} />
                    {error.email && <p className='error text-sm text-red pt-1'>{error.email}</p>}
                </div>
                <div className="form_field full">
                    <input type="text" name="website" id="website" value={website} className="form_item" required placeholder='Website *' onChange={(e) => setWebsite(e.target.value)} />
                    {error.website && <p className='error text-sm text-red pt-1'>{error.website}</p>}
                </div>
                <div className="form_field full">
                    <textarea value={message} className="form_item" name="message" id="" cols="30" rows="4" required placeholder='What Would you like to Know *' onChange={(e) => setMessage(e.target.value)}></textarea>
                    {error.message && <p className='error text-sm text-red pt-1'>{error.message}</p>}
                </div>
                {/* <div className="recaptcha full">
                    <ImageBlock image="images/recaptcha.png" />
                </div> */}
                <div className='form_button full'>
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                        onChange={onReCAPTCHAChange}
                        ref={recaptchaRef}
                    />
                    {error.captcha && <p className='error text-sm text-red pt-1'>{error.captcha}</p>}
                </div>
                <div className="form_button full">
                    <button type="submit" className="form_cta primary_cta secondary_cta">
                        {dlv(button, 'field_text')}
                    </button>
                    {submit ? (
                        <p className="text-base pt-2 text-green-600">{submit}</p>
                    ) : null}
                </div>
            </form>
        </>
    );
}
