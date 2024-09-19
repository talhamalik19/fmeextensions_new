import React from 'react'
import HeroContent from './HeroContent';
import dlv from 'dlv';

export default function HeroInfo({ secClass, blockContent,sarabun}) {
  return (
    blockContent && <div className={dlv(blockContent,'section_bg') && dlv(blockContent,'section_bg') == 'true' ? "section_bg" : ''}>
        <div className="section_padding">
            <div className="main_container">
                <HeroContent secClass={secClass} blockContent={blockContent} sarabun={sarabun}/>
            </div>
        </div>
    </div>
  )
}
