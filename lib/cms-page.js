import { getStrapiURL } from '@/utils';

const query = `
query getCmsPage($identifier: String!) {
  blocksData: blocks_data(identifiers: "bestsellers_magento_extensions")
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
  bestSellers: ProductsByRating(
    filter: { category_id: { eq: "36" } }
    fetch_type: "bestsellers"
    pageSize: 7
    currentPage: 1
  ) {
    total_count
    items {
      overall_average_rating
      id
      thumbnail {
        url
        label
      }
      name
      url_key
      short_description {
        html
      }
      price {
        regularPrice {
          amount {
            value
            currency
          }
        }
      }
      review_count
      reviews {
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
  latestProducts: ProductsByRating(
    filter: { category_id: { eq: "36" } }
    fetch_type: "new"
    pageSize: 3
    currentPage: 1
  ) {
    total_count
    items {
      overall_average_rating
      id
      thumbnail {
        url
        label
      }
      name
      url_key
      short_description {
        html
      }
      price {
        regularPrice {
          amount {
            value
            currency
          }
        }
      }
      review_count
      reviews {
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
`;


export async function fetchPageData(currency_code, store_code, identifier) {
  let updateHome = false;
  let pageJosnExists = false;
  try {
    const fs = require('fs');
    const path = require('path');

    const filePathPage = path.join(process.cwd(), 'json/page', `${identifier}_${store_code}_${currency_code}.json`);

    if (fs.existsSync(filePathPage)) {
      pageJosnExists = true;
    }

    try {
      const filePathTrigger = path.join(process.cwd(), 'json', `trigger.json`);
      const jsonData = fs.readFileSync(filePathTrigger, 'utf-8');
      const parsedData = JSON.parse(jsonData);
      updateHome = parsedData.updateHome;
    } catch (e) { console.log(e.message) }

    if (updateHome || !pageJosnExists) {
      const variables = { identifier };
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
      if(result?.data?.cmsPage){
        fs.writeFile(filePathPage, JSON.stringify(result), (err) => {});
      }

      return { ...result };
    } else {
      try {
        const jsonPageData = fs.readFileSync(filePathPage, 'utf-8');
        const parsedPageData = JSON.parse(jsonPageData);
        return { ...parsedPageData };
      } catch (e) { return null }

    }
  } catch (error) { }
}
