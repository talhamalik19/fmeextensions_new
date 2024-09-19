import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';

const countries = async (store_code = `default`) => {
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
            countries {
                id
                two_letter_abbreviation
                three_letter_abbreviation
                full_name_locale
                full_name_english
                available_regions {
                    id
                    code
                    name
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

export default countries;
