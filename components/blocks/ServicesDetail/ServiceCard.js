import ImageBlock from '@/components/global/ImageBlock'
import React from 'react'

export default function ServiceCard({ cards }) {
    return (
        <>
            <div className="service_card grid_custom">
                {
                    cards.card.map((item) =>
                        <div className="card" key={item.id}>
                            <div className="image">
                                <ImageBlock image={item.icon} />
                            </div>
                            {item.title && <h3 className="secondary_title">{item.title}</h3>}
                            <p className="primary_text">{item.desc}</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}
