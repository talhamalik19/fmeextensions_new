import SectionHead from '@/components/global/SectionHead'
import React from 'react'
import PackageCard from './PackageCard'
import SectionCta from '@/components/global/SectionCta'

export default function PartnerPackage({ pckg}) {
  return (
    <>
    <div className={pckg.sectionBg === true ? 'section_bg' : null}>
        <div className="section_padding">
            <div className="main_container">
                <div className="package_block">
                    <SectionHead title={pckg.title}/>
                    <PackageCard pckgs={pckg}/>
                    <div className="section_cta">
                      <SectionCta props={pckg.ctaCnt} url={''} ctaClass="secondary_cta"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
