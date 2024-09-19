import Link from "next/link";
import signup from '@/pages/api/signup';
import { useRouter } from "next/router";
import React, { useState } from "react";
import dlv from "dlv";
import { assignCustomerToCart } from "@/pages/api/cart";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const SignupForm = ({ ctaData, redirectTo, setUser, sarabun }) => {
    const router = useRouter();
    const [errorHandling, setErrorHandling] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const recaptchaRef = useRef();
    let token = false;

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (password === confirmPassword) {
                setIsLoading(true);
                const userSignup = await signup(firstname, lastname, email, password, token, isSubscribed == 'on' ? true: false);
                if (dlv(userSignup, 'data.customer.email') == email) {
                    const assignCustomer = await assignCustomerToCart();
                    setUser(userSignup)
                    router.push(redirectTo);
                    setIsLoading(false);
                } else {
                    if (dlv(userSignup, 'errors')) {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setIsLoading(false);
                        setErrorHandling(userSignup.errors[0].message);
                    }
                }
            } else {
                setIsLoading(false);
                setErrorHandling('Password mismatch')
            }
        } catch (error) {
            setIsLoading(false);
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
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
        <div className="form_container">
            {dlv(ctaData, 'create_account_text') && <h2 className={`${sarabun} title`}>Create an Account</h2>}
            {dlv(ctaData, 'info_text') && <p className="primary_text">Personal Information</p>}
            <form className="form_block" onSubmit={handleSignup}>
                <div className="form_field half">
                    <label htmlFor="firstName" className="form_label">First Name *</label>
                    <input type="text" name="" id="firstName" value={firstname} className="form_item" required onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form_field half">
                    <label htmlFor="lastName" className="form_label">Last Name *</label>
                    <input type="text" name="" id="lastName" value={lastname} className="form_item" required onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form_field full">
                    <label htmlFor="email" className="form_label">Email *</label>
                    <input type="email" name="" id="email" value={email} className="form_item" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form_field half">
                    <label htmlFor="password" className="form_label">Password *</label>
                    <input type="password" name="" id="password" value={password} className={`form_item ${password === confirmPassword ? '' : 'form_item_error'}`} required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form_field half">
                    <label htmlFor="confirmPassword" className="form_label">Confirm Password *</label>
                    <input type="password" name="" id="confirmPassword" value={confirmPassword} className={`form_item ${password === confirmPassword ? '' : 'form_item_error'}`} required onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form_check full">
                    <input type="checkbox" name="" id="privacy" className="form_check" required/>
                    <label htmlFor="privacy" className="form_check_label"> I have read and accepted the <Link href={'/terms-conditions'} target="_blank">Terms & Conditions</Link> and <Link href={'privacy-policy'} target="_blank">Privacy Policy *</Link></label>
                </div>
                <div className="form_check full">
                    <input type="checkbox" name="" id="personalData" className="form_check" onChange={(e) => setIsSubscribed(e.target.value)} />
                    <label htmlFor="personalData" className="form_check_label"> I hereby give my consent with <Link href={'/customer-services'} target="_blank">Processing of my personal data</Link> for marketing purposes <span>(optional)</span></label>
                </div>
                <div className="recaptcha full">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                        onChange={onReCAPTCHAChange}
                        ref={recaptchaRef}
                    />
                </div>
                {errorHandling && <div className="form_button full">
                    <p className='text-red'>{errorHandling && errorHandling}</p>
                </div>}
                <div className="form_button full">
                <button className="form_cta primary_cta">
                {isLoading ? <div class="spinner"></div> : "Sign Up"}
                </button>
                
                </div>
            </form>
            {dlv(ctaData, 'create_account_text') && <p className="primary_text form_tag_text">{dlv(ctaData, 'process_text')}</p>}
        </div>
    )
}

export default SignupForm;