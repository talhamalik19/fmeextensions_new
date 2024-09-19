import { escapeGraphQLString } from '@/components/shared/escapeGraphQLString';
import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';

const submitform = {};

const submitContactUs = async (formData, token, store_code = ``) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-ReCaptcha': `${token}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
            contactusFormSubmit(
            input: {
            name : "${formData.yourName}"
            email : "${formData.email}"
            message : "${escapeGraphQLString(formData.message)}"
            website : "${formData.website}"
            }
            ) {
            message
            }
            }
            
        `,
        variables: {},
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data; // Ensure the response is returned
    } else {
      const data = await response.json();
      return data; // Ensure the response is returned
    }
  } catch (error) {
    // Handle the error and return an appropriate response
    return { error: "An error occurred while fetching search results" };
  }
};

const submitQuoteForm = async (formData, token, store_code = ``) => {
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
                rfqFormSubmit(
                input: {
                contact_name : "${formData.yourName}"
                email : "${formData.email}"
                phone : "${formData.phone}"
                project_title : "${formData.moduleName}"
                company : "${formData.companyName}"
                file_name:"${formData.name}"
                overview: "${escapeGraphQLString(formData.message)}"
                prd:"${formData.base64}"
                date: "${formData.date}"
                budget: "${formData.budgetStatus}"
                }
                ) {
                message
                }
                }
                
                
            `,
        variables: {},
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data; // Ensure the response is returned
    } else {
      const data = await response.json();
      return data; // Ensure the response is returned
    }
  } catch (error) {
    // Handle the error and return an appropriate response
    return { error: "An error occurred while fetching search results" };
  }
};

const subscribeToNewsLetter = async (email, token, store_code = ``) => {
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
            subscribeEmailToNewsletter(
              email: "${email}"
            ) {
              status
            }
          } 
          `,
        variables: {},
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data; // Ensure the response is returned
    } else {
      const data = await response.json();
      return data; // Ensure the response is returned
    }
  } catch (error) {
    // Handle the error and return an appropriate response
    return { error: "An error occurred while fetching search results" };
  }
};

const unSubscribeToNewsLetter = async (email, token, store_code = ``) => {
  const selected_store = getCookie('store_code') || store_code;
  const jwt = getCookie('jwt') || null;
  try {
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-ReCaptcha': `${token}`,
        'Authorization': `Bearer ${jwt}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        mutation {
          updateCustomer(
            input: {
              email: "${email}"
              is_subscribed: false
            }
          ) {
            customer {
              email
              is_subscribed
            }
          }
        }
          `,
        variables: {},
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data; // Ensure the response is returned
    } else {
      const data = await response.json();
      return data; // Ensure the response is returned
    }
  } catch (error) {
    // Handle the error and return an appropriate response
    return { error: "An error occurred while fetching search results" };
  }
};

export {
  submitContactUs,
  submitQuoteForm,
  subscribeToNewsLetter,
  unSubscribeToNewsLetter,
};

export default submitform;
