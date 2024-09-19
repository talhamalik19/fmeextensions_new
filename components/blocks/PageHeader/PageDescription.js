import SectionCta from '@/components/global/SectionCta'
import dlv from 'dlv'
import React from 'react'

export default function PageDescription({ text, btn, sarabun }) {
  return (
    <div className='pg_desc'>
      {<p className="primary_text">{text}</p>}
      {btn && <SectionCta props={dlv(btn, 'field_text')} url={dlv(btn, 'field_redirect')} ctaClass="cta_link" sarabun={sarabun}/>}
    </div>
  )
}
