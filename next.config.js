/** @type {import('next').NextConfig} */
let hostname = 'datam2.fmeextensions.com';

try{
  hostname = process.env.NEXT_PUBLIC_API_URL;
  hostname = hostname.replace('https://','');
}catch(e){}

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: hostname,
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: hostname,
        pathname: '/static/**',
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'fr', 'de', 'nl', 'ru', 'it', 'es', 'pt', 'pl'],
    defaultLocale: 'en',
  },
  /* async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  }, */
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:slug*.html',
        destination: '/:slug*',
        permanent: true,
      },
      {
        source: '/quickrfq',
        destination: '/request-a-quote',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig;
