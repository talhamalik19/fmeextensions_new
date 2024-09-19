import { getStrapiURL } from '@/utils';
import { getCookie } from 'cookies-next';

const search = {};

const searchProduct = async (query, store_code = `default`) => {
  const selected_currency = getCookie('currency_code') || '';
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Currency': `${selected_currency}`,
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
        query {
         currency {
            base_currency_code
            base_currency_symbol
            default_display_currency_code
            default_display_currency_symbol
            available_currency_codes
            exchange_rates {
              currency_to
              rate
            }
          }
          blocks_data(identifiers : "product-search-page")
          products(${query}) {
            total_count
            items {
              overall_average_rating
              id
              name
              sku
              version
              demo_link
              backend
              frontend_demo1_title
              backend_demo_title
              frontend_demo2
              frontend_demo2_title
              frontend_demo3
              frontend_demo3_title
              frontend_demo4
              frontend_demo4_title
              frontend_demo5
              frontend_demo5_title
              review_count
              reviews_heading
              product_compatiblility
              enterprise
              sub_title
              faq_heading
              stock_status
              new_from_date
              new_to_date
              special_price
              special_from_date
              special_to_date
              combo_discount_value
              parallel_product
              extensions_included
              badge
              type
              related_products_heading
              categories{
                id
                name
                url_key
              }
              url_key
              __typename
              ... on CustomizableProductInterface {
                options {
                  title
                  required
                  sort_order
                  option_id
                  ... on CustomizableFieldOption {
                    product_sku
                    field_option: value {
                      sku
                      price
                      price_type
                      max_characters
                    }
                  }
                  ... on CustomizableAreaOption {
                    product_sku
                    area_option: value {
                      sku
                      price
                      price_type
                      max_characters
                    }
                  }
                  ... on CustomizableDateOption {
                    product_sku
                    date_option: value {
                      sku
                      price
                      price_type
                    }
                  }
                  ... on CustomizableDropDownOption {
                    drop_down_option: value {
                      option_type_id
                      sku
                      price
                      price_type
                      title
                      sort_order
                    }
                  }
                  ... on CustomizableRadioOption {
                    radio_option: value {
                      option_type_id
                      sku
                      price
                      price_type
                      title
                      sort_order
                    }
                  }
                  ... on CustomizableCheckboxOption {
                    checkbox_option: value {
                      option_type_id
                      sku
                      price
                      price_type
                      title
                      sort_order
                    }
                  }
                  ... on CustomizableMultipleOption {
                    multiple_option: value {
                      option_type_id
                      sku
                      price
                      price_type
                      title
                      sort_order
                    }
                  }
                  ... on CustomizableFileOption {
                    product_sku
                    file_option: value {
                      sku
                      price
                      price_type
                      file_extension
                      image_size_x
                      image_size_y
                    }
                  }
                }
              }
              short_description {
                html
              }
              m1_key_features
              description {
                html
              }
              attribute_set_id
              meta_title
              meta_keyword
              meta_description
              manufacturer
              color
              country_of_manufacture
              gift_message_available
              image {
                url
                label
              }
              small_image {
                url
                label
              }
              thumbnail {
                url
                label
              }
              swatch_image
              media_gallery {
                url
                label
                ... on ProductVideo {
                  video_content {
                    media_type
                    video_provider
                    video_url
                    video_title
                    video_description
                    video_metadata
                  }
                }
              }
              custom_gallery {
                url
                label
                position
                disabled
                image_description
                is_thumbnail
                resized_image
            }
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                  final_price {
                    value
                    currency
                  }
                  discount {
                    amount_off
                    percent_off
                  }
                }
                maximum_price {
                  regular_price {
                    value
                    currency
                  }
                  final_price {
                    value
                    currency
                  }
                  discount {
                    amount_off
                    percent_off
                  }
                }
              }
              price_tiers {
                quantity
                final_price {
                  value
                  currency
                }
              }
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
              ... on DownloadableProduct {
                links_title
                links_purchased_separately
                downloadable_product_links {
                  id
                  sample_url
                  sort_order
                  title
                  price
                }
                downloadable_product_samples {
                  id
                  title
                  sort_order
                  sample_url
                }
              }
              reviews (pageSize: 50000, currentPage: 1) {
                items {
                  average_rating
                  summary
                  text
                  created_at
                  nickname
                  ratings_breakdown {
                    name
                    value
                  }
                }
              }
              related_products {
                id
                name
                sku
                badge
                type
                review_count
                url_key
                image {
                  url
                  label
                }
                small_image {
                  url
                  label
                }
                price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
                reviews (pageSize: 50000, currentPage: 1) {
                  items {
                  average_rating
                  summary
                  text
                  created_at
                  nickname
                  ratings_breakdown {
                    name
                    value
                  }
                }
                }
              }
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

const headerSearchProduct = async (query, store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`,
      },
      body: JSON.stringify({
        query: `
        query {
          products(${query}) {
            items {
              id
              name
              sku
              url_key
              meta_title
              meta_keyword
              meta_description
              image {
                url
                label
              }
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
    return { error: 'An error occurred while fetching search results' };
  }
};

const headerBlogSearch = async (query, store_code = `default`) => {
  const selected_store = getCookie('store_code') || store_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`,
      },
      body: JSON.stringify({
        query: `
        {
          blog(pageSize: 10, filter: { search_term: "${query}" }) {
            blogs_media_url
            blogs_data {
              title
              image
              identifier
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
    return { error: 'An error occurred while fetching search results' };
  }
};

const categorySearchWithCmsBlock = async (slug, store_code = `default`) => {
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
          categoryList(filters: { url_path: { eq: "${slug.join('/')}" } }) {
             id
             url_key
             meta_title
              meta_keywords
              meta_description
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

const getCategoriesById = async (id, store_code = `default`) => {
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
          blocks_data(identifiers : "support-menu,service-menu")
          category(id:"${id}") {
            id
            level
            name
            url_path
            include_in_menu
            product_count
            landing_page
            products {
              items {
                id
                name
                sku
                featured
                url_key
                short_description{
                  html
                }
                thumbnail {
                  url
                  label
                }
                product_label_topmenu
                price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
              }
            }
            children {
              id
              level
              name
              url_path
              include_in_menu
              product_count
              landing_page
              products {
                items {
                  id
                  name
                  sku
                  featured
                  url_key
                  thumbnail {
                    url
                    label
                  }
                  product_label_topmenu
                  price {
                    regularPrice {
                      amount {
                        value
                        currency
                      }
                    }
                  }
                }
              }
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

const getCategoriesByParentId = async (id, store_code = `default`) => {
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
          blocks_data(identifiers : "support-menu,service-menu")
          categories(
          filters: {
            parent_id: { in: ["${id}"]}
          }
          ) {
            total_count
            items {
              id
              level
              name
              url_path
              include_in_menu
              product_count
              landing_page
              products {
                items {
                  id
                  name
                  sku
                  featured
                  url_key
                  short_description {
                    html
                  }
                  small_image {
                    url
                    label
                  }
                  product_label_topmenu
                  price {
                    regularPrice {
                      amount {
                        value
                        currency
                      }
                    }
                  }
                }
              }
              children {
                id
                level
                name
                url_path
                include_in_menu
                product_count
                landing_page
                products {
                  items {
                    id
                    name
                    sku
                    featured
                    url_key
                    small_image {
                      url
                      label
                    }
                    product_label_topmenu
                    price {
                      regularPrice {
                        amount {
                          value
                          currency
                        }
                      }
                    }
                  }
                }
              }
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


const getAllCategories = async (store_code = `default`) => {
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
          blocks_data(identifiers : "footer-newsletter,footer,footer-bottom,best-sellers")
            
          currency {
            base_currency_code
            base_currency_symbol
            default_display_currency_code
            default_display_currency_symbol
            available_currency_codes
            exchange_rates {
              currency_to
              rate
            }
          }
          categoryList(filters: {}) {
            id
            level
            name
            url_path
            include_in_menu
            display_mode
            landing_page
            product_count
            is_anchor
            children {
              id
              level
              name
              url_path
              include_in_menu
              is_anchor
              display_mode
              landing_page
              product_count
              children {
                  id
                  level
                  name
                  url_path
                  include_in_menu
                  is_anchor
                  display_mode
                  landing_page
                  product_count
                }
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

const verifySlug = async (slug, query, store_code = `default`, currency_code = ``) => {
  const selected_store = getCookie('store_code') || store_code;
  const selected_currency = getCookie('currency_code') || currency_code;
  try {
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`,
        'Content-Currency': `${selected_currency}`,
      },
      body: JSON.stringify({
        query: `
        {
          cmsBlocks(identifiers: ["homepage-categories"]) {
            items {
              identifier
              title
              content
              blocks_data
            }
          }
          cmsPage(identifier: "${slug.join('/')}") {
            identifier
            url_key
            title
            content
            blocks_data
            content_heading
            page_layout
            meta_title
            meta_description
            meta_keywords
          }
          products(${query}) {
            items {
              id
              name
              sku
              version
              demo_link
              backend
              frontend_demo1_title
              backend_demo_title
              frontend_demo2
              frontend_demo2_title
              frontend_demo3
              frontend_demo3_title
              frontend_demo4
              frontend_demo4_title
              frontend_demo5
              frontend_demo5_title
              review_count
              reviews_heading
              product_compatiblility
              enterprise
              sub_title
              gallery_title
              gallery_description
              faq_heading
              stock_status
              new_from_date
              new_to_date
              special_price
              special_from_date
              special_to_date
              combo_discount_value
              parallel_product
              extensions_included
              badge
              type
              related_products_heading
              is_service
              categories{
                id
                url_key
              }
              url_key
              __typename
              ... on CustomizableProductInterface {
                options {
                  title
                  required
                  sort_order
                  option_id
                  ... on CustomizableFieldOption {
                    product_sku
                    field_option: value {
                      sku
                      price
                      price_type
                      max_characters
                    }
                  }
                  ... on CustomizableAreaOption {
                    product_sku
                    area_option: value {
                      sku
                      price
                      price_type
                      max_characters
                    }
                  }
                  ... on CustomizableDateOption {
                    product_sku
                    date_option: value {
                      sku
                      price
                      price_type
                    }
                  }
                  ... on CustomizableDropDownOption {
                    drop_down_option: value {
                      option_type_id
                      sku
                      price
                      price_type
                      title
                      sort_order
                    }
                  }
                  ... on CustomizableRadioOption {
                    radio_option: value {
                      option_type_id
                      sku
                      price
                      price_type
                      title
                      sort_order
                    }
                  }
                  ... on CustomizableCheckboxOption {
                    checkbox_option: value {
                      option_type_id
                      sku
                      price
                      price_type
                      title
                      sort_order
                    }
                  }
                  ... on CustomizableMultipleOption {
                    multiple_option: value {
                      option_type_id
                      sku
                      price
                      price_type
                      title
                      sort_order
                    }
                  }
                  ... on CustomizableFileOption {
                    product_sku
                    file_option: value {
                      sku
                      price
                      price_type
                      file_extension
                      image_size_x
                      image_size_y
                    }
                  }
                }
              }
              short_description {
                html
              }
              m1_key_features
              description {
                html
              }
              attribute_set_id
              meta_title
              meta_keyword
              meta_description
              manufacturer
              custom_canonical
              color
              country_of_manufacture
              gift_message_available
              image {
                url
                label
              }
              small_image {
                url
                label
              }
              thumbnail {
                url
                label
              }
              swatch_image
              custom_gallery {
                url
                label
                position
                disabled
                image_description
                is_thumbnail
                resized_image
            }
              media_gallery {
                disabled
                url
                label
                ... on ProductVideo {
                  video_content {
                    media_type
                    video_provider
                    video_url
                    video_title
                    video_description
                    video_metadata
                  }
                }
              }
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                  final_price {
                    value
                    currency
                  }
                  discount {
                    amount_off
                    percent_off
                  }
                }
                maximum_price {
                  regular_price {
                    value
                    currency
                  }
                  final_price {
                    value
                    currency
                  }
                  discount {
                    amount_off
                    percent_off
                  }
                }
              }
              price_tiers {
                quantity
                final_price {
                  value
                  currency
                }
              }
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
              ... on DownloadableProduct {
                links_title
                links_purchased_separately
                downloadable_product_links {
                  id
                  sample_url
                  sort_order
                  title
                  price
                }
                downloadable_product_samples {
                  id
                  title
                  sort_order
                  sample_url
                }
              }
              reviews (pageSize: 50000, currentPage: 1) {
                items {
                  average_rating
                  summary
                  text
                  created_at
                  nickname
                  ratings_breakdown {
                    name
                    value
                  }
                }
              }
              related_products {
                id
                name
                sku
                badge
                type
                review_count
                url_key
                image {
                  url
                  label
                }
                small_image {
                  url
                  label
                }
                price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
                reviews (pageSize: 50000, currentPage: 1) {
                  items {
                    average_rating
                    summary
                    text
                    created_at
                    nickname
                    ratings_breakdown {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
          categoryList(filters: { url_path: { eq: "${slug.join('/')}" } }) {
             id
             url_key
             url_path
             description
             display_mode
             meta_title
              meta_keywords
              meta_description
          }
            bestSellerProductDetail(url_key:"${slug.join('/')}") {
             id
             name
             sku
             url_key
             price
             buy_now
             currency
             image
             review {
                 percentage
                 filled_stars
                 reviews_count
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

export { searchProduct, headerSearchProduct, categorySearchWithCmsBlock, getCategoriesById, getAllCategories, verifySlug, getCategoriesByParentId, headerBlogSearch };

export default search;
