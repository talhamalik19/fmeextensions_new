import OrderPrint from "@/components/customer/OrderPrint";
import { customerOnServerSide } from "@/pages/api/login";
import { getOrders } from "@/pages/api/order";
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
          blocks_data(identifiers : "support-menu,service-menu")
          }
        `,
      variables: {},
    }
    ),
  });

  return response.json();
}

const orderdetails = ({
  user,
  setUser,
  order_id,
  customerData,
  customerOrders,
  selected_currency
}) => {
  return (
    <OrderPrint
      user={user}
      setUser={setUser}
      order_id={order_id}
      customerData={customerData}
      customerOrders={customerOrders}
      selected_currency={selected_currency}
    />
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
  const orderProducts = await getOrders(id, cookies.jwt, cookies.currency_code, newCookieValue);

  if (!cookies.login_user) {
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
      customerOrders: orderProducts,
      selected_currency: cookies.currency_code,
      globalMagento: globalMagento, storeData: storeCurrency, currencyData: storeCurrency.data.currency
    },
  };
}

export default orderdetails;
