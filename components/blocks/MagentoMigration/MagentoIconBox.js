import ImageBlock from '@/components/global/ImageBlock'
import React from 'react'

export default function MagentoIconBox({ magntoIcon }) {
    return (
        <>
            <div className="magento_icn">
                {
                    magntoIcon.card.map((item) =>
                        <div className="card" key={item.id}>
                            <ImageBlock image={item.image} />
                            <p className="primary_text">{item.text}</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}
