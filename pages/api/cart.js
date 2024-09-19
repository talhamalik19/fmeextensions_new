import { getStrapiURL } from "@/utils";
import { setCookie, getCookie } from "cookies-next";

const cart = {};

const query = `email
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
    url_key
    image {
      url
      label
    }
      thumbnail {
      url
      label
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
      currency
    }
    discounts {
      label
      amount {
        value
      }
    }
  }
  ... on DownloadableCartItem {
    links {
      id
      title
      price
    }
    samples {
      title
      sample_url
    }
  }        
  ... on DownloadableCartItem {
    customizable_options {
      label
      id
      type
      values {
        value
        label
        price {
          value
          units
        }
      }
    }
    links {
      title
      sample_url
      price
    }
  }
}
applied_coupons {
  code
}
prices {
  applied_taxes {
    label
    amount {
      value
      currency
    }
  }
  discount {
    amount {
      value
      currency
    }
  }
  subtotal_including_tax {
    value
  }
  subtotal_excluding_tax {
    value
    currency
  }
  subtotal_with_discount_excluding_tax {
    value
  }
  grand_total {
    value
    currency
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
}`;

const createEmptyCart = async (store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
          createEmptyCart
        }
        `,
        variables: {},
      }),
    });

    const data = await response.json();
    if (data.data.createEmptyCart) {
      setCookie("cart_id", data.data.createEmptyCart, { path: "/" });
      setCookie("guest_cart_id", data.data.createEmptyCart, { path: "/" });
    }

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

const assignCustomerToCart = async (store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const cart_id = getCookie('guest_cart_id') || null;
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
          assignCustomerToGuestCart(
            cart_id: "${cart_id}"
          ) {
            id
            items {
              quantity
              product {
                sku
              }
            }
          }
        }
        
        `,
        variables: {},
      }),
    });

    const data = await response.json();
    if (data.data.assignCustomerToGuestCart) {
      setCookie("cart_id", data.data.assignCustomerToGuestCart.id, {
        path: "/",
      });
    }
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

const addCartItem = async (sku, quantity, links, options, store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  let cart_id = getCookie('cart_id') || null;
  const selected_currency = getCookie('currency_code') || '';
  const selected_store = getCookie('store_code') || store_code;

  if (!cart_id) {
    const create = await createEmptyCart();
    cart_id = create.data.createEmptyCart; // Assuming create.cart.id is the newly created cart's ID
  }

  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
          addDownloadableProductsToCart(
            input: {
              cart_id: "${cart_id}"
              cart_items: {
                data: {
                  sku: "${sku}"
                  quantity: ${quantity}
                }
                downloadable_product_links: 
                  ${links}
                customizable_options: 
                  ${options}
              }
            }
          ) {
            cart {
              ${query}
            }
          }
        }
        `,
        variables: {},
      }),
    });

    const data = await response.json();
    if (response.ok) {
      if (data.errors) {
        if (data.errors[0].message.includes("The cart isn't active") || data.errors[0].message.includes("The current user cannot perform operations on cart") || data.errors[0].message.includes("Could not find a cart with ID")) {
          const create = await createEmptyCart();
          if (create.data.createEmptyCart) {
            addCartItem(sku, quantity, links, options);
          }
        }
      } else {
        return data;
      }
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

const removeCartItem = async (id, store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const cart_id = getCookie('cart_id') || null;
  const selected_store = getCookie('store_code') || store_code;
  const selected_currency = getCookie('currency_code') || '';
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
          removeItemFromCart(
            input: {
              cart_id: "${cart_id}"
              cart_item_id: ${id}
            }
          ) {
            cart {
              ${query}
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

const updateCartItem = async (id, quantity, store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const cart_id = getCookie('cart_id') || null;
  const selected_currency = getCookie('currency_code') || '';
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
          mutation {
            updateCartItems(
              input: {
                cart_id: "${cart_id}",
                cart_items: [
                  {
                    cart_item_id: "${id}"
                    quantity: ${quantity}
                  }
                ]
              }
            ){
              cart {
                ${query}
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

const updateCartWithOptions = async (id, quantity, options, store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const cart_id = getCookie('cart_id') || null;
  const selected_currency = getCookie('currency_code') || '';
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
          mutation {
            updateCartItems(
              input: {
                cart_id: "${cart_id}",
                cart_items: [
                  {
                    cart_item_id: "${id}"
                    quantity: ${quantity}
                customizable_options: 
                  ${options}
                  }
                ]
              }
            ){
              cart {
                ${query}
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

const getCartItems = async (jwt, cart_id, currency_code='', store_code = `default`) => {
  const selected_currency = getCookie('currency_code') || currency_code;
  const jwt_client = getCookie('jwt') || jwt;
  const cart_id_client = getCookie('cart_id') || cart_id;
  const selected_store = getCookie('store_code') || store_code;
  if (!cart_id_client) {
    return { error: 'Cart ID is not defined.' };
  }
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt_client}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
          {
            cart(cart_id: "${cart_id_client}") {
              ${query}
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

const applyCouponToCart = async (code, store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const cart_id = getCookie('cart_id') || null;
  const selected_currency = getCookie('currency_code') || '';
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
          mutation {
            applyCouponToCart(
              input: {
                cart_id: "${cart_id}",
                coupon_code: "${code}"
              }
            ) {
              cart {
                ${query}
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

const removeCouponFromCart = async (store_code = `default`) => {
  const jwt = getCookie('jwt') || null;
  const cart_id = getCookie('cart_id') || null;
  const selected_currency = getCookie('currency_code') || '';
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
          mutation {
            removeCouponFromCart(
              input:
                { cart_id: "${cart_id}" }
              ) {
              cart {
                ${query}
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

export {
  createEmptyCart,
  addCartItem,
  removeCartItem,
  updateCartItem,
  getCartItems,
  assignCustomerToCart,
  applyCouponToCart,
  removeCouponFromCart,
  updateCartWithOptions,
};
export default cart;
