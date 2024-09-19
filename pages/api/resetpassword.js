import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';

const resetpassword = async (password, email, recaptchaToken, token, store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`,
        'X-ReCaptcha': `${recaptchaToken}`,
      },
      body: JSON.stringify({
        query: `
        mutation {
          resetPassword(
            email: "${email}",
            resetPasswordToken: "${token}",
            newPassword: "${password}"
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

export default resetpassword;
