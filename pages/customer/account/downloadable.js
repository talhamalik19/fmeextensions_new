import Layout from '@/components/layout'
import DownloadableProducts from '@/components/customer/DownloadableProduct';
import Sidebar from '@/components/customer';
import { cmsBlockCategories } from '@/pages/api/page';
import { getStrapiURL } from '@/utils';
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

const downloadable = ({ globalMagento, user, setUser, currencyData, selectedCurrency, storeData, selectedStore, footer }) => {

  return (
    <>
      <Layout globalMagento={globalMagento} user={user} setUser={setUser} currencyData={currencyData} selectedCurrency={selectedCurrency} storeData={storeData} selectedStore={selectedStore} footer={footer} getPageData={getPageData} >
        <div className="main_container">
          <div className="flex flex-col lg:flex-row p-3 w-full">
            <Sidebar user={user} setUser={setUser} />
            {user && <DownloadableProducts user={user} setUser={setUser} />}
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  const locale = context.locale;

  if (!cookies.login_user) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

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
    props: { jwt: cookies.jwt || null, globalMagento: globalMagento, storeData: storeCurrency, currencyData: storeCurrency.data.currency }
  };
}



export default downloadable;