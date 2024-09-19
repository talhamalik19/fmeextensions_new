import React from 'react'

export default function TicketContentCol({ticketInfo}) {
    return (
        <div className="ticket_cnt">
            <h2 className="secondary_title">{ticketInfo.title}</h2>
            <p className="primary_text">{ticketInfo.desc}</p>
        </div>
    )
}
