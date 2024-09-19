import Layout from '@/components/layout'
import BlockManager from '@/components/shared/BlockManager'
import React from 'react'

export default function Support() {
    const blocks = ['blocks.page-header','blocks.support-pg-tabs'];
    const pageName = 'Support';
  return (
    <>
    <Layout>
        <BlockManager blocks={blocks} pageName={pageName}/>
    </Layout>
    </>
  )
}
