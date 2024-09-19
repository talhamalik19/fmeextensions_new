import ImageBlock from '@/components/global/ImageBlock'
import SectionCta from '@/components/global/SectionCta';
import Link from 'next/link'
import React from 'react'

export default function RegHeader({ ctaCnt, url, text }) {
  const logo = "/images/logo.png";
  return (
    <div className="reg_header">
      <Link href={'/'} className='loading_action'>
        <picture>
          <source media="(min-width: 600px)" srcSet="/images/logo.png" />
          <source media="(min-width:200px )" srcSet="/images/responsive_logo.png" />
          <ImageBlock image={logo} />
        </picture>
      </Link>
      {ctaCnt &&
        <div className="left_col">
          <SectionCta ctaClass="cta_link" props={ctaCnt} url={url} />
          {text && <span>{text}</span>}
        </div>
      }
    </div>
  )
}
