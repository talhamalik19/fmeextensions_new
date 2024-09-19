import dlv from "dlv";
import Layout from "../components/layout";
import BlockManager from "../components/shared/BlockManager";
import { getLocalizedParams } from "../utils/localize";
import { cmsPage } from "./api/page";
import OrganizationSchema from "@/components/schema/Organization";
import { getStrapiURL } from "@/utils";
import { getCookie } from 'cookies-next';

async function getPageData() {
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
            blocks_data(identifiers : "support-menu,service-menu,main-header")
            }
          `,
            variables: {},
        }
        ),
    });

    return response.json();
}

const Universals = ({ globalMagento, pageData, slug, category_id, user, setUser, jwt, currencyData, storeData, selectedCurrency, selectedStore, footer, bestSellerProducts, isMobile, MobileDevice, currency_symbol, sarabun }) => {
    let components = [];

    if (dlv(pageData, 'blocks_data')) {
        try {
            components = JSON.parse(dlv(pageData, 'blocks_data'));
        } catch (e) { }
    }

    const blocks = components.map(component => ({
        ...component,
        footer: footer,
        bestSellerProducts: bestSellerProducts,
        selectedCurrency: selectedCurrency,
        selectedStore: selectedStore,
        storeData: storeData,
        user: user,
        jwt: jwt,
        globalMagento: globalMagento,
        slug: slug,
        category_id: category_id,
        setUser: setUser,
        pageData, pageData,
        getPageData: getPageData,
        isMobile: isMobile,
        currency_symbol: currency_symbol

    }));
    return (
        <Layout globalMagento={globalMagento} user={user} setUser={setUser} pageData={pageData} currencyData={currencyData} storeData={storeData} selectedCurrency={selectedCurrency} selectedStore={selectedStore} getPageData={getPageData} MobileDevice={MobileDevice} sarabun={sarabun}>
            <section>
                <BlockManager blocks={blocks} MobileDevice={MobileDevice} sarabun={sarabun}/>
                <OrganizationSchema />
            </section>
        </Layout>
    );
};

// This gets called on every request
export async function getServerSideProps(context) {
    const { slug } = getLocalizedParams(context.query);
    const locale = context.locale;

    let pageSlug = slug;
    if (slug === '') {
        pageSlug = 'home';
    }

    let category_id = 36;

    try {
        const cookies = context.req.cookies;
        const selectedCurrency = cookies.currency_code || 'USD';
        let pagesData = null;
        let newCookieValue = 'default';
        if (locale !== 'en') {
            newCookieValue = locale;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com'}/api/cms_page`, {
                method: 'GET',
                headers: {
                    'Content-Currency': `${selectedCurrency}`,
                    'Store': `${newCookieValue}`,
                    'identifier': "home",
                },
            });
            const responseData = await response.json();
            pagesData = responseData;

        } catch (e) { }

        const blocksData = JSON.parse(dlv(pagesData, 'data.cmsBlocks.items.0.blocks_data', []));
        const storeCurrency = JSON.parse(dlv(blocksData, '0.store_currency'));
        const footerNewsLetter = dlv(blocksData, '1');
        const footer = dlv(blocksData, '2');
        const footerBootom = dlv(blocksData, '3');
        const bestSellersBlock = dlv(blocksData, '4');
        const footerData = { footerNewsLetter: footerNewsLetter, footer: footer, footerBootom: footerBootom, bestSellersBlock: bestSellersBlock }
        const globalMagento = { children: JSON.parse(pagesData.data.cmsBlocks.items[0].content), footerData: footerData };

        return {
            props: { pageData: {...pagesData.data.cmsPage, latestProducts:pagesData?.data?.latestProducts, bestSellers:pagesData?.data?.bestSellers, blocksData:pagesData?.data?.blocksData} || null, preview: context.preview || null, slug: slug, category_id: category_id || null, globalMagento: globalMagento, currencyData: storeCurrency.data.currency, storeData: storeCurrency },
        };
    } catch (error) {
        return {
            props: { pageData: null },
        };
    }
}

export default Universals;
