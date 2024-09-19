import ImageBlock from "@/components/global/ImageBlock";
import SectionCta from "@/components/global/SectionCta";
import { CurrencyCodeToSymbol } from "@/components/shared/CurrencyCodeToSymbol";
import { deleteCookie, getCookie } from "cookies-next";
import dlv from "dlv";
import Link from "next/link";
import React, {useEffect, useState} from "react";

const Thankyou = ({ order, email, orderItems, quantity, sarabun }) => {
  if(dlv(orderItems,'data.products.items.length') > 0){
    deleteCookie('cart_id');
  }
  const [currencySymbol, setCurrencySymbol] = useState('')

  try {
      useEffect(()=>{
          const symbol = getCookie('symbol_currency') || '$';
          setCurrencySymbol(symbol)
      }, [])
      
  } catch (error) {
  }
  const [orderedQuantity, setOrderedQuantity] = useState(null);
  const thankyouIcon = "/images/Thankyou.png";
  const thankyouProductIcon = "/images/thankyou_product.png";
  const pro_Price = "$149.99";
  return (
    <div className="section_padding">
      <div className="main_container">
        <div className="Thankyou_Page">
        
            <div className="order_status_info center-img">
              <ImageBlock image={thankyouIcon} />
              <h2 className={`${sarabun} primary_title`}>Order Successfully Placed! </h2>
              <p className={`${sarabun} secondary_title`}>Thank you for your purchase</p>
              {order && <p className="primary_text">
                Your Order Number is{" "}
                <span className="highlighted"><Link href={`/sales/order/view/order_id/${order}`}>{order}</Link></span>
              </p>}
            </div>
            {dlv(orderItems,'data.products.items') && dlv(orderItems,'data.products.items').map((item)=>{
              return(
                <div className="Thankyou_contentBox">
              <div className="icon">
             
                <img src={dlv(item,'image.url')} style={{width:'140px',height:'auto'}} />
              </div>
              <div className="prod_dtl">
                <h3 className={`${sarabun} prod_name`}>{dlv(item,'name')}</h3>
                <p className="prod_price">{currencySymbol}{(dlv(item, "special_price") ? dlv(item, "special_price") : (dlv(item, "price.regularPrice.amount.value")) * (quantity.find(orderItem => orderItem.sku === item.sku).quantity_ordered))} </p>
              </div>
            </div>
              )
            })}
            {deleteCookie('payment_method_code')}
            {email && <div className="thankyou_email">
              <p className="primary_text">
                A confirmation email has been sent to the contact details below
              </p>
              <p className="primary_text email">{email}</p>
            </div>}
            <div className="section_cta">
              <SectionCta props="Back To Homepage" url={"/"} />
              <SectionCta
                props="Go to My Account"
                url={"/customer/account"}
                ctaClass="secondary_cta"
              />
            </div>
        
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
