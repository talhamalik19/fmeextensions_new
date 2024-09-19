import LayoutFullSec from '@/components/layoutFullSec'
import Seo from '@/components/seo'
import BlockManager from '@/components/shared/BlockManager'
import React from 'react'

export default function login({ user, setUser, currencyData, storeData, selectedCurrency, selectedStore, sarabun }) {
    const blocks = [{__component:'blocks-login', setUser: setUser, currencyData:currencyData, storeData:storeData, selectedCurrency:selectedCurrency, selectedStore:selectedStore}]
    const pageName = 'Login'
    const pagesData = {
        meta_title: `Customer Login`,
        meta_description: ``,
        url_key: `/login`
      }
    return (
        <>
            <LayoutFullSec>
                <Seo seo={pagesData} />
                <BlockManager blocks={blocks} pageName={pageName} sarabun={sarabun}/>
            </LayoutFullSec>
        </>
    )
}
