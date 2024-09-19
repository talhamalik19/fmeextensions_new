import Layout from '@/components/layout'
import BlockManager from '@/components/shared/BlockManager'
import React from 'react'
import { cmsBlockCategories } from './api/page';
import dlv from 'dlv';
import { getStrapiURL } from "@/utils";
import { getCookie } from 'cookies-next';

async function getPageData() {
  const selected_store = getCookie('store_code') || 'default';
  const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Store': `${selected_store}`
      },
      body: JSON.stringify({
          query: `
        query {
         blocks_data(identifiers : "support-menu,service-menu,main-header")
          }
        `,
          variables: {},
      }
      ),
  });

  return response.json();
}

const searchresult = ({ globalMagento, query, user, currencyData, storeData, selectedCurrency, footer, selectedStore, sarabun }) => {
  const blocks = [{ __component: 'blocks-search-result', selectedStore, storeData: storeData, currencyData: currencyData, globalMagento: globalMagento, query: query, getPageData:getPageData }];
  const pagesData = {
    meta_title: `Search Result for: ${query}`,
    meta_description: ``,
    url_key: `/searchresult`
  }
  return (
    <>
      <Layout globalMagento={globalMagento} pageData={pagesData} user={user} currencyData={currencyData} selectedStore={selectedStore} storeData={storeData} selectedCurrency={selectedCurrency} footer={footer} getPageData={getPageData} sarabun={sarabun}>
        <BlockManager blocks={blocks} sarabun={sarabun}></BlockManager>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { q } = context.query;
  const locale = context.locale;
  try {
    const cookies = context.req.cookies;

    let newCookieValue = 'default';
    if (locale !== 'en') {
      newCookieValue = locale;
    }

    let pagesData = await cmsBlockCategories(newCookieValue);
    const blocksData = JSON.parse(dlv(pagesData, 'data.cmsBlocks.items.0.blocks_data', []));
    const storeCurrency = JSON.parse(dlv(blocksData, '0.store_currency'));
    const footerNewsLetter = dlv(blocksData, '1');
    const footer = dlv(blocksData, '2');
    const footerBootom = dlv(blocksData, '3');
    const bestSellersBlock = dlv(blocksData, '4');
    const footerData = { footerNewsLetter: footerNewsLetter, footer: footer, footerBootom: footerBootom, bestSellersBlock: bestSellersBlock }
    const globalMagento = { children: JSON.parse(pagesData.data.cmsBlocks.items[0].content), footerData: footerData };

    return {
      props: { query: q, user: cookies.login_user || null, globalMagento: globalMagento, currencyData: storeCurrency.data.currency, storeData: storeCurrency }
    };
  } catch (e) {
    return {
      props: { error: e.message }
    };
  }
}

export default searchresult;