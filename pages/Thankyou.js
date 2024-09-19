import React, { useEffect } from "react";
import Layout from "@/components/layout";
import BlockManager from "@/components/shared/BlockManager";
import { getCartItems } from "./api/cart";
import { placeOrder, setPaymentMethod, updateCustomerSessionId } from "./api/checkout";
import { getOrderProducts, getOrders } from "./api/order";
import dlv from "dlv";
import { fetchGetJSON } from '@/utils/api-helpers';
import { cmsBlockCategories } from "./api/page";
import { getStrapiURL } from "@/utils";
import { getCookie } from "cookies-next";
//import logErrorToFile from "@/utils/logger";

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

export default function Thankyou({ order, user, setUser, globalMagento, email, orderItems, currencyData, storeData, selectedCurrency, selectedStore, customerData, footer, quantity, sarabun }) {
  const blocks = [{ __component: 'blocks-thankyou-page', order: order, email: email, orderItems: orderItems, quantity: quantity, getPageData: getPageData }];
  const pageName = 'Thankyou';
  const pagesData = {
    meta_title: `Thank you`,
    meta_description: ``,
    url_key: `/thankyou`
  }

  useEffect(() => {
    setUser(customerData)
  }, [customerData]);

  /*  const fetchData = async () => {
     if(sessionId) {
       const response = await fetchGetJSON(`/api/checkout_sessions/${sessionId}`);
    
     }
   }
 
   fetchData() */

  /* const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  ); */

  return (
    <>
      <Layout globalMagento={globalMagento} pageData={pagesData} user={user} setUser={setUser} currencyData={currencyData} storeData={storeData} selectedCurrency={selectedCurrency} selectedStore={selectedStore} footer={footer} getPageData={getPageData} sarabun={sarabun}>
        <BlockManager blocks={blocks} pageName={pageName} sarabun={sarabun}></BlockManager>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let order = null;
  let email = null;
  let orderItems = null;
  let sessionId = null;
  let quantity = [];
  let customerData = null;

  const cookies = context.req.cookies;
  const locale = context.locale;
  const url = context.req.url;
  const query = context.query;

  try {
    if (locale !== cookies.store_code && cookies.store_code != 'default') {
      const newUrl = `${url}`;
      return {
        redirect: {
          destination: `/${cookies.store_code}${newUrl}`,
          permanent: true,
        },
      };
    }
  } catch (e) { }

  let newCookieValue = 'default';
  if (locale !== 'en') {
    newCookieValue = locale;
  }

  try {

    const { token, PayerID } = context.query;
    const { session_id } = context.query;
    const { order_id } = context.query;
    const cart = await getCartItems(cookies.jwt, cookies.cart_id, cookies.currency_code, newCookieValue);
    email = dlv(cart, 'data.cart.email');
    const payment_method_code = dlv(cart, 'data.cart.selected_payment_method.code');

    if (token && PayerID) {
      const settingPaymentMethod = await setPaymentMethod(
        payment_method_code,
        token,
        PayerID,
        cookies.jwt,
        cookies.cart_id,
        cookies.currency_code
      );
      if (dlv(settingPaymentMethod, 'data.setPaymentMethodOnCart.cart.selected_payment_method.code')) {
        const orderData = await placeOrder(cookies.jwt, cookies.cart_id, newCookieValue, cookies.currency_code);
        if (dlv(orderData, 'errors')) {
          //try { logErrorToFile(`Error Setting Payment Method: ${dlv(settingPaymentMethod, 'errors.0.message')}`) } catch (e) { logErrorToFile(`Log Failed in paypal setting payment method`) }
        } else {
          order = dlv(orderData, 'data.placeOrder.order.order_number', '');
          if (order) {
            orderItems = await getProductsByOrderId(order, cookies, newCookieValue, quantity);
          }
        }
      } else {
        //try { logErrorToFile(`Error Setting Payment Method: ${dlv(settingPaymentMethod, 'errors.0.message')}`) } catch (e) { logErrorToFile(`Log Failed in paypal setting payment method`) }
      }
    } else if (session_id) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com'; // Add your base URL
      const url = `${baseUrl}/api/checkout_sessions/${encodeURIComponent(session_id)}`;
      const stripeResponse = await fetchGetJSON(url);

      try{
        const logData = {
          status: stripeResponse?.status,
          payment_intent_id: stripeResponse?.payment_intent?.id,
          payment_status: stripeResponse?.payment_status
        }
        await fetch(`${baseUrl}/api/log_error`, {
          method: 'GET',
          headers: {
            'content': `${JSON.stringify(logData)}`,
            'note': `4`,
            'author': `11`
          },
        });
      }catch(e){}

      if (stripeResponse?.statusCode === 500) {
        try{
          await fetch(`${baseUrl}/api/log_error`, {
            method: 'GET',
            headers: {
              'content': `${stripeResponse?.statusCode}`,
              'note': `6`,
              'author': `11`
            },
          });
        }catch(e){}
        //try { logErrorToFile(`Stripe session_id validation failed: ${stripeResponse.statusCode}, session_id: ${session_id}`) } catch (e) { logErrorToFile(`Log Failed in stripe session id validation`) }
      }

      sessionId = stripeResponse;
      const settingPaymentMethod = await setPaymentMethod(
        payment_method_code,
        null,
        stripeResponse.payment_intent.id,
        cookies.jwt,
        cookies.cart_id,
        cookies.currency_code
      );

      if (dlv(settingPaymentMethod, 'data.setPaymentMethodOnCart.cart.selected_payment_method.code')) {
        const orderData = await placeOrder(cookies.jwt, cookies.cart_id, newCookieValue, cookies.currency_code);
        order = dlv(orderData, 'data.placeOrder.order.order_number', '');
        if (order) {
          const confirmPayment = await updateCustomerSessionId(cookies.jwt, order, session_id, newCookieValue, stripeResponse.status, stripeResponse.payment_intent.id);
          orderItems = await getProductsByOrderId(order, cookies, newCookieValue, quantity);
        }
      } else {
        try{
          await fetch(`${baseUrl}/api/log_error`, {
            method: 'GET',
            headers: {
              'content': `${JSON.stringify(orderData?.errors)}`,
              'note': `5`,
              'author': `11`
            },
          });
        }catch(e){}
        //try { logErrorToFile(`Error Setting Payment Method: ${dlv(settingPaymentMethod, 'errors.0.message')}`) } catch (e) { logErrorToFile(`Log Failed in stripe setting payment method`) }
      }
    } else if (order_id) {
      const customer = JSON.parse(cookies.login_user)
      email = customer.data.customer.email;
      order = order_id;
      orderItems = await getProductsByOrderId(order, cookies, newCookieValue, quantity);
    } else {
      return {
        redirect: {
          destination: `/cart`,
          permanent: false,
        },
      };
    }

  } catch (e) {
    //try { logErrorToFile(`Error: ${e.message}`) } catch (e) { logErrorToFile('Error Logging Failed') }
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
    props: { order: order, email: email || null, orderItems: orderItems, sessionId: sessionId, quantity: quantity, customerData: customerData, globalMagento: globalMagento, currencyData: storeCurrency.data.currency, storeData: storeCurrency },
  };
}

const getProductsByOrderId = async (order_id, cookies, newCookieValue, quantity) => {
  const orderProducts = await getOrders(order_id, cookies.jwt, cookies.currency_code, newCookieValue);
  let order_items_skus = [];
  if (dlv(orderProducts, "data.customer.orders.items")) {
    order_items_skus = dlv(orderProducts, "data.customer.orders.items")
      .map((order_item) => {
        return dlv(order_item, "items", [])
          .map((item) => {
            const product_sku = dlv(item, "product_sku");
            const orderedQuantity = dlv(item, "quantity_ordered");
            if (orderedQuantity !== undefined && orderedQuantity !== null) {
              quantity.push({
                sku: item.product_sku,
                quantity_ordered: orderedQuantity
              })
            }
            return product_sku;
          })
          .flat(); // Use the flat() method to flatten the inner arrays
      })
      .flat(); // Use the flat() method to flatten the outer array
  }
  const skusArray = order_items_skus.map(sku => `"${sku}"`); // Wrap each SKU in double quotes
  const skusString = `[${skusArray.join(', ')}]`; // Create a JSON array string
  const order_items = await getOrderProducts(skusString, cookies.currency_code, newCookieValue);
  return order_items;
}