import SectionCta from '@/components/global/SectionCta'
import { imageLoader } from '@/components/shared/imageLoader'
import dlv from "dlv"
import Image from 'next/image'

export default function ServiceListing({serviceList, blockContent,sarabun}) {
    return (
        <>
            <div className="resp_service_bg">
            <div className="section_padding">
                <div className="main_container">
                    <div className="services_listing">
                        {
                            serviceList.map((serviceList, index) =>{
                                if (serviceList.services_layout !=  15 && serviceList.services_layout != 16) {
                                    return(
                                        <div className="services_block" key={serviceList.id}>
                                        <div className="service_col">
                                            <h2 className={`${sarabun} primary_title`}>{dlv(serviceList,'name')}</h2>
                                            <p className="primary_text">{dlv(serviceList,'short_description.html')}</p>
                                            {dlv(blockContent,'button') && <SectionCta props={dlv(blockContent, 'button.field_text')} url={dlv(serviceList, 'url_key')} ctaClass="prod_cta" />}
                                        </div>
                                        <div className="service_col">
                                            <Image
                                                loader={imageLoader}
                                                src={dlv(serviceList, 'image.url')}
                                                alt={dlv(serviceList, 'image.label')}
                                                width={422}
                                                height={205}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    </div>
                                    )
                                }
                            }
                            )
                        }
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
