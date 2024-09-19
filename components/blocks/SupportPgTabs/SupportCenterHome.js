import ImageBlock from '@/components/global/ImageBlock'
import React from 'react'

export default function SupportCenterHome({ supportHome, handleTabClick}) {

  return (
    <>
      <div className="support_home">
        {
          supportHome.map((item) =>
            <div className="support_home_block">
              <ImageBlock image={item.icon} />
              <p className="primary_text">{item.text}</p>
              <span className="primary_cta secondary_cta" onClick={() => handleTabClick(item.idLink)}>{item.ctaCnt}</span>
            </div>
          )
        }
      </div>

    </>
  )
}
