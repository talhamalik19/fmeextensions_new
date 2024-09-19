import Link from "next/link";
import RegHeader from "../Signup/RegHeader";
import forgotpassword from "@/pages/api/forgotpassword";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import SuccessMessage from "@/components/global/Alerts/SuccessMessage";
import ErrorMessage from "@/components/global/Alerts/ErrorMessage";

const ForgotPassword = ({sarabun}) => {
    const [errorHandling, setErrorHandling] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [email, setEmail] = useState('');
    const recaptchaRef = React.createRef();
    let token = false;

    const handleForgotPassword = async (e) => {
        setErrorHandling(false);
        e.preventDefault();
        try {
                const userLogin = await forgotpassword(email, token);
                if (userLogin?.errors) {
                    // if (recaptchaRef?.current) {
                    //     recaptchaRef?.current.reset();
                    // }
                    // setErrorHandling(userLogin?.errors[0]?.message == "Cannot reset the customer's password" ? `If this email address has been registered in our shop, you will receive a link to reset your password at ${email}.` : userLogin?.errors[0]?.message)
                    // setIsSuccess(userLogin?.errors[0]?.message == "Cannot reset the customer's password" ? true : false)
                } 
                else {
                    if (userLogin?.data?.requestPasswordResetEmail) {
                        console.log("Success")
                        setIsSuccess(true)
                        setErrorHandling(`If this email address has been registered in our shop, you will receive a link to reset your password at ${email}.`)
                    } else {
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        setIsSuccess(false)
                        setErrorHandling(`If this email address has been registered in our shop, you will receive a link to reset your password at ${email}.`)
                    }
                }

            // Redirect or perform any necessary action after successful login
        } catch (error) {
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
            setErrorHandling(error?.message);
            // Handle login error
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
            <div className="user_reg login">
                <div className="section_padding">
                    <div className="main_container">
                        <div className="user_reg_inner">
                            <RegHeader />
                            <div className="form_container">
                                <h2 className={`${sarabun} title`}>Forgot Your Password?</h2>
                                <p className="primary_text"> Please enter your email address below. You will receive a link to reset your password</p>
                                <form className="form_block" onSubmit={handleForgotPassword}>
                                    <div className="form_field full">
                                        <label htmlFor="email" className="form_label">Email *</label>
                                        <input type="email" value={email} name="" id="email" className="form_item" required onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="recaptcha full recaptcha">
                                        <ReCAPTCHA
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                                            onChange={onReCAPTCHAChange}
                                            ref={recaptchaRef}
                                        />
                                    </div>
                                    {errorHandling && <div className="form_field full">
                                        {
                                            isSuccess ? <SuccessMessage message={errorHandling} /> : <ErrorMessage message={errorHandling} />
                                        }
                                    </div>}
                                    <div className="form_button full">
                                        <button className="form_cta primary_cta">Submit</button>
                                    </div>
                                </form>
                                <div className="return_cta">
                                    <Link href="login" className="loading_action">Return To Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;