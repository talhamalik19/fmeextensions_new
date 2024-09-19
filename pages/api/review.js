import { escapeGraphQLString } from '@/components/shared/escapeGraphQLString';
import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';

const review = async (sku, goodsupport, easytouse, workswell, overallrating, nickname, summary, text, token, store_code = ``) => {
  const client_jwt = getCookie('jwt');
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ReCaptcha': `${token}`,
        'Store': `${selected_store}`,
        'Authorization': `Bearer ${client_jwt}`,
      },
      body: JSON.stringify({
        query: `
        mutation {
            createProductReview(
            input: {
            sku: "${sku}",
            nickname: "${escapeGraphQLString(nickname)}",
            summary: "${escapeGraphQLString(summary)}",
            text: "${escapeGraphQLString(text)}",
            ratings: [
            {
            id: "MQ==",
            value_id: "${goodsupport}"
            },
            {
                      id: "Mw==",
                      value_id: "${easytouse}"
                    }, {
                      id: "Mg==",
                      value_id: "${workswell}"
                    },
                    {
                      id: "NA==",
                      value_id: "${overallrating}"
                    }
            ]
            }
            ) {
                review {
                  nickname
                  summary
                  text
                  average_rating
                  ratings_breakdown {
                    name
                    value
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
      if (response.status === 400 && data.error && data.error.message) {
        return data.message;
      } else {
        return data.message;
      }
    }
  } catch (error) {
    return error;
  }
  
};

const getAllCustomerReviews = async (page, pageSize, store_code = `default`) => {
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
        query {
          getAllReviews(pageSize:${pageSize},currentPage:${page}) {
              reviews_count
              review_list {
                  title
                  nickname
                  review_id
                  detail
                  review_image
                  average_rating
                  ratings_breakdown{
                      name
                      value
                  }
              }
          }
       }
       
        `,
        variables: {},
      }
      ),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) { }
};

export { getAllCustomerReviews };

export default review;
