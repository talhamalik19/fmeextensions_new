import { getStrapiMedia } from '@/utils';
import delve from 'dlv';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Seo = ({ seo }) => {
  const router = useRouter();
  const languages = delve(router, 'locales');
  const metaTitle = delve(seo, 'meta_title');
  const metaImage = delve(seo, 'metaImage.data.attributes');
  const metaDescription = delve(seo, 'meta_description');
  const customCanonical = delve(seo, 'custom_canonical');
  let canonicalURL = router.asPath;
  try {
    const locale = delve(router, 'locale');
    const urlKey = delve(seo, 'url_key');
    canonicalURL = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com'}/${locale === 'en' ? '' : `${locale}/`}${urlKey === 'home' ? '' : urlKey.startsWith('/') ? urlKey.substring(1) : urlKey}`;
    canonicalURL = canonicalURL.replace(/\/$/, '');
  } catch (e) { }

  if (customCanonical !== 'null' && customCanonical !== null && customCanonical !== '' && typeof customCanonical !== 'undefined') {
    canonicalURL = customCanonical;
  }

  return (
    seo && <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} key="description" />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta name="google-site-verification" content="dUlL1eECokOaZ2odT48UKEhSts2GWf1W_tjZc0LSA6I" />
      <meta property="og:url" content={canonicalURL} key="og:url" />
      <meta property="og:title" content={metaTitle} key="og:title" />
      <meta
        property="og:description"
        content={metaDescription}
        key="og:description"
      />
      <meta
        property="og:image"
        content={getStrapiMedia(delve(metaImage, 'url'))}
        key="og:image"
      />
      <meta property="og:type" content="website" />
      {customCanonical ? <link rel="canonical" href={customCanonical} /> : <link rel="canonical" href={canonicalURL} />}
      {languages.map((lang, index) =>
        lang === 'en' ?
          <link key={`lang-${index}`} rel="alternate" hreflang={`${lang}`} href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://fmeaddons.com'}/${delve(seo, 'url_key') == 'home' ? '' : delve(seo, 'url_key').startsWith('/') ? delve(seo, 'url_key').substring(1) : delve(seo, 'url_key')}`.replace(/\/$/, '')}></link>
          :
          <link key={`lang-${index}`} rel="alternate" hreflang={`${lang}`} href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://fmeaddons.com'}/${lang}/${delve(seo, 'url_key') == 'home' ? '' : delve(seo, 'url_key').startsWith('/') ? delve(seo, 'url_key').substring(1) : delve(seo, 'url_key')}`.replace(/\/$/, '')}></link>
      )}
    </Head>
  );
};

export default Seo;
