import LayoutFullSec from '@/components/layoutFullSec'
import BlockManager from '@/components/shared/BlockManager'
import { getCartItems } from './api/cart'
import dlv from 'dlv'
import { getCheckoutAgreements } from './api/checkout'
import Seo from '@/components/seo'

export default function Checkout({ user, setUser, currencyData, selectedStore, checkoutAgreements, sarabun }) {
    // const blocks=['blocks.checkout'];
    const blocks = [{__component:'blocks-checkout', user: user, setUser:setUser, currencyData: currencyData, selectedStore: selectedStore, checkoutAgreements: checkoutAgreements}]
    const pageName="Checkout";
    const pagesData = {
      meta_title: `FME Checkout`,
      meta_description: ``,
      url_key: `/checkout`
    }
  return (
    <LayoutFullSec>
      <Seo seo={pagesData} />
        <BlockManager blocks={blocks} pageName={pageName} sarabun={sarabun}/>
    </LayoutFullSec>
  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  const locale = context.locale;
  let  newCookieValue = 'default';
    if(locale !== 'en'){
      newCookieValue = locale;
    }
  const cart = await getCartItems(cookies.jwt, cookies.cart_id, cookies.currency_code, newCookieValue);
  if(!dlv(cart,'data.cart.items.length')){
    return {
      redirect: {
        destination: `/cart`,
        permanent: false,
      },
    };
  }
  try{
    const cartTextsData = await getCheckoutAgreements();

    return {
      props: { checkoutAgreements:cartTextsData.data.checkoutAgreements }
    };

  }catch(e){
    return {
      props: {}
    };
  }
}