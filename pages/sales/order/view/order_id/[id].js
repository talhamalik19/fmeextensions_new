import Sidebar from "@/components/customer";
import OrderDetails from "@/components/customer/OrderDetails/index.js";
import Layout from "@/components/layout";
import { customerOnServerSide, verifyCustomer } from "@/pages/api/login";
import { cmsBlockCategories } from "@/pages/api/page";
import { getStrapiURL } from "@/utils";
import { getCookie } from "cookies-next";
import dlv from "dlv";

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

const orderdetails = ({
  globalMagento,
  user,
  setUser,
  currencyData,
  selectedCurrency,
  storeData,
  selectedStore,
  order_id,
  customerData,
  footer,
  sarabun
}) => {
  return (
    <>
      <Layout
        globalMagento={globalMagento}
        user={user}
        setUser={setUser}
        currencyData={currencyData}
        selectedCurrency={selectedCurrency}
        storeData={storeData}
        selectedStore={selectedStore}
        footer={footer}
        getPageData={getPageData}
        sarabun={sarabun}
      >
        <div className="main_container">
          <div className="flex flex-col lg:flex-row p-3 w-full">
            <Sidebar user={user} setUser={setUser} />
            <OrderDetails
              user={user}
              setUser={setUser}
              order_id={order_id}
              customerData={customerData}
              sarabun={sarabun}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  const locale = context.locale;
  let newCookieValue = 'default';
  if (locale !== 'en') {
    newCookieValue = locale;
  }
  const { id } = context.query;
  const customerData = await customerOnServerSide(
    cookies.jwt,
    newCookieValue,
    cookies.currency_code
  );
  const customer = await verifyCustomer(cookies.jwt);

  if (!customer.data.customer) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
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
    props: {
      jwt: cookies.jwt || null,
      order_id: id,
      customerData: customerData || null,
      globalMagento: globalMagento, storeData: storeCurrency, currencyData: storeCurrency.data.currency
    },
  };
}

export default orderdetails;
