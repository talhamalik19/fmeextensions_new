import dlv from "dlv";
import Layout from "../components/layout";
import BlockManager from "../components/shared/BlockManager";
import { handleRedirection, getStrapiURL } from "../utils";
import { getCookie } from 'cookies-next';

async function getPageData() {
  try {
    const selected_store = getCookie('store_code') || 'default';
    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Store': `${selected_store}`
      },
      body: JSON.stringify({
        query: `
          query {
            blocks_data(identifiers : "support-menu,service-menu,main-header,best-sellers")
          }
        `,
        variables: {},
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

const getComponents = (pageData, isProductPage, productBasicInfo, slug, bestSellerProducts, update, configuration_id, MobileDevice) => {
  let components = [];

  if (dlv(pageData, 'blocks_data')) {
    try {
      components = JSON.parse(dlv(pageData, 'blocks_data'));
    } catch (e) {
      console.error("Error parsing blocks_data:", e);
    }
  }

  if (!dlv(pageData, 'content')) {
    if (isProductPage) {
      components = getProductPageComponents(productBasicInfo, update, configuration_id, MobileDevice);
    } else {
      components = getCategoryPageComponents(slug, bestSellerProducts);
    }
  }

  return components;
};

const getProductPageComponents = (productBasicInfo, update, configuration_id, MobileDevice) => {
  if (dlv(productBasicInfo, 'is_service')) {
    return [{
      __component: 'blocks-services-detail',
      pageName: 'Magento 2 Speed Optimization',
      product: productBasicInfo,
    }];
  }

  return [{
    __component: 'blocks-product-detail',
    pageName: 'product_detail',
    isDescriptionEnabled: true,
    product: productBasicInfo,
    update,
    configuration_id
  },
  {
    __component: 'blocks-product-features',
    pageName: 'product detail',
    product: productBasicInfo,
  }];
};

const getCategoryPageComponents = (slug, bestSellerProducts) => {
  try {
    if (slug.join('/') === 'magento-services') {
      return [
        { __component: 'blocks-page-header' },
        { __component: 'blocks-services' }
      ];
    }
  } catch (error) { }

  return [
    { __component: 'blocks-highlighted-products', bestSellerProducts },
    { __component: 'blocks-prod-listing' }
  ];
};

const Universals = ({ globalMagento, pageData, isProductPage, slug, category_id, user, setUser, productBasicInfo, jwt, currencyData, storeData, selectedCurrency, selectedStore, update, configuration_id, footer, bestSellerProducts, MobileDevice, sarabun }) => {
  const components = getComponents(pageData, isProductPage, productBasicInfo, slug, bestSellerProducts, update, configuration_id, MobileDevice);

  const blocks = components.map(component => ({
    ...component,
    selectedCurrency,
    footer,
    selectedStore,
    storeData,
    productBasicInfo,
    user,
    jwt,
    globalMagento,
    slug,
    category_id,
    setUser,
    pageData,
    getPageData,
    MobileDevice
  }));

  return (
    <Layout globalMagento={globalMagento} user={user} setUser={setUser} pageData={pageData} currencyData={currencyData} storeData={storeData} selectedCurrency={selectedCurrency} selectedStore={selectedStore} footer={footer} getPageData={getPageData} MobileDevice={MobileDevice} sarabun={sarabun} >
      <section>
        <BlockManager blocks={blocks} MobileDevice={MobileDevice} sarabun={sarabun} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    const { slug, update, configuration_id } = context.query;
    const locale = context.locale;

    if (slug.some((url) => url.includes('undefined') || url.includes('.png') || url.includes('.jpg') || url.includes('.webp'))) {
      return { props: { error: 'slug not found' } };
    }

    const pageSlug = slug === '' ? 'home' : slug;
    const cookies = context.req.cookies;
    const selectedCurrency = cookies.currency_code || 'USD';
    const newCookieValue = locale !== 'en' ? locale : 'default';

    const verify_slug = await fetchVerifySlug(pageSlug, selectedCurrency, newCookieValue);

    if (!verify_slug) {
      return handleRedirection(context.preview, null);
    }

    const { pagesData, isProductPage, product, category_id, categoryDisplayMode } = processVerifySlugData(verify_slug);

    const blocksData = JSON.parse(dlv(verify_slug, 'data.cmsBlocks.items.0.blocks_data', []));
    const { globalMagento, footerData, storeCurrency } = processBlocksData(blocksData, verify_slug);

    return {
      props: {
        isProductPage,
        pageData: pagesData?.data?.cmsPage || null,
        preview: context.preview || null,
        slug,
        category_id: category_id || null,
        productBasicInfo: product || null,
        update: update || null,
        configuration_id: configuration_id || null,
        categoryDisplayMode,
        globalMagento,
        storeData: storeCurrency,
        currencyData: storeCurrency.data.currency,
        bestSellerProducts: verify_slug.data.bestSellerProductDetail
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { pageData: null, error: error.message } };
  }
}

async function fetchVerifySlug(pageSlug, selectedCurrency, newCookieValue) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com'}/api/verify_slug`, {
      method: 'GET',
      headers: {
        'Content-Currency': `${selectedCurrency}`,
        'Store': `${newCookieValue}__${pageSlug}__false`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching verify_slug:", error);
    return null;
  }
}

function processVerifySlugData(verify_slug) {
  let pagesData = null;
  let isProductPage = false;
  let product = null;
  let category_id = null;
  let categoryDisplayMode = '';

  if (verify_slug?.data?.cmsPage) {
    pagesData = verify_slug;
  } else if (verify_slug?.data?.products?.items?.length) {
    pagesData = {
      data: {
        cmsPage: {
          meta_title: verify_slug.data.products.items[0].meta_title,
          meta_description: verify_slug.data.products.items[0].meta_description,
          url_key: verify_slug.data.products.items[0].url_key,
          custom_canonical: verify_slug.data.products.items[0].custom_canonical,
        }
      }
    };
    product = { ...verify_slug.data.products.items[0], ...verify_slug?.data?.currency };
    isProductPage = true;
  } else if (verify_slug?.data?.categoryList?.length) {
    pagesData = {
      data: {
        cmsPage: {
          meta_title: verify_slug.data.categoryList[0].meta_title,
          meta_description: verify_slug.data.categoryList[0].meta_description,
          url_key: verify_slug.data.categoryList[0].url_path,
          description: verify_slug.data.categoryList[0].description,
        }
      }
    };
    category_id = verify_slug?.data?.categoryList[0]?.id;
    categoryDisplayMode = verify_slug?.data?.categoryList[0]?.display_mode;
  }

  return { pagesData, isProductPage, product, category_id, categoryDisplayMode };
}

function processBlocksData(blocksData, verify_slug) {
  const storeCurrency = JSON.parse(dlv(blocksData, '0.store_currency'));
  const footerNewsLetter = dlv(blocksData, '1');
  const footer = dlv(blocksData, '2');
  const footerBootom = dlv(blocksData, '3');
  const bestSellersBlock = dlv(blocksData, '4');
  const footerData = { footerNewsLetter, footer, footerBootom, bestSellersBlock };
  const globalMagento = { children: JSON.parse(verify_slug.data.cmsBlocks.items[0].content), footerData };

  return { globalMagento, footerData, storeCurrency };
}

export default Universals;