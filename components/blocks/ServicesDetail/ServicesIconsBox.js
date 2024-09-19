import SectionCta from '@/components/global/SectionCta'
import SectionHead from '@/components/global/SectionHead'
import React from 'react'
import Image from 'next/image'
import { imageLoader } from '@/components/shared/imageLoader'
import dlv from 'dlv'

export default function ServicesIconsBox({ heading, description, cards, text, help_text, button }) {
  return (
    <>
    <div className="section_bg">
        <div className="section_padding">
            <div className="main_container">
                <div className="service_icon_widget">
                    <SectionHead title={heading} desc={description} />
                          <div className="service_card grid_custom">
                              {
                                  cards && cards.map((item, index) =>
                                      <div className="card" key={`service-card-${index}`}>
                                          <div className="image center-img">
                                          <Image
                                                        loader={imageLoader}
                                                        src={dlv(item, 'image.url')}
                                                        alt={dlv(item, 'image.alt')}
                                                        width={68}
                                                        height={68}
                                                        style={{ height: 'auto'}}
                                                    />
                                          </div>
                                          {dlv(item, 'title') && <h3 className="secondary_title">{dlv(item, 'title')}</h3>}
                                          {dlv(item, 'text') && <p className="primary_text">{dlv(item, 'text')}</p>}
                                      </div>
                                  )
                              }
                          </div>
                    <div className="section_cta">
                    {text && <p className="primary_text">{text}</p>}
                    {help_text && <p className="primary_text">{help_text}</p>}
                    {button && <SectionCta props={button.text} url={button.href} ctaClass='secondary_cta' />}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
