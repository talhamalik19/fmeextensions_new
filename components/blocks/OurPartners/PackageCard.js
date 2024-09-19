import ImageBlock from '@/components/global/ImageBlock'
import React from 'react'

export default function PackageCard({ pckgs }) {
    return (
        <>
            <div className="pckg_block_inner grid_custom">
                {
                    pckgs.packageInfo.map((pckg) =>
                        <div className={`${pckg.class === true ? "highlighted_card pckg_card" : 'pckg_card'}`} key={pckg.id}>
                            <div className="pckg_head">
                                <div className="image">
                                    <ImageBlock image={pckg.icon} />
                                </div>
                                <div className="pckg_title">
                                    <span className="name">{pckg.name}</span>
                                    <span className="pckg_percent">{pckg.percentage}%</span>
                                    <span className="pckg_sub">{pckg.pckgSlogan}</span>
                                </div>
                            </div>
                            <ul className="pckg_benefit">
                                {
                                    pckg.benefits.map((benefit) =>
                                        <li className="pckg_lst" key={benefit.id}><span>{benefit.text}</span></li>
                                    )
                                }

                            </ul>
                        </div>
                    )
                }

            </div>
        </>
    )
}
