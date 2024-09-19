import { imageLoader } from '@/components/shared/imageLoader'
import dlv from 'dlv'
import Image from 'next/image'
import React from 'react'

export default function HomeIconBlock({ title, card, sarabun }) {
    return (
        <div className="bg_gradient section_padding">
            <div className="main_container">
                <div className="hm_icon_bk">
                    {title && <div className="section_head">
                        <h2 className={`${sarabun} primary_title`}>{title}</h2>
                    </div>}

                    {card && <div className="hm_icon_card">
                        {
                            card.map((item, index) =>
                                <div className="card" key={index}>
                                    <div className="icon_block">
                                        <Image
                                            loader={imageLoader}
                                            src={dlv(item, 'image.0.url')}
                                            alt={`${dlv(item, 'image.0.alt')}`}
                                            width={50}
                                            height={50}
                                            style={{ height: 'auto' }}
                                        />
                                    </div>
                                    <div className="cnt">
                                        <h3 className={`${sarabun} title`}>{item.heading}</h3>
                                        <p className="text">{item.desc}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>}
                </div>
            </div>
        </div>
    )
}
