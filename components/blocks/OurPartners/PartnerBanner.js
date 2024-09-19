import React from 'react'
import BdCrum from '../PageHeader/BdCrum'
import SectionCta from '@/components/global/SectionCta'

export default function PartnerBanner({pageName, banner}) {
    return (
        <>
            <div className="hero_banner_container">
                <div className="section_bg">
                    <div className="main_container">
                        <BdCrum pageName={pageName} />

                        <div className="hero_banner">
                            <div className="hero_banner_block">
                                <span className="banner_sub">{banner.highlightedText}</span>
                                <h2 className="banner_title">{banner.title}</h2>
                                <p className="banner_text">{banner.desc}</p>
                                <div className="section_cta">
                                    {/* <SectionCta props="Become a Partner" url={''}/> */}
                                    <span className="primary_cta">Become a Partner</span>
                                    <SectionCta props="List of Partner" ctaClass='secondary_cta' url={'partnercatalog'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
