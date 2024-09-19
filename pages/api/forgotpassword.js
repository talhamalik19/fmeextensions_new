import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';

const forgotpassword = async (email, token, store_code = `default`) => {
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
          requestPasswordResetEmail(
            email: "${email}"
          )
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

export default forgotpassword;
