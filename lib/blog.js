import { getStrapiURL } from '@/utils';

const blogQuery = `
{
  categories {
    category_id
    category_name
    category_url_key
    is_active
  }
  author {
    author_id
    name
    short_description
    image
    urlkey
    social_links {
      facebook_profile
      instagram_profile
      tiktok_profile
      linkedin_profile
      twitter_profile
      youtube_profile
    }
  }
  articles_id
  article_publish_date
  article_meta_title
  article_meta_description
  title
  featured
  identifier
  artilce_short_summary
  image
  thumbnail
  articlesdetail
  related_products
  article_layout
}
`;

const query = `
query cmsBlocks($identifier: Int!) {
  blocks_data: blocks_data(identifiers: "blog")
  cmsBlocks(identifiers: ["homepage-categories"]) {
    items {
      identifier
      title
      content
      blocks_data
    }
  }
  blogcategories: blogcategories(pageSize: 100, currentPage: 1) {
    category_id
    category_name
    url_key
    status
    blogs_count
  }
  blog: blog(pageSize: 10, currentPage: $identifier) {
    blogs_media_url
    blogs_count
    blogs_data ${blogQuery}
  }
}
`;

const querySlug = `
query cmsBlocks($identifier: String!) {
  blocks_data: blocks_data(identifiers: "blog,block-blog-created")
  cmsBlocks(identifiers: ["homepage-categories"]) {
    items {
      identifier
      title
      content
      blocks_data
    }
  }
  blogcategories: blogcategories(filter: {url_key: $identifier}, pageSize: 100, currentPage: 1, blogpageSize: 10, blogcurrentPage: 1) {
    category_id
    category_name
    url_key
    status
    blogs_count
    meta_keywords
    meta_description
    blogs_media_url
    blogs ${blogQuery}
  }
  blog: blog(filter: {identifier: $identifier}, pageSize: 1, currentPage: 1) {
    blogs_media_url
    blogs_count
    blogs_data ${blogQuery}
  }
}
`;


export async function fetchBlogData(currency_code, store_code, update = false) {
  let updateHome = update;
  let blogJsonExists = false;
  try {
    const fs = require('fs');
    const path = require('path');

    const filePathBlog = path.join(process.cwd(), 'json/page', `blog_${store_code}.json`);

    if (fs.existsSync(filePathBlog)) {
      blogJsonExists = true;
    }

    try {
      const filePathTrigger = path.join(process.cwd(), 'json', `trigger.json`);
      const jsonData = fs.readFileSync(filePathTrigger, 'utf-8');
      const parsedData = JSON.parse(jsonData);
      updateHome = parsedData.updateHome;
    } catch (e) { }

    if(update){
      updateHome = true;
    }

    if (updateHome || !blogJsonExists) {
      const variables = { identifier: 1 };
      let requestQuery = query;

      const response = await fetch(getStrapiURL('/graphql'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Store': store_code,
        },
        body: JSON.stringify({
          query: requestQuery,
          variables,
        }),
      });

      const result = await response.json();
      if (result?.data?.blog?.blogs_data?.length > 0) {
        fs.writeFile(filePathBlog, JSON.stringify(result), (err) => { });
      }

      return { ...result };
    } else {
      try {
        const jsonBlogData = fs.readFileSync(filePathBlog, 'utf-8');
        const parsedBlogData = JSON.parse(jsonBlogData);
        return { ...parsedBlogData };
      } catch (e) { return null }

    }
  } catch (error) { }
}

export async function fetchBlogSlugData(currency_code, store_code, identifier, update = false) {
  let updateHome = update;
  let blogJsonExists = false;
  try {
    const fs = require('fs');
    const path = require('path');

    const filePathBlog = path.join(process.cwd(), 'json/page', `blog_${identifier}_${store_code}.json`);

    if (fs.existsSync(filePathBlog)) {
      blogJsonExists = true;
    }

    try {
      const filePathTrigger = path.join(process.cwd(), 'json', `trigger.json`);
      const jsonData = fs.readFileSync(filePathTrigger, 'utf-8');
      const parsedData = JSON.parse(jsonData);
      updateHome = parsedData.updateHome;
    } catch (e) { }

    if(update){
      updateHome = true;
    }

    if (updateHome || !blogJsonExists) {
      const variables = { identifier: identifier };
      let requestQuery = querySlug;

      const response = await fetch(getStrapiURL('/graphql'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Store': store_code,
        },
        body: JSON.stringify({
          query: requestQuery,
          variables,
        }),
      });

      const result = await response.json();
      if (result?.data?.blogcategories?.length > 0) {
        fs.writeFile(filePathBlog, JSON.stringify(result), (err) => { });
      }
      if (result?.data?.blog?.blogs_data.length > 0) {
        fs.writeFile(filePathBlog, JSON.stringify(result), (err) => { });
      }

      return { ...result };
    } else {
      try {
        const jsonBlogData = fs.readFileSync(filePathBlog, 'utf-8');
        const parsedBlogData = JSON.parse(jsonBlogData);
        return { ...parsedBlogData };
      } catch (e) { return null }

    }
  } catch (error) { }
}