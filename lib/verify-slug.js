import { getStrapiURL } from '@/utils';

const query = `
query getCmsPage($identifier: String!) {
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
  cmsBlocks: cmsBlocks(identifiers: ["homepage-categories"]) {
    items {
      identifier
      title
      content
      blocks_data
    }
  }
  cmsPage(identifier: $identifier) {
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
  categoryList: categoryList(filters: { url_path: { eq: $identifier } }) {
    id
    url_key
    url_path
    description
    display_mode
    meta_title
    meta_keywords
    meta_description
  }
  bestSellerProductDetail: bestSellerProductDetail(url_key: $identifier, pageSize: 3) {
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
  products: products(filter: { url_key: { eq: $identifier } }) {
    items {
      id
      overall_average_rating
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
      categories {
        id
        url_key
        level
        name
      }
      url_key
      __typename
      ... on CustomizableProductInterface {
        options {
          title
          required
          sort_order
          option_id
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
        }
      }
      short_description {
        html
      }
      m1_key_features
      description {
        html
      }
      meta_title
      meta_keyword
      meta_description
      custom_canonical
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
      custom_gallery {
        url
        label
        position
        disabled
        image_description
        is_thumbnail
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
          }
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
      reviews(pageSize: 5000, currentPage: 1) {
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
        overall_average_rating
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
        thumbnail {
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
        reviews(pageSize: 5000, currentPage: 1) {
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
      upsell_products {
        id
        name
        overall_average_rating
        sku
        badge
        type
        is_service
        review_count
        url_key
        special_price
        categories {
          id
          url_key
          level
          name
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
        product_listing_description
        ... on CustomizableProductInterface {
          options {
            title
            required
            sort_order
            option_id
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
          }
        }
        short_description {
          html
        }
        description {
          html
        }

        image {
          url
          label
        }
        thumbnail {
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
        reviews(pageSize: 5000, currentPage: 1) {
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
`;


export async function fetchSlugData(currency_code, store_code, identifier, update = false) {
  const pageSlug = identifier.split(',');
  let updateHome = update;
  let fileExists = false;
  let currencyData = {}
  try {
    const fs = require('fs');
    const path = require('path');

    const filePathPage = path.join(process.cwd(), 'json/page', `${pageSlug.join('_')}_${store_code}_${currency_code}.json`);
    const filePathCategory = path.join(process.cwd(), 'json/category', `${pageSlug.join('_')}_${store_code}_${currency_code}.json`);
    const filePathProduct = path.join(process.cwd(), 'json/product', `${pageSlug.join('_')}_${store_code}_${currency_code}.json`);
    const filePathCurrency = path.join(process.cwd(), 'json/product', `currency_data.json`);

    if (fs.existsSync(filePathPage)) {
      fileExists = true;
    }
    if (fs.existsSync(filePathProduct)) {
      fileExists = true;
    }
    if (fs.existsSync(filePathCategory)) {
      fileExists = true;
    }

    try {
      const filePathTrigger = path.join(process.cwd(), 'json', `trigger.json`);
      const jsonData = fs.readFileSync(filePathTrigger, 'utf-8');
      const parsedData = JSON.parse(jsonData);
      updateHome = parsedData.updateHome;
    } catch (e) { }

    try {
      const jsonData = fs.readFileSync(filePathCurrency, 'utf-8');
      const parsedData = JSON.parse(jsonData);
      currencyData = parsedData
    } catch (e) { }
    if(update){
      updateHome = true;
    }

    if (updateHome || !fileExists) {
      const variables = { identifier: pageSlug.join('/') };
      let requestQuery = query;

      const response = await fetch(getStrapiURL('/graphql'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Currency': currency_code,
          'Store': store_code,
        },
        body: JSON.stringify({
          query: requestQuery,
          variables,
        }),
      });

      const result = await response.json();
      if(result){
        fs.writeFile(filePathCurrency, JSON.stringify({ currency:result?.data?.currency }), (err) => {});
      }
      if (result?.data?.cmsPage?.url_key) {
        fs.writeFile(filePathPage, JSON.stringify({ cmsPage: result?.data?.cmsPage, cmsBlocks: result?.data?.cmsBlocks }), (err) => { });
      }
      if (result?.data?.categoryList?.length > 0) {
        fs.writeFile(filePathCategory, JSON.stringify({ categoryList: result?.data?.categoryList, bestSellerProductDetail: result?.data?.bestSellerProductDetail, cmsBlocks: result?.data?.cmsBlocks }), (err) => { });
      }
      if (result?.data?.products?.items?.length > 0) {
        fs.writeFile(filePathProduct, JSON.stringify({ products: result?.data?.products, cmsBlocks: result?.data?.cmsBlocks }), (err) => { });
      }

      return { ...result };
    } else {
      try {
        let data = null;
        if (fs.existsSync(filePathPage)) {
          const jsonPageData = fs.readFileSync(filePathPage, 'utf-8');
          const parsedPageData = JSON.parse(jsonPageData);
          data = { data: { cmsBlocks:parsedPageData?.cmsBlocks, cmsPage: parsedPageData?.cmsPage, categoryList: [], bestSellerProductDetail: [], products: [] } }
        }
        if (fs.existsSync(filePathProduct)) {
          const jsonProductData = fs.readFileSync(filePathProduct, 'utf-8');
          const parsedProductData = JSON.parse(jsonProductData);
          data = { data: { cmsBlocks:parsedProductData?.cmsBlocks, cmsPage: null, categoryList: [], bestSellerProductDetail: [], products: parsedProductData?.products, ...currencyData } }
        }
        if (fs.existsSync(filePathCategory)) {
          const jsonCategoryData = fs.readFileSync(filePathCategory, 'utf-8');
          const parsedCategoryData = JSON.parse(jsonCategoryData);
          data = { data: { cmsBlocks:parsedCategoryData?.cmsBlocks, cmsPage: null, categoryList: parsedCategoryData?.categoryList, bestSellerProductDetail: parsedCategoryData?.bestSellerProductDetail, products: [] } }
        }

        return data;
      } catch (e) { }

    }
  } catch (error) { }
}
