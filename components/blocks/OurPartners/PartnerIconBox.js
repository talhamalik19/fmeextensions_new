import SectionHead from '@/components/global/SectionHead'
import React from 'react'
import ServiceCard from '../ServicesDetail/ServiceCard'

export default function PartnerIconBox({IconWidget}) {
    return (
        <>
            <div className="">
                <div className="section_padding">
                    <div className="main_container">
                        <div className="service_icon_widget partner_icon_widget">
                            <SectionHead title={IconWidget.title} desc={IconWidget.desc} />
                            <ServiceCard cards={IconWidget} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
