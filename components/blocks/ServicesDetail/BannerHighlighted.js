import SectionCta from '@/components/global/SectionCta'
import dlv from 'dlv'

export default function BannerHighlighted({ blockContent }) {
  return (
    <>
    <div className="banner_highlighted">
        <div className="main_container">
            <div className="section_cta">
                <p className="primary_text">{dlv(blockContent,'title')}</p>
                <SectionCta props={dlv(blockContent,'button2.field_text')} ctaClass="secondary_cta" url={dlv(blockContent,'button2.field_redirect')}/>
            </div>
        </div>
    </div>
    </>
  )
}
