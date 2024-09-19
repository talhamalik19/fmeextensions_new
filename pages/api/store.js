import { getStrapiURL } from '@/utils';
import { setCookie } from "cookies-next";

const store = {};

const availableStores = async () => {
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        {
          storeConfig {
            code
            store_name
            base_currency_code
          }
          availableStores {
            code
            store_name
          }
          currency {
            available_currency_codes
            base_currency_code
            base_currency_symbol
            default_display_currecy_code
            default_display_currecy_symbol
            default_display_currency_code
            default_display_currency_symbol
            exchange_rates {
              currency_to
              rate
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
      return data.message
    }
  } catch (error) { }
};

const getCurrencySymbol = async (currency_code) => {
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Currency': `${currency_code}`
      },
      body: JSON.stringify({
        query: `
        query GetCurrencySymbol {
          getCurrencySymbol {
            symbol
          }
        }                       
        `,
        variables: {},
      }
      ),
    });

      const data = await response.json();
      return data;
  } catch (error) { }
};

const changeStore = async (code) => {
    setCookie('store_code', code);
};

export { availableStores, changeStore, getCurrencySymbol };

export default store;
