import React from 'react'
import RFQ from './RFQ'
import SectionCta from '@/components/global/SectionCta'
import dlv from 'dlv';
import { useRouter } from 'next/router';

export default function RequestQuote({title, text, button1, button2, sarabun }) {
   const router = useRouter();
   let module = '';
   if(router.query.module){
    module = router.query.module;
   }
    
    return (
        <div className="section_padding zero_top">
            <div className="main_container">
                <div className="rfq_pg">
                    <div className="rfq_block">
                        <RFQ button2={button2} module={module} />
                    </div>
                    <div className="rfq_block">
                        {title && <h2 className={`${sarabun} primary_title`}>{title}</h2>}
                        {text && <p className="primary_text">{text}</p>}
                        {button1 && <div className="section_cta">
                            <SectionCta props={dlv(button1,'field_text')} url={dlv(button1,'field_redirect')} ctaClass="secondary_cta" />
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
