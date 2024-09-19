import SectionHead from '@/components/global/SectionHead'
import React from 'react'
import SectionCta from '@/components/global/SectionCta'
import dlv from 'dlv'
import { imageLoader } from '@/components/shared/imageLoader'
import Image from 'next/image'
import Link from 'next/link'

export default function MagentoMigration({ magentoMigration, blockContent,sarabun }) {
    let servicesIcons = null
    try {
        servicesIcons = dlv(magentoMigration, 'services_icons').split('\r\n');
    } catch (e) { }
    return (
        <>
            <div className="section_bg">
                <div className="section_padding">
                    <div className="main_container">
                        {magentoMigration && <div className="magento_migration">
                            <SectionHead title={magentoMigration.name} desc={magentoMigration.short_description.html} cta={magentoMigration.cta} sarabun={sarabun}/>
                            <div className="service_link">
                                <Link className='primary_cta' href={dlv(magentoMigration, 'url_key')}>Explore More</Link>
                            </div>
                            {servicesIcons && <div className="magento_icn">
                                {
                                    servicesIcons.map((item, index) => {
                                        let image_url = null;
                                        let image_alt = null;
                                        try {
                                            image_url = item.split(',')[0];
                                            image_alt = item.split(',')[1];
                                        } catch (e) { }

                                        return (
                                            <div className="card center-img" key={`ic-card-${index}`}>
                                                <Image
                                                    loader={imageLoader}
                                                    src={image_url}
                                                    alt={``}
                                                    width={98}
                                                    height={98}
                                                    style={{ width: 'auto', height: 'auto' }}
                                                />
                                                <p className="primary_text">{image_alt}</p>
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>}
                            <div className="section_cta mig_cnt">
                                <p className="primary_text">{dlv(blockContent,'migration_title')}</p>
                                {dlv(blockContent, 'button') && <SectionCta props={dlv(blockContent,'button2.field_text')} url={dlv(blockContent,'button2.field_redirect')} ctaClass="secondary_cta" />}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
