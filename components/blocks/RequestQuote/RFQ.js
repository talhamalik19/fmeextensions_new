import { submitQuoteForm } from '@/pages/api/submitform';
import dlv from 'dlv';
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

export default function RFQ({ button2, module }) {
    const [yourName, setYourName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [moduleName, setModuleName] = useState(module);
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [budgetStatus, setBudgetStatus] = useState('');
    const [uploadFile, setUploadFile] = useState('');
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false)
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

        if (!phone.trim()) {
            errors.phone = 'Please enter phone number';
        }

        if (!message.trim()) {
            errors.message = 'Please enter message';
        }
        if (!uploadFile) {
            errors.uploadFile = 'Please upload file';
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
                companyName,
                email,
                phone,
                moduleName,
                date,
                budgetStatus,
                uploadFile,
                message
            };
            try {
                const data = await submitQuoteForm(formData, token);
                if (dlv(data, 'data.rfqFormSubmit.message')) {
                    setYourName('')
                    setCompanyName('')
                    setEmail('')
                    setPhone('')
                    setDate('')
                    setMessage('')
                    setBudgetStatus('')
                    setUploadFile('')
                    setSubmit(dlv(data, 'data.rfqFormSubmit.message'))
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                    setError('')
                } else {
                    setError({ captcha: data.errors[0].message });
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                }

            } catch (error) {
                console.error('Error submitting form:', error);
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
            }
        } else {
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
            setError(errors);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            // Use the result to set the uploadFile state
            setUploadFile({
                name: file.name,
                base64: reader.result,
            });
        };

        // Read the file as base64 data
        reader.readAsDataURL(file);
    };

    const validatePhoneInput = (input, maxLimit) => {
        const numericValue = input.replace(/[^0-9]/g, '');
        // Limit the input to the specified max limit
        if (numericValue.length <= maxLimit) {
            return numericValue;
        } else {
            return input.slice(0, maxLimit);
        }
    }
    const handlePhoneChange = (e) => {
        const newValue = validatePhoneInput(e.target.value, 11)
        setPhone(newValue);
    }

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
            <form onSubmit={handleSubmit} className="form_block">
                <div className="form_field half">
                    <label htmlFor="name" className="form_label">Your Name *</label>
                    <input type="text" name="yourName" id="name" value={yourName} className="form_item" required onChange={(e) => setYourName(e.target.value)} />
                    {error.yourName && <p className='error text-sm text-red pt-1'>{error.yourName}</p>}
                </div>
                <div className="form_field half">
                    <label htmlFor="company" className="form_label">Company Name *</label>
                    <input type="text" name="companyName" id="company" value={companyName} className="form_item" required onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="form_field half">
                    <label htmlFor="email" className="form_label">Email *</label>
                    <input type="email" name="email" id="email" value={email} className="form_item" required onChange={(e) => setEmail(e.target.value)} />
                    {error.email && <p className='error text-sm text-red pt-1'>{error.email}</p>}
                </div>
                <div className="form_field half">
                    <label htmlFor="phone" className="form_label">Phone Number *</label>
                    <input type="text" name="phone" id="phone" value={phone} className="form_item" required onChange={handlePhoneChange} />
                    {error.phone && <p className='error text-sm text-red pt-1'>{error.phone}</p>}
                </div>
                <div className="form_field half">
                    <label htmlFor="moduleName" className="form_label">Module Name</label>
                    <input type="text" name="moduleName" id="moduleName" value={moduleName} className="form_item" onChange={(e) => setModuleName(e.target.value)} />
                </div>
                <div className="form_field half">
                    <label htmlFor="date" className="form_label">Date</label>
                    <input type="date" name="date" id="date" value={date} className="form_item" onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="form_field full">
                    <label htmlFor="message" className="form_label">Brief Overview *</label>
                    <textarea className="form_item" name="message" id="message" value={message} cols="30" rows="4" required onChange={(e) => setMessage(e.target.value)}></textarea>
                    {error.message && <p className='error text-sm text-red pt-1'>{error.message}</p>}
                </div>
                <div className="form_field full">
                    <label htmlFor="" className="form_label">Project Budget Status:</label>
                    <div className="form_group_inner">
                        <div className="form_check">
                            <input type="radio" name="budgetStatus" id="approved" value="Approved" checked={budgetStatus === "Approved"} className="form_check" onChange={(e) => setBudgetStatus("Approved")} />
                            <label htmlFor="approved" className="form_check_label"> Approved </label>
                        </div>
                        <div className="form_check">
                            <input type="radio" name="budgetStatus" id="approvedPending" value="Approved Pending" checked={budgetStatus === "Approved Pending"} className="form_check" onChange={(e) => setBudgetStatus("Approved Pending")} />
                            <label htmlFor="approvedPending" className="form_check_label"> Approved Pending </label>
                        </div>
                        <div className="form_check">
                            <input type="radio" name="budgetStatus" id="open" value="Open" checked={budgetStatus === "Open"} className="form_check" onChange={(e) => setBudgetStatus("Open")} />
                            <label htmlFor="open" className="form_check_label"> Open </label>
                        </div>
                        <div className="form_check">
                            <input type="radio" name="budgetStatus" id="noApproval" value="No Approval" checked={budgetStatus === "No Approval"} className="form_check" onChange={(e) => setBudgetStatus("No Approval")} />
                            <label htmlFor="noApproval" className="form_check_label"> No Approval </label>
                        </div>
                    </div>
                </div>
                <div className="form_field full">
                    <label htmlFor="file" className="form_label">Upload Document *</label>
                    <input type="file" name="uploadFile" id="uploadFile" accept='.jpg, .doc, .pdf, .docx' className="form_item file" required onChange={handleFileChange} />
                    {error.uploadFile && <p className='error text-sm text-red pt-1'>{error.uploadFile}</p>}
                    <span className='sub_text'>  You can upload files with these file extensions only (jpg, doc, docx, pdf)</span>
                </div>
                <div className='form_button full'>
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                        onChange={onReCAPTCHAChange}
                        ref={recaptchaRef}
                    />
                    {error.captcha && <p className='error text-sm text-red pt-1'>{error.captcha}</p>}
                </div>
                <div className="form_button full">
                    <button type="submit" className="form_cta primary_cta">{dlv(button2, 'field_text')}</button>
                    {submit ? (
                        <p className="text-base pt-2 text-green-600">{submit}</p>
                    ) : null}
                </div>
            </form>
        </>
    )
}
