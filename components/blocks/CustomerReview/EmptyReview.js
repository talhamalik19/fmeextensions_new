import { imageLoader } from '@/components/shared/imageLoader'
import dlv from 'dlv'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function EmptyReview({emptyReview, openModal}) {
  return (
    <>
                <div className="empty_review">
                    {dlv(emptyReview.emptyReview,'0.url') && <Image
                        loader={imageLoader}
                        src={dlv(emptyReview.emptyReview,'0.url')}
                        alt='empty Review'
                        width={370}
                        height={65}
                        style={{height:'auto'}}
                    />}
                    <div className="section_cta">
                        <button onClick={openModal} className='primary_cta'>{dlv(emptyReview,'emptyReviewCta')}</button>
                    </div>
                </div>
    </>
  )
}
