import React from 'react'
import TextPlaceholder from '../TextPlaceholder'
import ContentPlaceholder from '../ContentPlaceholder'
import CTAPlaceholder from '../CTAPlaceholder'

export default function BannerContentPlaceholder() {
    return (
        <>
            <div>
                <TextPlaceholder />
                <TextPlaceholder />
                <ContentPlaceholder/>
                <CTAPlaceholder/>
            </div>

        </>
    )
}
