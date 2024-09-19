import { getStrapiURL } from "@/utils";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

const login = async (email, password, token, store_code = `default`) => {
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
        mutation {
          generateCustomerToken(email: "${email}", password: "${password}") {
            token
          }
        }
        `,
        variables: {},
      }),
    });

    if (response.status === 200) {
      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + 59 * 60 * 1000);
      // Response status is 200
      const data = await response.json();
      if (data.data.generateCustomerToken) {
        const token = data.data.generateCustomerToken.token;
        setCookie("jwt", token, { path: "/", expires: expirationDate });
        //Get User By jwt token
        try {
          const response = await fetch(getStrapiURL("/graphql"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              query: `
            {
              customerCart {
                id
                items {
                  id
                  product {
                    name
                    sku
                  }
                  quantity
                }
              }
              customer {
                reviews {
                  items {
                      summary
                      text
                      nickname
                      created_at
                      average_rating
                      product {
                      overall_average_rating
                      name
                      sku
                      url_key
                    }
                      ratings_breakdown {
                          name
                          value
                      }
                      
                  }
                 
                }
                firstname
                middlename
                lastname
                suffix
                prefix
                gender
                date_of_birth
                taxvat
                created_at
                default_shipping
                default_billing
                email
                is_subscribed
                addresses {
                  id
                  firstname
                  lastname
                  street
                  city
                  region {
                    region_code
                    region
                    region_id
                  }
                  postcode
                  vat_id
                  country_code
                  telephone
                  company
                  default_shipping
                  default_billing
                }
              }
              customerOrders {
                items {
                  order_number
                  id
                  created_at
                  grand_total
                  status
                  created_at
                }
              }
              
              customerDownloadableProducts {
                items {
                  date
                  download_url
                  order_increment_id
                  remaining_downloads
                  status
                  title
                }
              }

            }               
            `,
              variables: {},
            }),
          });

          if (response.status === 200) {
            // Response status is 200
            const data = await response.json();
            if (data.data.customer) {
              setCookie("cart_id", data.data.customerCart.id, { path: "/" });
              setCookie(
                "login_user",
                `${JSON.stringify({
                  data: {
                    customer: { firstname: data.data.customer.firstname, email:data.data.customer.email },
                  },
                })}`,
                { path: "/", expires: expirationDate }
              );
              return data;
            }
          }
        } catch (error) {
          //console.error('Login failed:', error);
          //throw new Error('Login failed');
        }
        //End Get User By jwt token
      } else {
        return data;
      }
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    //console.error('Login failed:', error);
    //throw new Error('Login failed');
  }
};

const logout = () => {
  // Delete the JWT token cookie
  deleteCookie("jwt");

  // Delete the user data cookie
  deleteCookie("login_user");
  deleteCookie("cart_id");

  // You can also add additional logout logic here, such as redirecting to the login page
  // or performing any necessary cleanup.
};

const customer = async (setUser, store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  const selected_currency = getCookie('currency_code') || '';

  const jwt = getCookie('jwt') || null;
  try{
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        {
          customer {
            reviews {
              items {
                  summary
                  text
                  nickname
                  created_at
                  average_rating
                  product {
                  overall_average_rating
                  name
                  sku
                  url_key
                  image{
                    url
                    label
                  }
                }
                  ratings_breakdown {
                      name
                      value
                  }
                  
              }
             
            }
            firstname
            middlename
            lastname
            suffix
            prefix
            gender
            date_of_birth
            taxvat
            created_at
            default_shipping
            default_billing
            email
            is_subscribed
            addresses {
              id
              firstname
              lastname
              street
              city
              region {
                region_code
                region
                region_id
              }
              postcode
              vat_id
              country_code
              telephone
              company
              default_shipping
              default_billing
              company
            }
          }
          customerOrders {
            items {
              order_number
              id
              created_at
              grand_total
              status
              created_at
            }
          }
          
          customerDownloadableProducts {
            items {
              date
              download_url
              order_increment_id
              remaining_downloads
              status
              title
            }
          }
        }    
        `,
        variables: {},
      }),
    });
    const data = await response.json();
    if (!data.data.customer) {
     if(setUser){
      setUser(null);
     }
      
    } else {
      return data;
    }
  } catch (e) {}
};

const verifyCustomer = async (jwt_token=null) => {
  const jwt = getCookie('jwt') || jwt_token;
  try{
    const response = await fetch(getStrapiURL('/rest/V1/customers/me'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });
    const data = await response.json();
    if(data.message){
      return {data:{customer:null}}
    }else{
      return {data:{customer:{email:data.email}}}
    }
  } catch (e) {}
};

const customerOnServerSide = async (jwt, store_code='default', currency_code='') => {
  try{
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Store': `${store_code}`,
        'Content-Currency': `${currency_code}` || getCookie('currency-code') || '',
      },
      body: JSON.stringify({
        query: `
        {
          customer {
            reviews {
              items {
                  summary
                  text
                  nickname
                  created_at
                  average_rating
                  product {
                  name
                  sku
                  url_key
                  image{
                    url
                    label
                  }
                }
                  ratings_breakdown {
                      name
                      value
                  }
                  
              }
             
            }
            firstname
            middlename
            lastname
            suffix
            prefix
            gender
            date_of_birth
            taxvat
            created_at
            default_shipping
            default_billing
            email
            is_subscribed
            addresses {
              id
              firstname
              lastname
              street
              city
              region {
                region_code
                region
              }
              postcode
              vat_id
              country_code
              telephone
              company
              default_shipping
              default_billing
              company
            }
          }
          customerOrders {
            items {
              order_number
              id
              created_at
              grand_total
              status
              created_at
            }
          }
          
          customerDownloadableProducts {
            items {
              date
              download_url
              order_increment_id
              remaining_downloads
              status
              title
            }
          }
        }    
        `,
        variables: {},
      }),
    });
    const data = await response.json();
    if (!data.data.customer) {
    } else {
      return data;
    }
  } catch (e) {}
};

export { logout, customer, customerOnServerSide, verifyCustomer };

export default login;
