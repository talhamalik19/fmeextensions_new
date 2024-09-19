import AccordionTwoCol from '@/components/global/AccordionTwoCol'
import React from 'react'

export default function FaqContent({ faqContent, selectedItem,sarabun }) {
  return (
    <>
      <div className="faq_cnt_block">
        {faqContent.length !== 0 ?
          faqContent.map((item) =>
            item?.show_on_main == 1 && <div key={item.topic_order} className={`faq_cnt_inner ${selectedItem === item.topic_order ? "faq_cnt_active" : ''}`}>
              <h2 className={`${sarabun} primary_title`}>{item.title}</h2>
              <AccordionTwoCol acc={item.faqs} sarabun={sarabun}/>
            </div>
          )
          :
          <>
            <div className="placeholderlist">
              <div className="animated-background"></div>
              <div className="animated-background"></div>
            </div>
            <div className="placeholderCartTotal mt-4">
              <div className="animated-background"></div>
            </div>
          </>
        }
      </div >
    </>
  )
}
