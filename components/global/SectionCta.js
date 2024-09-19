import Link from 'next/link'

export default function SectionCta({props, url, ctaClass, target}) {
  return (
    
    <Link className={`loading_action primary_cta ${ctaClass}`} href={url || ''} target={target}>{props}</Link>
  )
}
