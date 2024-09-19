import { getStrapiURL } from '@/utils';
import dlv from 'dlv';
import login from '@/pages/api/login';
import { getCookie } from 'cookies-next';

const signup = async (firstname, lastname, email, password, token, isSubscribed, store_code = `default`) => {
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
            createCustomer(
              input: {
                firstname: "${firstname}"
                lastname: "${lastname}"
                email: "${email}"
                password: "${password}"
                is_subscribed: ${isSubscribed}
              }
            ) {
              customer {
                firstname
                lastname
                email
                is_subscribed
              }
            }
          }
        `,
        variables: {},
      }),
    });
  
    const data = await response.json();
    if(dlv(data,'data.createCustomer.customer.email') == email){
      const userLogin = await login(email, password);
      if (response.ok) {
        return userLogin;
      } else {
        if (response.status === 400 && data.error && data.error.message) {
          return data.message;
        } else {
          return data.message;
        }
      }
    }else{
      if (response.ok) {
        return data;
      } else {
        if (response.status === 400 && data.error && data.error.message) {
          return data.message;
        } else {
          return data.message;
        }
      }
    }
  } catch (error) {
    return error;
  }
  
};

export default signup;
