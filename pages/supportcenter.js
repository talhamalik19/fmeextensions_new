import Layout from '@/components/layout'
import BlockManager from '@/components/shared/BlockManager'
import React from 'react'

export default function SupportCenter() {
    const blocks = ['blocks.page-header','blocks.support-info', 'blocks.support-faq'];
    const pageName = "Support Center"
  return (
    <>
    <Layout>
        <BlockManager blocks={blocks} pageName={pageName}/>
    </Layout>
    </>
  )
}
