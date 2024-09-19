import ImageBlock from '@/components/global/ImageBlock'
import SectionCta from '@/components/global/SectionCta'
import dlv from 'dlv'
import Link from 'next/link'
import React from 'react'

export default function SupportBox({ supportInfo }) {
    return (
        <>
            {
                supportInfo.map((supportItem) =>
                    <div className="support_block" key={supportItem.id}>
                        {dlv(supportItem,'heading') && <h2 className="secondary_title">{dlv(supportItem,'heading')}</h2>}
                        {dlv(supportItem,'text') && <p className="primary_text">{dlv(supportItem,'text')}</p>}
                        {supportItem.email &&
                            <ul className="sprt_list">
                                {supportItem.email.map((sprtEmail) =>
                                    <li key={sprtEmail.id}>
                                        <Link href={dlv(sprtEmail,'field_redirect')} target={dlv(sprtEmail, 'field_target')}>{dlv(sprtEmail,'field_text')} <ImageBlock image="/images/sprt_email.png"/></Link>
                                    </li>
                                )}
                            </ul>
                        }
                        {supportItem.button && <div className="section_cta"><SectionCta props={supportItem.button[0].field_text} url={supportItem.button[0].field_redirect} ctaClass="secondary_cta" /></div>}
                    </div>
                )
            }
        </>
    )
}
