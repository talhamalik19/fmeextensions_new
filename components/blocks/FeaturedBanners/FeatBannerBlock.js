import SectionCta from "@/components/global/SectionCta";
import { imageLoader } from "@/components/shared/imageLoader";
import dlv from "dlv";
import { Sarabun } from "next/font/google";
import Image from "next/image";
import React from 'react'

export default function FeatBannerBlock({ featBannerClass, featBanner, sarabun }) {
  const highlightTitleInParentheses = (heading) => {
    const regex = /\(([^)]+)\)/g;
    return text.replace(regex, '<span class="highlighted">$1</span>');
  };
  const highlightTextInParentheses = (text) => {
    const regex = /\(([^)]+)\)/g;
    return text.replace(regex, '<span class="highlighted">$1</span>');
  };
  return (
    <div className={`feat_banner_block ${featBannerClass}`} >
      <div className="feat_block_inner">
        <div className="feat_cnt">
          {dlv(featBanner, 'heading') && <h2 className={`${sarabun} primary_title`} dangerouslySetInnerHTML={{ __html: highlightTextInParentheses(dlv(featBanner, 'heading')) }}/>}

          {dlv(featBanner, 'title') && <span className={`sub_title ${sarabun}`}>{dlv(featBanner, 'title')}</span>}

          {dlv(featBanner, 'text') && <p className="primary_text" dangerouslySetInnerHTML={{ __html: highlightTextInParentheses(dlv(featBanner, 'text')) }} />}

          {dlv(featBanner, 'button') && <SectionCta props={dlv(featBanner.button[0], 'field_text')} ctaClass="secondary_cta" url={dlv(featBanner.button[0], 'field_redirect')} />}
        </div>
        <div className="feat_image">
          {dlv(featBanner, 'image') ? dlv(featBanner, 'image') && <Image
            loader={imageLoader}
            src={dlv(featBanner.image[0], 'url')}
            alt={`${dlv(featBanner.image[0], 'alt')}`}
            width={492}
            height={360}
            style={{ height: 'auto', margin: 'auto' }}
          />
            :
            <div className="placeholderlist">
              <div className="animated-background"></div>
              <div className="animated-background"></div>
            </div>}
        </div>
      </div>
    </div>
  )
}
