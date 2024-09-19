import SectionCta from '@/components/global/SectionCta'
import dlv from 'dlv'
import React from 'react'

export default function HeroContent({ secClass, blockContent,sarabun }) {
  const highlightTextInParentheses = (text) => {
    const regex = /\(([^)]+)\)/g;
    return text.replace(regex, '<span class="highlighted">$1</span>');
  };
  return (
    <div className={`hero_cnt ${secClass}`}>
      {dlv(blockContent,'heading') && <h2 className={`${sarabun} primary_title`}>{dlv(blockContent,'heading')}</h2>}
      {dlv(blockContent,'text') && <p className="primary_text" dangerouslySetInnerHTML={{__html:highlightTextInParentheses(dlv(blockContent,'text'))}}/>}
      {dlv(blockContent, 'button2.field_text') && <SectionCta props={`${dlv(blockContent, 'button2.field_text')}`} url={`${dlv(blockContent, "button2.field_redirect")}`} />}
    </div>
  )
}
