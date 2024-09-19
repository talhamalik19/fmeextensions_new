import React from 'react'
import TicketContentCol from './TicketContentCol'
import Link from 'next/link'

export default function CheckTicket({ ticketInfo }) {
    return (
        <div className="ticket_container">
            <TicketContentCol ticketInfo={ticketInfo} />
            <div className="ticket_form">
                <form action="" className="form_block">

                    <div className="form_field half">
                        <label htmlFor="email" className="form_label">Email Address *</label>
                        <input type="email" name="" id="email" className="form_item" required />
                    </div>
                    <div className="form_field half">
                        <label htmlFor="fullName" className="form_label">Ticket Number *</label>
                        <input type="text" name="" id="fullName" className="form_item" required />
                    </div>
                    <div className="form_field full">
                        <p className="primary_text">Have an account with us? <Link href={'login'}>Sign In</Link> or <Link href={'signup'}>Register</Link> for an account to access all your tickets.</p>
                    </div>
                    <div className="form_button full">
                        <button className="form_cta primary_cta">View Ticket</button>
                    </div>
                </form>
                <div className="tickect_highlighted_ingo">
                    <p className="primary_text">If this is your first time contacting us or you've lost the ticket number, please <Link href={''}>Open A new Ticket</Link></p>
                </div>
            </div>
        </div>
    )
}
