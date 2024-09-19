import { getStrapiURL } from "@/utils";
import { getCookie } from "cookies-next";

const customer = async (
  firstname,
  lastname,
  email,
  oldpassword,
  newpassword,
  passwordcb,
  emailcb,
  token,
  jwt,
  store_code = `default`
) => {
  const selected_store = getCookie('store_code') || store_code;
  const jwt_client = getCookie("jwt") || jwt;
  try {
    let query;
    if (!emailcb && !passwordcb) {
      query = `
      mutation {
        updateCustomer(
          input: {
            firstname: "${firstname}"
            lastname: "${lastname}"
          }
        ) {
          customer {
            firstname
            lastname
          }
        }
      }
      
      `;
    }
    if (emailcb) {
      query = `
      mutation {
        updateCustomer(
          input: {
            firstname: "${firstname}"
            lastname: "${lastname}"
            email: "${email}"
            password:"${oldpassword}"
          }
        ) {
          customer {
            firstname
            lastname
            email
          }
        }
      }
      
      `;
    }
    if (passwordcb) {
      query = `
      mutation {
        changeCustomerPassword(
          currentPassword: "${oldpassword}"
          newPassword: "${newpassword}"
        ) {
          email
        }
        updateCustomer(
          input: {
            firstname: "${firstname}"
            lastname: "${lastname}"
            email: "${email}"
          }
        ) {
          customer {
            firstname
            lastname
            email
          }
        }
      }
      
      `;
    }
    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-ReCaptcha': `${token}`,
        'Authorization': `Bearer ${jwt_client}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      if (data.errors) {
        return data.errors[0].message;
      } else {
        return data.message;
      }
    }
  } catch (error) {
    return error;
  }
};

const addAddress = async (address, jwt) => {
  const jwt_client = getCookie("jwt") || jwt;
  try {
    let query;

    if(address.region?.region_id){
      query=`
      mutation {
        createCustomerAddress(input: {
          region: {
            region: "${address.region.region}"
            region_code: "${address.region.region_code}"
            region_id: "${address.region.region_id}"
          }
          country_code: ${address.country_code}
          company: "${address.company}"
          street: "${address.street}"
          telephone: "${address.telephone}"
          postcode: "${address.postcode}"
          city: "${address.city}"
          firstname: "${address.firstname}"
          lastname: "${address.lastname}"
          default_shipping: ${address.shipping}
          default_billing: ${address.billing}
        }) {
          id
          region {
            region
            region_code
            region_id
          }
          country_code
          company
          street
          telephone
          postcode
          city
          firstname
          lastname
          default_shipping
          default_billing
        }
      }
      
      `
    }
    else{
      query=`
      mutation {
        createCustomerAddress(input: {
          region: {
            region: "${address.region.region}"
            region_code: "${address.region.region_code}"
          }
          country_code: ${address.country_code}
          company: "${address.company}"
          street: "${address.street}"
          telephone: "${address.telephone}"
          postcode: "${address.postcode}"
          city: "${address.city}"
          firstname: "${address.firstname}"
          lastname: "${address.lastname}"
          default_shipping: ${address.shipping}
          default_billing: ${address.billing}
        }) {
          id
          region {
            region
            region_code
          }
          country_code
          company
          street
          telephone
          postcode
          city
          firstname
          lastname
          default_shipping
          default_billing
        }
      }
      
      `
    }

    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_client}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {status: "200", message: "Address Added Successfully", data: data};
    } else {
      if (data.errors) {
        return data.errors[0].message;
      } else {
        return data.message;
      }
    }
  } 
  catch (error) {
    return error;
  }
};

const updateAddress = async (id, address, jwt) => {
  const jwt_client = getCookie("jwt") || jwt;
  try {
    let query;

    if(address.region?.region_id){
      query=`
      mutation {
        updateCustomerAddress(id:${id}, input:{
          region: {
            region: "${address.region.region}"
            region_code: "${address.region.region_code}"
            region_id: "${address.region.region_id}"
          }
          country_code: ${address.country_code}
          company: "${address.company}"
          street: "${address.street}"
          telephone: "${address.telephone}"
          postcode: "${address.postcode}"
          city: "${address.city}"
          firstname: "${address.firstname}"
          lastname: "${address.lastname}"
          default_shipping: ${address.shipping}
          default_billing: ${address.billing}
        }) {
          id
          region {
            region
            region_code
            region_id
          }
          country_code
          company
          street
          telephone
          postcode
          city
          firstname
          lastname
          default_shipping
          default_billing
        }
      }
      
      
      `
    }
    else{
      query=`
      mutation {
        updateCustomerAddress(id:${id}, input:{
          region: {
            region: "${address.region.region}"
            region_code: "${address.region.region_code}"
          }
          country_code: ${address.country_code}
          company: "${address.company}"
          street: "${address.street}"
          telephone: "${address.telephone}"
          postcode: "${address.postcode}"
          city: "${address.city}"
          firstname: "${address.firstname}"
          lastname: "${address.lastname}"
          default_shipping: ${address.shipping}
          default_billing: ${address.billing}
        }) {
          id
          region {
            region
            region_code
          }
          country_code
          company
          street
          telephone
          postcode
          city
          firstname
          lastname
          default_shipping
          default_billing
        }
      }
      
      `
    }

    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_client}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {status: "200", message: "Address Updated Successfully", data: data};
    } else {
      if (data.errors) {
        return data.errors[0].message;
      } else {
        return data.message;
      }
    }
  } 
  catch (error) {
    return error;
  }
};

const deleteAddress = async (id, jwt) => {
  const jwt_client = getCookie("jwt") || jwt;
  try {
    let query=`
    mutation {
      deleteCustomerAddress(
        id: ${id}
      )
    }
      
      `

    const response = await fetch(getStrapiURL("/graphql"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_client}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {status: "200", message: "Address Deleted Successfully ", data: data};
    } else {
      if (data.errors) {
        return data.errors[0].message;
      } else {
        return data.message;
      }
    }
  } 
  catch (error) {
    return error;
  }
};

export default customer;
export { addAddress, updateAddress, deleteAddress };
