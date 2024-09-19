import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';

const page = {};

const cmsPage = async (id, store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL(`/graphql?query={ cmsBlocks(identifiers: ["homepage-categories"]) { items { identifier title content blocks_data } } cmsPage(identifier: "${id}") { identifier url_key title content blocks_data content_heading page_layout meta_title meta_description meta_keywords } }
    `), {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`,
        'X-Magento-Cache-Debug': 'HIT',
        'X-Magento-Cache-Control': 'max-age=86400',
        'Cookie': 'PHPSESSID=mpg78eaa7jl1p220c4fo8h2705; mage-messages=%5B%7B%22type%22%3A%22error%22%2C%22text%22%3A%22Invalid%20Form%20Key.%20Please%20refresh%20the%20page.%22%7D%5D; private_content_version=6a5620348ee93d992f88840b6d7f9a14',
      }
    });


    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return data.message
    }
  } catch (error) { console.log(error) }
};

const cmsBlockCategories = async (store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL(`/graphql?query={ cmsBlocks(identifiers: ["homepage-categories"]) { items { identifier title content, blocks_data } } }
    `), {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`,
        'X-Magento-Cache-Debug': 'HIT',
        'X-Magento-Cache-Control': 'max-age=86400',
        'Cookie': 'PHPSESSID=mpg78eaa7jl1p220c4fo8h2705; mage-messages=%5B%7B%22type%22%3A%22error%22%2C%22text%22%3A%22Invalid%20Form%20Key.%20Please%20refresh%20the%20page.%22%7D%5D; private_content_version=6a5620348ee93d992f88840b6d7f9a14',
      }
    });


    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return data.message
    }
  } catch (error) { console.log(error) }
};

const cmsBlock = async (id, store_code = `default`) => {
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
        {
          cmsBlocks(identifiers: ${id}) {
            items {
              identifier
              title
              content
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

const customBlocks = async (id, store_code = `default`) => {
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
          blocks_data(identifiers : "${id}")
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

const getBanners = async (id, store_code = `default`) => {
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
        {
          custom_banners (identifier: ${id}){
            id
            banner_identifier
            banner_title
            banner_sub_title
            banner_buttons{
              text
              url
              target
            }
            banner_short_desc
            banner_long_desc
            banner_image_url
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

export { cmsPage, cmsBlock, customBlocks, getBanners, cmsBlockCategories };

export default page;
