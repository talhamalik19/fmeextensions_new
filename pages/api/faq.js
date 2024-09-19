import { escapeGraphQLString } from '@/components/shared/escapeGraphQLString';
import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';

const faq = async (name, email, question, product_id, token, store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ReCaptcha': `${token}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
            faqFormSubmit(
            input: {
            name : "${escapeGraphQLString(name)}"
            email : "${email}"
            question : "${escapeGraphQLString(question)}"
            product_id:${product_id}
            user_id:0
            }
            ) {
            success_message
            }
            }
            
            
        `,
        variables: {},
      }),
    });

    const data = await response.json();

    if (data?.errors) {
      if (!data?.errors[0]?.message.includes('Recaptcha Validation Failed')) {
        try {
          await fetch(`/api/log_error`, {
            method: 'GET',
            headers: {
              'content': `${JSON.stringify(data?.errors)}`,
              'note': `2`,
              'author': `11`
            },
          });
        } catch (e) { console.log(e) }
      }
    }
    return data;
  } catch (error) {
    return error;
  }

};

export default faq;
