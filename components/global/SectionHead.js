
import dlv from 'dlv'
import SectionCta from './SectionCta'

export default function SectionHead({title, desc, cta, sarabun}) {
  return (
    
    <div className="section_head">
        {title && <h2 className={`${sarabun} primary_title`}>{title}</h2>}
        {desc && <p className="primary_text">{desc}</p>}
        {cta && <div className="section_cta_head"><SectionCta props={`${dlv(cta, 'field_text')}`} ctaClass="cta_link" url={dlv(cta, 'field_redirect')}/></div>}
    </div>
  )
}
