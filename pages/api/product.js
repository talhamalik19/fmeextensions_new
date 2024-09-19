import { getStrapiURL } from "@/utils";
import { getCookie } from "cookies-next";

const product = {};

const getProductsByFilter = async (filter, pageSize, page, sort = ``, store_code = `default`, currency_code=``) => {
  const selected_currency = getCookie('currency_code') || currency_code;
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        {
            products(
                ${filter}
                pageSize: ${pageSize}
                currentPage: ${page}
                ${sort}
            ) {
              total_count
              items {
              overall_average_rating
                id
                name
                sku
                services_layout
                services_icons
                product_note,
                custom_canonical
                product_listing_description
                review_count
                type
                badge
                short_description {
                  html
                }
                categories{
                  url_key
                }
                url_key
                image {
                  url
                  label
                }
                small_image {
                  url
                  label
                }
                  thumbnail {
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
                reviews (pageSize: 50000, currentPage: 1) {
                  items {
                    average_rating
                    summary
                    text
                    created_at
                    nickname
                    ratings_breakdown {
                      name
                      value
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

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {}
};

const getBestSellerProducts = async (store_code = `default`, filter = ``) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
          query {
            bestSellerProduct(
              pageSize: 100, 
              currentPage: 1,
              ${filter}
            )
            blocks_data(identifiers : "best-sellers")
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
      return data;
    }
  } catch (error) {}
};

const getBestSellerProductDetail = async (store_code = `default`, url_key = `magento-2-extensions`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        query {
          bestSellerProductDetail(url_key:${url_key}) {
           id
           name
           sku
           url_key
           price
           buy_now
           currency
           image
           review {
               percentage
               filled_stars
               reviews_count
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
      return data;
    }
  } catch (error) {}
};

const getFaqsByProductId = async (id, store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        query {
          product_faqs (id : ${id}){
             faq_id
             product_id
             faq_title
             topic_title
             answers {
              answer_id
              answer
              user_email
              create_date
              answer_by
              }
             status
             user_id
             user_email
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
      return data;
    }
  } catch (error) {}
};

const getFaqTopics = async (store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        query {
          faqs_topics {
              faqs_topic_id
              title
              identifier
              topic_order
              show_on_main
              faqs {
                  title
                  faq_id
                  answers {
                    answer_id
                    answer
                    answer_by
                }
                  update_date
                  status
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
      return data;
    }
  } catch (error) {}
};

// const getMyProductsReviews = async (email) => {
//   try {
//     const response = await fetch(getStrapiURL("/graphql"), {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query: `
//         {
//           products(filter: { email: { eq: "${email}" } }) {
//             items {
//               reviews(pageSize: 10) {
//                 items {
//                   nickname
//                   summary
//                   text
//                   ratings {
//                     value
//                   }
//                 }
//               }
//             }
//           }
//         }
//           `,
//         variables: {},
//       }),
//     });

//     if (response.status === 200) {
//       const data = await response.json();
//       return data;
//     } else {
//       const data = await response.json();
//       return data;
//     }
//   } catch (error) {}
// };

export {
  getProductsByFilter,
  getBestSellerProducts,
  getFaqsByProductId,
  getFaqTopics,
  getBestSellerProductDetail
  // getMyProductsReviews
};

export default product;
