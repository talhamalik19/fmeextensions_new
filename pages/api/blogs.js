
const { getStrapiURL } = require("@/utils");
const { getCookie } = require("cookies-next");

const blogs = {};

const getCategory = async (url_key=null, store_code = ``) => {
    let filter = ``;
    if(url_key){
        filter = `url_key: "${url_key}"`;
    }
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
            query {
              blogcategories(
                filter: {${filter}},
                pageSize:100,
                currentPage:1
                blogpageSize:4,
                blogcurrentPage:1,
              ) {
                  category_id
                  category_name
                  creation_time
                  blogs_media_url
                  meta_description
                  meta_keywords
                  status
                  url_key
                  blogs{
                    articles_id
                    title
                    featured
                    identifier
                    articlesdetail
                    artilce_short_summary
                    image
                    creation_time
                    article_layout
                }
              }
            }
          `, variables: {},
            }),
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            data = await response.json();
            return data;
        }
    } catch (error) { }
};

const getCategoryWithBlogs = async (category_id=null, currentPage, store_code = `default`) => {
    let filter = ``;
    if(category_id){
        filter = `category_id: "${category_id}"`;
    }
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
            query {
              blogcategories(
                filter: {${filter}}
                blogpageSize:10,
                blogcurrentPage:${currentPage},
              ) {
                  category_id
                  category_name
                  creation_time
                  blogs_media_url
                  meta_description
                  meta_keywords
                  url_key
                  blogs_count
                  blogs{
                    categories{
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
                    title
                    featured
                    identifier
                    articlesdetail
                    artilce_short_summary
                    image
                    thumbnail
                    creation_time
                    article_layout
                }
              }
            }
          `, variables: {},
            }),
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            data = await response.json();
            return data;
        }
    } catch (error) { }
};

const getBlog = async (query, currentPage, store_code = 'default', featured=false) => {
    let filter = ``;
    if(query){
        if(featured){
            filter = `
            featured: true
            identifier: "${query}"
            `;
        }
        else{
            filter = `identifier: "${query}"`;
        }
    }
    const selected_store = getCookie('store_code') || store_code;
    try{
        const response = await fetch(getStrapiURL("/graphql"),{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
                'Store' : `${selected_store}`
            },
            body:JSON.stringify({
                query:`
                    query{
                        blocks_data(identifiers : "blocks-blog-banner,blog")
                        cmsBlocks(identifiers: ["homepage-categories"]) { items { identifier title content blocks_data }}
                        blog(
                        filter: {${filter}}
                        pageSize:5,
                        currentPage: ${currentPage}
                        ) {
                            blogs_media_url
                            blogs_data {
                                categories{
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
                            identifier
                            articlesdetail,
                            related_products
                            article_layout
                            }
                        }
                    }
                `, variable: {},
            }),
        });
        if(response.status === 200){
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {}
}


const getRelatedBlog = async (query, store_code = 'default') => {
    let filter = ``;
    if(query){
        filter = `identifier: "${query}"`;
    }
    const selected_store = getCookie('store_code') || store_code;
    try{
        const response = await fetch(getStrapiURL("/graphql"),{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
                'Store' : `${selected_store}`
            },
            body:JSON.stringify({
                query:`
                    query{
                        relatedArticles(filter: {${filter}}) {
                          blogs_media_url
                          blogs_data {
                            articles_id
                            title
                            identifier
                            article_publish_date
                            image
                            artilce_short_summary
                            articlesdetail
                          }
                        }
                    }
                `, variable: {},
            }),
        });
        if(response.status === 200){
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {}
}

const getCategoriesBlogs = async (currentPage, store_code = 'default') => {

    const selected_store = getCookie('store_code') || store_code;
    try{
        const response = await fetch(getStrapiURL("/graphql"),{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
                'Store' : `${selected_store}`
            },
            body:JSON.stringify({
                query:`
                    query{
                        blocks_data(identifiers : "blocks-blog-banner,blog")
                        cmsBlocks(identifiers: ["homepage-categories"]) { items { identifier title content blocks_data }}
                        blogcategories(
                            filter: {featured:true},
                            pageSize:100,
                            currentPage:1
                            blogpageSize:4,
                            blogcurrentPage:1,
                          ) {
                              category_id
                              category_name
                              creation_time
                              blogs_media_url
                              meta_description
                              meta_keywords
                              url_key
                              status
                              blogs{
                                categories{
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
                                title
                                featured
                                articlesdetail
                                identifier
                                artilce_short_summary
                                image
                                creation_time
                                article_layout
                            }
                          }
                        blog(
                            filter: {featured:false}
                        pageSize:3,
                        currentPage: ${currentPage}
                        ) {
                            
                            blogs_media_url
                            blogs_data {
                                categories{
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
                            identifier
                            articlesdetail,
                            related_products
                            article_layout
                            }
                        }
                    }
                `, variable: {},
            }),
        });
        if(response.status === 200){
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {}
}

const getSearchBlogs = async (filter, currentPage, store_code = 'default') => {
    const selected_store = getCookie('store_code') || store_code;
    try{
        const response = await fetch(getStrapiURL("/graphql"),{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
                'Store' : `${selected_store}`
            },
            body:JSON.stringify({
                query:`
                    query{
                        blocks_data(identifiers : "blocks-blog-banner,blog")
                        cmsBlocks(identifiers: ["homepage-categories"]) { items { identifier title content blocks_data }}
                        blog(
                        filter: {${filter}}
                        pageSize:1000,
                        currentPage: ${currentPage}
                        ) {
                            blogs_media_url
                            blogs_data {
                                categories{
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
                            identifier
                            articlesdetail,
                            related_products
                            article_layout
                            }
                        }
                    }
                `, variable: {},
            }),
        });
        if(response.status === 200){
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {}
}

export { getCategory, getBlog, getRelatedBlog, getCategoryWithBlogs, getCategoriesBlogs, getSearchBlogs };

export default blogs;