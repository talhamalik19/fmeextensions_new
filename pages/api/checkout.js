import { getStrapiURL } from "@/utils";
import { getCookie } from "cookies-next";

const cart = {};


const setPaymentMethod = async (code, token, PayerID, jwt, cart_id, currency_code='', store_code = `default`) => {
  const jwt_client = getCookie('jwt') || jwt;
  const cart_id_client = getCookie('cart_id') || cart_id;
  const selected_currency = getCookie('currency_code') || currency_code;
  const selected_store = getCookie('store_code') || store_code;
  let query = `
  mutation {
      setPaymentMethodOnCart(input: {
          cart_id: "${cart_id_client}"
          payment_method: {
              code: "${code}"
          }
      }) {
        cart {
          selected_payment_method {
            code
          }
        }
      }
    }
    
    `;
  if(token && code == 'paypal_express' || code == 'paypal_express_bml'){
    query = `
    mutation {
      setPaymentMethodOnCart(input: {
        cart_id: "${cart_id_client}"
        payment_method: {
          code: "${code}"
          paypal_express: {
            payer_id: "${PayerID}"
            token: "${token}"
          }
        }
      }) {
        cart {
          selected_payment_method {
            code
            title
          }
        }
      }
    }
    
      
      `;
  }
  else if(PayerID && code == 'stripe_payments_checkout'){
    query = `
    mutation {
      setPaymentMethodOnCart(input: {
        cart_id: "${cart_id_client}"
        payment_method: {
          code: "${code}"
          stripe_payments: {
            payment_element: true
            payment_method: "${PayerID}"
            save_payment_method: true
          }
        }
      }) {
        cart {
          selected_payment_method {
            code
            title
          }
        }
      }
    }
    
      
      `;
  }
  else if(PayerID && code == 'stripe_payments'){
    query = `
    mutation {
      setPaymentMethodOnCart(input: {
        cart_id: "${cart_id_client}"
        payment_method: {
          code: "${code}"
          stripe_payments: {
            payment_element: true
            payment_method: "${PayerID}"
            save_payment_method: true
          }
        }
      }) {
        cart {
          selected_payment_method {
            code
            title
          }
        }
      }
      placeOrder(input: {cart_id: "${cart_id_client}"}) {
        order {
          order_number
        }
      }
    }
    
      
      `;
  }
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt_client}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      if (response.status === 400) {
        return data;
      } else {
        return data;
      }
    }
  } catch (error) {
    return error;
  }
};

const setBillingAddressOnCart = async (address, store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const cart_id = getCookie('cart_id') || null;
  const selected_currency = getCookie('currency_code') || '';
  const selected_store = getCookie('store_code') || store_code;
  let guestQuery = ``;
  if(jwt === null){
    guestQuery = `setGuestEmailOnCart(
      input: {
        cart_id: "${cart_id}"
        email: "${address.email}"
      }
    ) {
      cart {
        email
      }
    }`
  }
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
          ${guestQuery}
          setBillingAddressOnCart(
            input: {
              cart_id: "${cart_id}"
              billing_address: {
                address: {
                  firstname: "${address.firstname}"
                  lastname: "${address.lastname}"
                  company: ""
                  street: ["${address.street[0]}", "${address.street[1] || ''}"]
                  city: "${address.city}"
                  region: "${address.region.region_code}"
                  postcode: "${address.postcode}"
                  country_code: "${address.country_code}"
                  telephone: "${address.telephone}"
                  save_in_address_book: ${address.saveAddress || false}
                }
                same_as_shipping: false
              }
            }
          ) {
            cart {
              email
              billing_address {
                city
                country {
                  code
                  label
                }
                firstname
                lastname
                postcode
                region {
                  code
                  label
                }
                street
                telephone
              }
              shipping_addresses {
                firstname
                lastname
                street
                city
                region {
                  code
                  label
                }
                country {
                  code
                  label
                }
                telephone
                available_shipping_methods {
                  amount {
                    currency
                    value
                  }
                  available
                  carrier_code
                  carrier_title
                  error_message
                  method_code
                  method_title
                  price_excl_tax {
                    value
                    currency
                  }
                  price_incl_tax {
                    value
                    currency
                  }
                }
                selected_shipping_method {
                  amount {
                    value
                    currency
                  }
                  carrier_code
                  carrier_title
                  method_code
                  method_title
                }
              }
              items {
                id
                product {
                  name
                  sku
                  image {
                    url
                    label
                  }
                  ... on DownloadableProduct {
                    links_title
                    links_purchased_separately
                    downloadable_product_links {
                      sample_url
                      sort_order
                      title
                      price
                    }
                    downloadable_product_samples {
                      title
                      sort_order
                      sample_url
                    }
                  }
                  __typename
                }
                quantity
                prices {
                  total_item_discount {
                    value
                  }
                  price {
                    value
                  }
                  discounts {
                    label
                    amount {
                      value
                    }
                  }
                }
              }
              applied_coupons {
                code
              }
              prices {
                applied_taxes {
                  amount {
                    value
                  }
                }
                discount {
                  amount {
                    value
                  }
                }
                subtotal_including_tax {
                  value
                }
                subtotal_excluding_tax {
                  value
                }
                subtotal_with_discount_excluding_tax {
                  value
                }
                grand_total {
                  value
                }
              }
          
              available_payment_methods {
                code
                title
              }
              selected_payment_method {
                code
                title
              }
              applied_coupons {
                code
              }
            }
          }
        }
        
          
          `,
        variables: {},
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      if (response.status === 400) {
        return data;
      } else {
        return data;
      }
    }
  } catch (error) {
    return error;
  }
};

const placeOrder = async (jwt, cart_id, store_code = `default`, currency_code='') => {
  const jwt_client = getCookie('jwt') || jwt;
  const cart_id_client = getCookie('cart_id') || cart_id;
  const selected_store = getCookie('store_code') || store_code;
  const selected_currency = getCookie('currency_code') || currency_code
  let query = `
  mutation {
    placeOrder(input: {cart_id: "${cart_id_client}"}) {
      order {
        order_number
      }
    }
  }
  
    `;
    
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt_client}`,
        "Content-Currency": `${selected_currency}`
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      if (response.status === 400) {
        return data;
      } else {
        return data;
      }
    }
  } catch (error) {
    return error;
  }
};

const updateCustomerSessionId = async (jwt, order_id, checkout_session_id, store_code = `default`, status, payment_id) => {
  const jwt_client = getCookie('jwt') || jwt;
  const selected_store = getCookie('store_code') || store_code;
  let query = `
  mutation  {
    updateCustomerSessionId(input: {
      increement_id: ${order_id},
      checkout_session_id: "${checkout_session_id}",
      status: "${status}",
      payment_id: "${payment_id}"
    }) {
      success
      message
    }
   }   
    `;
    
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt_client}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      if (response.status === 400) {
        return data;
      } else {
        return data;
      }
    }
  } catch (error) {
    return error;
  }
};

const createPaypalExpressToken = async (store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const cart_id = getCookie('cart_id') || null;
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
          createPaypalExpressToken(
            input: {
              cart_id: "${cart_id}"
              code: "paypal_express"
              express_button: true
              urls: {
                return_url: "${process.env.NEXT_PAYPAL_RETURN_URL || 'paypal_return'}"
                cancel_url: "${process.env.NEXT_PAYPAL_CANCEL_URL || 'paypal_cancel'}"
              }
            }
          ) {
            token
            paypal_urls {
              start
              edit
            }
          }
        }
        
          `,
        variables: {},
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      if (response.status === 400) {
        return data;
      } else {
        return data;
      }
    }
  } catch (error) {
    return error;
  }
};

const getCheckoutAgreements = async (store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        {
          checkoutAgreements {
            agreement_id
            checkbox_text
            content
            content_height
            is_html
            mode
            name
          }
          
        }
          `,
        variables: {},
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      if (response.status === 400) {
        return data;
      } else {
        return data;
      }
    }
  } catch (error) {
    return error;
  }
};


export { setPaymentMethod, placeOrder, setBillingAddressOnCart, createPaypalExpressToken, getCheckoutAgreements, updateCustomerSessionId };
export default cart;
