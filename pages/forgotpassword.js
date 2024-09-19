import LayoutFullSec from '@/components/layoutFullSec'
import Seo from '@/components/seo'
import BlockManager from '@/components/shared/BlockManager'
import React from 'react'

export default function ForgotPassword({sarabun}) {
    const blocks = [{__component:'blocks-forgot-password'}]
    const pageName = "Forgot Password"
    const pagesData = {
      meta_title: `Forgot Password`,
      meta_description: ``,
      url_key: `/forgotpassword`
    }
  return (
    <>
    <LayoutFullSec>
      <Seo seo={pagesData}/>
        <BlockManager blocks={blocks} pageName={pageName} sarabun={sarabun}/>
    </LayoutFullSec>
    </>
  )
}
