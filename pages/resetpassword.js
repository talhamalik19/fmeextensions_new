import LayoutFullSec from '@/components/layoutFullSec'
import Seo from '@/components/seo'
import BlockManager from '@/components/shared/BlockManager'
import React from 'react'

export default function ResetPassword({ token, sarabun }) {
    const blocks = [{__component:'blocks-reset-password', token: token}]
    const pageName = "Forgot Password"
    const pagesData = {
      meta_title: `Customer Login`,
      meta_description: ``,
      url_key: `/login`
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
export async function getServerSideProps(context) {
  const {token} = context.query;
    return {
     props: {token:`${token}`}
    };
}