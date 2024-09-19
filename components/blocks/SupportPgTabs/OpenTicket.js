import React from 'react'
import TicketContentCol from './TicketContentCol'
import ImageBlock from '@/components/global/ImageBlock'

export default function OpenTicket({ticketInfo}) {
    return (
        <>
            <div className="ticket_container">
                <TicketContentCol ticketInfo={ticketInfo}/>
                <div className="ticket_form">
                    <form action="" className="form_block">
                        <div className="form_field full">
                            <label htmlFor="supportTopic" className="form_label">Help Topic Support *</label>
                            <div className="ticket_field_msg">
                                <input type="text" name="" id="supportTopic" className="form_item" required />
                                <span className="ticket_label">Please Select A topic</span>
                            </div>
                        </div>
                        <div className="form_field half">
                            <label htmlFor="email" className="form_label">Email Address *</label>
                            <input type="email" name="" id="email" className="form_item" required />
                        </div>
                        <div className="form_field half">
                            <label htmlFor="fullName" className="form_label">Full Name *</label>
                            <input type="text" name="" id="fullName" className="form_item" required />
                        </div>
                        <div className="form_field half">
                            <label htmlFor="phone" className="form_label">Phone Number *</label>
                            <input type="text" name="" id="phone" className="form_item" required />
                        </div>
                        <div className="form_field half">
                            <label htmlFor="extensions" className="form_label">Extensions *</label>
                            <input type="text" name="" id="extensions" className="form_item" required />
                        </div>
                        <div className="form_field full">
                            <label htmlFor="issueSummary" className="form_label">Issue Summary *</label>
                            <div className="ticket_field_msg">
                                <input type="text" name="" id="issueSummary" className="form_item" required />
                                <span className="ticket_label">Issue Summary</span>
                            </div>
                        </div>
                        <div className="form_field full">
                            <label htmlFor="issueSummary" className="form_label">Issue Summary *</label>
                            <div className="ticket_field_msg">
                                <div className="editor">
                                    <ImageBlock image='/images/editor.png'/>
                                </div>
                                {/* <input type="text" name="" id="issueSummary" className="form_item" required /> */}
                                <span className="ticket_label">Issue Summary</span>
                            </div>
                        </div>
                        <div className="recaptcha full">
                            <ImageBlock image="/images/recaptcha.png" />
                        </div>
                        <div className="form_button full">
                            <button className="form_cta primary_cta">Create Ticket</button>
                            <button className="form_cta primary_cta secondary_cta">Reset</button>
                            <button className="form_cta primary_cta secondary_cta">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
