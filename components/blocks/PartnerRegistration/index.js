import React from 'react'
import PartnerRegistrationForm from './PartnerRegistrationForm'

export default function PartnerRegistration() {
    return (
        <>
            <div className="partner_reg_bg">
                <div className="section_padding">
                    <div className="main_container">
                        <div className="partner_form">
                            <h2 className="primary_title">Partner Registration Form</h2>
                            <PartnerRegistrationForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
