import { getStrapiURL } from "@/utils";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const order = {};

const getOrders = async (order_id, jwt, currency_code='', store_code = `default`) => {
  const jwt_client = getCookie('jwt') || jwt;
  const selected_currency = getCookie('currency_code') || currency_code;
  const selected_store = getCookie('store_code') || store_code;

  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt_client}`,
        'Content-Currency': `${selected_currency}`,
      },
      body: JSON.stringify({
        query: `
        query {
          customer {
            orders(filter: { number: { eq: "${order_id}" } }) {
              items {
                number
                created_at
                total {
                  grand_total {
                    value
                    currency
                  }
                  discounts {
                    amount {
                      value
                      currency
                    }
                  }
                }
                items {
                  id
                  product_name
                  product_sku
                  quantity_ordered
                  product_sale_price {
                    value
                    currency
                  }
                }
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

const getOrderProducts = async (skus, currency_code='', store_code = `default`) => {
  const selected_currency = getCookie('currency_code') || currency_code;
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`,
        "Content-Currency": `${selected_currency}`
      },
      body: JSON.stringify({
        query: `
        query {
          products(filter: {sku: {in: ${skus}}}) {
            items {
              id
              name
              sku
              image {
                url
                label
              }
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
              special_price
            }
          }
        }
        
        `,
        variables: {},
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return data.message;
    }
  } catch (error) {}
};

const reOrders = async (order_id, jwt, store_code = `default`) => {
  const jwt_client = getCookie("jwt") || jwt;
  const selected_store = getCookie('store_code') || store_code;
  const selected_currency = getCookie('currency_code') || ''
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_client}`,
         'Store': `${selected_store}`,
         'Content-Currency' : `${selected_currency}`
      },
      body: JSON.stringify({
        query: `
        mutation{
          reorderItems(orderNumber: "${order_id}"){
            cart {
              id
              items {
                uid
                product {
                  name
                  sku
                }
                quantity
                prices {
                  price {
                    value
                  }
                }
              }
            }
            userInputErrors{
              code
              message
              path
            }
          }
        }
        
        
        
        
        `,
        variables: {},
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setCookie("cart_id", data.data.reorderItems.cart.id, { path: "/" });
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

const fetchOrders = async (jwt, store_code='default', currency_code='') => {
  const jwt_client = getCookie("jwt") || jwt;
  const selected_store = getCookie('store_code') || store_code;
  const selected_currency = getCookie('currency_code') || currency_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt_client}`,
         "Store": `${selected_store}`,
         "Content-Currency": `${selected_currency}`
      },
      body: JSON.stringify({
        query: `
        {
          customerOrders {
            items {
              order_number
              id
              created_at
              grand_total
              status
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

export { getOrders, getOrderProducts, reOrders, fetchOrders };
export default order;
