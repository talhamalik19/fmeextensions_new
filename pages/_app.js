import '../style/globals.css';
import '../style/style.scss';
import '../style/pushbar.css';
import '../font/font.css';
import App from "next/app";
import ErrorPage from "next/error";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from 'react-redux';
import store from '../store';
import { useState, useEffect, useCallback } from 'react';
import { customer } from "./api/login";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { availableStores, getCurrencySymbol } from "./api/store";
import useGlobalClickListener from "@/utils/hooks/useGlobalClickListener";
import LoadingAnimation from "@/components/shared/LoadingAnimation";
import { useRouter } from 'next/router'
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Roboto, Sarabun } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin']
});

const sarabun = Sarabun({
  weight: ['400', '500', '700'],
  subsets: ['latin']
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { loginUser, locale, selectedCurrency, selectedStore, currency_symbol, isCurrencyChange } = pageProps;
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(loginUser);
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePrimaryCtaClick = useCallback((event, isNewTab) => {
    if (isNewTab) return;

    const getHref = (target) => {
      if (['IMG', 'P', 'SPAN', 'svg', 'LABEL', 'H1', 'H3', 'DIV'].includes(target.tagName)) {
        let current = target;
        for (let i = 0; i < 5; i++) {
          if (current.href) return current.href;
          current = current.parentNode;
        }
      }
      return target.href;
    };

    if (event.target.classList.contains('btn-cart')) {
      setIsLoading(true);
      return;
    }

    const href = getHref(event.target);
    if (!href) return;

    try {
      const url = new URL(href);
      if (url.pathname !== router.asPath) {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 5000);
      }
    } catch {}
  }, [router.asPath]);

  useGlobalClickListener(handlePrimaryCtaClick);

  useEffect(() => {
    const setupCookies = () => {
      if (getCookie('store_code') !== locale) {
        setCookie('store_code', locale === 'en' ? 'default' : locale, { path: '/' });
      }
      if (!getCookie('currency_code')) {
        setCookie('currency_code', selectedCurrency, { path: '/' });
      }
      if (!getCookie('store_code')) {
        setCookie('store_code', selectedStore, { path: '/' });
      }
      if (currency_symbol) {
        setCookie('symbol_currency', currency_symbol, { path: '/' });
      }
      if (isCurrencyChange) {
        setCookie('currency_code_prev', selectedCurrency, { path: '/' });
      }
    };

    setupCookies();
  }, [locale, selectedCurrency, selectedStore, currency_symbol, isCurrencyChange]);

  useEffect(() => {
    const checkCustomer = async () => {
      if (!getCookie('exchange_rates')) {
        const storeCurrency = await availableStores();
        const expirationDate = new Date(Date.now() + 120 * 60000);
        setCookie('exchange_rates', storeCurrency.data.currency.exchange_rates, { path: '/', expires: expirationDate });
      }

      if (getCookie('login_user')) {
        try {
          const fetchedCustomer = await customer(setUser);
          if (fetchedCustomer) {
            setUser(fetchedCustomer);
            const expirationDate = new Date(Date.now() + 59 * 60 * 1000);
            setCookie('login_user', JSON.stringify({
              data: {
                customer: { firstname: fetchedCustomer.data.customer.firstname, email: fetchedCustomer.data.customer.email },
              },
            }), { path: '/', expires: expirationDate });
          }
        } catch {
          setUser(null);
          deleteCookie('jwt');
          deleteCookie('login_user');
        }
      } else {
        setUser(null);
        deleteCookie('jwt');
        deleteCookie('login_user');
      }
    };

    checkCustomer();
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    setIsLoading(false);
  }, [router.asPath]);

  if (global === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <main className={roboto.className}>
          <ErrorBoundary>
            <Component {...pageProps} user={user} setUser={setUser} sarabun={sarabun.className} />
          </ErrorBoundary>
          <LoadingAnimation isLoading={isLoading} />
        </main>
      </Provider>
      <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID || 'G-19HS8E1W7N'} />
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  const { locale, req } = ctx;

  const isMobile = req ? Boolean(req.headers['user-agent']?.match(/Android|BlackBerry|iPhone|Opera Mini|IEMobile|WPDesktop/i)) : false;

  try {
    const cookies = req?.cookies || {};
    const selectedCurrency = cookies.currency_code || 'USD';
    const selectedCurrencyPrev = cookies.currency_code_prev || 'USD';
    const selectedStore = locale !== 'en' ? locale : 'default';

    let currency_symbol = cookies.symbol_currency || '$';
    let isCurrencyChange = false;

    if (selectedCurrencyPrev !== selectedCurrency) {
      isCurrencyChange = true;
      const symbolResponse = await getCurrencySymbol(selectedCurrency);
      currency_symbol = symbolResponse.data.getCurrencySymbol.symbol;
    }

    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        selectedCurrency,
        selectedStore,
        loginUser: cookies.login_user,
        locale,
        isCustomerLoggedIn: true,
        currency_symbol,
        isCurrencyChange,
        isMobile,
        MobileDevice: isMobile,
      }
    };
  } catch (error) {
    console.error('Error in getInitialProps:', error);
    return { ...appProps };
  }
};

export default MyApp;