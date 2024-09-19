import AccordionTwoCol from '@/components/global/AccordionTwoCol'
import SectionCta from '@/components/global/SectionCta'
import React from 'react'

export default function ServicesFaq({serviceFAQs, faqBg}) {
    
  return (
    <div className={faqBg === true ? "section_bg" : ''}>
        <div className="section_padding">
            <div className="main_container">
                <div className="prod_faq">
                    <h2 className="primary_title">Frequently Asked Questions</h2>
                    <AccordionTwoCol acc={serviceFAQs}/>
                    <div className="section_cta">
                        <SectionCta url={''} props="Ask a Question" ctaClass='secondary_cta'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
