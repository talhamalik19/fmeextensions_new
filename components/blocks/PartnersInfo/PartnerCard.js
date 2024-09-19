import ImageBlock from '@/components/global/ImageBlock'
import Link from 'next/link'
import React from 'react'

export default function PartnerCard({ partnerCard }) {
    return (
        <>
            {
                partnerCard.card.map((cards) =>
                    <div className="partner_card" key={cards.id}>
                        <Link href={''} className="image">
                            <ImageBlock image={cards.icon}/>
                        </Link>
                        <div className="partner_info">
                            <h3 className="text">{cards.partnerName}</h3>
                            <Link href={''} className='primary_cta cta_link'>{cards.ctaCnt}</Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}
