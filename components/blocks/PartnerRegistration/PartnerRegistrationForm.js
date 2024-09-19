import ImageBlock from '@/components/global/ImageBlock'
import Link from 'next/link'
import React from 'react'

export default function PartnerRegistrationForm() {
    return (
        <>
            <form action="" className="form_block">
                <div className="form_field half">
                    <label htmlFor="Name" className="form_label">Name *</label>
                    <input type="text" name="" id="Name" className="form_item" required />
                </div>
                <div className="form_field half">
                    <label htmlFor="companyName" className="form_label">Company Name *</label>
                    <input type="text" name="" id="companyName" className="form_item" required />
                </div>
                <div className="form_field half">
                    <label htmlFor="email" className="form_label">Email *</label>
                    <input type="email" name="" id="email" className="form_item" required />
                </div>
                <div className="form_field half">
                    <label htmlFor="companyWebsite" className="form_label">Company Website </label>
                    <input type="text" name="" id="companyWebsite" className="form_item" />
                </div>
                <div className="form_field half">
                    <label htmlFor="companyWebsite" className="form_label">Please Select Country </label>
                    <select name="" id="companyWebsite" className="form_item">
                        <option value="" disabled selected></option>
                        <option value="pak">Pakistan</option>
                        <option value="can">Canada</option>
                        <option value="usa">USA</option>
                    </select>
                </div>
                <div className="form_field half">
                    <label htmlFor="skypeTel" className="form_label">Skype/ Tel </label>
                    <input type="text" name="" id="skypeTel" className="form_item" />
                </div>
                <div className="form_field full">
                    <label htmlFor="message" className="form_label">Have a Question?</label>
                    <textarea className="form_item" name="message" id="" cols="30" rows="4" ></textarea>
                </div>
                <div className="form_field full">
                    <label htmlFor="file" className="form_label">Upload Document</label>
                    <input type="file" name="" id="file" className="form_item file" />
                    <span className='sub_text'>  You can upload files with these file extensions only (jpg,doc,docx,pdf )</span>
                </div>
                <div className="form_check full">
                    <input type="checkbox" name="" id="personalData" className="form_check" />
                    <label htmlFor="personalData" className="form_check_label"> Agree with all <Link href={'termscondition'}>Terms & Conditions</Link></label>
                </div>
                <div className="recaptcha full">
                    <ImageBlock image="images/recaptcha.png" />
                </div>
                <div className="form_button full">
                    <button className="form_cta primary_cta">Submit</button>
                </div>
            </form>
        </>
    )
}
