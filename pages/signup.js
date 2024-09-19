import LayoutFullSec from '@/components/layoutFullSec'
import Seo from '@/components/seo'
import BlockManager from '@/components/shared/BlockManager'
import React from 'react'

export default function SignUp({ setUser,sarabun }) {
  const blocks = [{__component:'blocks-signup', setUser: setUser}]
    const pageName = "Create an Account"
    const pagesData = {
      meta_title: `Create New Customer`,
      meta_description: ``,
      url_key: `/signup`
    }
  return (
    <LayoutFullSec>
      <Seo seo={pagesData}/>
        <BlockManager blocks={blocks} pageName={pageName} sarabun={sarabun}/>
    </LayoutFullSec>
  )
}
