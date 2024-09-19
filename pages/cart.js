import LayoutFullSec from '@/components/layoutFullSec'
import BlockManager from '@/components/shared/BlockManager'
import { getCartItems } from './api/cart';
import Seo from '@/components/seo';


export default function cart({ user, currencyData, cartItems, selectedStore,sarabun }) {
  const blocks = [{ __component: 'blocks-cart', user: user, currencyData: currencyData, selectedStore: selectedStore, cartItems:cartItems}]
  const pageName = 'Cart';
  const pagesData = {
    meta_title: `Shopping Cart`,
    meta_description: ``,
    url_key: `/cart`
  }
  return (
    <>
    <Seo seo={pagesData}/>
      <LayoutFullSec>
        <BlockManager blocks={blocks} pageName={pageName} sarabun={sarabun}/>
      </LayoutFullSec>
    </>
  )
}

export async function getServerSideProps(context) {
  const locale = context.locale;
  try{
    const cookies = await context.req.cookies;
    let  newCookieValue = 'default';
    if(locale !== 'en'){
      newCookieValue = locale;
    }
    const cart = await getCartItems(cookies.jwt, cookies.cart_id, cookies.currency_code, newCookieValue);
    return {
      props: { user: cookies.login_user || null, cartItems:cart }
    };

  }catch(e){
    return {
      props: {}
    };
  }
}